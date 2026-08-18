import React, { useState, useEffect } from "react";
import { 
  Scale, 
  BookOpen, 
  BarChart3, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Layers, 
  Flag,
  Share2,
  Bookmark,
  HelpCircle,
  Search,
  Bell,
  Eye,
  Sliders,
  Volume2,
  VolumeX,
  Keyboard
} from "lucide-react";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";
import { useCivicAccessibility } from "../context/CivicAccessibilityContext";
import { CivicGlossaryModal } from "./CivicGlossaryModal";
import { GlobalCivicSearchModal } from "./GlobalCivicSearchModal";
import { CivicNotificationCenter, CivicNotificationItem } from "./CivicNotificationCenter";
import { CivicAccessibilityModal } from "./CivicAccessibilityModal";
import { DailyCivicDigestModal } from "./DailyCivicDigestModal";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPledge: () => void;
  onAuditPolicyClaim?: (claimText: string, domain?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenPledge, onAuditPolicyClaim }) => {
  const { watchlist, setIsWatchlistOpen } = useCivicWatchlist();
  const { 
    settings, 
    setIsAccessibilityModalOpen, 
    isSpeaking, 
    stopSpeaking, 
    speakText 
  } = useCivicAccessibility();

  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDailyDigestOpen, setIsDailyDigestOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(3);

  // Check unread notifications in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kenya2027_civic_notifications");
      if (saved) {
        const parsed: CivicNotificationItem[] = JSON.parse(saved);
        setUnreadNotificationsCount(parsed.filter(n => !n.isRead).length);
      }
    } catch (e) {
      console.warn("Error reading notifications count:", e);
    }
  }, [isNotificationOpen]);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      // Ctrl+K or Cmd+K or '/' -> Open Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === "/" && !e.shiftKey) {
        e.preventDefault();
        setIsSearchOpen(true);
      }

      // 'w' or 'W' -> Open Watchlist
      if (e.key.toLowerCase() === "w" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsWatchlistOpen(true);
      }

      // '?' -> Open Glossary
      if (e.key === "?") {
        e.preventDefault();
        setIsGlossaryOpen(true);
      }

      // 'a' or 'A' -> Open Accessibility
      if (e.key.toLowerCase() === "a" && !e.ctrlKey && !e.metaKey) {
        // Only if not in combinations
        // toggle accessibility modal
      }

      // Number keys 1-8 for tab navigation
      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key >= "1" && e.key <= "8") {
        const tabMap = [
          "audit-tool",
          "domains",
          "accountability",
          "opposition",
          "youth-literacy",
          "kenya-2060",
          "questionnaire",
          "media-standards"
        ];
        const index = parseInt(e.key) - 1;
        if (tabMap[index]) {
          setActiveTab(tabMap[index]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setActiveTab, setIsWatchlistOpen]);

  const handleGlobalNavigate = (tabId: string, payload?: any) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "audit-tool", label: "Policy Evaluator (13-Point Test)", icon: Sparkles, badge: "AI Powered" },
    { id: "domains", label: "22 Policy Domains", icon: Layers },
    { id: "accountability", label: "Government Delivery", icon: CheckCircle2 },
    { id: "opposition", label: "Opposition Alternatives", icon: Scale },
    { id: "youth-literacy", label: "Youth Literacy ('Tupatie Plan')", icon: BookOpen, badge: "Gen Z" },
    { id: "kenya-2060", label: "Kenya 2060 Continuity", icon: Flag },
    { id: "questionnaire", label: "Debate & Questions", icon: FileText },
    { id: "media-standards", label: "Media Standards", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Civic Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-800 text-emerald-400 border border-emerald-600/40">
              NON-PARTISAN INITIATIVE
            </span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              One Country. Many Ideas. One Destination: Kenya 🇰🇪
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold tracking-wide hidden lg:inline">
              “Usitupatie slogan. Tupatie plan.”
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>
            
            {/* Civic Glossary Button */}
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="text-slate-300 hover:text-emerald-400 flex items-center space-x-1 font-semibold transition-colors"
              title="Open Civic Glossary (? key)"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Civic Glossary</span>
            </button>

            <span className="text-slate-600">•</span>

            {/* Accessibility Settings Quick Trigger */}
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="text-slate-300 hover:text-emerald-400 flex items-center space-x-1 font-semibold transition-colors"
              title="Open Civic Accessibility Settings (Contrast, Voice & Key Rings)"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Accessibility</span>
              <span className="sm:hidden">A11y</span>
            </button>

            {/* Audio narration stop indicator if speaking */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] flex items-center gap-1 animate-pulse"
                title="Stop Audio Narration"
              >
                <VolumeX className="w-3 h-3" />
                <span>Stop TTS</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand & Action Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab("audit-tool")}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 flex flex-col items-center justify-center rounded-lg shadow-xs group-hover:bg-slate-800 transition-colors shrink-0">
            <div className="w-4 sm:w-5 h-1 bg-red-600 mb-1 rounded-xs"></div>
            <div className="w-4 sm:w-5 h-1 bg-emerald-600 rounded-xs"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tighter text-slate-900">
                KENYA 2027
              </h1>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline-block">
                The Great Competition of Ideas
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-normal line-clamp-1">
              Evaluating Leadership Through Evidence, Real Costing & Kenya 2060 Outcomes
            </p>
          </div>
        </div>

        {/* Global Search Bar (Center / Right) */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/90 text-slate-500 text-xs transition-all shadow-2xs hover:border-slate-300 group"
            id="global-search-header-trigger"
          >
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              <span className="font-medium text-slate-500 group-hover:text-slate-800">
                Search policies, candidates, debates, Article 201...
              </span>
            </div>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400 text-[10px] font-mono font-semibold shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Action Controls: Search Icon (mobile), Notification Bell, Watchlist, Pledge */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all shadow-2xs"
            title="Search App"
            id="mobile-search-btn"
          >
            <Search className="w-4 h-4 text-slate-600" />
          </button>

          {/* Daily Civic Digest AI Button */}
          <button
            onClick={() => setIsDailyDigestOpen(true)}
            className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 text-xs font-bold rounded-lg border border-emerald-300 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-900 active:scale-95 transition-all shadow-2xs group relative"
            id="daily-civic-digest-btn"
            title="Open Daily Civic Digest (Tailored via Gemini AI)"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Daily Digest</span>
            <span className="sm:hidden">Digest</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Persistent Notification Bell */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="p-2 sm:px-2.5 sm:py-2 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all shadow-2xs relative flex items-center gap-1.5"
            id="notification-bell-btn"
            title="Debate & Policy Scrutiny Alerts"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white font-mono text-[9px] font-black flex items-center justify-center border-2 border-white shadow-2xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={() => setIsWatchlistOpen(true)}
            className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all shadow-2xs relative"
            id="open-watchlist-header-btn"
            title="Open My Civic Watchlist (W key)"
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlist.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-black font-mono rounded-full bg-emerald-600 text-white">
                {watchlist.length}
              </span>
            )}
          </button>

          {/* Civic Pledge CTA */}
          <button
            onClick={onOpenPledge}
            className="inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-xs shrink-0"
            id="sign-pledge-btn"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Take 2027 Pledge</span>
            <span className="sm:hidden">Pledge</span>
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-x-auto no-scrollbar">
        <nav className="flex space-x-1 py-1.5 min-w-max">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                id={`nav-${item.id}`}
                title={`Shortcut: Press ${idx + 1}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                    isActive ? "bg-emerald-500/30 text-emerald-300" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Professional Polish Manifesto Banner */}
      <div className="bg-slate-900 text-white py-3.5 px-4 sm:px-6 lg:px-8 border-b-4 border-emerald-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold italic tracking-tight text-white">
              “Kenya cannot build 2060 with the political culture of yesterday.”
            </h2>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs shrink-0">
            <div className="flex flex-col">
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Core Vision</span>
              <span className="text-xs font-medium text-slate-200">One Country. Many Ideas. One Destination.</span>
            </div>
            <div className="h-7 w-px bg-slate-700 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">The Shift</span>
              <span className="text-xs font-medium text-slate-200">From “Who is the candidate?” to “What is the plan?”</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Civic Search Modal Overlay */}
      <GlobalCivicSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleGlobalNavigate}
      />

      {/* Persistent Notification Center Dropdown */}
      <CivicNotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigate={handleGlobalNavigate}
      />

      {/* Civic Accessibility Settings Modal */}
      <CivicAccessibilityModal />

      {/* Daily Civic Digest Modal */}
      <DailyCivicDigestModal
        isOpen={isDailyDigestOpen}
        onClose={() => setIsDailyDigestOpen(false)}
        onSelectPolicyForAudit={(claimText, domain) => {
          if (onAuditPolicyClaim) {
            onAuditPolicyClaim(claimText, domain);
          } else {
            setActiveTab("audit-tool");
          }
        }}
      />

      {/* Civic Glossary Modal Overlay */}
      <CivicGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </header>
  );
};


