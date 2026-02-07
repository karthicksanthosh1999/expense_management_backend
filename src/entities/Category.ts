export class Category {
    public readonly id?: string;
    public readonly createdAt?: Date;
    public updatedAt?: Date;
    constructor(params: {
        id?: string;
        title: string;
        userId: string;
        color: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.title = params.title;
        this.userId = params.userId;
        this.color = params.color;
        this.createdAt = params.createdAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
    }
    public title: string;
    public userId: string;
    public color: string;
}