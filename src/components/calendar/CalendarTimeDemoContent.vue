<template>
  <div class="gts-hourly-demo">
    <button v-for="event in visibleEvents" :key="event.title" type="button"
      class="gts-hourly-demo-event" :class="event.theme" :style="eventStyle(event)"
      @click.stop="showEvent(event)">
      <strong>{{ event.title }}</strong>
      <span>{{ event.label }}</span>
    </button>
  </div>
</template>

<script>
// Consumer example: filtering and positioning belong here, not in the calendar.
export default {
  name: 'CalendarTimeDemoContent',
  props: {
    day: { type: Object, required: true },
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 23 },
    hourHeight: { type: Number, default: 64 },
  },
  data() {
    return {
      events: [
        { title: 'Team meeting', start: 9, end: 10.5, label: '09:00 – 10:30', theme: 'blue' },
        { title: 'Client appointment', start: 14, end: 15, label: '14:00 – 15:00', theme: 'green' },
      ],
    };
  },
  computed: {
    visibleEvents() { return this.events.filter(event => event.end > this.startTime && event.start < this.endTime); },
  },
  methods: {
    eventStyle(event) {
      const start = Math.max(event.start, this.startTime);
      const end = Math.min(event.end, this.endTime);
      return { top: `${(start - this.startTime) * this.hourHeight + 3}px`, height: `${(end - start) * this.hourHeight - 6}px` };
    },
    showEvent(event) { window.alert(`${this.day.date} · ${event.title} · ${event.label}`); },
  },
};
</script>

<style scoped>
.gts-hourly-demo { position: relative; height: 100%; }
.gts-hourly-demo-event {
  position: absolute; left: 6px; right: 6px; padding: 8px 10px;
  display: flex; flex-direction: column; gap: 4px; text-align: left;
  border: 1px solid #c7d8ef; border-left: 3px solid #4979ba; border-radius: 6px;
  background: #edf3fc; color: #244971; font: inherit; font-size: 12px;
  cursor: pointer; overflow: hidden;
}
.gts-hourly-demo-event.green { background: #ecf7f2; border-color: #b9dfce; border-left-color: #338663; color: #256047; }
.gts-hourly-demo-event:hover { filter: brightness(.97); }
.gts-hourly-demo-event:focus-visible { outline: 2px solid #4979ba; outline-offset: 1px; }
</style>
