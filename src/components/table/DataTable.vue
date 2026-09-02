<template>

  <div :class="['gts-print-table-wrapper', className]">
    <ContextMenu :ref="`contextMenu`" className="gts-table-actions-menu" :actions="contextMenuActions" />

    <!-- ===== TOOLBAR ===== -->
    <div :class="['gts-data-table-actions']">

      <!-- Columns toggle -->
      <div class="gts-data-table-action gts-data-table-action-columns" @click="toggleColumnsMenu($event)">
        <ColumnsIcon /> <span>COLUMNS</span>
      </div>

      <!-- Export to PDF -->
      <div class="gts-data-table-action gts-data-table-action-export" @click="exportToPDF">
        <ExportIcon /> <span>EXPORT</span>
      </div>

      <!--
        Filter button — only rendered when showFilter prop is true.
        margin-left: auto pushes it to the far right of the flex toolbar.
        When filters are active, gts-filter-active class applies a subtle highlighted background.
        The label shows "FILTER(n)" where n is the count of active filters.
      -->
      <div v-if="showFilter"
        :class="['gts-data-table-action', 'gts-data-table-action-filter', { 'gts-filter-active': hasActiveFilters }]"
        @click="openFilterDialog">
        <FilterIcon />
        <span>FILTER<template v-if="activeFilterCount > 0">({{ activeFilterCount }})</template></span>
      </div>

    </div>

    <!-- ===== TABLE ===== -->
    <div :class="['gts-print-table-container', isScrollable ? 'gts-print-table-container-scrollable' : '']"
      ref="gtsPrintTableContainer">

      <table class="gts-print-table">
        <thead>
          <tr class="gts-print-table-header">
            <th class="gts-print-table-header-container" v-for="(header, index) in visibleHeaders" :key="header">
              <div :class="['gts-print-table-header-data', header.className]">

                <span class="gts-print-table-header-title"> {{ header.title }} </span>
                <span v-if="header.sortable" class="gts-print-table-header-icon"
                  @click="toggleMenu(header.name, $event)"><v-icon>{{ "mdi-dots-vertical" }}</v-icon></span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class="gts-print-table-content" v-for="(item, index) in dataToDisplay" :key="item">
            <td :class="['gts-print-table-content-data', header.className]" v-for="(header) in visibleHeaders"
              :key="header.name">

              <span v-if="header.componentFormatter">
                <component :item="item" :is="header.componentFormatter"></component>
              </span>

              <span v-else-if="header.textFormatter"> {{ header.textFormatter(item, index) }} </span>

              <span v-else>{{ item[header.name] }} </span>

            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <DataTablePagination v-if="isPaginable" :totalRecords="pagination.totalRecords"
      :pageLengths="pagination.pageLengths" :pageLengthTitle="pagination.pageLengthTitle"
      @changePage="onPaginationChange($event)" @lengthPageChanged="onNumberRowsPerPageChaned($event)" />

    <!--
      ===== FILTER DIALOG =====
      Uses the existing ConfirmationDialog component by default,
      or can be replaced/controlled via the 'filter-dialog' scoped slot.
    -->
    <slot name="filter-dialog" :isOpen="isFilterDialogOpen" :filterFields="filterFields" :filterValues="filterValues"
      :appliedFilters="appliedFilters" :applyFilters="applyFilters" :resetFilters="resetFilters"
      :closeFilterDialog="closeFilterDialog" :openFilterDialog="openFilterDialog" :setFilter="setFilter"
      :filterInputRefs="filterInputRefs" :getFilterInputRef="getFilterInputRef" :FilterField="FilterFieldComponent"
      :FilterInput="FilterFieldComponent" :hasActiveFilters="hasActiveFilters" :activeFilterCount="activeFilterCount">
      <ConfirmationDialog v-if="showFilter" :isOpen="isFilterDialogOpen" title="Filter" titleFirstBtn="Reset Filters"
        titleLastBtn="Apply" themeFirstBtn="gts-button-primary-inverse" themeLastBtn="gts-button-primary"
        @onFirstBtnClicked="resetFilters" @onLastBtnClicked="applyFilters" @onClosedDialog="closeFilterDialog">
        <!-- Auto-generated filter inputs for all filter fields (columns + additionalFilters) -->
        <div class="gts-filter-dialog-content">
          <slot name="filter-content" :filterFields="filterFields" :filterValues="filterValues" :setFilter="setFilter"
            :filterInputRefs="filterInputRefs" :getFilterInputRef="getFilterInputRef"
            :FilterField="FilterFieldComponent" :FilterInput="FilterFieldComponent">
            <template v-for="field in filterFields" :key="field.name">
              <slot :name="'filter-field-' + field.name" :field="field" :value="filterValues[field.name]"
                :setFilter="(val) => setFilter(field.name, val)" :filterRef="(el) => setFilterInputRef(field.name, el)">
                <TextInput :ref="el => setFilterInputRef(field.name, el)"
                  :label="field.filterLabel || field.title || field.label || field.name"
                  :placeholder="field.filterPlaceholder || ''" :type="field.isDate ? 'date' : (field.type || 'text')"
                  v-model="filterValues[field.name]" />
              </slot>
            </template>
          </slot>
        </div>
      </ConfirmationDialog>
    </slot>

    <!--
      Optional scoped slot 'filters' for parent to place filter controls anywhere outside the dialog
    -->
    <slot name="filters" :filterFields="filterFields" :filterValues="filterValues" :appliedFilters="appliedFilters"
      :setFilter="setFilter" :applyFilters="applyFilters" :resetFilters="resetFilters"
      :filterInputRefs="filterInputRefs" :getFilterInputRef="getFilterInputRef" :FilterField="FilterFieldComponent"
      :FilterInput="FilterFieldComponent" :hasActiveFilters="hasActiveFilters" :activeFilterCount="activeFilterCount">
    </slot>

  </div>

