import React, { useState } from "react";
import { 
  ShieldAlert, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Search, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Gavel
} from "lucide-react";
import { 
  LEGISLATIVE_BENCHMARKS, 
  PRESET_CONFLICT_CASES, 
  PresetConflictCase, 
  LegislativeBenchmark 
} from "../data/policyConflictCheckerData";

interface PolicyConflictCheckerProps {
  onAuditPolicy?: (claimText: string, domain?: string) => void;
}

export const PolicyConflictChecker: React.FC<PolicyConflictCheckerProps> = ({ onAuditPolicy }) => {
  const [inputClaim, setInputClaim] = useState<string>("");
  const [selectedDomain, setSelectedDomain] = useState<string>("Public Debt & Fiscal Realism");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [analyzedResult, setAnalyzedResult] = useState<PresetConflictCase | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [copiedRemedy, setCopiedRemedy] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"checker" | "statutes">("checker");

  // Load a preset case
  const handleSelectPreset = (preset: PresetConflictCase) => {
    setActivePresetId(preset.id);
    setInputClaim(preset.manifestoClaim);
    setSelectedDomain(preset.policyDomain);
    setAnalyzedResult(preset);
  };

  // Run dynamic conflict scan
  const handleRunScan = () => {
    if (!inputClaim.trim()) return;

    setIsScanning(true);

    setTimeout(() => {
      // Check if input matches or is close to any preset, else perform heuristic statutory mapping
      const lower = (inputClaim || "").toLowerCase();
      const matchedPreset = PRESET_CONFLICT_CASES.find(p => 
        lower.includes("tender") || lower.includes("salary") || lower.includes("wage") || 
        lower.includes("market") || lower.includes("school") || lower.includes("tax") || lower.includes("exemption")
      );

      if (matchedPreset && inputClaim.length > 20) {
        setAnalyzedResult({
          ...matchedPreset,
          manifestoClaim: inputClaim
        });
      } else {
        // Dynamic simulated evaluation against benchmark rules
        let foundBenchmark = LEGISLATIVE_BENCHMARKS[0];
        let sev: "CRITICAL" | "HIGH" | "MODERATE" | "LOW" = "MODERATE";

        if (lower.includes("borrow") || lower.includes("debt") || lower.includes("tax") || lower.includes("loan")) {
          foundBenchmark = LEGISLATIVE_BENCHMARKS.find(b => b.id === "leg-art-201-debt") || LEGISLATIVE_BENCHMARKS[0];
          sev = "HIGH";
        } else if (lower.includes("county") || lower.includes("devolution") || lower.includes("governor")) {
          foundBenchmark = LEGISLATIVE_BENCHMARKS.find(b => b.id === "leg-sch-4-devol") || LEGISLATIVE_BENCHMARKS[4];
          sev = "CRITICAL";
        } else if (lower.includes("procurement") || lower.includes("tender") || lower.includes("contract")) {
          foundBenchmark = LEGISLATIVE_BENCHMARKS.find(b => b.id === "leg-ppada-comp") || LEGISLATIVE_BENCHMARKS[5];
          sev = "CRITICAL";
        } else if (lower.includes("school") || lower.includes("student") || lower.includes("teacher") || lower.includes("education")) {
          foundBenchmark = LEGISLATIVE_BENCHMARKS.find(b => b.id === "leg-art-53-edu") || LEGISLATIVE_BENCHMARKS[8];
          sev = "HIGH";
        } else if (lower.includes("health") || lower.includes("hospital") || lower.includes("sha") || lower.includes("doctor")) {
          foundBenchmark = LEGISLATIVE_BENCHMARKS.find(b => b.id === "leg-art-43-health") || LEGISLATIVE_BENCHMARKS[9];
          sev = "HIGH";
        }

        setAnalyzedResult({
          id: "custom-scan-" + Date.now(),
          manifestoClaim: inputClaim,
          proposedBy: "Citizen Custom Audited Proposal",
          policyDomain: selectedDomain,
          conflictingStatute: foundBenchmark.statuteName,
          legalCitation: foundBenchmark.legalCitation,
          conflictType: "Statutory Violation",
          severity: sev,
          explanation: `This proposal intersects with ${foundBenchmark.legalCitation} (${foundBenchmark.coreRule}). Any policy in this domain must strictly align with the statutory standard: "${foundBenchmark.statutoryThreshold}"`,
          offendingClause: `"${inputClaim.slice(0, 80)}${inputClaim.length > 80 ? "..." : ""}"`,
          statutoryRequirement: foundBenchmark.statutoryThreshold,
          recommendedLegalRemedy: `Align the implementation timeline, budgetary appropriations, and public participation procedures with the mandatory safeguards of ${foundBenchmark.legalCitation}.`
        });
      }

      setIsScanning(false);
    }, 400);
  };

  const handleClear = () => {
    setInputClaim("");
    setActivePresetId(null);
    setAnalyzedResult(null);
  };

  const handleCopyRemedy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRemedy(true);
    setTimeout(() => setCopiedRemedy(false), 2000);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return "bg-rose-100 text-rose-900 border-rose-300";
      case "HIGH":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "MODERATE":
        return "bg-blue-100 text-blue-900 border-blue-300";
      default:
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
    }
  };

  return (
    <div className="space-y-6" id="policy-conflict-checker-section">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Gavel className="w-3.5 h-3.5 text-amber-400" />
              <span>Constitutional & Legislative Conflict Scrutiny Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Policy Conflict & Statutory Inconsistency Checker
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Cross-reference new manifesto items and campaign pledges against existing Kenyan legislative records (Public Finance Management Act, PPADA 2015, Basic Education Act, and Constitution Articles 201, 227 & Fourth Schedule). Prevent unconstitutional promises before an audit is finalized.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-center">
            <button
              onClick={() => setActiveTab("checker")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "checker" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Conflict Checker
            </button>
            <button
              onClick={() => setActiveTab("statutes")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "statutes" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Statutory Benchmarks ({LEGISLATIVE_BENCHMARKS.length})
            </button>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Load Tested Manifesto Conflict Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_CONFLICT_CASES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all text-left truncate max-w-xs ${
                  activePresetId === preset.id
                    ? "bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
                title={preset.manifestoClaim}
              >
                ⚠️ {preset.manifestoClaim.slice(0, 45)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "checker" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input & Config Column (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Enter Manifesto Policy Claim to Audit:
                </label>
                <textarea
                  value={inputClaim}
                  onChange={(e) => setInputClaim(e.target.value)}
                  placeholder="Paste or type any political campaign pledge, manifesto item, or policy promise here (e.g. 'National government will take over local municipal markets and recruit teachers without TSC registration')..."
                  className="w-full h-36 p-3.5 text-xs rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none leading-relaxed transition-all"
                  id="conflict-checker-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Policy Domain:
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 bg-white font-medium text-slate-800"
                >
                  <option value="Public Debt & Fiscal Realism">Public Debt & Fiscal Realism</option>
                  <option value="Transport & Infrastructure">Transport & Infrastructure</option>
                  <option value="Devolution & County Autonomy">Devolution & County Autonomy</option>
                  <option value="Education & Human Capital Development">Education & Human Capital Development</option>
                  <option value="Healthcare & Social Protection">Healthcare & Social Protection</option>
                  <option value="Governance & Anti-Corruption">Governance & Anti-Corruption</option>
                  <option value="Agriculture & Food Sovereignty">Agriculture & Food Sovereignty</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={handleClear}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleRunScan}
                disabled={!inputClaim.trim() || isScanning}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                id="run-conflict-scan-btn"
              >
                {isScanning ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Cross-referencing Statutes...</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Run Conflict Cross-Check</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Conflict Analysis Output Column (7 cols) */}
          <div className="lg:col-span-7">
            {analyzedResult ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
                {/* Severity Header */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider font-mono border ${getSeverityBadge(analyzedResult.severity)}`}>
                      {analyzedResult.severity} CONFLICT DETECTED
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {analyzedResult.conflictType}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {analyzedResult.legalCitation}
                  </span>
                </div>

                {/* Conflicting Statute Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                    Statutory & Constitutional Benchmark Breached:
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {analyzedResult.conflictingStatute}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {analyzedResult.explanation}
                  </p>
                </div>

                {/* Offending Clause vs Statutory Standard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Offending Proposal Clause:</span>
                    </div>
                    <p className="text-rose-950 font-medium leading-relaxed italic">
                      {analyzedResult.offendingClause}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Statutory Legal Requirement:</span>
                    </div>
                    <p className="text-emerald-950 font-medium leading-relaxed">
                      {analyzedResult.statutoryRequirement}
                    </p>
                  </div>
                </div>

                {/* Recommended Legal Remedy */}
                <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-300 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                        Recommended Constitutional Alignment & Legal Remedy:
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyRemedy(analyzedResult.recommendedLegalRemedy)}
                      className="text-[11px] font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-amber-200/60 px-2 py-0.5 rounded transition-colors"
                      title="Copy remedy text"
                    >
                      {copiedRemedy ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedRemedy ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    {analyzedResult.recommendedLegalRemedy}
                  </p>
                </div>

                {/* Audit in Tool CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Use these legal findings to challenge candidates during town halls and debates.
                  </span>

                  {onAuditPolicy && (
                    <button
                      onClick={() => onAuditPolicy(analyzedResult.manifestoClaim, analyzedResult.policyDomain)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Load into Policy Audit Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Empty state */
              <div className="bg-slate-50 rounded-2xl p-12 border border-dashed border-slate-300 text-center space-y-3 flex flex-col items-center justify-center min-h-[360px]">
                <div className="p-3 rounded-full bg-slate-100 text-slate-400">
                  <Scale className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  Ready to Cross-Reference Manifesto Items
                </h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  Enter a policy claim or select one of the tested conflict scenarios above to run an instant statutory inconsistency check against Kenyan law.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Statutory Benchmarks Reference Table */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-base font-bold text-slate-900">
              Constitutional & Statutory Audit Rulebook
            </h4>
            <p className="text-xs text-slate-500">
              The statutory thresholds that all political party manifestos and public policies are evaluated against.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEGISLATIVE_BENCHMARKS.map((bench) => (
              <div key={bench.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {bench.legalCitation}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {bench.category}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900">
                  {bench.coreRule}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {bench.statutoryThreshold}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
