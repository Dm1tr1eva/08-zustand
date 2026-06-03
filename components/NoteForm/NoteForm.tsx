"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateNoteRequest, createNote, Tag } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useNoteDraftStore } from '@/lib/store/noteStore';

type Props = {
  readonly tags: readonly Tag[];
};

const NoteForm = ({ tags }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["filterNotes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

    const handleChange = (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setDraft({
        ...draft,
        [event.target.name]: event.target.value,
      });
    };

  const handleCancel = () => router.push("/notes/filter/all");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as CreateNoteRequest;
    createNoteMutation.mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          maxLength={50}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={(e) => {
            handleContentChange(e);
            handleChange(e);
          }}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? "Creating..." : "Create note"}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={createNoteMutation.isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
