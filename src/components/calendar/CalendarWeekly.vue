<template>

  <div class="gts-print-calendar-weekly-container">

    <div class="gts-print-calendar-weekly-content" v-for="day in week" :key="day" :class="getContentCssClass(day)">

      <div class="gts-print-calendar-weekly-left" @click="selectDay(day)">
        
        <div class="gts-print-calendar-weekly-content-day" >
          <span class="day-name"> {{day.name}} </span>
          <span class="day-number"> {{ day.number }}</span>
        </div>

        <div class="gts-print-calendar-weekly-content-separator"></div>

        <div v-if="day.timeSlots.length > 0" class="gts-print-calendar-weekly-content-data">
      
          <span class="gts-print-calendar-weekly-content-data-label"> {{ day.label }} </span>
          
          <div class="gts-print-calendar-weekly-content-data-timeslots">
            <div class="gts-print-calendar-weekly-content-data-timeslot" v-for="timeSlot in day.timeSlots" :key="timeSlot">
              <span class="time-slot-text"> {{timeSlot}}  </span>
            </div>
          </div>
          
        </div>

        <div v-else class="gts-print-calendar-weekly-content-data not-working" >
          
          <span class="gts-print-calendar-weekly-content-data-label"> {{ day.label }} </span>
          
        </div>

      </div>
     
      <div  v-if="selectedDay === day" class="gts-print-calendar-weekly-content-actions">
        <component :item="day" :is="day.componentFormatter"></component>
      </div>
    
    </div>

  </div>
  
</template>

<script>
import { defineComponent, markRaw} from 'vue';
import UpdateIcon from '@/assets/icons/UpdateIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

export default {

  name: "CalendarWeekly",

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
          timeSlots:["09:00-10:30", "14:00-15:30"],
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
          timeSlots:["09:00-10:30", "14:00-15:30"],
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

  methods : {

    selectDay(day){
      if(day.timeSlots.length>0)
        this.selectedDay = day;
    },

    getContentCssClass(day){
      if(this.selectedDay === day)
       return 'selected'

       if(day.timeSlots.length == 0)
       return 'light-gray'
    }
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

    .gts-print-calendar-weekly-left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 20px;

      .gts-print-calendar-weekly-content-day{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        padding: 9px 20px;
        background: $neutral-color-100;
        line-height: 20px;
     
        .day-name{
          font-weight: 400;
          font-size: 14px;
          color: $neutral-color-700;
        }

        .day-number{
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

      
      .gts-print-calendar-weekly-content-data.not-working{
        
        width: 100%;
        display: flex;
        align-items: center;

        .gts-print-calendar-weekly-content-data-label{
          background: $neutral-color-200;
          color: $neutral-color-800;
          border-radius: 4px;
          padding: 20px 80px;
          display: flex;
          justify-content: center;
          align-items: center;
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

    .gts-print-calendar-weekly-content-day {
      background: $color-white;
    }
  }

  .gts-print-calendar-weekly-content.light-gray{
    background: $neutral-color-50;
  }
  
}

    
</style>