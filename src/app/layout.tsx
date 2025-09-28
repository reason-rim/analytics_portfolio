import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
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
    <html lang="en" className="bg-slate-50">
      <body
        className={`${inter.variable} ${playfair.variable} font-body antialiased text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
