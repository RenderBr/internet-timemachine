import { getConfig } from "~~/server/utils/config";
import { AiProvider } from "./AiProvider";
import OpenAI from 'openai';

export class OpenAiProvider implements AiProvider {
    private apiKey: string | undefined;
    private client: OpenAI | undefined;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.init();
    }

    init(): void {
        this.client = new OpenAI({
            apiKey: this.apiKey
        });
    }

    async generateResponse(prompt: string): Promise<string | undefined> {
        const config = await getConfig();
        const response = await this.client?.chat.completions.create({
            model: config.ai.text.model,
            messages: [{ role: "user", content: prompt }]
        });
        return response?.choices[0]?.message?.content ?? undefined;
    }

    async generateImage(prompt: string): Promise<string | undefined> {
        const config = await getConfig();
        const response = await this.client?.images.generate({
            model: config.ai.image.model,
            moderation: "low",
            n: 1,
            output_format: "png",
            quality: config.image_quality,
            prompt: prompt,
        });

        return response?.data?.[0]?.b64_json ?? undefined;
    }

}