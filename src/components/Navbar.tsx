import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const navLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-on-surface hover:scale-105 transition-transform">
          Omar Khamis
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-on-surface/5 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a 
            href="/Omar_Khamis_Resume.pdf" 
            download="Omar_Khamis_Resume.pdf"
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all cursor-pointer"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-t border-outline-variant/30 px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="/Omar_Khamis_Resume.pdf" 
              download="Omar_Khamis_Resume.pdf"
              className="flex items-center gap-2 text-primary font-bold"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
