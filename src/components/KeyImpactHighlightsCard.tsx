import React, { useState } from "react";
import { 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Download, 
  Scale, 
  Globe, 
  Maximize2, 
  Flame,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { EvaluationResult } from "../types";

interface KeyImpactHighlightsCardProps {
  result: EvaluationResult;
  domainName: string;
  actorType: "government" | "opposition";
  proposalText: string;
  compositeScore: number;
}

export const KeyImpactHighlightsCard: React.FC<KeyImpactHighlightsCardProps> = ({
  result,
  domainName,
  actorType,
  proposalText,
  compositeScore
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Extract key takeaways or derive mathematically from result.verdict_score
  const scores = result.verdict_score;
  const fiscalScore = scores.real_costing_identified ? 85 : 42;
  const constitutionScore = scores.constitutional_alignment ? 90 : 50;
  const implementationScore = scores.prior_record_reality_check ? 80 : 45;
  const generationalScore = scores.generational_fairness ? 88 : 55;

  const isPassed = compositeScore >= 70;
  const statusColor = isPassed ? "emerald" : compositeScore >= 50 ? "amber" : "rose";

  // Formatted social text snippet for WhatsApp / X
  const formattedShareSnippet = `🇰🇪 KENYA 2027 POLICY SCRUTINY: ${domainName.toUpperCase()}
Proposal: "${proposalText.slice(0, 100)}..."
--------------------------------------------
⚖️ 13-Point Composite Score: ${compositeScore}/100 (${result.verdict})
⚡ Article 201 Fiscal Adherence: ${scores.real_costing_identified ? "Costed & Viable" : "Uncosted / Deficit Risk"}
💼 Job & Productivity Impact: ${scores.economic_viability ? "Positive Multiplier" : "Fiscal Strain"}
🇰🇪 Kenya 2060 Generational Fairness: ${scores.generational_fairness ? "Passes" : "Debt Burden"}
--------------------------------------------
🔍 Read full empirical audit on Kenya 2027 Scrutiny Engine:
https://kenya2027.civic.ke/audit`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedShareSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Kenya 2027 Policy Audit: ${domainName}`,
          text: formattedShareSnippet,
          url: window.location.href
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        console.warn("Share cancelled or not supported:", err);
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border-2 border-emerald-500/40 shadow-xl overflow-hidden animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Zap className="w-4 h-4 fill-current" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                3-Second Readability Card
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Article 201 Fast Snapshot
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5">
              Key Impact Highlights: {domainName}
            </h3>
          </div>
        </div>

        {/* Big Score Pill */}
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isPassed 
              ? "bg-emerald-950/80 border-emerald-500 text-emerald-400" 
              : compositeScore >= 50 
                ? "bg-amber-950/80 border-amber-500 text-amber-400" 
                : "bg-rose-950/80 border-rose-500 text-rose-400"
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider">Score</span>
            <span className="text-lg sm:text-xl font-black font-mono">{compositeScore}/100</span>
          </div>
        </div>
      </div>

      {/* 4-Tile High-Impact Metric Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900/90">
        
        {/* Tile 1: Fiscal & Debt Burden */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Fiscal Viability</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
              scores.real_costing_identified ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
            }`}>
              {scores.real_costing_identified ? "Costed" : "Uncosted"}
            </span>
          </div>
          <p className="text-sm font-bold text-white leading-tight">
            {scores.real_costing_identified ? "Revenue Matched in MTEF" : "High Unbudgeted Deficit Risk"}
          </p>
          <p className="text-[11px] text-slate-400">
            {scores.real_costing_identified 
              ? "Explicit funding line and KRA tax yield model identified."
              : "Lacks realistic funding allocation; risks borrowing expansion."}
          </p>
        </div>

        {/* Tile 2: Constitutional Katiba Test */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Katiba 2010 Fit</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
              scores.constitutional_alignment ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
            }`}>
              {scores.constitutional_alignment ? "Compliant" : "Breach Risk"}
            </span>
          </div>
          <p className="text-sm font-bold text-white leading-tight">
            {scores.constitutional_alignment ? "Strict Article 201 Adherence" : "Scrutiny on Equitable Devolution"}
          </p>
          <p className="text-[11px] text-slate-400">
            {scores.constitutional_alignment 
              ? "Upholds transparency, public participation, and prudent fiscal limits."
              : "Requires parliamentary oversight restructuring."}
          </p>
        </div>

        {/* Tile 3: Economic Multiplier & Jobs */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Job Multiplier</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
              scores.economic_viability ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-300"
            }`}>
              {scores.economic_viability ? "High" : "Moderate"}
            </span>
          </div>
          <p className="text-sm font-bold text-white leading-tight">
            {scores.economic_viability ? "Productive Asset Creation" : "Consumption Focused"}
          </p>
          <p className="text-[11px] text-slate-400">
            {scores.economic_viability 
              ? "Drives formal MSME expansion, export competitiveness, and value-addition."
              : "Immediate subsidy relief without long-term industrial anchor."}
          </p>
        </div>

        {/* Tile 4: Kenya 2060 Generational Fairness */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Kenya 2060 Vision</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
              scores.generational_fairness ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
            }`}>
              {scores.generational_fairness ? "Sustainable" : "Short-Term"}
            </span>
          </div>
          <p className="text-sm font-bold text-white leading-tight">
            {scores.generational_fairness ? "Protects Future Generations" : "Risks Debt Burden on Youth"}
          </p>
          <p className="text-[11px] text-slate-400">
            {scores.generational_fairness 
              ? "Leaves durable infrastructure and technology capital for the next 30 years."
              : "Heavy debt servicing burden shifted to future taxpayers."}
          </p>
        </div>

      </div>

      {/* 3-Second Readability Summary Box */}
      <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 space-y-3">
        <div className="flex items-start gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 shrink-0 mt-0.5">
            📢 Citizen Takeaway:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {result.summary}
          </p>
        </div>

        {/* Bottom Social Share Triggers */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Optimized for WhatsApp Status, X (Twitter), and TikTok civic threads.</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700 active:scale-95"
              id="copy-key-impact-highlights-btn"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? "Copied Snippet!" : "Copy Summary Text"}</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
              id="share-key-impact-highlights-btn"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareSuccess ? "Shared!" : "Share 3-Sec Card"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
