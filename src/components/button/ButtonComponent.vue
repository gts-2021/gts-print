<template>

	<div class="gts-button-container">
		<button :class="[className, theme]" @click="onButtonClick">

			<div class="gts-button-content">

				<span v-if="icon && icon.position === 'left'" class="gts-button-icon">
					<component v-if="icon.isExternalIcon" :is="icon.svg"/>
					<v-icon v-else>{{ icon.class }}</v-icon>
				</span>

				<span v-if="title" class="gts-button-title">{{ title }}</span>

				<span v-if="icon && icon.position === 'right'" class="gts-button-icon">
					<component v-if="icon.isExternalIcon" :is="icon.svg"/>
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

	emits : ['buttonClicked'],

	props:{

		title: {
			type: String,
      required: false,
    },
		
		isExternalIcon: {
      type: Boolean,
      required: false,
			default(){
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
			default(){
				return 'gts-button';
			}
    },

		iconPosition: {
			type: String,
			required: false,
			default(){
				return 'left';
			}
		},

		theme: {
			type: String,
			required: false,
			default(){
				return PRIMARY;
			}
		}

	},

	methods: {

		onButtonClick() {
			this.$emit('buttonClicked');
		},
	},

}
</script>

<style lang="scss">
 
.gts-button-container{

	.gts-button-content{
		display: flex;
		justify-content: center;
		align-items: center;

		.gts-button-icon{
			display: flex;
			margin-left: 5px;
			margin-right: 5px;
			font-size: 12px;
		}

		.gts-button-title{
			margin-left: 5px;
			margin-right: 5px;
		}
	}

	.gts-button{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $primary-color-400;
		color: $color-white;
	}

	.gts-button:hover{
		background: $color-white;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	/* PRIMARY */
	.gts-button-primary{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $primary-color-400;
		color: $color-white;
		border: 1px solid $primary-color-400;
	}

	.gts-button-primary:hover{
		background: $color-white;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	/* PRIMARY_INVERSE */
	.gts-button-primary-inverse{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $color-white;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	.gts-button-primary-inverse:hover{
		background: $primary-color-400;
		color: $color-white;
	}

	/* PRIMARY_50 */
	.gts-button-primary-50{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $primary-color-50;
		color: $primary-color-400;
	}

	.gts-button-primary-50:hover{
		background: $primary-color-400;
		color: $primary-color-50;
	}
	
	/* PRIMARY_50_INVERSE */
	.gts-button-primary-50-inverse{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		line-height: 24px;
		font-weight: 600;
		text-align: center;
		background: $primary-color-400;
		color:$primary-color-50;
		border: 1px solid $primary-color-400;
	}

	.gts-button-primary-50-inverse:hover{
		background: $primary-color-50;
		color: $primary-color-400;
		border: 1px solid $primary-color-400;
	}

	/* DANGER */
	.gts-button-danger{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $accent-error-red-color;
		color: $color-white;
		border: 1px solid $accent-error-red-color;
	}

	.gts-button-danger:hover{
		background: $color-white;
		color: $accent-error-red-color;
		border: 1px solid $accent-error-red-color;
	}

		/* DANGER */
	.gts-button-danger-inverse{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $color-white;
		color: $accent-error-red-color;
		border: 1px solid $accent-error-red-color;
	}

	.gts-button-danger-inverse:hover{
		background: $accent-error-red-color;
		color: $color-white;
		border: 1px solid $accent-error-red-color;
	}

	/* DANGER_LIGHT */
	.gts-button-danger-light{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $accent-light-red-color;
		color: $accent-error-red-color;
		border: 1px solid $accent-light-red-color;
	}

	.gts-button-danger-light:hover{
		background: $accent-error-red-color;
		color: $accent-light-red-color;
		border: 1px solid $accent-error-red-color;
	}

	/* DANGER_LIGHT_INVERSE */
	.gts-button-danger-light-inverse{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $accent-error-red-color;
		color: $accent-light-red-color;
		border: 1px solid $accent-error-red-color;
	}

	.gts-button-danger-light-inverse:hover{
		background: $accent-light-red-color;
		color: $accent-error-red-color;
		border: 1px solid $accent-light-red-color;
	}
		
 }

 
</style>