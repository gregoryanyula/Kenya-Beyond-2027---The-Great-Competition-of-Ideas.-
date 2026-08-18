import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Calculator, 
  FileText, 
  PieChart, 
  Flame, 
  Lightbulb,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Radio,
  Play,
  Pause,
  Square,
  Eye,
  Trophy,
  Award,
  MessageSquareQuote,
  MapPin,
  Compass
} from "lucide-react";
import { 
  SLOGAN_TRANSLATORS, 
  CIVIC_LITERACY_MODULES, 
  YOUTH_EXPLAINER_SERIES_DATA 
} from "../data/civicLiteracyData";
import { PolicyLiteracyGame } from "./PolicyLiteracyGame";
import { KenyaRegionalPriorityMap } from "./KenyaRegionalPriorityMap";
import { CommunityAudioReflectionHub } from "./CommunityAudioReflectionHub";
import { CivicAchievementBadges } from "./CivicAchievementBadges";
import { CivicConstitutionQuiz } from "./CivicConstitutionQuiz";
import { CivicLeaderboard } from "./CivicLeaderboard";

export const YouthCivicLiteracyHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"explainers" | "leaderboard" | "badges" | "quiz" | "game" | "slogans" | "simulator" | "modules" | "regional-map" | "audio-reflections">("explainers");
  const [activeEpisodeId, setActiveEpisodeId] = useState(YOUTH_EXPLAINER_SERIES_DATA[0].id);
  const [activeModuleId, setActiveModuleId] = useState(CIVIC_LITERACY_MODULES[0].id);
  const [activeSloganId, setActiveSloganId] = useState(SLOGAN_TRANSLATORS[0].id);
  
  // Speech Synthesis Narration State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [playbackPitch, setPlaybackPitch] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [highLegibilityMode, setHighLegibilityMode] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load system voices for speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
        setAvailableVoices(englishVoices.length > 0 ? englishVoices : voices);
        if (!selectedVoiceURI && (englishVoices.length > 0 || voices.length > 0)) {
          setSelectedVoiceURI((englishVoices[0] || voices[0])?.voiceURI || "");
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop audio on tab/episode change
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  }, [activeEpisodeId, activeTab]);

  // Interactive Budget Simulator State (Total Target: KES 4,000 Billion / 4.0 Trillion)
  const [budgetAllocation, setBudgetAllocation] = useState({
    debtService: 1200, // Non-negotiable sovereign debt service
    education: 680,
    health: 160,
    devolutionCounties: 420,
    security: 380,
    infrastructureWater: 450,
    agriculture: 90,
    recurrentAdmin: 420,
    socialProtection: 60,
    contingencyFund: 140
  });

  const totalBudget = (Object.values(budgetAllocation) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
  const projectedRevenue = 3300; // KES 3.3 Trillion expected KRA tax revenue
  const fiscalDeficit = totalBudget - projectedRevenue;

  const handleBudgetChange = (key: keyof typeof budgetAllocation, value: number) => {
    setBudgetAllocation((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const activeEpisode = YOUTH_EXPLAINER_SERIES_DATA.find((e) => e.id === activeEpisodeId) || YOUTH_EXPLAINER_SERIES_DATA[0];
  const activeModule = CIVIC_LITERACY_MODULES.find((m) => m.id === activeModuleId) || CIVIC_LITERACY_MODULES[0];
  const activeSlogan = SLOGAN_TRANSLATORS.find((s) => s.id === activeSloganId) || SLOGAN_TRANSLATORS[0];

  const handlePlayAudio = () => {
    if (typeof window === "undefined" || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${activeEpisode.title}. ${activeEpisode.viralHook}. ${activeEpisode.audioVoiceoverScript}. The underlying economic reality: ${activeEpisode.theEconomicReality}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed;
    utterance.pitch = playbackPitch;

    if (selectedVoiceURI) {
      const voice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
      if (voice) utterance.voice = voice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };

  const handlePauseAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPausedAudio(true);
      }
    }
  };

  const handleResumeAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPausedAudio(false);
      } else {
        handlePlayAudio();
      }
    }
  };

  const handleStopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    }
  };

  const handleCopyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8" id="youth-civic-literacy-section">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-xs border-t-2 border-t-emerald-600">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>Youth & Citizen Political & Economic Literacy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              “Usitupatie Slogan. Tupatie Plan.”
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Democracy is not cheerleading for political personalities. It is understanding how your taxes are spent, how debt affects your future, and how to interrogate manifestos with constitutional and economic literacy.
            </p>
          </div>

          {/* Sub-nav tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800 rounded-lg border border-slate-700 shrink-0 self-start lg:self-center">
            <button
              onClick={() => setActiveTab("explainers")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "explainers"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>60s Voiceover Pod</span>
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "leaderboard"
                  ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                  : "text-amber-300 hover:text-white"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Civic Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "badges"
                  ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                  : "text-amber-300 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Civic Badges</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "quiz"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-300 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Katiba Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab("game")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "game"
                  ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                  : "text-amber-300 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Policy Mini-Game</span>
            </button>
            <button
              onClick={() => setActiveTab("slogans")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "slogans"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Slogan Translator</span>
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "simulator"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Budget Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab("modules")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "modules"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Art. 201 Modules</span>
            </button>
            <button
              onClick={() => setActiveTab("regional-map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "regional-map"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-blue-300 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Regional Map</span>
            </button>
            <button
              onClick={() => setActiveTab("audio-reflections")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "audio-reflections"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Voice Reflections</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 60-SECOND POLICY EXPLAINER SERIES (WITH ENHANCED SPEECH SYNTHESIS NARRATION) */}
      {activeTab === "explainers" && (
        <div className="space-y-6">
          {/* Episode Selectors */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Gen Z & Youth Audio Explainer Pod
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  60-Second Policy Breakdown Series
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono font-bold">
                Episode {activeEpisode.episodeNumber} of {YOUTH_EXPLAINER_SERIES_DATA.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {YOUTH_EXPLAINER_SERIES_DATA.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => {
                    handleStopAudio();
                    setActiveEpisodeId(ep.id);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                    activeEpisodeId === ep.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider opacity-70">
                      Ep. 0{ep.episodeNumber}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      activeEpisodeId === ep.id ? "bg-slate-800 text-emerald-400" : "bg-slate-200 text-slate-700"
                    }`}>
                      {ep.topic.split("&")[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-tight">
                    {ep.title}
                  </h4>
                </button>
              ))}
            </div>
          </div>

          {/* Active Episode Deep-Dive Card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            {/* Episode Title & Audio Narration Bar */}
            <div className="space-y-4 border-b border-slate-100 pb-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    {activeEpisode.topic}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    {activeEpisode.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setHighLegibilityMode(!highLegibilityMode)}
                    className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      highLegibilityMode ? "bg-blue-50 border-blue-300 text-blue-800" : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                    title="Toggle High Legibility Mode for Diverse Learners"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">High Legibility</span>
                  </button>

                  <button
                    onClick={() => handleCopyScript(activeEpisode.audioVoiceoverScript, activeEpisode.id)}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase"
                    title="Copy Voiceover Script"
                  >
                    {copiedId === activeEpisode.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === activeEpisode.id ? "Copied" : "Copy Script"}</span>
                  </button>
                </div>
              </div>

              {/* Accessible Speech Synthesis Player Toolbar */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    {/* Play / Pause / Resume / Stop Controls */}
                    {!isPlayingAudio ? (
                      <button
                        onClick={handlePlayAudio}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-xs"
                      >
                        <Play className="w-4 h-4" />
                        <span>Play 60s Voiceover</span>
                      </button>
                    ) : isPausedAudio ? (
                      <button
                        onClick={handleResumeAudio}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-xs"
                      >
                        <Play className="w-4 h-4" />
                        <span>Resume</span>
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseAudio}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-xs"
                      >
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </button>
                    )}

                    {isPlayingAudio && (
                      <button
                        onClick={handleStopAudio}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 text-xs font-bold transition-all border border-slate-700"
                        title="Stop Audio"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    )}

                    {/* Animated Audio Equalizer Waveform */}
                    {isPlayingAudio && !isPausedAudio && (
                      <div className="flex items-end space-x-1 h-5 px-2">
                        <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s] h-5" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.45s] h-4" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.2s] h-2" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-5" />
                      </div>
                    )}
                  </div>

                  {/* Playback Controls: Speed & Voice */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Speed Selector */}
                    <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                      {[0.75, 1.0, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => {
                            setPlaybackSpeed(spd);
                            if (isPlayingAudio) {
                              handleStopAudio();
                              setTimeout(handlePlayAudio, 100);
                            }
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                            playbackSpeed === spd
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Voice Selector */}
                    {availableVoices.length > 0 && (
                      <select
                        value={selectedVoiceURI}
                        onChange={(e) => {
                          setSelectedVoiceURI(e.target.value);
                          if (isPlayingAudio) {
                            handleStopAudio();
                            setTimeout(handlePlayAudio, 100);
                          }
                        }}
                        className="p-1 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-bold max-w-[140px] truncate focus:outline-none"
                      >
                        {availableVoices.map((v) => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            {v.name.slice(0, 20)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2">
                  <span>🎙️ Browser Speech Synthesis Engine (Multi-sensory accessibility for diverse learners)</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {isPlayingAudio ? (isPausedAudio ? "PAUSED" : "PLAYING NARRATION") : "READY TO LISTEN"}
                  </span>
                </div>
              </div>
            </div>

            {/* Viral Hook Banner */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <MessageSquareQuote className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block mb-0.5">
                  The Viral Reel / TikTok Hook:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed italic">
                  “{activeEpisode.viralHook}”
                </p>
              </div>
            </div>

            {/* Audio Script & Economic Reality Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Full Narration Script with Karaoke Highlighting */}
              <div className={`p-5 rounded-xl border border-slate-200 space-y-2 ${
                highLegibilityMode ? "bg-blue-50/40 text-sm font-serif" : "bg-slate-50 text-xs font-medium"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                    🎙️ 60-Second Radio / Pod Script:
                  </span>
                  {isPlayingAudio && (
                    <span className="text-[10px] text-emerald-700 font-mono font-bold animate-pulse">
                      ● Active Audio Voiceover
                    </span>
                  )}
                </div>
                <p className="text-slate-800 leading-relaxed">
                  {activeEpisode.audioVoiceoverScript}
                </p>
              </div>

              {/* Underlying Economic Reality */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block mb-1">
                    📊 The Underlying Economic Reality:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeEpisode.theEconomicReality}
                  </p>
                </div>

                {/* Shareable Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200">
                  {activeEpisode.shareableStats.map((st, sIdx) => (
                    <div key={sIdx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block truncate">{st.label}</span>
                      <span className="text-xs font-bold font-mono text-slate-900 block mt-0.5">{st.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Hard Questions for Candidates */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-900 text-slate-100 space-y-3">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  3 Hard Questions You Must Ask Any Candidate on This Issue:
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {activeEpisode.theThreeHardQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-3.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 block">Question {qIdx + 1}</span>
                    <p className="leading-relaxed font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slogan vs Plan Takeaway */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900 block mb-0.5">
                  The Slogan vs. Plan Takeaway:
                </span>
                <p className="text-emerald-950 leading-relaxed font-medium">
                  {activeEpisode.sloganVsPlanTakeaway}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KATIBA & POLICY LITERACY MINI-GAME */}
      {activeTab === "game" && (
        <PolicyLiteracyGame />
      )}

      {/* TAB 3: SLOGAN-TO-PLAN TRANSLATOR */}
      {activeTab === "slogans" && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 mb-1">
              <span>The Campaign Translator</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Translate Viral Campaign Slogans into 5 Real Policy Demands
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click on any common political rally slogan to see the hidden pitfalls and the 5 hard questions you must demand.
            </p>
          </div>

          {/* Slogan Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {SLOGAN_TRANSLATORS.map((slogan) => (
              <button
                key={slogan.id}
                onClick={() => setActiveSloganId(slogan.id)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold tracking-wide transition-all ${
                  activeSloganId === slogan.id
                    ? "bg-amber-500 text-slate-950 border-amber-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {slogan.slogan}
              </button>
            ))}
          </div>

          {/* Active Slogan Deep-Dive Card */}
          <div className="p-6 rounded-xl border border-amber-200 bg-amber-50/20 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                  {activeSlogan.commonContext}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeSlogan.slogan}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 shrink-0 self-start sm:self-center">
                Requires Scrutiny
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-1">The Populist Trap / Hidden Catch:</span>
                <p className="text-slate-800 leading-relaxed">
                  {activeSlogan.hiddenPitfall}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">The Real Policy Formulation:</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {activeSlogan.actionableCitizenDemand}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                5 Exact Accountability Questions for This Promise:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeSlogan.theFivePlanQuestions.map((demand, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 font-medium">{demand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE YOUTH BUDGET SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 mb-1">
              <span>Trade-off Engine</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Run the KES 4.0 Trillion National Budget
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Experience the brutal arithmetic of fiscal trade-offs. Increase one sector and watch the deficit or borrowing increase.
            </p>
          </div>

          {/* Budget Health Bar */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Planned Expenditure:</span>
                <span className="text-lg font-black font-mono">KES {totalBudget} Billion ({((totalBudget)/1000).toFixed(2)}T)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">KRA Tax Revenue:</span>
                <span className="text-lg font-black font-mono text-emerald-400">KES {projectedRevenue} Billion</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Fiscal Deficit (Borrowing Need):</span>
                <span className={`text-lg font-black font-mono ${fiscalDeficit > 700 ? "text-rose-400" : "text-amber-400"}`}>
                  KES {fiscalDeficit} Billion
                </span>
              </div>
            </div>

            {/* Deficit Warning */}
            <div className="text-[11px] bg-slate-800 p-2.5 rounded-lg border border-slate-700 text-slate-300">
              ⚠️ <strong>Debt Reality:</strong> Sovereign debt service (KES {budgetAllocation.debtService}B) is a first charge on the Consolidated Fund under Article 214 and cannot be cut without national default.
            </div>
          </div>

          {/* Interactive Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Education & HEF Capitation</span>
                <span className="font-mono text-blue-700">KES {budgetAllocation.education}B</span>
              </div>
              <input
                type="range"
                min="400"
                max="900"
                step="10"
                value={budgetAllocation.education}
                onChange={(e) => handleBudgetChange("education", Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">Funds primary, secondary free day capitation, and university scholarships.</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Universal Health & Primary Care</span>
                <span className="font-mono text-blue-700">KES {budgetAllocation.health}B</span>
              </div>
              <input
                type="range"
                min="100"
                max="350"
                step="10"
                value={budgetAllocation.health}
                onChange={(e) => handleBudgetChange("health", Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">Exchequer subsidy for indigent households and specialized national referral hospitals.</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Devolution County Equitable Share</span>
                <span className="font-mono text-blue-700">KES {budgetAllocation.devolutionCounties}B</span>
              </div>
              <input
                type="range"
                min="385"
                max="650"
                step="10"
                value={budgetAllocation.devolutionCounties}
                onChange={(e) => handleBudgetChange("devolutionCounties", Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">Transfers to 47 counties for local roads, dispensaries, agriculture, and water.</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Agriculture & Fertilizer Subsidies</span>
                <span className="font-mono text-blue-700">KES {budgetAllocation.agriculture}B</span>
              </div>
              <input
                type="range"
                min="50"
                max="180"
                step="5"
                value={budgetAllocation.agriculture}
                onChange={(e) => handleBudgetChange("agriculture", Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">Food security, strategic grain reserves, and farmer inputs.</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Recurrent Executive & Admin Spending</span>
                <span className="font-mono text-blue-700">KES {budgetAllocation.recurrentAdmin}B</span>
              </div>
              <input
                type="range"
                min="250"
                max="550"
                step="10"
                value={budgetAllocation.recurrentAdmin}
                onChange={(e) => handleBudgetChange("recurrentAdmin", Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">Government hospitality, foreign travel, office fleet, and ministry operations.</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>National Security & Defense</span>
                <span className="font-mono text-blue-700">KES {budgetAllocation.security}B</span>
              </div>
              <input
                type="range"
                min="280"
                max="480"
                step="10"
                value={budgetAllocation.security}
                onChange={(e) => handleBudgetChange("security", Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[10px] text-slate-500 block">KDF, National Police Service, and intelligence surveillance.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ARTICLE 201 CIVIC LITERACY MODULES */}
      {activeTab === "modules" && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 mb-1">
              <span>Constitutional Literacy Deep Dive</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Master the 5 Pillars of Constitutional Public Finance (Article 201)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Article 201 is the citizen’s constitutional shield against unsustainable debt, wasteful spending, and corrupt fiscal opacity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CIVIC_LITERACY_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                  activeModuleId === mod.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase opacity-70">
                    Pillar 0{idx + 1}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                    activeModuleId === mod.id ? "bg-slate-800 text-emerald-400" : "bg-slate-200 text-slate-700"
                  }`}>
                    {mod.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-tight">
                  {mod.title}
                </h4>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/40 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                  {activeModule.category}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeModule.title}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-800">
                Pillar {CIVIC_LITERACY_MODULES.findIndex((m) => m.id === activeModuleId) + 1} of {CIVIC_LITERACY_MODULES.length}
              </span>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                Key Principle:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-lg border border-slate-200">
                {activeModule.keyConcept}
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Detailed Breakdown & Constitutional Citations:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeModule.breakdownPoints.map((pt, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{pt.heading}</span>
                      {pt.articleCitation && (
                        <span className="text-[10px] font-bold font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {pt.articleCitation}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {pt.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs flex items-start space-x-3">
              <span className="text-lg">📢</span>
              <div>
                <span className="font-bold text-emerald-900 block mb-0.5">
                  Demand from Your Political Candidates:
                </span>
                <p className="text-emerald-950 font-medium">
                  {activeModule.actionQuestionForLeaders}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CIVIC LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <CivicLeaderboard />
      )}

      {/* TAB 8: CIVIC ENGAGEMENT BADGES & RECOGNITION */}
      {activeTab === "badges" && (
        <CivicAchievementBadges />
      )}

      {/* TAB 9: CONSTITUTION QUIZ & POLICY BRIDGE */}
      {activeTab === "quiz" && (
        <CivicConstitutionQuiz />
      )}

      {/* TAB 6: CROWDSOURCED REGIONAL PRIORITY MAP */}
      {activeTab === "regional-map" && (
        <KenyaRegionalPriorityMap />
      )}

      {/* TAB 7: COMMUNITY AUDIO REFLECTIONS & RECORDING STUDIO */}
      {activeTab === "audio-reflections" && (
        <CommunityAudioReflectionHub />
      )}
    </div>
  );
};
