import type { Metadata } from "next";
import { AVAILABLE_TAGS, type Tag } from "@/lib/api";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note",
    url: "https://notehub.com/notes/action/create",
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

const CreateNote = async () => {
  const tags = AVAILABLE_TAGS;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />
      </div>
    </main>
  );
};

export default CreateNote;
