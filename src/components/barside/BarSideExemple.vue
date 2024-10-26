<template>

     
    <BarSide :menus="menus" /> 
  
  </template>
  
  <script>
  
  import BarSide from '@/components/barside/BarSide.vue';
   
  export default {
  
    components: { 
       BarSide, 
      
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
  
        
      };
    }
  }
  
  </script>
  
  <style lang="scss"></style>