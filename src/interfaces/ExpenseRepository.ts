import { Expense } from "../entities/Expense";
export interface ExpenseRepository {
    createExpense(expense: Expense): Promise<Expense>,
    getAmount(whereClause: string,
        values: any[]): Promise<{ amount: number }>,
    fineById(id: string): Promise<Expense>,
    findAll(whereClause: string,
        values: any[],
        limit: number,
        offset: number): Promise<Expense[]>,
    deleteById(id: string): Promise<Expense>,
    updateById(expense: Expense, id: string): Promise<Expense>
}