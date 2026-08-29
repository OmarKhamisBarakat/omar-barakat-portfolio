import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, PINK, TEAL, AMBER } from "./ui";

export default function Footer() {
  const links = [
    { icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/omar-barakat-82b1a62a6/", label: "LinkedIn", accent: TEAL },
    { icon: <GithubIcon size={18} />, href: "https://github.com/OmarKhamisBarakat", label: "GitHub", accent: PINK },
    { icon: <Mail size={18} />, href: "mailto:omar.khamis.barakat@gmail.com", label: "Email", accent: AMBER },
  ];
  return (
    <footer className="relative border-t border-white/10 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-pixel text-sm tracking-[0.15em] text-white/90">OMAR KHAMIS</h3>
          <p className="text-white/40 text-sm mt-2">Communications &amp; Information Engineering · Cairo</p>
        </div>

        <div className="flex gap-3">
          {links.map((l) => (
            <a
              key={l.label} href={l.href} aria-label={l.label}
              target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="w-10 h-10 grid place-items-center rounded-xl border border-white/12 text-white/60 hover:text-white hover:-translate-y-0.5 transition-all"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${l.accent}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            >
              {l.icon}
            </a>
          ))}
        </div>

        <p className="font-pixel text-[9px] tracking-[0.2em] text-white/30">
          © {new Date().getFullYear()} · BUILT FROM SCRATCH
        </p>
      </div>
    </footer>
  );
}
