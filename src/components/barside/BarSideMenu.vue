<template>
    <div class="barside-menu">

        <BarSideItem v-for="item in items" :active="itemActiveTitle == item.title" :title="item.title" :icon="item.icon" :isExternal="item.isExternal" @barsideItemClicked="onItemClicked" :key="item.title" />
         

    </div>
</template>

<script>

import BarSideItem from './BarSideItem.vue'

export default {
    name: 'BarSideMenu', 
    components: {BarSideItem},
    props: {
        items: {
            type: Array,
            required: true
        },
        itemActiveTitle : {
            type: String,
            required : true
        }
    },
     
    methods: {
        onItemClicked : function (barsideItemTitle) {
           //this.itemActiveTitle = barsideItemTitle
           this.$emit("barsideItemClicked", barsideItemTitle)
            
        }
    },
}
</script>

<style lang="scss">
.barside-menu {
    margin-top: 32px;
    font-weight: 500;
}


 
</style>