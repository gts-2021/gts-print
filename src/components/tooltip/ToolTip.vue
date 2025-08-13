<template>
  <div
    class="gts-tooltip-container"
    ref="triggerEl"
    @mouseover="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>

    <teleport to="body">
      <div
        v-if="show"
        class="gts-tooltip"
        :class="position"
        :style="{ top: coords.top + 'px', left: coords.left + 'px' }"
      >
        {{ text }}
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: "ToolTip",
  props: {
    text: { type: String, required: true },
    position: {
      type: String,
      default: "center",
      validator: v => ["left", "center", "right"].includes(v),
    },
  },
  data() {
    return {
      show: false,
      coords: { top: 0, left: 0 },
    };
  },
  methods: {
    showTooltip() {
      this.updatePosition();
      this.show = true;
      window.addEventListener("scroll", this.updatePosition, true);  
      window.addEventListener("resize", this.updatePosition);
    },
    hideTooltip() {
      this.show = false;
      window.removeEventListener("scroll", this.updatePosition, true);
      window.removeEventListener("resize", this.updatePosition);
    },
    updatePosition() {
      const trigger = this.$refs.triggerEl;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();

      let top = rect.top + window.scrollY;
      let left = rect.left + window.scrollX;

      if (this.position === "center") {
        left += rect.width / 2;
      } else if (this.position === "right") {
        left += rect.width;
      }

      // Placer le tooltip juste au-dessus
      top -= 10; 

      this.coords = { top, left };
    },
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
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  transform: translate(-50%, -100%);
  z-index: 99999;
}

.gts-tooltip.left {
  transform: translate(0, -100%);
}

.gts-tooltip.center {
  transform: translate(-50%, -100%);
}

.gts-tooltip.right {
  transform: translate(-100%, -100%);
}
</style>
