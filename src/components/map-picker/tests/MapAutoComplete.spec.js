import { mount } from '@vue/test-utils';
import MapAutoComplete from '../MapAutoComplete.vue';
import AutoComplete from '@/components/input/AutoComplete.vue';
import AddressMapPicker from '../AddressMapPicker.vue';
import AddressService from '@/services/AddressService';

// Mock Leaflet
jest.mock('leaflet/dist/leaflet.css', () => ({}), { virtual: true });
jest.mock('leaflet/dist/images/marker-icon.png', () => 'marker-icon.png', { virtual: true });
jest.mock('leaflet/dist/images/marker-shadow.png', () => 'marker-shadow.png', { virtual: true });
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

describe('MapAutoComplete.vue', () => {
  const mocks = {
    $t: (key) => key
  };

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('sets internalSelectedAddress when an option is selected', async () => {
    const wrapper = mount(MapAutoComplete, {
      props: {
        label: 'Address'
      },
      global: { mocks }
    });

    const selectedOption = {
      display_name: '10 Rue de Paris, 75001 Paris, France',
      lat: '48.8566',
      lon: '2.3522',
      address: {
        road: 'Rue de Paris',
        postcode: '75001',
        city: 'Paris'
      }
    };

    wrapper.vm.onAddressSelected(selectedOption);
    expect(wrapper.vm.internalSelectedAddress).toBeDefined();
    expect(wrapper.vm.internalSelectedAddress.latitude).toBe('48.8566');
    expect(wrapper.vm.internalSelectedAddress.longitude).toBe('2.3522');
    expect(wrapper.vm.internalSelectedAddress.city).toBe('Paris');

    wrapper.unmount();
  });

  it('clears internalSelectedAddress when the user changes the value of the input', async () => {
    const wrapper = mount(MapAutoComplete, {
      props: {
        label: 'Address'
      },
      global: { mocks }
    });

    // Simulate an address previously selected
    wrapper.vm.onAddressSelected({
      display_name: '10 Rue de Paris, 75001 Paris, France',
      lat: '48.8566',
      lon: '2.3522',
      address: {
        road: 'Rue de Paris',
        postcode: '75001',
        city: 'Paris'
      }
    });

    expect(wrapper.vm.internalSelectedAddress).toBeDefined();

    // User types / changes the input in AutoComplete
    const autoComplete = wrapper.findComponent(AutoComplete);
    const input = autoComplete.find('input');
    await input.setValue('New street');

    // internalSelectedAddress should be cleared
    expect(wrapper.vm.internalSelectedAddress).toBeUndefined();

    // When opening map picker, pickedAddress passed to AddressMapPicker should be undefined
    wrapper.vm.openMapPicker();
    await wrapper.vm.$nextTick();

    const mapPicker = wrapper.findComponent(AddressMapPicker);
    expect(mapPicker.exists()).toBe(true);
    expect(mapPicker.props('pickedAddress')).toBeFalsy();
    expect(mapPicker.vm.selectedAddress).toBeNull();

    wrapper.unmount();
  });

  it('clears internalSelectedAddress when defaultSelectedAddress is reset to null', async () => {
    const wrapper = mount(MapAutoComplete, {
      props: {
        label: 'Address',
        defaultSelectedAddress: { latitude: 48.8566, longitude: 2.3522 }
      },
      global: { mocks }
    });

    wrapper.vm.internalSelectedAddress = {
      latitude: 48.8566,
      longitude: 2.3522,
      fulladdress: 'Paris'
    };

    await wrapper.setProps({ defaultSelectedAddress: null });
    expect(wrapper.vm.internalSelectedAddress).toBeUndefined();

    wrapper.unmount();
  });

  it('fetches and displays suggestions when changing input value even if defaultSelectedAddress was defined', async () => {
    const defaultAddress = {
      display_name: 'Adrar, Algeria',
      latitude: 28.0339,
      longitude: 1.6596,
      address: { city: 'Adrar', country: 'Algeria' }
    };

    const searchResults = [
      {
        display_name: '10, Rue de Paris, 75001 Paris, France',
        lat: '48.8566',
        lon: '2.3522',
        address: { road: 'Rue de Paris', postcode: '75001', city: 'Paris' }
      }
    ];

    jest.spyOn(AddressService, 'getAddressFromCoordinates').mockResolvedValue(defaultAddress);
    jest.spyOn(AddressService, 'searchAddress').mockResolvedValue(searchResults);

    const wrapper = mount(MapAutoComplete, {
      props: {
        label: 'Address',
        modelValue: '',
        defaultSelectedAddress: { latitude: 28.0339, longitude: 1.6596 }
      },
      global: { mocks }
    });

    // Wait for created hook handleDefaultAddress
    await wrapper.vm.handleDefaultAddress();
    expect(wrapper.vm.internalSelectedAddress).toBeDefined();

    // User changes input value
    const autoComplete = wrapper.findComponent(AutoComplete);
    const input = autoComplete.find('input');
    await input.setValue('10 rue de paris');

    // Trigger address search directly or via debounced function
    wrapper.vm.onAddressSearch('10 rue de paris');
    await new Promise(resolve => setTimeout(resolve, 600));
    await wrapper.vm.$nextTick();

    expect(AddressService.searchAddress).toHaveBeenCalledWith('10 rue de paris');
    expect(wrapper.vm.addressSuggestions.length).toBe(1);

    const options = autoComplete.findAll('.gts-listbox-option');
    expect(options.length).toBe(1);
    expect(options.at(0).text()).toContain('10, Rue de Paris');

    wrapper.unmount();
  });
});
