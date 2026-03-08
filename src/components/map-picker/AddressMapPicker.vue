<template>
  <ConfirmationDialog className="address-map-picker" :isOpen="true" :titleLastBtn="$t('mapAutoComplete.mapPicker.confirmBtn')"
    :titleFirstBtn="$t('mapAutoComplete.mapPicker.cancelBtn')" :themeFirstBtn="PRIMARY_50" :themeLastBtn="PRIMARY_50_INVERSE"
    :title="$t('mapAutoComplete.mapPicker.title')" @onClosedDialog="close" @onFirstBtnClicked="close"
    @onLastBtnClicked="confirm">
    <div class="address-map-picker-content">
      <div v-if="selectedAddress" class="mt-3">
        <strong>{{$t('mapAutoComplete.mapPicker.selectedAddressLabel')}} : </strong> {{
          selectedAddress.display_name }}
      </div>
      <div id="map"></div>

    </div>
  </ConfirmationDialog>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AddressService from '@services/AddressService';
 
import { PRIMARY_50, PRIMARY_50_INVERSE } from '@constants/buttons';

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ConfirmationDialog from '@components/dialog/ConfirmationDialog.vue';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default {
  name: 'AddressMapPicker',
  components: {
    ConfirmationDialog
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    initialCoordinates: {
      type: Object,
      default: () => null // { lat: number, lon: number }
    },
    pickedAddress: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'confirm'],
  async mounted() {
    this.$nextTick(() => {
      this.initMap();
    });

  },
  data() {
    return {
      map: null,
      marker: null,
      selectedAddress: null,
      PRIMARY_50,
      PRIMARY_50_INVERSE
    };
  },

  methods: {
    async initMap() {
      if (this.map) {
        this.map.remove();
      }

      // Default to Paris if no initial coordinates
      const lat = this.initialCoordinates?.lat || process.env.VUE_APP_LATITUDE || 28.0339;
      const lon = this.initialCoordinates?.lon || process.env.VUE_APP_LONGITUDE || 1.6596;
      const zoom = this.initialCoordinates || 4.5;

      this.map = L.map('map').setView([lat, lon], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      if (this.initialCoordinates) {
        this.addMarker(lat, lon);
      }

      this.map.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        this.setUpSelectedAddress(lat, lng);
      });

      if (this.pickedAddress.latitude && this.pickedAddress.longitude) {
        this.setUpSelectedAddress(this.pickedAddress.latitude, this.pickedAddress.longitude);

      }
    },
    addMarker(lat, lng) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
    },
    close() {
      this.$emit('close');
    },
    confirm() {
      if (this.selectedAddress) {
        this.$emit('confirm', this.selectedAddress);
        this.close();
      }
    },
    async setUpSelectedAddress(lat, lng) {
      if (lat && lng) {
        this.selectedAddress = { display_name: this.$t('mapAutoComplete.mapPicker.calculatingAddressLabel') };


        this.addMarker(lat, lng);

        // Fetch address details
        const address = await AddressService.getAddressFromCoordinates(lat, lng);

        if (address) {
          this.selectedAddress = address;
        }
      }
    }
  }
};
</script>

<style>
.address-map-picker {
  .gts-dialog-content {
    height: 600px;
    max-height: 600px;
  }
}

#map {
  z-index: 1;
  height: 100%;
  width: 100%;
}

.address-map-picker-content {

  width: 100%;
  height: 100%;
}
</style>
