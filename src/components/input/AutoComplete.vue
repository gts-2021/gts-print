<template>
  <CommonInput v-bind="$props">
    <div class="gts-autocomplete-container" v-click-outside="closeList">

      <input ref="gtsInput" v-model="inputValue" @input="onInput" @focus="onFocus" :disabled="disabled"
        :class="'gts-input gts-autocomplete ' + (disabled ? 'gts-input-disabled' : '') + (error ? ' gts-input-error' : '')"
        type="text" :placeholder="placeholder" />

      <div v-if="isOpen && filteredOptions.length" class="gts-listbox-option-container">
        <span v-for="(option, index) in filteredOptions" :key="index" class="gts-listbox-option"
          @click="onOptionSelected(option)">
          {{ option.label }}
        </span>
      </div>

    </div>
  </CommonInput>
</template>

<script>
import CommonInput from './CommonInput.vue';
import InputCommonProps from './InputCommonProps';

export default {
  name: 'AutoComplete',

  components: {
    CommonInput
  },
  created() {
    this.setUpDefaultSelectedValue();
  },
  mixins: [InputCommonProps],

  emits: [
    'update:modelValue',
    'update:selectedOption',
    'onOptionSelected',
    'onSelectionReset',
    'onValueChanged'
  ],

  props: {
    modelValue: {
      type: String,
      default: ''
    },

    selectedOption: {
      type: Object,
      default: undefined
    },

    options: {
      type: Array,
      default: () => []
    },

    formatSelectedValueDisplay: {
      type: Function,
      required: false
    }
  },

  data() {
    return {
      isOpen: false,
      inputValue: '',
      filteredOptions: []
    }
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.inputValue = newVal || '';
        this.filterOptions();
      }
    },

    options: {
      immediate: true,
      handler() {
        this.filterOptions();
        this.setUpDefaultSelectedValue();
      }
    },

    selectedOption: {
      deep: true,
      handler(newVal) {

        if (newVal && newVal.value !== undefined) {
          const foundOption = this.options.find(option => option.value === newVal.value);
          if (foundOption) {
            const displayValue = this.formatSelectedValueDisplay
              ? this.formatSelectedValueDisplay(foundOption)
              : foundOption.label;
            this.inputValue = displayValue;
            this.$emit('update:modelValue', displayValue);
          } else {
            this.inputValue = '';
            this.$emit('update:modelValue', '');
          }
        }
      }
    }
  },

  methods: {

    setUpDefaultSelectedValue() {
      if (this.selectedOption && this.selectedOption.value !== undefined) {
        const foundOption = this.options.find(opt => opt.value === this.selectedOption.value);
        if (foundOption) {
          const displayValue = this.formatSelectedValueDisplay
            ? this.formatSelectedValueDisplay(foundOption)
            : foundOption.label;
          this.inputValue = displayValue;
          this.$emit('update:modelValue', this.inputValue);
        }
      }
    },

    onInput(event) {

      const value = event.target.value;

      this.inputValue = value;
      this.isOpen = true;

      this.filterOptions();

      // update texte
      this.$emit('update:modelValue', value);

      // reset option sélectionnée
      this.$emit('update:selectedOption', undefined);
      this.$emit('onSelectionReset', undefined);
      this.$emit('onValueChanged', value);
    },

    onFocus() {
      if (!this.disabled) {
        this.isOpen = true;
        this.filterOptions();
      }
    },

    filterOptions() {

      if (!this.inputValue) {
        this.filteredOptions = this.options;
        return;
      }

      const cleanInput = this.inputValue.toLowerCase().replace(/[,.-]/g, ' ').trim();
      const inputWords = cleanInput.split(/\s+/).filter(Boolean);

      this.filteredOptions = this.options.filter(option => {
        const cleanLabel = (option?.label || '').toLowerCase().replace(/[,.-]/g, ' ');
        return inputWords.every(word => cleanLabel.includes(word));
      });
    },

    onOptionSelected(option) {

      const displayValue = this.formatSelectedValueDisplay
        ? this.formatSelectedValueDisplay(option)
        : option.label;

      this.inputValue = displayValue;


      this.$emit('update:modelValue', displayValue);
      this.$emit('update:selectedOption', option);
      this.$emit('onOptionSelected', option);

      this.isOpen = false;
    },

    closeList() {
      this.isOpen = false;
    }
  },

  directives: {
    'click-outside': {
      mounted(el, binding) {

        el.clickOutsideEvent = function (event) {

          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }

        };

        document.body.addEventListener('click', el.clickOutsideEvent);
      },

      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  }
}
</script>

<style lang="scss">
@import './input-common-css.scss';

.gts-autocomplete-container {
  position: relative;

  .gts-listbox-option-container {
    position: absolute;
    display: flex;
    max-height: 300px;
    overflow-y: auto;
    flex-direction: column;
    width: 100%;
    border: 1px solid $neutral-color-300;
    border-radius: 5px;
    background-color: white;
    z-index: 15;
    top: 100%;
    margin-top: 4px;

    .gts-listbox-option {
      padding: 12px;
      cursor: pointer;
      color: $primary-color-700;
    }

    .gts-listbox-option:hover {
      background-color: $primary-color-50;
    }
  }
}
</style>