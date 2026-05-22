<template>


  <div id="exemple-container">

    <h3>Map Exemples :</h3>

    <h4> Controlled input value after selection : </h4>
    <MapAutoComplete label="Enter a name of street" v-model="address" @onAddressSelected="onSelect" :formatSelectedValue="(option) => option.street"  />
    <h6> Selected : {{ address }}</h6>
    <br>

    <h4> Not Controlled input value after selection : </h4>
    <MapAutoComplete label="Enter a name of street" v-model="address2"  />
    <h6> Selected : {{ address2 }}</h6>

    <br>
    <h4> AutoCompleteMap with already defined selectedAddress !: </h4>
    <MapAutoComplete label="Enter a name of street" v-model="address3" :defaultSelectedAddress="selectedAddress" />
    <h6> Selected : {{ address3 }}</h6>

    <br>
    <h4> AutoCompleteMap with Radius set to 10 klm: </h4>
    <MapAutoComplete v-model:radius="radius" label="Enter a name of street" v-model="address3" :defaultSelectedAddress="selectedAddress" />
    <h6> Selected : {{ address3 }} === Radius : {{ radius }}</h6>





  </div>

</template>

<script>
import MapAutoComplete from './MapAutoComplete.vue';




export default {

  name: 'InputExemple',

  components: {
    MapAutoComplete
  },

  data() {
    return {

      address: 'Charles Rouxel',
      address2: 'Charles Rouxel',
      address3: '',
      radius: 15,
      selectedAddress: {
        latitude: 28.0339,
        longitude: 1.6596

      }
    };
  },
  methods: {
    onSelect(adr) {
       

    }
  }
}

</script>

<style lang="scss">
#exemple-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  ;
}
</style>