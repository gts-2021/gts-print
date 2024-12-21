<template>

	<div v-if="isShowMenu" :class="[className, 'gts-context-menu']">
		<div v-for="(action, index) in actions" :key="index" :class="['gts-context-menu-item', action.className]"
			@click="action.onClick">
			<span class="gts-context-menu-item-icon">
				<component v-if="!action.noIcon" :is="action.icon" />
			</span>
			<span class="gts-context-menu-item-title">{{ action.title }}</span>
		</div>
	</div>

</template>

<script>



export default {

	name: 'ContextMenu',
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
		isAutoClose: {
			type: Boolean,
			required: false,
			default: true,
		}

	},
	data() {
		return {
			isShowMenu: false,
		}
	},

	methods: {
		openMenu() {
			this.isShowMenu = true;
		},
		toggleMenu() {
			this.isShowMenu = !this.isShowMenu;
		}
	},
	mounted() {
		if (this.isAutoClose) {
			document.getElementsByTagName("body")[0].addEventListener('click', () => this.isShowMenu = false)

		}
	}

}
</script>

<style lang="scss">
.gts-context-menu {

	background-color: $color-white;
	width: 170px;
	border: 1px solid #D4D4D4;
	border-radius: 10px;
	overflow: hidden;
	z-index: 5;

	.gts-context-menu-item {
		color: $primary-color-600;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 15px;
		cursor: pointer;

		.gts-context-menu-item-icon {
			margin-right: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.gts-context-menu-item-title {
			font-weight: 500;
		}
	}

	.gts-context-menu-item:hover {
		background-color: $primary-color-50;
	}
}
</style>