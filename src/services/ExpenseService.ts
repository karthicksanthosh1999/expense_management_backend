import { ExpenseRepository } from "../interfaces/ExpenseRepository";
import { Expense } from "../entities/Expense";
import { TExpenseCategoryOTO } from "../types/expenseTypes";

export class ExpenseServices {
    constructor(private expenseRepo: ExpenseRepository) { }

    async addExpense(data: TExpenseCategoryOTO): Promise<Expense> {
        const expense = await this.expenseRepo.createExpense(data);
        return expense
    }

    async singleExpense(id: string): Promise<Expense> {
        const expense = await this.expenseRepo.fineById(id);
        return expense
    }

    async getAllExpenses(): Promise<Expense[]> {
        const expense = await this.expenseRepo.findAll();
        return expense
    }

    async deleteExpense(id: string): Promise<Expense> {
        const expense = await this.expenseRepo.deleteById(id);
        return expense
    }

    async updateExpense(id: string, data: TExpenseCategoryOTO): Promise<Expense> {
        const expense = await this.expenseRepo.updateById(data, id);
        return expense
    }
}