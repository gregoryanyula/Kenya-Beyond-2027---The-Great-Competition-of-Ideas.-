import React, { useState, useMemo } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Zap, 
  Wheat, 
  Cpu, 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  ExternalLink,
  Sliders,
  Sparkles,
  Info,
  Calendar,
  Layers
} from "lucide-react";

export interface TargetGoal {
  id: string;
  name: string;
  category: "Healthcare" | "Education" | "Economic Stability" | "Green Energy" | "Food Sovereignty" | "Digital Tech" | "Governance";
  icon: React.ElementType;
  description: string;
  currentProgressPct: number;
  vision2030MilestonePct: number;
  vision2045MilestonePct: number;
  target2060Pct: number;
  keyIndicators: {
    label: string;
    baseline: string;
    current: string;
    target2060: string;
  }[];
  auditFindingsSummary: string;
  riskFactor: string;
  recommendedAuditTopics: string[];
}

const KENYA_2060_TARGET_GOALS: TargetGoal[] = [
  {
    id: "goal-healthcare",
    name: "Universal Healthcare Coverage & Domestic Bio-Manufacturing",
    category: "Healthcare",
    icon: Heart,
    description: "Eliminating catastrophic out-of-pocket health bankruptcies, achieving 100% primary healthcare digitization, and manufacturing 80%+ of essential pharmaceuticals domestically.",
    currentProgressPct: 54,
    vision2030MilestonePct: 70,
    vision2045MilestonePct: 88,
    target2060Pct: 100,
    keyIndicators: [
      { label: "Universal Primary Health Coverage", baseline: "34%", current: "52%", target2060: "100%" },
      { label: "Domestic Medicine & Vaccine Production", baseline: "18%", current: "26%", target2060: "85%" },
      { label: "Out-of-Pocket Expenditure as % of Total", baseline: "42%", current: "31%", target2060: "< 8%" },
      { label: "Doctor-to-Population Ratio", baseline: "1 : 6,000", current: "1 : 4,200", target2060: "1 : 600" }
    ],
    auditFindingsSummary: "Audited 2027 manifestos demonstrate high ambition on primary healthcare digitisation, but 65% lack legally protected funding mechanisms to prevent SHA treasury diversion.",
    riskFactor: "Reliance on recurrent exchequer borrowing rather than ring-fenced actuarial contributions risks hospital claim gridlocks.",
    recommendedAuditTopics: [
      "SHA Primary Care Fund Actuarial Solvency",
      "Kenya Biovax Domestic Vaccine Manufacturing CapEx",
      "County Level 4 & 5 Oncology Centers Equipment Maintenance"
    ]
  },
  {
    id: "goal-education",
    name: "Universal Quality Education & Technical Skills Capital",
    category: "Education",
    icon: GraduationCap,
    description: "Equitable, globally competitive Competency-Based Education (CBC), free basic schooling ring-fencing, and subsidized TVET producing world-class industrial technicians.",
    currentProgressPct: 62,
    vision2030MilestonePct: 75,
    vision2045MilestonePct: 90,
    target2060Pct: 100,
    keyIndicators: [
      { label: "Free Basic Education Transition Rate", baseline: "78%", current: "89%", target2060: "100%" },
      { label: "TVET Dual-Training Enrollment", baseline: "140k", current: "320k", target2060: "1.8M" },
      { label: "Higher Education Means-Testing Equity", baseline: "45%", current: "58%", target2060: "98%" },
      { label: "Digital Devices per Classroom", baseline: "0.2", current: "0.8", target2060: "1.0 (1:1)" }
    ],
    auditFindingsSummary: "Aggregated audit data shows strong consensus on maintaining CBC, yet Junior Secondary School capitation deficits remain a major uncosted liability in 78% of assessed party pledges.",
    riskFactor: "Delayed exchequer capitation transfers force schools to charge informal levies, violating Article 53(1)(b).",
    recommendedAuditTopics: [
      "JSS Capitation per Learner Statutory Indexing",
      "HEF / HELB Vulnerability Band 1 Full Subsidy Protection",
      "National STEM & Robotics Curriculum Infrastructure"
    ]
  },
  {
    id: "goal-economic-stability",
    name: "Fiscal Realism, Sovereign Debt Sustainability & Industrial Growth",
    category: "Economic Stability",
    icon: DollarSign,
    description: "Prudent Article 201 public debt management, sustainable debt-to-GDP (<50%), zero-based budgeting, and high-value export manufacturing creating 1M+ formal jobs annually.",
    currentProgressPct: 42,
    vision2030MilestonePct: 60,
    vision2045MilestonePct: 82,
    target2060Pct: 100,
    keyIndicators: [
      { label: "Public Debt-to-GDP Ratio", baseline: "71%", current: "66%", target2060: "< 45%" },
      { label: "Debt Service as % of Ordinary Revenue", baseline: "68%", current: "57%", target2060: "< 25%" },
      { label: "Manufacturing Share of GDP", baseline: "7.2%", current: "8.1%", target2060: "22%" },
      { label: "Formal Youth Employment Rate", baseline: "28%", current: "36%", target2060: "85%" }
    ],
    auditFindingsSummary: "Our aggregated audit framework indicates that 82% of campaign promises require new borrowing unless unbudgeted tax exemptions (KES 380B/yr) are aggressively repealed.",
    riskFactor: "First-charge Consolidated Fund debt service squeezing out critical healthcare, road maintenance, and agricultural funds.",
    recommendedAuditTopics: [
      "Tax Expenditure Rationalization & Exemption Repeals",
      "Independent Public Debt Management Office Transparency",
      "Export Processing Zones (EPZ) Value Addition Incentives"
    ]
  },
  {
    id: "goal-green-energy",
    name: "100% Clean Green Energy Grid & Regional Power Export",
    category: "Green Energy",
    icon: Zap,
    description: "Unlocking 10,000MW of geothermal, wind, solar, and green hydrogen with industrial power tariffs below $0.08/kWh, powering East African industrial manufacturing.",
    currentProgressPct: 78,
    vision2030MilestonePct: 90,
    vision2045MilestonePct: 96,
    target2060Pct: 100,
    keyIndicators: [
      { label: "Renewable Electricity Generation Share", baseline: "86%", current: "92%", target2060: "100%" },
      { label: "Installed Geothermal Capacity", baseline: "950 MW", current: "1,200 MW", target2060: "5,000 MW" },
      { label: "Industrial Power Tariff ($/kWh)", baseline: "$0.18", current: "$0.14", target2060: "$0.07" },
      { label: "Regional EAPP Clean Power Export", baseline: "200 GWh", current: "750 GWh", target2060: "8,000 GWh" }
    ],
    auditFindingsSummary: "Kenya leads Africa in renewable generation; however, audits find that costly legacy Thermal Take-or-Pay Power Purchase Agreements (PPAs) artificially keep consumer bills high.",
    riskFactor: "Failure to renegotiate expensive commercial PPAs delays industrial tariff relief.",
    recommendedAuditTopics: [
      "Thermal PPA Phased Buyouts & Decommissioning",
      "Menengai & Olkaria Phase 7 Geothermal Wells Expansion",
      "Green Hydrogen Fertilizer Synthesis Facility"
    ]
  },
  {
    id: "goal-food-sovereignty",
    name: "Water Sovereignty & Climate-Proofed Agriculture Grid",
    category: "Food Sovereignty",
    icon: Wheat,
    description: "Expanding irrigated agricultural land from 650k acres to over 3 million acres across Galana-Kulalu, Tana, and Ewaso Nyiro basins, guaranteeing national food security.",
    currentProgressPct: 38,
    vision2030MilestonePct: 55,
    vision2045MilestonePct: 80,
    target2060Pct: 100,
    keyIndicators: [
      { label: "Land Under Modern Irrigation (Acres)", baseline: "550k", current: "710k", target2060: "3.2M" },
      { label: "National Strategic Grain Reserve (Bags)", baseline: "1.2M", current: "3.5M", target2060: "10M" },
      { label: "Post-Harvest Crop Loss Percentage", baseline: "35%", current: "26%", target2060: "< 6%" },
      { label: "Agricultural Value Addition Export %", baseline: "16%", current: "22%", target2060: "70%" }
    ],
    auditFindingsSummary: "Audited manifesto data reveals high vulnerability to drought cycles; 71% of pledges rely on subsidized fertilizer imports rather than long-term mega-dam water catchment infrastructure.",
    riskFactor: "Climate variability and stalled mega-dam construction trigger recurrent famine appeals and high food inflation.",
    recommendedAuditTopics: [
      "High Grand Falls & Thwake Dam Irrigation Canals",
      "County Aggregation & Industrial Parks (CAIPs) Cold Storage",
      "Smallholder Solar Irrigation Equipment Tax Exemptions"
    ]
  },
  {
    id: "goal-digital-tech",
    name: "Silicon Savannah Digital Public Infrastructure & Sovereign AI",
    category: "Digital Tech",
    icon: Cpu,
    description: "100% optic fiber coverage across all 1,450 wards, local semiconductor assembly, sovereign Swahili AI foundational models, and world-class digital government services.",
    currentProgressPct: 60,
    vision2030MilestonePct: 75,
    vision2045MilestonePct: 92,
    target2060Pct: 100,
    keyIndicators: [
      { label: "National Optic Fiber Backbone (NOFBI km)", baseline: "9,000", current: "14,500", target2060: "100,000" },
      { label: "Public Services Fully Automated Digitally", baseline: "42%", current: "74%", target2060: "100%" },
      { label: "Digital Economy Contribution to GDP", baseline: "3.8%", current: "6.2%", target2060: "20%" },
      { label: "Broadband Household Penetration", baseline: "22%", current: "38%", target2060: "95%" }
    ],
    auditFindingsSummary: "Digitization scores high in feasibility across all political coalitions; key risk noted in audits is cybersecurity vulnerabilities and weak enforcement of Data Protection standards.",
    riskFactor: "Fragmented ICT procurement across ministries creating siloed legacy software systems.",
    recommendedAuditTopics: [
      "Universal Last-Mile Fiber to Public Schools & Dispensaries",
      "Sovereign Kenyan Swahili LLM Research Funding",
      "Konza Technopolis Data Center Green Power Interconnect"
    ]
  },
  {
    id: "goal-governance",
    name: "Institutional Integrity, Open Data Procurement & Judicial Autonomy",
    category: "Governance",
    icon: Scale,
    description: "Ring-fenced Judiciary Fund (2.5% of national revenue), 100% open-contracting public procurement, automated asset declarations, and zero-tolerance for public embezzlement.",
    currentProgressPct: 46,
    vision2030MilestonePct: 65,
    vision2045MilestonePct: 85,
    target2060Pct: 100,
    keyIndicators: [
      { label: "Judiciary Budget as % of National Budget", baseline: "0.8%", current: "1.1%", target2060: "2.5%" },
      { label: "Public Procurement E-Portal Open Transparency", baseline: "30%", current: "52%", target2060: "100%" },
      { label: "Auditor-General Recommendations Enacted", baseline: "28%", current: "39%", target2060: "90%" },
      { label: "Whistleblower Protection Index", baseline: "35/100", current: "48/100", target2060: "95/100" }
    ],
    auditFindingsSummary: "Constitutional audit analysis highlights that while party manifestos pledge anti-corruption, less than 20% propose binding timelines for digitizing wealth declarations of public officers.",
    riskFactor: "Executive clawback on constitutional commissions and slow enforcement of court orders.",
    recommendedAuditTopics: [
      "Automated E-Procurement Beneficial Ownership Registry",
      "Conflict of Interest Bill Strict Passage",
      "Full Operationalization of the Judiciary Fund"
    ]
  }
];

