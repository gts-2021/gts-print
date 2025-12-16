<template>
  <CommonInput v-bind="$props">
    <div class="gts-autocomplete-container" v-click-outside="closeList">
      <input
        @input="onInput"
        @focus="onFocus"
        :disabled="disabled"
        v-model="inputValue"
        ref="gtsInput"
        :class="'gts-input gts-autocomplete ' + (disabled ? 'gts-input-disabled' : '') + (error ? ' gts-input-error' : '')"
        type="text"
        :placeholder="placeholder"
      >
      
      <div v-if="isOpen && filteredOptions.length > 0" class="gts-listbox-option-container">
        <span
          @click="onOptionSelected(option)"
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="gts-listbox-option"
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
  mixins: [InputCommonProps],
  props: {
    options: {
      type: Array,
      default: () => [],
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
        if (newVal !== this.inputValue) {
           // Find label for the value if possible, otherwise just show value? 
           // Usually autocomplete shows the label. 
           // If modelValue is the ID, we need to find the option.
           const option = this.options.find(o => o.value === newVal);
           this.inputValue = option ? option.label : newVal;
        }
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
      this.inputValue = event.target.value;
      this.isOpen = true;
      this.filterOptions();
      // We might want to emit the text value or null if not selected?
      // For now let's emit the text value so it acts like a combobox, 
      // or strictly select? The requirement said "autoComplete", usually implies selection from list but can also be free text.
      // Given it's based on ListBox, likely we want to select from options.
      // But if I type "A", and "A" is not in list, what should happen?
      // Let's assume free text is allowed for filtering, but value emitted should probably be the text if no match?
      // Or maybe we only emit when selected?
      // Let's stick to: emit the text as value for now, or maybe we should wait for selection.
      // Actually, standard autocomplete usually updates the model with the text OR the selected value.
      // Let's emit the text for now to be safe, or check if it matches an option.
      
      // If we want it to behave like a select, we might only emit on selection.
      // But if we want it to be an input with suggestions, we emit on input.
      // Let's emit on input to support free text, but if it matches an option, we might want to emit the option value?
      // Simpler approach: Just emit the text value on input.
      this.$emit('update:modelValue', this.inputValue);
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
      } else {
        const lowerInput = this.inputValue.toLowerCase();
        this.filteredOptions = this.options.filter(option => 
          option.label.toLowerCase().includes(lowerInput)
        );
      }
    },
    onOptionSelected(option) {
      this.inputValue = option.label;
      this.$emit('update:modelValue', option.value);
      this.$emit('onValueChanged', option);
      this.isOpen = false;
    },
    closeList() {
      this.isOpen = false;
    }
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
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
    overflow-y: scroll;
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
