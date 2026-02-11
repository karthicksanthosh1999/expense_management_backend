import { ExpenseRepository } from "../interfaces/ExpenseRepository";
import { Expense, ExpenseType } from "../entities/Expense";
import { TExpenseCategoryOTO, TExpenseFilterValues } from "../types/expenseTypes";

export class ExpenseServices {
  constructor(private expenseRepo: ExpenseRepository) { }

  async addExpense(data: TExpenseCategoryOTO): Promise<Expense> {
    const signedAmount =
      data.expenseType === "Expense"
        ? -Math.abs(Number(data.amount))
        : Math.abs(Number(data.amount));

    const expense = new Expense({
      ...data,
      amount: signedAmount.toString(),
    });

    const expenseData = await this.expenseRepo.createExpense(expense);
    return expenseData;
  }

  async singleExpense(id: string): Promise<Expense> {
    const expense = await this.expenseRepo.fineById(id);
    return expense;
  }

  async getAllExpenses(
    search: string,
    startDate: Date | null,
    endDate: Date | null,
    expenseType: ExpenseType | null,
    offset: number,
    limit: number,
  ): Promise<Expense[]> {
    const conditions: string[] = [];
    const values: any[] = [];

    if (startDate) {
      values.push(startDate);
      conditions.push(`a.createdat >= $${values.length}`);
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      values.push(endOfDay);
      conditions.push(`a.createdat <= $${values.length}`);
    }

    if (expenseType) {
      values.push(expenseType);
      conditions.push(`a.expenseType = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`
                (
            a.description ILIKE $${values.length}
            OR c.title ILIKE $${values.length}
            )
            `);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    return this.expenseRepo.findAll(whereClause, values, limit, offset);
  }

  async deleteExpense(id: string): Promise<Expense> {
    const expense = await this.expenseRepo.deleteById(id);
    return expense;
  }

  async updateExpense(id: string, data: TExpenseCategoryOTO): Promise<Expense> {
    const expense = await this.expenseRepo.updateById(data, id);
    return expense;
  }

  async getAmount(
    startDate: Date | null,
    endDate: Date | null,
    expenseType: ExpenseType | null,
  ): Promise<{ amount: number }> {
    const conditions: any[] = [];
    const values: any[] = [];

    if (startDate) {
      values.push(startDate);
      conditions.push(`a.createdAt >= $${values.length}`);
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999)
      values.push(endOfDay);
      conditions.push(`a.createdAt <= $${values.length}`);
    }

    if (expenseType) {
      values.push(expenseType);
      conditions.push(`a.expenseType = $${values.length}`);
    }
    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const amount = this.expenseRepo.getAmount(whereClause, values);
    return amount;
  }
}
