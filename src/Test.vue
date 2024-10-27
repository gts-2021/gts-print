<template>

	<div>
		<span> hiii</span>
		<component :is="formatter"></component>
	</div>
	
</template>

<script>



  
export default {
  
	name: "testComponent",
	
	components: { 
   
	},

	props: {
    formatter: {
      type: Object
    },
	},
  
	data() {
		return {
      }
	}
}
  
</script>
  
  <style lang="scss"></style>
  