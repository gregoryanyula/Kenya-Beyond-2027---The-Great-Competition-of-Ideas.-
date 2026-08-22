import React from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  Scale, 
  DollarSign, 
  Flag, 
  Layers, 
  HelpCircle,
  BookOpen
} from "lucide-react";

export const PrintFriendlyLegend: React.FC = () => {
  return (
    <div 
      className="hidden print:block print-only my-6 p-4 rounded-xl border border-slate-300 bg-slate-50/90 text-slate-900 text-xs break-inside-avoid"
      id="print-friendly-audit-legend"
    >
      {/* Header */}
      <div className="border-b border-slate-300 pb-2 mb-3 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
            Kenya 2027 Civic Scrutiny — Print & Audit Verification Legend
          </h4>
          <p className="text-[10px] text-slate-600">
            Standardized iconography and indicator criteria mandated by the 13-Point Constitutional Scrutiny Framework
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-slate-500">
          Statutory Ref: Katiba Art. 201 & PFM Act
        </div>
      </div>

      {/* Grid of Indicator Explanations */}
      <div className="grid grid-cols-2 gap-3 text-[11px]">
        {/* Compliance Status Symbols */}
        <div className="space-y-1.5 p-2.5 rounded-lg bg-white border border-slate-200">
          <div className="font-bold text-slate-900 flex items-center gap-1">
            <span>13-Point Criterion Verdict Symbols:</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                [✓] Clear / Compliant:
              </span>
              <span className="text-slate-700">Specific timelines, statutory references, and verified funding source provided.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                [!] Ambiguous:
              </span>
              <span className="text-slate-700">Proposal lacks clear costing, execution agency, or specific key performance metrics.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-rose-800 bg-rose-100 px-1.5 py-0.2 rounded border border-rose-300">
                [✗] Missing / Risk:
              </span>
              <span className="text-slate-700">No funding plan, ungrounded political slogan, or statutory conflict with Article 201.</span>
            </div>
          </div>
        </div>

        {/* Scoring Scale Rationale */}
        <div className="space-y-1.5 p-2.5 rounded-lg bg-white border border-slate-200">
          <div className="font-bold text-slate-900">
            Weighted Composite Rigor Scale (0–100):
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-800">80–100 (High Rigor):</span>
              <span className="text-slate-700">Solid plan, constitutional compliance & balanced financing.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800">60–79 (Moderate):</span>
              <span className="text-slate-700">Promising concept with fiscal or devolution governance gaps.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-800">0–59 (High Risk / Slogan):</span>
              <span className="text-slate-700">Unfunded mandate or high debt borrowing risk.</span>
            </div>
          </div>
        </div>

        {/* Constitutional Article 201 Pillars */}
        <div className="space-y-1 p-2.5 rounded-lg bg-white border border-slate-200">
          <div className="font-bold text-slate-900">
            Article 201 Public Finance Standards:
          </div>
          <p className="text-slate-700 text-[10px] leading-relaxed">
            <strong>• Transparency:</strong> Public participation & open procurement.<br />
            <strong>• Equity:</strong> Fair taxation & equitable county revenue devolution.<br />
            <strong>• Debt Prudence:</strong> Borrowing only for sustainable capital investments.
          </p>
        </div>

        {/* Official Data Repositories */}
        <div className="space-y-1 p-2.5 rounded-lg bg-white border border-slate-200">
          <div className="font-bold text-slate-900">
            Official Empirical Baseline Sources:
          </div>
          <p className="text-slate-700 text-[10px] leading-relaxed">
            • <strong>KNBS:</strong> Economic Survey & Census Datasets<br />
            • <strong>CBK:</strong> Public Debt & Inflation Statistics<br />
            • <strong>CRA:</strong> County Allocation of Revenue Act (CARA)<br />
            • <strong>Treasury:</strong> Budget Policy Statement (BPS) & MTEF
          </p>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
        <span>Non-Partisan Civic Guarantee • "Usitupatie slogan. Tupatie plan."</span>
        <span>Kenya 2027 Civic Policy Audit Tool</span>
      </div>
    </div>
  );
};
