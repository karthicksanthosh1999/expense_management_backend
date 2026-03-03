export class Goal {
  public readonly id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  constructor(params: {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    target: string;
    userId: string;
    amount: number;
    goal: number;
  }) {
    this.id = params.id;
    this.amount = params.amount;
    this.goal = params.goal;
    this.target = params.target;
    this.userId = params.userId;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
  }
  public readonly userId: string;
  public target: string;
  public goal: number;
  public amount: number;
}
