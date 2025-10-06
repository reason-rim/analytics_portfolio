import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import ProjectOutline from "./ProjectOutline";

function createSectionId(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found — Laura Lee",
    };
  }

  return {
    title: `${project.title} | Laura Lee Portfolio`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `https://portfolio.laura-lee/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const tocSections = project.sections.map((section, index) => {
    const sectionId = section.anchor ?? createSectionId(section.heading);
    const html = section.html ?? "";
    const hasSubsections =
      (section.heading.startsWith("5.") || section.heading.startsWith("6.")) && html.length > 0;
    const subHeadings = hasSubsections
      ? Array.from(html.matchAll(/<h4([^>]*)>([\s\S]*?)<\/h4>/gi)).map((match) => {
          const attrString = match[1] ?? "";
          const headingText = (match[2] ?? "").replace(/<[^>]+>/g, "").trim();
          const idMatch = attrString.match(/id="([^"]+)"/i);
          const subId = idMatch ? idMatch[1] : createSectionId(headingText);
          return {
            heading: headingText,
            id: subId,
          };
        })
      : [];

    return {
      heading: section.heading,
      id: sectionId,
      displayIndex: index + 1,
      subHeadings,
    };
  });

  const showSidebar =
    project.slug !== "mall-customer-analytics" &&
    (project.tools.length > 0 || project.links.length > 0);

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 pb-24 pt-12 md:px-8 lg:px-0">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to portfolio
      </Link>

      <header className="flex flex-col gap-8">
        <div className="rounded-3xl border border-slate-100 bg-white/60 p-7 shadow-md backdrop-panel">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.45em] text-primary">
            {project.tagline}
          </p>
          <h1 className="mt-3 font-display text-[2.35rem] font-semibold text-slate-900 md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2.5 max-w-3xl text-[1.05rem] leading-relaxed text-slate-600">
            {project.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-full bg-primary-soft/80 px-4 py-2 text-slate-700"
              >
                <span className="font-semibold text-slate-900">{metric.value}</span>
                <span className="ml-2 uppercase tracking-wider text-xs text-slate-500">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {tocSections.length > 0 && <ProjectOutline sections={tocSections} />}

        <div className="relative aspect-[2075/1200] w-full overflow-hidden border border-slate-100 bg-slate-100">
          <Image
            src={project.heroImage}
            alt={`${project.title} dashboard preview`}
            fill
            className="object-contain"
            priority
          />
        </div>
        {project.heroCaption && (
          <p className="mt-2 text-xs text-slate-500">{project.heroCaption}</p>
        )}
        {project.heroNote && (
          <p className="mt-2 text-xs text-slate-500" dangerouslySetInnerHTML={{ __html: project.heroNote }} />
        )}
      </header>

      <section className="flex flex-col gap-12">
        <div
          className={`grid gap-8 ${
            showSidebar ? "md:grid-cols-[minmax(0,1fr)_240px]" : ""
          }`}
        >
          <div className="space-y-10">
            {project.sections.map((section) => {
              const sectionId = section.anchor ?? createSectionId(section.heading);
              return (
                <article key={section.heading} id={sectionId}>
                  <h2 className="font-display text-2xl font-semibold text-slate-900">
                    {section.heading}
                  </h2>
                  {section.body && (
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {section.body}
                    </p>
                  )}
                  {section.html && (
                    <div
                      className="rich-text mt-4"
                      dangerouslySetInnerHTML={{ __html: section.html }}
                    />
                  )}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>

          {showSidebar && (
            <aside className="flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white/60 p-6 shadow-sm backdrop-panel">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                  Tools & tech
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
              {project.links.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                    Explore more
                  </h3>
                  <div className="mt-3 flex flex-col gap-2">
                    {project.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}
