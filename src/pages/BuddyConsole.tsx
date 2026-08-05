/* Unlisted console for the Pixel Travel Buddy.
 *
 * Two jobs: push firmware to the buddy over BLE (mine), and let whoever has it
 * set the clock and alarm without a cable. Talks to the GATT service in
 * the firmware's src/ble_link.h.
 *
 * NOT SECRET, just unlisted. The portfolio repo is public, so this path and the
 * token below are both readable by anyone who looks. The real barrier is
 * physical: BLE only reaches a few metres, so someone has to be standing next
 * to the desk. Treated accordingly - the page is noindex'd and off the nav.
 *
 * Web Bluetooth means Chrome/Edge on desktop or Chrome on Android, over HTTPS.
 * iOS Safari has no Web Bluetooth at all; the page says so rather than failing
 * with something cryptic.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, Eyebrow, PINK, TEAL, AMBER } from "../components/ui";

/* ---- must match src/ble_link.h ---- */
const SVC_UUID = "b0dd1000-5ca7-4a11-9e5e-1d0e5cb0dd10";
const CHR_CTRL = "b0dd1001-5ca7-4a11-9e5e-1d0e5cb0dd10";
const CHR_DATA = "b0dd1002-5ca7-4a11-9e5e-1d0e5cb0dd10";
const CHR_STATE = "b0dd1003-5ca7-4a11-9e5e-1d0e5cb0dd10";
const TOKEN = "buddy-42"; // must match BLE_LINK_TOKEN in src/config.h (8 bytes)

const OP_AUTH = 0x01, OP_OTA_BEGIN = 0x10, OP_OTA_END = 0x11,
      OP_OTA_ABORT = 0x12, OP_SET_TIME = 0x20, OP_SET_ALARM = 0x21,
      OP_EVENT = 0x22, OP_WEATHER = 0x23, OP_SET_TZ = 0x24,
      OP_SET_BLANK = 0x25, OP_CHIME = 0x26;

/* Event ids from the firmware's Event enum (src/input.h) - order matters. */
const CITIES = [
  { id: 1, name: "Cairo",     lat: 30.06, lon: 31.25 },
  { id: 2, name: "Miami",     lat: 25.76, lon: -80.19 },
  { id: 3, name: "Paris",     lat: 48.85, lon: 2.35 },
  { id: 4, name: "Barcelona", lat: 41.39, lon: 2.17 },
  { id: 5, name: "Tokyo",     lat: 35.68, lon: 139.69 },
  { id: 6, name: "New York",  lat: 40.71, lon: -74.01 },
];
const MODES = [
  { id: 7, name: "Clock" }, { id: 8, name: "Focus" }, { id: 9, name: "Music" },
];
const POKES = [
  { id: 10, name: "Boop" }, { id: 11, name: "Pet" },
  { id: 16, name: "Camel" }, { id: 17, name: "Meteor" },
];

const ST_NAMES = ["idle", "ready", "updating", "rebooting", "error"];
const ERR_NAMES = ["", "wrong token", "could not start update",
                   "flash write failed", "bad size", "image rejected"];

/* Chrome caps a single GATT write at 512 bytes, which is also what the
   firmware's 517-byte MTU allows. Anything smaller just costs throughput. */
const CHUNK = 512;

type Status = {
  state: number; pct: number; err: number;
  epoch: number; alarmH: number; alarmM: number; armed: boolean;
  /* Appended in a later firmware revision - undefined when talking to an
     older buddy, so every reader must cope with them being missing. */
  city?: number; tz?: number; blank?: number;
  uptime?: number; heap?: number; wxMask?: number;
};

