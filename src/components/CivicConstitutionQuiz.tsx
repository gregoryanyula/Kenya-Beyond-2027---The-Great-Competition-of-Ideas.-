import React, { useState } from "react";
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Bookmark
} from "lucide-react";
import { CONSTITUTION_QUIZ_QUESTIONS, ConstitutionQuizQuestion } from "../data/civicConstitutionQuizData";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";

interface CivicConstitutionQuizProps {
  onSelectPolicyForAudit?: (policyTopic: string, domain: string) => void;
}

export const CivicConstitutionQuiz: React.FC<CivicConstitutionQuizProps> = ({ onSelectPolicyForAudit }) => {
  const { addToWatchlist } = useCivicWatchlist();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion: ConstitutionQuizQuestion = CONSTITUTION_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerRevealed) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
    setIsAnswerRevealed(true);

    // Track achievement progress in localStorage
    try {
      const achievements = JSON.parse(localStorage.getItem("kenya2027_civic_achievements") || "{}");
      achievements.quizQuestionsAnswered = (achievements.quizQuestionsAnswered || 0) + 1;
      localStorage.setItem("kenya2027_civic_achievements", JSON.stringify(achievements));
    } catch (e) {
      console.warn("Could not save achievement state:", e);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerRevealed(false);
    if (currentIdx < CONSTITUTION_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      // Award Constitutional Scholar achievement if score >= 80%
      const totalCorrect = CONSTITUTION_QUIZ_QUESTIONS.filter((q) => {
        const sel = selectedAnswers[q.id];
        const opt = q.options.find((o) => o.id === sel);
        return opt?.isCorrect;
      }).length;
      const scorePct = Math.round((totalCorrect / CONSTITUTION_QUIZ_QUESTIONS.length) * 100);

      try {
        const achievements = JSON.parse(localStorage.getItem("kenya2027_civic_achievements") || "{}");
        achievements.constitutionQuizScore = scorePct;
        if (scorePct >= 75) {
          achievements.constitutionalScholar = true;
        }
        localStorage.setItem("kenya2027_civic_achievements", JSON.stringify(achievements));
      } catch (e) {
        console.warn("Could not save achievement state:", e);
      }
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setIsAnswerRevealed(false);
    setCurrentIdx(0);
    setQuizFinished(false);
  };

  // Calculate final category scores
  const calculateCategoryScores = () => {
    const categories: Record<string, { total: number; correct: number; domain: string; topics: string[] }> = {};

    CONSTITUTION_QUIZ_QUESTIONS.forEach((q) => {
      if (!categories[q.category]) {
        categories[q.category] = {
          total: 0,
          correct: 0,
          domain: q.policyDomainAlignment,
          topics: q.recommendedAuditTopics
        };
      }
      categories[q.category].total += 1;
      const sel = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.id === sel);
      if (opt?.isCorrect) {
        categories[q.category].correct += 1;
      }
    });

    return categories;
  };

  const totalCorrect = CONSTITUTION_QUIZ_QUESTIONS.filter((q) => {
    const sel = selectedAnswers[q.id];
    const opt = q.options.find((o) => o.id === sel);
    return opt?.isCorrect;
  }).length;

  const scorePercentage = Math.round((totalCorrect / CONSTITUTION_QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="civic-constitution-quiz">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive 2010 Constitution Scrutiny Test</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Civic Constitution Quiz & Policy Alignment Bridge
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Test your knowledge of the 2010 Kenyan Constitution (Public Finance, Human Rights, Devolution, and Leadership). Your quiz results dynamically identify policies in the Audit Tool that align with your constitutional priorities.
            </p>
          </div>

          {!quizFinished && (
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-mono text-slate-500">
                Question {currentIdx + 1} of {CONSTITUTION_QUIZ_QUESTIONS.length}
              </span>
              <div className="w-24 bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / CONSTITUTION_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {!quizFinished ? (
        /* Active Question Card */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                {currentQuestion.articleCitation}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Category: {currentQuestion.category}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h4>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswers[currentQuestion.id] === opt.id;
                let btnStyle = "bg-white border-slate-200 hover:border-slate-300 text-slate-800";

                if (isAnswerRevealed) {
                  if (opt.isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs";
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-950 line-through opacity-80";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswerRevealed}
                    className={`w-full p-4 rounded-xl border text-left transition-all text-xs flex items-start gap-3 group ${btnStyle}`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 ${
                      isAnswerRevealed && opt.isCorrect
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : isAnswerRevealed && isSelected && !opt.isCorrect
                          ? "bg-rose-600 text-white border-rose-600"
                          : "border-slate-300 group-hover:border-slate-500 text-slate-700"
                    }`}>
                      {opt.id.toUpperCase()}
                    </span>
                    <div className="flex-1 space-y-1">
                      <span className="leading-relaxed block">{opt.text}</span>
                      {isAnswerRevealed && (opt.isCorrect || isSelected) && (
                        <p className={`text-[11px] mt-1 pt-1 border-t ${opt.isCorrect ? "text-emerald-800 border-emerald-200" : "text-rose-800 border-rose-200"}`}>
                          💡 {opt.explanation}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 italic">
              {isAnswerRevealed ? "Review constitutional rationale above, then proceed." : "Select the most constitutionally sound answer."}
            </span>

            {isAnswerRevealed && (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <span>{currentIdx === CONSTITUTION_QUIZ_QUESTIONS.length - 1 ? "See Final Score & Policy Bridge" : "Next Question"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Scorecard & Policy Bridge */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Score Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 inline-block">
                Constitutional Scrutiny Certificate
              </span>
              <h4 className="text-2xl font-black text-white">
                {scorePercentage >= 80 ? "🏆 Constitutional Scholar" : scorePercentage >= 60 ? "🎖️ Civic Policy Watcher" : "📚 Civic Explorer"}
              </h4>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                You correctly answered {totalCorrect} out of {CONSTITUTION_QUIZ_QUESTIONS.length} constitutional challenges. Below is your domain mastery profile and targeted policies for 2027 manifesto auditing.
              </p>
            </div>

            <div className="text-center bg-slate-800/80 p-5 rounded-xl border border-slate-700 shrink-0 min-w-[140px]">
              <span className="text-3xl font-black text-emerald-400">{scorePercentage}%</span>
              <span className="text-[10px] block text-slate-400 uppercase font-mono mt-1">
                {totalCorrect}/{CONSTITUTION_QUIZ_QUESTIONS.length} Correct
              </span>
            </div>
          </div>

          {/* Category Mastery Breakdown & Suggested Policy Bridge */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Constitutional Mastery & Recommended Policy Audits</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">
                Click any proposal to test in Audit Tool
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(calculateCategoryScores()).map(([catName, data], idx) => {
                const catScore = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{catName}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          catScore >= 75 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {catScore}% Mastery ({data.correct}/{data.total})
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${catScore >= 75 ? "bg-emerald-600" : "bg-amber-500"}`}
                          style={{ width: `${catScore}%` }}
                        />
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Recommended 2027 Proposals to Audit:
                        </span>
                        <div className="space-y-1.5">
                          {data.topics.map((topic, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={() => {
                                if (onSelectPolicyForAudit) {
                                  onSelectPolicyForAudit(topic, data.domain);
                                }
                              }}
                              className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-xs font-medium text-slate-800 flex items-center justify-between group transition-colors"
                            >
                              <span className="truncate group-hover:text-blue-900">📄 {topic}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Aligned Domain: <strong className="text-slate-700">{data.domain}</strong></span>
                      <button
                        onClick={() => {
                          addToWatchlist({
                            id: `cw-quiz-${idx}`,
                            type: "domain",
                            title: catName,
                            subtitle: `Constitutional focus area with ${catScore}% quiz mastery`,
                            domain: data.domain,
                            tag: "Constitution Quiz Recommended",
                            source: "2010 Constitution Quiz Engine"
                          });
                        }}
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                        title="Bookmark to Watchlist"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Bookmark</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Constitution Quiz</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
