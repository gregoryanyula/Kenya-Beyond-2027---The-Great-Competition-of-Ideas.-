import React, { useState, useEffect } from "react";
import { 
  History, 
  RotateCcw, 
  Trash2, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  X,
  ExternalLink
} from "lucide-react";
import { EvaluationResult } from "../types";

export interface RecentAuditItem {
  id: string;
  timestamp: number;
  title: string;
  domain: string;
  actorType: string;
  proposalText: string;
  weightedScore: number;
  fiscalScore: number;
  constScore: number;
  clarityScore: number;
  summarySnippet: string;
  savedResult?: EvaluationResult;
}

const STORAGE_KEY = "kenya2027_recent_audit_history";
const MAX_ITEMS = 5;

export const saveToAuditHistory = (
  proposalText: string,
  domain: string,
  actorType: string,
  weightedScore: number,
  result: EvaluationResult
) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: RecentAuditItem[] = raw ? JSON.parse(raw) : [];

    const newItem: RecentAuditItem = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      title: proposalText.slice(0, 75).split(".")[0] || "Policy Proposal",
      domain,
      actorType,
      proposalText,
      weightedScore,
      fiscalScore: result.verdict_score?.fiscal_realism_score || 0,
      constScore: result.verdict_score?.constitutional_viability_score || 0,
      clarityScore: result.verdict_score?.clarity_score || 0,
      summarySnippet: result.summary ? result.summary.slice(0, 110) + "..." : "",
      savedResult: result
    };

    // Filter out duplicates with identical text
    const filtered = existing.filter(
      (item) => item.proposalText.trim() !== proposalText.trim()
    );

    const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Could not save to audit history:", err);
  }
};

export const getAuditHistory = (): RecentAuditItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const clearAuditHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

interface RecentAuditHistoryProps {
  onSelectAudit: (item: RecentAuditItem) => void;
  className?: string;
}

export const RecentAuditHistory: React.FC<RecentAuditHistoryProps> = ({
  onSelectAudit,
  className = ""
}) => {
  const [history, setHistory] = useState<RecentAuditItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadHistory = () => {
    setHistory(getAuditHistory());
  };

  useEffect(() => {
    loadHistory();

    // Listen for storage events across tabs or local updates
    const interval = setInterval(loadHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearAuditHistory();
    setHistory([]);
  };

  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getScoreBadgeClass = (score: number) => {
    if (score >= 80) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if (score >= 60) return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-rose-50 text-rose-800 border-rose-200";
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Recent Audit History ({history.length})
          </h4>
        </div>
        <button
          onClick={handleClear}
          className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          title="Clear recent policy audit history"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-500 leading-tight">
        Last 5 analyzed policy proposals. Click to instantly restore analysis.
      </p>

      <div className="space-y-2 pt-1">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectAudit(item)}
            className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 bg-slate-50/70 hover:bg-emerald-50/40 transition-all cursor-pointer group flex items-start justify-between gap-2 text-left"
            id={`recent-audit-${item.id}`}
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200 uppercase font-mono">
                  {item.domain}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatTimeAgo(item.timestamp)}
                </span>
              </div>
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                {item.title}
              </h5>
              <p className="text-[10px] text-slate-500 line-clamp-1">
                {item.summarySnippet}
              </p>
            </div>

            <div className="flex flex-col items-end shrink-0 pl-1">
              <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded border ${getScoreBadgeClass(item.weightedScore)}`}>
                {item.weightedScore}/100
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
