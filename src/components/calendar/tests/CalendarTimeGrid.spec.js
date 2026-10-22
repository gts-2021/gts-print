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

  it('automatically calculates top and height for day.slots and renders slot component', async () => {
    const testSlotComponent = {
      name: 'TestSlot',
      props: ['slot', 'startTime', 'endTime', 'hourHeight'],
      template: '<div class="test-slot-inner">{{ slot.title }}: {{ startTime }}-{{ endTime }}</div>',
    };

    const calendarDataWithSlots = {
      calendars: [[
        {
          date: '22/10/2026',
          name: 'THU',
          number: '22',
          slots: [
            {
              startTime: '09:00',
              endTime: '10:30',
              title: 'Morning Meeting',
              component: testSlotComponent,
            },
            {
              startTime: '14:00',
              endTime: '15:45',
              title: 'Afternoon Workshop',
              component: testSlotComponent,
            },
          ],
        },
        {
          date: '23/10/2026',
          name: 'FRI',
          number: '23',
          slots: [],
        },
      ]],
    };

    const wrapper = mount(CalendarTimeGrid, {
      props: {
        calendarData: calendarDataWithSlots,
        startTime: 8,
        endTime: 18,
        hourHeight: 60,
      },
    });

    const slots = wrapper.findAll('.gts-time-grid-slot');
    expect(slots).toHaveLength(2);

    // Slot 1: 09:00 - 10:30 (1.5h), start is 1h after 08:00
    // top = (9 - 8) * 60 = 60px, height = 1.5 * 60 = 90px
    expect(slots[0].attributes('style')).toContain('top: 60px');
    expect(slots[0].attributes('style')).toContain('height: 90px');
    expect(slots[0].find('.test-slot-inner').text()).toBe('Morning Meeting: 09:00-10:30');

    // Slot 2: 14:00 - 15:45 (1.75h), start is 6h after 08:00
    // top = (14 - 8) * 60 = 360px, height = 1.75 * 60 = 105px
    expect(slots[1].attributes('style')).toContain('top: 360px');
    expect(slots[1].attributes('style')).toContain('height: 105px');
    expect(slots[1].find('.test-slot-inner').text()).toBe('Afternoon Workshop: 14:00-15:45');
  });

  it('renders default slot representation when no component is specified', async () => {
    const calendarDataWithDefaultSlot = {
      calendars: [[
        {
          date: '22/10/2026',
          name: 'THU',
          number: '22',
          slots: [
            {
              startTime: '10:00',
              endTime: '11:30',
              title: 'Default Slot Title',
            },
          ],
        },
      ]],
    };

    const wrapper = mount(CalendarTimeGrid, {
      props: {
        calendarData: calendarDataWithDefaultSlot,
        startTime: 8,
        endTime: 18,
        hourHeight: 80,
      },
    });

    const slot = wrapper.find('.gts-time-grid-slot');
    expect(slot.exists()).toBe(true);
    // top = (10 - 8) * 80 = 160px, height = 1.5 * 80 = 120px
    expect(slot.attributes('style')).toContain('top: 160px');
    expect(slot.attributes('style')).toContain('height: 120px');
    expect(slot.find('.gts-time-grid-slot-title').text()).toBe('Default Slot Title');
    expect(slot.find('.gts-time-grid-slot-time').text()).toBe('10:00 – 11:30');
  });

  it('falls back to day.content when day.slots is not provided', async () => {
    const fallbackComponent = {
      name: 'FallbackContent',
      template: '<div class="fallback-day-content">Custom Content</div>',
    };

    const calendarDataWithFallback = {
      calendars: [[
        {
          date: '22/10/2026',
          name: 'THU',
          number: '22',
          content: fallbackComponent,
        },
      ]],
    };

    const wrapper = mount(CalendarTimeGrid, {
      props: {
        calendarData: calendarDataWithFallback,
        startTime: 8,
        endTime: 18,
      },
    });

    expect(wrapper.find('.fallback-day-content').exists()).toBe(true);
    expect(wrapper.find('.fallback-day-content').text()).toBe('Custom Content');
  });

  it('positions overlapping slots side-by-side with divided widths and respects their heights', async () => {
    const calendarDataWithOverlaps = {
      calendars: [[
        {
          date: '22/10/2026',
          name: 'THU',
          number: '22',
          slots: [
            {
              startTime: '09:00',
              endTime: '10:30',
              title: 'Consultation A',
            },
            {
              startTime: '09:30',
              endTime: '11:00',
              title: 'Consultation B',
            },
          ],
        },
      ]],
    };

    const wrapper = mount(CalendarTimeGrid, {
      props: {
        calendarData: calendarDataWithOverlaps,
        startTime: 8,
        endTime: 18,
        hourHeight: 60,
      },
    });

    const slots = wrapper.findAll('.gts-time-grid-slot');
    expect(slots).toHaveLength(2);

    expect(slots[0].classes()).toContain('is-overlapping');
    expect(slots[1].classes()).toContain('is-overlapping');

    // Slot 1 (09:00-10:30, col 0/2)
    expect(slots[0].attributes('style')).toContain('top: 60px');
    expect(slots[0].attributes('style')).toContain('height: 90px');
    expect(slots[0].attributes('style')).toContain('left: calc(0% + 2px)');
    expect(slots[0].attributes('style')).toContain('width: calc(50% - 4px)');

    // Slot 2 (09:30-11:00, col 1/2)
    expect(slots[1].attributes('style')).toContain('top: 90px');
    expect(slots[1].attributes('style')).toContain('height: 90px');
    expect(slots[1].attributes('style')).toContain('left: calc(50% + 2px)');
    expect(slots[1].attributes('style')).toContain('width: calc(50% - 4px)');
  });

  it('applies timeGridContentClass to gts-time-grid-content container', async () => {
    const calendarDataWithSlots = {
      calendars: [[
        {
          date: '22/10/2026',
          name: 'THU',
          number: '22',
          slots: [
            {
              startTime: '09:00',
              endTime: '10:00',
              title: 'Meeting',
            },
          ],
        },
      ]],
    };

    const wrapper = mount(CalendarTimeGrid, {
      props: {
        calendarData: calendarDataWithSlots,
        startTime: 8,
        endTime: 18,
        timeGridContentClass: 'custom-content-class',
      },
    });

    const content = wrapper.find('.gts-time-grid-content');
    expect(content.exists()).toBe(true);
    expect(content.classes()).toContain('custom-content-class');
  });
});
