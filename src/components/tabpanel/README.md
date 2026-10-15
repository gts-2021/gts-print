# TabPanel Component Documentation

The `TabPanel` component is a flexible, accessible, and controlled tab navigation and panel display component designed for Vue 3 applications following the GTS design system.

## Features

- **Controlled Component Pattern**: Tab switching is strictly driven by the `currentTab` prop. Clicking a tab emits an event (`changeTab`, `update:currentTab`, etc.), but the active tab and its rendered component change **if and only if** `currentTab` is updated.
- **Dynamic Component Rendering**: Renders Vue components directly from the tab configuration (`tab.component`), with support for custom props.
- **Custom Tab Icons**: Accepts Vue icon components via `tab.icon`.
- **Multiple Visual Variants**: Supports `'line'` (default underline), `'pill'` (segmented rounded buttons), `'card'` (tab cards), and `'bordered'`.
- **Horizontal & Vertical Layouts**: Easily switch between horizontal and vertical tab list orientation via `orientation="horizontal|vertical"`.
- **Accessibility & Keyboard Navigation**: Full WAI-ARIA tab pattern support with `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, and arrow key / Home / End navigation.
- **Badges & Disabled Tabs**: Native support for badges and disabled tabs.

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tabs` | `Array<Tab>` | **Yes** | `[]` | Array of tab configuration objects (see Tab Object Schema below). |
| `currentTab` | `String` | No | `''` | Identifier (`name`) of the currently active tab. |
| `variant` | `String` | No | `'line'` | Visual styling: `'line'`, `'pill'`, `'card'`, `'bordered'`. |
| `orientation` | `String` | No | `'horizontal'` | Tabs orientation: `'horizontal'` or `'vertical'`. |
| `alignment` | `String` | No | `'left'` | Tabs alignment: `'left'`, `'center'`, `'right'`, `'justify'`. |
| `className` | `String` | No | `''` | Extra CSS class for the root wrapper. |
| `headerClassName` | `String` | No | `''` | Extra CSS class for the tab header navigation. |
| `contentClassName` | `String` | No | `''` | Extra CSS class for the content container. |

---

## `Tab` Object Schema

Each item in the `tabs` array should follow this structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `String` | **Yes** | Unique identifier matching `currentTab`. |
| `title` | `String` | **Yes** | Title label displayed on the tab button. |
| `icon` | `Component` | No | Vue component for the tab icon. |
| `component` | `Component` | No | Vue component to render when this tab is active. |
| `disabled` | `Boolean` | No | If `true`, the tab is disabled and cannot be clicked. |
| `badge` | `String \| Number` | No | Optional badge text or counter displayed next to title. |
| `badgeTheme` | `String` | No | Badge theme: `'primary'`, `'success'`, `'warning'`, `'danger'`. |
| `props` | `Object` | No | Props forwarded to the tab's `component`. |
| `className` | `String` | No | Custom class applied to this specific tab button. |

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `changeTab` | `(tabName: String, tab: Tab)` | Emitted when a tab is clicked. |
| `update:currentTab` | `(tabName: String)` | Emitted for standard Vue 3 `v-model:currentTab` binding. |
| `tabChange` | `(tabName: String, tab: Tab)` | Alias for `changeTab`. |
| `tabClick` | `(tabName: String, tab: Tab, event: Event)` | Emitted on click with the original DOM event. |

---

## Usage Examples

### 1. Basic Usage with `v-model:currentTab`

```vue
<template>
  <TabPanel
    :tabs="tabs"
    v-model:currentTab="activeTab"
  />
</template>

<script>
import TabPanel from '@/components/tabpanel/TabPanel.vue';
import UserProfileComponent from '@/components/UserProfile.vue';
import SecuritySettingsComponent from '@/components/SecuritySettings.vue';
import UserIcon from '@/assets/icons/UserIcon.vue';
import LockIcon from '@/assets/icons/LockIcon.vue';

export default {
  components: { TabPanel },
  data() {
    return {
      activeTab: 'profile',
      tabs: [
        {
          name: 'profile',
          title: 'User Profile',
          icon: UserIcon,
          component: UserProfileComponent
        },
        {
          name: 'security',
          title: 'Security',
          icon: LockIcon,
          component: SecuritySettingsComponent
        }
      ]
    };
  }
};
</script>
```

### 2. Controlled Tab Switching with Confirmation / Guard

Because `TabPanel` changes tabs **if and only if** `currentTab` is updated, you can easily implement guards:

```vue
<template>
  <TabPanel
    :tabs="tabs"
    :currentTab="activeTab"
    @changeTab="handleTabChange"
  />
</template>

<script>
import TabPanel from '@/components/tabpanel/TabPanel.vue';

export default {
  components: { TabPanel },
  data() {
    return {
      activeTab: 'step1',
      isFormDirty: true,
      tabs: [ /* ... */ ]
    };
  },
  methods: {
    handleTabChange(nextTab) {
      if (this.isFormDirty && !confirm('You have unsaved changes. Leave this tab?')) {
        // Do not update activeTab -> Tab remains unchanged!
        return;
      }
      this.activeTab = nextTab;
    }
  }
};
</script>
```

### 3. Vertical Orientation with Badges

```vue
<template>
  <TabPanel
    :tabs="tabs"
    v-model:currentTab="activeTab"
    orientation="vertical"
    variant="pill"
  />
</template>
```
