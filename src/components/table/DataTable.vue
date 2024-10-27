<template>
  <div :class="cssClass.tableWrapperClass">

    <div class="gts-print-table-container" ref="gtsPrintTableContainer">
  
      <table class="gts-print-table">

        <thead>
          <tr class="gts-print-table-header">
            <th class="gts-print-table-header-container" v-for="header in headers" :key="header">
              <div :class="cssClass.tableHeadersClass"> 
                <div v-if="isMenuVisible(header.name)" class="gts-print-table-header-menu">
                  <span class="gts-print-table-header-menu-item" @click="unsort(header.name)"> Unsort </span>
                  <span class="gts-print-table-header-menu-item" @click="sortAsc(header.name)"> Sort ASC </span>
                  <span class="gts-print-table-header-menu-item" @click="sortDesc(header.name)"> Sort DESC </span>
                  <span class="gts-print-table-header-menu-item" @click="hideColumn(header.name)"> Hide </span>
                </div>
                <span class="gts-print-table-header-title"> {{header.title}} </span> 
                <span v-if="header.sortable" class="gts-print-table-header-icon"  @click="toggleMenu(header.name)"><v-icon>{{ "mdi-dots-vertical" }}</v-icon></span> 
              </div>
            </th>

          </tr>
        </thead>

        <tbody>
          <tr class="gts-print-table-content" v-for="(item, index) in items" :key="item">
            <td class="gts-print-table-content-data" v-for="(header) in headers" :key="header.name">

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

    <div class="gts-print-table-scrollbar-container" ref="gtsPrintScrollbarContainer">
      <div class="gts-print-scrollbar-content"></div>
    </div>

    <DataTablePagination :paginationConfig="paginationConfig"/>
  </div>


</template>

<script>
import DataTablePagination from './DataTablePagination.vue';

export default {

  name: "DataTable",

  components : {
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
      default(){
				return true;
			}
    },

    cssClass: {
      type: Object,
      required: false,
      default(){
				return {
          tableWrapperClass:"gts-print-table-wrapper",
          tableHeadersClass:"gts-print-table-header-data",
        }
			}
    }
  },

  mounted() {
    console.log("headers", this.headers);
    
    const tableContainer = this.$refs.gtsPrintTableContainer;
    const scrollbarContainer = this.$refs.gtsPrintScrollbarContainer;

    scrollbarContainer.addEventListener('scroll', () => {
      tableContainer.scrollLeft = scrollbarContainer.scrollLeft;
    });

    tableContainer.addEventListener('scroll', () => {
      scrollbarContainer.scrollLeft = tableContainer.scrollLeft;
    });

    // Ajuster la largeur de la fausse barre de défilement en fonction du contenu réel du tableau
    this.$nextTick(() => {
      const tableWidth = tableContainer.scrollWidth;
      scrollbarContainer.querySelector(".gts-print-scrollbar-content").style.width = `${tableWidth}px`;
    });

  },

  data () {
    return {
      visibleMenus:{},
      paginationConfig:{
        pageLengthTitle: "Row per page",
        totalRecordsTitle: "of",
        pageStart: 1,
        totalRecords: 50,
        pageLength :[10, 20, 25, 50, 100]
      },
    }
  },

  methods : {

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
      console.log("Unsort", fieldName);
    },

    sortAsc(fieldName) {
      this.visibleMenus = {};
      console.log("Sort ASC", fieldName);
    },

    sortDesc(fieldName) {
      this.visibleMenus = {};
      console.log("Sort DESC", fieldName);
    },

    hideColumn(fieldName) {
      this.visibleMenus = {};
      console.log("Hide column", fieldName);
    },

    
  }

}
</script>

<style lang="scss">

.gts-print-table-wrapper {
  position: relative;
  width: 1100px;
  margin: 50px auto;

  .gts-print-table-container {
    margin: 50px auto 10px;  // to be removed
    border-radius: 12px;
    border: 1px solid $neutral-color-100;
    overflow-x: hidden;
    overflow-y: hidden;

  
    .gts-print-table{
      border-collapse: collapse;
      white-space: nowrap;
      
      .gts-print-table-header{
      
        .gts-print-table-header-container{
          
          .gts-print-table-header-data{
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 24px;
            border-right: 1px solid $neutral-color-100;
            border-bottom: 1px solid $neutral-color-100;
            background: $primary-color-50;

            .gts-print-table-header-menu{
              position: absolute;
              top: 60px;
              right: 10px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 158px;
              height: 226px;
              border-radius: 8px;
              border: 1px solid $primary-color400;
              background-color: $color-white;

              .gts-print-table-header-menu-item{
                padding: 12px 8px;
                width: 150px;
                height: 48px;
                font-weight: 500;
                font-size: 16px;
                text-align: left;
                line-height: 24px;
                color: $primary-color500;
                border-radius: 4px;
                cursor: pointer;
              }
              .gts-print-table-header-menu-item:hover{
                background: $primary-color500;
                color: $color-white;
                transition:  background-color 0.5s ease-out;
              }
            }
          }

          .gts-print-table-header-title{
            font-size: 16px;
            line-height: 24px;
            color:$primary-color400;
            text-wrap: nowrap;
          }

          .gts-print-table-header-icon{
            height: 24px;
            width: 24px;
            cursor: pointer;
          }
        }

      }

      .gts-print-table-content{

        .gts-print-table-content-data{
          padding: 12px 24px;
          width: 184px;
          height: 64px;
          font-size: 14px;
          text-align: center;
          border-bottom: 1px dashed $neutral-color-100;
          color:$primary-color700;

          .gts-print-table-content-actions-icon{
            margin: 0px 5px;
            cursor: pointer;
          }
          .gts-print-table-content-actions-icon.update-icon{
            color: $primary-color700;
          }
          .gts-print-table-content-actions-icon.remove-icon{
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

  // design scroller
  .gts-print-table-scrollbar-container {
    width: 100%;
    height: 12px;
    border-radius: 50px;
    overflow-x: auto;
    overflow-y: hidden;
    background: $primary-color-50;

    &::-webkit-scrollbar {
      height: 20px; // Hauteur de la scrollbar
    }

    &::-webkit-scrollbar-track {
      background: $primary-color-50; // Couleur de la piste de la scrollbar
    }

    &::-webkit-scrollbar-thumb {
      background-color: $primary-color500; // Couleur du curseur
      border-radius: 10px; // Arrondir le curseur
      border: 2px solid $primary-color500; // Bordure autour du curseur
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: $primary-color500; // Couleur du curseur au survol
    }

    &::-webkit-scrollbar-button {
      display: none; // Masquer les boutons de défilement
    }

    // Pour Firefox
    scrollbar-color: $primary-color500 $primary-color-50; // Couleur du curseur et de la piste
    
    .gts-print-scrollbar-content {
      height: 1px;
      width: 100%;
    }
  }

}

  
td:last-child, th:last-child {
  border-right: none; // Pour éviter la bordure à la fin de la ligne
}
</style>