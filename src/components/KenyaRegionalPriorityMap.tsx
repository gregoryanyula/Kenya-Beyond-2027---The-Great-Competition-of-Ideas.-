import React, { useState } from "react";
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ThumbsUp, 
  Filter, 
  Send, 
  PlusCircle, 
  Info, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";
import { KENYA_REGIONAL_PRIORITY_AREAS } from "../data/regionalPrioritiesData";
import { RegionalPriorityArea } from "../types";

interface KenyaRegionalPriorityMapProps {
  onSelectRegionForAudit?: (region: RegionalPriorityArea) => void;
}

export const KenyaRegionalPriorityMap: React.FC<KenyaRegionalPriorityMapProps> = ({
  onSelectRegionForAudit
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("nairobi-metro");
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [votesState, setVotesState] = useState<Record<string, number>>({});
  const [hasVotedState, setHasVotedState] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [newPriorityCounty, setNewPriorityCounty] = useState<string>("Nairobi (047)");
  const [newPrioritySector, setNewPrioritySector] = useState<string>("Youth Jobs & Tech");
  const [newPriorityTitle, setNewPriorityTitle] = useState<string>("");
  const [newPriorityDeliverable, setNewPriorityDeliverable] = useState<string>("");
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const selectedRegion = KENYA_REGIONAL_PRIORITY_AREAS.find((r) => r.id === selectedRegionId) || KENYA_REGIONAL_PRIORITY_AREAS[0];

  const handleVote = (priorityKey: string, currentVotes: number) => {
    if (hasVotedState[priorityKey]) return;
    setVotesState((prev) => ({
      ...prev,
      [priorityKey]: (prev[priorityKey] || currentVotes) + 1
    }));
    setHasVotedState((prev) => ({
      ...prev,
      [priorityKey]: true
    }));
  };

  const handleNewPrioritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPriorityTitle.trim()) return;
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setShowSubmitModal(false);
      setNewPriorityTitle("");
      setNewPriorityDeliverable("");
    }, 1800);
  };

  // Regions SVG Path Definitions calibrated for a 750x750 Kenya Map Box
  const REGION_SVG_DATA: Record<string, { path: string; labelPos: { x: number; y: number } }> = {
    "northern-frontier": {
      // Large northern expanse (Turkana, Marsabit, Mandera, Wajir, Garissa, Samburu, Isiolo)
      path: "M 180,240 L 220,110 L 330,80 L 460,70 L 590,120 L 680,180 L 670,360 L 550,380 L 480,340 L 420,360 L 330,340 L 280,300 L 220,310 Z",
      labelPos: { x: 440, y: 210 }
    },
    "rift-valley-central-south": {
      // Spine from Baringo, Uasin Gishu, Nakuru down to Narok & Kajiado
      path: "M 280,300 L 330,340 L 370,390 L 400,470 L 410,570 L 340,600 L 300,560 L 330,470 L 270,410 L 220,310 Z",
      labelPos: { x: 345, y: 470 }
    },
    "western-region": {
      // Bungoma, Kakamega, Busia, Vihiga
      path: "M 220,310 L 270,410 L 250,450 L 190,440 L 190,360 Z",
      labelPos: { x: 220, y: 395 }
    },
    "lake-basin-nyanza": {
      // Kisumu, Siaya, Homa Bay, Migori, Kisii, Nyamira
      path: "M 190,440 L 250,450 L 290,490 L 300,560 L 230,570 L 190,510 Z",
      labelPos: { x: 235, y: 515 }
    },
    "mount-kenya-central": {
      // Nyeri, Kirinyaga, Murang'a, Meru, Embu, Nyandarua, Laikipia
      path: "M 420,360 L 480,340 L 520,390 L 510,480 L 440,490 L 400,470 L 370,390 Z",
      labelPos: { x: 455, y: 420 }
    },
    "nairobi-metro": {
      // Nairobi + Kiambu / Machakos core
      path: "M 440,490 L 510,480 L 520,530 L 480,560 L 425,540 L 410,510 Z",
      labelPos: { x: 465, y: 520 }
    },
    "eastern-semi-arid": {
      // Kitui, Makueni, Machakos lower
      path: "M 520,390 L 590,440 L 580,570 L 510,610 L 480,560 L 520,530 L 510,480 Z",
      labelPos: { x: 540, y: 505 }
    },
    "coastal-region": {
      // Coastline from Lamu, Tana River, Kilifi, Mombasa to Kwale & Taita Taveta
      path: "M 670,360 L 690,480 L 640,640 L 560,700 L 510,610 L 580,570 L 590,440 L 550,380 Z",
      labelPos: { x: 610, y: 540 }
    }
  };

  const sectorsList = [
    { id: "all", label: "All Priorities" },
    { id: "jobs", label: "Youth Jobs & Tech" },
    { id: "water", label: "Water & Agriculture" },
    { id: "health", label: "Health & Human Capital" },
    { id: "infra", label: "Infrastructure & Land" }
  ];

  const filteredPriorities = selectedRegion.topCrowdsourcedPriorities.filter((p) => {
    if (selectedSectorFilter === "all") return true;
    if (selectedSectorFilter === "jobs") return p.sector.toLowerCase().includes("job") || p.sector.toLowerCase().includes("tech") || p.sector.toLowerCase().includes("trade");
    if (selectedSectorFilter === "water") return p.sector.toLowerCase().includes("water") || p.sector.toLowerCase().includes("agri") || p.sector.toLowerCase().includes("grain") || p.sector.toLowerCase().includes("coffee") || p.sector.toLowerCase().includes("fish");
    if (selectedSectorFilter === "health") return p.sector.toLowerCase().includes("health") || p.sector.toLowerCase().includes("substance") || p.sector.toLowerCase().includes("skills");
    if (selectedSectorFilter === "infra") return p.sector.toLowerCase().includes("land") || p.sector.toLowerCase().includes("power") || p.sector.toLowerCase().includes("port") || p.sector.toLowerCase().includes("transport");
    return true;
  });

  return (
    <div id="kenya-regional-priority-map" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            Article 174 & 203 Devolution Equity Monitor
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Kenya Regional Priority Map: Crowdsourced Youth Demands
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl mt-1">
            Real-time citizen priorities and devolved delivery demands aggregated across all 47 counties. Click on any region of Kenya to inspect localized economic bottlenecks, citizen quotes, and voting trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Add Local Demand
          </button>
        </div>
      </div>

      {/* Sector Filter Chips */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar border-b border-slate-100">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        <span className="text-xs font-medium text-slate-500 shrink-0">Filter Demand Areas:</span>
        {sectorsList.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSectorFilter(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedSectorFilter === s.id
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map (Left) + Detail Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* LEFT: Kenya Interactive SVG Map (Col 7) */}
        <div className="lg:col-span-7 flex flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-2xl p-4 sm:p-6 border border-slate-200/80 relative">
          <div className="w-full flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Interactive 47-County Regional Clusters</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              8 Devolved Economic Zones
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full max-w-[540px] aspect-square relative flex items-center justify-center">
            <svg
              viewBox="100 50 620 660"
              className="w-full h-full filter drop-shadow-md select-none"
            >
              <defs>
                <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Grid Lines for Technical Map Aesthetic */}
              <g opacity="0.15" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3">
                <line x1="100" y1="200" x2="720" y2="200" />
                <line x1="100" y1="400" x2="720" y2="400" />
                <line x1="100" y1="600" x2="720" y2="600" />
                <line x1="300" y1="50" x2="300" y2="710" />
                <line x1="500" y1="50" x2="500" y2="710" />
              </g>

              {/* Regional Polygons */}
              {KENYA_REGIONAL_PRIORITY_AREAS.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const isHovered = hoveredRegionId === region.id;
                const svgMeta = REGION_SVG_DATA[region.id];
                if (!svgMeta) return null;

                return (
                  <g
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="cursor-pointer transition-all duration-200"
                  >
                    <path
                      d={svgMeta.path}
                      fill={isSelected ? region.color : isHovered ? `${region.color}cc` : `${region.color}40`}
                      stroke={isSelected ? "#0f172a" : isHovered ? region.color : "#ffffff"}
                      strokeWidth={isSelected ? "3" : isHovered ? "2.5" : "1.8"}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      className="transition-all duration-200"
                    />

                    {/* Regional Label */}
                    <text
                      x={svgMeta.labelPos.x}
                      y={svgMeta.labelPos.y}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#1e293b"}
                      fontSize={isSelected ? "13" : "11"}
                      fontWeight={isSelected ? "700" : "600"}
                      className="pointer-events-none tracking-tight drop-shadow-xs"
                    >
                      {region.regionName.split(" ")[0]}
                    </text>
                  </g>
                );
              })}

              {/* Selected Pin Marker Indicator */}
              {selectedRegion && REGION_SVG_DATA[selectedRegion.id] && (
                <g transform={`translate(${REGION_SVG_DATA[selectedRegion.id].labelPos.x}, ${REGION_SVG_DATA[selectedRegion.id].labelPos.y - 20})`}>
                  <circle cx="0" cy="0" r="14" fill="#ffffff" opacity="0.9" />
                  <circle cx="0" cy="0" r="10" fill={selectedRegion.color} />
                  <circle cx="0" cy="0" r="4" fill="#ffffff" />
                </g>
              )}
            </svg>

            {/* Floating Quick Region Badges */}
            <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 justify-center pointer-events-auto">
              {KENYA_REGIONAL_PRIORITY_AREAS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegionId(r.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedRegionId === r.id
                      ? "bg-slate-900 text-white shadow-sm ring-2 ring-emerald-500/40"
                      : "bg-white/90 backdrop-blur-xs text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {r.regionName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Detailed Regional Priority & Crowdsourced Feedback Panel (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Card Header with Stats */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Selected Regional Cluster
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {selectedRegion.regionName}
                </h3>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: selectedRegion.color }}
              >
                {selectedRegion.populationEstimate}
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200/80 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block">Youth Population Share</span>
                <span className="font-bold text-slate-800 text-sm">{selectedRegion.youthShare}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block">Equitable Share (FY)</span>
                <span className="font-bold text-emerald-700 text-xs">{selectedRegion.devolutionEquitableShareFY}</span>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Counties: </span>
              {selectedRegion.countiesIncluded.join(", ")}
            </div>
          </div>

          {/* Top Crowdsourced Priorities List with Interactive Upvoting */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Crowdsourced Youth Demands ({filteredPriorities.length})
              </h4>
              <span className="text-xs text-slate-400">Click 👍 to endorse</span>
            </div>

            {filteredPriorities.map((item, idx) => {
              const voteKey = `${selectedRegion.id}-${idx}`;
              const totalVotes = votesState[voteKey] || item.votesCount;
              const hasVoted = hasVotedState[voteKey] || false;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-2xs font-semibold">
                          {item.sector}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-2xs font-semibold ${
                            item.urgencyLevel === "Emergency"
                              ? "bg-rose-100 text-rose-800"
                              : item.urgencyLevel === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.urgencyLevel} Urgency
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h5>
                    </div>

                    {/* Upvote Button */}
                    <button
                      onClick={() => handleVote(voteKey, item.votesCount)}
                      className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        hasVoted
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? "fill-emerald-600 text-emerald-600" : ""}`} />
                      <span className="text-2xs mt-0.5">{totalVotes.toLocaleString()}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-800">Actionable Demand: </span>
                    {item.demandedDeliverable}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Citizen Quotes from Ground */}
          {selectedRegion.citizenFeedbackHighlights.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
              <span className="text-2xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                Verified Citizen Voices ({selectedRegion.regionName})
              </span>
              <p className="text-xs italic text-amber-950">
                "{selectedRegion.citizenFeedbackHighlights[0].quote}"
              </p>
              <span className="text-2xs text-amber-800 font-semibold block mt-1.5">
                — {selectedRegion.citizenFeedbackHighlights[0].demographic} ({selectedRegion.citizenFeedbackHighlights[0].county} County)
              </span>
            </div>
          )}

          {/* Cross-Link Action */}
          {onSelectRegionForAudit && (
            <button
              onClick={() => onSelectRegionForAudit(selectedRegion)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <span>Test Manifesto Policy Against {selectedRegion.regionName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Modal: Submit Local Crowdsourced Demand */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add Local Community Demand</h3>
                  <p className="text-xs text-slate-500">Submit a verified constituent priority for 2027 manifesto accountability</p>
                </div>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Priority Registered Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your demand has been added to the non-partisan Kenya 2027 regional dataset and will be weighed in the Policy Audit Tool.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewPrioritySubmit} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your County</label>
                  <select
                    value={newPriorityCounty}
                    onChange={(e) => setNewPriorityCounty(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Nairobi (047)">Nairobi County (047)</option>
                    <option value="Kisumu (042)">Kisumu County (042)</option>
                    <option value="Mombasa (001)">Mombasa County (001)</option>
                    <option value="Nakuru (032)">Nakuru County (032)</option>
                    <option value="Uasin Gishu (027)">Uasin Gishu (027)</option>
                    <option value="Kakamega (037)">Kakamega County (037)</option>
                    <option value="Kilifi (003)">Kilifi County (003)</option>
                    <option value="Garissa (007)">Garissa County (007)</option>
                    <option value="Turkana (023)">Turkana County (023)</option>
                    <option value="Nyeri (019)">Nyeri County (019)</option>
                    <option value="Machakos (016)">Machakos County (016)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority Sector</label>
                  <select
                    value={newPrioritySector}
                    onChange={(e) => setNewPrioritySector(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Youth Jobs & Tech">Youth Jobs & Tech Skills</option>
                    <option value="Water & Agriculture">Water, Irrigation & Food Security</option>
                    <option value="Healthcare & Basic Rights">Healthcare & Article 43 Rights</option>
                    <option value="Land & Devolution">Land Reforms & Devolution Transparency</option>
                    <option value="Education & TVET">Education, Universities & TVET Toolkits</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Core Demand Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Solar boreholes and prompt milk payment regulation in Bomet"
                    value={newPriorityTitle}
                    onChange={(e) => setNewPriorityTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Exact Deliverable Demanded from Candidates</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe what measurable action must be completed in the first 100 days or 1 year under Article 201..."
                    value={newPriorityDeliverable}
                    onChange={(e) => setNewPriorityDeliverable(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit to Regional Registry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
