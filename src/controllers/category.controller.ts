import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryServices";
import { AppError } from "../middlewares/errors/appError";

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

    async getAllCategory(_req: Request, res: Response) {
        const categories = await this.categoryService.getAllCategory()
        return res.status(200).json({
            message: "Fetched All Categories Successfully",
            data: categories
        })
    }

    async getSingleCategory(req: Request, res: Response) {
        const { id } = req.body;

        if (!id) {
            throw new AppError("Invalid category id", 404, false)
        }

        const category = await this.categoryService.singleCategory(id)

        return res.status(200).json({
            message: "Category Fetch Successfully",
            data: category
        })
    }

    async deleteCategory(req: Request, res: Response) {

        const { id } = req.body;
        if (!id) {
            throw new AppError("Invalid category id", 404, false)
        }

        const existingCategory = await this.categoryService.singleCategory(id)

        if (!existingCategory) {
            throw new AppError("Category Not Exist", 404, false)
        }


        const category = await this.categoryService.deleteCategory(id);
        return res.status(200).json({
            message: "Category Deleted Successfully",
            data: category
        })
    }
}