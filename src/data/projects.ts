export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  teaser: string[];
  thumbnail: string;
  heroImage: string;
  metrics: ProjectMetric[];
  tools: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "marketing-mix-dashboard",
    title: "Marketing Mix Model Dashboard",
    tagline: "Forecasting campaign ROI with a transparent MMM and self-serve insights panel",
    summary:
      "Built a probabilistic marketing mix model to explain channel performance and guided budget reallocation that unlocked a projected 18% lift in incremental revenue.",
    teaser: [
      "Unified 3 years of media spend, impressions, and conversion data into an automated warehouse model",
      "Visualized elasticities and diminishing returns with interactive scenario sliders",
      "Recommended spend shifts that produced a projected +18% incremental revenue",
    ],
    thumbnail: "/projects/marketing-mix-dashboard.svg",
    heroImage: "/projects/marketing-mix-dashboard.svg",
    metrics: [
      { label: "Incremental lift", value: "+18%" },
      { label: "Channels modeled", value: "9" },
      { label: "Time to refresh", value: "15 min" },
    ],
    tools: ["Python", "Prophet", "BigQuery", "dbt", "Power BI"],
    links: [
      {
        label: "Open dashboard walkthrough",
        href: "https://example.com/mmm-dashboard",
        external: true,
      },
      {
        label: "Read technical write-up",
        href: "https://example.com/mmm-case-study",
        external: true,
      },
    ],
    sections: [
      {
        heading: "Business context",
        body:
          "A subscription brand needed clarity on what mix of channels was driving incremental conversions after doubling their media budget. Historic reporting tracked last-touch conversions only, obscuring how upper-funnel channels contributed to paid search and direct traffic.",
      },
      {
        heading: "What I did",
        body:
          "I engineered a clean weekly dataset across spend, impressions, and conversions, and parameterized a Bayesian marketing mix model with ad-stock and diminishing return priors. I productionized refreshes with dbt and surfaced the outputs in Power BI with scenario planning controls.",
        bullets: [
          "Reconciled siloed spend logs and impression exports with automated dbt models",
          "Configured ad-stock and saturation priors by channel to capture lag and decay",
          "Designed an interactive dashboard that simulates budget shifts and projects revenue",
        ],
      },
      {
        heading: "Impact",
        body:
          "Finance and Growth reallocated 12% of quarterly spend toward the three highest ROI channels, forecasted to raise incremental revenue by 18%. The dashboard became the weekly source of truth for planning meetings and reduced ad-hoc analysis requests by 60%.",
      },
    ],
  },
  {
    slug: "customer-retention-health",
    title: "Customer Retention Health Monitor",
    tagline: "Diagnosing churn drivers and segment-level risk for a B2C marketplace",
    summary:
      "Created a live retention cockpit that spots emerging churn signals and guides lifecycle messaging for a marketplace serving 250K monthly active customers.",
    teaser: [
      "Clustered behavioral segments to tailor retention incentives",
      "Modeled churn risk with explainable features surfaced to lifecycle marketing",
      "Automated alerts that flag high-risk cohorts to the CRM team",
    ],
    thumbnail: "/projects/customer-retention-health.svg",
    heroImage: "/projects/customer-retention-health.svg",
    metrics: [
      { label: "MAUs analyzed", value: "250K" },
      { label: "At-risk cohort drop", value: "-22%" },
      { label: "Alert latency", value: "<4 hrs" },
    ],
    tools: ["SQL", "dbt", "Looker Studio", "Python", "scikit-learn"],
    links: [
      {
        label: "See retention dashboard",
        href: "https://example.com/retention-dashboard",
        external: true,
      },
    ],
    sections: [
      {
        heading: "Business context",
        body:
          "Marketplace retention slipped after a pricing change. Leadership wanted early warning signals and clarity on which customer behaviors predicted churn so lifecycle marketing could intervene quickly.",
      },
      {
        heading: "What I did",
        body:
          "I defined an event-driven data model, created behavior clusters, and trained a gradient boosting classifier with SHAP explanations. I piped the scores into Looker Studio and built a retention health dashboard with automated Slack alerts for high-risk cohorts.",
        bullets: [
          "Modeled lifecycle stages in SQL/dbt with clear state transitions",
          "Segmented users via k-prototypes clustering to personalize messaging",
          "Surfaced SHAP explanations directly beside each at-risk segment",
        ],
      },
      {
        heading: "Impact",
        body:
          "Lifecycle marketing launched targeted win-back campaigns that reduced churn in the two riskiest cohorts by 22%. Leadership gained a 360° retention view that informs weekly standups and roadmap prioritization.",
      },
    ],
  },
  {
    slug: "product-experimentation-insights",
    title: "Product Experimentation Insights Hub",
    tagline: "Making A/B tests discoverable and decision-ready for product managers",
    summary:
      "Centralized experiment tracking with a reproducible analysis template and storytelling dashboard that helped product teams adopt evidence-based launches.",
    teaser: [
      "Standardized metric guardrails and uplift calculators across product squads",
      "Automated Jupyter templates that output narrative-ready experiment briefs",
      "Increased experiment adoption by surfacing quick wins and historical learnings",
    ],
    thumbnail: "/projects/product-experimentation-insights.svg",
    heroImage: "/projects/product-experimentation-insights.svg",
    metrics: [
      { label: "Experiments logged", value: "+45%" },
      { label: "Time to analyze", value: "-60%" },
      { label: "Teams onboarded", value: "6" },
    ],
    tools: ["Python", "Pandas", "SQL", "Amplitude", "Tableau"],
    links: [
      {
        label: "View experiment hub prototype",
        href: "https://example.com/experimentation-hub",
        external: true,
      },
    ],
    sections: [
      {
        heading: "Business context",
        body:
          "Scaling product squads were running ad-hoc tests without consistent guardrails. Leadership needed a single source for experiment status, learnings, and recommended follow-ups.",
      },
      {
        heading: "What I did",
        body:
          "I collaborated with PMs to define success metrics, then automated experiment ingestion from Amplitude into a cleaned warehouse model. I packaged an exploratory Jupyter template and published results to a Tableau dashboard with narrative summaries.",
        bullets: [
          "Designed a metric dictionary and guardrail checks used across squads",
          "Built an experiment backlog view with rollups by product surface",
          "Introduced a storytelling panel highlighting insights and next steps",
        ],
      },
      {
        heading: "Impact",
        body:
          "Experiment volume increased 45% quarter-over-quarter while average analysis time dropped 60%. Product leads now reference the hub before roadmap reviews, improving confidence in go/no-go decisions.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
