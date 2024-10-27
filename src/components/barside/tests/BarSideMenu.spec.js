import { mount } from '@vue/test-utils';
import BarSideMenu from '@/components/barside/BarSideMenu.vue';
import BarSideItem from '@/components/barside/BarSideItem.vue';

describe('BarSideMenu.vue', () => {
  const items = [
    { title: 'Home', icon: 'home' },
    { title: 'Settings', icon: 'settings' },
    { title: 'Profile', icon: 'user' },
  ];

  
  it('Should render the BarSideItems', () => {

    const itemActiveTitle = 'Home';
    const wrapper = mount(BarSideMenu, {
      propsData: {
        items,
        itemActiveTitle,
      },
    });

    const barSideItems = wrapper.findAllComponents(BarSideItem);
    expect(barSideItems.length).toBe(items.length);
    
    
    items.forEach((item, index) => {
      const barSideItem = barSideItems.at(index);
      expect(barSideItem.props('title')).toBe(item.title);
      expect(barSideItem.props('icon')).toBe(item.icon);
      expect(barSideItem.props('active')).toBe(itemActiveTitle === item.title);
    });
  });

  
  it('Should emit event to BarSide when BarSideItem clicked', async () => {
    const wrapper = mount(BarSideMenu, {
      propsData: {
        items,
        itemActiveTitle: 'Home',
      },
    });

    const firstItem = wrapper.findComponent(BarSideItem);
    await firstItem.trigger('click');

    expect(wrapper.emitted().barsideItemClicked).toBeTruthy();
    expect(wrapper.emitted().barsideItemClicked[0]).toEqual([items[0].title]);
  });

   
  it('Should change the style of selected BarSideItem', () => {
    const wrapper = mount(BarSideMenu, {
      propsData: {
        items,
        itemActiveTitle: 'Settings', // Simule que 'Settings' est actif
      },
    });

    const barSideItems = wrapper.findAllComponents(BarSideItem);
    barSideItems.forEach((itemWrapper, index) => {
      if (items[index].title === 'Settings') {
        expect(itemWrapper.classes()).toContain('active');
      } else {
        expect(itemWrapper.classes()).not.toContain('active');
      }
    });
  });
});
