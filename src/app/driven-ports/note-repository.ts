import { Note } from "../core/domain/note";

type NoteRepository = {
  findById(id: string): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  save(note: Note): Promise<void>;
  update(note: Note): Promise<void>;
  delete(id: string): Promise<void>;
};

export { NoteRepository };
