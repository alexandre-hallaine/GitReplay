// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui-pro', '@nuxthub/core'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-05-15',
  nitro: { experimental: { openAPI: true } },
  hub: { workers: true },
  eslint: { config: { stylistic: true } },
})
