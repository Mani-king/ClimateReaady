import React from 'react';
import { ExternalLink, ShieldCheck, Database, FileCheck } from 'lucide-react';
import { OFFICIAL_SOURCES } from '../data/civicData';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface OfficialSourcesListProps {
  language: Language;
}

export const OfficialSourcesList: React.FC<OfficialSourcesListProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <section
      id="sources-section"
      aria-labelledby="sources-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Editorial Header */}
      <div className="pb-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#0f766e] font-bold">
            {t.sectionSourcesTag}
          </span>
          <span className="text-[#94a3b8]">•</span>
          <span className="text-xs text-[#64748b] font-medium">Indian Disaster Management Compliance</span>
        </div>
        <h2 id="sources-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
          {t.sourcesTitle}
        </h2>
        <p className="text-xs text-[#475569] mt-0.5">
          {t.sourcesSubtitle}
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        {OFFICIAL_SOURCES.map((source, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-xs space-y-2 hover:border-[#0f766e] transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-[#0f172a] text-xs">
                  {source.name}
                </h3>
                <div className="text-[11px] font-mono text-[#64748b]">
                  {source.jurisdiction}
                </div>
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0f766e] hover:underline shrink-0 font-medium"
              >
                <span>Portal</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <p className="text-[11px] text-[#334155] leading-relaxed">
              {source.description}
            </p>

            <div className="pt-2 border-t border-[#e2e8f0] flex items-center justify-between text-[10px] font-mono text-[#64748b]">
              <span>Cadence: {source.updateFrequency}</span>
              <span className="text-[#15803d] font-semibold">Statutory Authority</span>
            </div>
          </div>
        ))}
      </div>

      {/* Transparency & Ethical Civic Design Charter */}
      <div className="mt-4 p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xs text-xs">
        <div className="flex items-center gap-2 mb-1.5 text-[#166534]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#166534]" aria-hidden="true" />
          <h4 className="font-mono text-xs uppercase font-bold tracking-wide text-[#166534]">
            {t.methodologyNote}
          </h4>
        </div>
        <p className="text-[#14532d] text-xs leading-relaxed">
          {t.methodologyBody}
        </p>
        <div className="mt-2.5 text-[11px] font-mono text-[#15803d] flex flex-wrap gap-x-4 gap-y-1">
          <span>Disaster Management Act, 2005 (India)</span>
          <span>•</span>
          <span>National Guidelines for Preparation of Action Plan - Prevention and Management of Heat Wave</span>
          <span>•</span>
          <span>Zero Telemetry / Privacy-First Architecture</span>
        </div>
      </div>
    </section>
  );
};
