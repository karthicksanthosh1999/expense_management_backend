import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Expense Tracker API",
            version: "1.0.0",
            description: "Expense Tracker API documentation",
        },
        servers: [
            {
                url: process.env.BASE_URL || "http://localhost:5000",
            },
        ],
        components: {
            schemas: {
                Category: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "uuid" },
                        title: { type: "string", example: "Food" },
                        userId: { type: "string", example: "uuid" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                CreateCategoryDTO: {
                    type: "object",
                    required: ["title", "userId"],
                    properties: {
                        title: { type: "string", example: "Travel" },
                        userId: { type: "string", example: "uuid" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"], // adjust path if needed
};

export const swaggerSpec = swaggerJsdoc(options);
