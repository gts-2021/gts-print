# ContextMenu Component Documentation

## Introduction

The `ContextMenu` component displays a popup menu with a list of actions. It is typically used in conjunction with other components (like `CardComponent`) to provide contextual options.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `String` | No | `''` | Custom CSS class for the menu container. |
| `actions` | `Array` | Yes | `[]` | List of action objects to display. |
| `isAutoClose` | `Boolean` | No | `true` | If `true`, the menu closes automatically when clicking outside. |

### Action Object Structure

Each object in the `actions` array should have:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `String` | Yes | The text to display for the action. |
| `onClick` | `Function` | Yes | The function to call when the action is clicked. |
| `icon` | `Component` | No | Optional icon component. |
| `className` | `String` | No | Optional custom class for the action item. |
| `noIcon` | `Boolean` | No | If `true`, hides the icon for this action. |

## Methods

- `openMenu()`: Sets `isShowMenu` to `true`, displaying the menu.
- `toggleMenu()`: Toggles the visibility of the menu.

## Usage Examples

### Basic Usage

```vue
<template>
  <div class="container">
    <button @click.stop="$refs.menu.toggleMenu()">Options</button>
    
    <ContextMenu
      ref="menu"
      :actions="menuActions"
    />
  </div>
</template>

<script>
import ContextMenu from '@/components/contextmenu/ContextMenu.vue';

export default {
  components: { ContextMenu },
  data() {
    return {
      menuActions: [
        { title: 'View Details', onClick: () => console.log('View') },
        { title: 'Remove', onClick: () => console.log('Remove') }
      ]
    };
  }
};
</script>
```
