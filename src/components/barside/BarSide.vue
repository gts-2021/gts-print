<template>
    <div class="barside-container">
        <div class="barside-logo">Logo</div>

        <div v-for="(items, index) in menus" :key="index">
            
            <BarSideMenu @barsideItemClicked="onItemClicked($event)" :items="items"  :itemActiveTitle="itemActiveTitle"/>

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
        menus: {
            type: Array,
            required: true
        }
    },
    data : function () {
        return {
            itemActiveTitle : undefined
        }
    },
    methods : {
        onItemClicked : function (barsideItemTitle) {
           this.itemActiveTitle = barsideItemTitle
           
            
        }
    }

}
</script>

<style lang="scss">
.barside-container {
    color: $primary-color400;
    background-color: #F2EDEB26;
    width: 272px;
    height: 100vh;
    padding-top: 40px;
    border-right: 1px solid #D3D6DB;

    .barside-logo {
        text-align: center;
        font-size: 55px;
        font-weight: bold;
    }


    .barside-menu-separation {
        background-color: #CCCCCC;
        margin-top: 32px;
        margin-bottom: 32px;
        height: 1px;
    }


}
</style>