import React from 'react';
import { X, Printer, ShieldCheck, AlertTriangle } from 'lucide-react';
import { LocationScenario, Language } from '../types';
import { INITIAL_CHECKLIST_ITEMS } from '../data/civicData';
import { UI_TRANSLATIONS } from '../locales/translations';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationScenario;
  language: Language;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  location,
  language,
}) => {
  if (!isOpen) return null;

  const t = UI_TRANSLATIONS[language];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="bg-white border border-[#0f172a] w-full max-w-3xl max-h-[90vh] flex flex-col rounded-sm shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#38bdf8]" aria-hidden="true" />
            <h2 id="print-modal-title" className="font-sans font-bold text-base tracking-tight">
              Printable Household Emergency Plan — {location.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print Plan</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 text-[#94a3b8] hover:text-white rounded-xs focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#0f172a] bg-[#f8fafc]">
          {/* Header */}
          <div className="border-b-2 border-[#0f172a] pb-4 flex justify-between items-start">
            <div>
              <div className="text-xl font-bold font-sans text-[#0f172a]">
                ClimateReady — Civic Household Plan
              </div>
              <div className="text-xs text-[#475569] mt-0.5 font-medium">
                Resilience Jurisdiction: {location.name} ({location.district}, {location.state})
              </div>
              <div className="text-[10px] font-mono text-[#64748b] mt-1">
                Conforms to: IMD Heat Action Plan & APSDMA Disaster Contingency Framework
              </div>
            </div>
            <div className="text-right font-mono text-[11px] text-[#475569]">
              <div className="font-bold text-[#b91c1c]">EMERGENCY DOCUMENT</div>
              <div>Keep in physical household folder</div>
            </div>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-[#cbd5e1] pb-1 mb-2">
              1. Priority Andhra Pradesh & District Emergency Lines
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {location.contacts.map((c, i) => (
                <div key={i} className="p-2 border border-[#cbd5e1] bg-white rounded-xs">
                  <div className="font-semibold text-[#0f172a]">{c.title[language]}</div>
                  <div className="font-mono font-bold text-sm text-[#0f766e] mt-0.5">{c.phone}</div>
                  <div className="text-[10px] text-[#64748b]">{c.hours}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Hazard Protocols */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-[#cbd5e1] pb-1 mb-2">
              2. Core Directives for Current Seasonal Hazards
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 bg-[#fffbeb] border border-[#fde68a] rounded-xs">
                <div className="font-bold text-[#b45309] mb-1 font-mono uppercase">
                  Heat: {location.heatwave.statusLevel}
                </div>
                <ul className="space-y-1 list-disc list-inside text-[#78350f]">
                  {location.heatwave.primaryDirectives[language].slice(0, 3).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#eff6ff] border border-[#bfdbfe] rounded-xs">
                <div className="font-bold text-[#1d4ed8] mb-1 font-mono uppercase">
                  Flood: {location.flood.statusLevel}
                </div>
                <p className="text-[#1e3a8a] leading-snug">
                  {location.flood.riskSummary[language]}
                </p>
                <div className="mt-2 text-[10px] font-mono text-[#1d4ed8]">
                  Relief Cache: {location.flood.reliefDepots[0]?.name}
                </div>
              </div>
            </div>
          </div>

          {/* Household Verification Checklist */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0f172a] border-b border-[#cbd5e1] pb-1 mb-2">
              3. Verification Checklist (Tick during family contingency drills)
            </h3>
            <div className="space-y-1.5 text-xs">
              {INITIAL_CHECKLIST_ITEMS.map((item) => (
                <div key={item.id} className="flex items-start gap-2 p-1.5 border-b border-[#e2e8f0]">
                  <span className="w-4 h-4 border border-[#475569] inline-block shrink-0 rounded-xs mt-0.5" />
                  <div>
                    <span className="font-medium text-[#0f172a]">{item.title[language]}</span>
                    <span className="text-[#64748b] font-mono text-[10px] ml-2">[{item.urgency.toUpperCase()}]</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Sign-off */}
          <div className="pt-4 border-t border-[#cbd5e1] grid grid-cols-2 gap-4 font-mono text-[11px] text-[#475569]">
            <div>Household Head / Responder Signature: __________________</div>
            <div>Date of Verification: __________________</div>
          </div>
        </div>
      </div>
    </div>
  );
};
