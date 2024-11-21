<template>

    <CommonInput v-bind="$props">
      <input @input="emitInput" :disabled="disabled" v-model="inputValue"  ref="gtsInput"
        :class="'gts-input gts-input-calendar'+(disabled ? 'gts-input-disabled' : ' ')+(error ? ' gts-input-error' : '')" 
        :type="type" 
        :placeholder="placeholder"
        v-maska  :data-maska="maskToken?.pattern || maskPattern" :data-maska-tokens="maskToken.token">
      <svg v-if="type == 'date'" @click="onCalendarIconClick" class="gts-calendar-icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>calendar-month</title><path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" /></svg>
    </CommonInput>

</template>

<script>
import CommonInput from './CommonInput.vue';
import InputCommonProps from './InputCommonProps';
import { vMaska } from "maska/vue";

export default {

    name: 'TextInput',
    
    directives: {maska: vMaska},

    components:{
        CommonInput
    },

    mixins:[InputCommonProps],

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
        default()  {
          return {
            pattern: "",
            token: ""
          }
        },
        required: false
		},
         
    },
    methods: {
       
        onCalendarIconClick() {
            this.$refs.gtsInput.focus();
            this.$refs.gtsInput.showPicker();
        },
         
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