import { mount, config } from '@vue/test-utils';
import TextInput from '../TextInput.vue';
import ListBox from '../ListBox.vue';

// Mock maska
jest.mock('maska/vue', () => ({ vMaska: {} }), { virtual: true });

config.global.mocks = {
  $t: (key) => key,
  ...config.global.mocks
};
 
describe('Tests for TextInput component', () => {
   
  it('Test basic input display', () => {
    const label = "First Name"
    const placeholder = "this is first name";
    const wrapper = mount(TextInput, {
      propsData: {
        label,
        placeholder
      },
    });

    const labelIem = wrapper.find('.gts-input-label');
    expect(labelIem.text()).toBe(label);

    const textInp = wrapper.find('.gts-input');
    expect(textInp.exists()).toBeTruthy()
    expect(textInp.element.placeholder).toBe(placeholder);
  
    const requiredLabel = wrapper.find('.gts-input-required');
    expect(requiredLabel.exists()).toBeFalsy()

    const errorMsg = wrapper.find('.gts-input-error-msg');
    expect(errorMsg.exists()).toBeFalsy()

    const calendarIcon = wrapper.find('.gts-calendar-icon');
    expect(calendarIcon.exists()).toBeFalsy();

  });

  it('Should  show required', () => {
    const label = "First Name"
    const wrapper = mount(TextInput, {
      propsData: {
        label,
        required: true
      },
    });

    const requiredLabel = wrapper.find('.gts-input-required');
    expect(requiredLabel.exists()).toBeTruthy()
  });

  it('Should show error msg', () => {
    const label = "First Name"
    const error = "should not be empty"
    const wrapper = mount(TextInput, {
      propsData: {
        label,
        error
      },
    });

    const errorMsg = wrapper.find('.gts-input-error-msg');
    expect(errorMsg.exists()).toBeTruthy();
    expect(errorMsg.text()).toBe(error)
  });

  it('Should show password value', () => {
    const label = "Password"
    const type = "password"
    const wrapper = mount(TextInput, {
      propsData: {
        label,
        type
      },
    });

    const showPasswordIcon = wrapper.find('.gts-show-password');
    expect(showPasswordIcon.exists()).toBeTruthy();
    
    
    const hidePasswordIcon = wrapper.find('.gts-hide-password');
    expect(hidePasswordIcon.exists()).toBeFalsy();
  });

  it('Should show calendar icon for datepicker', async () => {
    const label = "Choose date"
     
    const wrapper = mount(TextInput, {
      propsData: {
        label,
        type: 'date'
      },
    });

    const calendarIcon = wrapper.find('.gts-calendar-icon');
    expect(calendarIcon.exists()).toBeTruthy();

    
    /*

    await calendarIcon.trigger('click');
    const input = wrapper.find('input[type="date"]');
    const calendarInp = wrapper.find('.gts-input')
    expect(calendarInp).toBe(input);
    */
  });

   
  
});

describe('Tests for ListBox component', () => {

  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  it('Should use first option as default valuet', () => {
    const wrapper = mount(ListBox, {
      propsData: { options }
    });
    expect(wrapper.find('.gts-listbox-value').text()).toBe('Option 1');
  });

  it('Should toggle open/close Listbox when click', async () => {
    const wrapper = mount(ListBox, {
      propsData: { options }
    });
    const dropdownIcon = wrapper.find('.gts-listbox-dropdown');
    
    
    await dropdownIcon.trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.find('.gts-listbox-option-container').exists()).toBe(true);

     
    await dropdownIcon.trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.find('.gts-listbox-option-container').exists()).toBe(false);
  });

  it('Should select display option selected and close ListBox', async () => {
    const wrapper = mount(ListBox, {
      propsData: { options }
    });
    const dropdownIcon = wrapper.find('.gts-listbox-dropdown');
    await dropdownIcon.trigger('click');  

     
    const secondOption = wrapper.findAll('.gts-listbox-option').at(1);
    await secondOption.trigger('click');
    
    expect(wrapper.vm.inputValue).toEqual(options[1]);
    expect(wrapper.find('.gts-listbox-value').text()).toBe('Option 2');
    expect(wrapper.find('.gts-listbox-option-container').exists()).toBe(false);
  });

  it('Should not open ListBox if disabled', async () => {
    const wrapper = mount(ListBox, {
      propsData: { options, disabled: true }
    });
    const dropdownIcon = wrapper.find('.gts-listbox-dropdown');
    await dropdownIcon.trigger('click');
    
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.find('.gts-listbox-option-container').exists()).toBe(false);
  });

  it('Should use style for error', () => {
    const wrapper = mount(ListBox, {
      propsData: { options, error: "input has error" }
    });
    expect(wrapper.find('.gts-input').classes()).toContain('gts-input-error');
  });

  it('Should render custom component for options when formatter function is provided', async () => {
    const CustomOptionComponent = {
      name: 'CustomOptionComponent',
      props: ['item', 'index'],
      template: '<div class="custom-listbox-item">Index: {{ index }} | Label: {{ item.label }}</div>'
    };

    const wrapper = mount(ListBox, {
      propsData: {
        options,
        formatter: (item, index) => CustomOptionComponent
      }
    });

    const dropdownIcon = wrapper.find('.gts-listbox-dropdown');
    await dropdownIcon.trigger('click');

    const customItems = wrapper.findAll('.custom-listbox-item');
    expect(customItems).toHaveLength(options.length);
    expect(customItems[0].text()).toContain('Index: 0 | Label: Option 1');
    expect(customItems[1].text()).toContain('Index: 1 | Label: Option 2');
    expect(customItems[2].text()).toContain('Index: 2 | Label: Option 3');

    // Selecting a formatted item
    await wrapper.findAll('.gts-listbox-option').at(1).trigger('click');
    expect(wrapper.vm.inputValue).toEqual(options[1]);
    expect(wrapper.emitted('onValueChanged')).toBeTruthy();
    expect(wrapper.emitted('onValueChanged')[0][0]).toEqual(options[1]);
  });

  it('Should fallback to option.label when formatter returns null', async () => {
    const CustomOptionComponent = {
      name: 'CustomOptionComponent',
      props: ['item', 'index'],
      template: '<div class="custom-item-component">{{ item.label }} - Custom</div>'
    };

    const wrapper = mount(ListBox, {
      propsData: {
        options,
        formatter: (item, index) => (index === 0 ? null : CustomOptionComponent)
      }
    });

    const dropdownIcon = wrapper.find('.gts-listbox-dropdown');
    await dropdownIcon.trigger('click');

    const optionElements = wrapper.findAll('.gts-listbox-option');
    expect(optionElements[0].find('.custom-item-component').exists()).toBe(false);
    expect(optionElements[0].text()).toBe('Option 1');

    expect(optionElements[1].find('.custom-item-component').exists()).toBe(true);
    expect(optionElements[1].text()).toBe('Option 2 - Custom');
  });
});

