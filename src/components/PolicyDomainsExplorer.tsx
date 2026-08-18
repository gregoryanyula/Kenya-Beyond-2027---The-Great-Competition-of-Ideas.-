import React, { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Landmark, 
  Receipt, 
  Wheat, 
  Factory, 
  HeartPulse, 
  GraduationCap, 
  Building2, 
  Construction, 
  Zap, 
  Bus, 
  Cpu, 
  Globe2, 
  MapPin, 
  SunDim, 
  ShieldAlert, 
  FileCheck2, 
  Shield, 
  Compass, 
  HandHeart,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  X
} from "lucide-react";
import { POLICY_DOMAINS } from "../data/policyDomains";
import { PolicyDomain } from "../types";

interface PolicyDomainsExplorerProps {
  onSelectDomainForAudit?: (domainName: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Users,
  ShoppingBag,
  Landmark,
  Receipt,
  Wheat,
  Factory,
  HeartPulse,
  GraduationCap,
  Building2,
  Construction,
  Zap,
  Bus,
  Cpu,
  Globe2,
  MapPin,
  SunDim,
  ShieldAlert,
  FileCheck2,
  Shield,
  Compass,
  HandHeart,
};

export const PolicyDomainsExplorer: React.FC<PolicyDomainsExplorerProps> = ({ onSelectDomainForAudit }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalDomain, setActiveModalDomain] = useState<PolicyDomain | null>(null);

  const categories = ["All", "Economy & Jobs", "Social & Human Capital", "Infrastructure & Tech", "Governance & Sovereignty"];

  const filteredDomains = POLICY_DOMAINS.filter((domain) => {
    const matchesCategory = selectedCategory === "All" || domain.category === selectedCategory;
    const matchesSearch = 
      domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.constitutionalAnchor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8" id="policy-domains-section">
      {/* Header Explainer */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
            <span>22 National Policy Domains</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            The 2027 Comprehensive Policy Architecture
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every candidate and political coalition must present clear, costed, constitutionally grounded plans across these 22 national areas. Move beyond personalities to scrutinize concrete frameworks.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domains or keywords..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Grid of 22 Policy Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDomains.map((domain, index) => {
          const Icon = ICON_MAP[domain.iconName] || TrendingUp;
          return (
            <div
              key={domain.id}
              onClick={() => setActiveModalDomain(domain)}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-600 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {domain.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1.5">
                  {domain.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {domain.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 group-hover:underline">
                  <span>View 13-Point Checklist</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {index + 1} / 22
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Domain Modal */}
      {activeModalDomain && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  {React.createElement(ICON_MAP[activeModalDomain.iconName] || TrendingUp, { className: "w-6 h-6" })}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                    {activeModalDomain.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeModalDomain.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalDomain(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeModalDomain.description}
            </p>

            {/* Mandatory Scrutiny Questions */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Mandatory Citizen Questions for Candidates:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeModalDomain.keyQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-700 font-bold font-mono">Q{idx + 1}:</span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benchmark KPIs & Costing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Benchmark KPIs</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalDomain.benchmarkKPIs.map((kpi, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-700 font-medium font-mono">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Constitutional Anchor</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {activeModalDomain.constitutionalAnchor}
                </p>
              </div>
            </div>

            {/* Costing & Kenya 2060 Goal */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">Fiscal Costing Realism:</span>
                <span className="text-amber-950 leading-relaxed">{activeModalDomain.costingConsiderations}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-purple-50/70 border border-purple-200">
                <span className="font-bold text-purple-900 block mb-1">Kenya 2060 Long-term Destination:</span>
                <span className="text-purple-950 leading-relaxed">{activeModalDomain.kenya2060Goal}</span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Non-Partisan Civic Evaluation Framework
              </span>
              <button
                onClick={() => {
                  if (onSelectDomainForAudit) {
                    onSelectDomainForAudit(activeModalDomain.name);
                  }
                  setActiveModalDomain(null);
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-emerald-600 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audit a Proposal in this Domain</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
