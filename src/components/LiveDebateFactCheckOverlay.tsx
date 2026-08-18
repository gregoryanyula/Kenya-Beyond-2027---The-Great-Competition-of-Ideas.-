import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Search,
  ExternalLink,
  MessageSquare,
  Activity,
  Layers,
  ChevronRight,
  Clock,
  User,
  Volume2,
  VolumeX,
  Sliders,
  Filter,
  Download,
  Share2,
  Check,
  Zap,
  Radio,
  FileSpreadsheet
} from "lucide-react";
import { DebateTranscriptEntry } from "../types";
import { CivicAudioWaveformVisualizer } from "./CivicAudioWaveformVisualizer";

interface LiveDebateFactCheckOverlayProps {
  debateTitle: string;
  onAuditClaim?: (quote: string, domain: string) => void;
  onClose?: () => void;
}

const SAMPLE_DEBATE_TRANSCRIPT: DebateTranscriptEntry[] = [
  {
    id: "ts-1",
    timestamp: "00:45",
    timestampSeconds: 45,
    speaker: "Yvonne Okwara (Moderator)",
    speakerRole: "Moderator",
    avatarColor: "bg-slate-700",
    text: "Welcome to the 2027 National Presidential Debate. The first domain is Macroeconomic Sustainability and Article 201 Fiscal Accountability. Candidates have 2 minutes each.",
    hasFactCheck: false
  },
  {
    id: "ts-2",
    timestamp: "01:30",
    timestampSeconds: 90,
    speaker: "Incumbent Coalition Flagbearer",
    speakerRole: "Incumbent Flagbearer",
    avatarColor: "bg-amber-600",
    text: "Our economic transformation plan has already achieved debt stabilization. Foreign debt repayment has dropped below 35% of national revenue, and our agricultural subsidies eliminated food inflation entirely in 2026.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Foreign debt repayment has dropped below 35% of national revenue, and food inflation was eliminated.",
      verdict: "Contradicted by Official Data",
      verdictColor: "rose",
      officialBaselineStat: "Debt service absorbed 61.2% of ordinary revenue in FY 2025/26 (CBK & National Treasury). Food CPI inflation averaged 6.8% (KNBS).",
      empiricalEvidence: "According to Central Bank of Kenya Consolidated Fund Outturn bulletins, debt service remains the 'First Charge' consuming KES 1.62 Trillion annually, far above the 35% statutory safe threshold.",
      constitutionalCitation: "Article 201(c) - Financial burden of public borrowing must be shared equitably between present and future generations.",
      sourceAgency: "Central Bank of Kenya (CBK) & KNBS Economic Survey 2026",
      townhallQuestion: "Given that debt service is at 61.2%, which specific development budget lines will you cut to fund your new promised subsidies?"
    }
  },
  {
    id: "ts-3",
    timestamp: "03:15",
    timestampSeconds: 195,
    speaker: "Opposition Coalition Flagbearer",
    speakerRole: "Opposition Flagbearer",
    avatarColor: "bg-blue-600",
    text: "We will immediately reduce the cost of living on Day One by abolishing VAT on fuel, maize flour, and cooking oil, and provide a direct KES 100,000 startup grant to every unemployed youth with zero borrowing.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Abolish fuel/food VAT and provide KES 100,000 grant to every unemployed youth without borrowing or taxes.",
      verdict: "Misleading / Uncosted",
      verdictColor: "amber",
      officialBaselineStat: "Grant to 5.2M unemployed youths = KES 520B/yr. Fuel & Food VAT zero-rating creates KES 114B revenue shortfall.",
      empiricalEvidence: "Eliminating VAT without compensatory revenue creates a KES 114 Billion gap at KRA. Financing 5.2 million youths at KES 100k requires KES 520 Billion (nearly 18% of Kenya's entire budget) with no identified source.",
      constitutionalCitation: "Article 201(d) & PFM Act Sec 15 - Prudent, responsible and sustainable fiscal management.",
      sourceAgency: "Office of the Controller of Budget (OCOB) & KRA Annual Revenue Report",
      townhallQuestion: "Which specific taxes will be introduced, or which ministries will be dissolved to raise KES 634 Billion for this policy?"
    }
  },
  {
    id: "ts-4",
    timestamp: "05:00",
    timestampSeconds: 300,
    speaker: "Third-Pole Progressive Flagbearer",
    speakerRole: "Third-Pole Flagbearer",
    avatarColor: "bg-emerald-600",
    text: "We propose ring-fencing 5% of the Universal Service Fund (KES 8 Billion) to build 290 Constituency Innovation Hubs, audited transparently on an open ledger, while cutting executive travel by 70%.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Ring-fencing 5% of Universal Service Fund for 290 Constituency Innovation Hubs and cutting travel by 70%.",
      verdict: "Verified True",
      verdictColor: "emerald",
      officialBaselineStat: "Universal Service Fund balance: KES 14.8B (CA 2026). Executive travel expenditure: KES 23.4B (OCOB).",
      empiricalEvidence: "The Universal Service Fund currently holds adequate capital, and reducing executive foreign/domestic travel by 70% frees KES 16.3 Billion, which covers the KES 8 Billion capital expenditure and ongoing fiber leases.",
      constitutionalCitation: "Article 201(a) - Openness and accountability, including public participation in financial matters.",
      sourceAgency: "Communications Authority (CA) & Controller of Budget Outturn Report",
      townhallQuestion: "What statutory mechanism will guarantee County Governors do not duplicate these tech hubs with CIDP funds?"
    }
  },
  {
    id: "ts-5",
    timestamp: "06:40",
    timestampSeconds: 400,
    speaker: "Eric Latiff (Moderator)",
    speakerRole: "Moderator",
    avatarColor: "bg-slate-700",
    text: "Candidates, let us move to Devolution and Health Funding. Counties are owed over KES 40 Billion in delayed exchequer releases. What is your concrete timeline?",
    hasFactCheck: false
  },
  {
    id: "ts-6",
    timestamp: "07:20",
    timestampSeconds: 440,
    speaker: "Incumbent Coalition Flagbearer",
    speakerRole: "Incumbent Flagbearer",
    avatarColor: "bg-amber-600",
    text: "We have disbursed 100% of the equitable share for the past two fiscal years without a single day of delay, and devolved healthcare is performing at all-time high satisfaction levels.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Disbursed 100% of equitable share without a single day of delay.",
      verdict: "Contradicted by Official Data",
      verdictColor: "rose",
      officialBaselineStat: "Average exchequer delay to counties: 68 days in FY 2025/26. Total arrears: KES 38.4B (Council of Governors).",
      empiricalEvidence: "The Controller of Budget recorded that counties received their October-December disbursements up to 3 months late due to national debt liquidity squeezes, leading to county hospital strikes.",
      constitutionalCitation: "Article 219 - Revenue raised nationally assigned to county governments shall be transferred without undue delay and without deduction.",
      sourceAgency: "Office of the Controller of Budget (OCOB) & Council of Governors Memoranda",
      townhallQuestion: "Why did 24 counties face drug supply stockouts if exchequer releases were never delayed?"
    }
  }
];

