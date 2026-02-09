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
    const {
      search,
      startDate: start,
      endDate: end,
      expenseType,
      page = "1",
      limit = "10",
    } = req.body;

    const pageNumber = Number(page);
    const limitSize = Number(limit);

    const offset = (pageNumber - 1) * limitSize;

    const startDate =
      typeof start === "string" && start.trim() ? new Date(start) : null;

    const endDate =
      typeof end === "string" && end.trim() ? new Date(end) : null;

    const expenseTypeValue =
      expenseType === "Expense" || expenseType === "Income"
        ? expenseType
        : null;

    const searchValue = typeof search === "string" ? search : "";

    const allExpense = await this.expenseService.getAllExpenses(
      searchValue,
      startDate,
      endDate,
      expenseTypeValue,
      offset,
      limitSize,
    );

    return res.status(200).json({
      message: "Expense Fetch Successfully",
      data: allExpense,
    });
  }

  async findSingleExpense(req: Request, res: Response) {
    const { id } = req.params;

    const idValues = typeof id === "string" ? id : "";

    if (!idValues) {
      throw new AppError("Id is required!", 400);
    }
    const expense = await this.expenseService.singleExpense(idValues);
    if (!expense) {
      throw new AppError("Expense Not Found!", 404);
    }
    return res.status(200).json({
      message: "Expense Fetch Successfully",
      data: expense,
    });
  }

  async deleteExpense(req: Request, res: Response) {
    const { id } = req.params;

    const idValues = typeof id === "string" ? id : "";

    if (!idValues) {
      throw new AppError("Id is required!", 400);
    }
    const expense = await this.expenseService.deleteExpense(idValues);
    if (!expense) {
      throw new AppError("Expense Not Found!", 404);
    }
    return res.status(200).json({
      message: "Expense Deleted Successfully",
      data: expense,
    });
  }

  async getAmount(req: Request, res: Response) {
    const { startDate: start, endDate: end, expenseType } = req.body;

    const startDate =
      typeof start === "string" && start.trim() ? new Date(start) : null;
    const endDate =
      typeof end === "string" && end.trim() ? new Date(end) : null;
    const expenseTypeValue =
      expenseType === "Expense" || expenseType === "Income"
        ? expenseType
        : null;

    const amount = await this.expenseService.getAmount(
      startDate,
      endDate,
      expenseTypeValue,
    );
    return res.status(200).json({
      message: "Amount Fetched Successfully",
      data: amount ?? 0,
    });
  }
}
