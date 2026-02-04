import { AppError } from "./errors/appError";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, _res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new AppError("Invalid Token", 401, false);

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = payload;

    next()
}