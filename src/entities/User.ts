export class User {
    public readonly id?: string;
    public readonly createAt?: Date;
    public updatedAt?: Date;

    constructor(params: {
        id?: string;
        fullName: string;
        mobile: string;
        password: string;
        email: string;
        createAt?: Date;
        updatedAt?: Date;
    }
    ) {
        this.id = params.id;
        this.fullName = params.fullName;
        this.mobile = params.mobile;
        this.email = params.email;
        this.password = params.password;
        this.createAt = params.createAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
    }

    public fullName: string;
    public mobile: string;
    public password: string;
    public email: string;
}