<template>



  <CommonInput v-bind="$props">
    <div tabindex="0" @blur="closeList" @click="onDropDownClick" class="gts-listbox-container">
      <v-icon @click="onDropDownClick" class="gts-listbox-dropdown">mdi mdi-chevron-down</v-icon>
      <div
        :class="'gts-input gts-listbox ' + (disabled ? 'gts-input-disabled ' : ' ') + (error ? 'gts-input-error' : '')"
        ref="gtsInput">
        <span class="gts-listbox-value">
          <component v-if="formatter && inputValue && getFormattedComponent(inputValue, selectedIndex)"
            :is="getFormattedComponent(inputValue, selectedIndex)" :item="inputValue" :option="inputValue"
            :index="selectedIndex" />
          <slot v-else-if="$slots.selected" name="selected" :item="inputValue">
            {{ inputValue?.label }}
          </slot>
          <template v-else>
            {{ inputValue?.label }}
          </template>
        </span>
      </div>

      <div v-if="isOpen" class="gts-listbox-option-container">
        <span @click="onOptionSelected(option, $event)" v-for="(option, index) in rendredOptions" :key="index"
          :class="['gts-listbox-option', option.disabled ? 'gts-listbox-option-disabled' : '']">
          <component v-if="formatter && getFormattedComponent(option, index)" :is="getFormattedComponent(option, index)"
            :item="option" :option="option" :index="index" />
          <slot v-else-if="$slots.option" name="option" :item="option" :index="index">
            {{ option.label }}
          </slot>
          <template v-else>
            {{ option.label }}
          </template>
        </span>

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

  mixins: [InputCommonProps],

  props: {
    selectItemLabel: {
      type: String,
      required: false,
      default: undefined
    },
    isSelectItemLabelSelectable: {
      type: Boolean,
      required: false,
      default: true,
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    defaultValue: {
      type: String,
      required: false
    },
    /**
     * Custom formatter function that returns a Vue component for each option item.
     * Signature: (item, index) => VueComponent
     */
    formatter: {
      type: Function,
      required: false,
      default: null
    }

  },

  computed: {
    rendredOptions() {
      if (this.selectItemLabel) {
        return [
          {
            label: this.selectItemLabel,
            value: undefined,
            disabled: this.isSelectItemLabelSelectable,
          },
          ...(this.options || []),
        ]

      }

      return this.options || [];
    },

    selectedIndex() {
      if (!this.inputValue || !this.rendredOptions) return -1;
      return this.rendredOptions.findIndex(option => option && option.value === this.inputValue.value);
    }
  },

  data() {
    return {
      isOpen: false,
    }
  },

  created() {

    if (this.defaultValue)
      this.setInputValue(this.defaultValue)
    else
      this.inputValue = this.rendredOptions[0];

    if (this.value)
      this.setInputValue(this.value)

  },

  methods: {
    getFormattedComponent(option, index) {
      if (typeof this.formatter === 'function') {
        return this.formatter(option, index);
      }
      return null;
    },

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
      if (option.disabled) {
        return;
      }


      this.closeList();
      if (!this.value) {
        this.inputValue = option;
      }
      this.$emit('onValueChanged', option)
    },

    setInputValue(value) {
      this.inputValue = this.options.find(option => option.value == value) || '';
    },

    closeList() {
      this.isOpen = false;
    }
  },

  watch: {

    options: {
      deep: true,
      immediate: true,
      handler(newOptions) {
        if (this.value) {
          this.setInputValue(this.value);
        } else if (newOptions.length > 0) {
          this.inputValue = newOptions[0];
        }
      },
    },
    value(newVal, old) {

      this.setInputValue(newVal)

    }
  },
}

</script>

<style lang="scss">
@import './input-common-css.scss';

.gts-listbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 41px;

  .gts-listbox-value {
    width: 98%;
  }

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
      display: block;
      padding: 12px;
      cursor: pointer;
      color: $primary-color-700;
    }

    .gts-listbox-option-disabled {
      display: block;
      padding: 12px;
      cursor: pointer;
      color: $neutral-color-600;
      cursor: not-allowed;
    }

    .gts-listbox-option:hover {
      background-color: $primary-color-50;

    }
  }
}
</style>