import React from 'react';
import { ShieldCheck, Info, AlertTriangle, Layers, BookOpen, Compass } from 'lucide-react';
import { LocationScenario, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface OfficialDataStatusBarProps {
  location: LocationScenario;
  language: Language;
}

export const OfficialDataStatusBar: React.FC<OfficialDataStatusBarProps> = ({
  location,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#e2e8f0]">
        {/* Location header with district context */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#0f766e] bg-[#f0fdfa] border border-[#ccfbf1] px-2 py-0.5 rounded-xs font-semibold">
              Demonstration District Profile
            </span>
            <span className="text-xs text-[#64748b] font-medium">
              {location.district}, {location.state}, {location.country}
            </span>
          </div>
          <h1 id="overview-heading" className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight font-sans">
            {location.name}
          </h1>
          <p className="text-xs text-[#475569] mt-1">
            Rayalaseema climatic region — High vulnerability to acute summer heatwaves and convective flash inundation.
          </p>
        </div>

        {/* Real data provenance cards (without fake telemetry claims) */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xs px-3 py-2 flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-[#0f766e] shrink-0" aria-hidden="true" />
            <div>
              <div className="text-[10px] uppercase font-mono text-[#64748b]">
                {t.statusStationReporting}
              </div>
              <div className="font-semibold text-[#0f172a] text-xs">
                Simulated Contingency Drill
              </div>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xs px-3 py-2 flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#2563eb] shrink-0" aria-hidden="true" />
            <div>
              <div className="text-[10px] uppercase font-mono text-[#64748b]">
                Statutory Frameworks
              </div>
              <div className="font-mono text-xs text-[#0f172a] font-medium">
                IMD • APSDMA • NDMA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Transparency & Data Integrity Banner */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {/* 1. Official Standards */}
        <div className="p-3.5 rounded-xs bg-[#f0fdf4] border border-[#bbf7d0] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <div className="font-semibold text-[#166534] text-xs uppercase tracking-wide font-mono">
              [Official Authority Standards]
            </div>
            <p className="text-[#14532d] text-[11px] leading-relaxed mt-0.5">
              Warning thresholds, trigger points, and health directives are calibrated to IMD Heat Action Plans and APSDMA disaster guidelines.
            </p>
          </div>
        </div>

        {/* 2. Simulated Demonstration */}
        <div className="p-3.5 rounded-xs bg-[#fefce8] border border-[#fef08a] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#a16207] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <div className="font-semibold text-[#a16207] text-xs uppercase tracking-wide font-mono">
              [Simulated Drill Model]
            </div>
            <p className="text-[#713f12] text-[11px] leading-relaxed mt-0.5">
              Local scenario parameters represent simulated hackathon models designed to test household readiness actions without fabricating alarms.
            </p>
          </div>
        </div>

        {/* 3. Civic Integrity & Emergency Protocol */}
        <div className="p-3.5 rounded-xs bg-[#eff6ff] border border-[#bfdbfe] flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#1d4ed8] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <div className="font-semibold text-[#1d4ed8] text-xs uppercase tracking-wide font-mono">
              [Civic Safety Charter]
            </div>
            <p className="text-[#1e40af] text-[11px] leading-relaxed mt-0.5">
              Never use simulated readiness tools as live disaster forecasts. Always verify official emergency orders via NDMA SACHET or dial 112 / 1070.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
