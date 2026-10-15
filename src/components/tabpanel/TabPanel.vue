<template>
  <div 
    :class="[
      'gts-tab-panel',
      `gts-tab-orientation-${orientation}`,
      `gts-tab-variant-${variant}`,
      className
    ]"
  >
    <!-- Tab Navigation Header -->
    <div 
      :class="[
        'gts-tab-nav',
        `gts-tab-align-${alignment}`,
        headerClassName
      ]"
      role="tablist"
      :aria-orientation="orientation"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.name || index"
        type="button"
        :class="[
          'gts-tab-item',
          {
            'is-active': tab.name === currentTab,
            'is-disabled': tab.disabled
          },
          tab.className
        ]"
        role="tab"
        :id="`gts-tab-btn-${tab.name}`"
        :aria-selected="tab.name === currentTab ? 'true' : 'false'"
        :aria-controls="`gts-tab-panel-${tab.name}`"
        :tabindex="tab.disabled ? -1 : (tab.name === currentTab ? 0 : -1)"
        :disabled="tab.disabled"
        @click="onTabClick(tab, $event)"
        @keydown="onKeyDown($event, index)"
      >
        <!-- Tab Icon (component) -->
        <span v-if="tab.icon" class="gts-tab-icon">
          <component :is="tab.icon" />
        </span>

        <!-- Tab Title -->
        <span class="gts-tab-title">{{ tab.title }}</span>

        <!-- Optional Badge -->
        <span 
          v-if="tab.badge !== undefined && tab.badge !== null" 
          :class="['gts-tab-badge', tab.badgeTheme ? `gts-tab-badge-${tab.badgeTheme}` : '']"
        >
          {{ tab.badge }}
        </span>

        <!-- Active Line Indicator (for line variant) -->
        <span 
          v-if="variant === 'line' && tab.name === currentTab" 
          class="gts-tab-active-indicator" 
          aria-hidden="true"
        ></span>
      </button>
    </div>

    <!-- Active Tab Content Area -->
    <div 
      v-if="activeTab"
      :id="`gts-tab-panel-${activeTab.name}`"
      :class="['gts-tab-content', contentClassName]"
      role="tabpanel"
      :aria-labelledby="`gts-tab-btn-${activeTab.name}`"
    >
      <!-- Render the Tab Component -->
      <component 
        v-if="activeTab.component" 
        :is="activeTab.component" 
        v-bind="activeTab.props || {}"
        :tab="activeTab"
        :currentTab="currentTab"
      />

      <!-- Named Slot fallback or default slot -->
      <slot 
        v-else 
        :name="activeTab.name" 
        :tab="activeTab" 
        :currentTab="currentTab"
      >
        <slot :tab="activeTab" :currentTab="currentTab" />
      </slot>
    </div>

    <!-- Empty State when no matching tab is found -->
    <div v-else-if="tabs && tabs.length > 0" class="gts-tab-empty">
      <slot name="empty">
        <span class="gts-tab-empty-text">No active tab selected</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPanel',

  emits: ['update:currentTab', 'changeTab', 'tabChange', 'tabClick'],

  props: {
    /**
     * Array of Tab items:
     * - name: String (unique identifier)
     * - title: String (label displayed in tab header)
     * - icon: Component (Vue icon component)
     * - component: Component (Vue component displayed in panel when tab is active)
     * - disabled: Boolean (optional, disables tab click)
     * - badge: String | Number (optional)
     * - badgeTheme: String (optional)
     * - props: Object (optional props passed down to component)
     */
    tabs: {
      type: Array,
      required: true,
      default: () => []
    },

    /**
     * String identifier of the currently displayed tab.
     * Controlled prop: changing tabs only happens when this prop changes.
     */
    currentTab: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Visual style variant: 'line' | 'pill' | 'card' | 'bordered'
     */
    variant: {
      type: String,
      required: false,
      default: 'line',
      validator: (val) => ['line', 'pill', 'card', 'bordered'].includes(val)
    },

    /**
     * Orientation: 'horizontal' | 'vertical'
     */
    orientation: {
      type: String,
      required: false,
      default: 'horizontal',
      validator: (val) => ['horizontal', 'vertical'].includes(val)
    },

    /**
     * Tabs alignment: 'left' | 'center' | 'right' | 'justify'
     */
    alignment: {
      type: String,
      required: false,
      default: 'left',
      validator: (val) => ['left', 'center', 'right', 'justify'].includes(val)
    },

    /**
     * Extra CSS class for root wrapper
     */
    className: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Extra CSS class for header navigation
     */
    headerClassName: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Extra CSS class for content body
     */
    contentClassName: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    /**
     * Strictly driven by the currentTab prop.
     * TabPanel does NOT update its active tab internally on click;
     * switching occurs if and only if currentTab is updated by the consumer.
     */
    activeTab() {
      if (!Array.isArray(this.tabs) || this.tabs.length === 0) {
        return null;
      }
      return this.tabs.find((tab) => tab && tab.name === this.currentTab) || null;
    }
  },

  methods: {
    /**
     * Emits events when a tab header is clicked.
     * Does NOT mutate activeTab internally.
     */
    onTabClick(tab, event) {
      if (tab.disabled) return;

      this.$emit('tabClick', tab.name, tab, event);
      this.$emit('changeTab', tab.name, tab);
      this.$emit('tabChange', tab.name, tab);
      this.$emit('update:currentTab', tab.name);
    },

    /**
     * Keyboard navigation for accessibility (Arrow keys, Home, End).
     */
    onKeyDown(event, currentIndex) {
      const isHorizontal = this.orientation === 'horizontal';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

      const enabledTabs = this.tabs
        .map((tab, idx) => ({ ...tab, originalIndex: idx }))
        .filter((tab) => !tab.disabled);

      if (enabledTabs.length === 0) return;

      const currentEnabledIndex = enabledTabs.findIndex((t) => t.originalIndex === currentIndex);

      let targetTab = null;

      if (event.key === nextKey) {
        event.preventDefault();
        const nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        targetTab = enabledTabs[nextIndex];
      } else if (event.key === prevKey) {
        event.preventDefault();
        const prevIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        targetTab = enabledTabs[prevIndex];
      } else if (event.key === 'Home') {
        event.preventDefault();
        targetTab = enabledTabs[0];
      } else if (event.key === 'End') {
        event.preventDefault();
        targetTab = enabledTabs[enabledTabs.length - 1];
      }

      if (targetTab) {
        const btn = this.$el?.querySelector(`#gts-tab-btn-${targetTab.name}`);
        if (btn) btn.focus();
        this.onTabClick(targetTab, event);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.gts-tab-panel {
  display: flex;
  flex-direction: column;
  width: 100%;

  /* ========================================================
     Orientation: Vertical
     ======================================================== */
  &.gts-tab-orientation-vertical {
    flex-direction: row;
    gap: 24px;

    .gts-tab-nav {
      flex-direction: column;
      border-bottom: none;
      border-right: 1px solid $neutral-color-200;
      padding-right: 8px;
      min-width: 200px;
      gap: 4px;

      .gts-tab-item {
        width: 100%;
        justify-content: flex-start;
        text-align: left;
        padding: 10px 16px;

        .gts-tab-active-indicator {
          left: auto;
          right: -9px;
          top: 0;
          bottom: 0;
          width: 3px;
          height: 100%;
        }
      }
    }

    .gts-tab-content {
      flex: 1;
      padding: 0;
    }
  }

  /* ========================================================
     Tab Navigation Bar
     ======================================================== */
  .gts-tab-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    border-bottom: 1px solid $neutral-color-200;
    margin: 0;
    padding: 0;
    gap: 8px;

    /* Alignment options */
    &.gts-tab-align-left {
      justify-content: flex-start;
    }
    &.gts-tab-align-center {
      justify-content: center;
    }
    &.gts-tab-align-right {
      justify-content: flex-end;
    }
    &.gts-tab-align-justify {
      justify-content: space-between;

      .gts-tab-item {
        flex: 1;
        justify-content: center;
      }
    }
  }

  /* ========================================================
     Tab Header Item (Button)
     ======================================================== */
  .gts-tab-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: $neutral-color-600;
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    user-select: none;
    white-space: nowrap;

    &:hover:not(.is-disabled) {
      color: $primary-color-600;
      background-color: $neutral-color-50;
      border-radius: 6px;
    }

    &:focus-visible {
      outline: 2px solid $primary-color-300;
      outline-offset: 2px;
      border-radius: 6px;
    }

    &.is-active {
      color: $primary-color-600;
      font-weight: 600;
    }

    &.is-disabled {
      color: $neutral-color-300;
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Icon */
    .gts-tab-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 1;
      color: currentColor;

      svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
    }

    /* Title */
    .gts-tab-title {
      line-height: 1.4;
    }

    /* Badge */
    .gts-tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      border-radius: 12px;
      background-color: $neutral-color-200;
      color: $neutral-color-700;

      &.gts-tab-badge-primary {
        background-color: $primary-color-50;
        color: $primary-color-600;
      }
      &.gts-tab-badge-danger {
        background-color: $accent-light-red-color;
        color: $accent-dark-red-color;
      }
      &.gts-tab-badge-warning {
        background-color: $accent-light-orange-color;
        color: #b45309;
      }
      &.gts-tab-badge-success {
        background-color: #ecfdf5;
        color: #047857;
      }
    }

    /* Line Variant Active Indicator */
    .gts-tab-active-indicator {
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background-color: $primary-color-500;
      border-radius: 3px 3px 0 0;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  /* ========================================================
     Variant: Pill
     ======================================================== */
  &.gts-tab-variant-pill {
    .gts-tab-nav {
      border-bottom: none;
      padding: 4px;
      background-color: $neutral-color-100;
      border-radius: 8px;
      gap: 4px;

      .gts-tab-item {
        border-radius: 6px;
        padding: 8px 16px;

        &:hover:not(.is-disabled) {
          background-color: rgba(255, 255, 255, 0.6);
        }

        &.is-active {
          background-color: $color-white;
          color: $primary-color-600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
        }
      }
    }
  }

  /* ========================================================
     Variant: Card
     ======================================================== */
  &.gts-tab-variant-card {
    .gts-tab-nav {
      border-bottom: 1px solid $neutral-color-200;
      gap: 4px;

      .gts-tab-item {
        border: 1px solid transparent;
        border-bottom: none;
        border-radius: 8px 8px 0 0;
        padding: 10px 18px;
        background-color: $neutral-color-50;

        &:hover:not(.is-disabled) {
          background-color: $neutral-color-100;
        }

        &.is-active {
          background-color: $color-white;
          border-color: $neutral-color-200;
          border-bottom-color: $color-white;
          margin-bottom: -1px;
          color: $primary-color-600;
        }
      }
    }

    .gts-tab-content {
      border: 1px solid $neutral-color-200;
      border-top: none;
      border-radius: 0 0 8px 8px;
      padding: 20px;
      background-color: $color-white;
    }
  }

  /* ========================================================
     Variant: Bordered
     ======================================================== */
  &.gts-tab-variant-bordered {
    .gts-tab-nav {
      border-bottom: none;
      border: 1px solid $neutral-color-200;
      border-radius: 8px;
      padding: 4px;
      background-color: $color-white;
      gap: 4px;

      .gts-tab-item {
        border-radius: 6px;
        padding: 8px 16px;

        &.is-active {
          background-color: $primary-color-500;
          color: $color-white;

          .gts-tab-badge {
            background-color: rgba(255, 255, 255, 0.2);
            color: $color-white;
          }
        }
      }
    }
  }

  /* ========================================================
     Tab Content Container
     ======================================================== */
  .gts-tab-content {
    margin-top: 16px;
    width: 100%;
    animation: gtsTabFadeIn 0.2s ease-in-out;
  }

  .gts-tab-empty {
    padding: 32px 16px;
    text-align: center;
    color: $neutral-color-400;
    font-size: 14px;
  }
}

@keyframes gtsTabFadeIn {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
