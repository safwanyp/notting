import { Hono } from "hono";
import { App } from "../../app/core/domain/app";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";

const createHonoInteractor = (noteService: App) => {
  const app = new Hono();

  app.use(logger());
  app.use(prettyJSON());
  app.use(secureHeaders());
  app.use(requestId());

  app.get("/notes", async c => {
    const notes = await noteService.getAllNotes();
    return c.json(notes);
  });

  app.get("/notes/:id", async c => {
    const id = c.req.param("id");
    const note = await noteService.getNoteById(id);
    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }
    return c.json(note);
  });

  app.post("/notes", async c => {
    const { content } = await c.req.json();
    if (!content) {
      return c.json({ error: "Content is required" }, 400);
    }
    const note = await noteService.createNote(content);
    return c.json(note, 201);
  });

  app.put("/notes/:id", async c => {
    const id = c.req.param("id");
    const { content } = await c.req.json();
    if (!content) {
      return c.json({ error: "Content is required" }, 400);
    }
    try {
      const updatedNote = await noteService.updateNote(id, content);
      return c.json(updatedNote);
    } catch (error) {
      return c.json({ error: "Note not found", message: error }, 404);
    }
  });

  app.delete("/notes/:id", async c => {
    const id = c.req.param("id");
    try {
      await noteService.deleteNote(id);
      return c.json({ message: "Note deleted successfully" });
    } catch (error) {
      return c.json({ error: "Note not found", message: error }, 404);
    }
  });

  return app;
};

export { createHonoInteractor };
