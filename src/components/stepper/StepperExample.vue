<template>

  <div id="exemple-container">


    <StepperComponent :steps="steps" :selectedSteps="['step1']" @onStepClicked="(step) => console.log(step)" />


  </div>

</template>

<script>
import StepperComponent from './StepperComponent.vue';





export default {

  name: "StepperExemple",

  components: {
    StepperComponent
  },

  data() {
    return {

      steps:[
        {
          id: "step1",
          title: "Sector Details"
        },
        {
          id: "step2",
          title: "Sector Availability"
        },
        {
          id: "step3",
          title: "Sector Photos"
        }
      ]

    };
  },

}

</script>

<style lang="scss"></style>