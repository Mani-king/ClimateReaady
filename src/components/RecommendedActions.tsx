import React from 'react';
import { ArrowRight, PhoneCall, AlertOctagon, Calendar, Wrench, Shield } from 'lucide-react';
import { LocationScenario, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface RecommendedActionsProps {
  location: LocationScenario;
  language: Language;
}

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({
  location,
  language,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <section
      id="actions-section"
      aria-labelledby="actions-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Editorial Header */}
      <div className="pb-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#0f766e] font-bold">
            {t.sectionActionsTag}
          </span>
          <span className="text-[#94a3b8]">•</span>
          <span className="text-xs text-[#64748b] font-medium">AP Disaster Management Plan Action Sequencing</span>
        </div>
        <h2 id="actions-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
          {t.actionsTitle}
        </h2>
        <p className="text-xs text-[#475569] mt-0.5">
          {t.actionsSubtitle}
        </p>
      </div>

      {/* Grid: 3 Timed Action Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Stage 1: Immediate */}
        <div className="bg-[#fffdfa] border border-[#fde68a] p-4 rounded-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#92400e] mb-2 pb-2 border-b border-[#fde68a]">
              <AlertOctagon className="w-4 h-4 text-[#d97706]" aria-hidden="true" />
              <span>{t.priorityImmediate}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#78350f]">
              <li className="flex items-start gap-2">
                <span className="text-[#d97706] font-bold select-none">•</span>
                <span>Fill 72h clean water containers (minimum 4L per member daily).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d97706] font-bold select-none">•</span>
                <span>Seal Aadhaar, land deeds, and ration cards in waterproof zip pouches.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d97706] font-bold select-none">•</span>
                <span>Set up morning and evening buddy checks for elderly neighbours.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2 border-t border-[#fde68a] text-[11px] font-mono text-[#b45309]">
            Civic Goal: Immediate life safety
          </div>
        </div>

        {/* Stage 2: Next 24-48 Hours */}
        <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#475569] mb-2 pb-2 border-b border-[#e2e8f0]">
              <Calendar className="w-4 h-4 text-[#475569]" aria-hidden="true" />
              <span>{t.priorityNext}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1e293b]">
              <li className="flex items-start gap-2">
                <span className="text-[#0f766e] font-bold select-none">•</span>
                <span>Apply reflective lime wash or drape wet jute bags on roof slabs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0f766e] font-bold select-none">•</span>
                <span>Locate nearest municipal sandbag cache ({location.flood.reliefDepots[0]?.name}).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0f766e] font-bold select-none">•</span>
                <span>Clear plastic silt blockages from street-side drain grates.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2 border-t border-[#e2e8f0] text-[11px] font-mono text-[#475569]">
            Civic Goal: Preventative household mitigation
          </div>
        </div>

        {/* Stage 3: Proactive Seasonal Maintenance */}
        <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#475569] mb-2 pb-2 border-b border-[#e2e8f0]">
              <Wrench className="w-4 h-4 text-[#475569]" aria-hidden="true" />
              <span>{t.prioritySeasonal}</span>
            </div>
            <ul className="space-y-2 text-xs text-[#1e293b]">
              <li className="flex items-start gap-2">
                <span className="text-[#0f766e] font-bold select-none">•</span>
                <span>Inspect and service domestic inverter battery electrolyte levels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0f766e] font-bold select-none">•</span>
                <span>Install non-return sewer check valves on ground-floor sanitation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0f766e] font-bold select-none">•</span>
                <span>Clean rooftop rainwater harvesting silt pits before monsoon.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-2 border-t border-[#e2e8f0] text-[11px] font-mono text-[#475569]">
            Civic Goal: Structural & community resilience
          </div>
        </div>
      </div>

      {/* Verified Andhra Pradesh Helplines */}
      <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-2 mb-3">
          <PhoneCall className="w-4 h-4 text-[#0f766e]" aria-hidden="true" />
          <h3 className="text-xs uppercase font-mono font-bold tracking-wide text-[#0f172a]">
            {t.contactsTitle} — {location.name}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {location.contacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-xs space-y-1 hover:border-[#0f766e] transition-colors"
            >
              <div className="font-semibold text-[#0f172a] text-xs">
                {contact.title[language]}
              </div>
              <div className="text-[11px] text-[#64748b]">
                {contact.agency}
              </div>
              <div className="pt-1 flex items-baseline justify-between font-mono">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-[#0f766e] hover:underline text-xs"
                >
                  {contact.phone}
                </a>
                <span className="text-[10px] text-[#64748b]">
                  {contact.hours}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
