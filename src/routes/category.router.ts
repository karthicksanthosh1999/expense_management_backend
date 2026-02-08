import { Router } from "express";
import { PostgresCategoryRepository } from "../repositories/CategoryRepository";
import { CategoryService } from "../services/CategoryServices";
import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

const categoryRepository = new PostgresCategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.post("/create", (req, res) =>
  categoryController.createCategory(req, res),
);
categoryRouter.get("/getAll", (req, res) =>
  categoryController.getAllCategory(req, res),
);
categoryRouter.get("/getSingle", (req, res) =>
  categoryController.getSingleCategory(req, res),
);
categoryRouter.delete("/delete", (req, res) =>
  categoryController.deleteCategory(req, res),
);

export default categoryRouter;
