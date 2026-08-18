import React, { useState } from "react";
import { 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  TrendingDown, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Columns3, 
  LayoutGrid, 
  Layers, 
  Sparkles, 
  Info, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  AlertCircle,
  Compass,
  BarChart3,
  TrendingUp,
  Share2,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  ReferenceLine
} from "recharts";
import { OPPOSITION_ACCOUNTABILITY_DATA, PARTY_MANIFESTO_COMPARISONS } from "../data/accountabilityData";
import { ScenarioSimulator } from "./ScenarioSimulator";
import { OppositionSocialShareModal } from "./OppositionSocialShareModal";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";
import { CivicTerm } from "./CivicTerm";

// Economic Impact Projections Data across the 4 Political/Policy Blocs
const MANIFESTO_ECONOMIC_IMPACT_DATA = [
  {
    indicator: "GDP Growth Rate",
    unit: "%",
    incumbent: 5.8,
    mainOpposition: 6.2,
    thirdPole: 7.1,
    civilSociety: 6.5,
    benchmark2060: 8.0,
    category: "growth",
    description: "Projected annual real GDP expansion based on capital deployment and productivity."
  },
  {
    indicator: "Debt-to-GDP Ceiling",
    unit: "%",
    incumbent: 64.5,
    mainOpposition: 58.0,
    thirdPole: 48.5,
    civilSociety: 42.0,
    benchmark2060: 45.0,
    category: "fiscal",
    description: "Sovereign debt exposure as percentage of national GDP (lower is safer)."
  },
  {
    indicator: "Formal Jobs (k/yr)",
    unit: "k",
    incumbent: 380,
    mainOpposition: 450,
    thirdPole: 620,
    civilSociety: 510,
    benchmark2060: 700,
    category: "employment",
    description: "Annual net formal wage employment creation in modern enterprises."
  },
  {
    indicator: "Manufacturing GDP",
    unit: "%",
    incumbent: 9.8,
    mainOpposition: 12.5,
    thirdPole: 18.0,
    civilSociety: 15.0,
    benchmark2060: 20.0,
    category: "growth",
    description: "Industrial manufacturing value addition as percentage of total GDP."
  },
  {
    indicator: "Devolution County Share",
    unit: "%",
    incumbent: 18.5,
    mainOpposition: 35.0,
    thirdPole: 30.0,
    civilSociety: 38.0,
    benchmark2060: 35.0,
    category: "devolution",
    description: "Percentage of national audited ordinary revenue disbursed to 47 counties."
  },
  {
    indicator: "Revenue-to-GDP Ratio",
    unit: "%",
    incumbent: 16.8,
    mainOpposition: 15.2,
    thirdPole: 19.5,
    civilSociety: 21.0,
    benchmark2060: 22.0,
    category: "fiscal",
    description: "Domestic ordinary tax collection efficiency relative to economic size."
  }
];

