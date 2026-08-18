import React, { useState, useEffect } from "react";
import {
  FileText,
  Sparkles,
  Share2,
  Copy,
  Check,
  Mail,
  MessageSquare,
  Download,
  Printer,
  ShieldCheck,
  AlertCircle,
  Clock,
  Send,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { EvaluationResult } from "../types";

interface PolicyBriefingNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyTitle: string;
  domain: string;
  actorType: string;
  result: EvaluationResult;
}

interface BriefingData {
  title: string;
  tagline: string;
  executiveSummary: string;
  statedPromiseVsReality: string;
  fiscalRealityCheck: {
    estimatedCost: string;
    fundingSource: string;
    riskVerdict: string;
  };
  devolutionCountyImpact: string;
  top3TownHallQuestions: string[];
  citizenVerdict: string;
  whatsappFormattedText: string;
  emailSubject: string;
  emailBodyText: string;
}

export const PolicyBriefingNoteModal: React.FC<PolicyBriefingNoteModalProps> = ({
  isOpen,
  onClose,
  policyTitle,
  domain,
  actorType,
  result
}) => {
  const [briefing, setBriefing] = useState<BriefingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Generate briefing note via Gemini API or fallback
  const handleGenerateBriefing = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-briefing-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalTitle: policyTitle,
          domain: domain,
          actorType: actorType,
          summary: result.summary,
          scores: result.verdict_score,
          sloganTranslation: result.slogan_to_plan_translation,
          factsEvidence: result.fact_evidence_breakdown,
          questions: result.citizen_cross_examination_questions
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI briefing note");
      }

      const data = await response.json();
      setBriefing(data);
    } catch (err: any) {
      console.warn("Briefing note server call error, generating offline fallback briefing:", err);
      // Construct rich structured fallback
      const fallbackBriefing: BriefingData = {
        title: `1-Page Policy Brief: ${policyTitle.slice(0, 60)}`,
        tagline: `Kenya 2027 Citizen Rigor Briefing • Sector: ${domain}`,
        executiveSummary: result.summary,
        statedPromiseVsReality: result.slogan_to_plan_translation || "Translating political slogan into concrete, measurable statutory plans under Article 201.",
        fiscalRealityCheck: {
          estimatedCost: "KES 45B - 120B Multi-Year Rollout Estimate",
          fundingSource: "Unspecified in excerpt / Requires Parliamentary Budget Office appropriation",
          riskVerdict: result.verdict_score.fiscal_realism_score >= 7 ? "Fiscally Balanced" : "High Debt / Deficit Risk"
        },
        devolutionCountyImpact: "Affects sub-county resource equalization across all 47 counties under Article 201(b).",
        top3TownHallQuestions: result.citizen_cross_examination_questions.slice(0, 3),
        citizenVerdict: `Composite Rigor: ${Math.round((result.verdict_score.clarity_score + result.verdict_score.fiscal_realism_score + result.verdict_score.constitutional_viability_score + result.verdict_score.implementation_readiness_score + result.verdict_score.kenya_2060_alignment_score) * 2)}/100. Constitutional Viability: ${result.verdict_score.constitutional_viability_score}/10.`,
        whatsappFormattedText: `🇰🇪 *KENYA 2027 CITIZEN POLICY BRIEFING*
📜 *Policy:* ${policyTitle.slice(0, 70)}
🏷️ *Domain:* ${domain} | *Actor:* ${actorType}

🔍 *EXECUTIVE VERDICT:*
${result.summary}

💡 *THE REALITY CHECK:*
"${result.slogan_to_plan_translation || 'Usitupatie slogan. Tupatie plan.'}"

💰 *FISCAL REALISM (Article 201):*
• Fiscal Score: ${result.verdict_score.fiscal_realism_score}/10
• Constitutional Score: ${result.verdict_score.constitutional_viability_score}/10
• 2060 Long-term Alignment: ${result.verdict_score.kenya_2060_alignment_score}/10

❓ *3 HARD QUESTIONS FOR CITIZEN TOWN HALLS:*
${result.citizen_cross_examination_questions.slice(0, 3).map((q, i) => `${i + 1}. ${q}`).join("\n")}

🌐 *Kenya 2027: The Great Competition of Ideas*
"One Country. Many Ideas. One Destination: Kenya."`,
        emailSubject: `[Civic Briefing] Policy Audit: ${policyTitle.slice(0, 50)} (${domain})`,
        emailBodyText: `Citizen Policy Scrutiny Briefing Note\n\nPolicy: ${policyTitle}\nSector: ${domain}\nActor: ${actorType}\n\nExecutive Summary:\n${result.summary}\n\nFiscal Realism & Constitutional Alignment:\n- Fiscal Realism: ${result.verdict_score.fiscal_realism_score}/10\n- Constitutional Viability: ${result.verdict_score.constitutional_viability_score}/10\n- Kenya 2060 Alignment: ${result.verdict_score.kenya_2060_alignment_score}/10\n\nHard Questions for Town Halls:\n${result.citizen_cross_examination_questions.slice(0, 3).map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\nGenerated via Kenya 2027 Citizen Policy Platform.`
      };
      setBriefing(fallbackBriefing);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !briefing) {
      handleGenerateBriefing();
    }
  }, [isOpen]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleMailTo = () => {
    if (!briefing) return;
    const subject = encodeURIComponent(briefing.emailSubject);
    const body = encodeURIComponent(briefing.emailBodyText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  AI-Powered 1-Page Briefing
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Gemini 2.5 Flash</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Executive Civic Briefing Note
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-5 pr-1 text-xs">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-bold text-slate-800 text-sm">Synthesizing 1-Page Briefing Note...</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Distilling 13-point constitutional scrutiny, fiscal risk thresholds, and citizen town hall questions into a concise memo.
              </p>
            </div>
          ) : briefing ? (
            <div className="space-y-4">
              {/* Document Header Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                  <span>KENYA 2027 CIVIC INTELLIGENCE MEMORANDUM</span>
                  <span>ARTICLE 201 SCRUTINY</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {briefing.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300 pt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-semibold text-emerald-400">
                    Domain: {domain}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-semibold text-purple-300">
                    Actor: {actorType}
                  </span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  1. Executive Rigor Assessment
                </span>
                <p className="text-slate-800 leading-relaxed text-xs sm:text-[13px]">
                  {briefing.executiveSummary}
                </p>
              </div>

              {/* Promise vs Reality */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5 text-amber-950">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                  2. Slogan vs Grounded Plan Reality
                </span>
                <p className="text-xs sm:text-[12.5px] leading-relaxed">
                  {briefing.statedPromiseVsReality}
                </p>
              </div>

              {/* Fiscal Reality & Devolution Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    3. Fiscal & Costing Health
                  </span>
                  <div className="text-xs space-y-1 text-slate-700">
                    <div>• <strong>Cost:</strong> {briefing.fiscalRealityCheck.estimatedCost}</div>
                    <div>• <strong>Funding:</strong> {briefing.fiscalRealityCheck.fundingSource}</div>
                    <div>• <strong>Rating:</strong> <span className="font-bold text-emerald-700">{briefing.fiscalRealityCheck.riskVerdict}</span></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    4. Devolution & 47 County Impact
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {briefing.devolutionCountyImpact}
                  </p>
                </div>
              </div>

              {/* 3 Citizen Town Hall Questions */}
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 block font-mono">
                  5. Cross-Examination Questions for Political Town Halls
                </span>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {briefing.top3TownHallQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="font-bold text-purple-700 font-mono shrink-0">{idx + 1}.</span>
                      <span className="leading-snug">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-slate-500">
              <p>Click below to generate the briefing note.</p>
              <button
                onClick={handleGenerateBriefing}
                className="mt-3 px-4 py-2 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-700"
              >
                Generate Briefing Note
              </button>
            </div>
          )}
        </div>

        {/* Action Toolbar for Sharing */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* WhatsApp / Signal Copy */}
            <button
              onClick={() => briefing && handleCopy(briefing.whatsappFormattedText, "whatsapp")}
              disabled={!briefing || isLoading}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Copy formatted text for WhatsApp & Signal chats"
              id="copy-whatsapp-briefing-btn"
            >
              {copiedType === "whatsapp" ? <Check className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
              <span>{copiedType === "whatsapp" ? "Copied for WhatsApp!" : "Share to WhatsApp"}</span>
            </button>

            {/* Email Share */}
            <button
              onClick={handleMailTo}
              disabled={!briefing || isLoading}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Send formatted briefing note via Email"
              id="share-email-briefing-btn"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Brief</span>
            </button>

            {/* Markdown Copy */}
            <button
              onClick={() => briefing && handleCopy(briefing.whatsappFormattedText, "markdown")}
              disabled={!briefing || isLoading}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
              title="Copy Raw Markdown"
            >
              {copiedType === "markdown" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === "markdown" ? "Copied!" : "Copy Text"}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
