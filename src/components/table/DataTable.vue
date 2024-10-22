<template>
  <div class="table-wrapper">

    <div class="table-container" ref="tableContainer">
  
      <table class="table">

        <thead>
          <tr class="table-header">
            <th class="table-header-container" v-for="header in headers" :key="header">
              <div class="table-header-data"> 
                <div v-if="isMenuVisible(header.name)" class="table-header-menu">
                  <span class="table-header-menu-item" @click="unsort(header.name)"> Unsort </span>
                  <span class="table-header-menu-item" @click="sortAsc(header.name)"> Sort ASC </span>
                  <span class="table-header-menu-item" @click="sortDesc(header.name)"> Sort DESC </span>
                  <span class="table-header-menu-item" @click="hideColumn(header.name)"> Hide </span>
                </div>
                <span class="table-header-title"> {{header.title}} </span> 
                <span v-if="header.sortable" class="table-header-icon"  @click="toggleMenu(header.name)"><v-icon>{{ "mdi-dots-vertical" }}</v-icon></span> 
              </div>
            </th>

            <!-- display actions  -->
            <th v-if="displayActions" class="table-header-container">
              <div class="table-header-data">
                <span class="table-header-title">Actions </span> 
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr class="table-content" v-for="item in items" :key="item">
            <td class="table-content-data" v-for="header in headers" :key="header.name">{{ item[header.name] }}</td> 
            <td v-if="displayActions" class="table-content-data"> 
              <span class="table-content-actions-icon update-icon"  @click="updateItem(item)"><v-icon>{{ "mdi-pencil-outline" }}</v-icon></span> 
              <span class="table-content-actions-icon remove-icon"  @click="deleteItem(item)"><v-icon>{{ "mdi-delete-outline" }}</v-icon></span> 
            </td> 
          </tr>
        </tbody>

      </table>

    </div>

    <div class="scrollbar-container" ref="scrollbarContainer">
      <div class="scrollbar-content"></div>
    </div>

  </div>
</template>

<script>

export default {

  name: "DataTable",

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
      default: true
    }
  },

  mounted() {

    const tableContainer = this.$refs.tableContainer;
    const scrollbarContainer = this.$refs.scrollbarContainer;

    scrollbarContainer.addEventListener('scroll', () => {
      tableContainer.scrollLeft = scrollbarContainer.scrollLeft;
    });

    tableContainer.addEventListener('scroll', () => {
      scrollbarContainer.scrollLeft = tableContainer.scrollLeft;
    });

    // Ajuster la largeur de la fausse barre de défilement en fonction du contenu réel du tableau
    this.$nextTick(() => {
      const tableWidth = tableContainer.scrollWidth;
      scrollbarContainer.querySelector(".scrollbar-content").style.width = `${tableWidth}px`;
    });

  },

  data () {
    return {
      data : undefined,
      visibleMenus:{},
    }
  },

  methods : {

    toggleMenu(fieldName) {
      this.visibleMenus[fieldName] = !this.visibleMenus[fieldName];
    },
    
    isMenuVisible(fieldName) {
      return this.visibleMenus[fieldName] || false;
    },
    
    unsort(fieldName) {
      console.log("Unsort", fieldName);
    },

    sortAsc(fieldName) {
      console.log("Sort ASC", fieldName);
    },

    sortDesc(fieldName) {
      console.log("Sort DESC", fieldName);
    },

    hideColumn(fieldName) {
      console.log("Hide column", fieldName);
    },

    updateItem(item){
      console.log("updateItem ", item);
    },

    deleteItem(item){
      console.log("deleteItem ", item);
    },

    
  }

}
</script>

<style lang="scss">

.table-wrapper {
  position: relative;
  width: 1100px;
  margin: 50px auto 10px;

  .table-container {

    height: 684px;
    width: 1100px;
    margin: 50px auto 10px;  // to be removed
    border-radius: 12px;
    border: 1px solid $neutral-color-100;
    overflow-x: hidden;
    overflow-y: hidden;

  
    .table{
      border-collapse: collapse;
      white-space: nowrap;
      
      .table-header{
      
        .table-header-container{
      
          width: 184px;
          height: 44px !important;
          
          .table-header-data{
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 24px;
            width: 184px;
            border-right: 1px solid $neutral-color-100;
            border-bottom: 1px solid $neutral-color-100;
            background: $primary-color-50;

            .table-header-menu{
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

              .table-header-menu-item{
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
              .table-header-menu-item:hover{
                background: $primary-color500;
                color: $color-white;
                transition:  background-color 0.5s ease-out;
              }
            }
          }

          .table-header-title{
            font-size: 16px;
            line-height: 24px;
            color:$primary-color400;
            text-wrap: nowrap;
          }

          .table-header-icon{
            height: 24px;
            width: 24px;
            cursor: pointer;
          }
        }

      }

      .table-content{

        .table-content-data{
          padding: 12px 24px;
          width: 184px;
          height: 64px;
          font-size: 14px;
          text-align: center;
          border-bottom: 1px dashed $neutral-color-100;
          color:$primary-color700;

          .table-content-actions-icon{
            margin: 0px 5px;
            cursor: pointer;
          }
          .table-content-actions-icon.update-icon{
            color: $primary-color700;
          }
          .table-content-actions-icon.remove-icon{
            color: $accent-dark-red-color;
          }
        
        }

        &:nth-child(even) {
          .table-content-data {
            background-color: #DEE8EA6B;
          }
        }

      }
    }

  }

  // design scroller
  .scrollbar-container {
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
    
    .scrollbar-content {
      height: 1px;
      width: 100%;
    }
  }

}

  
td:last-child, th:last-child {
  border-right: none; // Pour éviter la bordure à la fin de la ligne
}
</style>