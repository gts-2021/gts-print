<template>

  <div id="calendar-exemple-container">

    <span>GTS-CALENDAR : Navigate to Mars and May to show mor effect</span> <br>
    <CalendarComponent
    :datesContent="dummyContent"
    :startingDate="'25/05/2025'"
    @onDateChanged="($emit) => console.log($emit)"/> 
    
    <br>

    <span>PURE CONGURABLE CALENDAR : </span> <br>
    <PureCalendar 
      :headerConfig="headerConfig"
      :calendarContentConfig="calendarContentConfig"
      :contextMenuActions="actions"
      @dateIncremented="handleDateIncremented"
      @dateDecremented="handleDateDecremented"
      @displayTypeSelected="handleDisplayTypeSelected"
      @daySelected="selectDay"/>

  </div>

</template>

<script>

import PureCalendar from './PureCalendar.vue';
import {CALENDARS_TYPES, CALENDARS_MONTH_TYPE, CALENDARS_WEEK_TYPE} from '@/constants/calendars.js';
import UpdateIcon from '@/assets/icons/UpdateIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';
import { defineComponent, markRaw } from 'vue';
import CalendarComponent from './CalendarComponent.vue';
 

export default {

  name: "CalendarExample",

  components: {
    CalendarComponent,
    PureCalendar
  },

  data() {
    return {
     dummyContent: [
     {
       date: '12/03/2025',
       content: markRaw(defineComponent({
        template: `<div>i have content for 12/03/2025</div>`
       }))
     },
     {
       date: '21/03/2025',
       content: markRaw(defineComponent({
        template: `<div>i have content for 12/03/2025</div>`
       }))
     },
     {
       date: '19/05/2025',
       content: markRaw(defineComponent({
        methods:{
          onClick()  {
            alert("Content clicked !")
          }
        },
        template: `<div class="calendar-content-test" @click="onClick">click me : 19/05/2025</div>`
       }))
     }
    ],

      headerConfig: {
        startDate: '01 Jan',
        endDate: '07 Jan',
        calendarTypes: CALENDARS_TYPES,
        defaultType: CALENDARS_MONTH_TYPE,
      },

      calendarContentConfig: {
        selectedCalendarComponent: 'CalendarMonthly',
        calendarData: {
          weekDays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
          calendars: [
            [
              {
                date: "01/12/2024",
                number: "1",             
                day: "SUN",
                label: "Consultation",
                timeSlots: [
                  { startTime: "09:00", endTime: "10:30"},
                  { startTime: "14:00", endTime: "15:30"},
                ],
                componentFormatter:
                markRaw(defineComponent({
                    components: {
                      UpdateIcon,
                      DeleteIcon
                    },

                    props: {
                      item: {},
                    },

                    template: ` 
                      <span class="gts-print-calendar-content-actions-icon update-icon" @click=updateItem(item)>  <UpdateIcon /></span> 
                      <span class="gts-print-calendar-content-actions-icon remove-icon" @click=deleteItem(item)>  <DeleteIcon /> </span>`,

                    methods: {
                      updateItem(item) {
                        console.log("updateItem ", item);
                      },

                      deleteItem(item) {
                        console.log("deleteItem ", item);
                      },
                    }


                }))
              },
              {
                date: "02/12/2024",
                number: "2",             
                day: "MON",
                label: "Meeting",
                timeSlots: [{ startTime: "10:00", endTime: "11:30"}],
                componentFormatter:
                markRaw(defineComponent({
                    components: {
                      UpdateIcon,
                      DeleteIcon
                    },

                    props: {
                      item: {},
                    },

                    template: ` 
                      <span class="gts-print-calendar-content-actions-icon update-icon" @click=updateItem(item)>  <UpdateIcon /></span> 
                      <span class="gts-print-calendar-content-actions-icon remove-icon" @click=deleteItem(item)>  <DeleteIcon /> </span>`,

                    methods: {
                      updateItem(item) {
                        console.log("updateItem ", item);
                      },

                      deleteItem(item) {
                        console.log("deleteItem ", item);
                      },
                    }


                }))
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
                componentFormatter:
                markRaw(defineComponent({
                    components: {
                      UpdateIcon,
                      DeleteIcon
                    },

                    props: {
                      item: {},
                    },

                    template: ` 
                      <span class="gts-print-calendar-content-actions-icon update-icon" @click=updateItem(item)>  <UpdateIcon /></span> 
                      <span class="gts-print-calendar-content-actions-icon remove-icon" @click=deleteItem(item)>  <DeleteIcon /> </span>`,

                    methods: {
                      updateItem(item) {
                        console.log("updateItem ", item);
                      },

                      deleteItem(item) {
                        console.log("deleteItem ", item);
                      },
                    }


                }))
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
                componentFormatter:
                markRaw(defineComponent({
                    components: {
                      UpdateIcon,
                      DeleteIcon
                    },

                    props: {
                      item: {},
                    },

                    template: ` 
                      <span class="gts-print-calendar-content-actions-icon update-icon" @click=updateItem(item)>  <UpdateIcon /></span> 
                      <span class="gts-print-calendar-content-actions-icon remove-icon" @click=deleteItem(item)>  <DeleteIcon /> </span>`,

                    methods: {
                      updateItem(item) {
                        console.log("updateItem ", item);
                      },

                      deleteItem(item) {
                        console.log("deleteItem ", item);
                      },
                    }


                }))
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
                componentFormatter:
                markRaw(defineComponent({
                    components: {
                      UpdateIcon,
                      DeleteIcon
                    },

                    props: {
                      item: {},
                    },

                    template: ` 
                      <span class="gts-print-calendar-content-actions-icon update-icon" @click=updateItem(item)>  <UpdateIcon /></span> 
                      <span class="gts-print-calendar-content-actions-icon remove-icon" @click=deleteItem(item)>  <DeleteIcon /> </span>`,

                    methods: {
                      updateItem(item) {
                        console.log("updateItem ", item);
                      },

                      deleteItem(item) {
                        console.log("deleteItem ", item);
                      },
                    }


                }))
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
        ],
      },
      },

      selectedDay : null,

      actions: [
        {
          title: "Edit",
          onClick: () => {
            console.log("CalendarExample - Edit action - selectedDay", this.selectedDay);
          }
        },
        {
          title: "Delete",
          onClick: () => {
            console.log("CalendarExample - Delete action - selectedDay", this.selectedDay);
          }
        },
         
      ],

    };
  },

  methods: {

    handleDateIncremented() {
      console.log('Date incremented');
    },

    handleDateDecremented() {
      console.log('Date decremented');
    },

    handleDisplayTypeSelected(displayType) {
      console.log('Display type selected:', displayType);
      if (displayType === CALENDARS_MONTH_TYPE) {
        this.calendarContentConfig.selectedCalendarComponent = 'CalendarMonthly';
      } else if (displayType === CALENDARS_WEEK_TYPE) {
        this.calendarContentConfig.selectedCalendarComponent = 'CalendarWeekly';
      }
    },

    selectDay(selectedDay){
      this.selectedDay = selectedDay;
    },

  }

}

</script>

<style lang="scss">


.calendar-content-test {
  background-color: green;
}

</style>