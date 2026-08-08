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
      @dateSelected="onDateSelected"
      @todayClicked="onTodayClicked"
    />

    <!-- dynamic display -->
    <component 
      :is="calendarContentConfig.selectedCalendarComponent" 
      :calendarData="calendarContentConfig.calendarData"
      :contextMenuActions="contextMenuActions"
      @daySelected="selectDay"
    />

  </div>
    
</template>

<script>

import CalendarHeader from './CalendarHeader.vue';
import CalendarMonthly from './month/CalendarMonthly.vue';
import CalendarWeekly from './week/CalendarWeekly.vue';
import CalendarDaily from './day/CalendarDaily.vue';

export default {

  name: "PureCalendar",

  emits: ['dateIncremented', 'dateDecremented', 'displayTypeSelected', 'dateSelected', 'todayClicked', 'daySelected'],

  components: {
    CalendarHeader,
    CalendarMonthly,
    CalendarWeekly,
    CalendarDaily,
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

    contextMenuActions: {
			type: Array,
			required: false,
			default: () => [],
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

    onDateSelected(selectedDate){
      this.$emit('dateSelected', selectedDate);
    },
    onTodayClicked(selectedDate){
      this.$emit('todayClicked', selectedDate);
    },
    selectDay(selectedDay){
      this.$emit("daySelected", selectedDay);
    },

  }

}
</script>

<style lang="scss">


</style>