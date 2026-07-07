import { useReveal } from "../hooks/useReveal.js";
import { experience } from "../data/resumeData.js";

function ExperienceCard({ job }) {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="reveal relative pl-10 sm:pl-12 pb-14 last:pb-0">
      {/* Timeline rail + node - dates carry real information here, so the
          timeline form (unlike a generic numbered list) is earned */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-signal bg-paper dark:bg-ink"
      />
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-5 bottom-0 w-px bg-slate-200 dark:bg-white/10"
      />

      <div className="card card-hover p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-graphite dark:text-white">
            {job.role}
          </h3>
          {job.current && (
            <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-signal-dark dark:text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-dark dark:bg-signal" />
              current
            </span>
          )}
        </div>

        <p className="font-mono text-sm text-slate-500 dark:text-slate-400 mb-5">
          {job.company} · {job.location} · {job.dates}
        </p>

        <ul className="space-y-2.5">
          {job.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm sm:text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-dark dark:bg-signal" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span key={tech} className="tag-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const headerRef = useReveal();

  return (
    <section id="experience" className="px-6 sm:px-8 py-20 sm:py-28 bg-slate-50/60 dark:bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="reveal mb-14">
          <p className="section-eyebrow">// Experience log</p>
          <h2 className="section-heading">Where I've operated</h2>
        </div>

        <div className="max-w-3xl">
          {experience.map((job) => (
            <ExperienceCard key={job.company} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
