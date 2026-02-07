import { Category } from '../entities/Category'

export interface CategoryRepository {
    createCategory(category: Category): Promise<Category>,
    fineById(id: string): Promise<Category>,
    findAll(): Promise<Category[]>,
    deleteById(id: string): Promise<Category>,
    updateById(category: Category, id: string): Promise<Category>
}