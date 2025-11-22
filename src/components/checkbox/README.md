# CheckBox Component Documentation

## Introduction

The `CheckBox` component is a customizable checkbox with a label. It supports two-way binding via `v-model` (using the `update:isChecked` event) or manual control.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `String` | No | - | Unique identifier for the checkbox. |
| `label` | `String` | No | `''` | Text label displayed next to the checkbox. |
| `isChecked` | `Boolean` | No | `false` | The current checked state. Supports `v-model`. |
| `noBind` | `Boolean` | No | `false` | If `true`, disables internal state update on click. Parent must update `isChecked`. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onToggle` | `Boolean` | Emitted when the checkbox is clicked. Payload is the *new* state (toggled). |
| `update:isChecked` | `Boolean` | Emitted to update the `v-model` value. |

## Usage Examples

### Basic Usage with v-model

```vue
<template>
  <CheckBox
    label="Accept Terms"
    v-model:isChecked="accepted"
  />
</template>

<script>
import CheckBox from '@/components/checkbox/CheckBox.vue';

export default {
  components: { CheckBox },
  data() {
    return {
      accepted: false
    };
  }
};
</script>
```

### Manual Control (noBind)

```vue
<template>
  <CheckBox
    label="Manual Check"
    :isChecked="manualState"
    :noBind="true"
    @onToggle="handleToggle"
  />
</template>

<script>
import CheckBox from '@/components/checkbox/CheckBox.vue';

export default {
  components: { CheckBox },
  data() {
    return {
      manualState: false
    };
  },
  methods: {
    handleToggle(newState) {
      // Perform validation or logic before updating
      console.log('Toggled to:', newState);
      this.manualState = newState;
    }
  }
};
</script>
```
