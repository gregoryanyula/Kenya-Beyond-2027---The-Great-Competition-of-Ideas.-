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
  Bookmark,
  Volume2,
  VolumeX,
  Flame,
  Filter
} from "lucide-react";
import { CONSTITUTION_QUIZ_QUESTIONS, ConstitutionQuizQuestion } from "../data/civicConstitutionQuizData";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";
import { useCivicAccessibility } from "../context/CivicAccessibilityContext";

interface CivicConstitutionQuizProps {
  onSelectPolicyForAudit?: (policyTopic: string, domain: string) => void;
}

export const CivicConstitutionQuiz: React.FC<CivicConstitutionQuizProps> = ({ onSelectPolicyForAudit }) => {
  const { addToWatchlist } = useCivicWatchlist();
  const { speakText, stopSpeaking, isSpeaking } = useCivicAccessibility();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  // Filter questions by category if selected
  const filteredQuestions = selectedCategory === "all" 
    ? CONSTITUTION_QUIZ_QUESTIONS 
    : CONSTITUTION_QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);

  const currentQuestion: ConstitutionQuizQuestion = filteredQuestions[currentIdx] || filteredQuestions[0] || CONSTITUTION_QUIZ_QUESTIONS[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerRevealed) return;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
    setIsAnswerRevealed(true);

    const chosenOpt = currentQuestion.options.find(o => o.id === optionId);
    if (chosenOpt?.isCorrect) {
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreakCount(0);
    }

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
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      const totalCorrect = filteredQuestions.filter((q) => {
        const sel = selectedAnswers[q.id];
        const opt = q.options.find((o) => o.id === sel);
        return opt?.isCorrect;
      }).length;
      const scorePct = Math.round((totalCorrect / filteredQuestions.length) * 100);

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
    setStreakCount(0);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedAnswers({});
    setIsAnswerRevealed(false);
    setCurrentIdx(0);
    setQuizFinished(false);
    setStreakCount(0);
  };

  const handleReadQuestionAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textToRead = `${currentQuestion.articleCitation}. Question: ${currentQuestion.question}. Options: ${currentQuestion.options.map(o => `${o.id.toUpperCase()}: ${o.text}`).join(". ")}`;
      speakText(textToRead);
    }
  };

  // Calculate category scores
  const calculateCategoryScores = () => {
    const categories: Record<string, { total: number; correct: number; domain: string; topics: string[] }> = {};

    filteredQuestions.forEach((q) => {
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

  const totalCorrect = filteredQuestions.filter((q) => {
    const sel = selectedAnswers[q.id];
    const opt = q.options.find((o) => o.id === sel);
    return opt?.isCorrect;
  }).length;

  const scorePercentage = filteredQuestions.length > 0 ? Math.round((totalCorrect / filteredQuestions.length) * 100) : 0;

  const allCategories = [
    { id: "all", label: "All Topics (Comprehensive)" },
    { id: "Public Finance (Art. 201)", label: "Public Finance (Art. 201)" },
    { id: "Social & Economic Rights (Art. 43)", label: "Bill of Rights (Art. 43 & 53)" },
    { id: "Devolution & Equitable Share (Ch. 11)", label: "Devolution (Ch. 11)" },
    { id: "Leadership & Integrity (Ch. 6)", label: "Leadership (Ch. 6)" },
    { id: "National Values & Accountability (Art. 10 & 232)", label: "National Values (Art. 10)" }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="civic-constitution-quiz">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Civic Literacy Quiz (Katiba 2010 Scrutiny Engine)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Civic Literacy & Constitutional Scrutiny Quiz
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Challenge yourself with real constitutional scenarios covering Article 201 (Public Debt & Taxes), Article 43 (Health & Education), and Chapter 6 (Integrity). Receive immediate feedback and statutory rationale on every option.
            </p>
          </div>

          {!quizFinished && (
            <div className="flex items-center gap-3 shrink-0">
              {/* Streak Badge */}
              {streakCount > 1 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 font-bold text-xs animate-bounce">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{streakCount} Streak!</span>
                </div>
              )}

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-500 block">
                  Question {currentIdx + 1} of {filteredQuestions.length}
                </span>
                <div className="w-28 bg-slate-100 rounded-full h-2 mt-1">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Filter Category:</span>
          </span>
          {allCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {!quizFinished ? (
        /* Active Question Card */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {currentQuestion.articleCitation}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {currentQuestion.category}
                </span>
              </div>

              {/* TTS Read-Aloud Button */}
              <button
                onClick={handleReadQuestionAloud}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1 transition-colors"
                title={isSpeaking ? "Stop audio narration" : "Read question and options aloud"}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="text-[10px]">{isSpeaking ? "Stop Voice" : "Read Aloud"}</span>
              </button>
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
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-950 line-through opacity-85";
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
                        <div className={`text-[11px] mt-1.5 p-2 rounded-lg border leading-relaxed ${
                          opt.isCorrect 
                            ? "bg-emerald-100/70 text-emerald-900 border-emerald-300 font-medium" 
                            : "bg-rose-100/70 text-rose-900 border-rose-300 font-medium"
                        }`}>
                          <strong className="block mb-0.5">
                            {opt.isCorrect ? "✅ Constitutional Reality:" : "❌ Why this violates the Constitution / Law:"}
                          </strong>
                          {opt.explanation}
                        </div>
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
              {isAnswerRevealed ? "Review constitutional rationale above, then click next." : "Click the most constitutionally sound option."}
            </span>

            {isAnswerRevealed && (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                id="quiz-next-question-btn"
              >
                <span>{currentIdx === filteredQuestions.length - 1 ? "See Final Scorecard & Policy Bridge" : "Next Question"}</span>
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
                Civic Scrutiny Mastery Certificate
              </span>
              <h4 className="text-2xl font-black text-white">
                {scorePercentage >= 80 ? "🏆 Constitutional Scholar" : scorePercentage >= 60 ? "🎖️ Civic Policy Watcher" : "📚 Civic Explorer"}
              </h4>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                You correctly answered {totalCorrect} out of {filteredQuestions.length} constitutional challenges. Below is your domain mastery profile and targeted policies for 2027 manifesto auditing.
              </p>
            </div>

            <div className="text-center bg-slate-800/80 p-5 rounded-xl border border-slate-700 shrink-0 min-w-[140px]">
              <span className="text-3xl font-black text-emerald-400">{scorePercentage}%</span>
              <span className="text-[10px] block text-slate-400 uppercase font-mono mt-1">
                {totalCorrect}/{filteredQuestions.length} Correct
              </span>
              {bestStreak > 1 && (
                <span className="text-[9px] text-amber-400 font-bold block mt-1">
                  🔥 Max Streak: {bestStreak}
                </span>
              )}
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
                const catScore = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
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
