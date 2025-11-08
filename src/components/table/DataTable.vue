<template>

  <div :class="cssClass.tableWrapperClass">
    <ContextMenu   :ref="`contextMenu`" className="gts-table-actions-menu"
      :actions="contextMenuActions" />

    <div :class="['gts-print-table-container', isScrollable ? 'gts-print-table-container-scrollable' : '']"
      ref="gtsPrintTableContainer">

      <table class="gts-print-table">

        <thead>
          <tr class="gts-print-table-header">


            <th class="gts-print-table-header-container" v-for="(header, index) in headers" :key="header">
              <div :class="[cssClass.tableHeadersClass, header.className]">

                <span class="gts-print-table-header-title"> {{ header.title }} </span>
                <span v-if="header.sortable" class="gts-print-table-header-icon"
                  @click="toggleMenu(header.name, $event)"><v-icon>{{ "mdi-dots-vertical" }}</v-icon></span>
              </div>
            </th>

          </tr>
        </thead>

        <tbody>

          <tr class="gts-print-table-content" v-for="(item, index) in dataToDisplay" :key="item">
            <td :class="['gts-print-table-content-data', header.className]" v-for="(header) in headers"
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
import ContextMenu from '../contextmenu/ContextMenu.vue';
import DataTablePagination from './DataTablePagination.vue';

const defaultLengths = [10, 20, 60, 100];

export default {

  name: "DataTable",

  emits: ['unsort', 'sort-asc', 'sort-desc', 'hide-column'],

  components: {
    DataTablePagination,
    ContextMenu
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

    cssClass: {
      type: Object,
      required: false,
      default() {
        return {
          tableWrapperClass: "gts-print-table-wrapper",
          tableHeadersClass: "gts-print-table-header-data",
        }
      }
    },
    isPaginable: {
      type: Boolean,
      required: true,
      default: false,
    },
    isScrollable: {
      type: Boolean,
      required: true,
      default: false,
    },
    paginationConfig: {
      type: Object,
      required: true,
    },
  },

  computed: {
    pagination() {
      return {
        pageLengthTitle: 'Row per page',
        totalRecords: this.items.length,
        pageLengths: this.paginationConfig?.pageLengths || defaultLengths
      }
    },

    splitedItems() {
      if (this.isPaginable) {

        const start = (this.currentPaginationPage - 1) * this.rowPerPage;

        const end = start + this.rowPerPage;

        return this.items.slice(start, end);
      }
      return this.items
    },
    dataToDisplay() {
      if (this.sortBy) {
        return this.sortItems()
      }
      return this.splitedItems;
    },
  },



  data() {
    return {

      contextMenuActions: undefined,
      currentPaginationPage: 1,
      rowPerPage: this.paginationConfig?.pageLengths[0] || defaultLengths[0],
      sortBy: undefined,
      sortType: "asc",

    }
  },

  methods: {


    toggleMenu(headerTitle, event) {

    	event.stopPropagation();
      

      this.setUpSortingMenu(headerTitle);

      const contextMenuComponent = this.$refs.contextMenu;
      contextMenuComponent.toggleMenu();

      this.$nextTick(() => {
        const contextMenuDOM = contextMenuComponent.$el;
        const { clientX, clientY } = event;

        contextMenuDOM.style.left = `${clientX - 200}px`;
        contextMenuDOM.style.display = 'block';
      });
    },

     
    
    onPaginationChange(currentPage) {
      this.currentPaginationPage = currentPage;

    },
    onNumberRowsPerPageChaned(nbrRows) {
      this.rowPerPage = nbrRows;

    },
    sortItems() {
      const header = this.headers?.[this.sortBy];
      const sortFn =
        typeof header?.compare === 'function'
          ? header.compare
          : (a, b) => {
            const valA = a?.[this.sortBy];
            const valB = b?.[this.sortBy];
            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
          };

      
      const sorted = [...this.splitedItems].sort(sortFn);

      
      return this.sortType === 'desc' ? sorted.reverse() : sorted;
    },

    setUpSortingMenu(headerTitle) {

      this.sortBy = headerTitle;
      this.contextMenuActions = [
        {
          title: 'Sort Asc',
          onClick: () => {
            this.sortType = 'asc';
          }
        }, {
          title: 'Sort Desc',
          onClick: () => {
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

          }
        },

      ]

    },



  }

}
</script>

<style lang="scss">
.gts-print-table-wrapper {
  position: relative;
  width: 100%;

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