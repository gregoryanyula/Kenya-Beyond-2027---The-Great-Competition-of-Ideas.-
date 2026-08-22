import React, { useState, useEffect } from "react";
import { 
  Trophy, 
  Award, 
  Medal, 
  Sparkles, 
  Flame, 
  Scale, 
  Mic, 
  CheckCircle2, 
  TrendingUp, 
  Filter, 
  Search, 
  Share2, 
  ShieldCheck, 
  UserCheck, 
  ArrowUpRight,
  BookOpen,
  MapPin
} from "lucide-react";

export interface LeaderboardEntry {
  id: string;
  rank: number;
  handle: string;
  county: string;
  category: "Student Fellow" | "Grassroots Auditor" | "Policy Analyst" | "Civic Educator" | "Youth Forum Lead";
  auditsCompleted: number;
  audioReflections: number;
  quizScorePct: number;
  factChecksVerified: number;
  totalXp: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "lead-1",
    rank: 1,
    handle: "Wanjiku_Katiba",
    county: "Nairobi",
    category: "Policy Analyst",
    auditsCompleted: 48,
    audioReflections: 12,
    quizScorePct: 100,
    factChecksVerified: 34,
    totalXp: 3420,
    badgesCount: 8
  },
  {
    id: "lead-2",
    rank: 2,
    handle: "Ochieng_Auditor",
    county: "Kisumu",
    category: "Grassroots Auditor",
    auditsCompleted: 42,
    audioReflections: 15,
    quizScorePct: 95,
    factChecksVerified: 28,
    totalXp: 3080,
    badgesCount: 7
  },
  {
    id: "lead-3",
    rank: 3,
    handle: "Kipchumba_Devolution",
    county: "Uasin Gishu",
    category: "Student Fellow",
    auditsCompleted: 39,
    audioReflections: 9,
    quizScorePct: 92,
    factChecksVerified: 25,
    totalXp: 2750,
    badgesCount: 7
  },
  {
    id: "lead-4",
    rank: 4,
    handle: "Fatuma_MombasaVoice",
    county: "Mombasa",
    category: "Youth Forum Lead",
    auditsCompleted: 35,
    audioReflections: 18,
    quizScorePct: 88,
    factChecksVerified: 22,
    totalXp: 2640,
    badgesCount: 6
  },
  {
    id: "lead-5",
    rank: 5,
    handle: "Mwangi_PesaWatch",
    county: "Nyeri",
    category: "Civic Educator",
    auditsCompleted: 31,
    audioReflections: 8,
    quizScorePct: 96,
    factChecksVerified: 20,
    totalXp: 2310,
    badgesCount: 6
  },
  {
    id: "lead-6",
    rank: 6,
    handle: "Abdi_Equalization",
    county: "Garissa",
    category: "Grassroots Auditor",
    auditsCompleted: 27,
    audioReflections: 11,
    quizScorePct: 90,
    factChecksVerified: 16,
    totalXp: 2040,
    badgesCount: 5
  },
  {
    id: "lead-7",
    rank: 7,
    handle: "Cherono_KatibaFellow",
    county: "Kericho",
    category: "Student Fellow",
    auditsCompleted: 24,
    audioReflections: 6,
    quizScorePct: 85,
    factChecksVerified: 14,
    totalXp: 1790,
    badgesCount: 5
  },
  {
    id: "lead-8",
    rank: 8,
    handle: "Mutua_CountyBudget",
    county: "Machakos",
    category: "Civic Educator",
    auditsCompleted: 22,
    audioReflections: 7,
    quizScorePct: 84,
    factChecksVerified: 12,
    totalXp: 1620,
    badgesCount: 4
  }
];

