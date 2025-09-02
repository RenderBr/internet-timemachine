import { InternetTimemachineConfig } from "../../shared/InternetTimemachineConfig";

let config: InternetTimemachineConfig | undefined = undefined;

const DEFAULT_CONFIG: InternetTimemachineConfig = {
    ai: {
        image: {
            provider: "openai",
            model: "gpt-image-1"
        },
        text: {
            provider: "google",
            model: "gemini-2.5-flash-lite"
        }
    },
    image_quality: 'auto',
    cache: {
        images: true,
        webpages: true,
    }
};

export async function getConfig(): Promise<InternetTimemachineConfig> {
    if (!config) {
        try {
            // Try to load the user's config from timemachine.dev.config.ts
            const userConfig = await import("../../timemachine.dev.config");
            config = userConfig.default;
        } catch (error) {
            try {
                // Fallback to timemachine.config.ts
                const userConfig = await import("../../timemachine.config");
                config = userConfig.default;
            } catch (fallbackError) {
                // Final fallback to default config
                console.warn('Could not load config files, using default configuration:', error);
                config = DEFAULT_CONFIG;
            }
        }
    }

    return config!;
}

export function defineInternetTimemachineConfig(newConfig: InternetTimemachineConfig) {
    config = newConfig;
}