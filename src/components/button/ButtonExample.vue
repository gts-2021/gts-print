<template>

  <div id="exemple-container">

    <!-- without -->
    <div>
      <ButtonComponent 
      class="mb-20"
      :title="'without icon'" 
      :className="'gts-button'"
      />

      <ButtonComponent 
        class="mb-20"
        :icon="leftIcon"
        :className="'gts-button'"
      />
    
      <ButtonComponent 
        class="mb-20"
        :title="'with left icon'" 
        :icon="leftIcon"
        :className="'gts-button'"
      />
  
      <ButtonComponent 
        class="mb-20"
        :title="'with right icon'" 
        :icon="rightIcon"
        :className="'gts-button'"
      />

      <ButtonComponent 
        class="mb-20"    
        :title="'with svg left icon'" 
        :icon="svgLeftIcon"
        :className="'gts-button'"
      />

      <ButtonComponent
        class="mb-20" 
        :title="'with svg right icon'" 
        :icon="svgRightIcon"
        :className="'gts-button'"
      />
      
      <ButtonComponent
        class="mb-20" 
        :title="'TEST'" 
        :className="'gts-test'"
      />
      
    </div>
  
    <!-- with theme -->
    <div>
        
      <ButtonComponent 
        class="mb-20"
        :title="'PRIMARY'" 
        :icon="leftIcon"
        :theme="PRIMARY"
      />

      <ButtonComponent 
        class="mb-20"
        :title="'PRIMARY_INVERSE'" 
        :icon="leftIcon"
        :theme="PRIMARY_INVERSE"
      />

      <ButtonComponent
        class="mb-20" 
        :title="'PRIMARY_50'" 
        :icon="leftIcon"
        :theme="PRIMARY_50"
      />

      <ButtonComponent
        class="mb-20" 
        :title="'PRIMARY_50_INVERSE'" 
        :icon="leftIcon"
        :theme="PRIMARY_50_INVERSE"
      />
      <ButtonComponent
        class="mb-20" 
        :title="'DANGER'" 
        :icon="leftIcon"
        :theme="DANGER"
      />

      <ButtonComponent
        class="mb-20" 
        :title="'DANGER_INVERSE'" 
        :icon="leftIcon"
        :theme="DANGER_INVERSE"
      />
      <ButtonComponent 
        class="mb-20"
        :title="'DANGER_LIGHT'" 
        :icon="leftIcon"
        :theme="DANGER_LIGHT"
      />
      <ButtonComponent 
        class="mb-20"
        :title="'DANGER_LIGHT_INVERSE'" 
        :icon="leftIcon"
        :theme="DANGER_LIGHT_INVERSE"
      />
    </div>
  
    
  </div>

</template>

<script>

import ButtonComponent from '@/components/button/ButtonComponent.vue';
import { defineComponent, markRaw } from 'vue';

import { PRIMARY, PRIMARY_INVERSE, PRIMARY_50, PRIMARY_50_INVERSE, DANGER, DANGER_INVERSE, DANGER_LIGHT, DANGER_LIGHT_INVERSE  } from '@/constants/buttons.js';

