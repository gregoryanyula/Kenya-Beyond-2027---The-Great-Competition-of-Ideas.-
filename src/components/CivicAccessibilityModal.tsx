import React, { useState } from "react";
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  Sparkles, 
  X, 
  RotateCcw, 
  Check, 
  Sliders, 
  Type, 
  Play,
  Square,
  Moon,
  Sun,
  Radio,
  Globe2,
  Mic,
  Settings2,
  CheckCircle2,
  Layers
} from "lucide-react";
import { useCivicAccessibility } from "../context/CivicAccessibilityContext";
import { CivicAudioWaveformVisualizer } from "./CivicAudioWaveformVisualizer";

export const CivicAccessibilityModal: React.FC = () => {
  const {
    settings,
    updateSetting,
    resetSettings,
    isAccessibilityModalOpen,
    setIsAccessibilityModalOpen,
    speakText,
    stopSpeaking,
    isSpeaking,
    currentlyReading,
    availableVoices
  } = useCivicAccessibility();

  const [activeSubTab, setActiveSubTab] = useState<"voice" | "display" | "keyboard">("voice");
  const [testPhrase, setTestPhrase] = useState<string>(
    "Welcome to Kenya 2027. Evaluating leadership through evidence, real costing, and Kenya 2060 outcomes under Article 201 of the Constitution."
  );

  if (!isAccessibilityModalOpen) return null;

  const samplePhrases = [
    { label: "General Intro", text: "Welcome to Kenya 2027. Evaluating leadership through evidence, real costing, and Kenya 2060 outcomes under Article 201 of the Constitution." },
    { label: "Article 201 Scrutiny", text: "Article 201 requires openness, accountability, and public participation in all financial matters, ensuring public debt is borne equitably." },
    { label: "Devolution & Counties", text: "Devolution empowers all 47 counties through equitable revenue share allocations and County Assembly oversight." },
    { label: "Kiswahili / Katiba", text: "Ibara ya 201 ya Katiba ya Kenya inalinda uwazi, uwajibikaji, na usawa wa vizazi katika matumizi ya fedha za umma." }
  ];

  const speechAccents = [
    {
      id: "en-KE" as const,
      label: "Kenyan English",
      badge: "Local Accent",
      flag: "🇰🇪",
      description: "Optimized for Kenyan public policy terminology, devolution terms, and county names."
    },
    {
      id: "neutral" as const,
      label: "Neutral English",
      badge: "International",
      flag: "🌐",
      description: "Standard international synthetic speech with balanced neutral pitch."
    },
    {
      id: "en-GB" as const,
      label: "British Commonwealth",
      badge: "Parliamentary",
      flag: "🇬🇧",
      description: "Clear Commonwealth parliamentary cadence with formal enunciations."
    },
    {
      id: "sw-KE" as const,
      label: "Kiswahili Sanifu",
      badge: "Lugha ya Taifa",
      flag: "🇰🇪",
      description: "Matamshi sanifu ya Kiswahili kwa miongozo na mijadala ya kiraia."
    }
  ];

  const speechRateOptions = [
    { value: 0.75, label: "0.75x (Gentle)" },
    { value: 1.0, label: "1.0x (Normal)" },
    { value: 1.25, label: "1.25x (Brisk)" },
    { value: 1.5, label: "1.5x (Fast)" }
  ];

  const handleTestPlay = () => {
    speakText(testPhrase);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-inner">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 id="accessibility-modal-title" className="text-base font-bold text-white flex items-center gap-2">
                Civic Accessibility & Voice Settings
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                  WCAG 2.1 AA+
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Personalize speech synthesis rate, Kenyan accents, visual contrast, and keyboard navigation.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setIsAccessibilityModalOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Accessibility Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Drawer Bar */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab("voice")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${
              activeSubTab === "voice"
                ? "bg-white text-emerald-700 border-emerald-600 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60"
            }`}
            id="tab-voice-accessibility"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Voice & Accessibility</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </button>

          <button
            onClick={() => setActiveSubTab("display")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${
              activeSubTab === "display"
                ? "bg-white text-emerald-700 border-emerald-600 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60"
            }`}
            id="tab-display-contrast"
          >
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>Display & Theme</span>
          </button>

          <button
            onClick={() => setActiveSubTab("keyboard")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${
              activeSubTab === "keyboard"
                ? "bg-white text-emerald-700 border-emerald-600 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60"
            }`}
            id="tab-keyboard-controls"
          >
            <Keyboard className="w-4 h-4 text-emerald-600" />
            <span>Keyboard & Navigation</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1 text-slate-800 text-sm">
          
          {/* ================= TAB 1: VOICE & SPEECH SYNTHESIS ================= */}
          {activeSubTab === "voice" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Text-to-Speech Master Enable Toggle */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Text-to-Speech Narration for All Content</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800">
                      TTS Engine
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automatically narrates policy audits, parliamentary timelines, debate transcripts, and quiz questions using browser speech synthesis.
                  </p>
                </div>
                <button
                  onClick={() => updateSetting("textToSpeechEnabled", !settings.textToSpeechEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.textToSpeechEnabled ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  role="switch"
                  aria-checked={settings.textToSpeechEnabled}
                  id="tts-master-toggle"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      settings.textToSpeechEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Accent & Dialect Selection Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-emerald-600" />
                    <label className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Speech Accent & Pronunciation Dialect
                    </label>
                  </div>
                  <span className="text-2xs text-slate-500 font-mono">
                    Selected: {settings.speechAccent || "en-KE"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {speechAccents.map((acc) => {
                    const isSelected = (settings.speechAccent || "en-KE") === acc.id;
                    return (
                      <button
                        key={acc.id}
                        onClick={() => {
                          updateSetting("speechAccent", acc.id);
                          if (isSpeaking) {
                            stopSpeaking();
                          }
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between gap-2 ${
                          isSelected
                            ? "bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{acc.flag}</span>
                            <span className="font-bold text-slate-900 text-xs">{acc.label}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            {acc.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {acc.description}
                        </p>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active Audio Profile</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Speech Rate Controls */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Narration Speed (Speech Rate)
                    </span>
                  </div>
                  <span className="font-mono text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded">
                    {settings.speechRate}x Playback
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {speechRateOptions.map((opt) => {
                    const isSelected = settings.speechRate === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => updateSetting("speechRate", opt.value)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <span className="text-2xs text-slate-500 font-medium shrink-0">Fine Slider:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.05"
                    value={settings.speechRate}
                    onChange={(e) => updateSetting("speechRate", parseFloat(e.target.value))}
                    className="flex-1 accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-2xs font-mono text-slate-600 font-bold w-10 text-right">
                    {settings.speechRate.toFixed(2)}x
                  </span>
                </div>
              </div>

              {/* Pitch & Browser Voices List (Advanced Options) */}
              {availableVoices.length > 0 && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-700 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Specific Browser Voice Engine ({availableVoices.length} detected)</span>
                    </span>
                    {settings.speechVoiceName && (
                      <button
                        onClick={() => updateSetting("speechVoiceName", undefined)}
                        className="text-2xs text-emerald-600 hover:underline font-normal"
                      >
                        Reset to Auto-Accent
                      </button>
                    )}
                  </div>
                  <select
                    value={settings.speechVoiceName || ""}
                    onChange={(e) => updateSetting("speechVoiceName", e.target.value || undefined)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="">Auto-Selected by Accent ({settings.speechAccent || "en-KE"})</option>
                    {availableVoices.map((v, i) => (
                      <option key={i} value={v.name}>
                        {v.name} ({v.lang}) {v.default ? "— [System Default]" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Live Test Audition Studio & Waveform Visualizer */}
              <div className="p-4 rounded-xl border-2 border-emerald-500/40 bg-slate-900 text-white space-y-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="font-bold text-sm text-white">Live Voice & Waveform Audition</span>
                  </div>
                  
                  {/* Preset Phrase Selector */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {samplePhrases.map((phrase, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setTestPhrase(phrase.text);
                          if (isSpeaking) {
                            stopSpeaking();
                          }
                        }}
                        className={`text-[10px] px-2 py-1 rounded-md whitespace-nowrap transition-colors ${
                          testPhrase === phrase.text
                            ? "bg-emerald-600 text-white font-bold"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {phrase.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-slate-200 leading-relaxed font-sans">
                  "{testPhrase}"
                </div>

                {/* Audio Controls & Active Waveform Visualizer */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {isSpeaking ? (
                        <button
                          onClick={stopSpeaking}
                          className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                          id="stop-tts-preview-btn"
                        >
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Stop Voice</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleTestPlay}
                          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-xs hover:scale-102"
                          id="play-tts-preview-btn"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Test Narration</span>
                        </button>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono text-right">
                      {isSpeaking ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          Speaking at {settings.speechRate}x ({settings.speechAccent || "en-KE"})
                        </span>
                      ) : (
                        <span>Ready to Synthesize</span>
                      )}
                    </div>
                  </div>

                  {/* Responsive Waveform Visualizer Component */}
                  <CivicAudioWaveformVisualizer
                    isPlaying={isSpeaking}
                    barCount={32}
                    height={32}
                    colorTheme="emerald"
                    showDecibelMeter={true}
                    label="Waveform Visualizer"
                    className="mt-2 border-slate-700"
                  />
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: DISPLAY & CONTRAST ================= */}
          {activeSubTab === "display" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Global Dark Mode Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {settings.darkMode ? <Moon className="w-4 h-4 text-emerald-600" /> : <Sun className="w-4 h-4 text-amber-500" />}
                    <span className="font-bold text-slate-900">Dark Mode (Eye-Safe Night Theme)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-200 text-slate-700">
                      Global
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Applies an eye-safe, high-contrast dark theme across all policy dashboards, audit tools, and transcripts for comfortable reading during night sessions.
                  </p>
                </div>
                <button
                  onClick={() => updateSetting("darkMode", !settings.darkMode)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.darkMode ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  role="switch"
                  aria-checked={settings.darkMode}
                  id="accessibility-modal-darkmode-toggle"
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      settings.darkMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* High Contrast Mode Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">High-Contrast & Ultra-Sharp Mode</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-200 text-slate-700">
                      AAA
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Elevates text contrast, emphasizes borders, and optimizes color schemes for low-vision readers and bright sunlight environments.
                  </p>
                </div>
                <button
                  onClick={() => updateSetting("highContrast", !settings.highContrast)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.highContrast ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  role="switch"
                  aria-checked={settings.highContrast}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      settings.highContrast ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Font Scaling Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Typography Scale</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    {settings.fontSize === "normal" ? "Standard (100%)" : settings.fontSize === "large" ? "Large (115%)" : "Extra Large (130%)"}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateSetting("fontSize", "normal")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border text-center transition-all ${
                      settings.fontSize === "normal"
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Standard (Aa)
                  </button>
                  <button
                    onClick={() => updateSetting("fontSize", "large")}
                    className={`py-2.5 px-3 rounded-lg text-sm font-bold border text-center transition-all ${
                      settings.fontSize === "large"
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Large (Aa)
                  </button>
                  <button
                    onClick={() => updateSetting("fontSize", "xlarge")}
                    className={`py-2.5 px-3 rounded-lg text-base font-bold border text-center transition-all ${
                      settings.fontSize === "xlarge"
                        ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Extra Large (Aa)
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: KEYBOARD & MOTOR ================= */}
          {activeSubTab === "keyboard" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Keyboard Navigation & Focus Rings Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Keyboard className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-slate-900">Enhanced Keyboard Focus Rings</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Highlights active interactive buttons and inputs with high-visibility 3px focus rings for accessible tab navigation.
                    </p>
                  </div>
                  <button
                    onClick={() => updateSetting("keyboardFocusRings", !settings.keyboardFocusRings)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      settings.keyboardFocusRings ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                    role="switch"
                    aria-checked={settings.keyboardFocusRings}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        settings.keyboardFocusRings ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900">Reduce Motion & Animations</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Minimizes decorative animations, pulses, and transitions for users with vestibular sensitivity or motion preferences.
                  </p>
                </div>
                <button
                  onClick={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    settings.reducedMotion ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      settings.reducedMotion ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Keyboard Shortcuts Reference Table */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Interactive Keyboard Shortcuts:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Global Search</span>
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800 shadow-2xs">
                      Ctrl + K
                    </kbd>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Watchlist</span>
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800 shadow-2xs">
                      W
                    </kbd>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Civic Glossary</span>
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800 shadow-2xs">
                      ?
                    </kbd>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Switch Lang</span>
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800 shadow-2xs">
                      L
                    </kbd>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Close Modals</span>
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800 shadow-2xs">
                      Esc
                    </kbd>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Nav Tabs</span>
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800 shadow-2xs">
                      1 - 9
                    </kbd>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={resetSettings}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Defaults</span>
          </button>

          <button
            onClick={() => {
              stopSpeaking();
              setIsAccessibilityModalOpen(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Save & Apply Settings
          </button>
        </div>

      </div>
    </div>
  );
};
