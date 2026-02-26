import { Router } from "express";
import { PostgresCategoryRepository } from "../repositories/CategoryRepository";
import { CategoryService } from "../services/CategoryServices";
import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

const categoryRepository = new PostgresCategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management APIs
 */

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDTO'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
categoryRouter.post('/create', (req, res) => categoryController.createCategory(req, res))

/**
 * @swagger
 * /api/category/getAll:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRouter.get('/getAll', (req, res) => categoryController.getAllCategory(req, res))

/**
 * @swagger
 * /api/category/getSingle/{id}:
 *   get:
 *     summary: Get single category by query param
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single category
 */
categoryRouter.get('/getSingle/:id', (req, res) => categoryController.getSingleCategory(req, res))

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */
categoryRouter.delete('/delete/:id', (req, res) => categoryController.deleteCategory(req, res))
categoryRouter.post('/filter', (req, res) => categoryController.filterCategory(req, res))

// AI ROUTES
categoryRouter.post('/ai/create', (req, res) => categoryController.ai_createCategory(req, res))


export default categoryRouter;