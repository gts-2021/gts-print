# `ButtonComponent` Documentation

## Introduction

The `ButtonComponent` is a customizable button that supports various themes, icons, and title text. This component includes flexible options for icon position (left or right) and allows for handling button clicks through an emitted event. It’s designed to integrate seamlessly with different styles and themes for primary, secondary, and danger buttons.

## Props

| Prop            | Type       | Required | Default         | Description                                                                                      |
|-----------------|------------|----------|-----------------|--------------------------------------------------------------------------------------------------|
| `buttonTitle`   | `String`   | No       | `null`          | Text displayed as the button's title.                                                            |
| `isExternalIcon`| `Boolean`  | No       | `false`         | If `true`, specifies that the icon is an external SVG component.                                 |
| `icon`          | `Object`   | No       | `null`          | An object defining icon details (e.g., `position`, `svg`, or `class`).                           |
| `classStyle`    | `String`   | No       | `''`            | Custom class applied to the button for additional styling.                                       |
| `iconPosition`  | `String`   | No       | `'left'`        | Position of the icon within the button (`'left'` or `'right'`).                                  |
| `theme`         | `String`   | No       | `PRIMARY`       | Button theme, supporting styles like `primary`, `primary-inverse`, `danger`, etc. from constants. |

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

### Basic Button with Title Only

```vue
<template>
  <ButtonComponent 
    buttonTitle="Submit" 
    theme="gts-button-primary"
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

### Basic Button with Title Only

```vue
<template>
  <ButtonComponent 
    buttonTitle="Save" 
    :icon="{ class: 'mdi-content-save', position: 'left' }" 
    classStyle="custom-button-style"
    theme="gts-button-primary-inverse"
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