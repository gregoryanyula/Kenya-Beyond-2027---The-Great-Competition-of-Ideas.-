import React, { useState } from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Scale, 
  HelpCircle, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Share2,
  Check,
  ImageIcon,
  Download
} from "lucide-react";
import { POLICY_VS_PROMISES_SCORECARD_DATA } from "../data/accountabilityData";
import { PolicyVsPromiseItem } from "../types";
import { ScorecardSocialShareModal } from "./ScorecardSocialShareModal";

export const PolicyVsPromisesScorecard: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Social Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [selectedShareItem, setSelectedShareItem] = useState<PolicyVsPromiseItem | null>(null);

  const sectors = ["All", ...Array.from(new Set(POLICY_VS_PROMISES_SCORECARD_DATA.map((i) => i.sector)))];

  const filteredScorecards = POLICY_VS_PROMISES_SCORECARD_DATA.filter((item) => {
    const matchesSector = selectedSector === "All" || item.sector === selectedSector;
    const matchesSearch = 
      item.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.statedPromise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.historicalRecordOrEvidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.citizenVerdict.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case "Compliant":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "Borderline":
        return "bg-amber-50 text-amber-800 border-amber-300";
      case "Non-Compliant (Unfunded)":
      case "Non-Compliant":
        return "bg-rose-50 text-rose-800 border-rose-300";
      default:
        return "bg-slate-50 text-slate-700 border-slate-300";
    }
  };

  const handleCopyCard = (item: PolicyVsPromiseItem) => {
    const text = `KENYA 2027 POLICY VS. PROMISES SCORECARD\nSector: ${item.sector}\nPromise: "${item.statedPromise}"\nEvidence / Record: ${item.historicalRecordOrEvidence}\nFunding Mechanism: ${item.lineItemCostAndFunding}\nFirst 100 Days: ${item.first100DayCommitment}\nScore: ${item.scoreOutOfTen}/10\nArticle 201: ${item.article201Compliance}\nVerdict: ${item.citizenVerdict}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenShareModal = (item?: PolicyVsPromiseItem) => {
    setSelectedShareItem(item || filteredScorecards[0] || POLICY_VS_PROMISES_SCORECARD_DATA[0]);
    setIsShareModalOpen(true);
  };

  return (
    <div className="space-y-6" id="policy-vs-promises-scorecard">
      {/* Header Info */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-2">
              <Scale className="w-3.5 h-3.5 text-emerald-700" />
              <span>Article 201 Accountability Standard</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Policy vs. Promises Scorecard
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Evaluating candidate campaign pledges against documented historical delivery, line-item funding sustainability, and concrete 100-day execution milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenShareModal()}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-xs shrink-0"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Generate Social Image Summary</span>
            </button>

            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200 text-center shrink-0">
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Average Rigor</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 font-mono">7.4 / 10</div>
            </div>
            <div className="bg-emerald-50 p-2.5 sm:p-3 rounded-lg border border-emerald-200 text-center shrink-0">
              <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Art. 201 Compliant</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-900 font-mono">80%</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedSector === sec
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scorecard..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Scorecard Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredScorecards.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5"
          >
            {/* Top Bar: Sector, Score & Compliance */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.sector}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  “{item.statedPromise}”
                </h4>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Policy Rigor</span>
                  <div className="flex items-baseline space-x-0.5 justify-end">
                    <span className="text-xl font-black font-mono text-slate-900">{item.scoreOutOfTen}</span>
                    <span className="text-xs text-slate-400 font-bold">/10</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getComplianceColor(item.article201Compliance)}`}>
                  {item.article201Compliance}
                </span>
                
                {/* Generate Image Share Button */}
                <button
                  onClick={() => handleOpenShareModal(item)}
                  className="px-2.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center space-x-1.5 text-xs font-bold"
                  title="Generate Social Graphic Card"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">Create Graphic</span>
                </button>

                <button
                  onClick={() => handleCopyCard(item)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Copy Scorecard Summary Text"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Core 3-Column Comparative Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Documented Evidence / Historical Record */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                  Documented Evidence / Track Record:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {item.historicalRecordOrEvidence}
                </p>
              </div>

              {/* 2. Line Item Costing & Financing Mechanism */}
              <div className="p-4 rounded-lg bg-amber-50/40 border border-amber-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">
                  Line-Item Cost & Financing Sustainability:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {item.lineItemCostAndFunding}
                </p>
              </div>

              {/* 3. First 100 Days Specific Commitment */}
              <div className="p-4 rounded-lg bg-blue-50/40 border border-blue-200 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-900 block">
                  First 100 Days Verifiable Milestone:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {item.first100DayCommitment}
                </p>
              </div>
            </div>

            {/* Bottom Verdict Banner */}
            <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0 text-xs">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-0.5">
                  Citizen Scrutiny Verdict:
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {item.citizenVerdict}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Sharing & Image Generator Modal */}
      <ScorecardSocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialItem={selectedShareItem}
      />
    </div>
  );
};
