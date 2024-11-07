<template>

    <CommonInput v-bind="$props">
        <input @input="emitInput" :disabled="disabled" v-model="inputValue"  ref="gtsInput"
                :class="'gts-input gts-input-calendar'+(disabled ? 'gts-input-disabled' : ' ')+(error ? ' gts-input-error' : '')" :type="type" :placeholder="placeholder">
            <v-icon v-if="type == 'date'" @click="onCalendarIconClick" class="gts-calendar-icon">mdi
                mdi-calendar-month</v-icon>
    </CommonInput>

</template>

<script>
import CommonInput from './CommonInput.vue';
import InputCommonProps from './InputCommonProps';

export default {
    name: 'TextInput',
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
    top: 11px;
    cursor: pointer;
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