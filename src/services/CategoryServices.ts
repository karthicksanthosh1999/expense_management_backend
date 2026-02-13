import { Category } from "../entities/Category";
import { CategoryRepository } from "../interfaces/CategoryRepository";
import { createCategoryOTO } from "../types/categoryType";

export class CategoryService {
    constructor(private categoryRepo: CategoryRepository) { }

    async addCategory(data: createCategoryOTO): Promise<Category> {
        const saveCategory = await this.categoryRepo.createCategory(data)
        return saveCategory
    }

    async singleCategory(id: string): Promise<Category> {
        const selectedCategory = await this.categoryRepo.fineById(id)
        return selectedCategory
    }

    async getAllCategory(): Promise<Category[]> {
        const allCategory = await this.categoryRepo.findAll();
        return allCategory
    }

    async filterCategories(startDate: Date | null, endDate: Date | null): Promise<Category[]> {
        const allCategory = await this.categoryRepo.filterCategory(startDate, endDate);
        return allCategory
    }

    async deleteCategory(id: string): Promise<Category> {
        const deletedCategory = await this.categoryRepo.deleteById(id);
        return deletedCategory
    }

    async update(data: createCategoryOTO, id: string): Promise<Category> {
        const updateCategory = await this.categoryRepo.updateById(data, id);
        return updateCategory
    }
}