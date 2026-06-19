import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Включаем статическую генерацию страниц (SSG) средствами TanStack Start
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
  vite: {
    // Укажите имя вашего репозитория на GitHub (косые черты с двух сторон обязательны)
    base: '/car-calculator/', 
  }
});