import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { ExternalLink, Tag } from "lucide-react";
import { cn } from "../lib/utils";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const projects = [
  {
    title: "MarkIt Marketing Agency Website",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["ASP.NET", "C#", "HTML"],
    description: "Developed a full production website for a marketing agency. Implemented backend logic with ASP.NET and responsive frontend components.",
    github: "#",
    live: "#"
  },
  {
    title: "Flutter Mobile Application",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    tags: ["Flutter", "Dart"],
    description: "Cross-platform mobile application in active development. Implementing scalable UI components and modern mobile architecture patterns.",
    github: "#",
    live: "#"
  },
  {
    title: "Python Sudoku Solver",
    category: "Algorithms",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&q=80&w=800",
    tags: ["Python"],
    description: "Implemented a backtracking algorithm capable of solving any valid Sudoku puzzle efficiently with optimized constraint propagation.",
    github: "#",
    live: "#"
  },
  {
    title: "C++ Interactive Game",
    category: "Software",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    tags: ["C++", "OOP"],
    description: "Designed a graphical interactive game using object-oriented programming principles with clean architecture and modular design.",
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ["All", ...Array.from(tags).sort()];
  }, []);

  const filteredProjects = projects.filter(p => 
    filter === "All" || p.tags.includes(filter) || p.category === filter
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">Selected Works</h1>
        <p className="text-on-surface-variant max-w-xl">
          From full-stack web applications to algorithmic solvers and cross-platform mobile development.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-12 pb-4 overflow-x-auto">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
              filter === tag 
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:border-primary/50"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass-panel rounded-3xl overflow-hidden ambient-shadow flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={project.title}
                />
                <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {project.category}
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-on-surface-variant mb-6 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      <Tag size={8} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                    <GithubIcon size={18} /> Source
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                    <ExternalLink size={18} /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
