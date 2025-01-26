<template>

  <div id="exemple-container">


   <div>
    <ToolTip text="ToolTip left" position="left">
      <button>this is a Tooltip in left position</button>
    </ToolTip>
   </div>

    <div>
      <ToolTip text="ToolTip center" position="center">
      <button>this is a Tooltip in center position</button>
    </ToolTip>
    </div>

    <div>
      <ToolTip text="ToolTip right" position="right">
      <button>this is a Tooltip in right position</button>
    </ToolTip>
    </div>
  </div>



</template>

<script>

import ToolTip from './ToolTip.vue';





export default {

  name: "TooltipExemple",

  components: {
    ToolTip
  },

  data() {
    return {

    };
  },

}

</script>

<style lang="scss"></style>