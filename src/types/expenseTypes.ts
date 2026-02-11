export type TExpense = "Expense" | "Income"

export interface TExpenseCategoryOTO {
    amount: string,
    description: string,
    userId: string
    categoryId: string
    expenseType: TExpense
}

export type TExpenseFilterOptions = {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
    expenseType?: TExpense;
    categoryId?: string;
    userId?: string;
};

export type TExpenseFilterValues = {
    startDate: Date | null,
    endDate: Date | null,
    expenseType: TExpense | null,
    search: string | null
}