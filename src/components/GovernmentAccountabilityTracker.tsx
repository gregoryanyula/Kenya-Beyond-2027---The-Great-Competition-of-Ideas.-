import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  FileSpreadsheet, 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Layers, 
  ArrowUpRight, 
  Info, 
  Scale, 
  Video,
  Vote
} from "lucide-react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  GOVERNMENT_ACCOUNTABILITY_DATA, 
  BUDGET_TRENDS_DATA, 
  SECTOR_ABSORPTION_DATA 
} from "../data/accountabilityData";
import { PolicyVsPromisesScorecard } from "./PolicyVsPromisesScorecard";
import { EnhancedDebatePlayback } from "./EnhancedDebatePlayback";
import { LiveDebatePoll } from "./LiveDebatePoll";

export const GovernmentAccountabilityTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"visualizer" | "scorecard" | "live_poll" | "records" | "debate_playback">("visualizer");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const safeSearch = (searchQuery || "").toLowerCase();

  const filteredData = GOVERNMENT_ACCOUNTABILITY_DATA.filter((item) => {
    const matchesStatus = filterStatus === "All" || item.deliveryStatus === filterStatus;
    const matchesSearch = 
      (item.title || "").toLowerCase().includes(safeSearch) ||
      (item.manifestoPromise || "").toLowerCase().includes(safeSearch) ||
      (item.whatHappened || "").toLowerCase().includes(safeSearch) ||
      (item.domain || "").toLowerCase().includes(safeSearch);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "In Progress":
        return "bg-blue-50 text-blue-800 border-blue-300";
      case "Delayed":
        return "bg-amber-50 text-amber-800 border-amber-300";
      case "Under Scrutiny":
        return "bg-purple-50 text-purple-800 border-purple-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="space-y-8" id="government-accountability-section">
      {/* Explainer Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Non-Partisan Incumbent Record & Fiscal Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              “What Was Promised, What Happened, What Did It Cost, and What Remains?”
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Auditing the record of the government with strict empirical impartiality. Explore national budget allocation trends, revenue vs. debt service growth, and live citizen evidence consensus polls alongside sector delivery records.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0 self-start lg:self-center gap-1">
            <button
              onClick={() => setActiveTab("visualizer")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "visualizer"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Budget Visualizer</span>
            </button>
            <button
              onClick={() => setActiveTab("scorecard")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "scorecard"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Policy vs Promises</span>
            </button>
            <button
              onClick={() => setActiveTab("live_poll")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "live_poll"
                  ? "bg-emerald-700 text-white shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab-live-debate-poll"
            >
              <Vote className="w-4 h-4 text-emerald-300" />
              <span>Live Evidence Poll</span>
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "records"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Audit Feed</span>
            </button>
            <button
              onClick={() => setActiveTab("debate_playback")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "debate_playback"
                  ? "bg-rose-700 text-white shadow-xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id="tab-debate-playback-btn"
            >
              <Video className="w-4 h-4 text-amber-300" />
              <span>Debate Playback</span>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping inline-block"></span>
            </button>
          </div>
        </div>

        {/* Tab Specific Controls */}
        {activeTab === "records" && (
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {["All", "Completed", "In Progress", "Delayed", "Under Scrutiny"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    filterStatus === status
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter commitments..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* LIVE EVIDENCE POLL TAB */}
      {activeTab === "live_poll" && (
        <LiveDebatePoll />
      )}

      {/* VISUALIZER TAB */}
      {activeTab === "visualizer" && (
        <div className="space-y-8">
          {/* Key Stat Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                FY 2024/25 Total Budget
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900">KES 3.99 T</div>
              <p className="text-[11px] text-slate-500 mt-1">Total planned national + county expenditure</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block mb-1">
                Debt Service Share
              </span>
              <div className="text-2xl font-bold font-mono text-amber-900">KES 1.84 T (64%)</div>
              <p className="text-[11px] text-slate-500 mt-1">Share of ordinary tax revenues committed to debt</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block mb-1">
                Dev Budget Share
              </span>
              <div className="text-2xl font-bold font-mono text-blue-900">KES 707 B (18%)</div>
              <p className="text-[11px] text-slate-500 mt-1">Capital investment in roads, water & hospitals</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block mb-1">
                County Equitable Share
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-900">KES 400.1 B</div>
              <p className="text-[11px] text-slate-500 mt-1">Devolution allocation to 47 counties</p>
            </div>
          </div>

          {/* Chart 1: Budget Allocation vs Debt Service Trends */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                  Fiscal Growth & Debt Pressure
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Historical Budget Trajectory vs Sovereign Debt Service (KES Billions)
                </h3>
                <p className="text-xs text-slate-500">
                  Comparing Total Budget, Ordinary Tax Revenue, and Debt Service from FY 2021/22 to Projected FY 2026/27
                </p>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={BUDGET_TRENDS_DATA} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="fiscalYear" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `${val}B`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "none", color: "#fff", fontSize: "12px" }}
                    formatter={(value: any, name: any) => [`KES ${value} Billion`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Bar dataKey="totalBudget" name="Total Approved Budget" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ordinaryRevenue" name="KRA Tax Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="debtService" name="Debt Service (Interest + Principal)" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="developmentExpenditure" name="Development Expenditure" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Analytical Takeaway:</strong> Debt service costs have grown faster than tax revenue growth over the 5-year cycle, leaving minimal fiscal space for development projects unless non-debt domestic productivity expands significantly.
              </span>
            </div>
          </div>

          {/* Chart 2: Sector Budget Absorption Rates vs Bottlenecks */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                Implementation Capacity
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Sector Budget Absorption Performance (Recurrent vs. Development)
              </h3>
              <p className="text-xs text-slate-500">
                While recurrent operational budgets (salaries) absorb over 95%, capital development projects routinely face procurement delays, exchequer release freezes, and pending bills bottlenecks.
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SECTOR_ABSORPTION_DATA} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="sector" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(val) => `${val}%`} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "none", color: "#fff", fontSize: "12px" }}
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Bar dataKey="recurrentAbsorption" name="Recurrent Absorption %" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="developmentAbsorption" name="Development Absorption %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sector Deep Dive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {SECTOR_ABSORPTION_DATA.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{sec.sector}</span>
                    <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded">
                      KES {sec.allocated}B
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Absorption Rate:</span>
                      <span className={`font-bold font-mono ${sec.absorptionRate < 80 ? "text-rose-600" : "text-emerald-700"}`}>
                        {sec.absorptionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${sec.absorptionRate < 80 ? "bg-rose-500" : "bg-emerald-500"}`} 
                        style={{ width: `${sec.absorptionRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-1 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-600 block mb-0.5">Primary Bottleneck:</span>
                    <p className="text-[11px] text-slate-600 leading-snug">{sec.keyBottleneck}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POLICY VS PROMISES SCORECARD TAB */}
      {activeTab === "scorecard" && (
        <PolicyVsPromisesScorecard />
      )}

      {/* ITEMIZED RECORDS AUDIT FEED */}
      {activeTab === "records" && (
        <div className="space-y-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5"
            >
              {/* Title & Status Badge */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {item.domain}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {item.title}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border ${getStatusBadge(item.deliveryStatus)}`}>
                  {item.deliveryStatus}
                </span>
              </div>

              {/* The 4-Question Accountability Audit Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. What was promised */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    1. What Was Promised:
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {item.manifestoPromise}
                  </p>
                </div>

                {/* 2. What happened */}
                <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                    2. What Happened (Actual Delivery):
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {item.whatHappened}
                  </p>
                </div>

                {/* 3. Cost & Financing */}
                <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-200 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-900">
                    3. Cost & Financing Mechanism:
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {item.costAndFinancing}
                  </p>
                </div>

                {/* 4. What remains */}
                <div className="p-4 rounded-lg bg-purple-50/50 border border-purple-200 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-purple-900">
                    4. What Remains / Bottlenecks:
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {item.whatRemains}
                  </p>
                </div>
              </div>

              {/* Context & Nuance: External vs Government Factors & Official Explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
                  <span className="font-bold text-slate-900 block mb-1">
                    External vs Internal Government Factors:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {item.externalVsGovFactors}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
                  <span className="font-bold text-slate-900 block mb-1">
                    Official Government Perspective:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {item.officialExplanation}
                  </p>
                </div>
              </div>

              {/* Independent Sources Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold">Independent Evidence:</span>
                  <span className="text-slate-600">{item.independentEvidenceStatus}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 font-mono text-[10px]">Sources:</span>
                  {item.sources.map((s, idx) => (
                    <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DEBATE PLAYBACK TAB */}
      {activeTab === "debate_playback" && (
        <EnhancedDebatePlayback />
      )}
    </div>
  );
};

