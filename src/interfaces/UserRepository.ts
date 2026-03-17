import { User } from "../entities/User";
import { updateUserDTO } from "../types/userTypes";

export interface UserRepository {
    createUser(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    deleteById(id: string): Promise<User>;
    updateById(id: string, user: updateUserDTO): Promise<User>;
    updateRefreshToken(userId: string, token: string | null): Promise<void>;
    updateOTP(otp: string, expiry: Date, email: string): Promise<void>;
    resetOTP(email: string): Promise<void>;
    resetPassword(password: string, email: string): Promise<void>;
};