import React, { useState, useMemo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import {
  Target,
  Sparkles,
  Scale,
  Award,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Layers,
  ChevronRight,
  Check,
  Zap,
  Bookmark,
  Share2
} from "lucide-react";
import { EvaluationResult } from "../types";

interface PolicyRadarComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPolicyTitle: string;
  currentDomain: string;
  currentEvaluationResult?: EvaluationResult | null;
}

interface BenchmarkPolicyOption {
  id: string;
  title: string;
  domain: string;
  actor: string;
  scores: {
    econ: number;
    health: number;
    edu: number;
    agri: number;
    tech: number;
    devol: number;
    climate: number;
  };
  summary: string;
}

const PRESET_COMPARISON_POLICIES: BenchmarkPolicyOption[] = [
  {
    id: "youth-tech",
    title: "Youth Tech Entrepreneurship & Digital Sovereign Hubs (290 Innovation Centers)",
    domain: "Technology & Youth Opportunities",
    actor: "General 2027 Candidate Proposal",
    scores: { econ: 7.8, health: 6.2, edu: 8.5, agri: 6.0, tech: 9.4, devol: 8.2, climate: 7.0 },
    summary: "Reallocates 5% USF fund to build 290 Constituency Innovation Centers targeting 300,000 youth in AI and remote tech."
  },
  {
    id: "free-tertiary",
    title: "Zero-Tuition Public University & TVET Expansion Model",
    domain: "Education & Skills Development",
    actor: "Social Democratic Coalition",
    scores: { econ: 6.2, health: 6.8, edu: 9.6, agri: 5.5, tech: 8.0, devol: 7.5, climate: 6.0 },
    summary: "Complete state capitation of public higher education funded via 1.5% statutory education levy on corporate taxable profits."
  },
  {
    id: "mega-irrigation",
    title: "Universal Solarized Irrigation & 50 Earth Mega-Dams Plan",
    domain: "Agriculture & Food Security",
    actor: "Agrarian Transformation Platform",
    scores: { econ: 8.4, health: 7.2, edu: 6.0, agri: 9.5, tech: 7.5, devol: 8.8, climate: 8.5 },
    summary: "Constructs 50 county-level community earth dams to irrigate 1.5 million acres in ASAL counties to guarantee food reserves."
  },
  {
    id: "zero-vat",
    title: "Zero-VAT on Food Essentials & Energy Tariffs Halving",
    domain: "Cost of Living & Inflation Reduction",
    actor: "Consumer Welfare Caucus",
    scores: { econ: 7.5, health: 7.0, edu: 6.5, agri: 8.0, tech: 6.2, devol: 6.8, climate: 6.5 },
    summary: "Zero-rates maize flour, cooking oil, electricity fuel costs, compensated by luxury excise duty rationalization."
  },
  {
    id: "universal-health",
    title: "Devolved Level 4/5 Referral Hospital Transformation (SHA Ringfence)",
    domain: "Healthcare Access & Affordability",
    actor: "Healthcare Reform Taskforce",
    scores: { econ: 7.0, health: 9.5, edu: 7.2, agri: 6.0, tech: 7.8, devol: 9.0, climate: 6.8 },
    summary: "Direct Treasury ringfencing of Primary Healthcare Fund to ensure uninterrupted drug supplies in all 47 counties."
  }
];

const PILLARS_METADATA = [
  { key: "econ", name: "Economic Stability", description: "Fiscal resilience, Article 201 debt sustainability, macro growth" },
  { key: "health", name: "Healthcare & Wellness", description: "Universal primary care, county referral equipment, maternal health" },
  { key: "edu", name: "Education & Skills", description: "CBC alignment, STEM university capacity, TVET readiness" },
  { key: "agri", name: "Food Sovereignty", description: "Irrigation infrastructure, grain reserves, farmer safety nets" },
  { key: "tech", name: "Digital & Industrial", description: "Broadband hubs, local manufacturing value add, green grids" },
  { key: "devol", name: "Devolution & Equity", description: "47-County spatial distribution, Equalization Fund adherence" },
  { key: "climate", name: "Climate Resilience", description: "Clean energy transition, 30% forest cover, water security" }
];

