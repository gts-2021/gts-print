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
    tileLayer: jest.fn(() => ({ addTo: jest.fn() })),
    icon: jest.fn(() => ({})),
    marker: jest.fn(() => ({ addTo: jest.fn() })),
    circle: jest.fn(() => ({ addTo: jest.fn() })),
    Marker: { prototype: { options: {} } }
  };
});

describe('AddressMapPicker.vue', () => {
  const mocks = {
    $t: (key) => key
  };

  it('renders search input and button', () => {
    const wrapper = mount(AddressMapPicker, {
      propsData: { show: true },
      global: { mocks },
      mocks
    });

    const searchInput = wrapper.find('.map-picker-search-input');
    const searchBtn = wrapper.find('.map-picker-search-btn');

    expect(searchInput.exists()).toBe(true);
    expect(searchBtn.exists()).toBe(true);
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
      propsData: { show: true },
      global: { mocks },
      mocks
    });

    const searchInput = wrapper.find('.map-picker-search-input');
    await searchInput.setValue('Paris');

    const searchBtn = wrapper.find('.map-picker-search-btn button');
    await searchBtn.trigger('click');

    expect(AddressService.searchAddress).toHaveBeenCalledWith('Paris');
    expect(wrapper.vm.map.fitBounds).toHaveBeenCalledWith([
      [48.8155755, 2.224199],
      [48.9021449, 2.4697602]
    ]);
    expect(wrapper.vm.selectedAddress).toBeNull();
  });
});
