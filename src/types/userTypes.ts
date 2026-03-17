
export interface CreateUserDTO {
    fullName: string;
    mobile: string;
    email: string;
    password: string;
}
export interface updateUserDTO {
    id: string;
    fullName: string;
    mobile: string;
    email: string;
    password?: string;
}

