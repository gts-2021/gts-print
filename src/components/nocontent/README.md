
# NoContent Component

A Vue JS component for displaying random content. This component is ideal for displaying pages with and without content according to your needs.

## Overview

The `NoContent` component is a generic, flexible component designed to display a message when no content is available. It allows full customization through slots, enabling the insertion of different icons and buttons depending on the context.

## Features

- **Icons**: Displays a customizable icon using the icon slot.
- **Description**: Shows an optional description to inform users.
- **Actions**: Supports one or multiple buttons via the buttons slot.
- **Flexibility**: Fully flexible and reusable across different use cases.

## Installation

Copy the `NoContent.vue` file into your components directory.

## Usage

### Basic Example

<!-- no content with button -->
```vue
<template>
  <NoContent description="No content page">
    <template #icon>
      <NoContentIcon />
    </template>
    
    <template #buttons>
      <ButtonComponent title="add button"  @click="clickButton" />
    </template>
  </NoContent>
</template>

<script>
import NoContent from '@/components/NoContent.vue';
import NoContentIcon from '@/assets/icons/NoContentIcon.vue';
import ButtonComponent from '../button/ButtonComponent.vue';

export default {
  components: { NoContent, NoContentIcon, ButtonComponent },
  methods: {
    clickButton() {
      console.log('button clicked');
    },
  },
};
</script>
```

<!-- not found without button -->
```vue
<template>
  <NoContent description="No content page">
    <template #icon>
      <NoContentIcon />
    </template>
  </NoContent>
</template>

<script>
import NoContent from '@/components/NoContent.vue';
import NotFoundIcon from '@/assets/icons/NotFoundIcon.vue';

export default {
  components: { NoContent, NotFoundIcon },
};
</script>
```

## Props

| Prop           | Type   | Description                                      | Required | Default |
|----------------|--------|--------------------------------------------------|----------|---------|
| `description`  | String | Adds a description to your component.            | No       | `''`    |

### Action Object Structure


## Methods

## Styles

## Example Rendering

see `NoContentExample.vue ` 

## Slots

- **icon**: Use this slot to include your icon to display.
- **buttons**: Use this slot to include your button to handle actions if needed.

## License

This project is licensed under the MIT License.
