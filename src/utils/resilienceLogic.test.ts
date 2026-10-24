import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateChecklistProgress,
  filterChecklist,
  getTopRemainingTasks,
  getHazardVisualTone,
} from './resilienceLogic';
import { ChecklistItem } from '../types';

const mockItems: ChecklistItem[] = [
  {
    id: 'item-water',
    category: 'general',
    urgency: 'immediate',
    title: { en: 'Water', te: 'నీరు', hi: 'जल' },
    description: { en: 'Desc', te: 'వివరణ', hi: 'विवरण' },
  },
  {
    id: 'item-ors',
    category: 'heatwave',
    urgency: 'immediate',
    title: { en: 'ORS', te: 'ఓఆర్ఎస్', hi: 'ओआरएस' },
    description: { en: 'Desc', te: 'వివరణ', hi: 'विवरण' },
  },
  {
    id: 'item-roof',
    category: 'heatwave',
    urgency: '24hr',
    title: { en: 'Lime Roof', te: 'సున్నం పూత', hi: 'चूना छत' },
    description: { en: 'Desc', te: 'వివరణ', hi: 'विवरण' },
  },
  {
    id: 'item-docs',
    category: 'flood',
    urgency: 'immediate',
    title: { en: 'Docs Elevation', te: 'పత్రాల భద్రత', hi: 'दस्तावेज़ सुरक्षा' },
    description: { en: 'Desc', te: 'వివరణ', hi: 'विवरण' },
  },
  {
    id: 'item-backflow',
    category: 'flood',
    urgency: 'seasonal',
    title: { en: 'Backflow Valve', te: 'వాల్వ్', hi: 'वाल्व' },
    description: { en: 'Desc', te: 'వివరణ', hi: 'विवरण' },
  },
];

test('calculateChecklistProgress handles empty and filled states', () => {
  const empty = calculateChecklistProgress([], []);
  assert.equal(empty.percentage, 0);
  assert.equal(empty.isAllComplete, false);

  const partial = calculateChecklistProgress(mockItems, ['item-water', 'item-ors']);
  assert.equal(partial.total, 5);
  assert.equal(partial.completed, 2);
  assert.equal(partial.percentage, 40);
  assert.equal(partial.isAllComplete, false);

  const full = calculateChecklistProgress(
    mockItems,
    mockItems.map((i) => i.id)
  );
  assert.equal(full.percentage, 100);
  assert.equal(full.isAllComplete, true);
});

test('getTopRemainingTasks filters out completed items and respects priority', () => {
  // If item-water is already completed, the top 3 heatwave tasks should be item-ors (immediate heatwave), item-roof (24hr heatwave)
  const topHeat = getTopRemainingTasks(mockItems, ['item-water'], 'heatwave', 3);
  assert.equal(topHeat.length, 2);
  assert.equal(topHeat[0].id, 'item-ors');
  assert.equal(topHeat[1].id, 'item-roof');

  // For flood tasks when nothing completed: item-docs (immediate flood), item-water (immediate general), item-backflow (seasonal flood)
  const topFlood = getTopRemainingTasks(mockItems, [], 'flood', 3);
  assert.equal(topFlood.length, 3);
  assert.equal(topFlood[0].id, 'item-docs');
  assert.equal(topFlood[1].id, 'item-water');
  assert.equal(topFlood[2].id, 'item-backflow');
});

test('filterChecklist filters accurately by hazard and urgency', () => {
  const heatOnly = filterChecklist(mockItems, 'heatwave', 'all');
  assert.equal(heatOnly.length, 3); // 2 heatwave + 1 general

  const immediateOnly = filterChecklist(mockItems, 'all', 'immediate');
  assert.equal(immediateOnly.length, 3);
});

test('getHazardVisualTone uses red only for severe warnings and teal for baseline', () => {
  // Red for genuinely severe
  const redHeat = getHazardVisualTone('heatwave', 'Red Severe Heat Wave');
  assert.equal(redHeat.severity, 'severe');
  assert.ok(redHeat.badgeText.includes('991b1b'));

  // Warm amber for orange heat wave
  const orangeHeat = getHazardVisualTone('heatwave', 'Orange Heat Wave');
  assert.equal(orangeHeat.severity, 'warning');
  assert.ok(orangeHeat.badgeText.includes('b45309'));

  // Blue for flood warning / watch
  const floodWatch = getHazardVisualTone('flood', 'Inundation Watch');
  assert.equal(floodWatch.severity, 'advisory');
  assert.ok(floodWatch.badgeText.includes('0284c7'));

  // Teal for baseline / nominal
  const baseline = getHazardVisualTone('flood', 'No Active Warnings');
  assert.equal(baseline.severity, 'nominal');
  assert.ok(baseline.badgeText.includes('0f766e'));
});
