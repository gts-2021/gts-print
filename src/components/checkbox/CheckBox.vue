<template>

  <div class="gts-checkbox-container">
    <div @click="onToggle" class="gts-checkbox">

      <svg v-if="isRadioChecked" fill="white" class="gts-checkbox-checked" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <title>check-bold</title>
        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
      </svg>
    </div>
    <span @click="onToggle" class="gts-checkbox-label">{{ label }}</span>
  </div>

</template>

<script>


export default {
  name: 'CheckBox',
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
    },
    noBind: {
      type: Boolean,
      required: false,
      default: false
    },

  },

  data() {
    return {
      isRadioChecked: false,
    }
  },

  methods: {
    onToggle() {
      this.$emit('onToggle', !this.isRadioChecked)
      
      if (!this.noBind) {
        this.isRadioChecked = !this.isRadioChecked;
        this.$emit('update:isChecked', this.isRadioChecked);
      }
    }

  },

  watch: {
    isChecked(newVal) {
      this.isRadioChecked = newVal;
    }
  },
  created() {
    this.isRadioChecked = this.isChecked
  }


}
</script>

<style lang="scss">
.gts-checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: center;


  .gts-checkbox {
    display: flex;
    width: 20px;
    height: 20px;
    background-color: white;
    border: 1px solid $neutral-color-300;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;

    .gts-checkbox-checked {
      display: inline-block;
      padding: 2px;
      width: 100%;
      height: 100%;
      background-color: $primary-color-400;
      border-radius: 4px;
    }
  }

  .gts-checkbox:has(>.gts-checkbox-checked) {

    border: none !important;
  }

  .gts-checkbox-label {
    cursor: pointer;
  }

}
</style>