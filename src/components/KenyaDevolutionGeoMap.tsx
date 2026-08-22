import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import html2canvas from "html2canvas";
import {
  MapPin,
  Building2,
  Filter,
  Search,
  Layers,
  Sparkles,
  Compass,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Navigation,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Volume2,
  VolumeX,
  RefreshCw,
  Info,
  Camera,
  Download,
  Flame,
  X,
  Maximize2,
  Activity,
  DollarSign,
  Briefcase,
  Share2,
  Check,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import {
  KENYA_47_COUNTIES,
  KENYA_CIVIC_PROJECTS,
  KENYA_REGIONS,
  PROJECT_SECTORS,
  CountyData,
  CivicProjectLocation
} from "../data/kenyaCountiesData";
import { useCivicAccessibility } from "../context/CivicAccessibilityContext";
import { useLanguage } from "../context/LanguageContext";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

interface KenyaDevolutionGeoMapProps {
  onAuditProjectClaim?: (claimTitle: string, domainName?: string) => void;
}

// Controller for programmatic pan/zoom
function MapPanController({
  targetCenter,
  targetZoom
}: {
  targetCenter: { lat: number; lng: number } | null;
  targetZoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map || !targetCenter) return;
    map.panTo(targetCenter);
    if (targetZoom) {
      map.setZoom(targetZoom);
    }
  }, [map, targetCenter, targetZoom]);

  return null;
}

// Marker Clusterer Component for Google Maps
function ClusteredProjectMarkers({
  projects,
  onSelectProject,
  selectedProjectId
}: {
  projects: CivicProjectLocation[];
  onSelectProject: (proj: CivicProjectLocation) => void;
  selectedProjectId?: string;
}) {
  const map = useMap();
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersMapRef = useRef<{ [id: string]: google.maps.marker.AdvancedMarkerElement }>({});

  useEffect(() => {
    if (!map) return;

    if (!clustererRef.current) {
      clustererRef.current = new MarkerClusterer({ map });
    }

    const clusterer = clustererRef.current;
    clusterer.clearMarkers();
    markersMapRef.current = {};

    // Check if AdvancedMarkerElement is supported in this SDK load
    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      const advancedMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

      projects.forEach((proj) => {
        // Create custom pin element
        const pinElement = document.createElement("div");
        pinElement.className = "cursor-pointer transition-transform hover:scale-125";
        
        let colorBg = "#2563eb"; // In progress
        if (proj.status === "Completed") colorBg = "#059669";
        else if (proj.status === "Delayed") colorBg = "#d97706";
        else if (proj.status === "Under Audit Scrutiny") colorBg = "#dc2626";

        pinElement.innerHTML = `
          <div style="background-color: ${colorBg}; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 2px solid white; font-size: 11px; font-weight: 800;">
            ${proj.sector === "Healthcare" ? "🏥" : proj.sector === "Infrastructure" ? "🏗️" : proj.sector === "Education" ? "🎓" : proj.sector === "Clean Energy" ? "⚡" : "💧"}
          </div>
        `;

        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: proj.coordinates,
          title: proj.title,
          content: pinElement
        });

        marker.addListener("click", () => {
          onSelectProject(proj);
        });

        advancedMarkers.push(marker);
        markersMapRef.current[proj.id] = marker;
      });

      clusterer.addMarkers(advancedMarkers);
    }

    return () => {
      if (clusterer) {
        clusterer.clearMarkers();
      }
    };
  }, [map, projects, onSelectProject]);

  return null;
}

// Density Heatmap Layer Component (Canvas Overlay)
function DevelopmentIntensityHeatmap({
  projects,
  counties,
  enabled
}: {
  projects: CivicProjectLocation[];
  counties: CountyData[];
  enabled: boolean;
}) {
  const map = useMap();
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    if (!map || !enabled) return;
    const listener = map.addListener("idle", () => {
      setBounds(map.getBounds() || null);
    });
    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, enabled]);

  if (!enabled || !map) return null;

  return (
    <>
      {/* Visual County Intensity Halos */}
      {counties.map((c) => {
        const intensity = Math.min(100, Math.max(20, c.totalDevelopmentProjects * 3));
        const color =
          intensity > 70
            ? "rgba(220, 38, 38, 0.45)" // High density red/rose
            : intensity > 45
            ? "rgba(245, 158, 11, 0.45)" // Medium amber
            : "rgba(16, 185, 129, 0.35)"; // Moderate emerald

        return (
          <AdvancedMarker key={`heat-${c.code}`} position={c.coordinates}>
            <div
              className="rounded-full pointer-events-none animate-pulse flex items-center justify-center"
              style={{
                width: `${intensity * 1.2}px`,
                height: `${intensity * 1.2}px`,
                backgroundColor: color,
                filter: "blur(8px)",
                border: "2px solid rgba(255,255,255,0.2)"
              }}
            />
          </AdvancedMarker>
        );
      })}
    </>
  );
}

