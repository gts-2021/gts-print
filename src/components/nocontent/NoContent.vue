<template>

  <div class="no-content-container">
    
    <!-- slot for icon -->
    <div v-if="$slots.icon">
      <slot name="icon"> </slot>
    </div>


    <!-- display description if exist -->
    <p v-if="description" class="no-content-description">
      {{ description }}
    </p>

    <!-- slot for boutons -->
    <div v-if="$slots.buttons" class="buttons-container">
      <slot name="buttons"></slot>
    </div>
  </div>

</template>

<script>

export default {

	name: 'NoContent',
	
  props: {
    description : {
      type: String,
      required : false,
      default: "" 
    }
  },

}

</script>

<style lang="scss">

.no-content-container{

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  flex-grow: 1;

  .no-content-description{
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: $primary-color-700;
  }

}


</style>