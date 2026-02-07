import { pool } from "../config/db";
import { Category } from "../entities/Category";
import { CategoryRepository } from "../interfaces/CategoryRepository";

export class PostgresCategoryRepository implements CategoryRepository {
    async createCategory(category: Category): Promise<Category> {
        let result = await pool.query(
            `INSERT INTO category (title, userId, color) VALUES ($1, $2, $3) RETURNING *`,
            [category.title, category.userId, category.color]
        )
        return result.rows[0]
    }

    async findAll(): Promise<Category[]> {
        let result = await pool.query(`
            SELECT 
            a.id,
            a.title,
            a.color,
            a.userId,
            a.createdAt,
            a.updatedAt,
            json_build_object(
                'id', b.id,
                'fullName', b.fullName,
                'email', b.email
            ) AS user
            FROM category a
            INNER JOIN users b ON a.userId = b.id
            `);
        return result.rows;
    }

    async fineById(id: string): Promise<Category> {
        let result = await pool.query(
            `SELECT
            c.id,
            c.title,
            c.color,
            c.userId,
            c.createdAt,
            c.updatedAt,

            json_build_object(
                'id', u.id,
                'fullName', u.fullName,
                'email', u.email,
                'mobile', u.mobile
            ) AS user

            FROM category c
            JOIN users u ON c.userId = u.id
            WHERE c.id = $1;
            `, [id]
        )
        return result.rows[0] ?? null
    }

    async deleteById(id: string): Promise<Category> {
        let result = await pool.query(
            `DELETE FROM category WHERE id = $1`, [id]
        )
        return result.rows[0]
    }

    async updateById(category: Category, id: string): Promise<Category> {
        let result = await pool.query(
            `UPDATE category SET title=$1, color=$2`, [category.title, category.color]
        )
        return result.rows[0]
    }
}