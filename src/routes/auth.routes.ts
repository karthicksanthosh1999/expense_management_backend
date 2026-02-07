import { Router } from "express";
import { AuthService } from "../services/AuthService";
import { PostgresUserRepository } from "../repositories/PostgresUserRepository";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRoutes = Router();

const userRepository = new PostgresUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", (req, res) => authController.login(req, res));
authRoutes.post("/refresh", (req, res) => authController.refresh(req, res));
authRoutes.get("/decode", (req, res) => authController.decodeUser(req, res));
authRoutes.post("/logout", authMiddleware, (req, res) =>
  authController.logout(req, res),
);

export default authRoutes;
