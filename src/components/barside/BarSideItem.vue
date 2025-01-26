<template>

    <div :class="'barside-item '+ (active ? 'active' : '') " @click="onSelectedItem">
        <span class="barside-item-selected-border"></span>
        <div class="barside-item-content">
            <span class="barside-item-icon">
                <component v-if="isExternal" :is="icon" />
                <v-icon v-else>{{ icon }}</v-icon>
            </span>
            <span class="barside-item-title">{{title}}</span>
        </div>
    </div>

</template>

<script>
export default {
    name: 'BarSideItem', 
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: [String, Object],
            required: false
        },
        active: {
            type: Boolean,
            required: false,
            default: false
        },
        isExternal: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            isSelected: false
        };
    },
    methods: {
        onSelectedItem : function() {
            this.$emit("barsideItemClicked", this.title)
        } 
    },
    onMounted : () => {

    }
}
</script>

<style lang="scss">
 
 .barside-item {
        color: $primary-color-700;
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        cursor: pointer;
        
        .barside-item-content {
            padding-left: 13px;
            display: flex;
            align-items: center;
           
            flex-grow: 1;
            height: 48px;
            margin-left: 10px;
            margin-right: 20px;
            border-radius: 0 5px 5px 0;

            .barside-item-title {
                margin-left: 10px;
                transition-duration: 0.5s;
            }
        }
        .barside-item-selected-border {
            display: inline-block;
            width: 4px;
            height: 32px;
            
        }

        .barside-item-icon {
            display: flex;
        }
    }

    .barside-item.active {
        color: $primary-color-400;
        .barside-item-selected-border {
            background-color: $primary-color-400;
        }

        .barside-item-content { 
            background-color: #{$primary-color-400}33;
        }
    }

    .barside-item:hover .barside-item-title {
        padding-left: 10px;
    }


</style>