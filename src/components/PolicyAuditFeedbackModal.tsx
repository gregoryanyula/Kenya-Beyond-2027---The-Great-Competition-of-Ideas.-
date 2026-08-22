import React, { useState, useEffect } from "react";
import { 
  MessageSquareQuote, 
  Flag, 
  Send, 
  Check, 
  X, 
  BookOpen, 
  Link as LinkIcon, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  ListFilter
} from "lucide-react";
import { EvaluationResult } from "../types";

export interface AuditFeedbackItem {
  id: string;
  timestamp: number;
  policyTitle: string;
  domain: string;
  actorType: string;
  criterionPoint: string; // e.g., "Point 1: Clarity of Commitments" or "Overall Evaluation"
  feedbackCategory: string;
  correctionNotes: string;
  suggestedSources: string;
  submitterEmail?: string;
  status: "Logged Locally" | "Reviewed" | "Flagged for Scrutiny";
}

const STORAGE_KEY = "kenya2027_audit_feedback_log";

export const getSavedFeedback = (): AuditFeedbackItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveFeedbackItem = (item: Omit<AuditFeedbackItem, "id" | "timestamp" | "status">): AuditFeedbackItem => {
  const existing = getSavedFeedback();
  const newItem: AuditFeedbackItem = {
    ...item,
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    status: "Logged Locally"
  };
  const updated = [newItem, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Error saving feedback:", err);
  }
  return newItem;
};

export const deleteFeedbackItem = (id: string) => {
  const existing = getSavedFeedback();
  const filtered = existing.filter(f => f.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn("Error deleting feedback item:", err);
  }
};

interface PolicyAuditFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  result?: EvaluationResult | null;
  proposalText: string;
  domain: string;
  actorType: string;
  criterionTarget?: string;
}

