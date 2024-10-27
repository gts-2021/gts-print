import { shallowMount } from '@vue/test-utils';
import BarSideItem from '@/components/barside/BarSideItem.vue';

describe('BarsideItem Quality Assurance : ', () => {
  
   
  it('BarsideItem should render title and icon', () => {
    const title = 'Test Title';
    const icon = 'home';
    const wrapper = shallowMount(BarSideItem, {
      propsData: { title, icon },
      stubs: { 'v-icon': true },  
    });

    expect(wrapper.find('.barside-item-title').text()).toBe(title);
    expect(wrapper.find('.barside-item-icon').exists()).toBe(true);
  });

    it('BarsideItem should have the active style', () => {
    const wrapper = shallowMount(BarSideItem, {
      propsData: { title: 'Active Test', active: true },
      stubs: { 'v-icon': true },
    });

    expect(wrapper.find('.barside-item').classes()).toContain('active');
  });

     it('BarSideItem should emit event to parent when clicked with title of item', async () => {
    const title = 'Click Test';
    const wrapper = shallowMount(BarSideItem, {
      propsData: { title },
      stubs: { 'v-icon': true },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted().barsideItemClicked).toBeTruthy();
    expect(wrapper.emitted().barsideItemClicked[0]).toEqual([title]);
  });

});
