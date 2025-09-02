export default defineNitroPlugin((nitroApp) => {
    if(!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "api-key") {
        console.warn("GEMINI_API_KEY is not set or is using the default value. If you are not using Gemini, you can ignore this warning.");
    }

    if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "api-key") {
        console.warn("OPENAI_API_KEY is not set or is using the default value. If you are not using OpenAI, you can ignore this warning.");
    }
})
