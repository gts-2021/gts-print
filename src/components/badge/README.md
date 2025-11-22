# BadgeComponent Documentation

## Introduction

The `BadgeComponent` is a customizable badge that supports various themes. It’s designed to integrate seamlessly with different styles and themes for primary, secondary, and danger badges.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `String` | Yes | - | The text content to display inside the badge. |
| `theme` | `String` | No | `''` | The theme class to apply (e.g., `gts-badge-primary`, `gts-badge-success`). |
| `className` | `String` | No | `gts-badge` | Custom CSS class for additional styling. |

## CSS Classes

The badge component includes multiple CSS classes for styling. Below are the main classes available:

- `.gts-badge`: Default style.
- `.gts-badge-primary`: Primary badge with default primary color styling.
- `.gts-badge-success`: Success badge style with a green theme.
- `.gts-badge-warning`: Warning badge style with an orange theme.
- `.gts-badge-danger`: Danger badge style with a red theme.

## Usage Examples

### Basic Badge

```vue
<template>
  <BadgeComponent text="New" />
</template>

<script>
import BadgeComponent from '@/components/badge/BadgeComponent.vue';

export default {
  components: { BadgeComponent },
};
</script>
```

### Badge with Theme

```vue
<template>
  <BadgeComponent text="Completed" theme="gts-badge-success" />
</template>

<script>
import BadgeComponent from '@/components/badge/BadgeComponent.vue';

export default {
  components: { BadgeComponent },
};
</script>
```

### Badge with Custom Class

```vue
<template>
  <BadgeComponent text="Custom" className="my-custom-badge" />
</template>

<script>
import BadgeComponent from '@/components/badge/BadgeComponent.vue';

export default {
  components: { BadgeComponent },
};
</script>
```
