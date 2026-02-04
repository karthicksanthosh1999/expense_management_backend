import { User } from "../entities/User";

export interface UserRepository {
    createUser(user: User): Promise<User>,
    findById(id: string): Promise<User>,
    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    deleteById(id: string): Promise<User>;
    updateById(id: string, user: User): Promise<User>;
    updateRefreshToken(userId: string, token: string | null): Promise<void>
}