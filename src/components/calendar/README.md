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
- Applies `.gts-today-cell` styling and renders a discreet, small green dot indicator (`.gts-today-mark`) on current date cells across monthly, weekly, and daily views.

### 3. Day Type Badge Display
- Automatically resolves and displays day types (**Weekday** vs. **Weekend**) for each calendar day using `BadgeComponent`.
- Supports custom day types (e.g., `Holiday`, `Ferie`) provided via `datesContent` items.
- Mapped to GTS design system badge themes (`gts-badge-primary` for Weekdays, `gts-badge-warning` for Weekends, `gts-badge-danger` for Holidays).

### 4. Configurable Week Start (`firstDayOfWeek`)
- Allows specifying which day begins the week via `firstDayOfWeek` (e.g. `0` or `'Sunday'`, `1` or `'Monday'`, `6` or `'Saturday'`).
- Dynamically shifts week day columns and calendar interval calculation.

### 5. Default Content for Empty Cells (`defaultContent`)
- Supports providing a default component, function, or template to render for all days without specific `datesContent`.

### 6. Built-in Translations & Localization (i18n)
- Integrated English, French, and Arabic translations for view types (Month/Mois/شهر, Week/Semaine/أسبوع, Day/Jour/يوم), Today button/marker, day names (Sun/Dim/الأحد, Mon/Lun/الإثنين, etc.), context actions, and empty state labels.

### 7. Cell Actions & ContextMenu (3-dots Button)
- A 3-dots action button (`MenuIcon`) can be rendered on calendar cells to trigger a floating `ContextMenu`.
- **Conditional Visibility**: The 3-dots button is **only displayed if an actions list is provided** (either globally via the `actions` / `contextMenuActions` prop on `CalendarComponent`, or per-day via `actions` within a `datesContent` entry).
- When clicked, opens the `ContextMenu` and passes the clicked calendar day data to action callbacks `action.onClick(calendarDay, event)`.

## Props

### Optional hourly display (Week and Day only)

`displayTimes` defaults to `false`, preserving the existing views. Set it to `true`
to show a scrollable hourly grid with sticky day headings and an hour column.
Month view is unchanged. Use the existing header to select Week or Day.

```vue
<CalendarComponent :displayTimes="true" :startTime="8" :endTime="18" :datesContent="events" />
```

- `startTime`: Number, default `0`.
- `endTime`: Number, default `23`, exact closing boundary. No hour is added.
  For a complete 00:00–24:00 day, explicitly pass `endTime="24"` as a number (`:endTime="24"`).
- Both values must be integers between 0 and 24, with start <= end.
  Invalid ranges fall back to 00:00–23:00. Equal values show no time slots.
- The range controls display only, not booking eligibility.

#### Automatic Interval Slot Positioning (`slots`)

Instead of calculating pixel offsets manually, you can supply a `slots` array for each day in `datesContent`. `CalendarTimeGrid` **automatically calculates the vertical position (`top`) and height** for each slot component based on `startTime`, `endTime`, and `hourHeight`:

- Position: `top = (slot.startTime - grid.startTime) * hourHeight`
- Dimension: `height = (slot.endTime - slot.startTime) * hourHeight`

Each `slot` can define:
- `startTime`: String (`"09:00"`, `"9:30"`, `"09h30"`) or Number (`9`, `9.5`).
- `endTime`: String or Number.
- `component`: A Vue component rendered within the slot (takes 100% width and 100% height).
- `title` / `label`: Optional title used in default slot representation if no `component` is given.
- `props`: Optional additional props object passed to the component (`v-bind="slot.props"`).
- `style`: Optional CSS style overrides merged into the slot container.

The slot component automatically receives the following props:
- `slot`: The complete slot object.
- `slotData`: Alias for `slot`.
- `day`: The calendar day object.
- `startTime`: `slot.startTime`.
- `endTime`: `slot.endTime`.
- `hourHeight`: Active pixel height per hour.

#### Overlapping Slots & Hover Expansion
- **Automatic side-by-side layout**: When multiple slots overlap in time on the same day, `CalendarTimeGrid` automatically groups them into clusters and places them in parallel sub-columns. The column width is divided equally between overlapping slots, while each slot strictly retains its own `startTime`, `endTime`, and calculated `height`.
- **Dynamic 90% width on hover**: When hovering over an overlapping slot (`.is-overlapping:hover`), it smoothly expands to **~90% of the day column width** (centered at `left: 5%`) with elevated `z-index` and drop shadow. This enables users to comfortably view truncated titles, badges, and metadata in crowded time slots without leaving the view.

> Legacy support: If a day does not have `slots`, it will fall back to `day.content` (rendered once across the whole day column).

### Hover guide and custom styling

Hover over a day to display a horizontal guide across the columns and the time
at the pointer. It also works over event content and never intercepts clicks.
The guide disappears when leaving the day or scrolling.

`timeGridClass` accepts a Vue class binding (string, array, or object) and is applied
directly to the hourly grid's scroll container. `hourHeight` is a positive number
in pixels (default 64), shared by rows, cursor calculations, and slot sizing.
Use this prop rather than overriding row heights in CSS to keep events aligned.

```vue
<CalendarComponent :displayTimes="true" :startTime="8" :endTime="18"
  :hourHeight="80" timeGridClass="booking-grid" :datesContent="events" />
```

```css
/* Global stylesheet; in a scoped Vue stylesheet use :deep(.booking-grid). */
.booking-grid {
  --gts-time-max-height: 560px;
  --gts-time-header-background: #edf7f5;
  --gts-time-border: #bdd8d1;
  --gts-time-grid-line: #d9e9e5;
  --gts-time-cursor-color: #187765;
  --gts-time-radius: 8px;
}
```

