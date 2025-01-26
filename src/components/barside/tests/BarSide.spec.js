import { mount } from '@vue/test-utils';
import BarSide from '@/components/barside/BarSide.vue';
import BarSideMenu from '@/components/barside/BarSideMenu.vue';
import BarSideItem from '../BarSideItem.vue';

describe('BarSide.vue', () => {
  const menus = [
    [
      { title: 'Home', icon: 'home' },
      { title: 'Settings', icon: 'settings' },
    ],
    [
      { title: 'Profile', icon: 'user' },
      { title: 'Logout', icon: 'logout' },
    ],
  ];

  
  it('Should Affiche multiple menus', () => {
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
      },
    });

    const barSideMenus = wrapper.findAllComponents(BarSideMenu);
    expect(barSideMenus.length).toBe(menus.length);

     
    barSideMenus.forEach((menuWrapper, index) => {
      expect(menuWrapper.props('items')).toEqual(menus[index]);
      expect(menuWrapper.props('itemActiveTitle')).toBe(""); 
    });
  });

   
  it('Should receive the BarSideItem click event ', async () => {
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
      },
    });

     
    const firstItem = wrapper.findComponent(BarSideItem);
    await firstItem.trigger('click');

    
    expect(wrapper.vm.itemActiveTitle).toBe('Home');
  });

  
  it('Should render logo', () => {
    const logo = { src: 'logo.png', alt: 'Logo' }; 
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
        logo,
      },
    });

    const logoElement = wrapper.find('.barside-logo');
    expect(logoElement.exists()).toBe(true);
    expect(logoElement.text()).toBe('Logo');
  });

  
  it('Should render line menus separator', () => {
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
      },
    });

    const separators = wrapper.findAll('.barside-menu-separation');
    expect(separators.length).toBe(menus.length - 1); // Vérifie qu'il y a un séparateur entre les menus
  });

  it('Should dynamically select item', async () => {
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
        selectedItem:'Profile'
      },
    });

     
    const items = wrapper.findAllComponents(BarSideItem);
    const profileItem = items.find(item => item.props('title') === 'Profile');

    expect(profileItem.classes()).toContain('active');
   
  });
});
