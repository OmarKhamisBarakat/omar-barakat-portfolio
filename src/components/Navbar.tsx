import { Link, useLocation } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { PINK, INK } from "./ui";

const navLinks = [
  { name: "PROJECTS", path: "/projects" },
  { name: "EXPERIENCE", path: "/experience" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

/** The nuts-and-bolts brand mark (matches the favicon). */
const Mark = () => (
  <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden>
    <g stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
      <g transform="translate(29 30) rotate(-38)">
        <rect x="-2" y="-5" width="19" height="10" rx="1.5" fill="#7d97b4" />
        <polygon points="-2,-9 -7.5,-9 -11.5,0 -7.5,9 -2,9" fill="#adc3da" />
      </g>
      <g transform="translate(18 18)">
        <polygon points="0,-15.5 13.4,-7.75 13.4,7.75 0,15.5 -13.4,7.75 -13.4,-7.75" fill={PINK} />
        <circle cx="0" cy="0" r="6.6" fill={INK} />
      </g>
    </g>
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="transition-transform group-hover:rotate-12"><Mark /></span>
          <span className="font-bold tracking-tight text-lg text-white">Omar Khamis</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.path ||
              (link.path === "/projects" && pathname.startsWith("/projects"));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-pixel text-[11px] tracking-[0.15em] transition-colors",
                  active ? "text-pink" : "text-white/55 hover:text-white"
                )}
                style={active ? { color: PINK } : undefined}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="/Omar_Khamis_Resume.pdf"
            download="Omar_Khamis_Resume.pdf"
            className="font-pixel text-[11px] tracking-[0.1em] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-transform hover:-translate-y-0.5"
            style={{ background: PINK, color: INK }}
          >
            <Download size={14} /> CV
          </a>
        </div>

        <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="md:hidden glass border-t border-white/10 px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
                className="font-pixel text-sm tracking-[0.12em] text-white/80">
                {link.name}
              </Link>
            ))}
            <a href="/Omar_Khamis_Resume.pdf" download
              className="font-pixel text-sm inline-flex items-center gap-2" style={{ color: PINK }}>
              <Download size={16} /> DOWNLOAD CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
