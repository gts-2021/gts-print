<template>
    <div :class="['barside-container', { 'barside-collapsed': isCollapsedState }]">
        <div class="barside-header">
            <div v-if="!isCollapsedState" class="barside-logo">
                <template v-if="logo && typeof logo === 'object' && !logo.render && !logo.template && logo.alt">
                    {{ logo.alt }}
                </template>
                <component v-else-if="logo" :is="logo" />
            </div>
            <button type="button" class="barside-toggle-btn" @click="toggleCollapse"
                :title="isCollapsedState ? 'Expand' : 'Collapse'" aria-label="Toggle Sidebar">
                <v-icon>{{ isCollapsedState ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
            </button>
        </div>

        <div v-for="(items, index) in menus" :key="index">
            <BarSideMenu @barsideItemClicked="onItemClicked($event)" :items="items"
                :itemActiveTitle="selectedItem || itemActiveTitle" :isCollapsed="isCollapsedState" />

            <div v-if="index < menus.length - 1" class="barside-menu-separation"></div>
        </div>
    </div>
</template>

<script>

import BarSideMenu from './BarSideMenu.vue';


export default {
    name: 'BarSide',
    components: { BarSideMenu },

    props: {
        logo: {
            type: Object,
            required: false
        },
        selectedItem: {
            type: String,
            required: false,
        },
        menus: {
            type: Array,
            required: true
        },
        onItemSelected: {
            type: Function,
            required: false
        },
        isCollapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data: function () {
        return {
            itemActiveTitle: '',
            isCollapsedState: this.isCollapsed
        }
    },
    watch: {
        isCollapsed(newVal) {
            this.isCollapsedState = newVal;
        }
    },
    methods: {
        onItemClicked: function (barsideItemTitle) {
            this.itemActiveTitle = barsideItemTitle
            if (this.onItemSelected) {
                this.onItemSelected(barsideItemTitle);
            }
        },
        toggleCollapse: function () {
            this.isCollapsedState = !this.isCollapsedState;
            this.$emit('update:isCollapsed', this.isCollapsedState);
            this.$emit('toggleCollapse', this.isCollapsedState);
        }
    }

}
</script>

<style lang="scss">
.barside-container {
    color: $primary-color-400;
    background-color: #F2EDEB26;
    width: 272px;
    height: 100vh;
    padding-top: 16px;
    border-right: 1px solid #D3D6DB;
    overflow-y: auto;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;

    .barside-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        margin-bottom: 24px;
        min-height: 44px;

        .barside-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: $primary-color-700;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: opacity 0.2s ease;
        }

        .barside-toggle-btn {
            background-color: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: $primary-color-700;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            flex-shrink: 0;

            &:hover {
                background-color: $primary-color-50;
                color: $primary-color-400;
                border-color: #{$primary-color-400}40;
                transform: scale(1.05);
            }

            &:active {
                transform: scale(0.95);
            }

            .v-icon {
                font-size: 18px;
            }
        }
    }

    &.barside-collapsed {
        width: 72px;

        .barside-header {
            justify-content: center;
            padding: 0 12px;
        }

        .barside-menu-separation {
            margin-left: 12px;
            margin-right: 12px;
        }
    }

    .barside-menu-separation {
        background-color: #E2E8F0;
        margin-top: 24px;
        margin-bottom: 24px;
        height: 1px;
    }
}
</style>