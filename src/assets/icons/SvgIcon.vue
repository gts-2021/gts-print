<template>

    <span :class="className+' svg-ico'">
        <slot></slot>
    </span>

</template>

<script>


export default {

    name: 'SvgIcon',
    props: {
        className : {
            type: String,
            required : false,
        }
    }

}

</script>

<style lang="scss">

.svg-ico {
    display: flex;
    align-items: center;
}

</style>