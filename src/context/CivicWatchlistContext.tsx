import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { CivicWatchlistItem, UserInterestSuggestion } from "../types";

export interface ViewHistoryItem {
  id: string;
  domain: string;
  title: string;
  timestamp: number;
}

interface CivicWatchlistContextType {
  watchlist: CivicWatchlistItem[];
  addToWatchlist: (item: Omit<CivicWatchlistItem, "savedAt">) => void;
  removeFromWatchlist: (id: string) => void;
  isItemInWatchlist: (id: string) => boolean;
  toggleWatchlist: (item: Omit<CivicWatchlistItem, "savedAt">) => void;
  clearWatchlist: () => void;
  isWatchlistOpen: boolean;
  setIsWatchlistOpen: (isOpen: boolean) => void;
  // Side-by-side comparison state
  comparisonItemIds: [string | null, string | null];
  setComparisonItemIds: (ids: [string | null, string | null]) => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (isOpen: boolean) => void;
  startSideBySideComparison: (item1Id?: string, item2Id?: string) => void;
  // User Interest Tracking & Dynamic Policy Domain Suggestions
  viewHistory: ViewHistoryItem[];
  recordDomainView: (domain: string, title?: string) => void;
  suggestedDomains: UserInterestSuggestion[];
  activeInterestFilter: string | null;
  setActiveInterestFilter: (domain: string | null) => void;
  clearViewHistory: () => void;
}

const STORAGE_KEY = "kenya2027_civic_watchlist_v1";
const HISTORY_STORAGE_KEY = "kenya2027_civic_view_history_v1";

const INITIAL_WATCHLIST_SEEDS: CivicWatchlistItem[] = [
  {
    id: "sample-tech-hubs",
    type: "policy",
    title: "Youth Tech Innovation Hubs (290 Constituencies)",
    subtitle: "5% Universal Service Fund reallocation, KES 8B over 3 years",
    domain: "Technology & Youth Opportunities",
    tag: "Constituency AI & Remote Work",
    source: "2027 Youth Blueprint",
    rigorScore: 8.5,
    article201Status: "Compliant",
    keyMetrics: [
      { label: "Target Jobs", value: "80,000 Verified Remote" },
      { label: "Cost", value: "KES 8 Billion" },
      { label: "Timeline", value: "3 Years (2027-2030)" }
    ],
    summaryNote: "High clarity on ring-fenced financing via existing Universal Service Fund without new debt.",
    savedAt: Date.now() - 3600000 * 24
  },
  {
    id: "scorecard-health-sha",
    type: "scorecard_item",
    title: "Social Health Authority (SHA) 100% Digital Transition",
    subtitle: "Replace NHIF with 2.75% gross income deduction",
    domain: "Healthcare & Social Protection",
    tag: "UHC Reform",
    source: "Incumbent Delivery Tracker",
    rigorScore: 6.8,
    article201Status: "Borderline",
    keyMetrics: [
      { label: "Levy Rate", value: "2.75% Gross" },
      { label: "Primary Care", value: "Free Level 2/3" },
      { label: "Public Scrutiny", value: "High Hospital Claims Delay" }
    ],
    summaryNote: "Article 43 constitutional compliance active, but facing execution bottlenecks on hospital claims reimbursements.",
    savedAt: Date.now() - 3600000 * 12
  }
];

const INITIAL_HISTORY_SEEDS: ViewHistoryItem[] = [
  { id: "h1", domain: "Healthcare & Social Protection", title: "Social Health Insurance & Level 4/5 Hospitals", timestamp: Date.now() - 3600000 * 5 },
  { id: "h2", domain: "Technology & Youth Opportunities", title: "National Digital Superhighway & BPO Hubs", timestamp: Date.now() - 3600000 * 8 },
  { id: "h3", domain: "Agriculture & Food Sovereignty", title: "Fertilizer Subsidies & Post-Harvest Storage", timestamp: Date.now() - 3600000 * 20 }
];

const CivicWatchlistContext = createContext<CivicWatchlistContextType | undefined>(undefined);

