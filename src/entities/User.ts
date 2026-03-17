export class User {
    public readonly id?: string;
    public readonly createAt?: Date;
    public updatedAt?: Date;

    public fullName: string;
    public mobile: string;
    public password: string;
    public email: string;
    public is_verified: boolean;
    public otp?: string;
    public otp_expire?: Date;

    constructor(params: {
        id?: string;
        fullName: string;
        mobile: string;
        password: string;
        email: string;
        is_verified?: boolean;
        otp?: string;
        otp_expire?: Date;
        createAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = params.id;
        this.fullName = params.fullName;
        this.mobile = params.mobile;
        this.password = params.password;
        this.email = params.email;

        this.is_verified = params.is_verified ?? false;

        this.otp = params.otp;
        this.otp_expire = params.otp_expire;

        this.createAt = params.createAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
    }
}
