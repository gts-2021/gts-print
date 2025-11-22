# CardComponent Documentation

## Introduction

The `CardComponent` is a versatile container component that supports an optional context menu for actions. It allows users to wrap content in a styled card and provides a built-in mechanism for handling actions like 'Edit' or 'Delete'.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `String` | No | `''` | Custom CSS class to apply to the card container. |
| `actions` | `Array` | Yes | `[]` | List of action objects to display in the context menu. |

### Action Object Structure

Each object in the `actions` array should have:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `String` | Yes | The text to display for the action. |
| `onClick` | `Function` | Yes | The function to call when the action is clicked. |
| `icon` | `Component` | No | Optional icon component to display next to the title. |
| `className` | `String` | No | Optional custom class for the action item. |
| `noIcon` | `Boolean` | No | If `true`, hides the icon for this action. |

## Slots

| Slot | Description |
|------|-------------|
| `default` | The main content to be displayed inside the card. |

## Methods

- `toggleMenu(event)`: Toggles the visibility of the context menu. Usually handled internally but exposed via ref.

## Usage Examples

### Basic Card with Actions

```vue
<template>
  <CardComponent
    className="my-card"
    :actions="cardActions"
  >
    <h3>Card Title</h3>
    <p>This is some content inside the card.</p>
  </CardComponent>
</template>

<script>
import CardComponent from '@/components/card/CardComponent.vue';

export default {
  components: { CardComponent },
  data() {
    return {
      cardActions: [
        { title: 'Edit', onClick: this.handleEdit },
        { title: 'Delete', onClick: this.handleDelete }
      ]
    };
  },
  methods: {
    handleEdit() {
      console.log('Edit action');
    },
    handleDelete() {
      console.log('Delete action');
    }
  }
};
</script>
```