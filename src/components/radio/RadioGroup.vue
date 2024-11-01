<template>
  <div class="gts-radio-group">
      <RadioButton v-for="(item, index) in radios" :key="index" :label="item.label" @onChecked="onRadioChecked" :id="`${index}`" :isChecked="index == this.itemSelected" />
  </div>
</template>

<script>
import RadioButton from './RadioButton.vue';



export default {
  name: 'RadioGroup',
  components: {
    RadioButton
  },
  props: {
    radios : {
      type: Array,
      required: true,
       
    },
    itemChecked: {
      type: Number,
      required: false
    }
  },
  data(){
    return {
      itemSelected:-1,
    }
  },
   
  methods: {
    onRadioChecked(index){
      this.itemSelected = index;
      this.$emit("onRadioChecked", this.radios[index])
    }
  },
  created() {
    this.itemSelected = this.itemChecked;
  }
};
</script>

<style lang="scss">
.gts-radio-group {
  display: flex;
  flex-direction: column;
}
</style>
