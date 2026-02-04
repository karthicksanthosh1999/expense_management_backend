import { ExpenseRepository } from "../interfaces/ExpenseRepository";
import { Expense } from "../entities/Expense";

export class ExpenseServices {
    constructor(private expenseRepo: ExpenseRepository) { }

    async addExpense(data: {
        id: string,
        userId: string,
        title: string,
        amount: number,
        category: string,
    }) {
        if (data?.amount > 0) {

        }

        const expense = new Expense(
            data.id,
            data.userId,
            data.title,
            data.amount,
            data.category
        )

    }

}