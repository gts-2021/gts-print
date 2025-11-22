# NotificationComponent Documentation

## Introduction

The `NotificationComponent` is a simple wrapper for displaying notification messages with different themes (success, warning, danger, primary).

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `String` | No | `'gts-badge'` | Custom CSS class for the container. |
| `theme` | `String` | No | `''` | Theme class to apply color styles. |

## Themes

The component supports the following built-in themes (defined in SCSS):
- `gts-notification-primary`: Primary color scheme.
- `gts-notification-success`: Green/Success color scheme.
- `gts-notification-danger`: Red/Error color scheme.
- `gts-notification-warning`: Yellow/Warning color scheme.

## Usage Examples

### Basic Notification

```vue
<template>
  <NotificationComponent theme="gts-notification-success">
    <p>Operation completed successfully!</p>
  </NotificationComponent>
</template>

<script>
import NotificationComponent from '@/components/notification/NotificationComponent.vue';

export default {
  components: { NotificationComponent }
};
</script>
```

### Error Notification

```vue
<template>
  <NotificationComponent theme="gts-notification-danger">
    <strong>Error:</strong> Something went wrong.
  </NotificationComponent>
</template>
```
