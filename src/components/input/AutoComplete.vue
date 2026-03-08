<template>
  <CommonInput v-bind="$props">
    <div class="gts-autocomplete-container" v-click-outside="closeList">
      
      <input
        ref="gtsInput"
        v-model="inputValue"
        @input="onInput"
        @focus="onFocus"
        :disabled="disabled"
        :class="'gts-input gts-autocomplete ' + (disabled ? 'gts-input-disabled' : '') + (error ? ' gts-input-error' : '')"
        type="text"
        :placeholder="placeholder"
      />

      <div
        v-if="isOpen && filteredOptions.length"
        class="gts-listbox-option-container"
      >
        <span
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="gts-listbox-option"
          @click="onOptionSelected(option)"
        >
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
created(){
if(this.selectedOption && this.selectedOption.label){
  
  if(!this.modelValue || this.modelValue == '') {
    this.inputValue = this.selectedOption.label;
    this.$emit('update:modelValue', this.inputValue);
  }
}

},
  mixins: [InputCommonProps],

  emits: [
    'update:modelValue',
    'update:selectedOption',
    'onOptionSelected',
    'onSelectionReset'
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
      }
    }
  },

  methods: {

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

      const lowerInput = this.inputValue.toLowerCase();

      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(lowerInput)
      );
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