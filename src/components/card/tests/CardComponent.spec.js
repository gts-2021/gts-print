import { shallowMount } from '@vue/test-utils';
import CardComponent from '../CardComponent.vue';


describe('Tests for TextInput CardComponent', () => {
    it('Should renders correctly with default props', () => {
        const wrapper = shallowMount(CardComponent, {
            propsData: {
                actions: []
            }
        });

       
        expect(wrapper.find('.gts-card-content').exists()).toBe(true);
        expect(wrapper.find('.gts-card-actions-menu').exists()).toBe(false);
    });

    it('Should displays the actions menu when actions are provided and button is clicked', async () => {
        const actions = [
            { title: 'Action 1', onClick: jest.fn() },
            { title: 'Action 2', onClick: jest.fn() }
        ];

        const wrapper = shallowMount(CardComponent, {
            propsData: { actions }
        });

        
        const button = wrapper.find('.gts-card-actions-btn');
        expect(button.exists()).toBe(true);

       
        await button.trigger('click');

        
        expect(wrapper.find('.gts-card-actions-menu').exists()).toBe(true);

       
        const menuItems = wrapper.findAll('.gts-card-menu-item');
        expect(menuItems).toHaveLength(actions.length);
        expect(menuItems.at(0).text()).toContain('Action 1');
        expect(menuItems.at(1).text()).toContain('Action 2');
    });

    it('Should calls the correct action callback when a menu item is clicked', async () => {
        const action1Mock = jest.fn();
        const actions = [
            { title: 'Action 1', onClick: action1Mock }
        ];

        const wrapper = shallowMount(CardComponent, {
            propsData: { actions }
        });

        
        await wrapper.find('.gts-card-actions-btn').trigger('click');
        await wrapper.find('.gts-card-menu-item').trigger('click');

        expect(action1Mock).toHaveBeenCalled();
    });

    it('Should closes the menu when clicking outside', async () => {
        const actions = [
            { title: 'Action 1', onClick: jest.fn() }
        ];

        const wrapper = shallowMount(CardComponent, {
            propsData: { actions }
        });

        
        await wrapper.find('.gts-card-actions-btn').trigger('click');
        expect(wrapper.find('.gts-card-actions-menu').exists()).toBe(true);

       
        await wrapper.vm.$emit('click');
        wrapper.vm.$data.isShowMenu = false;
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.gts-card-actions-menu').exists()).toBe(false);
    });

    it('applies custom className to the card container', () => {
        const customClass = 'custom-class';
        const wrapper = shallowMount(CardComponent, {
            propsData: {
                className: customClass,
                actions: []
            }
        });

        expect(wrapper.find(`.gts-card-container.${customClass}`).exists()).toBe(true);
    });
});
