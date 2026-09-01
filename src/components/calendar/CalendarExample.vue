<template>

  <div id="calendar-exemple-container">

    <div class="gts-calendar-demo-toolbar"
      style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
      <div>
        <strong>Language / اللغة: </strong>
        <button
          :style="{ padding: '6px 12px', marginRight: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: currentLocale === 'en' ? '#0f172a' : '#fff', color: currentLocale === 'en' ? '#fff' : '#000', cursor: 'pointer' }"
          @click="changeLocale('en')">
          English 🇬🇧
        </button>
        <button
          :style="{ padding: '6px 12px', marginRight: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: currentLocale === 'fr' ? '#0f172a' : '#fff', color: currentLocale === 'fr' ? '#fff' : '#000', cursor: 'pointer' }"
          @click="changeLocale('fr')">
          Français 🇫🇷
        </button>
        <button
          :style="{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', background: currentLocale === 'ar' ? '#0f172a' : '#fff', color: currentLocale === 'ar' ? '#fff' : '#000', cursor: 'pointer' }"
          @click="changeLocale('ar')">
          العربية 🇩🇿
        </button>
      </div>

      <div>
        <strong>First Day of Week: </strong>
        <select v-model="selectedFirstDay" style="padding: 6px 12px; border-radius: 4px; border: 1px solid #cbd5e1;">
          <option value="Monday">Monday (Lundi)</option>
          <option value="Sunday">Sunday (Dimanche)</option>
          <option value="Saturday">Saturday (Samedi)</option>
        </select>
      </div>
    </div>

    <h4>1. GTS-CALENDAR : Custom First Day of Week &amp; Default Empty Cell Content</h4>
    <span>Demonstrates <code>firstDayOfWeek="{{ selectedFirstDay }}"</code> and <code>:defaultContent</code> rendering
      custom placeholder on empty cells</span>
    <br><br>
    <CalendarComponent :isStrictMonth="false" :firstDayOfWeek="selectedFirstDay"
      :defaultContent="customDefaultCellComponent" :datesContent="dummyContent" :startingDate="todayDate"
      @onDateChanged="($emit) => console.log('Date changed:', $emit)" />

    <br>
    <hr><br>

    <h4>2. GTS-CALENDAR : Single Day &amp; Month View (Strict Month Display)</h4>
    <span>Demonstrates Today cell highlight, selected year, Day view schedule, and custom Day Type badges</span>
    <br><br>
    <CalendarComponent :isStrictMonth="true" :firstDayOfWeek="selectedFirstDay" :datesContent="dummyContent"
      :startingDate="todayDate" @onDateChanged="($emit) => console.log('Date changed:', $emit)" />

    <br>
    <hr><br>

    <h4>3. PURE CONFIGURABLE CALENDAR : </h4> <br>
    <PureCalendar :headerConfig="headerConfig" :calendarContentConfig="calendarContentConfig"
      :contextMenuActions="actions" @dateIncremented="handleDateIncremented" @dateDecremented="handleDateDecremented"
      @displayTypeSelected="handleDisplayTypeSelected" @daySelected="selectDay" />

  </div>

</template>

<script>

import PureCalendar from './PureCalendar.vue';
import { CALENDARS_TYPES, CALENDARS_MONTH_TYPE, CALENDARS_WEEK_TYPE } from '@/constants/calendars.js';
import UpdateIcon from '@/assets/icons/UpdateIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';
import { defineComponent, markRaw } from 'vue';
import CalendarComponent from './CalendarComponent.vue';
import moment from 'moment';


