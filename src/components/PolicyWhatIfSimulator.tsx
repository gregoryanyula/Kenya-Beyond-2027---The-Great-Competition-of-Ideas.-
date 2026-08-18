import React, { useState } from "react";
import { 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  RotateCcw, 
  Sparkles, 
  Compass, 
  Layers, 
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";

interface WhatIfSimulatorProps {
  policyDomain?: string;
  policyTitle?: string;
  baseFiscalCostKESBillion?: number;
}

export const PolicyWhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  policyDomain = "National Infrastructure & Energy",
  policyTitle = "Manifesto Capital Investment",
  baseFiscalCostKESBillion = 85
}) => {
  // Macroeconomic variables
  const [gdpGrowth, setGdpGrowth] = useState<number>(5.2); // 5.2% baseline
  const [corporateTaxRate, setCorporateTaxRate] = useState<number>(30.0); // 30% baseline
  const [vatRate, setVatRate] = useState<number>(16.0); // 16% baseline
  const [debtServicingShare, setDebtServicingShare] = useState<number>(62.0); // 62% of revenue baseline
  const [inflationRate, setInflationRate] = useState<number>(6.5); // 6.5% baseline
  const [kraEfficiency, setKraEfficiency] = useState<number>(74.0); // 74% baseline

  // Scenario presets
  const applyPreset = (preset: "baseline" | "high-growth" | "debt-shock" | "green-industrial") => {
    if (preset === "baseline") {
      setGdpGrowth(5.2);
      setCorporateTaxRate(30.0);
      setVatRate(16.0);
      setDebtServicingShare(62.0);
      setInflationRate(6.5);
      setKraEfficiency(74.0);
    } else if (preset === "high-growth") {
      setGdpGrowth(8.1);
      setCorporateTaxRate(28.0);
      setVatRate(14.0);
      setDebtServicingShare(41.0);
      setInflationRate(4.8);
      setKraEfficiency(91.0);
    } else if (preset === "debt-shock") {
      setGdpGrowth(2.4);
      setCorporateTaxRate(35.0);
      setVatRate(18.0);
      setDebtServicingShare(79.0);
      setInflationRate(11.5);
      setKraEfficiency(65.0);
    } else if (preset === "green-industrial") {
      setGdpGrowth(7.0);
      setCorporateTaxRate(25.0);
      setVatRate(16.0);
      setDebtServicingShare(48.0);
      setInflationRate(5.2);
      setKraEfficiency(86.0);
    }
  };

  // Dynamic Mathematical 2060 Projections
  // Baseline Kenya Nominal GDP ~ KES 17.5 Trillion; 33 years compounding to 2060
  const compoundedGrowthFactor = Math.pow(1 + (gdpGrowth / 100), 33);
  const projected2060GdpUSD = Math.round(110 * compoundedGrowthFactor * (1 - (inflationRate - 5) * 0.015));
  const projectedPerCapitaUSD = Math.round((projected2060GdpUSD * 1000000000) / 78000000); // 78M projected 2060 pop
  
  // Fiscal Headroom (Available discretionary development budget in KES Billion/yr)
  const annualRevenueBaselineKES = 2850; // KES 2.85T
  const effectiveRevenueMultiplier = (kraEfficiency / 74) * (1 + (gdpGrowth - 5.2) * 0.08) * ((vatRate + corporateTaxRate) / 46);
  const projectedAnnualRevenueKES = Math.round(annualRevenueBaselineKES * effectiveRevenueMultiplier);
  const debtRepaymentDeductionKES = Math.round(projectedAnnualRevenueKES * (debtServicingShare / 100));
  const recurrentWageDeductionKES = Math.round(projectedAnnualRevenueKES * 0.28);
  const devolutionDeductionKES = Math.round(projectedAnnualRevenueKES * 0.16);
  const discretionaryFiscalHeadroomKES = Math.max(0, projectedAnnualRevenueKES - debtRepaymentDeductionKES - recurrentWageDeductionKES - devolutionDeductionKES);

  // Solvency ratio of this specific manifesto proposal
  const manifestoCoveragePct = Math.min(250, Math.round((discretionaryFiscalHeadroomKES / (baseFiscalCostKESBillion || 85)) * 100));

  // 2060 Strategic Milestones
  let povertyEradicationYear = 2050;
  if (gdpGrowth >= 7.5 && debtServicingShare <= 50) povertyEradicationYear = 2041;
  else if (gdpGrowth >= 6.0 && debtServicingShare <= 60) povertyEradicationYear = 2046;
  else if (gdpGrowth < 4.0 || debtServicingShare > 70) povertyEradicationYear = 2060;

  let debtToGdp2060 = Math.max(22, Math.round(68 - (gdpGrowth * 4.2) + (debtServicingShare * 0.45) - (kraEfficiency * 0.15)));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="policy-what-if-simulator">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-amber-400 mb-2">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Kenya 2060 Interactive Macroeconomic Stress-Test</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              'What-If' Macroeconomic & 2060 Outcomes Simulator
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Adjust national economic variables to simulate whether this manifesto's promises remain fiscally solvent under different real-world revenue, debt repayment, and growth conditions across 2027–2060.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1">Presets:</span>
            <button
              onClick={() => applyPreset("baseline")}
              className="px-2.5 py-1 rounded-lg font-bold bg-white text-slate-900 shadow-2xs hover:bg-slate-50 transition-all text-[11px]"
            >
              📊 MTEF Baseline
            </button>
            <button
              onClick={() => applyPreset("high-growth")}
              className="px-2.5 py-1 rounded-lg font-bold bg-emerald-700 text-white shadow-2xs hover:bg-emerald-800 transition-all text-[11px]"
            >
              🚀 Tiger Economy (8%)
            </button>
            <button
              onClick={() => applyPreset("debt-shock")}
              className="px-2.5 py-1 rounded-lg font-bold bg-rose-700 text-white shadow-2xs hover:bg-rose-800 transition-all text-[11px]"
            >
              ⚠️ Debt Squeeze (79%)
            </button>
            <button
              onClick={() => applyPreset("green-industrial")}
              className="px-2.5 py-1 rounded-lg font-bold bg-slate-800 text-amber-300 shadow-2xs hover:bg-slate-900 transition-all text-[11px]"
            >
              🌱 Green Tech Hub
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Variable Sliders (6 cols) & 2060 Dynamic Projection Cards (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Container (6 cols) */}
        <div className="lg:col-span-6 space-y-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-700" />
              <span>Economic Levers & Assumptions</span>
            </span>
            <button
              onClick={() => applyPreset("baseline")}
              className="text-[10px] text-slate-500 font-bold hover:text-slate-900 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset to Baseline
            </button>
          </div>

          {/* 1. Real GDP Growth Slider */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Annual Real GDP Growth Rate:</span>
              <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {gdpGrowth.toFixed(1)}% / yr
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.1"
              value={gdpGrowth}
              onChange={(e) => setGdpGrowth(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1.0% (Recession)</span>
              <span>5.2% (Historical Avg)</span>
              <span>10.0% (Vision 2030 Goal)</span>
            </div>
          </div>

          {/* 2. Public Debt Servicing Share */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Debt Servicing as % of National Revenue:</span>
              <span className={`font-mono font-black px-2 py-0.5 rounded border ${
                debtServicingShare > 65
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : debtServicingShare > 50
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}>
                {debtServicingShare.toFixed(0)}% of Revenue
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="85"
              step="1"
              value={debtServicingShare}
              onChange={(e) => setDebtServicingShare(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>25% (Debt Free Zone)</span>
              <span>62% (Current Reality)</span>
              <span>85% (Default Risk)</span>
            </div>
          </div>

          {/* 3. KRA Revenue Collection Compliance */}
          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">KRA Tax Compliance & Digitization Rate:</span>
              <span className="font-mono font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {kraEfficiency.toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="1"
              value={kraEfficiency}
              onChange={(e) => setKraEfficiency(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50% (High Leakage)</span>
              <span>74% (Current Baseline)</span>
              <span>95% (Fully Automated)</span>
            </div>
          </div>

          {/* 4. Tax Rates Row (VAT & Corporate Tax) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>VAT Rate:</span>
                <span className="font-mono text-emerald-800">{vatRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="22"
                step="1"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Corporate Tax:</span>
                <span className="font-mono text-blue-800">{corporateTaxRate}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="40"
                step="1"
                value={corporateTaxRate}
                onChange={(e) => setCorporateTaxRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 2060 Dynamic Projection Dashboard (6 cols) */}
        <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 text-white flex flex-col justify-between space-y-5 border border-slate-800">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                PROJECTED 2060 OUTCOMES (33-YEAR HORIZON)
              </span>
              <span className="text-xs font-bold font-mono text-slate-400">
                Base Cost: KES {baseFiscalCostKESBillion}B
              </span>
            </div>

            {/* Solvency Status Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  Manifesto Fiscal Solvency Status:
                </span>
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded border ${
                  manifestoCoveragePct >= 100
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : manifestoCoveragePct >= 60
                    ? "bg-amber-950 text-amber-300 border-amber-700"
                    : "bg-rose-950 text-rose-300 border-rose-700"
                }`}>
                  {manifestoCoveragePct >= 100 ? "Fully Funded & Sustainable" : manifestoCoveragePct >= 60 ? "Partial Deficit Risk" : "Severe Fiscal Deficit"}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Available Annual Discretionary Cap:</span>
                  <span className="text-white font-bold">KES {discretionaryFiscalHeadroomKES.toLocaleString()} Billion / yr</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      manifestoCoveragePct >= 100 ? "bg-emerald-500" : manifestoCoveragePct >= 60 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${Math.min(100, manifestoCoveragePct)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Projected Macro Metrics Matrix */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">2060 Per Capita Income</span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  ${projectedPerCapitaUSD.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  (Baseline today: ~$2,100)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">2060 Debt-to-GDP</span>
                <span className={`text-xl font-black font-mono ${debtToGdp2060 <= 45 ? "text-emerald-400" : debtToGdp2060 <= 65 ? "text-amber-400" : "text-rose-400"}`}>
                  {debtToGdp2060}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  (Constitutional ceiling: &lt;55%)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Extreme Poverty Zero-Target</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  Year {povertyEradicationYear}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Based on compounding growth
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Total 2060 Economy Size</span>
                <span className="text-xl font-black text-white font-mono">
                  ${projected2060GdpUSD} Billion
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Nominal GDP trajectory
                </span>
              </div>
            </div>
          </div>

          {/* Article 201 Insight Banner */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Article 201(c) Burden-Sharing Verdict:</span>
            </span>
            <p className="leading-relaxed">
              {debtServicingShare > 65 
                ? "⚠️ High debt servicing (>65%) starves healthcare, schooling, and agricultural subsidies, passing disproportionate repayment liabilities onto the next generation."
                : gdpGrowth >= 7.0 
                ? "✅ High sustainable growth (>7%) generates sufficient fiscal space to fund universal public services without crowding out private credit or escalating foreign loans."
                : "⚖️ Moderate growth requires phased manifesto rollout across 5-year medium term expenditure frameworks (MTEF) to maintain debt stability."
              }
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
