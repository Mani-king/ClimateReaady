import React from 'react';
import { Waves, AlertCircle, Droplets, ArrowUpRight, ArrowRight, ArrowDownRight, Package, MapPin, Phone, ExternalLink } from 'lucide-react';
import { LocationScenario, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';
import { getHazardVisualTone } from '../utils/resilienceLogic';

interface FloodSectionProps {
  location: LocationScenario;
  language: Language;
}

export const FloodSection: React.FC<FloodSectionProps> = ({
  location,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];
  const { flood } = location;
  const tone = getHazardVisualTone('flood', flood.statusLevel);

  return (
    <section
      id="flood-section"
      aria-labelledby="flood-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#2563eb] font-bold">
              {t.sectionFloodTag}
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">APSDMA & Central Water Commission Inundation Criteria</span>
          </div>
          <h2 id="flood-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            {t.floodTitle}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {t.floodSubtitle}
          </p>
        </div>

        {/* Status Tag */}
        <div className="flex items-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs font-semibold uppercase tracking-wider font-mono ${tone.badgeBg} ${tone.badgeText} ${tone.badgeBorder}`}
          >
            <Waves className="w-4 h-4 shrink-0 text-[#2563eb]" aria-hidden="true" />
            <span>{flood.statusLevel}</span>
          </div>
        </div>
      </div>

      {/* Official Alert Status & Prototype Disclosure */}
      <div className="my-4 p-3.5 bg-[#eff6ff] border-l-4 border-[#2563eb] border-y border-r border-[#bfdbfe] rounded-xs text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#1e40af]">
              Live flood warning feed unavailable in this prototype. Check CWC FloodWatch / APSDMA for active river basin alerts.
            </p>
            <p className="text-[#1d4ed8] text-[11px] mt-0.5">
              Hydrological gauge values below reflect baseline monsoon benchmarks. Use official CWC bulletins for emergency navigation.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="https://cwc.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium text-xs rounded-xs transition-colors shadow-xs"
          >
            <span>CWC FloodWatch</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://apsdma.ap.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f766e] hover:bg-[#115e59] text-white font-medium text-xs rounded-xs transition-colors shadow-xs"
          >
            <span>APSDMA Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Catchment & Risk Summary Notice */}
      <div className="my-5 p-4 bg-[#eff6ff] border-l-3 border-[#2563eb] border-y border-r border-[#bfdbfe] rounded-xs text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5 font-mono text-[11px]">
          <span className="font-bold text-[#1d4ed8] uppercase tracking-wide">
            Catchment Basin: {flood.riverCatchment}
          </span>
          <span className="text-[#2563eb] bg-[#dbeafe] px-2 py-0.5 rounded-xs">Simulated Hydrological Watch</span>
        </div>
        <p className="text-[#1e3a8a] leading-relaxed">
          {flood.riskSummary[language]}
        </p>
      </div>

      {/* Asymmetric Split: Hydrological Stations (7 cols) + Relief Sandbag Depots & Drainage (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column (7 cols): River Gauges Telemetry */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#475569] font-bold">
              {t.gaugesTitle}
            </h3>
            <span className="text-[11px] font-mono text-[#64748b]">
              Calibrated to CWC Datum (m)
            </span>
          </div>

          <div className="border border-[#cbd5e1] rounded-xs overflow-x-auto bg-[#f8fafc]">
            <table className="w-full min-w-[520px] sm:min-w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f1f5f9] text-[#475569] font-mono text-[10px] uppercase border-b border-[#cbd5e1]">
                  <th className="py-2.5 px-3">Catchment Gauge</th>
                  <th className="py-2.5 px-2">Watercourse</th>
                  <th className="py-2.5 px-2 text-right">Simulated</th>
                  <th className="py-2.5 px-2 text-right">Warning</th>
                  <th className="py-2.5 px-2 text-right">Danger</th>
                  <th className="py-2.5 px-3 text-right">Status / Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {flood.riverStations.map((gauge, idx) => {
                  const isHigh = gauge.currentLevelMeters >= gauge.warningLevelMeters;
                  return (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#0f172a]">
                        {gauge.stationName}
                      </td>
                      <td className="py-2.5 px-2 text-[#64748b]">
                        {gauge.watercourse}
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono font-bold text-[#0f172a]">
                        {gauge.currentLevelMeters.toFixed(2)}m
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono text-[#d97706]">
                        {gauge.warningLevelMeters.toFixed(2)}m
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono text-[#dc2626]">
                        {gauge.dangerLevelMeters.toFixed(2)}m
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold ${
                            isHigh
                              ? 'bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]'
                              : 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
                          }`}
                        >
                          {gauge.trend === 'Rising slowly' && <ArrowUpRight className="w-3 h-3 text-[#2563eb]" />}
                          {gauge.trend === 'Peaked' && <ArrowRight className="w-3 h-3 text-[#d97706]" />}
                          {gauge.trend === 'Steady' && <ArrowRight className="w-3 h-3 text-[#10b981]" />}
                          {gauge.trend === 'Receding' && <ArrowDownRight className="w-3 h-3 text-[#16a34a]" />}
                          <span>{gauge.status}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Historical Peak Callout */}
          <div className="p-3.5 bg-[#f1f5f9] border border-[#cbd5e1] rounded-xs text-xs text-[#334155]">
            <div className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#2563eb] mb-1">
              {t.historicalFloodTitle}: {flood.historicalComparison.year}
            </div>
            <p className="text-[11px] leading-relaxed">
              <strong className="text-[#0f172a]">{flood.historicalComparison.event}</strong> — Maximum inundation crest reached{' '}
              <span className="font-mono font-bold text-[#0f172a]">
                {flood.historicalComparison.peakMeters.toFixed(2)}m
              </span>{' '}
              above benchmark bed level.
            </p>
          </div>
        </div>

        {/* Right column (5 cols): Sandbag Depots & Urban Drainage */}
        <div className="lg:col-span-5 space-y-4">
          {/* Municipal Sandbag Distribution Depots */}
          <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#e2e8f0]">
              <Package className="w-4 h-4 text-[#2563eb]" aria-hidden="true" />
              <div>
                <h3 className="text-xs font-bold uppercase font-mono tracking-wide text-[#0f172a]">
                  {t.sandbagsTitle}
                </h3>
                <p className="text-[11px] text-[#64748b]">
                  {t.sandbagsDesc}
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-3">
              {flood.reliefDepots.map((depot, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#cbd5e1] p-3 rounded-xs text-xs space-y-1.5 hover:border-[#2563eb] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-[#0f172a] text-xs leading-snug">
                      {depot.name}
                    </h4>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs shrink-0 ${
                        depot.status === 'Operational 24/7'
                          ? 'bg-[#eff6ff] text-[#1d4ed8] font-bold border border-[#bfdbfe]'
                          : 'bg-[#f1f5f9] text-[#475569]'
                      }`}
                    >
                      {depot.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748b]">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#94a3b8]" aria-hidden="true" />
                    <span>{depot.location} ({depot.mandalWard})</span>
                  </div>

                  <p className="text-[11px] text-[#334155] bg-[#f8fafc] p-2 rounded-xs border border-[#e2e8f0]">
                    {depot.collectionType}
                  </p>

                  <div className="pt-1.5 border-t border-[#f1f5f9] text-[10px] font-mono">
                    <a
                      href={`tel:${depot.contact.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1 text-[#475569] hover:text-[#2563eb] font-medium"
                      title={`Call ${depot.name}`}
                    >
                      <Phone className="w-2.5 h-2.5" /> Emergency Dispatch: {depot.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urban Drainage Chokepoints Notice */}
          <div className="border border-[#cbd5e1] bg-[#f8fafc] p-3.5 rounded-xs text-xs">
            <div className="flex items-center gap-2 mb-1.5 text-[#2563eb]">
              <Droplets className="w-4 h-4 shrink-0" aria-hidden="true" />
              <h4 className="text-[11px] uppercase font-mono font-bold tracking-wider text-[#2563eb]">
                {t.surfaceWaterTitle}
              </h4>
            </div>
            <p className="text-[11px] text-[#475569] leading-relaxed">
              {flood.urbanDrainageNotice[language]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
