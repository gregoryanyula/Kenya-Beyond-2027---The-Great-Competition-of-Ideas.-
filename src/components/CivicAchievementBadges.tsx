import React, { useState, useEffect } from "react";
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Share2, 
  Download, 
  Star, 
  Flame, 
  Scale, 
  BookOpen, 
  Mic, 
  Search, 
  MapPin, 
  Flag,
  ChevronRight,
  Info
} from "lucide-react";

export interface CivicBadge {
  id: string;
  name: string;
  category: "Scrutiny" | "Constitutional" | "Grassroots" | "Integrity";
  description: string;
  criteria: string;
  icon: any;
  color: string;
  badgeLevel: "Bronze" | "Silver" | "Gold" | "Platinum";
  isUnlocked: boolean;
  unlockedAt?: string;
  xpValue: number;
}

export const CivicAchievementBadges: React.FC = () => {
  const [achievements, setAchievements] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_civic_achievements");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [hasPledged, setHasPledged] = useState<boolean>(() => {
    try {
      return localStorage.getItem("kenya2027_civic_pledge_signed") === "true";
    } catch {
      return false;
    }
  });

  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [citizenName, setCitizenName] = useState<string>("Engaged Kenyan Citizen");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync state from storage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("kenya2027_civic_achievements");
        if (saved) setAchievements(JSON.parse(saved));
        setHasPledged(localStorage.getItem("kenya2027_civic_pledge_signed") === "true");
      } catch (e) {
        console.warn("Storage sync error:", e);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Compute unlock statuses
  const badges: CivicBadge[] = [
    {
      id: "b-policy-analyst",
      name: "Policy Analyst",
      category: "Scrutiny",
      description: "Tested campaign promises with the 13-point Article 201 Scrutiny Matrix.",
      criteria: "Complete at least 1 comprehensive policy audit.",
      icon: Scale,
      color: "emerald",
      badgeLevel: "Silver",
      isUnlocked: achievements.auditsCompleted > 0 || achievements.policyAudited,
      xpValue: 150
    },
    {
      id: "b-accountability-champion",
      name: "Accountability Champion",
      category: "Integrity",
      description: "Cross-examined official government delivery against manifesto records.",
      criteria: "Audit a government delivery or opposition alternative item.",
      icon: ShieldCheck,
      color: "blue",
      badgeLevel: "Gold",
      isUnlocked: achievements.accountabilityInspected || true, // default active for explorer
      xpValue: 200
    },
    {
      id: "b-constitutional-scholar",
      name: "Constitutional Scholar",
      category: "Constitutional",
      description: "Demonstrated mastery of the 2010 Constitution of Kenya.",
      criteria: "Score 75% or higher on the Civic Constitution Quiz.",
      icon: BookOpen,
      color: "amber",
      badgeLevel: "Platinum",
      isUnlocked: (achievements.constitutionQuizScore || 0) >= 75 || achievements.constitutionalScholar,
      xpValue: 300
    },
    {
      id: "b-grassroots-voice",
      name: "Grassroots Voice",
      category: "Grassroots",
      description: "Recorded and contributed a localized citizen audio reflection.",
      criteria: "Record or publish an audio testimony for your county.",
      icon: Mic,
      color: "rose",
      badgeLevel: "Silver",
      isUnlocked: achievements.audioRecorded || achievements.communityReflectionsCount > 0,
      xpValue: 150
    },
    {
      id: "b-debate-fact-checker",
      name: "Debate Fact-Checker",
      category: "Scrutiny",
      description: "Grounded political rhetoric in verified KNBS, CBK, and OAG evidence.",
      criteria: "Audit a live debate quote or claim in the Fact-Check Aggregator.",
      icon: Search,
      color: "purple",
      badgeLevel: "Gold",
      isUnlocked: achievements.factChecksRun > 0 || true,
      xpValue: 200
    },
    {
      id: "b-regional-equity",
      name: "Regional Equity Advocate",
      category: "Grassroots",
      description: "Audited county development gaps and budget equity on the heatmap.",
      criteria: "Inspect 3 county development gaps on the regional map.",
      icon: MapPin,
      color: "teal",
      badgeLevel: "Bronze",
      isUnlocked: achievements.heatmapExplored || true,
      xpValue: 100
    },
    {
      id: "b-kenya-2060",
      name: "Kenya 2060 Guardian",
      category: "Constitutional",
      description: "Evaluated 33-year long-term continuity beyond electoral cycles.",
      criteria: "Review the Kenya 2060 Continuity Charter.",
      icon: Flag,
      color: "indigo",
      badgeLevel: "Silver",
      isUnlocked: achievements.kenya2060Viewed || true,
      xpValue: 150
    },
    {
      id: "b-civic-pledger",
      name: "2027 Civic Pledger",
      category: "Integrity",
      description: "Committed to non-violent, issue-based, evidence-driven scrutiny.",
      criteria: "Sign the official 2027 Non-Partisan Civic Pledge.",
      icon: Sparkles,
      color: "emerald",
      badgeLevel: "Gold",
      isUnlocked: hasPledged,
      xpValue: 250
    }
  ];

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const totalXp = badges.filter((b) => b.isUnlocked).reduce((sum, b) => sum + b.xpValue, 0);

  // Compute citizen level (1 to 5)
  let citizenRank = "Novice Citizen Watcher";
  let nextRankXp = 300;
  let level = 1;

  if (totalXp >= 1200) {
    citizenRank = "Senior Civic Fellow (Level 5)";
    nextRankXp = 1500;
    level = 5;
  } else if (totalXp >= 800) {
    citizenRank = "Constitutional Vanguard (Level 4)";
    nextRankXp = 1200;
    level = 4;
  } else if (totalXp >= 500) {
    citizenRank = "Policy Auditor (Level 3)";
    nextRankXp = 800;
    level = 3;
  } else if (totalXp >= 250) {
    citizenRank = "Civic Watcher (Level 2)";
    nextRankXp = 500;
    level = 2;
  }

  const handleShareBadgeCard = () => {
    const text = `🇰🇪 I've unlocked ${unlockedCount}/${badges.length} Civic Badges on Kenya 2027 (Rank: ${citizenRank}). Let's hold leaders accountable with evidence! #UsitupatieSlogan #Kenya2027`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="civic-achievement-system">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Civic Scrutiny Credential & Gamified Recognition</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Civic Engagement Badges & Credential System
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Earn non-partisan virtual badges for auditing manifestos, completing constitutional quizzes, submitting audio reflections, and demanding real costing.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Civic Credential Card</span>
            </button>
            <button
              onClick={handleShareBadgeCard}
              className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Level Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
              Citizen Standing: Level {level}
            </span>
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{citizenRank}</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs text-slate-400">
              Active contributor to Kenya's 2027 evidence-based democracy.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <div className="text-center">
              <span className="text-2xl font-black text-amber-400">{unlockedCount} / {badges.length}</span>
              <span className="text-[9px] block text-slate-400 uppercase font-mono">Badges Earned</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center">
              <span className="text-2xl font-black text-emerald-400">{totalXp}</span>
              <span className="text-[9px] block text-slate-400 uppercase font-mono">Civic Scrutiny XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Progress to Next Rank</span>
            <span>{totalXp} / {nextRankXp} XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-amber-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((totalXp / nextRankXp) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Available Virtual Badges & Scrutiny Milestones
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {unlockedCount} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between space-y-3 relative group ${
                  b.isUnlocked
                    ? "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                    : "bg-slate-50 border-slate-200/80 opacity-75"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      b.isUnlocked
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-200 text-slate-400"
                    }`}>
                      {b.isUnlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                    </div>

                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                      b.isUnlocked
                        ? "bg-amber-50 text-amber-900 border-amber-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                      {b.badgeLevel} • +{b.xpValue} XP
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-3 leading-snug">
                    {b.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className={b.isUnlocked ? "text-emerald-700 font-bold flex items-center gap-1" : "text-slate-400 flex items-center gap-1"}>
                    {b.isUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Unlocked & Verified</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Locked</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Credential Card Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">
                Official Kenya 2027 Civic Credential Card
              </h4>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Certificate Preview Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-2 border-amber-500/40 space-y-5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-emerald-600 to-red-600" />
              
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  REPUBLIC OF KENYA • 2027 CIVIC INTEGRITY
                </span>
                <h3 className="text-lg font-black tracking-tight text-white">
                  CERTIFICATE OF CITIZEN POLICY AUDITOR
                </h3>
              </div>

              <div className="py-2">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Awarded To</p>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="mt-1 text-center font-bold text-base text-amber-300 bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 w-full focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                  placeholder="Enter your name or handle"
                />
              </div>

              <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
                <p>
                  Has demonstrated verified participation in <strong>Kenya 2027 Policy Scrutiny</strong>, upholding Article 201 public finance standards, evidence-based manifesto review, and non-partisan issue evaluation.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Rank: <strong className="text-white">{citizenRank}</strong></span>
                <span>Badges: <strong className="text-amber-400">{unlockedCount} / {badges.length}</strong></span>
                <span>Issued: 2027 Cycle</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                You can print or share this badge with fellow citizens.
              </span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
