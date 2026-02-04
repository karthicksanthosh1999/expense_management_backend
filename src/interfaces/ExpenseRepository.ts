import { Expense } from "../entities/Expense";
export interface ExpenseRepository {
    createExpense(expense: Expense): Promise<Expense>,
    fineById(id: string): Promise<Expense>,
    findAll(): Promise<Expense[]>,
    deleteById(id: string): Promise<Expense>,
    updateById(expense: Expense, id: string): Promise<Expense>
}