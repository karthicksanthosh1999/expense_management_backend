import { Goal } from "../entities/Goal";

export interface GoalRepository {
  createGoal(expense: Goal): Promise<Goal>;
  fineById(id: string): Promise<Goal>;
  findAll(): Promise<Goal[]>;
  //   filterGoal(
  //     whereClause: string,
  //     values: any[],
  //     limit: number,
  //     offset: number,
  //   ): Promise<Goal[]>;
  deleteById(id: string): Promise<Goal>;
  updateById(expense: Goal, id: string): Promise<Goal>;
}
