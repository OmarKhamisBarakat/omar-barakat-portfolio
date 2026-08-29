import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MinecraftEditor from "./pages/MinecraftEditor";

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const isSecret = location.pathname.startsWith("/secret") || location.pathname === "/mc-editor";

  if (isSecret) {
    return (
      <Routes>
        <Route path="/secret" element={<MinecraftEditor />} />
        <Route path="/secret/minecraft" element={<MinecraftEditor />} />
        <Route path="/mc-editor" element={<MinecraftEditor />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
