import { Router } from "express";
import { AIController } from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/authMiddleware";


const aiRouter = Router();

const aiController = new AIController();

aiRouter.post("/chat", authMiddleware, (req, res) => aiController.aiChatController(req, res))


export default aiRouter;