<template>
  <div>
    <div class="flex-grow1" style="position: relative;">
      <AutoComplete v-bind="$attrs"
        :formatSelectedValueDisplay="formatSelectedValue ? (option) => formatSelectedValue(setUpSelectedValue(option)) : undefined"
        :options="addressSuggestions" @onOptionSelected="onAddressSelected" @onValueChanged="onAddressSearch" />

      <v-icon @click="openMapPicker" style="cursor: pointer; position: absolute; right: 10px; top: 35px; z-index: 10;"
        title="Pick from Map">
        mdi-map-marker
      </v-icon>
    </div>

    <AddressMapPicker v-if="showMapPicker" :pickedAddress="internalSelectedAddress" :radius="radius"
      @close="showMapPicker = false" @confirm="onMapAddressConfirmed" @update:radius="$emit('update:radius', $event)" />
  </div>
</template>

<script>
import AutoComplete from '@components/input/AutoComplete.vue';
import AddressMapPicker from './AddressMapPicker.vue';
import { debounce } from 'lodash';
import AddressService from '@services/AddressService';

export default {
  name: 'MapAutoComplete',
  components: {
    AutoComplete,
    AddressMapPicker
  },
  
  props: {
    defaultSelectedAddress: {
      type: Object,
      required: false
    },
    formatSelectedValue: {
      type: Function,
      required: false
    },
    radius: {
      type: Number,
      required: false,
      default: null
    }
  },
  async created(){

   this.handleDefaultAddress();

  },
  data() {
    return {
      addressSuggestions: [],
      showMapPicker: false,
      isLoadingAddress: false,
      internalSelectedAddress: undefined,
    };
  },

  methods: {
    onAddressSearch: debounce(function (val) {
      if (!val || typeof val !== 'string' || val.length < 3) {
        this.addressSuggestions = [];
        return;
      }
      this.isLoadingAddress = true;
      AddressService.searchAddress(val)
        .then(results => {
          this.addressSuggestions = results.map(item => ({
            label: item.display_name,
            value: item
          }));
        })
        .finally(() => {
          this.isLoadingAddress = false;
        });
    }, 500),

    async handleDefaultAddress() {
      if (this.defaultSelectedAddress && this.defaultSelectedAddress.latitude && this.defaultSelectedAddress.longitude) {
        const address = await AddressService.getAddressFromCoordinates(this.defaultSelectedAddress.latitude, this.defaultSelectedAddress.longitude);
        this.onAddressSelected(address)
      }
    },

    setUpSelectedValue(selection) {

      const selectedValue = (selection?.value) ? selection.value : selection;
      const adr = selectedValue.address;

      let customAddress = {};
      customAddress.fulladdress = selectedValue.display_name;
      customAddress.address = adr;
      customAddress.street = this.getStreetFromAddress(adr);
      customAddress.zipCode = adr.postcode;
      customAddress.city = adr.city || adr.town || adr.village || adr.municipality || ''
      customAddress.latitude = selectedValue.lat || selectedValue.latitude;
      customAddress.longitude = selectedValue.lon || selectedValue.longitude;
      customAddress.radius = selectedValue.radius !== undefined ? selectedValue.radius : this.radius;

      return customAddress;
    },
    onAddressSelected(selection) {
       
      const selected = this.setUpSelectedValue(selection);
      this.internalSelectedAddress = selected;

      // 🔹 mettre à jour le texte affiché dans l'autocomplete
      const displayValue = this.formatSelectedValue
        ? this.formatSelectedValue(selected)
        : selected.fulladdress;

      this.$emit("update:modelValue", displayValue);

      this.$emit("onAddressSelected", selected);

    },

    openMapPicker() {
      this.showMapPicker = true;
    },

    onMapAddressConfirmed(address) {
      if (address.radius !== undefined) {
        this.$emit('update:radius', address.radius);
      }
      this.onAddressSelected(address)
      this.showMapPicker = false;
    },

    getStreetFromAddress(address) {
      return address?.road || address?.street || address.suburb || address.state_district || address.village || address.state || '';
    }
  },
  watch: {
		defaultSelectedAddress() {
			 this.handleDefaultAddress();
		}
	}
};
</script>

<style>
.flex-grow1 {
  flex-grow: 1;
}
</style>