# ToolTip Documentation

## Introduction

The `ToolTip` component displays a text tooltip when hovering over its content. It supports positioning (left, center, right) and automatically adjusts its position on scroll or resize.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `String` | Yes | - | The text to display inside the tooltip. |
| `position` | `String` | No | `'center'` | Position of the tooltip relative to the content. Options: `'left'`, `'center'`, `'right'`. |

## Slots

| Slot | Description |
|------|-------------|
| `default` | The content that triggers the tooltip on hover. |

## Usage Example

```vue
<template>
  <ToolTip text="This is a tooltip" position="top">
    <button>Hover me</button>
  </ToolTip>
</template>

<script>
import ToolTip from '@/components/tooltip/ToolTip.vue';

export default {
  components: { ToolTip }
};
</script>
```
