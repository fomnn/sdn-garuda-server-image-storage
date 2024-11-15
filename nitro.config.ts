// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',

  storage: {
    fs: {
      driver: 'fs',
      base: './storage',
    },
  },

  compatibilityDate: '2024-11-09',
  runtimeConfig: {
    baseUrl: 'localhost:3000',
  },
})
