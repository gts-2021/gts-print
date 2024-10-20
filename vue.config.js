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
        '@': path.resolve(__dirname, 'src'), // Définit le raccourci '@' pour le dossier 'src'
        '@components': path.resolve(__dirname, 'src/components'), // Raccourci pour les composants
        '@pages': path.resolve(__dirname, 'src/pages'), // Raccourci pour les pages
        '@services': path.resolve(__dirname, 'src/services'), // Raccourci pour les services
        '@constants': path.resolve(__dirname, 'src/constants'), // Raccourci pour les constantes
        // Ajoutez d'autres alias si nécessaire
      },
    },
    output: {
      libraryExport: 'default'
    }
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
});
