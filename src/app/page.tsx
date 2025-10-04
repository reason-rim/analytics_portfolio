'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Mail, Github, Linkedin, Phone } from "lucide-react";
import { projects } from "@/data/projects";

const CONTACT_EMAIL = "yourimfirst@gmail.com";
const CONTACT_PHONE = "437-982-5700";
const CONTACT_PHONE_TEL = CONTACT_PHONE.replace(/[^0-9]/g, "");

const contactButtonClasses =
  "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type SocialLink =
  | {
      kind: "link";
      label: string;
      href: string;
      icon: LucideIcon;
      style: string;
    }
  | {
      kind: "action";
      label: string;
      icon: LucideIcon;
      style: string;
    };

const socialLinks: SocialLink[] = [
  {
    kind: "link",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/laura-lee-analytics/",
    icon: Linkedin,
    style: "bg-sky-300 text-white hover:bg-sky-400",
  },
  {
    kind: "action",
    label: "Email",
    icon: Mail,
    style:
      "border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 bg-white",
  },
  {
    kind: "link",
    label: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE_TEL}`,
    icon: Phone,
    style:
      "border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 bg-white",
  },
];

type ProjectCardProps = (typeof projects)[number];

function ProjectCard({
  slug,
  title,
  teaser = [],
  summary,
  thumbnail = "/profile-placeholder.svg",
  metrics = [],
  tools = [],
  links = [],
}: ProjectCardProps) {
  const hasPrimaryMetric = metrics.length > 0;
  const primaryMetric = metrics[0];
  const imageAlt = title || slug || "Project thumbnail";
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100/80 bg-white/85 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row backdrop-panel">
      <div className="relative aspect-[2075/1200] w-full overflow-hidden bg-slate-100 md:w-72">
        <Image
          src={thumbnail}
          alt={imageAlt}
          fill
          className="object-contain transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 18rem, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6">
        <div className="flex flex-col gap-4">
          {hasPrimaryMetric && primaryMetric && (
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
              <span>{primaryMetric.label}</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-600">
                {primaryMetric.value}
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
              Tools &amp; tech
            </span>
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-blue-700"
              >
                {tool}
              </span>
            ))}
            {links[0] && (
              <Link
                href={links[0].href}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
                target={links[0].external ? "_blank" : undefined}
                rel={links[0].external ? "noopener noreferrer" : undefined}
              >
                <span className="font-semibold">Explore more</span>
                <span className="hidden sm:inline">· {links[0].label}</span>
                <ArrowUpRight className="size-3" />
              </Link>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-semibold text-slate-900">
              {title}
            </h3>
            <p className="text-base leading-relaxed text-slate-600">{summary}</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {teaser.map((point) => {
              const match = point.match(/^(Goal|Findings|Actions):\s*(.*)$/);
              return (
                <li key={point} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                  <span>
                    {match ? (
                      <>
                        <strong>{match[1]}:</strong> {match[2]}
                      </>
                    ) : (
                      point
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-500">
            {metrics.slice(1).map((metric) => (
              <span
                key={metric.label}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600"
              >
                <span className="mr-1 text-slate-900">{metric.value}</span>
                {metric.label}
              </span>
            ))}
          </div>
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-sky-300 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
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
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [fadeCopyToast, setFadeCopyToast] = useState(false);
  const toastTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearToastTimers = useCallback(() => {
    toastTimersRef.current.forEach((timer) => clearTimeout(timer));
    toastTimersRef.current = [];
  }, []);

  const handleCopyEmail = useCallback(async () => {
    clearToastTimers();
    let copied = false;

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied && typeof document !== "undefined") {
      const tempInput = document.createElement("input");
      tempInput.value = CONTACT_EMAIL;
      document.body.appendChild(tempInput);
      tempInput.select();
      tempInput.setSelectionRange(0, CONTACT_EMAIL.length);
      try {
        document.execCommand("copy");
        copied = true;
      } catch {
        copied = false;
      }
      document.body.removeChild(tempInput);
    }

    if (!copied) {
      if (typeof window !== "undefined") {
        window.location.href = `mailto:${CONTACT_EMAIL}`;
      }
      return;
    }

    setShowCopyToast(true);
    setFadeCopyToast(false);

    const fadeTimer = setTimeout(() => setFadeCopyToast(true), 2200);
    const hideTimer = setTimeout(() => {
      setShowCopyToast(false);
      setFadeCopyToast(false);
      toastTimersRef.current = [];
    }, 2800);

    toastTimersRef.current = [fadeTimer, hideTimer];
  }, [clearToastTimers]);

  useEffect(() => () => clearToastTimers(), [clearToastTimers]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 md:px-10 lg:px-16">
      <section className="flex flex-col gap-10 rounded-3xl border border-slate-100 bg-white/90 p-10 shadow-md backdrop-panel md:flex-row md:items-center">
        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl ring-4 ring-primary-soft ring-offset-4 ring-offset-white md:mx-0">
          <Image
            src="/profile.jpg"
            alt="Laura Lee headshot"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-5 md:max-w-2xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-primary">
              Junior Data Analyst
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Laura Lee
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              I am a recent graduate with a background in Statistics, Computing, and Teaching, aspiring to grow as a data analyst. This is just the beginning—I will keep adding more projects along the way!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              if (link.kind === "action") {
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={handleCopyEmail}
                    className={`${contactButtonClasses} ${link.style}`}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </button>
                );
              }

              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`${contactButtonClasses} ${link.style}`}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <Icon className="size-4" />
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-6 text-sm text-slate-500">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Focus Areas</p>
              <p className="mt-2 font-medium text-slate-700">
                Statistical Modeling & Experiment Analysis · Data Visualization & Dashboard Design
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tools</p>
              <p className="mt-2 font-medium text-slate-700">
                Excel · SQL · R · Power BI · Tableau · Python
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white/90 p-10 shadow-md backdrop-panel">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                Project Showcase
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Explore the dashboards, retention monitors, and experimentation hubs I crafted&nbsp;to sharpen my own decision-making and analytical skills.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <ProjectCard {...projects[0]} />
          </div>
        </div>
      </section>

      {showCopyToast && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`pointer-events-auto rounded-full border border-blue-200 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-opacity duration-500 ease-out ${fadeCopyToast ? "opacity-0" : "opacity-100"}`}
          >
            Email copied to clipboard: {CONTACT_EMAIL}
          </div>
        </div>
      )}
    </main>
  );
}
