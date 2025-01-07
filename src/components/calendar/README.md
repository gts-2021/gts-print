# `CalendarComponent` Documentation

## Introduction

The `CalendarComponent` component is designed for displaying calendar data and `CalendarHeader` acocrding to a specific properties,
the aim of this component is to display a data on three diffrent display mode `Month`, `Week`, `Day`,


## Props

| Prop                      | Type    | Required  | Default                       | Description                                                    |
|---------------------------|---------|-----------|-------------------------------|----------------------------------------------------------------|
| `headerConfig`            | Object  | Yes       | `see default values section`  | Its represent calendar header configuration                    |
| `calendarContentConfig`   | Object  | Yes       | `see default values section ` | Its represent calendar data content and default caledar display|

### Events

| Event                   | Description                                        |
|-------------------------|----------------------------------------------------|
| `@dateIncremented`      | Emitted when header next button is clicked.        |
| `@onDateDecremented`    | Emitted when header previous button is clicked.    |
| `@dispalyTypeSelected`  | Emitted when we change calendar display Type       |


### Default Vales

 headerConfig: {
    startDate: '',
    endDate: '',
    calendarTypes: [],
    defaultType: '',
  },
    
  calendarContentConfig: {
    selectedCalendarComponent: 'CalendarMonthly',
    calendarData: {},
  },


### Details

The `calendarTypes` accept and array of diffrent type example : `["Month", "Week", "Day"]`
The `defaultType` accept one of the three different type `"Month", "Week" or "Day"`
The `selectedCalendarComponent` represent the component to display and its accept one of the three different component  `"CalendarMonthly", "CalendarWeekly" or "CalendarDaily"`
The `calendarData` contain a list of `weekDays` to be displayed as header example `["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]`,
it containt a `calendars` list which is a 2D table and each table reprensent one week example :  

calendars: [
    [
      {
        date: "06/12/2024",
        name: "SUN",
        number: "6",
        label: "Holiday",
        timeSlots: [
          { startTime: "09:00", endTime: "10:30"},
          { startTime: "14:00", endTime: "15:30"},
        ],
      },
      {
        date: "07/12/2024",
        name: "MON",
        number: "7",
        label: "Holiday",
        timeSlots: [
          { startTime: "09:00", endTime: "10:30"},
        ],
      },
      ...
    ],
  ],

### Usage

```vue
  <CalendarComponent 
    :headerConfig="headerConfig"
    :calendarContentConfig="calendarContentConfig"
    @dateIncremented="handleDateIncremented"
    @dateDecremented="handleDateDecremented"
    @displayTypeSelected="handleDisplayTypeSelected"
  />

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
```
