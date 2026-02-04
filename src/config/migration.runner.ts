import fs from "fs";
import path from "path";
import { pool } from "./db";

const MIGRATIONS_DIR = path.join(__dirname, "../migrations");

async function runMigrations() {
    const client = await pool.connect();

    try {
        // Ensure migration table exists
        await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW()
      );
    `);

        const files = fs
            .readdirSync(MIGRATIONS_DIR)
            .filter(file => file.endsWith(".sql"))
            .sort();

        for (const file of files) {
            const alreadyRun = await client.query(
                "SELECT 1 FROM migrations WHERE filename = $1",
                [file]
            );

            if (alreadyRun.rowCount) {
                console.log(`⏭️ Skipping ${file}`);
                continue;
            }

            const sql = fs.readFileSync(
                path.join(MIGRATIONS_DIR, file),
                "utf-8"
            );

            console.log(`🚀 Running ${file}`);
            await client.query(sql);

            await client.query(
                "INSERT INTO migrations (filename) VALUES ($1)",
                [file]
            );
        }

        console.log("✅ All migrations executed");
    } catch (err) {
        console.error("❌ Migration failed:", err);
        process.exit(1);
    } finally {
        client.release();
    }
}

runMigrations();
