import React, { useState } from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Loader2, 
  Flame, 
  Scale, 
  Brain, 
  MessageSquareWarning, 
  Eye, 
  RefreshCw,
  Sliders,
  HelpCircle
} from "lucide-react";
import { ManifestoToneAnalysis } from "../types";

const SAMPLE_RHETORIC_SNIPPETS = [
  {
    title: "Fear & Threat Based (Hostile Outrage Rhetoric)",
    text: "Those sinister cartels in Nairobi and their corrupt puppet dynasties have weaponized the system to starve our youth! If they win this election, your lands will be seized overnight and our communities will be condemned to permanent poverty. We must rise up and destroy their mafia syndicate once and for all!"
  },
  {
    title: "Euphoric Populism (Uncosted Silver Bullet)",
    text: "We promise every single Kenyan citizen free money, zero taxes on every business forever, KES 50,000 monthly allowance for every unemployed youth, free fuel at all petrol stations, and instant luxury apartments for every family within our first 90 days with zero borrowing!"
  },
  {
    title: "Technocratic & Evidence-Based (Balanced Policy)",
    text: "Under Article 201 of the Constitution, we propose reallocating KES 14 Billion from non-essential executive hospitality expenditures into county Level 4 hospital oncology centers over 4 fiscal years. This will be monitored via biannual Auditor General progress reports and open public procurement portals."
  }
];

export const ManifestoToneSentimentOverlay: React.FC = () => {
  const [inputText, setInputText] = useState<string>(SAMPLE_RHETORIC_SNIPPETS[0].text);
  const [sourceActor, setSourceActor] = useState<string>("Political Speech / Manifesto Section");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ManifestoToneAnalysis | null>(null);

  const handleAnalyzeTone = async (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text.trim()) {
      setErrorMsg("Please enter speech or manifesto text to analyze.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/analyze-manifesto-tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textToAnalyze: text,
          documentTitle: sourceActor,
          domain: "Manifesto Discourse"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment and tone.");
      }

      const data = await response.json();
      setAnalysisResult(data.result);
    } catch (err: any) {
      console.error("Tone analysis error:", err);
      setErrorMsg(err.message || "Failed to analyze emotional manipulation in text.");
    } finally {
      setIsLoading(false);
    }
  };

  const getToneBadge = (tone: string) => {
    if (tone.includes("Outrage") || tone.includes("Fear") || tone.includes("Sensationalist")) {
      return "bg-rose-100 text-rose-900 border-rose-300";
    }
    if (tone.includes("Moderate") || tone.includes("Emotional")) {
      return "bg-amber-100 text-amber-900 border-amber-300";
    }
    return "bg-emerald-100 text-emerald-900 border-emerald-300";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8" id="manifesto-tone-overlay">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-900 mb-2">
          <Brain className="w-3.5 h-3.5 text-rose-400" />
          <span>Sentiment, Tone & Cognitive Bias Diagnostic</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Emotional Manipulation & Rhetorical Bias Overlay
        </h3>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Political manifestos and campaign speeches frequently use fear-mongering, tribal scapegoating, and ungrounded euphoria to bypass rational public scrutiny. This AI diagnostic decodes the emotional manipulation tactics and reveals the evidence gap.
        </p>
      </div>

      {/* Preset Sample Buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
          Load Sample Political Rhetoric to Test:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_RHETORIC_SNIPPETS.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(snippet.text);
                handleAnalyzeTone(snippet.text);
              }}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-left transition-all text-xs flex flex-col justify-between space-y-1 group"
            >
              <span className="font-bold text-slate-900 group-hover:text-rose-700 block">
                {snippet.title}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-2">
                "{snippet.text}"
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-800">
          Paste Manifesto Paragraph, Campaign Speech Excerpt, or Political Ad Script:
        </label>
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste candidate rhetoric or manifesto claim here to detect bias and emotional triggers..."
          className="w-full p-3.5 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-slate-900 focus:outline-hidden leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 italic">
            Evaluates fear vs. hope vs. evidence vs. Article 201 constitutional realism.
          </span>

          <button
            onClick={() => handleAnalyzeTone()}
            disabled={isLoading || !inputText.trim()}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all shadow-xs ${
              isLoading || !inputText.trim()
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing Rhetorical Bias & Manipulation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Run Sentiment & Tone Diagnostic</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Analysis Result Display */}
      {analysisResult && (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-6 animate-in fade-in duration-300">
          {/* Top Score Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getToneBadge(analysisResult.overallTone)}`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{analysisResult.overallTone}</span>
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2">
                Discourse Health Diagnostic
              </h4>
            </div>

            {/* Metric Meters */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="text-center p-3 rounded-lg bg-white border border-slate-200 shadow-2xs min-w-[100px]">
                <span className="text-[10px] font-black uppercase text-rose-700 block">Bias Score</span>
                <span className="text-2xl font-black text-slate-900">
                  {analysisResult.biasScore}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
              </div>

              <div className="text-center p-3 rounded-lg bg-white border border-slate-200 shadow-2xs min-w-[100px]">
                <span className="text-[10px] font-black uppercase text-amber-700 block">Emotional Charge</span>
                <span className="text-2xl font-black text-slate-900">
                  {analysisResult.emotionalCharge}
                  <span className="text-xs font-normal text-slate-400">%</span>
                </span>
              </div>

              <div className="text-center p-3 rounded-lg bg-white border border-slate-200 shadow-2xs min-w-[100px]">
                <span className="text-[10px] font-black uppercase text-emerald-700 block">Evidence Ratio</span>
                <span className="text-2xl font-black text-slate-900">
                  {analysisResult.evidenceRatio}
                  <span className="text-xs font-normal text-slate-400">%</span>
                </span>
              </div>
            </div>
          </div>

          {/* Rhetorical Markers Category Breakdown */}
          {analysisResult.rhetoricalMarkers && analysisResult.rhetoricalMarkers.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Rhetorical Tactics Identified:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysisResult.rhetoricalMarkers.map((marker, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{marker.category}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-2xs">
                        {marker.count}x
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {marker.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trigger Words & Fallacies */}
          {analysisResult.detectedFallacies && analysisResult.detectedFallacies.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquareWarning className="w-3.5 h-3.5 text-rose-600" />
                <span>Detected Logical Fallacies & Loaded Language ({analysisResult.detectedFallacies.length})</span>
              </span>
              <div className="space-y-2">
                {analysisResult.detectedFallacies.map((fal, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-rose-50/50 border border-rose-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-900">{fal.name}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                        {fal.severity} Severity
                      </span>
                    </div>
                    <p className="italic text-slate-700">"{fal.quote}"</p>
                    <p className="text-slate-600 text-[11px]">{fal.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Citizen Scrutiny Reframing */}
          {analysisResult.constructiveReframing && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>Evidence-Based Constitutional Re-Framing (Article 201 Standard)</span>
              </span>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                "{analysisResult.constructiveReframing}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
