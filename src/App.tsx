import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import DeskBuddy from "./pages/DeskBuddy";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BuddyConsole from "./pages/BuddyConsole";
import BuddyRemote from "./pages/BuddyRemote";

/** Jump to the top whenever the route changes (SPA nav keeps scroll otherwise). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // Committed dark, in the DeskBuddy vice palette.
  useEffect(() => { document.documentElement.setAttribute("data-theme", "dark"); }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col" style={{ background: "#0B0A12", color: "#EDEBF5" }}>
        {/* Fixed aurora: faint pink/teal/amber glows so no page is flat black. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(60rem 40rem at 12% -8%, rgba(255,79,163,0.16), transparent 60%)," +
              "radial-gradient(52rem 38rem at 92% 4%, rgba(69,224,216,0.12), transparent 60%)," +
              "radial-gradient(48rem 40rem at 60% 108%, rgba(255,179,71,0.10), transparent 60%)",
          }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/desk-buddy" element={<DeskBuddy />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Unlisted BLE pages for the desk buddy, both off the navbar and
                  noindex'd by the pages themselves. /buddy is the one that gets
                  handed to the person who owns the cat; /workshop/buddy is the
                  technical console with firmware updates on it. */}
              <Route path="/buddy" element={<BuddyRemote />} />
              <Route path="/workshop/buddy" element={<BuddyConsole />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
