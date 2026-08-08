<template>
  <div class="gts-print-calendar-daily-container">
    <div 
      class="gts-print-calendar-daily-item" 
      v-for="(day, index) in (calendarData.calendars[0] || [])" 
      :key="day.date || index" 
      :class="getContentCssClass[index]"
    >
      <CalendarDailyInfo :calendarDay="day" :selectedDay="selectedDay" @daySelected="selectDay(day)"/>
    </div>
  </div>
</template>

<script>
import CalendarDailyInfo from "./CalendarDailyInfo.vue";

export default {
  name: "CalendarDaily",

  components: {
    CalendarDailyInfo
  },

  props: {
    calendarData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedDay: null,
    }
  },

  computed: {
    getContentCssClass() {
      const days = this.calendarData.calendars[0] || [];
      return days.map(day => {
        if (this.selectedDay === day) {
          return "selected";
        }
        if (day.disabled) {
          return "light-gray";
        }
        return "";
      });
    },
  },

  methods: {
    selectDay(day) {
      this.selectedDay = day;
    },
  }
}
</script>

<style lang="scss">
.gts-print-calendar-daily-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .gts-print-calendar-daily-item {
    width: 100%;
  }
}
</style>
