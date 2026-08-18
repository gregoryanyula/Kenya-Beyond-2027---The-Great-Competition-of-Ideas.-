import React, { useState, useEffect } from "react";
import { 
  X, 
  Bookmark, 
  Trash2, 
  Columns, 
  ArrowRight, 
  ExternalLink, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Layers, 
  FileSpreadsheet, 
  Share2, 
  Compass, 
  Filter, 
  RotateCcw,
  Bell,
  BellRing,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";

export const CivicWatchlistDrawer: React.FC = () => {
  const { 
    watchlist, 
    removeFromWatchlist, 
    clearWatchlist, 
    isWatchlistOpen, 
    setIsWatchlistOpen,
    startSideBySideComparison,
    suggestedDomains,
    activeInterestFilter,
    setActiveInterestFilter,
    viewHistory,
    clearViewHistory
  } = useCivicWatchlist();

  // Civic Alerts Subscription State
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem("kenya2027_civic_alerts_subscribed") === "true";
    } catch {
      return true; // Default enabled
    }
  });

  const [alertChannels, setAlertChannels] = useState<{
    factChecks: boolean;
    auditorGeneral: boolean;
    debates: boolean;
  }>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_civic_alert_channels");
      return saved ? JSON.parse(saved) : { factChecks: true, auditorGeneral: true, debates: true };
    } catch {
      return { factChecks: true, auditorGeneral: true, debates: true };
    }
  });

  const [testNotificationToast, setTestNotificationToast] = useState<string | null>(null);

  const handleToggleAlerts = (checked: boolean) => {
    setAlertsEnabled(checked);
    try {
      localStorage.setItem("kenya2027_civic_alerts_subscribed", String(checked));
    } catch (e) {
      console.warn("Storage error:", e);
    }
    if (checked) {
      setTestNotificationToast("🔔 Civic Alerts Active: You will be notified when new fact-checks or OAG reports are published for tracked policies!");
      setTimeout(() => setTestNotificationToast(null), 4000);
    }
  };

  const handleToggleChannel = (channel: "factChecks" | "auditorGeneral" | "debates") => {
    const updated = { ...alertChannels, [channel]: !alertChannels[channel] };
    setAlertChannels(updated);
    try {
      localStorage.setItem("kenya2027_civic_alert_channels", JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  };

  if (!isWatchlistOpen) return null;

  // Filter watchlist items if an active interest filter is selected
  const filteredWatchlist = activeInterestFilter
    ? watchlist.filter((item) => 
        item.domain.toLowerCase().includes(activeInterestFilter.toLowerCase()) || 
        activeInterestFilter.toLowerCase().includes(item.domain.toLowerCase())
      )
    : watchlist;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                  My Civic Watchlist
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono border border-emerald-800">
                    {watchlist.length} Saved
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Persistent policy bookmarks & personalized scrutiny radar
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWatchlistOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User-Interest Suggestions & Filter Section */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Suggested For You (Based on Viewed History)</span>
              </div>
              {viewHistory.length > 0 && (
                <button
                  onClick={clearViewHistory}
                  title="Reset reading history"
                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {suggestedDomains.length > 0 ? (
              <div className="space-y-1.5">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setActiveInterestFilter(null)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                      activeInterestFilter === null
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    All Domains ({watchlist.length})
                  </button>
                  {suggestedDomains.map((sug, idx) => {
                    const isSelected = activeInterestFilter === sug.domain;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveInterestFilter(isSelected ? null : sug.domain)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1 border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                        }`}
                        title={sug.reason}
                      >
                        <span>{sug.domain.split("&")[0].trim()}</span>
                        <span className={`text-[8px] font-mono px-1 rounded ${isSelected ? "bg-blue-800 text-blue-100" : "bg-slate-100 text-slate-500"}`}>
                          {sug.score}% Match
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtitle explaining active suggestion reason */}
                {suggestedDomains[0] && (
                  <p className="text-[10px] text-slate-500 italic line-clamp-1">
                    💡 {suggestedDomains.find(s => s.domain === activeInterestFilter)?.reason || suggestedDomains[0].reason}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-[10px] text-slate-500">
                Explore policies to receive personalized civic interest suggestions.
              </p>
            )}
          </div>

          {/* Action Bar */}
          {watchlist.length > 0 && (
            <div className="px-5 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between text-xs">
              <button
                onClick={() => startSideBySideComparison()}
                disabled={watchlist.length < 2}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shadow-xs ${
                  watchlist.length >= 2
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
                title={watchlist.length < 2 ? "Save at least 2 items to compare" : "Compare 2 policies"}
              >
                <Columns className="w-3.5 h-3.5 text-emerald-400" />
                <span>Side-by-Side Review</span>
              </button>

              <button
                onClick={clearWatchlist}
                className="text-slate-500 hover:text-rose-600 font-semibold flex items-center space-x-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}

          {/* CIVIC ALERTS & FACT-CHECK SUBSCRIPTION TOGGLE */}
          <div className="p-4 bg-amber-50/50 border-b border-amber-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center">
                  <BellRing className="w-3.5 h-3.5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Civic Alert Notifications</span>
                  <span className="text-[10px] text-slate-500 block">Instant alerts for new fact-checks & audits</span>
                </div>
              </div>

              {/* Master Switch Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertsEnabled}
                  onChange={(e) => handleToggleAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {alertsEnabled && (
              <div className="space-y-1.5 pt-1">
                <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                  <button
                    onClick={() => handleToggleChannel("factChecks")}
                    className={`p-1.5 rounded-lg border text-center font-bold transition-all ${
                      alertChannels.factChecks
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-white text-slate-400 border-slate-200"
                    }`}
                  >
                    🔍 Fact-Checks
                  </button>
                  <button
                    onClick={() => handleToggleChannel("auditorGeneral")}
                    className={`p-1.5 rounded-lg border text-center font-bold transition-all ${
                      alertChannels.auditorGeneral
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-white text-slate-400 border-slate-200"
                    }`}
                  >
                    📊 OAG Reports
                  </button>
                  <button
                    onClick={() => handleToggleChannel("debates")}
                    className={`p-1.5 rounded-lg border text-center font-bold transition-all ${
                      alertChannels.debates
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-white text-slate-400 border-slate-200"
                    }`}
                  >
                    📅 Debates
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Notifies on candidate manifesto updates</span>
                  <button
                    onClick={() => {
                      setTestNotificationToast("🔔 [Simulated Alert] PesaCheck verified: Agricultural fertilizer voucher claim is 'Supported by KNBS Data'.");
                      setTimeout(() => setTestNotificationToast(null), 4500);
                    }}
                    className="text-amber-800 font-bold hover:underline"
                  >
                    Send Test Alert
                  </button>
                </div>
              </div>
            )}

            {/* Test Alert Toast */}
            {testNotificationToast && (
              <div className="p-2.5 rounded-lg bg-emerald-900 text-emerald-100 text-[11px] font-medium border border-emerald-700 animate-in fade-in flex items-start space-x-1.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{testNotificationToast}</span>
              </div>
            )}
          </div>

          {/* Watchlist Items Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {filteredWatchlist.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  {activeInterestFilter ? "No Items in this Domain" : "Your Watchlist is Empty"}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {activeInterestFilter ? (
                    <span>
                      You don't have saved bookmarks under "{activeInterestFilter}". Clear filter or bookmark proposals in this area.
                    </span>
                  ) : (
                    "Click the bookmark icon on any policy proposal, candidate pledge, opposition alternative, or scorecard item to save it here for tracking."
                  )}
                </p>
                {activeInterestFilter && (
                  <button
                    onClick={() => setActiveInterestFilter(null)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    View all saved items ({watchlist.length})
                  </button>
                )}
              </div>
            ) : (
              filteredWatchlist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {item.domain}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromWatchlist(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                      title="Remove from Watchlist"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Key Metrics Pill Row */}
                  {item.keyMetrics && item.keyMetrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {item.keyMetrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-slate-50 border border-slate-100 text-[10px]">
                          <span className="text-slate-400 block font-medium uppercase text-[8px]">{m.label}</span>
                          <span className="font-bold text-slate-800 truncate block">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Footer Info */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">Source: {item.source}</span>
                    {item.rigorScore && (
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-mono">
                        Rigor: {item.rigorScore}/10
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved locally in browser</span>
            </span>
            {watchlist.length >= 2 && (
              <button
                onClick={() => startSideBySideComparison()}
                className="text-emerald-700 font-bold hover:underline flex items-center space-x-1"
              >
                <span>Compare Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
