// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  nitro: {
    externals: {
      inline: [
        "/timemachine\.dev\.config\.ts$/",
        "/timemachine\.config\.ts$/"
      ]
    },
    routeRules: {
      '/site/**': { proxy: "/api/**" }
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxthub/core'],
  hub: {
    database: true,
  },
  css: ['~/assets/main.css'],
})