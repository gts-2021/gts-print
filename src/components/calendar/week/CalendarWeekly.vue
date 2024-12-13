<template>

  <div class="gts-print-calendar-weekly-container">

    <div class="gts-print-calendar-weekly-content" v-for="(day, index) in week" :key="day" :class="getContentCssClass[index]">

      <CalendarWeeklyInfo :calendarDay="day" :selectedDay="selectedDay" @daySelected="selectDay(day)"/>
    
    </div>

  </div>
  
</template>

<script>
import { defineComponent, markRaw} from 'vue';
import UpdateIcon from '@/assets/icons/UpdateIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

import CalendarWeeklyInfo from "./CalendarWeeklyInfo";

export default {

  name: "CalendarWeekly",

  components: {
    CalendarWeeklyInfo
  },

  props: { 

  },

  data () {
    return {
      selectedDay: null,
      week:[
        {
        
          name: "SUN",
          number: "1",
          label: "Consultation",
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
         
          name:"MON",
          number:"2",
          label:"Change of panel",
          timeSlots:[
            {
              startTime: "09:00",
              endTime: "10:30",
            },
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
        
        name: "THUR",
        number: "6",
        label: "Holiday",
        timeSlots:[],
        },
      ],
    }
  },

  computed: {
    getContentCssClass() {
      return this.week.map(day => {
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


  .gts-print-calendar-weekly-content{

    display: flex;
    align-content: center;
    justify-content: space-between;
    border: 1px solid $neutral-color-200;
    padding: 16px;
    gap: 30px;
    border-radius: 12px;
    margin: 10px;
    cursor: pointer;
    
  }

}

    
</style>