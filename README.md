# Internet Timemachine

## What is it?
The internet timemachine is an open source project that allows you to browse your own isolated, and contained version of the internet. 
Powered by AI inference, every unique query will prompt AI, allowing an alternate timeline internet all stored on your webserver.

Here's how it works:

1. Beginning with an AI generated search engine, which is customizeable to your liking, you query something, much as you would on Google, or DuckDuckGo (or Brave Search, or whatever)
    - Within this query, you also select a year of which you'd like to view the content at.
2. In the background, the API is queried, prompting the AI to cohesively generate whatever content you request.
    - This content is cached, and may be returned again in the future. 
        - Cached content can be refreshed if you don't like the result
3. You will then browse a completely AI generated version of whatever content you have requested, that will also have it's own unique URL.

## What's it made with?
* Nuxt 4
* TailwindCSS
* SQLite
    * Used for caching data locally