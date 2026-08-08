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

  it('Should toggle collapse state when toggle button is clicked', async () => {
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
      },
    });

    expect(wrapper.classes()).not.toContain('barside-collapsed');
    const toggleBtn = wrapper.find('.barside-toggle-btn');
    expect(toggleBtn.exists()).toBe(true);

    await toggleBtn.trigger('click');

    expect(wrapper.classes()).toContain('barside-collapsed');
    expect(wrapper.emitted().toggleCollapse).toBeTruthy();

    await toggleBtn.trigger('click');
    expect(wrapper.classes()).not.toContain('barside-collapsed');
  });

  it('Should hide item titles but keep item icons rendered when collapsed', async () => {
    const wrapper = mount(BarSide, {
      propsData: {
        menus,
      },
    });

    expect(wrapper.findAll('.barside-item-title').length).toBe(4);
    expect(wrapper.findAll('.barside-item-icon').length).toBe(4);

    await wrapper.find('.barside-toggle-btn').trigger('click');

    expect(wrapper.findAll('.barside-item-title').length).toBe(0);
    expect(wrapper.findAll('.barside-item-icon').length).toBe(4);
  });
});
