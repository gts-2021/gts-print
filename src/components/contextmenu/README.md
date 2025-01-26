
# ContextMenu Component

A VueJS component for creating customizable context menus. This component is ideal for presenting a list of actions or options when triggered, with support for icons and titles for each menu item.

## Overview

The `ContextMenu` component is a lightweight and flexible solution for building contextual menus in your VueJS applications. It allows you to define actions and their behavior dynamically.

## Features

- **Customizable Menu**: Add custom class names for styling.
- **Dynamic Actions**: Define menu actions with titles, icons, and click handlers.
- **Auto-Close Option**: Automatically close the menu when clicking outside.
- **Toggleable Visibility**: Open and close the menu programmatically.

## Installation

Copy the `ContextMenu.vue` file into your components directory.

## Usage

### Basic Example

```vue
<template>
  <div>
    <button @click="contextMenu.openMenu">Open Context Menu</button>
    <ContextMenu
      ref="contextMenu"
      className="custom-context-menu"
      :actions="[
        { title: 'Edit', icon: 'mdi-pencil', onClick: editAction },
        { title: 'Delete', icon: 'mdi-delete', onClick: deleteAction },
      ]"
    />
  </div>
</template>

<script>
import ContextMenu from '@/components/ContextMenu.vue';

export default {
  components: { ContextMenu },
  methods: {
    editAction() {
      console.log('Edit action clicked');
    },
    deleteAction() {
      console.log('Delete action clicked');
    },
  },
};
</script>
```

## Props

| Prop         | Type   | Description                                      | Required | Default |
|--------------|--------|--------------------------------------------------|----------|---------|
| `className`  | String | Adds a custom CSS class to the context menu.     | No       | `''`    |
| `actions`    | Array  | List of action objects with `title`, `icon`, and `onClick`. | Yes      | `[]`    |
| `isAutoClose`| Boolean| Automatically close the menu when clicking outside. | No       | `true`  |

### Action Object Structure

Each action in the `actions` array must follow this structure:

| Property  | Type      | Description                                   | Required |
|-----------|-----------|-----------------------------------------------|----------|
| `title`   | String    | The title of the action.                     | Yes      |
| `icon`    | Component | An optional icon for the action (Vue component). | No       |
| `onClick` | Function  | Function to execute when the action is clicked. | Yes      |
| `className`| String   | An optional custom class for the action.      | No       |
| `noIcon`  | Boolean   | If `true`, hides the action icon.             | No       |

## Methods

- `openMenu`: Opens the context menu.
- `toggleMenu`: Toggles the visibility of the context menu.

## Styles

This component uses SCSS for styling. You can customize variables like `$primary-color-600` and `$primary-color-50` for theming.

```scss
.gts-context-menu {
  // Customize styles here
}
```

## Example Rendering

![Context Menu Example](./context-menu-example.png) <!-- Replace this with a valid image path -->

## License

This project is licensed under the MIT License.
