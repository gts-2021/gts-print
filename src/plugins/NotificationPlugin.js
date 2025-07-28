import { createApp, defineComponent } from 'vue';
import Notification from '@/components/notification/NotificationComponent.vue';

export default {
  install(app) {
    const container = document.querySelector('body');

    app.config.globalProperties.$notify = (theme, message, duration = 3000) => {
      const props = { theme, message };

      let wrapper = document.querySelector('.gts-notification-wrapper');

      if (!wrapper) {
        // Si pas existant, créer un nouveau conteneur
        wrapper = document.createElement('div');
        wrapper.className = 'gts-notification-wrapper';
        container.appendChild(wrapper);
      }

      // Préparer point de montage
      const mountPoint = document.createElement('div');
      wrapper.appendChild(mountPoint);

      let instance = null;

      const NotificationWrapper = defineComponent({
        name: 'NotificationWrapper',
        components: { Notification },
        props: ['theme', 'message'],
        template: `
          <Notification :theme="theme" :message="message">
            <div class="notification-content">
              <span class="notification-msg">{{ message }}</span>
              <button class="notification-close" @click="close">×</button>
            </div>
          </Notification>
        `,
        setup(props) {
          const close = () => {
            if (instance) {
              instance.unmount();
             wrapper.removeChild(mountPoint);
            }
          };

          // Nettoyage automatique après délai
          setTimeout(() => {
            close();
          }, duration + 300);

          return { ...props, close };
        }
      });

      instance = createApp(NotificationWrapper, props);
      instance.mount(mountPoint);
    };
  }
};
