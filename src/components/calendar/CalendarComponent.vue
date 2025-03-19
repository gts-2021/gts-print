<template>

  <PureCalendar :headerConfig="headerConfig" :calendarContentConfig="calendarContentConfig"
    @dateIncremented="showNextCalendarIntervalPage" @dateDecremented="showPreviousCalendarIntervalPage"
    @displayTypeSelected="handleDisplayTypeSelected" @dateSelected="onDateSelected" @todayClicked="onDateSelected" />

</template>

<script>
import { CALENDARS_MONTH_TYPE, CALENDARS_TYPES } from '@/constants/calendars';
import PureCalendar from './PureCalendar.vue';
import moment from 'moment';




export default {

  name: "CalendarComponent",

  components: {
    PureCalendar
  },
  emits: ['onDateChanged'],

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
        selectedCalendarComponent: 'CalendarMonthly',
        calendarData: {},
      },
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
      } else {
        startOfCalendar = currentDate.clone().startOf('week');
        endOfCalendar = currentDate.clone().endOf('week');
      }

      this.headerConfig.startDate = startOfCalendar.format('DD MMM');
      this.headerConfig.endDate = endOfCalendar.format('DD MMM');

      // Générer toutes les dates dans cette plage
      let calendarRange = [];
      let day = startOfCalendar.clone();
      for (day; day.isBefore(endOfCalendar) || day.isSame(endOfCalendar, 'day'); day.add(1, 'days')) {

        let dateContent = this.datesContent.find(dateContent => dateContent.date == day.format(this.dateFormat));

        let content = dateContent ? dateContent.content : undefined;

        calendarRange.push(
          {
            date: day.format(this.dateFormat),
            number: day.format('DD'),
            day: day.format('ddd').toUpperCase(),
            label: "NO EVENT",
            disabled: true,
            content
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
      } else {
        dateToGenerate = this.selectedStartDate.startOf('week').add(1, 'weeks');

      }
      this.onDateSelected(dateToGenerate);
    },
    showPreviousCalendarIntervalPage() {
      let type = this.headerConfig.defaultType;

      let dateToGenerate = undefined;

      if (type == CALENDARS_MONTH_TYPE) {
        dateToGenerate = this.selectedStartDate.startOf('month').add(-1, 'months');
      } else {
        dateToGenerate = this.selectedStartDate.startOf('week').add(-1, 'weeks');

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
        this.calendarContentConfig.selectedCalendarComponent = 'CalendarMonthly';
      } else {
        this.calendarContentConfig.selectedCalendarComponent = 'CalendarWeekly';

      }
      this.onDateSelected(this.selectedStartDate);
    },

    onDateSelected(selectedDate) {
      this.selectedStartDate = moment(selectedDate);
      this.generateCalendarPage(this.selectedStartDate);
      this.$emit("onDateChanged", this.getFirstAndLastCalendarDates())

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