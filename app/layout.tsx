import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import "./teaching.css";
export const metadata: Metadata = {
  title: "Apsis · Understand the ideas. Put them to work.",
  description:
    "Learn agentic engineering and astrodynamics through open lessons, worked examples, optional questions and practical projects.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
