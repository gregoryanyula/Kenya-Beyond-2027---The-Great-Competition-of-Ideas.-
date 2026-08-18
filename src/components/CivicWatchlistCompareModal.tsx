import React from "react";
import { 
  X, 
  Columns, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bookmark
} from "lucide-react";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";

export const CivicWatchlistCompareModal: React.FC = () => {
  const { 
    watchlist, 
    comparisonItemIds, 
    setComparisonItemIds, 
    isComparisonModalOpen, 
    setIsComparisonModalOpen 
  } = useCivicWatchlist();

  if (!isComparisonModalOpen) return null;

  const [id1, id2] = comparisonItemIds;
  const item1 = watchlist.find((i) => i.id === id1) || watchlist[0] || null;
  const item2 = watchlist.find((i) => i.id === id2) || (watchlist[1] ? watchlist[1] : null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-slate-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Columns className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Civic Watchlist: Side-by-Side Policy Review
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Article 201 Rigor Test
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Compare two saved candidate pledges or policy alternatives on financing, constitutional feasibility, and 2060 delivery impact.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsComparisonModalOpen(false)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Selector Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Comparing Policy Option A:
            </label>
            <select
              value={item1?.id || ""}
              onChange={(e) => setComparisonItemIds([e.target.value, item2?.id || null])}
              className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {watchlist.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.domain}] {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Comparing Policy Option B:
            </label>
            <select
              value={item2?.id || ""}
              onChange={(e) => setComparisonItemIds([item1?.id || null, e.target.value])}
              className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {watchlist.map((item) => (
                <option key={item.id} value={item.id}>
                  [{item.domain}] {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Review Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-100/50">
          
          {/* COLUMN 1: Option A */}
          {item1 ? (
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item1.domain}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item1.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{item1.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item1.subtitle}</p>
              </div>

              {/* Rigor & Article 201 Status */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Policy Rigor Score</span>
                  <span className="text-lg font-black font-mono text-slate-900">
                    {item1.rigorScore || "7.5"} / 10
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-center">
                  <span className="text-[9px] font-bold text-emerald-700 uppercase block">Article 201 Status</span>
                  <span className="text-xs font-bold text-emerald-900 block mt-1">
                    {item1.article201Status || "Compliant"}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              {item1.keyMetrics && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Performance Indicators & Budget:
                  </span>
                  <div className="space-y-1.5">
                    {item1.keyMetrics.map((m, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{m.label}</span>
                        <span className="font-bold text-slate-900 font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evaluator Notes */}
              {item1.summaryNote && (
                <div className="p-3 rounded-lg bg-slate-900 text-white text-xs space-y-1">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Civic Scrutiny Note:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item1.summaryNote}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              Select an item to compare
            </div>
          )}

          {/* COLUMN 2: Option B */}
          {item2 ? (
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                    {item2.domain}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item2.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{item2.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item2.subtitle}</p>
              </div>

              {/* Rigor & Article 201 Status */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Policy Rigor Score</span>
                  <span className="text-lg font-black font-mono text-slate-900">
                    {item2.rigorScore || "6.8"} / 10
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-center">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block">Article 201 Status</span>
                  <span className="text-xs font-bold text-blue-900 block mt-1">
                    {item2.article201Status || "Compliant"}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              {item2.keyMetrics && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Performance Indicators & Budget:
                  </span>
                  <div className="space-y-1.5">
                    {item2.keyMetrics.map((m, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{m.label}</span>
                        <span className="font-bold text-slate-900 font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evaluator Notes */}
              {item2.summaryNote && (
                <div className="p-3 rounded-lg bg-slate-900 text-white text-xs space-y-1">
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider block">
                    Civic Scrutiny Note:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item2.summaryNote}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              Save more items to your watchlist to enable 2-way comparison
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 flex items-center space-x-1.5">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Non-Partisan Civic Evaluation Framework</span>
          </span>
          <button
            onClick={() => setIsComparisonModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            Close Review
          </button>
        </div>

      </div>
    </div>
  );
};
