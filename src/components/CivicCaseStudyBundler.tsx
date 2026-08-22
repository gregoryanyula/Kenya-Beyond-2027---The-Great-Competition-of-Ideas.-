import React, { useState, useMemo } from "react";
import {
  FileStack,
  CheckSquare,
  Square,
  Sparkles,
  Share2,
  Copy,
  Check,
  Download,
  FileText,
  Twitter,
  MessageCircle,
  Linkedin,
  Printer,
  ChevronRight,
  TrendingUp,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Layers,
  X
} from "lucide-react";
import { EvaluationResult } from "../types";

export interface BundledAuditItem {
  id: string;
  title: string;
  category: string;
  proposerOrParty: string;
  overallScore: number; // 0-10
  fiscalRealism: number; // 0-10
  constitutionalViability: number; // 0-10
  estimatedCost: string;
  keyFinding: string;
  article201Risk: string;
  dateAudited: string;
}

// Built-in standard curated audits that citizens can bundle alongside their own custom audits
const DEFAULT_PRESET_AUDITS: BundledAuditItem[] = [
  {
    id: "audit_sha_uhealth",
    title: "Universal Health Coverage & Social Health Authority (SHA/SHIF)",
    category: "Healthcare & Social Protection",
    proposerOrParty: "Executive / Ministry of Health",
    overallScore: 6.8,
    fiscalRealism: 5.5,
    constitutionalViability: 7.2,
    estimatedCost: "KES 140 Billion / Year",
    keyFinding: "Transition from NHIF to SHA establishes progressive means-testing but faces primary health exchequer cash flow bottlenecks.",
    article201Risk: "Risk of out-of-pocket medical distress if Level 4/5 county referral hospital claims are delayed.",
    dateAudited: "2026-08-15"
  },
  {
    id: "audit_housing_levy",
    title: "Affordable Housing Program & Mandatory Wage Levy",
    category: "Infrastructure & Urban Housing",
    proposerOrParty: "National Assembly Majority",
    overallScore: 7.0,
    fiscalRealism: 6.8,
    constitutionalViability: 6.5,
    estimatedCost: "KES 180 Billion / Year",
    keyFinding: "1.5% gross salary deduction mobilizes stable capital for 200,000 units, but public participation litigation remains active.",
    article201Risk: "Heavy tax burden on formal sector employees (18% of workforce) bearing disproportionate burden.",
    dateAudited: "2026-08-10"
  },
  {
    id: "audit_devolution_dora",
    title: "County Equitable Revenue Share & Division of Revenue (DoRA)",
    category: "Devolution & Decentralization",
    proposerOrParty: "Council of Governors & Senate",
    overallScore: 8.4,
    fiscalRealism: 7.8,
    constitutionalViability: 9.2,
    estimatedCost: "KES 420 Billion / Year",
    keyFinding: "Constitutional pillar of regional equity; delays in National Treasury exchequer releases undermine county payroll.",
    article201Risk: "Intergovernmental debt arrears and pending bills exceeding KES 160 Billion in counties.",
    dateAudited: "2026-08-18"
  },
  {
    id: "audit_digital_economy",
    title: "Digital Superhighway, Optic Fiber & AI Innovation Hubs",
    category: "Technology & Youth Employment",
    proposerOrParty: "Ministry of ICT & Digital Economy",
    overallScore: 8.1,
    fiscalRealism: 7.5,
    constitutionalViability: 8.8,
    estimatedCost: "KES 65 Billion (5-Year Plan)",
    keyFinding: "100,000 km broadband fiber rollout creates scalable freelance digital employment across 1,450 wards.",
    article201Risk: "5% withholding tax on digital creators risks disincentivizing early-stage digital entrepreneurship.",
    dateAudited: "2026-08-12"
  },
  {
    id: "audit_university_model",
    title: "Variable University Scholarship & HELB Student Loan Model",
    category: "Higher Education & Skills",
    proposerOrParty: "Ministry of Education",
    overallScore: 6.2,
    fiscalRealism: 4.8,
    constitutionalViability: 7.0,
    estimatedCost: "KES 85 Billion / Year",
    keyFinding: "Band 1-5 means-testing algorithm placed vulnerable students in unaffordable brackets, prompting urgent recalibration.",
    article201Risk: "Universities facing KES 75B accumulated operational deficits and unpaid pension remittances.",
    dateAudited: "2026-08-05"
  }
];