export const KenyaDevolutionGeoMap: React.FC<KenyaDevolutionGeoMapProps> = ({ onAuditProjectClaim }) => {
  const { settings, speakText, stopSpeaking, isSpeaking } = useCivicAccessibility();
  const { language, t } = useLanguage();

  // Layer & Filter States
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
  const [selectedSector, setSelectedSector] = useState<string>("All Sectors");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isHeatmapEnabled, setIsHeatmapEnabled] = useState<boolean>(false);
  const [isClusteringEnabled, setIsClusteringEnabled] = useState<boolean>(true);

  // Map & Inspector State
  const [selectedProject, setSelectedProject] = useState<CivicProjectLocation | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<CountyData>(KENYA_47_COUNTIES[0]);
  const [hoveredCounty, setHoveredCounty] = useState<CountyData | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [targetCenter, setTargetCenter] = useState<{ lat: number; lng: number } | null>({ lat: 0.2, lng: 37.5 });
  const [targetZoom, setTargetZoom] = useState<number>(7);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [isCopiedNotification, setIsCopiedNotification] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // If user has not provided Google Maps API key, render mandatory splash screen
  if (!hasValidKey) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-xl w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Compass className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Google Maps API Key Required
          </h2>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            To view the <strong>Kenya 47 Counties Geo-Tracker & Civic Infrastructure Map</strong>, please configure your Google Maps Platform API key in AI Studio.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-6 space-y-3 text-xs sm:text-sm text-slate-700">
            <p>
              <strong>Step 1:</strong>{" "}
              <a
                href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-bold underline inline-flex items-center gap-1"
              >
                Get a Google Maps API Key
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </p>
            <p>
              <strong>Step 2:</strong> Add your key as a secret in AI Studio:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>
                Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)
              </li>
              <li>
                Select <strong>Secrets</strong>
              </li>
              <li>
                Type <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-emerald-800 font-semibold">GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong>
              </li>
              <li>
                Paste your API key as the value, press <strong>Enter</strong>
              </li>
            </ol>
            <p className="text-[11px] text-slate-500 pt-1">
              ✨ The app will rebuild automatically after you add the secret — no page reload needed.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start space-x-2 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Non-Partisan Civic Guarantee:</strong> Devolution tracking allows all citizens to cross-reference budget allocations against on-the-ground infrastructure.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filter projects based on sector, status, region, keyword
  const filteredProjects = useMemo(() => {
    const q = (searchKeyword || "").trim().toLowerCase();
    return KENYA_CIVIC_PROJECTS.filter((proj) => {
      if (selectedSector !== "All Sectors" && proj.sector !== selectedSector) return false;
      if (selectedStatus !== "All Statuses" && proj.status !== selectedStatus) return false;
      if (selectedRegion !== "All Regions") {
        const county = KENYA_47_COUNTIES.find((c) => c.code === proj.countyCode);
        if (county && county.region !== selectedRegion) return false;
      }
      if (q) {
        return (
          (proj.title || "").toLowerCase().includes(q) ||
          (proj.countyName || "").toLowerCase().includes(q) ||
          (proj.implementingAgency || "").toLowerCase().includes(q) ||
          (proj.description || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedSector, selectedStatus, selectedRegion, searchKeyword]);

  // Filter counties
  const filteredCounties = useMemo(() => {
    const q = (searchKeyword || "").trim().toLowerCase();
    return KENYA_47_COUNTIES.filter((c) => {
      if (selectedRegion !== "All Regions" && c.region !== selectedRegion) return false;
      if (q) {
        return (
          (c.name || "").toLowerCase().includes(q) ||
          (c.capital || "").toLowerCase().includes(q) ||
          (c.primaryEconomy || []).some((e) => (e || "").toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedRegion, searchKeyword]);

  const handleSelectCounty = (county: CountyData) => {
    setSelectedCounty(county);
    setSelectedProject(null);
    setTargetCenter(county.coordinates);
    setTargetZoom(10);
  };

  const handleSelectProject = useCallback((proj: CivicProjectLocation) => {
    setSelectedProject(proj);
    setIsSidebarOpen(true);
    setTargetCenter(proj.coordinates);
    setTargetZoom(12);
    const county = KENYA_47_COUNTIES.find((c) => c.code === proj.countyCode);
    if (county) setSelectedCounty(county);
  }, []);

  const handleNarrateProject = (proj: CivicProjectLocation) => {
    const text = `${proj.title} in ${proj.countyName} County. Sector: ${proj.sector}. Total budget: ${proj.budgetKES}. Completion status: ${proj.completionPercent} percent. ${proj.description}`;
    speakText(text);
  };

  // Capture High-Res View Function
  const handleCaptureView = async () => {
    if (!mapContainerRef.current) return;
    setIsCapturing(true);
    try {
      // Add slight delay to ensure rendering settles
      await new Promise((resolve) => setTimeout(resolve, 300));
      const canvas = await html2canvas(mapContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: "#0f172a"
      });

      // Composite custom watermark banner on the captured canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
        ctx.fillRect(0, canvas.height - 70, canvas.width, 70);
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("KENYA 2027 — CIVIC INFRASTRUCTURE & DEVOLUTION AUDIT MAP", 24, canvas.height - 38);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "14px sans-serif";
        ctx.fillText(`Generated on ${new Date().toLocaleDateString("en-GB")} • Filter: ${selectedSector} • ${filteredProjects.length} Projects Tracked`, 24, canvas.height - 16);
      }

      const imgUri = canvas.toDataURL("image/png");
      setCapturedImageUri(imgUri);

      // Auto download
      const link = document.createElement("a");
      link.download = `Kenya2027_Devolution_Map_${selectedSector.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = imgUri;
      link.click();
    } catch (err) {
      console.warn("Capture view error:", err);
    } finally {
      setIsCapturing(false);
    }
  };

  const getStatusBadgeClass = (status: CivicProjectLocation["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delayed":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Under Audit Scrutiny":
        return "bg-rose-100 text-rose-800 border-rose-200";
    }
  };

  const getSectorIcon = (sector: CivicProjectLocation["sector"]) => {
    switch (sector) {
      case "Healthcare":
        return "🏥";
      case "Infrastructure":
        return "🏗️";
      case "Education":
        return "🎓";
      case "Water & Irrigation":
        return "💧";
      case "Clean Energy":
        return "⚡";
      case "Agriculture & Food":
        return "🌾";
      default:
        return "📍";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Command Center */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-emerald-600 mb-1">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Google Maps JavaScript API • 47 Counties Devolution Geo-Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kenya Devolution & Civic Infrastructure Map
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
              Real-time spatial visualization of public capital projects, equitable share devolution allocations, and statutory audit integrity across all 47 counties.
            </p>
          </div>

          {/* Quick Action Controls: Heatmap Toggle & Capture View */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Heatmap Toggle */}
            <button
              onClick={() => setIsHeatmapEnabled(!isHeatmapEnabled)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isHeatmapEnabled
                  ? "bg-rose-600 text-white shadow-md ring-2 ring-rose-300"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
              title="Toggle Public Investment Density Heatmap"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Development Heatmap: {isHeatmapEnabled ? "ON" : "OFF"}</span>
            </button>

            {/* Marker Clustering Toggle */}
            <button
              onClick={() => setIsClusteringEnabled(!isClusteringEnabled)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isClusteringEnabled
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
              title="Toggle Marker Clustering"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clustering: {isClusteringEnabled ? "ON" : "OFF"}</span>
            </button>

            {/* Capture View Button */}
            <button
              onClick={handleCaptureView}
              disabled={isCapturing}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              title="Capture and Download High-Resolution Annotated Map View for Audit Reports"
            >
              {isCapturing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5" />
              )}
              <span>{isCapturing ? "Capturing..." : "Capture View"}</span>
            </button>
          </div>
        </div>

        {/* Sector Layer Toggles (Healthcare, Education, Infrastructure, etc.) */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-2.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sector Layer Selector:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {PROJECT_SECTORS.map((sector) => {
              const isActive = selectedSector === sector;
              return (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <span>{getSectorIcon(sector as any)}</span>
                  <span>{sector}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-emerald-800 text-emerald-100" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {sector === "All Sectors"
                      ? KENYA_CIVIC_PROJECTS.length
                      : KENYA_CIVIC_PROJECTS.filter((p) => p.sector === sector).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Region Filters Toolbar */}
        <div className="mt-4 pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* County / Region Quick Jump Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search counties, hospitals, ports, roads..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Region Filter */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
            >
              {KENYA_REGIONS.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Project Delivery Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
            >
              <option value="All Statuses">All Delivery Statuses</option>
              <option value="Completed">Completed (Operational)</option>
              <option value="In Progress">In Progress (Active Construction)</option>
              <option value="Delayed">Delayed / Stalled</option>
              <option value="Under Audit Scrutiny">Under Auditor-General Scrutiny</option>
            </select>
          </div>

          {/* Quick Reset Button */}
          <button
            onClick={() => {
              setSelectedSector("All Sectors");
              setSelectedRegion("All Regions");
              setSelectedStatus("All Statuses");
              setSearchKeyword("");
              setTargetCenter({ lat: 0.2, lng: 37.5 });
              setTargetZoom(7);
              setSelectedProject(null);
            }}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>

      {/* Main Map, Floating County Hover Card, and Interactive Project Sidebar */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Container Area */}
        <div
          ref={mapContainerRef}
          className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg relative"
        >
          {/* Top Status & Attribution Bar */}
          <div className="bg-slate-950 text-slate-200 px-4 py-2.5 text-xs font-semibold flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-300 text-[11px]">Completed</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-slate-300 text-[11px]">In Progress</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-300 text-[11px]">Delayed</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-slate-300 text-[11px]">Audit Scrutiny</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <span>{filteredProjects.length} Projects Visible</span>
              <span>•</span>
              <button
                onClick={() => {
                  setTargetCenter({ lat: 0.2, lng: 37.5 });
                  setTargetZoom(7);
                  setSelectedProject(null);
                }}
                className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Center</span>
              </button>
            </div>
          </div>

          {/* Google Maps Viewport with Explicit Height (CF2) */}
          <div className="relative w-full h-[580px] sm:h-[680px]">
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={{ lat: 0.2, lng: 37.5 }}
                defaultZoom={7}
                mapId="KENYA_CIVIC_MAP_2027"
                internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                style={{ width: "100%", height: "100%" }}
                gestureHandling="cooperative"
                mapTypeControl={true}
                streetViewControl={true}
                fullscreenControl={true}
              >
                <MapPanController targetCenter={targetCenter} targetZoom={targetZoom} />

                {/* Development Intensity Heatmap Layer */}
                <DevelopmentIntensityHeatmap
                  projects={filteredProjects}
                  counties={filteredCounties}
                  enabled={isHeatmapEnabled}
                />

                {/* Clustered or Direct Markers */}
                {isClusteringEnabled ? (
                  <ClusteredProjectMarkers
                    projects={filteredProjects}
                    onSelectProject={handleSelectProject}
                    selectedProjectId={selectedProject?.id}
                  />
                ) : (
                  filteredProjects.map((proj) => {
                    const isSelected = selectedProject?.id === proj.id;
                    let pinBg = "#2563eb";
                    if (proj.status === "Completed") pinBg = "#059669";
                    else if (proj.status === "Delayed") pinBg = "#d97706";
                    else if (proj.status === "Under Audit Scrutiny") pinBg = "#dc2626";

                    return (
                      <AdvancedMarker
                        key={proj.id}
                        position={proj.coordinates}
                        onClick={() => handleSelectProject(proj)}
                        title={proj.title}
                      >
                        <Pin
                          background={pinBg}
                          glyphColor="#ffffff"
                          borderColor="#ffffff"
                          scale={isSelected ? 1.4 : 1.0}
                        />
                      </AdvancedMarker>
                    );
                  })
                )}

                {/* County Center Badges with On-Hover Summary Card Trigger */}
                {filteredCounties.map((county) => {
                  const isSelected = selectedCounty.code === county.code;
                  return (
                    <AdvancedMarker
                      key={`county-marker-${county.code}`}
                      position={county.coordinates}
                      onClick={() => handleSelectCounty(county)}
                    >
                      <div
                        onMouseEnter={(e) => {
                          setHoveredCounty(county);
                          setHoverPosition({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredCounty(null)}
                        className={`px-2 py-0.8 rounded-lg text-[10px] font-black border shadow-md flex items-center space-x-1 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-emerald-600 text-white border-emerald-300 scale-110 ring-2 ring-emerald-400"
                            : "bg-slate-900/90 text-slate-100 border-slate-700 hover:bg-emerald-800"
                        }`}
                      >
                        <Landmark className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{county.name}</span>
                      </div>
                    </AdvancedMarker>
                  );
                })}

                {/* Custom Interactive InfoWindow for Map Marker */}
                {selectedProject && !isSidebarOpen && (
                  <InfoWindow
                    position={selectedProject.coordinates}
                    onCloseClick={() => setSelectedProject(null)}
                  >
                    <div className="max-w-[300px] p-1 font-sans text-slate-900">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                          {selectedProject.countyName} County
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getStatusBadgeClass(
                            selectedProject.status
                          )}`}
                        >
                          {selectedProject.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {selectedProject.title}
                      </h4>

                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {selectedProject.description}
                      </p>

                      <div className="mt-2 pt-2 border-t border-slate-200 grid grid-cols-2 gap-1 text-[10px]">
                        <div>
                          <span className="text-slate-500 block">Total Budget:</span>
                          <span className="font-extrabold text-slate-900">
                            {selectedProject.budgetKES}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Progress:</span>
                          <span className="font-extrabold text-emerald-700">
                            {selectedProject.completionPercent}%
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center space-x-1.5">
                        <button
                          onClick={() => setIsSidebarOpen(true)}
                          className="flex-1 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[10px] font-bold transition-colors"
                        >
                          View Full Breakdown
                        </button>
                        {onAuditProjectClaim && (
                          <button
                            onClick={() =>
                              onAuditProjectClaim(selectedProject.title, selectedProject.sector)
                            }
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-colors flex items-center gap-1"
                            title="Audit in 13-Point Evaluator"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Audit</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>

            {/* Floating County On-Hover Summary Card (Over the Map) */}
            {hoveredCounty && (
              <div className="absolute top-4 left-4 z-20 pointer-events-none max-w-xs w-full bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 rounded-xl p-4 shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-emerald-400" />
                      <span>{hoveredCounty.name} County</span>
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      Code {hoveredCounty.code} • {hoveredCounty.region} Region
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                    {hoveredCounty.equitableShareKES}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-slate-800/80 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">
                      Active Projects
                    </span>
                    <span className="text-sm font-black text-white">
                      {hoveredCounty.totalDevelopmentProjects} Projects
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">
                      Avg. Completion
                    </span>
                    <span className="text-sm font-black text-emerald-400">
                      {hoveredCounty.avgCompletionRate}%
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-300">
                  <span className="text-slate-400 font-bold block mb-1">Key Economic Pillars:</span>
                  <div className="flex flex-wrap gap-1">
                    {hoveredCounty.primaryEconomy.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200 border border-slate-700 text-[9px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Interactive Sidebar: Project Details / County Devolution Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Project Details Sidebar (Automatically slides open when marker is clicked) */}
          {selectedProject && isSidebarOpen ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-md space-y-4 relative animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    Interactive Project Sidebar
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleNarrateProject(selectedProject)}
                    className="p-1 text-slate-400 hover:text-emerald-600 rounded transition-colors"
                    title="Audio Narration"
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4 text-rose-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                    title="Close Sidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-1.5 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {selectedProject.sector}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-700">
                    {selectedProject.countyName} County
                  </span>
                  <span>•</span>
                  <span>Target: {selectedProject.targetCompletionYear}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600">Progress-to-Goal Metric</span>
                  <span className="text-emerald-700 font-black">
                    {selectedProject.completionPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      selectedProject.completionPercent === 100
                        ? "bg-emerald-600"
                        : selectedProject.completionPercent > 60
                        ? "bg-blue-600"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${selectedProject.completionPercent}%` }}
                  />
                </div>
              </div>

              {/* Detailed Cost Breakdown (Requested in prompt) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                  <span className="flex items-center gap-1 text-slate-700">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Project Cost Breakdown</span>
                  </span>
                  <span className="font-black text-emerald-700 text-sm">
                    {selectedProject.budgetKES}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Original Budget:</span>
                    <span className="font-bold text-slate-800">
                      {selectedProject.costBreakdown.originalBudgetKES}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Disbursed to Date:</span>
                    <span className="font-bold text-blue-700">
                      {selectedProject.costBreakdown.amountDisbursedKES}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Pending Absorption:</span>
                    <span className="font-bold text-slate-800">
                      {selectedProject.costBreakdown.pendingAbsorptionKES}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Cost Variance:</span>
                    <span
                      className={`font-bold ${
                        selectedProject.costBreakdown.costVariancePercent > 10
                          ? "text-rose-600"
                          : "text-emerald-700"
                      }`}
                    >
                      +{selectedProject.costBreakdown.costVariancePercent}%
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Contractor:</span>
                    <span className="font-semibold text-slate-800 text-right">
                      {selectedProject.costBreakdown.primaryContractor}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Financing Partner:</span>
                    <span className="font-semibold text-slate-800 text-right">
                      {selectedProject.costBreakdown.financingPartner}
                    </span>
                  </div>
                </div>
              </div>

              {/* Auditor-General Finding Note */}
              {selectedProject.auditorFinding && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Auditor-General Statutory Finding</span>
                  </div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    {selectedProject.auditorFinding}
                  </p>
                </div>
              )}

              {/* Kenya 2060 Goal Alignment */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-900 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Kenya 2060 Outcome Alignment</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  {selectedProject.kenya2060Goal}
                </p>
              </div>

              {/* Direct Audit Trigger */}
              {onAuditProjectClaim && (
                <button
                  onClick={() =>
                    onAuditProjectClaim(selectedProject.title, selectedProject.sector)
                  }
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Run Full 13-Point Policy Audit on this Project</span>
                </button>
              )}
            </div>
          ) : (
            /* County Devolution Card */
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    County Devolution Card
                  </span>
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                    Code {selectedCounty.code}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  {selectedCounty.region} Region
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedCounty.name} County
                </h3>
                <p className="text-xs text-slate-500">
                  Capital: <span className="font-bold text-slate-700">{selectedCounty.capital}</span>{" "}
                  • Population:{" "}
                  <span className="font-bold text-slate-700">{selectedCounty.population}</span>
                </p>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <span className="text-slate-500 text-[10px] font-bold block uppercase tracking-wider">
                    Equitable Share (FY24/25)
                  </span>
                  <span className="text-sm font-black text-emerald-700">
                    {selectedCounty.equitableShareKES}
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <span className="text-slate-500 text-[10px] font-bold block uppercase tracking-wider">
                    Budget Absorption
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {selectedCounty.absorptionRate}%
                  </span>
                </div>
              </div>

              {/* Development Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <span className="text-slate-500 text-[10px] font-bold block uppercase tracking-wider">
                    Total Tracked Projects
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {selectedCounty.totalDevelopmentProjects} Projects
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <span className="text-slate-500 text-[10px] font-bold block uppercase tracking-wider">
                    Avg Completion Rate
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    {selectedCounty.avgCompletionRate}%
                  </span>
                </div>
              </div>

              {/* 2027 Manifesto Regional Commitments */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2027 Manifesto Regional Pledges</span>
                </span>
                <div className="space-y-2">
                  {selectedCounty.major2027ManifestoPledges.map((pledge, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-bold text-slate-700">{pledge.proponent}</span>
                        <span className="font-black text-emerald-700">
                          {pledge.estimatedCost}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900">{pledge.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 47 Counties Quick Selector List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Jump to County
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {filteredCounties.length} Counties
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {filteredCounties.map((c) => {
                const isSelected = selectedCounty.code === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => handleSelectCounty(c)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? "text-emerald-200" : "text-slate-400"
                        }`}
                      >
                        {c.code}
                      </span>
                      <span>{c.name}</span>
                    </div>
                    <span
                      className={`text-[11px] ${
                        isSelected ? "text-emerald-100" : "text-slate-500"
                      }`}
                    >
                      {c.equitableShareKES}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
