import { pool } from "../config/db";
import { User } from "../entities/User";
import { UserRepository } from "../interfaces/UserRepository";
import { updateUserDTO } from "../types/userTypes";

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

    async updateById(id: string, user: Partial<updateUserDTO>): Promise<User> {
        const result = await pool.query(
            `UPDATE users SET fullName=$1, mobile=$2, email=$3, updatedAt=NOW() WHERE id=$4 RETURNING *`,
            [user.fullName, user.mobile, user.email, user?.id]
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

    async updateOTP(otp: string, expiry: Date, email: string): Promise<void> {
        await pool.query(
            "UPDATE users SET otp=$1, otp_expiry=$2 WHERE email=$3",
            [otp, expiry, email]
        )
    }

    async resetPassword(password: string, email: string): Promise<void> {
        await pool.query(
            "UPDATE users SET password=$1, otp=null, otp_expiry=null WHERE email=$2",
            [password, email]
        );
    }

    async resetOTP(email: string) {
        await pool.query(
            "UPDATE users SET is_verified=true, otp=null, otp_expiry=null WHERE email=$1",
            [email]
        );
    }
}