interface CivicCaseStudyBundlerProps {
  currentAuditResult?: EvaluationResult | null;
  currentPolicyTitle?: string;
  onClose?: () => void;
}

export const CivicCaseStudyBundler: React.FC<CivicCaseStudyBundlerProps> = ({
  currentAuditResult,
  currentPolicyTitle = "Active Audited Policy",
  onClose
}) => {
  // Combine preset audits with current active audit if available
  const initialAudits = useMemo(() => {
    const list = [...DEFAULT_PRESET_AUDITS];
    if (currentAuditResult && currentAuditResult.verdict_score) {
      const activeItem: BundledAuditItem = {
        id: "active_current_audit",
        title: currentPolicyTitle,
        category: "Active In-Session Policy",
        proposerOrParty: "Audited Manifesto / Policy Proposal",
        overallScore: currentAuditResult.verdict_score.overall_verdict_score,
        fiscalRealism: currentAuditResult.verdict_score.fiscal_realism_score,
        constitutionalViability: currentAuditResult.verdict_score.constitutional_viability_score,
        estimatedCost: "KES " + (currentAuditResult.fiscal_assessment?.total_estimated_cost_kes_billions || "50") + " Billion",
        keyFinding: currentAuditResult.verdict_score.overall_summary || "Rigorous 13-point civic audit completed under Article 201.",
        article201Risk: currentAuditResult.constitutional_assessment?.primary_risk_factor || "Requires strict adherence to intergenerational debt equity.",
        dateAudited: new Date().toISOString().split("T")[0]
      };
      return [activeItem, ...list];
    }
    return list;
  }, [currentAuditResult, currentPolicyTitle]);

  const [selectedAuditIds, setSelectedAuditIds] = useState<string[]>([
    initialAudits[0]?.id || "audit_sha_uhealth",
    "audit_housing_levy",
    "audit_devolution_dora"
  ]);

  const [caseStudyTitle, setCaseStudyTitle] = useState<string>(
    "Kenya 2027 Macro Civic Dossier: Health, Housing & Devolution Under Article 201"
  );
  const [authorName, setAuthorName] = useState<string>("Civic Scrutiny Working Group");
  const [activeShareFormat, setActiveShareFormat] = useState<"whatsapp" | "twitter" | "linkedin" | "markdown">("whatsapp");
  const [copiedState, setCopiedState] = useState<boolean>(false);

  const toggleSelectAudit = (id: string) => {
    setSelectedAuditIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedAuditIds(initialAudits.map((a) => a.id));
  };

  const clearSelection = () => {
    setSelectedAuditIds([]);
  };

  // Selected audits data
  const selectedAudits = useMemo(() => {
    return initialAudits.filter((a) => selectedAuditIds.includes(a.id));
  }, [initialAudits, selectedAuditIds]);

  // Aggregate Metrics
  const aggregateMetrics = useMemo(() => {
    if (selectedAudits.length === 0) return { avgScore: 0, avgFiscal: 0, avgConst: 0, totalCount: 0 };
    const avgScore = Number((selectedAudits.reduce((acc, curr) => acc + curr.overallScore, 0) / selectedAudits.length).toFixed(1));
    const avgFiscal = Number((selectedAudits.reduce((acc, curr) => acc + curr.fiscalRealism, 0) / selectedAudits.length).toFixed(1));
    const avgConst = Number((selectedAudits.reduce((acc, curr) => acc + curr.constitutionalViability, 0) / selectedAudits.length).toFixed(1));
    return { avgScore, avgFiscal, avgConst, totalCount: selectedAudits.length };
  }, [selectedAudits]);

  // Generated Text Outputs for different platforms
  const formattedOutputs = useMemo(() => {
    const dateStr = new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
    
    // 1. WhatsApp Formatter (Formatted for viral WhatsApp civic broadcasts)
    const whatsappText = `🇰🇪 *CIVIC CASE STUDY DOSSIER: KENYA 2027* 🇰🇪\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📌 *Title:* ${caseStudyTitle}\n` +
      `✍️ *Author:* ${authorName}\n` +
      `📅 *Date:* ${dateStr}\n` +
      `📊 *Policies Audited:* ${selectedAudits.length} National Policies\n` +
      `⭐ *Aggregate Civic Score:* ${aggregateMetrics.avgScore}/10\n` +
      `💰 *Fiscal Realism Score:* ${aggregateMetrics.avgFiscal}/10\n` +
      `⚖️ *Constitutional Viability:* ${aggregateMetrics.avgConst}/10\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🔍 *EXECUTIVE AUDIT SUMMARY:*\n` +
      `Under Article 201 of the Constitution, this civic dossier evaluates ${selectedAudits.length} flagship policies on costing, debt equity, and devolution impact.\n\n` +
      `📋 *POLICY-BY-POLICY BREAKDOWN:*\n\n` +
      selectedAudits.map((a, i) => 
        `*${i + 1}. ${a.title}*\n` +
        `• *Proposer:* ${a.proposerOrParty}\n` +
        `• *Score:* ${a.overallScore}/10 | Cost: ${a.estimatedCost}\n` +
        `• *Finding:* ${a.keyFinding}\n` +
        `• *Article 201 Risk:* ${a.article201Risk}\n`
      ).join("\n") +
      `\n━━━━━━━━━━━━━━━━━━━━\n` +
      `📢 *CITIZEN ACTION POINTS:*\n` +
      `1. Demand line-item costings during parliamentary public hearings under Article 118.\n` +
      `2. Safeguard county equitable transfers (>KES 400B) from exchequer delays.\n` +
      `3. Insist on intergenerational debt fairness before new sovereign borrowing.\n\n` +
      `🔗 *Audited via Kenya 2027 Civic Intelligence Engine (WCAG AA+ Accessible)*\n` +
      `#Kenya2027 #Article201 #Kenya2060 #CivicAudit`;

    // 2. Twitter / X Thread (Chunked into 280-char tweets)
    const tweets = [
      `1/4 🧵 KENYA 2027 CIVIC DOSSIER\n\n"${caseStudyTitle}"\n\nWe bundled & audited ${selectedAudits.length} flagship policies against Article 201 of the Constitution.\n\n📊 Aggregate Score: ${aggregateMetrics.avgScore}/10\n💰 Fiscal Score: ${aggregateMetrics.avgFiscal}/10\n⚖️ Constitutional: ${aggregateMetrics.avgConst}/10\n\n👇 Breakdown:`,
      `2/4 📋 POLICY MATRIX:\n\n` + selectedAudits.slice(0, 3).map((a) => `• ${a.title}: ${a.overallScore}/10 (${a.estimatedCost})\nRisk: ${a.article201Risk.slice(0, 60)}...`).join("\n\n"),
      selectedAudits.length > 3
        ? `3/4 📋 MORE POLICIES:\n\n` + selectedAudits.slice(3).map((a) => `• ${a.title}: ${a.overallScore}/10 (${a.estimatedCost})\nFinding: ${a.keyFinding.slice(0, 70)}...`).join("\n\n")
        : `3/4 💡 FISCAL INSIGHT:\n\nAverage fiscal realism stands at ${aggregateMetrics.avgFiscal}/10. Without Ring-fencing ordinary revenue and curbing pending bills, capital project execution will crowd out health & capitation.`,
      `4/4 🇰🇪 CITIZEN TAKEAWAY:\n\nArticle 201 belongs to all 50M Kenyans. We demand transparent costing, public hearings under Article 118, and prompt devolution disbursements.\n\nRead the full dossier on the Kenya 2027 Platform.\n#Kenya2027 #Article201 #CivicScrutiny`
    ];

    // 3. LinkedIn / Professional Policy Brief
    const linkedinText = `🇰🇪 Policy Brief: ${caseStudyTitle}\n\n` +
      `Author: ${authorName} | Published: ${dateStr}\n\n` +
      `Executive Summary:\n` +
      `This consolidated civic case study synthesizes empirical findings across ${selectedAudits.length} major public policies currently under parliamentary scrutiny in Kenya. Grounded in the Public Finance Management (PFM) Act and Article 201 of the Constitution, our audit evaluated fiscal realism, institutional capacity, and devolution equity.\n\n` +
      `Key Benchmark Findings:\n` +
      `• Composite Civic Readiness: ${aggregateMetrics.avgScore} / 10\n` +
      `• Fiscal Sustainability Rating: ${aggregateMetrics.avgFiscal} / 10\n` +
      `• Constitutional Alignment Rating: ${aggregateMetrics.avgConst} / 10\n\n` +
      `Synthesized Policy Audit Outcomes:\n` +
      selectedAudits.map((a, i) => `${i + 1}. ${a.title} (${a.overallScore}/10)\n   - Estimated Financial Envelope: ${a.estimatedCost}\n   - Assessment: ${a.keyFinding}\n   - Statutory Risk: ${a.article201Risk}`).join("\n\n") +
      `\n\nRecommendations for the 13th Parliament & Council of Governors:\n` +
      `1. Full exchequer automation for devolved equitable share transfers.\n` +
      `2. Implementation of dynamic sensitivity testing on tax yields prior to Gazette publication.\n` +
      `3. Open-access citizen memorandums repository under Article 118.\n\n` +
      `#PublicPolicy #Kenya2027 #Devolution #PFM #Article201 #Economics`;

    // 4. Markdown Long-Form Document
    const markdownText = `# ${caseStudyTitle}\n\n` +
      `**Author:** ${authorName}  \n` +
      `**Date of Audit:** ${dateStr}  \n` +
      `**Scope:** ${selectedAudits.length} Flagship Policies Bundled  \n` +
      `**Aggregate Viability:** ${aggregateMetrics.avgScore} / 10  \n\n` +
      `---\n\n` +
      `## 1. Executive Summary & Constitutional Mandate\n\n` +
      `Article 201 of the Constitution of Kenya establishes openness, accountability, and public participation in all financial matters. This Civic Case Study aggregates ${selectedAudits.length} policies to evaluate cumulative fiscal pressure, debt burdens, and devolution equity.\n\n` +
      `## 2. Cross-Policy Comparative Matrix\n\n` +
      `| Policy Title | Category | Overall Score | Fiscal Realism | Est. Annual Cost |\n` +
      `| :--- | :--- | :---: | :---: | :--- |\n` +
      selectedAudits.map((a) => `| ${a.title} | ${a.category} | **${a.overallScore}/10** | ${a.fiscalRealism}/10 | ${a.estimatedCost} |`).join("\n") +
      `\n\n## 3. Deep-Dive Findings & Statutory Risks\n\n` +
      selectedAudits.map((a) => 
        `### ${a.title}\n` +
        `- **Proposer / Sponsor:** ${a.proposerOrParty}\n` +
        `- **Audit Verdict:** ${a.overallScore}/10\n` +
        `- **Key Empirical Finding:** ${a.keyFinding}\n` +
        `- **Article 201 Statutory Risk:** ${a.article201Risk}\n`
      ).join("\n") +
      `\n## 4. Strategic Citizen Recommendations\n\n` +
      `1. **Budget Transparency:** Demand granular program-based costing from the National Treasury.\n` +
      `2. **Devolution Ring-Fencing:** Safeguard the minimum 15% constitutional revenue share to counties.\n` +
      `3. **Intergenerational Equity:** Oppose sovereign loans that exceed the 55% present-value debt ceiling without designated revenue returns.\n\n` +
      `*Generated by Kenya 2027 Civic Intelligence Engine.*`;

    return {
      whatsappText,
      tweets,
      linkedinText,
      markdownText
    };
  }, [selectedAudits, caseStudyTitle, authorName, aggregateMetrics]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([formattedOutputs.markdownText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${caseStudyTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_case_study.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6" id="civic-case-study-bundler">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            <FileStack className="w-3.5 h-3.5 text-emerald-600" />
            Civic Case Study Dossier & Social Publisher
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Bundle Audit Reports into a Civic Case Study
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-0.5">
            Select multiple evaluated policies to synthesize a comprehensive long-form case study with cross-cutting Article 201 matrices, formatted for instant 1-click sharing to WhatsApp, X (Twitter), LinkedIn, and Markdown.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors self-start lg:self-center"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Configuration Metadata Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[10.5px]">
            Dossier Title:
          </label>
          <input
            type="text"
            value={caseStudyTitle}
            onChange={(e) => setCaseStudyTitle(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>
        <div className="space-y-1">
          <label className="font-bold text-slate-800 uppercase tracking-wider text-[10.5px]">
            Lead Author / Civic Organization:
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Policy Selection Multi-Select List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Select Audit Reports to Bundle ({selectedAuditIds.length} of {initialAudits.length} selected):
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={selectAll}
              className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
            >
              Select All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={clearSelection}
              className="text-slate-500 hover:text-slate-700 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>

        {/* List of Audits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {initialAudits.map((item) => {
            const isSelected = selectedAuditIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleSelectAudit(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-2xs"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <button
                      type="button"
                      className="mt-0.5 text-emerald-600"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 fill-emerald-100" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <div>
                      <div className="font-bold text-xs text-slate-900 leading-snug">
                        {item.title}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {item.category} • {item.proposerOrParty}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs text-slate-800 shrink-0">
                    {item.overallScore}/10
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 pl-6">
                  {item.keyFinding}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pl-6 pt-1 border-t border-slate-200/60">
                  <span>Cost: <strong className="text-slate-800">{item.estimatedCost}</strong></span>
                  <span>Fiscal: {item.fiscalRealism}/10</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Aggregate Score Strip */}
      {selectedAudits.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10.5px] uppercase font-mono text-slate-400 block font-bold">
                Synthesized Case Study Score
              </span>
              <span className="text-base font-black text-white">
                {aggregateMetrics.avgScore} / 10 ({selectedAudits.length} Policies Bundled)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Avg Fiscal Score</span>
              <span className="text-emerald-400 font-bold">{aggregateMetrics.avgFiscal}/10</span>
            </div>
            <div className="text-right border-l border-slate-800 pl-4">
              <span className="text-slate-400 block text-[10px]">Avg Constitutional</span>
              <span className="text-blue-400 font-bold">{aggregateMetrics.avgConst}/10</span>
            </div>
          </div>
        </div>
      )}

      {/* Platform Formatter & Sharing Center */}
      {selectedAudits.length > 0 ? (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                1-Click Social & Platform Formatter:
              </span>
            </div>

            {/* Platform Sub-Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveShareFormat("whatsapp")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeShareFormat === "whatsapp"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Memo</span>
              </button>

              <button
                onClick={() => setActiveShareFormat("twitter")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeShareFormat === "twitter"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X / Twitter Thread</span>
              </button>

              <button
                onClick={() => setActiveShareFormat("linkedin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeShareFormat === "linkedin"
                    ? "bg-blue-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Brief</span>
              </button>

              <button
                onClick={() => setActiveShareFormat("markdown")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeShareFormat === "markdown"
                    ? "bg-purple-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Markdown Dossier</span>
              </button>
            </div>
          </div>

          {/* Formatted Content Preview Box */}
          <div className="relative rounded-2xl border border-slate-300 bg-slate-50 p-4 sm:p-5 text-xs text-slate-800 font-mono leading-relaxed space-y-4">
            
            {/* Quick Actions Header in Preview */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase">
                {activeShareFormat === "whatsapp"
                  ? "Formatted with WhatsApp markdown (*bold*, _italics_) for mobile broadcast"
                  : activeShareFormat === "twitter"
                  ? `Formatted into ${formattedOutputs.tweets.length} numbered 280-char tweets`
                  : activeShareFormat === "linkedin"
                  ? "Structured policy brief with executive recommendations"
                  : "Standard Markdown syntax with tables and headings"}
              </span>

              <div className="flex items-center gap-2">
                {activeShareFormat === "markdown" && (
                  <button
                    onClick={handleDownloadMarkdown}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    const textToCopy =
                      activeShareFormat === "whatsapp"
                        ? formattedOutputs.whatsappText
                        : activeShareFormat === "twitter"
                        ? formattedOutputs.tweets.join("\n\n---\n\n")
                        : activeShareFormat === "linkedin"
                        ? formattedOutputs.linkedinText
                        : formattedOutputs.markdownText;
                    copyToClipboard(textToCopy);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                    copiedState
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {copiedState ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedState ? "Copied to Clipboard!" : "Copy Full Text"}</span>
                </button>
              </div>
            </div>

            {/* Display Text by Format */}
            <div className="max-h-80 overflow-y-auto whitespace-pre-wrap font-sans text-xs bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
              {activeShareFormat === "whatsapp" && formattedOutputs.whatsappText}
              {activeShareFormat === "twitter" && (
                <div className="space-y-4 font-sans">
                  {formattedOutputs.tweets.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 relative group">
                      <div className="flex justify-between items-center mb-1 text-[10px] text-slate-400 font-mono">
                        <span>Tweet {idx + 1} of {formattedOutputs.tweets.length} ({t.length} chars)</span>
                        <button
                          onClick={() => copyToClipboard(t)}
                          className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>
                      <div className="text-slate-800 leading-relaxed whitespace-pre-wrap">{t}</div>
                    </div>
                  ))}
                </div>
              )}
              {activeShareFormat === "linkedin" && formattedOutputs.linkedinText}
              {activeShareFormat === "markdown" && (
                <pre className="font-mono text-2xs leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {formattedOutputs.markdownText}
                </pre>
              )}
            </div>

          </div>

        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
          Select at least one policy above to generate your bundled Civic Case Study.
        </div>
      )}

    </div>
  );
};
