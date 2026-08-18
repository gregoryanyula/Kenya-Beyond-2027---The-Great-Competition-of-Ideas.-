import React, { useState, useEffect } from "react";
import { 
  Bell, 
  BellRing, 
  X, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert, 
  Bookmark, 
  Sparkles, 
  ExternalLink, 
  Trash2, 
  CheckCheck,
  Scale
} from "lucide-react";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";

export interface CivicNotificationItem {
  id: string;
  title: string;
  message: string;
  type: "debate" | "factcheck" | "watchlist" | "charter";
  timestamp: string;
  isRead: boolean;
  targetTab: string;
  actionPayload?: any;
}

const INITIAL_NOTIFICATIONS: CivicNotificationItem[] = [
  {
    id: "notif-1",
    title: "🎙️ Presidential Debate #1 (Nairobi) in 14 Days",
    message: "Live scrutiny on Public Debt Servicing, Article 201 Compliance, and Job Creation at CUEA Auditorium.",
    type: "debate",
    timestamp: "2 hours ago",
    isRead: false,
    targetTab: "questionnaire",
    actionPayload: { debateId: "presidential-1" }
  },
  {
    id: "notif-2",
    title: "🔍 New Fact-Check: KRA 95% Digitization Revenue Claim",
    message: "KNBS & Parliamentary Budget Office report: Net revenue uplift projected at KES 220B, not KES 600B.",
    type: "factcheck",
    timestamp: "5 hours ago",
    isRead: false,
    targetTab: "audit-tool",
    actionPayload: { openFactCheck: true }
  },
  {
    id: "notif-3",
    title: "📌 Watchlist Alert: Health Transition (SHIF) Scrutiny",
    message: "Updated actuarial risk assessment added to your tracked health policy item under Article 43.",
    type: "watchlist",
    timestamp: "1 day ago",
    isRead: false,
    targetTab: "audit-tool",
    actionPayload: { domainId: "health" }
  },
  {
    id: "notif-4",
    title: "🇰🇪 Kenya 2060 Charter: 4th Pillar Continuity Adopted",
    message: "Inter-generational infrastructure compact binding 2027 candidates to complete ongoing mega-projects.",
    type: "charter",
    timestamp: "2 days ago",
    isRead: true,
    targetTab: "kenya-2060"
  },
  {
    id: "notif-5",
    title: "🎙️ Devolution & County Revenue Debate (Kisumu)",
    message: "Gubernatorial candidate lineups confirmed for the Western Kenya economic cluster debate.",
    type: "debate",
    timestamp: "3 days ago",
    isRead: true,
    targetTab: "questionnaire",
    actionPayload: { debateId: "gubernatorial-western" }
  }
];

interface CivicNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string, payload?: any) => void;
}

export const CivicNotificationCenter: React.FC<CivicNotificationCenterProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { watchlist } = useCivicWatchlist();
  const [notifications, setNotifications] = useState<CivicNotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_civic_notifications");
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [activeFilter, setActiveFilter] = useState<"all" | "debate" | "factcheck" | "watchlist">("all");

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kenya2027_civic_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.warn("Could not save notifications to storage:", e);
    }
  }, [notifications]);

  // Dynamically add a watchlist alert if watchlist has items
  useEffect(() => {
    if (watchlist.length > 0) {
      setNotifications(prev => {
        const hasRecentWatchlistNotif = prev.some(n => n.id === `watchlist-live-${watchlist.length}`);
        if (hasRecentWatchlistNotif) return prev;
        const newNotif: CivicNotificationItem = {
          id: `watchlist-live-${watchlist.length}`,
          title: `📌 ${watchlist.length} Policies Tracked in Your Watchlist`,
          message: `Active monitoring enabled for your ${watchlist.length} selected policy proposals against Article 201 benchmarks.`,
          type: "watchlist",
          timestamp: "Just now",
          isRead: false,
          targetTab: "audit-tool"
        };
        return [newNotif, ...prev.filter(n => !n.id.startsWith("watchlist-live-"))];
      });
    }
  }, [watchlist.length]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markSingleAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (item: CivicNotificationItem) => {
    markSingleAsRead(item.id);
    onNavigate(item.targetTab, item.actionPayload);
    onClose();
  };

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end sm:p-4 pt-16 pr-4 sm:pr-8 bg-slate-950/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Civic Scrutiny Alerts
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-black">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-400">
                Debates, fact-checks, and tracked policy updates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills & Actions */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                activeFilter === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveFilter("debate")}
              className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                activeFilter === "debate" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Debates
            </button>
            <button
              onClick={() => setActiveFilter("factcheck")}
              className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                activeFilter === "factcheck" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Fact-Checks
            </button>
            <button
              onClick={() => setActiveFilter("watchlist")}
              className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                activeFilter === "watchlist" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Watchlist
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 shrink-0"
              title="Mark all notifications as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Read All</span>
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto p-2 flex-1 space-y-1.5 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-semibold text-sm text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-400">No active alerts for this category.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                  !item.isRead ? "bg-emerald-50/70 border border-emerald-200 text-slate-900 shadow-2xs" : "hover:bg-slate-50 bg-white text-slate-700"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.type === "debate" && (
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                      🎙️
                    </span>
                  )}
                  {item.type === "factcheck" && (
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                      🔍
                    </span>
                  )}
                  {item.type === "watchlist" && (
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                      📌
                    </span>
                  )}
                  {item.type === "charter" && (
                    <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">
                      🇰🇪
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className={`text-xs font-bold truncate ${!item.isRead ? "text-slate-900" : "text-slate-700"}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={clearAllNotifications}
            className="text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
          <span className="text-[11px] text-slate-400">
            Real-time citizen updates
          </span>
        </div>

      </div>
    </div>
  );
};
