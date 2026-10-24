import { LiveWeatherData, CurrentWeather, HourlyForecastItem, DailyForecastItem } from '../types';

export function getWmoWeatherDescription(code: number): { text: string; icon: string } {
  switch (code) {
    case 0:
      return { text: 'Clear Sky / Sunny', icon: 'sun' };
    case 1:
      return { text: 'Mainly Clear', icon: 'sun' };
    case 2:
      return { text: 'Partly Cloudy', icon: 'cloud-sun' };
    case 3:
      return { text: 'Overcast', icon: 'cloud' };
    case 45:
    case 48:
      return { text: 'Fog / Thermal Haze', icon: 'haze' };
    case 51:
    case 53:
    case 55:
      return { text: 'Light Drizzle', icon: 'cloud-drizzle' };
    case 61:
    case 63:
    case 65:
      return { text: 'Monsoon Rain', icon: 'cloud-rain' };
    case 80:
    case 81:
    case 82:
      return { text: 'Heavy Convective Showers', icon: 'cloud-heavy-rain' };
    case 95:
    case 96:
    case 99:
      return { text: 'Severe Thunderstorm', icon: 'cloud-lightning' };
    default:
      return { text: 'Fair Weather', icon: 'sun' };
  }
}

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string; // State
  country: string;
  country_code: string;
}

/**
 * Searches for Indian cities, towns, and districts using Open-Meteo Geocoding API.
 * Free, public, no API key required.
 */
export async function searchIndianLocations(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=8&language=en&format=json`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geocoding HTTP error ${res.status}`);
    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    // Sort to prioritize India (IN)
    const sorted = [...data.results].sort((a, b) => {
      const aIsIndia = a.country_code === 'IN' ? 1 : 0;
      const bIsIndia = b.country_code === 'IN' ? 1 : 0;
      return bIsIndia - aIsIndia;
    });

    return sorted;
  } catch (err) {
    console.warn('Geocoding search failed, returning empty fallback:', err);
    return [];
  }
}

/**
 * Fetches real weather observations and forecasts from Open-Meteo.
 * Includes local storage caching with fallback for offline/interrupted scenarios.
 */
export async function fetchLiveWeatherData(
  latitude: number,
  longitude: number
): Promise<LiveWeatherData> {
  const cacheKey = `climateready_weather_${latitude.toFixed(2)}_${longitude.toFixed(2)}`;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code&timezone=auto&forecast_days=7`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Open-Meteo API responded with HTTP status ${res.status}`);
    }

    const data = await res.json();

    // Map current conditions
    const currentCode = data.current?.weather_code ?? 0;
    const cond = getWmoWeatherDescription(currentCode);

    const current: CurrentWeather = {
      temperature: data.current?.temperature_2m ?? 0,
      apparentTemperature: data.current?.apparent_temperature ?? data.current?.temperature_2m ?? 0,
      relativeHumidity: data.current?.relative_humidity_2m ?? 0,
      windSpeed: data.current?.wind_speed_10m ?? 0,
      precipitation: data.current?.precipitation ?? 0,
      weatherCode: currentCode,
      conditionText: cond.text,
      isDay: true,
      time: data.current?.time ?? new Date().toISOString(),
    };

    // Map hourly forecast (next 24 entries)
    const hourlyTimes: string[] = data.hourly?.time || [];
    const hourlyTemps: number[] = data.hourly?.temperature_2m || [];
    const hourlyPrecipProbs: number[] = data.hourly?.precipitation_probability || [];
    const hourlyCodes: number[] = data.hourly?.weather_code || [];

    const hourly: HourlyForecastItem[] = [];
    const limitHourly = Math.min(hourlyTimes.length, 24);
    for (let i = 0; i < limitHourly; i++) {
      hourly.push({
        time: hourlyTimes[i],
        temperature: hourlyTemps[i] ?? 0,
        precipitationProbability: hourlyPrecipProbs[i] ?? 0,
        weatherCode: hourlyCodes[i] ?? 0,
      });
    }

    // Map daily forecast (7 days)
    const dailyDates: string[] = data.daily?.time || [];
    const dailyMax: number[] = data.daily?.temperature_2m_max || [];
    const dailyMin: number[] = data.daily?.temperature_2m_min || [];
    const dailyPrecipSum: number[] = data.daily?.precipitation_sum || [];
    const dailyPrecipProbMax: number[] = data.daily?.precipitation_probability_max || [];
    const dailyCodes: number[] = data.daily?.weather_code || [];

    const daily: DailyForecastItem[] = [];
    for (let i = 0; i < dailyDates.length; i++) {
      daily.push({
        date: dailyDates[i],
        tempMax: dailyMax[i] ?? 0,
        tempMin: dailyMin[i] ?? 0,
        precipitationSum: dailyPrecipSum[i] ?? 0,
        precipitationProbabilityMax: dailyPrecipProbMax[i] ?? 0,
        weatherCode: dailyCodes[i] ?? 0,
      });
    }

    const nowFormatted = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });

    const result: LiveWeatherData = {
      current,
      hourly,
      daily,
      lastUpdated: `Live sync at ${nowFormatted}`,
      attribution: 'Open-Meteo High-Resolution Meteorological Model',
      isStale: false,
    };

    // Save to cache
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(cacheKey, JSON.stringify(result));
      }
    } catch {
      // Storage quota or error ignored
    }

    return result;
  } catch (error) {
    console.warn(`Weather live fetch failed for [${latitude}, ${longitude}], checking cache:`, error);

    // Try reading cache
    if (typeof window !== 'undefined' && window.localStorage) {
      const cached = window.localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as LiveWeatherData;
          parsed.isStale = true;
          parsed.lastUpdated = `${parsed.lastUpdated} (Cached / Stale Data)`;
          return parsed;
        } catch {
          // ignore corrupted cache
        }
      }
    }

    throw error;
  }
}
