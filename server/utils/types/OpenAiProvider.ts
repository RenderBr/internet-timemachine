import { AiProvider } from "./AiProvider";
import OpenAI from 'openai';
import timemachineConfig from '../../../timemachine.config.json';

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
        const response = await this.client?.chat.completions.create({
            model: timemachineConfig.ai.text.model,
            messages: [{ role: "user", content: prompt }]
        });
        return response?.choices[0]?.message?.content ?? undefined;
    }

    async generateImage(prompt: string): Promise<string | undefined> {
        const response = await this.client?.images.generate({
            model: timemachineConfig.ai.image.model,
            moderation: "low",
            n: 1,
            output_format: "png",
            prompt: prompt,
        });

        return response?.data?.[0]?.b64_json ?? undefined;
    }

}