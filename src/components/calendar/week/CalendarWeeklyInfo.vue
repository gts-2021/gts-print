<template>

  <div class="gts-print-calendar-weekly-left" @click="selectDay(calendarDay)">

    <!-- day -->
    <div
      :class="['gts-print-calendar-weekly-content-calendarDay', { today: calendarDay.isToday, 'gts-today-cell': calendarDay.isToday }]"
      :title="calendarDay.date">
      <div class="calendarDay-header-row">
        <span class="calendarDay-name"> {{ calendarDay.name }} </span>
        <span v-if="calendarDay.isToday" class="gts-today-mark" :title="todayBadgeText"></span>
      </div>
      <span class="calendarDay-number"> {{ calendarDay.number }}</span>
      <BadgeComponent v-if="calendarDay.dayType" :text="calendarDay.dayType"
        :theme="getDayTypeTheme(calendarDay.dayType)" className="gts-badge gts-daytype-badge" />
    </div>

    <!-- separator -->
    <div class="gts-print-calendar-weekly-content-separator"></div>

    <!-- timeslot -->
    <div v-if="calendarDay.content" class="gts-print-calendar-weekly-content-data">

      <component :is="calendarDay.content" :day="calendarDay" />

    </div>


  </div>

  <div v-if="isSelected || hasActions" class="gts-print-calendar-weekly-content-actions">
    <component v-if="calendarDay.componentFormatter" :item="calendarDay" :is="calendarDay.componentFormatter"></component>
    <div v-if="hasActions" class="gts-print-calendar-content-actions-icon" title="Actions" @click.stop="toggleMenu($event)">
      <MenuIcon />
      <ContextMenu ref="contextMenu" className="gts-card-actions-menu" :actions="resolvedCellActions" />
    </div>
  </div>

</template>

<script>
import MenuIcon from '@/assets/icons/MenuIcon.vue';
import ContextMenu from '../../contextmenu/ContextMenu.vue';
import BadgeComponent from '../../badge/BadgeComponent.vue';

export default {

  name: "CalendarWeeklyInfo",

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
      default: null,
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

    selectDay(calendarDay) {
      this.$emit("daySelected", calendarDay);
    },

    toggleMenu(event) {
      if (event && event.stopPropagation) {
        event.stopPropagation();
      }
      this.selectDay(this.calendarDay);
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
.gts-print-calendar-weekly-content {


  .gts-print-calendar-weekly-left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-grow: 1;
    min-width: 0;

    .gts-print-calendar-weekly-content-calendarDay {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      padding: 9px 20px;
      background: $neutral-color-100;
      line-height: 20px;

      .calendarDay-header-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .gts-today-mark {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #22c55e;
        flex-shrink: 0;
      }

      .calendarDay-name {
        font-weight: 400;
        font-size: 14px;
        color: $neutral-color-700;
      }

      .calendarDay-number {
        font-weight: 600;
        color: $neutral-color-700;
        font-size: 20px;
      }
    }

    .gts-print-calendar-weekly-content-separator {
      border: 1px solid $neutral-color-200;
      height: 100%;
    }

    .gts-print-calendar-weekly-content-data {

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      flex-grow: 1;
      min-width: 0;

      .gts-print-calendar-weekly-content-data-label {
        font-weight: 600;
        color: $primary-color-300;
        line-height: 20px;
        font-size: 14px;
      }

      .gts-print-calendar-weekly-content-data-timeslots {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 7px;

        .gts-print-calendar-weekly-content-data-timeslot {
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

    .gts-print-calendar-weekly-content-data-empty {

      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px auto;
      line-height: 20px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 4px;
      color: $neutral-color-800;
      background: $neutral-color-200;

      .gts-print-calendar-weekly-content-data-label {
        padding: 20px 80px;
      }
    }
  }

  .gts-print-calendar-weekly-content-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

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

}

.gts-print-calendar-weekly-content.selected {
  background: $primary-color-50;

  .gts-print-calendar-weekly-content-calendarDay {
    background: $color-white;
  }
}

.gts-print-calendar-weekly-content.light-gray {
  background: $neutral-color-50;
  pointer-events: none;
  cursor: not-allowed;
}
</style>