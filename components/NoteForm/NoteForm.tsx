"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateNoteRequest, createNote, Tag } from "@/lib/api";

type Props = {
  tag: Tag[];
};

const NoteForm = ({ tags }: Props) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push("/notes/filter/all");
    },
  });

  const handleCancel = () => router.push("/notes/filter/all");

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as CreateNoteRequest;
    mutate(values);
  };

  return (
    <form action={handleSubmit}>
      <label>
        Title
        <input type="text" name="title" />
      </label>

      <label>
        Content
        <textarea name="content"></textarea>
      </label>

      <label>
        Tag
        <select name="tag">
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