export const PolicyRadarComparisonModal: React.FC<PolicyRadarComparisonModalProps> = ({
  isOpen,
  onClose,
  currentPolicyTitle,
  currentDomain,
  currentEvaluationResult
}) => {
  const [selectedPolicyBId, setSelectedPolicyBId] = useState<string>(PRESET_COMPARISON_POLICIES[0].id);
  const [comparisonMode, setComparisonMode] = useState<"overlay" | "side-by-side">("overlay");

  // Derive Policy A's scores from currentEvaluationResult or domain defaults
  const policyAScores = useMemo(() => {
    const scores = currentEvaluationResult?.verdict_score;
    const isEcon = currentDomain.toLowerCase().includes("econ") || currentDomain.toLowerCase().includes("cost");
    const isHealth = currentDomain.toLowerCase().includes("health");
    const isEdu = currentDomain.toLowerCase().includes("edu") || currentDomain.toLowerCase().includes("cbc");
    const isAgri = currentDomain.toLowerCase().includes("agri") || currentDomain.toLowerCase().includes("food");
    const isTech = currentDomain.toLowerCase().includes("tech") || currentDomain.toLowerCase().includes("youth");
    const isDevol = currentDomain.toLowerCase().includes("devol") || currentDomain.toLowerCase().includes("count");
    const isInfra = currentDomain.toLowerCase().includes("housing") || currentDomain.toLowerCase().includes("infra");

    const baseRigor = scores ? scores.kenya_2060_alignment_score : 7.5;
    const fiscalRigor = scores ? scores.fiscal_realism_score : 6.8;
    const constRigor = scores ? scores.constitutional_viability_score : 8.0;
    const implRigor = scores ? scores.implementation_readiness_score : 7.2;

    return {
      econ: Math.min(10, Math.max(2, isEcon ? baseRigor : Math.round((fiscalRigor * 0.7 + baseRigor * 0.3) * 10) / 10)),
      health: Math.min(10, Math.max(2, isHealth ? Math.max(baseRigor, 8) : Math.round((baseRigor * 0.6 + implRigor * 0.4 - (isEcon ? 0.5 : 0)) * 10) / 10)),
      edu: Math.min(10, Math.max(2, isEdu ? Math.max(baseRigor, 8.5) : Math.round((baseRigor * 0.65 + constRigor * 0.35) * 10) / 10)),
      agri: Math.min(10, Math.max(2, isAgri ? Math.max(baseRigor, 8.2) : Math.round((baseRigor * 0.5 + fiscalRigor * 0.5) * 10) / 10)),
      tech: Math.min(10, Math.max(2, isTech || isInfra ? Math.max(baseRigor, 8.4) : Math.round((baseRigor * 0.7 + implRigor * 0.3) * 10) / 10)),
      devol: Math.min(10, Math.max(2, isDevol ? Math.max(baseRigor, 8.6) : Math.round((constRigor * 0.6 + baseRigor * 0.4) * 10) / 10)),
      climate: Math.min(10, Math.max(2, Math.round((baseRigor * 0.6 + constRigor * 0.3 + (isAgri || isInfra ? 1.0 : 0)) * 10) / 10))
    };
  }, [currentDomain, currentEvaluationResult]);

  const selectedPolicyB = useMemo(() => {
    return PRESET_COMPARISON_POLICIES.find((p) => p.id === selectedPolicyBId) || PRESET_COMPARISON_POLICIES[0];
  }, [selectedPolicyBId]);

  // Combined Radar Data for Recharts
  const comparativeRadarData = useMemo(() => {
    return PILLARS_METADATA.map((pillar) => {
      const scoreA = (policyAScores as any)[pillar.key] || 7.0;
      const scoreB = (selectedPolicyB.scores as any)[pillar.key] || 7.0;
      return {
        pillarName: pillar.name,
        pillarKey: pillar.key,
        policyA: scoreA,
        policyB: scoreB,
        kenya2060Target: 8.8,
        description: pillar.description
      };
    });
  }, [policyAScores, selectedPolicyB]);

  // Averages & Head to Head tallies
  const policyAAverage = useMemo(() => {
    const values = Object.values(policyAScores) as number[];
    const sum = values.reduce((a: number, b: number) => a + b, 0);
    return Math.round((sum / (values.length || 1)) * 10) / 10;
  }, [policyAScores]);

  const policyBAverage = useMemo(() => {
    const values = Object.values(selectedPolicyB.scores) as number[];
    const sum = values.reduce((a: number, b: number) => a + b, 0);
    return Math.round((sum / (values.length || 1)) * 10) / 10;
  }, [selectedPolicyB]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-6 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Head-to-Head Policy Radar
                </span>
                <span className="text-[10px] font-mono text-slate-400">Kenya 2060 Alignment</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Comparative Policy Outcome Scrutiny
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* View switch */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setComparisonMode("overlay")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  comparisonMode === "overlay" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Overlaid Radar
              </button>
              <button
                onClick={() => setComparisonMode("side-by-side")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  comparisonMode === "side-by-side" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Side-by-Side
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-base cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto space-y-6 pr-1">
          {/* Policy Selectors & Summary Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Policy A Card (Current Policy) */}
            <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Policy A (Audited Subject)
                </span>
                <span className="text-base font-black text-emerald-700 font-mono">
                  {policyAAverage} / 10
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                {currentPolicyTitle || "Currently Audited Policy Measure"}
              </h4>
              <p className="text-xs text-slate-600">
                Sector: <strong>{currentDomain}</strong>
              </p>
            </div>

            {/* Policy B Selector & Card */}
            <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  Policy B (Benchmark / Opposing Proposal)
                </span>
                <span className="text-base font-black text-indigo-700 font-mono">
                  {policyBAverage} / 10
                </span>
              </div>

              {/* Selector Dropdown */}
              <select
                value={selectedPolicyBId}
                onChange={(e) => setSelectedPolicyBId(e.target.value)}
                className="w-full text-xs font-semibold bg-white border border-indigo-300 rounded-lg p-2 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                id="policy-b-comparison-selector"
              >
                {PRESET_COMPARISON_POLICIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.actor}: {p.title}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-600 line-clamp-2">
                {selectedPolicyB.summary}
              </p>
            </div>
          </div>

          {/* Visual Radar Display */}
          {comparisonMode === "overlay" ? (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={comparativeRadarData}>
                    <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="pillarName"
                      tick={{ fontSize: 11, fill: "#1e293b", fontWeight: 700 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 10]}
                      tick={{ fontSize: 9, fill: "#94a3b8" }}
                      stroke="#cbd5e1"
                    />

                    {/* Policy A Radar (Emerald) */}
                    <Radar
                      name="Policy A (Current Audited)"
                      dataKey="policyA"
                      stroke="#059669"
                      fill="#10b981"
                      fillOpacity={0.4}
                      strokeWidth={2.5}
                    />

                    {/* Policy B Radar (Indigo) */}
                    <Radar
                      name="Policy B (Comparison)"
                      dataKey="policyB"
                      stroke="#4f46e5"
                      fill="#6366f1"
                      fillOpacity={0.35}
                      strokeWidth={2.5}
                    />

                    {/* Statutory 2060 Goal Target (Gold/Purple) */}
                    <Radar
                      name="Kenya 2060 Target Benchmark (8.8/10)"
                      dataKey="kenya2060Target"
                      stroke="#a855f7"
                      fill="#c084fc"
                      fillOpacity={0.1}
                      strokeDasharray="2 2"
                    />

                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-xs">
                              <div className="font-bold text-slate-100 border-b border-slate-700 pb-1">
                                {item.pillarName}
                              </div>
                              <div className="space-y-1 font-mono text-[11px]">
                                <div className="text-emerald-400">
                                  Policy A: <strong>{item.policyA}/10</strong>
                                </div>
                                <div className="text-indigo-400">
                                  Policy B: <strong>{item.policyB}/10</strong>
                                </div>
                                <div className="text-purple-300">
                                  2060 Target: <strong>{item.kenya2060Target}/10</strong>
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-400 pt-1">{item.description}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />

                    <Legend
                      verticalAlign="bottom"
                      wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Radar A */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <h5 className="font-bold text-xs text-emerald-900 uppercase tracking-wider text-center">
                  Policy A: {currentPolicyTitle.slice(0, 40)}
                </h5>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparativeRadarData}>
                      <PolarGrid stroke="#cbd5e1" strokeDasharray="2 2" />
                      <PolarAngleAxis dataKey="pillarName" tick={{ fontSize: 9, fill: "#334155" }} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#cbd5e1" tick={{ fontSize: 8 }} />
                      <Radar name="Policy A" dataKey="policyA" stroke="#059669" fill="#10b981" fillOpacity={0.5} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar B */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-indigo-200 space-y-2">
                <h5 className="font-bold text-xs text-indigo-900 uppercase tracking-wider text-center">
                  Policy B: {selectedPolicyB.title.slice(0, 40)}
                </h5>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={comparativeRadarData}>
                      <PolarGrid stroke="#cbd5e1" strokeDasharray="2 2" />
                      <PolarAngleAxis dataKey="pillarName" tick={{ fontSize: 9, fill: "#334155" }} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#cbd5e1" tick={{ fontSize: 8 }} />
                      <Radar name="Policy B" dataKey="policyB" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.5} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 7-Pillar Head-to-Head Breakdown Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Kenya 2060 Pillar</th>
                  <th className="py-2.5 px-3 text-center text-emerald-800">Policy A</th>
                  <th className="py-2.5 px-3 text-center text-indigo-800">Policy B</th>
                  <th className="py-2.5 px-3 text-center">Delta & Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparativeRadarData.map((row, idx) => {
                  const delta = Math.round((row.policyA - row.policyB) * 10) / 10;
                  const isPolicyAWinner = delta > 0;
                  const isTie = delta === 0;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3">
                        <strong className="text-slate-900 block text-xs">{row.pillarName}</strong>
                        <span className="text-[10px] text-slate-500">{row.description}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">
                        {row.policyA}/10
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-indigo-700">
                        {row.policyB}/10
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {isTie ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                            Tied
                          </span>
                        ) : isPolicyAWinner ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                            Policy A (+{delta})
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 font-mono">
                            Policy B (+{Math.abs(delta)})
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 shrink-0">
          <div className="text-xs text-slate-500">
            📊 <strong>Non-Partisan Verdict:</strong> Policy comparison is weighted across statutory debt ceilings (Article 201) and intergenerational welfare.
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
