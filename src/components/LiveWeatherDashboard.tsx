import React from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Droplets,
  Thermometer,
  RotateCw,
  AlertTriangle,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { LiveWeatherData } from '../types';

interface LiveWeatherDashboardProps {
  weather: LiveWeatherData | null;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  locationName: string;
}

export const LiveWeatherDashboard: React.FC<LiveWeatherDashboardProps> = ({
  weather,
  isLoading,
  error,
  onRefresh,
  locationName,
}) => {
  const getWeatherIcon = (code: number, className = 'w-6 h-6') => {
    if (code === 0 || code === 1) return <Sun className={`${className} text-[#f59e0b]`} aria-hidden="true" />;
    if (code === 2 || code === 3) return <Cloud className={`${className} text-[#94a3b8]`} aria-hidden="true" />;
    if (code >= 51 && code <= 55) return <CloudDrizzle className={`${className} text-[#38bdf8]`} aria-hidden="true" />;
    if (code >= 61 && code <= 82) return <CloudRain className={`${className} text-[#2563eb]`} aria-hidden="true" />;
    if (code >= 95) return <CloudLightning className={`${className} text-[#dc2626]`} aria-hidden="true" />;
    return <Sun className={`${className} text-[#f59e0b]`} aria-hidden="true" />;
  };

  return (
    <section
      aria-labelledby="weather-heading"
      className="bg-white border border-[#cbd5e1] rounded-sm p-5 sm:p-6 mb-8 shadow-xs"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2e8f0] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#0f766e] font-bold">
              LIVE METEOROLOGICAL OBSERVATION & FORECAST
            </span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-xs text-[#64748b] font-medium">Real-Time Open-Meteo High-Resolution Feed</span>
          </div>
          <h2 id="weather-heading" className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
            Current Atmospheric Conditions — {locationName}
          </h2>
          {weather?.lastUpdated && (
            <p className="text-xs text-[#64748b] mt-0.5 font-mono">
              {weather.lastUpdated}
            </p>
          )}
        </div>

        {/* Refresh Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh live weather observations"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#0f172a] border border-[#cbd5e1] rounded-xs text-xs font-mono transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#0f766e]' : 'text-[#64748b]'}`} />
            <span>{isLoading ? 'Fetching Feed...' : 'Refresh Weather'}</span>
          </button>
        </div>
      </div>

      {/* Error / Stale warning banner */}
      {error && !weather && (
        <div className="my-4 p-4 bg-[#fff1f2] border-l-4 border-[#e11d48] text-[#9f1239] rounded-xs text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <div className="font-bold uppercase font-mono text-[11px]">Live Weather Observation Unavailable</div>
            <p className="mt-0.5 leading-relaxed">{error}</p>
            <p className="mt-1 text-[11px] text-[#be123c]">
              Check network connectivity or click 'Refresh Weather'. Never displaying fabricated values.
            </p>
          </div>
        </div>
      )}

      {weather?.isStale && (
        <div className="my-3 p-3 bg-[#fffbeb] border border-[#fde68a] text-[#92400e] rounded-xs text-xs flex items-center gap-2 font-mono">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#b45309]" aria-hidden="true" />
          <span>Note: Displaying last verified cached observation. Live sync currently retrying.</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && !weather && (
        <div className="my-6 space-y-4 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-[#f1f5f9] rounded-xs" />
            ))}
          </div>
          <div className="h-32 bg-[#f1f5f9] rounded-xs" />
        </div>
      )}

      {/* Weather Content */}
      {weather && (
        <div className="my-5 space-y-6">
          {/* Top Row: Current Primary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Temp & Feels-like */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
              <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono uppercase">
                <span>Observed Temp</span>
                {getWeatherIcon(weather.current.weatherCode, 'w-5 h-5')}
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold font-mono text-[#0f172a]">
                  {weather.current.temperature.toFixed(1)}°C
                </span>
                <span className="text-xs text-[#64748b]">
                  ({((weather.current.temperature * 9) / 5 + 32).toFixed(1)}°F)
                </span>
              </div>
              <div className="text-[11px] text-[#475569] mt-1.5 flex items-center gap-1 font-mono">
                <Thermometer className="w-3 h-3 text-[#f59e0b]" />
                <span>Feels like: <strong>{weather.current.apparentTemperature.toFixed(1)}°C</strong></span>
              </div>
            </div>

            {/* 2. Condition & Today's Range */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
              <div className="text-[#64748b] text-[11px] font-mono uppercase">
                Current Condition
              </div>
              <div className="text-base font-bold text-[#0f172a] mt-2 truncate">
                {weather.current.conditionText}
              </div>
              <div className="text-[11px] text-[#475569] mt-1.5 font-mono flex items-center gap-2">
                {weather.daily[0] && (
                  <span>
                    H: <strong className="text-[#dc2626]">{weather.daily[0].tempMax.toFixed(1)}°</strong> • L: <strong className="text-[#2563eb]">{weather.daily[0].tempMin.toFixed(1)}°</strong>
                  </span>
                )}
              </div>
            </div>

            {/* 3. Humidity & Moisture */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
              <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono uppercase">
                <span>Relative Humidity</span>
                <Droplets className="w-4 h-4 text-[#0284c7]" />
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold font-mono text-[#0f172a]">
                  {weather.current.relativeHumidity}%
                </span>
              </div>
              <div className="text-[11px] text-[#475569] mt-1.5 font-mono">
                {weather.current.relativeHumidity < 30
                  ? 'Dry continental Rayalaseema air'
                  : weather.current.relativeHumidity > 70
                  ? 'High humidity thermal stress'
                  : 'Moderate ambient humidity'}
              </div>
            </div>

            {/* 4. Wind Speed & Rainfall */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-xs">
              <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono uppercase">
                <span>Wind & Precipitation</span>
                <Wind className="w-4 h-4 text-[#0f766e]" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold font-mono text-[#0f172a]">
                  {weather.current.windSpeed.toFixed(1)}
                </span>
                <span className="text-xs text-[#64748b]">km/h</span>
              </div>
              <div className="text-[11px] text-[#475569] mt-1.5 font-mono">
                Rain today: <strong>{weather.current.precipitation.toFixed(1)} mm</strong>
              </div>
            </div>
          </div>

          {/* Hourly Temperature & Rain Forecast (24 Hours) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0f766e]" />
                <span>Next 24 Hours Atmospheric Progression</span>
              </h3>
              <span className="text-[10px] font-mono text-[#64748b]">
                Hourly forecast
              </span>
            </div>

            <div className="border border-[#cbd5e1] rounded-xs bg-[#f8fafc] p-3 overflow-x-auto">
              <div className="flex gap-4 min-w-[720px]">
                {weather.hourly.slice(0, 16).map((h, idx) => {
                  const hourLabel = new Date(h.time).toLocaleTimeString('en-IN', {
                    hour: 'numeric',
                    hour12: true,
                  });
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-between py-1 px-2 border-r last:border-r-0 border-[#e2e8f0] text-center"
                    >
                      <span className="text-[10px] font-mono text-[#64748b] whitespace-nowrap">
                        {hourLabel}
                      </span>
                      <div className="my-2">
                        {getWeatherIcon(h.weatherCode, 'w-4 h-4')}
                      </div>
                      <span className="font-mono font-bold text-xs text-[#0f172a]">
                        {h.temperature.toFixed(0)}°
                      </span>
                      {h.precipitationProbability > 0 && (
                        <span className="text-[9px] font-mono text-[#2563eb] mt-1 font-semibold">
                          {h.precipitationProbability}% rain
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 7-Day Extended Forecast */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>7-Day Synoptic Weather Outlook</span>
              </h3>
              <span className="text-[10px] font-mono text-[#64748b]">
                Daily max/min & precipitation probability
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {weather.daily.map((d, idx) => {
                const dayLabel = new Date(d.date).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
                return (
                  <div
                    key={idx}
                    className="p-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-xs text-xs flex flex-col justify-between hover:border-[#0f766e] transition-colors"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#64748b] uppercase font-semibold">
                        {idx === 0 ? 'Today' : dayLabel}
                      </div>
                      <div className="my-2 flex items-center justify-center">
                        {getWeatherIcon(d.weatherCode, 'w-6 h-6')}
                      </div>
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold text-[#0f172a]">{d.tempMax.toFixed(0)}°</span>
                        <span className="text-[#64748b]">{d.tempMin.toFixed(0)}°</span>
                      </div>
                    </div>
                    {d.precipitationProbabilityMax > 0 && (
                      <div className="mt-2 pt-1 border-t border-[#e2e8f0] text-[10px] font-mono text-[#2563eb] text-center font-medium">
                        {d.precipitationProbabilityMax}% • {d.precipitationSum.toFixed(1)}mm
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attribution Footer */}
          <div className="pt-2 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748b]">
            <div className="flex items-center gap-1.5">
              <span>Source:</span>
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0f766e] hover:underline flex items-center gap-0.5"
              >
                <span>Open-Meteo Weather API</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span>(WMO Non-Commercial License)</span>
            </div>
            <div>
              Spatial resolution: ~2.5km High-Res Atmospheric Grid
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
