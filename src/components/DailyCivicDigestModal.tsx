import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Languages,
  X,
  Share2,
  Check,
  Calendar,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Bookmark,
  RefreshCw,
  Award,
  Layers,
  MessageSquare
} from "lucide-react";
import { DailyCivicDigest, DailyCivicDigestHighlight } from "../types";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";
import { CivicAudioWaveformVisualizer } from "./CivicAudioWaveformVisualizer";

interface DailyCivicDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPolicyForAudit?: (claimText: string, domain: string) => void;
}

export const DailyCivicDigestModal: React.FC<DailyCivicDigestModalProps> = ({
  isOpen,
  onClose,
  onSelectPolicyForAudit
}) => {
  const { watchlist } = useCivicWatchlist();
  const [digest, setDigest] = useState<DailyCivicDigest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDigest = async (lang: "en" | "sw") => {
    setIsLoading(true);
    stopAudio();

    try {
      const response = await fetch("/api/daily-civic-digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          watchlistItems: watchlist,
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch daily civic digest");
      }

      const data = await response.json();
      setDigest(data.result);
    } catch (err) {
      console.error("Error loading daily digest:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDigest(language);
    } else {
      stopAudio();
    }
  }, [isOpen, watchlist.length]);

  const handleLanguageToggle = (newLang: "en" | "sw") => {
    if (newLang === language) return;
    setLanguage(newLang);
    fetchDigest(newLang);
  };

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  const handleToggleAudio = () => {
    if (!digest || !digest.audioBroadcastScript) return;

    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    if (!("speechSynthesis" in window)) {
      alert("Browser speech synthesis not supported on this device.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(digest.audioBroadcastScript);
    utteranceRef.current = utterance;

    utterance.lang = language === "sw" ? "sw-KE" : "en-KE";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const estimatedDuration = 45; // seconds
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(100, Math.round((elapsed / estimatedDuration) * 100));
      setAudioProgress(progress);
    }, 250);

    utterance.onend = () => {
      stopAudio();
      setAudioProgress(100);
    };

    utterance.onerror = () => {
      stopAudio();
    };

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyDigest = () => {
    if (!digest) return;
    const textToCopy = `🇰🇪 KENYA 2027 DAILY CIVIC DIGEST (${digest.digestDate})
${digest.greetingTitle}

${digest.executiveSummary}

🔍 KEY TAILORED HIGHLIGHTS:
${digest.tailoredHighlights.map(h => `• [${h.domain}] ${h.title}\n  Verdict: ${h.factCheckVerdict}\n  Town Hall Question: "${h.citizenTownHallQuestion}"`).join("\n\n")}

🚨 ARTICLE 201 CONSTITUTIONAL ALERT:
${digest.criticalArticle201Alert.title} - ${digest.criticalArticle201Alert.description}

💡 TODAY'S CIVIC TIP:
${digest.todaysCivicTip}

Audited on Kenya 2027: The Great Competition of Ideas. Usitupatie slogan, tupatie plan!`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getVerdictBadgeStyle = (verdict: string) => {
    switch (verdict) {
      case "Verified True":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Misleading / Uncosted":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Contradicted by Official Data":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "Article 201 Flag":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="civic-digest-title"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="civic-digest-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Daily Civic Intelligence Digest
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Gemini AI Powered
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{digest?.digestDate || new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                {watchlist.length > 0 && (
                  <span className="text-emerald-400 font-medium">
                    • Tailored to {watchlist.length} saved topic{watchlist.length > 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => handleLanguageToggle("en")}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  language === "en" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageToggle("sw")}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                  language === "sw" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                SW
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Daily Civic Digest"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1 text-slate-800">
          {isLoading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">Synthesizing Today's Civic Intelligence...</p>
                <p className="text-xs text-slate-500">
                  Cross-referencing your watched domains with official KNBS data, CBK debt bulletins, and Article 201 rules.
                </p>
              </div>
            </div>
          ) : digest ? (
            <>
              {/* Executive Morning Brief Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                    Morning Briefing
                  </span>
                  <button
                    onClick={() => fetchDigest(language)}
                    className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
                    title="Refresh Digest"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {digest.greetingTitle}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {digest.executiveSummary}
                </p>
              </div>

              {/* Audio Radio Broadcast Player with Waveform Visualizer */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>50-Second Morning Civic Audio Broadcast</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {language === "sw" ? "Kiswahili" : "English Audio"}
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Listen to today's essential manifesto scrutinies on your morning commute
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleAudio}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                      isPlayingAudio
                        ? "bg-rose-600 text-white hover:bg-rose-700"
                        : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        <span>Play Broadcast</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Real-time Waveform Audio Visualizer */}
                <CivicAudioWaveformVisualizer
                  isPlaying={isPlayingAudio}
                  barCount={36}
                  height={32}
                  colorTheme="emerald"
                  showDecibelMeter={true}
                  label={language === "sw" ? "Sauti ya Redio ya Wananchi" : "Radio Broadcast Waveform"}
                />

                {/* Progress bar */}
                {isPlayingAudio && (
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-200"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Tailored Highlights Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Tailored Scrutiny Highlights ({digest.tailoredHighlights?.length || 0})
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500">
                    Cross-referenced with KNBS & CBK data
                  </span>
                </div>

                <div className="space-y-3">
                  {digest.tailoredHighlights?.map((item: DailyCivicDigestHighlight, idx: number) => (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-mono">
                            {item.domain}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getVerdictBadgeStyle(item.factCheckVerdict)}`}>
                            {item.factCheckVerdict}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Source: {item.evidenceSource}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          <span className="font-semibold text-slate-800">Manifesto Pledge: </span>
                          {item.manifestoUpdate}
                        </p>
                      </div>

                      {/* Article 201 status pill */}
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-relaxed">
                          <strong className="text-slate-900">Article 201 Fiscal Note: </strong>
                          {item.article201Status}
                        </span>
                      </div>

                      {/* Citizen town hall question */}
                      <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Demanded Town Hall Question:</span>
                        </div>
                        <p className="italic text-[11px] text-emerald-950 font-medium">
                          "{item.citizenTownHallQuestion}"
                        </p>
                      </div>

                      {/* Action buttons */}
                      {onSelectPolicyForAudit && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={() => {
                              onSelectPolicyForAudit(item.manifestoUpdate || item.title, item.domain);
                              onClose();
                            }}
                            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline"
                          >
                            <span>Run 13-Point Audit on This Claim</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Article 201 Alert Box */}
              {digest.criticalArticle201Alert && (
                <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 space-y-2 text-amber-950">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                      Constitutional Article 201 Public Finance Watch
                    </h4>
                  </div>
                  <h5 className="text-sm font-bold text-amber-950">
                    {digest.criticalArticle201Alert.title}
                  </h5>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {digest.criticalArticle201Alert.description}
                  </p>
                  <div className="pt-1 text-[11px] text-amber-800 font-mono flex items-center justify-between border-t border-amber-200/80">
                    <span>{digest.criticalArticle201Alert.statutoryCitation}</span>
                    <span className="font-sans italic">{digest.criticalArticle201Alert.implication}</span>
                  </div>
                </div>
              )}

              {/* Today's Civic Tip */}
              {digest.todaysCivicTip && (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-slate-600">
                      Today's Civic Scrutiny Tip
                    </span>
                    <p className="text-xs text-slate-800 font-medium">
                      {digest.todaysCivicTip}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              Unable to load daily digest. Please check your internet connection.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={handleCopyDigest}
            disabled={!digest}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Share / Export Digest"}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
