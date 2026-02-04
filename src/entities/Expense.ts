export class Expense {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public title: string,
        public amount: number,
        public readonly category: string,
        public createAt: Date = new Date(),
        public updatedAt: Date = new Date
    ) { }
}