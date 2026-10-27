import axios from 'axios';
import { Note, NoteTag } from '../types/note';

const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
  headers: {
    'x-api-key': import.meta.env.VITE_NOTEHUB_TOKEN,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({ page, perPage, search }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, any> = { page, perPage };
  if (search) params.search = search;
  
  const response = await noteApi.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await noteApi.post<Note>('/notes', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
};
