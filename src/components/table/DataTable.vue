<template>

  <div :class="['gts-print-table-wrapper', className]">
    <ContextMenu :ref="`contextMenu`" className="gts-table-actions-menu" :actions="contextMenuActions" />

    <!-- Filter Dialog -->
    <FilterDialog v-if="showFilter" :isOpen="isFilterDialogOpen" :headers="headers"
      :filterConfiguration="filterConfiguration" :currentFilters="appliedFilters" @apply="onApplyFilters"
      @reset="onResetFilters" @close="isFilterDialogOpen = false" />

    <div :class="['gts-data-table-actions']">
      <div class="gts-data-table-action gts-data-table-action-columns" @click="toggleColumnsMenu($event)">
        <ColumnsIcon /> <span>COLUMNS</span>
      </div>
      <div class="gts-data-table-action gts-data-table-action-export" @click="exportToPDF">
        <ExportIcon /> <span>EXPORT</span>
      </div>
      <div v-if="showFilter" class="gts-data-table-action gts-data-table-action-filter"
        :class="{ 'gts-data-table-action-filter--active': activeFilterCount > 0 }" @click="openFilterDialog">
        <FilterIcon />
        <span>FILTER</span>
        <span v-if="activeFilterCount > 0" class="gts-filter-badge">{{ activeFilterCount }}</span>
      </div>
    </div>
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
  </div>

</template>

<script>
import ColumnsIcon from '@/assets/icons/ColumnsIcon.vue';
import ContextMenu from '../contextmenu/ContextMenu.vue';
import DataTablePagination from './DataTablePagination.vue';
import ExportIcon from '@/assets/icons/ExportIcon.vue';
import FilterIcon from '@/assets/icons/FilterIcon.vue';
import FilterDialog from './FilterDialog.vue';
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
    FilterDialog
  },

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

    showFilter: {
      type: Boolean,
      required: false,
      default: false
    },

    filterConfiguration: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    pagination() {
      return {
        pageLengthTitle: 'Row per page',
        totalRecords: this.filteredItems.length,
        pageLengths: this.paginationConfig?.pageLengths || defaultLengths
      }
    },

    filteredItems() {
      if (!this.showFilter || this.activeFilterCount === 0) {
        return this.items;
      }
      return this.applyFilters(this.items, this.appliedFilters);
    },

    activeFilterCount() {
      return Object.values(this.appliedFilters).filter(v => v !== '' && v !== null && v !== undefined).length;
    },

    splitedItems() {
      if (this.isPaginable) {

        const start = (this.currentPaginationPage - 1) * this.rowPerPage;

        const end = start + this.rowPerPage;

        return this.filteredItems.slice(start, end);
      }
      return this.filteredItems
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
      isFilterDialogOpen: false,
      appliedFilters: {},

    }
  },

  methods: {


    toggleMenu(headerTitle, event) {

      event.stopPropagation();

      const contextMenuComponent = this.$refs.contextMenu;
      contextMenuComponent.toggleMenu();

      this.$nextTick(() => {
        const contextMenuDOM = contextMenuComponent.$el;

        //👉 nodeType === 1 → c’est un vrai élément HTML.
        //👉 nodeType === 8 → c’est un commentaire (<!--v-if-->).

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

    },
    onNumberRowsPerPageChaned(nbrRows) {
      this.rowPerPage = nbrRows;
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

    // ─── Filter Methods ───────────────────────────────────────────────────────

    openFilterDialog() {
      this.isFilterDialogOpen = true;
    },

    onApplyFilters(filterValues) {
      this.appliedFilters = { ...filterValues };
      this.isFilterDialogOpen = false;
      // Reset to first page so filtered results start from page 1
      this.currentPaginationPage = 1;
    },
    onResetFilters() {
      this.appliedFilters = {};
      this.isFilterDialogOpen = false;
      this.currentPaginationPage = 1;
    },

    /**
     * Applies all active filters to the provided items array.
     * For each field with a non-empty filter value:
     *   - If a custom FilterConfiguration with a filter() function exists → use it as predicate.
     *   - Otherwise → case-insensitive partial string match on the field value.
     * Items must satisfy ALL active filters (AND logic).
     *
     * @param {Array} items - The source data array.
     * @param {Object} filters - Map of { fieldName: filterValue }.
     * @returns {Array} The filtered items.
     */
    applyFilters(items, filters) {
      console.log("filters => ", filters);

      const activeEntries = Object.entries(filters).filter(
        ([, value]) => value !== '' && value !== null && value !== undefined
      );

      if (activeEntries.length === 0) return items;

      return items.filter((item, index) => {
        return activeEntries.every(([field, filterValue]) => {
          // Check if this field has a custom configuration
          const config = this.filterConfiguration.find(c => c.field === field);

          // Disabled fields are never applied
          if (config && config.disable === true) return true;

          // Custom filter function takes precedence
          if (config && typeof config.filter === 'function') {
            return config.filter(item, index);
          }

          const fieldValue = item[field];
          if (fieldValue === null || fieldValue === undefined) return false;

          // If the field is a date field, parse both values using moment and compare
          if (config && config.isDate === true) {
            const dateFilter = moment(filterValue, ['YYYY-MM-DD', 'DD/MM/YYYY', 'DD-MM-YYYY']);
            const dateField = moment(fieldValue, ['DD/MM/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY']);
            if (dateFilter.isValid() && dateField.isValid()) {
              return dateFilter.isSame(dateField, 'day');
            }
          }

          // Default: case-insensitive partial match
          return String(fieldValue).toLowerCase().includes(String(filterValue).toLowerCase());
        });
      });
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

    .gts-data-table-action {
      display: flex;
      gap: 5px;
      padding: 5px;
      align-items: center;
      transition-duration: 0.2s;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: $primary-color-50;
      }
    }

    // Push the Filter button to the far right of the toolbar
    .gts-data-table-action-filter {
      margin-left: auto;
      position: relative;

      // Active state: highlight button when filters are applied
      &.gts-data-table-action-filter--active {
        background-color: $primary-color-50;
        color: $primary-color-500;

        svg path {
          fill: $primary-color-500;
        }
      }
    }

    // Badge showing number of active filters
    .gts-filter-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: $primary-color-500;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      line-height: 1;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      padding: 0 5px;
      margin-left: 2px;
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


td:last-child,
th:last-child {
  border-right: none; // Pour éviter la bordure à la fin de la ligne
}
</style>