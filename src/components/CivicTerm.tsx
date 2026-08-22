import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, BookOpen, ExternalLink, ShieldCheck, Scale } from "lucide-react";
import { CIVIC_GLOSSARY_TERMS } from "../data/civicGlossaryData";
import { CivicGlossaryTerm } from "../types";

interface CivicTermProps {
  term: string;
  children?: React.ReactNode;
  inline?: boolean;
}

export const CivicTerm: React.FC<CivicTermProps> = ({ term, children, inline = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const safeTerm = (term || "").toLowerCase();
  const matchedTerm: CivicGlossaryTerm | undefined = CIVIC_GLOSSARY_TERMS.find(
    (t) => (t.term || "").toLowerCase() === safeTerm || (t.slug || "").toLowerCase() === safeTerm
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!matchedTerm) {
    return <span>{children || term}</span>;
  }

  const showTooltip = isOpen || isHovered;

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center space-x-1 underline decoration-dotted decoration-emerald-500 underline-offset-4 text-emerald-800 hover:text-emerald-950 font-semibold cursor-help transition-colors text-inherit"
        title={`Click for Civic Glossary definition of ${matchedTerm.term}`}
      >
        <span>{children || matchedTerm.term}</span>
        <HelpCircle className="w-3 h-3 text-emerald-600 inline shrink-0" />
      </button>

      {/* Floating Tooltip Card */}
      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-4 rounded-xl bg-slate-950 text-white shadow-2xl border border-slate-800 text-left animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-950"></div>

          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800">
                {matchedTerm.category}
              </span>
              <span className="text-[10px] text-slate-400">Civic Glossary</span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>{matchedTerm.term}</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {matchedTerm.shortDefinition}
              </p>
            </div>

            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 space-y-1">
              <span className="text-amber-400 font-bold block">Why it matters for 2027:</span>
              <p className="leading-normal text-slate-300">
                {matchedTerm.whyItMattersFor2027}
              </p>
            </div>

            {matchedTerm.relatedArticleOrLaw && (
              <div className="text-[9px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-900">
                <span>Legal Anchor:</span>
                <span className="text-emerald-400 font-semibold">{matchedTerm.relatedArticleOrLaw}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </span>
  );
};
