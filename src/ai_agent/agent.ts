import { createAgent } from "langchain";
import { ai_model } from "../config/ai";
import { createCategoryTool, deleteCategoryTool, getSingleUserCategoryTool } from "../tools/categoryTools/Category.tool";
import { PostgresCategoryRepository } from "../repositories/CategoryRepository";

const categoryRepository = new PostgresCategoryRepository();

const tools = [
    createCategoryTool(categoryRepository),
    deleteCategoryTool(categoryRepository),
    getSingleUserCategoryTool(categoryRepository)
];


export const AIAgent = createAgent({
    model: ai_model,
    tools
})