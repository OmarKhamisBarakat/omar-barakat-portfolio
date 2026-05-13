import { motion } from "motion/react";

const experience = [
  {
    title: "Data Annotator (Contract)",
    company: "DataAnnotation Tech",
    period: "May 2025 – Feb 2026",
    location: "Remote",
    bullets: [
      "Annotated NLP datasets used to train large language models.",
      "Provided contextual feedback in reinforcement learning from human feedback workflows.",
      "Contributed to human-in-the-loop evaluation pipelines improving model accuracy."
    ]
  },
  {
    title: "Engineering Intern",
    company: "Deutschland Technologies",
    period: "Jun 2025 – Aug 2025",
    location: "Cairo, Egypt",
    bullets: [
      "Designed fire alarm systems including sensors, panels, and output devices.",
      "Produced technical blueprints using AutoCAD.",
      "Assisted in project planning and scheduling using Oracle Primavera."
    ]
  }
];

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold tracking-tighter mb-16">Experience</h1>

      <div className="space-y-16">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative pl-8 border-l-2 border-outline-variant/30"
          >
            <div className="absolute left-[-6px] top-2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(173,198,255,0.8)]" />
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
              <div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-primary font-medium text-lg">{item.company}</p>
              </div>
              <div className="text-right">
                <span className="text-on-surface-variant font-mono text-sm block">{item.period}</span>
                <span className="text-on-surface-variant font-mono text-xs">{item.location}</span>
              </div>
            </div>
            
            <ul className="space-y-3 mt-6">
              {item.bullets.map((bullet, j) => (
                <li key={j} className="text-on-surface-variant leading-relaxed flex gap-3">
                  <span className="text-primary mt-1.5 shrink-0">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-24"
      >
        <h2 className="text-3xl font-bold tracking-tighter mb-10">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Best Member – Content Creation Team", org: "Hult Prize (Zewail City)" },
            { title: "Participant – UGRF Competition 2025", org: "20th Edition" }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-primary text-sm font-mono mt-1">{item.org}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold tracking-tighter mb-10">Certifications</h2>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-bold text-lg">Cross Platform Flutter Development Professional Certificate</h3>
          <p className="text-primary text-sm font-mono mt-1">DEPI Initiative · Expected 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
