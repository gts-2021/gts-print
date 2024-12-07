<template>

  <!-- header -->
  <div class="gts-print-calendar-monthly-content-data-header">

    <!-- day -->
    <div>
      <span class="gts-print-calendar-header-day">{{ calendarDay.number}} </span>
    </div>

    <!-- actions -->
    <div v-if="selectedDay === calendarDay">
      <span class="gts-print-calendar-content-actions-icon" @click=displayMenu(calendarDay)>  <MenuIcon /></span>                
    </div>

  </div>

  <!-- timeslot -->
  <div v-if="calendarDay.timeSlots.length > 0" class="gts-print-calendar-monthly-content-data-timeslots">
    <div class="gts-print-calendar-monthly-content-data-timeslot" v-for="timeSlot in calendarDay.timeSlots" :key="timeSlot">
      <span class="time-slot-text"> {{timeSlot}}  </span>
    </div>
  </div>

  <!-- empty content -->
  <div v-else class="gts-print-calendar-monthly-content-data-empty">
    <span class="time-slot-text"> {{calendarDay.label}}  </span>
  </div>
         
  
</template>

<script>

import MenuIcon from '@/assets/icons/MenuIcon.vue';

export default {

  name: "CalendarMonthlyInfo",

  components: {
    MenuIcon,
  },

  props: { 
    
    calendarDay: {
      type: Object,
      required: true
    },

    selectedDay: {
      type: Object,
      required: false
    },
  },

  data () {
    return {
    }
  },

  methods : {

    displayMenu(day){
      console.log("displayMenu", day);
    }
  }

}
</script>

<style lang="scss">

</style>