export default {

  name:"ButtonExample",

  components: {
    ButtonComponent,
  },

  data() {
		return {
      PRIMARY,
      PRIMARY_INVERSE,
      PRIMARY_50,
      PRIMARY_50_INVERSE,
      DANGER,
      DANGER_INVERSE,
      DANGER_LIGHT,
      DANGER_LIGHT_INVERSE,
      
			icon: {

        isExternalIcon: false,

        svg : markRaw(defineComponent({

        template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15.75H19.5V19.5H18V15.75ZM15 12H16.5V19.5H15V12ZM8.25 19.5C7.2558 19.4988 6.30267 19.1033 5.59966 18.4003C4.89666 17.6973 4.50119 16.7442 4.5 15.75H6C6 16.195 6.13196 16.63 6.37919 17C6.62643 17.37 6.97783 17.6584 7.38896 17.8287C7.8001 17.999 8.2525 18.0436 8.68895 17.9568C9.12541 17.87 9.52632 17.6557 9.84099 17.341C10.1557 17.0263 10.37 16.6254 10.4568 16.189C10.5436 15.7525 10.499 15.3001 10.3287 14.889C10.1584 14.4778 9.87004 14.1264 9.50003 13.8792C9.13002 13.632 8.69501 13.5 8.25 13.5V12C9.24456 12 10.1984 12.3951 10.9017 13.0983C11.6049 13.8016 12 14.7554 12 15.75C12 16.7446 11.6049 17.6984 10.9017 18.4017C10.1984 19.1049 9.24456 19.5 8.25 19.5Z" fill="#005467"/>
          <path d="M21 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V21C1.5004 21.3977 1.65856 21.779 1.93978 22.0602C2.221 22.3414 2.6023 22.4996 3 22.5H21C21.3976 22.4994 21.7788 22.3412 22.06 22.06C22.3412 21.7788 22.4994 21.3976 22.5 21V3C22.4996 2.6023 22.3414 2.221 22.0602 1.93978C21.779 1.65856 21.3977 1.5004 21 1.5ZM21 8.25H10.5V3H21V8.25ZM9 3V8.25H3V3H9ZM3 21V9.75H21L21.0015 21H3Z" fill="#005467"/>
          </svg>
          `
        })), 

        class: "mdi-plus",

        position: "left"
      },

      leftIcon: {

        isExternalIcon: false,

        svg : markRaw(defineComponent({

        template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15.75H19.5V19.5H18V15.75ZM15 12H16.5V19.5H15V12ZM8.25 19.5C7.2558 19.4988 6.30267 19.1033 5.59966 18.4003C4.89666 17.6973 4.50119 16.7442 4.5 15.75H6C6 16.195 6.13196 16.63 6.37919 17C6.62643 17.37 6.97783 17.6584 7.38896 17.8287C7.8001 17.999 8.2525 18.0436 8.68895 17.9568C9.12541 17.87 9.52632 17.6557 9.84099 17.341C10.1557 17.0263 10.37 16.6254 10.4568 16.189C10.5436 15.7525 10.499 15.3001 10.3287 14.889C10.1584 14.4778 9.87004 14.1264 9.50003 13.8792C9.13002 13.632 8.69501 13.5 8.25 13.5V12C9.24456 12 10.1984 12.3951 10.9017 13.0983C11.6049 13.8016 12 14.7554 12 15.75C12 16.7446 11.6049 17.6984 10.9017 18.4017C10.1984 19.1049 9.24456 19.5 8.25 19.5Z" fill="#005467"/>
          <path d="M21 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V21C1.5004 21.3977 1.65856 21.779 1.93978 22.0602C2.221 22.3414 2.6023 22.4996 3 22.5H21C21.3976 22.4994 21.7788 22.3412 22.06 22.06C22.3412 21.7788 22.4994 21.3976 22.5 21V3C22.4996 2.6023 22.3414 2.221 22.0602 1.93978C21.779 1.65856 21.3977 1.5004 21 1.5ZM21 8.25H10.5V3H21V8.25ZM9 3V8.25H3V3H9ZM3 21V9.75H21L21.0015 21H3Z" fill="#005467"/>
          </svg>
          `
        })), 

        class: "mdi-plus",

        position: "left"
      },

      rightIcon: {

        isExternalIcon: false,

        svg : markRaw(defineComponent({

        template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15.75H19.5V19.5H18V15.75ZM15 12H16.5V19.5H15V12ZM8.25 19.5C7.2558 19.4988 6.30267 19.1033 5.59966 18.4003C4.89666 17.6973 4.50119 16.7442 4.5 15.75H6C6 16.195 6.13196 16.63 6.37919 17C6.62643 17.37 6.97783 17.6584 7.38896 17.8287C7.8001 17.999 8.2525 18.0436 8.68895 17.9568C9.12541 17.87 9.52632 17.6557 9.84099 17.341C10.1557 17.0263 10.37 16.6254 10.4568 16.189C10.5436 15.7525 10.499 15.3001 10.3287 14.889C10.1584 14.4778 9.87004 14.1264 9.50003 13.8792C9.13002 13.632 8.69501 13.5 8.25 13.5V12C9.24456 12 10.1984 12.3951 10.9017 13.0983C11.6049 13.8016 12 14.7554 12 15.75C12 16.7446 11.6049 17.6984 10.9017 18.4017C10.1984 19.1049 9.24456 19.5 8.25 19.5Z" fill="#005467"/>
          <path d="M21 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V21C1.5004 21.3977 1.65856 21.779 1.93978 22.0602C2.221 22.3414 2.6023 22.4996 3 22.5H21C21.3976 22.4994 21.7788 22.3412 22.06 22.06C22.3412 21.7788 22.4994 21.3976 22.5 21V3C22.4996 2.6023 22.3414 2.221 22.0602 1.93978C21.779 1.65856 21.3977 1.5004 21 1.5ZM21 8.25H10.5V3H21V8.25ZM9 3V8.25H3V3H9ZM3 21V9.75H21L21.0015 21H3Z" fill="#005467"/>
          </svg>
          `
        })), 

        class: "mdi-plus",

        position: "right"
      },

      svgLeftIcon: {

        isExternalIcon: true,

        svg : markRaw(defineComponent({

        template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15.75H19.5V19.5H18V15.75ZM15 12H16.5V19.5H15V12ZM8.25 19.5C7.2558 19.4988 6.30267 19.1033 5.59966 18.4003C4.89666 17.6973 4.50119 16.7442 4.5 15.75H6C6 16.195 6.13196 16.63 6.37919 17C6.62643 17.37 6.97783 17.6584 7.38896 17.8287C7.8001 17.999 8.2525 18.0436 8.68895 17.9568C9.12541 17.87 9.52632 17.6557 9.84099 17.341C10.1557 17.0263 10.37 16.6254 10.4568 16.189C10.5436 15.7525 10.499 15.3001 10.3287 14.889C10.1584 14.4778 9.87004 14.1264 9.50003 13.8792C9.13002 13.632 8.69501 13.5 8.25 13.5V12C9.24456 12 10.1984 12.3951 10.9017 13.0983C11.6049 13.8016 12 14.7554 12 15.75C12 16.7446 11.6049 17.6984 10.9017 18.4017C10.1984 19.1049 9.24456 19.5 8.25 19.5Z" fill="#005467"/>
          <path d="M21 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V21C1.5004 21.3977 1.65856 21.779 1.93978 22.0602C2.221 22.3414 2.6023 22.4996 3 22.5H21C21.3976 22.4994 21.7788 22.3412 22.06 22.06C22.3412 21.7788 22.4994 21.3976 22.5 21V3C22.4996 2.6023 22.3414 2.221 22.0602 1.93978C21.779 1.65856 21.3977 1.5004 21 1.5ZM21 8.25H10.5V3H21V8.25ZM9 3V8.25H3V3H9ZM3 21V9.75H21L21.0015 21H3Z" fill="#005467"/>
          </svg>
          `
        })), 

        class: "mdi-plus",

        position: "left"
      },

      svgRightIcon: {

        isExternalIcon: true,

        svg : markRaw(defineComponent({

        template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15.75H19.5V19.5H18V15.75ZM15 12H16.5V19.5H15V12ZM8.25 19.5C7.2558 19.4988 6.30267 19.1033 5.59966 18.4003C4.89666 17.6973 4.50119 16.7442 4.5 15.75H6C6 16.195 6.13196 16.63 6.37919 17C6.62643 17.37 6.97783 17.6584 7.38896 17.8287C7.8001 17.999 8.2525 18.0436 8.68895 17.9568C9.12541 17.87 9.52632 17.6557 9.84099 17.341C10.1557 17.0263 10.37 16.6254 10.4568 16.189C10.5436 15.7525 10.499 15.3001 10.3287 14.889C10.1584 14.4778 9.87004 14.1264 9.50003 13.8792C9.13002 13.632 8.69501 13.5 8.25 13.5V12C9.24456 12 10.1984 12.3951 10.9017 13.0983C11.6049 13.8016 12 14.7554 12 15.75C12 16.7446 11.6049 17.6984 10.9017 18.4017C10.1984 19.1049 9.24456 19.5 8.25 19.5Z" fill="#005467"/>
          <path d="M21 1.5H3C2.6023 1.5004 2.221 1.65856 1.93978 1.93978C1.65856 2.221 1.5004 2.6023 1.5 3V21C1.5004 21.3977 1.65856 21.779 1.93978 22.0602C2.221 22.3414 2.6023 22.4996 3 22.5H21C21.3976 22.4994 21.7788 22.3412 22.06 22.06C22.3412 21.7788 22.4994 21.3976 22.5 21V3C22.4996 2.6023 22.3414 2.221 22.0602 1.93978C21.779 1.65856 21.3977 1.5004 21 1.5ZM21 8.25H10.5V3H21V8.25ZM9 3V8.25H3V3H9ZM3 21V9.75H21L21.0015 21H3Z" fill="#005467"/>
          </svg>
          `
        })), 

        class: "mdi-plus",

        position: "right"
      },
      
		};
	},

}

</script>

<style lang="scss">

#exemple-container {
  display: flex;
  justify-content: space-around;
}

.mb-20 {
  margin-bottom: 20px;
}

.gts-test{
		display: flex;
		border-radius: 12px;
		padding: 12px 20px;
		font-size: 14px;
		text-align: center;
		line-height: 24px;
		font-weight: 600;
		background: $accent-error-red-color;
		color: $color-white;
	}

	.gts-test:hover{
		background: $color-white;
		color: $accent-error-red-color;
		border: 1px solid $accent-error-red-color;
	}
</style>