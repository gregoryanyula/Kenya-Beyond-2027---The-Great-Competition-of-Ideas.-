import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ShieldCheck,
  Share2
} from "lucide-react";
import { EvaluationResult } from "../types";

interface PolicyEmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EvaluationResult;
  proposalText: string;
  domain: string;
  actorType: string;
  weightedScore: number;
}

export const PolicyEmailShareModal: React.FC<PolicyEmailShareModalProps> = ({
  isOpen,
  onClose,
  result,
  proposalText,
  domain,
  actorType,
  weightedScore
}) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen || !result) return null;

  const policyTitle = proposalText.slice(0, 80).split(".")[0] || "Civic Policy Proposal";
  const pointsClear = result.the_13_point_audit?.filter(p => p.status === "Clear").length || 0;
  const pointsAmbiguous = result.the_13_point_audit?.filter(p => p.status === "Ambiguous").length || 0;
  const pointsMissing = result.the_13_point_audit?.filter(p => p.status === "Missing").length || 0;

  const defaultSubject = `[Kenya 2027 Policy Audit] Scrutiny Report: ${policyTitle}`;

  const defaultBody = `Hello,

I would like to share an empirical policy scrutiny report generated on the Kenya 2027 Civic Platform:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KENYA 2027 POLICY SCRUTINY AUDIT REPORT
"Usitupatie slogan. Tupatie plan."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 POLICY PROPOSAL:
${proposalText}

🏷️ DOMAIN: ${domain}
👤 POLITICAL ACTOR: ${actorType}
📅 AUDIT DATE: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}

📊 COMPOSITE RIGOR SCORE: ${weightedScore}/100
• Fiscal Realism: ${result.verdict_score.fiscal_realism_score}/10
• Constitutional Integrity: ${result.verdict_score.constitutional_viability_score}/10
• Implementation Readiness: ${result.verdict_score.implementation_readiness_score}/10
• Kenya 2060 Alignment: ${result.verdict_score.kenya_2060_alignment_score}/10
• Clarity & Specifics: ${result.verdict_score.clarity_score}/10

🔍 13-POINT CONSTITUTIONAL BREAKDOWN:
• ✅ Clear & Verified Points: ${pointsClear}/13
• ⚠️ Ambiguous / Gaps: ${pointsAmbiguous}/13
• ❌ Missing / High Risk: ${pointsMissing}/13

📜 EXECUTIVE AUDIT SUMMARY:
${result.summary}

⚖️ CITIZEN TOWN HALL QUESTION:
${result.citizen_cross_examination_questions?.[0] || "How will this policy be financed under Article 201 of the Constitution?"}

🔗 View full interactive audit report, statutory citations & budget model:
${typeof window !== "undefined" ? window.location.origin : "https://kenya2027.civic.app"}

--
Generated via Kenya 2027 — The Great Competition of Ideas
A non-partisan platform for evaluating leadership through evidence, real costing & Kenya 2060 outcomes.`;

  const handleOpenMailClient = () => {
    const encodedSubject = encodeURIComponent(defaultSubject);
    const encodedBody = encodeURIComponent(defaultBody);
    const recipient = encodeURIComponent(recipientEmail.trim());
    const mailtoUrl = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
    
    window.location.href = mailtoUrl;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(`Subject: ${defaultSubject}\n\n${defaultBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Share Audit Report via Email
              </h3>
              <p className="text-xs text-slate-500">
                Send pre-populated executive audit summaries directly to journalists, MPs, or civic groups
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs text-slate-700">
          {/* Recipient Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Recipient Email Address (Optional):
            </label>
            <input
              type="email"
              placeholder="e.g. editor@media.co.ke, mp.office@parliament.go.ke"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden transition-all"
            />
          </div>

          {/* Subject Preview */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Email Subject Line:
            </label>
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-slate-800 text-[11px]">
              {defaultSubject}
            </div>
          </div>

          {/* Pre-populated Email Body Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Pre-populated Audit Summary Body:
              </label>
              <button
                onClick={handleCopyBody}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Email Text"}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={10}
              value={defaultBody}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-mono text-[11px] leading-relaxed resize-none focus:outline-hidden"
            />
          </div>

          {/* Civic Guarantee Note */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 flex items-start gap-2 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Civic Accountability Format:</strong> This email template complies with statutory Article 201 public oversight standards and includes verifiable scores for public debate.
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between shrink-0 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBody}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy Formatted Text"}</span>
            </button>

            <button
              onClick={handleOpenMailClient}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{sentSuccess ? "Opening Email App..." : "Open in Email App"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
