import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("connect", () => {
  console.log("✅ DB Connected Successfully");
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
  process.exit(1);
});
