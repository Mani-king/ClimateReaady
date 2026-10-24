import React, { useState } from 'react';
import { MapPin, Shield, AlertTriangle, Flame, Droplets, Info, CheckCircle2 } from 'lucide-react';
import { LocationScenario, MapZone, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface InteractiveCivicMapProps {
  location: LocationScenario;
  language: Language;
}

export const InteractiveCivicMap: React.FC<InteractiveCivicMapProps> = ({
  location,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];
  const [selectedZone, setSelectedZone] = useState<MapZone>(location.mapZones[0]);

  // Keep selected zone in sync when location changes
  React.useEffect(() => {
    setSelectedZone(location.mapZones[0]);
  }, [location]);

  return (
    <section
      id="map-section"
      aria-labelledby="map-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0f766e] font-bold">
              {t.sectionMapTag}
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">Ward-Level Geographic Risk Vectoring</span>
          </div>
          <h2 id="map-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            {t.mapTitle} — {location.name}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {t.mapSubtitle}
          </p>
        </div>

        {/* Simulated Demonstration Tag */}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#f8fafc] text-[#475569] border-[#cbd5e1]">
            <Info className="w-3.5 h-3.5 text-[#0f766e]" aria-hidden="true" />
            <span>Simulated Municipal Vector Visual</span>
          </span>
        </div>
      </div>

      {/* Map Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4 py-2 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xs text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-[#b45309]">
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-[#d97706]" />
            {t.mapLegendHeat}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#1d4ed8]">
            <span className="w-3 h-3 rounded-full bg-[#3b82f6] border border-[#2563eb]" />
            {t.mapLegendFlood}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#15803d]">
            <span className="w-3 h-3 rounded-full bg-[#22c55e] border border-[#16a34a]" />
            {t.mapLegendSafe}
          </span>
        </div>
        <div className="text-[11px] text-[#64748b]">
          {t.mapHint}
        </div>
      </div>

      {/* Grid: Interactive SVG Canvas on Left, Details Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b1329] p-4 rounded-xs border border-[#1e293b] relative overflow-hidden">
          {/* Municipal Coordinates Grid lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative aspect-[4/3] w-full">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full select-none"
              role="img"
              aria-label={`Interactive municipal map of ${location.name}`}
            >
              {/* Background schematic roads and contours */}
              <path
                d="M 10 30 Q 30 40 50 35 T 90 20"
                fill="none"
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <path
                d="M 20 85 Q 40 60 70 70 T 95 80"
                fill="none"
                stroke="#1e293b"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <path
                d="M 45 10 L 45 90"
                fill="none"
                stroke="#1e293b"
                strokeWidth="1"
              />
              <path
                d="M 10 50 L 90 50"
                fill="none"
                stroke="#1e293b"
                strokeWidth="1"
              />

              {/* River / Drainage Channel schematic trace */}
              <path
                d="M 5 20 Q 35 45 60 40 T 95 70"
                fill="none"
                stroke="#1e3a8a"
                strokeWidth="3.5"
                strokeOpacity="0.6"
              />

              {/* Clickable Zone Hubs */}
              {location.mapZones.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                let strokeColor = '#3b82f6';
                let fillColor = 'rgba(59, 130, 246, 0.25)';

                if (zone.hazard === 'heatwave') {
                  strokeColor = '#f59e0b';
                  fillColor = 'rgba(245, 158, 11, 0.25)';
                } else if (zone.hazard === 'safe') {
                  strokeColor = '#22c55e';
                  fillColor = 'rgba(34, 197, 94, 0.25)';
                }

                return (
                  <g
                    key={zone.id}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedZone(zone)}
                  >
                    {/* Zone perimeter circle */}
                    <circle
                      cx={zone.coordinates.x}
                      cy={zone.coordinates.y}
                      r={isSelected ? zone.coordinates.r + 3 : zone.coordinates.r}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? '2.5' : '1.2'}
                      strokeDasharray={isSelected ? 'none' : '3 1.5'}
                      className="transition-all duration-200"
                    />

                    {/* Zone Center Icon Pin */}
                    <circle
                      cx={zone.coordinates.x}
                      cy={zone.coordinates.y}
                      r="4"
                      fill={strokeColor}
                    />

                    {/* Zone Label */}
                    <text
                      x={zone.coordinates.x}
                      y={zone.coordinates.y - (zone.coordinates.r > 20 ? 8 : 6)}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize="3.2"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {zone.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Map Overlay Bar */}
            <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 bg-[#0f172a]/90 backdrop-blur-xs border border-[#1e293b] rounded-xs flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
              <span className="text-[#38bdf8]">
                Sector: {selectedZone ? selectedZone.name : 'Click a zone'}
              </span>
              <span>Datum: WGS84 AP Civic Grid</span>
            </div>
          </div>

          {/* Quick Zone Selector Buttons */}
          <div className="mt-3 pt-3 border-t border-[#1e293b] flex flex-wrap gap-1.5">
            {location.mapZones.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setSelectedZone(z)}
                className={`px-2.5 py-1 rounded-xs text-[11px] font-mono transition-colors cursor-pointer ${
                  selectedZone?.id === z.id
                    ? 'bg-[#38bdf8] text-[#0f172a] font-bold'
                    : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#334155] hover:text-white'
                }`}
              >
                {z.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Zone Inspection Panel (5 cols) */}
        <div className="lg:col-span-5 bg-[#f8fafc] border border-[#cbd5e1] p-4 sm:p-5 rounded-xs space-y-4">
          <div className="pb-3 border-b border-[#e2e8f0]">
            <div className="flex items-center justify-between gap-2 mb-1 font-mono text-[11px]">
              <span className="uppercase text-[#64748b]">
                {t.selectedZoneTitle}
              </span>
              <span
                className={`px-2 py-0.5 rounded-xs font-semibold ${
                  selectedZone.riskLevel === 'Severe'
                    ? 'bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]'
                    : selectedZone.riskLevel === 'High'
                    ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                    : selectedZone.riskLevel === 'Safe Haven'
                    ? 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
                    : 'bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]'
                }`}
              >
                {selectedZone.riskLevel}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0f172a]">
              {selectedZone.name}
            </h3>
            <div className="text-xs font-mono text-[#0f766e] mt-0.5">
              Vector Category: {selectedZone.type}
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-[#334155] leading-relaxed bg-white p-3 rounded-xs border border-[#e2e8f0]">
            {selectedZone.description[language]}
          </div>

          {/* Capacity or Critical Flag */}
          {selectedZone.shelterCapacity && (
            <div className="p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xs text-xs text-[#166534] flex items-center justify-between font-mono">
              <span>Evacuation Capacity:</span>
              <span className="font-bold text-sm">{selectedZone.shelterCapacity.toLocaleString()} Citizens</span>
            </div>
          )}

          {/* Primary Mitigation Action */}
          <div className="p-3 bg-white border border-[#e2e8f0] rounded-xs text-xs space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] font-semibold">
              Municipal Disaster Contingency
            </div>
            <p className="text-[#0f172a] font-medium leading-relaxed">
              {selectedZone.primaryMitigation[language]}
            </p>
          </div>

          <div className="text-[10px] text-[#64748b] font-mono pt-1">
            * All sector risk levels represent simulated contingency models for civil defence drills.
          </div>
        </div>
      </div>
    </section>
  );
};
