import { describe, it, expect } from "vitest";
import { createInMemoryNoteRepository } from "../../driven-adapters/note-repository/in-memory";
import { createApp } from "../../app/core";

describe("NoteService", () => {
  const repository = createInMemoryNoteRepository();
  const noteService = createApp(repository);

  it("should create a note", async () => {
    const content = "Test note content";
    const note = await noteService.createNote(content);

    expect(note.id).toBeDefined();
    expect(note.content).toBe(content);
    expect(note.createdAt).toBeInstanceOf(Date);
    expect(note.updatedAt).toBeInstanceOf(Date);
  });

  it("should retrieve a note by id", async () => {
    const content = "Another test note";
    const createdNote = await noteService.createNote(content);

    const retrievedNote = await noteService.getNoteById(createdNote.id);

    expect(retrievedNote).toEqual(createdNote);
  });

  it("should update a note", async () => {
    const originalContent = "Original content";
    const createdNote = await noteService.createNote(originalContent);

    await new Promise(resolve => setTimeout(resolve, 1));

    const updatedContent = "Updated content";
    const updatedNote = await noteService.updateNote(createdNote.id, updatedContent);

    expect(updatedNote.id).toBe(createdNote.id);
    expect(updatedNote.content).toBe(updatedContent);
    expect(updatedNote.updatedAt.getTime()).toBeGreaterThan(createdNote.updatedAt.getTime());
  });

  it("should delete a note", async () => {
    const content = "Note to be deleted";
    const createdNote = await noteService.createNote(content);

    await noteService.deleteNote(createdNote.id);

    const retrievedNote = await noteService.getNoteById(createdNote.id);
    expect(retrievedNote).toBeNull();
  });

  it("should retrieve all notes", async () => {
    await noteService.createNote("Note 1");
    await noteService.createNote("Note 2");

    const allNotes = await noteService.getAllNotes();

    expect(allNotes.length).toBeGreaterThanOrEqual(2);
  });
});
