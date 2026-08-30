import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sammdo — Frontend-leaning Full Stack Developer",
  icons: "/website-icon.png",
  description:
    "Portfolio of Sammdo, a frontend-leaning full stack developer working with Next.js, TypeScript, Laravel, and React.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}