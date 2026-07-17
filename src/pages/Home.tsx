import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Cpu, Code2, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Eyebrow, PixelButton, Reveal, SectionHead, Chip,
  PINK, TEAL, AMBER, INK, accentAt,
} from "../components/ui";

const disciplines = [
  {
    icon: Code2, accent: PINK, title: "SOFTWARE",
    desc: "Full-stack with ASP.NET, C# and Flutter — production sites and cross-platform apps, built to ship.",
    tags: ["ASP.NET", "C#", "Flutter", "Dart"],
  },
  {
    icon: BrainCircuit, accent: TEAL, title: "DATA & ML",
    desc: "Machine learning, algorithms, and NLP/RLHF dataset work that trains and evaluates large language models.",
    tags: ["Python", "TensorFlow", "RLHF", "NumPy"],
  },
  {
    icon: Cpu, accent: AMBER, title: "EMBEDDED",
    desc: "ESP32 firmware down to the register — no framebuffer, no menus, every pixel and note generated in code.",
    tags: ["ESP32", "C++", "DSP", "BLE"],
  },
];

export default function Home() {
  return (
    <div className="-mt-20">
      {/* ───────────── hero ───────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-20">
          <Reveal y={12}>
            <Eyebrow accent={TEAL} className="mb-6">CIE · ZEWAIL CITY OF SCIENCE &amp; TECHNOLOGY</Eyebrow>
          </Reveal>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-pixel vice-text leading-[0.95] text-[16vw] sm:text-[12vw] lg:text-[9rem]"
          >
            OMAR<br />KHAMIS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-white/70"
          >
            Engineering student who builds across the stack — from ASP.NET web apps
            and Flutter mobile to machine-learning pipelines and ESP32 firmware that
            draws its own world one pixel at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <PixelButton to="/projects" accent={PINK}>
              VIEW WORK <ArrowRight size={16} />
            </PixelButton>
            <PixelButton to="/projects/desk-buddy" variant="ghost">
              THE DESK BUDDY <ArrowUpRight size={14} />
            </PixelButton>
          </motion.div>
        </div>
      </section>

      {/* ───────────── disciplines ───────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <SectionHead eyebrow="WHAT I BUILD" title="THREE LANES" accent={PINK} />
        <div className="grid md:grid-cols-3 gap-5">
          {disciplines.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="card rounded-2xl p-7 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center mb-6"
                  style={{ background: `${d.accent}18`, color: d.accent }}
                >
                  <d.icon size={24} />
                </div>
                <h3 className="font-pixel text-base mb-3" style={{ color: d.accent }}>{d.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed flex-grow">{d.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {d.tags.map((t) => <Chip key={t} accent={d.accent}>{t}</Chip>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── DeskBuddy spotlight ───────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24 sm:pb-32">
        <Reveal>
          <Link
            to="/projects/desk-buddy"
            className="group block relative rounded-3xl overflow-hidden border border-white/10"
          >
            <img
              src="/deskbuddy/tokyo.png" alt="The Desk Buddy in Tokyo at night"
              className="pixelated w-full h-[340px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${INK} 8%, ${INK}88 45%, transparent 78%)` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${INK}CC, transparent 65%)` }} />
            <div className="absolute bottom-0 left-0 p-8 sm:p-12 max-w-2xl">
              <Eyebrow accent={AMBER} className="mb-4">FEATURED · EMBEDDED SYSTEMS</Eyebrow>
              <h3 className="font-pixel text-3xl sm:text-5xl vice-text leading-[1]">DESK BUDDY</h3>
              <p className="text-white/70 mt-5 leading-relaxed">
                A pixel cat that travels six cities on a 320×240 screen when you tap
                RFID cards — no framebuffer, no menus, every sprite generated from code.
              </p>
              <span className="font-pixel text-xs inline-flex items-center gap-2 mt-6 text-white group-hover:gap-3 transition-all">
                READ THE CASE STUDY <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ───────────── contact strip ───────────── */}
      <section className="border-t border-white/10" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <Eyebrow accent={accentAt(1)} className="mb-4">OPEN TO WORK</Eyebrow>
            <h2 className="font-pixel text-2xl sm:text-4xl text-white/90">LET'S BUILD SOMETHING</h2>
          </div>
          <PixelButton to="/contact" accent={TEAL}>GET IN TOUCH <ArrowRight size={16} /></PixelButton>
        </div>
      </section>
    </div>
  );
}
