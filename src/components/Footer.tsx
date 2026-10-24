import React from 'react';
import { ShieldCheck, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <footer className="mt-12 bg-[#0f172a] text-[#f8fafc] border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#1e293b] text-xs">
          {/* Identity */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white font-sans">
                ClimateReady
              </span>
              <span className="text-[10px] font-mono bg-[#1e293b] text-[#38bdf8] px-2 py-0.5 rounded-xs border border-[#334155]">
                INDIA DEMO v3.0
              </span>
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Open civic climate intelligence and household disaster preparedness platform designed for national disaster resilience demonstration.
            </p>
          </div>

          {/* Statutory Frameworks */}
          <div className="space-y-1.5 font-mono text-[11px] text-[#94a3b8]">
            <div className="font-bold text-white uppercase tracking-wider mb-2">
              Statutory Alignment
            </div>
            <div>• Disaster Management Act, 2005 (Govt of India)</div>
            <div>• IMD National Heat Wave Warning Protocols</div>
            <div>• APSDMA State Disaster Management Policy</div>
            <div>• NDMA SACHET Early Warning Dissemination Architecture</div>
          </div>

          {/* Emergency Helpline Disclaimer */}
          <div className="space-y-2 text-xs text-[#94a3b8]">
            <div className="font-bold text-white font-mono uppercase tracking-wider mb-1">
              National Emergency Hotlines
            </div>
            <p className="text-[11px] leading-relaxed">
              In life-threatening situations, immediately dial national emergency numbers: <strong className="text-white">112</strong> (Unified Emergency), <strong className="text-white">1070</strong> (APSDMA State Disaster Control), or <strong className="text-white">108</strong> (Ambulance). Do not rely solely on digital portals during telecommunications failure.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748b] font-mono">
          <div>
            © {new Date().getFullYear()} ClimateReady India Civic Initiative. Developed for National Hackathon Demonstration.
          </div>
          <div className="flex items-center gap-4">
            <span>Zero Commercial Tracking</span>
            <span>•</span>
            <span>Simulated Municipal Drill Data</span>
            <span>•</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
