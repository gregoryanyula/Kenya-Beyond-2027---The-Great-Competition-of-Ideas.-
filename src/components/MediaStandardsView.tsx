import React from "react";
import { 
  ShieldCheck, 
  Radio, 
  Tv, 
  Newspaper, 
  MessageSquare, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import { MEDIA_STANDARDS } from "../data/mediaStandardsData";
import { FACT_CHECK_CLASSIFICATIONS } from "../data/accountabilityData";
import { ManifestoToneSentimentOverlay } from "./ManifestoToneSentimentOverlay";

export const MediaStandardsView: React.FC = () => {
  return (
    <div className="space-y-8" id="media-standards-section">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Public Discourse & Media Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
            A Marketplace of Ideas, Not a Marketplace of Outrage
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Democracy requires courageous, evidence-based journalism. We challenge broadcasters, podcasters, digital content creators, and editors to abandon sensationalist insult reporting and hold political figures to rigorous evidentiary standards.
          </p>
          <div className="p-3.5 rounded-lg bg-slate-900 text-white text-xs leading-relaxed font-medium">
            The Golden Rule for 2027 Political Interviews: <em>“What evidence supports this claim? How much will it cost? Where will the money come from? What measurable result should citizens expect in 100 days?”</em>
          </div>
        </div>
      </div>

      {/* Interactive AI Sentiment & Tone Diagnostic Overlay */}
      <ManifestoToneSentimentOverlay />

      {/* Media Guidelines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEDIA_STANDARDS.map((std) => (
          <div
            key={std.id}
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {std.category}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {std.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {std.rule}
              </p>

              {/* Mandatory Follow-up Questions */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                  Mandatory Follow-Up Questions for Journalists:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {std.mandatoryFollowUpQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Banned Practices */}
            <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 text-xs">
              <span className="font-bold text-rose-900 block mb-1 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                <span>Practices to Reject:</span>
              </span>
              <ul className="space-y-1 text-rose-950 text-[11px]">
                {std.bannedPractices.map((b, idx) => (
                  <li key={idx}>✕ {b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Fact-Checking Taxonomy Protocol */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Authoritative Taxonomy
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            The 6-Part Fact-Checking & Evidence Classification System
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Never fabricate numbers or present opinions as verified facts. Use these precise labels when evaluating political discourse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACT_CHECK_CLASSIFICATIONS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded text-xs font-bold border ${item.badgeColor}`}>
                  {item.type}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {item.definition}
              </p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 italic">
                <span className="font-semibold text-slate-700">Example: </span>
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
