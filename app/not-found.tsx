"use client";

import type { Metadata } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "Page not found",
  openGraph: {
    title: "Not found",
    description: "Page not found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
