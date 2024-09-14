import { serve } from "@hono/node-server";
import { createApp } from "./app/core";
import { createInMemoryNoteRepository } from "./driven-adapters/note-repository/in-memory";
import { createHonoInteractor } from "./driver-adapters/interactor/hono";

const PORT = Number(process.env.PORT) || 3000;

const repository = createInMemoryNoteRepository();
const noteService = createApp(repository);
const app = createHonoInteractor(noteService);

serve({
  fetch: app.fetch,
  port: PORT,
});

console.debug({
  message: "Server started",
  port: PORT,
});

process.on("unhandledRejection", error => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", error => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.debug("Server shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.debug("Server shutting down...");
  process.exit(0);
});
