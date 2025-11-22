# NoContent Component Documentation

## Introduction

The `NoContent` component is a placeholder used to display a message and optional actions when there is no data to show. It supports custom icons and action buttons via slots.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `description` | `String` | No | `''` | A text description to display below the icon. |

## Slots

| Slot | Description |
|------|-------------|
| `icon` | Slot for displaying a custom icon (e.g., SVG or icon component). |
| `buttons` | Slot for displaying action buttons (e.g., 'Add New' button). |

## Usage Examples

### Basic Usage with Icon and Description

```vue
<template>
  <NoContent description="No items found.">
    <template #icon>
      <MyCustomIcon />
    </template>
  </NoContent>
</template>
```

### With Action Buttons

```vue
<template>
  <NoContent description="Your cart is empty.">
    <template #icon>
      <CartIcon />
    </template>
    <template #buttons>
      <ButtonComponent title="Start Shopping" @click="goToShop" />
    </template>
  </NoContent>
</template>
```
