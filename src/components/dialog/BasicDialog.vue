<template>

  <teleport to="body">
    <div v-if="this.isOpen" class="gts-dialog-container">
      <div ref="dialogRef" :class="'gts-dialog ' + (this.className || '')" :style="dialogStyle">
        <div class="gts-dialog-header" :style="isMovable ? 'cursor: move;' : ''" @mousedown="startDrag">
          <span class="gts-dialog-header-title" :style="'color:' + this.titleColor + ';'">{{ title }}</span>
          <svg @click="onCloseClicked" class="gts-dialog-header-close-icon" width="30" height="30"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </div>
        <div class="gts-dialog-content" :style="contentStyle">
          <slot></slot>
        </div>

        <template v-if="$slots.footer">
          <div class="gts-dialog-footer">
            <slot name="footer"></slot>
          </div>
        </template>

        <div v-if="isResizable" class="gts-dialog-resize-handle" @mousedown="startResize"></div>
      </div>
    </div>
  </teleport>

</template>

<script>


export default {
  name: 'BasicDialog',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    titleColor: {
      type: String,
      required: false,
      default: ''
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    className: {
      type: String,
      required: false,
      default: ''
    },
    isMovable: {
      type: Boolean,
      required: false,
      default: false
    },
    isResizable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      dragging: false,
      resizing: false,
      isMoved: false,
      isResized: false,
      posX: null,
      posY: null,
      width: null,
      height: null,
      startX: 0,
      startY: 0,
      initialLeft: 0,
      initialTop: 0,
      initialWidth: 0,
      initialHeight: 0
    };
  },
  computed: {
    dialogStyle() {
      const style = {};
      if (this.isMoved) {
        style.position = 'absolute';
        style.left = `${this.posX}px`;
        style.top = `${this.posY}px`;
        style.margin = '0';
      }
      if (this.isResized) {
        style.width = `${this.width}px`;
        style.height = `${this.height}px`;
      }
      return style;
    },
    contentStyle() {
      if (this.isResized) {
        return { maxHeight: 'none' };
      }
      return {};
    }
  },
  watch: {
    isOpen(val) {
      if (!val) {
        this.resetPositionAndSize();
      }
    }
  },
  beforeUnmount() {
    this.removeListeners();
  },
  methods: {
    onCloseClicked() {
      this.$emit("onClosedDialog");
    },
    startDrag(e) {
      if (!this.isMovable) return;
      if (e.target.closest('.gts-dialog-header-close-icon')) return;

      this.dragging = true;
      this.isMoved = true;

      const dialogEl = this.$refs.dialogRef;
      if (dialogEl) {
        const rect = dialogEl.getBoundingClientRect();
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.initialLeft = rect.left;
        this.initialTop = rect.top;
        this.posX = rect.left;
        this.posY = rect.top;
      }

      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(e) {
      if (!this.dragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;

      let newX = this.initialLeft + dx;
      let newY = this.initialTop + dy;

      const dialogEl = this.$refs.dialogRef;
      if (dialogEl) {
        const rect = dialogEl.getBoundingClientRect();
        const maxX = window.innerWidth - 100;
        const minX = -rect.width + 100;
        const maxY = window.innerHeight - 50;
        const minY = 0;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));
      }

      this.posX = newX;
      this.posY = newY;
    },
    stopDrag() {
      this.dragging = false;
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
    },
    startResize(e) {
      if (!this.isResizable) return;
      e.preventDefault();
      e.stopPropagation();

      this.resizing = true;
      this.isResized = true;

      const dialogEl = this.$refs.dialogRef;
      if (dialogEl) {
        const rect = dialogEl.getBoundingClientRect();
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.initialWidth = rect.width;
        this.initialHeight = rect.height;

        if (!this.isMoved) {
          this.isMoved = true;
          this.posX = rect.left;
          this.posY = rect.top;
        }
      }

      window.addEventListener('mousemove', this.onResize);
      window.addEventListener('mouseup', this.stopResize);
    },
    onResize(e) {
      if (!this.resizing) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;

      this.width = Math.max(300, this.initialWidth + dx);
      this.height = Math.max(150, this.initialHeight + dy);
    },
    stopResize() {
      this.resizing = false;
      window.removeEventListener('mousemove', this.onResize);
      window.removeEventListener('mouseup', this.stopResize);
    },
    resetPositionAndSize() {
      this.dragging = false;
      this.resizing = false;
      this.isMoved = false;
      this.isResized = false;
      this.posX = null;
      this.posY = null;
      this.width = null;
      this.height = null;
      this.removeListeners();
    },
    removeListeners() {
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
      window.removeEventListener('mousemove', this.onResize);
      window.removeEventListener('mouseup', this.stopResize);
    }
  }
}
</script>

<style lang="scss">
@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.gts-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 20, 29, 0.705);
  z-index: 100;
  overflow-y: auto;

}

.gts-dialog {
  position: relative;
  top: 50px;
  margin-right: auto;
  margin-left: auto;
  background-color: $color-white;
  width: 900px;
  border-radius: 10px;
  box-shadow: 0 0 0.18cm #d5d5d5;
  animation: scaleIn 0.2s ease forwards;
  display: flex;
  flex-direction: column;

  .gts-dialog-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 25px 10px 25px;
    border-bottom: 1px solid $neutral-color-100;
    user-select: none;
    flex-shrink: 0;

    .gts-dialog-header-title {
      flex-grow: 1;
      font-weight: 600;
      font-size: 24px;
      color: $primary-color-600;
    }

    .gts-dialog-header-close-icon {
      cursor: pointer;
    }

  }

  .gts-dialog-content {
    padding: 25px;
    max-height: 400px;
    min-height: 192px;
    overflow-y: auto;
    flex-grow: 1;
  }

  .gts-dialog-footer {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px 25px 10px 25px;
    border-top: 1px solid $neutral-color-100;
    flex-shrink: 0;
  }

  .gts-dialog-resize-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    cursor: se-resize;
    z-index: 10;
    background: linear-gradient(135deg, transparent 60%, #a3a3a3 60%);
    border-bottom-right-radius: 10px;
  }
}
</style>
