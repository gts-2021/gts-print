<template>

	<div :class="['gts-button-container', className]">
		<button :class="['gts-button', theme, { 'gts-button-disabled': disabled }]" :type="type" :disabled="disabled"
			@click="onButtonClick">

			<div class="gts-button-content">

				<span v-if="icon && icon.position === 'left'" class="gts-button-icon">
					<component v-if="icon.isExternalIcon" :is="icon.svg" />
					<v-icon v-else>{{ icon.class }}</v-icon>
				</span>

				<span v-if="title" class="gts-button-title">{{ title }}</span>

				<span v-if="icon && icon.position === 'right'" class="gts-button-icon gts-button-icon-right">
					<component v-if="icon.isExternalIcon" :is="icon.svg" />
					<v-icon v-else>{{ icon.class }}</v-icon>
				</span>

			</div>

		</button>
	</div>

</template>

<script>

import { PRIMARY } from '@/constants/buttons.js';

export default {

	name: 'ButtonComponent',

	emits: ['buttonClicked'],

	props: {

		title: {
			type: String,
			required: false,
		},

		isExternalIcon: {
			type: Boolean,
			required: false,
			default() {
				return false;
			}
		},

		icon: {
			type: Object,
			required: false,
		},

		className: {
			type: String,
			required: false,
			default() {
				return 'gts-button';
			}
		},

		iconPosition: {
			type: String,
			required: false,
			default() {
				return 'left';
			}
		},

		theme: {
			type: String,
			required: false,
			default() {
				return PRIMARY;
			}
		},

		type: {
			type: String,
			required: false,
			default() {
				return '';
			}
		},

		disabled: {
			type: Boolean,
			required: false,
			default() {
				return false;
			}
		},

	},

	methods: {

		onButtonClick() {
			if (this.disabled) return;
			this.$emit('buttonClicked');
		},
	},

}
</script>

<style lang="scss">
.gts-button-container {
	display: inline-flex;
	min-width: fit-content;

	.gts-button {
		display: flex;
		width: 100%;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $primary-color-400;
		color: $color-white;
		align-items: center;
		justify-content: center;
		transition-duration: 0.2s;

		.gts-button-content {
		display: flex;
		align-items: center;
		justify-content: center;
	
		.gts-button-icon {
			display: flex;
			margin-left: 5px;
			margin-right: 5px;
			font-size: 12px;
		}

		.gts-button-icon-right {
			flex-grow: 1;
			justify-content: end;

		}

		.gts-button-title {
			margin-left: 5px;
			margin-right: 5px;
		}
	}
	}

	.gts-button:hover {
		background: $color-white;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	/* PRIMARY */
	.gts-button-primary {
		background: $primary-color-400;
		color: $color-white;
		border: 1px solid $primary-color-400;
	}

	.gts-button-primary:hover {
		background: $primary-color-300;
		color: $color-white;
	}

	/* PRIMARY_INVERSE */
	.gts-button-primary-inverse {
		background: $color-white;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	.gts-button-primary-inverse:hover {
		background: $primary-color-50;
	}

	/* PRIMARY_50 */
	.gts-button-primary-50 {
		background: $primary-color-50;
		color: $primary-color-400;
		border: 1px solid $primary-color-50;
	}

	.gts-button-primary-50:hover {
		background: #bfe1e8;
		color: $primary-color-400;
		border: 1px solid #bfe1e8;
	}

	/* PRIMARY_50_INVERSE */
	.gts-button-primary-50-inverse {
		background: $primary-color-400;
		color: $primary-color-50;
		border: 1px solid $primary-color-400;
	}

	.gts-button-primary-50-inverse:hover {
		background: $primary-color-50;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	/* DANGER */
	.gts-button-danger {
		background: $accent-error-red-color;
		color: $color-white;
		border: 1px solid $accent-error-red-color;
	}

	.gts-button-danger:hover {
		background: #dc0000;
		color: $color-white;
		border-color: #dc0000;

	}

	/* DANGER */
	.gts-button-danger-inverse {
		background: $color-white;
		color: $accent-error-red-color;
		border: 1px solid $accent-error-red-color;
	}

	.gts-button-danger-inverse:hover {
		background: #ffeaea;
		color: $accent-error-red-color;
		border: 1px solid $accent-error-red-color;
	}

	/* DANGER_LIGHT */
	.gts-button-danger-light {
		background: $accent-light-red-color;
		color: $accent-error-red-color;
		border: 1px solid $accent-light-red-color;
	}

	.gts-button-danger-light:hover {
		background: $accent-light-red-color-100;
		color: $accent-error-red-color;
		border: 1px solid $accent-light-red-color-100;
	}

	/* DANGER_LIGHT_INVERSE */
	.gts-button-danger-light-inverse {
		background: $accent-error-red-color;
		color: $accent-light-red-color;
		border: 1px solid $accent-error-red-color;
	}

	.gts-button-danger-light-inverse:hover {
		background: $accent-light-red-color;
		color: $accent-error-red-color;
		border: 1px solid $accent-light-red-color;
	}

	/* DISABLED */
	.gts-button-disabled {
		background: $neutral-color-100;
		color: $neutral-color-400;
		border: 1px solid $neutral-color-200;
	}

	.gts-button-disabled:hover {
		background: $neutral-color-100;
		color: $neutral-color-400;
		border: 1px solid $neutral-color-200;
	}

}
</style>