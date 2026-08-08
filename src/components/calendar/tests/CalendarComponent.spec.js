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

    const todayBadge = wrapper.find('.gts-today-badge');
    expect(todayBadge.exists()).toBe(true);
    expect(todayBadge.text()).toContain('Today');

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
});
