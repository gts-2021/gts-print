import { shallowMount } from '@vue/test-utils';
import RadioButton from '../RadioButton.vue';
import RadioGroup from '../RadioGroup.vue';


describe('Tests for RadioButton component', () => {
  it('Should mount correctly the component', () => {
    const wrapper = shallowMount(RadioButton);
    expect(wrapper.text()).toContain('');
  });

  it('Should display label', () => {
    const label = 'Option 1';
    const wrapper = shallowMount(RadioButton, {
      props: { label }
    });
    expect(wrapper.text()).toContain(label);
  });

  it('Should emit event on checked', async () => {
    const id = '1';
    const wrapper = shallowMount(RadioButton, {
      props: { id }
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('onChecked')).toBeTruthy();
    expect(wrapper.emitted('onChecked')[0]).toEqual([id]);
  });

   
});


describe('Tests for RadioGroup component', () => {
  const radios = [
    { label: 'Option 1' },
    { label: 'Option 2' },
    { label: 'Option 3' }
  ];

  it('Should display RadioButtons', () => {
    const wrapper = shallowMount(RadioGroup, {
      props: { radios }
    });

    const radioButtons = wrapper.findAllComponents(RadioButton);
    expect(radioButtons.length).toBe(radios.length);
  });

  it('Should RadioButtons take the props', () => {
    const wrapper = shallowMount(RadioGroup, {
      props: { radios }
    });

    const firstButton = wrapper.findComponent(RadioButton);
    expect(firstButton.props('label')).toBe(radios[0].label);
  });

  it('Should change the selected item when onChecked', async () => {
    const wrapper = shallowMount(RadioGroup, {
      props: { radios }
    });

    const radioButton = wrapper.findComponent(RadioButton);
    await radioButton.vm.$emit('onChecked', 0);

    expect(wrapper.vm.itemSelected).toBe(0);
  });

  it('Should emit event when radio checked', async () => {
    const wrapper = shallowMount(RadioGroup, {
      props: { radios }
    });

    const radioButton = wrapper.findComponent(RadioButton);
    await radioButton.vm.$emit('onChecked', 0);

    expect(wrapper.emitted('onRadioChecked')).toBeTruthy();
    expect(wrapper.emitted('onRadioChecked')[0]).toEqual([radios[0]]);
  });
});

