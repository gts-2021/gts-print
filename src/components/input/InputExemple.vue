<template>


  <div id="exemple-container">
    <TextInput @OnValueChanged="(v)=> console.log(v)" label="First Name" required="true" placeholder="Your name please" />

    <TextInput label="Password" type="password" placeholder="Hide yout password" />

    <TextInput disabled  label="Disabled Input" value="Disabled input"   placeholder="This is a disabled input" />

  
    <TextInput label="Date of Birth" required="true" type="date" />

    <TextInput error="You should give a valid value" label="Eroor Input"   placeholder="This is an error input" />

    <TextInputArea rror="You should give a valid value" label="Eroor Input"   placeholder="This is an error input" />
    
  </div>

</template>

<script>

import TextInput from '@/components/input/TextInput.vue';
import TextInputArea from '@/components/input/TextInputArea.vue';

export default {

  components: {
    TextInput,
    TextInputArea

  },

  data() {
    return {



    };
  }
}

</script>

<style lang="scss">

#exemple-container {
  padding: 20px;;
}

</style>