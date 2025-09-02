import type { ConfigureableProvider } from "./ConfigureableProvider"

export interface InternetTimemachineConfig {
    ai: {
        image: ConfigureableProvider,
        text: ConfigureableProvider
    }
}