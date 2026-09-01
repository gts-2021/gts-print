<template>

  <div class="gts-print-calendar-daily-info-wrapper">

    <!-- Hero Date Header -->
    <div :class="['gts-daily-hero-header', { 'is-today': calendarDay.isToday, 'gts-today-cell': calendarDay.isToday }]"
      :title="calendarDay.date" @click="selectDay(calendarDay)">
      <div class="gts-daily-hero-date-block">
        <span class="gts-daily-number">{{ calendarDay.number }}</span>
        <div class="gts-daily-meta-stack">
          <span class="gts-daily-name">{{ calendarDay.name }}</span>
          <span class="gts-daily-full-date">{{ calendarDay.date }}</span>
        </div>
      </div>

      <div class="gts-daily-hero-badges">
        <span v-if="calendarDay.isToday" class="gts-today-mark" :title="todayBadgeText"></span>
        <BadgeComponent v-if="calendarDay.dayType" :text="calendarDay.dayType"
          :theme="getDayTypeTheme(calendarDay.dayType)" className="gts-badge gts-daytype-badge" />
      </div>
    </div>

    <!-- Main Schedule Content Area -->
    <div class="gts-daily-schedule-card">
      <div class="gts-daily-schedule-header">
        <span class="gts-daily-schedule-title">{{ dailyScheduleTitleText }}</span>
        <div v-if="isSelected" class="gts-daily-actions-wrapper">
          <component :item="calendarDay" :is="calendarDay.componentFormatter" />
        </div>
      </div>

      <div class="gts-daily-schedule-body">
        <div v-if="calendarDay.content" class="gts-daily-event-content">
          <component :is="calendarDay.content" :day="calendarDay" />
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import BadgeComponent from '../../badge/BadgeComponent.vue';

export default {
  name: "CalendarDailyInfo",

  emits: ['daySelected'],

  components: {
    BadgeComponent
  },

  props: {
    calendarDay: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: Object,
      default: null
    }
  },

  computed: {
    isSelected() {
      return this.selectedDay === this.calendarDay;
    },

    todayBadgeText() {
      if (this.$t) {
        const text = this.$t('calendar.today');
        if (text && !text.startsWith('calendar.today')) return text;
      }
      return 'Today';
    },

    dailyScheduleTitleText() {
      if (this.$t) {
        const text = this.$t('calendar.dailyScheduleTitle');
        if (text && !text.startsWith('calendar.dailyScheduleTitle')) return text;
      }
      return 'Daily Schedule & Agenda';
    },


  },

  methods: {
    selectDay(calendarDay) {
      this.$emit("daySelected", calendarDay);
    },

    getDayTypeTheme(dayType) {
      if (!dayType) return '';
      const typeLower = String(dayType).toLowerCase();
      if (typeLower === 'weekend') return 'gts-badge-warning';
      if (typeLower === 'weekday') return 'gts-badge-primary';
      if (typeLower === 'holiday' || typeLower === 'ferie') return 'gts-badge-danger';
      return 'gts-badge-success';
    }
  }
}
</script>

<style lang="scss">
.gts-print-calendar-daily-info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .gts-daily-hero-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: $neutral-color-100;
    border: 1px solid $neutral-color-200;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: $primary-color-50;
    }

    &.is-today {
      background: #DEE8EA;
      border-left: 4px solid $primary-color-500;
    }

    .gts-daily-hero-date-block {
      display: flex;
      align-items: center;
      gap: 16px;

      .gts-daily-number {
        font-size: 36px;
        font-weight: 700;
        line-height: 40px;
        color: $primary-color-700;
      }

      .gts-daily-meta-stack {
        display: flex;
        flex-direction: column;

        .gts-daily-name {
          font-size: 16px;
          font-weight: 600;
          color: $neutral-color-700;
          letter-spacing: 0.5px;
        }

        .gts-daily-full-date {
          font-size: 13px;
          color: $neutral-color-500;
        }
      }
    }

    .gts-daily-hero-badges {
      display: flex;
      align-items: center;
      gap: 8px;

      .gts-today-mark {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #22c55e;
        flex-shrink: 0;
      }
    }
  }

  .gts-daily-schedule-card {
    border: 1px solid $neutral-color-200;
    border-radius: 12px;
    background: $color-white;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .gts-daily-schedule-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid $neutral-color-100;

      .gts-daily-schedule-title {
        font-size: 16px;
        font-weight: 600;
        color: $primary-color-700;
      }

      .gts-daily-actions-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    .gts-daily-schedule-body {
      min-height: 120px;
      display: flex;
      flex-direction: column;

      .gts-daily-event-content {
        padding: 16px;
        background: $primary-color-50;
        border: 1px solid $primary-color-100;
        border-radius: 8px;
      }

      .gts-daily-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 16px;
        background: $neutral-color-50;
        border-radius: 8px;
        color: $neutral-color-700;
        gap: 8px;

        .gts-daily-empty-icon {
          font-size: 24px;
        }

        .gts-daily-empty-label {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .gts-print-calendar-daily-info-wrapper {
    .gts-daily-hero-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
}
</style>
