<template>

	<div class="gts-badge-container">
		<span :class="[className, theme]" > {{ text }} </span>
	</div>

</template>

<script>

export default {
  
	name: 'BadgeComponent',


	props:{

		text: {
			type: String,
      required: true,
    },
		
		className: {
      type: String,
      required: false,
			default(){
				return 'gts-badge';
			}
    },

		theme: {
			type: String,
			required: false,
			default(){
				return '';
			}
		},


	},

}
</script>

<style lang="scss">
 
.gts-badge-container{
	
	display: flex;
  align-items: center;


	/* DEFAULT */
	.gts-badge{
		border-radius: 80px;
    padding: 6px 10px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
		font-weight: 600;
		background: $primary-color-100;
		color: $color-white;
	}

	/* PRIMARY */
	.gts-badge-primary{
		border-radius: 80px;
    padding: 6px 10px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
		font-weight: 600;
		background: $primary-color-400;
		color: $color-white;

	}

	/* SUCESS */
	.gts-badge-success{
		border-radius: 80px;
    padding: 6px 10px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
		font-weight: 600;
		background: $secondary-color-50;
		color: $secondary-color-500;
	}

	/* DANGER */
	.gts-badge-danger{
		border-radius: 80px;
    padding: 6px 10px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
		font-weight: 600;
		background: $accent-light-red-color;
		color: $accent-dark-red-color;
	}

	/* WARNING */
	.gts-badge-warning{
		border-radius: 80px;
    padding: 6px 10px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
		font-weight: 600;
		background: $accent-light-orange-color;
		color: $accent-dark-orange-color;
	}

}

</style>