const uptimeStr = (s: number) => {
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m ${s % 60}s`;
};

export default function BuddyConsole() {
  const [supported, setSupported] = useState(true);
  const [connected, setConnected] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [sentPct, setSentPct] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [alarmH, setAlarmH] = useState(7);
  const [alarmM, setAlarmM] = useState(0);
  const [armed, setArmed] = useState(false);

  const ctrlRef = useRef<any>(null);
  const dataRef = useRef<any>(null);
  const devRef = useRef<any>(null);
  const abortRef = useRef(false);

  const say = useCallback((m: string) => {
    setLog((l) => [`${new Date().toLocaleTimeString()}  ${m}`, ...l].slice(0, 60));
  }, []);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!(navigator as any).bluetooth);
    document.title = "Desk Buddy Console";
    // Keep an unlisted page out of search results.
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  const onStatus = useCallback((e: any) => {
    const v: DataView = e.target.value;
    if (v.byteLength < 10) return;
    const s: Status = {
      state: v.getUint8(0), pct: v.getUint8(1), err: v.getUint8(2),
      epoch: v.getUint32(3, true),
      alarmH: v.getUint8(7), alarmM: v.getUint8(8), armed: v.getUint8(9) !== 0,
    };
    // Telemetry block is append-only; only read it if the buddy actually sent it.
    if (v.byteLength >= 22) {
      s.city = v.getUint8(10);
      s.tz = v.getInt8(11);
      s.blank = v.getUint8(12);
      s.uptime = v.getUint32(13, true);
      s.heap = v.getUint32(17, true);
      s.wxMask = v.getUint8(21);
    }
    setStatus(s);
  }, []);

  const connect = useCallback(async () => {
    try {
      setBusy(true);
      // The service UUID is not in the advertising packet (no room beside the
      // HID UUID), so filter on the name and list the service as optional.
      const dev = await (navigator as any).bluetooth.requestDevice({
        filters: [{ namePrefix: "DeskBuddy" }],
        optionalServices: [SVC_UUID],
      });
      devRef.current = dev;
      setDeviceName(dev.name || "DeskBuddy");
      dev.addEventListener("gattserverdisconnected", () => {
        setConnected(false);
        say("disconnected");
      });

      const gatt = await dev.gatt.connect();
      const svc = await gatt.getPrimaryService(SVC_UUID);
      ctrlRef.current = await svc.getCharacteristic(CHR_CTRL);
      dataRef.current = await svc.getCharacteristic(CHR_DATA);
      const st = await svc.getCharacteristic(CHR_STATE);
      await st.startNotifications();
      st.addEventListener("characteristicvaluechanged", onStatus);
      onStatus({ target: { value: await st.readValue() } });

      setConnected(true);
      say(`connected to ${dev.name || "DeskBuddy"}`);

      // Authenticate straight away so the firmware panel is usable.
      const auth = new Uint8Array(9);
      auth[0] = OP_AUTH;
      auth.set(new TextEncoder().encode(TOKEN), 1);
      await ctrlRef.current.writeValue(auth);
      say("authenticated");
    } catch (err: any) {
      say(`connect failed: ${err?.message ?? err}`);
    } finally {
      setBusy(false);
    }
  }, [onStatus, say]);

  const disconnect = useCallback(() => {
    try { devRef.current?.gatt?.disconnect(); } catch { /* already gone */ }
    setConnected(false);
  }, []);

  const ctrl = useCallback(async (bytes: Uint8Array) => {
    if (!ctrlRef.current) throw new Error("not connected");
    await ctrlRef.current.writeValue(bytes);
  }, []);

  /* ---- firmware update ---- */
  const flash = useCallback(async () => {
    if (!file) return;
    const buf = new Uint8Array(await file.arrayBuffer());
    abortRef.current = false;
    setBusy(true);
    setSentPct(0);
    say(`sending ${file.name} (${(buf.length / 1024).toFixed(0)} KB)`);
    const t0 = performance.now();
    try {
      const begin = new Uint8Array(5);
      begin[0] = OP_OTA_BEGIN;
      new DataView(begin.buffer).setUint32(1, buf.length, true);
      await ctrl(begin);

      for (let off = 0; off < buf.length; off += CHUNK) {
        if (abortRef.current) {
          await ctrl(new Uint8Array([OP_OTA_ABORT]));
          say("aborted");
          return;
        }
        const slice = buf.subarray(off, Math.min(off + CHUNK, buf.length));
        // MUST be with-response. writeValueWithoutResponse has no backpressure:
        // the browser queues locally and resolves instantly, so the page reports
        // ~300 KB/s onto a link that carries ~5 and the device silently receives
        // a fraction of the image. Measured: 912KB "sent" in 2.9s, 4% arrived.
        // With response, each chunk is acknowledged and paced by the connection
        // interval - about 5.5 KB/s, so ~3 minutes for a full image.
        await dataRef.current.writeValueWithResponse(slice);
        setSentPct(Math.round(((off + slice.length) / buf.length) * 100));
      }

      await ctrl(new Uint8Array([OP_OTA_END]));
      const secs = (performance.now() - t0) / 1000;
      say(`sent in ${secs.toFixed(1)}s — buddy is verifying and rebooting`);
    } catch (err: any) {
      say(`update failed: ${err?.message ?? err}`);
      try { await ctrl(new Uint8Array([OP_OTA_ABORT])); } catch { /* link gone */ }
    } finally {
      setBusy(false);
    }
  }, [file, ctrl, say]);

  /* ---- settings ---- */
  const syncClock = useCallback(async () => {
    const epoch = Math.floor(Date.now() / 1000); // Date.now() is already UTC
    const b = new Uint8Array(5);
    b[0] = OP_SET_TIME;
    new DataView(b.buffer).setUint32(1, epoch, true);
    await ctrl(b);
    say("clock synced from this computer");
  }, [ctrl, say]);

  const sendAlarm = useCallback(async () => {
    await ctrl(new Uint8Array([OP_SET_ALARM, alarmH, alarmM, armed ? 1 : 0]));
    say(`alarm ${armed ? "on" : "off"} at ${pad(alarmH)}:${pad(alarmM)}`);
  }, [ctrl, alarmH, alarmM, armed, say]);

  /* Tap a card from anywhere. Goes through the firmware's onCard(), so the
     plane actually flies and the cat actually reacts. */
  const sendEvent = useCallback(async (id: number, name: string) => {
    await ctrl(new Uint8Array([OP_EVENT, id]));
    say(`sent ${name}`);
  }, [ctrl, say]);

  const chime = useCallback(async (tune: number) => {
    await ctrl(new Uint8Array([OP_CHIME, tune]));
    say(tune === 0 ? "chirped" : "played a flourish");
  }, [ctrl, say]);

  /* Weather without the USB cable: fetch all six cities and push them over BLE
     into the same store the USB tool writes, so the scene cannot tell them
     apart. This is what lets live weather work on a plain charger. */
  const syncWeather = useCallback(async () => {
    setBusy(true);
    say("fetching weather for six cities…");
    let ok = 0;
    for (let i = 0; i < CITIES.length; i++) {
      const c = CITIES[i];
      try {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}` +
          `&longitude=${c.lon}&current=temperature_2m,weather_code`);
        const cur = (await r.json()).current;
        const t = Math.max(-128, Math.min(127, Math.round(cur.temperature_2m)));
        const b = new Uint8Array(4);
        b[0] = OP_WEATHER; b[1] = i;
        new DataView(b.buffer).setInt8(2, t);
        b[3] = cur.weather_code & 0xff;
        await ctrl(b);
        ok++;
        say(`  ${c.name}: ${t}°C (code ${cur.weather_code})`);
      } catch {
        say(`  ${c.name}: fetch failed`);
      }
    }
    say(`weather synced for ${ok}/${CITIES.length} cities`);
    setBusy(false);
  }, [ctrl, say]);

  const sendTz = useCallback(async (hours: number) => {
    const b = new Uint8Array(2);
    b[0] = OP_SET_TZ;
    new DataView(b.buffer).setInt8(1, hours);
    await ctrl(b);
    say(`home timezone set to UTC${hours >= 0 ? "+" : ""}${hours}`);
  }, [ctrl, say]);

  const sendBlank = useCallback(async (mins: number) => {
    await ctrl(new Uint8Array([OP_SET_BLANK, mins]));
    say(mins === 0 ? "screen never blanks" : `screen blanks after ${mins} min`);
  }, [ctrl, say]);

  // Adopt whatever the buddy reports, so the controls show its truth on connect.
  useEffect(() => {
    if (!status) return;
    setAlarmH(status.alarmH); setAlarmM(status.alarmM); setArmed(status.armed);
  }, [status?.alarmH, status?.alarmM, status?.armed]);

  const pct = status?.state === 2 ? Math.max(status.pct, sentPct) : sentPct;

  if (!supported) {
    return (
      <Shell>
        <div style={box(AMBER)} className="p-6 rounded-xl">
          <Eyebrow accent={AMBER}>UNSUPPORTED BROWSER</Eyebrow>
          <p className="text-white/70 mt-4 leading-relaxed">
            This page talks to the buddy over Web Bluetooth, which needs Chrome or
            Edge on desktop, or Chrome on Android. Safari — including every browser
            on iPhone and iPad — has no Web Bluetooth support at all, so there is no
            workaround here beyond switching device or browser.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* connection */}
      <Reveal>
        <div style={box(connected ? TEAL : PINK)} className="p-5 rounded-xl flex flex-wrap items-center gap-4">
          <span className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: connected ? TEAL : "#555", boxShadow: connected ? `0 0 12px ${TEAL}` : "none" }} />
          <span className="font-pixel text-sm text-white/80">
            {connected ? deviceName : "not connected"}
          </span>
          {status && (
            <span className="text-xs text-white/45">
              {ST_NAMES[status.state] ?? "?"}
              {status.err ? ` — ${ERR_NAMES[status.err]}` : ""}
              {status.epoch > 0 && ` · buddy clock ${new Date(status.epoch * 1000).toUTCString().slice(17, 22)} UTC`}
            </span>
          )}
          <div className="ml-auto flex gap-2">
            <Btn onClick={connect} disabled={busy || connected} accent={TEAL}>connect</Btn>
            <Btn onClick={disconnect} disabled={!connected} accent={PINK}>disconnect</Btn>
          </div>
        </div>
      </Reveal>

      {/* firmware */}
      <Reveal delay={0.05}>
        <div style={box(PINK)} className="p-6 rounded-xl mt-6">
          <Eyebrow accent={PINK}>FIRMWARE</Eyebrow>
          <p className="text-white/50 text-sm mt-3 mb-5 leading-relaxed">
            Pick <code className="text-white/70">.pio/build/esp32dev/firmware.bin</code> from
            the firmware repo. It goes into the inactive OTA slot and the buddy reboots
            into it; if the image is bad it falls back, so a failed update is not fatal.
          </p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f?.name.endsWith(".bin")) { setFile(f); say(`picked ${f.name}`); }
              else say("that is not a .bin");
            }}
            className="rounded-lg border border-dashed p-5 mb-4 transition-colors"
            style={{
              borderColor: dragging ? PINK : "rgba(255,255,255,0.15)",
              background: dragging ? `${PINK}0F` : "transparent",
            }}
          >
            <p className="text-sm text-white/50 mb-3">
              {file
                ? `${file.name} — ${(file.size / 1024).toFixed(0)} KB`
                : "Drop firmware.bin here, or pick it:"}
            </p>
            <input
              type="file" accept=".bin"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-white/60
                         file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                         file:text-sm file:font-pixel file:bg-white/10 file:text-white/80
                         hover:file:bg-white/15 file:cursor-pointer"
            />
          </div>

          {(busy || pct > 0) && (
            <div className="mb-4">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-[width] duration-200"
                     style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${PINK}, ${AMBER})` }} />
              </div>
              <p className="text-xs text-white/40 mt-2">
                {pct}% — about 3 minutes for a full image. Do not close this tab.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Btn onClick={flash} disabled={!connected || !file || busy} accent={PINK}>
              {busy ? "sending…" : "send firmware"}
            </Btn>
            <Btn onClick={() => { abortRef.current = true; }} disabled={!busy} accent={AMBER}>
              abort
            </Btn>
          </div>
        </div>
      </Reveal>

      {/* telemetry */}
      {status && status.uptime !== undefined && (
        <Reveal delay={0.07}>
          <div style={box(AMBER)} className="p-6 rounded-xl mt-6">
            <Eyebrow accent={AMBER}>VITALS</Eyebrow>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
              <Stat label="ON SCREEN" value={CITIES[(status.city ?? 0)]?.name ?? "—"} />
              <Stat label="UPTIME" value={uptimeStr(status.uptime)} />
              <Stat label="FREE HEAP"
                    value={`${((status.heap ?? 0) / 1024).toFixed(0)} KB`}
                    warn={(status.heap ?? 0) < 40000} />
              <Stat label="WEATHER"
                    value={`${countBits(status.wxMask ?? 0)}/6 cities`}
                    warn={countBits(status.wxMask ?? 0) === 0} />
            </div>
          </div>
        </Reveal>
      )}

      {/* remote cards */}
      <Reveal delay={0.08}>
        <div style={box(TEAL)} className="p-6 rounded-xl mt-6">
          <Eyebrow accent={TEAL}>TAP A CARD FROM ANYWHERE</Eyebrow>
          <p className="text-white/50 text-sm mt-3 mb-5 leading-relaxed">
            These go through the same code path as the real RFID cards, so the
            plane actually flies and the cat actually reacts. Cards stay the
            interface — this is just a very long arm.
          </p>

          <p className="text-[10px] font-pixel text-white/35 mb-2 tracking-widest">DESTINATIONS</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {CITIES.map((c, i) => (
              <Btn key={c.id} onClick={() => sendEvent(c.id, c.name)}
                   disabled={!connected}
                   accent={status?.city === i ? AMBER : TEAL}>{c.name}</Btn>
            ))}
          </div>

          <p className="text-[10px] font-pixel text-white/35 mb-2 tracking-widest">MODES</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {MODES.map((m) => (
              <Btn key={m.id} onClick={() => sendEvent(m.id, m.name)}
                   disabled={!connected} accent={PINK}>{m.name}</Btn>
            ))}
          </div>

          <p className="text-[10px] font-pixel text-white/35 mb-2 tracking-widest">SAY HELLO</p>
          <div className="flex flex-wrap gap-2">
            {POKES.map((p) => (
              <Btn key={p.id} onClick={() => sendEvent(p.id, p.name)}
                   disabled={!connected} accent={AMBER}>{p.name}</Btn>
            ))}
            <Btn onClick={() => chime(0)} disabled={!connected} accent={AMBER}>chirp</Btn>
            <Btn onClick={() => chime(1)} disabled={!connected} accent={AMBER}>fanfare</Btn>
          </div>
        </div>
      </Reveal>

      {/* weather */}
      <Reveal delay={0.09}>
        <div style={box(PINK)} className="p-6 rounded-xl mt-6">
          <Eyebrow accent={PINK}>WEATHER</Eyebrow>
          <p className="text-white/50 text-sm mt-3 mb-5 leading-relaxed">
            Pulls Open-Meteo for all six cities and pushes it over Bluetooth into
            the same place the USB tool writes. That means live rain and snow on
            a plain wall charger, with no laptop on the cable.
          </p>
          <Btn onClick={syncWeather} disabled={!connected || busy} accent={PINK}>
            {busy ? "syncing…" : "sync all six cities"}
          </Btn>
        </div>
      </Reveal>

      {/* settings */}
      <Reveal delay={0.1}>
        <div style={box(TEAL)} className="p-6 rounded-xl mt-6">
          <Eyebrow accent={TEAL}>SETTINGS</Eyebrow>
          <p className="text-white/50 text-sm mt-3 mb-5 leading-relaxed">
            No token needed for these.
          </p>

          <div className="flex flex-wrap items-end gap-5">
            <div>
              <label className="block text-xs text-white/40 mb-2 font-pixel">ALARM</label>
              <div className="flex items-center gap-2">
                <Num value={alarmH} max={23} onChange={setAlarmH} />
                <span className="text-white/40">:</span>
                <Num value={alarmM} max={59} onChange={setAlarmM} />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input type="checkbox" checked={armed} onChange={(e) => setArmed(e.target.checked)}
                     className="w-4 h-4 accent-[#45E0D8]" />
              <span className="text-sm text-white/70">armed</span>
            </label>

            <div className="flex gap-2 ml-auto">
              <Btn onClick={sendAlarm} disabled={!connected} accent={TEAL}>set alarm</Btn>
              <Btn onClick={syncClock} disabled={!connected} accent={AMBER}>sync clock</Btn>
            </div>
          </div>

          <div className="border-t border-white/5 mt-6 pt-6 flex flex-wrap items-end gap-5">
            <div>
              <label className="block text-xs text-white/40 mb-2 font-pixel">
                HOME TIMEZONE (UTC{(status?.tz ?? 3) >= 0 ? "+" : ""}{status?.tz ?? 3})
              </label>
              <div className="flex gap-2">
                <Btn onClick={() => sendTz((status?.tz ?? 3) - 1)} disabled={!connected} accent={TEAL}>−1h</Btn>
                <Btn onClick={() => sendTz((status?.tz ?? 3) + 1)} disabled={!connected} accent={TEAL}>+1h</Btn>
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 mb-2 font-pixel">
                BLANK AFTER {status?.blank === 0 ? "never" : `${status?.blank ?? 10} min`}
              </label>
              <div className="flex gap-2">
                {[0, 5, 10, 30].map((m) => (
                  <Btn key={m} onClick={() => sendBlank(m)} disabled={!connected}
                       accent={status?.blank === m ? AMBER : TEAL}>
                    {m === 0 ? "never" : `${m}m`}
                  </Btn>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/30 text-xs mt-5 leading-relaxed">
            Timezone matters because the alarm fires on the buddy's home clock — this is
            how you fix it when Egypt's DST flips, without a cable.
          </p>
        </div>
      </Reveal>

      {/* log */}
      {log.length > 0 && (
        <div className="mt-6 rounded-xl p-4" style={box("#2A2740")}>
          <pre className="text-[11px] leading-relaxed text-white/40 whitespace-pre-wrap max-h-56 overflow-y-auto">
            {log.join("\n")}
          </pre>
        </div>
      )}
    </Shell>
  );
}

/* ---- small local pieces (not worth promoting to the shared kit) ---- */
const pad = (n: number) => String(n).padStart(2, "0");
const countBits = (n: number) => n.toString(2).split("1").length - 1;

function Stat({ label, value, warn }: {
  label: string; value: string; warn?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-pixel tracking-widest text-white/35">{label}</p>
      <p className="font-pixel text-sm mt-1.5"
         style={{ color: warn ? "#FFB347" : "rgba(255,255,255,0.85)" }}>{value}</p>
    </div>
  );
}

const box = (accent: string) => ({
  background: "rgba(255,255,255,0.03)",
  border: `1px solid ${accent}33`,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
      <Reveal className="mb-10">
        <h1 className="font-pixel text-3xl sm:text-4xl text-white/90">Desk Buddy Console</h1>
      </Reveal>
      {children}
    </section>
  );
}

function Btn({ children, onClick, disabled, accent }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; accent: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-pixel text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ background: `${accent}1A`, border: `1px solid ${accent}55`, color: accent }}
    >
      {children}
    </button>
  );
}

function Num({ value, max, onChange }: {
  value: number; max: number; onChange: (n: number) => void;
}) {
  return (
    <input
      type="number" min={0} max={max} value={pad(value)}
      onChange={(e) => {
        const n = parseInt(e.target.value, 10);
        if (!Number.isNaN(n)) onChange(Math.max(0, Math.min(max, n)));
      }}
      className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2
                 text-center font-pixel text-sm text-white/85 focus:outline-none
                 focus:border-white/25"
    />
  );
}
