<template>

	<div :class="['gts-stepper', className]">

		<template v-for="(step, index) in steps" :key="index">
			<div :id="step.id" :class="'gts-stepper-step '+(selectedSteps.includes(step.id) ? 'gts-stepper-step-selected' : '')" @click="onStepClicked(index, step)">
				<span class="gts-step-number">{{index + 1}}</span>
				<span class="gts-step-title">{{step.title}}</span>
			</div>
			<div v-if="steps.length - 1 != index" class="gts-stepper-separator"></div>
		</template>

	</div>

</template>

<script>





export default {

	name: 'StepperComponent',
	emits: ['onStepClicked'],
	props: {
		className: {
			type: String,
			required: false,
		},
		steps: {
			type: Array,
			required: true,
			default: () => [],
		},
		selectedSteps: {
			type: Array,
			required: true,
			default: () => [],
		}

	},

	methods: {
		onStepClicked(index, selectedStep){
			let step = {
				index, ...selectedStep
			}
			this.$emit('onStepClicked', step)
		}
	},

}
</script>

<style lang="scss">
.gts-stepper {
	display: flex;
	flex-direction: row;

	.gts-stepper-step {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.gts-step-number {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 40px;
			color: white;
			border-radius: 40px;
			border: 1px solid $neutral-color-200;
			color: $primary-color-700;
			cursor: pointer;
		}

		.gts-step-title {
			color: $primary-color-700;
			font-weight: 500;
			font-size: 16px;
		}
	}

	.gts-stepper-step-selected {
		.gts-step-number {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: $primary-color-400;
			width: 40px;
			height: 40px;
			color: white;
			border-radius: 40px;
		}

		.gts-step-title {
			color: $primary-color-400;
			font-weight: 500;
			font-size: 16px;
			
		}

	}

	.gts-stepper-separator {
		position: relative;
		top: 19px;
		width: 80px;
		height: 2px;
		padding-left: 10px;
		padding-right: 10px;
		background-color: $primary-color-400;
	}
}
</style>