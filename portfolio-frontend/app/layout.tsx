import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tharidu Sasaruwan | Software Engineer",
  description:
    "Tharidu Sasaruwan is a Software Engineer specializing in full-stack development, modern web applications, mobile applications, and AI-powered solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}