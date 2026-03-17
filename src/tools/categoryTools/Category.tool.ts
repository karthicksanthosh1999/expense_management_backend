import { tool } from '@langchain/core/tools'
import { CategoryRepository } from '../../interfaces/CategoryRepository';
import { categoryValidationSchema, TCategoryValidationSchema } from '../../validation-schema/category_validation';
import z from 'zod';

export const createCategoryTool = (categoryService: CategoryRepository) => tool(
    async ({ color, title, userId }: TCategoryValidationSchema) => {
        await categoryService.createCategory({ color, title, userId })
    },
    {
        name: "ai_create_category",
        description: "create the category through ai",
        schema: categoryValidationSchema
    }
);

export const getSingleUserCategoryTool = (categoryService: CategoryRepository) => tool(
    async ({ userId }: { userId: string }) => {
        await categoryService.getCategoryByUserId(userId)
    },
    {
        name: "ai_get_category_by_userId",
        description: "Get the Category By UserId",
        schema: z.object({
            userId: z.string().describe("User Id")
        })
    }
)

export const deleteCategoryTool = (categoryService: CategoryRepository) => tool(
    async ({ id }: { id: string }) => {
        await categoryService.deleteById(id)
    },
    {
        name: "ai_delete_category",
        description: "Delete the category through ai",
        schema: z.object({
            id: z.string().describe("Id"),
        })
    }
)
