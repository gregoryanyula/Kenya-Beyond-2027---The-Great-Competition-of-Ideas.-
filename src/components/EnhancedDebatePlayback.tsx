import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Sliders,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ExternalLink,
  MessageSquare,
  Activity,
  Layers,
  ChevronRight,
  Clock,
  User,
  Search,
  Filter,
  Sparkles,
  Maximize2,
  Minimize2,
  Share2,
  FileSpreadsheet,
  Zap,
  Radio,
  Video
} from "lucide-react";
import { DebateTranscriptEntry } from "../types";
import { CivicAudioWaveformVisualizer } from "./CivicAudioWaveformVisualizer";

interface EnhancedDebatePlaybackProps {
  onAuditClaim?: (quote: string, domain: string) => void;
}

const DEBATE_SEGMENTS: DebateTranscriptEntry[] = [
  {
    id: "ts-1",
    timestamp: "00:00",
    timestampSeconds: 0,
    speaker: "Yvonne Okwara (Senior Moderator)",
    speakerRole: "Moderator",
    avatarColor: "bg-slate-800",
    text: "Good evening Kenya. Welcome to the 2027 Presidential Debate live from the Catholic University of Eastern Africa. The focus tonight: Article 201 Public Finance, National Debt, Agriculture, and Long-Term Kenya 2060 Transformation.",
    hasFactCheck: false
  },
  {
    id: "ts-2",
    timestamp: "00:35",
    timestampSeconds: 35,
    speaker: "Incumbent Coalition Flagbearer",
    speakerRole: "Incumbent Flagbearer",
    avatarColor: "bg-amber-600",
    text: "Under our Bottom-Up Economic Transformation Agenda, debt service has fallen below 35% of national ordinary revenues. We have completely stabilized the food basket and zeroed out fertilizer imports through local manufacturing.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Debt service has fallen below 35% of national ordinary revenues and eliminated fertilizer imports.",
      verdict: "Contradicted by Official Data",
      verdictColor: "rose",
      officialBaselineStat: "Debt service absorbed 61.2% of ordinary revenue in FY 2025/26 (CBK & National Treasury). Fertilizer imports stood at 620,000 MT (KNBS).",
      empiricalEvidence: "According to Central Bank of Kenya Consolidated Fund Outturn bulletins, debt service remains the 'First Charge' consuming KES 1.62 Trillion annually, far above the 35% statutory safe threshold.",
      constitutionalCitation: "Article 201(c) - The burdens and benefits of the use of resources and public borrowing shall be shared equitably between present and future generations.",
      sourceAgency: "Central Bank of Kenya (CBK) & KNBS Economic Survey 2026",
      townhallQuestion: "Given that debt service is at 61.2%, which specific development budget lines will you cut to fund your new promised subsidies?"
    }
  },
  {
    id: "ts-3",
    timestamp: "01:25",
    timestampSeconds: 85,
    speaker: "Opposition Coalition Flagbearer",
    speakerRole: "Opposition Flagbearer",
    avatarColor: "bg-blue-600",
    text: "On Day One of our administration, we will abolish VAT on fuel and unga entirely, provide direct KES 100,000 startup capital to 3 million unemployed youth, and balance the budget without introducing new taxes or borrowing any debt.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Abolish fuel/food VAT and provide KES 100,000 to 3 million youth with zero new taxes or debt.",
      verdict: "Misleading / Uncosted",
      verdictColor: "amber",
      officialBaselineStat: "VAT on petroleum and food generates ~KES 280 Billion annually. KES 100k for 3M youth requires KES 300 Billion upfront.",
      empiricalEvidence: "Parliamentary Budget Office (PBO) fiscal models show this creates an immediate KES 580 Billion revenue deficit (4.1% of GDP) with no identified alternative revenue anchor under Article 201.",
      constitutionalCitation: "Article 201(d) - Public money shall be used in a prudent and responsible manner with clear, transparent budget appropriation.",
      sourceAgency: "Parliamentary Budget Office (PBO) Budget Options Paper",
      townhallQuestion: "Where will the KES 580 Billion replacement revenue come from without raising taxes or increasing national debt?"
    }
  },
  {
    id: "ts-4",
    timestamp: "02:15",
    timestampSeconds: 135,
    speaker: "Third Coalition Flagbearer",
    speakerRole: "Third-Pole Flagbearer",
    avatarColor: "bg-purple-600",
    text: "Our green transition plan guarantees 100% renewable grid power by 2028, cutting household electricity bills by 60% within 100 days by renegotiating all Independent Power Producer (IPP) capacity charges.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "Cut electricity bills by 60% in 100 days by renegotiating IPP capacity charges.",
      verdict: "Article 201 Flag",
      verdictColor: "amber",
      officialBaselineStat: "Kenya generates 89% renewable power (EPRA 2026). IPP capacity charges account for ~32% of consumer tariff components.",
      empiricalEvidence: "Unilateral termination of 20-year Power Purchase Agreements (PPAs) risks sovereign default clauses and international arbitration damages at ICSID exceeding KES 150 Billion.",
      constitutionalCitation: "Article 227 - Public procurement and contract integrity must be fair, equitable, transparent, and legally binding.",
      sourceAgency: "Energy & Petroleum Regulatory Authority (EPRA) & Auditor-General Report",
      townhallQuestion: "What is your contingent liability reserve to settle potential international arbitration awards if IPPs sue?"
    }
  },
  {
    id: "ts-5",
    timestamp: "03:05",
    timestampSeconds: 185,
    speaker: "Yvonne Okwara (Senior Moderator)",
    speakerRole: "Moderator",
    avatarColor: "bg-slate-800",
    text: "Let us turn to Devolution and County Healthcare. Article 174 mandates equitable sharing, yet 32 counties faced medical supply stockouts in the past quarter. Candidates, how will you fix KEMSA and intergovernmental transfers?",
    hasFactCheck: false
  },
  {
    id: "ts-6",
    timestamp: "03:40",
    timestampSeconds: 220,
    speaker: "Incumbent Coalition Flagbearer",
    speakerRole: "Incumbent Flagbearer",
    avatarColor: "bg-amber-600",
    text: "All 47 counties have received 100% of their equitable revenue share on time for the last two fiscal years, and the new Social Health Authority covers every citizen's chronic medication at zero co-pay.",
    hasFactCheck: true,
    factCheckData: {
      claimQuote: "All 47 counties received 100% of equitable revenue on time and SHA covers 100% of chronic medication with zero co-pay.",
      verdict: "Contradicted by Official Data",
      verdictColor: "rose",
      officialBaselineStat: "Exchequer disbursements to counties experienced an average 2.4-month delay (Controller of Budget FY 2025/26 Annual Report).",
      empiricalEvidence: "CoB reports show pending disbursements to counties exceeded KES 48 Billion at year-end, causing healthcare worker salary strikes and drug stockouts across 28 counties.",
      constitutionalCitation: "Article 219 - County revenue share shall be transferred to the county without undue delay and without deduction.",
      sourceAgency: "Office of the Controller of Budget (OCOB) & Council of Governors",
      townhallQuestion: "Why did the Controller of Budget record 2.4 months in exchequer disbursement arrears if transfers were on time?"
    }
  }
];

