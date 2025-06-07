// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui-pro'],
  devtools: { enabled: true },
  compatibilityDate: '2025-05-15',
  eslint: { config: { stylistic: true } },
  css: ['~/assets/css/main.css'],
})
