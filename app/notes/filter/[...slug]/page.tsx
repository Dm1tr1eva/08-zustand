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

export default async function NotesByFilterPage({ params }: Props) {
  const { slug } = await params;

  // Валидация тега
  if (slug[0] !== "all" && !isValidTag(slug[0])) {
    notFound();
  }

  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  // Предзагрузка первой страницы
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
