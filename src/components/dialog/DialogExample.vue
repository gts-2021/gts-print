<template>

  <div id="container" >

    <ButtonComponent @buttonClicked="() => this.dialog1 = true" title="Open dialog" />
   <BasicDialog @onClosedDialog="() => this.dialog1 = false" :isOpen="dialog1" title="Did you know ?"></BasicDialog>

   <ButtonComponent @buttonClicked="() => this.dialog2 = true" title="Open dialog with content" />
   <BasicDialog @onClosedDialog="() => this.dialog2 = false" :isOpen="dialog2" title="Dialog with content">
    <h4>Welcome Guys </h4>
    <p> Introduction
      The ButtonComponent is a customizable button that supports various themes, icons, and title text. This component includes flexible options for icon position (left or right) and allows for handling button clicks through an emitted event. It’s designed to integrate seamlessly with different styles and themes for primary, secondary, and danger buttons.</p>
   </BasicDialog>

   <ButtonComponent @buttonClicked="() => this.dialog3 = true" title="Open Confirm dialog" />
   <ConfirmationDialog @onFirstBtnClicked="() => console.log('First Clicked !')"  @onLastBtnClicked="() => console.log('Last Clicked !')" titleColor="red" titleLastBtn="Delete" themeLastBtn="gts-button-danger" titleFirstBtn="Cancel" themeFirstBtn="gts-button-danger-inverse" @onClosedDialog="() => this.dialog3 = false" :isOpen="dialog3" title="Dialog with content">
  are you sure ?   
  </ConfirmationDialog>

  
    
  </div>

</template>

<script>
import ButtonComponent from '../button/ButtonComponent.vue';
import ConfirmationDialog from './ConfirmationDialog.vue';
import BasicDialog from './BasicDialog.vue';


export default {

  name:"DialogExample",

  components: {
    BasicDialog,
    ButtonComponent,
    ConfirmationDialog
  },

  data() {
		return {
      dialog1 : false,
      dialog2 : false,
      dialog3 : false,
     };
	},
  methods: {
      
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