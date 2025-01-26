# `DataTable` Documentation

## Introduction

The `DataTable` component is designed for displaying tabular data in a responsive and interactive format. It supports sorting, hiding columns, and pagination. The component includes features for header menus that allow users to sort, unsort, and hide columns, enhancing the usability of the table.

## Props

| Prop             | Type     | Required | Default                   | Description                                                                                        |
|------------------|----------|----------|---------------------------|----------------------------------------------------------------------------------------------------|
| `headers`        | `Array`  | Yes      | N/A                       | An array of objects defining the table headers, including titles, names, and formatting options.   |
| `items`          | `Array`  | Yes      | N/A                       | An array of data items to be displayed in the table rows.                                         |
| `displayActions` | `Boolean`| No       | `true`                    | If `true`, displays action buttons in the table (if any actions are defined).                     |
| `cssClass`       | `Object` | No       | See below                 | An object for custom CSS classes. Defaults to a set of classes for table styling.                  |

### Default CSS Classes
- `tableWrapperClass`: `"gts-print-table-wrapper"`
- `tableHeadersClass`: `"gts-print-table-header-data"`

## Data Properties

| Property                | Type         | Description                                                             |
|-------------------------|--------------|-------------------------------------------------------------------------|
| `visibleMenus`          | `Object`     | Tracks the visibility state of the header menus for sorting and hiding. |
| `paginationConfig`      | `Object`     | Configuration for pagination, including titles and page length options. |

## Lifecycle Hooks

### `mounted()`

- Initializes the horizontal scroll synchronization between the table and scrollbar.
- Adjusts the scrollbar width based on the table's content width.

## Methods

| Method               | Parameters      | Description                                                              |
|----------------------|-----------------|--------------------------------------------------------------------------|
| `toggleMenu`         | `fieldName`     | Toggles the visibility of the header menu for a specific column.        |
| `isMenuVisible`      | `fieldName`     | Checks if the menu for the specified column is visible.                 |
| `unsort`             | `fieldName`     | Unsorts the column and logs the action to the console.                  |
| `sortAsc`            | `fieldName`     | Sorts the column in ascending order and logs the action.                |
| `sortDesc`           | `fieldName`     | Sorts the column in descending order and logs the action.               |
| `hideColumn`         | `fieldName`     | Hides the specified column and logs the action.                         |

## CSS Classes

The `DataTable` includes various SCSS styles to ensure a polished look:

- `.gts-print-table-wrapper`: Container for the table.
- `.gts-print-table`: Base class for the table.
- `.gts-print-table-header`: Styles for the header section.
- `.gts-print-table-header-menu`: Menu for column actions (sort, unsort, hide).
- `.gts-print-table-content`: Styles for the rows of data.
- `.gts-print-table-scrollbar-container`: Container for the custom scrollbar.

## Usage Examples

### Basic Data Table

```vue
<template>
  <DataTable 
    :headers="tableHeaders" 
    :items="tableData"
    :displayActions="true"
    :cssClass="customCssClass"
  />
</template>

<script>
import DataTable from './DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      tableHeaders: [
        { name: 'id', title: 'ID', sortable: true },
        { name: 'name', title: 'Name', sortable: true },
        { name: 'age', title: 'Age', sortable: true },
      ],
      tableData: [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Doe', age: 34 },
      ],
      customCssClass: {
        tableWrapperClass: "my-custom-table-wrapper",
        tableHeadersClass: "my-custom-header-class",
      }
    };
  }
};
</script>
```

### Data Table with Custom Actions

```vue
<template>
  <DataTable 
    :headers="headers" 
    :items="items" 
    :displayActions="true" 
  />
</template>

<script>
import DataTable from './DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { name: 'id', title: 'ID', sortable: true },
        { name: 'name', title: 'Name', sortable: true },
        { name: 'actions', title: 'Actions', sortable: false, componentFormatter: 'ActionComponent' }
      ],
      items: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    };
  }
};
</script>

```