<template>


  <div id="exemple-container">
    <TextInput @OnValueChanged="(v)=> console.log(v)" label="First Name" :required="true" placeholder="Your name please" />

    <TextInput label="Password" type="password" placeholder="Hide yout password" />

    <TextInput disabled  label="Disabled Input" value="Disabled input"   placeholder="This is a disabled input" />

  
    <TextInput label="Date of Birth" :required="true" type="date" />

    <TextInput error="You should give a valid value" label="Eroor Input" placeholder="This is an error input" />

    <TextInputArea rror="You should give a valid value" label="Eroor Input" placeholder="This is an error input" />
    

    <ListBox    :options="listBoxOptions" label="ListBox" type="password" placeholder="Hide yout password" />

  </div>

</template>

<script>

import TextInput from '@/components/input/TextInput.vue';
import TextInputArea from '@/components/input/TextInputArea.vue';
import ListBox from './ListBox.vue';

export default {

  components: {
    TextInput,
    TextInputArea,
    ListBox

  },

  data() {
    return {

      listBoxOptions: [
        {'label':'Select domain','value':'0'},
        {'label':'Software Ingenering 1','value':'1'},
        {'label':'Software Ingenering 2','value':'1'},
        {'label':'Software Ingenering 3','value':'1'},
        {'label':'Software Ingenering 4','value':'1'},
        {'label':'Software Ingenering 5','value':'1'},
        {'label':'Software Ingenering 6','value':'1'},
        {'label':'Software Ingenering 6','value':'1'},
        {'label':'Software Ingenering 8','value':'1'},
        {'label':'Software Ingenering 9','value':'1'},
        {'label':'Software Ingenering 10','value':'1'},
        {'label':'Software Ingenering 11','value':'1'},
        {'label':'Software Ingenering 12','value':'1'},
        {'label':'Software Ingenering 13','value':'1'}
      ]

    };
  }
}

</script>

<style lang="scss">

#exemple-container {
  display: flex;
  flex-direction: column;
  padding: 20px;;
}

</style>