export const LiveDebateFactCheckOverlay: React.FC<LiveDebateFactCheckOverlayProps> = ({
  debateTitle,
  onAuditClaim,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeEntryIndex, setActiveEntryIndex] = useState<number>(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "factchecks_only" | "violations">("all");
  const [activeTab, setActiveTab] = useState<"stream" | "counterpoints_grid" | "stats">("stream");
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto playback simulation
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(6000 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setActiveEntryIndex((prev) => {
          if (prev >= SAMPLE_DEBATE_TRANSCRIPT.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  // Auto-scroll transcript container
  useEffect(() => {
    if (transcriptContainerRef.current) {
      const activeEl = transcriptContainerRef.current.querySelector(`#entry-${activeEntryIndex}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeEntryIndex]);

  const activeEntry = SAMPLE_DEBATE_TRANSCRIPT[activeEntryIndex];

  const handleShareQuote = (entry: DebateTranscriptEntry) => {
    if (!entry.factCheckData) return;
    const text = `🇰🇪 KENYA 2027 LIVE DEBATE FACT-CHECK:
Speaker: ${entry.speaker} [${entry.timestamp}]
Quote: "${entry.factCheckData.claimQuote}"
Verdict: ${entry.factCheckData.verdict}
Evidence: ${entry.factCheckData.empiricalEvidence}
Source: ${entry.factCheckData.sourceAgency}

Audited live on Kenya 2027: The Great Competition of Ideas. Usitupatie slogan, tupatie plan!`;

    navigator.clipboard.writeText(text);
    setCopiedQuoteId(entry.id);
    setTimeout(() => setCopiedQuoteId(null), 2500);
  };

  const handleExportCsv = () => {
    const headers = ["Timestamp", "Speaker", "Speech Text", "FactCheck Verdict", "Official Baseline Stat", "Source Agency", "Constitutional Citation", "Townhall Question"];
    const rows = SAMPLE_DEBATE_TRANSCRIPT.map((e) => [
      `"${e.timestamp}"`,
      `"${e.speaker}"`,
      `"${e.text.replace(/"/g, '""')}"`,
      `"${e.factCheckData?.verdict || "N/A"}"`,
      `"${(e.factCheckData?.officialBaselineStat || "").replace(/"/g, '""')}"`,
      `"${(e.factCheckData?.sourceAgency || "").replace(/"/g, '""')}"`,
      `"${(e.factCheckData?.constitutionalCitation || "").replace(/"/g, '""')}"`,
      `"${(e.factCheckData?.townhallQuestion || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Kenya2027_Debate_FactCheck_Log_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredEntries = SAMPLE_DEBATE_TRANSCRIPT.filter((e) => {
    if (selectedFilter === "factchecks_only") return e.hasFactCheck;
    if (selectedFilter === "violations") return e.factCheckData?.verdict !== "Verified True" && e.hasFactCheck;
    return true;
  });

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col space-y-0">
      {/* Top HUD Banner */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-amber-600 text-white flex items-center justify-center font-bold shadow-md relative">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                Live Real-Time Fact-Check HUD
              </span>
              <span className="text-xs text-slate-400 font-mono hidden md:inline">
                {debateTitle}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Live Transcript & Verified Counter-Point Engine
            </h3>
          </div>
        </div>

        {/* Playback Controls & Speed Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Simulate Live Play</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setActiveEntryIndex(0);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset to Beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            {[1, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                  playbackSpeed === spd ? "bg-slate-700 text-emerald-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Audio Waveform Stream Indicator */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-3 text-xs">
        <CivicAudioWaveformVisualizer
          isPlaying={isPlaying}
          barCount={32}
          height={24}
          colorTheme="emerald"
          showDecibelMeter={true}
          label="Live Debate Audio Sync"
          className="bg-transparent border-none p-0 flex-1"
        />

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleExportCsv}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1 border border-slate-700"
            title="Export Fact-Checks as CSV"
          >
            <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane HUD Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 min-h-[440px]">
        {/* Left Pane: Real-Time Scrolling Transcript (5 Cols) */}
        <div className="lg:col-span-5 border-r border-slate-800 flex flex-col bg-slate-950">
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Scrolling Transcript</span>
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-1 text-[10px]">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-2 py-0.5 rounded font-bold ${
                  selectedFilter === "all" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter("factchecks_only")}
                className={`px-2 py-0.5 rounded font-bold ${
                  selectedFilter === "factchecks_only" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Audited Only
              </button>
            </div>
          </div>

          <div
            ref={transcriptContainerRef}
            className="p-3 sm:p-4 space-y-3 overflow-y-auto max-h-[460px] flex-1 text-xs"
          >
            {filteredEntries.map((entry, idx) => {
              const isActive = SAMPLE_DEBATE_TRANSCRIPT[activeEntryIndex]?.id === entry.id;

              return (
                <div
                  key={entry.id}
                  id={`entry-${SAMPLE_DEBATE_TRANSCRIPT.findIndex(e => e.id === entry.id)}`}
                  onClick={() => {
                    const originalIdx = SAMPLE_DEBATE_TRANSCRIPT.findIndex(e => e.id === entry.id);
                    if (originalIdx !== -1) {
                      setActiveEntryIndex(originalIdx);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isActive
                      ? "bg-slate-900 border-emerald-500/80 shadow-lg ring-1 ring-emerald-500/40"
                      : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${entry.avatarColor}`} />
                      <span className={`font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                        {entry.speaker}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">
                      {entry.timestamp}
                    </span>
                  </div>

                  <p className={`text-[11.5px] leading-relaxed ${isActive ? "text-slate-100 font-medium" : "text-slate-400"}`}>
                    {entry.text}
                  </p>

                  {entry.hasFactCheck && entry.factCheckData && (
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className={`text-[9.5px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                        entry.factCheckData.verdict === "Verified True"
                          ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                          : entry.factCheckData.verdict === "Misleading / Uncosted"
                            ? "bg-amber-950 text-amber-300 border-amber-800"
                            : "bg-rose-950 text-rose-300 border-rose-800"
                      }`}>
                        ⚡ {entry.factCheckData.verdict}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        Click to view counter-points
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Live Verified Counter-Point & Empirical Evidence Overlay (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/70 p-4 sm:p-6 flex flex-col justify-between space-y-4">
          {activeEntry && activeEntry.hasFactCheck && activeEntry.factCheckData ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Active Verified Verdict Badge Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  activeEntry.factCheckData.verdict === "Verified True"
                    ? "bg-emerald-500"
                    : activeEntry.factCheckData.verdict === "Misleading / Uncosted"
                      ? "bg-amber-500"
                      : "bg-rose-500"
                }`} />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Live Statement Under Scrutiny • {activeEntry.speaker} [{activeEntry.timestamp}]
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1 italic font-serif">
                      "{activeEntry.factCheckData.claimQuote}"
                    </h4>
                  </div>

                  <span className={`text-xs font-black uppercase px-2.5 py-1 rounded border shrink-0 ${
                    activeEntry.factCheckData.verdict === "Verified True"
                      ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                      : activeEntry.factCheckData.verdict === "Misleading / Uncosted"
                        ? "bg-amber-950 text-amber-300 border-amber-700"
                        : "bg-rose-950 text-rose-300 border-rose-700"
                  }`}>
                    {activeEntry.factCheckData.verdict}
                  </span>
                </div>

                {/* Official Agency Baseline Stat */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] font-bold uppercase">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official Agency Baseline Statistic:</span>
                  </div>
                  <p className="text-slate-200 font-bold text-xs">
                    {activeEntry.factCheckData.officialBaselineStat}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Source: {activeEntry.factCheckData.sourceAgency}
                  </span>
                </div>
              </div>

              {/* Empirical Counter-Point & Evidence Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                    Empirical Evidence & Fiscal Impact
                  </h5>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeEntry.factCheckData.empiricalEvidence}
                </p>

                {/* Katiba Article 201 Citation */}
                <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 flex items-start gap-2">
                  <Scale className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-300">Constitutional Principle: </strong>
                    <span className="text-[11px] text-purple-200">{activeEntry.factCheckData.constitutionalCitation}</span>
                  </div>
                </div>
              </div>

              {/* Townhall Cross-Examination Question */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Demanded Citizen Townhall Question:</span>
                </div>
                <p className="text-xs text-emerald-200 font-medium italic">
                  "{activeEntry.factCheckData.townhallQuestion}"
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleShareQuote(activeEntry)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedQuoteId === activeEntry.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedQuoteId === activeEntry.id ? "Copied Fact-Check!" : "Share / Export"}</span>
                </button>

                {onAuditClaim && (
                  <button
                    onClick={() => onAuditClaim(activeEntry.factCheckData!.claimQuote, "Public Finance & Macroeconomics")}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                    <span>Run Full 13-Point Audit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center space-y-3 flex-1 flex flex-col justify-center items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center">
                <Radio className="w-6 h-6 animate-pulse text-emerald-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Live Speech Stream Active</p>
                <p className="text-xs text-slate-400 max-w-sm">
                  {activeEntry ? `Currently listening to ${activeEntry.speaker}...` : "Click on any audited quote in the transcript to inspect live counter-points and KNBS verified data."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
