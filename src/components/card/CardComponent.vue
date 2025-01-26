<template>

	<div :class="['gts-card-container', className]">

		<div v-if="actions.length != 0" tabindex="0" class="gts-card-actions-btn" @click="toggleMenu">
			<svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="4" cy="2" r="2" fill="#002A34" />
				<circle cx="4" cy="8" r="2" fill="#002A34" />
				<circle cx="4" cy="14" r="2" fill="#002A34" />
			</svg>

		</div>


		<ContextMenu ref="contextMenu" className="gts-card-actions-menu" :actions="actions" />



		<div class="gts-card-content">
			<slot></slot>
		</div>

	</div>

</template>

<script>
import ContextMenu from '../contextmenu/ContextMenu.vue';




export default {

	name: 'CardComponent',
	components: {
		ContextMenu
	},
	props: {
		className: {
			type: String,
			required: false,
		},
		actions: {
			type: Array,
			required: true,
			default: () => [],
		},

	},

	methods: {
		toggleMenu(event) {
			event.stopPropagation();
			this.$refs.contextMenu.toggleMenu()

		}
	},

}
</script>

<style lang="scss">
.gts-card-container {
	position: relative;

	.gts-card-content {
		width: 100%;
		height: 100%;
		border: 1px solid #D4D4D4;
		border-radius: 16px;
		overflow: hidden;
	}

	.gts-card-actions-btn {
		background-color: $color-white;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 15px;
		right: 15px;
		width: 35px;
		height: 35px;
		border-radius: 35px;
		/* border: 1px solid gray; */
		box-shadow: 0 0 0.1cm $neutral-color-100;
		transition-duration: 0.2s;
		cursor: pointer;
		z-index: 5;
	}

	.gts-card-actions-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 0 0.15cm $primary-color-400;
	}

	.gts-card-actions-menu {
		position: absolute;
		top: 15px;
		right: 65px;

	}
}
</style>