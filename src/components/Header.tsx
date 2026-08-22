import React, { useState, useEffect, useRef } from "react";
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
  Keyboard,
  Moon,
  Sun,
  Gavel,
  Compass,
  Languages,
  ChevronDown,
  Check,
  X
} from "lucide-react";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";
import { useCivicAccessibility } from "../context/CivicAccessibilityContext";
import { useLanguage } from "../context/LanguageContext";
import { CivicGlossaryModal } from "./CivicGlossaryModal";
import { GlobalCivicSearchModal } from "./GlobalCivicSearchModal";
import { CivicNotificationCenter, CivicNotificationItem } from "./CivicNotificationCenter";
import { CivicAccessibilityModal } from "./CivicAccessibilityModal";
import { DailyCivicDigestModal } from "./DailyCivicDigestModal";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";

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
    toggleDarkMode,
    toggleHighContrast,
    toggleScreenReaderFriendly,
    updateSetting,
    isSpeaking, 
    stopSpeaking, 
    speakText 
  } = useCivicAccessibility();

  const { language, setLanguage, toggleLanguage, t, isAutoDetected, browserLanguage } = useLanguage();

  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDailyDigestOpen, setIsDailyDigestOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isA11yMenuOpen, setIsA11yMenuOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [showAutoDetectNotice, setShowAutoDetectNotice] = useState(isAutoDetected);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(3);

  const langDropdownRef = useRef<HTMLDivElement | null>(null);
  const a11yMenuRef = useRef<HTMLDivElement | null>(null);

  // Sync auto-detect notice state
  useEffect(() => {
    if (isAutoDetected) {
      setShowAutoDetectNotice(true);
    }
  }, [isAutoDetected]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (a11yMenuRef.current && !a11yMenuRef.current.contains(event.target as Node)) {
        setIsA11yMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      // Don't trigger letter shortcuts if typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInputFocused = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      const keyLower = (e.key || "").toLowerCase();

      // Esc -> Close active modals
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsGlossaryOpen(false);
        setIsShortcutsModalOpen(false);
        setIsNotificationOpen(false);
        setIsDailyDigestOpen(false);
        setIsA11yMenuOpen(false);
        setIsLangDropdownOpen(false);
        setIsAccessibilityModalOpen(false);
        return;
      }

      // Ctrl+K or Cmd+K or '/' (outside input) -> Open Search
      if ((e.ctrlKey || e.metaKey) && keyLower === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      } else if (e.key === "/" && !isInputFocused) {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      // Ctrl+L or Cmd+L -> Toggle Language
      if ((e.ctrlKey || e.metaKey) && keyLower === "l") {
        e.preventDefault();
        toggleLanguage();
        return;
      }

      // Alt+A or Ctrl+A (outside input) or 'A' (outside input) -> Accessibility
      if ((e.altKey && keyLower === "a") || (!isInputFocused && keyLower === "a" && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault();
        setIsA11yMenuOpen(prev => !prev);
        return;
      }

      // Ctrl+E -> Broadcast ELI5 toggle event
      if ((e.ctrlKey || e.metaKey) && keyLower === "e") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("kenya2027:toggle-eli5"));
        return;
      }

      // If user is typing inside an input field, do not trigger single-key navigation
      if (isInputFocused) return;

      // 'w' or 'W' -> Open Watchlist
      if (keyLower === "w" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsWatchlistOpen(true);
      }

      // '?' or 'h' -> Open Keyboard Shortcuts modal
      if (e.key === "?" || keyLower === "h") {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
      }

      // 'l' or 'L' -> Toggle Language (when not typing in inputs)
      if (keyLower === "l" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleLanguage();
      }

      // Number keys 1-9 for tab navigation
      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key >= "1" && e.key <= "9") {
        const tabMap = [
          "audit-tool",
          "domains",
          "county-map",
          "conflict-checker",
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
  }, [setActiveTab, setIsWatchlistOpen, toggleLanguage, setIsAccessibilityModalOpen]);

  const handleGlobalNavigate = (tabId: string, payload?: any) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "audit-tool", label: t("nav.audit_tool", "Policy Evaluator"), icon: Sparkles, badge: "AI Powered" },
    { id: "domains", label: t("nav.domains", "12 Policy Domains"), icon: Layers },
    { id: "county-map", label: t("nav.devolution_map", "47 Counties Map"), icon: Compass, badge: "Google Maps" },
    { id: "conflict-checker", label: t("nav.conflict_checker", "Policy Conflict Checker"), icon: Gavel, badge: "Statutory" },
    { id: "accountability", label: t("nav.accountability", "Government Delivery"), icon: CheckCircle2 },
    { id: "opposition", label: t("nav.opposition", "Opposition Alternatives"), icon: Scale },
    { id: "youth-literacy", label: t("nav.youth_literacy", "Youth Literacy"), icon: BookOpen, badge: "Gen Z" },
    { id: "kenya-2060", label: t("nav.kenya_2060", "Kenya 2060 Continuity"), icon: Flag },
    { id: "influence-network", label: language === "sw" ? "Mtandao wa Ushawishi" : "Influence Network", icon: Share2, badge: "D3 Graph" },
    { id: "questionnaire", label: t("nav.questionnaire", "Debate & Questions"), icon: FileText },
    { id: "media-standards", label: t("nav.media_standards", "Media Standards"), icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Civic Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-800 text-emerald-400 border border-emerald-600/40">
              {language === "sw" ? "JUKWAA HURU LA KIRAIA" : "NON-PARTISAN INITIATIVE"}
            </span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              {language === "sw" ? "Nchi Moja. Mawazo Mengi. Mustakabali Mmoja: Kenya 🇰🇪" : "One Country. Many Ideas. One Destination: Kenya 🇰🇪"}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-semibold tracking-wide hidden lg:inline">
              “Usitupatie slogan. Tupatie plan.”
            </span>
            <span className="hidden lg:inline text-slate-600">•</span>

            {/* Language Selection Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer shadow-2xs"
                title={language === "en" ? "Badilisha Lugha / Change Language" : "Badilisha Lugha / Switch Language"}
                id="language-dropdown-toggle"
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="true"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-400" />
                <span className="flex items-center gap-1">
                  {language === "sw" ? "🇰🇪 Kiswahili" : "🇬🇧 English"}
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Language Dropdown Menu */}
              {isLangDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{t("lang.select_language", "Chagua Lugha / Language")}</span>
                    <span className="text-emerald-400 font-mono">Katiba Art. 7</span>
                  </div>

                  <button
                    onClick={() => {
                      setLanguage("sw");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                      language === "sw" 
                        ? "bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400" 
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">🇰🇪</span>
                      <div>
                        <div className="font-bold">Kiswahili</div>
                        <div className="text-[10px] text-slate-400 font-normal">Lugha ya Taifa na Rasmi</div>
                      </div>
                    </div>
                    {language === "sw" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>

                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                      language === "en" 
                        ? "bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400" 
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">🇬🇧</span>
                      <div>
                        <div className="font-bold">English</div>
                        <div className="text-[10px] text-slate-400 font-normal">Official Language</div>
                      </div>
                    </div>
                    {language === "en" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                </div>
              )}
            </div>

            <span className="text-slate-600">•</span>
            
            {/* Civic Glossary Button */}
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="text-slate-300 hover:text-emerald-400 flex items-center space-x-1 font-semibold transition-colors cursor-pointer"
              title="Open Civic Glossary (? key)"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === "sw" ? "Faharasa" : "Glossary"}</span>
            </button>

            <span className="text-slate-600">•</span>

            {/* Keyboard Shortcuts Trigger */}
            <button
              onClick={() => setIsShortcutsModalOpen(true)}
              className="text-slate-300 hover:text-emerald-400 flex items-center space-x-1 font-semibold transition-colors cursor-pointer"
              title="View Civic Keyboard Shortcuts (? / H)"
            >
              <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">{language === "sw" ? "Njia za Mkato" : "Shortcuts"}</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-[9px] font-mono text-slate-300">?</kbd>
            </button>

            <span className="text-slate-600">•</span>

            {/* Persistent Accessibility Menu Dropdown */}
            <div className="relative" ref={a11yMenuRef}>
              <button
                onClick={() => setIsA11yMenuOpen(!isA11yMenuOpen)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-white font-bold text-[11px] border transition-all cursor-pointer shadow-2xs ${
                  settings.screenReaderFriendly || settings.highContrast
                    ? "bg-emerald-950 border-emerald-500/60 text-emerald-300"
                    : "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-emerald-500/50"
                }`}
                title="Accessibility & Screen Reader Options (Alt+A)"
                id="accessibility-menu-toggle-btn"
                aria-expanded={isA11yMenuOpen}
                aria-haspopup="true"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{language === "sw" ? "Ufikiaji" : "Accessibility"}</span>
                <span className="sm:hidden">A11y</span>
                {(settings.screenReaderFriendly || settings.highContrast) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isA11yMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Persistent Accessibility Menu Card */}
              {isA11yMenuOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150 text-white"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <div className="flex items-center space-x-1.5">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-xs text-white">
                        {language === "sw" ? "Menyu ya Ufikiaji" : "Civic Accessibility"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold border border-emerald-700/50">
                      WCAG AAA
                    </span>
                  </div>

                  {/* Quick Toggles List */}
                  <div className="space-y-2">
                    {/* Screen Reader Friendly Labels */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                      <div className="pr-2">
                        <div className="font-bold text-white text-[11px] flex items-center gap-1.5">
                          <span>{language === "sw" ? "Maelezo ya Kisomaji Skrini" : "Screen Reader Labels"}</span>
                          {settings.screenReaderFriendly && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">ON</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {language === "sw" ? "Inawezesha lebo wazi za ARIA kwa zana za sera" : "Enables verbose ARIA descriptions on all audit tools"}
                        </div>
                      </div>
                      <button
                        onClick={toggleScreenReaderFriendly}
                        className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                          settings.screenReaderFriendly ? "bg-emerald-600" : "bg-slate-700"
                        }`}
                        aria-label="Toggle Screen Reader Friendly Labels"
                      >
                        <span 
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                            settings.screenReaderFriendly ? "translate-x-4" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* High Contrast Mode */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                      <div className="pr-2">
                        <div className="font-bold text-white text-[11px] flex items-center gap-1.5">
                          <span>{language === "sw" ? "Ulinganuzi wa Juu wa Rangi" : "High Contrast Mode"}</span>
                          {settings.highContrast && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">AAA</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {language === "sw" ? "Inaongeza ukali wa maandishi na mipaka" : "Sharp text boundaries & maximum contrast"}
                        </div>
                      </div>
                      <button
                        onClick={toggleHighContrast}
                        className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                          settings.highContrast ? "bg-amber-500" : "bg-slate-700"
                        }`}
                        aria-label="Toggle High Contrast Mode"
                      >
                        <span 
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                            settings.highContrast ? "translate-x-4" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Text Sizing */}
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <span className="font-bold text-[11px] text-slate-200">
                        {language === "sw" ? "Ukubwa wa Maandishi" : "Text Size"}
                      </span>
                      <div className="flex items-center space-x-1">
                        {(["normal", "large", "xlarge"] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSetting("fontSize", size)}
                            className={`px-2 py-0.5 text-[10px] rounded font-bold transition-colors cursor-pointer ${
                              settings.fontSize === size 
                                ? "bg-emerald-600 text-white" 
                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                          >
                            {size === "normal" ? "100%" : size === "large" ? "110%" : "120%"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Voice & Speech Accent Info */}
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] font-bold text-slate-200">
                          {settings.speechAccent === "en-KE" ? "Kenyan English 🇰🇪" : settings.speechAccent === "sw-KE" ? "Kiswahili Sanifu 🇰🇪" : "Neutral English 🌐"}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {settings.speechRate}x
                      </span>
                    </div>
                  </div>

                  {/* Open Full Accessibility Studio Button */}
                  <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setIsA11yMenuOpen(false);
                        setIsShortcutsModalOpen(true);
                      }}
                      className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <Keyboard className="w-3 h-3 text-emerald-400" />
                      <span>{language === "sw" ? "Njia za Mkato" : "Shortcuts"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsA11yMenuOpen(false);
                        setIsAccessibilityModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{language === "sw" ? "Studio Kamili" : "Full Voice Studio"}</span>
                      <Sliders className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="text-slate-600">•</span>

            {/* Quick Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-slate-300 hover:text-amber-300 flex items-center space-x-1 font-semibold transition-colors cursor-pointer"
              title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {settings.darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{language === "sw" ? "Mwangaza" : "Light"}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">{language === "sw" ? "Giza" : "Dark"}</span>
                </>
              )}
            </button>

            {/* Audio narration stop indicator if speaking */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px] flex items-center gap-1 animate-pulse cursor-pointer"
                title="Stop Audio Narration"
              >
                <VolumeX className="w-3 h-3" />
                <span>Stop TTS</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auto-detected Browser Language Notification Banner */}
      {showAutoDetectNotice && (
        <div className="bg-emerald-950 text-emerald-200 px-4 py-1.5 text-xs border-b border-emerald-800/80 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">🇰🇪</span>
              <span className="font-semibold text-emerald-300">
                {language === "sw" 
                  ? "Lugha ya Kiswahili imetambuliwa kiotomatiki kutoka kwenye kivinjari chako (Ibara ya 7 ya Katiba)." 
                  : "Kiswahili automatically detected from your browser preference (Art. 7)."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLanguage("en");
                  setShowAutoDetectNotice(false);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] cursor-pointer"
              >
                Switch to English
              </button>
              <button
                onClick={() => setShowAutoDetectNotice(false)}
                className="p-1 rounded hover:bg-emerald-900/60 text-emerald-400 hover:text-white cursor-pointer"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

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
                {language === "sw" ? "Mashindano ya Mawazo ya Sera" : "The Great Competition of Ideas"}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-normal line-clamp-1">
              {language === "sw" 
                ? "Kutathmini Uongozi kwa Ushahidi, Gharama Halisi na Matokeo ya Dira ya 2060" 
                : "Evaluating Leadership Through Evidence, Real Costing & Kenya 2060 Outcomes"}
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
                {t("action.search_placeholder", "Search policies, constitution, counties (Ctrl+K)...")}
              </span>
            </div>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400 text-[10px] font-mono font-semibold shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Action Controls: Search Icon (mobile), Notification Bell, Watchlist, Pledge */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Mobile Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="md:hidden px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 transition-all shadow-2xs flex items-center gap-1 font-bold text-xs"
            title="Switch Language (Kiswahili / English)"
            id="mobile-language-btn"
          >
            <span>{language === "sw" ? "🇰🇪 SW" : "🇬🇧 EN"}</span>
          </button>

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
            <span className="hidden sm:inline">{language === "sw" ? "Dondoo za Leo" : "Daily Digest"}</span>
            <span className="sm:hidden">{language === "sw" ? "Dondoo" : "Digest"}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Global Dark Mode / Light Mode Quick Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg border text-xs font-bold active:scale-95 transition-all shadow-2xs flex items-center justify-center ${
              settings.darkMode 
                ? "bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700 hover:text-amber-200" 
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
            id="global-theme-toggle-btn"
            title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode (Eye-Safe Night Reading)"}
            aria-label={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {settings.darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
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
            <span className="hidden sm:inline">{language === "sw" ? "Orodha" : "Watchlist"}</span>
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
            <span className="hidden sm:inline">{language === "sw" ? "Kiapo cha 2027" : "Take 2027 Pledge"}</span>
            <span className="sm:hidden">{language === "sw" ? "Kiapo" : "Pledge"}</span>
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
              {language === "sw" 
                ? "“Kenya haiwezi kujenga mwaka wa 2060 kwa utamaduni wa kisiasa wa jana.”" 
                : "“Kenya cannot build 2060 with the political culture of yesterday.”"}
            </h2>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs shrink-0">
            <div className="flex flex-col">
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                {language === "sw" ? "Dira Kuu" : "Core Vision"}
              </span>
              <span className="text-xs font-medium text-slate-200">
                {language === "sw" ? "Nchi Moja. Mawazo Mengi. Lengo Moja." : "One Country. Many Ideas. One Destination."}
              </span>
            </div>
            <div className="h-7 w-px bg-slate-700 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">
                {language === "sw" ? "Mabadiliko" : "The Shift"}
              </span>
              <span className="text-xs font-medium text-slate-200">
                {language === "sw" ? "Kutoka “Mgombea ni nani?” hadi “Mpango ni gani?”" : "From “Who is the candidate?” to “What is the plan?”"}
              </span>
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

      {/* Civic Keyboard Shortcuts Modal Overlay */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </header>
  );
};



