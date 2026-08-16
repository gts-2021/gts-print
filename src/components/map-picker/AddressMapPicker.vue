<template>
  <ConfirmationDialog className="address-map-picker" :isOpen="true" :titleLastBtn="$t('mapAutoComplete.mapPicker.confirmBtn')"
    :titleFirstBtn="$t('mapAutoComplete.mapPicker.cancelBtn')" :themeFirstBtn="PRIMARY_50" :themeLastBtn="PRIMARY_50_INVERSE"
    :title="$t('mapAutoComplete.mapPicker.title')" @onClosedDialog="close" @onFirstBtnClicked="close"
    @onLastBtnClicked="confirm">
    <div class="address-map-picker-content">
      <div class="map-picker-search-container">
        <div class="map-picker-search-input-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="$t('mapAutoComplete.mapPicker.searchPlaceholder') || 'Rechercher une ville, région, lieu...'"
            class="gts-input map-picker-search-input"
            @keyup.enter="onSearchLocation"
          />
        </div>
        <ButtonComponent
          :title="$t('mapAutoComplete.mapPicker.searchBtn') || 'Rechercher'"
          :theme="PRIMARY"
          @buttonClicked="onSearchLocation"
          :disabled="isSearching || !searchQuery.trim()"
          className="map-picker-search-btn"
        />
      </div>
      <div v-if="searchError" class="search-error-msg">
        {{ searchError }}
      </div>

      <div v-if="selectedAddress" class="mt-3 selected-address-text">
        <strong>{{$t('mapAutoComplete.mapPicker.selectedAddressLabel')}} : </strong> {{
          selectedAddress.display_name }}
      </div>

      <div v-if="radius !== null && radius !== undefined" class="radius-slider-container">
        <label for="radius-range" class="radius-slider-label">
          <strong>{{ $t('mapAutoComplete.mapPicker.rayonSliderLabel') || 'rayon de recherche :' }}</strong>
          <span class="radius-value">{{ localRayon }} km</span>
        </label>
        <input
          id="radius-range"
          type="range"
          v-model.number="localRayon"
          :min="1"
          :max="200"
          step="1"
          class="radius-slider"
          @input="onRayonSliderChange"
        />
      </div>

      <div id="map"></div>

    </div>
  </ConfirmationDialog>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AddressService from '@services/AddressService';
import ButtonComponent from '@components/button/ButtonComponent.vue';
 
