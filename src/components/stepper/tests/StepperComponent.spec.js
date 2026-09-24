import { mount } from '@vue/test-utils';
import StepperComponent from '../StepperComponent.vue';

describe('StepperComponent.vue', () => {
	const defaultSteps = [
		{ id: 'step-1', title: 'Account Details' },
		{ id: 'step-2', title: 'Personal Info' },
		{ id: 'step-3', title: 'Review & Submit' }
	];

	it('renders all steps and titles correctly', () => {
		const wrapper = mount(StepperComponent, {
			props: {
				steps: defaultSteps,
				selectedSteps: ['step-1']
			}
		});

		const stepElements = wrapper.findAll('.gts-stepper-step');
		expect(stepElements).toHaveLength(3);
		expect(stepElements[0].text()).toContain('Account Details');
		expect(stepElements[0].classes()).toContain('gts-stepper-step-selected');
		expect(stepElements[1].classes()).not.toContain('gts-stepper-step-selected');
	});

	it('emits onStepClicked when a step is clicked', async () => {
		const wrapper = mount(StepperComponent, {
			props: {
				steps: defaultSteps,
				selectedSteps: ['step-1']
			}
		});

		const stepElements = wrapper.findAll('.gts-stepper-step');
		await stepElements[1].trigger('click');

		expect(wrapper.emitted('onStepClicked')).toBeTruthy();
		expect(wrapper.emitted('onStepClicked')[0][0]).toEqual({
			index: 1,
			id: 'step-2',
			title: 'Personal Info'
		});
	});
});