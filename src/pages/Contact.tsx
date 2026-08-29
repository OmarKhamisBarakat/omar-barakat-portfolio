import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import {
  Eyebrow, Reveal, GithubIcon, LinkedinIcon, PINK, TEAL, AMBER, INK,
} from "../components/ui";

const methods = [
  { icon: Mail, accent: PINK, label: "omar.khamis.barakat@gmail.com", href: "mailto:omar.khamis.barakat@gmail.com" },
  { icon: Phone, accent: TEAL, label: "+20 102 730 4125", href: "tel:+201027304125" },
  { icon: MapPin, accent: AMBER, label: "Cairo, Egypt", href: undefined as string | undefined },
];

const socials = [
  { icon: <GithubIcon size={18} />, label: "GITHUB", href: "https://github.com/OmarKhamisBarakat", accent: PINK },
  { icon: <LinkedinIcon size={18} />, label: "LINKEDIN", href: "https://www.linkedin.com/in/omar-barakat-82b1a62a6/", accent: TEAL },
];

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal y={12}><Eyebrow accent={TEAL} className="mb-6">SAY HELLO</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-pixel vice-text leading-[0.95] text-[13vw] sm:text-6xl lg:text-7xl">
              LET'S<br />CONNECT
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 text-lg text-white/65 max-w-md leading-relaxed">
              Collaboration, an internship, or just talking tech — the inbox is open.
              The fastest way to reach me is email.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="font-pixel text-xs inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-white/80 hover:-translate-y-0.5 transition-all"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${s.accent}88`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* method cards */}
        <div className="space-y-4">
          {methods.map((m, i) => {
            const inner = (
              <div className="card rounded-2xl p-6 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{ background: `${m.accent}18`, color: m.accent }}>
                  <m.icon size={20} />
                </div>
                <span className="text-white/80 flex-grow break-all">{m.label}</span>
                {m.href && <ArrowUpRight size={16} className="text-white/30 group-hover:text-white transition-colors" />}
              </div>
            );
            return (
              <Reveal key={m.label} delay={i * 0.08}>
                {m.href ? <a href={m.href}>{inner}</a> : inner}
              </Reveal>
            );
          })}

          <Reveal delay={0.28}>
            <a
              href="/Omar_Khamis_Resume.pdf" download
              className="font-pixel text-sm inline-flex w-full justify-center items-center gap-2 px-6 py-4 rounded-2xl transition-transform hover:-translate-y-0.5"
              style={{ background: PINK, color: INK }}
            >
              DOWNLOAD CV
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
