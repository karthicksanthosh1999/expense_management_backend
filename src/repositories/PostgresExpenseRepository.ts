import { pool } from "../config/db";
import { Expense } from "../entities/Expense";
import { ExpenseRepository } from "../interfaces/ExpenseRepository";

export class PostgresExpenseRepository implements ExpenseRepository {
  async createExpense(expense: Expense): Promise<Expense> {
    const result = await pool.query(
      `INSERT INTO expense  (amount, categoryId, userId, description, expenseType) VALUES ($1,$2, $3,$4, $5) RETURNING *
            `,
      [
        expense.amount,
        expense.categoryId,
        expense.userId,
        expense.description,
        expense.expenseType,
      ],
    );
    return result.rows[0];
  }

  async findAll(): Promise<Expense[]> {
    let result = await pool.query(`           
            SELECT 
                a.id,
                a.amount,
                a.description,
                a.userId,
                a.categoryId,
                a.createdAt,
                a.updatedAt,
                a.expenseType,
                json_build_object(
                    'id', b.id,
                    'fullName', b.fullName,
                    'email', b.email
                ) AS user,

                json_build_object(
                    'id', c.id,
                    'title', c.title,
                    'color', c.color
                ) AS Category

            FROM expense a
            INNER JOIN users b ON a."userId" = b.id
            INNER JOIN category c ON a."categoryId" = c.id;`);
    return result.rows;
  }

  async fineById(id: string): Promise<Expense> {
    let result = await pool.query(
      `
            SELECT 
                a.id,
                a.amount,
                a.description,
                a.userId,
                a.categoryId,
                a.createdAt,
                a.updatedAt,
                a.expenseType,
                json_build_object(
                    'id', b.id,
                    'fullName', b.fullName,
                    'email', b.email
                ) AS user,

                json_build_object(
                    'id', c.id,
                    'title', c.title,
                    'color', c.color
                ) AS COLOR,
            FROM expense a
            INNER JOIN users b ON "userId" = b.id
            INNER JOIN category c ON "categoryId" = c.id
            WHERE id = $1
            `,
      [id],
    );
    return result.rows[0];
  }

  async deleteById(id: string): Promise<Expense> {
    let result = await pool.query(`DELETE FROM expense WHERE id= $1`, [id]);
    return result.rows[0];
  }

  async updateById(expense: Expense, id: string): Promise<Expense> {
    let result = await pool.query(
      `
            UPDATE expense 
            SET 
                amount=$1, 
                description=$2, 
                userId=$3, 
                categoryId=$4
                expenseType=$5
                `,
      [
        expense.amount,
        expense.description,
        expense.userId,
        expense.categoryId,
        expense.expenseType,
      ],
    );
    return result.rows[0];
  }
}
