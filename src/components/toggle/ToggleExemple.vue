<template>

  <div id="container">

    <ToggleComponent @onToggle="(checked) => console.log('Toggled:', checked)" label="Toggle me please"/>

    <ToggleComponent :isChecked="true" label="Default checked"/>

    
    <ToggleComponent v-model:isChecked="toggleBindedVal" label="Toggle with value binded"/>
    <p>Value: {{ toggleBindedVal }}</p>

    <ToggleComponent  :isChecked="true" :noBind="true" label="Toggle with no bind (manual)"/>

  </div>

</template>

<script>
import ToggleComponent from './ToggleComponent.vue';

export default {

  name: "ToggleExemple",

  components: {
    ToggleComponent
  },
  data(){
    return {
      toggleBindedVal: true
    }
  },
  watch:{
    toggleBindedVal(newVal){
      console.log('Binded Value Changed:', newVal);
    }
  }

}

</script>

<style lang="scss" scoped>
#container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .gts-toggle-container {
    margin-bottom: 10px;
  }
}
</style>
