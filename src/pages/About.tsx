import { motion } from "motion/react";
import { Cpu, Globe, GraduationCap, Heart, Zap } from "lucide-react";

const technicalSkills = {
  "Languages": ["C#", "C++", "Python", "C", "MATLAB", "Dart"],
  "Computer Science": ["Data Structures", "Algorithms", "OOP", "Machine Learning"],
  "Databases": ["SQL", "Database Design", "SQLite", "NoSQL"],
  "Frameworks / Tech": ["Flutter", "ASP.NET", "HTML", "Bootstrap"],
  "Tools": ["Git", "AutoCAD", "LabVIEW", "CST Studio", "Oracle Primavera"]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">The Vision.</h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              I am Omar Khamis Abdelhafiez Barakat, a Communications & Information Engineering 
              student at Zewail City of Science and Technology. I specialize in software engineering, 
              data annotation for AI/ML, and cross-platform mobile development.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { icon: <Cpu className="text-primary" />, title: "Software Engineering", desc: "Full-stack development with ASP.NET, C#, and responsive web design." },
              { icon: <Globe className="text-primary" />, title: "Cross-Platform Mobile", desc: "Building scalable Flutter applications with modern Dart architecture." },
              { icon: <GraduationCap className="text-primary" />, title: "Academic Excellence", desc: "CIE (ABET accredited) with coursework in ML, OS, DSA, and Security." },
              { icon: <Heart className="text-primary" />, title: "AI & Data", desc: "NLP dataset annotation and RLHF workflows for large language models." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex gap-4 items-start"
              >
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Technical Skills by Category */}
          {Object.entries(technicalSkills).map(([category, skills]) => (
            <div key={category} className="glass-panel rounded-3xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="text-primary" size={18} /> {category}
              </h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(173, 198, 255, 0.3)" }}
                    className="px-3 py-1.5 rounded-full font-mono text-sm bg-primary/10 text-primary border border-primary/20 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}

          {/* Education */}
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="text-primary" size={18} /> Education
            </h2>
            <div>
              <h3 className="font-bold">Zewail City of Science & Technology</h3>
              <p className="text-on-surface-variant text-sm">B.Sc. Communication and Information Engineering (ABET accredited)</p>
              <p className="text-primary font-mono text-xs mt-2">Expected 2027</p>
              <p className="text-on-surface-variant text-xs mt-2 leading-relaxed">
                <span className="font-medium text-on-surface">Relevant Coursework:</span> Data Structures & Algorithm Analysis, Machine Learning, Operating Systems, Database Management Systems, Information Security, Discrete Mathematics, Digital Design & Computer Architecture
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
