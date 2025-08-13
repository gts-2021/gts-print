<template>

  <div class="gts-print-calendar-header-container">
    
    <!-- days display -->
    <div class="gts-print-calendar-header-right">

      <div class="gts-print-calendar-header-steps">
       
       <div>
         <span class="gts-print-calendar-header-steps-icon" @click="decrementDate">
           <v-icon>{{ "mdi-chevron-left" }}</v-icon>
         </span>
       </div>
       
       <div class="gts-calendar-wrapper">
         <TextInput type="date" label="" class="gts-hidden-date-input" v-model="selectedDate" @OnValueChanged="selectDate"/>
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
 
     <ButtonComponent 
        class="gts-today-button"
       :title="'Today'" 
        @buttonClicked="getTodayDate()"
     />

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
import TextInput from '@/components/input/TextInput.vue';
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import moment from 'moment';

export default {

  
  name: "CalendarHeader",

  emits : ['dispalyTypeSelected', 'dateIncremented', 'dateDecremented', 'dateSelected', 'todayClicked'],

  
  components: {
    TextInput,
    ButtonComponent
  },

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
      selectedDate: null,
      todayDate: null
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

    selectDate(){
      this.$emit('dateSelected', this.selectedDate);
    },

    getTodayDate(){
      this.$emit('todayClicked', moment());
    }

  }

}
</script>

<style lang="scss">

.gts-print-calendar-header-container{
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  
  .gts-print-calendar-header-right {
    display: flex;
    align-items: center;
    gap: 8px;

    .gts-print-calendar-header-steps{

      position: relative;
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

      .gts-calendar-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .gts-input {
          min-width: auto;
        }
        .gts-input-calendar{
          width: 0;
          height: 0;
          border: none;
          background-color: $color-white;
        }
        input[type="date"] {
          padding-left: 5px !important;
        }
        input[type="date"]:focus {
          outline: none !important; /* Supprime la bordure bleue par défaut */
          box-shadow: none !important; /* Supprime l'effet de glow */
          border-color: transparent !important; /* Supprime la couleur de la bordure */
        }

        .gts-calendar-icon{
          left: 0px !important;
          top: 1px !important;
        }
        
      }

    }
    .gts-today-button {
      margin-left: 10px;
      .gts-button{
        line-height: 10px;
      }
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