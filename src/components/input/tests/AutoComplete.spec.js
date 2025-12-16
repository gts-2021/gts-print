import { mount } from '@vue/test-utils';
import AutoComplete from '../AutoComplete.vue';

describe('Tests for AutoComplete component', () => {

    const options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
    ];

    it('Should render input and filter options', async () => {
        const wrapper = mount(AutoComplete, {
            propsData: {
                label: 'Fruit',
                options
            }
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBeTruthy();

        await input.setValue('Ap');
        expect(wrapper.vm.isOpen).toBe(true);

        const optionContainer = wrapper.find('.gts-listbox-option-container');
        expect(optionContainer.exists()).toBe(true);

        const filteredOptions = wrapper.findAll('.gts-listbox-option');
        expect(filteredOptions.length).toBe(1);
        expect(filteredOptions.at(0).text()).toBe('Apple');
    });

    it('Should select option on click', async () => {
        const wrapper = mount(AutoComplete, {
            propsData: {
                label: 'Fruit',
                options
            }
        });

        const input = wrapper.find('input');
        await input.trigger('focus');

        const optionContainer = wrapper.find('.gts-listbox-option-container');
        expect(optionContainer.exists()).toBe(true);

        const secondOption = wrapper.findAll('.gts-listbox-option').at(1); // Banana
        await secondOption.trigger('click');

        expect(wrapper.vm.inputValue).toBe('Banana');
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['banana']);
        expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should update input value when modelValue prop changes', async () => {
        const wrapper = mount(AutoComplete, {
            propsData: {
                label: 'Fruit',
                options,
                modelValue: 'cherry'
            }
        });

        expect(wrapper.vm.inputValue).toBe('Cherry');
    });

});
