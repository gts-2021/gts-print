# ButtonComponent Documentation

## Introduction

The `ButtonComponent` is a customizable button that supports various themes, icons, and title text. This component includes flexible options for icon position (left or right) and allows for handling button clicks through an emitted event. It’s designed to integrate seamlessly with different styles and themes for primary, secondary, and danger buttons.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `String` | No | `null` | Text displayed as the button's title. |
| `isExternalIcon` | `Boolean` | No | `false` | If `true`, specifies that the icon is an external SVG component. |
| `icon` | `Object` | No | `null` | An object defining icon details (e.g., `position`, `svg`, `class`, `isExternalIcon`). |
| `className` | `String` | No | `''` | Custom class applied to the button for additional styling. |
| `iconPosition` | `String` | No | `'left'` | Position of the icon within the button (`'left'` or `'right'`). |
| `theme` | `String` | No | `PRIMARY` | Button theme, supporting styles like `primary`, `primary-inverse`, `danger`, etc. |
| `type` | `String` | No | `''` | Button type attribute (e.g., 'submit', 'button'). |
| `disabled` | `Boolean` | No | `false` | If `true`, the button is disabled and no action is triggered on click. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `buttonClicked` | None | Emitted when the button is clicked (if not disabled). |

## CSS Classes

The button component includes multiple CSS classes for styling. Below are the main classes:

- `.gts-button-primary`: Primary button with default primary color styling.
- `.gts-button-primary-inverse`: Primary button with inverse styling (light background).
- `.gts-button-danger`: Danger button style with a red theme.
- `.gts-button-danger-inverse`: Inverse danger button style with a light background.
- Additional styles include `primary-50`, `primary-50-inverse`, `danger-light`, and `danger-light-inverse`.

## Usage Examples

### Basic Button

```vue
<template>
  <ButtonComponent 
    title="Submit"
    @buttonClicked="handleButtonClick"
  />
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';

export default {
  components: { ButtonComponent },
  methods: {
    handleButtonClick() {
      console.log('Button clicked!');
    }
  }
};
</script>
```

### Button with Icon

```vue
<template>
  <ButtonComponent 
    title="Add Item" 
    :icon="{ class: 'mdi-plus', position: 'left' }"
    @buttonClicked="handleAddClick"
  />
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';

export default {
  components: { ButtonComponent },
  methods: {
    handleAddClick() {
      console.log('Add button clicked!');
    }
  }
};
</script>
```

### Button with Theme

```vue
<template>
  <ButtonComponent 
    title="Delete" 
    theme="gts-button-danger"
    @buttonClicked="handleDeleteClick"
  />
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';

export default {
  components: { ButtonComponent },
  methods: {
    handleDeleteClick() {
      console.log('Delete button clicked!');
    }
  }
};
</script>
```

### Button with External SVG Icon

```vue
<template>
  <ButtonComponent 
    title="Export" 
    :icon="{ svg: ExternalSvgIconComponent, isExternalIcon: true, position: 'right' }"
    theme="gts-button-primary-inverse"
    @buttonClicked="handleExportClick"
  />
</template>

<script>
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import ExternalSvgIconComponent from '@/components/icons/ExternalSvgIcon.vue';

export default {
  components: { ButtonComponent, ExternalSvgIconComponent },
  methods: {
    handleExportClick() {
      console.log('Export button clicked!');
    }
  }
};
</script>
```