import { PRIMARY, PRIMARY_50, PRIMARY_50_INVERSE } from '@constants/buttons';

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
    ConfirmationDialog,
    ButtonComponent
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
    },
    radius: {
      type: Number,
      required: false,
      default: null
    }
  },
  emits: ['close', 'confirm', 'update:radius'],
  async mounted() {
    this.$nextTick(() => {
      this.initMap();
    });

  },
  data() {
    return {
      map: null,
      marker: null,
      circle: null,
      localRayon: this.radius || 10,
      selectedAddress: null,
      searchQuery: '',
      isSearching: false,
      searchError: '',
      PRIMARY,
      PRIMARY_50,
      PRIMARY_50_INVERSE
    };
  },
  watch: {
    radius(newVal) {
      if (newVal !== null && newVal !== undefined) {
        this.localRayon = newVal;
        if (this.marker) {
          const { lat, lng } = this.marker.getLatLng();
          this.drawCircle(lat, lng);
        }
      }
    },
    pickedAddress: {
      handler(newVal) {
        if (newVal && newVal.latitude && newVal.longitude) {
          if (this.map) {
            this.setUpSelectedAddress(newVal.latitude, newVal.longitude);
          }
        } else {
          this.selectedAddress = null;
          if (this.marker && this.map) {
            this.map.removeLayer(this.marker);
            this.marker = null;
          }
          if (this.circle && this.map) {
            this.map.removeLayer(this.circle);
            this.circle = null;
          }
        }
      },
      deep: true
    }
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
        this.drawCircle(lat, lon);
      }

      this.map.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        this.setUpSelectedAddress(lat, lng);
      });

      if (this.pickedAddress && this.pickedAddress.latitude && this.pickedAddress.longitude) {
        this.setUpSelectedAddress(this.pickedAddress.latitude, this.pickedAddress.longitude);
      }
    },
    addMarker(lat, lng) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
    },
    drawCircle(lat, lng) {
      if (this.radius === null || this.radius === undefined) return;

      if (this.circle) {
        this.map.removeLayer(this.circle);
      }

      this.circle = L.circle([lat, lng], {
        radius: this.localRayon * 1000, // convert km to meters
        color: '#3f51b5',
        fillColor: '#3f51b5',
        fillOpacity: 0.15,
        weight: 1.5
      }).addTo(this.map);
    },
    onRayonSliderChange() {
      this.$emit('update:radius', this.localRayon);
      if (this.marker) {
        const { lat, lng } = this.marker.getLatLng();
        this.drawCircle(lat, lng);
      }
      if (this.selectedAddress) {
        this.selectedAddress.radius = this.localRayon;
      }
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
        this.drawCircle(lat, lng);

        // Fetch address details
        const address = await AddressService.getAddressFromCoordinates(lat, lng);

        if (address && this.marker) {
          this.selectedAddress = {
            ...address,
            latitude: lat,
            longitude: lng,
            radius: this.localRayon
          };
        }
      }
    },
    async onSearchLocation() {
      if (!this.searchQuery || !this.searchQuery.trim()) return;

      this.isSearching = true;
      this.searchError = '';

      try {
        const results = await AddressService.searchAddress(this.searchQuery.trim());
        if (results && results.length > 0) {
          const topResult = results[0];
          const lat = parseFloat(topResult.lat);
          const lon = parseFloat(topResult.lon);

          if (!isNaN(lat) && !isNaN(lon)) {
            if (topResult.boundingbox && Array.isArray(topResult.boundingbox) && topResult.boundingbox.length === 4) {
              const south = parseFloat(topResult.boundingbox[0]);
              const north = parseFloat(topResult.boundingbox[1]);
              const west = parseFloat(topResult.boundingbox[2]);
              const east = parseFloat(topResult.boundingbox[3]);

              if (!isNaN(south) && !isNaN(north) && !isNaN(west) && !isNaN(east)) {
                this.map.fitBounds([[south, west], [north, east]]);
              } else {
                this.map.setView([lat, lon], 12);
              }
            } else {
              this.map.setView([lat, lon], 12);
            }
          } else {
            this.searchError = this.$t('mapAutoComplete.mapPicker.noResultsFound') || 'Aucun lieu trouvé';
          }
        } else {
          this.searchError = this.$t('mapAutoComplete.mapPicker.noResultsFound') || 'Aucun lieu trouvé';
        }
      } catch (err) {
        console.error("Error searching location for map viewport:", err);
        this.searchError = this.$t('mapAutoComplete.mapPicker.noResultsFound') || 'Aucun lieu trouvé';
      } finally {
        this.isSearching = false;
      }
    }
  }
};
</script>

<style>
.address-map-picker .gts-dialog-content {
  height: 660px;
  max-height: 660px;
}

.address-map-picker-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-picker-search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: center;
}

.map-picker-search-input-wrapper {
  flex-grow: 1;
}

.map-picker-search-input {
  width: 100%;
  height: 44px;
  font-size: 14px;
}

.map-picker-search-btn .gts-button {
  height: 44px;
  padding: 0 16px;
  white-space: nowrap;
}

.search-error-msg {
  color: #d32f2f;
  font-size: 13px;
  margin-bottom: 10px;
}

.selected-address-text {
  margin-bottom: 10px;
}

.radius-slider-container {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.radius-slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #495057;
}

.radius-value {
  font-weight: bold;
  color: #3f51b5; /* primary color */
  background: #e8eaf6;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.radius-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 5px;
  background: #dee2e6;
  outline: none;
  margin: 5px 0;
  cursor: pointer;
}

.radius-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3f51b5;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease-in-out, background-color 0.15s;
}

.radius-slider::-webkit-slider-thumb:hover {
  transform: scale(1.25);
  background: #303f9f;
}

.radius-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3f51b5;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease-in-out, background-color 0.15s;
}

.radius-slider::-moz-range-thumb:hover {
  transform: scale(1.25);
  background: #303f9f;
}

#map {
  z-index: 1;
  flex-grow: 1;
  width: 100%;
  min-height: 340px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}
</style>
