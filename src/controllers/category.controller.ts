import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryServices";
import { AppError } from "../middlewares/errors/appError";
import { ai_model } from "../config/ai";
import { RequestWithUser } from "../types/RequestWithUser";

export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    async createCategory(req: Request, res: Response) {
        const { title, userId, color } = req.body;
        const category = await this.categoryService.addCategory({
            color,
            title,
            userId
        })

        return res.status(201).json({
            message: "Category Created Successfully",
            data: category
        })
    }

    async filterCategory(req: Request, res: Response) {
        const { startDate, endDate } = req.body;

        const start =
            typeof startDate === "string" && startDate.trim()
                ? new Date(startDate)
                : null;

        const end =
            typeof endDate === "string" && endDate.trim()
                ? new Date(endDate)
                : new Date();

        const endOfDay = new Date(end);
        endOfDay.setHours(23, 59, 59, 999);

        const category = await this.categoryService.filterCategories(
            start,
            endOfDay
        );

        return res.status(200).json({
            message: "Category Created Successfully",
            data: category
        })
    }

    async getAllCategory(req: RequestWithUser, res: Response) {
        const categories = await this.categoryService.getAllCategory()
        return res.status(200).json({
            message: "Fetched All Categories Successfully",
            data: categories
        })
    }

    async getSingleCategory(req: Request, res: Response) {
        const { id } = req.params;

        const idValues = typeof id === "string" ? id : "";

        if (!idValues) {
            throw new AppError("Id is required!", 400);
        }
        const category = await this.categoryService.singleCategory(idValues);
        if (!category) {
            throw new AppError("Expense Not Found!", 404);
        }
        return res.status(200).json({
            message: "Category Fetch Successfully",
            data: category
        })
    }

    async deleteCategory(req: Request, res: Response) {

        const { id } = req.params;

        const idValues = typeof id === "string" ? id : "";

        if (!idValues) {
            throw new AppError("Invalid category id", 404, false)
        }
        const existingCategory = await this.categoryService.singleCategory(idValues)
        if (!existingCategory) {
            throw new AppError("Category Not Exist", 404, false)
        }


        const category = await this.categoryService.deleteCategory(idValues);
        return res.status(200).json({
            message: "Category Deleted Successfully",
            data: category
        })
    }

    // AI USES CONTROLLERS
    async ai_getCategoryByUserId(req: RequestWithUser, res: Response) {
        const userId = req.user?.id
        const idValues = typeof userId === 'string' ? userId : "";
        if (!idValues) {
            throw new AppError("userId is required", 400)
        }
        const category = await this.categoryService.ai_getCategoryByUserId(idValues)
        if (!category) {
            throw new AppError("Category Not Found!", 400)
        }

        return res.status(200).json({
            message: "Category Fetch Successfully",
            data: category,
            status: true,
            code: 200
        })
    }

    async ai_createCategory(req: Request, res: Response) {
        const { message } = req.body;
        const response = await ai_model.invoke(message);
        return res.json({
            success: true,
            data: response.content,
        });
    }
}