<template>

    <SvgIcon v-bind="this.$props">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5V15M15 10L5 10" stroke="white" stroke-width="1.67" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>

    </SvgIcon>

</template>

<script>
import SvgIcon from './SvgIcon.vue';



export default {

    name: 'AddIcon',
    components: {
        SvgIcon
    }

}

</script>

<style lang="scss"></style>