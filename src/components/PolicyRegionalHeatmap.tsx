import React, { useState } from "react";
import { 
  MapPin, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Scale, 
  Sliders, 
  Compass, 
  Flame,
  ArrowRight,
  Sparkles,
  BarChart3
} from "lucide-react";

interface RegionalHeatmapData {
  id: string;
  name: string;
  counties: string;
  populationShare: string;
  developmentGapScore: number; // 0 to 100 (higher = greater historical deficit)
  gapIndicators: {
    povertyRate: string;
    unemploymentRate: string;
    electricityAccess: string;
    pavedRoadDensity: string;
  };
  policyAllocationWeight: number; // 0 to 100 (how much current policy addresses this)
  netBenefitVerdict: "High Net Beneficiary" | "Moderate Beneficiary" | "Under-Targeted / Deficit Risk" | "Equalized";
  keyInterventionNeeded: string;
  policyImpactNotes: string;
  svgPath: string;
  labelPos: { x: number; y: number };
}

interface PolicyRegionalHeatmapProps {
  policyDomain?: string;
  policyTitle?: string;
}

export const PolicyRegionalHeatmap: React.FC<PolicyRegionalHeatmapProps> = ({
  policyDomain = "Economic Growth & Devolution",
  policyTitle = "Proposed National Policy"
}) => {
  const [viewMode, setViewMode] = useState<"development-gaps" | "policy-flow" | "equity-balance">("policy-flow");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("northern-asal");
  const [equalizationModifier, setEqualizationModifier] = useState<number>(15); // baseline 15%

  const REGIONS_DATA: RegionalHeatmapData[] = [
    {
      id: "northern-asal",
      name: "Northern & ASAL Equalization Zone",
      counties: "Turkana, Marsabit, Mandera, Wajir, Garissa, Samburu, Isiolo",
      populationShare: "14% of population (68% landmass)",
      developmentGapScore: 84, // severe gap
      gapIndicators: {
        povertyRate: "62.4%",
        unemploymentRate: "48.2%",
        electricityAccess: "31.0%",
        pavedRoadDensity: "Low (1.4 km/100 sq km)"
      },
      policyAllocationWeight: 68,
      netBenefitVerdict: "High Net Beneficiary",
      keyInterventionNeeded: "Solar mini-grids, water desalination, livestock insurance & Equalization Fund disbursements",
      policyImpactNotes: "Proposals providing decentralized infrastructure and drought-tolerant livestock processing significantly narrow the historical margin under Art. 201(b).",
      svgPath: "M 180,240 L 220,110 L 330,80 L 460,70 L 590,120 L 680,180 L 670,360 L 550,380 L 480,340 L 420,360 L 330,340 L 280,300 L 220,310 Z",
      labelPos: { x: 440, y: 210 }
    },
    {
      id: "rift-valley-grain",
      name: "Rift Valley Agro-Heartland",
      counties: "Uasin Gishu, Trans Nzoia, Nakuru, Kericho, Nandi, Baringo, Elgeyo Marakwet",
      populationShare: "22% of population",
      developmentGapScore: 42,
      gapIndicators: {
        povertyRate: "34.1%",
        unemploymentRate: "28.5%",
        electricityAccess: "64.2%",
        pavedRoadDensity: "Moderate (8.6 km/100 sq km)"
      },
      policyAllocationWeight: 88,
      netBenefitVerdict: "High Net Beneficiary",
      keyInterventionNeeded: "Mobile grain driers, fertilizer e-vouchers, milk cooling plants & feeder roads",
      policyImpactNotes: "Heavy recipient of agricultural input subsidies, cereal storage modernization, and irrigation schemes.",
      svgPath: "M 280,300 L 330,340 L 370,390 L 400,470 L 410,570 L 340,600 L 300,560 L 330,470 L 270,410 L 220,310 Z",
      labelPos: { x: 345, y: 470 }
    },
    {
      id: "western-sugar",
      name: "Western Kenya Agro-Industrial",
      counties: "Kakamega, Bungoma, Busia, Vihiga",
      populationShare: "11% of population (highest rural density)",
      developmentGapScore: 58,
      gapIndicators: {
        povertyRate: "46.8%",
        unemploymentRate: "39.4%",
        electricityAccess: "58.0%",
        pavedRoadDensity: "High (12.4 km/100 sq km)"
      },
      policyAllocationWeight: 72,
      netBenefitVerdict: "Moderate Beneficiary",
      keyInterventionNeeded: "Sugar mill leasing reform, gold mining cooperatives & TVET light manufacturing",
      policyImpactNotes: "Benefits from agricultural debt write-offs and vocational training hubs to absorb dense youth demographics.",
      svgPath: "M 220,310 L 270,410 L 250,450 L 190,440 L 190,360 Z",
      labelPos: { x: 220, y: 395 }
    },
    {
      id: "lake-basin",
      name: "Lake Basin & Blue Economy",
      counties: "Kisumu, Siaya, Homa Bay, Migori, Kisii, Nyamira",
      populationShare: "13% of population",
      developmentGapScore: 54,
      gapIndicators: {
        povertyRate: "41.5%",
        unemploymentRate: "35.2%",
        electricityAccess: "62.0%",
        pavedRoadDensity: "Moderate (9.1 km/100 sq km)"
      },
      policyAllocationWeight: 76,
      netBenefitVerdict: "Moderate Beneficiary",
      keyInterventionNeeded: "Lake cage fish cold storage, rice irrigation (Ahero), cotton ginneries & marine logistics",
      policyImpactNotes: "Strategic beneficiary of maritime logistics, lake transport revamping, and port transshipment.",
      svgPath: "M 190,440 L 250,450 L 290,490 L 300,560 L 230,570 L 190,510 Z",
      labelPos: { x: 235, y: 515 }
    },
    {
      id: "mt-kenya-central",
      name: "Central & Mt. Kenya Highlands",
      counties: "Kiambu, Nyeri, Murang'a, Kirinyaga, Meru, Embu, Nyandarua, Laikipia",
      populationShare: "18% of population",
      developmentGapScore: 26,
      gapIndicators: {
        povertyRate: "22.3%",
        unemploymentRate: "24.1%",
        electricityAccess: "82.5%",
        pavedRoadDensity: "High (16.8 km/100 sq km)"
      },
      policyAllocationWeight: 80,
      netBenefitVerdict: "Moderate Beneficiary",
      keyInterventionNeeded: "Coffee & tea guaranteed minimum returns, macadamia/avocado export cold chains & industrial parks",
      policyImpactNotes: "Strong industrial absorptive capacity and high return on cash-crop price stabilization guarantees.",
      svgPath: "M 420,360 L 480,340 L 520,390 L 510,480 L 440,490 L 400,470 L 370,390 Z",
      labelPos: { x: 455, y: 420 }
    },
    {
      id: "nairobi-metro",
      name: "Nairobi Metropolitan Core",
      counties: "Nairobi City, Urban Kiambu & Kajiado peri-urban",
      populationShare: "12% of population (Generates 28% GDP)",
      developmentGapScore: 32,
      gapIndicators: {
        povertyRate: "21.5% (High informal settlement inequality)",
        unemploymentRate: "33.8%",
        electricityAccess: "94.0%",
        pavedRoadDensity: "Very High (38.2 km/100 sq km)"
      },
      policyAllocationWeight: 85,
      netBenefitVerdict: "High Net Beneficiary",
      keyInterventionNeeded: "Affordable housing tenure, digital freelancing tax reliefs, BRT mass transit & piped clean water",
      policyImpactNotes: "Concentrates national housing levies, tech innovation hubs, and mass transport capital investments.",
      svgPath: "M 440,490 L 510,480 L 520,530 L 480,560 L 425,540 L 410,510 Z",
      labelPos: { x: 465, y: 520 }
    },
    {
      id: "coast-blue-economy",
      name: "Coast & Maritime Blue Belt",
      counties: "Mombasa, Kilifi, Kwale, Lamu, Tana River, Taita Taveta",
      populationShare: "8% of population",
      developmentGapScore: 66,
      gapIndicators: {
        povertyRate: "51.2%",
        unemploymentRate: "42.0%",
        electricityAccess: "54.1%",
        pavedRoadDensity: "Low-Moderate (4.8 km/100 sq km)"
      },
      policyAllocationWeight: 62,
      netBenefitVerdict: "Under-Targeted / Deficit Risk",
      keyInterventionNeeded: "Historical land tenure regularization, Dongo Kundu SEZ local job quotas & deep-sea fishing fleet",
      policyImpactNotes: "Requires explicit ring-fenced quotas to ensure port and special economic zones translate to local community incomes.",
      svgPath: "M 520,530 L 610,540 L 680,610 L 650,710 L 560,680 L 510,610 L 480,560 Z",
      labelPos: { x: 580, y: 620 }
    },
    {
      id: "eastern-lower-semi-arid",
      name: "Lower Eastern & Semi-Arid",
      counties: "Kitui, Makueni, Machakos lower",
      populationShare: "6% of population",
      developmentGapScore: 61,
      gapIndicators: {
        povertyRate: "48.6%",
        unemploymentRate: "36.2%",
        electricityAccess: "51.0%",
        pavedRoadDensity: "Low (3.9 km/100 sq km)"
      },
      policyAllocationWeight: 59,
      netBenefitVerdict: "Under-Targeted / Deficit Risk",
      keyInterventionNeeded: "Sand dam water harvesting, Thwake multi-purpose dam water treatment, drought crop value chains",
      policyImpactNotes: "High vulnerability to climate shocks; needs targeted water storage investments to sustain agrarian livelihoods.",
      svgPath: "M 510,480 L 670,360 L 610,540 L 520,530 Z",
      labelPos: { x: 570, y: 480 }
    }
  ];

  const selectedRegion = REGIONS_DATA.find((r) => r.id === selectedRegionId) || REGIONS_DATA[0];

  // Helper color map based on current viewMode
  const getRegionFill = (region: RegionalHeatmapData) => {
    const isSelected = selectedRegionId === region.id;

    if (viewMode === "development-gaps") {
      // Red/Amber for high deficit
      if (region.developmentGapScore >= 70) return isSelected ? "#991b1b" : "#dc2626";
      if (region.developmentGapScore >= 50) return isSelected ? "#c2410c" : "#f97316";
      if (region.developmentGapScore >= 35) return isSelected ? "#d97706" : "#fbbf24";
      return isSelected ? "#047857" : "#10b981";
    }

    if (viewMode === "policy-flow") {
      // Emerald for high policy investment
      if (region.policyAllocationWeight >= 80) return isSelected ? "#064e3b" : "#059669";
      if (region.policyAllocationWeight >= 65) return isSelected ? "#047857" : "#10b981";
      if (region.policyAllocationWeight >= 50) return isSelected ? "#d97706" : "#f59e0b";
      return isSelected ? "#991b1b" : "#ef4444";
    }

    // Equity balance mode
    if (region.netBenefitVerdict === "High Net Beneficiary") return isSelected ? "#065f46" : "#059669";
    if (region.netBenefitVerdict === "Moderate Beneficiary") return isSelected ? "#1e40af" : "#3b82f6";
    return isSelected ? "#9a3412" : "#f97316";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6" id="policy-regional-heatmap">
      {/* Section Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Article 201(b) Devolution & Spatial Equity Analysis</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Geographical Heatmap: Proposed Investments vs National Development Gaps
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Evaluating how manifesto proposals distribute capital investments across Kenya's 8 regional clusters. Highlights whether policy commitments bridge historical poverty gaps or concentrate resources in already industrialized counties.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs shrink-0">
            <button
              onClick={() => setViewMode("policy-flow")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === "policy-flow"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Policy Resource Flow
            </button>
            <button
              onClick={() => setViewMode("development-gaps")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === "development-gaps"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Baseline Deficits (KNBS)
            </button>
            <button
              onClick={() => setViewMode("equity-balance")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === "equity-balance"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Equity Verdict
            </button>
          </div>
        </div>
      </div>

      {/* Heatmap Layout: SVG Interactive Map on Left, Region Deep Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Interactive Map (6 cols) */}
        <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-4 sm:p-6 text-white flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              KENYA SPATIAL RESOURCE MAP (750x750)
            </span>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {viewMode === "policy-flow" ? "🟢 Investment Density" : viewMode === "development-gaps" ? "🔴 Poverty & Infra Deficit" : "⚖️ Article 201 Equity"}
            </span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-square max-w-[480px] mx-auto">
            <svg
              viewBox="100 50 600 700"
              className="w-full h-full drop-shadow-md"
            >
              {REGIONS_DATA.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const fill = getRegionFill(region);

                return (
                  <g key={region.id} className="cursor-pointer" onClick={() => setSelectedRegionId(region.id)}>
                    <path
                      d={region.svgPath}
                      fill={fill}
                      stroke={isSelected ? "#ffffff" : "#1e293b"}
                      strokeWidth={isSelected ? 3.5 : 1.5}
                      className="transition-all duration-200 hover:opacity-90"
                    />
                    <circle
                      cx={region.labelPos.x}
                      cy={region.labelPos.y}
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? "#ffffff" : "#0f172a"}
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> High Inflow / Low Deficit
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High Deficit / Under-Served
              </span>
            </div>
            <span>Click any region to inspect</span>
          </div>
        </div>

        {/* Region Deep-Dive Panel (6 cols) */}
        <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded border ${
                  selectedRegion.netBenefitVerdict.includes("High")
                    ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                    : selectedRegion.netBenefitVerdict.includes("Moderate")
                    ? "bg-blue-100 text-blue-950 border-blue-300"
                    : "bg-amber-100 text-amber-950 border-amber-300"
                }`}>
                  {selectedRegion.netBenefitVerdict}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedRegion.populationShare}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {selectedRegion.name}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Counties: <strong className="text-slate-800">{selectedRegion.counties}</strong>
              </p>
            </div>

            {/* Gap Score vs Policy Allocation Meter */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Historical Deficit Index</span>
                <span className="text-2xl font-black text-rose-700">{selectedRegion.developmentGapScore}</span>
                <span className="text-xs text-slate-400 font-normal"> / 100</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Based on KNBS & OAG</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Proposal Investment Flow</span>
                <span className="text-2xl font-black text-emerald-700">{selectedRegion.policyAllocationWeight}%</span>
                <span className="text-xs text-slate-400 font-normal"> intensity</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Targeted in manifesto</p>
              </div>
            </div>

            {/* Key County Gap Indicators Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Official Socio-Economic Indicators (KNBS):
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">Poverty Rate</span>
                  <span className="font-bold text-slate-800">{selectedRegion.gapIndicators.povertyRate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">Youth Unemployment</span>
                  <span className="font-bold text-slate-800">{selectedRegion.gapIndicators.unemploymentRate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">Grid Electricity Access</span>
                  <span className="font-bold text-slate-800">{selectedRegion.gapIndicators.electricityAccess}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">Paved Road Network</span>
                  <span className="font-bold text-slate-800">{selectedRegion.gapIndicators.pavedRoadDensity}</span>
                </div>
              </div>
            </div>

            {/* Policy Impact Notes */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Policy Evaluation & Impact Assessment</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                {selectedRegion.policyImpactNotes}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700">
                <strong className="text-slate-900">Priority Deliverable:</strong> {selectedRegion.keyInterventionNeeded}
              </div>
            </div>
          </div>

          {/* Equalization Fund Simulator Slider */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span>Simulate Article 204 Equalization Fund Share:</span>
              </span>
              <span className="font-mono text-emerald-800">{equalizationModifier}% of National Revenue</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={equalizationModifier}
              onChange={(e) => setEqualizationModifier(Number(e.target.value))}
              className="w-full h-1.5 bg-emerald-200 rounded accent-emerald-700 cursor-pointer"
            />
            <p className="text-[10px] text-emerald-800 italic">
              Adjusting to {equalizationModifier}% increases marginalized county water and feeder road allocations by approximately KES {(equalizationModifier * 2.4).toFixed(1)} Billion annually.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
