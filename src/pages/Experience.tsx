import { Award, BadgeCheck } from "lucide-react";
import { SectionHead, Reveal, Chip, PINK, TEAL, AMBER, accentAt } from "../components/ui";

const experience = [
  {
    title: "Data Annotator (Contract)", company: "DataAnnotation Tech",
    period: "MAY 2025 – FEB 2026", location: "Remote",
    bullets: [
      "Annotated NLP datasets used to train large language models.",
      "Gave contextual feedback in RLHF (reinforcement learning from human feedback) workflows.",
      "Contributed to human-in-the-loop evaluation pipelines that improved model accuracy.",
    ],
  },
  {
    title: "Engineering Intern", company: "Deutschland Technologies",
    period: "JUN 2025 – AUG 2025", location: "Cairo, Egypt",
    bullets: [
      "Designed fire-alarm systems — sensors, panels and output devices.",
      "Produced technical blueprints in AutoCAD.",
      "Assisted project planning and scheduling in Oracle Primavera.",
    ],
  },
];

const achievements = [
  { title: "Best Member — Content Creation Team", org: "Hult Prize · Zewail City", accent: PINK },
  { title: "Participant — UGRF Competition 2025", org: "20th Edition", accent: TEAL },
];

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
      <SectionHead eyebrow="THE ROAD SO FAR" title="EXPERIENCE" accent={PINK} />

      <div className="space-y-4">
        {experience.map((item, i) => {
          const accent = accentAt(i);
          return (
            <Reveal key={item.company} delay={i * 0.08}>
              <div className="relative card rounded-2xl p-7 pl-9">
                <span className="absolute left-0 top-7 bottom-7 w-[3px] rounded-full" style={{ background: accent }} />
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-5">
                  <div>
                    <h3 className="font-pixel text-base sm:text-lg text-white/90">{item.title}</h3>
                    <p className="mt-1 text-sm" style={{ color: accent }}>{item.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <Chip accent={accent}>{item.period}</Chip>
                    <span className="text-white/40 text-xs mt-2">{item.location}</span>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="text-white/55 text-sm leading-relaxed flex gap-3">
                      <span style={{ color: accent }} className="mt-0.5 shrink-0">▸</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* achievements + certs */}
      <div className="mt-20">
        <SectionHead eyebrow="ALONG THE WAY" title="HONOURS" accent={TEAL} />
        <div className="grid md:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="card rounded-2xl p-6 flex items-start gap-4">
                <Award size={20} style={{ color: a.accent }} className="mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-white">{a.title}</h3>
                  <p className="text-sm mt-1" style={{ color: a.accent }}>{a.org}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.12} className="md:col-span-2">
            <div className="card rounded-2xl p-6 flex items-start gap-4" style={{ borderColor: `${AMBER}33` }}>
              <BadgeCheck size={20} style={{ color: AMBER }} className="mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white">Cross-Platform Flutter Development — Professional Certificate</h3>
                <p className="text-sm mt-1" style={{ color: AMBER }}>DEPI Initiative · Expected 2026</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
