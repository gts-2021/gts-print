import { mount } from '@vue/test-utils';
import TabPanel from '../TabPanel.vue';
import { defineComponent, markRaw } from 'vue';

describe('TabPanel.vue', () => {
  const DummyIcon1 = markRaw(defineComponent({
    template: '<svg class="dummy-icon-1"><circle cx="5" cy="5" r="5" /></svg>'
  }));

  const DummyIcon2 = markRaw(defineComponent({
    template: '<svg class="dummy-icon-2"><rect width="10" height="10" /></svg>'
  }));

  const ComponentA = markRaw(defineComponent({
    name: 'ComponentA',
    props: ['message'],
    template: '<div class="component-a">Content A: {{ message || "Default A" }}</div>'
  }));

  const ComponentB = markRaw(defineComponent({
    name: 'ComponentB',
    template: '<div class="component-b">Content B</div>'
  }));

  const ComponentC = markRaw(defineComponent({
    name: 'ComponentC',
    template: '<div class="component-c">Content C</div>'
  }));

  const sampleTabs = [
    {
      name: 'tab-1',
      title: 'Overview',
      icon: DummyIcon1,
      component: ComponentA,
      props: { message: 'Custom Prop A' }
    },
    {
      name: 'tab-2',
      title: 'Settings',
      icon: DummyIcon2,
      component: ComponentB,
      badge: 4,
      badgeTheme: 'primary'
    },
    {
      name: 'tab-3',
      title: 'Billing',
      component: ComponentC
    },
    {
      name: 'tab-4',
      title: 'Disabled Tab',
      component: ComponentA,
      disabled: true
    }
  ];

  it('renders all tab navigation items with correct titles and icons', () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1'
      }
    });

    const tabButtons = wrapper.findAll('.gts-tab-item');
    expect(tabButtons).toHaveLength(4);

    expect(tabButtons[0].text()).toContain('Overview');
    expect(tabButtons[1].text()).toContain('Settings');
    expect(tabButtons[2].text()).toContain('Billing');
    expect(tabButtons[3].text()).toContain('Disabled Tab');

    // Icons
    expect(tabButtons[0].find('.dummy-icon-1').exists()).toBe(true);
    expect(tabButtons[1].find('.dummy-icon-2').exists()).toBe(true);
    // Tab 3 has no icon
    expect(tabButtons[2].find('.gts-tab-icon').exists()).toBe(false);

    // Badge
    const badge = tabButtons[1].find('.gts-tab-badge');
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe('4');
  });

  it('marks currentTab as active with aria-selected="true"', () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-2'
      }
    });

    const tabButtons = wrapper.findAll('.gts-tab-item');
    expect(tabButtons[0].classes()).not.toContain('is-active');
    expect(tabButtons[0].attributes('aria-selected')).toBe('false');

    expect(tabButtons[1].classes()).toContain('is-active');
    expect(tabButtons[1].attributes('aria-selected')).toBe('true');
  });

  it('renders the component matching the currentTab', () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1'
      }
    });

    expect(wrapper.find('.component-a').exists()).toBe(true);
    expect(wrapper.find('.component-a').text()).toContain('Content A: Custom Prop A');
    expect(wrapper.find('.component-b').exists()).toBe(false);
  });

  it('emits changeTab and update:currentTab events on click', async () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1'
      }
    });

    const tabButtons = wrapper.findAll('.gts-tab-item');
    await tabButtons[1].trigger('click');

    expect(wrapper.emitted('tabClick')).toBeTruthy();
    expect(wrapper.emitted('tabClick')[0][0]).toBe('tab-2');

    expect(wrapper.emitted('changeTab')).toBeTruthy();
    expect(wrapper.emitted('changeTab')[0][0]).toBe('tab-2');

    expect(wrapper.emitted('update:currentTab')).toBeTruthy();
    expect(wrapper.emitted('update:currentTab')[0][0]).toBe('tab-2');
  });

  it('strictly controls tab switching: tab changes IF AND ONLY IF currentTab prop changes', async () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1'
      }
    });

    // Initial state: tab-1 is active
    expect(wrapper.find('.component-a').exists()).toBe(true);
    expect(wrapper.find('.component-b').exists()).toBe(false);

    // User clicks tab-2
    const tabButtons = wrapper.findAll('.gts-tab-item');
    await tabButtons[1].trigger('click');

    // Event was emitted
    expect(wrapper.emitted('changeTab')).toBeTruthy();

    // BUT since currentTab prop was NOT updated by parent, activeTab MUST remain tab-1!
    expect(tabButtons[0].classes()).toContain('is-active');
    expect(tabButtons[1].classes()).not.toContain('is-active');
    expect(wrapper.find('.component-a').exists()).toBe(true);
    expect(wrapper.find('.component-b').exists()).toBe(false);

    // NOW parent updates currentTab to 'tab-2'
    await wrapper.setProps({ currentTab: 'tab-2' });

    // Active tab and rendered component switch!
    expect(wrapper.findAll('.gts-tab-item')[1].classes()).toContain('is-active');
    expect(wrapper.findAll('.gts-tab-item')[0].classes()).not.toContain('is-active');
    expect(wrapper.find('.component-a').exists()).toBe(false);
    expect(wrapper.find('.component-b').exists()).toBe(true);
  });

  it('does not emit events when a disabled tab is clicked', async () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1'
      }
    });

    const tabButtons = wrapper.findAll('.gts-tab-item');
    const disabledTab = tabButtons[3];

    expect(disabledTab.classes()).toContain('is-disabled');
    expect(disabledTab.attributes('disabled')).toBeDefined();

    await disabledTab.trigger('click');

    expect(wrapper.emitted('changeTab')).toBeFalsy();
    expect(wrapper.emitted('update:currentTab')).toBeFalsy();
  });

  it('supports variants and orientation props', () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1',
        variant: 'pill',
        orientation: 'vertical',
        alignment: 'center'
      }
    });

    expect(wrapper.classes()).toContain('gts-tab-variant-pill');
    expect(wrapper.classes()).toContain('gts-tab-orientation-vertical');

    const nav = wrapper.find('.gts-tab-nav');
    expect(nav.classes()).toContain('gts-tab-align-center');
    expect(nav.attributes('aria-orientation')).toBe('vertical');
  });

  it('supports keyboard navigation via arrow keys', async () => {
    const wrapper = mount(TabPanel, {
      props: {
        tabs: sampleTabs,
        currentTab: 'tab-1'
      }
    });

    const tabButtons = wrapper.findAll('.gts-tab-item');
    // Press ArrowRight from first tab
    await tabButtons[0].trigger('keydown', { key: 'ArrowRight' });

    expect(wrapper.emitted('changeTab')).toBeTruthy();
    expect(wrapper.emitted('changeTab')[0][0]).toBe('tab-2');
  });

  it('renders slot fallback if tab has no component', () => {
    const tabsWithoutComponent = [
      { name: 'slot-tab', title: 'Slot Tab' }
    ];

    const wrapper = mount(TabPanel, {
      props: {
        tabs: tabsWithoutComponent,
        currentTab: 'slot-tab'
      },
      slots: {
        'slot-tab': '<div class="custom-slot-content">Slot Fallback Content</div>'
      }
    });

    expect(wrapper.find('.custom-slot-content').exists()).toBe(true);
    expect(wrapper.find('.custom-slot-content').text()).toBe('Slot Fallback Content');
  });
});
