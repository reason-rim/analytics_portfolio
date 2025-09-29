import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Laura Lee | Data Analyst Portfolio",
  description:
    "Analytics portfolio showcasing Laura Lee's data storytelling, dashboard design, and experimentation work.",
  openGraph: {
    title: "Laura Lee | Data Analyst Portfolio",
    description:
      "Explore dashboards, case studies, and experimentation projects from junior data analyst Laura Lee.",
    siteName: "Laura Lee Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-emerald-50">
      <body
        className={`${manrope.variable} ${fraunces.variable} font-body antialiased text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
