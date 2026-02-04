import { pool } from "../config/db";
import { User } from "../entities/User";
import { UserRepository } from "../interfaces/UserRepository";

export class PostgresUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        const result = await pool.query(
            `INSERT INTO users (fullName, mobile, password, email) VALUES ($1,$2,$3,$4) RETURNING *`, [
            user.fullName,
            user.mobile,
            user.password,
            user.email
        ]
        )
        return result.rows[0]
    }

    async findAll(): Promise<User[]> {
        const result = await pool.query(
            `SELECT * FROM users`
        )
        return result.rows
    }

    async deleteById(id: string): Promise<User> {
        const result = await pool.query(
            `DELETE FROM users WHERE id=$1`, [id]
        )
        return result.rows[0]
    }

    async findById(id: string): Promise<User> {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`, [id])
        return result.rows[0]
    }

    async updateById(id: string, user: Partial<User>): Promise<User> {
        const result = await pool.query(
            `UPDATE users SET fullName=$1, mobile=$2, password$3, 
            email=$4, updatedAt=NOW() WHERE ID =$5 RETURNING *`,
            [user.fullName, user.mobile, user.password, user.email]
        )
        return result.rows[0]
    }

    async findByEmail(email: string): Promise<User> {
        const result = await pool.query(
            `SELECT * FROM users WHERE email=$1`, [email]
        )
        return result.rows[0]
    }

    async updateRefreshToken(userId: string, token: string | null): Promise<void> {
        const result = await pool.query(
            `ALERT TABLE users ADD COLUMN refresh_token TEXT`
        )
        return result.rows[0]
    }
}