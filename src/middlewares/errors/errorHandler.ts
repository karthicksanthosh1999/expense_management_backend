import e, { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";

export const ErrorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
            status: err.isOperational,
        })
    }

    console.error("🔥 Unexpected Error:", err);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
}