</template>

<script>
import ColumnsIcon from '@/assets/icons/ColumnsIcon.vue';
import ContextMenu from '../contextmenu/ContextMenu.vue';
import DataTablePagination from './DataTablePagination.vue';
import ExportIcon from '@/assets/icons/ExportIcon.vue';
import FilterIcon from '@/assets/icons/FilterIcon.vue';
import ConfirmationDialog from '../dialog/ConfirmationDialog.vue';
import TextInput from '../input/TextInput.vue';
import DataTableFilterField from './DataTableFilterField.vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import ToggleComponent from '../toggle/ToggleComponent.vue';

const defaultLengths = [10, 20, 60, 100];

export default {

  name: "DataTable",
  components: {
    DataTablePagination,
    ContextMenu,
    ColumnsIcon,
    ExportIcon,
    FilterIcon,
    ConfirmationDialog,
    TextInput,
    DataTableFilterField,
    FilterField: DataTableFilterField,
  },

  provide() {
    const self = this;
    return {
      dataTableFilterContext: {
        get filterFields() {
          return self.filterFields;
        },
        get filterValues() {
          return self.filterValues;
        },
        setFilter: (name, val) => self.setFilter(name, val),
        setFilterInputRef: (name, el) => self.setFilterInputRef(name, el),
        getFilterInputRef: (name) => self.getFilterInputRef(name),
        applyFilters: () => self.applyFilters(),
        resetFilters: () => self.resetFilters(),
      }
    };
  },

  emits: [
    'unsort',
    'sort-asc',
    'sort-desc',
    'hide-column',
    'changePage',
    'lengthPageChanged',
    'previousPage',
    'nextPage',
    'onFilter',
    'filter'
  ],

  props: {
    headers: {
      type: Array,
      required: true
    },

    items: {
      type: Array,
      required: true
    },

    displayActions: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },

    className: {
      type: String,
      required: false,
    },

    isPaginable: {
      type: Boolean,
      default: false,
    },

    isScrollable: {
      type: Boolean,
      default: false,
    },

    paginationConfig: {
      type: Object,
    },

    /**
     * When true, a Filter button is displayed in the toolbar (far right).
     * Clicking it opens a dialog with auto-generated filter inputs derived
     * from the headers configuration. Defaults to false for backward compat.
     */
    showFilter: {
      type: Boolean,
      default: false,
    },

    /**
     * Additional filter fields not part of the table column headers.
     * Shape: [{ name: string, title?: string, label?: string, filterLabel?: string, filterPlaceholder?: string, isDate?: boolean, type?: string, filter?: Function }]
     */
    additionalFilters: {
      type: Array,
      default: () => [],
    },

    /**
     * When true, prevents local in-memory filtering of items.
     * Use this when filtering is handled server-side via the emitted filter event.
     */
    preventLocalFilter: {
      type: Boolean,
      default: false,
    },

    /**
     * Alias for preventLocalFilter.
     */
    disableLocalFilter: {
      type: Boolean,
      default: false,
    },

    /**
     * When true, prevents automatic in-memory slicing of items and always displays the data passed via items.
     * When enabled, you must manually provide the correct slice of data corresponding to the active page.
     */
    preventPginationAutoSlice: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    pagination() {
      return {
        pageLengthTitle: this.paginationConfig?.pageLengthTitle || 'Row per page',
        totalRecords: this.paginationConfig?.totalRecords || this.filteredItems.length,
        pageLengths: this.paginationConfig?.pageLengths || defaultLengths
      }
    },

    /**
     * Returns the subset of headers that should produce filter inputs.
     * Any header with filterDisabled: true is excluded entirely.
     */
    filterableHeaders() {
      return this.headers.filter(h => !h.filterDisabled);
    },

    /**
     * Returns all filter fields (filterable column headers + additionalFilters).
     */
    filterFields() {
      return [
        ...this.filterableHeaders,
        ...(this.additionalFilters || [])
      ];
    },

    /**
     * Returns the DataTableFilterField component for scoped slot usage.
     */
    FilterFieldComponent() {
      return DataTableFilterField;
    },

    /**
     * True when at least one applied filter value is non-empty.
     * Drives the gts-filter-active class on the Filter button.
     */
    hasActiveFilters() {
      return Object.values(this.appliedFilters).some(v => v && String(v).trim() !== '');
    },

    /**
     * The count of currently active (non-empty) applied filters.
     * Displayed in the button label as FILTER(n).
     */
    activeFilterCount() {
      return Object.values(this.appliedFilters).filter(v => v && String(v).trim() !== '').length;
    },

    /**
     * Applies the current appliedFilters to the full items array.
     * If disableLocalFilter or preventLocalFilter is true, returns items directly (server-side filtering).
     * Otherwise:
     * For each filter field (columns + additionalFilters):
     *   - If a custom `filter(item, index, value)` function is defined → use it exclusively.
     *   - If isDate is true → normalise both the stored value and the filter value to
     *     YYYY-MM-DD before comparing, so 10/10/2024, 10-10-2024 and 2024/10/10 all match.
     *   - Otherwise → default case-insensitive partial-match on the field value.
     * Returns the full items array untouched when no filter is active.
     */
    filteredItems() {
      if (this.preventLocalFilter || this.disableLocalFilter) {
        return this.items;
      }

      if (!this.hasActiveFilters) return this.items;

      return this.items.filter((item, index) => {
        return this.filterFields.every(field => {
          const value = this.appliedFilters[field.name];

          // Skip this column if no filter value has been set
          if (!value || String(value).trim() === '') return true;

          // Custom filter function takes full priority
          if (typeof field.filter === 'function') {
            return field.filter(item, index, value);
          }

          // Date filter: normalise both sides to YYYY-MM-DD then compare
          if (field.isDate) {
            const normalizedItem = this.normalizeDateToYMD(String(item[field.name] ?? ''));
            const normalizedFilter = this.normalizeDateToYMD(String(value).trim());
            // If either side couldn't be parsed, fall back to string comparison
            if (normalizedItem && normalizedFilter) {
              return normalizedItem === normalizedFilter;
            }
          }

          // Default: case-insensitive partial match on the raw field value
          const fieldValue = String(item[field.name] ?? '').toLowerCase();
          return fieldValue.includes(String(value).trim().toLowerCase());
        });
      });
    },

    /**
     * Slices filteredItems for the current pagination page.
     * When not paginated, returns the full filteredItems array.
     */
    splitedItems() {
      if (this.isPaginable && !this.preventPginationAutoSlice) {
        const start = (this.currentPaginationPage - 1) * this.rowPerPage;
        const end = start + this.rowPerPage;
        return this.filteredItems.slice(start, end);
      }
      return this.filteredItems;
    },

    dataToDisplay() {
      if (this.sortBy) {
        return this.sortItems()
      }
      return this.splitedItems;
    },

    visibleHeaders() {
      return this.headers.filter(h => !this.hiddenColumns.includes(h.name));
    },
  },



  data() {
    return {
      contextMenuActions: undefined,
      currentPaginationPage: 1,
      rowPerPage: this.paginationConfig?.pageLengths[0] || defaultLengths[0],
      sortBy: undefined,
      sortType: "asc",
      hiddenColumns: [],

      // --- Filter state ---
      /** Whether the filter dialog is currently open */
      isFilterDialogOpen: false,

      /**
       * Draft filter values currently being edited inside the dialog.
       * Only committed to appliedFilters on "Apply".
       * Shape: { [field.name]: string }
       */
      filterValues: {},

      /**
       * The last applied filter values — used to actually filter the dataset.
       * Reset to {} by resetFilters().
       * Shape: { [field.name]: string }
       */
      appliedFilters: {},

      /**
       * Map of template references for each filter TextInput component.
       * Shape: { [field.name]: TextInputComponentInstance }
       */
      filterInputRefs: {},
    }
  },

  methods: {

    // ─── Filter dialog methods ─────────────────────────────────────────────────

    /**
     * Records or removes a reference to a filter TextInput component instance.
     */
    setFilterInputRef(name, el) {
      if (el) {
        this.filterInputRefs[name] = el;
      } else {
        delete this.filterInputRefs[name];
      }
    },

    /**
     * Returns the TextInput component reference for a given filter field name.
     */
    getFilterInputRef(name) {
      return this.filterInputRefs[name];
    },

    /**
     * Programmatically sets the draft value of a filter field.
     */
    setFilter(name, value) {
      this.filterValues = {
        ...this.filterValues,
        [name]: value
      };
    },

    /**
     * Builds and returns a clean JSON payload of all filter fields and their current applied values.
     */
    getFilterPayload() {
      const payload = {};
      for (const field of this.filterFields) {
        payload[field.name] = this.appliedFilters[field.name] !== undefined ? this.appliedFilters[field.name] : '';
      }
      for (const [key, val] of Object.entries(this.appliedFilters)) {
        payload[key] = val !== undefined ? val : '';
      }
      return payload;
    },

    /**
     * Normalises a date string from any of the supported formats:
     *   DD/MM/YYYY  DD-MM-YYYY  YYYY/MM/DD  YYYY-MM-DD
     * and always returns a canonical YYYY-MM-DD string for comparison.
     * Returns null if the input cannot be parsed.
     */
    normalizeDateToYMD(dateStr) {
      if (!dateStr) return null;

      // Replace all separators (/ or -) with a common delimiter for splitting
      const parts = dateStr.replace(/[-/]/g, '/').split('/');
      if (parts.length !== 3) return null;

      let day, month, year;

      if (parts[0].length === 4) {
        // Format: YYYY/MM/DD
        [year, month, day] = parts;
      } else {
        // Format: DD/MM/YYYY
        [day, month, year] = parts;
      }

      // Zero-pad and validate the pieces are numeric
      day = String(day).padStart(2, '0');
      month = String(month).padStart(2, '0');
      year = String(year);

      if (!/^\d{4}$/.test(year) || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(day)) return null;

      return `${year}-${month}-${day}`;
    },

    /**
     * Opens the filter dialog.
     * Pre-populates the draft filterValues with the current appliedFilters
     * so the user sees their last applied state when re-opening.
     */
    openFilterDialog() {
      // Clone appliedFilters into the draft so the dialog reflects current state
      this.filterValues = { ...this.appliedFilters };
      this.isFilterDialogOpen = true;
    },

    /** Closes the filter dialog without committing any draft changes. */
    closeFilterDialog() {
      this.isFilterDialogOpen = false;
    },

    /**
     * Commits the draft filterValues to appliedFilters, resets to page 1,
     * closes the dialog, and emits the filter event with the JSON payload.
     */
    applyFilters() {
      this.appliedFilters = { ...this.filterValues };
      this.currentPaginationPage = 1;
      this.isFilterDialogOpen = false;
      const payload = this.getFilterPayload();
      this.$emit('onFilter', payload);
      this.$emit('filter', payload);
    },

    /**
     * Clears all filter values (both draft and applied), resets to page 1,
     * closes the dialog, and emits the filter event with the cleared payload.
     */
    resetFilters() {
      this.filterValues = {};
      this.appliedFilters = {};
      this.currentPaginationPage = 1;
      this.isFilterDialogOpen = false;
      const payload = this.getFilterPayload();
      this.$emit('onFilter', payload);
      this.$emit('filter', payload);
    },

    // ─── Existing methods (unchanged) ─────────────────────────────────────────

    toggleMenu(headerTitle, event) {

      event.stopPropagation();

      const contextMenuComponent = this.$refs.contextMenu;
      contextMenuComponent.toggleMenu();

      this.$nextTick(() => {
        const contextMenuDOM = contextMenuComponent.$el;

        //👉 nodeType === 1 → c'est un vrai élément HTML.
        //👉 nodeType === 8 → c'est un commentaire (<!--v-if-->).

        if (contextMenuDOM.nodeType == 1) {
          this.setUpSortingMenu(headerTitle);
          const wrapperRect = this.$el.getBoundingClientRect();
          const { clientX, clientY } = event;

          contextMenuDOM.style.left = `${clientX - wrapperRect.left}px`;
          contextMenuDOM.style.top = `${clientY - wrapperRect.top}px`;
          contextMenuDOM.style.display = 'block';
        }

      });
    },

    onPaginationChange(currentPage) {
      this.currentPaginationPage = currentPage;
      this.$emit('changePage', this.currentPaginationPage);
    },

    onNumberRowsPerPageChaned(nbrRows) {
      this.rowPerPage = nbrRows;
      this.$emit('lengthPageChanged', nbrRows);
    },

    sortItems() {
      if (!this.sortBy) return this.splitedItems;

      const header = this.headers.find(h => h.name === this.sortBy);
      const sortFn =
        typeof header?.compare === 'function'
          ? header.compare
          : (a, b) => {
            let valA = a?.[this.sortBy];
            let valB = b?.[this.sortBy];

            // Handle null/undefined
            if (valA === undefined || valA === null) return 1;
            if (valB === undefined || valB === null) return -1;
            if (valA === valB) return 0;

            // Date sorting (assuming DD/MM/YYYY format based on example)
            const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
            if (typeof valA === 'string' && typeof valB === 'string' && datePattern.test(valA) && datePattern.test(valB)) {
              const dateA = moment(valA, 'DD/MM/YYYY');
              const dateB = moment(valB, 'DD/MM/YYYY');
              if (dateA.isValid() && dateB.isValid()) {
                return dateA.isBefore(dateB) ? -1 : 1;
              }
            }

            // Numeric sorting
            const numA = Number(valA);
            const numB = Number(valB);
            if (!isNaN(numA) && !isNaN(numB) && typeof valA !== 'boolean' && typeof valB !== 'boolean') {
              return numA - numB;
            }

            // String sorting
            return String(valA).localeCompare(String(valB), undefined, { numeric: true, sensitivity: 'base' });
          };


      const sorted = [...this.splitedItems].sort(sortFn);

      return this.sortType === 'desc' ? sorted.reverse() : sorted;
    },

    toggleColumnsMenu(event) {
      event.stopPropagation();

      this.contextMenuActions = this.headers.map(header => {
        return {
          component: ToggleComponent,
          props: {
            label: header.title,
            isChecked: !this.hiddenColumns.includes(header.name),
            noBind: false,
            id: header.name,
            class: 'gts-column-toggle'
          },
          events: {
            onToggle: (isChecked) => {
              // isChecked passed from toggle event is the NEW state.
              // If new state is checked (true) -> want it to be visible -> remove from hiddenColumns
              // If new state is unchecked (false) -> want it to be hidden -> add to hiddenColumns

              if (isChecked) {
                this.hiddenColumns = this.hiddenColumns.filter(c => c !== header.name);
              } else {
                this.hiddenColumns.push(header.name);
              }
            }
          }
        }
      });

      const contextMenuComponent = this.$refs.contextMenu;
      contextMenuComponent.toggleMenu();

      this.$nextTick(() => {
        const contextMenuDOM = contextMenuComponent.$el;
        if (contextMenuDOM.nodeType == 1) {
          const wrapperRect = this.$el.getBoundingClientRect();
          const { clientX, clientY } = event;

          contextMenuDOM.style.left = `${clientX - wrapperRect.left}px`;
          contextMenuDOM.style.top = `${clientY - wrapperRect.top}px`;
          contextMenuDOM.style.display = 'block';
        }
      });
    },

    setUpSortingMenu(headerTitle) {

      this.contextMenuActions = [
        {
          title: 'Sort Asc',
          onClick: () => {
            this.sortBy = headerTitle;
            this.sortType = 'asc';
          }
        }, {
          title: 'Sort Desc',
          onClick: () => {
            this.sortBy = headerTitle;
            this.sortType = 'desc';
          }
        },
        {
          title: 'Unsort',
          onClick: () => {
            this.sortType = 'asc';
            this.sortBy = undefined;
          }
        },
        {
          title: 'Hide',
          onClick: () => {
            this.hiddenColumns.push(headerTitle);
          }
        },

      ]
    },

    exportToPDF() {
      const doc = new jsPDF();

      const tableHeaders = this.visibleHeaders.map(header => header.title);

      const tableData = this.items.map((item, index) => {
        return this.visibleHeaders.map(header => {
          if (header.textFormatter) {
            return header.textFormatter(item, index);
          }
          if (header.componentFormatter) {
            // For component formatters, we can't easily get the text value.
            // We'll try to find a field name or return empty.
            return item[header.name] || '';
          }
          return item[header.name] || '';
        });
      });

      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });

      doc.save('table-export.pdf');
    },
  }

}
</script>