Additional variables: `--gts-time-background`, `--gts-time-text`,
`--gts-time-today-background`, `--gts-time-cursor-text`, `--gts-time-axis-width`,
`--gts-time-day-min-width`, and `--gts-time-header-height`.
Existing `.gts-time-grid-*` classes remain available for more specific overrides
(use `:deep()` when overriding from a scoped consumer stylesheet).

### CalendarComponent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `startingDate` | `String` | No | Current Date | Initial date to display (format: `DD/MM/YYYY`). |
| `datesContent` | `Array` | No | `[]` | Array of date content/event objects. |
| `isStrictMonth` | `Boolean` | No | `false` | When `true`, hides days outside the active month in monthly view. |
| `defaultContent` | `Object \| Function \| String` | No | `null` | Default content/component rendered in cells that have no specific date content. |
| `firstDayOfWeek` | `Number \| String` | No | `0` (Sunday) | Specifies the first day of the week (`0..6` or `'Sunday'`, `'Monday'`, etc.). |
| `defaultLabel` | `String` | No | `null` | Custom label for empty cells (falls back to translated "No Event"). |
| `timeGridClass` | `String \| Array \| Object` | No | `''` | Custom CSS class applied to the scroll container of the hourly time grid. |
| `timeGridContentClass` | `String \| Array \| Object` | No | `''` | Custom CSS class applied directly to the `.gts-time-grid-content` container (for slots and time content). |
| `hourHeight` | `Number` | No | `64` | Row height per hour in pixels for the hourly time grid. |
| `actions` | `Array` | No | `[]` | List of action objects for cell ContextMenu. The 3-dots button is only shown if this array is non-empty. |
| `contextMenuActions` | `Array` | No | `null` | Alias for `actions`. |

### `datesContent` Structure

Each item in `datesContent` should look like this:

```javascript
{
  date: "DD/MM/YYYY",  // The date to associate content with
  dayType: "Holiday",  // Optional custom day type string (e.g., 'Holiday', 'Ferie')
  content: "Content",  // Optional full-cell content (Vue component, template, or string)
  slots: [             // Optional time interval slots with automatic positioning and height
    {
      startTime: "09:00", // 'HH:mm', 'H:mm', '9h30' or numeric (9.5)
      endTime: "10:30",
      title: "Consultation",
      component: SlotComponent, // Vue component rendered inside the slot
      props: { doctor: "Dr. Dupont" }, // Optional props forwarded to component
      style: { background: "#eef2ff" }  // Optional style override
    }
  ]
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `onDateChanged` | `{ firstCalendarDate, lastCalendarDate }` | Emitted when the visible date range changes. |
| `onClendarTypeChanged` | `type` (`String`) | Emitted when calendar view mode changes (`Month` vs `Week`). |

## Usage Examples

### 1. Basic Usage with Events and Custom Day Types

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

### 2. Custom First Day of Week (Monday) & Default Empty Cell Content

```vue
<template>
  <CalendarComponent 
    firstDayOfWeek="Monday"
    :defaultContent="defaultSlotComponent"
    :datesContent="events"
  />
</template>

<script>
import CalendarComponent from '@/components/calendar/CalendarComponent.vue';
import { defineComponent, markRaw } from 'vue';

export default {
  components: { CalendarComponent },
  data() {
    return {
      events: [
        { date: '20/05/2026', content: 'Team Standup' }
      ],
      defaultSlotComponent: markRaw(defineComponent({
        props: ['day'],
        template: '<div class="empty-slot">+ Add Event</div>'
      }))
    };
  }
};
</script>
```

### 3. Calendar with Cell Actions (3-dots ContextMenu)

```vue
<template>
  <CalendarComponent 
    startingDate="15/05/2026"
    :datesContent="events"
    :actions="cellActions"
  />
</template>

<script>
import CalendarComponent from '@/components/calendar/CalendarComponent.vue';

export default {
  components: { CalendarComponent },
  data() {
    return {
      events: [
        { date: '15/05/2026', content: 'Quarterly Planning' }
      ],
      cellActions: [
        {
          title: 'Add Event',
          onClick: (day) => {
            console.log('Add event clicked on day:', day);
          }
        },
        {
          title: 'Clear Day',
          onClick: (day) => {
            console.log('Clear day clicked on day:', day);
          }
        }
      ]
    };
  }
};
</script>
```

### 4. Hourly Grid with Automatic Slot Intervals (`slots`)

```vue
<template>
  <CalendarComponent
    :displayTimes="true"
    :startTime="8"
    :endTime="18"
    :hourHeight="80"
    :datesContent="calendarSchedule"
  />
</template>

<script>
import CalendarComponent from '@/components/calendar/CalendarComponent.vue';
import { defineComponent, markRaw } from 'vue';

const AppointmentCard = markRaw(defineComponent({
  props: ['slot', 'startTime', 'endTime'],
  template: `
    <div style="padding: 6px; background: #eef2ff; border-left: 3px solid #4f46e5; height: 100%; border-radius: 4px;">
      <strong>{{ startTime }} – {{ endTime }}</strong>
      <div>{{ slot.title }}</div>
    </div>
  `
}));

export default {
  components: { CalendarComponent },
  data() {
    return {
      calendarSchedule: [
        {
          date: '22/10/2026',
          slots: [
            {
              startTime: '09:00',
              endTime: '10:30',
              title: 'Client Review',
              component: AppointmentCard
            },
            {
              startTime: '14:00',
              endTime: '15:45',
              title: 'Team Workshop',
              component: AppointmentCard
            }
          ]
        }
      ]
    };
  }
};
</script>
```

