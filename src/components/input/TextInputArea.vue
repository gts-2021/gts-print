<template>

    <CommonInput v-bind="$props">
			<textarea @input="emitInput" :disabled="disabled" v-model="inputValue"  ref="gtsInput"
				:class="'gts-input gts-text-area'+(disabled ? 'gts-input-disabled' : ' ')+(error ? 'gts-input-error' : '')"  
				:placeholder="placeholder">
			</textarea>
    </CommonInput>

</template>

<script>
import CommonInput from './CommonInput.vue';
import InputCommonProps from './InputCommonProps';

export default {

    name: 'TextInputArea',

    components:{
			CommonInput
    },

    mixins:[InputCommonProps],
     
}
</script>

<style lang="scss">
 
 @import './input-common-css.scss';

.gts-text-area {
    padding-top: 10px;
    min-height: 150px;
}
 
</style>