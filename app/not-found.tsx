import type { Metadata } from "next";
import NotFoundContent from "./NotFoundContent.client";

export const metadata: Metadata = {
  title: "Not found",
  description: "Page not found",
  openGraph: {
    title: "Not found",
    description: "Page not found",
    url: "https://08-zustand-five-teal.vercel.app/not-found",
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

export default function NotFound() {
  return <NotFoundContent />;
}
