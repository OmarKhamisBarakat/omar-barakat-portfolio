import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const DESKBUDDY_GITHUB =
  "https://github.com/OmarKhamisBarakat/pixel-travel-buddy";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* vice-sunset palette, local to this page so it reads the same in either theme */
const INK = "#0B0A12";
const PINK = "#FF4FA3";
const TEAL = "#45E0D8";
const AMBER = "#FFB347";

const destinations = [
  {
    city: "CAIRO",
    tag: "HOME",
    img: "/deskbuddy/cairo.png",
    accent: AMBER,
    blurb:
      "Where the buddy actually lives. The Giza trio in the haze, the Sphinx couched on the sand beside them, and the Cairo Tower's lotus crown catching the last of the light. Camels cross the track — sometimes a whole roped caravan, sometimes one with a tourist aboard. On Fridays the cat digs out a checked keffiyeh and a jalabeya. Look closely at the Sphinx's face.",
  },
  {
    city: "MIAMI",
    tag: "THE STRIP",
    img: "/deskbuddy/miami.png",
    accent: PINK,
    blurb:
      "Art-deco pastels along the waterfront, a striped umbrella, and gulls drifting over the horizon. A red wedge of a sports car tears down the strip; an ice-cream truck follows at a more civilised pace. The cat changes into swim trunks.",
  },
  {
    city: "PARIS",
    tag: "THE PARK",
    img: "/deskbuddy/paris.png",
    accent: TEAL,
    blurb:
      "The tower — iron, see-through, tapering to a single pixel — over a park with a bench and a lamp post. Pigeons scatter across the grass on their own schedule.",
  },
  {
    city: "BARCELONA",
    tag: "THE SPIRES",
    img: "/deskbuddy/barcelona.png",
    accent: AMBER,
    blurb:
      "The Sagrada Família's cluster of spires with the cross on top, and Torre Glòries glowing at the end of the block. Every so often, a bull comes through at speed.",
  },
  {
    city: "TOKYO",
    tag: "THE BANNER",
    img: "/deskbuddy/tokyo.png",
    accent: PINK,
    blurb:
      "Fuji behind the Skytree and the Tower, a torii gate, and a cherry tree letting go of its petals. The cat puts on a kabuto and a moustache. A red banner hangs over the street, its hiragana rendered by the same pixel font this page is set in.",
  },
  {
    city: "NEW YORK",
    tag: "THE GRID",
    img: "/deskbuddy/newyork.png",
    accent: TEAL,
    blurb:
      "One World Trade, the Empire State, and the Chrysler's steel crown, packed in tight with the brownstones behind them. A yellow light blinks over the crosswalk, seagulls come off the water, and the cat wears a suit.",
  },
];

const cast = [
  { img: "/deskbuddy/cat_base.png", name: "THE CAT", note: "Blinks. Flicks its tail. Curls up and sleeps once it's late. Nothing decays, nothing dies, nothing guilt-trips you." },
  { img: "/deskbuddy/cat_cairo.png", name: "CAIRO", note: "A red-checked keffiyeh under a black agal, over a cream jalabeya — but only on Fridays. The rest of the week it's just the cat." },
  { img: "/deskbuddy/cat_samurai.png", name: "TOKYO", note: "Iron kabuto, golden horns, and a handlebar moustache." },
  { img: "/deskbuddy/cat_newyork.png", name: "NEW YORK", note: "Navy suit, white shirt, red tie. All business." },
  { img: "/deskbuddy/cat_miami.png", name: "MIAMI", note: "Red swim trunks. That's the whole outfit." },
  { img: "/deskbuddy/cat_music.png", name: "MUSIC", note: "Over-ear headphones. Bobs on the beat." },
];

const specs = [
  { k: "NO FRAMEBUFFER", v: "A 320×240 screen is 150KB of pixels — more than the ESP32 can spare. Nothing is ever held in full. Every frame is a handful of dirty rectangles, recomposed from a sky gradient upward." },
  { k: "CARDS ARE THE INTERFACE", v: "Each city is a physical card. Tap it on the reader and a plane crosses the screen, the world flashes, and the cat lands somewhere new. There are no menus anywhere." },
  { k: "MUSIC MODE", v: "Its own card. The buddy pairs as a Bluetooth media remote — play, pause, skip, volume — for whatever is playing on the laptop it's sitting next to." },
  { k: "IT JUST KNOWS THE TIME", v: "The clock arrives over the USB cable it's already plugged into. No WiFi to join, no app to install, nothing to configure." },
  { k: "EVERY SPRITE IS GENERATED", v: "No image files. A Python pipeline turns character art and procedural builders into indexed sprites and palettes, compiled straight into the firmware." },
  { k: "IT KEEPS ITS OWN HOURS", v: "Each city runs on its real timezone, so the sky tracks the actual sun and moon phase. Late enough at night the cat curls up and sleeps, z's drifting off its head — until you poke it awake." },
  { k: "THE TYPE ON THIS PAGE", v: "Is the buddy's own font — the same 3×5 glyphs its firmware draws with, pulled out and rebuilt into a ~1KB webfont for this page." },
];

