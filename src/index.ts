import { serve } from "@hono/node-server";
import { createApp } from "./app/core";
import { createHonoInteractor } from "./driver-adapters/interactor/hono";
import { createTursoNoteRepository } from "./driven-adapters/note-repository/turso";

const PORT = Number(process.env.PORT) || 3000;
const tursoConfig = {
  url: String(process.env.TURSO_DATABASE_URL),
  authToken: String(process.env.TURSO_AUTH_TOKEN),
};

async function startServer() {
  const repository = await createTursoNoteRepository(tursoConfig);
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
}

startServer();
