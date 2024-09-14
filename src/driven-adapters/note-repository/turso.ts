import { NoteRepository } from "../../app/driven-ports/note-repository";
import { Client, createClient } from "@libsql/client";

type TursoConfig = {
  url: string;
  authToken: string;
};
type CreateTursoClient = (config: TursoConfig) => Client;

const createTursoClient: CreateTursoClient = ({ url, authToken }) => {
  const client = createClient({ url, authToken });
  return client;
};

const init = async (config: TursoConfig) => {
  const client = createTursoClient(config);
  await client.migrate([
    `CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            content TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )`,
  ]);

  return client;
};

const createTursoNoteRepository = async (config: TursoConfig): Promise<NoteRepository> => {
  const client = await init(config);

  return {
    async findById(id) {
      const result = await client.execute({
        sql: `SELECT * FROM notes WHERE id = ?`,
        args: [id],
      });

      const [row] = result.rows;

      if (!row) {
        return null;
      }

      return {
        id: String(row.id),
        content: String(row.content),
        createdAt: new Date(Number(row.created_at)),
        updatedAt: new Date(Number(row.updated_at)),
      };
    },
    async findAll() {
      const result = await client.execute(`SELECT * FROM notes`);

      return result.rows.map(row => ({
        id: String(row.id),
        content: String(row.content),
        createdAt: new Date(Number(row.created_at)),
        updatedAt: new Date(Number(row.updated_at)),
      }));
    },
    async save(note) {
      await client.execute({
        sql: `INSERT INTO notes (id, content, created_at, updated_at) VALUES (?, ?, ?, ?)`,
        args: [note.id, note.content, note.createdAt, note.updatedAt],
      });
    },
    async update(note) {
      await client.execute({
        sql: `UPDATE notes SET content = ?, updated_at = ? WHERE id = ?`,
        args: [note.content, note.updatedAt, note.id],
      });
    },
    async delete(id) {
      await client.execute({
        sql: `DELETE FROM notes WHERE id = ?`,
        args: [id],
      });
    },
  };
};

export { createTursoNoteRepository };
