import React, { useState } from "react";
import { 
  Flag, 
  Layers, 
  Zap, 
  Anchor, 
  Cpu, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  BarChart3,
  BookOpen
} from "lucide-react";
import { KENYA_2060_PILLARS } from "../data/kenya2060Data";
import { Kenya2060ProgressDashboard } from "./Kenya2060ProgressDashboard";

interface Kenya2060ContinuityCharterProps {
  onAuditTopic?: (topic: string, domain: string) => void;
}

export const Kenya2060ContinuityCharter: React.FC<Kenya2060ContinuityCharterProps> = ({ onAuditTopic }) => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "charter">("dashboard");
  const [activePillarId, setActivePillarId] = useState(KENYA_2060_PILLARS[0].id);

  const activePillar = KENYA_2060_PILLARS.find((p) => p.id === activePillarId) || KENYA_2060_PILLARS[0];

  return (
    <div className="space-y-8" id="kenya-2060-charter-section">
      {/* Top View Selector Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Kenya 2060 Long-Term Development Architecture</h2>
            <p className="text-xs text-slate-500">Cross-administration targets & continuity safeguards</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "dashboard"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            id="tab-2060-progress-dashboard"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Progress Dashboard (Targets & Goals)</span>
          </button>

          <button
            onClick={() => setActiveTab("charter")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "charter"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            id="tab-2060-continuity-charter"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Continuity Charter (The 6 Pillars)</span>
          </button>
        </div>
      </div>

      {activeTab === "dashboard" ? (
        <Kenya2060ProgressDashboard onAuditTopic={onAuditTopic} />
      ) : (
        /* The 6 Pillars Charter Content */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Hero Explainer */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
                <Flag className="w-3.5 h-3.5 text-emerald-700" />
                <span>National Development Continuity Framework</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                “What Should Kenya Continue Building Regardless of Who Wins in 2027?”
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                National development does not belong to any single president, administration, or political party. Kenya cannot afford the multi-billion shilling waste of halting mega-infrastructure, geothermal drilling, or health digitizations simply because administrations change.
              </p>
              <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium">
                Core Civic Doctrine: Successive governments must compete on who can build faster, cleaner, more transparently, and with greater cost-effectiveness—not on abandoning essential national assets.
              </div>
            </div>
          </div>

          {/* The 6 Pillars Navigation & Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pillar Selector Sidebar */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                The 6 Cross-Administration Pillars:
              </label>
              {KENYA_2060_PILLARS.map((pillar, idx) => (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full p-4 rounded-lg text-left border transition-all ${
                    activePillarId === pillar.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest font-mono ${
                      activePillarId === pillar.id ? "text-emerald-400" : "text-slate-400"
                    }`}>
                      Pillar 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2">
                    {pillar.pillar}
                  </h4>
                </button>
              ))}
            </div>

            {/* Active Pillar Deep-Dive Detail */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Kenya 2060 Long-term Asset
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {activePillar.pillar}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activePillar.coreVision}
                </p>
              </div>

              {/* Why it must survive governments */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block mb-1">
                  Why This Strategy Must Survive Political Regimes:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {activePillar.whyItMustSurviveGovernments}
                </p>
              </div>

              {/* Critical 2027-2060 Milestones */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Multi-Decadal Delivery Milestones (2027 – 2060):</span>
                </h4>
                <div className="space-y-2">
                  {activePillar.criticalMilestones2027_2060.map((milestone, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk of abandonment & Custodian Institutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-rose-50/60 border border-rose-200">
                  <span className="font-bold text-rose-900 block mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Risk if Politicized or Abandoned:</span>
                  </span>
                  <p className="text-rose-950 leading-relaxed">
                    {activePillar.riskIfAbandoned}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-purple-50/60 border border-purple-200">
                  <span className="font-bold text-purple-900 block mb-1">
                    Institutional Custodians Holding Continuity:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {activePillar.keyInstitutionsHoldingContinuity.map((inst, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-purple-200 font-bold text-[10px] uppercase tracking-wider text-purple-900 font-mono">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
