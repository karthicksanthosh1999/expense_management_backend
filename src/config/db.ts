import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
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
