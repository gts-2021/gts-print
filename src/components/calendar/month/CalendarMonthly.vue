<template>

  <div class="gts-print-calendar-monthly-wrapper">

    <div class="gts-print-calendar-monthly-container">
  
      <table class="gts-print-calendar-monthly">

        <thead>
          <tr class="gts-print-calendar-monthly-header">
            <th class="gts-print-calendar-monthly-header-container" v-for="day in calendarData.weekDays" :key="day">
              <div class="gts-print-calendar-monthly-header-data"> 
                <span class="gts-print-calendar-monthly-header-title"> {{day}} </span> 
              </div>
            </th>
            
          </tr>
        </thead>

        <tbody>
        
          <tr class="gts-print-calendar-monthly-content" v-for="(week, weekIndex) in calendarData.calendars" :key="weekIndex">
        
            <td class="gts-print-calendar-monthly-content-data" v-for="(day, index ) in calendarData.weekDays" :key="index" @click="selectDay(week[index])"
              :class="getContentCssClass[weekIndex][index]">

              <CalendarMonthlyInfo :calendarDay="week[index]" :selectedDay="selectedDay"/>

            </td> 
        
          </tr> 
        
        </tbody>

      </table>

    </div>

  </div>
  
</template>

<script>

import CalendarMonthlyInfo from "./CalendarMonthlyInfo";

export default {

  name: "CalendarMonthly",

  components: {
    CalendarMonthlyInfo
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
      return this.calendarData.calendars.map(week =>
        week.map(day => {
          if (this.selectedDay === day) {
            return "selected";
          }
          if (day.timeSlots.length === 0) {
            return "light-gray";
          }
          return "";
        })
      );
    },
  },

  methods : {

    selectDay(day){
      if(day.timeSlots.length>0)
        this.selectedDay = day;
    },

    displayMenu(day){
      console.log("displayMenu", day);
    }
  }

}
</script>

<style lang="scss">

.gts-print-calendar-monthly-wrapper {
  position: relative;
  width: 100%;

  .gts-print-calendar-monthly-container {
    border-radius: 12px 12px 0 0;
    border: 1px solid $neutral-color-200;
    overflow: hidden;
  
    .gts-print-calendar-monthly{
      border-collapse: collapse;
      white-space: nowrap;
      width: 100%;
      
      .gts-print-calendar-monthly-header{
         display: flex;
        .gts-print-calendar-monthly-header-container{
           flex: 1;
          .gts-print-calendar-monthly-header-data{
            position: relative;
            display: flex;
            align-items: center;
            padding: 12px 24px;
            border-right: 1px solid $neutral-color-200;
            border-bottom: 1px solid $neutral-color-200;
            background: $color-white;
          }

          .gts-print-calendar-monthly-header-title{
            font-size: 16px;
            line-height: 24px;
            color: $neutral-color-500;
            text-wrap: nowrap;
          }

        }

      }

      .gts-print-calendar-monthly-content{
        display: flex;
      }
    }

  }

}


    
</style>