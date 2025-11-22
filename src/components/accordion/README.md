# Accordion Components

A set of VueJS components that allow you to create accordion panels with the ability to manage the opening/closing of individual items or exclusively.

## Components

This package includes two main components:
- `AccordionPanel`: The container that manages the state of the accordion items.
- `AccordionComponent`: The individual accordion item that contains the header and content.

## Features

- **Open/Close State Management**: Control which panel is open using props and events.
- **Exclusive Opening**: If the `onlyOneItemOpened` prop is set to `true`, only one panel can be open at a time.
- **Customizable Title**: The title of each accordion panel can be a string or a custom component.
- **Slots**: Use slots to insert custom content into the accordion body.

## Installation

Ensure you have the necessary files in your project structure.

## Usage

### Basic Example

```vue
<template>
  <AccordionPanel :openedAccordions="['1']" :onlyOneItemOpened="true">
    <AccordionComponent
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
    >
      <p>{{ item.content }}</p>
    </AccordionComponent>
  </AccordionPanel>
</template>

<script>
import AccordionPanel from '@/components/accordion/AccordionPanel.vue';
import AccordionComponent from '@/components/accordion/AccordionComponent.vue';

export default {
  components: {
    AccordionPanel,
    AccordionComponent
  },
  data() {
    return {
      items: [
        { id: '1', title: 'Panel 1', content: 'Content of panel 1' },
        { id: '2', title: 'Panel 2', content: 'Content of panel 2' }
      ]
    };
  }
};
</script>
```

## API Documentation

### AccordionPanel

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `openedAccordions` | `Array` | No | `[]` | An array of `id`s of the accordions that should be initially opened. |
| `onlyOneItemOpened` | `Boolean` | No | `false` | If `true`, opening one accordion will close others. |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onOpenAccordion` | `id` (String) | Emitted when an accordion item is opened. |
| `onCloseAccordion` | `id` (String) | Emitted when an accordion item is closed. |

### AccordionComponent

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `String` | Yes | - | Unique identifier for the accordion item. |
| `title` | `String` \| `Object` | Yes | - | The title to display in the header. Can be a string or a Vue component. |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | The content to display when the accordion is expanded. |

## Methods

The `AccordionComponent` exposes the following methods (internal use mostly, but accessible via ref):

- `toggleAccordion()`: Toggles the open/close state.
- `isOpen()`: Returns `true` if the item is currently open.
