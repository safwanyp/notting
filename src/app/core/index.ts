import { CreateApp } from "./domain/app";

const createApp: CreateApp = (repository) => {
  return {
    async getNoteById(id) {
      return repository.findById(id);
    },
    async getAllNotes() {
      return repository.findAll();
    },
    async createNote(content) {
      const note = {
        id: Math.random().toString(36).substr(2, 9),
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await repository.save(note);
      return note;
    },
    async updateNote(id, content) {
      const existingNote = await repository.findById(id);
      if (!existingNote) {
        throw new Error("Note not found");
      }

      const updatedNote = {
        ...existingNote,
        content,
        updatedAt: new Date(),
      };

      await repository.update(updatedNote);
      return updatedNote;
    },
    async deleteNote(id) {
      await repository.delete(id);
    },
  };
};

export { createApp };
