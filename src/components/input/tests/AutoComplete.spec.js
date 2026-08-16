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
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Banana']);
        expect(wrapper.vm.isOpen).toBe(false);
    });

    it('Should find option by value in options and update input value when selectedOption changes', async () => {
        const wrapper = mount(AutoComplete, {
            propsData: {
                label: 'Fruit',
                options
            }
        });

        await wrapper.setProps({
            selectedOption: { value: 'cherry' }
        });

        expect(wrapper.vm.inputValue).toBe('Cherry');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Cherry']);
    });

    it('Should resolve matching option from options by value and ignore different label in selectedOption', async () => {
        const wrapper = mount(AutoComplete, {
            propsData: {
                label: 'Fruit',
                options: [
                    { label: 'Banana', value: 1 },
                    { label: 'Apple', value: 2 }
                ]
            }
        });

        // Pass selectedOption with label 'Kiwi' but value 1
        await wrapper.setProps({
            selectedOption: { label: 'Kiwi', value: 1 }
        });

        // Should display 'Banana' from options, not 'Kiwi'
        expect(wrapper.vm.inputValue).toBe('Banana');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Banana']);
    });

    it('Should use formatSelectedValueDisplay when provided', async () => {
        const wrapper = mount(AutoComplete, {
            propsData: {
                label: 'Fruit',
                options,
                formatSelectedValueDisplay: (opt) => `Selected: ${opt.label}`
            }
        });

        await wrapper.setProps({
            selectedOption: { value: 'banana' }
        });

        expect(wrapper.vm.inputValue).toBe('Selected: Banana');
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Selected: Banana']);
    });

});
