# AddressMapPicker & MapAutoComplete Component Documentation

## Introduction

The `map-picker` module provides interactive Leaflet-based map picking and address auto-completion capabilities.

- `AddressMapPicker`: An interactive modal dialog featuring an OpenStreetMap display, a location search input to center/zoom the map viewport, a distance radius selector slider, reverse geocoding on click, and confirmation controls.
- `MapAutoComplete`: An auto-complete input component integrated with `AddressMapPicker` for selecting full addresses with geographical coordinates.

---

## Components

### 1. `AddressMapPicker`

The map modal dialog used for picking an address visually on a map or searching geographical viewports.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `show` | `Boolean` | Yes | - | Controls the visibility of the map picker dialog modal. |
| `initialCoordinates` | `Object` | No | `null` | `{ lat: number, lon: number }` initial center coordinates. Defaults to default system coordinates. |
| `pickedAddress` | `Object` | No | `null` | Currently selected address object containing latitude, longitude, display_name, etc. |
| `radius` | `Number` | No | `null` | Distance radius in kilometers to render a dynamic search circle around selected pin. |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `confirm` | `selectedAddress` (Object) | Emitted when the user confirms their address selection. Payload includes `latitude`, `longitude`, `display_name`, and `radius`. |
| `close` | None | Emitted when the user closes or cancels the dialog. |
| `update:radius` | `radius` (Number) | Emitted when the user changes the radius slider. |

#### Features
- **Location Viewport Search**: Text input and Search button to navigate/zoom to any city, place, or region using Nominatim OpenStreetMap search without altering active pin selection or coordinates.
- **Pin Pointing & Reverse Geocoding**: Clicking anywhere on the map drops a marker and fetches exact address details via `AddressService`.
- **Dynamic Radius Overlay**: Optional slider overlay drawing a semi-transparent blue radius circle on the map in kilometers.

---

### 2. `MapAutoComplete`

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modelValue` | `Object` \| `String` | No | `null` | Selected address value (v-model support). |
| `placeholder` | `String` | No | `'Search address...'` | Placeholder text for the input field. |
| `radius` | `Number` | No | `null` | Search radius passed down to `AddressMapPicker`. |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `address` (Object) | Emitted when an address is selected. |
| `addressSelected` | `address` (Object) | Emitted when an address is confirmed from suggestions or map picker. |

---

## Usage Example

### AddressMapPicker Example

```vue
<template>
  <div>
    <button @click="openPicker = true">Pick Address on Map</button>

    <AddressMapPicker
      v-if="openPicker"
      :show="openPicker"
      :pickedAddress="selectedAddress"
      v-model:radius="searchRadius"
      @confirm="handleConfirmAddress"
      @close="openPicker = false"
    />
  </div>
</template>

<script>
import AddressMapPicker from '@/components/map-picker/AddressMapPicker.vue';

export default {
  components: { AddressMapPicker },
  data() {
    return {
      openPicker: false,
      searchRadius: 15,
      selectedAddress: null
    };
  },
  methods: {
    handleConfirmAddress(address) {
      this.selectedAddress = address;
      console.log('Confirmed address:', address.display_name);
      console.log('Coordinates:', address.latitude, address.longitude);
      console.log('Radius:', address.radius);
    }
  }
};
</script>
```