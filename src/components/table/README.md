# DataTable Documentation

## Introduction

The `DataTable` component is a feature-rich table for displaying data with support for sorting, pagination, and custom column formatting. It includes a built-in context menu for column actions (sort/hide).

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headers` | `Array` | Yes | - | Array of header objects defining columns. |
| `items` | `Array` | Yes | - | Array of data objects to display. |
| `displayActions` | `Boolean` | No | `true` | Controls visibility of action buttons (if applicable). |
| `className` | `String` | No | `''` | Custom CSS class for the table wrapper. |
| `isPaginable` | `Boolean` | Yes | `false` | Enables pagination. |
| `isScrollable` | `Boolean` | Yes | `false` | Enables horizontal scrolling. |
| `paginationConfig` | `Object` | Yes | - | Configuration for pagination (page lengths, etc.). |
| `showFilter` | `Boolean` | No | `false` | Enables a "Filter" button in the toolbar to open the filter dialog. |
| `filterConfiguration` | `Array` | No | `[]` | Optional array of configuration objects for filtering columns. |

### Header Object Structure

Each object in `headers` should look like:

```javascript
{
  name: 'fieldName', // Key in the data item
  title: 'Column Title', // Displayed in header
  sortable: true, // Enable sorting menu
  className: 'custom-class', // Optional CSS class
  componentFormatter: 'MyComponent', // Optional Vue component for cell content
  textFormatter: (item, index) => { ... } // Optional function to format text
}
```

PS: You should specify header.name , to ensure sorting and hiding columns work properly.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `changePage` | `Number` | Emitted when the current page changes (from Pagination). |
| `lengthPageChanged` | `Number` | Emitted when the rows per page changes (from Pagination). |

## Usage Examples

### Basic Table with Pagination

```vue
<template>
  <DataTable 
    :headers="headers" 
    :items="users"
    :isPaginable="true"
    :paginationConfig="paginationConfig"
  />
</template>

<script>
import DataTable from '@/components/table/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { name: 'id', title: 'ID', sortable: true },
        { name: 'name', title: 'Name', sortable: true },
        { name: 'email', title: 'Email', sortable: false }
      ],
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ],
      paginationConfig: {
        pageLengths: [5, 10, 20]
      }
    };
  }
};
</script>
```

### Table with Custom Component Formatter

```vue
<template>
  <DataTable 
    :headers="headers" 
    :items="orders"
    :isPaginable="false"
  />
</template>

<script>
import DataTable from '@/components/table/DataTable.vue';
import StatusBadge from '@/components/StatusBadge.vue';

export default {
  components: { DataTable, StatusBadge },
  data() {
    return {
      headers: [
        { name: 'orderId', title: 'Order ID' },
        { name: 'status', title: 'Status', componentFormatter: 'StatusBadge' }
      ],
      orders: [
        { orderId: 101, status: 'shipped' },
        { orderId: 102, status: 'pending' }
      ]
    };
  }
};
</script>
```

## Filter System

When `showFilter` is true, a **Filter** button appears on the right side of the toolbar. Clicking it opens a dialog generated dynamically based on the headers.

### Filter Configuration Structure

You can configure filtering behaviors by passing the `filterConfiguration` prop:

```javascript
[
  {
    field: 'fieldName',                     // Field name mapping to header
    filter: (tableItem, index) => { ... }, // Optional custom predicate function
    disable: false,                         // Optional. If true, disables filtering for this field
    isDate: false                           // Optional. If true, uses a HTML5 date input type
  }
]
```

### Filtering Behaviors

1. **Default String Match**: If no custom config or custom filter function is defined, a case-insensitive partial match is performed against the column values.
2. **Disabled Fields**: Setting `disable: true` prevents the field's input from rendering in the filter dialog and excludes it from the filter results completely.
3. **Date Filters**: Setting `isDate: true` displays a calendar date picker input. It automatically handles comparison mismatch across formats (e.g. comparing user date input `YYYY-MM-DD` against item date values of format `DD/MM/YYYY` or `DD-MM-YYYY` at the day level).
4. **Custom Filters**: If a `filter(item, index)` function is provided, it is invoked as a predicate for the item.

### Example with Filter Configuration

```vue
<template>
  <DataTable 
    :headers="headers" 
    :items="items"
    :showFilter="true"
    :filterConfiguration="filterConfig"
  />
</template>

<script>
import DataTable from '@/components/table/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { name: 'id', title: 'ID' },
        { name: 'companyName', title: 'Name' },
        { name: 'activationDate', title: 'Activation Date' },
        { name: 'status', title: 'Status' }
      ],
      items: [
        { id: 1, companyName: 'Google', activationDate: '23/05/2024', status: 'ACTIVE' },
        { id: 2, companyName: 'OpenAI', activationDate: '10/10/2024', status: 'INACTIVE' }
      ],
      filterConfig: [
        { field: 'id', disable: true }, // Hide from filter dialog
        { field: 'activationDate', isDate: true }, // Enable date picker format support
        { 
          field: 'status', 
          filter: (item) => item.status === 'ACTIVE' // Custom filter predicate
        }
      ]
    };
  }
};
</script>
```