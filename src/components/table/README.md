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