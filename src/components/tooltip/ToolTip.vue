<template>
  <div class="gts-tooltip-container" @mouseover="show = true" @mouseleave="show = false">
    <div v-if="show" :class="['gts-tooltip', position]">
      {{ text }}
    </div>
    <slot></slot>
    
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    text: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'center', // Default to 'center'
      validator: value => ['left', 'center', 'right'].includes(value),
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.gts-tooltip-container {
  position: relative;
  display: inline-block;
}

.gts-tooltip {
  position: absolute;
  bottom: 100%;
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 1;
  transform: translateY(10px);
  transition: opacity 0.2s, transform 0.2s;
  z-index: 10;
}

.gts-tooltip-container:hover .gts-tooltip {
  opacity: 1;
}

.gts-tooltip.left {
  left: 0;
}

.gts-tooltip.center {
  left: 50%;
  transform: translateX(-50%);
}

.gts-tooltip.right {
  right: 0;
}
</style>
