export interface ConfigureableProvider {
    provider: "google" | "openai";
    model: string;
}