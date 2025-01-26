<template>

  <div id="exemple-container">

    <!-- with specific class style -->
    <div>
      <BadgeComponent class="mb-20" :text="'test'"/>
      <BadgeComponent class="mb-20" :text="'specific style'" :className="'gts-badge-test'"/>
    </div>
  
    <!-- with theme -->
    <div class="gts-badge-container-example">
        
      <BadgeComponent :text="'PRIMARY'" :theme="PRIMARY"/>

      <BadgeComponent :text="'Completed'" :theme="SUCCESS"/>

      <BadgeComponent class="mb-20" :text="'Pending'" :theme="WARNING"/>

      <BadgeComponent class="mb-20" :text="'Cancelled'" :theme="DANGER"/>
    </div>
  
    
  </div>

</template>

<script>

import BadgeComponent from '@/components/badge/BadgeComponent.vue';

import { PRIMARY, SUCCESS, WARNING, DANGER } from '@/constants/badges.js';

export default {

  name:"BadgeExample",
 
  components: {
    BadgeComponent,
  },

  data() {
		return {
      PRIMARY,
      SUCCESS,
      WARNING,
      DANGER,
		};
	},

}

</script>

<style lang="scss">

#exemple-container {
  display: flex;
  justify-content: space-around;

  .gts-badge-container-example{
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.gts-badge-container {
  margin-bottom: 10px;
}


.gts-badge-test{
  border-radius: 80px;
  padding: 6px 10px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  font-weight: 600;
  background:  $accent-error-red-color;
  color: $color-white;
	}


</style>