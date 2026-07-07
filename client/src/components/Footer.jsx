import { profile } from "../data/resumeData.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 sm:px-8 py-10 border-t border-slate-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
        <p>
          © {year} {profile.name}. Built with the MERN stack.
        </p>
        <p className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-dark dark:bg-signal" />
          all systems operational
        </p>
      </div>
    </footer>
  );
}
