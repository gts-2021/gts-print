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

    <h4>1. GTS-CALENDAR : Custom First Day of Week, Default Empty Cell Content &amp; Cell Actions (3-dots ContextMenu)</h4>
    <span>Demonstrates <code>firstDayOfWeek="{{ selectedFirstDay }}"</code>, <code>:defaultContent</code>, and <code>:actions="actions"</code> rendering the 3-dots ContextMenu button on each cell</span>
    <br><br>
    <CalendarComponent :isStrictMonth="false" :firstDayOfWeek="selectedFirstDay"
      :defaultContent="customDefaultCellComponent" :datesContent="dummyContent" :startingDate="todayDate"
      :actions="actions"
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

    <br><hr><br>
    <h4>4. WEEK WITH HOURS : Calcul automatique de hauteur et positionnement (day.slots)</h4>
    <p>Affichage de créneaux horaires par intervalle avec calcul automatique de la hauteur et du positionnement vertical selon <code>startTime</code> et <code>endTime</code>.</p>
    <CalendarComponent ref="hourlyWeek" :displayTimes="true" :startTime="8" :endTime="20" :firstDayOfWeek="selectedFirstDay"
      :startingDate="todayDate" :datesContent="hourlyDemoContent" />

    <br><hr><br>
    <h4>5. DAY WITH HOURS : Créneaux horaires d'une journée (08:00–18:00)</h4>
    <p>Vue journalière avec créneaux temporels personnalisés, calcul automatique de la hauteur et guide interactif au survol.</p>
    <CalendarComponent ref="hourlyDay" :displayTimes="true" :startTime="8" :endTime="18"
      timeGridClass="sector-time-grid" :hourHeight="140"
      :startingDate="todayDate" :datesContent="hourlyDemoContent" />
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

const appointmentSlotComponent = markRaw(defineComponent({
  props: ['slot', 'day', 'startTime', 'endTime', 'hourHeight'],
  template: `
    <div class="gts-demo-slot-card appointment" @click.stop="onClick">
      <div class="gts-demo-slot-time">⏱️ {{ startTime }} – {{ endTime }}</div>
      <div class="gts-demo-slot-title">{{ slot.title || 'Client Consultation' }}</div>
      <div class="gts-demo-slot-meta">{{ slot.subtitle || 'Salle 102 • Dr. Martin' }}</div>
    </div>
  `,
  methods: {
    onClick() {
      alert(`Créneau sélectionné: ${this.slot.title} (${this.startTime} - ${this.endTime})`);
    }
  }
}));

const urgentSlotComponent = markRaw(defineComponent({
  props: ['slot', 'day', 'startTime', 'endTime', 'hourHeight'],
  template: `
    <div class="gts-demo-slot-card urgent" @click.stop="onClick">
      <div class="gts-demo-slot-time">🚨 {{ startTime }} – {{ endTime }}</div>
      <div class="gts-demo-slot-title">{{ slot.title || 'Urgence / Intervention' }}</div>
      <div class="gts-demo-slot-meta">{{ slot.subtitle || 'Bloc Opératoire 3' }}</div>
    </div>
  `,
  methods: {
    onClick() {
      alert(`Créneau d'urgence: ${this.slot.title} (${this.startTime} - ${this.endTime})`);
    }
  }
}));

const consultationSlotComponent = markRaw(defineComponent({
  props: ['slot', 'day', 'startTime', 'endTime', 'hourHeight'],
  template: `
    <div class="gts-demo-slot-card consultation" @click.stop="onClick">
      <div class="gts-demo-slot-time">📋 {{ startTime }} – {{ endTime }}</div>
      <div class="gts-demo-slot-title">{{ slot.title || 'Suivi Dossier' }}</div>
      <div class="gts-demo-slot-meta">{{ slot.subtitle || 'Visioconférence' }}</div>
    </div>
  `,
  methods: {
    onClick() {
      alert(`Suivi sélectionné: ${this.slot.title} (${this.startTime} - ${this.endTime})`);
    }
  }
}));

