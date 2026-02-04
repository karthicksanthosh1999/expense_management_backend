import { User } from "../entities/User";
import { UserRepository } from "../interfaces/UserRepository";
import { AppError } from "../middlewares/errors/appError";
import { CreateUserDTO } from "../types/userTypes";
import bcrypt from 'bcrypt'

export class UserServices {
    constructor(private userRepo: UserRepository) { }

    async addUser(data: CreateUserDTO): Promise<User> {
        const existingUser = await this.userRepo.findByEmail(data.email)
        if (existingUser) {
            throw new AppError("User already exist", 400, false)
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User({
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
            mobile: data.mobile,
        })

        const savedUser = await this.userRepo.createUser(user)

        return savedUser
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userRepo.findById(id);

        if (!user) throw new AppError("User not found", 404);

        const deletedUser = await this.userRepo.deleteById(id);

        return deletedUser
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepo.findAll()
        return users;
    }

}