
export type ExpenseType = "Expense" | "Income"

export class Expense {
    public readonly id?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    constructor(
        params: {
            id?: string,
            amount: string,
            description: string,
            userId: string,
            categoryId: string,
            expenseType: ExpenseType,
            createdAt?: Date;
            updatedAt?: Date;
        }
    ) {
        this.id = params.id;
        this.amount = params.amount;
        this.categoryId = params.categoryId;
        this.userId = params.userId
        this.description = params.description;
        this.expenseType = params.expenseType;
        this.createdAt = params.createdAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
    }
    public readonly userId: string;
    public readonly categoryId: string;
    public description: string;
    public amount: string;
    public expenseType: ExpenseType
}