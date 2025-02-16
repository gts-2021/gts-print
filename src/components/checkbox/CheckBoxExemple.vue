<template>

  <div id="container">

    <CheckBox @onToggle="(checked) => console.log(checked)" label="Toggle me please"/>

    <CheckBox :isChecked="true" label="Default checked"/>

    
    <CheckBox v-model:isChecked="checkboxBindedVal" label="Checkbox with value binded"/>

    <CheckBox  :isChecked="true" :noBind="true" label="Checkbox with no bind"/>

  </div>

</template>

<script>
import CheckBox from './CheckBox.vue';
 




export default {

  name: "CheckBoxExemple",

  components: {
    CheckBox
  },
  data(){
    return {
      checkboxBindedVal: true
    }
  },
  watch:{
    checkboxBindedVal(newVal){
      console.log(newVal);
      
    }
  }

}

</script>

<style lang="scss">
#container {
  padding: 20px;
  display: flex;
  flex-direction: column;

  .gts-button-container {
    margin-bottom: 10px;
  }
}
</style>