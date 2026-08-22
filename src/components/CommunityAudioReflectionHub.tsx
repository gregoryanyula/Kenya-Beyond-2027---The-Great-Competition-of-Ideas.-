import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  Trash2, 
  Share2, 
  Check, 
  MapPin, 
  Tag, 
  Volume2, 
  VolumeX,
  Headphones, 
  Sparkles,
  AlertCircle,
  Radio,
  FileAudio,
  Search,
  Filter,
  Heart,
  Download,
  Flame,
  Clock,
  User,
  MessageSquareQuote
} from "lucide-react";
import { CommunityAudioReflection } from "../types";

const STORAGE_KEY = "kenya2027_citizen_voices_audio_archive_v1";

const INITIAL_CITIZEN_VOICES: CommunityAudioReflection[] = [
  {
    id: "cr-1",
    authorName: "Faith Wanjiku (Youth Tech Founder)",
    county: "Nairobi (Ruaraka Constituency)",
    policyDomain: "Technology & Youth Opportunities",
    policyTopic: "Constituency Innovation & AI BPO Hubs",
    durationSeconds: 42,
    dateRecorded: "August 2026",
    transcriptExcerpt: "If we get reliable 1Gbps public fiber in Ruaraka, our freelance design collective won't have to spend 6,000 shillings every month on backup cellular data. Make sure the equipment budget is ring-fenced so politicians don't turn them into campaign offices."
  },
  {
    id: "cr-2",
    authorName: "Brian Ochieng (TVET Mechanical Student)",
    county: "Kisumu (Kisumu Central)",
    policyDomain: "Education & CBC/University",
    policyTopic: "Higher Education Funding Model (HEF)",
    durationSeconds: 58,
    dateRecorded: "August 2026",
    transcriptExcerpt: "The problem with Band 1 and Band 2 classification isn't just the tuition loan—it's the upkeep allowance. When upkeep is delayed for 3 months, students are forced to do gig delivery instead of attending machine workshop practicals."
  },
  {
    id: "cr-3",
    authorName: "Halima Abdi (Community Health Volunteer)",
    county: "Garissa (Garissa Township)",
    policyDomain: "Healthcare & Universal Access",
    policyTopic: "Social Health Authority (SHA) Transition",
    durationSeconds: 51,
    dateRecorded: "July 2026",
    transcriptExcerpt: "Level 2 dispensaries in remote pastoralist wards need direct solar cold-chain drug storage, not just digital app portals. An app without electricity and stocked antibiotics will not save a mother in labor."
  },
  {
    id: "cr-4",
    authorName: "Kiprono Bett (Horticulture Farmer)",
    county: "Uasin Gishu (Moiben)",
    policyDomain: "Agriculture & Food Sovereignty",
    policyTopic: "Fertilizer Vouchers & Mobile Grain Dryers",
    durationSeconds: 39,
    dateRecorded: "July 2026",
    transcriptExcerpt: "The subsidized fertilizer at KES 2,500 helped us plant, but during harvest in October, rains destroyed 15% of our maize. Any candidate in 2027 must budget for constituency mobile dryers."
  },
  {
    id: "cr-5",
    authorName: "Asha Bakari (Fisherfolk Association Secretary)",
    county: "Kilifi (Malindi)",
    policyDomain: "Devolution & Local Services",
    policyTopic: "Blue Economy Cold Storage & Landing Sites",
    durationSeconds: 55,
    dateRecorded: "July 2026",
    transcriptExcerpt: "We lose up to 30% of our daily catch because the county cold storage has broken generators. We need public-private solar cooling units at landing sites so youth can earn sustainable fishing incomes."
  }
];

