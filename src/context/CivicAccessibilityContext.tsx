import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CivicAccessibilitySettings {
  darkMode: boolean;
  highContrast: boolean;
  contrastMode: "standard" | "high" | "maximum-mono";
  screenReaderFriendly: boolean;
  fontSize: "normal" | "large" | "xlarge";
  textToSpeechEnabled: boolean;
  keyboardFocusRings: boolean;
  reducedMotion: boolean;
  speechRate: number; // 0.5 to 2.0
  speechPitch: number; // 0.8 to 1.4
  speechAccent: "en-KE" | "neutral" | "en-GB" | "en-US" | "sw-KE";
  speechVoiceName?: string;
}

interface CivicAccessibilityContextType {
  settings: CivicAccessibilitySettings;
  updateSetting: <K extends keyof CivicAccessibilitySettings>(key: K, value: CivicAccessibilitySettings[K]) => void;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleScreenReaderFriendly: () => void;
  resetSettings: () => void;
  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (open: boolean) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  currentlyReading: string | null;
  availableVoices: SpeechSynthesisVoice[];
}

const DEFAULT_SETTINGS: CivicAccessibilitySettings = {
  darkMode: false,
  highContrast: false,
  contrastMode: "standard",
  screenReaderFriendly: true,
  fontSize: "normal",
  textToSpeechEnabled: false,
  keyboardFocusRings: true,
  reducedMotion: false,
  speechRate: 1.0,
  speechPitch: 1.0,
  speechAccent: "en-KE"
};

const CivicAccessibilityContext = createContext<CivicAccessibilityContextType | undefined>(undefined);

export const CivicAccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CivicAccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_civic_accessibility");
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlyReading, setCurrentlyReading] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load and listen for voices
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kenya2027_civic_accessibility", JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage error saving accessibility settings:", e);
    }
  }, [settings]);

  // Apply DOM classes on document element for dark mode, high contrast & font scaling
  useEffect(() => {
    const root = document.documentElement;

    // Dark Mode class
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // High contrast class & contrast modes
    if (settings.highContrast || settings.contrastMode === "high" || settings.contrastMode === "maximum-mono") {
      root.classList.add("high-contrast-mode");
      if (settings.contrastMode === "maximum-mono") {
        root.classList.add("maximum-mono-mode");
      } else {
        root.classList.remove("maximum-mono-mode");
      }
    } else {
      root.classList.remove("high-contrast-mode", "maximum-mono-mode");
    }

    // Screen reader friendly class
    if (settings.screenReaderFriendly) {
      root.classList.add("screen-reader-friendly-mode");
    } else {
      root.classList.remove("screen-reader-friendly-mode");
    }

    // Font size classes
    root.classList.remove("font-scale-normal", "font-scale-large", "font-scale-xlarge");
    root.classList.add(`font-scale-${settings.fontSize}`);

    // Keyboard focus rings class
    if (settings.keyboardFocusRings) {
      root.classList.add("enhanced-focus-rings");
    } else {
      root.classList.remove("enhanced-focus-rings");
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [settings]);

  // Web Speech API handler with accent and rate selection
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Web Speech API not supported in this environment");
      return;
    }

    window.speechSynthesis.cancel(); // cancel any active utterance

    if (!text || text.trim() === "") {
      setIsSpeaking(false);
      setCurrentlyReading(null);
      return;
    }

    // Strip HTML or markdown tags if any
    const cleanText = text.replace(/[*_#`~[\]()<>]/g, " ").replace(/\s+/g, " ").trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = Math.max(0.5, Math.min(2.0, settings.speechRate || 1.0));
    utterance.pitch = Math.max(0.8, Math.min(1.4, settings.speechPitch || 1.0));

    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

    // 1. Explicit voice name match if user selected one
    if (settings.speechVoiceName) {
      const explicitVoice = voices.find(v => v.name === settings.speechVoiceName);
      if (explicitVoice) utterance.voice = explicitVoice;
    }

    // 2. If no explicit voice, match based on chosen speech accent
    if (!utterance.voice && voices.length > 0) {
      const accent = settings.speechAccent || "en-KE";
      let matchedVoice: SpeechSynthesisVoice | undefined;

      if (accent === "en-KE") {
        // Look for en-KE, en-ZA, en-NG, en-TZ, or African/Commonwealth natural voices
        matchedVoice = voices.find(v => v.lang.toLowerCase().includes("ke") || v.name.toLowerCase().includes("kenya") || v.lang.toLowerCase().includes("za") || v.lang.toLowerCase().includes("ng"));
        if (!matchedVoice) {
          // Fallback to clear British/Commonwealth voice which sounds closest to standard Kenyan English curriculum
          matchedVoice = voices.find(v => v.lang.startsWith("en-GB") || v.name.includes("Daniel") || v.name.includes("Arthur"));
        }
        utterance.lang = "en-KE";
      } else if (accent === "sw-KE") {
        matchedVoice = voices.find(v => v.lang.startsWith("sw") || v.name.toLowerCase().includes("swahili") || v.name.toLowerCase().includes("kiswahili"));
        utterance.lang = "sw-KE";
      } else if (accent === "en-GB") {
        matchedVoice = voices.find(v => v.lang.startsWith("en-GB") || v.name.includes("UK") || v.name.includes("British") || v.name.includes("George"));
        utterance.lang = "en-GB";
      } else {
        // "neutral" / "en-US"
        matchedVoice = voices.find(v => v.lang.startsWith("en-US") || v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"));
        utterance.lang = "en-US";
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentlyReading(cleanText.slice(0, 60) + "...");
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlyReading(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentlyReading(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentlyReading(null);
  };

  const updateSetting = <K extends keyof CivicAccessibilitySettings>(key: K, value: CivicAccessibilitySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => {
      const nextHigh = !prev.highContrast;
      return {
        ...prev,
        highContrast: nextHigh,
        contrastMode: nextHigh ? "high" : "standard"
      };
    });
  };

  const toggleScreenReaderFriendly = () => {
    setSettings(prev => ({ ...prev, screenReaderFriendly: !prev.screenReaderFriendly }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    stopSpeaking();
  };

  return (
    <CivicAccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        toggleDarkMode,
        toggleHighContrast,
        toggleScreenReaderFriendly,
        resetSettings,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        speakText,
        stopSpeaking,
        isSpeaking,
        currentlyReading,
        availableVoices
      }}
    >
      {children}
    </CivicAccessibilityContext.Provider>
  );
};

export const useCivicAccessibility = () => {
  const context = useContext(CivicAccessibilityContext);
  if (!context) {
    throw new Error("useCivicAccessibility must be used within a CivicAccessibilityProvider");
  }
  return context;
};
