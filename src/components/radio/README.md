# Radio Components Documentation

This package includes `RadioButton` for individual radio buttons and `RadioGroup` for managing a set of options.

## `<RadioButton />`

A single radio button component.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `String` | No | - | Unique identifier. |
| `label` | `String` | No | `''` | Label text displayed next to the radio. |
| `isChecked` | `Boolean` | No | `false` | Initial checked state. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onChecked` | `String` | Emitted with the `id` when the radio is checked. |

---

## `<RadioGroup />`

A container for managing multiple `RadioButton` components.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `radios` | `Array` | Yes | - | Array of option objects `{ label: '...' }`. |
| `itemChecked` | `Number` | No | - | Index of the initially selected option. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onRadioChecked` | `Object` | Emitted with the selected option object when changed. |

### Usage Example

```vue
<template>
  <RadioGroup 
    :radios="options" 
    :itemChecked="0"
    @onRadioChecked="handleSelection"
  />
</template>

<script>
import RadioGroup from '@/components/radio/RadioGroup.vue';

export default {
  components: { RadioGroup },
  data() {
    return {
      options: [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' }
      ]
    };
  },
  methods: {
    handleSelection(option) {
      console.log('Selected:', option);
    }
  }
};
</script>
```