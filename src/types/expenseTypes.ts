export type TExpense = "Expense" | "Income"

export interface TExpenseCategoryOTO {
    amount: string,
    description: string,
    userId: string
    categoryId: string
    expenseType: TExpense
}
