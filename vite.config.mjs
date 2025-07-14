import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vuetify(), // Ajoutez ici les options spécifiques à Vuetify si nécessaire
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  server: {
    port: 5555, // Port de développement
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/colors.scss";`
      },
    },
  },
  build: {
    outDir: 'dist', // Dossier de sortie
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'gts-print',
      fileName: (format) => `gts-print.${format}.js`,
    },
    rollupOptions: {
      // Exclure vue du bundle (peer dependency)
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        // L'option "libraryExport: 'default'" dans Vue CLI est équivalente à
        // l'export par défaut dans votre entry point (index.js). Assurez-vous
        // que votre module exporte bien l'objet attendu.
      }
    }
  }
});
