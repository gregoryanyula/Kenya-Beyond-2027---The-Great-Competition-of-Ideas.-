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
  TrendingUp,
  Sliders,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Coins,
  Building,
  DollarSign,
  PieChart,
  Percent,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Scale
} from "lucide-react";
import { EvaluationResult } from "../types";

export interface MacroeconomicVariables {
  gdpGrowthRate: number; // e.g. 1.0% to 10.0% (default 5.2%)
  inflationRate: number; // e.g. 2.5% to 16.0% (default 5.8%)
  debtToGdpRatio: number; // e.g. 45% to 90% (default 68.4%)
  taxToGdpYield: number; // e.g. 10% to 24% (default 15.6%)
  kesUsdExchangeRate: number; // e.g. 100 to 190 (default 130)
  countyEquitableShare: number; // e.g. 350 to 600 KES Billions (default 400)
}

export const BASELINE_MACRO_VARIABLES: MacroeconomicVariables = {
  gdpGrowthRate: 5.2,
  inflationRate: 5.8,
  debtToGdpRatio: 68.4,
  taxToGdpYield: 15.6,
  kesUsdExchangeRate: 130,
  countyEquitableShare: 400
};

interface FiscalImpactSimulatorProps {
  evaluationResult?: EvaluationResult | null;
  policyTitle?: string;
  domainName?: string;
  onApplySimulatedScore?: (shiftedScores: any) => void;
}

