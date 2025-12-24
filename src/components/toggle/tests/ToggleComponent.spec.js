import { mount } from '@vue/test-utils';
import ToggleComponent from '../ToggleComponent.vue';

describe('Tests for ToggleComponent', () => {
    it('Should correctly mount component', () => {
        const wrapper = mount(ToggleComponent);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should display label', () => {
        const label = 'Enable Feature';
        const wrapper = mount(ToggleComponent, {
            props: { label }
        });
        expect(wrapper.text()).toContain(label);
    });

    it('Should display checked state by default', () => {
        const wrapper = mount(ToggleComponent, {
            props: { isChecked: true }
        });
        expect(wrapper.find('.gts-toggle--checked').exists()).toBe(true);
        expect(wrapper.vm.isToggleChecked).toBe(true);
    });

    it('Should display unchecked state by default', () => {
        const wrapper = mount(ToggleComponent, {
            props: { isChecked: false }
        });
        expect(wrapper.find('.gts-toggle--checked').exists()).toBe(false);
        expect(wrapper.vm.isToggleChecked).toBe(false);
    });

    it('Should toggle check on click', async () => {
        const wrapper = mount(ToggleComponent);
        await wrapper.find('.gts-toggle').trigger('click');
        expect(wrapper.vm.isToggleChecked).toBe(true);
        expect(wrapper.find('.gts-toggle--checked').exists()).toBe(true);
    });

    it('Should emit events on toggle', async () => {
        const wrapper = mount(ToggleComponent);
        await wrapper.find('.gts-toggle').trigger('click');

        // Check onToggle emission
        expect(wrapper.emitted('onToggle')).toBeTruthy();
        expect(wrapper.emitted('onToggle')[0]).toEqual([true]);

        // Check update:isChecked emission (v-model)
        expect(wrapper.emitted('update:isChecked')).toBeTruthy();
        expect(wrapper.emitted('update:isChecked')[0]).toEqual([true]);
    });

    it('Should NOT update internal state if noBind is true', async () => {
        const wrapper = mount(ToggleComponent, {
            props: {
                isChecked: false,
                noBind: true
            }
        });

        await wrapper.find('.gts-toggle').trigger('click');

        // Should emit onToggle with the intent (true)
        expect(wrapper.emitted('onToggle')).toBeTruthy();
        expect(wrapper.emitted('onToggle')[0]).toEqual([true]);

        // Should NOT emit update:isChecked
        expect(wrapper.emitted('update:isChecked')).toBeFalsy();

        // Internal state should remain false because noBind prevents auto-update
        expect(wrapper.vm.isToggleChecked).toBe(false);
        expect(wrapper.find('.gts-toggle--checked').exists()).toBe(false);
    });
});
