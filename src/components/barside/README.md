# `BarSide` Component Documentation

## Introduction

The `BarSide` component is a sidebar container that displays a logo and a list of dynamic menus. Each menu is represented by the `BarSideMenu` subcomponent, allowing users to select specific menu items. The component also highlights the active item and triggers an event when an item is selected.

## Props

| Prop            | Type       | Required | Description                                                                                     |
|-----------------|------------|----------|-------------------------------------------------------------------------------------------------|
| `logo`          | `Object`   | No       | Object representing the logo displayed in the sidebar. It can contain properties like an image URL. |
| `menus`         | `Array`    | Yes      | Array of menu items to display. Each item in `menus` is passed to the `BarSideMenu` subcomponent. |
| `onItemSelected`| `Function` | No       | Callback function triggered when a menu item is selected. It receives the title of the selected item as a parameter. |

## Data Properties

| Data Property      | Type       | Description                                                                                 |
|--------------------|------------|---------------------------------------------------------------------------------------------|
| `itemActiveTitle`  | `String`   | Stores the title of the currently active item in the sidebar.                               |

## Methods

| Method             | Parameters            | Description                                                                                 |
|--------------------|-----------------------|---------------------------------------------------------------------------------------------|
| `onItemClicked`    | `barsideItemTitle` (String) | Sets `itemActiveTitle` to the title of the clicked item and triggers `onItemSelected` if provided. |

## Events

- **`barsideItemClicked`**: Emitted when an item within the sidebar is clicked. It provides the title of the clicked item.

## Usage Examples

### Basic Example with a Simple Menu

```vue
<template>
  <BarSide 
    :menus="[{ title: 'Home' }, { title: 'About' }, { title: 'Contact' }]" 
    :logo="{ url: '/path/to/logo.png' }"
    :onItemSelected="handleItemSelected"
  />
</template>

<script>
import BarSide from './BarSide.vue';

export default {
  components: { BarSide },
  methods: {
    handleItemSelected(selectedTitle) {
      console.log('Selected item:', selectedTitle);
    }
  }
};
</script>
