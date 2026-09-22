import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About | Tharidu Sasaruwan",
  description:
    "Learn more about Tharidu Sasaruwan, a Software Engineer focused on full-stack development, mobile applications, backend systems and AI-powered solutions.",
};

export default function About() {
  return (
    <>
      <Navbar />

      <AboutPage />

      <Footer />
    </>
  );
}