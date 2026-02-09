import { Router } from "express";
import { PostgresExpenseRepository } from "../repositories/PostgresExpenseRepository";
import { ExpenseServices } from "../services/ExpenseService";
import { ExpenseController } from "../controllers/expense.controller";

const expenseRouter = Router();

const expenseRepository = new PostgresExpenseRepository();
const expenseServices = new ExpenseServices(expenseRepository);
const expenseController = new ExpenseController(expenseServices)

expenseRouter.post(`/create`, (req, res) => expenseController.createExpense(req, res))
expenseRouter.get(`/getAll`, (req, res) => expenseController.findAllExpense(req, res))
expenseRouter.get(`/getSingle/:id`, (req, res) => expenseController.findSingleExpense(req, res))
expenseRouter.delete(`/delete/:id`, (req, res) => expenseController.deleteExpense(req, res))
expenseRouter.get(`/amount`, (req, res) => expenseController.getAmount(req, res))


export default expenseRouter;