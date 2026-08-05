/* The buddy's own remote — the page the owner of the cat actually uses.
 *
 * Deliberately not the console. No firmware, no heap, no tokens, no jargon.
 * The whole idea: the cards are boarding passes, so this is a departures board.
 * Pick a destination and the cat flies there.
 *
 * Connecting quietly fixes the boring things (clock, timezone, weather) so
 * nobody ever has to think about them. The only visible controls are the fun
 * ones and the alarm.
 *
 * Needs Chrome or Edge; Safari has no Web Bluetooth, and the page says so
 * kindly instead of failing at a dead button.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const SVC_UUID = "b0dd1000-5ca7-4a11-9e5e-1d0e5cb0dd10";
const CHR_CTRL = "b0dd1001-5ca7-4a11-9e5e-1d0e5cb0dd10";
const CHR_STATE = "b0dd1003-5ca7-4a11-9e5e-1d0e5cb0dd10";

const OP_SET_TIME = 0x20, OP_SET_ALARM = 0x21, OP_EVENT = 0x22,
      OP_WEATHER = 0x23, OP_SET_TZ = 0x24, OP_CHIME = 0x26,
      OP_ALARM_SND = 0x27;

/* Alarm voices, in the firmware's order (Sound::TUNES in src/sound.h). The
   descriptions matter more than the names: on a square-wave buzzer the
   character comes from rhythm, so "two-tone" tells you more than "Klaxon". */
const VOICES = [
  { name: "Chirp",   about: "Short and bright. Easy to ignore." },
  { name: "Sunrise", about: "Rises slowly. Gentlest of the five." },
  { name: "Klaxon",  about: "Two-tone and urgent. Hard to sleep through." },
  { name: "Bells",   about: "Wide chiming intervals." },
  { name: "Travel",  about: "The arrival tune, stretched out." },
];

/* Airport codes because the cards are boarding passes. Art comes from the
   buddy's own sprite sheets via tools/webexport.py, so the page and the
   device are literally showing the same pixels. */
const BOARD = [
  { id: 1, iata: "CAI", city: "Cairo",     lat: 30.06, lon: 31.25,   art: "cairo",     cat: "cat_cairo" },
  { id: 2, iata: "MIA", city: "Miami",     lat: 25.76, lon: -80.19,  art: "miami",     cat: "cat_miami" },
  { id: 3, iata: "CDG", city: "Paris",     lat: 48.85, lon: 2.35,    art: "paris",     cat: "cat_base" },
  { id: 4, iata: "BCN", city: "Barcelona", lat: 41.39, lon: 2.17,    art: "barcelona", cat: "cat_base" },
  { id: 5, iata: "HND", city: "Tokyo",     lat: 35.68, lon: 139.69,  art: "tokyo",     cat: "cat_samurai" },
  { id: 6, iata: "JFK", city: "New York",  lat: 40.71, lon: -74.01,  art: "newyork",   cat: "cat_newyork" },
];

/* Amber on near-black, the way a real split-flap board reads. */
const AMBER = "#FFB347";
const INK = "#0B0A12";
const PINK = "#FF4FA3";

const pad = (n: number) => String(n).padStart(2, "0");

