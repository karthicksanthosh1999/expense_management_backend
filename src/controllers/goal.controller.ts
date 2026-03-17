import { Response, Request } from "express";
import { GoalServices } from "../services/GoalServices";
import { AppError } from "../middlewares/errors/appError";

export class GoalController {
  constructor(private goalService: GoalServices) { }

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
      status: true
    });
  }

  async findAllGoalController(req: Request, res: Response) {
    const data = await this.goalService.getAllGoal();
    return res.status(200).json({
      message: "Goal Fetch Successfully",
      data,
      code: 200,
      status: true
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
      throw new AppError("Goal Not Found!", 404);
    }
    return res.status(200).json({
      message: "Goal Fetch Successfully",
      data: goal,
      code: 200,
      status: true
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
      code: 200,
      status: true
    });
  }

  async addAmountGoalController(req: Request, res: Response) {
    const { goalId, amount } = req.body;

    const existingGoal = await this.goalService.singleGoal(goalId);

    if (!existingGoal) {
      throw new AppError("Goal not found", 404)
    }
    let sumAmount = existingGoal.amount + Number(amount);

    if (existingGoal.goal < sumAmount) {
      throw new AppError("Amount greater then the goal", 400)
    }

    const currentAmount = await this.goalService.addAmountService(goalId, sumAmount);

    return res.status(201).json({
      message: "Amount Added Successfully",
      data: currentAmount,
      code: 201,
      status: true
    });
  }

}