export const CommunityAudioReflectionHub: React.FC = () => {
  const [reflections, setReflections] = useState<CommunityAudioReflection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load audio reflections from storage:", e);
    }
    return INITIAL_CITIZEN_VOICES;
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCountyFilter, setSelectedCountyFilter] = useState<string>("All");
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>("All");

  // Likes/Reactions
  const [reactions, setReactions] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_citizen_audio_likes");
      return saved ? JSON.parse(saved) : { "cr-1": 42, "cr-2": 38, "cr-3": 65, "cr-4": 29, "cr-5": 51 };
    } catch {
      return { "cr-1": 42, "cr-2": 38, "cr-3": 65, "cr-4": 29, "cr-5": 51 };
    }
  });

  // Recording State (Max 60 Seconds)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Form State
  const [authorName, setAuthorName] = useState<string>("");
  const [county, setCounty] = useState<string>("Nairobi");
  const [policyDomain, setPolicyDomain] = useState<string>("Technology & Youth Opportunities");
  const [policyTopic, setPolicyTopic] = useState<string>("");
  const [transcriptExcerpt, setTranscriptExcerpt] = useState<string>("");

  // Playback state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const newAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
    } catch (e) {
      console.warn("Failed to persist audio reflections:", e);
    }
  }, [reflections]);

  useEffect(() => {
    try {
      localStorage.setItem("kenya2027_citizen_audio_likes", JSON.stringify(reactions));
    } catch (e) {
      console.warn("Failed to persist likes:", e);
    }
  }, [reactions]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    setPermissionError(null);
    setRecordedAudioUrl(null);
    setRecordedBlob(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support microphone audio recording.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Audio level visualizer setup
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
            animationFrameRef.current = requestAnimationFrame(updateLevel);
          }
        };
        updateLevel();
      } catch (audioCtxErr) {
        console.warn("AudioContext visualizer skipped:", audioCtxErr);
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setRecordedBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        setAudioLevel(0);
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingDuration(0);

      // Max 60 seconds
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error("Microphone recording error:", err);
      setPermissionError(err.message || "Could not access microphone. Please grant permission in your browser.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setAudioLevel(0);
    setIsRecording(false);
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyTopic.trim()) {
      alert("Please enter the specific policy topic you are reflecting on.");
      return;
    }

    const newReflection: CommunityAudioReflection = {
      id: `cr-${Date.now()}`,
      authorName: authorName.trim() || "Anonymous Citizen",
      county: county || "Nairobi",
      policyDomain: policyDomain,
      policyTopic: policyTopic.trim(),
      audioUrl: recordedAudioUrl || undefined,
      durationSeconds: recordingDuration || 45,
      dateRecorded: "Today (" + new Date().toLocaleDateString() + ")",
      transcriptExcerpt: transcriptExcerpt.trim() || `60-Second Audio Testimony regarding ${policyTopic} in ${county}.`
    };

    setReflections((prev) => [newReflection, ...prev]);

    // Save achievement milestone in localStorage
    try {
      const achievements = JSON.parse(localStorage.getItem("kenya2027_civic_achievements") || "{}");
      achievements.audioRecorded = true;
      achievements.citizenVoiceChampion = true;
      achievements.communityReflectionsCount = (achievements.communityReflectionsCount || 0) + 1;
      localStorage.setItem("kenya2027_civic_achievements", JSON.stringify(achievements));
    } catch {
      // ignore
    }

    // Reset Form
    setRecordedAudioUrl(null);
    setRecordedBlob(null);
    setRecordingDuration(0);
    setAuthorName("");
    setPolicyTopic("");
    setTranscriptExcerpt("");
  };

  const handleDeleteReflection = (id: string) => {
    setReflections((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleLike = (id: string) => {
    setReactions((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handlePlayTTS = (item: CommunityAudioReflection) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (playingId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `Citizen Voice from ${item.county}. Spoken by ${item.authorName}. Topic: ${item.policyTopic}. Testimony: ${item.transcriptExcerpt}`
    );
    utterance.rate = 1.0;
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
    setPlayingId(item.id);
  };

  const handleShare = (r: CommunityAudioReflection) => {
    const text = `🎙️ Citizen Voice from ${r.county} (${r.authorName}): "${r.transcriptExcerpt}" — Policy Scrutiny: ${r.policyTopic} #Kenya2027 #UsitupatieSlogan`;
    navigator.clipboard.writeText(text);
    setCopiedId(r.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Filter reflections
  const filteredReflections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return reflections.filter((item) => {
      const matchesSearch = !query || 
        item.authorName.toLowerCase().includes(query) ||
        item.county.toLowerCase().includes(query) ||
        item.policyTopic.toLowerCase().includes(query) ||
        item.transcriptExcerpt.toLowerCase().includes(query) ||
        item.policyDomain.toLowerCase().includes(query);

      const matchesCounty = selectedCountyFilter === "All" || item.county.toLowerCase().includes(selectedCountyFilter.toLowerCase());
      const matchesDomain = selectedDomainFilter === "All" || item.policyDomain === selectedDomainFilter;

      return matchesSearch && matchesCounty && matchesDomain;
    });
  }, [reflections, searchQuery, selectedCountyFilter, selectedDomainFilter]);

  const uniqueDomains = ["All", ...Array.from(new Set(reflections.map((r) => r.policyDomain)))];
  const uniqueCounties = ["All", "Nairobi", "Mombasa", "Kisumu", "Uasin Gishu", "Garissa", "Nakuru", "Kilifi", "Machakos", "Trans Nzoia"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-8" id="citizen-voices-hub">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grassroots 60-Second Audio Stories & County Experiences</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Citizen Voices: Local Governance & Lived Experience Archive
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Record a 60-second audio story using your microphone about your lived experience with local governance, health dispensaries, TVET funding, agriculture, or county roads. Search and listen to testimonies across all 47 counties.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold font-mono">
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span>{reflections.length} Audio Stories</span>
            </span>
          </div>
        </div>
      </div>

      {/* 60-SECOND AUDIO RECORDING STUDIO */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 space-y-5 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Microphone Audio Studio (60s Cap)
            </span>
            <h4 className="text-base font-bold text-white mt-1">
              Share Your 60-Second Experience with Local Governance
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${isRecording ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
            <span className="font-mono text-xs text-slate-300">
              {isRecording ? `Recording: ${formatSeconds(recordingDuration)} / 1:00` : "Microphone Ready"}
            </span>
          </div>
        </div>

        {/* Live Audio Level Meter & Waveform Bar */}
        {isRecording && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-2xs text-slate-400 font-mono">
              <span>MIC INPUT LEVEL: {audioLevel}%</span>
              <span>TIME REMAINING: {60 - recordingDuration}s</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${(recordingDuration / 60) * 100}%` }} 
                className="bg-rose-500 transition-all duration-300"
              />
            </div>
            {/* Animated EQ Bars */}
            <div className="flex items-center justify-center gap-1 h-8 pt-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const height = Math.max(15, Math.min(100, (audioLevel * (1 + Math.sin(i + recordingDuration))) % 100));
                return (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="w-1.5 bg-emerald-400 rounded-full transition-all duration-100"
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Live Recording Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
            >
              <Mic className="w-4 h-4 text-slate-950" />
              <span>{recordedAudioUrl ? "Re-Record 60s Story" : "Record 60s Audio Story"}</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0 animate-pulse"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Done Speaking ({formatSeconds(recordingDuration)})</span>
            </button>
          )}

          {/* Audio Playback Preview if Recorded */}
          {recordedAudioUrl && !isRecording && (
            <div className="flex-1 flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <audio 
                ref={newAudioRef}
                src={recordedAudioUrl} 
                controls 
                className="w-full h-8 accent-emerald-500"
              />
            </div>
          )}
        </div>

        {permissionError && (
          <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{permissionError}</span>
          </div>
        )}

        {/* Story Metadata Submission Form */}
        {(recordedAudioUrl || recordingDuration > 0) && (
          <form onSubmit={handleSaveReflection} className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Your Name / Ward Role</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Mary W. (Farmer / TVET Student)"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">County / Ward</label>
              <input
                type="text"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder="e.g. Nakuru / Rongai Ward"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Policy Domain</label>
              <select
                value={policyDomain}
                onChange={(e) => setPolicyDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Technology & Youth Opportunities">Technology & Youth Opportunities</option>
                <option value="Education & CBC/University">Education & CBC/University</option>
                <option value="Healthcare & Universal Access">Healthcare & Universal Access</option>
                <option value="Agriculture & Food Sovereignty">Agriculture & Food Sovereignty</option>
                <option value="Public Debt & Fiscal Realism">Public Debt & Fiscal Realism</option>
                <option value="Devolution & Local Services">Devolution & Local Services</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Policy / Local Issue</label>
              <input
                type="text"
                required
                value={policyTopic}
                onChange={(e) => setPolicyTopic(e.target.value)}
                placeholder="e.g. Dispensary Cold Chain Drug Stock"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Short Transcript or Key Quote</label>
              <input
                type="text"
                value={transcriptExcerpt}
                onChange={(e) => setTranscriptExcerpt(e.target.value)}
                placeholder="One sentence summary of your lived experience..."
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Publish 60s Story
              </button>
            </div>
          </form>
        )}
      </div>

      {/* SEARCHABLE & ACCESSIBLE CITIZEN VOICES ARCHIVE */}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Searchable Audio Archive ({filteredReflections.length} of {reflections.length} Stories)
            </h4>
          </div>

          {/* Search Input Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stories, topics, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
              />
            </div>

            <select
              value={selectedCountyFilter}
              onChange={(e) => setSelectedCountyFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-hidden"
            >
              {uniqueCounties.map((c, idx) => (
                <option key={idx} value={c}>{c === "All" ? "All Counties" : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {uniqueDomains.map((dom, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDomainFilter(dom)}
              className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap text-2xs ${
                selectedDomainFilter === dom
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Stories Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReflections.map((item) => {
            const likeCount = reactions[item.id] || 0;
            const isTtsActive = playingId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3.5 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.policyDomain}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.county}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-900">
                    {item.policyTopic}
                  </h5>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed font-serif italic">
                    "{item.transcriptExcerpt}"
                  </p>

                  {/* Audio Player if URL exists, else synthetic voice reader */}
                  {item.audioUrl ? (
                    <div className="pt-1">
                      <audio 
                        src={item.audioUrl} 
                        controls 
                        className="w-full h-8 accent-emerald-600 rounded"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePlayTTS(item)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        isTtsActive
                          ? "bg-rose-600 text-white border-rose-700 shadow-xs animate-pulse"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {isTtsActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{isTtsActive ? "Stop Audio Playback" : `Listen to Audio Story (${item.durationSeconds}s)`}</span>
                    </button>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="font-medium text-slate-700">{item.authorName}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleLike(item.id)}
                      className="px-2 py-1 rounded-md bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1 text-[11px] font-bold border border-slate-100"
                      title="Support this story"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      <span>{likeCount}</span>
                    </button>

                    <button
                      onClick={() => handleShare(item)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                      title="Share Quote"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleDeleteReflection(item.id)}
                      className="p-1.5 rounded-md text-slate-300 hover:text-rose-600 transition-colors"
                      title="Remove from archive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReflections.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-700">No stories matched your search filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCountyFilter("All");
                setSelectedDomainFilter("All");
              }}
              className="text-xs text-emerald-700 underline font-bold"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

