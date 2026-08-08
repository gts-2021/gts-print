# BarSide Component Documentation

## Introduction

The `BarSide` component is a sidebar container that displays a logo and a list of dynamic menus. Each menu is represented by the `BarSideMenu` subcomponent, allowing users to select specific menu items. The component highlights the active item, triggers an event when an item is selected, and supports open/close collapsible sidebar toggling.

## Components

This package includes:
- `BarSide`: The main sidebar container.
- `BarSideMenu`: A subcomponent that renders a group of menu items.
- `BarSideItem`: A subcomponent representing a single menu item.

## Props

### BarSide

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `logo` | `Object` | No | - | Object representing the logo displayed in the sidebar. Can be a Vue component. |
| `menus` | `Array` | Yes | - | Array of menu groups. Each group is an array of items passed to `BarSideMenu`. |
| `onItemSelected` | `Function` | No | - | Callback function triggered when a menu item is selected. Receives the item title. |
| `selectedItem` | `String` | No | - | The title of the currently selected item. Used for controlling selection state externally. |
| `isCollapsed` | `Boolean` | No | `false` | Controls whether the sidebar is collapsed (icons-only mode) or expanded. |

### BarSideItem (Internal)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `String` | Yes | - | The title of the menu item. |
| `icon` | `String` \| `Object` | No | - | The icon to display. Can be a string (Vuetify icon name) or a component. |
| `active` | `Boolean` | No | `false` | Whether the item is currently active. |
| `isExternal` | `Boolean` | No | `false` | Set to `true` if `icon` is an external component. |
| `isCollapsed` | `Boolean` | No | `false` | Set to `true` when the sidebar is in collapsed state (hides item labels). |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `barsideItemClicked` | `title` (String) | Emitted when an item is clicked. |
| `update:isCollapsed` | `isCollapsed` (Boolean) | Emitted when the collapsed state changes (supports `v-model:isCollapsed`). |
| `toggleCollapse` | `isCollapsed` (Boolean) | Emitted when the sidebar toggle button is clicked. |

## Usage Examples

### Basic Example

```vue
<template>
  <BarSide 
    :menus="menuGroups" 
    :logo="LogoComponent"
    :selectedItem="currentSelection"
    :onItemSelected="handleItemSelected"
  />
</template>

<script>
import BarSide from '@/components/barside/BarSide.vue';
import LogoComponent from '@/components/Logo.vue';

export default {
  components: { BarSide },
  data() {
    return {
      LogoComponent,
      currentSelection: 'Home',
      menuGroups: [
        [
          { title: 'Home', icon: 'mdi-home' },
          { title: 'Profile', icon: 'mdi-account' }
        ],
        [
          { title: 'Settings', icon: 'mdi-cog' },
          { title: 'Logout', icon: 'mdi-logout' }
        ]
      ]
    };
  },
  methods: {
    handleItemSelected(title) {
      this.currentSelection = title;
      console.log('Selected:', title);
    }
  }
};
</script>
```

### Collapsible Sidebar Example

```vue
<template>
  <BarSide 
    :menus="menuGroups" 
    :logo="LogoComponent"
    v-model:isCollapsed="isCollapsed"
    @toggleCollapse="onToggle"
  />
</template>

<script>
import BarSide from '@/components/barside/BarSide.vue';

export default {
  components: { BarSide },
  data() {
    return {
      isCollapsed: false,
      menuGroups: [
        [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Analytics', icon: 'mdi-chart-line' }
        ]
      ]
    };
  },
  methods: {
    onToggle(collapsedState) {
      console.log('Sidebar is now collapsed:', collapsedState);
    }
  }
};
</script>
```
