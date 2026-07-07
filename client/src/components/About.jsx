import { useReveal } from "../hooks/useReveal.js";
import { profile } from "../data/resumeData.js";

export default function About() {
  const revealRef = useReveal();

  return (
    <section id="about" className="px-6 sm:px-8 py-20 sm:py-28">
      <div
        ref={revealRef}
        className="reveal max-w-6xl mx-auto grid md:grid-cols-[0.6fr_1fr] gap-10 md:gap-16 items-start"
      >
        <div>
          <p className="section-eyebrow">// About</p>
          <h2 className="section-heading">Profile</h2>
        </div>

        <div className="card p-7 sm:p-9">
          <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {profile.about}
          </p>
        </div>
      </div>
    </section>
  );
}
