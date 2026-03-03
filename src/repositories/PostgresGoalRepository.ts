import { pool } from "../config/db";
import { Goal } from "../entities/Goal";
import { GoalRepository } from "../interfaces/GoalsRepository";

export class PostgresGoalRepository implements GoalRepository {
  async createGoal(goal: Goal): Promise<Goal> {
    const result = await pool.query(
      `
            INSERT VALUES (target, amount, goal, userId) goal ($1, $2,$3,$$4) RETURNING *
            `,
      [goal.target, goal.amount, goal.goal, goal.userId],
    );
    return result.rows[0];
  }
  async findAll(): Promise<Goal[]> {
    const result = await pool.query(`SELECT * FROM goal`);
    return result.rows;
  }
  async deleteById(id: string): Promise<Goal> {
    let result = await pool.query(`DELETE FROM goal WHERE id = $1`, [id]);
    return result.rows[0];
  }
  async updateById(goal: Goal, id: string): Promise<Goal> {
    let result = await pool.query(
      `UPDATE goal SET goal=$1, target=$2, amount: $3`,
      [goal.goal, goal.target, goal.amount],
    );
    return result.rows[0];
  }
  async fineById(id: string): Promise<Goal> {
    const result = await pool.query(
      `
            SELECT * FROM expense WHERE id = $1
        `,
      [id],
    );
    return result.rows[0];
  }
}
