import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import { 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  Sliders, 
  RefreshCw, 
  DollarSign, 
  PieChart as PieChartIcon,
  Scale
} from "lucide-react";
import { HISTORICAL_BUDGET_DATA } from "../data/regionalPrioritiesData";

interface PolicyFiscalImpactChartProps {
  policyTitle?: string;
  defaultCostKesBillions?: number;
  defaultSector?: string;
}

export const PolicyFiscalImpactChart: React.FC<PolicyFiscalImpactChartProps> = ({
  policyTitle = "Proposed 2027 Manifesto Policy Package",
  defaultCostKesBillions = 140,
  defaultSector = "education"
}) => {
  const [policyCost, setPolicyCost] = useState<number>(defaultCostKesBillions);
  const [financingMode, setFinancingMode] = useState<"borrowing" | "reallocation" | "taxation">("borrowing");
  const [targetSector, setTargetSector] = useState<string>(defaultSector);
  const [chartView, setChartView] = useState<"sector-breakdown" | "revenue-vs-debt">("sector-breakdown");

  // Project Future Fiscal Years (2026/27, 2027/28, 2028/29) based on chosen policy parameters
  const chartData = [
    ...HISTORICAL_BUDGET_DATA.map((h) => ({
      year: `FY ${h.fiscalYear}`,
      isProjected: false,
      debtService: h.debtService,
      education: h.education,
      health: h.health,
      devolution: h.devolutionEquitableShare,
      infraWater: h.infrastructureAndWater,
      agriculture: h.agriculture,
      totalBudget: h.totalExpenditure,
      revenue: h.ordinaryRevenue,
      deficit: h.fiscalDeficit,
      policyIncrementalImpact: 0,
      debtServiceRatio: Math.round((h.debtService / h.ordinaryRevenue) * 100)
    })),
    // Future Projections with incremental policy impact
    {
      year: "FY 2026/27 (Proj)",
      isProjected: true,
      debtService: financingMode === "borrowing" ? 1980 + Math.round(policyCost * 0.12) : 1980,
      education: targetSector === "education" ? 720 + policyCost : 720,
      health: targetSector === "health" ? 175 + policyCost : 175,
      devolution: targetSector === "devolution" ? 440 + policyCost : 440,
      infraWater: targetSector === "infra" ? 430 + policyCost : 430,
      agriculture: targetSector === "agriculture" ? 95 + policyCost : 95,
      totalBudget: financingMode === "reallocation" ? 4480 : 4480 + policyCost,
      revenue: financingMode === "taxation" ? 3600 + Math.round(policyCost * 0.85) : 3600,
      deficit: financingMode === "borrowing" ? 880 + policyCost : financingMode === "taxation" ? 880 + Math.round(policyCost * 0.15) : 880,
      policyIncrementalImpact: policyCost,
      debtServiceRatio: Math.round(((financingMode === "borrowing" ? 1980 + Math.round(policyCost * 0.12) : 1980) / (financingMode === "taxation" ? 3600 + Math.round(policyCost * 0.85) : 3600)) * 100)
    },
    {
      year: "FY 2027/28 (2027 Manifesto Year 1)",
      isProjected: true,
      debtService: financingMode === "borrowing" ? 2120 + Math.round(policyCost * 0.22) : 2120,
      education: targetSector === "education" ? 760 + Math.round(policyCost * 1.1) : 760,
      health: targetSector === "health" ? 190 + Math.round(policyCost * 1.1) : 190,
      devolution: targetSector === "devolution" ? 465 + Math.round(policyCost * 1.1) : 465,
      infraWater: targetSector === "infra" ? 450 + Math.round(policyCost * 1.1) : 450,
      agriculture: targetSector === "agriculture" ? 110 + Math.round(policyCost * 1.1) : 110,
      totalBudget: financingMode === "reallocation" ? 4750 : 4750 + Math.round(policyCost * 1.1),
      revenue: financingMode === "taxation" ? 3850 + Math.round(policyCost * 0.95) : 3850,
      deficit: financingMode === "borrowing" ? 900 + Math.round(policyCost * 1.1) : 900,
      policyIncrementalImpact: Math.round(policyCost * 1.1),
      debtServiceRatio: Math.round(((financingMode === "borrowing" ? 2120 + Math.round(policyCost * 0.22) : 2120) / (financingMode === "taxation" ? 3850 + Math.round(policyCost * 0.95) : 3850)) * 100)
    },
    {
      year: "FY 2028/29 (Manifesto Year 2)",
      isProjected: true,
      debtService: financingMode === "borrowing" ? 2280 + Math.round(policyCost * 0.35) : 2280,
      education: targetSector === "education" ? 810 + Math.round(policyCost * 1.15) : 810,
      health: targetSector === "health" ? 210 + Math.round(policyCost * 1.15) : 210,
      devolution: targetSector === "devolution" ? 490 + Math.round(policyCost * 1.15) : 490,
      infraWater: targetSector === "infra" ? 470 + Math.round(policyCost * 1.15) : 470,
      agriculture: targetSector === "agriculture" ? 125 + Math.round(policyCost * 1.15) : 125,
      totalBudget: financingMode === "reallocation" ? 5050 : 5050 + Math.round(policyCost * 1.15),
      revenue: financingMode === "taxation" ? 4150 + Math.round(policyCost * 1.05) : 4150,
      deficit: financingMode === "borrowing" ? 900 + Math.round(policyCost * 1.15) : 900,
      policyIncrementalImpact: Math.round(policyCost * 1.15),
      debtServiceRatio: Math.round(((financingMode === "borrowing" ? 2280 + Math.round(policyCost * 0.35) : 2280) / (financingMode === "taxation" ? 4150 + Math.round(policyCost * 1.05) : 4150)) * 100)
    }
  ];

  const latestProjectedDebtRatio = chartData[chartData.length - 1].debtServiceRatio;
  const isHighFiscalRisk = latestProjectedDebtRatio > 55 || (financingMode === "borrowing" && policyCost > 200);

  return (
    <div id="policy-fiscal-impact-chart" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Article 201 Public Finance Projection Model (MTEF)
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Projected Fiscal Impact vs. Historical Budget Allocations
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            Simulating multi-year budgetary absorption across KES 4+ Trillion national spending and evaluating sovereign debt service "First Charge" stress testing.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setChartView("sector-breakdown")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              chartView === "sector-breakdown"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sector Spending Impact
          </button>
          <button
            onClick={() => setChartView("revenue-vs-debt")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              chartView === "revenue-vs-debt"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Revenue vs Debt Service Ratio
          </button>
        </div>
      </div>

      {/* Interactive Simulation Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 my-5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        {/* Cost Slider */}
        <div>
          <div className="flex justify-between font-semibold text-slate-700 mb-1">
            <span>Simulated Policy Annual Cost:</span>
            <span className="text-emerald-700 font-bold">KES {policyCost} Billion</span>
          </div>
          <input
            type="range"
            min="20"
            max="400"
            step="10"
            value={policyCost}
            onChange={(e) => setPolicyCost(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-2xs text-slate-400 mt-1">
            <span>KES 20B (Modest)</span>
            <span>KES 200B (Large)</span>
            <span>KES 400B (Massive)</span>
          </div>
        </div>

        {/* Financing Mechanism */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Financing Channel (Article 201):</label>
          <select
            value={financingMode}
            onChange={(e) => setFinancingMode(e.target.value as any)}
            className="w-full rounded-lg border border-slate-300 p-2 text-xs bg-white text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            <option value="borrowing">Domestic / Commercial Debt Borrowing</option>
            <option value="reallocation">Reallocation from Recurrent Admin Waste</option>
            <option value="taxation">New Tax Measures & KRA Expansion</option>
          </select>
        </div>

        {/* Sector Channel */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Target Sector Allocation:</label>
          <select
            value={targetSector}
            onChange={(e) => setTargetSector(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2 text-xs bg-white text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            <option value="education">Education & Capitation</option>
            <option value="health">Health & Universal Care</option>
            <option value="devolution">Devolution Equitable Share (47 Counties)</option>
            <option value="infra">Infrastructure, Roads & Water</option>
            <option value="agriculture">Agriculture & Fertilizer Subsidies</option>
          </select>
        </div>
      </div>

      {/* Main Chart Canvas Container */}
      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartView === "sector-breakdown" ? (
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#475569" }}
                label={{ value: "KES Billions", angle: -90, position: "insideLeft", fontSize: 11, fill: "#64748b" }}
              />
              <Tooltip
                formatter={(value: any, name: any) => [`KES ${Number(value).toLocaleString()} Billion`, name]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <ReferenceLine x="FY 2025/26 (Est.)" stroke="#94a3b8" strokeDasharray="3 3" label={{ value: "Historical | Projected", fill: "#64748b", fontSize: 10 }} />
              
              <Bar dataKey="debtService" name="Debt Service (First Charge)" fill="#ef4444" stackId="a" />
              <Bar dataKey="education" name="Education" fill="#3b82f6" stackId="a" />
              <Bar dataKey="health" name="Healthcare" fill="#10b981" stackId="a" />
              <Bar dataKey="devolution" name="Devolution Equitable Share" fill="#8b5cf6" stackId="a" />
              <Bar dataKey="infraWater" name="Infrastructure & Water" fill="#f59e0b" stackId="a" />
              <Bar dataKey="agriculture" name="Agriculture" fill="#84cc16" stackId="a" />
              
              <Line type="monotone" dataKey="totalBudget" name="Total National Budget" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 4 }} />
            </ComposedChart>
          ) : (
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "#475569" }}
                label={{ value: "KES Billions", angle: -90, position: "insideLeft", fontSize: 11, fill: "#64748b" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "#ef4444" }}
                label={{ value: "Debt Service % of Revenue", angle: 90, position: "insideRight", fontSize: 11, fill: "#ef4444" }}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  name.includes("%") ? `${value}%` : `KES ${Number(value).toLocaleString()} Billion`,
                  name
                ]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "12px" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <ReferenceLine yAxisId="right" y={50} stroke="#dc2626" strokeDasharray="4 4" label={{ value: "50% Debt Stress Threshold", fill: "#dc2626", fontSize: 10 }} />
              
              <Area yAxisId="left" type="monotone" dataKey="revenue" name="Ordinary Tax Revenue" fill="#10b98120" stroke="#10b981" strokeWidth={2} />
              <Bar yAxisId="left" dataKey="debtService" name="Debt Service Amount" fill="#ef444480" />
              <Line yAxisId="right" type="monotone" dataKey="debtServiceRatio" name="Debt Service % of Revenue" stroke="#dc2626" strokeWidth={3} dot={{ r: 4, fill: "#dc2626" }} />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Dynamic Fiscal Risk Assessment Callout */}
      <div className={`mt-5 p-4 rounded-xl border text-xs flex items-start gap-3 ${
        isHighFiscalRisk 
          ? "bg-rose-50 border-rose-200 text-rose-900" 
          : "bg-emerald-50 border-emerald-200 text-emerald-900"
      }`}>
        {isHighFiscalRisk ? (
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        ) : (
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <span className="font-bold block">
            {isHighFiscalRisk 
              ? `Fiscal Risk Alert: Debt Service absorbs ${latestProjectedDebtRatio}% of Ordinary Revenue` 
              : `Article 201 Fiscal Balance: Sustainable Multi-Year Trajectory (${latestProjectedDebtRatio}% Debt Ratio)`}
          </span>
          <p className="text-2xs sm:text-xs opacity-90 leading-relaxed">
            {financingMode === "borrowing" 
              ? "Financing this manifesto commitment through debt borrowing increases mandatory Consolidated Fund Services interest payments, crowding out discretionary capitation and county hospital medicine budgets."
              : financingMode === "taxation"
              ? "Financing through new revenue requires realistic GDP expansion modeling. If tax targets fall short, the deficit will inevitably trigger unbudgeted mini-budgets."
              : "Reallocating from recurrent executive overhead is the most Article 201-compliant pathway, but requires statutory legislative enforcement through the Appropriations Act."}
          </p>
        </div>
      </div>
    </div>
  );
};
