import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { 
  Language, 
  detectBrowserLanguagePreference, 
  getTranslatedString, 
  localizeDomainName, 
  localizeComplianceStatus, 
  localizeProjectStatus, 
  localizeFactCheckVerdict, 
  requestDynamicTranslation, 
  requestBatchTranslation 
} from "../utils/localization";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string, params?: Record<string, string | number>) => string;
  translateDomain: (domain: string) => string;
  translateCompliance: (status: string) => string;
  translateProjectStatus: (status: string) => string;
  translateFactCheck: (verdict: string) => string;
  translateDynamic: (text: string, domain?: string, context?: string) => Promise<string>;
  translateBatch: (texts: string[], domain?: string, context?: string) => Promise<string[]>;
  isTranslating: boolean;
  browserLanguage: string;
  isBrowserSw: boolean;
  isAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [browserInfo] = useState(() => detectBrowserLanguagePreference());
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_app_language");
      if (saved === "en" || saved === "sw") {
        return saved as Language;
      }
      
      // Auto-detect from browser preference and default to Kiswahili if detected
      const detected = detectBrowserLanguagePreference();
      if (detected.isSwahili) {
        return "sw";
      }
      return "en";
    } catch {
      return "en";
    }
  });

  // Track if initial load was auto-detected from browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kenya2027_app_language");
      if (!saved && browserInfo.isSwahili) {
        setIsAutoDetected(true);
      }
    } catch {
      // ignore
    }
  }, [browserInfo.isSwahili]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setIsAutoDetected(false);
    try {
      localStorage.setItem("kenya2027_app_language", lang);
    } catch (e) {
      console.warn("Could not save language preference:", e);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "sw" : "en");
  }, [language, setLanguage]);

  /**
   * Localization utility to retrieve translated strings with parameter interpolation
   */
  const t = useCallback((key: string, fallback?: string, params?: Record<string, string | number>): string => {
    return getTranslatedString(key, language, params, fallback);
  }, [language]);

  /**
   * Domain-specific helper
   */
  const translateDomain = useCallback((domain: string): string => {
    return localizeDomainName(domain, language);
  }, [language]);

  /**
   * Compliance status helper
   */
  const translateCompliance = useCallback((status: string): string => {
    return localizeComplianceStatus(status, language);
  }, [language]);

  /**
   * Project status helper
   */
  const translateProjectStatus = useCallback((status: string): string => {
    return localizeProjectStatus(status, language);
  }, [language]);

  /**
   * Fact-check verdict helper
   */
  const translateFactCheck = useCallback((verdict: string): string => {
    return localizeFactCheckVerdict(verdict, language);
  }, [language]);

  /**
   * Real-time Context-Aware Civic Translation via Gemini API
   */
  const translateDynamic = useCallback(async (
    text: string, 
    domain?: string, 
    context?: string
  ): Promise<string> => {
    if (!text || !text.trim()) return "";
    setIsTranslating(true);
    try {
      return await requestDynamicTranslation(text, language, domain, context);
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  /**
   * Real-time Batch Translation via Gemini API
   */
  const translateBatch = useCallback(async (
    texts: string[], 
    domain?: string, 
    context?: string
  ): Promise<string[]> => {
    if (!texts || texts.length === 0) return [];
    setIsTranslating(true);
    try {
      return await requestBatchTranslation(texts, language, domain, context);
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  // Sync html lang attribute
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage, 
      t,
      translateDomain,
      translateCompliance,
      translateProjectStatus,
      translateFactCheck,
      translateDynamic,
      translateBatch,
      isTranslating,
      browserLanguage: browserInfo.detectedCode,
      isBrowserSw: browserInfo.isSwahili,
      isAutoDetected
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

