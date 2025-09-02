import { GoogleGenAI } from "@google/genai";
import { AiProvider } from "./AiProvider";
import timemachineConfig from '../../../timemachine.config.json';

export class GeminiAiProvider implements AiProvider {
    private apiKey: string | undefined;
    private client: GoogleGenAI | undefined;

    private groundingTool = {
        googleSearch: {}
    }

    private config = {
        tools: [this.groundingTool]
    }

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.init();
    }
    
    init(): void {
        this.client = new GoogleGenAI({
            apiKey: this.apiKey
        });
    }

    async generateResponse(prompt: string): Promise<string | undefined> {
        const response = await this.client?.models.generateContent({
            model: timemachineConfig.ai.text.model,
            "contents": prompt,
            config: this.config
        });
        return response?.text ?? undefined;
    }

    async generateImage(prompt: string): Promise<string | undefined> {
        const response = await this.client?.models.generateImages({
            model: timemachineConfig.ai.image.model,
            prompt,
            config: {
                numberOfImages: 1,
                includeRaiReason: true
            }
        });

        return response?.generatedImages?.[0]?.image?.imageBytes ?? undefined;
    }

}