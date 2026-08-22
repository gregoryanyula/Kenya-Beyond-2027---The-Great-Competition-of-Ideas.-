import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Vote, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  TrendingUp, 
  Users, 
  Share2, 
  Sparkles, 
  RefreshCw, 
  MessageSquare, 
  Info,
  Filter,
  Check,
  Send
} from "lucide-react";

export interface PollTopic {
  id: string;
  title: string;
  domain: string;
  presentedEvidence: string;
  sourceAuthority: string;
  officialMetric: string;
  agreeCount: number;
  disagreeCount: number;
  needAuditCount: number;
  fiscalConcernCount: number;
  totalVotes: number;
  userVote?: "agree" | "disagree" | "need_audit" | "fiscal_concern" | null;
  sampleComments: { author: string; county: string; comment: string; time: string }[];
}

const STORAGE_KEY = "kenya2027_live_accountability_polls_v1";

const INITIAL_POLLS: PollTopic[] = [
  {
    id: "poll-debt-service",
    title: "National Debt Service Ratio vs. Development Expenditure",
    domain: "Economy & Public Debt",
    presentedEvidence: "Auditor-General and Central Bank data indicate debt service absorbs 61.2% of ordinary revenue in FY 2025/26, surpassing the 35% statutory safe threshold and constraining county development transfers.",
    sourceAuthority: "Central Bank of Kenya (CBK) Bulletin & National Treasury Outturn",
    officialMetric: "61.2% of ordinary revenue allocated to debt service",
    agreeCount: 1420,
    disagreeCount: 310,
    needAuditCount: 540,
    fiscalConcernCount: 890,
    totalVotes: 3160,
    sampleComments: [
      { author: "Erick N.", county: "Nairobi", comment: "The evidence is indisputable. We must enforce Article 201(c) generation sharing before contracting any new commercial Eurobonds.", time: "10 mins ago" },
      { author: "Amina K.", county: "Mombasa", comment: "We need forensic audits on where previous infrastructure borrowings were utilized before voting in 2027.", time: "25 mins ago" }
    ]
  },
  {
    id: "poll-housing-levy",
    title: "Affordable Housing Programme: Delivery vs. Target Absorption",
    domain: "Housing & Infrastructure",
    presentedEvidence: "The National Housing Corporation has delivered 48,000 units against a 5-year target of 250,000 units, while collecting KES 65B annually from the statutory housing levy.",
    sourceAuthority: "Parliamentary Budget Office (PBO) & State Department for Housing",
    officialMetric: "19.2% physical delivery rate at KES 130B total levy expenditure",
    agreeCount: 680,
    disagreeCount: 1240,
    needAuditCount: 910,
    fiscalConcernCount: 750,
    totalVotes: 3580,
    sampleComments: [
      { author: "Jackson O.", county: "Kisumu", comment: "Progress is visible on site in Makongeni and Kibera, but rural devolution counties have not seen matching construction volumes.", time: "1 hour ago" },
      { author: "Wairimu M.", county: "Nakuru", comment: "The levy is regressive for low-income salaried workers who already own ancestral rural homesteads.", time: "2 hours ago" }
    ]
  },
  {
    id: "poll-sha-health",
    title: "Social Health Authority (SHA) Transition & Dispensary Drug Stocks",
    domain: "Healthcare & Social Protection",
    presentedEvidence: "Transition from NHIF to SHA has enrolled 14.8 million Kenyans, but 42% of Level 2/3 primary rural health facilities report delayed claim reimbursements and recurring essential medicine shortages.",
    sourceAuthority: "Kenya Medical Practitioners & Controller of Budget (COB) County Reports",
    officialMetric: "14.8M registered citizens vs 42% sub-county claim latency",
    agreeCount: 890,
    disagreeCount: 1650,
    needAuditCount: 780,
    fiscalConcernCount: 610,
    totalVotes: 3930,
    sampleComments: [
      { author: "Dr. Kiprono", county: "Uasin Gishu", comment: "The digital portal is active, but dispensaries need immediate ring-fenced drug supplies from KEMSA.", time: "30 mins ago" }
    ]
  },
  {
    id: "poll-fertilizer-subsidies",
    title: "KES 2,500 Subsidized Fertilizer Program & Grain Harvest Gains",
    domain: "Agriculture & Food Sovereignty",
    presentedEvidence: "Maize production expanded from 44 million bags in 2022 to 67 million bags in 2025 following subsidized fertilizer distribution to 6.2 million registered farmers on the e-voucher system.",
    sourceAuthority: "Ministry of Agriculture & KNBS Economic Survey 2026",
    officialMetric: "+52.2% national maize output gain over 36-month baseline",
    agreeCount: 2310,
    disagreeCount: 420,
    needAuditCount: 390,
    fiscalConcernCount: 280,
    totalVotes: 3400,
    sampleComments: [
      { author: "Chebet S.", county: "Trans Nzoia", comment: "The subsidized fertilizer helped our cooperative harvest record bags. Now we urgently need constituency mobile dryers.", time: "15 mins ago" }
    ]
  }
];

