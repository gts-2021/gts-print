# Toggle Component Documentation

## Introduction

The `ToggleComponent` is a customizable switch/toggle with a label. It supports two-way binding via `v-model` (using the `update:isChecked` event) or manual control using `noBind`.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `String` | No | - | Unique identifier for the toggle. |
| `label` | `String` | No | `''` | Text label displayed next to the toggle. |
| `isChecked` | `Boolean` | No | `false` | The current checked state. Supports `v-model`. |
| `noBind` | `Boolean` | No | `false` | If `true`, disables internal state update on click. Parent must update `isChecked`. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onToggle` | `Boolean` | Emitted when the toggle is clicked. Payload is the *new* state (toggled). |
| `update:isChecked` | `Boolean` | Emitted to update the `v-model` value. |

## Usage Examples

### Basic Usage with v-model

```vue
<template>
  <ToggleComponent
    label="Enable Notifications"
    v-model:isChecked="notificationsEnabled"
  />
</template>

<script>
import ToggleComponent from '@/components/toggle/ToggleComponent.vue';

export default {
  components: { ToggleComponent },
  data() {
    return {
      notificationsEnabled: false
    };
  }
};
</script>
```

### Manual Control (noBind)

```vue
<template>
  <ToggleComponent
    label="Manual Toggle"
    :isChecked="manualState"
    :noBind="true"
    @onToggle="handleToggle"
  />
</template>

<script>
import ToggleComponent from '@/components/toggle/ToggleComponent.vue';

export default {
  components: { ToggleComponent },
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
