import { motion } from "motion/react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto link with form data
    const mailtoLink = `mailto:omar.khamis.barakat@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Let's Connect.</h1>
          <p className="text-xl text-on-surface-variant mb-12 max-w-lg leading-relaxed">
            Interested in collaboration, internship opportunities, or just want to talk tech? Drop a message.
          </p>

          <div className="space-y-6">
            {[
              { icon: <Mail className="text-primary" />, label: "omar.khamis.barakat@gmail.com", href: "mailto:omar.khamis.barakat@gmail.com" },
              { icon: <MapPin className="text-primary" />, label: "Cairo, Egypt" },
              { icon: <Phone className="text-primary" />, label: "+20 102 730 4125" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                {item.icon}
                {item.href ? (
                  <a href={item.href} className="text-on-surface-variant hover:text-primary transition-colors">{item.label}</a>
                ) : (
                  <span className="text-on-surface-variant">{item.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-12">
            <a href="https://github.com/" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">Message</label>
            <textarea
              rows={5}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
          >
            <Send size={18} /> Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
}
