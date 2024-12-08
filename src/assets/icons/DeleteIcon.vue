<template>

    <SvgIcon v-bind="this.$props">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="#FF0000"/>
            <path d="M13.0001 23.8333C13.0001 24.75 13.7501 25.5 14.6667 25.5H21.3334C22.2501 25.5 23.0001 24.75 23.0001 23.8333V13.8333H13.0001V23.8333ZM14.6667 15.5H21.3334V23.8333H14.6667V15.5ZM20.9167 11.3333L20.0834 10.5H15.9167L15.0834 11.3333H12.1667V13H23.8334V11.3333H20.9167Z" fill="#FCEDED"/>
        </svg>


    </SvgIcon>

</template>

<script>
import SvgIcon from './SvgIcon.vue';



export default {

    name: 'DeleteIcon',
    components: {
        SvgIcon
    }

}

</script>

<style lang="scss"></style>