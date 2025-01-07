<template>

  <div class="gts-print-calendar-weekly-container">

    <div class="gts-print-calendar-weekly-content" v-for="(day, index) in calendarData.calendars[0]" :key="day" :class="getContentCssClass[index]">

      <CalendarWeeklyInfo :calendarDay="day" :selectedDay="selectedDay" @daySelected="selectDay(day)"/>
    
    </div>

  </div>
  
</template>

<script>

import CalendarWeeklyInfo from "./CalendarWeeklyInfo";

export default {

  name: "CalendarWeekly",

  components: {
    CalendarWeeklyInfo
  },

  props: {
    calendarData: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      selectedDay: null,
    }
  },

  computed: {
    getContentCssClass() {
      return this.calendarData.calendars[0].map(day => {
        if (this.selectedDay === day) {
          return "selected";
        }
        if (day.timeSlots.length === 0) {
          return "light-gray";
        }
        return "";
      })
    },
  },

  methods : {

    selectDay(day){
      this.selectedDay = day;
    },

  }

}
</script>

<style lang="scss">

.gts-print-calendar-weekly-container{
  padding: 0px 20px;

  .gts-print-calendar-weekly-content{

    display: flex;
    align-content: center;
    justify-content: space-between;
    border: 1px solid $neutral-color-200;
    padding: 16px;
    gap: 30px;
    border-radius: 12px;
    margin-bottom: 15px;
    cursor: pointer;
    
  }

}
    
</style>