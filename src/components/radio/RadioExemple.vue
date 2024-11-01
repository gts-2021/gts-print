<template>

  <div id="container">

    <RadioButton label="Click me please !" />

    <RadioButton label="Independent Radio " />

    <br>
    <h3>This a group radio</h3>
    <RadioGroup @onRadioChecked="(item) => console.log(item)" :radios="this.radios" />
       


  </div>

</template>

<script>
import RadioButton from './RadioButton.vue';
import RadioGroup from './RadioGroup.vue';




export default {

  name: "RadioExemple",

  components: {
    RadioButton,
    RadioGroup
  },

  data() {
    return {
      radios : [
        {
          label: "Radio 1 "
        },
        {
          label: "Radio 2"
        },
        {
          label: "Radio 3"
        }
      ]
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
  flex-direction: column;

  .gts-button-container {
    margin-bottom: 10px;
  }
}
</style>