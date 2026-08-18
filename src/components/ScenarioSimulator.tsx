import React, { useState } from "react";
import { 
  Scale, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ArrowRight, 
  Layers, 
  Compass, 
  HelpCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { 
  SCENARIO_POLICY_APPROACHES, 
  EXTERNAL_SHOCKS, 
  KENYA_2060_BENCHMARK_TARGETS 
} from "../data/scenarioSimulatorData";
import { ScenarioPolicyApproach, ScenarioYearMetrics } from "../types";

export const ScenarioSimulator: React.FC = () => {
  const [approachAId, setApproachAId] = useState<string>("approach-debt-infrastructure");
  const [approachBId, setApproachBId] = useState<string>("approach-fiscal-industrialization");
  const [selectedHorizon, setSelectedHorizon] = useState<"year2030" | "year2045" | "year2060">("year2060");
  const [selectedShockId, setSelectedShockId] = useState<string>("none");

  const approachA = SCENARIO_POLICY_APPROACHES.find((a) => a.id === approachAId) || SCENARIO_POLICY_APPROACHES[0];
  const approachB = SCENARIO_POLICY_APPROACHES.find((a) => a.id === approachBId) || SCENARIO_POLICY_APPROACHES[1];
  const activeShock = EXTERNAL_SHOCKS.find((s) => s.id === selectedShockId) || EXTERNAL_SHOCKS[0];

  // Helper to adjust metrics under external shock
  const getAdjustedMetrics = (approach: ScenarioPolicyApproach, horizon: "year2030" | "year2045" | "year2060"): ScenarioYearMetrics => {
    const raw = approach.projections[horizon];
    if (selectedShockId === "none") return raw;

    const shockObj = approach.shockResilience.find((s) => s.shockId === selectedShockId);
    const resilience = shockObj ? shockObj.resilienceScore : 5;
    const shockFactor = (10 - resilience) * 0.03; // Higher resilience => lower negative shock impact

    if (selectedShockId === "oil-spike" || selectedShockId === "fed-rate-hike") {
      return {
        ...raw,
        debtToGdp: Math.min(95, Math.round((raw.debtToGdp * (1 + shockFactor)) * 10) / 10),
        gdpPerCapitaUsd: Math.round(raw.gdpPerCapitaUsd * (1 - shockFactor * 0.5)),
        youthUnemployment: Math.min(45, Math.round((raw.youthUnemployment * (1 + shockFactor * 0.8)) * 10) / 10),
        outOfPocketHealth: Math.min(50, Math.round((raw.outOfPocketHealth * (1 + shockFactor * 0.5)) * 10) / 10)
      };
    } else if (selectedShockId === "drought") {
      return {
        ...raw,
        gdpPerCapitaUsd: Math.round(raw.gdpPerCapitaUsd * (1 - shockFactor * 0.7)),
        outOfPocketHealth: Math.min(50, Math.round((raw.outOfPocketHealth * (1 + shockFactor * 0.9)) * 10) / 10),
        climateResilienceScore: Math.max(20, Math.round(raw.climateResilienceScore - (10 - resilience) * 2))
      };
    } else if (selectedShockId === "eac-trade-surge") {
      const boost = (resilience / 10) * 0.12;
      return {
        ...raw,
        gdpPerCapitaUsd: Math.round(raw.gdpPerCapitaUsd * (1 + boost)),
        manufacturingGdpShare: Math.min(35, Math.round((raw.manufacturingGdpShare * (1 + boost * 1.5)) * 10) / 10),
        youthUnemployment: Math.max(4, Math.round((raw.youthUnemployment * (1 - boost * 1.2)) * 10) / 10),
        debtToGdp: Math.max(25, Math.round((raw.debtToGdp * (1 - boost * 0.6)) * 10) / 10)
      };
    }
    return raw;
  };

  const metricsA = getAdjustedMetrics(approachA, selectedHorizon);
  const metricsB = getAdjustedMetrics(approachB, selectedHorizon);

  // Normalized Radar Chart Data (0 to 100 index for comparative polygon)
  const radarData = [
    {
      subject: "Fiscal Solvency",
      ApproachA: Math.max(10, Math.min(100, Math.round(110 - metricsA.debtToGdp))),
      ApproachB: Math.max(10, Math.min(100, Math.round(110 - metricsB.debtToGdp))),
      Benchmark: 65,
      fullMark: 100
    },
    {
      subject: "Income (GDP/Cap)",
      ApproachA: Math.min(100, Math.round((metricsA.gdpPerCapitaUsd / KENYA_2060_BENCHMARK_TARGETS.gdpPerCapitaUsd) * 100)),
      ApproachB: Math.min(100, Math.round((metricsB.gdpPerCapitaUsd / KENYA_2060_BENCHMARK_TARGETS.gdpPerCapitaUsd) * 100)),
      Benchmark: 100,
      fullMark: 100
    },
    {
      subject: "Youth Jobs",
      ApproachA: Math.max(10, Math.min(100, Math.round(100 - metricsA.youthUnemployment * 2.2))),
      ApproachB: Math.max(10, Math.min(100, Math.round(100 - metricsB.youthUnemployment * 2.2))),
      Benchmark: 85,
      fullMark: 100
    },
    {
      subject: "Health Affordability",
      ApproachA: Math.max(10, Math.min(100, Math.round(100 - metricsA.outOfPocketHealth * 2))),
      ApproachB: Math.max(10, Math.min(100, Math.round(100 - metricsB.outOfPocketHealth * 2))),
      Benchmark: 90,
      fullMark: 100
    },
    {
      subject: "Manufacturing Share",
      ApproachA: Math.min(100, Math.round((metricsA.manufacturingGdpShare / KENYA_2060_BENCHMARK_TARGETS.manufacturingGdpShareTarget) * 100)),
      ApproachB: Math.min(100, Math.round((metricsB.manufacturingGdpShare / KENYA_2060_BENCHMARK_TARGETS.manufacturingGdpShareTarget) * 100)),
      Benchmark: 100,
      fullMark: 100
    },
    {
      subject: "Devolution Power",
      ApproachA: Math.min(100, Math.round((metricsA.devolutionShare / KENYA_2060_BENCHMARK_TARGETS.devolutionShareTarget) * 100)),
      ApproachB: Math.min(100, Math.round((metricsB.devolutionShare / KENYA_2060_BENCHMARK_TARGETS.devolutionShareTarget) * 100)),
      Benchmark: 100,
      fullMark: 100
    },
    {
      subject: "Equity (Low Gini)",
      ApproachA: Math.max(10, Math.min(100, Math.round(100 - (metricsA.giniCoefficient - 25) * 3))),
      ApproachB: Math.max(10, Math.min(100, Math.round(100 - (metricsB.giniCoefficient - 25) * 3))),
      Benchmark: 80,
      fullMark: 100
    },
    {
      subject: "Climate Resilience",
      ApproachA: metricsA.climateResilienceScore,
      ApproachB: metricsB.climateResilienceScore,
      Benchmark: 90,
      fullMark: 100
    }
  ];

  // Bar Comparison for Headline Numbers
  const comparisonBarData = [
    {
      metric: "Debt-to-GDP (%)",
      [approachA.name]: metricsA.debtToGdp,
      [approachB.name]: metricsB.debtToGdp,
      benchmark: KENYA_2060_BENCHMARK_TARGETS.debtToGdpMax,
      unit: "%"
    },
    {
      metric: "Youth Unemp. (%)",
      [approachA.name]: metricsA.youthUnemployment,
      [approachB.name]: metricsB.youthUnemployment,
      benchmark: KENYA_2060_BENCHMARK_TARGETS.youthUnemploymentTarget,
      unit: "%"
    },
    {
      metric: "Health Out-of-Pocket (%)",
      [approachA.name]: metricsA.outOfPocketHealth,
      [approachB.name]: metricsB.outOfPocketHealth,
      benchmark: KENYA_2060_BENCHMARK_TARGETS.outOfPocketHealthTarget,
      unit: "%"
    },
    {
      metric: "Devolution Share (%)",
      [approachA.name]: metricsA.devolutionShare,
      [approachB.name]: metricsB.devolutionShare,
      benchmark: KENYA_2060_BENCHMARK_TARGETS.devolutionShareTarget,
      unit: "%"
    },
    {
      metric: "Mfg Share GDP (%)",
      [approachA.name]: metricsA.manufacturingGdpShare,
      [approachB.name]: metricsB.manufacturingGdpShare,
      benchmark: KENYA_2060_BENCHMARK_TARGETS.manufacturingGdpShareTarget,
      unit: "%"
    }
  ];

  const getIntergenerationalColor = (rating: string) => {
    switch (rating) {
      case "High":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "Medium":
        return "bg-amber-50 text-amber-800 border-amber-300";
      case "High Risk":
        return "bg-rose-50 text-rose-800 border-rose-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="space-y-8" id="scenario-simulator-root">
      {/* Top Controls: Policy Approach Selectors & Horizon */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Vision 2060 Scenario Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Interactive 2060 Long-Term Policy Scenario Simulator
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
              Compare any two divergent development strategies side-by-side. See projected long-term trajectories for sovereign debt, youth employment, industrial output, and constitutional devolution up to the Kenya 2060 centennial.
            </p>
          </div>

          {/* Time Horizon Selector */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setSelectedHorizon("year2030")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                selectedHorizon === "year2030"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              2030 (Medium-Term)
            </button>
            <button
              onClick={() => setSelectedHorizon("year2045")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                selectedHorizon === "year2045"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              2045 (Mid-Century)
            </button>
            <button
              onClick={() => setSelectedHorizon("year2060")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                selectedHorizon === "year2060"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              2060 (Centennial Goal)
            </button>
          </div>
        </div>

        {/* Dual Approach Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Approach A Selector */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/40 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                Approach A (Primary Model)
              </span>
              <span className="text-xs font-bold text-blue-700">Select Strategy:</span>
            </div>
            <select
              value={approachAId}
              onChange={(e) => setApproachAId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-blue-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SCENARIO_POLICY_APPROACHES.map((app) => (
                <option key={app.id} value={app.id} disabled={app.id === approachBId}>
                  {app.name} ({app.coalitionArchetype})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-700 leading-relaxed italic">
              "{approachA.philosophy}"
            </p>
          </div>

          {/* Approach B Selector */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                Approach B (Counter-Model)
              </span>
              <span className="text-xs font-bold text-emerald-700">Select Counter-Strategy:</span>
            </div>
            <select
              value={approachBId}
              onChange={(e) => setApproachBId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-emerald-300 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SCENARIO_POLICY_APPROACHES.map((app) => (
                <option key={app.id} value={app.id} disabled={app.id === approachAId}>
                  {app.name} ({app.coalitionArchetype})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-700 leading-relaxed italic">
              "{approachB.philosophy}"
            </p>
          </div>
        </div>

        {/* Global Stress-Test / External Shock Selector */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                Macroeconomic Stress Test:
              </span>
              <span className="text-xs text-slate-300">
                Simulate global economic shocks to evaluate policy resilience and fragility.
              </span>
            </div>
          </div>

          <select
            value={selectedShockId}
            onChange={(e) => setSelectedShockId(e.target.value)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {EXTERNAL_SHOCKS.map((shk) => (
              <option key={shk.id} value={shk.id}>
                {shk.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Analytics Grid: Radar Chart & Comparative KPI Scoreboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (5 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Development Balance Polygon ({selectedHorizon.replace("year", "")})
              </span>
              <span className="text-xs font-mono font-bold text-slate-700">0 - 100 Index</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-1">
              Multidimensional Policy Footprint
            </h4>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 10, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                <Radar
                  name={approachA.name}
                  dataKey="ApproachA"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.25}
                />
                <Radar
                  name={approachB.name}
                  dataKey="ApproachB"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.25}
                />
                <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 8 }} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            💡 Outer polygon bounds represent optimal alignment with the Constitution of Kenya 2010 and African Union Agenda 2063 targets.
          </div>
        </div>

        {/* Side-by-Side Key Metrics Table (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Projected Indicators ({selectedHorizon.replace("year", "")})
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                Head-to-Head Macro Comparison
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-700">
              Active Shock: {activeShock.name.split("(")[0]}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Metric 1: GDP Per Capita */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">GDP Per Capita</span>
                <span className="text-[10px] text-slate-500">Benchmark: $12,500+ (Upper-Middle)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 block">{approachA.name.slice(0, 14)}..</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">${metricsA.gdpPerCapitaUsd.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 block">{approachB.name.slice(0, 14)}..</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">${metricsB.gdpPerCapitaUsd.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Metric 2: Sovereign Debt-to-GDP */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Debt-to-GDP Ratio</span>
                <span className="text-[10px] text-slate-500">Target Ceiling: &lt;45%</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 block">{approachA.name.slice(0, 14)}..</span>
                  <span className={`font-mono font-bold text-sm ${metricsA.debtToGdp > 55 ? "text-rose-600" : "text-emerald-700"}`}>
                    {metricsA.debtToGdp}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 block">{approachB.name.slice(0, 14)}..</span>
                  <span className={`font-mono font-bold text-sm ${metricsB.debtToGdp > 55 ? "text-rose-600" : "text-emerald-700"}`}>
                    {metricsB.debtToGdp}%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Youth Unemployment */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Youth Unemployment</span>
                <span className="text-[10px] text-slate-500">Target Ceiling: &lt;7%</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 block">{approachA.name.slice(0, 14)}..</span>
                  <span className={`font-mono font-bold text-sm ${metricsA.youthUnemployment > 15 ? "text-amber-700" : "text-emerald-700"}`}>
                    {metricsA.youthUnemployment}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 block">{approachB.name.slice(0, 14)}..</span>
                  <span className={`font-mono font-bold text-sm ${metricsB.youthUnemployment > 15 ? "text-amber-700" : "text-emerald-700"}`}>
                    {metricsB.youthUnemployment}%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 4: Health Out of Pocket */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Out-of-Pocket Healthcare</span>
                <span className="text-[10px] text-slate-500">WHO Safe Limit: &lt;10%</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 block">{approachA.name.slice(0, 14)}..</span>
                  <span className={`font-mono font-bold text-sm ${metricsA.outOfPocketHealth > 15 ? "text-rose-600" : "text-emerald-700"}`}>
                    {metricsA.outOfPocketHealth}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 block">{approachB.name.slice(0, 14)}..</span>
                  <span className={`font-mono font-bold text-sm ${metricsB.outOfPocketHealth > 15 ? "text-rose-600" : "text-emerald-700"}`}>
                    {metricsB.outOfPocketHealth}%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 5: Devolution County Share */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Devolution County Share</span>
                <span className="text-[10px] text-slate-500">Constitutional Goal: 35%+</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 block">{approachA.name.slice(0, 14)}..</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{metricsA.devolutionShare}%</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 block">{approachB.name.slice(0, 14)}..</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{metricsB.devolutionShare}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Trade-offs & Intergenerational Equity Matrix */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Intergenerational Assessment & Governance Prerequisite Matrix
          </span>
          <h4 className="text-xl font-bold text-slate-900 mt-1">
            Structural Trade-Offs, Risks & Constitutional Prerequisites
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Approach A Deep-Dive Card */}
          <div className="p-6 rounded-xl border border-blue-200 bg-blue-50/20 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  {approachA.coalitionArchetype}
                </span>
                <h5 className="text-lg font-bold text-slate-900 mt-1">
                  {approachA.name}
                </h5>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getIntergenerationalColor(approachA.tradeoffs.intergenerationalEquityRating)}`}>
                Equity: {approachA.tradeoffs.intergenerationalEquityRating}
              </span>
            </div>

            {/* Core Mechanisms */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                Key Execution Levers:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {approachA.keyMechanisms.map((mech, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages vs Vulnerabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {approachA.tradeoffs.advantages.map((adv, aIdx) => (
                    <li key={aIdx}>• {adv}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-rose-800 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Vulnerabilities
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {approachA.tradeoffs.vulnerabilities.map((vul, vIdx) => (
                    <li key={vIdx}>• {vul}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
              <span className="text-[10px] font-black uppercase text-blue-900 block mb-0.5">Governance Prerequisite:</span>
              <p className="text-slate-700 leading-snug">{approachA.tradeoffs.governancePrerequisites}</p>
            </div>
          </div>

          {/* Approach B Deep-Dive Card */}
          <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {approachB.coalitionArchetype}
                </span>
                <h5 className="text-lg font-bold text-slate-900 mt-1">
                  {approachB.name}
                </h5>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${getIntergenerationalColor(approachB.tradeoffs.intergenerationalEquityRating)}`}>
                Equity: {approachB.tradeoffs.intergenerationalEquityRating}
              </span>
            </div>

            {/* Core Mechanisms */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                Key Execution Levers:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {approachB.keyMechanisms.map((mech, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advantages vs Vulnerabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {approachB.tradeoffs.advantages.map((adv, aIdx) => (
                    <li key={aIdx}>• {adv}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-rose-800 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Vulnerabilities
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {approachB.tradeoffs.vulnerabilities.map((vul, vIdx) => (
                    <li key={vIdx}>• {vul}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
              <span className="text-[10px] font-black uppercase text-emerald-900 block mb-0.5">Governance Prerequisite:</span>
              <p className="text-slate-700 leading-snug">{approachB.tradeoffs.governancePrerequisites}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
