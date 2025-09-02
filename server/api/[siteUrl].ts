import { sites } from "../database/schema"
import { eq, and } from "drizzle-orm";
import { generateResponse } from "../utils/ai";

export default defineEventHandler(async (event) => {
    const siteUrl = getRouterParam(event, 'siteUrl');
    const yearString = getQuery(event).year?.toString();
    const siteRoot = siteUrl?.replace(/(^\w+:|^)\/\//, '').replace(/\/.*$/, '');

    if(!siteUrl || !yearString || !siteRoot){ 
        return createError({ statusCode: 400, statusMessage: 'Missing parameters' });
    }

    const year = parseInt(yearString);

    let site = await useDrizzle().select().from(sites)
        .where(and(eq(sites.url, siteUrl), eq(sites.year, year)))
        .limit(1).get();
        
    if(!site){
        const siteContents = await generateResponse(`Create what you believe the page: 
            ${siteUrl} in the year ${year} should look like. Generate the HTML for the page.
            You may use JavaScript, or Tailwind CSS for styling.
            Output only the code in plaintext. Do not make any comments, or remarks, or wrap it in Markdown. 
            Any sublinks should be built relative to the site root, which is /${siteRoot}. For example, if the site is wikipedia.org, a link to the about page should be /wikipedia.org/about.
            The links should also include the year as a query parameter, for example /wikipedia.org/about?year=${year}.
            Images should be the same, except they should include an ?image=true query parameter.`);
        if(!siteContents){
            return createError({ statusCode: 500, statusMessage: 'AI generation failed' });
        }

        let siteInsert = {
            url: siteUrl,
            year: year,
            file: siteContents,
            site: siteRoot
        };

        site = await useDrizzle().insert(sites).values(siteInsert).returning().get();
    }

    return site.file;
})