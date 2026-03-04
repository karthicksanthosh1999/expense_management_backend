import { Goal } from "../entities/Goal";
import { GoalRepository } from "../interfaces/GoalsRepository";
import { goalOTO } from "../types/goalTypes";

export class GoalServices {
  constructor(private goalRepo: GoalRepository) { }

  async createGoalService(data: goalOTO): Promise<Goal> {
    const result = await this.goalRepo.createGoal(data);
    return result;
  }

  async singleGoal(id: string): Promise<Goal> {
    const result = await this.goalRepo.fineById(id);
    return result;
  }

  async getAllGoal(): Promise<Goal[]> {
    const result = await this.goalRepo.findAll();
    return result;
  }

  async deleteGoal(id: string): Promise<Goal> {
    const result = await this.goalRepo.deleteById(id);
    return result;
  }

  async updateGoal(data: goalOTO, id: string): Promise<Goal> {
    const result = await this.goalRepo.updateById(data, id);
    return result;
  }

  async addAmountService(id: string, amount: number): Promise<Goal> {
    const result = await this.goalRepo.addAmount(id, amount);
    return result
  }

}
