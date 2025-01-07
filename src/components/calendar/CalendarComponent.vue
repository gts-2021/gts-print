<template>

  <div class="">
    
    <!-- calendar header -->
    <CalendarHeader :startDate="'08 dec'" :endDate="'12 dec'" 
      :calendarTypes="calendarTypes" 
      :defaultType="defaultType"
      @dateIncremented="incrementDate"
      @dateDecremented="decrementDate"
      @dispalyTypeSelected="displayCalendar"
    />

    <!-- dynamic display -->
    <component 
      :is="selectedCalendarComponent" 
      :calendarData="calendarData"
    />

  </div>
    
</template>

<script>

import {CALENDARS_TYPES, CALENDARS_MONTH_TYPE, CALENDARS_WEEK_TYPE } from '@/constants/calendars.js';
import CalendarHeader from './CalendarHeader.vue';
import CalendarMonthly from './month/CalendarMonthly.vue';
import CalendarWeekly from './week/CalendarWeekly.vue';
import { defineComponent, markRaw} from 'vue';
import UpdateIcon from '@/assets/icons/UpdateIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

export default {

  name: "CalendarComponent",

  components: {
    CalendarHeader,
    CalendarMonthly,
    CalendarWeekly,

  },

  props: { 

  },

  data () {
    return {
      calendarTypes : CALENDARS_TYPES,
      defaultType : CALENDARS_MONTH_TYPE,
      selectedCalendarComponent:'CalendarMonthly',
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

    }
  },

  methods : {

    displayCalendar(displayType){
      switch (displayType) {
        case CALENDARS_MONTH_TYPE:
          this.selectedCalendarComponent = 'CalendarMonthly';
          break;
        case CALENDARS_WEEK_TYPE:
          this.selectedCalendarComponent = 'CalendarWeekly';
          break;

      }

    },

    incrementDate(){
      console.log("incrementDate");
    },

    decrementDate(){
      console.log("decrementDate");
    },

  }

}
</script>

<style lang="scss">


</style>