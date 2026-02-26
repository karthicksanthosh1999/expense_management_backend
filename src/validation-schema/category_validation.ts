import { z } from "zod";

export const categoryValidationSchema = z.object({
    id: z.string().optional(),
    title: z.string().describe("Category title is required"),
    userId: z.string().describe("User ID is required"),
    color: z.string().describe("Category color in hex is required"),
});

export type TCategoryValidationSchema = z.infer<typeof categoryValidationSchema>