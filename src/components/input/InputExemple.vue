<template>


  <div id="exemple-container">

    <h3>Inputs Exemple :</h3>
    <TextInput v-model="inp1Val" @OnValueChanged="(v)=> console.log(v)" label="First Name" :required="true" placeholder="Your name please" />
    <span>Input is binding : {{ inp1Val }}</span> <br>

    <TextInput label="Password" type="password" placeholder="Hide yout password" />

    <TextInput disabled  label="Disabled Input" value="Disabled input" placeholder="This is a disabled input" />

  
    <TextInput label="Date of Birth" :required="true" type="date" />

    <TextInput label="Textarea Input" placeholder="This is a textarea" />

    <TextInputArea label="Comment" placeholder="This is a comment" />
    
    <TextInputArea error="You should give a valid value" label="Eroor Input" placeholder="This is an error input" />
    

    <TextInputArea v-model="textAreaVal"  label="Binding text area" placeholder="This is an error input" />
    <span>TextArea is binding : {{ textAreaVal }}</span> <br>

     <h3>Inputs With Maska Exemples :</h3>
   
        
    <br>
      <span>TextInput with mask : </span> 
    <br>

    <TextInput label="Input Text with mask" placeholder="only text" :maskPattern="'@@@@@@@@@@@@@'" className="my-input" id="id-my-input" />

    <TextInput label="Input phone with mask" placeholder="only number" :maskPattern="'0# ## ## ## ##'"/>

    <TextInput label="Input Text with mask" placeholder="mixed caracters" :maskPattern="'****************************'" />

    <TextInput label="Input Text with token" placeholder="with token" :maskToken="maskWithToken" />

    <TextInput label="Input address" placeholder="with token" :maskToken="addressMask" />


    <h3>ListBox Exemples :</h3>
    <ListBox  :options="[]" label="Empty ListBox"  />
    

    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptions" label="ListBox"    />
    
    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptions" :defaultValue="'2'" label="ListBox with defeult value"    />

    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptions" :value="valueToChange" label="ListBox with code controled value"   />
    <ButtonComponent class="mb-20":title="'Changed value to 3'"  @click="() => valueToChange = '3'" />
          
    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptions" label="ListBox with select item label" selectItemLabel="Select an item"  />
    
    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptions" label="ListBox with select disabled item label" selectItemLabel="Select an item"  :isSelectItemLabelSelectable="true" />
     

    <ListBox @OnValueChanged="(v)=> console.log('onValueChanged : ', v)" :options="listBoxOptionsWithDisable" label="ListBox with   disabled items " selectItemLabel="Select an item"   />
     

   

  </div>

</template>

<script>

import TextInput from '@/components/input/TextInput.vue';
import TextInputArea from '@/components/input/TextInputArea.vue';
import ListBox from './ListBox.vue';
import ButtonComponent from '../button/ButtonComponent.vue';

export default {

  name: 'InputExemple',

  components: {
    TextInput,
    TextInputArea,
    ListBox,
    ButtonComponent

  },

  data() {
    return {

      listBoxOptions: [
        
        {'label':'Software Ingenering 1','value':'1'},
        {'label':'Software Ingenering 2','value':'2'},
        {'label':'Software Ingenering 3','value':'3'},
        {'label':'Software Ingenering 4','value':'4'},
        {'label':'Software Ingenering 5','value':'5'},
        {'label':'Software Ingenering 6','value':'6'},
        {'label':'Software Ingenering 6','value':'7'},
        {'label':'Software Ingenering 8','value':'8'},
        {'label':'Software Ingenering 9','value':'9'},
        {'label':'Software Ingenering 10','value':'10'},
        {'label':'Software Ingenering 11','value':'11'},
        {'label':'Software Ingenering 12','value':'12'},
        {'label':'Software Ingenering 13','value':'13'}
      ],
      listBoxOptionsWithDisable: [
        
        {'label':'Software Ingenering 1','value':'1'},
        {'label':'Software Ingenering 2','value':'2', disabled: true},
        {'label':'Software Ingenering 3','value':'3'},
        {'label':'Software Ingenering 4','value':'4', disabled: true},
      ],
      inp1Val:"",
      textAreaVal:"",
      maskWithToken:{
        pattern:"M",
        token: "{'M': { 'pattern': '[a-z A-Z]', 'repeated': true } }"
      },

      /*addressMask: {
        pattern: "S, VVVVV, C",       
        token: "{'S': { 'pattern': '[a-z A-Z 0-9]', 'repeated': true }, 'V': { 'pattern': '[0-9]', 'repeated': true },  'X': { 'pattern': '[a-z A-Z]', 'repeated': true }}"
      },*/

      addressMask: {
        pattern: "S, VVVVV, C",       
        token: {
          S: { pattern: '[a-zA-Z0-9 ]', repeated: true },  // Adresse : lettres, chiffres et espaces, répétition autorisée
          V: { pattern: '[0-9]', repeated: true },         // Code postal : uniquement des chiffres, répétition autorisée (jusqu'à 5 chiffres)
          C: { pattern: '[a-zA-Z ]', repeated: true }      // Pays : lettres et espaces, répétition autorisée
        }
      },

      valueToChange: '1',
      twoWayBindValue: '1'

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