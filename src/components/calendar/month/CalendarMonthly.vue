<template>

  <div class="gts-print-calendar-monthly-wrapper">

    <div class="gts-print-calendar-monthly-container">
  
      <table class="gts-print-calendar-monthly">

        <thead>
          <tr class="gts-print-calendar-monthly-header">
            <th class="gts-print-calendar-monthly-header-container" v-for="day in weekDays" :key="day">
              <div class="gts-print-calendar-monthly-header-data"> 
                <span class="gts-print-calendar-monthly-header-title"> {{day.title}} </span> 
              </div>
            </th>
            
          </tr>
        </thead>

        <tbody>
        
          <tr class="gts-print-calendar-monthly-content" v-for="(week, weekIndex) in calendars" :key="weekIndex">
        
            <td class="gts-print-calendar-monthly-content-data" v-for="(day, index ) in weekDays" :key="index" @click="selectDay(week[index])"
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


  data () {
    return {
      selectedDay: null,

      weekDays: [
        {
          title: "SUN",
        },
        {
          title: "MON",
        },
        {
          title: "TUE",
        },
        {
          title: "WED",
        },
        {
          title: "THUR",
        },
        {
          title: "FRI",
        },
        {
          title: "SAT",
        },
        ],

      // calendars represent a month which each list is a week with calendars
      calendars:[
        
        [   

          {
            date: "01/12/2024",
            day: "SUN",
            number: "1",
            label: "Consultation",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
          
            date: "02/12/2024",
            name:"MON",
            number: "2",            
            label:"Change of panel",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],

          },

          {
            date: "03/12/2024",
            name: "TUE",
            number: "3",             
            label: "Holiday",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "04/12/2024",
            name: "WED",
            number: "4",
            label: "Holiday",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "05/12/2024",
            name: "THUR",
            number: "5",
            label: "Holiday",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "06/12/2024",
            name: "FRI",
            number: "6",
            label: "Holiday",
            timeSlots:[],
          },

          {
            date: "07/12/2024",
            name: "SAT",
            number: "7",
            label: "Holiday",
            timeSlots:[],
          },
      
        ],

        [   

          {
            date: "08/12/2024",
            day: "SUN",
            number: "08",
            label: "Consultation",
            timeSlots:[
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "09/12/2024",
            name:"MON",
            number: "09",            
            label:"Change of panel",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "11:00",
                endTime: "12:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],

          },

          {
            date: "10/12/2024",
            name: "TUE",
            number: "10",             
            timeSlots:[
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "11/12/2024",
            name: "WED",
            number: "11",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "12/12/2024",
            name: "THUR",
            number: "12",
            timeSlots:[
              {
                startTime: "09:00",
                endTime: "10:30",
              },
              {
                startTime: "14:00",
                endTime: "15:30",
              }
            ],
          },

          {
            date: "13/12/2024",
            name: "FRI",
            number: "13",
            label: "Holiday",
            timeSlots:[],
          },

          {
            date: "14/12/2024",
            name: "SAT",
            number: "14",
            label: "Holiday",
            timeSlots:[],
          },
      
        ],


        
     
      ],
    }
  },

  computed: {
    getContentCssClass() {
      return this.calendars.map(week =>
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
  padding: 20px;

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