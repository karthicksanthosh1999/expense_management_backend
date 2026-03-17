import { AppError } from "../middlewares/errors/appError";
import { UserServices } from "../services/UserServices";
import { Request, Response } from "express";

export class UserController {

    constructor(private userServices: UserServices) { }

    async createUser(req: Request, res: Response) {
        const { fullName, password, email, mobile } = req.body;
        const user = await this.userServices.addUser({
            email,
            fullName,
            mobile,
            password
        })

        return res.status(201).json({
            message: "User created successfully",
            data: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                createdAt: user.createAt,
            }
        })

    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.body;
        const user = await this.userServices.deleteUser(id);
        return res.status(200).json({
            message: "User Deleted Successfully",
            data: user
        })
    }

    async getAllUsers(_req: Request, res: Response) {
        const users = await this.userServices.getAllUsers()
        return res.status(200).json({
            message: "Users Fetch Successfully",
            data: users
        })
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { email, fullName, mobile } = req.body;
        console.log(id, email, fullName, mobile)
        const idValue = typeof id === "string" ? id : "";
        if (!idValue) {
            throw new AppError("Id is required!", 400);
        }
        const expense = await this.userServices.updateUser(idValue, {
            id: idValue,
            email,
            fullName,
            mobile
        })
        if (!expense) {
            throw new AppError("User Not Found!", 404);
        }
        return res.status(200).json({
            message: "User Updated Successfully",
            statusCode: 200,
            success: true,
            data: expense,
        });
    }
}