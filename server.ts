import "dotenv/config";
import express, { Application } from "express";
import userRouters from "./src/routes/user.routes";
import { ErrorHandlerMiddleware } from "./src/middlewares/errors/errorHandler";
import authRoutes from "./src/routes/auth.routes";
import dotenv from "dotenv";
import categoryRouter from "./src/routes/category.router";
import expenseRouter from "./src/routes/expense.router";
import goalRouter from "./src/routes/goal.router";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/docs/swagger";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.2.48:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// SWAGGER ROUTES
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api/users", userRouters);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/goal", goalRouter);

// MIDDLEWARES
app.use(ErrorHandlerMiddleware);

app.listen(5000, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
