import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../types/RequestWithUser";
import { AppError } from "../middlewares/errors/appError";

export const authMiddleware = (
    req: RequestWithUser,
    _res: Response,
    next: NextFunction
) => {

    const token = req.headers.authorization?.split(" ")[1];
    const rawToken = req.cookies.refreshToken;

    const finalToken = token || rawToken;

    if (!finalToken) {
        throw new AppError("Unauthorized", 401, false);
    }

    const payload = jwt.verify(
        finalToken,
        process.env.REFRESH_TOKEN_SECRET!
    ) as { id: string; email?: string };

    req.user = payload;

    next();
};
