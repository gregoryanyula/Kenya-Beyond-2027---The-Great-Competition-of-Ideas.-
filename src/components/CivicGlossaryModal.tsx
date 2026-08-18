import React, { useState } from "react";
import { 
  X, 
  BookOpen, 
  Search, 
  Scale, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  HelpCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { CIVIC_GLOSSARY_TERMS } from "../data/civicGlossaryData";
import { CivicGlossaryTerm } from "../types";

interface CivicGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchQuery?: string;
}

export const CivicGlossaryModal: React.FC<CivicGlossaryModalProps> = ({
  isOpen,
  onClose,
  initialSearchQuery = ""
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    "All",
    "Public Finance & Debt",
    "Macroeconomics",
    "Constitution & Law",
    "Devolution & Governance",
    "Trade & Industry"
  ];

  const filteredTerms = CIVIC_GLOSSARY_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullExplainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyItMattersFor2027.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.relatedArticleOrLaw && item.relatedArticleOrLaw.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Civic & Economic Glossary
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Plain-Language Definitions
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Non-partisan explainers for complex fiscal terms, debt indicators, and constitutional clauses in the 2027 election.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search economic terms (e.g. 'Fiscal Deficit', 'Debt Service First Charge', 'Article 201', 'Capitation')..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-100/50">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <h4 className="text-sm font-bold text-slate-700">No terms matched "{searchQuery}"</h4>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for broader terms like "debt", "tax", "fund", or "article".
              </p>
            </div>
          ) : (
            filteredTerms.map((item) => {
              const isExpanded = expandedSlug === item.slug;

              return (
                <div
                  key={item.slug}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                          {item.category}
                        </span>
                        {item.relatedArticleOrLaw && (
                          <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                            ⚖️ {item.relatedArticleOrLaw}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {item.term}
                      </h4>
                    </div>

                    <button
                      onClick={() => setExpandedSlug(isExpanded ? null : item.slug)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors shrink-0"
                    >
                      {isExpanded ? "Show Less" : "Deep Dive"}
                    </button>
                  </div>

                  {/* Short Plain Definition */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.shortDefinition}
                  </p>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
                      
                      {/* Full Explainer */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Detailed Mechanics:
                        </span>
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                          {item.fullExplainer}
                        </p>
                      </div>

                      {/* Why it Matters for 2027 */}
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block font-mono">
                          Why It Matters for the 2027 Election:
                        </span>
                        <p className="text-amber-950 font-medium leading-relaxed">
                          {item.whyItMattersFor2027}
                        </p>
                      </div>

                      {/* Kenyan Example */}
                      <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
                          Real Kenyan Context / Precedent:
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {item.kenyaContextExample}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Public Finance Management & Constitutional Literacy Initiative</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
