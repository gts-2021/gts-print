<template>

  <div :class="cssClass.tableWrapperClass">

    <div :class="['gts-print-table-container', isScrollable ? 'gts-print-table-container-scrollable' : '']"
      ref="gtsPrintTableContainer">

      <table class="gts-print-table">

        <thead>
          <tr class="gts-print-table-header">
            <th class="gts-print-table-header-container" v-for="header in headers" :key="header">
              <div :class="[cssClass.tableHeadersClass, header.className]">
                <div v-if="isMenuVisible(header.name)" class="gts-print-table-header-menu">
                  <span class="gts-print-table-header-menu-item" @click="unsort(header.name)"> Unsort </span>
                  <span class="gts-print-table-header-menu-item" @click="sortAsc(header.name)"> Sort ASC </span>
                  <span class="gts-print-table-header-menu-item" @click="sortDesc(header.name)"> Sort DESC </span>
                  <span class="gts-print-table-header-menu-item" @click="hideColumn(header.name)"> Hide </span>
                </div>
                <span class="gts-print-table-header-title"> {{ header.title }} </span>
                <span v-if="header.sortable" class="gts-print-table-header-icon"
                  @click="toggleMenu(header.name)"><v-icon>{{ "mdi-dots-vertical" }}</v-icon></span>
              </div>
            </th>

          </tr>
        </thead>

        <tbody>

          <tr class="gts-print-table-content" v-for="(item, index) in splitedItems" :key="item">
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
import DataTablePagination from './DataTablePagination.vue';

const defaultLengths = [10, 20, 60, 100];

export default {

  name: "DataTable",

  emits: ['unsort', 'sort-asc', 'sort-desc', 'hide-column'],

  components: {
    DataTablePagination
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
    }
  },


  
  data() {
    return {

      visibleMenus: {},
      currentPaginationPage: 1,
      rowPerPage: this.paginationConfig?.pageLengths[0] || defaultLengths[0],

    }
  },

  methods: {

    toggleMenu(fieldName) {
      if (this.visibleMenus[fieldName]) {
        this.visibleMenus = {};
      } else {
        this.visibleMenus = {};
        this.visibleMenus[fieldName] = true;
      }

    },

    isMenuVisible(fieldName) {
      return this.visibleMenus[fieldName] || false;
    },

    unsort(fieldName) {
      this.visibleMenus = {};
      this.$emit('unsort', fieldName);
    },

    sortAsc(fieldName) {
      this.visibleMenus = {};
      this.$emit('sort-asc', fieldName);
    },

    sortDesc(fieldName) {
      this.visibleMenus = {};
      this.$emit('sort-desc', fieldName);
    },

    hideColumn(fieldName) {
      this.visibleMenus = {};
      this.$emit('hide-column', fieldName);
    },
    onPaginationChange(currentPage) {
      this.currentPaginationPage = currentPage;

    },
    onNumberRowsPerPageChaned(nbrRows) {
      this.rowPerPage = nbrRows;

    }

  }

}
</script>

<style lang="scss">
.gts-print-table-wrapper {
  position: relative;
  width: 100%;

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