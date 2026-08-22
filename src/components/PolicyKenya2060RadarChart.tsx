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
  Award,
  TrendingUp,
  AlertCircle,
  GraduationCap,
  HeartPulse,
  Coins,
  Wheat,
  Cpu,
  MapPin,
  Leaf,
  Layers,
  ChevronRight,
  Info,
  HelpCircle
} from "lucide-react";
import { EvaluationResult } from "../types";

interface PolicyKenya2060RadarChartProps {
  evaluationResult?: EvaluationResult | null;
  domainName?: string;
  policyTitle?: string;
  onOpenComparison?: () => void;
}

interface PillarMetric {
  pillarKey: string;
  pillarName: string;
  plainLanguageDefinition: string; // Plain language citizen definition on hover
  policyScore: number; // 0-10
  vision2060Target: number; // 0-10 benchmark (e.g. 8.5)
  statusQuoBaseline: number; // Current Kenya status (e.g. 5.0)
  iconName: string;
  pillarDescription: string;
  strengthsSummary: string;
  gapOrRisk: string;
  whyItMatters: string;
}

export const PolicyKenya2060RadarChart: React.FC<PolicyKenya2060RadarChartProps> = ({
  evaluationResult,
  domainName = "Economic Growth & Productivity",
  policyTitle = "Audited Policy Measure",
  onOpenComparison
}) => {
  const [selectedPillarKey, setSelectedPillarKey] = useState<string | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<PillarMetric | null>(null);
  const [showBenchmarks, setShowBenchmarks] = useState<boolean>(true);

  const scores = evaluationResult?.verdict_score;

  // Dynamically compute radar metrics across the 7 Kenya 2060 Pillars with plain-language definitions
  const radarData: PillarMetric[] = useMemo(() => {
    const safeDomain = (domainName || "").toLowerCase();
    const isEcon = safeDomain.includes("econ") || safeDomain.includes("cost");
    const isHealth = safeDomain.includes("health");
    const isEdu = safeDomain.includes("edu") || safeDomain.includes("cbc");
    const isAgri = safeDomain.includes("agri") || safeDomain.includes("food");
    const isTech = safeDomain.includes("tech") || safeDomain.includes("youth");
    const isDevol = safeDomain.includes("devol") || safeDomain.includes("count");
    const isInfra = safeDomain.includes("housing") || safeDomain.includes("infra");

    const baseRigor = scores ? scores.kenya_2060_alignment_score : 7;
    const fiscalRigor = scores ? scores.fiscal_realism_score : 6;
    const constRigor = scores ? scores.constitutional_viability_score : 8;
    const implRigor = scores ? scores.implementation_readiness_score : 7;

    return [
      {
        pillarKey: "econ",
        pillarName: "Economic Stability",
        plainLanguageDefinition: "Ensures low inflation, affordable cost of living, sustainable public debt, and stable shilling currency so wananchi and small businesses can plan and grow safely without runaway prices.",
        policyScore: Math.min(10, Math.max(2, isEcon ? baseRigor : Math.round((fiscalRigor * 0.7 + baseRigor * 0.3) * 10) / 10)),
        vision2060Target: 8.8,
        statusQuoBaseline: 5.4,
        iconName: "Coins",
        pillarDescription: "Macroeconomic resilience, debt-to-GDP sustainability, and formal job creation.",
        strengthsSummary: "Aligns with Article 201 intergenerational fairness and domestic capital formation.",
        gapOrRisk: fiscalRigor < 6 ? "Requires concrete revenue source to prevent sovereign debt default." : "Medium-term inflationary pressures require CBK monetary coordination.",
        whyItMatters: "Prevents high tax burdens and cuts future public borrowing costs."
      },
      {
        pillarKey: "health",
        pillarName: "Healthcare & Wellness",
        plainLanguageDefinition: "Guarantees every Kenyan citizen has reliable access to functional, equipped public hospitals (Level 4/5), emergency care, maternal safety, and essential medicines without impoverishing medical bills.",
        policyScore: Math.min(10, Math.max(2, isHealth ? Math.max(baseRigor, 8) : Math.round((baseRigor * 0.6 + implRigor * 0.4 - (isEcon ? 0.5 : 0)) * 10) / 10)),
        vision2060Target: 9.0,
        statusQuoBaseline: 5.1,
        iconName: "HeartPulse",
        pillarDescription: "Universal primary healthcare, medical equipment reliability, and life expectancy expansion.",
        strengthsSummary: "Safeguards Article 43 constitutional rights to highest attainable health standards.",
        gapOrRisk: "Requires prompt exchequer disbursements to Level 4/5 county referral facilities.",
        whyItMatters: "Eliminates medical bankruptcies for ordinary Kenyan households."
      },
      {
        pillarKey: "edu",
        pillarName: "Education & Skills",
        plainLanguageDefinition: "Equips Kenyan youth and children through quality CBC school curricula, fully funded TVET vocational polytechnics, and competitive university STEM research linked directly to high-paying jobs.",
        policyScore: Math.min(10, Math.max(2, isEdu ? Math.max(baseRigor, 8.5) : Math.round((baseRigor * 0.65 + constRigor * 0.35) * 10) / 10)),
        vision2060Target: 8.9,
        statusQuoBaseline: 5.8,
        iconName: "GraduationCap",
        pillarDescription: "CBC alignment, STEM university research capacity, and TVET vocational readiness.",
        strengthsSummary: "Prepares youth workforce for competitive 21st-century continental job markets.",
        gapOrRisk: "Capitation formula must be shielded from mid-year fiscal budget cuts.",
        whyItMatters: "Bridges the youth unemployment gap with world-class technical skills."
      },
      {
        pillarKey: "agri",
        pillarName: "Food Sovereignty",
        plainLanguageDefinition: "Shields Kenya from hunger and high food prices through modern solar irrigation, grain storage silos, affordable farm inputs, and fair guaranteed minimum returns for local farmers.",
        policyScore: Math.min(10, Math.max(2, isAgri ? Math.max(baseRigor, 8.2) : Math.round((baseRigor * 0.5 + fiscalRigor * 0.5) * 10) / 10)),
        vision2060Target: 8.5,
        statusQuoBaseline: 4.8,
        iconName: "Wheat",
        pillarDescription: "Irrigation infrastructure, grain reserves, and farmer post-harvest income protection.",
        strengthsSummary: "Directly insulates household budgets from global commodity and climate price shocks.",
        gapOrRisk: "Requires transparent NCPB management and water user association oversight.",
        whyItMatters: "Brings down the price of unga, milk, and vegetables for all families."
      },
      {
        pillarKey: "tech",
        pillarName: "Digital & Industrial",
        plainLanguageDefinition: "Builds high-speed public fiber, constituency digital hubs, and local manufacturing processing zones so youth in all 290 constituencies can work online and build sovereign technology.",
        policyScore: Math.min(10, Math.max(2, isTech || isInfra ? Math.max(baseRigor, 8.4) : Math.round((baseRigor * 0.7 + implRigor * 0.3) * 10) / 10)),
        vision2060Target: 9.2,
        statusQuoBaseline: 5.6,
        iconName: "Cpu",
        pillarDescription: "Sub-county innovation centers, fiber broadband reach, and local manufacturing value add.",
        strengthsSummary: "Decentralizes knowledge economy jobs beyond Nairobi to all 290 constituencies.",
        gapOrRisk: "Requires stable national power grid and sovereign data protection compliance.",
        whyItMatters: "Unlocks remote digital exports and high-tech manufacturing opportunities."
      },
      {
        pillarKey: "devol",
        pillarName: "Devolution & Equity",
        plainLanguageDefinition: "Upholds the 2010 Constitution by guaranteeing that all 47 counties receive timely revenue disbursements and marginalized regions receive Equalization Fund investments for clean water and roads.",
        policyScore: Math.min(10, Math.max(2, isDevol ? Math.max(baseRigor, 8.6) : Math.round((constRigor * 0.6 + baseRigor * 0.4) * 10) / 10)),
        vision2060Target: 8.7,
        statusQuoBaseline: 5.5,
        iconName: "MapPin",
        pillarDescription: "Equitable development across all 47 counties and Equalization Fund allocations.",
        strengthsSummary: "Upholds Article 201(b) resource equalization for historically marginalized counties.",
        gapOrRisk: "Needs statutory ring-fencing against delayed Treasury monthly releases.",
        whyItMatters: "Prevents development from being concentrated only in major urban centers."
      },
      {
        pillarKey: "climate",
        pillarName: "Climate Resilience",
        plainLanguageDefinition: "Protects Kenya's rivers, forests, and farming communities from catastrophic droughts and floods through clean geothermal/solar power, 30% national tree cover, and watershed conservation.",
        policyScore: Math.min(10, Math.max(2, Math.round((baseRigor * 0.6 + constRigor * 0.3 + (isAgri || isInfra ? 1.0 : 0)) * 10) / 10)),
        vision2060Target: 8.6,
        statusQuoBaseline: 5.0,
        iconName: "Leaf",
        pillarDescription: "Clean energy transition, 30% national tree cover, and sustainable water catchment protection.",
        strengthsSummary: "Protects long-term natural capital and shields vulnerable rural livelihoods.",
        gapOrRisk: "Requires strict adherence to NEMA environmental impact assessments.",
        whyItMatters: "Safeguards water access and shields pastoralist and farming communities."
      }
    ];
  }, [domainName, scores]);

  // Overall Average 2060 Alignment Score
  const averagePillarScore = useMemo(() => {
    const sum = radarData.reduce((acc, curr) => acc + curr.policyScore, 0);
    return Math.round((sum / radarData.length) * 10) / 10;
  }, [radarData]);

  const activePillar = useMemo(() => {
    return hoveredPillar || radarData.find((p) => p.pillarKey === selectedPillarKey) || radarData[0];
  }, [radarData, selectedPillarKey, hoveredPillar]);

  // Custom PolarAngleAxis Tick with hover trigger
  const renderCustomAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = radarData.find((p) => p.pillarName === payload.value);
    const isHovered = hoveredPillar?.pillarName === payload.value;

    return (
      <g
        transform={`translate(${x},${y})`}
        onMouseEnter={() => item && setHoveredPillar(item)}
        onMouseLeave={() => setHoveredPillar(null)}
        onClick={() => item && setSelectedPillarKey(item.pillarKey)}
        className="cursor-pointer group"
      >
        <text
          x={0}
          y={0}
          dy={3}
          textAnchor="middle"
          fill={isHovered ? "#7e22ce" : "#334155"}
          fontSize={10}
          fontWeight={isHovered ? 800 : 600}
          className="transition-colors duration-150"
        >
          {payload.value}
        </text>
        <circle
          cx={0}
          cy={-10}
          r={isHovered ? 3 : 2}
          fill={isHovered ? "#a855f7" : "#cbd5e1"}
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6" id="kenya-2060-radar-container">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
              <Target className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Kenya 2060 Strategic Alignment
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
            Kenya 2060 Development Outcome Radar Analysis
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            Hover over any pillar label below or inside the chart to inspect its plain-language citizen definition and statutory 2060 target.
          </p>
        </div>

        {/* Benchmark Toggle & Comparison Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onOpenComparison && (
            <button
              onClick={onOpenComparison}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-2xs cursor-pointer"
              title="Compare this policy's Kenya 2060 radar chart side-by-side with another proposal in a modal"
              id="open-radar-comparison-modal-btn"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Compare 2 Policies Side-by-Side</span>
            </button>
          )}

          <button
            onClick={() => setShowBenchmarks(!showBenchmarks)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              showBenchmarks
                ? "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showBenchmarks ? "Hide Benchmarks" : "Show 2060 Targets"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Plain-Language Hover Definition Banner (Always visible or updates dynamically on hover) */}
      <div className={`p-4 rounded-xl border transition-all duration-200 ${
        hoveredPillar 
          ? "bg-purple-50/90 border-purple-300 shadow-xs" 
          : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-purple-200 text-purple-900 font-bold text-xs">
                {activePillar.pillarName}
              </span>
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">
                Plain-Language Citizen Meaning:
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              “{activePillar.plainLanguageDefinition}”
            </p>
          </div>

          <div className="shrink-0 text-right hidden sm:block font-mono text-xs">
            <div className="text-[10px] text-slate-400 uppercase">2060 Target</div>
            <div className="font-bold text-purple-700 text-sm">{activePillar.vision2060Target}/10</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Pillar Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Recharts Radar Visualization (7 Cols) */}
        <div className="lg:col-span-7 h-84 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="pillarName"
                tick={renderCustomAxisTick}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                stroke="#cbd5e1"
              />

              {/* Status Quo Baseline (Grey) */}
              {showBenchmarks && (
                <Radar
                  name="Status Quo Baseline (5.2/10)"
                  dataKey="statusQuoBaseline"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.15}
                  strokeDasharray="2 2"
                />
              )}

              {/* Kenya 2060 Goal Target (Gold/Purple) */}
              {showBenchmarks && (
                <Radar
                  name="Kenya 2060 Statutory Target (8.8/10)"
                  dataKey="vision2060Target"
                  stroke="#a855f7"
                  fill="#c084fc"
                  fillOpacity={0.2}
                />
              )}

              {/* Policy Proposal Score (Emerald) */}
              <Radar
                name="Proposed Policy Impact Score"
                dataKey="policyScore"
                stroke="#059669"
                fill="#10b981"
                fillOpacity={0.45}
                strokeWidth={2.5}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as PillarMetric;
                    return (
                      <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-xs animate-in fade-in duration-150">
                        <div className="font-bold text-slate-100 border-b border-slate-700 pb-1 flex items-center justify-between">
                          <span className="text-purple-300 font-bold">{item.pillarName}</span>
                          <span className="text-emerald-400 font-mono font-bold text-sm">
                            {item.policyScore}/10
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-200 bg-slate-800/80 p-2 rounded border border-slate-700 leading-snug">
                          <strong className="text-purple-300 block text-[10px] uppercase mb-0.5">Citizen Meaning:</strong>
                          {item.plainLanguageDefinition}
                        </div>
                        <div className="pt-1 text-[10px] space-y-0.5 font-mono text-slate-400">
                          <div>• Policy Score: <strong className="text-emerald-300">{item.policyScore}/10</strong></div>
                          <div>• 2060 Statutory Target: <strong className="text-purple-300">{item.vision2060Target}/10</strong></div>
                          <div>• Status Quo Baseline: <strong className="text-slate-300">{item.statusQuoBaseline}/10</strong></div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column: Interactive Pillar Inspector & Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Pillar Scrutiny Inspector
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                Avg: {averagePillarScore}/10
              </span>
            </div>

            {/* Quick Pillar Selector Chips with Hover Tooltips */}
            <div className="flex flex-wrap gap-1.5">
              {radarData.map((p) => {
                const isCurrent = activePillar.pillarKey === p.pillarKey;
                return (
                  <button
                    key={p.pillarKey}
                    onMouseEnter={() => setHoveredPillar(p)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    onClick={() => setSelectedPillarKey(p.pillarKey)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all border cursor-pointer ${
                      isCurrent
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs font-bold"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-purple-300"
                    }`}
                    title={p.plainLanguageDefinition}
                  >
                    {p.pillarName.split(" ")[0]} ({p.policyScore})
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Card */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{activePillar.pillarName}</h4>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-medium text-slate-500">Score:</span>
                  <span className="text-base font-black text-emerald-700 font-mono">
                    {activePillar.policyScore}/10
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-purple-700 block">Plain-Language Definition:</span>
                <p className="text-slate-800 font-medium leading-snug">{activePillar.plainLanguageDefinition}</p>
              </div>

              {/* Strengths */}
              <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-0.5">
                <div className="font-bold flex items-center gap-1 text-[11px] text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Projected Long-Term Strengths:</span>
                </div>
                <p className="text-[11.5px] leading-snug">{activePillar.strengthsSummary}</p>
              </div>

              {/* Critical Gap or Bottleneck */}
              <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-0.5">
                <div className="font-bold flex items-center gap-1 text-[11px] text-amber-800">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Risk / Article 201 Scrutiny:</span>
                </div>
                <p className="text-[11.5px] leading-snug">{activePillar.gapOrRisk}</p>
              </div>

              {/* Why it Matters in 2027 */}
              <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1">
                <span className="font-semibold text-slate-700">Citizen Impact:</span>
                <span>{activePillar.whyItMatters}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

