import React from 'react';
import { Thermometer, ShieldAlert, Sun, Clock, Phone, MapPin, Building, Droplets, AlertCircle, ExternalLink } from 'lucide-react';
import { LocationScenario, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';
import { getHazardVisualTone } from '../utils/resilienceLogic';

interface HeatwaveSectionProps {
  location: LocationScenario;
  language: Language;
}

export const HeatwaveSection: React.FC<HeatwaveSectionProps> = ({
  location,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];
  const { heatwave } = location;
  const tone = getHazardVisualTone('heatwave', heatwave.statusLevel);

  return (
    <section
      id="heatwave-section"
      aria-labelledby="heatwave-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#b45309] font-bold">
              {t.sectionHeatTag}
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">IMD & APSDMA Heat Action Framework</span>
          </div>
          <h2 id="heatwave-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            {t.heatTitle}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {t.heatSubtitle}
          </p>
        </div>

        {/* Status Tag (Uses Red ONLY for Severe, Warm Amber for Orange/Warning) */}
        <div className="flex items-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs font-semibold uppercase tracking-wider font-mono ${tone.badgeBg} ${tone.badgeText} ${tone.badgeBorder}`}
          >
            <Thermometer className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{heatwave.statusLevel}</span>
          </div>
        </div>
      </div>

      {/* Official Alert Status & Prototype Disclosure */}
      <div className="my-4 p-3.5 bg-[#fffbeb] border-l-4 border-[#d97706] border-y border-r border-[#fde68a] rounded-xs text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#92400e]">
              Official heatwave alert unavailable in this prototype. Check IMD for current warnings.
            </p>
            <p className="text-[#b45309] text-[11px] mt-0.5">
              The metrics shown below reflect baseline scenarios for community drill planning. Consult official IMD bulletins for life-safety decisions.
            </p>
          </div>
        </div>
        <a
          href="https://mausam.imd.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#b45309] hover:bg-[#92400e] text-white font-medium text-xs rounded-xs shrink-0 transition-colors shadow-xs"
        >
          <span>Check IMD Warnings</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Primary Key Metric Tiles (Warm Amber / Deep Navy Palette) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5">
        <div className="bg-[#fffbeb] border border-[#fde68a] p-4 rounded-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#92400e] font-semibold">
            {t.heatPeak} (Simulated)
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-mono text-[#78350f]">
              {heatwave.peakTempCelsius.toFixed(1)}°C
            </span>
            <span className="text-xs text-[#92400e]">
              ({((heatwave.peakTempCelsius * 9) / 5 + 32).toFixed(1)}°F)
            </span>
          </div>
          <p className="text-[11px] text-[#92400e] mt-1.5 leading-snug">
            Peak daytime thermal load between 12:30 PM and 03:45 PM IST.
          </p>
        </div>

        <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#475569] font-semibold">
            {t.heatNight}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-mono text-[#0f172a]">
              {heatwave.nighttimeMinCelsius.toFixed(1)}°C
            </span>
            <span className="text-xs text-[#64748b]">
              ({((heatwave.nighttimeMinCelsius * 9) / 5 + 32).toFixed(1)}°F)
            </span>
          </div>
          <p className="text-[11px] text-[#64748b] mt-1.5 leading-snug">
            Elevated nocturnal baseline traps masonry heat in living rooms.
          </p>
        </div>

        <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#475569] font-semibold">
            {t.heatIndex}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-mono text-[#0f172a]">
              {heatwave.heatIndexCelsius.toFixed(1)}°C
            </span>
            <span className="text-xs text-[#64748b]">
              Thermal Stress Factor
            </span>
          </div>
          <p className="text-[11px] text-[#64748b] mt-1.5 leading-snug">
            Effective physiological heat sensation considering dry winds.
          </p>
        </div>
      </div>

      {/* Asymmetric Columns: Directives on Left (7 cols), Cooling Stations on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Vulnerable Group Advisory */}
          <div className="border-l-3 border-[#f59e0b] bg-[#fffdfa] p-4 rounded-xs border-y border-r border-[#fef3c7]">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-[#d97706]" aria-hidden="true" />
              <h3 className="text-xs uppercase font-mono font-bold tracking-wide text-[#92400e]">
                {t.vulnerableAdvisoryTitle}
              </h3>
            </div>
            <p className="text-xs text-[#78350f] leading-relaxed">
              {heatwave.localContext[language]}
            </p>
          </div>

          {/* Household Directives */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#475569] mb-2.5 font-bold">
              {t.heatDirectivesTitle}
            </h3>
            <ul className="space-y-2 text-xs">
              {heatwave.primaryDirectives[language].map((dir, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xs hover:border-[#cbd5e1] transition-colors"
                >
                  <span className="font-mono text-xs font-bold text-[#b45309] bg-[#fef3c7] w-5 h-5 flex items-center justify-center rounded-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-[#1e293b] leading-relaxed">{dir}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Historical Baseline Reference */}
          <div className="p-3.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-xs text-xs text-[#334155]">
            <div className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#0f766e] mb-1">
              {t.historicalHeatTitle}: {heatwave.historicalComparison.year}
            </div>
            <p className="text-[11px] leading-relaxed">
              <strong className="text-[#0f172a]">{heatwave.historicalComparison.event}</strong> — {heatwave.historicalComparison.difference}
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Designated Cooling Hubs & Chalivendras */}
        <div className="lg:col-span-5 bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#e2e8f0]">
            <Building className="w-4 h-4 text-[#0f766e]" aria-hidden="true" />
            <div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wide text-[#0f172a]">
                {t.coolingHubsTitle}
              </h3>
              <p className="text-[11px] text-[#64748b]">
                {t.coolingHubsDesc}
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-3">
            {heatwave.coolingHubs.map((hub, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#cbd5e1] p-3 rounded-xs text-xs space-y-1.5 hover:border-[#0f766e] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-[#0f172a] text-xs leading-snug">
                    {hub.name}
                  </h4>
                  <span className="text-[10px] font-mono bg-[#f1f5f9] text-[#475569] px-1.5 py-0.5 rounded-xs shrink-0">
                    {hub.distance}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#64748b]">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#94a3b8]" aria-hidden="true" />
                  <span>{hub.address} ({hub.mandalWard})</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#64748b]">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-[#94a3b8]" aria-hidden="true" />
                  <span>{hub.hours}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-[#f1f5f9] text-[10px] font-mono">
                  {hub.airConditioned && (
                    <span className="inline-flex items-center gap-1 text-[#0f766e] bg-[#f0fdfa] px-1.5 py-0.5 rounded-xs border border-[#ccfbf1]">
                      <Sun className="w-2.5 h-2.5" /> Air-Cooled
                    </span>
                  )}
                  {hub.waterRefill && (
                    <span className="inline-flex items-center gap-1 text-[#2563eb] bg-[#eff6ff] px-1.5 py-0.5 rounded-xs border border-[#dbeafe]">
                      <Droplets className="w-2.5 h-2.5" /> Chalivendra (Water & Majjiga)
                    </span>
                  )}
                  <a
                    href={`tel:${hub.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-1 text-[#475569] hover:text-[#0f172a] ml-auto font-medium"
                    title={`Call ${hub.name}`}
                  >
                    <Phone className="w-2.5 h-2.5" /> {hub.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
