# Internet Timemachine
<img width="1176" height="1337" alt="image" src="https://github.com/user-attachments/assets/b59f3020-5be7-454b-ad92-efabcf87da45" />

## What is it?
The internet timemachine is an open source project that allows you to browse your own isolated, and contained version of the internet. 
Powered by AI inference, every unique query will prompt AI, allowing an alternate timeline internet all stored on your webserver.

Here's how it works:

1. Beginning with an AI generated search engine, you query a URL
    - Within this query, you also select a year of which you'd like to view the content at.
2. In the background, the API is queried, prompting the AI to generate whatever content you request.
    - This content is cached, and may be returned again in the future. 
        - Cached content can be refreshed if you don't like the result
3. You will then browse a completely AI generated version of whatever content you have requested, that will also have it's own unique URL.

## What's it made with?
* Nuxt 4
* Vue 3
* AI Providers: Google Gemini (text/content) and OpenAI (image generation) - configurable
* SQLite
    - Drizzle ORM
    - better-sqlite3
- NuxtHub

## Features
- **Flexible Time Travel**: No year limits - explore any year from the past, present, or future
- **Configurable AI Providers**: Choose between Google Gemini and OpenAI for text and image generation
- **Smart Content Generation**: AI uses root domain content for consistent styling and layout across pages
- **Image Asset Generation**: Automatic PNG image generation for website assets with descriptive filenames
- **Caching System**: Generated content is cached in SQLite for faster subsequent access
- **Modern UI**: Clean, responsive interface with dark theme

## Quick Start

1) Prerequisites
- NodeJS 20+

2) Clone the repo: `git clone https://github.com/RenderBr/internet-timemachine`

3) Install packages: `npm install`

4) Configure environment:
- Copy `timemachine.config.example.json` to `timemachine.config.json` and adjust AI providers/models as needed
- Copy `.env.example` to `.env` and fill in your information

`GEMINI_API_KEY` and `OPENAI_API_KEY` must be populated (depending on your configured providers).

5) Run `npx drizzle-kit push`

6) Run the dev server: `npm run dev`

And then boom, you may access the site at http://localhost:3000.

## Environment variables
Defined in `.env` (see `.env.example`):
- GEMINI_API_KEY: used by Google Gemini for text/HTML generation (if using Google provider)
- OPENAI_API_KEY: used by OpenAI for text generation and image generation (if using OpenAI provider)
- DB_FILE_NAME: path to the SQLite database file (default `./database.sqlite`)

## Configuration
The `timemachine.config.json` file allows you to configure AI providers and models:
- **Text Provider**: Choose between Google Gemini or OpenAI for generating website content
- **Image Provider**: Choose between Google Gemini or OpenAI for generating images
- **Models**: Specify which models to use for each provider

Example configuration:
```json
{
    "ai": {
        "text": {
            "provider": "openai",
            "model": "gpt-4.1-mini"
        },
        "image": {
            "provider": "openai",
            "model": "gpt-image-1"
        }
    }
}
```

## Security and costs
- Calling AI providers will incur usage costs on your keys; keep them private.
- Image generation uses the configured image provider with moderation settings.
- Costs vary based on your chosen AI providers and models - monitor your usage accordingly.

## License
Non-Commercial Source License (see `LICENSE`). Contact the author for commercial use.


