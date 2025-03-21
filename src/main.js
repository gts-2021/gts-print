import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './styles/fonts.scss'
import router from './router/Router'

loadFonts()

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
