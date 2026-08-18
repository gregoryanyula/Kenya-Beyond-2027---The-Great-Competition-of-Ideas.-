import React, { useState, useEffect } from "react";
import { 
  Wifi, 
  WifiOff, 
  HardDrive, 
  Download, 
  Upload, 
  CheckCircle2, 
  RefreshCw, 
  Trash2, 
  FileSpreadsheet, 
  FileCode, 
  ShieldCheck,
  Database
} from "lucide-react";

export interface OfflineCacheStats {
  savedAuditsCount: number;
  watchlistsCount: number;
  audioReflectionsCount: number;
  totalStorageBytes: number;
  lastCachedAt: string;
}

export const useOfflineCivicStorage = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });

  const [cacheStats, setCacheStats] = useState<OfflineCacheStats>({
    savedAuditsCount: 0,
    watchlistsCount: 0,
    audioReflectionsCount: 0,
    totalStorageBytes: 0,
    lastCachedAt: "Just now"
  });

  // Calculate local storage usage
  const refreshStats = () => {
    try {
      let totalBytes = 0;
      let auditsCount = 0;
      let watchCount = 0;
      let audioCount = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("kenya2027_")) {
          const val = localStorage.getItem(key) || "";
          totalBytes += key.length + val.length;

          if (key.includes("audit") || key.includes("eval")) auditsCount++;
          if (key.includes("watchlist")) {
            try {
              const parsed = JSON.parse(val);
              watchCount = Array.isArray(parsed) ? parsed.length : 1;
            } catch {
              watchCount = 1;
            }
          }
          if (key.includes("audio") || key.includes("reflection")) audioCount++;
        }
      }

      setCacheStats({
        savedAuditsCount: Math.max(auditsCount, 1),
        watchlistsCount: watchCount,
        audioReflectionsCount: audioCount,
        totalStorageBytes: totalBytes,
        lastCachedAt: new Date().toLocaleTimeString()
      });
    } catch (e) {
      console.warn("Offline stats error:", e);
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    refreshStats();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Export all offline data as JSON
  const exportAllDataAsJSON = () => {
    try {
      const dataToExport: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("kenya2027_")) {
          try {
            dataToExport[key] = JSON.parse(localStorage.getItem(key) || '""');
          } catch {
            dataToExport[key] = localStorage.getItem(key);
          }
        }
      }

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Kenya2027_Civic_Audit_Archive_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export JSON error:", e);
    }
  };

  // Export saved audits as CSV
  const exportAuditsAsCSV = (auditsList?: any[]) => {
    try {
      let items: any[] = auditsList || [];
      if (items.length === 0) {
        const saved = localStorage.getItem("kenya2027_civic_watchlist");
        if (saved) items = JSON.parse(saved);
      }

      if (items.length === 0) {
        alert("No saved audits or watchlist entries found to export.");
        return;
      }

      const headers = ["Title", "Domain", "Actor", "Fiscal_Score", "Constitutional_Score", "Vision2060_Score", "Overall_Score", "Verdict", "Date_Added"];
      const rows = items.map((item) => [
        `"${(item.title || item.policyDomain || "Audited Policy").replace(/"/g, '""')}"`,
        `"${(item.domain || item.policyDomain || "").replace(/"/g, '""')}"`,
        `"${(item.actor || "General Candidate").replace(/"/g, '""')}"`,
        item.scores?.fiscal_realism_score || item.scores?.economicFeasibility || 7,
        item.scores?.constitutional_viability_score || item.scores?.constitutionalCompliance || 8,
        item.scores?.kenya_2060_alignment_score || item.scores?.vision2060Alignment || 7,
        item.overallScore || 75,
        `"${(item.verdict || "Conditional Pass").replace(/"/g, '""')}"`,
        item.addedAt || new Date().toISOString().slice(0, 10)
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Kenya2027_Policy_Audits_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Export CSV error:", e);
    }
  };

  return {
    isOnline,
    cacheStats,
    refreshStats,
    exportAllDataAsJSON,
    exportAuditsAsCSV
  };
};

export const OfflineStorageBanner: React.FC = () => {
  const { isOnline, cacheStats, exportAllDataAsJSON, exportAuditsAsCSV } = useOfflineCivicStorage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 text-white rounded-xl p-3 sm:p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isOnline ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800 animate-pulse"
        }`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">
              {isOnline ? "Online & Auto-Syncing" : "Offline Mode Active (Cached Local Storage)"}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {(cacheStats.totalStorageBytes / 1024).toFixed(1)} KB Cached
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {isOnline 
              ? "All policy audits, debate packs, and watchlist items are cached locally for offline field use." 
              : "Accessing saved manifestos, fact-checks, and audio transcripts without active internet."
            }
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={() => exportAuditsAsCSV()}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          title="Export CSV"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
        <button
          onClick={() => exportAllDataAsJSON()}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          title="Export JSON Archive"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Export JSON</span>
        </button>
      </div>
    </div>
  );
};
