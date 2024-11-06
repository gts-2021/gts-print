<template>

    <div class="gts-input-group">
        <div class="gts-label-container">
            <span class="gts-input-label">{{ label }}</span> <span v-if="required"
                class="gts-input-required">(required)</span>
        </div>
        <div class="gts-input-container">
            <slot></slot>
        </div>
        <span v-if="error" class="gts-input-error-msg">{{ error }}</span>

    </div>

</template>

<script>
import InputCommonProps from './InputCommonProps';

export default {
    name: 'CommonInput',
    mixins: [InputCommonProps],
    data() {
        return {
            inputValue: this.value
        };
    },
    methods: {

        onCalendarIconClick() {
            this.$refs.gtsInput.focus();
        },
        onInputValueChanged(value) {
            this.$emit('onValueChanged', value)

        }
    },
    watch: {
        modelValue(newVal) {
            this.onInputValueChanged(newVal)
        }
    },

}
</script>

<style lang="scss">
.gts-calendar-icon {
    position: absolute;
    color: gray !important;
    right: 10px;
    top: 11px;
    cursor: pointer;
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