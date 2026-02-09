import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST || "",
  database: "expense",
  password: "admin",
  port: Number(process.env.DB_PORT),
  max: 20,
});

pool.on("connect", () => {
  console.log("✅ DB Connected Successfully");
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
  process.exit(1);
});
