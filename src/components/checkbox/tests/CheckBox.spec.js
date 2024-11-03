import { mount } from '@vue/test-utils';
import CheckBox from '../CheckBox.vue';
 

describe('Tests for CehckBox component', () => {
  it('Should correctly mount component', () => {
    const wrapper = mount(CheckBox);
    expect(wrapper.text()).toContain('');
  });

  it('Should display lable', () => {
    const label = 'Option 1';
    const wrapper = mount(CheckBox, {
      props: { label }
    });
    expect(wrapper.text()).toContain(label);
  });

  it('Should display checked', () => {
    const wrapper = mount(CheckBox, {
      props: { isChecked: true }
    });

     
    expect(wrapper.find('svg.gts-checkbox-checked').exists()).toBe(true);
  });

  it('Should display unchecked', () => {
    const wrapper = mount(CheckBox, {
      props: { isChecked: false }
    });

    
    expect(wrapper.find('svg.gts-checkbox-checked').exists()).toBe(false);
  });

  it('Should toggle check ', async () => {
    const wrapper = mount(CheckBox);
    await wrapper.find('.gts-checkbox').trigger('click');
    expect(wrapper.vm.isRadioChecked).toBe(true);
  });

  it('Should emit toggle event', async () => {
    const wrapper = mount(CheckBox);

    await wrapper.find('.gts-checkbox').trigger('click');
    expect(wrapper.emitted('onToggle')).toBeTruthy();
    expect(wrapper.emitted('onToggle')[0]).toEqual([true]);

    await wrapper.find('.gts-checkbox').trigger('click');
    expect(wrapper.emitted('onToggle')[1]).toEqual([false]);
  });

  it('Should display the right value based on prop isChecked', () => {
    const wrapper = mount(CheckBox, {
      props: { isChecked: true }
    });
    expect(wrapper.vm.isRadioChecked).toBe(true);
  });
});
