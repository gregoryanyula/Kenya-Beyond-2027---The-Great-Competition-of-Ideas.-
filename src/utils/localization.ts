/**
 * Kenya 2027 Civic Platform - Centralized Localization & Translation Utility
 * 
 * Provides:
 * 1. Centralized dictionary of translated UI strings for English & Kiswahili (Constitution Art. 7).
 * 2. Type-safe translation resolution with parameter interpolation.
 * 3. Domain, sector, status, and legal term localizers.
 * 4. Browser language detection utility (defaulting to Kiswahili for Swahili locales).
 * 5. Dynamic translation cache & server-side Gemini API bridge.
 */

import { TRANSLATIONS, TranslationDictionary, Language } from "../i18n/translations";

export type { Language, TranslationDictionary };
export { TRANSLATIONS };

/**
 * Standard Browser Language Detection
 * Returns whether the user's browser environment is configured for Kiswahili.
 */
export interface BrowserLanguageInfo {
  isSwahili: boolean;
  detectedCode: string;
  allLanguages: string[];
}

export function detectBrowserLanguagePreference(): BrowserLanguageInfo {
  if (typeof window === "undefined" || !navigator) {
    return { isSwahili: false, detectedCode: "en", allLanguages: ["en"] };
  }

  const rawLanguages = navigator.languages ? [...navigator.languages] : [navigator.language || "en"];
  const primaryLang = (navigator.language || "").toLowerCase().trim();

  let isSwahili = false;
  let detectedCode = primaryLang;

  for (const lang of rawLanguages) {
    const clean = (lang || "").toLowerCase().trim();
    if (
      clean.startsWith("sw") || 
      clean === "swa" || 
      clean.includes("swahili") ||
      clean === "sw-ke" ||
      clean === "sw-tz" ||
      clean === "sw-ug"
    ) {
      isSwahili = true;
      detectedCode = lang;
      break;
    }
  }

  if (!isSwahili && (primaryLang.startsWith("sw") || primaryLang === "swa")) {
    isSwahili = true;
    detectedCode = primaryLang;
  }

  return {
    isSwahili,
    detectedCode,
    allLanguages: rawLanguages
  };
}

/**
 * Interpolates variables in a translation string (e.g. "{name} has {count} items")
 */
export function interpolateString(template: string, params?: Record<string, string | number>): string {
  if (!params || Object.keys(params).length === 0) {
    return template;
  }

  let result = template;
  Object.entries(params).forEach(([key, val]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(val));
  });
  return result;
}

/**
 * Retrieves a translated string from the centralized dictionary.
 */
export function getTranslatedString(
  key: string,
  lang: Language = "en",
  params?: Record<string, string | number>,
  fallback?: string
): string {
  const entry = TRANSLATIONS[key];
  if (!entry) {
    const fallbackText = fallback || key;
    return interpolateString(fallbackText, params);
  }

  const rawText = entry[lang] || entry.en || fallback || key;
  return interpolateString(rawText, params);
}

/**
 * Domain-specific Localizer for Kenya's 12 Core Policy Domains
 */
export const POLICY_DOMAIN_TRANSLATIONS: Record<string, { en: string; sw: string; icon: string }> = {
  "Cost of Living & Basic Goods": {
    en: "Cost of Living & Basic Goods",
    sw: "Gharama ya Maisha na Bidhaa za Kimsingi",
    icon: "🌾"
  },
  "Youth Employment & Digital Economy": {
    en: "Youth Employment & Digital Economy",
    sw: "Ajira kwa Vijana na Uchumi wa Kidijitali",
    icon: "💼"
  },
  "Public Debt, Taxation & Fiscal Discipline": {
    en: "Public Debt, Taxation & Fiscal Discipline",
    sw: "Madeni ya Umma, Kodi na Nidhamu ya Kifedha",
    icon: "⚖️"
  },
  "Healthcare Access, UHC & SHA Reform": {
    en: "Healthcare Access, UHC & SHA Reform",
    sw: "Upatikanaji wa Afya, Bima ya Afya na Marekebisho ya SHA",
    icon: "🏥"
  },
  "Devolution & 47 County Economies": {
    en: "Devolution & 47 County Economies",
    sw: "Ugatuzi na Uchumi wa Kaunti 47",
    icon: "🏛️"
  },
  "Agriculture, Food Security & Smallholder Farmers": {
    en: "Agriculture, Food Security & Smallholder Farmers",
    sw: "Kilimo, Usalama wa Chakula na Wakulima Wadogo",
    icon: "🌱"
  },
  "Education Reform, CBC & University Funding": {
    en: "Education Reform, CBC & University Funding",
    sw: "Mageuzi ya Elimu, CBC na Ufadhili wa Vyuo Vikuu",
    icon: "🎓"
  },
  "Anti-Corruption, Chapter 6 & Institutional Independence": {
    en: "Anti-Corruption, Chapter 6 & Institutional Independence",
    sw: "Kupambana na Ufisadi, Sura ya 6 na Uhuru wa Taasisi",
    icon: "🛡️"
  },
  "Climate Action, Energy Transition & Green Growth": {
    en: "Climate Action, Energy Transition & Green Growth",
    sw: "Hatua za Tabianchi, Nishati Safi na Ukuaji wa Kijani",
    icon: "☀️"
  },
  "Security, Policing Accountability & Rule of Law": {
    en: "Security, Policing Accountability & Rule of Law",
    sw: "Usalama, Uwajibikaji wa Polisi na Utawala wa Sheria",
    icon: "👮"
  },
  "Manufacturing, Trade & Industrial Competitiveness": {
    en: "Manufacturing, Trade & Industrial Competitiveness",
    sw: "Viwanda, Biashara na Ushindani wa Kibiashara",
    icon: "🏭"
  },
  "National Cohesion, Minority Rights & Inclusion": {
    en: "National Cohesion, Minority Rights & Inclusion",
    sw: "Mshikamano wa Kitaifa, Haki za Wachache na Ushirikishwaji",
    icon: "🤝"
  }
};

