<template>

    <PureCalendar 
    :headerConfig="headerConfig" 
    :calendarContentConfig="calendarContentConfig"
    :contextMenuActions="actions"
    @dateIncremented="showNextCalendarIntervalPage"
    @dateDecremented="showPreviousCalendarIntervalPage"
    @displayTypeSelected="handleDisplayTypeSelected" 
    @dateSelected="onDateSelected" 
    @todayClicked="onDateSelected"
    @daySelected="selectDay"
  />

</template>

<script>
import { CALENDAR_DAILY, CALENDAR_MONTHLY, CALENDAR_WEEKLY, CALENDARS_DAY_TYPE, CALENDARS_MONTH_TYPE, CALENDARS_TYPES, CALENDARS_WEEK_TYPE } from '@/constants/calendars';
import PureCalendar from './PureCalendar.vue';
import moment from 'moment';


export default {

  name: "CalendarComponent",

  components: {
    PureCalendar
  },
  emits: ['onDateChanged', 'onClendarTypeChanged'],

  created() {

    if (this.startingDate) {
      this.selectedStartDate = moment(this.startingDate, this.dateFormat);
    }

    this.setUpDaysOfTheWeek();

    this.onDateSelected(this.selectedStartDate)

  },

  props: {
    startingDate: {
      type: String,
      required: false,
      default: moment().format('DD/MM/YYYY')
    },
    datesContent: {
      type: Array,
      required: false,
      default: Array.of()
    },
    isStrictMonth: {
      type: Boolean,
      required: false,
      default: false

    }

  },

  data() {
    return {
      dateFormat: 'DD/MM/YYYY',

      selectedStartDate: moment(),

      headerConfig: {
        calendarTypes: CALENDARS_TYPES,
        defaultType: CALENDARS_MONTH_TYPE,
      },

      calendarContentConfig: {
        selectedCalendarComponent: CALENDAR_MONTHLY,
        calendarData: {},
      },

      selectedDay: null,

      actions: [
        {
          title: "Edit",
          onClick: () => {
            console.log("CalendarComponent - Edit action - selectedDay", this.selectedDay);

          }
        },
        {
          title: "Delete",
          onClick: () => {
            console.log("Delete - selectedDay", this.selectedDay);
          }
        },
         
      ],
    }
  },

  methods: {

    setUpDaysOfTheWeek() {
      const currentDate = moment();

      const startOfWeek = currentDate.clone().startOf('week');

      // Dernier jour de la semaine (samedi)
      const endOfWeek = currentDate.clone().endOf('week');
      // Affichage des noms des jours de la semaine
      let daysOfWeek = [];
      for (let day = startOfWeek; day.isBefore(endOfWeek) || day.isSame(endOfWeek, 'day'); day.add(1, 'days')) {
        daysOfWeek.push(day.format('ddd').toUpperCase());  // Format du jour (ex: 'Sun', 'Mon', etc.)
      }


      this.calendarContentConfig.calendarData
        .weekDays = daysOfWeek;
    },

    generateCalendarPage(from) {

      const currentDate = from;

      let startOfCalendar = undefined;
      let endOfCalendar = undefined;

      if (this.headerConfig.defaultType == CALENDARS_MONTH_TYPE) {
        startOfCalendar = currentDate.clone().startOf('month').startOf('week');
        endOfCalendar = currentDate.clone().endOf('month').endOf('week');
      } else if (this.headerConfig.defaultType == CALENDARS_WEEK_TYPE) {
        startOfCalendar = currentDate.clone().startOf('week');
        endOfCalendar = currentDate.clone().endOf('week');
      } else {
        startOfCalendar = currentDate.clone().startOf('day');
        endOfCalendar = currentDate.clone().startOf('day');
      }

      if (this.headerConfig.defaultType == CALENDARS_DAY_TYPE) {
        this.headerConfig.startDate = currentDate.format('DD MMM YYYY');
        this.headerConfig.endDate = currentDate.format('DD MMM YYYY');
      } else if (this.isStrictMonth && this.headerConfig.defaultType == CALENDARS_MONTH_TYPE) {
        this.headerConfig.startDate = currentDate.clone().startOf('month').format('DD MMM YYYY');
        this.headerConfig.endDate = currentDate.clone().endOf('month').format('DD MMM YYYY');
      } else {
        this.headerConfig.startDate = startOfCalendar.format('DD MMM YYYY');
        this.headerConfig.endDate = endOfCalendar.format('DD MMM YYYY');
      }
      this.headerConfig.selectedYear = currentDate.format('YYYY');

      // Générer toutes les dates dans cette plage
      let calendarRange = [];
      let day = startOfCalendar.clone();
      const today = moment();
      for (day; day.isBefore(endOfCalendar) || day.isSame(endOfCalendar, 'day'); day.add(1, 'days')) {

        let dateContent = this.datesContent.find(dateContent => dateContent.date == day.format(this.dateFormat));

        let content = dateContent ? dateContent.content : undefined;

        // Check if the day is outside the current month (for monthly view)
        let isOutsideMonth = false;
        if (this.headerConfig.defaultType == CALENDARS_MONTH_TYPE) {
             isOutsideMonth = !day.isSame(currentDate, 'month');
        }

        let isEmpty = this.isStrictMonth && isOutsideMonth;
        let isToday = day.isSame(today, 'day');
        let dayType = (dateContent && dateContent.dayType) ? dateContent.dayType : null;

        calendarRange.push(
          {
            date: day.format(this.dateFormat),
            number: day.format('DD'),
            day: day.format('ddd').toUpperCase(),
            name: day.format('ddd').toUpperCase(),
            label: "NO EVENT",
            disabled: true,
            content,
            isEmpty,
            isToday,
            dayType,
            year: day.format('YYYY'),
          }
        );
      }

      this.calendarContentConfig
        .calendarData
        .calendars = this.chunkArray(calendarRange, 7);

    },

    chunkArray(array, size) {
      return array.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(array.slice(i, i + size));
        return acc;
      }, []);
    },
    showNextCalendarIntervalPage() {
      let type = this.headerConfig.defaultType;
      let dateToGenerate = undefined;

      if (type == CALENDARS_MONTH_TYPE) {
        dateToGenerate = this.selectedStartDate.startOf('month').add(1, 'months');
      } else if (type == CALENDARS_WEEK_TYPE) {
        dateToGenerate = this.selectedStartDate.startOf('week').add(1, 'weeks');
      } else {
        dateToGenerate = this.selectedStartDate.startOf('day').add(1, 'days');
      }
      this.onDateSelected(dateToGenerate);
    },
    showPreviousCalendarIntervalPage() {
      let type = this.headerConfig.defaultType;

      let dateToGenerate = undefined;

      if (type == CALENDARS_MONTH_TYPE) {
        dateToGenerate = this.selectedStartDate.startOf('month').add(-1, 'months');
      } else if (type == CALENDARS_WEEK_TYPE) {
        dateToGenerate = this.selectedStartDate.startOf('week').add(-1, 'weeks');
      } else {
        dateToGenerate = this.selectedStartDate.startOf('day').add(-1, 'days');
      }
      
      this.onDateSelected(dateToGenerate);
    },

    getFirstAndLastCalendarDates() {
      let calendarGeneratedDates = this.calendarContentConfig
        .calendarData
        .calendars;

      let firstCalendarWeek = calendarGeneratedDates[0];
      let firstCalendarDate = firstCalendarWeek[0].date;

      let lastCalendarWeek = calendarGeneratedDates[calendarGeneratedDates.length - 1];
      let lastCalendarDate = lastCalendarWeek[lastCalendarWeek.length - 1].date;

      return { firstCalendarDate, lastCalendarDate }

    },
    handleDisplayTypeSelected(type) {
      this.headerConfig.defaultType = type;

      if (type == CALENDARS_MONTH_TYPE) {
        this.calendarContentConfig.selectedCalendarComponent = CALENDAR_MONTHLY;
      } else if (type == CALENDARS_WEEK_TYPE) {
        this.calendarContentConfig.selectedCalendarComponent = CALENDAR_WEEKLY;
      } else if (type == CALENDARS_DAY_TYPE) {
        this.calendarContentConfig.selectedCalendarComponent = CALENDAR_DAILY;
      }

      this.$emit("onClendarTypeChanged", this.calendarContentConfig.selectedCalendarComponent)

      this.onDateSelected(this.selectedStartDate);
    },

    onDateSelected(selectedDate) {
      this.selectedStartDate = moment(selectedDate);
      this.generateCalendarPage(this.selectedStartDate);
      this.$emit("onDateChanged", this.getFirstAndLastCalendarDates())

    },

    selectDay(selectedDay){
      this.selectedDay = selectedDay;
    },


  },

  watch: {
    datesContent() {
      this.generateCalendarPage(this.selectedStartDate);
    }

  },

}
</script>

<style lang="scss"></style>