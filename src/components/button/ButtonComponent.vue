<template>

	<div class="gts-button-container">
		<button :class="classStyle" @click="onButtonClick">

			<div class="gts-button-content">

				<span v-if="icon && icon.position === 'left'" class="gts-button-icon">
					<component v-if="icon.isExternalIcon" :is="icon.svg" />
					<v-icon v-else>{{ icon.class }}</v-icon>
				</span>

				<span v-if="buttonTitle" class="gts-button-title">{{ buttonTitle }}</span>

				<span v-if="icon && icon.position === 'right'" class="gts-button-icon">
					<component v-if="icon.isExternalIcon" :is="icon.svg" />
					<v-icon v-else>{{ icon.class }}</v-icon>
				</span>

			</div>
		
    </button>
	</div>

</template>

<script>

export default {

	name: 'ButtonComponent',

	emits : ['buttonClicked'],

	props:{

		buttonTitle: {
			type: String,
      required: true,
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

		classStyle: {
      type: String,
      required: false,
			default(){
				return '';
			}
    },

		iconPosition: {
			type: String,
			default(){
				return 'left';
			}
		}

	

	},

	data() {
		return {
			inputValue: this.value
		};
	},


	methods: {

		onButtonClick() {
			console.log("buttonClicked");
			this.$emit('buttonClicked');
		},
	},

}
</script>

<style lang="scss">
 
 .gts-button-container{

		.gts-button{
			display: flex;
			border-radius: 12px;
			padding: 12px 20px;
			background: $primary-color-400;
			color: $color-white;
			font-size: 14px;
			text-align: center;
			line-height: 24px;
			font-weight: 600;

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
			
		}

		.gts-button:hover{
			background: $color-white;
			color: $primary-color-400;
			border: 1px solid $primary-color-400;
			
		}

 }

 
</style>