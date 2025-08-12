<template>

  <div id="notification-exemple-container">
 
    <NotificationComponent :theme="PRIMARY">PRIMARY</NotificationComponent> <br>
     <NotificationComponent :theme="DANGER">DANGER</NotificationComponent> <br>
     <NotificationComponent :theme="WARNING">WARNING</NotificationComponent> <br>
    <NotificationComponent :theme="SUCCESS">SUCCESS</NotificationComponent>
    
  </div>

</template>

<script>


import { PRIMARY, SUCCESS, WARNING, DANGER } from '@/constants/notifications.js';
import NotificationComponent from './NotificationComponent.vue';

export default {

  name:"BadgeExample",
 
  components: {
    NotificationComponent,
  },

  mounted(){
   this.$notify(SUCCESS, 'Message de succès', 3000)
   this.$notify(DANGER, 'Message de succès', 5000)
   this.$notify(WARNING, 'Message de succès', 7000)
  },

  data() {
		return {
      PRIMARY,
      SUCCESS,
      WARNING,
      DANGER,
		};
	},

}

</script>

<style lang="scss">

#notification-exemple-container {
  display: flex;
  padding: 20px;
  justify-content: space-around;
  flex-direction: column;

  
}

 


</style>