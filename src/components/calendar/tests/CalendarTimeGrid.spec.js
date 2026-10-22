import { mount } from '@vue/test-utils';
import CalendarTimeGrid from '../CalendarTimeGrid.vue';

const calendarData = { calendars: [[
  { date: '22/10/2026', name: 'THU', number: '22' },
  { date: '23/10/2026', name: 'FRI', number: '23' },
]] };

describe('CalendarTimeGrid', () => {
  it('uses exact closing boundaries including an explicit 24:00', async () => {
    const wrapper = mount(CalendarTimeGrid, { props: { calendarData, startTime: 8, endTime: 18 } });
    expect(wrapper.findAll('.gts-time-grid-hour')).toHaveLength(10);
    expect(wrapper.find('.gts-time-grid-corner').text()).toBe('08:00 – 18:00');
    await wrapper.setProps({ startTime: 0, endTime: 24 });
    expect(wrapper.findAll('.gts-time-grid-hour')).toHaveLength(24);
    expect(wrapper.find('.gts-time-grid-end').text()).toBe('24:00');
  });

  it('tracks the mouse using actual day bounds and configured height, and clears on leave or scroll', async () => {
    const wrapper = mount(CalendarTimeGrid, { props: {
      calendarData, startTime: 8, endTime: 18, hourHeight: 80, timeGridClass: 'booking-grid',
    } });
    expect(wrapper.classes()).toContain('booking-grid');
    expect(wrapper.find('.gts-time-grid').attributes('style')).toContain('--gts-hour-height: 80px');
    const day = wrapper.find('.gts-time-grid-day');
    day.element.getBoundingClientRect = () => ({ top: -100, height: 800 });
    await day.trigger('mousemove', { clientY: 20 });
    expect(wrapper.findAll('.gts-time-grid-cursor')).toHaveLength(2);
    expect(wrapper.find('.gts-time-grid-cursor span').text()).toBe('09:30');
    expect(wrapper.find('.gts-time-grid-cursor').attributes('style')).toContain('top: 120px');
    await day.trigger('mouseleave');
    expect(wrapper.find('.gts-time-grid-cursor').exists()).toBe(false);
    await day.trigger('mousemove', { clientY: 20 });
    await wrapper.trigger('scroll');
    expect(wrapper.find('.gts-time-grid-cursor').exists()).toBe(false);
    await day.trigger('mousemove', { clientY: 20 });
    await wrapper.setProps({ hourHeight: 100 });
    expect(wrapper.find('.gts-time-grid-cursor').exists()).toBe(false);
  });
});
