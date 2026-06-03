import { Metadata } from "next";
import { isValidTag } from "@/lib/api";
import { notFound } from "next/navigation";
import FilterNotesClient from "./Notes.client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All" : slug[0];
  return {
    title: `Notes — ${tag}`,
    description: `Browse notes filtered by tag: ${tag}`,
    openGraph: {
      title: `Notes — ${tag}`,
      description: `Browse notes filtered by tag: ${tag}`,
      siteName: "NoteHub",
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
}

export default async function NotesByFilterPage({ params }: Props) {
  const { slug } = await params;

  if (slug[0] !== "all" && !isValidTag(slug[0])) {
    notFound();
  }

  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["filterNotes", tag, 1],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterNotesClient tag={tag} initialPage={1} />
    </HydrationBoundary>
  );
}
