<template>

  <div id="container" >

    <!-- no content with button -->
    <NoContent description="No content page">
      <template #icon>
        <NoContentIcon />
      </template>
      
      <template #buttons>
        <ButtonComponent title="add" :icon="addIcon" @click="clickButton" />
      </template>
    </NoContent>

     <!-- noy found without button -->
     <NoContent description="Page non trouvée">
      <template #icon>
        <NotFoundIcon />
      </template>

    </NoContent>

  </div>

</template>

<script>

import NoContentIcon from '@/assets/icons/NoContentIcon.vue';
import NotFoundIcon from '@/assets/icons/NotFoundIcon.vue';
import NoContent from './NoContent.vue';
import AddIcon from '@/assets/icons/AddIcon.vue';
import { defineComponent, markRaw } from 'vue';
import ButtonComponent from '../button/ButtonComponent.vue';

export default {

  name:"NoContentExample",

  components: {
    NoContent,
    NoContentIcon,
    NotFoundIcon,
    ButtonComponent
    
  },

  
  data() {
		return {
			addIcon: {
				isExternalIcon: true,
				svg: markRaw(defineComponent({ components: { AddIcon }, template: `<AddIcon />` })),
				position: "left"
			},
    }
  },

  methods: {
    clickButton(){
      console.log("button clicked !");
    }
      
  }

}

</script>

<style lang="scss">

#container {
  padding: 20px;
  display: flex;
  .gts-button-container {
    margin-bottom: 10px;
  }
}
 
</style>