import React, { useState, useMemo } from "react";
import { 
  FileText, 
  Users, 
  Building2, 
  Vote, 
  CheckCircle, 
  ChevronRight, 
  AlertTriangle, 
  Info, 
  BookOpen,
  Calendar,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { EvaluationResult } from "../types";

export type LegislativeStageKey = 
  | "proposal"
  | "public_participation"
  | "committee_review"
  | "parliamentary_vote"
  | "assent";

export interface LegislativeStageInfo {
  key: LegislativeStageKey;
  stepNumber: number;
  title: string;
  shortName: string;
  description: string;
  constitutionalBasis: string;
  oversightBody: string;
  citizenAction: string;
  keyDeliverables: string[];
  riskIfBypassed: string;
  defaultTimeline: string;
  statusBadge: "Completed" | "Current Active Stage" | "Pending Scrutiny";
}

export interface PolicyLegislativeStageTrackerProps {
  result?: EvaluationResult | null;
  policyTitle?: string;
  domain?: string;
  className?: string;
  onStageChange?: (newStage: LegislativeStageInfo) => void;
}

export const PolicyLegislativeStageTracker: React.FC<PolicyLegislativeStageTrackerProps> = ({
  result,
  policyTitle = "Audited Policy Proposal",
  domain = "National Policy",
  className = "",
  onStageChange
}) => {
  // Infer current legislative stage dynamically from evaluation result
  const defaultCurrentStage: LegislativeStageKey = useMemo(() => {
    if (!result) return "proposal";
    const readiness = result.verdict_score.implementation_readiness_score || 5;
    const constitutional = result.verdict_score.constitutional_viability_score || 5;

    if (readiness >= 8.5 && constitutional >= 8.5) {
      return "parliamentary_vote";
    } else if (readiness >= 7.0) {
      return "committee_review";
    } else if (readiness >= 5.0) {
      return "public_participation";
    } else {
      return "proposal";
    }
  }, [result]);

  const [activeSelectedStage, setActiveSelectedStage] = useState<LegislativeStageKey>(defaultCurrentStage);
  const [overrideCurrentStage, setOverrideCurrentStage] = useState<LegislativeStageKey | null>(null);

  const currentStage = overrideCurrentStage || defaultCurrentStage;

  const stages: LegislativeStageInfo[] = useMemo(() => [
    {
      key: "proposal",
      stepNumber: 1,
      title: "1. Proposal & Formulation",
      shortName: "Proposal",
      description: "Policy formulation, Cabinet Memorandum drafting, or drafting of a Private Member's Bill / Manifesto Policy Note.",
      constitutionalBasis: "Article 10 (National Values) & Article 201 (Public Finance Principles)",
      oversightBody: "Cabinet / Attorney General / Kenya Law Reform Commission (KLRC)",
      citizenAction: "Review executive policy concept papers, scrutinize problem statement, and verify baseline data.",
      keyDeliverables: [
        "Policy Whitepaper & Problem Statement",
        "Preliminary Cost-Benefit Analysis",
        "KLRC Statutory Drafting Alignment"
      ],
      riskIfBypassed: "Ambiguous policy targets, populist uncosted promises, and lack of statutory anchor.",
      defaultTimeline: "1 - 3 Months",
      statusBadge: currentStage === "proposal" ? "Current Active Stage" : "Completed"
    },
    {
      key: "public_participation",
      stepNumber: 2,
      title: "2. Public Participation (Art. 118)",
      shortName: "Public Participation",
      description: "Mandatory constitutional stakeholder consultation across all 47 counties, written public memoranda, and civil society hearings.",
      constitutionalBasis: "Constitution Article 118(1)(b) & Supreme Court Public Participation Precedent",
      oversightBody: "Parliament of Kenya (National Assembly & Senate Secretariats)",
      citizenAction: "Submit written memoranda to Parliamentary Clerks, attend County Townhalls, and demand civic budget transparency.",
      keyDeliverables: [
        "National Gazette Public Call for Memoranda",
        "47-County Public Hearing Transcripts",
        "Public Participation Matrix & Consolidated Feedback Report"
      ],
      riskIfBypassed: "Immediate High Court annulment under Article 118 for lack of meaningful public engagement.",
      defaultTimeline: "21 - 45 Days",
      statusBadge: currentStage === "public_participation" 
        ? "Current Active Stage" 
        : ["committee_review", "parliamentary_vote", "assent"].includes(currentStage)
        ? "Completed"
        : "Pending Scrutiny"
    },
    {
      key: "committee_review",
      stepNumber: 3,
      title: "3. Committee Review & PBO Costing",
      shortName: "Committee Review",
      description: "Departmental Parliamentary Committee line-by-line scrutiny, clause amendments, and Parliamentary Budget Office (PBO) fiscal costing note.",
      constitutionalBasis: "National Assembly Standing Orders & PFM Act Section 35",
      oversightBody: "Departmental Committee & Parliamentary Budget Office (PBO)",
      citizenAction: "Monitor Committee report tabling, scrutinize tax/levy fiscal implications, and track proposed amendments.",
      keyDeliverables: [
        "PBO Fiscal & Debt Impact Note",
        "Departmental Committee Scrutiny Report",
        "Clerk's Schedule of Proposed Amendments"
      ],
      riskIfBypassed: "Unfunded fiscal mandates, violation of borrowing ceilings, or conflicting overlapping laws.",
      defaultTimeline: "30 - 60 Days",
      statusBadge: currentStage === "committee_review"
        ? "Current Active Stage"
        : ["parliamentary_vote", "assent"].includes(currentStage)
        ? "Completed"
        : "Pending Scrutiny"
    },
    {
      key: "parliamentary_vote",
      stepNumber: 4,
      title: "4. Parliamentary Debate & Vote",
      shortName: "Parliamentary Vote",
      description: "Second Reading, Committee of the Whole House clause voting, and Third Reading passage in National Assembly & Senate (for county matters).",
      constitutionalBasis: "Constitution Articles 109 - 113 & Article 122 (Voting in Parliament)",
      oversightBody: "National Assembly & Senate Speakers / Hansard Records",
      citizenAction: "Track Member of Parliament (MP/Senator) roll-call votes on the Hansard record.",
      keyDeliverables: [
        "Second Reading Plenary Hansard Debate",
        "Committee of the Whole House Clause-by-Clause Votes",
        "Bicameral Mediation Committee Resolution (if contested)"
      ],
      riskIfBypassed: "Unconstitutional passage without requisite quorum or bicameral concurrence under Article 110.",
      defaultTimeline: "14 - 30 Days",
      statusBadge: currentStage === "parliamentary_vote"
        ? "Current Active Stage"
        : currentStage === "assent"
        ? "Completed"
        : "Pending Scrutiny"
    },
    {
      key: "assent",
      stepNumber: 5,
      title: "5. Presidential Assent & Devolution Rollout",
      shortName: "Assent & Rollout",
      description: "Presidential Assent under Article 115, publication in the Kenya Gazette, statutory commencement, and devolution implementation oversight.",
      constitutionalBasis: "Article 115 (Presidential Assent) & Article 229 (Auditor-General)",
      oversightBody: "State Law Office, Government Printer, Council of Governors (COG) & Office of the Auditor-General (OAG)",
      citizenAction: "Monitor Kenya Gazette commencement dates, county service delivery standards, and Auditor-General annual value-for-money audits.",
      keyDeliverables: [
        "Signed Presidential Warrant of Assent",
        "Kenya Gazette Supplement Publication",
        "Statutory Regulations / Statutory Instruments Committee Approval",
        "Auditor-General Annual Devolution Performance Audit"
      ],
      riskIfBypassed: "Executive inaction, failure to gazette implementing regulations, or ghost budget allocations.",
      defaultTimeline: "14 Days to Assent; Continuous Implementation",
      statusBadge: currentStage === "assent" ? "Current Active Stage" : "Pending Scrutiny"
    }
  ], [currentStage]);

  const activeStageDetails = useMemo(() => {
    return stages.find((s) => s.key === activeSelectedStage) || stages[0];
  }, [stages, activeSelectedStage]);

  const currentStageIndex = stages.findIndex((s) => s.key === currentStage);

  const handleSelectStageOverride = (key: LegislativeStageKey) => {
    setOverrideCurrentStage(key);
    const targetStage = stages.find(s => s.key === key);
    if (targetStage && onStageChange) {
      onStageChange(targetStage);
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-6 ${className}`}
      id="policy-legislative-stage-tracker"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <Building2 className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Kenyan Legislative & Constitutional Workflow
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            Policy Legislative Journey & Current Phase
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Step-by-step constitutional tracker from initial concept to presidential assent and Office of the Auditor-General oversight.
          </p>
        </div>

        {/* Stage Status Pill */}
        <div className="flex items-center space-x-2 self-start sm:self-center">
          <span className="text-xs text-slate-500 font-semibold">Active State:</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-2xs">
            Stage {currentStageIndex + 1}: {stages[currentStageIndex]?.shortName}
          </span>
        </div>
      </div>

      {/* Visual Step-by-Step Stepper Bar */}
      <div className="relative pt-2">
        {/* Connector Progress Line */}
        <div className="absolute top-7 left-6 right-6 h-1 bg-slate-200 -z-0 hidden md:block rounded-full">
          <div 
            className="h-1 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isSelected = stage.key === activeSelectedStage;

            return (
              <button
                key={stage.key}
                onClick={() => setActiveSelectedStage(stage.key)}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer select-none group ${
                  isSelected
                    ? "bg-blue-50/80 border-blue-500 shadow-xs ring-2 ring-blue-500/20"
                    : isCurrent
                    ? "bg-white border-blue-400 shadow-2xs"
                    : isCompleted
                    ? "bg-slate-50 border-slate-300 hover:bg-slate-100"
                    : "bg-white border-slate-200 hover:border-slate-300 opacity-80"
                }`}
                title={`Click to view details for Stage ${stage.stepNumber}: ${stage.title}`}
              >
                {/* Node Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-transform group-hover:scale-105 ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{stage.stepNumber}</span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 truncate w-full">
                  {stage.shortName}
                </div>

                <div className="mt-1">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tight ${
                      isCurrent
                        ? "bg-blue-100 text-blue-800"
                        : isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isCurrent ? "Active" : isCompleted ? "Passed" : "Upcoming"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStageDetails.key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-4"
        >
          {/* Detail Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Stage {activeStageDetails.stepNumber} of 5
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {activeStageDetails.title}
              </h4>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Est. Duration: <strong>{activeStageDetails.defaultTimeline}</strong>
              </span>
              <span className="font-semibold text-slate-400">•</span>
              <button
                onClick={() => handleSelectStageOverride(activeStageDetails.key)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                title="Simulate this as the active legislative stage"
              >
                Set as Current
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {activeStageDetails.description}
          </p>

          {/* Grid of Constitutional Requirements & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            
            {/* Constitutional Basis & Oversight */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Constitutional Anchor & Oversight Body</span>
              </div>
              <div className="space-y-1 text-2xs">
                <div>
                  <span className="text-slate-500 font-semibold">Legal Basis: </span>
                  <strong className="text-slate-800">{activeStageDetails.constitutionalBasis}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Oversight Entity: </span>
                  <strong className="text-slate-800">{activeStageDetails.oversightBody}</strong>
                </div>
              </div>
            </div>

            {/* Citizen Action Checklist */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Citizen Empowerment & Action Rights</span>
              </div>
              <p className="text-2xs text-slate-700 leading-relaxed">
                {activeStageDetails.citizenAction}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Risk If Bypassed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            
            {/* Key Deliverables */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-800 block uppercase tracking-wider">
                Mandatory Checkpoints & Deliverables:
              </span>
              <ul className="space-y-1 text-2xs">
                {activeStageDetails.keyDeliverables.map((item, i) => (
                  <li key={i} className="flex items-start space-x-1.5 text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk If Bypassed */}
            <div className="bg-rose-50/60 p-3.5 rounded-lg border border-rose-200 space-y-1.5 text-xs">
              <div className="flex items-center space-x-1.5 text-rose-900 font-bold text-[11px] uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Constitutional Risk if Bypassed:</span>
              </div>
              <p className="text-2xs text-rose-950 leading-relaxed font-medium">
                {activeStageDetails.riskIfBypassed}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
