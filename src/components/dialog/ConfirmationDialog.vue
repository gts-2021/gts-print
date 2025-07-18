<template>

    <BasicDialog :className="'gts-dialog-confirmation ' + (this.className || '')" v-bind="this.$props">
        <slot></slot>

        <template v-slot:footer>
            <div class="gts-dialog-confirmation-footer">
                <ButtonComponent @buttonClicked="onFirstBtnClicked"  :theme='this.themeFirstBtn' :title="this.titleFirstBtn" :disabled="disabledFirstBtn" />
                <ButtonComponent @buttonClicked="onLastBtnClicked" :theme='this.themeLastBtn' :title="this.titleLastBtn" :disabled="disabledLastBtn" />
            </div>
        </template>
    </BasicDialog>

</template>

<script>

import ButtonComponent from '../button/ButtonComponent.vue';
import BasicDialog from './BasicDialog.vue'

export default {
    name: 'ConfirmationDialog',
    components: {
        BasicDialog,
        ButtonComponent
    },
    props: {
        className : {
            type: String,
            required: false,
            default: ''
        },
        themeFirstBtn: {
            type: String,
            required : false,
            default: 'gts-button-primary-inverse'
        },
        themeLastBtn: {
            type: String,
            required : false,
            default: 'gts-button-primary'
        },
        titleFirstBtn: {
            type: String,
            required : true,
        },
        titleLastBtn: {
            type: String,
            required : true,
        },
        disabledFirstBtn: {
			type: Boolean,
			required: false,
			default() {
				return false;
			}
		},
        disabledLastBtn: {
			type: Boolean,
			required: false,
			default() {
				return false;
			}
		},
    },

    methods: {

        onFirstBtnClicked(){
            this.$emit("onFirstBtnClicked");
        },
        onLastBtnClicked(){
            this.$emit("onLastBtnClicked");
        }

    },


}
</script>

<style lang="scss">

.gts-dialog-confirmation-footer {
    display: flex;
    flex-direction: row;

    .gts-button-container {
        margin-left: 10px;
    }
}
</style>