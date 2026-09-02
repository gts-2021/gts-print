# DataTable Documentation

## Introduction

The `DataTable` component is a feature-rich table for displaying data with support for sorting, pagination, search, server-side filtering, custom column formatting, and flexible filter dialog layouts. It includes a built-in context menu for column actions (sort/hide) and an integrated filter dialog.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headers` | `Array` | Yes | - | Array of header objects defining columns. |
| `items` | `Array` | Yes | - | Array of data objects to display. |
| `displayActions` | `Boolean` | No | `true` | Controls visibility of action buttons (if applicable). |
| `className` | `String` | No | `''` | Custom CSS class for the table wrapper. |
| `isPaginable` | `Boolean` | No | `false` | Enables pagination. |
| `isScrollable` | `Boolean` | No | `false` | Enables horizontal scrolling. |
| `paginationConfig` | `Object` | No | - | Configuration for pagination (`pageLengths`, `totalRecords`, `pageLengthTitle`, `totalRecordsTitle`). |
| `preventPginationAutoSlice` | `Boolean` | No | `false` | When `true`, disables automatic client-side array slicing and always displays the exact data passed via `:items`. You must manually handle and pass the correct data slice related to the active page. |
| `showFilter` | `Boolean` | No | `false` | Shows the FILTER button in the table toolbar. |
| `preventLocalFilter` | `Boolean` | No | `false` | When `true`, bypasses client-side in-memory filtering so filtering can be handled server-side. |
| `disableLocalFilter` | `Boolean` | No | `false` | Alias for `preventLocalFilter`. |
| `additionalFilters` | `Array` | No | `[]` | Extra filter field definitions that are not part of the table columns. |
| `exportable` | `Boolean` | No | `false` | Enables export button (PDF, CSV). |
| `exportConfig` | `Object` | No | - | Configuration for file export (name, formats, etc.). |

### Header & Filter Object Structure

Each object in `headers` / `additionalFilters` supports the following properties:

```javascript
{
  name: 'companyName',          // Field key (Required)
  title: 'Company Name',        // Column header title & default filter label
  sortable: true,               // Enable column sorting
  filterDisabled: false,        // If true, excludes this field from the filter dialog
  filterLabel: 'Custom Label',  // Optional custom label for the filter input
  filterPlaceholder: 'Search...', // Optional custom placeholder
  isDate: false,                // If true, uses a date picker input
  className: 'custom-class',    // Optional CSS class for column
  componentFormatter: 'MyComp', // Optional Vue component for cell rendering
  textFormatter: (item) => { ... } // Optional text formatting function
}
```

> **Note:** Always specify `name` for each header to ensure sorting, column hiding, and filtering operate properly.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onFilter` | `Object` (JSON) | Emitted when filters are applied or reset. Payload contains `{ [fieldName]: value, ... }`. |
| `filter` | `Object` (JSON) | Alias for `onFilter`. |
| `changePage` | `Number` | Emitted when current page changes. |
| `lengthPageChanged` | `Number` | Emitted when rows per page length changes. |
| `previousPage` | `Number` | Emitted when previous page button is clicked. |
| `nextPage` | `Number` | Emitted when next page button is clicked. |
| `unsort` | `String` | Emitted when column sort is cleared. |
| `sort-asc` | `String` | Emitted when column is sorted ascending. |
| `sort-desc` | `String` | Emitted when column is sorted descending. |
| `hide-column` | `String` | Emitted when column visibility is toggled. |

## Exposed Component Methods & Properties

Accessible via template ref (e.g. `this.$refs.myTable`):

| Method / Property | Return Type | Description |
|-------------------|-------------|-------------|
| `getFilterInputRef(name)` | `Component \| Element` | Returns the `TextInput` instance reference for the specified field name. |
| `setFilter(name, value)` | `void` | Programmatically sets a filter value. |
| `getFilterPayload()` | `Object` | Returns the current JSON filter payload. |
| `applyFilters()` | `void` | Applies active filters and emits `onFilter`. |
| `resetFilters()` | `void` | Clears all filters and emits `onFilter`. |
| `openFilterDialog()` | `void` | Opens the filter dialog. |
| `closeFilterDialog()` | `void` | Closes the filter dialog. |
| `filterInputRefs` | `Object` | Reactive map of all filter input component references keyed by field name. |

## Slots

