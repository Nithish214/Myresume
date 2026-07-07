import { GraduationCap, BadgeCheck } from "lucide-react";
import { useReveal } from "../hooks/useReveal.js";
import { education, certifications } from "../data/resumeData.js";

export default function Education() {
  const headerRef = useReveal();
  const eduRef = useReveal();
  const certRef = useReveal();

  return (
    <section id="education" className="px-6 sm:px-8 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="reveal mb-14">
          <h2 className="section-heading">Foundation</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Education */}
          <div ref={eduRef} className="reveal">
            <h3 className="flex items-center gap-2 font-display font-semibold text-lg text-graphite dark:text-white mb-5">
              <GraduationCap size={20} className="text-signal-dark dark:text-signal" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.school} className="card p-5">
                  <p className="font-display font-semibold text-graphite dark:text-white">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {edu.school}
                  </p>
                  <p className="font-mono text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {edu.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div ref={certRef} className="reveal">
            <h3 className="flex items-center gap-2 font-display font-semibold text-lg text-graphite dark:text-white mb-5">
              <BadgeCheck size={20} className="text-signal-dark dark:text-signal" />
              Certifications
            </h3>
            <div className="card p-5">
              <ul className="divide-y divide-slate-100 dark:divide-white/10">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="py-3 first:pt-0 last:pb-0 text-sm text-slate-700 dark:text-slate-300 flex gap-3"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-dark dark:bg-signal" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