export default {

  name: "CalendarExample",

  components: {
    CalendarComponent,
    PureCalendar
  },

  data() {
    const todayStr = moment().format('DD/MM/YYYY');

    return {
      selectedFirstDay: 'Saturday',
      currentLocale: 'en',
      todayDate: todayStr,
      customDefaultCellComponent: markRaw(defineComponent({
        props: ['day'],
        template: `
          <div class="gts-demo-default-cell" @click.stop="onAddSlot">
            <span class="gts-demo-plus-icon">+</span>
            <span class="gts-demo-slot-text">Add Slot</span>
          </div>
        `,
        methods: {
          onAddSlot() {
            alert(`Add event on ${this.day ? this.day.date : 'this day'}`);
          }
        }
      })),
      dummyContent: [
        {
          date: todayStr,
          dayType: 'Conference',
          content: markRaw(defineComponent({
            components: { UpdateIcon, DeleteIcon },
            template: `
              <div class="gts-demo-event-card">
                <div class="gts-demo-event-title">Quarterly Product & Strategy Review</div>
                <div class="gts-demo-event-meta">09:00 AM - 11:30 AM | Executive Boardroom</div>
                <div class="gts-demo-event-actions">
                  <span class="gts-print-calendar-content-actions-icon update-icon" @click="updateItem"><UpdateIcon /></span>
                  <span class="gts-print-calendar-content-actions-icon remove-icon" @click="deleteItem"><DeleteIcon /></span>
                </div>
              </div>
            `,
            methods: {
              updateItem() { console.log("Update event clicked"); },
              deleteItem() { console.log("Delete event clicked"); }
            }
          }))
        },
        {
          date: moment().add(2, 'days').format('DD/MM/YYYY'),
          dayType: 'Holiday',
          content: markRaw(defineComponent({
            template: `
              <div class="gts-demo-event-card">
                <div class="gts-demo-event-title">National Holiday & Corporate Outing</div>
                <div class="gts-demo-event-meta">All Day Event | Company Holiday</div>
              </div>
            `
          }))
        },
        {
          date: moment().add(5, 'days').format('DD/MM/YYYY'),
          content: markRaw(defineComponent({
            methods: {
              onClick() {
                alert("Content clicked !");
              }
            },
            template: `<div class="calendar-content-test" @click="onClick">Client Presentation (Today + 5 days)</div>`
          }))
        },
        {
          date: moment().subtract(3, 'days').format('DD/MM/YYYY'),
          dayType: 'Workshop',
          content: markRaw(defineComponent({
            template: `<div>Design System & Component Architecture Workshop</div>`
          }))
        },
        {
          date: moment().add(10, 'days').format('DD/MM/YYYY'),
          content: markRaw(defineComponent({
            template: `<div>Sprint Retrospective & Release Planning</div>`
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
                  { startTime: "09:00", endTime: "10:30" },
                  { startTime: "14:00", endTime: "15:30" },
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
                timeSlots: [{ startTime: "10:00", endTime: "11:30" }],
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
                timeSlots: [
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
                timeSlots: [
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
                timeSlots: [
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
                timeSlots: [],
              },
              {
                date: "07/12/2024",
                name: "SAT",
                number: "7",
                label: "Holiday",
                timeSlots: [],
              },
            ],
          ],
        },
      },

      selectedDay: null,

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

    selectDay(selectedDay) {
      this.selectedDay = selectedDay;
    },

    changeLocale(lang) {
      this.currentLocale = lang;
      if (this.$i18n) {
        if (typeof this.$i18n.locale === 'object' && this.$i18n.locale.value !== undefined) {
          this.$i18n.locale.value = lang;
        } else {
          this.$i18n.locale = lang;
        }
      }
      if (typeof moment.locale === 'function') {
        moment.locale(lang);
      }
    }

  }

}

</script>

<style lang="scss">
.calendar-content-test {
  background-color: green;
}

.gts-demo-default-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: $neutral-color-100;
  border: 1px dashed $neutral-color-300;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  color: $neutral-color-600;

  &:hover {
    background: $primary-color-50;
    border-color: $primary-color-400;
    color: $primary-color-700;
  }

  .gts-demo-plus-icon {
    font-weight: bold;
    font-size: 14px;
    color: $primary-color-600;
  }
}

.gts-demo-event-card {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .gts-demo-event-title {
    font-size: 14px;
    font-weight: 600;
    color: $primary-color-700;
  }

  .gts-demo-event-meta {
    font-size: 12px;
    color: $neutral-color-500;
  }

  .gts-demo-event-actions {
    display: flex;
    gap: 8px;
    margin-top: 6px;
  }
}
</style>