import { MapPin, Mail, Phone, ArrowRight, Download } from "lucide-react";
import { profile, stats } from "../data/resumeData.js";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 sm:px-8 overflow-hidden"
    >
      {/* Ambient background grid - evokes an infra dashboard without being literal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        {/* Left column: identity + CTAs */}
        <div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-extrabold mt-3 text-graphite dark:text-white">
            {profile.name}
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300">
            {profile.headline}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.heroSummary}
          </p>

          {/* Contact meta row */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 hover:text-signal-dark dark:hover:text-signal"
            >
              <Mail size={14} /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-signal-dark dark:hover:text-signal"
            >
              <Phone size={14} /> {profile.phone}
            </a>
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
            <a href={profile.resumeFile} download className="btn-secondary">
              Download Resume <Download size={16} />
            </a>
          </div>
        </div>

        {/* Right column: signature "system status" panel */}
        <div className="card p-6 sm:p-7 relative">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Milestone Achieved
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-signal-dark dark:text-signal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-75 animate-pulseRing" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-dark dark:bg-signal" />
              </span>
              available
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-slate-50 dark:bg-white/5 p-4 border border-slate-100 dark:border-white/5"
              >
                <dt className="font-mono text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold text-graphite dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          </div>
        </div>
      </div>
    </section>
  );
}