export const PolicyAuditFeedbackModal: React.FC<PolicyAuditFeedbackModalProps> = ({
  isOpen,
  onClose,
  result,
  proposalText,
  domain,
  actorType,
  criterionTarget
}) => {
  const [activeTab, setActiveTab] = useState<"submit" | "history">("submit");
  const [selectedCriterion, setSelectedCriterion] = useState<string>(criterionTarget || "Overall Policy Assessment");
  const [feedbackCategory, setFeedbackCategory] = useState<string>("Inaccurate Statutory Citation / Legal Article");
  const [correctionNotes, setCorrectionNotes] = useState<string>("");
  const [suggestedSources, setSuggestedSources] = useState<string>("");
  const [submitterEmail, setSubmitterEmail] = useState<string>("");
  const [feedbackHistory, setFeedbackHistory] = useState<AuditFeedbackItem[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const policyTitle = proposalText.slice(0, 80).split(".")[0] || "Audited Policy Proposal";

  useEffect(() => {
    if (isOpen) {
      setFeedbackHistory(getSavedFeedback());
      setIsSuccess(false);
      setErrorMessage(null);
      if (criterionTarget) {
        setSelectedCriterion(criterionTarget);
      }
    }
  }, [isOpen, criterionTarget]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionNotes.trim()) {
      setErrorMessage("Please enter your correction note or feedback details.");
      return;
    }

    saveFeedbackItem({
      policyTitle,
      domain,
      actorType,
      criterionPoint: selectedCriterion,
      feedbackCategory,
      correctionNotes: correctionNotes.trim(),
      suggestedSources: suggestedSources.trim(),
      submitterEmail: submitterEmail.trim() || undefined
    });

    setIsSuccess(true);
    setCorrectionNotes("");
    setSuggestedSources("");
    setFeedbackHistory(getSavedFeedback());
    setTimeout(() => {
      setIsSuccess(false);
      setActiveTab("history");
    }, 1500);
  };

  const handleDelete = (id: string) => {
    deleteFeedbackItem(id);
    setFeedbackHistory(getSavedFeedback());
  };

  const criteriaOptions = [
    "Overall Policy Assessment",
    "Point 1: Clarity of Commitments & Deliverables",
    "Point 2: Diagnostic Depth & Root-Cause Analysis",
    "Point 3: Target Beneficiaries & Geographic Equity",
    "Point 4: Realistic Budget & Costing Projections",
    "Point 5: Viable Funding Mechanism (PFM Act)",
    "Point 6: Legal & Constitutional Feasibility (Art 201)",
    "Point 7: Institutional Readiness & Implementing Agencies",
    "Point 8: Specific Timelines & Phasing Milestones",
    "Point 9: Measurable KPIs & Empirical Baselines",
    "Point 10: Risk Assessment & Mitigation Architecture",
    "Point 11: Devolution Alignment & County Impact",
    "Point 12: Citizen Cross-Examination Demands",
    "Point 13: Kenya 2060 Long-Term Continuity"
  ];

  const categories = [
    "Inaccurate Statutory Citation / Legal Article",
    "Outdated or Missing KNBS / CBK Empirical Dataset",
    "Unrealistic Costing / Budget Estimate",
    "Unflagged Constitutional Conflict (Article 201)",
    "Missing Official Implementing Agency Context",
    "Additional Peer-Reviewed Evidence / Source Link",
    "General Methodology Suggestion"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Provide Policy Audit Feedback
              </h3>
              <p className="text-xs text-slate-500">
                Flag potential inaccuracies, propose statutory corrections, or provide additional empirical sources
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

        {/* Tab Toggle: Provide Feedback vs Feedback Log */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab("submit")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "submit"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Submit Feedback on this Audit
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "history"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Saved Feedback Log</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-mono">
              {feedbackHistory.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Submit Form */}
        {activeTab === "submit" ? (
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto flex-1 pr-1 text-xs text-slate-700">
            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 font-bold animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your feedback has been saved to your local audit log.</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Target Policy Preview */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
                Audited Policy Target
              </span>
              <h5 className="font-bold text-slate-900 line-clamp-1">{policyTitle}</h5>
              <div className="text-[11px] text-slate-500 font-mono">
                {domain} • {actorType}
              </div>
            </div>

            {/* Criterion Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Target Audit Criterion / Point:
              </label>
              <select
                value={selectedCriterion}
                onChange={(e) => setSelectedCriterion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {criteriaOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Feedback Category:
              </label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Correction Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Detailed Note or Correction: <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Explain the statutory citation inaccuracy, missing budget allocation nuance, or factual correction..."
                value={correctionNotes}
                onChange={(e) => setCorrectionNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-none"
              />
            </div>

            {/* Suggested Sources */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Suggested Evidence / Source Links (Optional):</span>
              </label>
              <input
                type="text"
                placeholder="e.g. https://knbs.or.ke/reports/2025, Kenya Gazette Vol. CXXVI"
                value={suggestedSources}
                onChange={(e) => setSuggestedSources(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Submitter Contact */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Your Email / Handle (Optional for follow-up):
              </label>
              <input
                type="text"
                placeholder="e.g. researcher@policy.co.ke"
                value={submitterEmail}
                onChange={(e) => setSubmitterEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Civic Guarantee */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 flex items-start gap-2 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Citizen Peer-Review:</strong> Community feedback strengthens factual scrutiny and helps refine baseline datasets against real-world governance realities.
              </span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Save to Feedback Log</span>
              </button>
            </div>
          </form>
        ) : (
          /* Tab 2: Saved Feedback History Log */
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {feedbackHistory.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <FileCheck2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs">No feedback entries recorded yet.</p>
                <button
                  onClick={() => setActiveTab("submit")}
                  className="text-xs text-emerald-600 hover:underline font-bold"
                >
                  Submit your first audit correction
                </button>
              </div>
            ) : (
              feedbackHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all space-y-2 text-xs relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                        {item.criterionPoint}
                      </span>
                      <h5 className="font-bold text-slate-900 mt-1">{item.policyTitle}</h5>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200/60">
                    Category: {item.feedbackCategory}
                  </div>

                  <p className="text-slate-700 text-xs leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/80">
                    {item.correctionNotes}
                  </p>

                  {item.suggestedSources && (
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 font-mono">
                      <LinkIcon className="w-3 h-3 text-slate-400" />
                      <span>Source: {item.suggestedSources}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>Logged on: {new Date(item.timestamp).toLocaleDateString("en-GB")}</span>
                    <span className="font-bold text-slate-600">{item.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
