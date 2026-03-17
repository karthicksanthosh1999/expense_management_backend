import { AIAgent } from "../ai_agent/agent";

export class AIAgentService {
    async askAI({ message }: { message: string }) {
        const result = await AIAgent.invoke({
            messages: [
                {
                    role: "human",
                    content: message
                }
            ]
        })
        return result;
    }
}