export default function DeskBuddy() {
  return (
    <div className="-mt-20" style={{ background: INK, color: "#EDEBF5" }}>
      {/* ───────────────── hero ───────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src="/deskbuddy/miami.png"
          alt="The buddy on the Miami waterfront at dusk"
          className="pixelated absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${INK} 6%, transparent 62%), linear-gradient(to right, ${INK}CC, transparent 70%)` }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 pb-20 pt-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-pixel text-sm sm:text-base tracking-[0.25em] mb-6"
            style={{ color: TEAL }}
          >
            ONLY ON YOUR DESK
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-pixel leading-[0.95] text-[15vw] sm:text-[11vw] lg:text-[8.5rem]"
            style={{
              backgroundImage: `linear-gradient(100deg, ${PINK} 10%, ${AMBER} 50%, ${TEAL} 90%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            DESK<br />BUDDY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/70"
          >
            A pixel cat lives on a 320×240 screen on your desk. Tap a
            boarding-pass card and it flies somewhere — six cities, each with its
            own skyline, weather and local time. An ESP32 with no framebuffer,
            no menus, and every sprite generated from code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href={DESKBUDDY_GITHUB} target="_blank" rel="noreferrer"
              className="font-pixel text-sm inline-flex items-center gap-2 px-6 py-4 rounded-xl transition-transform hover:-translate-y-0.5"
              style={{ background: PINK, color: INK }}
            >
              <GithubIcon size={16} /> SOURCE
            </a>
            <Link
              to="/projects"
              className="font-pixel text-sm inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white/80 hover:border-white/50 transition-colors"
            >
              <ArrowLeft size={16} /> ALL PROJECTS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── destinations ───────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <SectionHead eyebrow="SIX DESTINATIONS" title="WHERE IT GOES" accent={PINK} />
        <div className="space-y-20 sm:space-y-28">
          {destinations.map((d, i) => (
            <motion.article
              key={d.city}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${i % 2 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className="lg:[direction:ltr] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={d.img} alt={`${d.city} scene`} className="pixelated w-full" />
                <span
                  className="font-pixel absolute top-4 left-4 text-[10px] px-3 py-2 rounded-md"
                  style={{ background: INK + "D9", color: d.accent }}
                >
                  {d.tag}
                </span>
              </div>
              <div className="lg:[direction:ltr]">
                <h3 className="font-pixel text-4xl sm:text-5xl mb-5" style={{ color: d.accent }}>
                  {d.city}
                </h3>
                <p className="text-white/65 leading-relaxed max-w-lg">{d.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ───────────────── the cast ───────────────── */}
      <section className="border-y border-white/10" style={{ background: "#0F0D1A" }}>
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <SectionHead
            eyebrow="IT PACKS A BAG"
            title="THE CAT CHANGES"
            accent={TEAL}
            sub="Each city gets its own cat — drawn from scratch, outfit and all, not a hat pasted on top."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {cast.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 p-6 flex flex-col items-center text-center hover:border-white/25 transition-colors"
                style={{ background: INK }}
              >
                <img src={c.img} alt={c.name} className="pixelated h-24 w-auto mb-5" />
                <h4 className="font-pixel text-xs mb-3" style={{ color: TEAL }}>{c.name}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{c.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── under the hood ───────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <SectionHead eyebrow="150KB OF PIXELS, 80KB OF ROOM" title="UNDER THE HOOD" accent={AMBER} />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {specs.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="border-t border-white/15 pt-6"
            >
              <h4 className="font-pixel text-xs mb-4" style={{ color: AMBER }}>{s.k}</h4>
              <p className="text-white/60 leading-relaxed text-sm">{s.v}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────── outro ───────────────── */}
      <section className="relative overflow-hidden border-t border-white/10">
        <img src="/deskbuddy/cairo.png" alt="" className="pixelated absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${INK}, ${INK}B3)` }} />
        <div className="relative max-w-3xl mx-auto px-6 py-28 text-center">
          <h2 className="font-pixel text-3xl sm:text-5xl mb-8" style={{ color: PINK }}>
            NO UPKEEP
          </h2>
          <p className="text-white/60 leading-relaxed mb-12 max-w-xl mx-auto">
            It never asks for anything. It doesn't get hungry, it can't die, and it
            won't nag you if you ignore it for a week. It just sits there and
            travels — and every so often it does something you didn't know it did.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={DESKBUDDY_GITHUB} target="_blank" rel="noreferrer"
              className="font-pixel text-sm inline-flex items-center gap-2 px-6 py-4 rounded-xl transition-transform hover:-translate-y-0.5"
              style={{ background: TEAL, color: INK }}
            >
              <GithubIcon size={16} /> READ THE SOURCE <ArrowUpRight size={14} />
            </a>
            <Link
              to="/projects"
              className="font-pixel text-sm inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white/80 hover:border-white/50 transition-colors"
            >
              <ArrowLeft size={16} /> BACK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, accent, sub }: {
  eyebrow: string; title: string; accent: string; sub?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-14 sm:mb-20"
    >
      <p className="font-pixel text-[10px] tracking-[0.25em] mb-5" style={{ color: accent }}>
        {eyebrow}
      </p>
      <h2 className="font-pixel text-3xl sm:text-5xl text-white/90">{title}</h2>
      {sub && <p className="text-white/50 mt-6 max-w-lg leading-relaxed">{sub}</p>}
    </motion.header>
  );
}
