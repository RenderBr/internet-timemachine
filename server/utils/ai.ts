import { GoogleGenAI } from "@google/genai";
import OpenAI from 'openai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});

const groundingTool = {
    googleSearch: {}
}

const config = {
    tools: [groundingTool]
}

export async function generateResponse(prompt: string): Promise<string | undefined> {
    console.log("Generating response for prompt:", prompt);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        "contents": prompt,
        config
    });

    console.log("Generated response:", response.text);
    return response.text;
}

export async function generateImage(prompt: string): Promise<string | undefined> {
    console.log("Generating image for prompt:", prompt);

    const betterPrompt = `Generate a proper prompt to feed an image gen based on this: ${prompt}`;

    const promptResponse = await generateResponse(betterPrompt);

    console.log("Generated image prompt:", promptResponse);

    console.log("Generating image...")
    const response = await openai.images.generate({
        model: 'gpt-image-1',
        moderation: "low",
        n: 1,
        output_format: "png",
        prompt: promptResponse ?? prompt,
    });

    console.log("Generated image response.");
    if (response.data && response.data[0]) {
        return response.data[0].b64_json;
    }

    return;
}