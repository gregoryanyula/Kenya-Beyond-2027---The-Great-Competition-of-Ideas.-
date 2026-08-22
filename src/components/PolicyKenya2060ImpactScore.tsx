import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  SlidersHorizontal,
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Building2,
  Leaf,
  Briefcase,
  GraduationCap,
  Scale
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EvaluationResult } from "../types";
import { useLanguage } from "../context/LanguageContext";

export interface PillarWeight {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: any;
  defaultWeight: number;
  currentWeight: number;
  benchmarkScore: number; // 0-10 based on policy result
  color: string;
}

interface PolicyKenya2060ImpactScoreProps {
  result: EvaluationResult;
  selectedDomain: string;
  proposalText?: string;
}

export const PolicyKenya2060ImpactScore: React.FC<PolicyKenya2060ImpactScoreProps> = ({
  result,
  selectedDomain,
  proposalText = ""
}) => {
  const { language } = useLanguage();
  const isSw = language === "sw";

  const [weights, setWeights] = useState<Record<string, number>>({
    jobs: 20,
    humanCapital: 20,
    devolution: 15,
    fiscal: 20,
    green: 15,
    governance: 10
  });

  const [activePreset, setActivePreset] = useState<string>("balanced");
  const [isWeightsDrawerOpen, setIsWeightsDrawerOpen] = useState<boolean>(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  const scores = result.verdict_score;

  const presets = useMemo(() => [
    {
      id: "balanced",
      name: isSw ? "Maono ya Kenya 2060 (Mizani Sawa)" : "Kenya 2060 Vision (Balanced)",
      weights: { jobs: 20, humanCapital: 20, devolution: 15, fiscal: 20, green: 15, governance: 10 }
    },
    {
      id: "jobs_youth",
      name: isSw ? "Kazi za Vijana & Teknolojia Kwanza" : "Youth Jobs & Tech First",
      weights: { jobs: 35, humanCapital: 25, devolution: 10, fiscal: 15, green: 10, governance: 5 }
    },
    {
      id: "fiscal_sovereignty",
      name: isSw ? "Kinga ya Deni & Ukweli wa Bajeti" : "Debt Shield & Fiscal Realism",
      weights: { jobs: 15, humanCapital: 15, devolution: 10, fiscal: 35, green: 10, governance: 15 }
    },
    {
      id: "devolution_equity",
      name: isSw ? "Usawa wa Kaunti & Afya ya Wote" : "County Equity & Healthcare",
      weights: { jobs: 15, humanCapital: 30, devolution: 25, fiscal: 15, green: 10, governance: 5 }
    }
  ], [isSw]);

  // Map policy evaluation scores to the 6 Kenya 2060 Pillars
  const pillarScores = useMemo(() => {
    const safeDomain = (selectedDomain || "").toLowerCase();
    const isEcon = safeDomain.includes("econ") || safeDomain.includes("trade");
    const isHealth = safeDomain.includes("health");
    const isEdu = safeDomain.includes("edu") || safeDomain.includes("cbc");
    const isAgri = safeDomain.includes("agri") || safeDomain.includes("food");
    const isTech = safeDomain.includes("tech") || safeDomain.includes("youth");
    const isDevol = safeDomain.includes("devol") || safeDomain.includes("count");

    const baseRigor = scores.kenya_2060_alignment_score || 7;
    const fiscalRigor = scores.fiscal_realism_score || 6;
    const constRigor = scores.constitutional_viability_score || 8;
    const implRigor = scores.implementation_readiness_score || 7;

    return {
      jobs: Math.min(10, Math.max(2, isTech || isEcon ? Math.max(baseRigor, 8.5) : Math.round((baseRigor * 0.6 + implRigor * 0.4) * 10) / 10)),
      humanCapital: Math.min(10, Math.max(2, isHealth || isEdu ? Math.max(baseRigor, 8.8) : Math.round((baseRigor * 0.65 + constRigor * 0.35) * 10) / 10)),
      devolution: Math.min(10, Math.max(2, isDevol ? Math.max(baseRigor, 8.7) : Math.round((constRigor * 0.6 + baseRigor * 0.4) * 10) / 10)),
      fiscal: Math.min(10, Math.max(2, isEcon ? fiscalRigor : Math.round((fiscalRigor * 0.75 + baseRigor * 0.25) * 10) / 10)),
      green: Math.min(10, Math.max(2, isAgri ? Math.max(baseRigor, 8.4) : Math.round((baseRigor * 0.6 + constRigor * 0.4) * 10) / 10)),
      governance: Math.min(10, Math.max(2, Math.round((constRigor * 0.7 + implRigor * 0.3) * 10) / 10))
    };
  }, [scores, selectedDomain]);

  const pillarsList: PillarWeight[] = [
    {
      id: "jobs",
      name: isSw ? "Viwanda, Teknolojia & Ajira za Vijana" : "Industrialization, Tech & Youth Employment",
      shortName: isSw ? "Ajira & Teknolojia" : "Jobs & Tech",
      description: isSw ? "Kupanua nafasi za kazi vijijini na mijini, mtandao wa kasi ya juu, na ongezeko la thamani ya uzalishaji viwandani." : "Decentralized job multipliers, high-speed connectivity, and manufacturing value addition.",
      icon: Briefcase,
      defaultWeight: 20,
      currentWeight: weights.jobs,
      benchmarkScore: pillarScores.jobs,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      id: "humanCapital",
      name: isSw ? "Rasilimali Watu, Elimu & Afya kwa Wote (Ibara 43)" : "Human Capital, Education & Universal Healthcare",
      shortName: isSw ? "Afya & Elimu" : "Health & Education",
      description: isSw ? "Haki za kikatiba za afya (Ibara ya 43), mfumo thabiti wa ujuzi wa CBC, na lishe bora kwa watoto." : "Article 43 constitutional health protections, CBC skills pipeline, and child nutrition.",
      icon: GraduationCap,
      defaultWeight: 20,
      currentWeight: weights.humanCapital,
      benchmarkScore: pillarScores.humanCapital,
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      id: "devolution",
      name: isSw ? "Ugatuzi wa Kaunti & Usawa wa Kikanda (Ibara 201b)" : "County Devolution & Regional Equalization",
      shortName: isSw ? "Ugatuzi & Usawa" : "Devolution & Equity",
      description: isSw ? "Mgawo sawa wa rasilimali kwa kaunti zote 47 chini ya Ibara 201(b) na utoaji wa Hazina ya Usawa." : "Article 201(b) resource equalization for all 47 counties and Equalization Fund delivery.",
      icon: HeartHandshake,
      defaultWeight: 15,
      currentWeight: weights.devolution,
      benchmarkScore: pillarScores.devolution,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      id: "fiscal",
      name: isSw ? "Uendelevu wa Fedha & Kulinda Ukuu wa Deni la Taifa" : "Fiscal Sustainability & Sovereign Debt Shielding",
      shortName: isSw ? "Ukweli wa Bajeti" : "Fiscal Realism",
      description: isSw ? "Kulinda ukomo wa deni la taifa (First Charge), ufanisi wa kodi za ndani, na kupunguza nakisi ya bajeti." : "Guarding the First Charge debt ceiling, domestic tax efficiency, and deficit reduction.",
      icon: Building2,
      defaultWeight: 20,
      currentWeight: weights.fiscal,
      benchmarkScore: pillarScores.fiscal,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      id: "green",
      name: isSw ? "Nishati Safi, Hali ya Hewa & Usalama wa Chakula" : "Clean Energy, Climate & Food Sovereignty",
      shortName: isSw ? "Mazingira & Kilimo" : "Climate & Agriculture",
      description: isSw ? "Unyunyiziaji wa sola, 30% ya misitu nchini, na kujikinga dhidi ya mfumuko wa bei za chakula kutoka nje." : "Solar irrigation, 30% national tree cover, and insulation from global food import shocks.",
      icon: Leaf,
      defaultWeight: 15,
      currentWeight: weights.green,
      benchmarkScore: pillarScores.green,
      color: "text-teal-600 bg-teal-50 border-teal-200"
    },
    {
      id: "governance",
      name: isSw ? "Utawala wa Sheria, Uadilifu & Kupambana na Ufisadi (Ibara 10 & Sura ya 6)" : "Rule of Law, Integrity & Anti-Corruption (Art. 10)",
      shortName: isSw ? "Utawala wa Sheria" : "Rule of Law",
      description: isSw ? "Viwango vya uongozi vya Sura ya Sita, uwazi wa ununuzi wa umma, na ukaguzi madhubuti wa Mkaguzi Mkuu wa Hesabu." : "Chapter 6 leadership standards, procurement transparency, and Auditor-General scrutiny.",
      icon: Scale,
      defaultWeight: 10,
      currentWeight: weights.governance,
      benchmarkScore: pillarScores.governance,
      color: "text-rose-600 bg-rose-50 border-rose-200"
    }
  ];

  // Algorithmic calculation of the Kenya 2060 Impact Score (0 - 100)
  const { impactScore, tierInfo, totalWeights } = useMemo(() => {
    let weightedSum = 0;
    let sumWeights = 0;

    pillarsList.forEach((p) => {
      weightedSum += p.benchmarkScore * p.currentWeight * 10;
      sumWeights += p.currentWeight;
    });

    const normalizedTotal = sumWeights > 0 ? sumWeights : 100;
    let rawScore = Math.round(weightedSum / normalizedTotal);

    // Article 201 Compliance Bonus/Penalty (+/- up to 3 points)
    if (scores.constitutional_viability_score >= 8.5 && scores.fiscal_realism_score >= 7.5) {
      rawScore = Math.min(100, rawScore + 2);
    } else if (scores.fiscal_realism_score < 4.5) {
      rawScore = Math.max(10, rawScore - 3);
    }

    let tier = {
      label: isSw ? "Ngazi ya 1: Kichocheo Kikuu cha Mabadiliko ya Kizazi" : "Tier 1: Transformative Structural Catalyst",
      badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
      description: isSw 
        ? "Sera hii inaleta ongezeko kubwa la maendeleo ya vizazi vijavyo kulingana na sheria na malengo ya Kenya 2060." 
        : "This proposal delivers strong intergenerational developmental multipliers aligned with Kenya 2060 statutory goals.",
      color: "#059669"
    };

    if (rawScore < 45) {
      tier = {
        label: isSw ? "Ngazi ya 4: Hatari Kubwa ya Kifedha & Uwezekano Mdogo wa Kudumu" : "Tier 4: High Fiscal Risk & Low Long-Term Viability",
        badgeClass: "bg-rose-100 text-rose-900 border-rose-300",
        description: isSw 
          ? "Sera hii haina vyanzo thabiti vya ufadhili na inahatarisha kuongeza deni la taifa bila kukuza uchumi wa kudumu." 
          : "The proposal lacks structural funding pathways and risks increasing Kenya's debt burden without durable capital formation.",
        color: "#e11d48"
      };
    } else if (rawScore < 65) {
      tier = {
        label: isSw ? "Ngazi ya 3: Faida ya Wastani ya Muda Mfupi" : "Tier 3: Moderate Incremental Gain",
        badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
        description: isSw 
          ? "Inaleta manufaa ya muda mfupi lakini inahitaji maboresho makubwa ya kisheria ili kuleta mabadiliko ya kudumu ya 2060." 
          : "The measure provides short-term benefits but requires significant statutory tightening to achieve long-term 2060 transformation.",
        color: "#d97706"
      };
    } else if (rawScore < 80) {
      tier = {
        label: isSw ? "Ngazi ya 2: Marekebisho Yenye Thamani Kubwa ya Kimaendeleo" : "Tier 2: High Value Progressive Reform",
        badgeClass: "bg-blue-100 text-blue-900 border-blue-300",
        description: isSw 
          ? "Mchango thabiti kwa maono ya kijamii na kiuchumi ya Kenya na hatari inayoweza kudhibitiwa wakati wa utekelezaji." 
          : "Solid foundational contribution to Kenya's socio-economic vision with manageable implementation risk.",
        color: "#2563eb"
      };
    }

    return {
      impactScore: Math.min(100, Math.max(0, rawScore)),
      tierInfo: tier,
      totalWeights: sumWeights
    };
  }, [pillarsList, scores, isSw]);

  const handleApplyPreset = (presetId: string) => {
    const p = presets.find((x) => x.id === presetId);
    if (p) {
      setWeights(p.weights);
      setActivePreset(p.id);
    }
  };

  const handleWeightChange = (key: string, val: number) => {
    setWeights((prev) => ({ ...prev, [key]: val }));
    setActivePreset("custom");
  };

  const handleResetWeights = () => {
    handleApplyPreset("balanced");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6" id="kenya-2060-impact-score-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              {isSw ? "Kielezo cha Hesabu cha Mabadiliko ya 2060" : "Algorithmic Transformation Index"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1.5">
            {isSw ? "Alama ya Athari za Maendeleo ya Kenya 2060 (Impact Score)" : "Kenya 2060 Developmental Impact Score"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl">
            {isSw 
              ? "Inahesabiwa kwa kupima jinsi sera hii inavyofanya kazi katika nguzo kuu za mabadiliko ya taifa, zikipimwa kulingana na vipaumbele vya mwananchi." 
              : "Calculated by projecting how this policy performs across core national transformation pillars, weighted by citizen developmental priorities."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsWeightsDrawerOpen(!isWeightsDrawerOpen)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              isWeightsDrawerOpen
                ? "bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-500 shadow-2xs"
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80"
            }`}
            id="customize-impact-weights-btn"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isWeightsDrawerOpen ? (isSw ? "Funga Mizani" : "Close Weights") : (isSw ? "Rekebisha Mizani" : "Adjust Weights")}</span>
            {isWeightsDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Score & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Big Impact Score Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col justify-between shadow-md space-y-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              {isSw ? "Kizidishi cha Kimkakati 2060" : "2060 Strategic Multiplier"}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {isSw ? "Lengo: 80+" : "Target: 80+"}
            </span>
          </div>

          <div className="flex items-center space-x-5 my-1">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke="#334155"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="46"
                  stroke={tierInfo.color}
                  strokeWidth="8"
                  strokeDasharray={289}
                  strokeDashoffset={289 - (289 * impactScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ strokeDashoffset: 289 }}
                  animate={{ strokeDashoffset: 289 - (289 * impactScore) / 100 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-mono tracking-tight text-white">
                  {impactScore}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">/ 100</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold border ${tierInfo.badgeClass}`}>
                {tierInfo.label.split(":")[0]}
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">
                {tierInfo.label.split(":")[1] || tierInfo.label}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {tierInfo.description}
              </p>
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">
              {isSw ? "Violezo vya Vipaumbele vya Wananchi:" : "Citizen Priority Presets:"}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleApplyPreset(p.id)}
                  className={`text-left px-2 py-1.5 rounded text-[10.5px] font-semibold transition-all truncate border cursor-pointer ${
                    activePreset === p.id
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-xs"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                  title={p.name}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 6 Pillars Contribution Spectrum (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
            <span>{isSw ? "Kipimo cha Nguzo & Uzito Uliochaguliwa" : "Pillar Benchmark & User Weight"}</span>
            <span>{isSw ? "Mchango kwa Kielezo cha 2060" : "Contribution to 2060 Index"}</span>
          </div>

          <div className="space-y-2.5">
            {pillarsList.map((p) => {
              const Icon = p.icon;
              const percentageShare = Math.round((p.currentWeight / totalWeights) * 100);

              return (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className={`p-1 rounded-md border ${p.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <span className="text-slate-500 dark:text-slate-400">{isSw ? "Uzito:" : "Weight:"} <strong className="text-slate-800 dark:text-slate-200">{percentageShare}%</strong></span>
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {p.benchmarkScore}/10
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(p.benchmarkScore / 10) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collapsible Weights Customizer Drawer */}
      <AnimatePresence>
        {isWeightsDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isSw ? "Weka Uzito Maalum wa Nguzo za Kenya 2060" : "Customize Kenya 2060 Pillar Weights"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isSw 
                      ? "Badilisha umuhimu wa kila nguzo kuona jinsi sera hii inavyopata alama chini ya mtazamo wako wa kimaendeleo." 
                      : "Adjust the relative importance of each pillar to test how this policy scores under your civic priority model."}
                  </p>
                </div>

                <button
                  onClick={handleResetWeights}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-700 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                  <span>{isSw ? "Rejesha Mizani Sawa" : "Reset to Balanced"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {pillarsList.map((p) => (
                  <div key={p.id} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>{p.shortName}</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono">{p.currentWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={p.currentWeight}
                      onChange={(e) => handleWeightChange(p.id, Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Min 5%</span>
                      <span>Max 50%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Algorithmic Formula Explainer Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showFormulaDetails ? (isSw ? "Ficha Hesabu ya Kanuni" : "Hide Mathematical Algorithm") : (isSw ? "Alama hii ya Athari huhesabiwa vipi?" : "How is this Impact Score Calculated?")}</span>
        </button>

        <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
          Formula: Impact = Σ(PillarScore_i × Weight_i) / Σ(Weight_i) ± Article 201 Modifiers
        </span>
      </div>

      {showFormulaDetails && (
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-2 border border-slate-800 font-mono">
          <div className="text-emerald-400 font-bold">{isSw ? "Ufafanuzi wa Kikanuni wa Kihesabu:" : "Mathematical Specification:"}</div>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            {isSw
              ? "Kanuni ya Athari za Maendeleo ya Kenya 2060 inajumuisha nguzo sita za kimsingi zinazolingana na sheria na katiba: (1) Ajira & Teknolojia, (2) Afya & Rasilimali Watu, (3) Ugatuzi & Usawa wa Kikanda (Ibara 201b), (4) Ukweli wa Bajeti & Kulinda Ukomo wa Deni la Taifa, (5) Nishati Safi & Kilimo, na (6) Utawala wa Sheria (Ibara ya 10). Ikiwa ukweli wa bajeti uko chini sana (< 4.5), adhabu ya alama 3 hukatwa kuakisi hatari ya kushindwa kulipa deni la taifa."
              : "The Kenya 2060 Developmental Impact algorithm aggregates six core pillars benchmarked against statutory vision targets: (1) Jobs & Tech, (2) Health & Human Capital, (3) Devolution & Article 201(b) resource equalization, (4) Fiscal Realism & First Charge debt ceiling compliance, (5) Clean Energy & Food Sovereignty, and (6) Article 10 Rule of Law. If fiscal realism is critically deficient (< 4.5), a structural risk deduction (-3 pts) is applied to reflect future default risks."}
          </p>
        </div>
      )}
    </div>
  );
};

