
# CardComponent

A VueJS component for displaying cards with an optional actions menu. It allows users to include actions like buttons or icons within a dropdown menu inside the card.

## Overview

`CardComponent` is a versatile card container that supports a customizable menu for actions. The menu is hidden by default and toggles visibility when the actions button is clicked.

## Features

- **Customizable Class Name**: Add custom classes to the card for styling purposes.
- **Actions Menu**: Includes a menu for custom actions with icons and titles.
- **Slot Content**: Place any content within the card using Vue slots.
- **Responsive Interaction**: The actions menu closes automatically when clicking outside of it.

## Installation

Copy the `CardComponent.vue` file into your components directory.

## Usage

### Basic Example

```vue
<template>
  <CardComponent
    className="custom-card"
    :actions="[
      { title: 'Edit', icon: ComponentIcon, onClick: editAction },
      { title: 'Delete', icon: ComponentIcon, onClick: deleteAction },
    ]"
  >
    <p>This is the card content!</p>
  </CardComponent>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';

export default {
  components: { CardComponent },
  methods: {
    editAction() {
      console.log('Edit clicked');
    },
    deleteAction() {
      console.log('Delete clicked');
    },
  },
};
</script>
```

## Props

| Prop       | Type   | Description                                           | Required | Default |
|------------|--------|-------------------------------------------------------|----------|---------|
| `className`| String | Adds a custom CSS class to the card.                  | No       | `''`    |
| `actions`  | Array  | List of action objects with `title`, `icon`, and `onClick`. | Yes      | `[]`    |

### Action Object Structure

Each action in the `actions` array must follow this structure:

| Property  | Type      | Description                                 | Required |
|-----------|-----------|---------------------------------------------|----------|
| `title`   | String    | The title of the action.                   | Yes      |
| `icon`    | Component | An optional icon for the action (Vue component). | No       |
| `onClick` | Function  | Function to execute when the action is clicked. | Yes      |
| `className`| String    | An optional custom class for the action.    | No       |
| `noIcon`  | Boolean   | If `true`, hides the action icon.           | No       |

## Methods

- `toggleMenu`: Toggles the visibility of the actions menu.

## Slots

- **Default Slot**: Use this slot to include custom content inside the card.

 