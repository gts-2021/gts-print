<template>


  <div id="exemple-container">
    <AccordionPanel @onOpenAccordion="(id) => console.log(id)" @onCloseAccordion="(id) => console.log(id)">
      <AccordionComponent id="acc1" title="Simple Accordion">
        <h3>Content of accordion</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc2" :title="this.customTitle">
        <h3>Content of accordion</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>
    </AccordionPanel>

    <br>

    <h3>Accordion Pannel with some accordions default opened</h3>

    <AccordionPanel :openedAccordions="defaultOpened">
      <AccordionComponent id="acc1" title="Accordion 1">
        <h3>Content of accordion 1</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc2" title="Accordion 2 ">
        <h3>Content of accordion 2</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc3" title="Accordion 2 ">
        <h3>Content of accordion 3</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>
    </AccordionPanel>


    <h3>Handle opening accordion from external components: </h3>
    <ButtonComponent 
      class="mb-20"
      :title="'Open 1'" 
       @buttonClicked="() => dynamicOpened.push('acc1')"
      />

      <ButtonComponent 
      class="mb-20"
      :title="'Open 3'" 
       @buttonClicked="() => dynamicOpened.push('acc3')"
      />

     
    <AccordionPanel :openedAccordions="dynamicOpened">
      <AccordionComponent id="acc1" title="Accordion 1">
        <h3>Content of accordion 1</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc2" title="Accordion 2 ">
        <h3>Content of accordion 2</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc3" title="Accordion 3 ">
        <h3>Content of accordion 3</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>
    </AccordionPanel>


    <br>
    <h3>Only one accordion open at a time</h3>
     
    <AccordionPanel  :onlyOneItemOpened="true">
      <AccordionComponent id="acc1" title="Accordion 1">
        <h3>Content of accordion 1</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc2" title="Accordion 2 ">
        <h3>Content of accordion 2</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>

      <AccordionComponent id="acc3" title="Accordion 3 ">
        <h3>Content of accordion 3</h3>
        <div>Do what you want here !</div>
      </AccordionComponent>
    </AccordionPanel>

  </div>



</template>

<script>
import { defineComponent, markRaw } from 'vue';
import AccordionComponent from './AccordionComponent.vue';
import CheckBox from '../checkbox/CheckBox.vue';
import AccordionPanel from './AccordionPanel.vue';
import ButtonComponent from '../button/ButtonComponent.vue';



export default {

  components: {
    AccordionComponent,
    AccordionPanel,
    ButtonComponent

  },

  data() {
    return {
      defaultOpened: ['acc1','acc3'],
      dynamicOpened: [],
      customTitle: markRaw(defineComponent({
        components: {
          CheckBox
        },
        methods:{

        },
        template: `<div style="display:inline-block" @click.stop="() => console.log('clickeeeeeeeeeees ::')">
           <CheckBox :isChecked="true" label="Gestion de stock"/>
          </div>`
      }))

    };
  }
}

</script>

<style lang="scss">
#exemple-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  ;
}
</style>