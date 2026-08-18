import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Search, 
  X, 
  Sparkles, 
  FileText, 
  Scale, 
  Layers, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  User, 
  Compass, 
  Flag,
  Flame
} from "lucide-react";
import { POLICY_DOMAINS } from "../data/policyDomains";
import { POLITICAL_DEBATES_DATA } from "../data/politicalDebateData";
import { CONSTITUTIONAL_ARTICLES_DATA } from "../data/constitutionalArticlesData";
import { CIVIC_GLOSSARY_TERMS } from "../data/civicGlossaryData";

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Policy Domain" | "Candidate & Stance" | "Debate & Event" | "Constitutional Article" | "Civic Term" | "Analysis Tool";
  targetTab: string;
  actionPayload?: any;
  tags: string[];
}

interface GlobalCivicSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string, payload?: any) => void;
}

export const GlobalCivicSearchModal: React.FC<GlobalCivicSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build searchable index once
  const searchIndex: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Policy Domains
    POLICY_DOMAINS.forEach((domain) => {
      items.push({
        id: `domain-${domain.id}`,
        title: domain.name,
        subtitle: domain.description || "Policy domain evaluation & Kenya 2060 goals",
        category: "Policy Domain",
        targetTab: "domains",
        actionPayload: { domainId: domain.id, domainName: domain.name },
        tags: [domain.name, domain.category, "policy", "domain", "evaluation", ...(domain.keyQuestions || [])]
      });
    });

    // 2. Sample Audits & Policies
    items.push(
      {
        id: "tool-13-point",
        title: "13-Point Constitutional Policy Audit Tool",
        subtitle: "Scrutinize any government or opposition manifesto under Article 201 criteria",
        category: "Analysis Tool",
        targetTab: "audit-tool",
        tags: ["audit", "evaluator", "article 201", "13-point", "manifesto", "scoring"]
      },
      {
        id: "tool-what-if",
        title: "Kenya 2060 'What-If' Macroeconomic Simulator",
        subtitle: "Adjust GDP growth, debt servicing, and KRA tax compliance to model 33-year outcomes",
        category: "Analysis Tool",
        targetTab: "audit-tool",
        actionPayload: { openWhatIf: true },
        tags: ["what-if", "simulator", "macroeconomic", "gdp", "debt", "tax", "2060"]
      },
      {
        id: "tool-fact-check",
        title: "Verified Fact-Check Hub & Article 201 Claims",
        subtitle: "Audited candidate quotes and empirical data from KNBS, CBK, and Controller of Budget",
        category: "Analysis Tool",
        targetTab: "audit-tool",
        actionPayload: { openFactCheck: true },
        tags: ["fact check", "claims", "verification", "knbs", "cbk", "auditor general"]
      },
      {
        id: "tool-youth-hub",
        title: "Youth Civic Literacy Hub ('Tupatie Plan')",
        subtitle: "Gen Z interactive quizzes, county leaderboard, audio reflection hub, and street game",
        category: "Analysis Tool",
        targetTab: "youth-literacy",
        tags: ["youth", "gen z", "tupatie plan", "quiz", "leaderboard", "game", "audio"]
      },
      {
        id: "tool-kenya-2060",
        title: "Kenya 2060 Continuity Charter & 4 Pillars",
        subtitle: "Multi-decade national roadmap transcending 5-year electoral cycles",
        category: "Analysis Tool",
        targetTab: "kenya-2060",
        tags: ["kenya 2060", "continuity", "charter", "roadmap", "long-term", "infrastructure"]
      },
      {
        id: "tool-debates",
        title: "2027 Political Debate Scrutiny Calendar",
        subtitle: "Upcoming presidential and gubernatorial debate schedules, venues, and live reactions",
        category: "Analysis Tool",
        targetTab: "questionnaire",
        tags: ["debate", "calendar", "presidential", "gubernatorial", "dates", "schedule"]
      }
    );

    // 3. Debates & Events
    POLITICAL_DEBATES_DATA.forEach((debate) => {
      items.push({
        id: `debate-${debate.id}`,
        title: `🎙️ ${debate.title}`,
        subtitle: `${debate.date} at ${debate.venue}, ${debate.city} • Tier: ${debate.tier}`,
        category: "Debate & Event",
        targetTab: "questionnaire",
        actionPayload: { debateId: debate.id },
        tags: [debate.title, debate.city, debate.venue, debate.tier, ...debate.keyThemes]
      });

      // Also add candidate stances
      debate.candidateLineup.forEach((cand) => {
        items.push({
          id: `cand-${debate.id}-${cand.name.replace(/\s+/g, "_")}`,
          title: `👤 ${cand.name} (${cand.partyOrCoalition})`,
          subtitle: `Stance: ${cand.stanceFocus} • Debate: ${debate.title}`,
          category: "Candidate & Stance",
          targetTab: "questionnaire",
          actionPayload: { debateId: debate.id, candidateName: cand.name },
          tags: [cand.name, cand.partyOrCoalition, cand.stanceFocus, "candidate", "stance", "pledge"]
        });
      });
    });

    // 4. Constitutional Articles
    CONSTITUTIONAL_ARTICLES_DATA.forEach((article) => {
      items.push({
        id: `art-${article.id}`,
        title: `⚖️ ${article.number}: ${article.title}`,
        subtitle: `${article.category} • ${article.citizenPlainLanguageMeaning.slice(0, 100)}...`,
        category: "Constitutional Article",
        targetTab: "youth-literacy",
        tags: [article.title, article.number, article.category, article.citizenPlainLanguageMeaning, "katiba", "constitution"]
      });
    });

    // 5. Civic Terms
    CIVIC_GLOSSARY_TERMS.forEach((term) => {
      items.push({
        id: `term-${term.slug}`,
        title: `📖 ${term.term}`,
        subtitle: term.shortDefinition,
        category: "Civic Term",
        targetTab: "youth-literacy",
        tags: [term.term, term.category, term.shortDefinition, "glossary", "term"]
      });
    });

    return items;
  }, []);

  // Fuzzy Search Algorithm
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      // Return top curated suggestions
      const defaultList = searchIndex.filter(i => 
        selectedCategory === "All" || i.category === selectedCategory
      ).slice(0, 10);
      return defaultList;
    }

    const tokens = cleanQuery.split(/\s+/).filter(Boolean);

    const scored = searchIndex
      .filter((item) => {
        if (selectedCategory !== "All" && item.category !== selectedCategory) {
          return false;
        }
        return true;
      })
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const subLower = item.subtitle.toLowerCase();
        const tagsString = item.tags.join(" ").toLowerCase();

        // Exact match boost
        if (titleLower === cleanQuery) score += 100;
        if (titleLower.startsWith(cleanQuery)) score += 50;
        if (titleLower.includes(cleanQuery)) score += 30;
        if (subLower.includes(cleanQuery)) score += 15;

        // Token match scoring
        tokens.forEach((token) => {
          if (titleLower.includes(token)) score += 15;
          if (subLower.includes(token)) score += 8;
          if (tagsString.includes(token)) score += 10;
        });

        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);

    return scored.slice(0, 15);
  }, [query, selectedCategory, searchIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation within modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    onNavigate(item.targetTab, item.actionPayload);
    onClose();
  };

  if (!isOpen) return null;

  const categories = ["All", "Analysis Tool", "Policy Domain", "Candidate & Stance", "Debate & Event", "Constitutional Article", "Civic Term"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-900 text-white">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search policies, candidates, debates, Article 201, or civic terms..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none font-medium"
            id="global-search-input"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono text-xs">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center space-x-1 overflow-x-auto no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 flex-1 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Compass className="w-8 h-8 text-slate-400 mx-auto animate-pulse" />
              <p className="font-semibold text-sm text-slate-700">No matching civic records found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for keywords like "SHIF", "Article 201", "Debate", "KRA", "Agriculture", or "Debt".
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected ? "bg-emerald-50 border border-emerald-300 text-slate-900 shadow-2xs" : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold shrink-0 self-center">
                    <span className="hidden sm:inline">Jump</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-3">
            <span>Use <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Enter</kbd> to select</span>
          </div>
          <span className="text-emerald-700 font-semibold font-mono text-[11px]">
            {filteredResults.length} Results
          </span>
        </div>

      </div>
    </div>
  );
};
