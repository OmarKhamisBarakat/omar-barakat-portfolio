import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";
import { DESKBUDDY_GITHUB } from "./DeskBuddy";
import {
  SectionHead, Chip, GithubIcon, PINK, AMBER, INK, accentAt,
} from "../components/ui";

type Project = {
  title: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
  github: string;
  live: string;
  internal?: boolean;
  liveLabel?: string;
  pixelated?: boolean;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "DeskBuddy — Pixel Travel Buddy",
    category: "Embedded Systems",
    image: "/deskbuddy/miami.png",
    pixelated: true, featured: true,
    tags: ["ESP32", "C++", "Python", "Embedded", "BLE"],
    description: "An ESP32 desk companion: a pixel cat that flies between six cities when you tap RFID boarding-pass cards. The 320×240 panel is bigger than the heap, so nothing is ever buffered — every frame is dirty rectangles composed on the fly. Doubles as a Bluetooth media remote.",
    github: DESKBUDDY_GITHUB, live: "/projects/desk-buddy", internal: true, liveLabel: "CASE STUDY",
  },
  { title: "MarkIt Marketing Agency Website", category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["ASP.NET", "C#", "HTML"],
    description: "A full production website for a marketing agency, built end to end in ASP.NET and C#.",
    github: "#", live: "#" },
  { title: "Flutter Mobile Application", category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    tags: ["Flutter", "Dart"],
    description: "A cross-platform mobile application built with Flutter and a modern Dart architecture.",
    github: "#", live: "#" },
  { title: "Autonomous Safety Car", category: "Cyber-Physical",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "Embedded", "Flask", "TensorFlow Lite"],
    description: "A layered safety vehicle: PIC16F877A motion control, a Raspberry Pi UI, and TensorFlow Lite keyword spotting on constrained hardware.",
    github: "#", live: "#" },
  { title: "ESP32 Digital Synthesizer", category: "Embedded Audio",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    tags: ["ESP32", "C++", "DSP"],
    description: "A real-time digital synth on ESP32 — multi-waveform audio, hardware controls, and DSP squeezed under tight memory.",
    github: "#", live: "#" },
  { title: "Plant Disease Detection", category: "Computer Vision",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "TensorFlow", "OpenCV"],
    description: "A CNN leaf classifier with preprocessing, augmentation, and confusion-matrix evaluation.",
    github: "#", live: "#" },
  { title: "Python Sudoku Solver", category: "Algorithms",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&q=80&w=800",
    tags: ["Python"],
    description: "A backtracking solver that clears any valid Sudoku efficiently.",
    github: "#", live: "#" },
  { title: "C++ Interactive Game", category: "Software",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    tags: ["C++", "OOP"],
    description: "A graphical game designed around object-oriented principles.",
    github: "#", live: "#" },
  { title: "MLE & Estimator Distributions", category: "Statistics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "NumPy", "Monte Carlo"],
    description: "Derived OLS/WLS as MLEs and validated their distributions with 10,000-trial Monte Carlo runs on real wage-age data.",
    github: "#", live: "#" },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags).sort()];
  }, []);

  const filtered = projects.filter((p) => filter === "All" || p.tags.includes(filter) || p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
      <SectionHead
        eyebrow="SELECTED WORK"
        title="THE BUILD LOG"
        accent={PINK}
        sub="Web apps, embedded firmware, machine-learning pipelines and algorithmic solvers — a spread of what I've shipped and studied."
      />

      {/* filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {allTags.map((tag) => (
          <button
            key={tag} onClick={() => setFilter(tag)}
            className={cn(
              "font-pixel text-[10px] tracking-wider px-3.5 py-2 rounded-lg transition-all cursor-pointer border",
              filter === tag ? "" : "text-white/50 border-white/12 hover:text-white hover:border-white/30"
            )}
            style={filter === tag ? { background: PINK, borderColor: PINK, color: INK } : undefined}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => {
            const accent = p.featured ? AMBER : accentAt(i);
            return (
              <motion.article
                layout key={p.title}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, delay: i * 0.04 }}
                className={cn("group card rounded-2xl overflow-hidden flex flex-col", p.featured && "md:col-span-2")}
              >
                <div className={cn("relative overflow-hidden", p.featured ? "h-72 sm:h-80" : "h-56")}>
                  <img
                    src={p.image} alt={p.title}
                    className={cn("w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", p.pixelated && "pixelated")}
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${INK}E6, transparent 55%)` }} />
                  <span className="font-pixel absolute top-4 left-4 text-[9px] px-2.5 py-1.5 rounded-md" style={{ background: `${INK}D9`, color: accent }}>
                    {p.category.toUpperCase()}
                  </span>
                </div>

                <div className="p-7 flex-grow flex flex-col">
                  <h3 className="font-pixel text-lg sm:text-xl mb-3 text-white/90">{p.title}</h3>
                  <p className="text-white/55 mb-6 text-sm leading-relaxed flex-grow">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tags.map((t) => <Chip key={t} accent={accent}>{t}</Chip>)}
                  </div>
                  <div className="flex gap-5 mt-auto font-pixel text-[11px]">
                    {p.github !== "#" && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <GithubIcon size={15} /> SOURCE
                      </a>
                    )}
                    {p.internal ? (
                      <Link to={p.live} className="inline-flex items-center gap-2 transition-colors" style={{ color: accent }}>
                        {p.liveLabel ?? "DEMO"} <ArrowUpRight size={13} />
                      </Link>
                    ) : p.live !== "#" ? (
                      <a href={p.live} className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        {p.liveLabel ?? "DEMO"} <ArrowUpRight size={13} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
