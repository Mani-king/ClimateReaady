import React, { useState } from 'react';
import {
  Shield,
  MapPin,
  Globe,
  Printer,
  Navigation,
  Search,
  X,
  RotateCw,
  Check,
  AlertCircle,
} from 'lucide-react';
import { CIVIC_LOCATIONS } from '../data/civicData';
import { LocationScenario, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';
import { requestCurrentPosition, reverseGeocodeCoordinates } from '../services/locationService';
import { searchIndianLocations, GeocodingResult } from '../services/weatherService';

interface HeaderProps {
  selectedLocation: LocationScenario;
  onSelectLocation: (location: LocationScenario) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onPrint: () => void;
  onLocationDetected?: (coords: { lat: number; lng: number; name: string }) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLocation,
  onSelectLocation,
  language,
  onSelectLanguage,
  onPrint,
  onLocationDetected,
}) => {
  const t = UI_TRANSLATIONS[language];
  const [isLocating, setIsLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleDetectLocation = async () => {
    setIsLocating(true);
    setLocationNotice(null);

    try {
      const coords = await requestCurrentPosition();
      const locality = await reverseGeocodeCoordinates(coords.latitude, coords.longitude);

      // Construct a new LocationScenario based on detected coordinates
      const detectedScenario: LocationScenario = {
        id: `custom-${coords.latitude.toFixed(2)}-${coords.longitude.toFixed(2)}`,
        name: locality.name,
        district: locality.district || locality.name,
        state: locality.state || 'Andhra Pradesh',
        country: locality.country,
        latitude: coords.latitude,
        longitude: coords.longitude,
        lastSimulatedSync: `Detected via Browser GPS at ${new Date().toLocaleTimeString('en-IN')}`,
        authoritativeSources: [
          'Open-Meteo High-Resolution Atmospheric Model',
          'IMD National Early Warning Framework',
          'APSDMA Disaster Contingency Guidelines',
        ],
        scenarioType: 'User Detected Locality',
        heatwave: {
          ...selectedLocation.heatwave,
          localContext: {
            en: `Live monitoring active for ${locality.name}. Review IMD bulletins for current heatwave threshold updates.`,
            te: `${locality.name} కొరకు ప్రత్యక్ష పర్యవేక్షణ చురుకుగా ఉంది. హీట్ వేవ్ సమాచారం కోసం IMD బులెటిన్లను చూడండి.`,
            hi: `${locality.name} के लिए निगरानी सक्रिय। वर्तमान लू की स्थिति के लिए IMD बुलेटिन देखें।`,
          },
        },
        flood: {
          ...selectedLocation.flood,
          riskSummary: {
            en: `Catchment observation active for ${locality.name}. Check Central Water Commission FloodWatch for localized river basin statuses.`,
            te: `${locality.name} పరీవాహక ప్రాంత పర్యవేక్షణ. స్థానిక నదీ స్థాయిల కోసం CWC ఫ్లడ్‌వాచ్ బులెటిన్లను చూడండి.`,
            hi: `${locality.name} के लिए जलभराव निगरानी। नदी जलस्तर के लिए CWC फ्लडवॉच बुलेटिन देखें।`,
          },
        },
        mapZones: selectedLocation.mapZones,
        communityGaps: selectedLocation.communityGaps,
        contacts: selectedLocation.contacts,
      };

      onSelectLocation(detectedScenario);
      if (onLocationDetected) {
        onLocationDetected({ lat: coords.latitude, lng: coords.longitude, name: locality.name });
      }
      setLocationNotice(`Detected: ${locality.formattedAddress}`);
      setTimeout(() => setLocationNotice(null), 5000);
    } catch (err: any) {
      console.warn('Geolocation detection error:', err);
      setLocationNotice(err.message || 'Location access unavailable. Using manual selection.');
      setTimeout(() => setLocationNotice(null), 6000);
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchIndianLocations(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.warn('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (geo: GeocodingResult) => {
    const customScenario: LocationScenario = {
      id: `searched-${geo.id}`,
      name: geo.name,
      district: geo.admin1 || geo.name,
      state: geo.admin1 || 'India',
      country: geo.country,
      latitude: geo.latitude,
      longitude: geo.longitude,
      lastSimulatedSync: `Synced for ${geo.name} at ${new Date().toLocaleTimeString('en-IN')}`,
      authoritativeSources: [
        'Open-Meteo High-Resolution Atmospheric Model',
        'IMD National Early Warning Framework',
      ],
      scenarioType: 'User Detected Locality',
      heatwave: {
        ...selectedLocation.heatwave,
        localContext: {
          en: `Atmospheric monitoring calibrated for ${geo.name}, ${geo.admin1 || ''}. Check IMD for formal alerts.`,
          te: `${geo.name} కొరకు వాతావరణ పర్యవేక్షణ. అధికారిక అలర్ట్స్ కొరకు IMD చూడండి.`,
          hi: `${geo.name} के लिए मौसम निगरानी। औपचारिक अलर्ट के लिए IMD देखें।`,
        },
      },
      flood: {
        ...selectedLocation.flood,
        riskSummary: {
          en: `Catchment observation active for ${geo.name}. Reference CWC FloodWatch for basin status.`,
          te: `${geo.name} కొరకు పరీవాహక నిఘా. నదీ సమాచారం కోసం CWC చూడండి.`,
          hi: `${geo.name} के लिए जलभराव निगरानी। नदी जलस्तर के लिए CWC देखें।`,
        },
      },
      mapZones: selectedLocation.mapZones,
      communityGaps: selectedLocation.communityGaps,
      contacts: selectedLocation.contacts,
    };

    onSelectLocation(customScenario);
    setShowSearchModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] text-[#f8fafc] border-b border-[#1e293b] shadow-sm">
      {/* Top statutory compliance strip */}
      <div className="bg-[#0b1329] px-3 sm:px-6 py-1 text-[11px] font-mono tracking-tight flex items-center justify-between gap-2 border-b border-[#1e293b]/70">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] shrink-0" aria-hidden="true" />
          <span className="font-semibold tracking-wider uppercase text-[#10b981] truncate">
            {t.officialBadge}
          </span>
          <span className="text-[#475569] hidden sm:inline">|</span>
          <span className="text-[#94a3b8] hidden md:inline">
            Know your risk. Prepare before it happens.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#94a3b8] shrink-0 text-[10px]">
          <span className="hidden lg:inline">{selectedLocation.lastSimulatedSync}</span>
          <span className="bg-[#1e293b] px-2 py-0.5 rounded-xs text-[#38bdf8] border border-[#334155] font-mono">
            {selectedLocation.scenarioType}
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity & Tagline */}
        <div className="flex items-baseline gap-2.5">
          <a href="#" className="flex items-baseline gap-1.5 focus:outline-none group">
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-white font-sans group-hover:text-[#38bdf8] transition-colors">
              ClimateReady
            </span>
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] mb-1 inline-block" title="Climate Preparedness Platform" />
          </a>
          <span className="text-[11px] uppercase tracking-wider font-mono text-[#94a3b8] hidden md:inline border-l border-[#334155] pl-2.5">
            Know your risk. Prepare before it happens.
          </span>
        </div>

        {/* Central Controls: Detect GPS, Search, Location Select, Language, Print */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
          {/* Automatic Geolocation Trigger Button */}
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isLocating}
            title="Detect my current location using browser GPS (requires permission)"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#38bdf8] border border-[#38bdf8]/40 rounded-xs text-xs font-mono transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'Detect Location'}</span>
          </button>

          {/* Search Indian City Modal Button */}
          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            aria-label="Search Indian city or district"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-[#94a3b8] hover:text-white border border-[#334155] rounded-xs text-xs transition-colors cursor-pointer"
            title="Search any Indian town or district"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] font-mono">Search India</span>
          </button>

          {/* Location Selector Dropdown */}
          <div className="flex-1 sm:flex-initial flex items-center gap-1 bg-[#1e293b] border border-[#334155] rounded-xs px-2.5 py-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#10b981] shrink-0" aria-hidden="true" />
            <label htmlFor="district-select" className="sr-only">
              {t.locationSelectorLabel}
            </label>
            <select
              id="district-select"
              aria-label={t.locationSelectorLabel}
              value={selectedLocation.id}
              onChange={(e) => {
                const found = CIVIC_LOCATIONS.find((loc) => loc.id === e.target.value);
                if (found) onSelectLocation(found);
              }}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              {CIVIC_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-[#0f172a] text-white">
                  {loc.name} ({loc.state})
                </option>
              ))}
              {selectedLocation.scenarioType === 'User Detected Locality' && (
                <option value={selectedLocation.id} className="bg-[#0f172a] text-white">
                  📍 {selectedLocation.name} ({selectedLocation.state})
                </option>
              )}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-[#1e293b] border border-[#334155] rounded-xs px-2 py-1.5 text-xs shrink-0">
            <Globe className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" aria-hidden="true" />
            <label htmlFor="language-select" className="sr-only">
              {t.languageSelectorLabel}
            </label>
            <select
              id="language-select"
              aria-label={t.languageSelectorLabel}
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as Language)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-[#0f172a] text-white">English (EN)</option>
              <option value="te" className="bg-[#0f172a] text-white">తెలుగు (TE)</option>
              <option value="hi" className="bg-[#0f172a] text-white">हिन्दी (HI)</option>
            </select>
          </div>

          {/* Print Plan */}
          <button
            type="button"
            onClick={onPrint}
            aria-label={t.printPlan}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#133e2b] hover:bg-[#1a4d36] text-[#6ee7b7] border border-[#10b981]/40 text-xs font-medium rounded-xs transition-colors shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#6ee7b7]" aria-hidden="true" />
            <span className="hidden sm:inline">{t.printPlan}</span>
          </button>
        </div>
      </div>

      {/* Geolocation Feedback Toast / Notification */}
      {locationNotice && (
        <div className="bg-[#0b1329] border-y border-[#1e293b] px-4 py-1.5 text-xs font-mono text-[#38bdf8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-[#10b981]" />
            <span>{locationNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setLocationNotice(null)}
            className="text-[#94a3b8] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav aria-label="Section Navigation" className="border-t border-[#1e293b] bg-[#0c1427] px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-5 overflow-x-auto py-2 text-xs font-medium text-[#94a3b8] scrollbar-none">
          <a
            href="#overview"
            className="hover:text-white hover:underline underline-offset-4 whitespace-nowrap text-[#38bdf8] font-semibold"
          >
            {t.navOverview}
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#weather-heading"
            className="hover:text-[#38bdf8] hover:underline underline-offset-4 whitespace-nowrap"
          >
            Live Weather
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#alerts-section"
            className="hover:text-[#f43f5e] hover:underline underline-offset-4 whitespace-nowrap"
          >
            Alert Centre
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#heatwave-section"
            className="hover:text-[#f59e0b] hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t.navHeat}
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#flood-section"
            className="hover:text-[#60a5fa] hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t.navFlood}
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#map-section"
            className="hover:text-[#34d399] hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t.navMap}
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#checklist-section"
            className="hover:text-white hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t.navChecklist}
          </a>
          <span className="text-[#334155] select-none">•</span>
          <a
            href="#sources-section"
            className="hover:text-white hover:underline underline-offset-4 whitespace-nowrap"
          >
            {t.navSources}
          </a>
        </div>
      </nav>

      {/* Search Modal for any Indian Locality */}
      {showSearchModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-[#0f172a] border border-[#334155] w-full max-w-lg rounded-sm shadow-2xl p-5 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="font-bold text-sm">Search Any Indian Locality or District</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="text-[#94a3b8] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mt-4 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Vijayawada, Kurnool, Visakhapatnam, Kadapa..."
                className="flex-1 bg-[#1e293b] border border-[#334155] text-xs px-3 py-2 text-white placeholder:text-[#64748b] rounded-xs focus:outline-none focus:border-[#38bdf8]"
                autoFocus
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-3 py-2 bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-mono rounded-xs transition-colors cursor-pointer"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </form>

            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {searchResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleSelectSearchResult(res)}
                  className="p-2.5 bg-[#1e293b] hover:bg-[#334155] rounded-xs cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <span className="font-bold text-white">{res.name}</span>
                    <span className="text-[#94a3b8] text-[11px] ml-2 font-mono">
                      {res.admin1 ? `${res.admin1}, ` : ''}{res.country}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#38bdf8]">
                    {res.latitude.toFixed(2)}°N, {res.longitude.toFixed(2)}°E
                  </span>
                </div>
              ))}
              {searchResults.length === 0 && !isSearching && searchQuery.trim() && (
                <p className="text-xs text-[#94a3b8] text-center py-4">
                  No matching localities found. Try another city or district name.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
