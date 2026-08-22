import React, { useState, useEffect } from "react";
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  X, 
  ExternalLink, 
  Building2, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Vote,
  Clock
} from "lucide-react";
import { LegislativeStageInfo } from "./PolicyLegislativeStageTracker";

export interface PolicyNotification {
  id: string;
  policyTitle: string;
  stageName: string;
  stepNumber: number;
  domain: string;
  citizenAction: string;
  constitutionalBasis: string;
  timestamp: number;
  read: boolean;
  type: "stage_transition" | "public_participation" | "fiscal_alert" | "vote_passed";
  urgency: "high" | "medium" | "low";
}

export interface PolicyNotificationCenterProps {
  notifications: PolicyNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectNotificationPolicy?: (policyTitle: string, domain: string) => void;
  onTriggerTestNotification?: () => void;
}

export const PolicyNotificationCenter: React.FC<PolicyNotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onSelectNotificationPolicy,
  onTriggerTestNotification
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "stage_transition" | "fiscal_alert">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "stage_transition") return n.type === "stage_transition" || n.type === "vote_passed";
    if (activeFilter === "fiscal_alert") return n.type === "fiscal_alert" || n.type === "public_participation";
    return true;
  });

  const formatTimestamp = (ts: number) => {
    const diffSeconds = Math.floor((Date.now() - ts) / 1000);
    if (diffSeconds < 60) return "Just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Center Trigger Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
        title="Civic Notification Center: Tracks legislative movements, public hearings & fiscal status"
        id="policy-notification-center-trigger-btn"
      >
        <Bell className={`w-3.5 h-3.5 ${unreadCount > 0 ? "text-amber-400 animate-bounce" : "text-slate-300"}`} />
        <span>Legislative Alerts</span>
        {unreadCount > 0 && (
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop on Mobile */}
          <div 
            className="fixed inset-0 z-40 bg-slate-950/20 sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-80 sm:w-96 md:w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Notification Center Header */}
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                    <span>Notification Center</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 font-mono font-normal border border-emerald-800">
                      Legislative Tracker
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Live Parliamentary & Article 201 Policy Milestones
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Toolbar & Filter Chips */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-2xs">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                    activeFilter === "all"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setActiveFilter("unread")}
                  className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                    activeFilter === "unread"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setActiveFilter("stage_transition")}
                  className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                    activeFilter === "stage_transition"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Stages
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3 h-3" />
                    <span>Read all</span>
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-slate-400 hover:text-rose-600 font-medium flex items-center gap-0.5 cursor-pointer transition-colors"
                    title="Clear notification list"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Notification Scrollable List */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">No Notifications</p>
                  <p className="text-2xs text-slate-500 max-w-xs mx-auto">
                    When you audit policies or change stages in the Legislative Tracker, live status updates and citizen action alerts will appear here.
                  </p>
                  {onTriggerTestNotification && (
                    <button
                      onClick={onTriggerTestNotification}
                      className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Simulate Stage Transition Alert</span>
                    </button>
                  )}
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!item.read) onMarkAsRead(item.id);
                      if (onSelectNotificationPolicy) {
                        onSelectNotificationPolicy(item.policyTitle, item.domain);
                      }
                    }}
                    className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer space-y-2 relative group ${
                      !item.read ? "bg-amber-50/40 border-l-4 border-l-amber-500" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-mono font-black text-[10px] shrink-0">
                          {item.stepNumber}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                          {item.stageName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formatTimestamp(item.timestamp)}
                        </span>
                      </div>

                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Unread" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {item.policyTitle}
                      </h4>
                      <p className="text-2xs text-slate-600 line-clamp-2 mt-0.5">
                        <strong className="text-amber-800">Action Window: </strong>
                        {item.citizenAction}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span className="font-mono text-slate-500 truncate max-w-[200px]">
                        {item.constitutionalBasis}
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>Scrutinize</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-2xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Article 118 Public Access</span>
              </span>
              {onTriggerTestNotification && (
                <button
                  onClick={onTriggerTestNotification}
                  className="text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
                >
                  + Simulate Alert
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
