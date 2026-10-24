export interface UserCoordinates {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
}

export interface GeocodedLocality {
  name: string;
  district?: string;
  state?: string;
  country: string;
  formattedAddress: string;
}

/**
 * Reverse geocodes coordinates to a human-readable Indian locality.
 * Uses public Open-Meteo reverse geocoding or BigDataCloud client-side API.
 */
export async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number
): Promise<GeocodedLocality> {
  try {
    // BigDataCloud client-side reverse geocoding (free, requires no API key, very accurate for India)
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const city = data.locality || data.city || data.principalSubdivision || 'Detected Locality';
      const district = data.localityInfo?.administrative?.[2]?.name || data.principalSubdivision || '';
      const state = data.principalSubdivision || 'Andhra Pradesh';
      const country = data.countryName || 'India';

      return {
        name: city,
        district: district || city,
        state: state,
        country: country,
        formattedAddress: `${city}, ${state}`,
      };
    }
  } catch (err) {
    console.warn('Reverse geocoding error:', err);
  }

  // Graceful fallback coordinate string
  return {
    name: `Locality (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`,
    district: 'Custom Location',
    state: 'India',
    country: 'India',
    formattedAddress: `${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E`,
  };
}

/**
 * Requests browser geolocation with user consent.
 */
export function requestCurrentPosition(): Promise<UserCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracyMeters: position.coords.accuracy,
        });
      },
      (error) => {
        let msg = 'Failed to retrieve location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location permission was declined. Using default location.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'GPS/network location information is currently unavailable.';
            break;
          case error.TIMEOUT:
            msg = 'The request to obtain your location timed out.';
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 600000, // 10 minutes cache
      }
    );
  });
}
