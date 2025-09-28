import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center text-slate-600">
      <h1 className="font-display text-4xl font-semibold text-slate-900">
        That case study is still under wraps.
      </h1>
      <p>
        The project you were looking for isn&apos;t published yet. Head back to the portfolio to
        explore other analytics stories.
      </p>
      <Link
        href="/"
        className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
      >
        Return to portfolio
      </Link>
    </main>
  );
}
