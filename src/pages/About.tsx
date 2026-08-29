import { Cpu, Globe, GraduationCap, BrainCircuit } from "lucide-react";
import { Eyebrow, SectionHead, Reveal, Chip, PINK, TEAL, AMBER, accentAt } from "../components/ui";

const skills: Record<string, string[]> = {
  "LANGUAGES": ["C#", "C++", "Python", "C", "MATLAB", "Dart"],
  "COMPUTER SCIENCE": ["Data Structures", "Algorithms", "OOP", "Machine Learning"],
  "DATABASES": ["SQL", "Database Design", "SQLite", "NoSQL"],
  "FRAMEWORKS": ["Flutter", "ASP.NET", "HTML", "Bootstrap"],
  "TOOLS": ["Git", "AutoCAD", "LabVIEW", "CST Studio", "Primavera"],
};

const doing = [
  { icon: Cpu, accent: PINK, title: "SOFTWARE ENGINEERING", desc: "Full-stack development with ASP.NET, C# and responsive web." },
  { icon: Globe, accent: TEAL, title: "CROSS-PLATFORM MOBILE", desc: "Scalable Flutter apps on a modern Dart architecture." },
  { icon: BrainCircuit, accent: AMBER, title: "AI & DATA", desc: "NLP annotation and RLHF workflows for large language models." },
  { icon: GraduationCap, accent: PINK, title: "ACADEMICS", desc: "ABET-accredited CIE — ML, OS, DSA, security, architecture." },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* left: the story */}
        <div>
          <SectionHead eyebrow="WHO'S BEHIND IT" title="THE VISION" accent={PINK} />
          <Reveal>
            <p className="text-lg text-white/65 leading-relaxed">
              I'm <span className="text-white">Omar Khamis Barakat</span>, a Communications &amp;
              Information Engineering student at Zewail City. I work across software
              engineering, AI/ML data, and cross-platform mobile — and I'm happiest
              close to the metal, in embedded systems and electronics.
            </p>
          </Reveal>

          <div className="mt-12 space-y-8">
            {doing.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg grid place-items-center shrink-0" style={{ background: `${d.accent}18`, color: d.accent }}>
                    <d.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-pixel text-xs mb-2" style={{ color: d.accent }}>{d.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* right: skills + education */}
        <div className="lg:pt-4">
          <Reveal>
            <Eyebrow accent={TEAL} className="mb-6">THE TOOLKIT</Eyebrow>
          </Reveal>
          <div className="space-y-5">
            {Object.entries(skills).map(([cat, list], i) => (
              <Reveal key={cat} delay={i * 0.05}>
                <div className="card rounded-2xl p-5">
                  <h4 className="font-pixel text-[10px] tracking-wider mb-4" style={{ color: accentAt(i) }}>{cat}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {list.map((s) => <Chip key={s} accent={accentAt(i)}>{s}</Chip>)}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <div className="card rounded-2xl p-6" style={{ borderColor: `${AMBER}33` }}>
                <h4 className="font-pixel text-[10px] tracking-wider mb-4 inline-flex items-center gap-2" style={{ color: AMBER }}>
                  <GraduationCap size={14} /> EDUCATION
                </h4>
                <h3 className="font-bold text-white">Zewail City of Science &amp; Technology</h3>
                <p className="text-white/55 text-sm mt-1">B.Sc. Communication &amp; Information Engineering (ABET accredited)</p>
                <p className="font-pixel text-[10px] mt-3" style={{ color: AMBER }}>EXPECTED 2027</p>
                <p className="text-white/40 text-xs mt-4 leading-relaxed">
                  <span className="text-white/70">Coursework:</span> Data Structures &amp; Algorithms, Machine Learning,
                  Operating Systems, Databases, Information Security, Discrete Math, Digital Design &amp; Computer Architecture.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
