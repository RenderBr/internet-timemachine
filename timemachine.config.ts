import { InternetTimemachineConfig } from './shared/InternetTimemachineConfig';

const config: InternetTimemachineConfig = {
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
    cache: {
        images: true,
        webpages: true,
    },
    image_quality: 'auto'
};

export default config;