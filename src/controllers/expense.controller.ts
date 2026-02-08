import { Request, Response } from "express";
import { ExpenseServices } from "../services/ExpenseService";
import { AppError } from "../middlewares/errors/appError";

export class ExpenseController {
  constructor(private expenseService: ExpenseServices) {}

  async createExpense(req: Request, res: Response) {
    const { amount, description, userId, categoryId, expenseType } = req.body;
    const expense = await this.expenseService.addExpense({
      amount,
      categoryId,
      description,
      userId,
      expenseType,
    });

    res.status(201).json({
      message: "Expense Created Successfully",
      data: expense,
    });
  }

  async findAllExpense(req: Request, res: Response) {
    const allExpense = await this.expenseService.getAllExpenses();
    return res.status(200).json({
      message: "Expense Fetch Successfully",
      data: allExpense,
    });
  }

  async findSingleExpense(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      throw new AppError("Id is required!", 400);
    }
    const expense = await this.expenseService.singleExpense(id);
    if (!expense) {
      throw new AppError("Expense Not Found!", 404);
    }
    return res.status(200).json({
      message: "Expense Fetch Successfully",
      data: expense,
    });
  }

  async deleteExpense(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      throw new AppError("Id is required!", 400);
    }
    const expense = await this.expenseService.deleteExpense(id);
    if (!expense) {
      throw new AppError("Expense Not Found!", 404);
    }
    return res.status(200).json({
      message: "Expense Deleted Successfully",
      data: expense,
    });
  }

  async updatedExpense(req: Request, res: Response) {
    const { id, amount, description, userId, categoryId, expenseType } =
      req.body;

    if (!id) {
      throw new AppError("Id is required!", 400);
    }
    const expense = await this.expenseService.updateExpense(id, {
      amount,
      categoryId,
      description,
      expenseType,
      userId,
    });
    return res.status(200).json({
      message: "Expense Updated Successfully",
      data: expense,
    });
  }
}