export default {

  name: "CalendarExample",

  components: {
    CalendarComponent,
    PureCalendar
  },

  data() {
    const todayStr = moment().format('DD/MM/YYYY');

    return {
      hourlyDemoContent: [
        {
          date: todayStr,
          slots: [
            {
              startTime: '08:30',
              endTime: '10:00',
              title: 'Revue Stratégique',
              subtitle: 'Salle de réunion A',
              component: appointmentSlotComponent,
            },
            {
              startTime: '10:30',
              endTime: '12:00',
              title: 'Urgence Technique',
              subtitle: 'Intervention serveur',
              component: urgentSlotComponent,
            },
            {
              startTime: '13:30',
              endTime: '15:15',
              title: 'Consultation Client',
              subtitle: 'Dr. Martin - Cabinet',
              component: consultationSlotComponent,
            },
            {
              startTime: '16:00',
              endTime: '17:30',
              title: 'Point d\'équipe',
              subtitle: 'Visioconférence',
              component: appointmentSlotComponent,
            },
          ],
        },
        {
          date: moment().add(1, 'days').format('DD/MM/YYYY'),
          slots: [
            {
              startTime: '09:00',
              endTime: '11:00',
              title: 'Workshop Architecture',
              subtitle: 'Design System & Vue 3',
              component: appointmentSlotComponent,
            },
            {
              startTime: '14:00',
              endTime: '15:30',
              title: 'Maintenance Planifiée',
              subtitle: 'Serveurs Cloud',
              component: urgentSlotComponent,
            },
          ],
        },
        {
          date: moment().add(2, 'days').format('DD/MM/YYYY'),
          slots: [
            {
              startTime: '10:00',
              endTime: '11:30',
              title: 'Session Démo Produit',
              subtitle: 'Salle polyvalente',
              component: consultationSlotComponent,
            },
            {
              startTime: '14:30',
              endTime: '16:00',
              title: 'Revue de Sprint',
              subtitle: 'Équipe frontend',
              component: appointmentSlotComponent,
            },
          ],
        },
      ],
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
          title: "Edit Day",
          onClick: (day) => {
            console.log("CalendarExample - Edit action - day", day);
            alert(`Edit action on ${day ? day.date : 'selected day'}`);
          }
        },
        {
          title: "Delete Events",
          onClick: (day) => {
            console.log("CalendarExample - Delete action - day", day);
            alert(`Delete action on ${day ? day.date : 'selected day'}`);
          }
        },
      ],

    };
  },

  mounted() {
    this.$refs.hourlyWeek.handleDisplayTypeSelected(CALENDARS_WEEK_TYPE);
    this.$refs.hourlyDay.handleDisplayTypeSelected('Day');
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
.sector-time-grid {
  --gts-time-max-height: 560px;
  --gts-time-header-background: #edf7f5;
  --gts-time-grid-line: #d9e9e5;
  --gts-time-border: #bdd8d1;
  --gts-time-cursor-color: #187765;
  --gts-time-radius: 8px;
}

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

.gts-demo-slot-card {
  height: 100%;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  &.appointment {
    background: #eef2ff;
    border-left: 4px solid #4f46e5;
    color: #312e81;

    &:hover {
      background: #e0e7ff;
      box-shadow: 0 3px 6px rgba(79, 70, 229, 0.2);
    }
  }

  &.urgent {
    background: #fef2f2;
    border-left: 4px solid #ef4444;
    color: #991b1b;

    &:hover {
      background: #fee2e2;
      box-shadow: 0 3px 6px rgba(239, 68, 68, 0.2);
    }
  }

  &.consultation {
    background: #f0fdf4;
    border-left: 4px solid #10b981;
    color: #065f46;

    &:hover {
      background: #dcfce7;
      box-shadow: 0 3px 6px rgba(16, 185, 129, 0.2);
    }
  }

  .gts-demo-slot-time {
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .gts-demo-slot-title {
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gts-demo-slot-meta {
    font-size: 11px;
    opacity: 0.85;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