export default function BuddyRemote() {
  const [supported, setSupported] = useState(true);
  const [connected, setConnected] = useState(false);
  const [city, setCity] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [alarmH, setAlarmH] = useState(7);
  const [alarmM, setAlarmM] = useState(0);
  const [armed, setArmed] = useState(false);
  const [inFlight, setInFlight] = useState<number | null>(null);
  const [voice, setVoice] = useState(0);

  const ctrlRef = useRef<any>(null);
  const devRef = useRef<any>(null);
  const prevCity = useRef(0);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!(navigator as any).bluetooth);
    document.title = "Your Desk Buddy";
    const m = document.createElement("meta");
    m.name = "robots"; m.content = "noindex, nofollow";
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  /* Flip the board whenever the cat actually lands somewhere new. */
  useEffect(() => {
    if (city === prevCity.current) return;
    prevCity.current = city;
    setInFlight(null);
    setFlipping(true);
    const t = setTimeout(() => setFlipping(false), 700);
    return () => clearTimeout(t);
  }, [city]);

  const onStatus = useCallback((e: any) => {
    const v: DataView = e.target.value;
    if (v.byteLength < 10) return;
    setAlarmH(v.getUint8(7));
    setAlarmM(v.getUint8(8));
    setArmed(v.getUint8(9) !== 0);
    if (v.byteLength >= 22) setCity(v.getUint8(10));
    if (v.byteLength >= 23) setVoice(v.getUint8(22));
  }, []);

  const ctrl = useCallback(async (bytes: Uint8Array) => {
    if (!ctrlRef.current) throw new Error("not connected");
    await ctrlRef.current.writeValue(bytes);
  }, []);

  /* Everything nobody should have to think about, done on connect. */
  const catchUp = useCallback(async () => {
    const epoch = Math.floor(Date.now() / 1000);
    const t = new Uint8Array(5);
    t[0] = OP_SET_TIME;
    new DataView(t.buffer).setUint32(1, epoch, true);
    await ctrl(t);

    const hours = -Math.round(new Date().getTimezoneOffset() / 60);
    const z = new Uint8Array(2);
    z[0] = OP_SET_TZ;
    new DataView(z.buffer).setInt8(1, hours);
    await ctrl(z);

    for (let i = 0; i < BOARD.length; i++) {
      try {
        const c = BOARD[i];
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}` +
          `&longitude=${c.lon}&current=temperature_2m,weather_code`);
        const cur = (await r.json()).current;
        const b = new Uint8Array(4);
        b[0] = OP_WEATHER; b[1] = i;
        new DataView(b.buffer).setInt8(2, Math.max(-128, Math.min(127,
          Math.round(cur.temperature_2m))));
        b[3] = cur.weather_code & 0xff;
        await ctrl(b);
      } catch { /* one city short of weather is not worth mentioning */ }
    }
  }, [ctrl]);

  const connect = useCallback(async () => {
    setBusy(true);
    setNote("");
    try {
      const dev = await (navigator as any).bluetooth.requestDevice({
        filters: [{ namePrefix: "DeskBuddy" }],
        optionalServices: [SVC_UUID],
      });
      devRef.current = dev;
      dev.addEventListener("gattserverdisconnected", () => {
        setConnected(false);
        setNote("Your buddy went quiet. Press Wake up to find it again.");
      });

      const gatt = await dev.gatt.connect();
      const svc = await gatt.getPrimaryService(SVC_UUID);
      ctrlRef.current = await svc.getCharacteristic(CHR_CTRL);
      const st = await svc.getCharacteristic(CHR_STATE);
      await st.startNotifications();
      st.addEventListener("characteristicvaluechanged", onStatus);
      onStatus({ target: { value: await st.readValue() } });

      setConnected(true);
      setNote("Setting the clock and checking the weather…");
      await catchUp();
      setNote("All caught up. The clock, the time zone and the weather are set.");
    } catch {
      setNote("Could not find your buddy. Make sure it is plugged in and nearby.");
    } finally {
      setBusy(false);
    }
  }, [onStatus, catchUp]);

  /* Keep the clock right for as long as this page is open. The buddy has no
     RTC, so it drifts about a second a day and resumes from flash after an
     unplug - both of which a five-minute nudge quietly erases. */
  useEffect(() => {
    if (!connected) return;
    const id = setInterval(() => {
      const b = new Uint8Array(5);
      b[0] = OP_SET_TIME;
      new DataView(b.buffer).setUint32(1, Math.floor(Date.now() / 1000), true);
      ctrl(b).catch(() => { /* link dropped; the disconnect handler says so */ });
    }, 300000);
    return () => clearInterval(id);
  }, [connected, ctrl]);

  const fly = useCallback(async (i: number) => {
    setInFlight(i);
    await ctrl(new Uint8Array([OP_EVENT, BOARD[i].id]));
    setNote(`The cat is flying to ${BOARD[i].city}.`);
  }, [ctrl]);

  const poke = useCallback(async (id: number, msg: string) => {
    await ctrl(new Uint8Array([OP_EVENT, id]));
    setNote(msg);
  }, [ctrl]);

  const chirp = useCallback(async (tune: number, msg: string) => {
    await ctrl(new Uint8Array([OP_CHIME, tune]));
    setNote(msg);
  }, [ctrl]);

  /* Picking a voice plays it on the buddy's own buzzer. A browser could
     synthesise a square wave, but it would tell you nothing about how the
     piezo across the room actually sounds at 7am. */
  const pickVoice = useCallback(async (i: number) => {
    setVoice(i);
    await ctrl(new Uint8Array([OP_ALARM_SND, i, 1]));
    setNote(`${VOICES[i].name} — listen to your buddy.`);
  }, [ctrl]);

  const saveAlarm = useCallback(async (h: number, m: number, on: boolean) => {
    setAlarmH(h); setAlarmM(m); setArmed(on);
    await ctrl(new Uint8Array([OP_SET_ALARM, h, m, on ? 1 : 0]));
    setNote(on ? `The cat will wake you at ${pad(h)}:${pad(m)}.`
               : "Wake-up call is off.");
  }, [ctrl]);

  const here = BOARD[city] ?? BOARD[0];

  if (!supported) {
    return (
      <Frame>
        <p className="text-white/70 leading-relaxed">
          This page talks to your buddy over Bluetooth, which only Chrome and Edge
          can do. Safari and every browser on iPhone cannot. Open this link in
          Chrome on a laptop or an Android phone and it will work.
        </p>
      </Frame>
    );
  }

  return (
    <Frame>
      <style>{`
        @keyframes flap {
          0%   { transform: rotateX(0deg);   opacity: 1 }
          45%  { transform: rotateX(-90deg); opacity: .25 }
          55%  { transform: rotateX(90deg);  opacity: .25 }
          100% { transform: rotateX(0deg);   opacity: 1 }
        }
        .flap { animation: flap .7s cubic-bezier(.4,0,.2,1); transform-origin: center }
        @media (prefers-reduced-motion: reduce) { .flap { animation: none } }
      `}</style>

      {/* Where the cat is now — the whole point of the page, so it goes first
          and it is a picture, not a status line. */}
      <div className="rounded-2xl overflow-hidden mb-8"
           style={{ border: `1px solid ${AMBER}33`, background: "rgba(255,255,255,.03)" }}>
        <div className="relative">
          <img src={`/deskbuddy/${here.art}.png`} alt=""
               className="w-full h-40 sm:h-56 object-cover"
               style={{ imageRendering: "pixelated", opacity: connected ? 1 : 0.35 }} />
          <img src={`/deskbuddy/${here.cat}.png`} alt=""
               className="absolute bottom-3 right-4 w-14 sm:w-20"
               style={{ imageRendering: "pixelated", opacity: connected ? 1 : 0.35 }} />
          <div className="absolute inset-0"
               style={{ background: `linear-gradient(to top, ${INK} 4%, transparent 60%)` }} />
        </div>
        <div className="px-5 sm:px-7 pb-6 -mt-6 relative">
          <p className="font-pixel text-[10px] tracking-[0.3em]" style={{ color: AMBER }}>
            {connected ? "YOUR CAT IS IN" : "NOT CONNECTED YET"}
          </p>
          <h1 className={`font-pixel text-3xl sm:text-5xl text-white/90 mt-2 ${flipping ? "flap" : ""}`}>
            {connected ? here.city : "Hello"}
          </h1>
        </div>
      </div>

      {!connected && (
        <button
          onClick={connect}
          disabled={busy}
          className="w-full font-pixel text-sm rounded-xl py-5 mb-6 transition-colors disabled:opacity-40"
          style={{ background: `${AMBER}1A`, border: `1px solid ${AMBER}66`, color: AMBER }}
        >
          {busy ? "Looking…" : "Wake up your buddy"}
        </button>
      )}

      {note && (
        <p className="text-white/55 text-sm mb-6 leading-relaxed">{note}</p>
      )}

      {connected && (
        <>
          {/* The signature: a departures board. Tap a city, the cat flies. */}
          <Panel label="DEPARTURES">
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,.06)" }}>
              {BOARD.map((b, i) => {
                const isHere = i === city;
                const going = inFlight === i;
                return (
                  <div key={b.iata}
                       className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="font-pixel text-sm w-12 shrink-0"
                          style={{ color: isHere ? AMBER : "rgba(255,255,255,.35)" }}>
                      {b.iata}
                    </span>
                    <span className="font-pixel text-sm text-white/80 flex-1">{b.city}</span>
                    {isHere ? (
                      <span className="font-pixel text-[10px] tracking-widest px-3 py-1.5 rounded-md"
                            style={{ color: AMBER, background: `${AMBER}1A` }}>
                        HERE NOW
                      </span>
                    ) : (
                      <button
                        onClick={() => fly(i)}
                        disabled={going}
                        className="font-pixel text-[10px] tracking-widest px-3 py-1.5 rounded-md
                                   transition-colors disabled:opacity-50"
                        style={{ color: PINK, background: `${PINK}14`, border: `1px solid ${PINK}44` }}
                      >
                        {going ? "FLYING…" : "SEND"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel label="SAY HELLO">
            <div className="flex flex-wrap gap-2">
              <Soft onClick={() => poke(10, "You booped the cat.")}>Boop</Soft>
              <Soft onClick={() => poke(11, "The cat is being petted.")}>Pet</Soft>
              <Soft onClick={() => chirp(0, "It chirped at you.")}>Chirp</Soft>
              <Soft onClick={() => chirp(1, "A little fanfare.")}>Fanfare</Soft>
              <Soft onClick={() => poke(16, "A camel wandered past.")}>Camel</Soft>
              <Soft onClick={() => poke(17, "Look up — shooting star.")}>Shooting star</Soft>
            </div>
          </Panel>

          <Panel label="WAKE-UP CALL">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Num value={alarmH} max={23} onChange={(h) => saveAlarm(h, alarmM, armed)} />
                <span className="text-white/30 font-pixel">:</span>
                <Num value={alarmM} max={59} onChange={(m) => saveAlarm(alarmH, m, armed)} />
              </div>
              <button
                onClick={() => saveAlarm(alarmH, alarmM, !armed)}
                className="font-pixel text-[10px] tracking-widest px-4 py-2.5 rounded-md transition-colors"
                style={{
                  color: armed ? INK : "rgba(255,255,255,.6)",
                  background: armed ? AMBER : "rgba(255,255,255,.06)",
                  border: `1px solid ${armed ? AMBER : "rgba(255,255,255,.12)"}`,
                }}
              >
                {armed ? "ON" : "OFF"}
              </button>
              <p className="text-white/35 text-xs flex-1 min-w-[12rem] leading-relaxed">
                The cat wakes you on your own clock — it already knows your time zone.
              </p>
            </div>

            {/* Tap to hear it. The buddy plays the sample, not the browser. */}
            <div className="border-t border-white/5 mt-5 pt-5">
              <p className="font-pixel text-[10px] tracking-[0.3em] text-white/35 mb-3">
                SOUND — TAP TO HEAR IT
              </p>
              <div className="flex flex-col gap-2">
                {VOICES.map((v, i) => {
                  const on = i === voice;
                  return (
                    <button
                      key={v.name}
                      onClick={() => pickVoice(i)}
                      className="text-left rounded-lg px-4 py-3 transition-colors"
                      style={{
                        background: on ? `${AMBER}14` : "rgba(255,255,255,.04)",
                        border: `1px solid ${on ? `${AMBER}66` : "rgba(255,255,255,.08)"}`,
                      }}
                    >
                      <span className="font-pixel text-xs"
                            style={{ color: on ? AMBER : "rgba(255,255,255,.8)" }}>
                        {v.name}{on ? "  ●" : ""}
                      </span>
                      <span className="block text-white/40 text-xs mt-1">{v.about}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Panel>
        </>
      )}
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-xl mx-auto px-5 sm:px-6 py-12 sm:py-20">{children}</section>
  );
}

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 sm:p-6 mb-5"
         style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)" }}>
      <p className="font-pixel text-[10px] tracking-[0.3em] text-white/35 mb-4">{label}</p>
      {children}
    </div>
  );
}

function Soft({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-pixel text-xs px-4 py-2.5 rounded-lg text-white/75
                 transition-colors hover:text-white"
      style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}
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
      type="number" min={0} max={max} value={pad(value)} inputMode="numeric"
      onChange={(e) => {
        const n = parseInt(e.target.value, 10);
        if (!Number.isNaN(n)) onChange(Math.max(0, Math.min(max, n)));
      }}
      className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5
                 text-center font-pixel text-base text-white/85 focus:outline-none
                 focus:border-white/30"
    />
  );
}
