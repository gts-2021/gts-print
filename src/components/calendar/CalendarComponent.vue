<template>

  <div class="">
    
    <!-- calendar header -->
    <CalendarHeader :startDate="'08 dec'" :endDate="'12 dec'" 
      :calendarTypes="calendarTypes" 
      :defaultType="defaultType"
      @dateIncremented="incrementDate"
      @dateDecremented="decrementDate"
      @dispalyTypeSelected="displayCalendar"
    />

    <!-- dynamic display -->
    <component :is="selectedCalendarComponent" />

  </div>
    
</template>

<script>

import {CALENDARS_TYPES, CALENDARS_MONTH_TYPE, CALENDARS_WEEK_TYPE } from '@/constants/calendars.js';
import CalendarHeader from './CalendarHeader.vue';
import CalendarMonthly from './month/CalendarMonthly.vue';
import CalendarWeekly from './week/CalendarWeekly.vue';

export default {

  name: "CalendarComponent",

  components: {
    CalendarHeader,
    CalendarMonthly,
    CalendarWeekly,

  },

  props: { 

  },

  data () {
    return {
      calendarTypes : CALENDARS_TYPES,
      defaultType : CALENDARS_MONTH_TYPE,
      selectedCalendarComponent:'CalendarMonthly'

    }
  },

  methods : {

    displayCalendar(displayType){
      switch (displayType) {
        case CALENDARS_MONTH_TYPE:
          this.selectedCalendarComponent = 'CalendarMonthly';
          break;
        case CALENDARS_WEEK_TYPE:
          this.selectedCalendarComponent = 'CalendarWeekly';
          break;

      }

    },

    incrementDate(){
      console.log("incrementDate");
    },

    decrementDate(){
      console.log("decrementDate");
    },

  }

}
</script>

<style lang="scss">


</style>