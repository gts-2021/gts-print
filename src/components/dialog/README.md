
# Dialog Components Documentation

## `<BasicDialog />`

The `BasicDialog` component provides a simple dialog box structure with customizable title, title color, and an optional close icon.

### Usage

```vue
<BasicDialog :title="Dialog Title" :isOpen="true" :titleColor="'#333'" @onClosedDialog="handleClose">
  <template v-slot:footer>
    <button @click="confirmAction">Confirm</button>
    <button @click="cancelAction">Cancel</button>
  </template>
</BasicDialog>
```

### Props

| Prop         | Type    | Required | Default | Description                                           |
|--------------|---------|----------|---------|-------------------------------------------------------|
| `title`      | String  | No       | `''`    | Title text displayed in the dialog header.            |
| `titleColor` | String  | No       | `''`    | Sets the color of the dialog title text.              |
| `isOpen`     | Boolean | No       | `false` | Determines if the dialog is visible.                  |
| `className`  | String  | No       | `''`    | Optional CSS class to apply to the dialog container.  |

### Events

| Event               | Description                                |
|---------------------|--------------------------------------------|
| `@onClosedDialog`   | Emitted when the close icon is clicked.    |

## `<ConfirmationDialog />`

The `ConfirmationDialog` component is a pre-configured dialog box extending `BasicDialog`, with additional props for customizing two action buttons.

### Usage

```vue
<ConfirmationDialog 
  :title="'Confirm Action'" 
  :titleFirstBtn="'Yes'" 
  :titleLastBtn="'No'" 
  @onFirstBtnClicked="handleConfirm" 
  @onLastBtnClicked="handleCancel" 
/>
```

### Props

| Prop             | Type    | Required | Default                       | Description                                               |
|------------------|---------|----------|-------------------------------|-----------------------------------------------------------|
| `className`      | String  | No       | `''`                          | Additional CSS class for the dialog styling.              |
| `themeFirstBtn`  | String  | No       | `'gts-button-primary-inverse'`| CSS class to style the first button.                      |
| `themeLastBtn`   | String  | No       | `'gts-button-primary'`        | CSS class to style the last button.                       |
| `titleFirstBtn`  | String  | Yes      | `N/A`                         | Text for the first (left) button.                         |
| `titleLastBtn`   | String  | Yes      | `N/A`                         | Text for the last (right) button.                         |

### Events

| Event               | Description                                       |
|---------------------|---------------------------------------------------|
| `@onFirstBtnClicked` | Emitted when the first button is clicked.         |
| `@onLastBtnClicked`  | Emitted when the last button is clicked.          |

---

By leveraging `BasicDialog` and `ConfirmationDialog`, you can customize modal dialogs for various confirmation or informational prompts within your Vue application.
