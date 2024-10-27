import { mount } from '@vue/test-utils';
import TextInput from '../TextInput.vue';
 
describe('TextInput.vue', () => {
   
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