<style lang="scss">
.gts-print-table-wrapper {
  position: relative;
  width: 100%;

  .gts-data-table-actions {
    display: flex;
    gap: 10px;
    font-weight: 500;
    align-items: center;

    .gts-data-table-action {
      display: flex;
      gap: 5px;
      padding: 5px;
      align-items: center;
      transition-duration: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: $primary-color-50;
      }
    }

    /*
     * Filter button is pushed to the far right using margin-left: auto.
     * When filters are active (.gts-filter-active), the button uses the same
     * $primary-color-50 background as the hover state — subtle but visible,
     * keeping text and icon colors unchanged.
     */
    .gts-data-table-action-filter {
      margin-left: auto;
      border-radius: 6px;
      transition: background-color 0.2s;

      &.gts-filter-active {
        background-color: $primary-color-50;
        font-weight: 700;
      }
    }

  }

  .gts-table-actions-menu {
    position: absolute;
  }

  .gts-print-table-container-scrollable {
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      height: 10px; // Hauteur de la scrollbar
    }

    &::-webkit-scrollbar-track {
      background: $primary-color-50; // Couleur de la piste de la scrollbar
    }

    &::-webkit-scrollbar-thumb {
      background-color: $primary-color-500; // Couleur du curseur
      border-radius: 10px; // Arrondir le curseur
      border: 2px solid $primary-color-500; // Bordure autour du curseur
      cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: $primary-color-500; // Couleur du curseur au survol
    }

    &::-webkit-scrollbar-button {
      display: none; // Masquer les boutons de défilement
    }




  }

  .gts-print-table-container {
    border-radius: 12px;
    border: 1px solid $neutral-color-100;
    margin-top: 5px;


    .gts-print-table {
      border-collapse: collapse;
      white-space: nowrap;
      width: 100%;

      .gts-print-table-header {

        .gts-print-table-header-container {

          .gts-print-table-header-data {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border-right: 1px solid $neutral-color-100;
            border-bottom: 1px solid $neutral-color-100;
            background: $primary-color-50;

            .gts-print-table-header-menu {
              position: absolute;
              top: 60px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-radius: 8px;
              border: 1px solid $primary-color-400;
              background-color: $color-white;
              z-index: 1;

              .gts-print-table-header-menu-item {
                padding: 12px 8px;
                width: 150px;
                height: 48px;
                font-weight: 500;
                font-size: 16px;
                text-align: left;
                line-height: 24px;
                color: $primary-color-500;
                border-radius: 4px;
                cursor: pointer;
              }

              .gts-print-table-header-menu-item:hover {
                background: $primary-color-500;
                color: $color-white;
                transition: background-color 0.5s ease-out;
              }
            }
          }

          .gts-print-table-header-title {
            font-size: 16px;
            line-height: 24px;
            color: $primary-color-400;
            text-wrap: nowrap;
          }

          .gts-print-table-header-icon {
            height: 24px;
            width: 24px;
            cursor: pointer;
          }
        }

      }

      .gts-print-table-content {

        .gts-print-table-content-data {
          padding: 12px;
          //width: 184px;
          height: 64px;
          font-size: 14px;
          border-bottom: 1px dashed $neutral-color-100;
          color: $primary-color-700;
          white-space: wrap;
          word-break: break-all;

          .gts-print-table-content-actions-icon {
            margin: 0px 5px;
            cursor: pointer;
          }

          .gts-print-table-content-actions-icon.update-icon {
            color: $primary-color-700;
          }

          .gts-print-table-content-actions-icon.remove-icon {
            color: $accent-dark-red-color;
          }

        }

        &:nth-child(even) {
          .gts-print-table-content-data {
            background-color: #DEE8EA6B;
          }
        }

      }
    }

  }

}

/*
 * Filter dialog content: stacks TextInputs vertically with consistent spacing.
 */
.gts-filter-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


td:last-child,
th:last-child {
  border-right: none; // Pour éviter la bordure à la fin de la ligne
}
</style>