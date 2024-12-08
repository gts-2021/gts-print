<template>

    <SvgIcon v-bind="this.$props">

        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="#006980"/>
            <path d="M19.7167 15.5167L20.4833 16.2833L12.9333 23.8333H12.1667V23.0667L19.7167 15.5167ZM22.7167 10.5C22.5083 10.5 22.2917 10.5833 22.1333 10.7417L20.6083 12.2667L23.7333 15.3917L25.2583 13.8667C25.3356 13.7896 25.3969 13.698 25.4387 13.5972C25.4805 13.4964 25.502 13.3883 25.502 13.2792C25.502 13.17 25.4805 13.062 25.4387 12.9611C25.3969 12.8603 25.3356 12.7688 25.2583 12.6917L23.3083 10.7417C23.1417 10.575 22.9333 10.5 22.7167 10.5ZM19.7167 13.1583L10.5 22.375V25.5H13.625L22.8417 16.2833L19.7167 13.1583Z" fill="white"/>
        </svg>

    </SvgIcon>

</template>

<script>
import SvgIcon from './SvgIcon.vue';



export default {

    name: 'UpdateIcon',
    components: {
        SvgIcon
    }

}

</script>

<style lang="scss"></style>