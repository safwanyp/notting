import { NoteRepository } from "../../driven-ports/note-repository";
import { Note } from "./note";

type App = {
  getNoteById(id: string): Promise<Note | null>;
  getAllNotes(): Promise<Note[]>;
  createNote(content: string): Promise<Note>;
  updateNote(id: string, content: string): Promise<Note>;
  deleteNote(id: string): Promise<void>;
};

type CreateApp = (repository: NoteRepository) => App;

export { App, CreateApp };
