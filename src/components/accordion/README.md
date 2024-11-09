
# Accordion Components

A set of VueJS components that allow you to create accordion panels with the ability to manage the opening/closing of individual items or exclusively. (it must be used into an `AccordionPanel`)

## Overview

The `AccordionPanel` and `AccordionComponent` components allow you to create interactive accordion items, with the ability to customize their behavior (open one panel at a time or multiple).

## Features

- **Open/Close State Management**: You can control which panel is open using props and events.
- **Exclusive Opening**: If the `onlyOneItemOpened` prop is set to `true`, only one panel can be open at a time.
- **Customizable Title**: The title of each accordion panel can be a string or a custom component.

## Installation

Copy the `AccordionPanel.vue` and `AccordionComponent.vue` files into your components directory.

## Usage

### Basic Example

```vue
<template>
  <AccordionPanel :openedAccordions="openedAccordions" :onlyOneItemOpened="true">
    <AccordionComponent
      v-for="(item, index) in items"
      :key="index"
      :id="item.id"
      :title="item.title"
    >
      <p>{{ item.content }}</p>
    </AccordionComponent>
  </AccordionPanel>
</template>

<script>
import AccordionPanel from '@/components/AccordionPanel.vue';
import AccordionComponent from '@/components/AccordionComponent.vue';

export default {
  components: {
    AccordionPanel,
    AccordionComponent
  },
  data() {
    return {
      openedAccordions: ['1'],  // Default open panels
      items: [
        { id: '1', title: 'Panel 1', content: 'Content of panel 1' },
        { id: '2', title: 'Panel 2', content: 'Content of panel 2' }
      ]
    };
  }
};
</script>
```

## Props

### `AccordionPanel`

| Prop                | Type    | Description                                                        | Required | Default |
|---------------------|---------|--------------------------------------------------------------------|----------|---------|
| `openedAccordions`   | Array   | List of panels opened initially.                                   | No       | `[]`    |
| `onlyOneItemOpened`  | Boolean | If `true`, only one panel can be opened at a time.                 | No       | `false` |

### `AccordionComponent`

| Prop        | Type             | Description                                                  | Required | Default |
|-------------|------------------|--------------------------------------------------------------|----------|---------|
| `id`        | String           | Unique identifier for each accordion panel.                 | Yes      | N/A     |
| `title`     | String, Object   | Title of the accordion panel, can be a string or a component. | Yes      | N/A     |

## Methods

- `toggleAccordion` : Toggles the open/close state of the panel.
- `isOpen` : Returns `true` if the panel is open.

## Events

| Event               | Description                                                | Emitted Parameter |
|---------------------|------------------------------------------------------------|--------------------|
| `onOpenAccordion`   | Emitted when a user opens an accordion panel                | `id` of the panel  |
| `onCloseAccordion`  | Emitted when a user closes an accordion panel               | `id` of the panel  |



## Example Rendering

![Accordion Example](./accordion-example.png) <!-- Replace this link with a valid path to your image -->

## License

This project is licensed under the MIT License.
