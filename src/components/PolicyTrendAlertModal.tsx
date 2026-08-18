import React, { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
  Plus,
  Trash2,
  Send,
  Radio,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Activity
} from "lucide-react";

export interface TrendAlertSubscription {
  id: string;
  policyTopic: string;
  email: string;
  notifyInApp: boolean;
  notifyEmail: boolean;
  sensitivityThreshold: "any" | "moderate" | "critical"; // 5%, 15%, or 25% shift
  alertFrequency: "realtime" | "daily" | "weekly";
  createdAt: string;
  active: boolean;
}

interface PolicyTrendAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  defaultDomain?: string;
  currentSentimentScore?: number;
}

const STORAGE_KEY = "kenya2027_trend_alert_subscriptions";

export const PolicyTrendAlertModal: React.FC<PolicyTrendAlertModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = "Audited Policy Proposal",
  defaultDomain = "Public Policy & Governance",
  currentSentimentScore = 65
}) => {
  const [topicName, setTopicName] = useState<string>(defaultTopic);
  const [emailInput, setEmailInput] = useState<string>("");
  const [notifyInApp, setNotifyInApp] = useState<boolean>(true);
  const [notifyEmail, setNotifyEmail] = useState<boolean>(true);
  const [sensitivity, setSensitivity] = useState<"any" | "moderate" | "critical">("moderate");
  const [frequency, setFrequency] = useState<"realtime" | "daily" | "weekly">("realtime");
  
  const [subscriptions, setSubscriptions] = useState<TrendAlertSubscription[]>([]);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  // Load existing subscriptions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSubscriptions(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Update default topic when prop changes
  useEffect(() => {
    if (defaultTopic) {
      setTopicName(defaultTopic);
    }
  }, [defaultTopic]);

  const handleSaveSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    if (notifyEmail && !emailInput.trim()) {
      setSaveSuccessMessage("Please provide a valid email address for email delivery.");
      setTimeout(() => setSaveSuccessMessage(null), 3000);
      return;
    }

    const newSub: TrendAlertSubscription = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      policyTopic: topicName.trim(),
      email: notifyEmail ? emailInput.trim() : "",
      notifyInApp,
      notifyEmail,
      sensitivityThreshold: sensitivity,
      alertFrequency: frequency,
      createdAt: new Date().toISOString(),
      active: true
    };

    const updated = [newSub, ...subscriptions];
    setSubscriptions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSaveSuccessMessage("✓ Trend Alert successfully subscribed! You will be notified when discourse sentiment shifts.");
    setTimeout(() => {
      setSaveSuccessMessage(null);
      setActiveTab("manage");
    }, 1500);
  };

  const handleDeleteSubscription = (id: string) => {
    const updated = subscriptions.filter((s) => s.id !== id);
    setSubscriptions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = subscriptions.map((s) => (s.id === id ? { ...s, active: !s.active } : s));
    setSubscriptions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSendTestNotification = (sub: TrendAlertSubscription) => {
    setSaveSuccessMessage(`🔔 Test alert dispatched for "${sub.policyTopic}"! Triggered for ${sub.notifyEmail ? sub.email : "In-App Drawer"}.`);
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-6 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-900 border border-purple-200">
                <Activity className="w-3 h-3 text-purple-600" />
                <span>30-Day Sentiment Volatility Tracker</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Subscribe to Policy Trend Alerts
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            id="close-trend-alert-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "create" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Alert</span>
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "manage" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Active Alerts ({subscriptions.length})</span>
          </button>
        </div>

        {saveSuccessMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="overflow-y-auto space-y-4 pr-1">
          {activeTab === "create" && (
            <form onSubmit={handleSaveSubscription} className="space-y-4 text-xs">
              {/* Policy Topic Input */}
              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Policy Topic or Measure Name
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g., Agricultural Subsidy & Fertilizer Cost-Sharing, Universal Health Coverage Financing"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-xs text-slate-900"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Domain Sector: <strong className="text-slate-800">{defaultDomain}</strong> • Baseline Sentiment: <strong className="text-emerald-700">{currentSentimentScore}% favorable</strong>
                </p>
              </div>

              {/* Notification Channels */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 block text-xs">
                  Notification Delivery Channels
                </span>
                
                <div className="space-y-2">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyInApp}
                      onChange={(e) => setNotifyInApp(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                      <span>In-App Civic Alerts (Notification Bell & Watchlist Drawer)</span>
                    </span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Email Delivery</span>
                    </span>
                  </label>

                  {notifyEmail && (
                    <div className="pl-6 pt-1">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email (e.g. citizen@civic.or.ke)"
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-purple-500"
                        required={notifyEmail}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sensitivity & Shift Threshold */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-600" />
                    <span>Sentiment Shift Trigger Sensitivity</span>
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-100 px-2 py-0.5 rounded font-bold">
                    {sensitivity === "any" ? "±5% Shift (High Sensitivity)" : sensitivity === "moderate" ? "±15% Shift (Recommended)" : "±25% Shift (Major Divergence Only)"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-2xs">
                  <button
                    type="button"
                    onClick={() => setSensitivity("any")}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all ${
                      sensitivity === "any" ? "bg-purple-100 border-purple-400 text-purple-900 font-bold" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    ±5% Shift
                    <span className="block text-[9px] font-normal text-slate-500">Every notable ripple</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSensitivity("moderate")}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all ${
                      sensitivity === "moderate" ? "bg-purple-100 border-purple-400 text-purple-900 font-bold" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    ±15% Shift
                    <span className="block text-[9px] font-normal text-slate-500">Significant debate shifts</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSensitivity("critical")}
                    className={`p-2 rounded-lg border text-center font-semibold transition-all ${
                      sensitivity === "critical" ? "bg-purple-100 border-purple-400 text-purple-900 font-bold" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    ±25% Major
                    <span className="block text-[9px] font-normal text-slate-500">Crisis & major fact-checks</span>
                  </button>
                </div>
              </div>

              {/* Alert Frequency */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 text-xs">Dispatch Cadence</span>
                <div className="flex gap-1.5 text-2xs">
                  {(["realtime", "daily", "weekly"] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`px-2.5 py-1 rounded-md font-semibold capitalize transition-all ${
                        frequency === freq ? "bg-slate-900 text-white font-bold" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                id="submit-trend-alert-btn"
              >
                <Bell className="w-3.5 h-3.5 text-amber-300" />
                <span>Save & Activate Trend Alert</span>
              </button>
            </form>
          )}

          {activeTab === "manage" && (
            <div className="space-y-3 text-xs">
              {subscriptions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 space-y-2">
                  <Bell className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="font-semibold text-slate-700">No Active Trend Alerts</p>
                  <p className="text-2xs max-w-sm mx-auto">
                    Subscribe to policy topics to receive instant alerts when public sentiment, radio townhall feedback, or fact-checking reviews shift.
                  </p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 text-white font-bold text-xs cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create Your First Alert</span>
                  </button>
                </div>
              ) : (
                subscriptions.map((sub) => (
                  <div 
                    key={sub.id}
                    className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                      sub.active ? "bg-white border-slate-200 shadow-2xs" : "bg-slate-50/60 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">{sub.policyTopic}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sub.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                            {sub.active ? "Active" : "Paused"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Threshold: ±{sub.sensitivityThreshold === "any" ? "5%" : sub.sensitivityThreshold === "moderate" ? "15%" : "25%"} • Cadence: {sub.alertFrequency} • {sub.notifyEmail && sub.email ? `Email: ${sub.email}` : "In-App Only"}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleSendTestNotification(sub)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-purple-700 transition-colors"
                          title="Trigger a test notification"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(sub.id)}
                          className="px-2 py-1 rounded-md text-[10px] font-semibold border border-slate-200 hover:bg-slate-100"
                        >
                          {sub.active ? "Pause" : "Resume"}
                        </button>
                        <button
                          onClick={() => handleDeleteSubscription(sub.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete alert"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500 shrink-0">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Non-Partisan Civic Real-Time Monitoring</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
