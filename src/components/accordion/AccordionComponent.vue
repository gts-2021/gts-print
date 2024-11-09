<template>

  <div class="gts-accordion">
    <div @click="toggleAccordion" class="gts-accordion-header">
      <div class="gts-accordion-title">
        <span v-if="typeof title === 'string'">{{ title }}</span>
        <component v-else :is="title" />
      </div>
      <v-icon :class="'gts-accordion-icon ' + (this.isOpen() ? 'accordion-open' : '')">mdi mdi-chevron-down</v-icon>
    </div>
    <div v-if="isOpen()" class="gts-accordion-content">
      <slot></slot>
    </div>
  </div>

</template>

<script>


export default {
  name: 'AccordionComponent',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: [Object, String],
      required: true,
    },

  },
  data() {
    return {
      
    }
  },

  methods: {
    toggleAccordion() {

      let itemIndex = this.openedItems().indexOf(this.id);

      if (itemIndex == -1) {
        if (this.$parent.$props.onlyOneItemOpened) this.openedItems().splice(0, this.openedItems().length);
        this.openedItems().push(this.id)
        this.$parent.$emit('onOpenAccordion', this.id)
      } else {
        this.openedItems().splice(itemIndex, 1);
        this.$parent.$emit('onCloseAccordion', this.id)
      }
    },
    
    openedItems(){
      return this.$parent.$data.openedItems;
    },

    isOpen() {
      return this.openedItems().indexOf(this.id) !== -1;
    }

  },



}
</script>

<style lang="scss">
.gts-accordion {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.gts-accordion-header {
  display: flex;
  flex-direction: row;
  background-color: $neutral-color-50;
  border: 1px solid $neutral-color-400;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  .gts-accordion-title {
    width: 100%;
    flex-grow: 1;

  }

  .gts-accordion-icon {
    transition-duration: 0.2s;
  }

  .gts-accordion-icon.accordion-open {
    transform: rotate(180deg);
  }
}

.gts-accordion-content {
  padding: 10px;
  border: 1px solid $neutral-color-400;
  border-top: 0;
}
</style>