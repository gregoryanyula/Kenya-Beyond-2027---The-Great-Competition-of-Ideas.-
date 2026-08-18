import React, { useState, useEffect, useRef } from "react";
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
  Headphones, 
  Sparkles,
  AlertCircle,
  Radio,
  FileAudio
} from "lucide-react";
import { CommunityAudioReflection } from "../types";

const STORAGE_KEY = "kenya2027_community_audio_reflections_v1";

const INITIAL_COMMUNITY_REFLECTIONS: CommunityAudioReflection[] = [
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
    return INITIAL_COMMUNITY_REFLECTIONS;
  });

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Form State
  const [authorName, setAuthorName] = useState<string>("");
  const [county, setCounty] = useState<string>("Nairobi");
  const [policyDomain, setPolicyDomain] = useState<string>("Technology & Youth Opportunities");
  const [policyTopic, setPolicyTopic] = useState<string>("");
  const [transcriptExcerpt, setTranscriptExcerpt] = useState<string>("");

  // Playback state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlayingNewRecording, setIsPlayingNewRecording] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const newAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
    } catch (e) {
      console.warn("Failed to persist audio reflections:", e);
    }
  }, [reflections]);

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
        // Stop all audio tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 90) {
            stopRecording();
            return 90;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error("Microphone recording error:", err);
      setPermissionError(err.message || "Could not access microphone. Please allow microphone permissions in your browser.");
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
      county: county || "Kenya",
      policyDomain: policyDomain,
      policyTopic: policyTopic.trim(),
      audioUrl: recordedAudioUrl || undefined,
      durationSeconds: recordingDuration || 30,
      dateRecorded: "Today (" + new Date().toLocaleDateString() + ")",
      transcriptExcerpt: transcriptExcerpt.trim() || `Audio reflection on ${policyTopic} in ${county}.`
    };

    setReflections((prev) => [newReflection, ...prev]);

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

  const handleShare = (r: CommunityAudioReflection) => {
    const text = `🎙️ Citizen Voice from ${r.county}: "${r.transcriptExcerpt}" — Policy: ${r.policyTopic} #Kenya2027 #UsitupatieSlogan`;
    navigator.clipboard.writeText(text);
    setCopiedId(r.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-8" id="community-audio-hub">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
          <Mic className="w-3.5 h-3.5 text-emerald-400" />
          <span>Grassroots Citizen Voice & Community Audio Reflections</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Record & Listen: How 2027 Policies Impact Real Communities
        </h3>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Democracy is not just about politicians speaking to citizens—it is about citizens recording real evidence from their sub-counties, wards, and workplaces on health, farming, TVET, and jobs.
        </p>
      </div>

      {/* Audio Recorder Studio Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              Browser Microphone Studio
            </span>
            <h4 className="text-base font-bold text-white mt-1">
              Record a 30-90 Second Community Reflection
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${isRecording ? "bg-rose-500 animate-pulse" : "bg-slate-600"}`} />
            <span className="font-mono text-xs text-slate-300">
              {isRecording ? `Recording: ${formatSeconds(recordingDuration)} / 1:30` : "Microphone Ready"}
            </span>
          </div>
        </div>

        {/* Live Recording Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
            >
              <Mic className="w-4 h-4 text-slate-950" />
              <span>{recordedAudioUrl ? "Re-Record Voice" : "Start Audio Recording"}</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0 animate-pulse"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Recording ({formatSeconds(recordingDuration)})</span>
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

        {/* Reflection Metadata Form */}
        {(recordedAudioUrl || recordingDuration > 0) && (
          <form onSubmit={handleSaveReflection} className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Your Name / Handle</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. John K. (Farmer / Youth)"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">County / Ward</label>
              <input
                type="text"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder="e.g. Nakuru / Naivasha East"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Policy Domain</label>
              <select
                value={policyDomain}
                onChange={(e) => setPolicyDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
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
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Policy Under Scrutiny</label>
              <input
                type="text"
                required
                value={policyTopic}
                onChange={(e) => setPolicyTopic(e.target.value)}
                placeholder="e.g. TVET Upkeep Loan Distribution"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Key Takeaway / Transcript Excerpt (Optional)</label>
              <input
                type="text"
                value={transcriptExcerpt}
                onChange={(e) => setTranscriptExcerpt(e.target.value)}
                placeholder="Summarize your main community point in one sentence..."
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Publish Reflection
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Community Archive of Reflections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Grassroots Civic Voice Feed ({reflections.length} Reflections)
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Unfiltered Evidence from Kenyan Counties
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reflections.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.policyDomain}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {item.county}
                  </span>
                </div>

                <h5 className="text-xs font-bold text-slate-900">
                  {item.policyTopic}
                </h5>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed italic">
                  "{item.transcriptExcerpt}"
                </p>

                {/* Audio player if audio URL exists */}
                {item.audioUrl && (
                  <div className="pt-2">
                    <audio 
                      src={item.audioUrl} 
                      controls 
                      className="w-full h-8 accent-emerald-600 rounded"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-slate-700">👤 {item.authorName}</span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleShare(item)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-[10px]"
                    title="Copy Quote"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
                    <span>{copiedId === item.id ? "Copied" : "Share"}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteReflection(item.id)}
                    className="p-1 rounded text-slate-300 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
