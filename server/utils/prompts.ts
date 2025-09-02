import { PromptInformation } from '../../shared/PromptInformation';

export function getSitePrompt(info: PromptInformation): string {
    let prompt = `
        You are simulating an "Internet Timemachine", similar to a web archive. Generate the complete HTML for ${info.url} as it appeared in ${info.year}.

        Rules:
        - Output strictly raw HTML. No explanations, comments, or markdown wrappers. The response must begin with <html>.
        - Use only vanilla JavaScript.
        - Styling:
        - Use only layouts, fonts, and color palettes that were prevalent in ${info.year}.
        - If ${info.year} < 2000 → use table-based layouts and inline CSS.
        - If 2000 ≤ ${info.year} < 2010 → use external CSS and simple floats/div layouts.
        - If ${info.year} ≥ 2017 → CSS Flexbox and Grid are allowed.
        - Fonts must match the era (e.g., Times New Roman, Verdana, Arial in 1990s/2000s).
        - Graphics:
        - Inline SVG is mandatory for all icons, logos, and simple shapes.
        - Raster images (only if unavoidable) must be PNG.
        - Filenames must be descriptive, include dimensions/transparency, and end with .png.
        - Append ?image=true&year=${info.year} to all PNG URLs.
        - Always include explicit width and height attributes when downscaling. 
        - All image files will be 1024x1024, keep this in mind.
        - Links and assets:
        - Must be rooted at /site/${info.root}, e.g. /site/${info.root}/about?year=${info.year}.
        - Rewrite external domains to the same format, preserving full path/query, e.g. /site/instagram.com/billgates/photos?x=1&year=${info.year}.
        - Never use absolute http/https URLs.
        - Historical accuracy:
        - Style, content, and layout must reflect the technology, design trends, and culture of ${info.year}.
        - Do not mention AI, future events, or break historical immersion.
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