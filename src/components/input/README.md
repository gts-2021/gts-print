# Input Components Documentation

This package includes several input components: `TextInput`, `ListBox`, and `TextInputArea`. They share common props and styling.

## `<TextInput />`

A versatile input component supporting text, password, and date types, with built-in masking support via `maska`.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `String` | Yes | - | Label text for the input. |
| `value` | `String` | No | `''` | Initial value (deprecated, use `v-model`). |
| `required` | `Boolean` | No | `false` | Displays a "(required)" indicator. |
| `type` | `String` | No | `'text'` | Input type (`text`, `password`, `date`, etc.). |
| `disabled` | `Boolean` | No | `false` | Disables the input. |
| `error` | `String` | No | `''` | Error message to display below the input. |
| `placeholder` | `String` | No | `''` | Placeholder text. |
| `maskPattern` | `String` | No | `''` | Mask pattern string (e.g., `'##/##/####'`). |
| `maskToken` | `Object` | No | `{}` | Custom mask tokens configuration. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onValueChanged` | `String` | Emitted when the input value changes. |
| `update:modelValue` | `String` | Standard v-model update event. |

### Usage Example

```vue
<template>
  <TextInput 
    label="Username" 
    v-model="username" 
    placeholder="Enter username"
    required
  />
  <TextInput 
    label="Password" 
    type="password"
    v-model="password" 
  />
</template>
```

## `<ListBox />`

A custom dropdown/select component.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `Array` | No | `[]` | Array of option objects `{ label: '...', value: '...' }`. |
| `label` | `String` | Yes | - | Label for the dropdown. |
| `value` | `String` | No | - | Selected value. |
| `disabled` | `Boolean` | No | `false` | Disables the dropdown. |
| `error` | `String` | No | `''` | Error message. |

### Usage Example

```vue
<template>
  <ListBox 
    label="Select Role"
    :options="[{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }]"
    v-model="selectedRole"
  />
</template>
```

## `<TextInputArea />`

A textarea component for multi-line input.

### Props

Inherits common props (`label`, `value`, `required`, `disabled`, `error`, `placeholder`) from `CommonInput`.

### Usage Example

```vue
<template>
  <TextInputArea 
    label="Description" 
    v-model="description" 
    placeholder="Enter description..."
  />
</template>
```
