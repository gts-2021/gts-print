import { shallowMount } from '@vue/test-utils';
import ButtonComponent from '@/components/button/ButtonComponent.vue';
import { PRIMARY } from '@/constants/buttons.js';

describe('ButtonComponent test : ', () => {
  
  // test if button render title and icon
  it('ButtonComponent should render title and icon', () => {
    const title = 'primary button';
    const icon = { position: 'left', class: 'mdi-icon-class', isExternalIcon: false };

    const wrapper = shallowMount(ButtonComponent, {
      propsData: { title, icon },
      stubs: { 'v-icon': true },  
    });

    expect(wrapper.find('.gts-button-title').text()).toBe(title);
    expect(wrapper.find('.gts-button-icon').exists()).toBe(true);
  });

  // test if button emit event
  it('ButtonComponent should emit event to parent when is clicked', async () => {

    const title = 'Title';
    const icon = { position: 'left', class: 'mdi-icon-class', isExternalIcon: false };

    const wrapper = shallowMount(ButtonComponent, {
      propsData: { title ,icon} ,    
      stubs: { 'v-icon': true },  
    });

     await wrapper.find('button').trigger('click');
     expect(wrapper.emitted().buttonClicked).toBeTruthy();
  });

  // test if button apply theme
  it('ButtonComponent should correctly apply theme', async () => {

    const wrapper = shallowMount(ButtonComponent, {
      data() {
        return {
          PRIMARY
        };
      }
    });
  
    const button = wrapper.find('button');

    expect(button.classes()).toContain('gts-button-primary');
  
  });

   // test if button apply className
   it('ButtonComponent should correctly apply theme', async () => {
    const className = 'gts-btn-custom'
    
    const wrapper = shallowMount(ButtonComponent, {
      propsData: {className },
    });
  
    const button = wrapper.find('button');

    expect(button.classes()).toContain(className);
    
  });

   // test if button apply left icon
   it('ButtonComponent should correctly apply theme', async () => {
    
    const icon = { position: 'left', class: 'mdi-icon-class-left', isExternalIcon: false };

    const wrapper = shallowMount(ButtonComponent, {
      propsData: { icon },
      stubs: { 'v-icon': true },  
    });
    const leftIcon = wrapper.find('.gts-button-content .gts-button-icon');
    expect(leftIcon.text()).toContain(icon.class);
    
  });

  // test if button apply right icon
  it('ButtonComponent should correctly apply theme', async () => {
    const icon = { position: 'right', class: 'mdi-icon-class-right', isExternalIcon: false };

    const wrapper = shallowMount(ButtonComponent, {
      propsData: { icon },
      stubs: { 'v-icon': true },  
    });
    const rightIcon = wrapper.find('.gts-button-content .gts-button-icon');
    expect(rightIcon.text()).toContain(icon.class);
  
  });


});
