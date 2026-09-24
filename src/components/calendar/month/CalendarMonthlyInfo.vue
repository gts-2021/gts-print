<template>

  <template v-if="!calendarDay.isEmpty">
    <!-- header -->
    <div class="gts-print-calendar-monthly-content-data-header">

      <!-- day -->
      <div class="gts-calendar-day-header-left">
        <div :class="['gts-print-calendar-header-day', { today: calendarDay.isToday }]" :title="calendarDay.date">
          <span>{{ calendarDay.number }} </span>
        </div>
        <span v-if="calendarDay.isToday" class="gts-today-mark" :title="todayBadgeText"></span>
        <BadgeComponent v-if="calendarDay.dayType" :text="calendarDay.dayType"
          :theme="getDayTypeTheme(calendarDay.dayType)" className="gts-badge gts-daytype-badge" />
      </div>

      <!-- actions -->
      <div v-if="hasActions" class="gts-print-calendar-content-actions-icon" title="Actions" @click.stop="toggleMenu($event)">
        <MenuIcon />
        <ContextMenu ref="contextMenu" className="gts-card-actions-menu" :actions="resolvedCellActions" />
      </div>

    </div>

    <!-- timeslot  -->
    <div v-if="calendarDay.content" class="gts-print-calendar-monthly-content-data-timeslots">
      <component :is="calendarDay.content" :day="calendarDay" />
    </div>


  </template>


</template>

<script>

import MenuIcon from '@/assets/icons/MenuIcon.vue';
import ContextMenu from '../../contextmenu/ContextMenu.vue';
import BadgeComponent from '../../badge/BadgeComponent.vue';

export default {

  name: "CalendarMonthlyInfo",

  emits: ['daySelected'],

  components: {
    MenuIcon,
    ContextMenu,
    BadgeComponent
  },

  props: {

    calendarDay: {
      type: Object,
      required: true
    },

    selectedDay: {
      type: Object,
      required: false
    },

    contextMenuActions: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
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

    cellActions() {
      if (this.calendarDay && Array.isArray(this.calendarDay.actions) && this.calendarDay.actions.length > 0) {
        return this.calendarDay.actions;
      }
      if (Array.isArray(this.contextMenuActions) && this.contextMenuActions.length > 0) {
        return this.contextMenuActions;
      }
      return [];
    },

    hasActions() {
      return this.cellActions.length > 0;
    },

    resolvedCellActions() {
      return this.cellActions.map(action => ({
        ...action,
        onClick: (event) => {
          if (typeof action.onClick === 'function') {
            action.onClick(this.calendarDay, event);
          }
        }
      }));
    },

  },

  methods: {

    toggleMenu(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      this.$emit("daySelected", this.calendarDay);
      if (this.$refs.contextMenu) {
        this.$refs.contextMenu.toggleMenu();
      }
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
.gts-print-calendar-monthly-content-data {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid $neutral-color-200;
  border-bottom: 1px solid $neutral-color-200;
  padding: 10px;
  cursor: pointer;
  width: 150px;
  min-height: 100px;
  overflow: visible;


  .gts-print-calendar-monthly-content-data-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    .gts-calendar-day-header-left {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .gts-print-calendar-header-day {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      font-size: 14px;
      color: $neutral-color-500;
      font-weight: 500;
      border-radius: 50%;
      text-align: center;
    }

    .gts-print-calendar-header-day.today {
      background: $neutral-color-200;
    }

    .gts-today-mark {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #22c55e;
      flex-shrink: 0;
    }

    .gts-print-calendar-content-actions-icon {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: var(--gts-radius-sm, 5px);
      transition: background-color 0.15s ease, color 0.15s ease;

      &:hover {
        background-color: #EEF2FF;
      }

      .gts-card-actions-menu {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        z-index: 100;

      }
    }
  }

  .gts-print-calendar-monthly-content-data-timeslots {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 7px;
    white-space: normal;

    .gts-print-calendar-monthly-content-data-timeslot {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: $color-white;
      background: $primary-color-300;
      padding: 2px 8px;

      .time-slot-text {
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
      }

    }
  }

}

.gts-print-calendar-monthly-content-data.selected {
  background: $primary-color-50;
}

.gts-print-calendar-monthly-content-data.light-gray {
  background: $neutral-color-50;
  cursor: auto;
}

.gts-print-calendar-monthly-content-data-empty {
  text-align: center;
  padding: 30px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  color: $neutral-color-800;
  background: $neutral-color-200;
}

.gts-print-calendar-monthly-content-data.past,
.gts-print-calendar-monthly-content-data.futur {
  opacity: 0.5;
  background: $neutral-color-50;
  pointer-events: none;
  cursor: not-allowed;
}
</style>