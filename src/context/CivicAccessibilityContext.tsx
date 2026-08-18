import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CivicAccessibilitySettings {
  highContrast: boolean;
  fontSize: "normal" | "large" | "xlarge";
  textToSpeechEnabled: boolean;
  keyboardFocusRings: boolean;
  reducedMotion: boolean;
  speechRate: number; // 0.8 to 1.4
  speechPitch: number; // 0.8 to 1.2
  speechVoiceName?: string;
}

interface CivicAccessibilityContextType {
  settings: CivicAccessibilitySettings;
  updateSetting: <K extends keyof CivicAccessibilitySettings>(key: K, value: CivicAccessibilitySettings[K]) => void;
  resetSettings: () => void;
  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (open: boolean) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  currentlyReading: string | null;
}

const DEFAULT_SETTINGS: CivicAccessibilitySettings = {
  highContrast: false,
  fontSize: "normal",
  textToSpeechEnabled: false,
  keyboardFocusRings: true,
  reducedMotion: false,
  speechRate: 1.0,
  speechPitch: 1.0
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

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kenya2027_civic_accessibility", JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage error saving accessibility settings:", e);
    }
  }, [settings]);

  // Apply DOM classes on document element for high contrast & font scaling
  useEffect(() => {
    const root = document.documentElement;

    // High contrast class
    if (settings.highContrast) {
      root.classList.add("high-contrast-mode");
    } else {
      root.classList.remove("high-contrast-mode");
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

  // Web Speech API handler
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
    utterance.rate = settings.speechRate || 1.0;
    utterance.pitch = settings.speechPitch || 1.0;

    // Pick appropriate English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith("en-") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Daniel") || v.name.includes("Samantha")));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
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

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    stopSpeaking();
  };

  return (
    <CivicAccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        speakText,
        stopSpeaking,
        isSpeaking,
        currentlyReading
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
