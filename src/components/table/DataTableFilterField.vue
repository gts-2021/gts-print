<template>
  <TextInput
    v-if="field"
    :ref="el => setRef(el)"
    :label="label || field.filterLabel || field.title || field.label || field.name"
    :placeholder="placeholder !== undefined ? placeholder : (field.filterPlaceholder || '')"
    :type="type || (field.isDate ? 'date' : (field.type || 'text'))"
    :modelValue="currentValue"
    @update:modelValue="onValueChange"
    v-bind="$attrs"
  />
</template>

<script>
import TextInput from '@/components/input/TextInput.vue';

export default {
  name: 'DataTableFilterField',
  components: {
    TextInput
  },
  inject: {
    dataTableFilterContext: {
      default: () => null
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    },
    fieldConfig: {
      type: Object,
      default: undefined
    },
    modelValue: {
      type: [String, Number],
      default: undefined
    }
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    field() {
      if (this.fieldConfig) return this.fieldConfig;
      const fields = this.dataTableFilterContext?.filterFields || [];
      return fields.find(f => f.name === this.name) || { name: this.name, title: this.name };
    },
    currentValue() {
      if (this.modelValue !== undefined) return this.modelValue;
      if (this.dataTableFilterContext?.filterValues) {
        return this.dataTableFilterContext.filterValues[this.name] || '';
      }
      return '';
    }
  },
  methods: {
    onValueChange(val) {
      if (this.dataTableFilterContext?.setFilter) {
        this.dataTableFilterContext.setFilter(this.name, val);
      }
      this.$emit('update:modelValue', val);
      this.$emit('change', val);
    },
    setRef(el) {
      if (this.dataTableFilterContext?.setFilterInputRef) {
        this.dataTableFilterContext.setFilterInputRef(this.name, el);
      }
    }
  }
};
</script>
