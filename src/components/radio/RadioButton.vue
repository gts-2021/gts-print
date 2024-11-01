<template>

  <div @click="checkRadio" class="gts-radio-container">
    <div class="gts-radio">
      <span v-if="isRadioChecked"  class="gts-radio-checked"></span>
    </div>
    <span @click="checkRadio" class="gts-radio-label">{{label}}</span>
  </div>

</template>

<script>


export default {
  name: 'RadioButton',
  props: {
    id: {
      type: String,
      required: false,
       
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false
    }

  },

  data(){
    return {
      isRadioChecked: false,
    }
  },

  methods: {
    checkRadio(){
      this.isRadioChecked = true;
      this.$emit('onChecked', this.id)
    }

  },

  watch: {
    isChecked(newVal){
      this.isRadioChecked = newVal;
    }
  }


}
</script>

<style lang="scss">
.gts-radio-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  .gts-radio {
    display: flex;
    width: 20px;
    height: 20px;
    padding: 3px;
    background-color: white;
    border: 1px solid $primary-color-600;
    border-radius: 10px;
    margin-right: 10px;

    .gts-radio-checked {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: $primary-color-600;
      border-radius: 10px;
    }
  }

}
</style>