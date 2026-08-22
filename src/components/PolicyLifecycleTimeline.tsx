import React, { useState } from "react";
import {
  GitCommit,
  FileText,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Gavel,
  Landmark,
  ChevronRight,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Eye,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface LifecycleStage {
  id: number;
  title: string;
  shortTitle: string;
  stageName: string;
  status: "completed" | "current" | "upcoming";
  legalBasis: string;
  gatekeeper: string;
  duration: string;
  description: string;
  citizenAction: string;
  keyChecklist: string[];
}

interface PolicyLifecycleTimelineProps {
  policyTitle?: string;
  domainName?: string;
  currentStageId?: number;
}

export const PolicyLifecycleTimeline: React.FC<PolicyLifecycleTimelineProps> = ({
  policyTitle = "Audited Policy Proposal",
  domainName = "National Policy",
  currentStageId = 1
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(currentStageId);

  const stages: LifecycleStage[] = [
    {
      id: 1,
      title: "Proposal & Manifesto Formulation",
      shortTitle: "1. Proposal",
      stageName: "Pre-Legislative Concept",
      status: currentStageId === 1 ? "current" : currentStageId > 1 ? "completed" : "upcoming",
      legalBasis: "Article 1 & 10 (Sovereignty & National Values)",
      gatekeeper: "Party Secretariat / Executive Sponsoring Ministry",
      duration: "1–3 Months",
      description: "Initial drafting of policy pledge, ideological alignment, and publication in official party manifesto or cabinet white paper.",
      citizenAction: "Review independent civic audit scorecards, test fiscal realism, and demand clear unit costing.",
      keyChecklist: [
        "Cabinet Concept Note or Campaign Manifesto release",
        "Initial sector stakeholder consultations",
        "Slogan to Plan verification and independent civic scoring"
      ]
    },
    {
      id: 2,
      title: "Legislative Bill Drafting & Gazettement",
      shortTitle: "2. Drafting",
      stageName: "Statutory Drafting",
      status: currentStageId === 2 ? "current" : currentStageId > 2 ? "completed" : "upcoming",
      legalBasis: "Article 109 & KLRC Act (Kenya Law Reform Commission)",
      gatekeeper: "Attorney-General / Directorate of Parliamentary Legal Services",
      duration: "3–6 Weeks",
      description: "Translating policy objectives into formal legislative clauses, creating transitional schedules, and publication in the Kenya Gazette as a formal Bill.",
      citizenAction: "Download the gazetted Bill text from parliament.go.ke to cross-examine clauses against original campaign promises.",
      keyChecklist: [
        "Draft Bill published in Kenya Gazette",
        "First Reading in National Assembly / Senate",
        "Committal to respective Departmental Committee"
      ]
    },
    {
      id: 3,
      title: "Mandatory Public Participation",
      shortTitle: "3. Public Scrutiny",
      stageName: "Citizen Scrutiny",
      status: currentStageId === 3 ? "current" : currentStageId > 3 ? "completed" : "upcoming",
      legalBasis: "Article 118 (Public Access & Participation) & Supreme Court Precedents",
      gatekeeper: "Parliamentary Departmental Committee & Clerk of the National Assembly",
      duration: "14–21 Days Statutory Window",
      description: "Mandatory constitutional window for citizens, professional associations, and county stakeholders to submit written memorandums and testify at town halls.",
      citizenAction: "Submit formal written citizen memorandums to clerk@parliament.go.ke and attend county public hearings.",
      keyChecklist: [
        "National newspaper & portal public notice published",
        "Public memorandum submission window open (min. 14 days)",
        "County stakeholder town halls and oral submissions recorded"
      ]
    },
    {
      id: 4,
      title: "PBO Costing & Committee Scrutiny",
      shortTitle: "4. Fiscal Costing",
      stageName: "Budget Office Review",
      status: currentStageId === 4 ? "current" : currentStageId > 4 ? "completed" : "upcoming",
      legalBasis: "Parliamentary Service Act Section 10 & PFM Act 2012 Article 201",
      gatekeeper: "Parliamentary Budget Office (PBO) & Budget and Appropriations Committee",
      duration: "2–4 Weeks",
      description: "The Parliamentary Budget Office prepares independent fiscal impact notes assessing long-term revenue requirements, borrowing impact, and macro feasibility.",
      citizenAction: "Examine PBO fiscal cost assessment to confirm the state has non-debt funding sources allocated in the Medium-Term Expenditure Framework (MTEF).",
      keyChecklist: [
        "PBO Money Bill fiscal implications matrix prepared",
        "Article 201 intergenerational burden compliance check",
        "Committee report tabled with recommended amendments"
      ]
    },
    {
      id: 5,
      title: "Floor Debate, Enactment & Assent",
      shortTitle: "5. Assent",
      stageName: "Legislative Enactment",
      status: currentStageId === 5 ? "current" : currentStageId > 5 ? "completed" : "upcoming",
      legalBasis: "Article 115 (Presidential Assent) / Article 185 (County Enactment)",
      gatekeeper: "Speaker of the House & President of the Republic of Kenya",
      duration: "14 Days from Presentation",
      description: "Second reading clause-by-clause debate, Third reading vote, and transmission to the President for Assent into statutory Act of Parliament or referral with reservations.",
      citizenAction: "Track voting records of your Member of Parliament and verify whether public memorandums were incorporated into the final Act.",
      keyChecklist: [
        "Second & Third Reading legislative floor votes",
        "Presidential Assent signed or referral memorandum returned",
        "Statutory Commencement Date gazetted"
      ]
    },
    {
      id: 6,
      title: "Devolution Rollout & OAG Audit",
      shortTitle: "6. Implementation",
      stageName: "Execution & Oversight",
      status: currentStageId === 6 ? "current" : currentStageId > 6 ? "completed" : "upcoming",
      legalBasis: "Article 229 (Office of the Auditor-General) & IGRTC Act",
      gatekeeper: "Accounting Officers, Council of Governors & Auditor-General Nancy Gathungu",
      duration: "Ongoing Multi-Year Cycle",
      description: "County and national exchequer budget execution, procurement tenders, project delivery milestones, and annual value-for-money audits by the Auditor-General.",
      citizenAction: "Monitor Auditor-General annual reports, inspect local project delivery in your ward, and file Access to Information (ATI) requests under Article 35.",
      keyChecklist: [
        "Annual exchequer fund releases to implementing agencies",
        "County delivery coordination under IGRTC framework",
        "Annual Auditor-General value-for-money compliance report"
      ]
    }
  ];

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6" id="policy-lifecycle-timeline-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <GitCommit className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Constitutional Governance Pipeline
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
            Policy Lifecycle: From Proposal to Implementation
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            Track where this policy measure sits in Kenya's statutory pipeline, key constitutional gatekeepers, and where citizens have mandatory legal windows to intervene.
          </p>
        </div>

        {/* Current Stage Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Current Status: Stage {currentStageId} (Proposal Audit)</span>
          </span>
        </div>
      </div>

      {/* Horizontal Lifecycle Steps Bar (Scrollable on small screens) */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
        <div className="min-w-[680px] grid grid-cols-6 gap-2 relative">
          {/* Connecting Background Line */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-slate-200 -z-0" />

          {stages.map((stage) => {
            const isSelected = selectedStageId === stage.id;
            const isCurrent = stage.id === currentStageId;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`relative z-10 flex flex-col items-center text-center p-2 rounded-xl transition-all cursor-pointer group ${
                  isSelected
                    ? "bg-blue-50/80 border border-blue-300 shadow-xs"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
                id={`lifecycle-step-btn-${stage.id}`}
              >
                {/* Node Circle */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs transition-transform duration-200 mb-2 border-2 ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100 scale-110"
                      : isCurrent
                      ? "bg-amber-500 text-white border-amber-500 ring-4 ring-amber-100"
                      : "bg-white text-slate-700 border-slate-300 group-hover:border-slate-400"
                  }`}
                >
                  {stage.id}
                </div>

                {/* Short Title */}
                <div className="space-y-0.5">
                  <span className={`text-[11px] font-bold block leading-tight ${
                    isSelected ? "text-blue-900" : isCurrent ? "text-amber-900" : "text-slate-800"
                  }`}>
                    {stage.shortTitle}
                  </span>
                  <span className={`text-[9.5px] uppercase font-mono block ${
                    isCurrent ? "text-amber-700 font-bold" : "text-slate-400"
                  }`}>
                    {stage.stageName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Active Stage Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-5"
        >
          {/* Stage Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  STAGE {activeStage.id} OF 6
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Estimated Duration: <strong className="text-slate-200 font-mono">{activeStage.duration}</strong>
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {activeStage.title}
              </h4>
            </div>

            <div className="text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 self-start sm:self-auto">
              <span className="text-slate-400 text-[10px] block uppercase">Constitutional Anchor:</span>
              <strong className="text-emerald-400 font-sans font-semibold">{activeStage.legalBasis}</strong>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {activeStage.description}
          </p>

          {/* 3-Column Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
            {/* Gatekeepers */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-blue-400 font-bold text-[11px] uppercase">
                <Building className="w-3.5 h-3.5" />
                <span>Primary Gatekeeper</span>
              </div>
              <p className="text-slate-200 font-medium">{activeStage.gatekeeper}</p>
            </div>

            {/* Statutory Checklist */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px] uppercase">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Statutory Milestones</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {activeStage.keyChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Citizen Action Trigger */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-[11px] uppercase">
                <Users className="w-3.5 h-3.5" />
                <span>Citizen Action Trigger</span>
              </div>
              <p className="text-amber-100 font-medium text-[11.5px] leading-snug">
                {activeStage.citizenAction}
              </p>
            </div>
          </div>

          {/* Bottom Quick Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <button
              disabled={activeStage.id === 1}
              onClick={() => setSelectedStageId(activeStage.id - 1)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>← Previous Stage</span>
            </button>

            <span className="text-[11px] text-slate-500 font-mono">
              Use timeline to follow bills through Parliament and County Assemblies
            </span>

            <button
              disabled={activeStage.id === 6}
              onClick={() => setSelectedStageId(activeStage.id + 1)}
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer font-bold"
            >
              <span>Next Stage →</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
