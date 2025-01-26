<template>

  <!-- header -->
  <div class="gts-print-calendar-monthly-content-data-header">

    <!-- day -->
    <div class="gts-print-calendar-header-day">
      <span>{{ calendarDay.number}} </span>
    </div>

    <!-- actions -->
    <div v-if="isSelected" class="gts-print-calendar-content-actions-icon" @click=displayMenu(calendarDay)>
      <MenuIcon />                
    </div>

  </div>

  <!-- timeslot  -->
  <div v-if="calendarDay.timeSlots.length > 0" class="gts-print-calendar-monthly-content-data-timeslots">
    <div class="gts-print-calendar-monthly-content-data-timeslot" v-for="timeSlot in calendarDay.timeSlots" :key="timeSlot">
      <span class="time-slot-text"> {{timeSlot.startTime}} - {{timeSlot.endTime}}</span>
    </div>
  </div>

  <!-- empty content  -->
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

  computed: {
    isSelected() {
      return this.selectedDay === this.calendarDay;
    },
  },

  methods : {

    displayMenu(day){
      console.log("displayMenu", day);
    }
  }

}
</script>

<style lang="scss">

.gts-print-calendar-monthly-content-data{
         
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid $neutral-color-200;
  border-bottom: 1px solid $neutral-color-200;
  padding: 10px;
  cursor: pointer;

  .gts-print-calendar-monthly-content-data-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    .gts-print-calendar-header-day{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      font-size: 14px;
      color: $neutral-color-500;
      font-weight: 500;
      border-radius: 50%;
      text-align: center;
    }
    .gts-print-calendar-header-day.today{
      background: $neutral-color-200;
    }

    .gts-print-calendar-content-actions-icon{
      cursor: pointer;
    }
  }

  .gts-print-calendar-monthly-content-data-timeslots{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 7px;

    .gts-print-calendar-monthly-content-data-timeslot{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: $color-white;
      background: $primary-color-300;
      padding: 2px 8px;
      
      .time-slot-text{
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
      }

    }
  }

}

.gts-print-calendar-monthly-content-data.selected{
  background: $primary-color-50;
}

.gts-print-calendar-monthly-content-data.light-gray{
  background: $neutral-color-50;
  cursor: auto;
}

.gts-print-calendar-monthly-content-data-empty{
  text-align: center;
  padding: 30px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  color: $neutral-color-800;
  background: $neutral-color-200;
}

.gts-print-calendar-monthly-content-data.past, 
.gts-print-calendar-monthly-content-data.futur{
  opacity: 0.5;
  background: $neutral-color-50;
  pointer-events: none;
  cursor: not-allowed;
}


</style>