/**
 * Localizes a policy domain name.
 */
export function localizeDomainName(domainName: string, lang: Language = "en"): string {
  const match = Object.entries(POLICY_DOMAIN_TRANSLATIONS).find(([key]) => 
    key.toLowerCase() === domainName.toLowerCase() || 
    domainName.toLowerCase().includes(key.toLowerCase())
  );

  if (match) {
    return match[1][lang] || match[1].en;
  }
  return domainName;
}

/**
 * Localizes audit criterion compliance status.
 */
export function localizeComplianceStatus(
  status: "Clear" | "Partially Addressed" | "Missing/Unspecified" | string,
  lang: Language = "en"
): string {
  if (lang === "en") return status;

  switch (status) {
    case "Clear":
      return "Wazi na Imethibitishwa";
    case "Partially Addressed":
      return "Imeelezwa Kiasi";
    case "Missing/Unspecified":
      return "Haijatajwa / Haina Mpango";
    default:
      return status;
  }
}

/**
 * Localizes project delivery status.
 */
export function localizeProjectStatus(status: string, lang: Language = "en"): string {
  if (lang === "en") return status;

  switch (status) {
    case "Completed":
      return "Imekamilika";
    case "In Progress":
      return "Inaendelea";
    case "Delayed":
      return "Imechelewa";
    case "Under Audit Scrutiny":
      return "Inachunguzwa na Mkaguzi Mkuu";
    default:
      return status;
  }
}

/**
 * Localizes fact-check verdict tags.
 */
export function localizeFactCheckVerdict(verdict: string, lang: Language = "en"): string {
  if (lang === "en") return verdict;

  switch (verdict) {
    case "Verified True":
      return "Imethibitishwa Kuwa Kweli";
    case "Misleading / Uncosted":
      return "Inapotosha / Haina Gharama Rasmi";
    case "Contradicted by Official Data":
      return "Inapingana na Takwimu za Serikali";
    case "Context Needed":
      return "Inahitaji Muktadha Zaidi";
    case "Article 201 Flag":
      return "Tahadhari ya Ibara ya 201";
    default:
      return verdict;
  }
}

/**
 * Client-Side Caching & Dynamic Translation API Bridge
 */
const dynamicTranslationCache = new Map<string, string>();

export async function requestDynamicTranslation(
  text: string,
  targetLang: Language,
  domain?: string,
  context?: string
): Promise<string> {
  if (!text || !text.trim()) return "";
  if (targetLang === "en" && /^[a-zA-Z0-9\s.,!?:;'"-–—]+$/.test(text)) {
    // If it's pure ASCII English and target is English, return directly
    return text;
  }

  const cacheKey = `${targetLang}:${text.trim()}`;
  if (dynamicTranslationCache.has(cacheKey)) {
    return dynamicTranslationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch("/api/translate-civic-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        targetLang,
        domain,
        context
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    const translated = data?.result?.translatedText || text;
    dynamicTranslationCache.set(cacheKey, translated);
    return translated;
  } catch (err) {
    console.warn("Failed dynamic translation request, falling back to source:", err);
    return text;
  }
}

export async function requestBatchTranslation(
  texts: string[],
  targetLang: Language,
  domain?: string,
  context?: string
): Promise<string[]> {
  if (!texts || texts.length === 0) return [];

  const results: string[] = new Array(texts.length);
  const missingIndices: number[] = [];
  const missingTexts: string[] = [];

  texts.forEach((text, i) => {
    const cacheKey = `${targetLang}:${(text || "").trim()}`;
    if (dynamicTranslationCache.has(cacheKey)) {
      results[i] = dynamicTranslationCache.get(cacheKey)!;
    } else {
      missingIndices.push(i);
      missingTexts.push(text);
    }
  });

  if (missingTexts.length === 0) {
    return results;
  }

  try {
    const response = await fetch("/api/translate-civic-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        texts: missingTexts,
        targetLang,
        domain,
        context
      })
    });

    if (!response.ok) {
      throw new Error(`Batch translation API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedArray: string[] = data?.result?.translatedTexts || missingTexts;

    missingIndices.forEach((origIndex, i) => {
      const translated = translatedArray[i] || missingTexts[i];
      results[origIndex] = translated;
      dynamicTranslationCache.set(`${targetLang}:${(missingTexts[i] || "").trim()}`, translated);
    });

    return results;
  } catch (err) {
    console.warn("Batch translation error, fallback to raw texts:", err);
    missingIndices.forEach((origIndex, i) => {
      results[origIndex] = missingTexts[i];
    });
    return results;
  }
}
