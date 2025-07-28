<template>

  <div :class="`gts-notification-container ${theme || ''}`">
    <slot></slot>
  </div>

</template>

<script>

export default {

  name: 'NotificationComponent',


  props: {

    className: {
      type: String,
      required: false,
      default() {
        return 'gts-badge';
      }
    },

    theme: {
      type: String,
      required: false,
      default() {
        return '';
      }
    },


  },

}
</script>

<style lang="scss">
.gts-notification-container {
  border: 1px solid;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 0.2cm rgba(117, 117, 117, 0.336);

}

/* PRIMARY */
.gts-notification-primary {
  color: $primary-color-500;
  background-color: $primary-color-50;
  border-color: $primary-color-100;

}

/* SUCESS */
.gts-notification-success {
  color: $secondary-color-700;
  background-color: $secondary-color-100;
  border-color: $secondary-color-500;
}

/* DANGER */
.gts-notification-danger {
  color: $accent-dark-red-color;
  background-color: $accent-light-red-color;
  border-color: $accent-dark-red-color;
}

/* WARNING */
.gts-notification-warning {
  color:rgb(189, 161, 2);
  background-color: rgb(251, 252, 190);
  border-color: $accent-dark-orange-color;
}
</style>