<template>
  <div class="gts-toggle-container" :id="id">
    <div 
      @click="onToggle" 
      class="gts-toggle" 
      :class="{ 'gts-toggle--checked': isToggleChecked }"
    >
      <div class="gts-toggle-thumb"></div>
    </div>
    <span @click="onToggle" class="gts-toggle-label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'ToggleComponent',
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
      isToggleChecked: false,
    }
  },

  methods: {
    onToggle(event) {
      event.stopPropagation();
      
      // Always emit onToggle with the new state (inverted current state)
      const newState = !this.isToggleChecked;
      this.$emit('onToggle', newState);
      
      if (!this.noBind) {
        this.isToggleChecked = newState;
        this.$emit('update:isChecked', this.isToggleChecked);
      }
    }
  },

  watch: {
    isChecked(newVal) {
      this.isToggleChecked = newVal;
    }
  },
  
  created() {
    this.isToggleChecked = this.isChecked;
  }
}
</script>

<style lang="scss">
// Variables for toggle colors - using hardcoded values or potentially derived if global vars are available
// Assuming $neutral-color-300 and others are global as in CheckBox.vue
$toggle-width: 40px;
$toggle-height: 20px;
$thumb-size: 16px;
$thumb-margin: 2px;

.gts-toggle-container {
  display: flex;
  flex-direction: row;
  align-items: center;

  .gts-toggle {
    display: flex;
    align-items: center;
    width: $toggle-width;
    height: $toggle-height;
    background-color: $neutral-color-300; // Default off color
    border-radius: $toggle-height;
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.2s ease;

    .gts-toggle-thumb {
      width: $thumb-size;
      height: $thumb-size;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      left: $thumb-margin;
      transition: left 0.2s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }

    &.gts-toggle--checked {
      background-color: $primary-color-400; // Active color

      .gts-toggle-thumb {
        left: calc(100% - #{$thumb-size} - #{$thumb-margin});
      }
    }
  }

  .gts-toggle-label {
    cursor: pointer;
    font-size: 14px; // Adjust as needed to match design system
  }
}
</style>
