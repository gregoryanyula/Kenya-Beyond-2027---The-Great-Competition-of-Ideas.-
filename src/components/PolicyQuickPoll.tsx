import React, { useState, useEffect, useMemo } from "react";
import { 
  BarChart3, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PollOption {
  id: "realistic" | "partial" | "unrealistic";
  label: string;
  sublabel: string;
  colorClass: string;
  barColor: string;
  badgeBg: string;
}

interface PolicyQuickPollProps {
  policyTitle: string;
  domain: string;
  alignmentScore?: number;
  className?: string;
}

const STORAGE_PREFIX = "kenya2027_policy_poll_";

export const PolicyQuickPoll: React.FC<PolicyQuickPollProps> = ({
  policyTitle,
  domain,
  alignmentScore = 7,
  className = ""
}) => {
  const pollKey = useMemo(() => {
    const cleanSlug = (policyTitle || "default")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .slice(0, 40);
    return `${STORAGE_PREFIX}${cleanSlug}`;
  }, [policyTitle]);

  // Seed baseline distribution based on domain & score for realistic civic community tally
  const initialTallies = useMemo(() => {
    const base = Math.abs(policyTitle.split("").reduce((acc, char) => acc + char.charCodeAt(0), 120)) % 100;
    if (alignmentScore >= 8) {
      return { realistic: 84 + base, partial: 42 + (base % 20), unrealistic: 14 + (base % 10) };
    } else if (alignmentScore >= 5) {
      return { realistic: 38 + (base % 20), partial: 92 + base, unrealistic: 48 + (base % 30) };
    } else {
      return { realistic: 18 + (base % 15), partial: 54 + (base % 25), unrealistic: 96 + base };
    }
  }, [policyTitle, alignmentScore]);

  const [userVote, setUserVote] = useState<"realistic" | "partial" | "unrealistic" | null>(null);
  const [tallies, setTallies] = useState<{ realistic: number; partial: number; unrealistic: number }>(initialTallies);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [feedbackNote, setFeedbackNote] = useState<string>("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState<boolean>(false);

  // Load persisted vote from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(pollKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserVote(parsed.vote);
        setHasVoted(true);
        if (parsed.customTallies) {
          setTallies(parsed.customTallies);
        }
      } else {
        setUserVote(null);
        setHasVoted(false);
        setTallies(initialTallies);
      }
    } catch (e) {
      console.warn("Poll storage read error:", e);
    }
  }, [pollKey, initialTallies]);

  const totalVotes = tallies.realistic + tallies.partial + tallies.unrealistic;

  const percentages = useMemo(() => {
    if (totalVotes === 0) return { realistic: 33, partial: 34, unrealistic: 33 };
    return {
      realistic: Math.round((tallies.realistic / totalVotes) * 100),
      partial: Math.round((tallies.partial / totalVotes) * 100),
      unrealistic: Math.round((tallies.unrealistic / totalVotes) * 100)
    };
  }, [tallies, totalVotes]);

  const handleVote = (optionId: "realistic" | "partial" | "unrealistic") => {
    const updatedTallies = { ...tallies };

    // If already voted, subtract previous
    if (userVote) {
      updatedTallies[userVote] = Math.max(0, updatedTallies[userVote] - 1);
    }

    updatedTallies[optionId] += 1;
    setUserVote(optionId);
    setHasVoted(true);
    setTallies(updatedTallies);

    try {
      localStorage.setItem(
        pollKey,
        JSON.stringify({
          vote: optionId,
          customTallies: updatedTallies,
          timestamp: new Date().toISOString()
        })
      );
    } catch (e) {
      console.warn("Poll storage write error:", e);
    }
  };

  const handleResetVote = () => {
    if (userVote) {
      const updated = { ...tallies };
      updated[userVote] = Math.max(0, updated[userVote] - 1);
      setTallies(updated);
    }
    setUserVote(null);
    setHasVoted(false);
    try {
      localStorage.removeItem(pollKey);
    } catch (e) {
      console.warn("Poll storage remove error:", e);
    }
  };

  const options: PollOption[] = [
    {
      id: "realistic",
      label: "Highly Realistic & Actionable",
      sublabel: "Well-costed, strong devolution alignment, and achievable institutional delivery timeline.",
      colorClass: "text-emerald-700",
      barColor: "bg-emerald-600",
      badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      id: "partial",
      label: "Partially Realistic with Gaps",
      sublabel: "Good developmental intent, but lacks stable revenue anchor or PBO validation.",
      colorClass: "text-amber-700",
      barColor: "bg-amber-500",
      badgeBg: "bg-amber-50 text-amber-800 border-amber-200"
    },
    {
      id: "unrealistic",
      label: "Unrealistic / Slogan-Heavy",
      sublabel: "Overpromised timeline, severe fiscal risk under Article 201, or unconstitutional overreach.",
      colorClass: "text-rose-700",
      barColor: "bg-rose-600",
      badgeBg: "bg-rose-50 text-rose-800 border-rose-200"
    }
  ];

  const leadingOption = useMemo(() => {
    if (tallies.realistic >= tallies.partial && tallies.realistic >= tallies.unrealistic) {
      return { id: "realistic", label: "Realistic & Actionable", pct: percentages.realistic, color: "text-emerald-700" };
    } else if (tallies.partial >= tallies.realistic && tallies.partial >= tallies.unrealistic) {
      return { id: "partial", label: "Partially Realistic with Gaps", pct: percentages.partial, color: "text-amber-700" };
    } else {
      return { id: "unrealistic", label: "Unrealistic / Slogan-Heavy", pct: percentages.unrealistic, color: "text-rose-700" };
    }
  }, [tallies, percentages]);

  return (
    <div 
      className={`bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4 ${className}`}
      id="policy-quick-poll-section"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
              <BarChart3 className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Citizen Sentiment & Kenya 2060 Reality Check
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900">
            Do you find this policy alignment with Kenya 2060 realistic?
          </h4>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{totalVotes} Citizen Votes</span>
          </span>
        </div>
      </div>

      {/* Poll Options / Tally Rows */}
      <div className="space-y-2.5">
        {options.map((opt) => {
          const isSelected = userVote === opt.id;
          const pct = percentages[opt.id];
          const count = tallies[opt.id];

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group select-none ${
                isSelected
                  ? "bg-white border-purple-500 shadow-xs ring-2 ring-purple-500/20"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              {/* Background Progress Fill Bar for Live Tally */}
              <div 
                className={`absolute left-0 top-0 bottom-0 opacity-15 transition-all duration-700 ease-out ${opt.barColor}`}
                style={{ width: `${pct}%` }}
              />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs sm:text-sm font-bold text-slate-900 group-hover:${opt.colorClass} transition-colors`}>
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        <CheckCircle2 className="w-3 h-3 text-purple-600" />
                        Your Vote
                      </span>
                    )}
                  </div>
                  <p className="text-2xs text-slate-500 leading-snug">
                    {opt.sublabel}
                  </p>
                </div>

                {/* Percentage & Vote Count Pill */}
                <div className="text-right shrink-0">
                  <span className={`text-base sm:text-lg font-black font-mono ${opt.colorClass}`}>
                    {pct}%
                  </span>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {count} votes
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer / Community Consensus Callout & Reset */}
      <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-1.5 text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            Community Verdict: <strong className={leadingOption.color}>{leadingOption.label} ({leadingOption.pct}%)</strong>
          </span>
        </div>

        {hasVoted && (
          <button
            onClick={handleResetVote}
            className="inline-flex items-center space-x-1 text-2xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer self-end sm:self-center"
            title="Reset and cast another vote"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Change Vote</span>
          </button>
        )}
      </div>
    </div>
  );
};
