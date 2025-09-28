import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import { projects } from "@/data/projects";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile",
    icon: Linkedin,
    style: "bg-primary text-white hover:bg-primary/90",
  },
  {
    label: "GitHub",
    href: "https://github.com/your-username",
    icon: Github,
    style:
      "border border-slate-200 text-slate-700 hover:border-primary hover:text-primary bg-white",
  },
  {
    label: "Email",
    href: "mailto:laura.lee@example.com",
    icon: Mail,
    style:
      "border border-slate-200 text-slate-700 hover:border-primary hover:text-primary bg-white",
  },
];

type ProjectCardProps = (typeof projects)[number];

function ProjectCard({
  slug,
  title,
  teaser,
  summary,
  thumbnail,
  metrics,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-soft via-white to-primary-soft/60">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 420px, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.32em]">
            {metrics[0]?.label ?? ""}
          </p>
          <p className="text-sm font-semibold">
            {metrics[0]?.value ?? ""}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-slate-900">
            {title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-slate-600">{summary}</p>
        </div>

        <ul className="space-y-2 text-sm text-slate-600">
          {teaser.map((point) => (
            <li key={point} className="flex items-start gap-2 leading-relaxed">
              <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex gap-3 text-sm text-slate-500">
            {metrics.slice(1).map((metric) => (
              <div key={metric.label} className="rounded-full bg-primary-soft/80 px-4 py-1 text-slate-700">
                <span className="font-medium text-sm text-slate-900">{metric.value}</span>
                <span className="ml-1.5 text-xs uppercase tracking-wider text-slate-500">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            View case study
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 md:px-10 lg:px-16">
      <section className="grid items-start gap-12 rounded-3xl border border-slate-100 bg-white/70 p-10 shadow-md backdrop-panel md:grid-cols-[auto,1fr]">
        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl ring-4 ring-primary-soft ring-offset-4 ring-offset-white md:mx-0">
          <Image
            src="/profile-placeholder.svg"
            alt="Laura Lee headshot"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-primary">
              Junior Data Analyst
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Laura Lee
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              I turn messy data into crisp stories. I specialize in bringing dashboards to life,
              uncovering experimentation insights, and partnering with stakeholders to move key metrics.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon, style }) => (
              <Link
                key={label}
                href={href}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${style}`}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-6 text-sm text-slate-500">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Focus Areas</p>
              <p className="mt-2 font-medium text-slate-700">
                Dashboard design · Experiment analysis · Lifecycle analytics
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tools</p>
              <p className="mt-2 font-medium text-slate-700">
                SQL · Python · Tableau · Power BI · dbt
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
              Project Showcase
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Explore dashboards, retention monitors, and experimentation hubs I designed to help
              teams make decisions faster.
            </p>
          </div>
          <Link
            href="mailto:laura.lee@example.com"
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary md:self-auto"
          >
            Request a walkthrough
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
