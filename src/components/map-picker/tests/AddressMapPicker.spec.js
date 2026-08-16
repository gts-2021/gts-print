import { mount } from '@vue/test-utils';
import AddressMapPicker from '@/components/map-picker/AddressMapPicker.vue';
import AddressService from '@/services/AddressService';

// Mock css and image imports for Leaflet in Jest
jest.mock('leaflet/dist/leaflet.css', () => ({}), { virtual: true });
jest.mock('leaflet/dist/images/marker-icon.png', () => 'marker-icon.png', { virtual: true });
jest.mock('leaflet/dist/images/marker-shadow.png', () => 'marker-shadow.png', { virtual: true });

// Mock leaflet
jest.mock('leaflet', () => {
  const mapMock = {
    setView: jest.fn().mockReturnThis(),
    fitBounds: jest.fn().mockReturnThis(),
    on: jest.fn(),
    remove: jest.fn(),
    removeLayer: jest.fn()
  };
  return {
    map: jest.fn(() => mapMock),
    tileLayer: jest.fn(() => ({ addTo: jest.fn().mockReturnThis() })),
    icon: jest.fn(() => ({})),
    marker: jest.fn(() => {
      const m = { addTo: jest.fn(() => m), getLatLng: jest.fn(() => ({ lat: 48.8566, lng: 2.3522 })) };
      return m;
    }),
    circle: jest.fn(() => {
      const c = { addTo: jest.fn(() => c) };
      return c;
    }),
    Marker: { prototype: { options: {} } }
  };
});

describe('AddressMapPicker.vue', () => {
  const mocks = {
    $t: (key) => key
  };

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders search input and button', () => {
    const wrapper = mount(AddressMapPicker, {
      props: { show: true },
      global: { mocks }
    });

    const searchInput = document.body.querySelector('.map-picker-search-input');
    const searchBtn = document.body.querySelector('.map-picker-search-btn');

    expect(searchInput).not.toBeNull();
    expect(searchBtn).not.toBeNull();
    wrapper.unmount();
  });

  it('searches location and moves map viewport without creating marker or changing selectedAddress', async () => {
    const mockResults = [
      {
        lat: "48.8566",
        lon: "2.3522",
        display_name: "Paris, France",
        boundingbox: ["48.8155755", "48.9021449", "2.224199", "2.4697602"]
      }
    ];

    jest.spyOn(AddressService, 'searchAddress').mockResolvedValue(mockResults);

    const wrapper = mount(AddressMapPicker, {
      props: { show: true },
      global: { mocks }
    });

    await wrapper.vm.initMap();

    wrapper.vm.searchQuery = 'Paris';
    await wrapper.vm.onSearchLocation();

    expect(AddressService.searchAddress).toHaveBeenCalledWith('Paris');
    expect(wrapper.vm.map.fitBounds).toHaveBeenCalledWith([
      [48.8155755, 2.224199],
      [48.9021449, 2.4697602]
    ]);
    expect(wrapper.vm.selectedAddress).toBeNull();
    wrapper.unmount();
  });

  it('clears selectedAddress and marker when pickedAddress becomes null', async () => {
    const initialAddress = {
      latitude: 48.8566,
      longitude: 2.3522,
      display_name: 'Paris, France'
    };

    jest.spyOn(AddressService, 'getAddressFromCoordinates').mockResolvedValue(initialAddress);

    const wrapper = mount(AddressMapPicker, {
      props: {
        show: true,
        pickedAddress: initialAddress
      },
      global: { mocks }
    });

    await wrapper.vm.initMap();
    await wrapper.vm.setUpSelectedAddress(initialAddress.latitude, initialAddress.longitude);

    expect(wrapper.vm.selectedAddress).not.toBeNull();
    expect(wrapper.vm.marker).not.toBeNull();

    await wrapper.setProps({ pickedAddress: null });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedAddress).toBeNull();
    expect(wrapper.vm.marker).toBeNull();
    expect(wrapper.vm.circle).toBeNull();
    wrapper.unmount();
  });
});
