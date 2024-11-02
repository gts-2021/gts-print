<template>

    <div v-if="this.isOpen" class="gts-dialog-container">
      <div :class="'gts-dialog '+(this.className || '')">
        <div class="gts-dialog-header"> 
            <span class="gts-dialog-header-title" :style="'color:'+this.titleColor+';'">{{title}}</span>
            <svg @click="onCloseClicked" class="gts-dialog-header-close-icon" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        </div>
        <div class="gts-dialog-content"><slot></slot></div>

        <template v-if="$slots.footer">
            <div class="gts-dialog-footer">
            <slot name="footer"></slot>
        </div>
        </template>
        
      </div>
    </div>

</template>

<script>
 

export default {
    name: 'BasicDialog',
    props: {
        title : {
            type: String,
            required: false,
            default: ''
        },
        titleColor: {
            type: String,
            required: false,
            default: ''
        },
        isOpen: {
            type: Boolean,
            required: false,
            default: false
        },
        className : {
            type: String,
            required: false,
            default: ''
        },
    },
     
    methods: {
        onCloseClicked() {
            this.$emit("onClosedDialog")
        }
      
    },
     
     
}
</script>

<style lang="scss">

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
 
 .gts-dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 20, 29, 0.705);
    z-index: 10;

 }

.gts-dialog {
    position: relative;
    top: 50px;
    margin-right: auto;
    margin-left: auto;
     background-color: $color-white;
     width: 900px;
     border-radius: 10px;
     box-shadow:  0 0 0.18cm #d5d5d5;
     animation: scaleIn 0.2s ease forwards;
     
     .gts-dialog-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 25px 10px 25px;
        border-bottom: 1px solid $neutral-color-100;

        .gts-dialog-header-title {
            flex-grow: 1;
            font-weight: 600;
            font-size: 24px;
            color: $primary-color-600;
        }

        .gts-dialog-header-close-icon {
            cursor: pointer;
        }
        
     }

     .gts-dialog-content {
        padding: 25px;
        max-height: 400px;
        min-height: 192px;
        overflow-y: auto;
     }

     .gts-dialog-footer {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px 25px 10px 25px;
        border-top: 1px solid $neutral-color-100;
     }
}


</style>