# Input Components Documentation

This package includes several input components: `TextInput`, `ListBox`, and `TextInputArea`. They share common props and styling.

## `<TextInput />`

A versatile input component supporting text, password, and date types, with built-in masking support via `maska`.

### Props

| Prop          | Type      | Required | Default  | Description                                    |
| ------------- | --------- | -------- | -------- | ---------------------------------------------- |
| `label`       | `String`  | Yes      | -        | Label text for the input.                      |
| `value`       | `String`  | No       | `''`     | Initial value (deprecated, use `v-model`).     |
| `required`    | `Boolean` | No       | `false`  | Displays a "(required)" indicator.             |
| `type`        | `String`  | No       | `'text'` | Input type (`text`, `password`, `date`, etc.). |
| `disabled`    | `Boolean` | No       | `false`  | Disables the input.                            |
| `error`       | `String`  | No       | `''`     | Error message to display below the input.      |
| `placeholder` | `String`  | No       | `''`     | Placeholder text.                              |
| `maskPattern` | `String`  | No       | `''`     | Mask pattern string (e.g., `'##/##/####'`).    |
| `maskToken`   | `Object`  | No       | `{}`     | Custom mask tokens configuration.              |

### Events

| Event               | Payload  | Description                           |
| ------------------- | -------- | ------------------------------------- |
| `onValueChanged`    | `String` | Emitted when the input value changes. |
| `update:modelValue` | `String` | Standard v-model update event.        |

### Usage Example

```vue
<template>
  <TextInput
    label="Username"
    v-model="username"
    placeholder="Enter username"
    required
  />
  <TextInput label="Password" type="password" v-model="password" />
</template>
```

## `<ListBox />`

A custom dropdown/select component.

### Props

| Prop           | Type      | Required | Default | Description                                               |
| -------------- | --------- | -------- | ------- | --------------------------------------------------------- |
| `options`      | `Array`   | No       | `[]`    | Array of option objects `{ label: '...', value: '...' }`. |
| `label`        | `String`  | Yes      | -       | Label for the dropdown.                                   |
| `defaultValue` | `String`  | No       | -       | Default selected value                                    |
| `value`        | `String`  | No       | -       | Code controlled value (hard bind)                         |
| `selectItemLabel`| `String`  | No       | `undefined`| The label for selection                              |
| `isSelectItemLabelSelectable`| `Boolean`  | No       | `true`| Indicating that default item is selectable or no                              |
| `disabled`     | `Boolean` | No       | `false` | Disables the dropdown.                                    |
| `error`        | `String`  | No       | `''`    | Error message.                                            |


### Events

| Event               | Payload  | Description                           |
| ------------------- | -------- | ------------------------------------- |
| `onValueChanged`    | `String` | Emitted when value changes. |


### Usage Example

```vue
<template>
  <ListBox
    @OnValueChanged="(v) => console.log('onValueChanged : ', v)"
    :options="listBoxOptions"
    label="ListBox"
  />

  <ListBox
    @OnValueChanged="(v) => console.log('onValueChanged : ', v)"
    :options="listBoxOptions"
    :defaultValue="'2'"
    label="ListBox with defeult value"
  />

  <ListBox
    @OnValueChanged="(v) => console.log('onValueChanged : ', v)"
    :options="listBoxOptions"
    :value="valueToChange"
    label="ListBox with code controled value"
  />
  <ButtonComponent
    class="mb-20"
    :title="'Changed value to 3'"
    @click="() => (valueToChange = '3')"
  />

  <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptions" label="ListBox with select disabled item label" selectItemLabel="Select an item"  :isSelectItemLabelSelectable="true" />
     

    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="[{lable:'item', value:'1', disabled: true}]" label="ListBox with   disabled items " selectItemLabel="Select an item"   />
     
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
