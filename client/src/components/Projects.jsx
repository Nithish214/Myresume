import { useReveal } from "../hooks/useReveal.js";
import { projects } from "../data/resumeData.js";

function ProjectCard({ project }) {
  const revealRef = useReveal();
  const slug = project.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div ref={revealRef} className="reveal card card-hover overflow-hidden">
      {/* Terminal-style header - a nod to how an engineer would actually
          reference these projects day to day (a path, not a poster) */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        <span className="ml-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          ~/projects/{slug}
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-xl font-bold text-graphite dark:text-white">
          {project.name}
        </h3>
        <p className="font-mono text-xs uppercase tracking-wide text-signal-dark dark:text-signal mt-1 mb-4">
          {project.tagline}
        </p>

        <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
          {project.description}
        </p>

        <ul className="space-y-2 mb-5">
          {project.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-dark dark:bg-signal" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="tag-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useReveal();

  return (
    <section id="projects" className="px-6 sm:px-8 py-20 sm:py-28 bg-slate-50/60 dark:bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="reveal mb-14 max-w-2xl">
          <h2 className="section-heading">Things I've built</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
