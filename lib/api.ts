import axios from "axios";
import type { Note } from "@/types/note";

const API_BASE = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const AVAILABLE_TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;
export type Tag = (typeof AVAILABLE_TAGS)[number];

export function isValidTag(tag: string): tag is Tag {
  return AVAILABLE_TAGS.includes(tag as Tag);
}

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface fetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// =============GET CATEGORIES=============

export const getCategories = async () => {
  const res = await axiosInstance<Category[]>("/categories");
  return res.data;
};

// =============GET NOTE BY ID=============

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axiosInstance.get<Note>(`/notes/${noteId}`);
  return response.data;
}

// =============GET NOTES=============

export async function fetchNotes(
  params: fetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: {
      page: params.page,
      perPage: params.perPage,
      ...(params.tag && params.tag !== "all" && { tag: params.tag }),
      ...(params.search && { search: params.search }),
    },
  });

  return response.data;
}

// =============CREATE NOTE=============

export async function createNote(noteData: CreateNoteRequest): Promise<Note> {
  const response = await axiosInstance.post<Note>("/notes", noteData);

  return response.data;
}

// =============DELETE NOTE=============

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axiosInstance.delete<Note>(`/notes/${noteId}`);
  return response.data;
}
