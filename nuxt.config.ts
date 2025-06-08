// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui-pro', '@nuxthub/core'],
  $development: { hub: { remote: true } },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-05-15',
  nitro: { experimental: { openAPI: true } },
  hub: {
    workers: true,
    database: true,
    bindings: { compatibilityDate: '2025-05-05' },
  },
  eslint: { config: { stylistic: true } },
})
