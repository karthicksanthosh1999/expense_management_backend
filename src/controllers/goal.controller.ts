import { Response, Request } from "express";
import { GoalServices } from "../services/GoalServices";
import { AppError } from "../middlewares/errors/appError";

export class GoalController {
  constructor(private goalService: GoalServices) {}

  async createGoalController(req: Request, res: Response) {
    const { target, amount, goal, userId } = req.body;
    const data = await this.goalService.createGoalService({
      amount,
      goal,
      target,
      userId,
    });
    res.status(201).json({
      message: "Goal Created Successfully",
      data,
      code: 201,
    });
  }

  async findAllGoalController(req: Request, res: Response) {
    const data = await this.goalService.getAllGoal();
    return res.status(200).json({
      message: "Goal Fetch Successfully",
      data,
      code: 200,
    });
  }

  async findSingleGoalController(req: Request, res: Response) {
    const { id } = req.params;

    const idValues = typeof id === "string" ? id : "";

    if (!idValues) {
      throw new AppError("Id is required!", 400);
    }
    const goal = await this.goalService.singleGoal(idValues);
    if (!goal) {
      throw new AppError("Expense Not Found!", 404);
    }
    return res.status(200).json({
      message: "Expense Fetch Successfully",
      data: goal,
    });
  }

  async deleteGoalController(req: Request, res: Response) {
    const { id } = req.params;

    const idValues = typeof id === "string" ? id : "";

    if (!idValues) {
      throw new AppError("Id is required!", 400);
    }
    const goal = await this.goalService.deleteGoal(idValues);
    if (!goal) {
      throw new AppError("Goal Not Found!", 404);
    }
    return res.status(200).json({
      message: "Goal Deleted Successfully",
      data: goal,
    });
  }
}