export const OppositionAlternativeMatrix: React.FC = () => {
  const [viewMode, setViewMode] = useState<"matrix" | "cards" | "simulator">("matrix");
  const [selectedDomainId, setSelectedDomainId] = useState<string>(PARTY_MANIFESTO_COMPARISONS[0].domainId);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRigor, setFilterRigor] = useState("All");
  const [chartCategory, setChartCategory] = useState<string>("all");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { addToWatchlist, isItemInWatchlist, removeFromWatchlist } = useCivicWatchlist();

  const selectedDomainData = PARTY_MANIFESTO_COMPARISONS.find(
    (d) => d.domainId === selectedDomainId
  ) || PARTY_MANIFESTO_COMPARISONS[0];


  const filteredCardsData = OPPOSITION_ACCOUNTABILITY_DATA.filter((item) => {
    const matchesRigor = filterRigor === "All" || item.rigorLevel.includes(filterRigor);
    const matchesSearch = 
      item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.criticismRaised.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.proposedAlternative.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRigor && matchesSearch;
  });

  const filteredChartData = chartCategory === "all" 
    ? MANIFESTO_ECONOMIC_IMPACT_DATA 
    : MANIFESTO_ECONOMIC_IMPACT_DATA.filter((d) => d.category === chartCategory);

  return (
    <div className="space-y-8" id="opposition-accountability-section">
      {/* Header Explainer & View Toggle */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
              <Scale className="w-3.5 h-3.5 text-blue-700" />
              <span>Multi-Party Alternative Policy Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Contrast Manifestos & Alternative Policy Blueprints
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Kenya’s 2027 election is not a referendum on personalities—it is a side-by-side competition of governing models. Evaluate incumbent pledges, parliamentary opposition counters, third-pole reform agendas, civil society evidence models, and simulate long-term 2060 development goal trajectories.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0 self-start lg:self-center gap-1">
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === "matrix"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Columns3 className="w-4 h-4" />
              <span>Side-by-Side Matrix</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === "cards"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Detailed Card Feed</span>
            </button>
            <button
              onClick={() => setViewMode("simulator")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === "simulator"
                  ? "bg-blue-800 text-white shadow-xs"
                  : "text-blue-700 hover:text-blue-900 bg-blue-50/60"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>2060 Scenario Simulator</span>
            </button>
          </div>
        </div>

        {/* View-Specific Navigation / Filters */}
        {viewMode === "matrix" && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              Select Policy Domain for Side-by-Side Contrast:
            </div>
            <div className="flex flex-wrap gap-2">
              {PARTY_MANIFESTO_COMPARISONS.map((domain) => (
                <button
                  key={domain.domainId}
                  onClick={() => setSelectedDomainId(domain.domainId)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all border ${
                    selectedDomainId === domain.domainId
                      ? "bg-blue-900 text-white border-blue-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {domain.domainName}
                </button>
              ))}
            </div>
          </div>
        )}

        {viewMode === "cards" && (
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {["All", "High Detail", "Medium Detail"].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterRigor(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    filterRigor === level
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {level === "All" ? "All Alternative Proposals" : `${level} Only`}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alternatives..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* MATRIX VIEW: Side-by-Side Comparison */}
      {viewMode === "matrix" && (
        <div className="space-y-6">
          {/* Domain Problem Statement Banner */}
          <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Policy Challenge Spotlight</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{selectedDomainData.domainName}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
                {selectedDomainData.keyProblemStatement}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                id="share-matrix-social-btn"
                title="Generate shareable visual summary for WhatsApp and social platforms"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Summary Card</span>
              </button>
              <div className="px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-slate-300">
                4 Blocs Compared
              </div>
            </div>
          </div>

          {/* 4-Column Side-by-Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {selectedDomainData.proposals.map((proposal) => {
              const getBadgeColors = (blocId: string) => {
                switch (blocId) {
                  case "incumbent":
                    return {
                      border: "border-amber-200",
                      badge: "bg-amber-100 text-amber-900 border-amber-300",
                      headerBg: "bg-amber-50/50",
                      accentText: "text-amber-800",
                    };
                  case "main-opposition":
                    return {
                      border: "border-blue-200",
                      badge: "bg-blue-100 text-blue-900 border-blue-300",
                      headerBg: "bg-blue-50/50",
                      accentText: "text-blue-800",
                    };
                  case "third-pole":
                    return {
                      border: "border-emerald-200",
                      badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
                      headerBg: "bg-emerald-50/50",
                      accentText: "text-emerald-800",
                    };
                  case "civil-society":
                  default:
                    return {
                      border: "border-purple-200",
                      badge: "bg-purple-100 text-purple-900 border-purple-300",
                      headerBg: "bg-purple-50/50",
                      accentText: "text-purple-800",
                    };
                }
              };

              const styles = getBadgeColors(proposal.blocId);
              const proposalId = `matrix-${selectedDomainData.domainId}-${proposal.blocId}`;
              const isSaved = isItemInWatchlist(proposalId);

              const handleToggleProposalWatchlist = () => {
                if (isSaved) {
                  removeFromWatchlist(proposalId);
                } else {
                  addToWatchlist({
                    id: proposalId,
                    type: "opposition_proposal",
                    title: `${proposal.coalitionOrParty}: ${proposal.coreProposalTitle}`,
                    subtitle: `${proposal.blocName} • ${selectedDomainData.domainName}`,
                    domain: selectedDomainData.domainName,
                    tag: proposal.coalitionOrParty,
                    source: "Multi-Party Alternative Matrix",
                    rigorScore: proposal.rigorScore,
                    article201Status: proposal.rigorBadge,
                    summaryNote: `${proposal.mechanism} Financing: ${proposal.financingSource} (${proposal.costEstimate})`,
                    keyMetrics: [
                      { label: "Cost", value: proposal.costEstimate },
                      { label: "Financing", value: proposal.financingSource },
                      { label: "First 100 Days", value: proposal.first100DaysAction }
                    ]
                  });
                }
              };

              return (
                <div
                  key={proposal.blocId}
                  className={`bg-white rounded-xl border ${styles.border} shadow-xs flex flex-col justify-between overflow-hidden`}
                >
                  {/* Card Header */}
                  <div className={`p-5 ${styles.headerBg} border-b border-slate-100`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${styles.badge}`}>
                        {proposal.coalitionOrParty}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700">
                        <button
                          onClick={handleToggleProposalWatchlist}
                          className={`p-1 rounded transition-colors ${
                            isSaved ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-slate-600"
                          }`}
                          title={isSaved ? "Remove from Watchlist" : "Save to Civic Watchlist"}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                        <div className="flex items-center gap-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{proposal.rigorScore}/10</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      {proposal.blocName}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                      {proposal.coreProposalTitle}
                    </h4>
                  </div>


                  {/* Body Criteria Breakdown */}
                  <div className="p-5 space-y-4 text-xs flex-1">
                    {/* Implementation Mechanism */}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>Mechanism & Delivery</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {proposal.mechanism}
                      </p>
                    </div>

                    {/* Cost & Financing */}
                    <div className="grid grid-cols-1 gap-2">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                          Fiscal Target / Cost:
                        </span>
                        <span className="font-semibold text-slate-900">{proposal.costEstimate}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                          Funding Source:
                        </span>
                        <span className="text-slate-800">{proposal.financingSource}</span>
                      </div>
                    </div>

                    {/* Empirical Evidence */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Empirical Evidence / Precedent:
                      </span>
                      <p className="text-slate-700 leading-relaxed italic text-[11px]">
                        "{proposal.empiricalEvidence}"
                      </p>
                    </div>

                    {/* First 100 Days */}
                    <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                      <div className="text-[10px] font-black uppercase tracking-wider text-blue-900 flex items-center gap-1 mb-0.5">
                        <Calendar className="w-3 h-3 text-blue-700" />
                        <span>First 100-Day Target:</span>
                      </div>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        {proposal.first100DaysAction}
                      </p>
                    </div>

                    {/* Trade-offs & Risks */}
                    <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100">
                      <div className="text-[10px] font-black uppercase tracking-wider text-rose-900 flex items-center gap-1 mb-0.5">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        <span>Trade-off / Risk:</span>
                      </div>
                      <p className="text-slate-800 text-[11px] leading-relaxed">
                        {proposal.tradeOffsAndRisks}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500">Rigor Level</span>
                    <span className="font-bold text-slate-900">{proposal.rigorBadge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Recharts Comparative Bar Chart for Kenya 2060 Indicators */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 mb-1">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Recharts Economic Visualizer</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Comparative Economic Projections on Kenya 2060 Indicators
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Modeling the projected performance of the 4 competing party manifestos across core macroeconomic, fiscal, employment, and devolution benchmarks.
                </p>
              </div>

              {/* Indicator Category Filter */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
                <button
                  onClick={() => setChartCategory("all")}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    chartCategory === "all"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Indicators
                </button>
                <button
                  onClick={() => setChartCategory("growth")}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    chartCategory === "growth"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Growth & Mfg
                </button>
                <button
                  onClick={() => setChartCategory("fiscal")}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    chartCategory === "fiscal"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Debt & Revenue
                </button>
                <button
                  onClick={() => setChartCategory("employment")}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    chartCategory === "employment"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Jobs & Wages
                </button>
                <button
                  onClick={() => setChartCategory("devolution")}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                    chartCategory === "devolution"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Devolution
                </button>
              </div>
            </div>

            {/* Recharts Bar Chart Container */}
            <div className="h-80 sm:h-96 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredChartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                  barGap={4}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="indicator" 
                    tick={{ fill: "#334155", fontSize: 11, fontWeight: 700 }}
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis 
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickLine={false}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const currentItem = filteredChartData.find((d) => d.indicator === label);
                      return (
                        <div className="bg-slate-950 text-white p-3.5 rounded-xl shadow-2xl border border-slate-800 text-xs space-y-2 max-w-xs">
                          <div className="border-b border-slate-800 pb-1.5">
                            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                              Indicator Benchmark
                            </span>
                            <span className="font-bold text-sm text-white">{label}</span>
                            {currentItem && (
                              <p className="text-[10px] text-slate-400 mt-0.5">{currentItem.description}</p>
                            )}
                          </div>
                          <div className="space-y-1 font-mono">
                            <div className="flex items-center justify-between text-amber-300">
                              <span>Incumbent (Supply-Side):</span>
                              <span className="font-bold">{payload[0]?.value} {currentItem?.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-blue-300">
                              <span>Opposition (Demand-Led):</span>
                              <span className="font-bold">{payload[1]?.value} {currentItem?.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-emerald-300">
                              <span>Third-Pole (Export-Led):</span>
                              <span className="font-bold">{payload[2]?.value} {currentItem?.unit}</span>
                            </div>
                            <div className="flex items-center justify-between text-purple-300">
                              <span>Civil Society Blueprint:</span>
                              <span className="font-bold">{payload[3]?.value} {currentItem?.unit}</span>
                            </div>
                            {currentItem?.benchmark2060 && (
                              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800 text-[11px]">
                                <span>2060 Benchmark Target:</span>
                                <span className="font-bold text-white">{currentItem.benchmark2060} {currentItem.unit}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: 16, fontSize: 11, fontWeight: 700 }} 
                  />
                  <Bar 
                    name="Incumbent (Supply-Side)" 
                    dataKey="incumbent" 
                    fill="#d97706" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    name="Main Opposition (Demand-Led)" 
                    dataKey="mainOpposition" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    name="Third-Pole (Export Value-Add)" 
                    dataKey="thirdPole" 
                    fill="#059669" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    name="Civil Society (Katiba Equity)" 
                    dataKey="civilSociety" 
                    fill="#7c3aed" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Macroeconomic Insights Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 text-xs space-y-1">
                <span className="font-bold text-amber-900 block">Incumbent Model</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Prioritizes capital-intensive state financing, resulting in higher debt levels (64.5%) but immediate infrastructure execution.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/40 text-xs space-y-1">
                <span className="font-bold text-blue-900 block">Opposition Model</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Prioritizes tax relief & 35% devolution transfers, boosting household disposable income but requiring aggressive administrative spending cuts.
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/40 text-xs space-y-1">
                <span className="font-bold text-emerald-900 block">Third-Pole Model</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Drives private-sector export industrialization, achieving the highest GDP growth (7.1%) and 620k formal jobs/yr at lower debt exposure (48.5%).
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/40 text-xs space-y-1">
                <span className="font-bold text-purple-900 block">Civil Society Blueprint</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Anchored in Article 201 public finance integrity and judicial enforcement, maximizing revenue efficiency (21.0%) with lowest debt (42.0%).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARD FEED VIEW: Existing Rigorous Scrutiny Feed */}
      {viewMode === "cards" && (
        <div className="space-y-6">
          {filteredCardsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                    {item.domain}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    Opposition Scrutiny & Alternative Blueprint
                  </h3>
                </div>
                <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                  {item.rigorLevel}
                </span>
              </div>

              {/* Critique vs Proposed Alternative */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Criticism */}
                <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-200 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Criticism of Current Policy:</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {item.criticismRaised}
                  </p>
                </div>

                {/* Alternative */}
                <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Proposed Alternative Plan:</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {item.proposedAlternative}
                  </p>
                </div>
              </div>

              {/* Cost, Financing, Evidence & Mechanism */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-1">Fiscal Cost Estimate:</span>
                  <p className="text-slate-700 leading-relaxed">{item.costEstimate}</p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-1">Revenue / Financing Source:</span>
                  <p className="text-slate-700 leading-relaxed">{item.financingSource}</p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-1">Empirical Evidence:</span>
                  <p className="text-slate-700 leading-relaxed">{item.empiricalEvidence}</p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-1">Implementation Mechanism:</span>
                  <p className="text-slate-700 leading-relaxed">{item.implementationMechanism}</p>
                </div>
              </div>

              {/* Trade-offs & Citizen Scrutiny */}
              <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-1">
                  Real Trade-Offs for Citizens to Consider:
                </span>
                <p className="text-amber-950 leading-relaxed">
                  {item.tradeOffsForCitizens}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 3: 2060 Long-Term Scenario Simulator */}
      {viewMode === "simulator" && (
        <ScenarioSimulator />
      )}

      {/* Social & WhatsApp Image Summary Modal */}
      <OppositionSocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        domainData={selectedDomainData}
      />
    </div>
  );
};


