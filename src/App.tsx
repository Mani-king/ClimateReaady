import React, { useState, useEffect } from 'react';
import { CIVIC_LOCATIONS, INITIAL_ALERTS } from './data/civicData';
import { LocationScenario, Language, LiveWeatherData, AlertItem } from './types';
import { Header } from './components/Header';
import { OfficialDataStatusBar } from './components/OfficialDataStatusBar';
import { LiveWeatherDashboard } from './components/LiveWeatherDashboard';
import { AlertCentre } from './components/AlertCentre';
import { LeafletRiskMap } from './components/LeafletRiskMap';
import { InteractiveCivicMap } from './components/InteractiveCivicMap';
import { HeatwaveSection } from './components/HeatwaveSection';
import { FloodSection } from './components/FloodSection';
import { HouseholdChecklist } from './components/HouseholdChecklist';
import { CommunityResilienceGaps } from './components/CommunityResilienceGaps';
import { RecommendedActions } from './components/RecommendedActions';
import { OfficialSourcesList } from './components/OfficialSourcesList';
import { PrintModal } from './components/PrintModal';
import { Footer } from './components/Footer';
import { fetchLiveWeatherData } from './services/weatherService';
import { MapPin, Layers } from 'lucide-react';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationScenario>(CIVIC_LOCATIONS[0]);
  const [language, setLanguage] = useState<Language>('en');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  
  // Map View Mode: Leaflet OpenStreetMap vs Municipal Ward Matrix
  const [mapMode, setMapMode] = useState<'leaflet' | 'vector'>('leaflet');

  // Live Weather State via Open-Meteo
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Alerts State (Default 4-tier civic alerts)
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const loadWeather = async (lat: number, lng: number) => {
    setIsWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await fetchLiveWeatherData(lat, lng);
      setLiveWeather(data);

      // If live temperature exceeds 39°C or rain exceeds 15mm, add a live observation alert
      if (data.current.temperature >= 39) {
        const liveHeatAlert: AlertItem = {
          id: `live-heat-${Date.now()}`,
          category: 'weather',
          hazardType: 'heatwave',
          severity: 'high',
          title: {
            en: `Live Alert: High Thermal Influx (${data.current.temperature.toFixed(1)}°C) at ${selectedLocation.name}`,
            te: `ప్రత్యక్ష హెచ్చరిక: అధిక ఉష్ణోగ్రత (${data.current.temperature.toFixed(1)}°C) నమోదయింది`,
            hi: `लाइव चेतावनी: अत्यधिक तापमान (${data.current.temperature.toFixed(1)}°C) दर्ज किया गया`,
          },
          description: {
            en: `Current atmospheric observation confirms surface heat is exceeding statutory safety comfort limits. UV index and feels-like temperature indicate severe thermal stress.`,
            te: `వాతావరణ నివేదిక ప్రకారం ఎండ తీవ్రత ఎక్కువగా ఉంది. ఎండలో తిరగవద్దు.`,
            hi: `वर्तमान मौसम के अनुसार तापमान में वृद्धि हुई है। अत्यधिक धूप से बचें।`,
          },
          issuedTime: 'Real-time Open-Meteo Observation',
          validPeriod: 'Next 6 hours',
          source: 'Open-Meteo Weather Observation',
          sourceUrl: 'https://open-meteo.com',
          isVerifiedOfficial: false,
        };
        setAlerts((prev) => [liveHeatAlert, ...prev.filter((a) => !a.id.startsWith('live-heat-'))]);
      }
    } catch (err: any) {
      setWeatherError(err?.message || 'Unable to fetch real-time atmospheric data');
    } finally {
      setIsWeatherLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedLocation.latitude, selectedLocation.longitude);
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans selection:bg-[#0f766e] selection:text-white">
      {/* 1. Header with Location Search, Consent-based GPS Detect, Language Switch, Print */}
      <Header
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        language={language}
        onSelectLanguage={setLanguage}
        onPrint={() => setIsPrintModalOpen(true)}
      />

      {/* Main Civic Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* 1. Selected location status & authoritative data sources bar */}
        <OfficialDataStatusBar
          location={selectedLocation}
          language={language}
        />

        {/* 2. Live Weather Dashboard (Open-Meteo real observations, 24h hourly strip & 7-day outlook) */}
        <LiveWeatherDashboard
          weather={liveWeather}
          isLoading={isWeatherLoading}
          error={weatherError}
          onRefresh={() => loadWeather(selectedLocation.latitude, selectedLocation.longitude)}
          locationName={`${selectedLocation.name}, ${selectedLocation.district}`}
        />

        {/* 3. Central Alert Centre (4 categories: Official, Weather, Risk Indicators, Preparedness) */}
        <AlertCentre
          alerts={alerts}
          language={language}
        />

        {/* 4. Interactive Risk Explorer with Leaflet GIS Map + Ward Vector Grid Toggle */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-[#cbd5e1] rounded-xs shadow-2xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0f766e]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0f172a] font-mono uppercase tracking-wider">
                Risk Explorer Mode:
              </span>
              <span className="text-xs text-[#64748b]">
                {mapMode === 'leaflet'
                  ? 'Real Geographic OpenStreetMap & Municipal Relief Depots'
                  : 'Administrative Ward Risk Vectors & Vulnerability Matrix'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] rounded-xs self-start sm:self-auto border border-[#e2e8f0]">
              <button
                type="button"
                onClick={() => setMapMode('leaflet')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-xs transition-colors ${
                  mapMode === 'leaflet'
                    ? 'bg-[#0f766e] text-white shadow-2xs font-semibold'
                    : 'text-[#475569] hover:text-[#0f172a]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>GIS OpenStreetMap</span>
              </button>
              <button
                type="button"
                onClick={() => setMapMode('vector')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-xs transition-colors ${
                  mapMode === 'vector'
                    ? 'bg-[#0f766e] text-white shadow-2xs font-semibold'
                    : 'text-[#475569] hover:text-[#0f172a]'
                }`}
              >
                <span>Ward Matrix View</span>
              </button>
            </div>
          </div>

          {mapMode === 'leaflet' ? (
            <LeafletRiskMap
              location={selectedLocation}
              language={language}
            />
          ) : (
            <InteractiveCivicMap
              location={selectedLocation}
              language={language}
            />
          )}
        </div>

        {/* 5. Separate Hazard Sections: Heatwave and Flood with verified statutory disclosures */}
        <HeatwaveSection
          location={selectedLocation}
          language={language}
        />

        <FloodSection
          location={selectedLocation}
          language={language}
        />

        {/* 6. Prominent Household Preparedness Checklist with Score & 3 Highest-Priority Tasks */}
        <HouseholdChecklist
          language={language}
        />

        {/* 7. Community Resilience Gaps (Synthetic Aggregate Data) */}
        <CommunityResilienceGaps
          location={selectedLocation}
          language={language}
        />

        {/* 8. Actionable Preparedness Roadmap & Emergency Contacts */}
        <RecommendedActions
          location={selectedLocation}
          language={language}
        />

        {/* 9. Clearly Attributed Official Information Sources */}
        <OfficialSourcesList
          language={language}
        />
      </main>

      {/* Printable Emergency Household Action Plan Sheet */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        location={selectedLocation}
        language={language}
      />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
