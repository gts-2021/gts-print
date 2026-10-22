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
    <CalendarTimeGrid
      v-if="showTimeGrid"
      :calendarData="calendarContentConfig.calendarData"
      :startTime="startTime"
      :endTime="endTime"
      :timeGridClass="timeGridClass"
      :hourHeight="hourHeight"
    />
    <component
      v-else
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
import CalendarTimeGrid from './CalendarTimeGrid.vue';

export default {

  name: "PureCalendar",

  emits: ['dateIncremented', 'dateDecremented', 'displayTypeSelected', 'dateSelected', 'todayClicked', 'daySelected'],

  components: {
    CalendarTimeGrid,
    CalendarHeader,
    CalendarMonthly,
    CalendarWeekly,
    CalendarDaily,
  },

  props: {
    displayTimes: { type: Boolean, default: false },
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 23 },
    timeGridClass: { type: [String, Array, Object], default: '' },
    hourHeight: { type: Number, default: 64 },
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

  computed: {
    showTimeGrid() {
      return this.displayTimes && ['CalendarWeekly', 'CalendarDaily'].includes(
        this.calendarContentConfig.selectedCalendarComponent
      );
    },
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
