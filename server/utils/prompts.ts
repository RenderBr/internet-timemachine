import { PromptInformation } from '../../shared/PromptInformation';

export function getSitePrompt(info: PromptInformation): string {
    let prompt = `
    You are simulating an "Internet Timemachine", almost like a web archive. Produce the complete HTML for ${info.url} as it appeared in ${info.year}.

    Rules:
    - Use only vanilla JavaScript and Tailwind CSS.
    - Only use styles and layouts that were prevalent in ${info.year}.
    - Prefer inline SVG.
    - If raster images are needed, use PNG only.
    - Filenames must be descriptive, include dimensions/transparency, and end with .png.
    - Append ?image=true&year=${info.year} to all PNG URLs.
    - Links and assets:
    - Must be rooted at /site/${info.root}, e.g. /site/${info.root}/about?year=${info.year}.
    - Rewrite external domains into the same format, e.g. /site/instagram.com/billgates?year=${info.year}.
    - Output strictly the raw HTML (no markdown, no comments).
    - Style and content must reflect the design trends, fonts, and color palettes of ${info.year}.
    - Do not mention AI, the future, or break historical accuracy.
    - Do not wrap the content in a code tag, i.e: \`\`\`html
`;

    if (info.rootContent) {
        prompt += `

    Base the layout and styling on the root page for cohesion:
    ${info.rootContent}
    `;
    }

    return prompt;
}

export function getImageAssetPrompt(info: PromptInformation): string {
    return `
        Generate a PNG image for the path: ${info.url}, year ${info.year}.

        # Rules:
        - Use a descriptive filename that reflects the content (e.g., "homepage-banner-1024x512.png").
        - Include dimensions in the filename if size is relevant.
        - Output only the image description needed to generate the asset.
        - Do not include commentary or extra text.
`;
}