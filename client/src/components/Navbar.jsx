import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks, profile } from "../data/resumeData.js";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Adds a background/shadow once the user scrolls past the hero, so the
  // nav reads clearly against whatever content is behind it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/90 dark:bg-ink/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo: a status dot + initials, echoing the "system online" motif
            used throughout the site (see Hero.jsx for the full status panel) */}
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-medium text-graphite dark:text-white"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-75 animate-pulseRing" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-dark dark:bg-signal" />
          </span>
          {profile.name.split(" ").map((n) => n[0]).join("")}
          {/* <span className="text-slate-400 dark:text-slate-500"></span> */}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-signal-dark dark:hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/admin"
            className="font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-signal-dark dark:hover:text-signal transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile: theme toggle always visible, menu button opens the sheet */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-300 dark:border-white/15 text-graphite dark:text-white"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu sheet */}
      {isOpen && (
        <div className="md:hidden bg-paper dark:bg-ink border-t border-slate-200 dark:border-white/10 px-6 py-4">
          <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-slate-600 dark:text-slate-300 hover:text-signal-dark dark:hover:text-signal"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                onClick={closeMenu}
                className="block text-slate-400 hover:text-signal-dark dark:hover:text-signal"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
