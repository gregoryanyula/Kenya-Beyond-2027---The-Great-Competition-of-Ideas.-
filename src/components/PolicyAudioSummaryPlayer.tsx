import React, { useState, useEffect, useRef } from "react";
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Languages, 
  Sparkles, 
  Loader2, 
  Headphones,
  Download,
  Share2,
  Check
} from "lucide-react";
import { PolicyAudioSummary } from "../types";
import { CivicAudioWaveformVisualizer } from "./CivicAudioWaveformVisualizer";

interface PolicyAudioSummaryPlayerProps {
  policyTitle: string;
  domain: string;
  summaryText: string;
  initialLanguage?: "en" | "sw";
}

export const PolicyAudioSummaryPlayer: React.FC<PolicyAudioSummaryPlayerProps> = ({
  policyTitle,
  domain,
  summaryText,
  initialLanguage = "en"
}) => {
  const [language, setLanguage] = useState<"en" | "sw">(initialLanguage);
  const [audioSummary, setAudioSummary] = useState<PolicyAudioSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Web Speech API reference for natural speech playback
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate localized audio script whenever policy or language changes
  const fetchAudioSummary = async (targetLang: "en" | "sw") => {
    setIsLoading(true);
    stopPlayback();

    try {
      const response = await fetch("/api/generate-audio-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policyTitle,
          domain,
          summaryText,
          language: targetLang
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate localized audio script");
      }

      const data = await response.json();
      setAudioSummary(data.result);
    } catch (err) {
      console.warn("Audio summary generation error:", err);
      // Fallback script if network fails
      const fallbackScript = targetLang === "sw"
        ? `Muhtasari wa Sera: ${policyTitle}. Kulingana na Ibara ya 201 ya Katiba ya Kenya, sera hii inachunguzwa kuhusu uwazi na athari ya kifedha. Matokeo makuu: ${summaryText.slice(0, 150)}... Panga na upige kura kwa misingi ya mipango ya wazi, si maneno tupu.`
        : `Policy Audio Brief: ${policyTitle}. Under Article 201 of Kenya's Constitution, this policy is audited for transparency and public impact. Key takeaways: ${summaryText.slice(0, 150)}... Scrutinize the plan before the 2027 ballot.`;

      setAudioSummary({
        language: targetLang,
        audioScript: fallbackScript,
        durationSeconds: 30,
        swahiliTitle: targetLang === "sw" ? "Muhtasari wa Sera ya Sauti (Kiswahili)" : "Policy Audio Brief (English)",
        takeawayBullets: [
          targetLang === "sw" ? "Uchambuzi wa uhalisia wa bajeti" : "Fiscal feasibility check",
          targetLang === "sw" ? "Uzingatiaji wa Katiba Ibara ya 201" : "Article 201 constitutional check"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAudioSummary(language);
    return () => {
      stopPlayback();
    };
  }, [policyTitle, domain]);

  const handleLanguageChange = (newLang: "en" | "sw") => {
    if (newLang === language) return;
    setLanguage(newLang);
    fetchAudioSummary(newLang);
  };

  const stopPlayback = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setPlaybackProgress(0);
  };

  const handleTogglePlay = () => {
    if (!audioSummary || !audioSummary.audioScript) return;

    if (isPlaying) {
      stopPlayback();
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert("Browser speech synthesis not supported on this device. You can still read the transcript below!");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(audioSummary.audioScript);
    utteranceRef.current = utterance;

    // Set voice properties & language code
    if (language === "sw") {
      utterance.lang = "sw-KE"; // Swahili Kenyan
    } else {
      utterance.lang = "en-KE"; // English Kenyan or en-GB fallback
    }

    utterance.rate = 0.95; // Clear civic cadence
    utterance.pitch = 1.0;

    const estimatedDuration = audioSummary.durationSeconds || 30;
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(100, Math.round((elapsed / estimatedDuration) * 100));
      setPlaybackProgress(progress);
    }, 200);

    utterance.onend = () => {
      stopPlayback();
      setPlaybackProgress(100);
    };

    utterance.onerror = () => {
      stopPlayback();
    };

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyTranscript = () => {
    if (!audioSummary?.audioScript) return;
    navigator.clipboard.writeText(audioSummary.audioScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-sm" id="policy-audio-brief">
      {/* Header & Language Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{language === "sw" ? "Muhtasari wa Sauti (Audio Brief)" : "Policy Audio Brief"}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                Accessible TTS
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">
              {language === "sw" ? "Uchambuzi wa haraka kwa lugha ya Kiswahili fasaha" : "Mobile-first 45s audio summary in English & Kiswahili"}
            </p>
          </div>
        </div>

        {/* Language Switcher Buttons */}
        <div className="flex items-center space-x-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => handleLanguageChange("en")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              language === "en"
                ? "bg-slate-900 text-emerald-400 shadow-xs border border-emerald-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("sw")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
              language === "sw"
                ? "bg-slate-900 text-emerald-400 shadow-xs border border-emerald-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Kiswahili
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-6 flex items-center justify-center space-x-2 text-slate-400 text-xs">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          <span>{language === "sw" ? "Inatayarisha muhtasari wa Kiswahili..." : "Synthesizing civic audio brief..."}</span>
        </div>
      ) : audioSummary ? (
        <div className="space-y-3.5">
          {/* Audio Player Controls & Progress */}
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center space-x-3">
            <button
              onClick={handleTogglePlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                isPlaying
                  ? "bg-rose-600 text-white hover:bg-rose-500"
                  : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold"
              }`}
              title={isPlaying ? "Pause Audio" : "Play Audio Brief"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-mono text-emerald-400">
                  {isPlaying ? "Playing Brief..." : "Ready to Listen"}
                </span>
                <span className="font-mono">
                  ~{audioSummary.durationSeconds || 35}s Duration
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-200 rounded-full"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
            </div>

            <button
              onClick={stopPlayback}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset Audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Real-Time Waveform Visualizer */}
          <CivicAudioWaveformVisualizer
            isPlaying={isPlaying}
            barCount={32}
            height={32}
            colorTheme="emerald"
            showDecibelMeter={true}
            label={language === "sw" ? "Sauti ya Redio ya Wananchi" : "Civic Audio Feed"}
          />

          {/* Key Audio Takeaways */}
          {audioSummary.takeawayBullets && audioSummary.takeawayBullets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {audioSummary.takeawayBullets.map((bullet, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-800/60 border border-slate-750 text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          )}

          {/* Transcript Viewer / Collapsible */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                {language === "sw" ? "Nakala ya Sauti (Script):" : "Voice Script Transcript:"}
              </span>
              <button
                onClick={handleCopyTranscript}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy Script"}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
              "{audioSummary.audioScript}"
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
