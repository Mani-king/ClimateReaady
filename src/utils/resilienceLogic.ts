import { ChecklistItem, HazardCategory, UrgencyLevel } from '../types';

export interface ProgressResult {
  total: number;
  completed: number;
  percentage: number;
  isAllComplete: boolean;
}

/**
 * Computes completion statistics for a list of items and set of completed IDs.
 */
export function calculateChecklistProgress(
  items: ChecklistItem[],
  completedIds: string[]
): ProgressResult {
  if (!items || items.length === 0) {
    return { total: 0, completed: 0, percentage: 0, isAllComplete: false };
  }

  const completedSet = new Set(completedIds);
  let completedCount = 0;

  for (const item of items) {
    if (completedSet.has(item.id)) {
      completedCount++;
    }
  }

  const percentage = Math.round((completedCount / items.length) * 100);

  return {
    total: items.length,
    completed: completedCount,
    percentage,
    isAllComplete: completedCount === items.length,
  };
}

/**
 * Filters checklist items by hazard category and urgency priority.
 */
export function filterChecklist(
  items: ChecklistItem[],
  hazardFilter: HazardCategory,
  urgencyFilter: UrgencyLevel | 'all'
): ChecklistItem[] {
  return items.filter((item) => {
    // Hazard match
    const matchesHazard =
      hazardFilter === 'all' ||
      item.category === 'general' ||
      item.category === hazardFilter;

    // Urgency match
    const matchesUrgency =
      urgencyFilter === 'all' || item.urgency === urgencyFilter;

    return matchesHazard && matchesUrgency;
  });
}

/**
 * Returns the highest-priority remaining uncompleted tasks for the given hazard.
 * Priority order: immediate -> 24hr -> seasonal.
 * Matches specific hazard first, then general.
 */
export function getTopRemainingTasks(
  items: ChecklistItem[],
  completedIds: string[],
  hazard: 'heatwave' | 'flood' | 'all' = 'all',
  limit = 3
): ChecklistItem[] {
  const completedSet = new Set(completedIds);
  const uncompleted = items.filter((item) => !completedSet.has(item.id));

  // Sort by urgency priority
  const urgencyWeight: Record<UrgencyLevel, number> = {
    immediate: 1,
    '24hr': 2,
    seasonal: 3,
  };

  const relevant = uncompleted.filter((item) => {
    if (hazard === 'all') return true;
    return item.category === hazard || item.category === 'general';
  });

  relevant.sort((a, b) => {
    // Specific hazard preferred over general if same urgency
    const uA = urgencyWeight[a.urgency];
    const uB = urgencyWeight[b.urgency];
    if (uA !== uB) return uA - uB;

    if (a.category === hazard && b.category !== hazard) return -1;
    if (b.category === hazard && a.category !== hazard) return 1;

    return 0;
  });

  return relevant.slice(0, limit);
}

/**
 * Returns restrained visual status styles according to national resilience palette:
 * - Red ONLY for genuinely severe warnings.
 * - Warm amber for heatwave alerts.
 * - Blue for flood alerts.
 * - Teal / Forest Green for normal / baseline info.
 */
export function getHazardVisualTone(hazard: 'heatwave' | 'flood', statusLevel: string): {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  isUrgent: boolean;
  severity: 'nominal' | 'advisory' | 'warning' | 'severe';
} {
  const norm = statusLevel.toLowerCase();

  // Severe warning (Red only for genuinely severe warnings)
  if (norm.includes('red') || norm.includes('severe') || norm.includes('danger')) {
    return {
      badgeBg: 'bg-[#fee2e2]',
      badgeText: 'text-[#991b1b]',
      badgeBorder: 'border-[#fca5a5]',
      isUrgent: true,
      severity: 'severe',
    };
  }

  // Heatwave
  if (hazard === 'heatwave') {
    if (norm.includes('orange') || norm.includes('wave')) {
      return {
        badgeBg: 'bg-[#fef3c7]',
        badgeText: 'text-[#b45309]',
        badgeBorder: 'border-[#fde68a]',
        isUrgent: true,
        severity: 'warning',
      };
    }
    if (norm.includes('yellow') || norm.includes('advisory')) {
      return {
        badgeBg: 'bg-[#fffbeb]',
        badgeText: 'text-[#a16207]',
        badgeBorder: 'border-[#fef08a]',
        isUrgent: true,
        severity: 'advisory',
      };
    }
    // Baseline / Nominal -> Teal / Forest Green
    return {
      badgeBg: 'bg-[#f0fdfa]',
      badgeText: 'text-[#0f766e]',
      badgeBorder: 'border-[#99f6e4]',
      isUrgent: false,
      severity: 'nominal',
    };
  }

  // Flood
  if (norm.includes('no active') || norm.includes('nominal') || norm.includes('baseline')) {
    return {
      badgeBg: 'bg-[#f0fdfa]',
      badgeText: 'text-[#0f766e]',
      badgeBorder: 'border-[#99f6e4]',
      isUrgent: false,
      severity: 'nominal',
    };
  }

  if (norm.includes('warning')) {
    return {
      badgeBg: 'bg-[#eff6ff]',
      badgeText: 'text-[#1d4ed8]',
      badgeBorder: 'border-[#93c5fd]',
      isUrgent: true,
      severity: 'warning',
    };
  }

  if (norm.includes('alert') || norm.includes('watch') || norm.includes('inundation')) {
    return {
      badgeBg: 'bg-[#f0f9ff]',
      badgeText: 'text-[#0284c7]',
      badgeBorder: 'border-[#bae6fd]',
      isUrgent: true,
      severity: 'advisory',
    };
  }

  // Default Nominal
  return {
    badgeBg: 'bg-[#f0fdfa]',
    badgeText: 'text-[#0f766e]',
    badgeBorder: 'border-[#99f6e4]',
    isUrgent: false,
    severity: 'nominal',
  };
}

/**
 * Safely read from localStorage
 */
export function loadChecklistStorage(storageKey: string, fallback: string[] = []): string[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely persist to localStorage
 */
export function saveChecklistStorage(storageKey: string, completedIds: string[]): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(completedIds));
    return true;
  } catch {
    return false;
  }
}
