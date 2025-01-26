# `ButtonComponent` Documentation

## Introduction

The `ButtonComponent` is a customizable button that supports various themes, icons, and title text. This component includes flexible options for icon position (left or right) and allows for handling button clicks through an emitted event. It’s designed to integrate seamlessly with different styles and themes for primary, secondary, and danger buttons.

## Props

| Prop            | Type       | Required | Default         | Description                                                                                      |
|-----------------|------------|----------|-----------------|--------------------------------------------------------------------------------------------------|
| `title`   | `String`   | No       | `null`          | Text displayed as the button' title.                                                            |
| `isExternalIcon`| `Boolean`  | No       | `false`         | If `true`, specifies that the icon is an external SVG component.                                 |
| `icon`          | `Object`   | No       | `null`          | An object defining icon details (e.g., `position`, `svg`, or `class`).                           |
| `className`    | `String`   | No       | `''`            | Custom class applied to the button for additional styling.                                       |
| `iconPosition`  | `String`   | No       | `'left'`        | Position of the icon within the button (`'left'` or `'right'`).                                  |
| `theme`         | `String`   | No       | `PRIMARY`       | Button theme, supporting styles like `primary`, `primary-inverse`, `danger`, etc. from constants. |
| `type`         | `String`   | No       | ``       | Button type |

## Data Properties

None.

## Events

- **`buttonClicked`**: Emitted when the button is clicked. This event does not carry any additional payload.

## Methods

| Method             | Parameters | Description                                      |
|--------------------|------------|--------------------------------------------------|
| `onButtonClick`    | None       | Emits the `buttonClicked` event when the button is clicked. |

## CSS Classes

The button component includes multiple CSS classes for styling, with SCSS used for dynamic theming. Below are the main classes:

- `.gts-button-primary`: Primary button with default primary color styling.
- `.gts-button-primary-inverse`: Primary button with inverse styling (light background).
- `.gts-button-danger`: Danger button style with a red theme.
- `.gts-button-danger-inverse`: Inverse danger button style with a light background.
- Additional styles include `primary-50`, `primary-50-inverse`, `danger-light`, and `danger-light-inverse`.

## Usage Examples

### Basic Button with title only

```vue
<template>
  <ButtonComponent 
    buttonTitle="Submit"
    @buttonClicked="handleButtonClick"
  />
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

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
### Button with title and icon

```vue
<template>
  <ButtonComponent 
    :title="'submit'" 
    :icon="leftIcon"
    @buttonClicked="handleButtonClick"
  />
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

export default {
  components: { ButtonComponent },
  data() {
		return {
      leftIcon: {
        isExternalIcon: false,
        class: "mdi-plus",
        position: "left"
      },
    }
  },
  methods: {
    handleSaveClick() {
      console.log('Save button clicked!');
    }
  }
};
</script>
```

### Button with specific theme

```vue
<template>
  <ButtonComponent 
    :title="'submit'" 
    :icon="leftIcon"
    :theme="PRIMARY"
    @buttonClicked="handleButtonClick"
  />
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
import { PRIMARY } from '@/constants/buttons.js';

export default {
  components: { ButtonComponent },
  data() {
		return {
      PRIMARY,
      leftIcon: {
        isExternalIcon: false,
        class: "mdi-plus",
        position: "left"
      },
    }
  },
  methods: {
    handleSaveClick() {
      console.log('Save button clicked!');
    }
  }
};
</script>
```


### Button with specific style

```vue
<template>
  <ButtonComponent 
    buttonTitle="submit" 
    :icon="{ class: 'mdi-content-save', position: 'left' }" 
    className="custom-button-style"
    @buttonClicked="handleSaveClick"
  />
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

export default {
  components: { ButtonComponent },
  methods: {
    handleSaveClick() {
      console.log('Save button clicked!');
    }
  }
};
</script>
```


### Button with External SVG Icon

```vue
<template>
  <ButtonComponent 
    buttonTitle="Export" 
    :icon="{ svg: ExternalSvgIconComponent, isExternalIcon: true, position: 'right' }"
    theme="gts-button-danger"
    @buttonClicked="handleExportClick"
  />
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
import ExternalSvgIconComponent from './icons/ExternalSvgIcon.vue';

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