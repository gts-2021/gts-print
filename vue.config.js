const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 8585,  // Changez le port ici
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/colors.scss";`
      }
    }
  },
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        'vue$': 'vue/dist/vue.esm-bundler.js'  
      },
    },
    output: {
      libraryExport: 'default'
    }
  },

  pluginOptions: {
    vuetify: {
      // Configuration options for Vuetify, if needed
    }
  }
});