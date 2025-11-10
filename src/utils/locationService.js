/**
 * Location Service
 * Handles geolocation and reverse geocoding
 */

/**
 * Get user's current location using browser geolocation API
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
            break;
        }
        reject(new Error(errorMessage));
      },
      options
    );
  });
};

/**
 * Reverse geocode coordinates to get address
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<string>} Formatted address
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    // Using OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'PakAir-App/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }

    const data = await response.json();
    
    if (data.address) {
      const parts = [];
      if (data.address.city || data.address.town || data.address.village) {
        parts.push(data.address.city || data.address.town || data.address.village);
      }
      if (data.address.state || data.address.province) {
        parts.push(data.address.state || data.address.province);
      }
      if (data.address.country) {
        parts.push(data.address.country);
      }
      return parts.length > 0 ? parts.join(', ') : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }

    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    // Fallback to coordinates
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  }
};

/**
 * Get location with address
 * @returns {Promise<{latitude: number, longitude: number, address: string}>}
 */
export const getLocationWithAddress = async () => {
  try {
    const location = await getCurrentLocation();
    const address = await reverseGeocode(location.latitude, location.longitude);
    return {
      ...location,
      address,
    };
  } catch (error) {
    throw error;
  }
};

export default {
  getCurrentLocation,
  reverseGeocode,
  getLocationWithAddress,
};

