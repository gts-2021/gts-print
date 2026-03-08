const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export default {
  /**
   * Search for an address using Nominatim API.
   * @param {string} query - The address to search for.
   * @returns {Promise<Array>} - List of suggestions.
   */
  async searchAddress(query) {
    if (!query || query.length < 3) return [];

    try {
      const params = new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 5,
      });

      const response = await fetch(
        `${NOMINATIM_BASE_URL}/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error searching address:", error);
      return [];
    }
  },

  /**
   * Get address details from coordinates (Reverse Geocoding).
   * @param {number} lat - Latitude.
   * @param {number} lon - Longitude.
   * @returns {Promise<Object>} - Address details.
   */
  async getAddressFromCoordinates(lat, lon) {
    try {
      const params = new URLSearchParams({
        lat: lat,
        lon: lon,
        format: "json",
        addressdetails: 1,
      });

      const response = await fetch(
        `${NOMINATIM_BASE_URL}/reverse?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting address from coordinates:", error);
      return null;
    }
  },

  async getCoordinatesFromAddress(address) {
    try {
      const params = new URLSearchParams({
        q: address,
        format: "json",
        limit: 1,
      });

      const response = await fetch(
        `${NOMINATIM_BASE_URL}/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }

      return null;
    } catch (error) {
      console.error("Error getting coordinates from address:", error);
      return null;
    }
  },
};