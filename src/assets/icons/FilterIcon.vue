<template>
  <SvgIcon v-bind="$props">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 5C2.5 4.44772 2.94772 4 3.5 4H16.5C17.0523 4 17.5 4.44772 17.5 5C17.5 5.27614 17.3893 5.52614 17.2071 5.70711L11.5 11.4142V16C11.5 16.3788 11.286 16.7246 10.9472 16.8944L8.94721 17.8944C8.60569 18.0652 8.19615 18.0336 7.88197 17.8123C7.56779 17.591 7.38197 17.2268 7.4 16.8462L7.5 11.4142L2.79289 5.70711C2.61073 5.52496 2.5 5.27496 2.5 5Z" fill="#002A34"/>
    </svg>
  </SvgIcon>
</template>

<script>
import SvgIcon from './SvgIcon.vue';

export default {
  name: 'FilterIcon',
  components: {
    SvgIcon
  }
}
</script>

<style lang="scss"></style>
