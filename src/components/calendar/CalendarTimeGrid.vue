<template>
  <div class="gts-time-grid-scroll" :class="timeGridClass" tabindex="0" :aria-label="rangeLabel"
    @mouseleave="clearCursor" @scroll="clearCursor">
    <div class="gts-time-grid" :style="gridStyle">
      <div class="gts-time-grid-corner">{{ rangeLabel }}</div>
      <div v-for="day in days" :key="`header-${day.date}`" class="gts-time-grid-heading"
        :class="{ 'is-today': day.isToday }" :title="day.date">
        <span>{{ day.name || day.day }}</span>
        <strong>{{ day.number }}</strong>
        <BadgeComponent v-if="day.dayType" :text="day.dayType" theme="gts-badge-primary" />
      </div>

      <div class="gts-time-grid-hours">
        <div v-for="hour in hours" :key="hour" class="gts-time-grid-hour">
          <span>{{ formatHour(hour) }}</span>
        </div>
        <span class="gts-time-grid-end">{{ formatHour(range.end) }}</span>
      </div>
      <div v-for="day in days" :key="day.date" class="gts-time-grid-day"
        :class="{ 'is-today': day.isToday }" :data-date="day.date"
        @mousemove="updateCursor($event, day)" @mouseleave="clearCursor">
        <div v-for="hour in hours" :key="hour" class="gts-time-grid-cell" aria-hidden="true"></div>
        <div v-if="day.content && hours.length" class="gts-time-grid-content">
          <component :is="day.content" :day="day" :startTime="range.start"
            :endTime="range.end" :hourHeight="effectiveHourHeight" />
        </div>
        <div v-if="cursor" class="gts-time-grid-cursor" :style="{ top: `${cursor.top}px` }" aria-hidden="true">
          <span v-if="cursor.date === day.date">{{ cursor.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BadgeComponent from '../badge/BadgeComponent.vue';

export default {
  name: 'CalendarTimeGrid',
  components: { BadgeComponent },
  props: {
    calendarData: { type: Object, required: true },
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 23 },
    timeGridClass: { type: [String, Array, Object], default: '' },
    hourHeight: { type: Number, default: 64 },
  },
  data() {
    return { cursor: null };
  },
  computed: {
    days() { return this.calendarData.calendars?.[0] || []; },
    effectiveHourHeight() { return Number.isFinite(this.hourHeight) && this.hourHeight > 0 ? this.hourHeight : 64; },
    range() {
      // endTime is the exact closing boundary, never extended implicitly.
      const valid = Number.isInteger(this.startTime) && Number.isInteger(this.endTime)
        && this.startTime >= 0 && this.endTime <= 24 && this.startTime <= this.endTime;
      return valid ? { start: this.startTime, end: this.endTime } : { start: 0, end: 23 };
    },
    hours() {
      return Array.from({ length: this.range.end - this.range.start }, (_, i) => this.range.start + i);
    },
    rangeLabel() { return `${this.formatHour(this.range.start)} – ${this.formatHour(this.range.end)}`; },
    gridStyle() {
      return {
        gridTemplateColumns: `var(--gts-time-axis-width, 76px) repeat(${Math.max(1, this.days.length)}, minmax(var(--gts-time-day-min-width, 140px), 1fr))`,
        '--gts-hour-height': `${this.effectiveHourHeight}px`,
      };
    },
  },
  methods: {
    clearCursor() { this.cursor = null; },
    updateCursor(event, day) {
      if (!this.hours.length) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const top = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
      const minutes = Math.min(this.range.end * 60,
        this.range.start * 60 + Math.floor(top / this.effectiveHourHeight * 60));
      this.cursor = { top, date: day.date,
        label: `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}` };
    },
    formatHour(hour) { return `${String(hour).padStart(2, '0')}:00`; },
  },
  watch: {
    startTime: 'clearCursor', endTime: 'clearCursor', hourHeight: 'clearCursor', calendarData: 'clearCursor',
  },
};
</script>

<style lang="scss" scoped>
.gts-time-grid-scroll {
  max-height: var(--gts-time-max-height, 680px);
  overflow: auto;
  border: 1px solid var(--gts-time-border, $neutral-color-200);
  border-radius: var(--gts-time-radius, 12px);
  background: var(--gts-time-background, $color-white);
  &:focus-visible { outline: 2px solid $primary-color-400; outline-offset: 2px; }
}
.gts-time-grid { display: grid; isolation: isolate; }
.gts-time-grid-corner, .gts-time-grid-heading {
  position: sticky;
  top: 0;
  z-index: 3;
  background: var(--gts-time-header-background, $color-white);
  border-bottom: 1px solid var(--gts-time-border, $neutral-color-200);
  padding: 12px 8px;
  min-height: var(--gts-time-header-height, 76px);
  box-sizing: border-box;
}
.gts-time-grid-corner {
  left: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  font-size: 10px;
  color: var(--gts-time-text, $neutral-color-500);
  text-align: center;
}
.gts-time-grid-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  border-left: 1px solid var(--gts-time-border, $neutral-color-200);
  color: var(--gts-time-text, $neutral-color-500);
  font-size: 12px;
  strong { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; font-size: 18px; }
  &.is-today { color: $primary-color-700; strong { background: $primary-color-100; } }
}
.gts-time-grid-hours { position: sticky; left: 0; z-index: 2; background: var(--gts-time-background, $color-white); }
.gts-time-grid-end { position: absolute; bottom: 0; right: 12px; font-size: 12px; color: var(--gts-time-text, $neutral-color-500); }
.gts-time-grid-hour, .gts-time-grid-cell {
  height: var(--gts-hour-height);
  box-sizing: border-box;
  border-bottom: 1px solid var(--gts-time-grid-line, $neutral-color-100);
}
.gts-time-grid-hour { padding: 8px 12px; text-align: right; font-size: 12px; color: var(--gts-time-text, $neutral-color-500); }
.gts-time-grid-day {
  position: relative;
  min-width: 0;
  border-left: 1px solid var(--gts-time-border, $neutral-color-200);
  &.is-today { background: var(--gts-time-today-background, rgba($primary-color-50, .5)); }
}
.gts-time-grid-content { position: absolute; inset: 0; overflow: hidden; }
.gts-time-grid-cursor {
  position: absolute; left: 0; right: 0; z-index: 1; pointer-events: none;
  border-top: 1px solid var(--gts-time-cursor-color, $primary-color-500);
  span { position: absolute; right: 4px; bottom: 2px; padding: 2px 6px; border-radius: 4px;
    background: var(--gts-time-cursor-color, $primary-color-500);
    color: var(--gts-time-cursor-text, #fff); font-size: 11px; line-height: 16px; }
}
</style>
