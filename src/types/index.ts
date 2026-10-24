export type Language = 'en' | 'te' | 'hi';

export type HazardCategory = 'all' | 'heatwave' | 'flood';
export type UrgencyLevel = 'immediate' | '24hr' | 'seasonal';

export interface ChecklistItem {
  id: string;
  category: 'heatwave' | 'flood' | 'general';
  urgency: UrgencyLevel;
  title: Record<Language, string>;
  description: Record<Language, string>;
  isCompleted?: boolean;
  essentialNotes?: Record<Language, string>;
}

export interface CoolingHub {
  name: string;
  address: string;
  distance: string;
  hours: string;
  airConditioned: boolean;
  waterRefill: boolean;
  accessible: boolean;
  phone: string;
  mandalWard: string;
  lat?: number;
  lng?: number;
}

export interface ReliefSandbagDepot {
  name: string;
  location: string;
  status: 'Operational 24/7' | 'On Alert' | 'Emergency Stocking';
  collectionType: string;
  contact: string;
  mandalWard: string;
  lat?: number;
  lng?: number;
}

export interface RiverStation {
  stationName: string;
  watercourse: string;
  currentLevelMeters: number;
  warningLevelMeters: number;
  dangerLevelMeters: number;
  status: 'Normal' | 'Alert Level' | 'Warning Level' | 'Severe';
  trend: 'Rising slowly' | 'Steady' | 'Receding' | 'Peaked';
}

export interface MapZone {
  id: string;
  name: string;
  type: 'Heat Island Risk' | 'Flood Surcharge Zone' | 'Safe Evacuation Haven' | 'Critical Drainage Chokepoint';
  hazard: 'heatwave' | 'flood' | 'safe';
  riskLevel: 'Moderate' | 'High' | 'Severe' | 'Safe Haven';
  description: Record<Language, string>;
  coordinates: { x: number; y: number; r: number };
  lat?: number;
  lng?: number;
  shelterCapacity?: number;
  primaryMitigation: Record<Language, string>;
}

export interface CommunityGapMetric {
  category: string;
  targetPercent: number;
  syntheticPreparednessPercent: number;
  criticalGapDescription: Record<Language, string>;
  suggestedCivicIntervention: Record<Language, string>;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  conditionText: string;
  isDay: boolean;
  time: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
}

export interface DailyForecastItem {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  weatherCode: number;
}

export interface LiveWeatherData {
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  lastUpdated: string;
  attribution: string;
  isStale?: boolean;
}

export interface AlertItem {
  id: string;
  category: 'official' | 'weather' | 'risk_indicator' | 'preparedness';
  hazardType: 'heatwave' | 'heavy_rainfall' | 'flood' | 'general';
  title: Record<Language, string>;
  description: Record<Language, string>;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  issuedTime: string;
  validPeriod?: string;
  source: string;
  sourceUrl?: string;
  isVerifiedOfficial: boolean;
}

export interface LocationScenario {
  id: string;
  name: string;
  district: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  lastSimulatedSync: string;
  authoritativeSources: string[];
  scenarioType: 'Seasonal Demonstration' | 'Compound Hazard Drill' | 'Historical Analog' | 'User Detected Locality';
  
  // Heatwave details (Rayalaseema / AP context)
  heatwave: {
    statusLevel: 'Seasonal Baseline' | 'Yellow Heat Advisory' | 'Orange Heat Wave' | 'Red Severe Heat Wave';
    peakTempCelsius: number;
    nighttimeMinCelsius: number;
    heatIndexCelsius: number;
    thresholdExceeded: boolean;
    localContext: Record<Language, string>;
    primaryDirectives: Record<Language, string[]>;
    coolingHubs: CoolingHub[];
    historicalComparison: {
      year: number;
      event: string;
      difference: string;
    };
  };

  // Flood details (Swarnamukhi / Penna / Urban Runoff context)
  flood: {
    statusLevel: 'No Active Warnings' | 'Inundation Watch' | 'Flood Warning' | 'Severe Inundation Alert';
    riverCatchment: string;
    riskSummary: Record<Language, string>;
    riverStations: RiverStation[];
    reliefDepots: ReliefSandbagDepot[];
    urbanDrainageNotice: Record<Language, string>;
    historicalComparison: {
      year: number;
      event: string;
      peakMeters: number;
    };
  };

  // Map demonstration zones
  mapZones: MapZone[];

  // Synthetic community resilience gap metrics
  communityGaps: CommunityGapMetric[];

  // Verified Indian Emergency Contacts (APSDMA / NDMA / District Disaster Control)
  contacts: {
    title: Record<Language, string>;
    agency: string;
    phone: string;
    hours: string;
  }[];
}
