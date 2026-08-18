import React, { useState, useEffect } from "react";
import { 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Scale, 
  Timer, 
  Share2, 
  Check, 
  Zap, 
  Trophy,
  Compass
} from "lucide-react";
import confetti from "canvas-confetti";
import { POLICY_LITERACY_CHALLENGES } from "../data/policyLiteracyGameData";
import { PolicyLiteracyChallenge } from "../types";

export const PolicyLiteracyGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [stage, setStage] = useState<"mandate" | "solution" | "feedback" | "complete">("mandate");
  const [selectedMandateId, setSelectedMandateId] = useState<string | null>(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [answerHistory, setAnswerHistory] = useState<{
    challengeId: string;
    mandateCorrect: boolean;
    solutionCorrect: boolean;
    pointsEarned: number;
  }[]>([]);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const currentChallenge: PolicyLiteracyChallenge = POLICY_LITERACY_CHALLENGES[currentIndex];

  const handleSelectMandate = (optionId: string) => {
    setSelectedMandateId(optionId);
    setStage("solution");
  };

  const handleSelectSolution = (solutionId: string) => {
    setSelectedSolutionId(solutionId);
    
    // Evaluate choices
    const chosenMandate = currentChallenge.optionsConstitution.find((o) => o.id === selectedMandateId);
    const chosenSol = currentChallenge.optionsPolicySolution.find((o) => o.id === solutionId);

    const mandateOk = !!chosenMandate?.isCorrect;
    const solutionOk = !!chosenSol?.isCorrect;

    let points = 0;
    if (mandateOk && solutionOk) {
      points = 20 + streak * 5;
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);
      // Trigger subtle mini confetti
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    } else if (mandateOk || solutionOk) {
      points = 10;
      setStreak(0);
    } else {
      points = 0;
      setStreak(0);
    }

    setScore((prev) => prev + points);
    setAnswerHistory((prev) => [
      ...prev,
      {
        challengeId: currentChallenge.id,
        mandateCorrect: mandateOk,
        solutionCorrect: solutionOk,
        pointsEarned: points
      }
    ]);

    setStage("feedback");
  };

  const handleNextChallenge = () => {
    if (currentIndex + 1 < POLICY_LITERACY_CHALLENGES.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedMandateId(null);
      setSelectedSolutionId(null);
      setStage("mandate");
    } else {
      setStage("complete");
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStage("mandate");
    setSelectedMandateId(null);
    setSelectedSolutionId(null);
    setScore(0);
    setStreak(0);
    setAnswerHistory([]);
  };

  const handleShareScore = () => {
    const text = `🇰🇪 KENYA 2027 KATIBA & POLICY QUEST\nI scored ${score} points in the Constitutional Accountability Challenge!\nStreak: ${highestStreak} 🔥\nCan you match Kenya's national challenges to the 2010 Constitution? Test your policy literacy at www.kenya2027.ke`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const getRankBadge = (finalScore: number) => {
    if (finalScore >= 180) return { title: "Chief Katiba & Policy Auditor", color: "bg-emerald-100 text-emerald-900 border-emerald-300", desc: "Flawless mastery of Article 43, 201, 174, and constitutional public finance." };
    if (finalScore >= 120) return { title: "Constitutional Policy Scholar", color: "bg-blue-100 text-blue-900 border-blue-300", desc: "Strong discernment between real institutional reforms and populist traps." };
    return { title: "Civic Defender in Training", color: "bg-amber-100 text-amber-900 border-amber-300", desc: "Developing foundational understanding of sovereign borrowing and devolution." };
  };

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6" id="policy-literacy-game-root">
      {/* Game Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Katiba & Policy Quest</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Policy Literacy & Constitutional Matchmaker
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Match real-world national governance challenges with exact 2010 constitutional mandates and authentic policy solutions.
          </p>
        </div>

        {/* Live Score & Streak Counters */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-mono font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{score} PTS</span>
          </div>
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
            streak > 1 ? "bg-amber-500 text-white border-amber-600 animate-pulse" : "bg-slate-100 text-slate-700 border-slate-200"
          }`}>
            <Flame className={`w-3.5 h-3.5 ${streak > 1 ? "text-amber-100" : "text-amber-500"}`} />
            <span>{streak}x Streak</span>
          </div>
        </div>
      </div>

      {stage !== "complete" ? (
        <div className="space-y-6">
          {/* Progress Bar & Step Indicator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>Challenge {currentIndex + 1} of {POLICY_LITERACY_CHALLENGES.length}: {currentChallenge.sector}</span>
              <span className="font-mono">{Math.round(((currentIndex) / POLICY_LITERACY_CHALLENGES.length) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${((currentIndex + (stage === "solution" ? 0.5 : stage === "feedback" ? 1 : 0)) / POLICY_LITERACY_CHALLENGES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Challenge Briefing Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-900 text-white space-y-3 relative overflow-hidden shadow-xs">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                {currentChallenge.sector}
              </span>
              <span className="text-[10px] font-mono font-bold bg-slate-800 px-2 py-0.5 rounded text-amber-300 border border-slate-700">
                {currentChallenge.statBadge}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {currentChallenge.challengeTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentChallenge.situationBrief}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span><strong>Citizen Impact:</strong> {currentChallenge.realWorldImpact}</span>
            </div>
          </div>

          {/* Step 1: Select Constitutional Mandate */}
          {stage === "mandate" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <h5 className="text-sm font-bold text-slate-900">
                  Step 1: Which Constitutional Article Governs This Civic Mandate?
                </h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentChallenge.optionsConstitution.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectMandate(option.id)}
                    className="p-4 rounded-xl border text-left bg-slate-50 border-slate-200 hover:border-blue-600 hover:bg-blue-50/40 hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 group-hover:text-blue-800">
                        {option.articleNumber}
                      </span>
                      <h6 className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                        {option.articleTitle}
                      </h6>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {option.clauseSummary}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-end text-[10px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      <span>Select Mandate</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Policy Solution vs Populist Trap */}
          {stage === "solution" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                <h5 className="text-sm font-bold text-slate-900">
                  Step 2: Choose the Constitutional Policy Fix (Watch out for the Populist Trap!)
                </h5>
              </div>

              <div className="space-y-3">
                {currentChallenge.optionsPolicySolution.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => handleSelectSolution(sol.id)}
                    className="w-full p-4 rounded-xl border text-left bg-slate-50 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 hover:shadow-xs transition-all flex items-start justify-between gap-4 group"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Proposal Option
                      </span>
                      <p className="text-xs font-semibold text-slate-900 leading-relaxed group-hover:text-emerald-950">
                        {sol.solutionText}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Instant Feedback & Precedent Breakdown */}
          {stage === "feedback" && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              {(() => {
                const chosenMandate = currentChallenge.optionsConstitution.find((o) => o.id === selectedMandateId);
                const chosenSol = currentChallenge.optionsPolicySolution.find((o) => o.id === selectedSolutionId);
                const correctMandate = currentChallenge.optionsConstitution.find((o) => o.isCorrect);
                const correctSol = currentChallenge.optionsPolicySolution.find((o) => o.isCorrect);

                const isAllCorrect = chosenMandate?.isCorrect && chosenSol?.isCorrect;

                return (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border ${
                      isAllCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-amber-50 border-amber-300 text-amber-950"
                    }`}>
                      <div className="flex items-center space-x-2">
                        {isAllCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                        )}
                        <h5 className="font-bold text-sm">
                          {isAllCorrect ? "Constitutional Strike! Perfect Analysis" : "Partial / Incorrect Match"}
                        </h5>
                      </div>
                      <p className="text-xs mt-1 leading-relaxed">
                        {isAllCorrect 
                          ? "You accurately mapped the constitutional foundation and isolated the sustainable institutional solution."
                          : "Review the constitutional grounding below to sharpen your policy discernment."}
                      </p>
                    </div>

                    {/* Breakdown Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Constitutional Article Feedback */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                          Constitutional Mandate:
                        </span>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {correctMandate?.articleNumber}
                          <span className="text-xs font-normal text-slate-600">({correctMandate?.articleTitle})</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-[11px]">
                          {correctMandate?.explanation}
                        </p>
                      </div>

                      {/* Policy Solution Feedback */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                          Authentic Policy Solution:
                        </span>
                        <p className="font-semibold text-slate-900 text-[11px] leading-relaxed">
                          {correctSol?.solutionText}
                        </p>
                        <p className="text-slate-600 text-[11px] italic">
                          Why: {correctSol?.rationale}
                        </p>
                      </div>
                    </div>

                    {/* Legal Precedent & Auditor Precedent Banner */}
                    <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
                      <BookOpen className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Legal Landmark & Auditor-General Precedent:</span>
                        <span className="text-[11px] leading-snug">{currentChallenge.auditorPrecedentOrLaw}</span>
                      </div>
                    </div>

                    {/* Next Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide flex items-center space-x-2 transition-all shadow-xs"
                      >
                        <span>{currentIndex + 1 < POLICY_LITERACY_CHALLENGES.length ? "Next Challenge" : "View Final Scorecard"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      ) : (
        /* Final Results & Completion Screen */
        <div className="py-8 space-y-6 text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Quest Completed!
            </h4>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getRankBadge(score).color}`}>
              Rank: {getRankBadge(score).title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {getRankBadge(score).desc}
            </p>
          </div>

          {/* Final Score Stat Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">Final Score</span>
              <span className="text-xl font-black text-slate-900 font-mono">{score}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">Peak Streak</span>
              <span className="text-xl font-black text-amber-600 font-mono">{highestStreak}x</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 block uppercase">Accuracy</span>
              <span className="text-xl font-black text-emerald-600 font-mono">
                {Math.round((answerHistory.filter((a) => a.mandateCorrect && a.solutionCorrect).length / POLICY_LITERACY_CHALLENGES.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleShareScore}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-xs"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-200" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedShare ? "Result Copied to Clipboard!" : "Share Katiba Result"}</span>
            </button>
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-2 transition-all border border-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
