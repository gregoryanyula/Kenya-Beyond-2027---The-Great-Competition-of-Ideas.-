import React, { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Volume2, 
  AlertCircle, 
  Check, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PolicyVoiceCommandListenerProps {
  onVoiceAudit: (policyQuery: string, shouldAutoSubmit?: boolean) => void;
  isEvaluating?: boolean;
}

export const PolicyVoiceCommandListener: React.FC<PolicyVoiceCommandListenerProps> = ({
  onVoiceAudit,
  isEvaluating = false
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [detectedCommand, setDetectedCommand] = useState<{ action: "search" | "audit"; target: string } | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
        setTranscript("");
        setDetectedCommand(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }

        setTranscript(currentTranscript);
        parseVoiceCommand(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setSpeechError("Microphone access denied. Please allow microphone permissions in your browser.");
        } else if (event.error === "no-speech") {
          setSpeechError("No speech detected. Please try saying: 'Audit Universal Healthcare' or 'Search for Youth Digital Hubs'.");
        } else {
          setSpeechError(`Voice error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.error("Speech recognition initialization failed:", e);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const parseVoiceCommand = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    const lower = cleanText.toLowerCase();

    // Match patterns like "audit [policy]", "evaluate [policy]", "check [policy]"
    const auditRegex = /^(?:please\s+)?(?:audit|evaluate|scrutinize|analyze|check|assess)\s+(?:the\s+)?(?:policy\s+on\s+|policy\s+for\s+|policy\s+)?(.+)$/i;
    // Match patterns like "search for [policy]", "search [policy]", "find [policy]"
    const searchRegex = /^(?:please\s+)?(?:search\s+for|search|find|look\s+up|lookup)\s+(?:the\s+)?(?:policy\s+on\s+|policy\s+for\s+|policy\s+)?(.+)$/i;

    let targetPolicy = "";
    let actionType: "search" | "audit" = "audit";

    const auditMatch = lower.match(auditRegex);
    const searchMatch = lower.match(searchRegex);

    if (auditMatch && auditMatch[1]) {
      targetPolicy = auditMatch[1].trim();
      actionType = "audit";
    } else if (searchMatch && searchMatch[1]) {
      targetPolicy = searchMatch[1].trim();
      actionType = "search";
    } else {
      // If user says directly a phrase, treat as search/audit query
      targetPolicy = cleanText;
      actionType = "audit";
    }

    // Clean any trailing punctuation
    targetPolicy = targetPolicy.replace(/[?.!]+$/, "").trim();

    if (targetPolicy.length > 2) {
      setDetectedCommand({
        action: actionType,
        target: targetPolicy
      });
    }
  };

  const handleToggleListening = () => {
    if (!isSupported) {
      setSpeechError("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      setSpeechError(null);
      setTranscript("");
      setDetectedCommand(null);
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error("Failed to start voice recognition:", err);
      }
    }
  };

  const handleExecuteDetectedCommand = () => {
    if (!detectedCommand) return;
    onVoiceAudit(detectedCommand.target, detectedCommand.action === "audit");
    setIsListening(false);
    setTranscript("");
    setDetectedCommand(null);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Voice Trigger Button */}
      <button
        type="button"
        onClick={handleToggleListening}
        disabled={isEvaluating}
        className={`relative inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
          isListening
            ? "bg-rose-600 text-white animate-pulse shadow-md shadow-rose-200"
            : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
        } ${isEvaluating ? "opacity-50 cursor-not-allowed" : ""}`}
        title={isListening ? "Listening... Click to stop" : "Speak voice command: 'Audit [Policy]' or 'Search for [Policy]'"}
        id="policy-voice-command-btn"
      >
        {isListening ? (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>Listening...</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Voice Command</span>
          </>
        )}
      </button>

      {/* Floating Active Voice Listening HUD */}
      <AnimatePresence>
        {(isListening || transcript || speechError) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 z-50 w-80 sm:w-96 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 text-xs space-y-3"
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${isListening ? "bg-rose-500/20 text-rose-400 animate-pulse" : "bg-slate-800 text-emerald-400"}`}>
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">
                    {isListening ? "Voice Command Listener Active" : "Voice Command Captured"}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Try: &quot;Audit Universal Healthcare&quot; or &quot;Search for Housing Levy&quot;
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isListening && recognitionRef.current) {
                    recognitionRef.current.stop();
                  }
                  setIsListening(false);
                  setTranscript("");
                  setSpeechError(null);
                  setDetectedCommand(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Audio Waveform Simulation */}
            {isListening && (
              <div className="flex items-center justify-center space-x-1 py-1.5 bg-slate-800/60 rounded-lg">
                {[12, 24, 16, 32, 20, 28, 14, 26, 18, 30].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, h, 8] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.06
                    }}
                    className="w-1 bg-emerald-400 rounded-full"
                  />
                ))}
              </div>
            )}

            {/* Transcript Preview */}
            {transcript && (
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Heard:</div>
                <div className="text-slate-200 font-medium italic text-xs">&quot;{transcript}&quot;</div>
              </div>
            )}

            {/* Detected Intent & Action */}
            {detectedCommand && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-emerald-300 font-bold text-2xs">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    Detected Action: {detectedCommand.action.toUpperCase()}
                  </span>
                  <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[10px] text-emerald-100">
                    Ready
                  </span>
                </div>

                <div className="text-xs text-white font-semibold">
                  Target: <span className="text-amber-300 font-bold font-mono">&quot;{detectedCommand.target}&quot;</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleExecuteDetectedCommand}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Run Policy Audit Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error Display */}
            {speechError && (
              <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-700/50 text-rose-200 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-2xs leading-relaxed">{speechError}</div>
              </div>
            )}

            {/* Quick Command Suggestions */}
            <div className="pt-1 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1.5 font-bold uppercase tracking-wider">
                Quick Voice Shortcuts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Audit Universal Healthcare",
                  "Search for Youth Digital Hubs",
                  "Audit Devolution Revenue Share",
                  "Search Fertilizer Subsidies"
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      parseVoiceCommand(sample);
                      onVoiceAudit(sample.replace(/^(Audit|Search for)\s+/i, ""), true);
                      setIsListening(false);
                    }}
                    className="text-[10px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-md transition-colors cursor-pointer border border-slate-700"
                  >
                    &quot;{sample}&quot;
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
