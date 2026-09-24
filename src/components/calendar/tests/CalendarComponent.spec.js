import { mount } from '@vue/test-utils';
import CalendarComponent from '../CalendarComponent.vue';
import moment from 'moment';
import { defineComponent, markRaw } from 'vue';

// Mock icons if needed
jest.mock('@/assets/icons/MenuIcon.vue', () => ({ template: '<div>MenuIcon</div>' }));
jest.mock('maska/vue', () => ({ vMaska: {} }), { virtual: true });

describe('CalendarComponent.vue', () => {
  const todayStr = moment().format('DD/MM/YYYY');

  const dummyContent = [
    { date: todayStr, content: markRaw(defineComponent({ template: '<div>Today Event</div>' })) },
    { date: '12/03/2025', dayType: 'Holiday', content: markRaw(defineComponent({ template: '<div>Holiday Event</div>' })) }
  ];

  it('renders calendar component with full year format in header range', () => {
    const wrapper = mount(CalendarComponent, {
      props: { startingDate: '15/05/2026', datesContent: dummyContent }
    });

    const headerText = wrapper.find('.gts-calendar-header-date-text');
    expect(headerText.exists()).toBe(true);
    expect(headerText.text()).toContain('2026');
  });

  it('highlights Today cell with today class and renders title attribute with complete date', () => {
    const wrapper = mount(CalendarComponent, {
      props: { startingDate: todayStr, datesContent: dummyContent }
    });

    const todayCell = wrapper.find('.gts-today-cell');
    expect(todayCell.exists()).toBe(true);

    const todayMark = wrapper.find('.gts-today-mark');
    expect(todayMark.exists()).toBe(true);

    const dayNumber = wrapper.find('.gts-print-calendar-header-day.today');
    expect(dayNumber.attributes('title')).toBe(todayStr);
  });

  it('renders Day Type badges when explicit dayType is provided', () => {
    const wrapper = mount(CalendarComponent, {
      props: { startingDate: '12/03/2025', datesContent: dummyContent }
    });

    const dayTypeBadge = wrapper.find('.gts-daytype-badge');
    expect(dayTypeBadge.exists()).toBe(true);
    expect(dayTypeBadge.text()).toBe('Holiday');
  });

  it('switches to Day view when Day button is clicked in header', async () => {
    const wrapper = mount(CalendarComponent, {
      props: { startingDate: '15/05/2026', datesContent: dummyContent }
    });

    const typeSpans = wrapper.findAll('.gts-print-calendar-header-types span');
    const dayButton = typeSpans.find(span => span.text().trim() === 'Day');
    expect(dayButton).toBeDefined();

    await dayButton.trigger('click');

    const dailyContainer = wrapper.find('.gts-print-calendar-daily-container');
    expect(dailyContainer.exists()).toBe(true);
  });

  it('renders defaultContent for empty cells when provided', () => {
    const defaultComp = markRaw(defineComponent({
      props: ['day'],
      template: '<div class="custom-default-cell">Default Empty Slot: {{ day ? day.number : "" }}</div>'
    }));

    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        datesContent: dummyContent,
        defaultContent: defaultComp
      }
    });

    const defaultCells = wrapper.findAll('.custom-default-cell');
    expect(defaultCells.length).toBeGreaterThan(0);
  });

  it('correctly configures firstDayOfWeek with Monday as week start', async () => {
    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        firstDayOfWeek: 'Monday'
      }
    });

    const weekDays = wrapper.vm.calendarContentConfig.calendarData.weekDays;
    expect(weekDays[0]).toBe('MON');
    expect(weekDays[6]).toBe('SUN');

    // Test dynamic update of firstDayOfWeek prop
    await wrapper.setProps({ firstDayOfWeek: 'Sunday' });
    expect(wrapper.vm.calendarContentConfig.calendarData.weekDays[0]).toBe('SUN');
    expect(wrapper.vm.calendarContentConfig.calendarData.weekDays[6]).toBe('SAT');

    await wrapper.setProps({ firstDayOfWeek: 6 }); // Saturday
    expect(wrapper.vm.calendarContentConfig.calendarData.weekDays[0]).toBe('SAT');
    expect(wrapper.vm.calendarContentConfig.calendarData.weekDays[6]).toBe('FRI');
  });

  it('supports i18n translations for view types and today button', () => {
    const translations = {
      'calendar.today': "Aujourd'hui",
      'calendar.types.month': 'Mois',
      'calendar.types.week': 'Semaine',
      'calendar.types.day': 'Jour',
      'calendar.days.mon': 'LUN',
      'calendar.days.sun': 'DIM',
      'calendar.noEvent': 'Aucun événement'
    };

    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        firstDayOfWeek: 1
      },
      global: {
        mocks: {
          $t: (key) => translations[key] || key
        }
      }
    });

    const todayButton = wrapper.find('.gts-today-button');
    expect(todayButton.text()).toContain("Aujourd'hui");

    const headerTypes = wrapper.findAll('.gts-print-calendar-header-types span');
    expect(headerTypes[0].text()).toContain('Mois');
    expect(headerTypes[1].text()).toContain('Semaine');
    expect(headerTypes[2].text()).toContain('Jour');

    const weekDays = wrapper.vm.calendarContentConfig.calendarData.weekDays;
    expect(weekDays[0]).toBe('LUN');
  });

  it('supports Arabic translations for calendar views, days and today button', () => {
    const arabicTranslations = {
      'calendar.today': 'اليوم',
      'calendar.types.month': 'شهر',
      'calendar.types.week': 'أسبوع',
      'calendar.types.day': 'يوم',
      'calendar.days.sat': 'السبت',
      'calendar.days.sun': 'الأحد',
      'calendar.noEvent': 'لا توجد أحداث'
    };

    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        firstDayOfWeek: 'السبت'
      },
      global: {
        mocks: {
          $t: (key) => arabicTranslations[key] || key
        }
      }
    });

    const todayButton = wrapper.find('.gts-today-button');
    expect(todayButton.text()).toContain('اليوم');

    const headerTypes = wrapper.findAll('.gts-print-calendar-header-types span');
    expect(headerTypes[0].text()).toContain('شهر');
    expect(headerTypes[1].text()).toContain('أسبوع');
    expect(headerTypes[2].text()).toContain('يوم');

    const weekDays = wrapper.vm.calendarContentConfig.calendarData.weekDays;
    expect(weekDays[0]).toBe('السبت');
  });

  it('does not render 3-dots action button when no actions are provided', () => {
    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        datesContent: dummyContent,
        actions: []
      }
    });

    const actionIcons = wrapper.findAll('.gts-print-calendar-content-actions-icon');
    expect(actionIcons).toHaveLength(0);
  });

  it('renders 3-dots action button when actions are provided', () => {
    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        datesContent: dummyContent,
        actions: [
          { title: 'Edit' },
          { title: 'Delete' }
        ]
      }
    });

    const actionIcons = wrapper.findAll('.gts-print-calendar-content-actions-icon');
    expect(actionIcons.length).toBeGreaterThan(0);
  });

  it('toggles ContextMenu when 3-dots action button is clicked', async () => {
    const onEdit = jest.fn();
    const wrapper = mount(CalendarComponent, {
      props: {
        startingDate: '15/05/2026',
        datesContent: dummyContent,
        actions: [
          { title: 'Edit Event', onClick: onEdit },
          { title: 'Delete Event' }
        ]
      }
    });

    const actionIcon = wrapper.find('.gts-print-calendar-content-actions-icon');
    expect(actionIcon.exists()).toBe(true);

    // Context menu should initially not be visible
    expect(wrapper.find('.gts-context-menu').exists()).toBe(false);

    // Click 3-dots button to open ContextMenu
    await actionIcon.trigger('click');
    expect(wrapper.find('.gts-context-menu').exists()).toBe(true);

    // Click the Edit action item
    const menuItems = wrapper.findAll('.gts-context-menu-item');
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].text()).toContain('Edit Event');

    await menuItems[0].trigger('click');
    expect(onEdit).toHaveBeenCalledTimes(1);
    // The handler should receive the clicked day object as the first parameter
    expect(onEdit.mock.calls[0][0]).toBeDefined();
    expect(onEdit.mock.calls[0][0].date).toBeDefined();
  });
});

