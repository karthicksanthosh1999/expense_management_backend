import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "expense",
  password: "2020",
  port: 5432,
  max: 20,
});

pool.on("connect", () => {
  console.log("✅ DB Connected Successfully");
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
  process.exit(1);
});