export const CivicLeaderboard: React.FC = () => {
  const [filterCounty, setFilterCounty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"xp" | "audits" | "reflections" | "quiz">("xp");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // User details
  const [userHandle, setUserHandle] = useState<string>(() => {
    try {
      return localStorage.getItem("kenya2027_citizen_handle") || "Citizen Auditor (You)";
    } catch {
      return "Citizen Auditor (You)";
    }
  });

  const [userCounty, setUserCounty] = useState<string>(() => {
    try {
      return localStorage.getItem("kenya2027_citizen_county") || "Nairobi";
    } catch {
      return "Nairobi";
    }
  });

  const [userCategory, setUserCategory] = useState<"Student Fellow" | "Grassroots Auditor" | "Policy Analyst" | "Civic Educator" | "Youth Forum Lead">("Policy Analyst");

  // Load real achievements from local storage
  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem("kenya2027_civic_achievements");
      const ach = saved ? JSON.parse(saved) : {};
      const audits = Number(ach.auditsCompleted || 1);
      const reflections = Number(ach.communityReflectionsCount || 2);
      const quiz = Number(ach.constitutionQuizScore || 85);
      const factChecks = Number(ach.factChecksRun || 4);
      const totalXp = (audits * 150) + (reflections * 100) + (quiz * 10) + (factChecks * 50);
      return {
        auditsCompleted: audits,
        audioReflections: reflections,
        quizScorePct: quiz,
        factChecksVerified: factChecks,
        totalXp: Math.max(totalXp, 1250),
        badgesCount: ach.badgesEarned || 4
      };
    } catch {
      return {
        auditsCompleted: 1,
        audioReflections: 2,
        quizScorePct: 85,
        factChecksVerified: 4,
        totalXp: 1250,
        badgesCount: 4
      };
    }
  });

  // Assemble full list with the current user inserted dynamically
  const currentUserEntry: LeaderboardEntry = {
    id: "current-user",
    rank: 9, // will be sorted
    handle: userHandle,
    county: userCounty,
    category: userCategory,
    auditsCompleted: userStats.auditsCompleted,
    audioReflections: userStats.audioReflections,
    quizScorePct: userStats.quizScorePct,
    factChecksVerified: userStats.factChecksVerified,
    totalXp: userStats.totalXp,
    badgesCount: userStats.badgesCount,
    isCurrentUser: true
  };

  const combinedList = [...INITIAL_LEADERBOARD, currentUserEntry];

  // Sort list
  const sortedList = [...combinedList].sort((a, b) => {
    if (sortBy === "audits") return b.auditsCompleted - a.auditsCompleted;
    if (sortBy === "reflections") return b.audioReflections - a.audioReflections;
    if (sortBy === "quiz") return b.quizScorePct - a.quizScorePct;
    return b.totalXp - a.totalXp;
  }).map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  // Filter list
  const safeSearch = (searchQuery || "").toLowerCase();
  const safeFilterCounty = (filterCounty || "").toLowerCase();

  const filteredList = sortedList.filter(item => {
    const itemCounty = (item.county || "").toLowerCase();
    const itemHandle = (item.handle || "").toLowerCase();
    const itemCategory = (item.category || "").toLowerCase();

    const matchesCounty = filterCounty === "All" || itemCounty === safeFilterCounty;
    const matchesSearch = itemHandle.includes(safeSearch) || 
                          itemCounty.includes(safeSearch) ||
                          itemCategory.includes(safeSearch);
    return matchesCounty && matchesSearch;
  });

  const currentUserRank = sortedList.find(item => item.isCurrentUser)?.rank || 9;

  const handleSaveProfile = () => {
    try {
      localStorage.setItem("kenya2027_citizen_handle", userHandle);
      localStorage.setItem("kenya2027_citizen_county", userCounty);
    } catch (e) {
      console.warn("Storage error:", e);
    }
    setShowProfileModal(false);
  };

  const handleShareStanding = () => {
    const text = `🇰🇪 I'm currently Ranked #${currentUserRank} on the Kenya 2027 Civic Scrutiny Leaderboard with ${userStats.totalXp} XP (${userStats.auditsCompleted} Audits & ${userStats.audioReflections} Community Reflections)! Track policy with evidence at #Kenya2027`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="civic-leaderboard-section">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-amber-400 mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>National Youth Civic League & Accountability Champions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Civic Engagement Leaderboard
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Recognizing citizens and youth fellows across Kenya who conduct policy audits, ground rhetoric in verified evidence, and submit localized grassroots reflections.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Edit My Profile</span>
            </button>
            <button
              onClick={handleShareStanding}
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedShare ? "Copied Link!" : "Share Standing"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Standing Spotlight Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg border-2 border-white/20">
              #{currentUserRank}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{userHandle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {userCounty} County
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  {userCategory}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Your civic contributions have generated <strong className="text-amber-400 font-mono">{userStats.totalXp} XP</strong> towards non-partisan democratic oversight.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
            <div>
              <span className="text-lg font-black text-emerald-400">{userStats.auditsCompleted}</span>
              <span className="text-[9px] block text-slate-400 uppercase font-mono">Audits Run</span>
            </div>
            <div className="border-x border-slate-800">
              <span className="text-lg font-black text-rose-400">{userStats.audioReflections}</span>
              <span className="text-[9px] block text-slate-400 uppercase font-mono">Reflections</span>
            </div>
            <div>
              <span className="text-lg font-black text-amber-400">{userStats.quizScorePct}%</span>
              <span className="text-[9px] block text-slate-400 uppercase font-mono">Katiba Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Sorting Buttons */}
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Sort:</span>
          <button
            onClick={() => setSortBy("xp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sortBy === "xp"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🏆 Highest XP
          </button>
          <button
            onClick={() => setSortBy("audits")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sortBy === "audits"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            ⚖️ Most Audits
          </button>
          <button
            onClick={() => setSortBy("reflections")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sortBy === "reflections"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🎙️ Audio Stories
          </button>
          <button
            onClick={() => setSortBy("quiz")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sortBy === "quiz"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            📜 Constitution Score
          </button>
        </div>

        {/* Search & County Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search auditor / county..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <select
            value={filterCounty}
            onChange={(e) => setFilterCounty(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold focus:outline-hidden"
          >
            <option value="All">All Counties (47)</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Uasin Gishu">Uasin Gishu</option>
            <option value="Nyeri">Nyeri</option>
            <option value="Garissa">Garissa</option>
            <option value="Kericho">Kericho</option>
            <option value="Machakos">Machakos</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-mono text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4 text-center w-12">Rank</th>
              <th className="py-3 px-4">Citizen Fellow</th>
              <th className="py-3 px-4">County / Role</th>
              <th className="py-3 px-4 text-center">Policy Audits</th>
              <th className="py-3 px-4 text-center">Grassroots Audio</th>
              <th className="py-3 px-4 text-center">Katiba Quiz</th>
              <th className="py-3 px-4 text-right">Civic XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredList.map((entry) => {
              const isTopThree = entry.rank <= 3;
              const isCurrent = entry.isCurrentUser;

              return (
                <tr 
                  key={entry.id}
                  className={`transition-colors ${
                    isCurrent 
                      ? "bg-amber-50/80 font-bold border-l-4 border-amber-500" 
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Rank column */}
                  <td className="py-3.5 px-4 text-center">
                    {entry.rank === 1 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black">
                        🥇
                      </span>
                    )}
                    {entry.rank === 2 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-800 font-black">
                        🥈
                      </span>
                    )}
                    {entry.rank === 3 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-900/10 text-amber-800 font-black">
                        🥉
                      </span>
                    )}
                    {entry.rank > 3 && (
                      <span className="font-mono text-slate-500 font-bold">
                        #{entry.rank}
                      </span>
                    )}
                  </td>

                  {/* Citizen handle */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold uppercase ${
                        isCurrent 
                          ? "bg-amber-600 text-white" 
                          : isTopThree 
                          ? "bg-slate-900 text-white" 
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {entry.handle.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          {entry.handle}
                          {isCurrent && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-black">
                              YOU
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {entry.badgesCount} Badges Unlocked
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* County and Role */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {entry.county}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {entry.category}
                      </span>
                    </div>
                  </td>

                  {/* Audits */}
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-800">
                    {entry.auditsCompleted}
                  </td>

                  {/* Reflections */}
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-rose-700">
                    {entry.audioReflections}
                  </td>

                  {/* Katiba Quiz */}
                  <td className="py-3.5 px-4 text-center font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      entry.quizScorePct >= 90 
                        ? "bg-emerald-100 text-emerald-900" 
                        : "bg-slate-100 text-slate-800"
                    }`}>
                      {entry.quizScorePct}%
                    </span>
                  </td>

                  {/* XP */}
                  <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                    <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      {entry.totalXp.toLocaleString()} XP
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">
                Civic Leaderboard Profile
              </h4>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Citizen Handle / Alias (Non-Partisan)
                </label>
                <input
                  type="text"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  placeholder="e.g. KenyaCivicWatcher"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Primary County
                </label>
                <select
                  value={userCounty}
                  onChange={(e) => setUserCounty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-hidden"
                >
                  {["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Nyeri", "Kiambu", "Machakos", "Garissa", "Kilifi", "Kakamega", "Turkana", "Meru"].map((c) => (
                    <option key={c} value={c}>{c} County</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Civic Focus Role
                </label>
                <select
                  value={userCategory}
                  onChange={(e: any) => setUserCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:outline-hidden"
                >
                  <option value="Policy Analyst">Policy Analyst</option>
                  <option value="Grassroots Auditor">Grassroots Auditor</option>
                  <option value="Student Fellow">Student Fellow</option>
                  <option value="Civic Educator">Civic Educator</option>
                  <option value="Youth Forum Lead">Youth Forum Lead</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 shadow-xs"
              >
                Save & Update Rank
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
