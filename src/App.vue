<template>


  <!-- <BarSide :menus="menus" /> -->

  <!-- <DataTable :headers="tabelHeaders" :items="tabelContent" />  -->
   <CheckBoxExemple />
  <RadioExemple />
  <DialogExample />
  <InputExemple />
  <BarSideExemple />

  <ButtonExample />

</template>

<script>

import BarSideExemple from './components/barside/BarSideExemple.vue';
import InputExemple from './components/input/InputExemple.vue';
import ButtonExample from './components/button/ButtonExample.vue';

//import BarSide from '@/components/barside/BarSide.vue';
//import DataTable from '@/components/table/DataTable.vue';
import { defineComponent } from 'vue';
import { VIcon } from 'vuetify/lib/components/index.mjs';
import DialogExample from './components/dialog/DialogExample.vue';
import RadioExemple from './components/radio/RadioExemple.vue';
import CheckBoxExemple from './components/checkbox/CheckBoxExemple.vue';

export default {

  components: {
    BarSideExemple,
    InputExemple,
    //DataTable,
    //BarSide,
    ButtonExample,
    DialogExample,
    RadioExemple,
    CheckBoxExemple


  },

  data() {
    return {

      menus: [
        [
          {
            title: "Dashboard",
            icon: "mdi mdi-finance"
          },
          {
            title: "Companies",
            icon: "mdi mdi-bag-personal-outline"
          },
          {
            title: "Statistics",
            icon: "mdi mdi-finance"
          },

        ],
        [
          {
            title: "Settings",
            icon: "mdi mdi-cog-outline"
          },
          {
            title: "LogOut",
            icon: "mdi mdi-logout"
          },

        ]
      ],

      tabelHeaders: [

        {
          title: "Code",
          name: "companyCode",
          sortable: true,

        },
        {
          title: "Name",
          name: "companyName",
          sortable: true,
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
            defineComponent({
              props: {
                item: {},
              },
              template: `<a href="item.facebook" target="_blank">{{item.facebook}}</a>`,
            })

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

            defineComponent({
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


            })

        },
      ],

      tabelContent: [

        {
          companyCode: "123456",
          companyName: "company 1",
          companyEmail: "company1@mail.com",
          companyDomain: "domaine 1 ",
          companyAddress: "address 1",
          companyPhone: "0758221610",
          activationDate: "23/10/2024",
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
          activationDate: "23/10/2024",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"
        },

        {
          companyCode: "123456",
          companyName: "company 3",
          companyEmail: "company3@mail.com",
          companyDomain: "domaine 3 ",
          companyAddress: "address 3",
          companyPhone: "0758221610",
          activationDate: "23/10/2024",
          website: "company.com",
          facebook: "www.facebook.com",
          instagram: "instagram.com",
          linkedin: "linkedin.com"

        },

        {
          companyCode: "123456",
          companyName: "company 4",
          companyEmail: "company4@mail.com",
          companyDomain: "domaine 4 ",
          companyAddress: "address 4",
          companyPhone: "777", activationDate: "23/10/2024",
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

    formatter() {

      return defineComponent({
        components: {
          VIcon
        },
        template: '<span class="table-content-actions-icon update-icon">  <v-icon>mdi-pencil-outline</v-icon> test </span> '

      });
    },


  },

}

</script>

<style lang="scss"></style>
