<template>

  <div class="gts-print-calendar-header-container">
    
    <!-- days display -->
    <div class="gts-print-calendar-header-steps">

      <div>
        <span class="gts-print-calendar-header-steps-icon" @click="decrementDate">
          <v-icon>{{ "mdi-chevron-left" }}</v-icon>
        </span>
      </div>
      
      <div>
        <span > {{startDate}} - {{ endDate }}</span>
      </div>

      <div>
        <span class="gts-print-calendar-header-steps-icon" @click="incrementDate">
          <v-icon>{{ "mdi-chevron-right" }}</v-icon>
        </span>
      </div>
     
    </div>

    <!-- display types -->
    <div v-if="calendarTypes.length >0" class="gts-print-calendar-header-types">
      <span v-for="type in calendarTypes" :key="type" :class="{ selected: type === selectedType }" 
        @click="selectDisplayType(type)"> {{ type }}
      </span>
    </div>
    
  </div>
    
</template>

<script>

export default {

  name: "CalendarHeader",

  emits : ['dispalyTypeSelected', 'dateIncremented', 'dateDecremented'],

  props: { 

    defaultType: {
      type: String,
      required: false,
      default: null,
    },
    
    startDate: {
      type: String,
      required: true,
      default: "",
    },

    endDate: {
      type: String,
      required: true,
      default: "",
    },

    calendarTypes:{
      type: Array,
      required: false,
      default(){ 
        return[]
      },
    }

  },

  data () {
    return {
      selectedType: this.defaultType || null,     
    }
  },

  methods : {
    selectDisplayType(displayType){
      this.selectedType = displayType; 
      this.$emit("dispalyTypeSelected", displayType);
    },

    incrementDate(){
      this.$emit("dateIncremented");
    },

    decrementDate(){
      this.$emit("dateDecremented");
    },

  }

}
</script>

<style lang="scss">

.gts-print-calendar-header-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  
  .gts-print-calendar-header-steps{

    display: flex;
    align-items: center;
    border: 1px solid $neutral-color-200;
    border-radius: 8px;
    gap: 8px;
    padding: 4px 8px;
    color: $primary-color-700;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;

    .gts-print-calendar-header-steps-icon{
      display: flex;
      align-items: center;
      border: 1px solid $neutral-color-200;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .gts-print-calendar-header-types {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: $primary-color-50;
    padding: 4px 8px; 

  }

  .gts-print-calendar-header-types span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2px 8px; 
    border-radius: 4px;
    background: transparent;
    transition: all 0.3s ease;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }

  .gts-print-calendar-header-types span:hover,
  .gts-print-calendar-header-types span.selected {
    background: $color-white;
    color: $primary-color-400;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 2px 8px; 
  }

}
 
</style>