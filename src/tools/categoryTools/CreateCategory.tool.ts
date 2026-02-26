import { tool } from '@langchain/core/tools'
import { CategoryRepository } from '../../interfaces/CategoryRepository';
import { categoryValidationSchema, TCategoryValidationSchema } from '../../validation-schema/category_validation';


export const createCategoryToll = (categoryService: CategoryRepository) => tool(
    async ({ color, title, userId }: TCategoryValidationSchema) => {
        await categoryService.createCategory({ color, title, userId })
    },
    {
        name: "ai_create_category",
        description: "create the category through ai",
        schema: categoryValidationSchema
    }
);

export const updateCategoryModel = (categoryService: CategoryRepository) => tool(
    async ({ color, title, userId, id }: TCategoryValidationSchema) => {
        let category = { color, title, userId };
        await categoryService.updateById(category, id!)
    },
    {
        name: "ai_update_category",
        description: "Delete the category through ai",
        schema: categoryValidationSchema
    }
)