// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "nuxt-primevue"],
  content: {
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: ["rehype-mathjax"],
    },
  },
  css: [
    "primevue/resources/themes/aura-dark-blue/theme.css",
    "primeflex/primeflex.css",
    "primeicons/primeicons.css",
    '~/assets/css/global.css'
  ],
});
