import { Router } from "express";
import { PostgresUserRepository } from "../repositories/PostgresUserRepository";
import { UserServices } from "../services/UserServices";
import { UserController } from "../controllers/user.controller";

const userRouters = Router();

const userRepository = new PostgresUserRepository();
const userServices = new UserServices(userRepository);
const userController = new UserController(userServices);

userRouters.post("/register", (req, res) =>
  userController.createUser(req, res),
);
userRouters.delete("/delete", (req, res) =>
  userController.deleteUser(req, res),
);
userRouters.get("/getAll", (req, res) => userController.getAllUsers(req, res));

export default userRouters;
