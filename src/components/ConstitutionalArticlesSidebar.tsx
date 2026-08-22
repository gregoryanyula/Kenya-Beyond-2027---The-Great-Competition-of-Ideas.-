import React, { useState } from "react";
import { 
  Scale, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Filter,
  Sparkles
} from "lucide-react";
import { CONSTITUTIONAL_ARTICLES_DATA } from "../data/constitutionalArticlesData";
import { ConstitutionalArticle } from "../types";

interface ConstitutionalArticlesSidebarProps {
  selectedDomain?: string;
  onApplyArticleAuditPrompt?: (article: ConstitutionalArticle) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ConstitutionalArticlesSidebar: React.FC<ConstitutionalArticlesSidebarProps> = ({
  selectedDomain = "Economic Growth & Productivity",
  onApplyArticleAuditPrompt,
  isOpen,
  onToggle
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>("art-201");

  const categories = ["All", "Public Finance", "Human Rights & Equity", "Devolution", "Governance & Integrity", "Environment & Land"];

  const safeSearch = (searchQuery || "").toLowerCase();
  const safeSelectedDomain = (selectedDomain || "").toLowerCase();

  const filteredArticles = CONSTITUTIONAL_ARTICLES_DATA.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch = 
      (art.number || "").toLowerCase().includes(safeSearch) ||
      (art.title || "").toLowerCase().includes(safeSearch) ||
      (art.citizenPlainLanguageMeaning || "").toLowerCase().includes(safeSearch) ||
      (art.keyClauses || []).some((c) => (c || "").toLowerCase().includes(safeSearch));
    return matchesCategory && matchesSearch;
  });

  // Sort articles so that those directly associated with selectedDomain appear at the top!
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const aMatchesDomain = (a.associatedDomains || []).some((d) => {
      const dLower = (d || "").toLowerCase();
      return (
        safeSelectedDomain.length > 0 &&
        (dLower.includes(safeSelectedDomain) || safeSelectedDomain.includes(dLower))
      );
    });
    const bMatchesDomain = (b.associatedDomains || []).some((d) => {
      const dLower = (d || "").toLowerCase();
      return (
        safeSelectedDomain.length > 0 &&
        (dLower.includes(safeSelectedDomain) || safeSelectedDomain.includes(dLower))
      );
    });
    if (aMatchesDomain && !bMatchesDomain) return -1;
    if (!aMatchesDomain && bMatchesDomain) return 1;
    return 0;
  });

  return (
    <aside
      className={`transition-all duration-300 ease-in-out border rounded-2xl bg-white flex flex-col shadow-xs ${
        isOpen ? "w-full lg:w-96 p-4 sm:p-5 border-slate-200" : "w-full lg:w-14 p-2.5 border-slate-200 items-center"
      }`}
      id="constitutional-articles-sidebar"
    >
      {/* Sidebar Header & Toggle */}
      <div className={`flex items-center ${isOpen ? "justify-between pb-3 border-b border-slate-100" : "justify-center flex-col space-y-2"} w-full`}>
        {isOpen ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                Katiba 2010 Articles
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-mono">
                  Active Audit
                </span>
              </h3>
              <p className="text-[10px] text-slate-500">
                Constitutional guardrails for policy review
              </p>
            </div>
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2" title="Constitutional Articles Sidebar">
            <Scale className="w-4 h-4" />
          </div>
        )}

        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          title={isOpen ? "Collapse Sidebar" : "Expand Constitutional Articles Sidebar"}
        >
          {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {!isOpen && (
        <div className="hidden lg:flex flex-col items-center space-y-6 pt-4 text-slate-400">
          <div className="rotate-90 text-[10px] font-black uppercase tracking-widest text-slate-600 whitespace-nowrap origin-center translate-y-16">
            Katiba 2010 Benchmarks
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {isOpen && (
        <div className="space-y-4 pt-3 flex-1 flex flex-col overflow-hidden">
          
          {/* Active Domain Context Banner */}
          <div className="p-2.5 rounded-xl bg-slate-900 text-white text-[11px] flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase text-emerald-400 block font-mono">Active Domain Focus:</span>
              <span className="font-bold text-xs truncate max-w-[220px] block text-slate-100">{selectedDomain}</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Auto-Filtered</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Article or Clause..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 pb-1 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scrollable Article Accordion List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[580px]">
            {sortedArticles.map((art) => {
              const isExpanded = expandedArticleId === art.id;
              const isDomainMatch = (art.associatedDomains || []).some((d) => {
                const dLower = (d || "").toLowerCase();
                return safeSelectedDomain.length > 0 && (dLower.includes(safeSelectedDomain) || safeSelectedDomain.includes(dLower));
              });

              return (
                <div
                  key={art.id}
                  className={`rounded-xl border transition-all ${
                    isExpanded 
                      ? "bg-slate-50/80 border-slate-300 shadow-xs" 
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => setExpandedArticleId(isExpanded ? null : art.id)}
                    className="w-full p-3 text-left flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded font-mono ${
                          isDomainMatch 
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300" 
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {art.number}
                        </span>
                        {isDomainMatch && (
                          <span className="text-[8px] font-black uppercase tracking-wider px-1 rounded bg-amber-100 text-amber-900">
                            ★ Direct Anchor
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {art.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {art.chapter}
                      </span>
                    </div>

                    <span className="text-slate-400 text-xs mt-1">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 space-y-2.5 text-xs">
                      
                      {/* Plain Language Meaning */}
                      <div className="p-2 rounded-lg bg-white border border-slate-200">
                        <span className="text-[9px] font-black uppercase text-emerald-800 block mb-0.5 font-mono">
                          Citizen Meaning:
                        </span>
                        <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                          {art.citizenPlainLanguageMeaning}
                        </p>
                      </div>

                      {/* Key Constitutional Clauses */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-slate-500 block font-mono">
                          Constitutional Clauses:
                        </span>
                        <ul className="space-y-1 text-[10px] text-slate-600 bg-slate-100 p-2 rounded-lg list-disc list-inside">
                          {art.keyClauses.map((clause, idx) => (
                            <li key={idx} className="leading-normal">
                              {clause}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mandatory Audit Rule */}
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                        <span className="text-[9px] font-black uppercase block mb-0.5 font-mono">
                          Audit Standard for 2027 Proposals:
                        </span>
                        <p className="text-[10px] leading-relaxed font-semibold">
                          {art.mandatoryAuditRule}
                        </p>
                      </div>

                      {/* Quick Apply Button */}
                      {onApplyArticleAuditPrompt && (
                        <button
                          onClick={() => onApplyArticleAuditPrompt(art)}
                          className="w-full py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>Audit Against {art.number}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Citation */}
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
            <span>National Council for Law Reporting</span>
            <span className="font-mono text-emerald-700 font-bold">Katiba 2010</span>
          </div>

        </div>
      )}
    </aside>
  );
};
