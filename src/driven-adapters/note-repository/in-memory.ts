import { Note } from "../../app/core/domain/note";
import { NoteRepository } from "../../app/driven-ports/note-repository";

const createInMemoryNoteRepository = (): NoteRepository => {
  const notes: Map<string, Note> = new Map();

  return {
    async findById(id) {
      return notes.get(id) || null;
    },
    async findAll() {
      return Array.from(notes.values());
    },
    async save(note) {
      notes.set(note.id, note);
    },
    async update(note) {
      if (!notes.has(note.id)) {
        throw new Error("Note not found");
      }
      notes.set(note.id, note);
    },
    async delete(id) {
      notes.delete(id);
    },
  };
};

export { createInMemoryNoteRepository };
