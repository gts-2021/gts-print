<template>

  <!-- 
  <BarSide :menus="menus" />-->

  <DataTable :headers="tabelHeaders" :items="tabelContent"/>

</template>

<script>

//import BarSide from '@/components/barside/BarSide.vue';
import DataTable from '@/components/table/DataTable.vue';

export default {

  components: { 
    //BarSide, 
    DataTable 
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
     
        },
        {
          title: "Email",
          name: "companyEmail",
          sortable: true,
     
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
        }
      ],

      tabelContent: [
        
      
        {
          companyCode: "123456",
          companyName: "company 1",
          companyEmail: "company1@mail.com",
          companyDomain :"domaine 1 ",
          companyAddress :"address 1",
          companyPhone : "0758221610",
          activationDate : "23/10/2024", 
          website : "company.com", 
          facebook : "facebook.com", 
          instagram: "instagram.com", 
          linkedin: "linkedin.com"
        },

        {
          companyCode: "123456",
          companyName: "company 2",
          companyEmail: "company2@mail.com",
          companyDomain :"domaine 2 ",
          companyAddress :"address 2",
          companyPhone : "777",
          activationDate : "23/10/2024", 
          website : "company.com", 
          facebook : "facebook.com", 
          instagram: "instagram.com", 
          linkedin: "linkedin.com"
        },

        {
          companyCode: "123456",
          companyName: "company 3",
          companyEmail: "company3@mail.com",
          companyDomain :"domaine 3 ",
          companyAddress :"address 3",
          companyPhone : "0758221610",
          activationDate : "23/10/2024", 
          website : "company.com", 
          facebook : "facebook.com", 
          instagram: "instagram.com", 
          linkedin: "linkedin.com"
          
        },

        {
          companyCode: "123456",
          companyName: "company 4",
          companyEmail: "company4@mail.com",
          companyDomain :"domaine 4 ",
          companyAddress :"address 4",
          companyPhone : "777",activationDate : "23/10/2024", 
          website : "company.com", 
          facebook : "facebook.com", 
          instagram: "instagram.com", 
          linkedin: "linkedin.com"
        },

      ],

    };
  }
}

</script>

<style lang="scss"></style>