export const CivicWatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<CivicWatchlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load watchlist from localStorage:", e);
    }
    return INITIAL_WATCHLIST_SEEDS;
  });

  const [viewHistory, setViewHistory] = useState<ViewHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load view history from localStorage:", e);
    }
    return INITIAL_HISTORY_SEEDS;
  });

  const [activeInterestFilter, setActiveInterestFilter] = useState<string | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [comparisonItemIds, setComparisonItemIds] = useState<[string | null, string | null]>([null, null]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.warn("Failed to save watchlist to localStorage:", e);
    }
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(viewHistory));
    } catch (e) {
      console.warn("Failed to save view history to localStorage:", e);
    }
  }, [viewHistory]);

  const addToWatchlist = (item: Omit<CivicWatchlistItem, "savedAt">) => {
    setWatchlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [{ ...item, savedAt: Date.now() }, ...prev];
    });
    // Also record view
    recordDomainView(item.domain, item.title);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
    setComparisonItemIds(([first, second]) => [
      first === id ? null : first,
      second === id ? null : second
    ]);
  };

  const isItemInWatchlist = (id: string) => {
    return watchlist.some((item) => item.id === id);
  };

  const toggleWatchlist = (item: Omit<CivicWatchlistItem, "savedAt">) => {
    if (isItemInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    setComparisonItemIds([null, null]);
  };

  const startSideBySideComparison = (item1Id?: string, item2Id?: string) => {
    const first = item1Id || watchlist[0]?.id || null;
    const second = item2Id || watchlist[1]?.id || null;
    setComparisonItemIds([first, second]);
    setIsComparisonModalOpen(true);
  };

  const recordDomainView = (domain: string, title?: string) => {
    if (!domain) return;
    const newItem: ViewHistoryItem = {
      id: `vh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      domain,
      title: title || domain,
      timestamp: Date.now()
    };
    setViewHistory((prev) => [newItem, ...prev.slice(0, 49)]); // Keep last 50
  };

  const clearViewHistory = () => {
    setViewHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  // Compute dynamic user interest suggestions based on viewHistory & watchlist frequencies
  const suggestedDomains = useMemo<UserInterestSuggestion[]>(() => {
    const domainCounts: Record<string, { count: number; lastViewed: number; titles: Set<string> }> = {};

    // Process view history
    viewHistory.forEach((v) => {
      if (!domainCounts[v.domain]) {
        domainCounts[v.domain] = { count: 0, lastViewed: v.timestamp, titles: new Set() };
      }
      domainCounts[v.domain].count += 1;
      domainCounts[v.domain].titles.add(v.title);
      if (v.timestamp > domainCounts[v.domain].lastViewed) {
        domainCounts[v.domain].lastViewed = v.timestamp;
      }
    });

    // Process watchlist (double weight for saved items)
    watchlist.forEach((w) => {
      if (!domainCounts[w.domain]) {
        domainCounts[w.domain] = { count: 0, lastViewed: w.savedAt, titles: new Set() };
      }
      domainCounts[w.domain].count += 2;
      domainCounts[w.domain].titles.add(w.title);
    });

    const entries = Object.entries(domainCounts);
    if (entries.length === 0) {
      return [
        {
          domain: "Healthcare & Social Protection",
          reason: "Key constitutional priority under Article 43 & Universal Health Coverage",
          score: 85,
          relevantCount: 2
        },
        {
          domain: "Technology & Youth Opportunities",
          reason: "Top voter concern on digital jobs, TVET, and startup financing",
          score: 80,
          relevantCount: 2
        },
        {
          domain: "Agriculture & Food Sovereignty",
          reason: "Critical cost-of-living driver and food security priority",
          score: 75,
          relevantCount: 1
        }
      ];
    }

    // Sort by weighted count and recency
    const sorted = entries
      .map(([domain, data]) => {
        const hoursAgo = Math.max(1, (Date.now() - data.lastViewed) / 3600000);
        const recencyDecay = Math.max(0.5, 1 - hoursAgo / 168); // Decay over 1 week
        const score = Math.min(99, Math.round(data.count * 18 * recencyDecay + 25));

        const sampleTitle = Array.from(data.titles)[0] || domain;
        const reason = `Based on your recent scrutiny of "${sampleTitle}" and ${data.count} saved/viewed interactions`;

        return {
          domain,
          reason,
          score,
          relevantCount: data.count
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return sorted;
  }, [viewHistory, watchlist]);

  return (
    <CivicWatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isItemInWatchlist,
        toggleWatchlist,
        clearWatchlist,
        isWatchlistOpen,
        setIsWatchlistOpen,
        comparisonItemIds,
        setComparisonItemIds,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        startSideBySideComparison,
        viewHistory,
        recordDomainView,
        suggestedDomains,
        activeInterestFilter,
        setActiveInterestFilter,
        clearViewHistory
      }}
    >
      {children}
    </CivicWatchlistContext.Provider>
  );
};

export const useCivicWatchlist = (): CivicWatchlistContextType => {
  const context = useContext(CivicWatchlistContext);
  if (!context) {
    throw new Error("useCivicWatchlist must be used within a CivicWatchlistProvider");
  }
  return context;
};