| Slot Name | Slot Props | Description |
|-----------|------------|-------------|
| `#filter-content` | `{ FilterField, FilterInput, filterFields, filterValues, setFilter, filterInputRefs, getFilterInputRef }` | Customize the layout and positioning of inputs inside the default filter dialog without configuring inputs manually. |
| `#filter-dialog` | `{ isOpen, filterFields, filterValues, setFilter, applyFilters, resetFilters, closeFilterDialog, FilterField }` | Completely override or customize the filter dialog. |
| `#filters` | `{ FilterField, filterFields, filterValues, setFilter, applyFilters, resetFilters }` | Render filter controls outside of the dialog anywhere on the page. |
| `#filter-field-[fieldName]` | `{ field, value, setFilter, filterRef }` | Customize the rendering of a specific field row within the default dialog loop. |

---

## Usage Examples

### 1. Server-Side Filtering (`preventLocalFilter` + `@onFilter`)

```vue
<template>
  <DataTable
    :showFilter="true"
    :preventLocalFilter="true"
    :headers="headers"
    :items="serverItems"
    @onFilter="fetchDataFromServer"
  />
</template>

<script>
import DataTable from '@/components/table/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { name: 'name', title: 'Name' },
        { name: 'email', title: 'Email' }
      ],
      serverItems: []
    };
  },
  methods: {
    async fetchDataFromServer(filterPayload) {
      console.log('Filter payload sent to API:', filterPayload);
      // Example: { name: 'Alice', email: '' }
      const res = await api.getUsers({ params: filterPayload });
      this.serverItems = res.data;
    }
  }
};
</script>
```

### 2. Custom Filter Input Positioning (`#filter-content` with zero-config `FilterField`)

You don't need to manage the dialog manually or setup `<TextInput>` props. Simply use `FilterField` and position your inputs in any custom grid/layout:

```vue
<template>
  <DataTable
    :showFilter="true"
    :headers="headers"
    :items="items"
    :additionalFilters="extraFilters"
    @onFilter="handleFilter"
  >
    <!-- Dialog is handled automatically. Position inputs with zero manual configuration -->
    <template #filter-content="{ FilterField }">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <component :is="FilterField" name="name" />
        <component :is="FilterField" name="email" />
        <component :is="FilterField" name="status" />
        <component :is="FilterField" name="country" />
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from '@/components/table/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { name: 'name', title: 'Name' },
        { name: 'email', title: 'Email' }
      ],
      extraFilters: [
        { name: 'status', title: 'Status', filterPlaceholder: 'Active / Inactive' },
        { name: 'country', title: 'Country' }
      ],
      items: [...]
    };
  }
};
</script>
```

### 3. Additional Filter Fields (Not Part of Column Headers)

```vue
<template>
  <DataTable
    :showFilter="true"
    :headers="headers"
    :items="items"
    :additionalFilters="[
      { name: 'category', title: 'Category' },
      { name: 'createdAfter', title: 'Created After', isDate: true }
    ]"
    @onFilter="onFilterApplied"
  />
</template>
```

### 4. Server-Side / Custom Pagination (`preventPginationAutoSlice`)

> **Important:** When `:preventPginationAutoSlice="true"` is set, `DataTable` bypasses automatic client-side array slicing and always displays the data passed directly via `:items`. You must manually handle fetching and binding the correct page data slice based on `@changePage` and `@lengthPageChanged`.

```vue
<template>
  <div>
    <h4>Server-Side Paginated Table</h4>
    <DataTable
      :isPaginable="true"
      :preventPginationAutoSlice="true"
      :paginationConfig="pagination"
      :headers="headers"
      :items="serverItems"
      @changePage="fetchPage"
      @lengthPageChanged="changePageSize"
    />
  </div>
</template>

<script>
import DataTable from '@/components/table/DataTable.vue';

export default {
  components: { DataTable },
  data() {
    return {
      headers: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
      ],
      serverItems: [],
      pagination: {
        totalRecords: 100,
        pageLengths: [10, 20, 50],
        pageLengthTitle: "Rows per page"
      }
    };
  },
  created() {
    this.fetchPage(1);
  },
  methods: {
    async fetchPage(pageNumber) {
      // Fetch data from server for the specific page requested
      const response = await api.getUsers({
        page: pageNumber,
        size: this.pagination.pageLengths[0]
      });

      // Pass the server content directly to items
      this.serverItems = response.data.content;
      this.pagination.totalRecords = response.data.totalElements;
    },
    changePageSize(newLength) {
      this.fetchPage(1);
    }
  }
};
</script>
```