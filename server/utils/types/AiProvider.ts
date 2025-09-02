export interface AiProvider {
    init(apiKey: string): void;
    generateResponse(prompt: string): Promise<string | undefined>;
    generateImage(prompt: string): Promise<string | undefined>;
}