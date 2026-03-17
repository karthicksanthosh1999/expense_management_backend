import { Request, Response } from "express";
import { AIAgentService } from "../services/AIServices";

export class AIController {
    private aiServices: AIAgentService;
    constructor() {
        this.aiServices = new AIAgentService()
    }

    async aiChatController(req: Request, res: Response) {
        console.log("BODY:", req.body);
        const { message } = req.body;
        console.log("MESSAGE:", message);
        const response = await this.aiServices.askAI(message)
        return res.status(200).json({
            message: "Ai Response",
            success: true,
            data: response,
            code: 200
        })
    }
}