export const FiscalImpactSimulator: React.FC<FiscalImpactSimulatorProps> = ({
  evaluationResult,
  policyTitle = "Active Audited Policy",
  domainName = "Economic Growth & Governance",
  onApplySimulatedScore
}) => {
  const [macroVars, setMacroVars] = useState<MacroeconomicVariables>(BASELINE_MACRO_VARIABLES);
  const [activePreset, setActivePreset] = useState<string>("baseline");
  const [selectedPillarInfo, setSelectedPillarInfo] = useState<string | null>(null);

  // Preset Configurations
  const presets = [
    {
      id: "baseline",
      name: "Treasury Baseline MTEF",
      icon: "🏛️",
      description: "CBK & National Treasury 2026/27 Medium-Term Economic Framework baseline.",
      values: { ...BASELINE_MACRO_VARIABLES }
    },
    {
      id: "tiger_growth",
      name: "Vision 2060 Tiger Economy",
      icon: "🐅",
      description: "High industrial export growth, strong shilling, low debt servicing stress.",
      values: {
        gdpGrowthRate: 8.4,
        inflationRate: 4.2,
        debtToGdpRatio: 52.0,
        taxToGdpYield: 19.8,
        kesUsdExchangeRate: 115,
        countyEquitableShare: 520
      }
    },
    {
      id: "devolved_boom",
      name: "Devolved Grassroots Surge",
      icon: "🇰🇪",
      description: "Expanded county equitable share, robust agricultural yields, and decentralized tax base.",
      values: {
        gdpGrowthRate: 6.8,
        inflationRate: 4.8,
        debtToGdpRatio: 60.5,
        taxToGdpYield: 18.2,
        kesUsdExchangeRate: 122,
        countyEquitableShare: 560
      }
    },
    {
      id: "stagflation_shock",
      name: "Stagflation & Debt Stress",
      icon: "⚠️",
      description: "Depreciating shilling, high inflation, and sovereign debt service crowding out public spending.",
      values: {
        gdpGrowthRate: 2.1,
        inflationRate: 11.8,
        debtToGdpRatio: 84.5,
        taxToGdpYield: 13.1,
        kesUsdExchangeRate: 168,
        countyEquitableShare: 365
      }
    }
  ];

  const applyPreset = (presetId: string) => {
    const p = presets.find((item) => item.id === presetId);
    if (p) {
      setMacroVars(p.values);
      setActivePreset(presetId);
    }
  };

  const handleSliderChange = <K extends keyof MacroeconomicVariables>(
    key: K,
    value: MacroeconomicVariables[K]
  ) => {
    setMacroVars((prev) => ({ ...prev, [key]: value }));
    setActivePreset("custom");
  };

  const resetToBaseline = () => {
    setMacroVars(BASELINE_MACRO_VARIABLES);
    setActivePreset("baseline");
  };

  // Base scores from evaluation or sensible defaults
  const baseScores = useMemo(() => {
    const vs = evaluationResult?.verdict_score;
    const baseAlign = vs ? vs.kenya_2060_alignment_score : 6.8;
    const fiscal = vs ? vs.fiscal_realism_score : 6.0;
    const constScore = vs ? vs.constitutional_viability_score : 7.5;
    const implScore = vs ? vs.implementation_readiness_score : 6.5;
    return {
      baseAlign,
      fiscal,
      constScore,
      implScore
    };
  }, [evaluationResult]);

  // Compute live shifted radar projections across the 7 statutory Kenya 2060 Pillars
  const simulationData = useMemo(() => {
    const { gdpGrowthRate, inflationRate, debtToGdpRatio, taxToGdpYield, kesUsdExchangeRate, countyEquitableShare } = macroVars;

    // Macro multipliers vs baseline
    const gdpFactor = (gdpGrowthRate - 5.2) * 0.45; // e.g. +3.2% growth -> +1.44 pts
    const inflationPenalty = (inflationRate - 5.8) * -0.35; // higher inflation reduces score
    const debtPenalty = (debtToGdpRatio - 68.4) * -0.22; // higher debt crowds out services
    const taxFactor = (taxToGdpYield - 15.6) * 0.5; // higher tax yield boosts funding
    const fxPenalty = (kesUsdExchangeRate - 130) * -0.04; // currency depreciation inflates external debt
    const devolutionFactor = (countyEquitableShare - 400) * 0.015; // +100B devolution -> +1.5 pts

    // 1. Economic Stability (most sensitive to GDP, debt, inflation, FX)
    const baseEcon = Math.min(10, Math.max(1, baseScores.fiscal * 0.7 + baseScores.baseAlign * 0.3));
    const shiftedEcon = Math.min(10, Math.max(1, Number((baseEcon + gdpFactor * 1.2 + debtPenalty * 1.3 + inflationPenalty * 1.1 + fxPenalty * 0.9 + taxFactor * 0.8).toFixed(1))));

    // 2. Healthcare & Wellness (sensitive to tax revenue, social spending, debt crowding-out)
    const baseHealth = Math.min(10, Math.max(1, baseScores.baseAlign * 0.6 + baseScores.implScore * 0.4));
    const shiftedHealth = Math.min(10, Math.max(1, Number((baseHealth + taxFactor * 1.1 + debtPenalty * 0.9 + devolutionFactor * 0.6).toFixed(1))));

    // 3. Education & Skills (capitation, GDP growth)
    const baseEdu = Math.min(10, Math.max(1, baseScores.baseAlign * 0.65 + baseScores.constScore * 0.35));
    const shiftedEdu = Math.min(10, Math.max(1, Number((baseEdu + gdpFactor * 0.8 + taxFactor * 0.9 + debtPenalty * 0.6).toFixed(1))));

    // 4. Food Sovereignty (inflation/food prices, FX for fertilizer, agri subsidies)
    const baseAgri = Math.min(10, Math.max(1, baseScores.baseAlign * 0.5 + baseScores.fiscal * 0.5));
    const shiftedAgri = Math.min(10, Math.max(1, Number((baseAgri + inflationPenalty * 1.4 + fxPenalty * 1.2 + devolutionFactor * 0.7).toFixed(1))));

    // 5. Digital & Industrial (GDP growth, technology investment, FX capital goods)
    const baseTech = Math.min(10, Math.max(1, baseScores.baseAlign * 0.7 + baseScores.implScore * 0.3));
    const shiftedTech = Math.min(10, Math.max(1, Number((baseTech + gdpFactor * 1.3 + fxPenalty * 0.8 + taxFactor * 0.6).toFixed(1))));

    // 6. Devolution & Equity (county equitable share, regional parity)
    const baseDevol = Math.min(10, Math.max(1, baseScores.constScore * 0.6 + baseScores.baseAlign * 0.4));
    const shiftedDevol = Math.min(10, Math.max(1, Number((baseDevol + devolutionFactor * 2.2 + taxFactor * 0.6 + debtPenalty * 0.5).toFixed(1))));

    // 7. Climate Resilience (fiscal capacity for green infrastructure & irrigation)
    const baseClimate = Math.min(10, Math.max(1, baseScores.baseAlign * 0.6 + baseScores.constScore * 0.4));
    const shiftedClimate = Math.min(10, Math.max(1, Number((baseClimate + gdpFactor * 0.7 + taxFactor * 0.7 + inflationPenalty * 0.4).toFixed(1))));

    return [
      {
        pillarName: "Economic Stability",
        key: "econ",
        baseline: baseEcon,
        simulated: shiftedEcon,
        delta: Number((shiftedEcon - baseEcon).toFixed(1)),
        statutoryImpact: "Direct impact on Article 201 public debt ceiling, shilling inflation, and MTEF fiscal deficit.",
        driver: "GDP Growth & Debt-to-GDP Ratio"
      },
      {
        pillarName: "Healthcare Access",
        key: "health",
        baseline: baseHealth,
        simulated: shiftedHealth,
        delta: Number((shiftedHealth - baseHealth).toFixed(1)),
        statutoryImpact: "Exchequer disbursements to Level 4/5 county referral hospitals and SHA medical insurance pool.",
        driver: "Ordinary Tax Revenue Yield & Debt Crowding"
      },
      {
        pillarName: "Education & Skills",
        key: "edu",
        baseline: baseEdu,
        simulated: shiftedEdu,
        delta: Number((shiftedEdu - baseEdu).toFixed(1)),
        statutoryImpact: "CBC secondary capitation, TVET funding, and University Funding Model sustainability.",
        driver: "GDP Expansion & Recurrent Budget Room"
      },
      {
        pillarName: "Food Sovereignty",
        key: "agri",
        baseline: baseAgri,
        simulated: shiftedAgri,
        delta: Number((shiftedAgri - baseAgri).toFixed(1)),
        statutoryImpact: "Insulation against unga/fertilizer price surges and NCPB strategic grain buffer replenishment.",
        driver: "Inflation Rate & KES/USD Exchange Rate"
      },
      {
        pillarName: "Digital & Industrial",
        key: "tech",
        baseline: baseTech,
        simulated: shiftedTech,
        delta: Number((shiftedTech - baseTech).toFixed(1)),
        statutoryImpact: "Constituency digital innovation hubs, broadband rollout, and local industrial value-addition.",
        driver: "Real GDP Growth & Capital Equipment Import Costs"
      },
      {
        pillarName: "Devolution & Equity",
        key: "devol",
        baseline: baseDevol,
        simulated: shiftedDevol,
        delta: Number((shiftedDevol - baseDevol).toFixed(1)),
        statutoryImpact: "Article 201(b) resource equalization across all 47 counties & Equalization Fund execution.",
        driver: "County Equitable Share Allocation (KES 400B+)"
      },
      {
        pillarName: "Climate Resilience",
        key: "climate",
        baseline: baseClimate,
        simulated: shiftedClimate,
        delta: Number((shiftedClimate - baseClimate).toFixed(1)),
        statutoryImpact: "Long-term dam infrastructure, 30% national tree canopy, and green energy grid expansion.",
        driver: "National Fiscal Headroom & Tax Yield"
      }
    ];
  }, [macroVars, baseScores]);

  // Overall Simulated Index
  const averageBaseline = useMemo(() => {
    const sum = simulationData.reduce((acc, curr) => acc + curr.baseline, 0);
    return Number((sum / simulationData.length).toFixed(1));
  }, [simulationData]);

  const averageSimulated = useMemo(() => {
    const sum = simulationData.reduce((acc, curr) => acc + curr.simulated, 0);
    return Number((sum / simulationData.length).toFixed(1));
  }, [simulationData]);

  const compositeDelta = Number((averageSimulated - averageBaseline).toFixed(1));

  // Fiscal Risk Gauge
  const isHighFiscalDistress = macroVars.debtToGdpRatio > 75 || macroVars.inflationRate > 9.5 || macroVars.gdpGrowthRate < 3.0;
  const isOptimalTrajectory = macroVars.gdpGrowthRate >= 6.5 && macroVars.debtToGdpRatio <= 62 && macroVars.inflationRate <= 5.5;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6" id="fiscal-impact-simulator">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-200">
            <Sliders className="w-3.5 h-3.5 text-purple-600" />
            Macroeconomic Dynamic Sensitivity Engine
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Fiscal Impact Simulator & Kenya 2060 Radar Shift
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-0.5">
            Adjust macroeconomic variables (GDP growth, inflation, sovereign debt, exchange rates, and devolution transfers) to simulate real-time shifts on the 7 Kenya 2060 radar pillars.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={resetToBaseline}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            title="Reset to Treasury MTEF Baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Scenario Presets Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Quick Macroeconomic Scenarios:</span>
          </span>
          <span className="text-2xs font-mono text-slate-400">Article 201 Stress Testing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((p) => {
            const isSelected = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? "bg-purple-900 text-white border-purple-900 shadow-xs ring-2 ring-purple-500/20"
                    : "bg-slate-50 border-slate-200 hover:bg-purple-50/50 hover:border-purple-200 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{p.icon}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-purple-800 text-purple-200" : "bg-white text-slate-600 border border-slate-200"
                  }`}>
                    GDP {p.values.gdpGrowthRate}%
                  </span>
                </div>
                <div className="font-bold text-xs">{p.name}</div>
                <p className={`text-[10.5px] leading-snug line-clamp-2 ${
                  isSelected ? "text-purple-200" : "text-slate-500"
                }`}>
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Variables Sliders Grid */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-purple-600" />
            <span>Macroeconomic Variable Sliders (Real-Time Inputs)</span>
          </span>
          <span className="text-2xs font-mono text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded">
            Live Simulation Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          
          {/* 1. Real GDP Growth Rate */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Annual Real GDP Growth:</span>
              </label>
              <span className="font-mono font-black text-emerald-700 text-xs bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {macroVars.gdpGrowthRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.1"
              value={macroVars.gdpGrowthRate}
              onChange={(e) => handleSliderChange("gdpGrowthRate", parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1.0% (Recession)</span>
              <span>5.2% (Base)</span>
              <span>10.0% (Boom)</span>
            </div>
          </div>

          {/* 2. Headline Inflation */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-amber-600" />
                <span>Headline Inflation Rate:</span>
              </label>
              <span className={`font-mono font-black text-xs px-1.5 py-0.5 rounded border ${
                macroVars.inflationRate > 7.5 ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-slate-100 text-slate-800 border-slate-200"
              }`}>
                {macroVars.inflationRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="2.5"
              max="16.0"
              step="0.1"
              value={macroVars.inflationRate}
              onChange={(e) => handleSliderChange("inflationRate", parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>2.5% (Low)</span>
              <span>5.8% (Target)</span>
              <span>16.0% (Crisis)</span>
            </div>
          </div>

          {/* 3. Debt-to-GDP Ratio */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-rose-600" />
                <span>Public Debt-to-GDP Ratio:</span>
              </label>
              <span className={`font-mono font-black text-xs px-1.5 py-0.5 rounded border ${
                macroVars.debtToGdpRatio > 70 ? "bg-rose-50 text-rose-700 border-rose-200 font-bold" : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}>
                {macroVars.debtToGdpRatio.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="45.0"
              max="90.0"
              step="0.5"
              value={macroVars.debtToGdpRatio}
              onChange={(e) => handleSliderChange("debtToGdpRatio", parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>45% (Safe)</span>
              <span>68.4% (Current)</span>
              <span>90% (Distress)</span>
            </div>
          </div>

          {/* 4. Tax-to-GDP Revenue Yield */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                <span>Tax Revenue-to-GDP Yield:</span>
              </label>
              <span className="font-mono font-black text-blue-700 text-xs bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                {macroVars.taxToGdpYield.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="10.0"
              max="24.0"
              step="0.2"
              value={macroVars.taxToGdpYield}
              onChange={(e) => handleSliderChange("taxToGdpYield", parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10% (Narrow)</span>
              <span>15.6% (Current)</span>
              <span>24% (High)</span>
            </div>
          </div>

          {/* 5. KES / USD Exchange Rate */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-purple-600" />
                <span>Exchange Rate (KES / USD):</span>
              </label>
              <span className="font-mono font-black text-purple-700 text-xs bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                {macroVars.kesUsdExchangeRate} KES
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="190"
              step="1"
              value={macroVars.kesUsdExchangeRate}
              onChange={(e) => handleSliderChange("kesUsdExchangeRate", parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>100 KES (Strong)</span>
              <span>130 KES (Base)</span>
              <span>190 KES (Weak)</span>
            </div>
          </div>

          {/* 6. County Equitable Share Transfers */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-indigo-600" />
                <span>County Equitable Share:</span>
              </label>
              <span className="font-mono font-black text-indigo-700 text-xs bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                KES {macroVars.countyEquitableShare}B
              </span>
            </div>
            <input
              type="range"
              min="350"
              max="600"
              step="10"
              value={macroVars.countyEquitableShare}
              onChange={(e) => handleSliderChange("countyEquitableShare", parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>KES 350B</span>
              <span>KES 400B (Current)</span>
              <span>KES 600B (Peak)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Dual Radar Comparison & Real-Time Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Recharts Dynamic Dual-Radar Canvas (7 Cols) */}
        <div className="lg:col-span-7 h-92 w-full relative bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Live Radar Shift (Baseline vs. Simulated Macro Scenario)</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-slate-400">Baseline: <strong>{averageBaseline}</strong></span>
              <span className="text-emerald-400 font-bold">Simulated: <strong>{averageSimulated}</strong> ({compositeDelta >= 0 ? `+${compositeDelta}` : compositeDelta})</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="86%">
            <RadarChart cx="50%" cy="50%" outerRadius="72%" data={simulationData}>
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="pillarName"
                tick={{ fontSize: 9.5, fill: "#cbd5e1", fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                tick={{ fontSize: 8, fill: "#64748b" }}
                stroke="#475569"
              />

              {/* Baseline Curve (Slate / Dashed) */}
              <Radar
                name="Baseline Policy Projections"
                dataKey="baseline"
                stroke="#94a3b8"
                fill="#64748b"
                fillOpacity={0.2}
                strokeDasharray="3 3"
              />

              {/* Simulated Macro Curve (Emerald / Amber) */}
              <Radar
                name="Simulated Scenario Radar Shift"
                dataKey="simulated"
                stroke={compositeDelta >= 0 ? "#10b981" : "#f43f5e"}
                fill={compositeDelta >= 0 ? "#10b981" : "#f43f5e"}
                fillOpacity={0.4}
                strokeWidth={2.5}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-slate-950 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1.5 max-w-xs">
                        <div className="font-bold text-emerald-300 border-b border-slate-800 pb-1 flex justify-between">
                          <span>{item.pillarName}</span>
                          <span className="font-mono">{item.simulated}/10</span>
                        </div>
                        <div className="text-[11px] text-slate-300 space-y-0.5 font-mono">
                          <div>• Baseline: {item.baseline}/10</div>
                          <div>• Simulated: {item.simulated}/10 (<strong className={item.delta >= 0 ? "text-emerald-400" : "text-rose-400"}>{item.delta >= 0 ? `+${item.delta}` : item.delta}</strong>)</div>
                        </div>
                        <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                          <strong>Key Driver:</strong> {item.driver}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column: Statutory Pillar Shifts & Resilience Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Summary Metric Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Composite Resilience Score
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <span className="text-slate-500">{averageBaseline}/10</span>
                <span className="text-slate-300">→</span>
                <span className={compositeDelta >= 0 ? "text-emerald-700" : "text-rose-700"}>
                  {averageSimulated}/10
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  compositeDelta >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}>
                  {compositeDelta >= 0 ? `+${compositeDelta}` : compositeDelta}
                </span>
              </div>
            </div>

            {/* Individual Pillar Breakdown Strip */}
            <div className="space-y-1.5 pt-1">
              {simulationData.map((d) => (
                <div
                  key={d.key}
                  onClick={() => setSelectedPillarInfo(selectedPillarInfo === d.key ? null : d.key)}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-purple-300 transition-colors cursor-pointer text-xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-slate-800 truncate">{d.pillarName}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono shrink-0 text-2xs">
                    <span className="text-slate-400">{d.baseline}</span>
                    <span className="text-slate-300">→</span>
                    <span className="font-bold text-slate-900">{d.simulated}</span>
                    <span className={`px-1.5 py-0.5 rounded font-bold ${
                      d.delta > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : d.delta < 0
                        ? "bg-rose-100 text-rose-800"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {d.delta > 0 ? `+${d.delta}` : d.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Article 201 Fiscal Viability Callout */}
          <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
            isHighFiscalDistress
              ? "bg-rose-50 border-rose-200 text-rose-900"
              : isOptimalTrajectory
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}>
            {isHighFiscalDistress ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            ) : isOptimalTrajectory ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Scale className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <span className="font-bold block text-[11.5px]">
                {isHighFiscalDistress
                  ? "Article 201 Red Alert: Sovereign Debt & Inflation Stress"
                  : isOptimalTrajectory
                  ? "Kenya 2060 High-Resilience Accelerated Trajectory"
                  : "Sustainable Medium-Term Expenditure Framework"}
              </span>
              <p className="text-[11px] leading-snug opacity-90">
                {isHighFiscalDistress
                  ? "At " + macroVars.debtToGdpRatio + "% debt-to-GDP and " + macroVars.inflationRate + "% inflation, debt service eats over 65% of ordinary revenue, triggering mandatory cuts to county development and health."
                  : isOptimalTrajectory
                  ? "A " + macroVars.gdpGrowthRate + "% growth trajectory combined with KES " + macroVars.countyEquitableShare + "B devolution creates KES 850B+ in new fiscal capacity for healthcare, digital hubs, and manufacturing."
                  : "Current fiscal variables support moderate execution under standard Article 201 intergenerational burden-sharing parameters."}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
