<template>

  <div class="">
    
    <!-- calendar header -->
    <CalendarHeader 
      :startDate="headerConfig.startDate"
      :endDate="headerConfig.endDate"
      :calendarTypes="headerConfig.calendarTypes"
      :defaultType="headerConfig.defaultType"
      @dateIncremented="onDateIncremented"
      @dateDecremented="onDateDecremented"
      @dispalyTypeSelected="onDisplayTypeSelected"
    />

    <!-- dynamic display -->
    <component 
      :is="calendarContentConfig.selectedCalendarComponent" 
      :calendarData="calendarContentConfig.calendarData"
    />

  </div>
    
</template>

<script>

import CalendarHeader from './CalendarHeader.vue';
import CalendarMonthly from './month/CalendarMonthly.vue';
import CalendarWeekly from './week/CalendarWeekly.vue';

export default {

  name: "CalendarComponent",

  emits: ['dateIncremented', 'dateDecremented', 'displayTypeSelected'],

  components: {
    CalendarHeader,
    CalendarMonthly,
    CalendarWeekly,
  },

  props: {
    headerConfig: {
      type: Object,
      required: true,
      default: () => ({
        startDate: '',
        endDate: '',
        calendarTypes: [],
        defaultType: '',
      }),
    },
    calendarContentConfig: {
      type: Object,
      required: true,
      default: () => ({
        selectedCalendarComponent: 'CalendarMonthly',
        calendarData: {},
      }),
    },
  },

  data () {
    return {
    }
  },

  methods : {
    
    onDateIncremented() {
      this.$emit('dateIncremented');
    },

    onDateDecremented() {
      this.$emit('dateDecremented');
    },

    onDisplayTypeSelected(displayType) {
      this.$emit('displayTypeSelected', displayType);
    },

  }

}
</script>

<style lang="scss">


</style>