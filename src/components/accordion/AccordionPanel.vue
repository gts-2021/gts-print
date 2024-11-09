<template>

	<div class="gts-dialog-accordionpanel">
		<slot></slot>
	</div>

</template>

<script>


export default {
	name: 'AccordionPanel',
	props: {
		openedAccordions: {
			type: Array,
			required: false,
		},
		onlyOneItemOpened: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			openedItems: []
		}
	},
	methods: {


	},
	created() {
		if (this.openedAccordions) this.openedItems = this.openedAccordions
	}

}
</script>

<style lang="scss"></style>