"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import css from "./FilterNotesPage.module.css";
import Link from "next/link";

const NOTES_PER_PAGE = 12;

type Props = {
  tag?: string;
  initialPage?: number;
};

export default function FilterNotesClient({ tag, initialPage = 1 }: Props) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["filterNotes", tag, currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: NOTES_PER_PAGE,
        tag: tag || undefined,
        search: searchQuery || undefined,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const debouncedSearch = useDebouncedCallback((text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  }, 500);

  const handleSearch = (text: string) => {
    debouncedSearch(text);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = notesData?.totalPages ?? 0;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const notes = notesData?.notes ?? [];
  const hasNotes = notes.length > 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {pageCount > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.createlink}>
          Create note +
        </Link>
      </header>

      <section className={css.content}>
        {hasNotes ? (
          <>
            <NoteList notes={notes} />
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>No notes found for this tag yet.</p>
            <small>Create your first note with this tag to see it here.</small>
          </div>
        )}
      </section>
    </div>
  );
}
