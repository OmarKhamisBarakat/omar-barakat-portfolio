import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="text-xl font-bold tracking-tighter">Omar Khamis</h3>
          <p className="text-on-surface-variant text-sm mt-1">Communications & Information Engineering</p>
        </div>

        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/omar-barakat-82b1a62a6/" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com/OmarKhamisBarakat" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
          <a href="mailto:omar.khamis.barakat@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>

        <p className="text-on-surface-variant text-xs font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} Omar Khamis. Precision Engineered.
        </p>
      </div>
    </footer>
  );
}