interface Kenya2060ProgressDashboardProps {
  onAuditTopic?: (topic: string, domain: string) => void;
}

export const Kenya2060ProgressDashboard: React.FC<Kenya2060ProgressDashboardProps> = ({ onAuditTopic }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedGoalId, setSelectedGoalId] = useState<string>(KENYA_2060_TARGET_GOALS[0].id);
  const [viewHorizon, setViewHorizon] = useState<"current" | "2030" | "2045" | "2060">("current");

  const filteredGoals = useMemo(() => {
    if (selectedFilter === "all") return KENYA_2060_TARGET_GOALS;
    return KENYA_2060_TARGET_GOALS.filter(g => g.category === selectedFilter);
  }, [selectedFilter]);

  const activeGoal = useMemo(() => {
    return KENYA_2060_TARGET_GOALS.find(g => g.id === selectedGoalId) || KENYA_2060_TARGET_GOALS[0];
  }, [selectedGoalId]);

  // Overall national index calculation
  const averageCurrentProgress = Math.round(
    KENYA_2060_TARGET_GOALS.reduce((acc, g) => acc + g.currentProgressPct, 0) / KENYA_2060_TARGET_GOALS.length
  );

  const getProgressColor = (pct: number) => {
    if (pct >= 70) return "bg-emerald-500 text-emerald-950";
    if (pct >= 50) return "bg-blue-500 text-blue-950";
    if (pct >= 40) return "bg-amber-500 text-amber-950";
    return "bg-rose-500 text-rose-950";
  };

  const getProgressBadge = (pct: number) => {
    if (pct >= 70) return "bg-emerald-100 text-emerald-900 border-emerald-300";
    if (pct >= 50) return "bg-blue-100 text-blue-900 border-blue-300";
    if (pct >= 40) return "bg-amber-100 text-amber-900 border-amber-300";
    return "bg-rose-100 text-rose-900 border-rose-300";
  };

  return (
    <div className="space-y-6" id="kenya-2060-progress-dashboard">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Decadal Strategic Roadmap</span>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <span className="text-[11px] font-mono text-slate-300">National Continuity Index:</span>
              <span className="text-sm font-black font-mono text-emerald-400">{averageCurrentProgress}%</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Kenya 2060 Long-Term Development Progress Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track aggregate delivery progress across Kenya's core national goals (Healthcare, Education, Economic Stability, Clean Energy, Food Sovereignty, and Rule of Law). Cross-referenced against ongoing 2027 manifesto audits to ensure continuous, non-partisan progress across successive governments.
            </p>
          </div>

          {/* Timeline View Horizon Selector */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Benchmark Horizon:</span>
            </span>
            {[
              { id: "current", label: "Current Audit Status (2026/2027)" },
              { id: "2030", label: "Vision 2030 Milestones" },
              { id: "2045", label: "Mid-Century Horizon (2045)" },
              { id: "2060", label: "Full 2060 Target (100%)" }
            ].map((hz) => (
              <button
                key={hz.id}
                onClick={() => setViewHorizon(hz.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewHorizon === hz.id
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {hz.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Filter Goal:</span>
        {["all", "Healthcare", "Education", "Economic Stability", "Green Energy", "Food Sovereignty", "Digital Tech", "Governance"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedFilter === cat
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat === "all" ? "All 7 Pillars" : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Goal Progress Cards & Active Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Progress Bars List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
            National Development Goals ({filteredGoals.length}):
          </label>

          {filteredGoals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = goal.id === selectedGoalId;
            
            // Determine active display percent based on horizon
            const displayPct = viewHorizon === "current" 
              ? goal.currentProgressPct 
              : viewHorizon === "2030" 
                ? goal.vision2030MilestonePct 
                : viewHorizon === "2045" 
                  ? goal.vision2045MilestonePct 
                  : goal.target2060Pct;

            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all space-y-2.5 ${
                  isSelected 
                    ? "bg-white border-slate-900 shadow-md ring-2 ring-slate-900/10" 
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                        {goal.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {goal.name}
                      </h4>
                    </div>
                  </div>

                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded border shrink-0 ${getProgressBadge(displayPct)}`}>
                    {displayPct}%
                  </span>
                </div>

                {/* Progress Bar with Multiple Horizon Indicators */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        displayPct >= 70 ? "bg-emerald-500" : displayPct >= 50 ? "bg-blue-500" : displayPct >= 40 ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${displayPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Baseline</span>
                    <span>2030 ({goal.vision2030MilestonePct}%)</span>
                    <span>2060 (100%)</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Goal Strategic Audit Deep-Dive (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-4 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                Strategic Goal Scrutiny Profile
              </span>
              <span className={`text-xs font-black font-mono px-2.5 py-0.5 rounded-full border ${getProgressBadge(activeGoal.currentProgressPct)}`}>
                Current Progress: {activeGoal.currentProgressPct}% of 2060 Goal
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {activeGoal.name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeGoal.description}
            </p>
          </div>

          {/* Key Metric Indicators Grid */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Core Quantitative Benchmarks:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeGoal.keyIndicators.map((ind, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-800 block line-clamp-1">
                    {ind.label}
                  </span>
                  <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-slate-200/80">
                    <span className="text-slate-500 text-[10px]">
                      Baseline: <strong className="text-slate-700">{ind.baseline}</strong>
                    </span>
                    <span className="text-blue-700 font-bold">
                      Now: {ind.current}
                    </span>
                    <span className="text-emerald-700 font-bold text-[10px]">
                      2060: {ind.target2060}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aggregated Audit Findings Card */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                Aggregated 2027 Manifesto Audit Findings:
              </span>
            </div>
            <p className="text-xs text-blue-950 leading-relaxed font-medium">
              {activeGoal.auditFindingsSummary}
            </p>
          </div>

          {/* Risk Factor Notice */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-rose-900 font-bold">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Critical Continuity Risk If Politicized:</span>
            </div>
            <p className="text-rose-950 leading-relaxed">
              {activeGoal.riskFactor}
            </p>
          </div>

          {/* Recommended Audit Topics & Direct Test Trigger */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
              Recommended Policy Items to Audit in PolicyAuditTool:
            </span>

            <div className="space-y-2">
              {activeGoal.recommendedAuditTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onAuditTopic) {
                      onAuditTopic(topic, activeGoal.category);
                    }
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-medium text-slate-800 flex items-center justify-between group transition-all"
                  title="Load into Policy Audit Tool"
                >
                  <span className="group-hover:text-emerald-950 flex items-center gap-2">
                    <span className="text-slate-400 group-hover:text-emerald-600">📄</span>
                    <span>{topic}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-emerald-700 shrink-0">
                    <span>Audit Claim</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
