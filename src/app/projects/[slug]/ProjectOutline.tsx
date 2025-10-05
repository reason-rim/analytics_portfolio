"use client";

import { useState } from "react";

interface TocSubHeading {
  heading: string;
  id: string;
}

interface TocSection {
  heading: string;
  id: string;
  displayIndex: number;
  subHeadings: TocSubHeading[];
}

interface ProjectOutlineProps {
  sections: TocSection[];
}

export default function ProjectOutline({ sections }: ProjectOutlineProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getKeyForSection = (section: TocSection) => `toc-${section.id}`;

  return (
    <nav className="rounded-3xl border border-slate-100 bg-white/70 p-6 text-sm text-slate-600 shadow-sm backdrop-panel">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
        Project outline
      </p>
      <ol className="mt-4 space-y-2">
        {sections.map((section) => {
          const key = getKeyForSection(section);
          const hasSubSections = section.subHeadings.length > 0;
          const isOpen = openSections[key] ?? false;

          return (
            <li key={section.id} className="project-toc-item">
              {hasSubSections ? (
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 text-left"
                    onClick={() => toggleSection(key)}
                  >
                    <span className="rounded-full bg-primary-soft/60 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                      {String(section.displayIndex).padStart(2, "0")}
                    </span>
                    <span className="flex-1 transition">{section.heading}</span>
                    <span
                      className="text-primary transition-transform"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <ul className="toc-sublist mt-2 space-y-1 text-xs text-slate-500">
                      {section.subHeadings.map((sub) => (
                        <li key={sub.id} className="flex items-center gap-2 pl-7">
                          <span className="mt-[2px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <a href={`#${sub.id}`} className="transition hover:text-primary">
                            {sub.heading}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary-soft/60 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                    {String(section.displayIndex).padStart(2, "0")}
                  </span>
                  <a href={`#${section.id}`} className="transition hover:text-primary">
                    {section.heading}
                  </a>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
