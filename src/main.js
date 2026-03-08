import { createApp } from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './styles/fonts.scss'
import './styles/notifications.scss'
import router from './router/Router'
import NotificationPlugin from './plugins/NotificationPlugin'
import i18n from './i18n'

loadFonts()

createApp(App)
    .use(vuetify)
    .use(router)
    .use(i18n)
    .use(NotificationPlugin)
    .mount('#app')
