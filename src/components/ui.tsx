/* Shared vice-sunset UI kit. One source of truth for the palette, the
   eyebrow→title rhythm, buttons, scroll-reveal and the brand icons, so every
   page carries the same energy as the DeskBuddy case study. */
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export const INK = "#0B0A12";
export const INK2 = "#100E1B";
export const PINK = "#FF4FA3";
export const TEAL = "#45E0D8";
export const AMBER = "#FFB347";
export const ACCENTS = [PINK, TEAL, AMBER];
/** Cycle the three accents so lists alternate colour without hand-assigning. */
export const accentAt = (i: number) => ACCENTS[i % ACCENTS.length];

export const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

/** Scroll-reveal wrapper: fade + rise once, when it enters view. */
export function Reveal({ children, y = 24, delay = 0, className = "" }: {
  children: ReactNode; y?: number; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Small tracked pixel label in an accent — the "eyebrow" over every section. */
export function Eyebrow({ children, accent = PINK, className = "" }: {
  children: ReactNode; accent?: string; className?: string;
}) {
  return (
    <p className={`font-pixel text-[10px] sm:text-xs tracking-[0.28em] ${className}`} style={{ color: accent }}>
      {children}
    </p>
  );
}

/** Eyebrow + big pixel title + optional sub — the section header everywhere. */
export function SectionHead({ eyebrow, title, accent = PINK, sub, center = false }: {
  eyebrow: string; title: string; accent?: string; sub?: string; center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 sm:mb-16 ${center ? "text-center mx-auto" : ""}`}>
      <Eyebrow accent={accent} className={`mb-5 ${center ? "mx-auto" : ""}`}>{eyebrow}</Eyebrow>
      <h2 className="font-pixel text-3xl sm:text-5xl text-white/90 leading-[1.05]">{title}</h2>
      {sub && <p className={`text-white/50 mt-6 max-w-xl leading-relaxed ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </Reveal>
  );
}

type BtnProps = {
  children: ReactNode; accent?: string; variant?: "solid" | "ghost";
  to?: string; href?: string; download?: string; className?: string;
};

/** Pixel-labelled pill button — solid in an accent, or a hairline ghost. */
export function PixelButton({ children, accent = PINK, variant = "solid", to, href, download, className = "" }: BtnProps) {
  const base = "font-pixel text-xs sm:text-sm inline-flex items-center gap-2 px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5";
  const style = variant === "solid"
    ? { background: accent, color: INK }
    : undefined;
  const cls = variant === "solid"
    ? `${base} ${className}`
    : `${base} border border-white/20 text-white/80 hover:border-white/50 ${className}`;
  if (to) return <Link to={to} className={cls} style={style}>{children}</Link>;
  return <a href={href} download={download} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls} style={style}>{children}</a>;
}

/** Accent-tinted tag chip. */
export function Chip({ children, accent = TEAL }: { children: ReactNode; accent?: string }) {
  return (
    <span
      className="font-pixel text-[9px] tracking-wider px-2.5 py-1 rounded-md border"
      style={{ color: accent, borderColor: `${accent}44`, background: `${accent}12` }}
    >
      {children}
    </span>
  );
}
