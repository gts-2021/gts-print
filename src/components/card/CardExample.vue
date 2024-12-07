<template>

  <div id="exemple-container">

    <CardComponent :actions="actions1">
      <div class="card-content">
        <h1>Component menu without icons</h1>
        <h4>Title inside card</h4>
      </div>
    </CardComponent>

    <br> <br>
    <CardComponent :actions="actions2">
      <div class="card-content">
        <h1>Component menu without icons</h1>
        <h4>Title inside card</h4>
      </div>
    </CardComponent>

    <br> <br>
    
    <CardComponent >
      <div class="card-content">
        <h1>Card without menu</h1>
        <h4>Title inside card</h4>
      </div>
    </CardComponent>



  </div>

</template>

<script>
import { defineComponent, markRaw } from 'vue';
import CardComponent from './CardComponent.vue';



export default {

  name: "CardExemple",

  components: {
    CardComponent
  },

  data() {
    return {

      actions1: [
        {
          title: "View",
        },
        {
          title: "Edit",
          onClick: () => {
            alert("Edit clicked")
          }
        },
        {
          title: "Edit",
        },
         
      ],

      actions2: [
         
        {
          title: "Edit",
          icon: markRaw(defineComponent({
            template: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C20.8027 6.94749 20.8762 6.8376 20.9264 6.71662C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8762 5.8324 20.8027 5.72251 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="#002A34"/>
</svg>

        `
          })),
        },
        {
          title: "Delete",
          onClick: () => {
            console.log("Menu item clicked : Delete");
            
          },
          icon: markRaw(defineComponent({
            template: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C20.8027 6.94749 20.8762 6.8376 20.9264 6.71662C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8762 5.8324 20.8027 5.72251 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="#002A34"/>
</svg>

        `
          })),
        },
      ],

	


    };
  },

}

</script>

<style lang="scss">
.card-content{
  padding: 40px;
}
</style>