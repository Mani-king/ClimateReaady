import React from 'react';
import { Users, AlertTriangle, TrendingUp, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import { LocationScenario, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface CommunityResilienceGapsProps {
  location: LocationScenario;
  language: Language;
}

export const CommunityResilienceGaps: React.FC<CommunityResilienceGapsProps> = ({
  location,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <section
      id="gaps-section"
      aria-labelledby="gaps-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#b45309] font-bold">
              {t.sectionGapsTag}
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">Ward-Level Civil Defence Modeling</span>
          </div>
          <h2 id="gaps-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            {t.gapsTitle} — {location.name}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {t.gapsSubtitle}
          </p>
        </div>

        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#fefce8] text-[#a16207] border-[#fef08a]">
            <Users className="w-3.5 h-3.5 text-[#d97706]" aria-hidden="true" />
            <span>Synthetic Neighborhood Aggregate</span>
          </span>
        </div>
      </div>

      {/* Critical Synthetic Data Integrity Disclaimer Banner */}
      <div className="my-4 p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-xs text-[#475569] flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#0f766e] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-[11px] leading-relaxed">
          <strong className="text-[#0f172a] uppercase font-mono tracking-wide mr-1.5">
            [Synthetic Model Transparency]
          </strong>
          {t.gapsNotice}
        </div>
      </div>

      {/* Synthetic Metric Gap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {location.communityGaps.map((gap, idx) => {
          const gapDelta = gap.targetPercent - gap.syntheticPreparednessPercent;
          return (
            <div
              key={idx}
              className="p-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-xs space-y-3 hover:border-[#0f172a] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-[#0f172a] text-xs leading-snug">
                    {gap.category}
                  </h3>
                  <span className="text-[10px] font-mono bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] px-1.5 py-0.5 rounded-xs shrink-0 font-bold">
                    -{gapDelta}% Gap
                  </span>
                </div>

                {/* Progress Visualizer: Simulated vs Target */}
                <div className="space-y-1.5 py-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">{t.currentSyntheticLabel}:</span>
                    <span className="font-bold text-[#0f172a]">{gap.syntheticPreparednessPercent}%</span>
                  </div>
                  <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#d97706] h-full rounded-full"
                      style={{ width: `${gap.syntheticPreparednessPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-[#64748b]">
                    <span>{t.targetLabel}:</span>
                    <span className="text-[#15803d] font-semibold">{gap.targetPercent}%</span>
                  </div>
                </div>

                {/* Description of gap */}
                <p className="text-[11px] text-[#475569] leading-relaxed mt-2">
                  {gap.criticalGapDescription[language]}
                </p>
              </div>

              {/* Recommended Civic Intervention */}
              <div className="pt-2.5 border-t border-[#e2e8f0] text-[11px]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0f766e] font-bold mb-1">
                  Sachivalayam / Civic Intervention
                </div>
                <p className="text-[#1e293b] leading-snug bg-white p-2 rounded-xs border border-[#e2e8f0]">
                  {gap.suggestedCivicIntervention[language]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practical Civic Workflow Summary Bar */}
      <div className="mt-5 pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0f172a]">Civic Resilience Flow:</span>
          <span className="hidden sm:inline">District Selection</span>
          <ArrowRight className="w-3 h-3 text-[#94a3b8]" />
          <span className="hidden sm:inline">Hazard Baseline</span>
          <ArrowRight className="w-3 h-3 text-[#94a3b8]" />
          <span className="text-[#0f766e] font-bold">Household Action</span>
          <ArrowRight className="w-3 h-3 text-[#94a3b8]" />
          <span className="text-[#b45309] font-bold">Community Gap Closure</span>
        </div>
        <div className="text-[10px] text-[#64748b]">
          Integrated with AP Ward Volunteers Framework
        </div>
      </div>
    </section>
  );
};
