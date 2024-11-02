<template>

  <div id="container">

    <CheckBox @onToggle="(checked) => console.log(checked)" label="Toggle me please"/>

    <CheckBox :isChecked="true" label="Default checked"/>

  </div>

</template>

<script>
import CheckBox from './CheckBox.vue';
 




export default {

  name: "CheckBoxExemple",

  components: {
    CheckBox
  },

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