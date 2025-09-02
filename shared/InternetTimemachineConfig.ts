import type { ConfigureableProvider } from "./ConfigureableProvider"

export interface InternetTimemachineConfig {
    ai: {
        image: ConfigureableProvider,
        text: ConfigureableProvider
    },
    cache: {
        images: boolean,
        webpages: boolean,
    },
    image_quality: 'low' | 'medium' | 'high' | 'auto'
}