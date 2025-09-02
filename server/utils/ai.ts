import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

const groundingTool = {
    googleSearch: {}
}

const config = {
    tools: [groundingTool]
}

export async function generateResponse(prompt: string): Promise<string | undefined> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        "contents": prompt,
        config
    });

    return response.text;
}
