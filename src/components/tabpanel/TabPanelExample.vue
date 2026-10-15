<template>
  <div class="gts-tabpanel-example">
    <!-- Header Controls -->
    <div class="example-toolbar">
      <div>
        <strong>Active Tab: </strong>
        <code>{{ activeTab }}</code>
      </div>

      <div class="toolbar-actions">
        <label>
          <strong>Variant: </strong>
          <select v-model="selectedVariant" class="example-select">
            <option value="line">Line (Default)</option>
            <option value="pill">Pill</option>
            <option value="card">Card</option>
            <option value="bordered">Bordered</option>
          </select>
        </label>

        <label style="margin-left: 16px;">
          <input type="checkbox" v-model="isControlledGuardEnabled" />
          <span>Simulate Tab Lock (Prevent tab change when checked)</span>
        </label>
      </div>
    </div>

    <!-- Section 1: Standard Horizontal TabPanel -->
    <div class="example-card">
      <h4>1. Interactive TabPanel (Controlled Component)</h4>
      <p class="example-description">
        Demonstrates <code>:tabs="tabs"</code> and <code>:currentTab="activeTab"</code> with icons, titles, and components.
        Tab switching occurs <strong>if and only if</strong> <code>currentTab</code> changes.
      </p>

      <TabPanel
        :tabs="tabs"
        :currentTab="activeTab"
        :variant="selectedVariant"
        @changeTab="onTabChange"
      />
    </div>

    <!-- Section 2: Vertical Orientation -->
    <div class="example-card" style="margin-top: 30px;">
      <h4>2. Vertical TabPanel with Badges</h4>
      <p class="example-description">
        Demonstrates <code>orientation="vertical"</code> with icons and count badges.
      </p>

      <TabPanel
        :tabs="verticalTabs"
        :currentTab="activeVerticalTab"
        orientation="vertical"
        variant="line"
        @changeTab="(tabName) => activeVerticalTab = tabName"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import TabPanel from './TabPanel.vue';
import ColumnsIcon from '@/assets/icons/ColumnsIcon.vue';
import UpdateIcon from '@/assets/icons/UpdateIcon.vue';
import FilterIcon from '@/assets/icons/FilterIcon.vue';
import ExportIcon from '@/assets/icons/ExportIcon.vue';

// Dummy tab components
const ProfileTabContent = markRaw(defineComponent({
  template: `
    <div class="tab-demo-pane">
      <h5>👤 User Profile Information</h5>
      <p>This is the profile settings component rendered dynamically inside TabPanel.</p>
      <div style="display: flex; gap: 12px; margin-top: 10px;">
        <input type="text" placeholder="Full name" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px;" value="John Doe" />
        <input type="email" placeholder="Email" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px;" value="john.doe@example.com" />
      </div>
    </div>
  `
}));

const SecurityTabContent = markRaw(defineComponent({
  template: `
    <div class="tab-demo-pane">
      <h5>🔐 Security & Authentication Settings</h5>
      <p>Two-Factor Authentication (2FA) is currently enabled for this account.</p>
      <ul style="padding-left: 20px; line-height: 1.8;">
        <li>Password last changed: 24 days ago</li>
        <li>Active Sessions: 2 active browser sessions</li>
        <li>API Access Keys: 1 production key</li>
      </ul>
    </div>
  `
}));

const AnalyticsTabContent = markRaw(defineComponent({
  template: `
    <div class="tab-demo-pane">
      <h5>📊 Analytics & Statistics</h5>
      <p>Overview of system performance and monthly API usage.</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px;">
        <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #003F4D;">99.98%</div>
          <div style="font-size: 12px; color: #64748b;">Uptime</div>
        </div>
        <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #003F4D;">14.2k</div>
          <div style="font-size: 12px; color: #64748b;">Requests / day</div>
        </div>
        <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #003F4D;">42 ms</div>
          <div style="font-size: 12px; color: #64748b;">Avg Latency</div>
        </div>
      </div>
    </div>
  `
}));

const NotificationsTabContent = markRaw(defineComponent({
  template: `
    <div class="tab-demo-pane">
      <h5>🔔 Notification Preferences</h5>
      <p>Configure which alerts and notifications you wish to receive.</p>
    </div>
  `
}));

export default {
  name: 'TabPanelExample',

  components: {
    TabPanel
  },

  data() {
    return {
      activeTab: 'profile',
      activeVerticalTab: 'overview',
      selectedVariant: 'line',
      isControlledGuardEnabled: false,

      tabs: [
        {
          name: 'profile',
          title: 'Profile',
          icon: ColumnsIcon,
          component: ProfileTabContent
        },
        {
          name: 'security',
          title: 'Security',
          icon: UpdateIcon,
          component: SecurityTabContent
        },
        {
          name: 'analytics',
          title: 'Analytics',
          icon: FilterIcon,
          component: AnalyticsTabContent,
          badge: 'Live',
          badgeTheme: 'success'
        },
        {
          name: 'disabled-tab',
          title: 'Archived',
          icon: ExportIcon,
          component: ProfileTabContent,
          disabled: true
        }
      ],

      verticalTabs: [
        {
          name: 'overview',
          title: 'General Overview',
          icon: ColumnsIcon,
          component: ProfileTabContent,
          badge: '12'
        },
        {
          name: 'activity',
          title: 'Recent Activity',
          icon: UpdateIcon,
          component: AnalyticsTabContent,
          badge: '3',
          badgeTheme: 'primary'
        },
        {
          name: 'alerts',
          title: 'System Alerts',
          icon: FilterIcon,
          component: NotificationsTabContent,
          badge: 'New',
          badgeTheme: 'danger'
        }
      ]
    };
  },

  methods: {
    onTabChange(tabName) {
      if (this.isControlledGuardEnabled) {
        alert(`Tab switch to "${tabName}" was prevented because "Simulate Tab Lock" is checked!`);
        return;
      }
      this.activeTab = tabName;
    }
  }
};
</script>

<style lang="scss">
.gts-tabpanel-example {
  padding: 10px;

  .example-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;

    .toolbar-actions {
      display: flex;
      align-items: center;
    }

    .example-select {
      padding: 6px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: white;
      font-size: 14px;
    }
  }

  .example-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    h4 {
      margin-top: 0;
      margin-bottom: 6px;
      color: #002A34;
    }

    .example-description {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 16px;
    }
  }

  .tab-demo-pane {
    padding: 16px;
    background-color: #fafafa;
    border-radius: 6px;
    border: 1px solid #e5e7eb;

    h5 {
      margin-top: 0;
      margin-bottom: 8px;
      color: #003F4D;
      font-size: 15px;
    }

    p {
      margin-bottom: 8px;
      color: #475569;
      font-size: 13px;
    }
  }
}
</style>