const TOTAL_DURATION_SECONDS = 270; // 4 minutes 30 seconds

export const EnhancedDebatePlayback: React.FC<EnhancedDebatePlaybackProps> = ({
  onAuditClaim
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [filterSpeaker, setFilterSpeaker] = useState<string>("all");
  const [filterFactCheckOnly, setFilterFactCheckOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const activeEntryRef = useRef<HTMLDivElement>(null);

  // Playback timer ticker
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION_SECONDS) {
            setIsPlaying(false);
            return TOTAL_DURATION_SECONDS;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Determine active spoken segment based on current seconds
  const activeSegment = useMemo(() => {
    let current = DEBATE_SEGMENTS[0];
    for (let i = 0; i < DEBATE_SEGMENTS.length; i++) {
      if (currentTime >= DEBATE_SEGMENTS[i].timestampSeconds) {
        current = DEBATE_SEGMENTS[i];
      }
    }
    return current;
  }, [currentTime]);

  // Auto scroll transcript to active segment
  useEffect(() => {
    if (autoScroll && activeEntryRef.current && transcriptContainerRef.current) {
      activeEntryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [activeSegment, autoScroll]);

  const handleSeek = (seconds: number) => {
    setCurrentTime(Math.min(TOTAL_DURATION_SECONDS, Math.max(0, seconds)));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const safeSearch = (searchQuery || "").toLowerCase();
  const safeFilterSpeaker = (filterSpeaker || "").toLowerCase();

  const filteredTranscript = DEBATE_SEGMENTS.filter((seg) => {
    const role = (seg.speakerRole || "").toLowerCase();
    const matchesSpeaker = filterSpeaker === "all" || role.includes(safeFilterSpeaker);
    const matchesFactCheck = !filterFactCheckOnly || seg.hasFactCheck;
    const matchesSearch = 
      (seg.text || "").toLowerCase().includes(safeSearch) ||
      (seg.speaker || "").toLowerCase().includes(safeSearch) ||
      (seg.factCheckData?.claimQuote || "").toLowerCase().includes(safeSearch);
    return matchesSpeaker && matchesFactCheck && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0" id="enhanced-debate-playback-view">
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
              Synchronized Video & Live Fact-Check Playback
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <Video className="w-5 h-5 text-emerald-400" />
            <span>2027 National Presidential Debate: Accountability Playback</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Replay candidate statements synchronized with real-time empirical data from CBK, KNBS, PBO, and the Controller of Budget.
          </p>
        </div>

        {/* Speed & Audio controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400 px-2 text-[10px] font-semibold">Speed:</span>
            {[0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-1 rounded text-2xs font-mono font-bold transition-all ${
                  playbackSpeed === speed ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Playback Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Interactive Video Stage & Live Claim Card (7 Cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 bg-slate-950 text-white flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Simulated Broadcast Stage */}
          <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            {/* Top Stage Badges */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/80 text-white font-mono text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span>KBC / NTV / Citizen Broadcasters Feed</span>
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-black/60 font-mono text-xs text-emerald-400 font-bold border border-emerald-500/30">
                {formatTime(currentTime)} / {formatTime(TOTAL_DURATION_SECONDS)}
              </span>
            </div>

            {/* Candidate Speaking Stage Display */}
            <div className="my-auto flex flex-col items-center justify-center text-center space-y-3 z-10 py-4">
              <div className="relative">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${activeSegment.avatarColor} text-white font-black text-2xl flex items-center justify-center shadow-lg border-2 border-slate-700`}>
                  {activeSegment.speaker.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                {isPlaying && (
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider animate-pulse">
                    Live Spoken
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">{activeSegment.speaker}</h4>
                <p className="text-xs text-slate-400 font-medium">{activeSegment.speakerRole}</p>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="w-full max-w-xs">
                <CivicAudioWaveformVisualizer
                  isPlaying={isPlaying && !isMuted}
                  barCount={28}
                  accentColor="emerald"
                />
              </div>
            </div>

            {/* Stage Bottom Caption Overlay */}
            <div className="bg-slate-950/90 backdrop-blur-xs p-3 rounded-lg border border-slate-800 z-10 text-xs text-slate-200 leading-relaxed shadow-lg">
              <span className="text-emerald-400 font-bold mr-1.5">Subtitles:</span>
              “{activeSegment.text}”
            </div>
          </div>

          {/* Timeline Scrubber Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-2xs font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span className="text-slate-500">Click timeline markers to jump directly to fact-checked claims</span>
              <span>{formatTime(TOTAL_DURATION_SECONDS)}</span>
            </div>

            {/* Custom Scrub Slider with Fact-Check Pins */}
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min="0"
                max={TOTAL_DURATION_SECONDS}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 z-10"
              />

              {/* Fact Check Marker Dots on the Timeline */}
              {DEBATE_SEGMENTS.filter(s => s.hasFactCheck).map((seg) => {
                const pct = (seg.timestampSeconds / TOTAL_DURATION_SECONDS) * 100;
                return (
                  <button
                    key={seg.id}
                    onClick={() => handleSeek(seg.timestampSeconds)}
                    style={{ left: `${pct}%` }}
                    className="absolute -top-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-400 border-2 border-slate-900 shadow-xs z-20 -translate-x-1/2 cursor-pointer transition-transform hover:scale-125"
                    title={`Jump to claim: "${seg.factCheckData?.claimQuote?.slice(0, 40)}..."`}
                  />
                );
              })}
            </div>

            {/* Playback Button Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSeek(currentTime - 10)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="Rewind 10 seconds"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                  id="debate-playback-toggle-btn"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlaying ? "Pause Playback" : "Play Debate"}</span>
                </button>

                <button
                  onClick={() => handleSeek(currentTime + 10)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="Forward 10 seconds"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleSeek(0)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="Restart from beginning"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[11px] text-slate-400 italic">
                {activeSegment.hasFactCheck ? "🚨 Live Fact-Check Active" : "Discussion in progress"}
              </span>
            </div>
          </div>

          {/* Synchronized Real-Time Fact-Check Card */}
          {activeSegment.hasFactCheck && activeSegment.factCheckData && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-600/60 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-rose-800/40 pb-2">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-300 text-xs">
                    Live Verified Fact-Check: {activeSegment.factCheckData.verdict}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-900/60 text-rose-200 border border-rose-700/60">
                  {activeSegment.timestamp}
                </span>
              </div>

              <p className="text-xs text-rose-200 italic font-medium">
                “{activeSegment.factCheckData.claimQuote}”
              </p>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-2 text-slate-300">
                <div>
                  <strong className="text-emerald-400 block text-[10px] uppercase">Official Baseline Data:</strong>
                  {activeSegment.factCheckData.officialBaselineStat}
                </div>
                <div>
                  <strong className="text-purple-300 block text-[10px] uppercase">Empirical Context:</strong>
                  {activeSegment.factCheckData.empiricalEvidence}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-2xs text-slate-400">
                  <span>Source: <strong className="text-slate-200">{activeSegment.factCheckData.sourceAgency}</strong></span>
                  <span className="text-emerald-400 font-semibold">{activeSegment.factCheckData.constitutionalCitation.split("-")[0]}</span>
                </div>
              </div>

              {/* Audit in Policy Tool Action */}
              {onAuditClaim && (
                <button
                  onClick={() => onAuditClaim(activeSegment.factCheckData!.claimQuote, "Economic Growth & Productivity")}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Audit This Claim in 13-Point Policy Tool</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Synchronized Interactive Transcript (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-slate-50 flex flex-col justify-between space-y-4 max-h-[640px]">
          {/* Transcript Filter & Search Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">Interactive Transcript</h4>
              </div>
              <label className="flex items-center space-x-1.5 text-2xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Auto-follow</span>
              </label>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transcript or claims..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-1.5 text-2xs">
              {["all", "Incumbent", "Opposition", "Third-Party", "Moderator"].map((role) => (
                <button
                  key={role}
                  onClick={() => setFilterSpeaker(role)}
                  className={`px-2 py-1 rounded-md font-semibold border transition-all ${
                    filterSpeaker === role
                      ? "bg-slate-900 text-white border-slate-900 font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {role === "all" ? "All Speakers" : role}
                </button>
              ))}

              <button
                onClick={() => setFilterFactCheckOnly(!filterFactCheckOnly)}
                className={`px-2 py-1 rounded-md font-semibold border transition-all flex items-center gap-1 ${
                  filterFactCheckOnly
                    ? "bg-rose-600 text-white border-rose-600 font-bold"
                    : "bg-white text-rose-700 border-rose-200 hover:bg-rose-50"
                }`}
              >
                <ShieldAlert className="w-3 h-3" />
                <span>Fact-Checked Only</span>
              </button>
            </div>
          </div>

          {/* Transcript Scroll Area */}
          <div 
            ref={transcriptContainerRef}
            className="overflow-y-auto space-y-3 pr-1.5 flex-1 min-h-[360px]"
          >
            {filteredTranscript.map((seg) => {
              const isActive = activeSegment.id === seg.id;
              return (
                <div
                  key={seg.id}
                  ref={isActive ? activeEntryRef : null}
                  onClick={() => handleSeek(seg.timestampSeconds)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isActive
                      ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${seg.avatarColor}`} />
                      <span className="font-bold text-slate-900 text-xs">{seg.speaker}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {seg.hasFactCheck && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          Fact-Check
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {seg.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isActive ? "text-slate-900 font-semibold" : "text-slate-600"}`}>
                    {seg.text}
                  </p>

                  {seg.hasFactCheck && seg.factCheckData && (
                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-2xs text-rose-700 font-semibold">
                      <span>Verdict: {seg.factCheckData.verdict}</span>
                      <span className="text-blue-600 hover:underline flex items-center gap-0.5">
                        <span>View Evidence</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Transcript Footer Info */}
          <div className="pt-2 border-t border-slate-200 text-2xs text-slate-500 flex items-center justify-between">
            <span>{filteredTranscript.length} segments indexed</span>
            <span className="font-semibold text-emerald-700">Click any card to jump playback</span>
          </div>
        </div>
      </div>
    </div>
  );
};
