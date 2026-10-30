import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import AutoComplete from '../AutoComplete.vue';

describe('Tests for AutoComplete component', () => {

    const options = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
    ];

    it('Clears typed text, resets filtering and restores focus without submitting a form', async () => {
        const wrapper = mount(AutoComplete, {
            attachTo: document.body,
            props: { label: 'Fruit', options }
        });
        try {
            expect(wrapper.find('button').exists()).toBe(false);
            await wrapper.find('input').setValue('Ap');
            const button = wrapper.get('button');
            expect(button.attributes('type')).toBe('button');
            expect(button.attributes('aria-label')).toBeTruthy();
            await button.trigger('click');

            expect(wrapper.get('input').element.value).toBe('');
            expect(document.activeElement).toBe(wrapper.get('input').element);
            expect(wrapper.find('button').exists()).toBe(false);
            expect(wrapper.find('.gts-listbox-option-container').exists()).toBe(false);
            expect(wrapper.emitted('update:modelValue').slice(-1)[0]).toEqual(['']);
            expect(wrapper.emitted('update:selectedOption').slice(-1)[0]).toEqual([undefined]);
            expect(wrapper.emitted('onSelectionReset').slice(-1)[0]).toEqual([undefined]);
            expect(wrapper.emitted('onValueChanged').slice(-1)[0]).toEqual(['']);
            expect(wrapper.emitted('onOptionSelected')).toBeUndefined();
            await wrapper.get('input').trigger('focus');
            expect(wrapper.findAll('.gts-listbox-option')).toHaveLength(options.length);
        } finally {
            wrapper.unmount();
        }
    });

    it('Clears both parent models and does not restore the selection when options refresh', async () => {
        const wrapper = mount(defineComponent({
            components: { AutoComplete },
            data: () => ({ text: '', selected: options[1], fruits: options }),
            methods: { format: option => `Selected: ${option.label}` },
            template: `<AutoComplete label="Fruit" v-model="text" v-model:selectedOption="selected"
                :options="fruits" :formatSelectedValueDisplay="format" />`
        }));
        expect(wrapper.get('input').element.value).toBe('Selected: Banana');
        await wrapper.get('button').trigger('click');
        expect(wrapper.vm.text).toBe('');
        expect(wrapper.vm.selected).toBeUndefined();
        await wrapper.setData({ fruits: [...options] });
        expect(wrapper.get('input').element.value).toBe('');
        await wrapper.get('input').setValue('Ch');
        await wrapper.get('.gts-listbox-option').trigger('click');
        expect(wrapper.vm.selected).toEqual(options[2]);
        expect(wrapper.vm.text).toBe('Selected: Cherry');
        wrapper.unmount();
    });

    it('Allows hiding the button while preserving typing and selection', async () => {
        const wrapper = mount(AutoComplete, { props: { label: 'Fruit', options, clearable: false } });
        await wrapper.get('input').setValue('Ba');
        expect(wrapper.find('button').exists()).toBe(false);
        await wrapper.get('.gts-listbox-option').trigger('click');
        expect(wrapper.get('input').element.value).toBe('Banana');
        expect(wrapper.emitted('onOptionSelected')[0]).toEqual([options[1]]);
        await wrapper.setProps({ clearable: true });
        expect(wrapper.find('button').exists()).toBe(true);
        wrapper.unmount();
    });

    it('Prevents clearing a disabled input', async () => {
        const wrapper = mount(AutoComplete, {
            props: { label: 'Fruit', options, modelValue: 'Apple', disabled: true }
        });
        expect(wrapper.get('button').element.disabled).toBe(true);
        await wrapper.get('button').trigger('click');
        expect(wrapper.get('input').element.value).toBe('Apple');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        expect(wrapper.emitted('onSelectionReset')).toBeUndefined();
        wrapper.unmount();
    });

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
