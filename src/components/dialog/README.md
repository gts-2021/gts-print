# Dialog Components Documentation

This package includes two dialog components: `BasicDialog` for generic modal content and `ConfirmationDialog` for standard confirmation prompts.

## `<BasicDialog />`

The `BasicDialog` component provides a simple modal structure with a customizable header, content area, and footer.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `String` | No | `''` | Title text displayed in the dialog header. |
| `titleColor` | `String` | No | `''` | Color of the title text (CSS color string). |
| `isOpen` | `Boolean` | No | `false` | Controls the visibility of the dialog. |
| `className` | `String` | No | `''` | Custom CSS class for the dialog container. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onClosedDialog` | None | Emitted when the close icon in the header is clicked. |

### Slots

| Slot | Description |
|------|-------------|
| `default` | The main content of the dialog. |
| `footer` | Optional footer content (e.g., action buttons). |

### Usage Example

```vue
<template>
  <BasicDialog 
    title="My Dialog" 
    :isOpen="isDialogOpen" 
    @onClosedDialog="closeDialog"
  >
    <p>This is the dialog content.</p>
    <template #footer>
      <button @click="closeDialog">Close</button>
    </template>
  </BasicDialog>
</template>
```

---

## `<ConfirmationDialog />`

The `ConfirmationDialog` extends `BasicDialog` to provide a standardized confirmation modal with two action buttons (e.g., "Yes/No" or "Confirm/Cancel").

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `titleFirstBtn` | `String` | Yes | - | Text for the first (left) button. |
| `titleLastBtn` | `String` | Yes | - | Text for the last (right) button. |
| `themeFirstBtn` | `String` | No | `'gts-button-primary-inverse'` | Theme class for the first button. |
| `themeLastBtn` | `String` | No | `'gts-button-primary'` | Theme class for the last button. |
| `disabledFirstBtn` | `Boolean` | No | `false` | Disables the first button. |
| `disabledLastBtn` | `Boolean` | No | `false` | Disables the last button. |
| `className` | `String` | No | `''` | Custom CSS class. |
| ... | ... | ... | ... | Inherits all props from `BasicDialog`. |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onFirstBtnClicked` | None | Emitted when the first button is clicked. |
| `onLastBtnClicked` | None | Emitted when the last button is clicked. |
| `onClosedDialog` | None | Emitted when the dialog is closed via the header icon. |

### Usage Example

```vue
<template>
  <ConfirmationDialog 
    title="Delete Item?" 
    :isOpen="showConfirm"
    titleFirstBtn="Cancel"
    titleLastBtn="Delete"
    themeLastBtn="gts-button-danger"
    @onFirstBtnClicked="cancelDelete"
    @onLastBtnClicked="confirmDelete"
    @onClosedDialog="cancelDelete"
  >
    <p>Are you sure you want to delete this item?</p>
  </ConfirmationDialog>
</template>
```
