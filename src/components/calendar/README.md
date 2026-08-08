# CalendarComponent Documentation

## Introduction

The `CalendarComponent` is a feature-rich, configurable calendar that supports monthly and weekly views. It manages date navigation, event rendering, selected year displays, "Today" cell highlighting, and day type badges following the GTS design system.

## Components

This package includes:
- `CalendarComponent`: Main wrapper component managing calendar logic, state, and grid generation.
- `PureCalendar`: Presentational component rendering the header and active calendar view.
- `CalendarHeader`: Header navigation component with date range display, year badge, date picker, and view type selectors.
- `CalendarMonthly` / `CalendarMonthlyInfo`: Grid display for monthly view with day cells and context actions.
- `CalendarWeekly` / `CalendarWeeklyInfo`: Row display for weekly view.

## Features & Enhancements

### 1. Selected Year Display
- Displays the 4-digit year format (e.g. `01 May 2026 - 31 May 2026`) in the calendar header date range.
- Shows a **Selected Year** badge (`BadgeComponent` with `gts-badge-primary` theme) when picking or navigating dates.

### 2. "Today" Visual Marker & Highlighting
- Automatically compares date cells with the current date (`moment()`).
- Applies `.gts-today-cell` styling and renders a visual **Today** badge (`BadgeComponent` with `gts-badge-danger` theme) on current date cells in both monthly and weekly views.

### 3. Day Type Badge Display
- Automatically resolves and displays day types (**Weekday** vs. **Weekend**) for each calendar day using `BadgeComponent`.
- Supports custom day types (e.g., `Holiday`, `Ferie`) provided via `datesContent` items.
- Mapped to GTS design system badge themes (`gts-badge-primary` for Weekdays, `gts-badge-warning` for Weekends, `gts-badge-danger` for Holidays).

## Props

### CalendarComponent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `startingDate` | `String` | No | Current Date | Initial date to display (format: `DD/MM/YYYY`). |
| `datesContent` | `Array` | No | `[]` | Array of date content/event objects. |
| `isStrictMonth` | `Boolean` | No | `false` | When `true`, hides days outside the active month in monthly view. |

### `datesContent` Structure

Each item in `datesContent` should look like this:

```javascript
{
  date: "DD/MM/YYYY",  // The date to associate content with
  dayType: "Holiday",  // Optional custom day type string (e.g., 'Holiday', 'Ferie')
  content: "Content"   // Content to display (Vue component, template, or string)
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onDateChanged` | `{ firstCalendarDate, lastCalendarDate }` | Emitted when the visible date range changes. |
| `onClendarTypeChanged` | `type` (`String`) | Emitted when calendar view mode changes (`Month` vs `Week`). |

## Usage Examples

### Basic Usage with Events and Custom Day Types

```vue
<template>
  <CalendarComponent 
    startingDate="15/05/2026"
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
        { date: '15/05/2026', content: 'Quarterly Planning' },
        { date: '18/05/2026', dayType: 'Holiday', content: 'National Holiday' }
      ]
    };
  },
  methods: {
    handleDateChange(range) {
      console.log('Active date range:', range);
    }
  }
};
</script>
```
