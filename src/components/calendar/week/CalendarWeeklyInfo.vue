<template>

  <div class="gts-print-calendar-weekly-left" @click="selectDay(calendarDay)">
    
    <!-- day -->
    <div class="gts-print-calendar-weekly-content-calendarDay" >
      <span class="calendarDay-name"> {{calendarDay.name}} </span>
      <span class="calendarDay-number"> {{ calendarDay.number }}</span>
    </div>

    <!-- separator -->
    <div class="gts-print-calendar-weekly-content-separator"></div>

    <!-- timeslot -->
    <div v-if="calendarDay.timeSlots.length > 0" class="gts-print-calendar-weekly-content-data">
  
      <span class="gts-print-calendar-weekly-content-data-label"> {{ calendarDay.label }} </span>
      
      <div class="gts-print-calendar-weekly-content-data-timeslots">
        <div class="gts-print-calendar-weekly-content-data-timeslot" v-for="timeSlot in calendarDay.timeSlots" :key="timeSlot">
          <span class="time-slot-text"> {{timeSlot.startTime}} - {{timeSlot.endTime}}</span>
        </div>
      </div>
      
    </div>

    <div v-else class="gts-print-calendar-weekly-content-data-empty" >
      
      <span class="gts-print-calendar-weekly-content-data-label"> {{ calendarDay.label }} </span>
      
    </div>

  </div>
  
  <div v-if="isSelected" class="gts-print-calendar-weekly-content-actions">
    <component :item="calendarDay" :is="calendarDay.componentFormatter"></component>
  </div>
    
</template>

<script>

export default {

  name: "CalendarWeeklyInfo",

  emits : ['daySelected'],

  props: { 
    
    calendarDay: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: Object,
      default: null,
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

    selectDay(calendarDay){
      this.$emit("daySelected", calendarDay);
    },
  }

}
</script>

<style lang="scss">


.gts-print-calendar-weekly-content{


  .gts-print-calendar-weekly-left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;

    .gts-print-calendar-weekly-content-calendarDay{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      padding: 9px 20px;
      background: $neutral-color-100;
      line-height: 20px;
    
      .calendarDay-name{
        font-weight: 400;
        font-size: 14px;
        color: $neutral-color-700;
      }

      .calendarDay-number{
        font-weight: 600;
        color: $neutral-color-700;
        font-size: 20px;
      }
    }

    .gts-print-calendar-weekly-content-separator{
      border: 1px solid $neutral-color-200;
      height: 100%;
    }

    .gts-print-calendar-weekly-content-data{

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;

      .gts-print-calendar-weekly-content-data-label{
        font-weight: 600;
        color: $primary-color-300;
        line-height: 20px;
        font-size: 14px;
      }

      .gts-print-calendar-weekly-content-data-timeslots{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 7px;

        .gts-print-calendar-weekly-content-data-timeslot{
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

    .gts-print-calendar-weekly-content-data-empty{
      
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px auto;
      line-height: 20px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 4px;
      color: $neutral-color-800;
      background: $neutral-color-200;

      .gts-print-calendar-weekly-content-data-label{
        padding: 20px 80px;
      }
    }
  }

  .gts-print-calendar-weekly-content-actions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
    
}

.gts-print-calendar-weekly-content.selected{
  background: $primary-color-50;

  .gts-print-calendar-weekly-content-calendarDay {
    background: $color-white;
  }
}

.gts-print-calendar-weekly-content.light-gray{
  background: $neutral-color-50;
  pointer-events: none;
  cursor: not-allowed;
}
    
</style>