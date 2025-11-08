<template>

  <div id="container-table-example">

    <h4>Table without pagination</h4>
    <DataTable :headers="tabelHeaders2" :items="items" @unsort="unsort" @sort-asc="sortAsc" @sort-desc="sortDesc"
      @hide-column="hideColumn" />

    <h4>Table with default pagination</h4>
    <DataTable :isPaginable="true" :headers="tabelHeaders2" :items="items" @unsort="unsort" @sort-asc="sortAsc"
      @sort-desc="sortDesc" @hide-column="hideColumn" />



    <h4>Table with customize pagination</h4>
    <DataTable :isPaginable="true" :paginationConfig="{ pageLengths: [3, 5, 10] }" :headers="tabelHeaders2"
      :items="items" @unsort="unsort" @sort-asc="sortAsc" @sort-desc="sortDesc" @hide-column="hideColumn" />


    <h4>Table with scroll</h4>
    <DataTable :isPaginable="true"  :isScrollable="true" :paginationConfig="{ pageLengths: [3, 5, 10] }" :headers="tabelHeaders"
      :items="items" @unsort="unsort" @sort-asc="sortAsc" @sort-desc="sortDesc" @hide-column="hideColumn" />


  </div>

</template>

<script>


//import BarSide from '@/components/barside/BarSide.vue';
import DataTable from '@/components/table/DataTable.vue';
import { defineComponent, markRaw } from 'vue';
import { VIcon } from 'vuetify/lib/components/index.mjs';


export default {

  name: "DataTableExemple",

  components: {
    DataTable
  },

  data() {
    return {
      tabelHeaders: [

        {
          title: "Code",
          name: "companyCode",
          sortable: true,
          className: 'col-test'

        },
        {
          title: "Name",
          name: "companyName",
          sortable: true,
          className: 'col-test2',
          textFormatter: (item, index) => {
            return index + " - " + item.companyName
          }

        },
        {
          title: "Email",
          name: "companyEmail",
          sortable: true,
          textFormatter: (item, index) => {
            return index + " - " + item.companyEmail
          }

        },
        {
          title: "Domain",
          name: "companyDomain",
          sortable: true,

        },
        {
          title: "Address",
          name: "companyAddress",
          sortable: true,

        },
        {
          title: "Phone number",
          name: "companyPhone",

        },
        {
          title: "Activation Date",
          name: "activationDate",
          sortable: true,

        },
        {
          title: "Website",
          name: "website",
          sortable: true,

        },
        {
          title: "Facebook",
          name: "facebook",
          sortable: true,

          componentFormatter:
            markRaw(defineComponent({
              props: {
                item: {},
              },
              template: `<a href="item.facebook" target="_blank">{{item.facebook}}</a>`,
            }))

        },
        {
          title: "Instagram",
          name: "instagram",
          sortable: true,

        },
        {
          title: "LinkedIn",
          name: "linkedin",
          sortable: true,

        },
        {
          title: "Actions",
          name: "actions",
          sortable: false,

          componentFormatter:

            markRaw(defineComponent({
              components: {
                VIcon
              },

              props: {
                index: {},
                item: {},
              },

              template: ` 
								 <span class="gts-print-table-content-actions-icon update-icon" @click=updateItem(item)>  <v-icon>mdi-pencil-outline</v-icon> </span> 
								 <span class="gts-print-table-content-actions-icon remove-icon" @click=deleteItem(item)>  <v-icon>mdi-delete-outline</v-icon> </span>`,

              methods: {
                updateItem(item) {
                  console.log("updateItem ", item);
                },

                deleteItem(item) {
                  console.log("deleteItem ", item);
                },
              }


            }))

        },
      ],

       tabelHeaders2: [

        {
          title: "Code",
          name: "companyCode",
          sortable: true,
         

        },
        
         
        {
          title: "Phone number",
          name: "companyPhone",

        },
        {
          title: "Activation Date",
          name: "activationDate",
          sortable: true,

        },
        {
          title: "Website",
          name: "website",
          sortable: true,

        },
        
        
      ],

      items: [

        {
          companyCode: "65892",
          companyName: "company 1",
          companyEmail: "company1@mail.com",
          companyDomain: "domaine 1 ",
          companyAddress: "address 1",
          companyPhone: "0758221610",
          activationDate: "23/05/2024",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"
        },

        {
          companyCode: "123456",
          companyName: "company 2",
          companyEmail: "company2@mail.com",
          companyDomain: "domaine 2 ",
          companyAddress: "address 2",
          companyPhone: "777",
          activationDate: "10/10/2024",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"
        },

        {
          companyCode: "4489",
          companyName: "company 3",
          companyEmail: "company3@mail.com",
          companyDomain: "domaine 3 ",
          companyAddress: "address 3",
          companyPhone: "0758221610",
          activationDate: "23/10/2026",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"

        },

        {
          companyCode: "100256",
          companyName: "company 4",
          companyEmail: "company4@mail.com",
          companyDomain: "domaine 4 ",
          companyAddress: "address 4",
          companyPhone: "777", activationDate: "03/05/2024",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"
        },

      ],

    };
  },
  methods: {
    updateItem() {
      console.log("updateItem");
    },
    deleteItem(item) {
      console.log("deleteItem", item);
    },

    unsort(fieldName) {
      console.log(fieldName)
    },

    sortAsc(fieldName) {
      console.log(fieldName)
    },

    sortDesc(fieldName) {
      console.log(fieldName)
    },

    hideColumn(fieldName) {
      console.log(fieldName)
    },

  }

}

</script>

<style lang="scss">
#container-table-example {
  padding: 20px;
  display: flex;
  flex-direction: column;

  .gts-button-container {
    margin-bottom: 10px;
  }

  .gts-print-table-wrapper {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .col-test {
    background-color: rgb(3, 87, 47);

    width: 600px;

    .gts-print-table-header-title {
      color: white;
    }
  }

  .col-test2 {
    width: 500px;
  }
}
</style>