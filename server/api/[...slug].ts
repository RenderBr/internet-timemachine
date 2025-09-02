import { sites } from "../database/schema"
import { eq, and, like } from "drizzle-orm";
import { generateImage, generateResponse } from "../utils/ai";
import { getImageAssetPrompt, getSitePrompt } from "../utils/prompts";
import { PromptInformation } from "~~/shared/PromptInformation";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const siteUrl = getRouterParams(event)["slug"] ?? '';
    const yearString = query.year?.toString() ?? '2025';
    const siteRoot = siteUrl
        .replace(/(^\w+:|^)\/\//, '')
        .replace(/\/.*$/, '');

    const image = query.image?.toString() ?? '';

    if (!siteUrl) {
        return createError({ statusCode: 400, statusMessage: 'Missing site URL' });
    }

    if (!yearString) {
        return createError({ statusCode: 400, statusMessage: 'Missing year' });
    }

    const year = parseInt(yearString);
    const isImage = image === 'true';

    const appConfig = await getConfig();
    const doCaching = isImage ? (appConfig.cache.images) : (appConfig.cache.webpages);

    let site = doCaching ? await useDrizzle().select().from(sites)
        .where(and(eq(sites.url, siteUrl), eq(sites.year, year)))
        .limit(1).get() : null;


    if (!site) {

        const rootSiteContent = await useDrizzle().select().from(sites)
            .where(and(like(sites.url, `%${siteRoot}%`), eq(sites.year, year)))
            .limit(1).get();

        const promptInformation: PromptInformation = {
            root: siteRoot,
            url: siteUrl,
            year: year,
            rootContent: rootSiteContent?.file as string
        };

        let siteContents = isImage ? await generateImage(getImageAssetPrompt(promptInformation))
            : await generateResponse(getSitePrompt(promptInformation));

        if (!siteContents) {
            return createError({ statusCode: 500, statusMessage: 'AI generation failed' });
        }

        let siteInsert = {
            url: siteUrl,
            year: year,
            file: siteContents,
            site: siteRoot
        };

        if (doCaching) {
            site = await useDrizzle().insert(sites).values(siteInsert).returning().get();
        }else{
            site = {
                id: -1,
                url: siteUrl,
                year: year,
                file: siteContents,
                createdAt: new Date().getSeconds(),
                site: siteRoot
            };
        }

    }

    if (isImage) {
        // return base64 representation of the image
        // set Content-Type header
        event.node.res.setHeader("Content-Type", "image/png");
        return Buffer.from((site.file as any).toString(), 'base64');
    }

    return site.file;
})