<template>



  <CommonInput v-bind="$props">
    <div tabindex="0" @blur="closeList" @click="onDropDownClick" class="gts-listbox-container">
      <v-icon @click="onDropDownClick" class="gts-listbox-dropdown">mdi mdi-arrow-down-drop-circle-outline</v-icon>
      <div :class="'gts-input gts-listbox ' + (disabled ? 'gts-input-disabled ' : ' ') + (error ? 'gts-input-error' : '')"
        ref="gtsInput">
        <span class="gts-listbox-value">{{ inputValue.label }}</span>
      </div>

      <div v-if="isOpen" class="gts-listbox-option-container">
        <span @click="onOptionSelected(option, $event)" v-for="(option, index) in options" :key="index"
          class="gts-listbox-option">{{ option.label }}</span>

      </div>
    </div>
  </CommonInput>


</template>

<script>

import CommonInput from './CommonInput.vue';
import InputCommonProps from './InputCommonProps';

export default {

  name: 'ListBox',
  components: {
    CommonInput
  },
  created() {
    this.inputValue = this.options[0];
  },
  mixins: [InputCommonProps],
  props: {
    options: {
      type: Array,
      required: false
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    onDropDownClick(event) {
      event.stopPropagation();
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
        if (this.open) {
          this.$refs.gtsInput.focus()
        }
      }
    },
    onOptionSelected(option, event) {
      event.stopPropagation();
      this.closeList();
      this.inputValue = option;
    },
    closeList() {
      this.isOpen = false;
    }
  }
}

</script>

<style lang="scss">
@import './input-common-css.scss';

.gts-listbox {
  display: flex;
  align-items: center;
  cursor: pointer;

}

.gts-listbox-container {
  position: relative;

  .gts-listbox-dropdown {
    position: absolute;
    right: 12px;
    top: 12px;
    color: $primary-color-400;
    cursor: pointer;
  }

  .gts-listbox-option-container {
    position: absolute;
    display: flex;
    max-height: 300px;
    overflow-y: scroll;
    flex-direction: column;
    width: 100%;
    border: 1px solid $neutral-color-300;
    border-radius: 5px;
    background-color: white;
    z-index: 15;

    .gts-listbox-option {
      padding: 12px;
      cursor: pointer;
    }

    .gts-listbox-option:hover {
      background-color: $primary-color-50;

    }
  }
}
</style>