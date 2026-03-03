import { Router } from "express";
import { PostgresGoalRepository } from "../repositories/PostgresGoalRepository";
import { GoalServices } from "../services/GoalServices";
import { GoalController } from "../controllers/goal.controller";

const goalRouter = Router();

const goalRepository = new PostgresGoalRepository();
const goalService = new GoalServices(goalRepository);
const goalController = new GoalController(goalService);

goalRouter.post("/create", (req, res) =>
  goalController.createGoalController(req, res),
);
goalRouter.get("/getAll", (req, res) =>
  goalController.findAllGoalController(req, res),
);
goalRouter.get("/getSingle/:id", (req, res) =>
  goalController.findSingleGoalController(req, res),
);
goalRouter.delete("/delete/:id", (req, res) =>
  goalController.deleteGoalController(req, res),
);

export default goalRouter;
