<template>

  <CommonInput v-bind="$props">
    <input @input="emitInput" :disabled="disabled" v-model="inputValue" ref="gtsInput"
      :class="'gts-input gts-input-calendar' + (disabled ? 'gts-input-disabled' : ' ') + (error ? ' gts-input-error' : '')"
      :type="(type == 'password' && isShowPassword ? 'text' : type)" :placeholder="placeholder" v-maska :data-maska="maskToken?.pattern || maskPattern"
      :data-maska-tokens="maskToken.token">

    <svg v-if="type == 'password' && !isShowPassword" class="gts-eye-icon gts-show-password" @click="showPassword" xmlns="http://www.w3.org/2000/svg" 
      width="25px" height="20px">
      <path
        d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
    </svg>
    <svg v-if="type == 'password' && isShowPassword" class="gts-eye-icon gts-hide-password" @click="hidePassword" xmlns="http://www.w3.org/2000/svg" width="25px" height="20px"><path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" /></svg>

    <svg v-if="type == 'date'" @click="onCalendarIconClick" class="gts-calendar-icon" width="20px" height="20px"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" />
    </svg>
  </CommonInput>

</template>

<script>
import CommonInput from './CommonInput.vue';
import InputCommonProps from './InputCommonProps';
import { vMaska } from "maska/vue";

export default {

  name: 'TextInput',

  directives: { maska: vMaska },

  components: {
    CommonInput
  },

  mixins: [InputCommonProps],

  props: {
    type: {
      type: String,
      default: "text",
      required: false
    },
    maskPattern: {
      type: String,
      default: "",
      required: false
    },
    maskToken: {
      type: Object,
      default() {
        return {
          pattern: "",
          token: ""
        }
      },
      required: false
    },

  },
  data() {
    return {
      isShowPassword: false,
    }
  },
  methods: {

    onCalendarIconClick() {
      this.$refs.gtsInput.focus();
      this.$refs.gtsInput.showPicker();
    },
    showPassword(){
      this.isShowPassword = true;
    },
    hidePassword(){
      this.isShowPassword = false;
    }

  },


}
</script>

<style lang="scss">
@import './input-common-css.scss';

.gts-calendar-icon {
  position: absolute;
  color: $primary-color-400 !important;
  left: 10px;
  top: 15px;
  cursor: pointer;

  path {
    fill: $primary-color-400 !important;
  }
}

.gts-eye-icon {
  position: absolute;
  color: $primary-color-400 !important;
  right: 10px;
  top: 15px;
  cursor: pointer;

  path {
    fill: $primary-color-400 !important;
  }
}

input[type='date'] {
  padding-left: 40px !important;
}

input[type='date']::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
}
</style>