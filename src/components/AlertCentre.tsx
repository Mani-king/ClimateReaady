import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  ShieldCheck,
  Radio,
  Clock,
  Filter,
  ExternalLink,
  Flame,
  CloudRain,
  Waves,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { AlertItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../locales/translations';

interface AlertCentreProps {
  alerts: AlertItem[];
  language: Language;
}

export const AlertCentre: React.FC<AlertCentreProps> = ({ alerts, language }) => {
  const t = UI_TRANSLATIONS[language];
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'official' | 'weather' | 'risk_indicator' | 'preparedness'>('all');
  const [hazardFilter, setHazardFilter] = useState<'all' | 'heatwave' | 'heavy_rainfall' | 'flood' | 'general'>('all');
  const [notificationState, setNotificationState] = useState<'default' | 'granted' | 'denied'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission as 'default' | 'granted' | 'denied';
    }
    return 'denied';
  });

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setNotificationState(perm as 'default' | 'granted' | 'denied');
        if (perm === 'granted') {
          new Notification('ClimateReady Alerts Enabled', {
            body: 'You will receive in-session warnings for heatwave and heavy rainfall alerts while this tab remains active.',
            icon: '/favicon.ico',
          });
        }
      } catch (e) {
        console.warn('Notification permission error:', e);
      }
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
    const matchesHazard = hazardFilter === 'all' || alert.hazardType === hazardFilter;
    return matchesCategory && matchesHazard;
  });

  const getSeverityBadge = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'severe':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5] font-bold';
      case 'high':
        return 'bg-[#fffbeb] text-[#b45309] border-[#fde68a] font-semibold';
      case 'moderate':
        return 'bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe] font-medium';
      case 'low':
      default:
        return 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0] font-medium';
    }
  };

  const getCategoryLabel = (category: AlertItem['category']) => {
    switch (category) {
      case 'official':
        return { label: 'Verified Official Alert', bg: 'bg-[#1e293b] text-[#38bdf8]' };
      case 'weather':
        return { label: 'Live Weather Trigger', bg: 'bg-[#0f766e] text-white' };
      case 'risk_indicator':
        return { label: 'Experimental Model', bg: 'bg-[#d97706] text-white' };
      case 'preparedness':
        return { label: 'Civic Checklist Reminder', bg: 'bg-[#334155] text-[#cbd5e1]' };
    }
  };

  return (
    <section
      id="alerts-section"
      aria-labelledby="alerts-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0f766e] font-bold">
              CIVIC ALERT DISSEMINATION CENTRE
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">NDMA SACHET & Real-Time Monitoring</span>
          </div>
          <h2 id="alerts-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            Hazard Bulletins & Intelligence Centre
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            Clear separation of verified official agency alerts, live weather observations, and civic reminders.
          </p>
        </div>

        {/* Browser Notification Controls */}
        <div className="flex items-center gap-2">
          {notificationState === 'granted' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-xs font-mono rounded-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>In-Tab Alerts Active</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={requestNotificationPermission}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#0f172a] border border-[#cbd5e1] text-xs font-mono rounded-xs transition-colors cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#0f766e]" />
              <span>Enable Browser Alerts</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Transparency Disclaimer */}
      <div className="my-3 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xs text-[11px] text-[#475569] flex items-start gap-2">
        <Info className="w-4 h-4 text-[#0f766e] shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong>Notice:</strong> Browser notifications deliver alerts while this website tab is open. Reliable background push notifications on phones require cellular broadcast or dedicated state SMS systems (dial 1070 for APSDMA emergency broadcast).
        </span>
      </div>

      {/* Filter Tabs: Category & Hazard */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b border-[#e2e8f0]">
        {/* Category Toggles */}
        <div className="flex items-center gap-1.5 overflow-x-auto" role="tablist" aria-label="Alert category filters">
          <button
            type="button"
            role="tab"
            aria-selected={categoryFilter === 'all'}
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#0f172a] text-white font-semibold'
                : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
            }`}
          >
            All Bulletins ({alerts.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={categoryFilter === 'official'}
            onClick={() => setCategoryFilter('official')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              categoryFilter === 'official'
                ? 'bg-[#1e293b] text-[#38bdf8] font-semibold border border-[#38bdf8]/40'
                : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
            }`}
          >
            Verified Official (IMD/CWC)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={categoryFilter === 'weather'}
            onClick={() => setCategoryFilter('weather')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              categoryFilter === 'weather'
                ? 'bg-[#0f766e] text-white font-semibold'
                : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
            }`}
          >
            Live Weather Observations
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={categoryFilter === 'risk_indicator'}
            onClick={() => setCategoryFilter('risk_indicator')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              categoryFilter === 'risk_indicator'
                ? 'bg-[#b45309] text-white font-semibold'
                : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
            }`}
          >
            Experimental Indices
          </button>
        </div>

        {/* Hazard Type Filter */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-[#64748b]" />
          <select
            value={hazardFilter}
            onChange={(e) => setHazardFilter(e.target.value as any)}
            aria-label="Filter alerts by hazard type"
            className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xs px-2.5 py-1 text-xs text-[#0f172a] font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Hazards</option>
            <option value="heatwave">Heatwave Only</option>
            <option value="heavy_rainfall">Heavy Rainfall Only</option>
            <option value="flood">River Basin Flood Only</option>
            <option value="general">General Preparedness</option>
          </select>
        </div>
      </div>

      {/* Alert Feed Items */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64748b] bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-xs">
            No alerts found matching the active filters.
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const catBadge = getCategoryLabel(alert.category);
            return (
              <div
                key={alert.id}
                className="p-4 rounded-xs border border-[#cbd5e1] bg-[#f8fafc] hover:border-[#0f172a] transition-colors space-y-2"
              >
                {/* Meta bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs font-semibold ${catBadge.bg}`}>
                      {catBadge.label}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs border ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity} priority
                    </span>
                    <span className="text-[11px] font-mono text-[#64748b] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.issuedTime}
                    </span>
                  </div>

                  {alert.sourceUrl && (
                    <a
                      href={alert.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0f766e] hover:underline"
                    >
                      <span>Verify on {alert.source.split(' ')[0]}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#0f172a] leading-snug">
                  {alert.title[language] || alert.title.en}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#334155] leading-relaxed">
                  {alert.description[language] || alert.description.en}
                </p>

                {/* Footer notes */}
                <div className="pt-2 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between text-[10px] font-mono text-[#64748b]">
                  <span>Attribution: {alert.source}</span>
                  {alert.validPeriod && <span>Validity: {alert.validPeriod}</span>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
