import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, CheckCircle, RotateCcw, Filter, AlertCircle, FileText, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { ChecklistItem, HazardCategory, UrgencyLevel, Language } from '../types';
import { INITIAL_CHECKLIST_ITEMS } from '../data/civicData';
import { UI_TRANSLATIONS } from '../locales/translations';
import {
  calculateChecklistProgress,
  filterChecklist,
  getTopRemainingTasks,
  loadChecklistStorage,
  saveChecklistStorage,
} from '../utils/resilienceLogic';

interface HouseholdChecklistProps {
  language: Language;
}

const STORAGE_KEY = 'climateready_india_checklist_v2';
const NOTES_STORAGE_KEY = 'climateready_india_household_notes';

export const HouseholdChecklist: React.FC<HouseholdChecklistProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language];

  // State
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    // Default 1 item pre-completed as realistic user starting state
    return loadChecklistStorage(STORAGE_KEY, ['chk-ind-docs-elevation']);
  });

  const [hazardFilter, setHazardFilter] = useState<HazardCategory>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyLevel | 'all'>('all');
  const [householdNotes, setHouseholdNotes] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(NOTES_STORAGE_KEY) || '';
    }
    return '';
  });

  // Persist completedIds
  useEffect(() => {
    saveChecklistStorage(STORAGE_KEY, completedIds);
  }, [completedIds]);

  // Persist notes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(NOTES_STORAGE_KEY, householdNotes);
    }
  }, [householdNotes]);

  const toggleItem = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const markAllComplete = () => {
    setCompletedIds(INITIAL_CHECKLIST_ITEMS.map((item) => item.id));
  };

  const resetToDefaults = () => {
    setCompletedIds([]);
  };

  // Calculations
  const progress = calculateChecklistProgress(INITIAL_CHECKLIST_ITEMS, completedIds);
  const filteredItems = filterChecklist(INITIAL_CHECKLIST_ITEMS, hazardFilter, urgencyFilter);
  
  // Top 3 remaining tasks for selected hazard (Priority 5 Differentiator)
  const topRemaining = getTopRemainingTasks(
    INITIAL_CHECKLIST_ITEMS,
    completedIds,
    hazardFilter === 'all' ? 'all' : hazardFilter,
    3
  );

  return (
    <section
      id="checklist-section"
      aria-labelledby="checklist-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0f766e] font-bold">
              {t.sectionChecklistTag}
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">NDMA Household Contingency Model</span>
          </div>
          <h2 id="checklist-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            {t.checklistTitle}
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            {t.checklistSubtitle}
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={markAllComplete}
            aria-label={t.markAllComplete}
            className="text-xs font-semibold px-2.5 py-1.5 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] rounded-xs transition-colors cursor-pointer"
          >
            {t.markAllComplete}
          </button>
          <button
            type="button"
            onClick={resetToDefaults}
            aria-label={t.resetChecklist}
            className="text-xs font-medium px-2.5 py-1.5 bg-white hover:bg-[#f8fafc] text-[#64748b] border border-[#cbd5e1] rounded-xs transition-colors cursor-pointer"
          >
            {t.resetChecklist}
          </button>
        </div>
      </div>

      {/* Prominent Progress Bar Strip & Clear Educational Clarification */}
      <div className="my-5 p-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-[#475569] uppercase tracking-wider text-[11px] font-bold">
              {t.progressLabel}:
            </span>
            <span className="font-bold text-2xl text-[#0f766e]">
              {progress.percentage}%
            </span>
            <span className="text-[#64748b] text-xs">
              ({progress.completed} of {progress.total} household measures verified)
            </span>
          </div>
          {progress.isAllComplete ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-[#166534] bg-[#f0fdf4] px-2.5 py-1 rounded-xs border border-[#bbf7d0]">
              <CheckCircle className="w-3.5 h-3.5" /> All Ready
            </span>
          ) : (
            <span className="text-[11px] font-mono text-[#d97706] bg-[#fffbeb] px-2 py-0.5 rounded-xs border border-[#fef3c7]">
              {progress.total - progress.completed} verification steps remaining
            </span>
          )}
        </div>

        {/* Visual Progress Bar (Deep Forest Green / Teal) */}
        <div
          className="w-full bg-[#e2e8f0] h-3 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.progressLabel}
        >
          <div
            className="bg-[#0f766e] h-full transition-all duration-300 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>

        {/* Explicit Civic Education: Readiness Score Definition */}
        <div className="pt-1.5 text-[11px] text-[#475569] leading-relaxed flex items-start gap-1.5 border-t border-[#e2e8f0]">
          <Info className="w-3.5 h-3.5 text-[#0f766e] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{t.scoreExplanation}</span>
        </div>
      </div>

      {/* PRIORITY 5 DIFFERENTIATOR: Highest Priority Remaining Tasks */}
      {topRemaining.length > 0 && (
        <div className="mb-6 p-4 bg-[#fffdfa] border-l-3 border-[#f59e0b] border-y border-r border-[#fde68a] rounded-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#92400e]">
              {t.highestPriorityTitle}
            </span>
          </div>
          <p className="text-xs text-[#78350f] mb-3">
            {t.highestPriorityDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {topRemaining.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleItem(task.id)}
                className="p-3 bg-white border border-[#fde68a] rounded-xs text-xs space-y-1.5 cursor-pointer hover:border-[#b45309] transition-colors"
                title="Click to mark complete"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.2 rounded-xs">
                    {task.urgency}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748b]">
                    {task.category}
                  </span>
                </div>
                <div className="font-semibold text-[#0f172a] text-xs leading-snug line-clamp-2">
                  {task.title[language]}
                </div>
                <div className="text-[10px] text-[#b45309] font-mono flex items-center gap-1 pt-1">
                  <span>Mark Done</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Controls (Hazard & Urgency) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e2e8f0] text-xs">
        {/* Hazard Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto" role="tablist" aria-label="Hazard category filters">
          <button
            type="button"
            role="tab"
            aria-selected={hazardFilter === 'all'}
            onClick={() => setHazardFilter('all')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              hazardFilter === 'all'
                ? 'bg-[#0f172a] text-white font-medium'
                : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={hazardFilter === 'heatwave'}
            onClick={() => setHazardFilter('heatwave')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              hazardFilter === 'heatwave'
                ? 'bg-[#b45309] text-white font-medium'
                : 'bg-[#fffbeb] text-[#92400e] hover:bg-[#fef3c7] border border-[#fde68a]'
            }`}
          >
            {t.filterHeat}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={hazardFilter === 'flood'}
            onClick={() => setHazardFilter('flood')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors cursor-pointer ${
              hazardFilter === 'flood'
                ? 'bg-[#1d4ed8] text-white font-medium'
                : 'bg-[#eff6ff] text-[#1e40af] hover:bg-[#dbeafe] border border-[#bfdbfe]'
            }`}
          >
            {t.filterFlood}
          </button>
        </div>

        {/* Urgency Priority Select */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#64748b]" aria-hidden="true" />
          <label htmlFor="urgency-filter" className="sr-only">
            Filter by urgency
          </label>
          <select
            id="urgency-filter"
            aria-label="Filter checklist by urgency"
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value as UrgencyLevel | 'all')}
            className="bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-xs px-2.5 py-1.5 text-[#0f172a] font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Urgencies</option>
            <option value="immediate">{t.priorityImmediate}</option>
            <option value="24hr">{t.priorityNext}</option>
            <option value="seasonal">{t.prioritySeasonal}</option>
          </select>
        </div>
      </div>

      {/* Checklist Interactive List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64748b] bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-xs">
            No checklist items match the selected filter combination.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isChecked = completedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                className={`p-4 rounded-xs border transition-colors cursor-pointer select-none ${
                  isChecked
                    ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                    : 'bg-white border-[#cbd5e1] hover:border-[#0f766e]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="pt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[#166534]" aria-hidden="true" />
                    ) : (
                      <Square className="w-5 h-5 text-[#94a3b8]" aria-hidden="true" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3
                        className={`text-xs font-semibold tracking-tight ${
                          isChecked ? 'line-through text-[#64748b]' : 'text-[#0f172a]'
                        }`}
                      >
                        {item.title[language]}
                      </h3>

                      <div className="flex items-center gap-1.5">
                        {item.category === 'heatwave' && (
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-xs bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
                            Heat
                          </span>
                        )}
                        {item.category === 'flood' && (
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-xs bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
                            Flood
                          </span>
                        )}
                        {item.category === 'general' && (
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-xs bg-[#f1f5f9] text-[#475569]">
                            General
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-xs ${
                            item.urgency === 'immediate'
                              ? 'bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]'
                              : item.urgency === '24hr'
                              ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                              : 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
                          }`}
                        >
                          {item.urgency}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        isChecked ? 'text-[#64748b]' : 'text-[#334155]'
                      }`}
                    >
                      {item.description[language]}
                    </p>

                    {item.essentialNotes && (
                      <div className="mt-1 pt-1.5 border-t border-[#f1f5f9] text-[11px] font-mono text-[#0f766e] flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 text-[#0f766e] shrink-0" aria-hidden="true" />
                        <span>Guideline: {item.essentialNotes[language]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Household Custom Notes Area */}
      <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wide text-[#475569] font-bold">
          <FileText className="w-3.5 h-3.5 text-[#0f766e]" aria-hidden="true" />
          <span>Local Household Notes & Contacts</span>
        </div>
        <textarea
          value={householdNotes}
          onChange={(e) => setHouseholdNotes(e.target.value)}
          placeholder={t.notesPlaceholder}
          rows={3}
          aria-label="Local household notes"
          className="w-full text-xs font-mono p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-[#0f172a] focus:outline-none focus:border-[#0f766e] transition-colors resize-y placeholder:text-[#94a3b8]"
        />
        <div className="text-[10px] text-[#64748b] font-mono mt-1">
          Confidential local storage — notes never leave your personal browser session.
        </div>
      </div>
    </section>
  );
};
