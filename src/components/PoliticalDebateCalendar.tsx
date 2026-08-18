import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  BellRing, 
  Tv, 
  Radio, 
  CheckCircle2, 
  Download, 
  Share2, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  ShieldAlert, 
  Filter, 
  Search,
  MessageSquare,
  Scale,
  Users,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  AlertOctagon,
  Flame,
  Send,
  Heart,
  Activity
} from "lucide-react";
import { POLITICAL_DEBATES_DATA, PoliticalDebateEvent } from "../data/politicalDebateData";
import { LiveDebateFactCheckOverlay } from "./LiveDebateFactCheckOverlay";

type ReactionType = "agree" | "disagree" | "needs_factcheck" | "unconstitutional" | "visionary";

interface LiveReactionCounts {
  agree: number;
  disagree: number;
  needs_factcheck: number;
  unconstitutional: number;
  visionary: number;
}

interface PoliticalDebateCalendarProps {
  onAuditDebateClaim?: (quote: string, domain: string) => void;
}

export const PoliticalDebateCalendar: React.FC<PoliticalDebateCalendarProps> = ({ onAuditDebateClaim }) => {
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [activeDebateId, setActiveDebateId] = useState<string>(POLITICAL_DEBATES_DATA[0].id);
  const [showLiveFactCheckOverlay, setShowLiveFactCheckOverlay] = useState<boolean>(true);
  const [remindersEnabled, setRemindersEnabled] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_debate_reminders");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Live reactions state by quote or theme index
  const [userReactions, setUserReactions] = useState<Record<string, ReactionType>>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_debate_user_reactions");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [reactionsData, setReactionsData] = useState<Record<string, LiveReactionCounts>>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_debate_all_reactions");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Baseline seed counts
    return {
      "quote-0": { agree: 342, disagree: 88, needs_factcheck: 145, unconstitutional: 24, visionary: 110 },
      "quote-1": { agree: 189, disagree: 294, needs_factcheck: 412, unconstitutional: 98, visionary: 45 },
      "quote-2": { agree: 420, disagree: 72, needs_factcheck: 86, unconstitutional: 15, visionary: 230 },
      "theme-0": { agree: 512, disagree: 110, needs_factcheck: 204, unconstitutional: 40, visionary: 310 },
      "theme-1": { agree: 290, disagree: 380, needs_factcheck: 320, unconstitutional: 85, visionary: 95 }
    };
  });

  const [citizenNotes, setCitizenNotes] = useState<Record<string, string[]>>({
    "quote-0": [
      "Real question is: which specific tax code clause will fund the digitisation infrastructure without adding domestic debt? — Nairobi Youth Auditor",
      "Good emphasis on local software talent rather than foreign consultancy lock-in. — Mombasa Tech Hub"
    ]
  });
  const [newNoteInput, setNewNoteInput] = useState<Record<string, string>>({});

  // Active debate object
  const activeDebate = POLITICAL_DEBATES_DATA.find((d) => d.id === activeDebateId) || POLITICAL_DEBATES_DATA[0];

  // Save reactions
  useEffect(() => {
    try {
      localStorage.setItem("kenya2027_debate_user_reactions", JSON.stringify(userReactions));
      localStorage.setItem("kenya2027_debate_all_reactions", JSON.stringify(reactionsData));
    } catch (e) {
      console.warn("Could not save live reactions:", e);
    }
  }, [userReactions, reactionsData]);

  const handleRegisterReaction = (targetKey: string, reaction: ReactionType) => {
    const prevReaction = userReactions[targetKey];
    
    // If clicking same reaction, toggle off
    if (prevReaction === reaction) {
      setUserReactions((prev) => {
        const next = { ...prev };
        delete next[targetKey];
        return next;
      });
      setReactionsData((prev) => {
        const current = prev[targetKey] || { agree: 50, disagree: 20, needs_factcheck: 30, unconstitutional: 10, visionary: 25 };
        return {
          ...prev,
          [targetKey]: {
            ...current,
            [reaction]: Math.max(0, current[reaction] - 1)
          }
        };
      });
      return;
    }

    // Register new reaction
    setUserReactions((prev) => ({
      ...prev,
      [targetKey]: reaction
    }));

    setReactionsData((prev) => {
      const current = prev[targetKey] || { agree: 50, disagree: 20, needs_factcheck: 30, unconstitutional: 10, visionary: 25 };
      const updated = { ...current };
      if (prevReaction) {
        updated[prevReaction] = Math.max(0, updated[prevReaction] - 1);
      }
      updated[reaction] = (updated[reaction] || 0) + 1;
      return {
        ...prev,
        [targetKey]: updated
      };
    });

    const reactionLabels: Record<ReactionType, string> = {
      agree: "👍 Agree / Strong Plan",
      disagree: "👎 Disagree / Flawed",
      needs_factcheck: "🔍 Flagged for KNBS Fact-Check",
      unconstitutional: "⚖️ Flagged for Article 201 Scrutiny",
      visionary: "💡 Visionary 2060 Idea"
    };

    setNotificationToast(`Recorded your live reaction: "${reactionLabels[reaction]}"`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const handleAddCitizenNote = (targetKey: string) => {
    const note = newNoteInput[targetKey]?.trim();
    if (!note) return;

    setCitizenNotes((prev) => ({
      ...prev,
      [targetKey]: [
        `${note} — Verified Citizen Reviewer (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
        ...(prev[targetKey] || [])
      ]
    }));

    setNewNoteInput((prev) => ({ ...prev, [targetKey]: "" }));
    setNotificationToast("Your live scrutiny comment has been posted to the civic stream!");
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Save reminders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kenya2027_debate_reminders", JSON.stringify(remindersEnabled));
    } catch (e) {
      console.warn("Could not save reminders to localStorage:", e);
    }
  }, [remindersEnabled]);

  const toggleReminder = (debate: PoliticalDebateEvent) => {
    const nextState = !remindersEnabled[debate.id];
    setRemindersEnabled((prev) => ({
      ...prev,
      [debate.id]: nextState
    }));

    if (nextState) {
      setNotificationToast(`🔔 Reminder activated for "${debate.title}". You will receive an alert 15 minutes before broadcast.`);
      // Check browser notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    } else {
      setNotificationToast(`Reminder removed for "${debate.title}".`);
    }

    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleDownloadICS = (debate: PoliticalDebateEvent) => {
    // Generate an iCalendar (.ics) file for Google Calendar / Outlook / Apple Calendar
    const startDate = "20270720T163000Z";
    const endDate = "20270720T190000Z";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Kenya 2027 Civic Platform//Political Debate Calendar//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${debate.title}`,
      `DESCRIPTION:Watch & Audit the 2027 Political Debate. Key themes: ${debate.keyThemes.join(", ")}. Platform: Kenya 2027 Scrutiny Engine.`,
      `LOCATION:${debate.venue}, ${debate.city}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: ${debate.title} is starting in 15 minutes!`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${debate.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotificationToast(`📅 Downloaded calendar invite for ${debate.title}`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const handleShareDebate = (debate: PoliticalDebateEvent) => {
    const text = `🇰🇪 Kenya 2027 Debate Alert: ${debate.title} on ${debate.date} at ${debate.timeEAT}. Let's watch with the 13-Point Scrutiny Sheet! #UsitupatieSlogan #Kenya2027Debates`;
    navigator.clipboard.writeText(text);
    setCopiedId(debate.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredDebates = selectedTier === "all" 
    ? POLITICAL_DEBATES_DATA 
    : POLITICAL_DEBATES_DATA.filter((d) => d.tier === selectedTier);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8" id="political-debate-calendar">
      {/* Toast notification */}
      {notificationToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200 max-w-md">
          <BellRing className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>National Civic Event Timeline & Broadcast Schedule</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Kenya 2027 Political Debate Calendar & Transcript Audit
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Real-time schedule of Presidential, Deputy Presidential, Gubernatorial, and Thematic Townhall debates. Set reminders to tune in and cross-examine candidate transcripts with the 13-point Article 201 audit tool.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowLiveFactCheckOverlay(!showLiveFactCheckOverlay)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                showLiveFactCheckOverlay
                  ? "bg-rose-600 text-white border border-rose-700"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-300" />
              <span>{showLiveFactCheckOverlay ? "Hide Live Fact-Check HUD" : "Launch Live Fact-Check HUD"}</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold font-mono">
              <Tv className="w-3.5 h-3.5 text-emerald-600" />
              <span>{POLITICAL_DEBATES_DATA.length} Debates</span>
            </span>
          </div>
        </div>
      </div>

      {/* LIVE REAL-TIME FACT-CHECK OVERLAY HUD */}
      {showLiveFactCheckOverlay && (
        <div className="animate-in fade-in duration-300 mb-6">
          <LiveDebateFactCheckOverlay
            debateTitle={activeDebate.title}
            onAuditClaim={onAuditDebateClaim}
            onClose={() => setShowLiveFactCheckOverlay(false)}
          />
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedTier("all")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            selectedTier === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Debates ({POLITICAL_DEBATES_DATA.length})
        </button>
        <button
          onClick={() => setSelectedTier("Presidential (Tier 1)")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            selectedTier === "Presidential (Tier 1)"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Presidential (Tier 1)
        </button>
        <button
          onClick={() => setSelectedTier("Deputy Presidential")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            selectedTier === "Deputy Presidential"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Deputy Presidential
        </button>
        <button
          onClick={() => setSelectedTier("Gubernatorial (Strategic)")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            selectedTier === "Gubernatorial (Strategic)"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Gubernatorial
        </button>
        <button
          onClick={() => setSelectedTier("Parliamentary & Thematic Townhall")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
            selectedTier === "Parliamentary & Thematic Townhall"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Finance & Debt Townhalls
        </button>
      </div>

      {/* Main Grid: Debate List on Left, Active Debate Details & Transcript Audit on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Debate Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredDebates.map((item) => {
            const isSelected = activeDebateId === item.id;
            const hasReminder = !!remindersEnabled[item.id];

            return (
              <div
                key={item.id}
                onClick={() => setActiveDebateId(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative group text-left ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}>
                    {item.tier}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReminder(item);
                    }}
                    className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                      hasReminder
                        ? isSelected
                          ? "bg-emerald-500 text-slate-950 font-bold"
                          : "bg-emerald-100 text-emerald-900 font-bold"
                        : isSelected
                          ? "text-slate-400 hover:text-white"
                          : "text-slate-400 hover:text-slate-700"
                    }`}
                    title={hasReminder ? "Reminder Active" : "Set Debate Reminder"}
                  >
                    {hasReminder ? <BellRing className="w-3.5 h-3.5 fill-current" /> : <Bell className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{hasReminder ? "Reminding" : "Remind"}</span>
                  </button>
                </div>

                <h4 className={`text-sm font-bold mt-2 leading-snug ${isSelected ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </h4>

                <div className={`flex items-center gap-3 text-xs mt-2.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-500" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-500" />
                    {item.timeEAT.split("-")[0]}
                  </span>
                </div>

                <div className={`flex items-center justify-between text-[11px] mt-3 pt-2.5 border-t ${
                  isSelected ? "border-slate-800 text-slate-400" : "border-slate-100 text-slate-500"
                }`}>
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                    {item.venue.split("(")[0]}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {item.candidateLineup.length} Confirmed
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Debate Detail & Live Transcript Cross-Examination (7 cols) */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
          
          {/* Header Action Banner */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {activeDebate.tier}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {activeDebate.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownloadICS(activeDebate)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Add to Google/Apple/Outlook Calendar"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>.ics Invite</span>
                </button>

                <button
                  onClick={() => handleShareDebate(activeDebate)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{copiedId === activeDebate.id ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-100">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Date & Time</span>
                <span className="font-bold text-slate-900">{activeDebate.date}</span>
                <span className="text-[11px] text-slate-500 block">{activeDebate.timeEAT}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Broadcast & Media</span>
                <span className="font-bold text-slate-900 truncate block">{activeDebate.broadcastPartners.slice(0, 3).join(", ")}</span>
                <span className="text-[11px] text-slate-500 block">Live on YouTube & TV</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Venue & Host</span>
                <span className="font-bold text-slate-900 truncate block">{activeDebate.city}</span>
                <span className="text-[11px] text-slate-500 block truncate">{activeDebate.venue}</span>
              </div>
            </div>
          </div>

          {/* Key Debate Scrutiny Themes */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Core Scrutiny Themes & Constitutional Focus:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeDebate.keyThemes.map((theme, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800">{theme}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmed Candidate Lineup */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Confirmed Candidates & Policy Stances</span>
            </span>
            <div className="space-y-2.5">
              {activeDebate.candidateLineup.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {c.partyOrCoalition}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    🎯 <strong className="text-slate-700">Declared Focus:</strong> {c.stanceFocus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Live / Sample Audited Debate Quotes */}
          {activeDebate.sampleAuditedQuotes && activeDebate.sampleAuditedQuotes.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-rose-600" />
                  <span>Audited Debate Claims & Article 201 Fact-Checks</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Verified with KNBS & CBK
                </span>
              </div>

              <div className="space-y-4">
                {activeDebate.sampleAuditedQuotes.map((quote, idx) => {
                  const targetKey = `quote-${idx}`;
                  const counts = reactionsData[targetKey] || { agree: 120, disagree: 45, needs_factcheck: 60, unconstitutional: 15, visionary: 30 };
                  const totalVotes = counts.agree + counts.disagree + counts.needs_factcheck + counts.unconstitutional + counts.visionary;
                  const agreePct = Math.round((counts.agree / totalVotes) * 100) || 0;
                  const disagreePct = Math.round((counts.disagree / totalVotes) * 100) || 0;
                  const factcheckPct = Math.round((counts.needs_factcheck / totalVotes) * 100) || 0;
                  const unconstitutionalPct = Math.round((counts.unconstitutional / totalVotes) * 100) || 0;
                  const visionaryPct = Math.round((counts.visionary / totalVotes) * 100) || 0;
                  const currentReaction = userReactions[targetKey];
                  const notes = citizenNotes[targetKey] || [];

                  return (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{quote.candidate} ({quote.topic})</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                          quote.factCheckVerdict === "Verified True"
                            ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                            : quote.factCheckVerdict === "Misleading / Uncosted"
                              ? "bg-amber-50 text-amber-900 border-amber-200"
                              : "bg-rose-50 text-rose-900 border-rose-200"
                        }`}>
                          {quote.factCheckVerdict}
                        </span>
                      </div>

                      <p className="text-xs italic text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-serif">
                        "{quote.quote}"
                      </p>

                      <div className="text-[11px] text-slate-600 space-y-1">
                        <div>
                          <strong className="text-slate-800">Constitutional Baseline:</strong> {quote.constitutionalCitation}
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          🔍 <strong className="text-slate-900">Empirical Evidence:</strong> {quote.explanation}
                        </p>
                      </div>

                      {/* LIVE REACTION & SENTIMENT BREAKDOWN COMPONENT */}
                      <div className="pt-2 border-t border-slate-100 space-y-2.5">
                        <div className="flex items-center justify-between text-2xs">
                          <div className="flex items-center space-x-1.5 font-bold text-slate-700">
                            <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
                            <span className="uppercase tracking-wider">Live Citizen Reaction & Sentiment</span>
                          </div>
                          <span className="font-mono text-slate-500">
                            {totalVotes.toLocaleString()} votes
                          </span>
                        </div>

                        {/* Sentiment Distribution Bar */}
                        <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100">
                          <div style={{ width: `${agreePct}%` }} className="bg-emerald-500 transition-all" title={`Agree: ${agreePct}%`} />
                          <div style={{ width: `${disagreePct}%` }} className="bg-rose-500 transition-all" title={`Disagree: ${disagreePct}%`} />
                          <div style={{ width: `${factcheckPct}%` }} className="bg-amber-500 transition-all" title={`Needs Fact-Check: ${factcheckPct}%`} />
                          <div style={{ width: `${unconstitutionalPct}%` }} className="bg-purple-600 transition-all" title={`Unconstitutional: ${unconstitutionalPct}%`} />
                          <div style={{ width: `${visionaryPct}%` }} className="bg-cyan-500 transition-all" title={`Visionary: ${visionaryPct}%`} />
                        </div>

                        {/* Interactive Reaction Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <button
                            onClick={() => handleRegisterReaction(targetKey, "agree")}
                            className={`px-2 py-1 rounded-lg text-2xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
                              currentReaction === "agree"
                                ? "bg-emerald-600 text-white border-emerald-700 shadow-2xs"
                                : "bg-white hover:bg-emerald-50 text-slate-700 border-slate-200"
                            }`}
                            title="I agree with this policy stance"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>Agree ({counts.agree})</span>
                          </button>

                          <button
                            onClick={() => handleRegisterReaction(targetKey, "disagree")}
                            className={`px-2 py-1 rounded-lg text-2xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
                              currentReaction === "disagree"
                                ? "bg-rose-600 text-white border-rose-700 shadow-2xs"
                                : "bg-white hover:bg-rose-50 text-slate-700 border-slate-200"
                            }`}
                            title="I disagree with this plan"
                          >
                            <ThumbsDown className="w-3 h-3" />
                            <span>Disagree ({counts.disagree})</span>
                          </button>

                          <button
                            onClick={() => handleRegisterReaction(targetKey, "needs_factcheck")}
                            className={`px-2 py-1 rounded-lg text-2xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
                              currentReaction === "needs_factcheck"
                                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-2xs"
                                : "bg-white hover:bg-amber-50 text-slate-700 border-slate-200"
                            }`}
                            title="Flag this claim for verification with official KNBS/CBK data"
                          >
                            <Search className="w-3 h-3" />
                            <span>Fact-Check ({counts.needs_factcheck})</span>
                          </button>

                          <button
                            onClick={() => handleRegisterReaction(targetKey, "unconstitutional")}
                            className={`px-2 py-1 rounded-lg text-2xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
                              currentReaction === "unconstitutional"
                                ? "bg-purple-700 text-white border-purple-800 shadow-2xs"
                                : "bg-white hover:bg-purple-50 text-slate-700 border-slate-200"
                            }`}
                            title="Flag as potential breach of Article 201 principles"
                          >
                            <Scale className="w-3 h-3" />
                            <span>Art. 201 Risk ({counts.unconstitutional})</span>
                          </button>

                          <button
                            onClick={() => handleRegisterReaction(targetKey, "visionary")}
                            className={`px-2 py-1 rounded-lg text-2xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
                              currentReaction === "visionary"
                                ? "bg-cyan-600 text-white border-cyan-700 shadow-2xs"
                                : "bg-white hover:bg-cyan-50 text-slate-700 border-slate-200"
                            }`}
                            title="Visionary multi-decade proposal"
                          >
                            <Lightbulb className="w-3 h-3" />
                            <span>2060 Plan ({counts.visionary})</span>
                          </button>
                        </div>

                        {/* Citizen Scrutiny Comments Stream */}
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <div className="space-y-1 max-h-24 overflow-y-auto">
                            {notes.map((noteText, nIdx) => (
                              <div key={nIdx} className="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 flex items-start gap-1">
                                <MessageSquare className="w-2.5 h-2.5 text-slate-400 shrink-0 mt-0.5" />
                                <span>{noteText}</span>
                              </div>
                            ))}
                          </div>

                          {/* Add Note Input */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <input
                              type="text"
                              value={newNoteInput[targetKey] || ""}
                              onChange={(e) => setNewNoteInput({ ...newNoteInput, [targetKey]: e.target.value })}
                              onKeyDown={(e) => e.key === "Enter" && handleAddCitizenNote(targetKey)}
                              placeholder="Add your scrutiny reaction or question on this claim..."
                              className="flex-1 text-2xs px-2.5 py-1 rounded border border-slate-200 bg-white outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={() => handleAddCitizenNote(targetKey)}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-2xs font-bold flex items-center gap-1 shrink-0"
                            >
                              <Send className="w-2.5 h-2.5" />
                              <span>Post</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {onAuditDebateClaim && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={() => onAuditDebateClaim(quote.quote, quote.topic)}
                            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                          >
                            <span>Cross-Examine in 13-Point Audit Tool</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
