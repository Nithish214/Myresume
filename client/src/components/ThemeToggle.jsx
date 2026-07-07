import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative h-9 w-9 flex items-center justify-center rounded-full
                 border border-slate-300 dark:border-white/15
                 text-graphite dark:text-slate-200
                 hover:border-signal hover:text-signal-dark dark:hover:text-signal
                 transition-colors duration-200"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
