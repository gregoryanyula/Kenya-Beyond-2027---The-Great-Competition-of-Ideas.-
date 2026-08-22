import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Baby, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Share2, 
  Check, 
  Coins, 
  Users, 
  ShoppingBag, 
  GraduationCap, 
  Briefcase,
  Lightbulb
} from "lucide-react";
import { EvaluationResult } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useCivicAccessibility } from "../context/CivicAccessibilityContext";

export interface ELI5Response {
  eli5_analogy: string;
  simple_summary: string;
  what_it_means_for_you: Array<{
    group: string;
    impact: string;
  }>;
  the_catch_or_hidden_cost: string;
  street_verdict: string;
  questions_to_ask_your_mp: string[];
}

interface PolicyELI5CardProps {
  proposalText: string;
  summaryText: string;
  domain: string;
  verdictScore?: EvaluationResult["verdict_score"];
  isEnabled: boolean;
  onToggle: () => void;
}

export const PolicyELI5Card: React.FC<PolicyELI5CardProps> = ({
  proposalText,
  summaryText,
  domain,
  verdictScore,
  isEnabled,
  onToggle
}) => {
  const { language } = useLanguage();
  const { speakText, stopSpeaking, isSpeaking } = useCivicAccessibility();
  const isSw = language === "sw";

  const [eli5Data, setEli5Data] = useState<ELI5Response | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedQuestions, setCopiedQuestions] = useState<boolean>(false);

  // Fetch ELI5 translation whenever enabled or when language changes
  useEffect(() => {
    if (!isEnabled) return;

    let isMounted = true;
    const fetchELI5 = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/explain-eli5", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proposalText: proposalText || summaryText,
            summary: summaryText,
            domain: domain,
            language: language,
            verdictScores: verdictScore
          })
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        if (isMounted && data.result) {
          setEli5Data(data.result);
        }
      } catch (err: any) {
        console.error("ELI5 fetch error:", err);
        if (isMounted) {
          setError(err?.message || "Failed to load simplified explanation.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchELI5();

    return () => {
      isMounted = false;
    };
  }, [isEnabled, proposalText, summaryText, domain, language]);

  const handleCopyQuestions = () => {
    if (!eli5Data || !eli5Data.questions_to_ask_your_mp) return;
    const text = eli5Data.questions_to_ask_your_mp.map((q, i) => `${i + 1}. ${q}`).join("\n");
    navigator.clipboard.writeText(`Citizen Policy Questions:\n${text}`);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2500);
  };

  const handleReadAloud = () => {
    if (!eli5Data) return;
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textToSpeak = `${eli5Data.eli5_analogy}. ${eli5Data.simple_summary}. ${eli5Data.street_verdict}`;
      speakText(textToSpeak);
    }
  };

  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isEnabled
          ? "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-emerald-500/10 border-amber-300 dark:border-amber-500/40 shadow-md"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs hover:border-amber-300/80"
      }`}
      id="eli5-policy-container"
    >
      {/* ELI5 Header Bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border-b border-amber-200/80 dark:border-amber-500/20">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isEnabled 
              ? "bg-amber-500 text-white shadow-sm ring-4 ring-amber-400/20 scale-105" 
              : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60"
          }`}>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-900/60 px-2 py-0.5 rounded font-mono">
                Gemini 3.7 Flash • ELI5 Mode
              </span>
              <span className="hidden md:inline-block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                (Press Ctrl+E)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{isSw ? "Maelezo Rahisi ya Mwananchi (ELI5)" : "Explain Like I'm Five (ELI5)"}</span>
              <span className="text-xs font-normal text-amber-700 dark:text-amber-400">
                {isSw ? "Bila Lugha Ngumu" : "Zero Jargon"}
              </span>
            </h3>
          </div>
        </div>

        {/* Action Toggle Switch */}
        <div className="flex items-center space-x-3 self-end sm:self-center">
          {isEnabled && eli5Data && (
            <button
              onClick={handleReadAloud}
              className={`p-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isSpeaking 
                  ? "bg-rose-600 text-white border-rose-500 animate-pulse" 
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
              title="Listen to simplified citizen brief"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600" />}
              <span className="hidden sm:inline">{isSpeaking ? "Stop" : "Listen"}</span>
            </button>
          )}

          <button
            onClick={onToggle}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isEnabled 
                ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20" 
                : "bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700"
            }`}
            id="toggle-eli5-btn"
            aria-pressed={isEnabled}
          >
            <Baby className="w-4 h-4" />
            <span>{isEnabled ? (isSw ? "Zima ELI5" : "Exit ELI5 Mode") : (isSw ? "Washa ELI5" : "Explain In Plain Words")}</span>
          </button>
        </div>
      </div>

      {/* Expanded ELI5 Content Area */}
      {isEnabled && (
        <div className="p-5 sm:p-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          {isLoading && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-3 border-amber-500 border-t-transparent animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {isSw ? "Gemini inarahisisha lugha ya sera..." : "Translating complex policy jargon into everyday terms..."}
                </p>
                <p className="text-xs text-slate-500">
                  {isSw ? "Kuondoa vifungu vizito vya sheria na nambari za bajeti" : "Reframing macroeconomic jargon into kitchen-table realities"}
                </p>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {eli5Data && !isLoading && (
            <div className="space-y-5">
              {/* Everyday Analogy Callout Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 relative overflow-hidden">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-sm">
                    💡
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      {isSw ? "Mfano wa Kawaida wa Maisha" : "The Everyday Street Analogy"}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      “{eli5Data.eli5_analogy}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Simple Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isSw ? "Kwa Kifupi: Kiongozi huyu anasema nini?" : "In Plain English: What is actually being promised?"}</span>
                </h4>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  {eli5Data.simple_summary}
                </p>
              </div>

              {/* Pocketbook Impact Cards (Who wins? Who feels it?) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isSw ? "Athari za Moja kwa Moja Mfukoni Mwako" : "What This Means For Your Pocketbook & Family"}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {eli5Data.what_it_means_for_you?.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.group}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Catch or Hidden Cost */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-300/60 dark:border-rose-800/40 space-y-1.5">
                <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-300 font-bold text-xs">
                  <Coins className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="uppercase tracking-wider text-[11px] font-black">
                    {isSw ? "Mtego Uko Wapi? (Pesa Zitatoka Wapi?)" : "Where is the Catch? (Who Pays The Bill?)"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {eli5Data.the_catch_or_hidden_cost}
                </p>
              </div>

              {/* Street Verdict & MP Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Street Verdict */}
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 font-mono">
                    {isSw ? "Hukumu ya Mtaani" : "Street Verdict (Slogan vs Plan)"}
                  </span>
                  <p className="text-sm font-bold text-slate-100 leading-snug">
                    “{eli5Data.street_verdict}”
                  </p>
                </div>

                {/* Accountability Questions for Leaders */}
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-emerald-600" />
                      {isSw ? "Maswali ya Kumwuliza Mbunge/Gavana" : "Questions To Ask Your MP / Governor"}
                    </span>
                    <button
                      onClick={handleCopyQuestions}
                      className="text-[10px] text-emerald-700 dark:text-emerald-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedQuestions ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
                      <span>{copiedQuestions ? "Copied!" : "Copy Questions"}</span>
                    </button>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {eli5Data.questions_to_ask_your_mp?.map((q, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-emerald-600 font-bold">👉</span>
                        <span className="font-medium">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
