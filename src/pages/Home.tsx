import { motion } from "motion/react";
import { ArrowRight, Cpu, Code2, Camera } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
            Communications & Information Engineering
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
            Omar Khamis<br />
            <span className="text-primary">CIE</span> Portfolio
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mb-12">
            B.Sc. Communication and Information Engineering student at Zewail City of Science and Technology. 
            Bridging software engineering, data structures, and cross-platform development.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="group flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              View Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="px-8 py-4 rounded-full border border-outline-variant hover:bg-on-surface/5 transition-colors">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-24">
        {[
          {
            icon: <Code2 className="text-primary" size={32} />,
            title: "Software Engineering",
            desc: "Full-stack development with ASP.NET, C#, Flutter, and Python. Building production-ready applications."
          },
          {
            icon: <Cpu className="text-primary" size={32} />,
            title: "Data & ML",
            desc: "Machine learning, data structures & algorithms, and NLP dataset annotation for large language models."
          },
          {
            icon: <Camera className="text-primary" size={32} />,
            title: "Cross-Platform Dev",
            desc: "Developing scalable mobile applications with Flutter and Dart, focusing on modern UI architecture."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
            className="glass-panel p-8 rounded-3xl ambient-shadow hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-on-surface-variant">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
