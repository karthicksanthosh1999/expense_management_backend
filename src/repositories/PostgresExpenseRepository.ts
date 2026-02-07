import { pool } from "../config/db";
import { Expense } from "../entities/Expense";
import { ExpenseRepository } from "../interfaces/ExpenseRepository";

export class PostgresqlExpenseRepository implements ExpenseRepository {
    async createExpense(expense: Expense): Promise<Expense> {
        const result = await pool.query(`
            INSERT INTO expense (id, userId, title, amount, category) 
            VALUES ($1,$2,$3,$4,$5) RETURNING *
            `, [
            expense.id,
            expense.userId,
            expense.description,
            expense.amount,
            expense.category,
        ]);

        return result.rows[0]
    }

    async findAll(): Promise<Expense[]> {
        const result = await pool.query(`SELECT * FROM expense`);
        return result.rows
    }

    async deleteById(id: string): Promise<Expense> {
        const result = await pool.query(`DELETE FROM expense WHERE id=$1`, [id])
        return result.rows[0];
    }

    async fineById(id: string): Promise<Expense> {
        const result = await pool.query(`SELECT * FROM expense WHERE id=$1`, [id])
        return result.rows[0]
    }

    async updateById(expense: Expense, id: string): Promise<Expense> {
        const result = await pool.query(`UPDATE `, [expense, id]);
        return result.rows[0]
    }
}