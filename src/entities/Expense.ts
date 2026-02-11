
export type ExpenseType = "Expense" | "Income"

export class Expense {
    public readonly id?: string;
    public createdat?: Date;
    public updatedat?: Date;
    constructor(
        params: {
            id?: string,
            amount: string,
            description: string,
            userId: string,
            categoryId: string,
            expenseType: ExpenseType,
            createdat?: Date;
            updatedat?: Date;
        }
    ) {
        this.id = params.id;
        this.amount = params.amount;
        this.categoryId = params.categoryId;
        this.userId = params.userId
        this.description = params.description;
        this.expenseType = params.expenseType;
        this.createdat = params.createdat ?? new Date();
        this.updatedat = params.updatedat ?? new Date();
    }
    public readonly userId: string;
    public readonly categoryId: string;
    public description: string;
    public amount: string;
    public expenseType: ExpenseType
}