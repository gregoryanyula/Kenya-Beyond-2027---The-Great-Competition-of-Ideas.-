import React from "react";
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  Sparkles, 
  X, 
  RotateCcw, 
  Check, 
  Zap, 
  Sliders, 
  Type, 
  ArrowRight,
  Play,
  Square
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
    isSpeaking
  } = useCivicAccessibility();

  if (!isAccessibilityModalOpen) return null;

  const testSpeechSample = () => {
    speakText("Welcome to Kenya 2027. Evaluating Leadership Through Evidence, Real Costing, and Kenya 2060 Outcomes under Article 201 of the Constitution.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-modal-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 id="accessibility-modal-title" className="text-base font-bold text-white flex items-center gap-2">
                Civic Accessibility Settings
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                  WCAG 2.1 AA+
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Tailor contrast, audio narration, and keyboard controls for inclusive civic scrutiny.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Accessibility Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1 text-slate-800 text-sm">
          
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
                className={`py-2 px-3 rounded-lg text-xs font-bold border text-center transition-all ${
                  settings.fontSize === "normal"
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Standard (Aa)
              </button>
              <button
                onClick={() => updateSetting("fontSize", "large")}
                className={`py-2 px-3 rounded-lg text-sm font-bold border text-center transition-all ${
                  settings.fontSize === "large"
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Large (Aa)
              </button>
              <button
                onClick={() => updateSetting("fontSize", "xlarge")}
                className={`py-2 px-3 rounded-lg text-base font-bold border text-center transition-all ${
                  settings.fontSize === "xlarge"
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Extra Large (Aa)
              </button>
            </div>
          </div>

          {/* Text-To-Speech (TTS) Engine Section */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">Text-to-Speech Narration for All Content</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Converts policy dossiers, debate transcripts, and quiz questions into spoken audio using browser speech synthesis.
                </p>
              </div>
              <button
                onClick={() => updateSetting("textToSpeechEnabled", !settings.textToSpeechEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  settings.textToSpeechEnabled ? "bg-emerald-600" : "bg-slate-300"
                }`}
                role="switch"
                aria-checked={settings.textToSpeechEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    settings.textToSpeechEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Speech Rate & Test Button */}
            <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-medium text-slate-600">Speed:</span>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.1"
                  value={settings.speechRate}
                  onChange={(e) => updateSetting("speechRate", parseFloat(e.target.value))}
                  className="w-24 accent-emerald-600"
                />
                <span className="font-mono text-slate-700 font-bold">{settings.speechRate}x</span>
              </div>

              <div className="flex items-center space-x-2">
                {isSpeaking ? (
                  <button
                    onClick={stopSpeaking}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-rose-700 transition-colors shadow-2xs"
                  >
                    <Square className="w-3 h-3 fill-current" />
                    <span>Stop Audio</span>
                  </button>
                ) : (
                  <button
                    onClick={testSpeechSample}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors shadow-2xs"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Test Voice Narration</span>
                  </button>
                )}
              </div>
            </div>

            {/* Waveform Audio Feedback */}
            <CivicAudioWaveformVisualizer
              isPlaying={isSpeaking}
              barCount={28}
              height={28}
              colorTheme="emerald"
              showDecibelMeter={true}
              label="Live Speech Synthesizer"
              className="mt-2"
            />
          </div>

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

            {/* Keyboard Shortcuts Reference Table */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                Quick Keyboard Shortcuts:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-1.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Global Search</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    Ctrl + K
                  </kbd>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Watchlist</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    W
                  </kbd>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Civic Glossary</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    ?
                  </kbd>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Close Modals</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    Esc
                  </kbd>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Next Section</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    Tab
                  </kbd>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Tab 1 to 8</span>
                  <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] font-bold text-slate-800">
                    1 - 8
                  </kbd>
                </div>
              </div>
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

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={resetSettings}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Defaults</span>
          </button>

          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
