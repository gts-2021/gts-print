<template>

	<div @click="() => this.isShowMenu = false" :class="['gts-card-container', className]">

		<div v-if="actions.length != 0" tabindex="0" class="gts-card-actions-btn" @click="toggleMenu">
			<svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="4" cy="2" r="2" fill="#002A34" />
				<circle cx="4" cy="8" r="2" fill="#002A34" />
				<circle cx="4" cy="14" r="2" fill="#002A34" />
			</svg>

		</div>


		<div v-if="isShowMenu" class="gts-card-actions-menu">
			<div v-for="(action, index) in actions" :key="index" :class="['gts-card-menu-item', action.className]"
				@click="action.onClick">
				<span class="gts-card-menu-item-icon">
					<component v-if="!action.noIcon" :is="action.icon" />
				</span>
				<span class="gts-card-menu-item-title">{{ action.title }}</span>
			</div>
		</div>



		<div class="gts-card-content">
			<slot></slot>
		</div>

	</div>

</template>

<script>



export default {

	name: 'CardComponent',
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
	data() {
		return {
			isShowMenu: false,
		}
	},

	methods: {
		toggleMenu(event) {
			event.stopPropagation();
			this.isShowMenu = !this.isShowMenu;

		}
	},
	mounted(){
		document.getElementsByTagName("body")[0].addEventListener('click', () => this.isShowMenu = false)
	}

}
</script>

<style lang="scss">
.gts-card-container {
	position: relative;

	.gts-card-content {
		width: 100%;
		height: 100%;
		border: 1px solid $neutral-color-100;
		border-radius: 16px;
		overflow: hidden;
	}

	.gts-card-actions-btn {
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
		background-color: $neutral-color-50;
		top: 15px;
		right: 65px;
		width: 170px;
		border: 1px solid $neutral-color-100;
		border-radius: 10px;
		overflow: hidden;
		z-index: 5;

		.gts-card-menu-item {
			color: $primary-color-600;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 15px;
			cursor: pointer;

			.gts-card-menu-item-icon {
				margin-right: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.gts-card-menu-item-title {
				font-weight: 500;
			}
		}

		.gts-card-menu-item:hover {
			background-color: $primary-color-50;
		}
	}
}
</style>