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
      :items="items" />


    <h4>Table with scroll</h4>
    <DataTable :isPaginable="true" :isScrollable="true" :paginationConfig="{ pageLengths: [3, 5, 10] }"
      :headers="tabelHeaders" :items="items" />


    <h4>Table with filtering (Client-side) </h4>
    <DataTable :showFilter="true" :isPaginable="true" :paginationConfig="{ pageLengths: [3, 5, 10] }"
      :headers="filterHeaders" :items="items" />

    <h4>Table with Server-Side Filtering (preventLocalFilter + @onFilter event)</h4>
    <p v-if="serverFilterPayload"><strong>Emitted Filter Payload (JSON):</strong>
      <code>{{ JSON.stringify(serverFilterPayload) }}</code>
    </p>
    <DataTable :showFilter="true" :preventLocalFilter="true" :headers="filterHeaders" :items="serverFilteredItems"
      @onFilter="handleServerFilter" />

    <h4>Table with Additional Filter Fields (not part of columns)</h4>
    <DataTable :showFilter="true" :headers="filterHeaders2" :items="items" :additionalFilters="extraFilters"
      @onFilter="handleAdditionalFilter" />

    <h4>Table with Custom Filter Input Positioning (2-column layout via #filter-content)</h4>
    <DataTable ref="customFilterTable" :showFilter="true" :headers="filterHeaders2" :items="items"
      :additionalFilters="extraFilters" @onFilter="handleCustomDialogFilter">
      <!-- Dialog is handled automatically by DataTable. Just position inputs with zero setup using FilterField -->
      <template #filter-content="{ FilterField }">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 10px 0;">
          <component :is="FilterField" name="companyCode" />
          <component :is="FilterField" name="companyName" />
          <component :is="FilterField" name="companyEmail" />
          <component :is="FilterField" name="companyDomain" />
          <component :is="FilterField" name="status" />
          <component :is="FilterField" name="country" />
        </div>
      </template>
    </DataTable>

    <h4>Table with custom paginationConfig and handle pagination event on pageChnage
      <p>pagination.pageLength : {{ customPagination.pageLength }}</p>
      <p>pagination.pageNumber : {{ customPagination.pageNumber }}</p>
      <p>pagination.totalPages : {{ customPagination.totalPages }}</p>
      <p>pagination.totalRecords : {{ customPagination.totalRecords }}</p>
      <p>pagination.pageLengths : {{ customPagination.pageLengths }}</p>
      <p>pagination.pageLengthTitle : {{ customPagination.pageLengthTitle }}</p>
    </h4>
    <DataTable :isPaginable="true" :preventPginationAutoSlice="true" :paginationConfig="customPagination"
      @changePage="onPaginationChange" @lengthPageChanged="onPageLengthChange" :headers="serverSideHeader"
      :items="serverPaginatedItems" />

  </div>

</template>

<script>


import DataTable from '@/components/table/DataTable.vue';
import ConfirmationDialog from '@/components/dialog/ConfirmationDialog.vue';
import TextInput from '@/components/input/TextInput.vue';
import { defineComponent, markRaw } from 'vue';
import { VIcon } from 'vuetify/lib/components/index.mjs';


export default {

  name: "DataTableExemple",

  components: {
    DataTable,
    ConfirmationDialog,
    TextInput,
  },

  data() {
    return {
      serverFilterPayload: null,
      serverFilteredItems: [
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
          companyPhone: "777",
          activationDate: "03/05/2024",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"
        },
      ],

      extraFilters: [
        {
          name: "status",
          title: "Status",
          filterLabel: "Company Status",
          filterPlaceholder: "e.g. Active, Pending...",
          // Custom client-side filter function if needed
          filter: (item, index, value) => {
            return !value || (item.status && item.status.toLowerCase().includes(value.toLowerCase()));
          }
        },
        {
          name: "country",
          title: "Country",
          filterLabel: "Country / Region",
          filterPlaceholder: "e.g. France, USA...",
        }
      ],
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

      /**
       * Headers for the filtering demo table.
       * Showcases all new filter-related header properties:
       *   - filter:          custom filter function
       *   - filterDisabled:  exclude column from filter dialog
       *   - isDate:          render a date picker input
       *   - filterLabel:     override input label in filter dialog
       *   - filterPlaceholder: input placeholder text
       */
      filterHeaders: [
        {
          title: "Code",
          name: "companyCode",
          sortable: true,
          // No filter config → default case-insensitive partial match
          filterPlaceholder: "Search by code…",
        },
        {
          title: "Name",
          name: "companyName",
          sortable: true,
          filterLabel: "Company Name",
          filterPlaceholder: "e.g. company 1",
        },
        {
          title: "Phone number",
          name: "companyPhone",
          // filterDisabled: true → no input generated for this column
          filterDisabled: true,
        },
        {
          title: "Activation Date",
          name: "activationDate",
          sortable: true,
          // isDate: true → renders a <input type="date"> in the filter dialog
          isDate: true,
          filterLabel: "Activated on",
        },
        {
          title: "Website",
          name: "website",
          sortable: true,
          // Custom filter function: exact match (case-insensitive)
          filter: (item, index, value) => {
            return String(item.website ?? '').toLowerCase().includes(value.toLowerCase());
          },
          filterPlaceholder: "e.g. company.com",
        },
        {
          title: "Disabled Field",
          name: "activationDate",
          sortable: true,
          filterDisabled: true
        },
      ],

      /**
       * Headers for the second filtering demo table.
       * Showcases: default text match on Name/Email/Domain,
       * a custom filter function on Email (exact domain match),
       * and filterDisabled on Phone.
       */
      filterHeaders2: [
        {
          title: "Name",
          name: "companyName",
          sortable: true,
          filterPlaceholder: "Search name…",
        },
        {
          title: "Email",
          name: "companyEmail",
          sortable: true,
          filterLabel: "Email address",
          filterPlaceholder: "e.g. company2@mail.com",
          // Custom filter: match by email prefix (before @)
          filter: (item, index, value) => {
            const email = String(item.companyEmail ?? '').toLowerCase();
            return email.includes(value.trim().toLowerCase());
          },
        },
        {
          title: "Domain",
          name: "companyDomain",
          sortable: true,
          filterPlaceholder: "Search domain…",
        },
        {
          title: "Phone",
          name: "companyPhone",
          // No filter for phone in this demo
          filterDisabled: true,
        },
        {
          title: "Activation Date",
          name: "activationDate",
          sortable: true,
          isDate: true,
          filterLabel: "Date d'activation",
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

      // Mock server database for server-side pagination demo

      serverPaginatedItems: [],
      serverSideHeader: [
        {
          title: "id",
          name: "id",
        },
        {
          title: "name",
          name: "name",
        }
      ],
      customPagination: {

        pageNumber: 1,
        totalPages: 10,
        totalRecords: 1200,
        pageLengths: [3, 5, 10],
        pageLengthTitle: "Showing per page"
      }

    };
  },

  created() {
    this.fetchServerData(1);
  },

  methods: {
    fetchServerData(pageNumber) {

      var serverPageable;

      if (pageNumber == 1) {
        serverPageable = {
          "content": [
            {
              "id": 1,
              "name": "John Doe"
            },
            {
              "id": 2,
              "name": "Jane Doe"
            }
          ],
          "pageable": {
            "pageNumber": 1,
            "pageSize": 20,
            "sort": {
              "empty": false,
              "sorted": true,
              "unsorted": false
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
          },
          "totalPages": 5,
          "totalElements": 100,
          "last": false,
          "size": 20,
          "number": 0,
          "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
          },
          "numberOfElements": 2,
          "first": true,
          "empty": false
        }
      }

      if (pageNumber == 2) {
        serverPageable = {
          "content": [
            {
              "id": 3,
              "name": "Mouuh Doe"
            },
            {
              "id": 24,
              "name": "Halim doe"
            }
          ],
          "pageable": {
            "pageNumber": 2,
            "pageSize": 20,
            "sort": {
              "empty": false,
              "sorted": true,
              "unsorted": false
            },
            "offset": 0,
            "paged": true,
            "unpaged": false
          },
          "totalPages": 5,
          "totalElements": 100,
          "last": false,
          "size": 20,
          "number": 0,
          "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
          },
          "numberOfElements": 2,
          "first": true,
          "empty": false
        }
      }

      // Slice the simulated server database to return only the requested page items
      this.serverPaginatedItems = serverPageable.content;
    },

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

    handleServerFilter(payload) {
      console.log("Server filter payload received:", payload);
      this.serverFilterPayload = payload;

      // Simulate server-side filtering
      this.serverFilteredItems = this.items.filter(item => {
        if (payload.companyCode && !String(item.companyCode).toLowerCase().includes(payload.companyCode.toLowerCase())) {
          return false;
        }
        if (payload.companyName && !String(item.companyName).toLowerCase().includes(payload.companyName.toLowerCase())) {
          return false;
        }
        if (payload.website && !String(item.website).toLowerCase().includes(payload.website.toLowerCase())) {
          return false;
        }
        return true;
      });
    },

    handleAdditionalFilter(payload) {
      console.log("Filter with additional fields received:", payload);
    },

    handleCustomDialogFilter(payload) {
      console.log("Custom dialog filter received:", payload);
    },

    onPaginationChange(pageNumber) {

      this.fetchServerData(pageNumber, pageNumber);
    },

    onPageLengthChange(newLength) {

      this.fetchServerData(1, newLength);
    }
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