interface LiveDebatePollProps {
  onOpenModeratorDossier?: (figureName: string, claim: string) => void;
}

export const LiveDebatePoll: React.FC<LiveDebatePollProps> = ({ onOpenModeratorDossier }) => {
  const [polls, setPolls] = useState<PollTopic[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_POLLS;
  });

  const [activePollId, setActivePollId] = useState<string>(polls[0]?.id || "poll-debt-service");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [userComment, setUserComment] = useState<string>("");
  const [userAuthorName, setUserAuthorName] = useState<string>("");
  const [userCounty, setUserCounty] = useState<string>("Nairobi");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));
    } catch (e) {
      console.warn("Error saving polls:", e);
    }
  }, [polls]);

  const activePoll = polls.find((p) => p.id === activePollId) || polls[0];

  const handleVote = (pollId: string, option: "agree" | "disagree" | "need_audit" | "fiscal_concern") => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        const previousVote = poll.userVote;
        if (previousVote === option) {
          // Unvote
          const updated = {
            ...poll,
            userVote: null,
            totalVotes: Math.max(0, poll.totalVotes - 1),
            agreeCount: previousVote === "agree" ? poll.agreeCount - 1 : poll.agreeCount,
            disagreeCount: previousVote === "disagree" ? poll.disagreeCount - 1 : poll.disagreeCount,
            needAuditCount: previousVote === "need_audit" ? poll.needAuditCount - 1 : poll.needAuditCount,
            fiscalConcernCount: previousVote === "fiscal_concern" ? poll.fiscalConcernCount - 1 : poll.fiscalConcernCount
          };
          return updated;
        }

        // Adjust counts
        let newAgree = poll.agreeCount;
        let newDisagree = poll.disagreeCount;
        let newNeedAudit = poll.needAuditCount;
        let newFiscal = poll.fiscalConcernCount;

        if (previousVote === "agree") newAgree--;
        if (previousVote === "disagree") newDisagree--;
        if (previousVote === "need_audit") newNeedAudit--;
        if (previousVote === "fiscal_concern") newFiscal--;

        if (option === "agree") newAgree++;
        if (option === "disagree") newDisagree++;
        if (option === "need_audit") newNeedAudit++;
        if (option === "fiscal_concern") newFiscal++;

        const newTotal = poll.totalVotes + (previousVote ? 0 : 1);

        return {
          ...poll,
          userVote: option,
          agreeCount: newAgree,
          disagreeCount: newDisagree,
          needAuditCount: newNeedAudit,
          fiscalConcernCount: newFiscal,
          totalVotes: newTotal
        };
      })
    );

    setToastMessage(`Your vote on "${activePoll.title.slice(0, 30)}..." has been recorded!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newComment = {
      author: userAuthorName.trim() || "Engaged Citizen",
      county: userCounty,
      comment: userComment.trim(),
      time: "Just now"
    };

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== activePollId) return poll;
        return {
          ...poll,
          sampleComments: [newComment, ...poll.sampleComments]
        };
      })
    );

    setUserComment("");
    setToastMessage("Your civic testimony was added to the public debate log!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSharePoll = () => {
    const text = `🇰🇪 Kenya 2027 Live Accountability Poll on "${activePoll.title}": ${Math.round((activePoll.agreeCount / (activePoll.totalVotes || 1)) * 100)}% Agree with the evidence presented. Cast your vote: #UsitupatieSlogan #Kenya2027`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Calculations
  const total = activePoll.totalVotes || 1;
  const agreePct = Math.round((activePoll.agreeCount / total) * 100);
  const disagreePct = Math.round((activePoll.disagreeCount / total) * 100);
  const auditPct = Math.round((activePoll.needAuditCount / total) * 100);
  const fiscalPct = Math.round((activePoll.fiscalConcernCount / total) * 100);

  const filteredPolls = selectedDomain === "All"
    ? polls
    : polls.filter((p) => p.domain === selectedDomain);

  const uniqueDomains = ["All", ...Array.from(new Set(polls.map((p) => p.domain)))];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="live-accountability-poll">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Vote className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time Citizen Consensus & Evidence Verification Poll</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Live Policy Debate Evidence Poll
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Do you agree or disagree with the official delivery records and manifesto claims presented during policy debates? Cast your vote and see real-time aggregated consensus from all 47 counties.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSharePoll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{copiedLink ? "Copied!" : "Share Poll"}</span>
            </button>

            {onOpenModeratorDossier && (
              <button
                onClick={() => onOpenModeratorDossier("Kenyan Leadership", activePoll.presentedEvidence)}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Moderator Context</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-slate-400 text-2xs uppercase tracking-wider mr-1">
          Filter:
        </span>
        {uniqueDomains.map((dom, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              selectedDomain === dom
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Poll Selector & Right Active Poll */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Poll Topic List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-2xs font-black text-slate-400 uppercase tracking-widest block">
            Active Scrutiny Topics ({filteredPolls.length})
          </span>
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredPolls.map((poll) => {
              const isSelected = poll.id === activePollId;
              const pollAgree = Math.round((poll.agreeCount / (poll.totalVotes || 1)) * 100);
              return (
                <div
                  key={poll.id}
                  onClick={() => setActivePollId(poll.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isSelected ? "bg-slate-800 text-emerald-300" : "bg-white text-slate-600 border border-slate-200"
                    }`}>
                      {poll.domain}
                    </span>
                    <span className={`font-mono text-[10px] ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                      {poll.totalVotes.toLocaleString()} votes
                    </span>
                  </div>

                  <h4 className="font-bold line-clamp-2 leading-snug">
                    {poll.title}
                  </h4>

                  {/* Tiny sentiment meter */}
                  <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-slate-200">
                    <div style={{ width: `${pollAgree}%` }} className="bg-emerald-500" />
                    <div style={{ width: `${100 - pollAgree}%` }} className="bg-rose-500" />
                  </div>

                  {poll.userVote && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <Check className="w-3 h-3" />
                      <span>You Voted: {poll.userVote.replace("_", " ").toUpperCase()}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Poll Breakdown & Voting Interface (8 cols) */}
        <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
          {/* Header */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {activePoll.domain}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {activePoll.totalVotes.toLocaleString()} Verified Citizen Votes
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {activePoll.title}
            </h3>

            {/* Official Evidence Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Presented Empirical Evidence & Official Baseline:
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">
                "{activePoll.presentedEvidence}"
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 border-t border-slate-200">
                <span>🏛️ <strong className="text-slate-700">Source:</strong> {activePoll.sourceAuthority}</span>
                <span>📊 <strong className="text-slate-700">Metric:</strong> {activePoll.officialMetric}</span>
              </div>
            </div>
          </div>

          {/* Interactive Voting Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Cast Your Verified Stance:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleVote(activePoll.id, "agree")}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                  activePoll.userVote === "agree"
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400"
                    : "bg-white hover:bg-emerald-50/50 text-slate-800 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs">Agree with Evidence</span>
                  </div>
                  <span className="font-mono text-sm font-black">{agreePct}%</span>
                </div>
                <span className="text-[11px] opacity-80 leading-snug">
                  The data matches observable delivery and official statutory reports.
                </span>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                  <div style={{ width: `${agreePct}%` }} className="bg-emerald-400 h-full" />
                </div>
              </button>

              <button
                onClick={() => handleVote(activePoll.id, "disagree")}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                  activePoll.userVote === "disagree"
                    ? "bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-400"
                    : "bg-white hover:bg-rose-50/50 text-slate-800 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-xs">Disagree with Evidence</span>
                  </div>
                  <span className="font-mono text-sm font-black">{disagreePct}%</span>
                </div>
                <span className="text-[11px] opacity-80 leading-snug">
                  Contradicted by on-the-ground reality or selective metric cherry-picking.
                </span>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                  <div style={{ width: `${disagreePct}%` }} className="bg-rose-400 h-full" />
                </div>
              </button>

              <button
                onClick={() => handleVote(activePoll.id, "need_audit")}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                  activePoll.userVote === "need_audit"
                    ? "bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-400"
                    : "bg-white hover:bg-amber-50/50 text-slate-800 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs">Need Independent Audit</span>
                  </div>
                  <span className="font-mono text-sm font-black">{auditPct}%</span>
                </div>
                <span className="text-[11px] opacity-80 leading-snug">
                  Requires Auditor-General forensic review before drawing conclusions.
                </span>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                  <div style={{ width: `${auditPct}%` }} className="bg-amber-400 h-full" />
                </div>
              </button>

              <button
                onClick={() => handleVote(activePoll.id, "fiscal_concern")}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                  activePoll.userVote === "fiscal_concern"
                    ? "bg-purple-700 text-white border-purple-800 shadow-md ring-2 ring-purple-400"
                    : "bg-white hover:bg-purple-50/50 text-slate-800 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-300" />
                    <span className="font-bold text-xs">Article 201 Fiscal Concern</span>
                  </div>
                  <span className="font-mono text-sm font-black">{fiscalPct}%</span>
                </div>
                <span className="text-[11px] opacity-80 leading-snug">
                  Violates prudent debt management or generational burden equity.
                </span>
                <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                  <div style={{ width: `${fiscalPct}%` }} className="bg-purple-400 h-full" />
                </div>
              </button>
            </div>
          </div>

          {/* Aggregated Results Bar */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Aggregated Consensus Distribution</span>
              </span>
              <span className="font-mono text-slate-500">
                {activePoll.totalVotes.toLocaleString()} total respondents
              </span>
            </div>

            <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
              <div style={{ width: `${agreePct}%` }} className="bg-emerald-500 transition-all" title={`Agree: ${agreePct}%`} />
              <div style={{ width: `${disagreePct}%` }} className="bg-rose-500 transition-all" title={`Disagree: ${disagreePct}%`} />
              <div style={{ width: `${auditPct}%` }} className="bg-amber-500 transition-all" title={`Need Audit: ${auditPct}%`} />
              <div style={{ width: `${fiscalPct}%` }} className="bg-purple-600 transition-all" title={`Article 201: ${fiscalPct}%`} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-2xs pt-2">
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="text-emerald-900 font-bold">Agree</span>
                <span className="font-mono font-black text-emerald-950">{agreePct}% ({activePoll.agreeCount})</span>
              </div>
              <div className="p-2 rounded bg-rose-50 border border-rose-200 flex items-center justify-between">
                <span className="text-rose-900 font-bold">Disagree</span>
                <span className="font-mono font-black text-rose-950">{disagreePct}% ({activePoll.disagreeCount})</span>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200 flex items-center justify-between">
                <span className="text-amber-900 font-bold">Need Audit</span>
                <span className="font-mono font-black text-amber-950">{auditPct}% ({activePoll.needAuditCount})</span>
              </div>
              <div className="p-2 rounded bg-purple-50 border border-purple-200 flex items-center justify-between">
                <span className="text-purple-900 font-bold">Article 201</span>
                <span className="font-mono font-black text-purple-950">{fiscalPct}% ({activePoll.fiscalConcernCount})</span>
              </div>
            </div>
          </div>

          {/* Citizen Commentary Form & Community Voices */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Add Your Grounded Feedback on this Evidence</span>
            </span>

            <form onSubmit={handleAddComment} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name / Handle (optional)"
                  value={userAuthorName}
                  onChange={(e) => setUserAuthorName(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                />
                <select
                  value={userCounty}
                  onChange={(e) => setUserCounty(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                >
                  <option value="Nairobi">Nairobi County</option>
                  <option value="Mombasa">Mombasa County</option>
                  <option value="Kisumu">Kisumu County</option>
                  <option value="Nakuru">Nakuru County</option>
                  <option value="Uasin Gishu">Uasin Gishu County</option>
                  <option value="Garissa">Garissa County</option>
                  <option value="Machakos">Machakos County</option>
                  <option value="Trans Nzoia">Trans Nzoia County</option>
                  <option value="Kiambu">Kiambu County</option>
                  <option value="Kilifi">Kilifi County</option>
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="State your evidence-based reflection or local ward observation..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </form>

            {/* Comment Stream */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 max-h-48 overflow-y-auto">
              {activePoll.sampleComments.map((comm, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{comm.author} ({comm.county})</span>
                    <span className="text-[10px] text-slate-400 font-mono">{comm.time}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    "{comm.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
