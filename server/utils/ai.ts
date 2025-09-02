import { AiProvider } from "./types/AiProvider";
import { GeminiAiProvider } from "./types/GeminiAiProvider";
import { OpenAiProvider } from "./types/OpenAiProvider";
import { getConfig } from './config';

let imageProvider: AiProvider | undefined;
let textProvider: AiProvider | undefined;

/**
 * Gets the image provider, initializing it if necessary.
 */
async function getImageProvider(): Promise<AiProvider> {
    if (!imageProvider) {
        const config = await getConfig();
        imageProvider = initializeProvider(config.ai.image.provider);
        console.log(`Using: ${config.ai.image.provider.toUpperCase()} as image provider.`);
    }
    return imageProvider;
}

/**
 * Gets the text provider, initializing it if necessary.
 */
async function getTextProvider(): Promise<AiProvider> {
    if (!textProvider) {
        const config = await getConfig();
        textProvider = initializeProvider(config.ai.text.provider);
        console.log(`Using: ${config.ai.text.provider.toUpperCase()} as text provider.`);
    }
    return textProvider;
}

/**
 * Generates a text response from the given prompt, via the desired text provider.
 * @param prompt The prompt to generate a response for.
 * @returns The generated response, or undefined if generation failed.
 */
export async function generateResponse(prompt: string): Promise<string | undefined> {
    console.log("Generating response for prompt:", prompt);
    const provider = await getTextProvider();
    const response = await provider.generateResponse(prompt);

    console.log("Generated response:", response);
    return response;
}

/**
 * Generates an image response from the given prompt, via the desired image provider.
 * @param prompt The prompt to generate an image for.
 * @returns The generated image response, or undefined if generation failed.
 */
export async function generateImage(prompt: string, revisePrompt: boolean = true): Promise<string | undefined> {
    console.log("Generating image for prompt:", prompt);

    const betterPrompt = `Generate a proper prompt to feed an image gen based on this: ${prompt}`;

    const promptResponse = revisePrompt ? await generateResponse(betterPrompt) : undefined;

    console.log("Generated image prompt:", promptResponse);

    console.log("Generating image...")
    const provider = await getImageProvider();
    const response = await provider.generateImage(promptResponse || prompt);

    console.log("Generated image response.");
    return response;
}

/**
 * Initializes the AI provider based on the given provider name.
 * @param provider The name of the provider to initialize.
 * @returns The initialized AI provider.
 */
function initializeProvider(provider: string): AiProvider {
    switch (provider) {
        case "google":
            return new GeminiAiProvider(process.env.GEMINI_API_KEY!);
        case "openai":
            return new OpenAiProvider(process.env.OPENAI_API_KEY!);
        default:
            throw new Error(`Unknown provider: ${provider}`);
    }
}