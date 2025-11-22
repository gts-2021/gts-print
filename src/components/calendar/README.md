# CalendarComponent Documentation

## Introduction

The `CalendarComponent` is a versatile calendar that supports monthly and weekly views. It allows for displaying events, managing date selection, and customizing the header and content.

## Components

This package includes:
- `CalendarComponent`: The main wrapper component that handles logic and state.
- `PureCalendar`: The presentational component that renders the calendar grid and header.

## Props

### CalendarComponent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `startingDate` | `String` | No | Current Date | The initial date to display (format: `DD/MM/YYYY`). |
| `datesContent` | `Array` | No | `[]` | Array of objects containing date content/events. |

### datesContent Structure

Each item in `datesContent` should look like this:

```javascript
{
  date: "DD/MM/YYYY", // The date to associate content with
  content: "Some content" // Content to display (can be a component or string)
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onDateChanged` | `{ firstCalendarDate, lastCalendarDate }` | Emitted when the visible date range changes (e.g., navigating to next month). |
| `onClendarTypeChanged` | `type` (String) | Emitted when the calendar view type changes (e.g., 'Month' to 'Week'). |

## Usage Examples

### Basic Usage

```vue
<template>
  <CalendarComponent 
    :startingDate="'01/01/2024'"
    :datesContent="events"
    @onDateChanged="handleDateChange"
  />
</template>

<script>
import CalendarComponent from '@/components/calendar/CalendarComponent.vue';

export default {
  components: { CalendarComponent },
  data() {
    return {
      events: [
        { date: '15/01/2024', content: 'Meeting' },
        { date: '20/01/2024', content: 'Holiday' }
      ]
    };
  },
  methods: {
    handleDateChange(range) {
      console.log('Date range changed:', range);
    }
  }
};
</script>
```

## Configuration Details

The component internally manages `headerConfig` and `calendarContentConfig` to control the display.
- **Header Config**: Manages the current date range display and view type selector.
- **Content Config**: Manages the grid generation for days and weeks.
