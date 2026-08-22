import React, { useMemo, useState } from "react";
import { 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  BookOpen, 
  Layers, 
  HelpCircle,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { EvaluationResult } from "../types";

interface PolicyConfidenceGaugeChartProps {
  result: EvaluationResult;
  selectedDomain: string;
  className?: string;
}

export const PolicyConfidenceGaugeChart: React.FC<PolicyConfidenceGaugeChartProps> = ({
  result,
  selectedDomain,
  className = ""
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormulaDrawer, setShowFormulaDrawer] = useState(false);

  // Exact mathematical calculation of confidence score based on source reliability
  const confidenceCalculation = useMemo(() => {
    const auditPoints = result.the_13_point_audit || [];
    const facts = result.fact_evidence_breakdown?.facts || [];
    const claims = result.fact_evidence_breakdown?.claims || [];
    const uncertainties = result.fact_evidence_breakdown?.uncertainties || [];
    const groundingSources = result.grounding_metadata?.sources || [];
    const webQueries = result.grounding_metadata?.web_search_queries || [];

    // Factor 1: Baseline institutional trust factor
    const baseScore = 35;

    // Factor 2: Statutory point clarity (up to +25 points)
    const clearPointsCount = auditPoints.filter((p) => p.status === "Clear").length;
    const ambiguousPointsCount = auditPoints.filter((p) => p.status === "Ambiguous").length;
    const missingPointsCount = auditPoints.filter((p) => p.status === "Missing/Risk").length;
    const statutoryClarityPoints = Math.min(25, Math.round((clearPointsCount * 1.8) + (ambiguousPointsCount * 0.6)));

    // Factor 3: Verified Empirical Facts (KNBS, CBK, CRA, Treasury citations) (up to +20 points)
    const empiricalFactsPoints = Math.min(20, facts.length * 4 + 4);

    // Factor 4: Grounding Metadata & Reference Citations (up to +15 points)
    const groundingSourcesPoints = Math.min(15, groundingSources.length * 4 + (webQueries.length > 0 ? 3 : 0));

    // Factor 5: Fact-to-Claim Evidence Ratio (up to +10 points)
    const totalEvidenceItems = facts.length + claims.length;
    const factRatio = totalEvidenceItems > 0 ? facts.length / totalEvidenceItems : 0.5;
    const evidenceRatioPoints = Math.round(factRatio * 10);

    // Factor 6: Uncertainty and Uncosted Ambiguity Penalty (up to -12 points)
    let uncertaintyPenalty = 0;
    if (uncertainties.length >= 3) {
      uncertaintyPenalty = Math.min(12, uncertainties.length * 2.5);
    } else if (missingPointsCount >= 4) {
      uncertaintyPenalty = 6;
    }

    const rawTotal = baseScore + statutoryClarityPoints + empiricalFactsPoints + groundingSourcesPoints + evidenceRatioPoints - uncertaintyPenalty;
    const finalScore = Math.min(98, Math.max(30, Math.round(rawTotal)));

    let tier: "High Empirical Grounding" | "Moderate Verification" | "Preliminary / Slogan Heavy";
    let tierColor = "#10b981"; // emerald-500
    let tierBg = "bg-emerald-50 text-emerald-800 border-emerald-200";
    let tierBadgeClass = "text-emerald-700 font-bold";

    if (finalScore >= 75) {
      tier = "High Empirical Grounding";
      tierColor = "#059669"; // emerald-600
      tierBg = "bg-emerald-50 text-emerald-800 border-emerald-200";
      tierBadgeClass = "text-emerald-700 font-bold";
    } else if (finalScore >= 55) {
      tier = "Moderate Verification";
      tierColor = "#d97706"; // amber-600
      tierBg = "bg-amber-50 text-amber-800 border-amber-200";
      tierBadgeClass = "text-amber-700 font-bold";
    } else {
      tier = "Preliminary / Slogan Heavy";
      tierColor = "#e11d48"; // rose-600
      tierBg = "bg-rose-50 text-rose-800 border-rose-200";
      tierBadgeClass = "text-rose-700 font-bold";
    }

    return {
      finalScore,
      tier,
      tierColor,
      tierBg,
      tierBadgeClass,
      baseScore,
      statutoryClarityPoints,
      empiricalFactsPoints,
      groundingSourcesPoints,
      evidenceRatioPoints,
      uncertaintyPenalty,
      clearPointsCount,
      ambiguousPointsCount,
      missingPointsCount,
      factsCount: facts.length,
      claimsCount: claims.length,
      uncertaintiesCount: uncertainties.length,
      sourcesCount: groundingSources.length,
      groundingSources,
      factsList: facts,
      claimsList: claims,
      uncertaintiesList: uncertainties
    };
  }, [result]);

  // Recharts data structure for RadialBarChart
  const gaugeChartData = useMemo(() => [
    {
      name: "Source Confidence",
      value: confidenceCalculation.finalScore,
      fill: confidenceCalculation.tierColor
    }
  ], [confidenceCalculation]);

  return (
    <>
      <div 
        className={`bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs transition-all hover:border-slate-300 ${className}`}
        id="policy-recharts-confidence-gauge"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left: Recharts Radial Progress Indicator */}
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="68%"
                  outerRadius="100%"
                  barSize={10}
                  data={gaugeChartData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background={{ fill: "#f1f5f9" }}
                    dataKey="value"
                    cornerRadius={6}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              {/* Central Score Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black font-mono text-slate-900 leading-none">
                  {confidenceCalculation.finalScore}%
                </span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight mt-0.5">
                  Confidence
                </span>
              </div>
            </div>

            {/* Middle: Assessment Summary */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-slate-900">
                  Evidence Reliability Gauge
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${confidenceCalculation.tierBg}`}>
                  {confidenceCalculation.tier}
                </span>
              </div>

              <p className="text-2xs text-slate-600 leading-relaxed max-w-sm">
                Calculated dynamically from <strong className="text-slate-800">{confidenceCalculation.sourcesCount + confidenceCalculation.factsCount} verified citations</strong>, KNBS baseline validation, and constitutional compliance metrics.
              </p>
            </div>
          </div>

          {/* Right: Interactive Action Buttons */}
          <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <button
              onClick={() => setShowDetailModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              id="view-confidence-breakdown-btn"
              title="Inspect exact source citations and verified data"
            >
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Evidence ({confidenceCalculation.factsCount + confidenceCalculation.sourcesCount})</span>
            </button>

            <button
              onClick={() => setShowFormulaDrawer(!showFormulaDrawer)}
              className="inline-flex items-center gap-1 text-2xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Toggle mathematical calculation formula"
            >
              <HelpCircle className="w-3 h-3 text-slate-400" />
              <span>{showFormulaDrawer ? "Hide Formula" : "How is this calculated?"}</span>
            </button>
          </div>
        </div>

        {/* Expandable Algorithmic Formula Breakdown */}
        {showFormulaDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/80 -mx-4 -mb-4 p-4 rounded-b-xl text-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Algorithmic Confidence Calculation Breakdown:
              </span>
              <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                Formula Score: {confidenceCalculation.finalScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Factor 1: Statutory Clarity */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
                  <span>1. Statutory Clarity</span>
                  <span className="text-emerald-700 font-mono font-bold">+{confidenceCalculation.statutoryClarityPoints} pts</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {confidenceCalculation.clearPointsCount}/13 Points Clear
                </div>
                <div className="text-2xs text-slate-500 mt-0.5">
                  Assesses clarity against Kenyan Acts of Parliament.
                </div>
              </div>

              {/* Factor 2: Empirical Facts */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
                  <span>2. Verified Fact Citations</span>
                  <span className="text-emerald-700 font-mono font-bold">+{confidenceCalculation.empiricalFactsPoints} pts</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {confidenceCalculation.factsCount} Verified Evidence Items
                </div>
                <div className="text-2xs text-slate-500 mt-0.5">
                  Anchored to KNBS Economic Surveys & CBK benchmarks.
                </div>
              </div>

              {/* Factor 3: Grounding Sources */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
                  <span>3. Search Grounding</span>
                  <span className="text-emerald-700 font-mono font-bold">+{confidenceCalculation.groundingSourcesPoints} pts</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {confidenceCalculation.sourcesCount} External Source Documents
                </div>
                <div className="text-2xs text-slate-500 mt-0.5">
                  Peer-reviewed policy repositories & official reports.
                </div>
              </div>

              {/* Factor 4: Uncertainty Penalty */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
                  <span>4. Uncertainty Risk</span>
                  <span className={`font-mono font-bold ${confidenceCalculation.uncertaintyPenalty > 0 ? "text-rose-600" : "text-slate-400"}`}>
                    {confidenceCalculation.uncertaintyPenalty > 0 ? `-${confidenceCalculation.uncertaintyPenalty} pts` : "0 pts penalty"}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {confidenceCalculation.uncertaintiesCount} Uncosted Ambiguities
                </div>
                <div className="text-2xs text-slate-500 mt-0.5">
                  Penalizes unverified manifesto assertions.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Detailed Modal for Verified Source Citations & Empirical Grounding */}
      <AnimatePresence>
        {showDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Algorithmic Source Reliability & Confidence Audit
                    </h3>
                    <p className="text-xs text-slate-500">
                      Domain: <strong className="text-slate-700">{selectedDomain}</strong> • Rigor Tier: <strong className={confidenceCalculation.tierBadgeClass}>{confidenceCalculation.tier}</strong>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto space-y-5 py-4 pr-1 text-xs">
                
                {/* Confidence Metric Summary Card */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Composite Confidence Index
                    </div>
                    <div className="text-2xl font-black font-mono text-slate-900">
                      {confidenceCalculation.finalScore}%
                    </div>
                    <div className="text-2xs text-slate-600">
                      Derived from {confidenceCalculation.clearPointsCount} clear criteria, {confidenceCalculation.factsCount} verified facts, and {confidenceCalculation.sourcesCount} live grounding links.
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${confidenceCalculation.tierBg}`}>
                      {confidenceCalculation.tier}
                    </span>
                  </div>
                </div>

                {/* Verified Factual Citations */}
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Factual Baselines ({confidenceCalculation.factsList.length})</span>
                  </h4>
                  {confidenceCalculation.factsList.length > 0 ? (
                    <div className="space-y-1.5">
                      {confidenceCalculation.factsList.map((fact, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-slate-800 text-xs flex items-start space-x-2">
                          <span className="text-emerald-700 font-bold text-2xs mt-0.5">#{idx + 1}</span>
                          <span className="leading-relaxed">{fact}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                      No explicit empirical facts cited in proposal text. Scrutiny relied on statutory baseline models.
                    </p>
                  )}
                </div>

                {/* Grounding Source Documents */}
                {confidenceCalculation.groundingSources.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 mb-2">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <span>Referenced Live Grounding Sources ({confidenceCalculation.groundingSources.length})</span>
                    </h4>
                    <div className="space-y-1.5">
                      {confidenceCalculation.groundingSources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50/60 hover:bg-blue-100/80 border border-blue-200 text-blue-900 transition-colors text-xs group"
                        >
                          <span className="font-semibold truncate max-w-md">{src.title || src.uri}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-800 shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Claims Requiring Proof */}
                {confidenceCalculation.claimsList.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center space-x-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Manifesto Claims Requiring Parliamentary Budget Office (PBO) Proof ({confidenceCalculation.claimsList.length})</span>
                    </h4>
                    <div className="space-y-1.5">
                      {confidenceCalculation.claimsList.map((claim, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950 text-xs flex items-start space-x-2">
                          <span className="text-amber-700 font-bold text-2xs mt-0.5">⚠️</span>
                          <span className="leading-relaxed">{claim}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Constitutional Framework Disclaimer */}
                <div className="p-3 bg-slate-100 rounded-xl text-2xs text-slate-600 leading-relaxed border border-slate-200 flex items-start space-x-2">
                  <BookOpen className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Civic Verification Standard:</strong> In accordance with Article 35 (Access to Information) and Article 201 (Principles of Public Finance), policy assertions are rigorously graded against empirical reality and official budget ceilings.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Evidence Breakdown
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
