export interface CountyData {
  code: string;
  name: string;
  capital: string;
  region: "Nairobi" | "Central" | "Coast" | "Rift Valley" | "Western" | "Nyanza" | "Eastern" | "North Eastern";
  coordinates: { lat: number; lng: number };
  population: string;
  equitableShareKES: string; // e.g. "KES 14.8B"
  absorptionRate: number; // e.g. 84%
  totalDevelopmentProjects: number;
  avgCompletionRate: number; // e.g. 78%
  primaryEconomy: string[];
  keyChallenges: string[];
  major2027ManifestoPledges: {
    title: string;
    proponent: string;
    estimatedCost: string;
    status: "Proposed" | "Committed" | "In Debate";
  }[];
}

export interface ProjectCostBreakdown {
  originalBudgetKES: string;
  amountDisbursedKES: string;
  pendingAbsorptionKES: string;
  costVariancePercent: number; // e.g. +5% or 0%
  primaryContractor: string;
  financingPartner: string;
}

export interface CivicProjectLocation {
  id: string;
  title: string;
  countyCode: string;
  countyName: string;
  sector: "Healthcare" | "Infrastructure" | "Education" | "Water & Irrigation" | "Clean Energy" | "Agriculture & Food";
  coordinates: { lat: number; lng: number };
  status: "Completed" | "In Progress" | "Delayed" | "Under Audit Scrutiny";
  budgetKES: string;
  costBreakdown: ProjectCostBreakdown;
  implementingAgency: string;
  completionPercent: number;
  targetCompletionYear: number;
  statutoryStatus: "Fully Compliant" | "PFM Act Review Needed" | "Environmental Clearance Active" | "Auditor-General Flagged";
  description: string;
  auditorFinding?: string;
  kenya2060Goal: string;
  weight: number; // for development intensity heatmaps (1-10)
}

export const KENYA_REGIONS = [
  "All Regions",
  "Nairobi",
  "Central",
  "Coast",
  "Rift Valley",
  "Western",
  "Nyanza",
  "Eastern",
  "North Eastern"
] as const;

export const PROJECT_SECTORS = [
  "All Sectors",
  "Healthcare",
  "Infrastructure",
  "Education",
  "Water & Irrigation",
  "Clean Energy",
  "Agriculture & Food"
] as const;

export const KENYA_47_COUNTIES: CountyData[] = [
  {
    code: "001",
    name: "Mombasa",
    capital: "Mombasa City",
    region: "Coast",
    coordinates: { lat: -4.0435, lng: 39.6682 },
    population: "1.21M",
    equitableShareKES: "KES 9.1B",
    absorptionRate: 82,
    totalDevelopmentProjects: 28,
    avgCompletionRate: 84,
    primaryEconomy: ["Blue Economy & Port Logistics", "Tourism & Hospitality", "Manufacturing", "Export Processing"],
    keyChallenges: ["Youth Unemployment", "Port Logistics Revenue Share", "Urban Drainage & Sanitation"],
    major2027ManifestoPledges: [
      { title: "Special Economic Zone (SEZ) Dongo Kundu Full Industrialization", proponent: "National / Multi-Party", estimatedCost: "KES 40B", status: "Committed" },
      { title: "Free Fish Cold Storage & Maritime Training Academy for Youth", proponent: "Coast Civic Coalition", estimatedCost: "KES 4.5B", status: "Proposed" }
    ]
  },
  {
    code: "002",
    name: "Kwale",
    capital: "Kwale",
    region: "Coast",
    coordinates: { lat: -4.1737, lng: 39.4521 },
    population: "866K",
    equitableShareKES: "KES 8.9B",
    absorptionRate: 88,
    totalDevelopmentProjects: 19,
    avgCompletionRate: 79,
    primaryEconomy: ["Titanium Mining", "Tourism (Diani)", "Sugarcane Farming", "Fisheries"],
    keyChallenges: ["Mineral Royalty Sharing", "Historical Land Injustices", "Potable Water Access"],
    major2027ManifestoPledges: [
      { title: "Mwache Multipurpose Dam Water Reticulation", proponent: "National Government", estimatedCost: "KES 20B", status: "Committed" }
    ]
  },
  {
    code: "003",
    name: "Kilifi",
    capital: "Kilifi",
    region: "Coast",
    coordinates: { lat: -3.6305, lng: 39.8499 },
    population: "1.45M",
    equitableShareKES: "KES 12.2B",
    absorptionRate: 80,
    totalDevelopmentProjects: 24,
    avgCompletionRate: 72,
    primaryEconomy: ["Cashew Nut & Coconut Processing", "Tourism (Watamu/Malindi)", "Galana Food Security"],
    keyChallenges: ["Food Insecurity in Hinterland", "Early Childhood Health", "Land Tenure Regularization"],
    major2027ManifestoPledges: [
      { title: "Galana-Kulalu 100,000-Acre Maize Expansion", proponent: "Agricultural Coalition", estimatedCost: "KES 30B", status: "Committed" }
    ]
  },
  {
    code: "004",
    name: "Tana River",
    capital: "Hola",
    region: "Coast",
    coordinates: { lat: -1.5000, lng: 40.0000 },
    population: "315K",
    equitableShareKES: "KES 6.9B",
    absorptionRate: 76,
    totalDevelopmentProjects: 14,
    avgCompletionRate: 68,
    primaryEconomy: ["Irrigation Farming (Bura/Hola)", "Livestock Pastoralism", "Riverine Fisheries"],
    keyChallenges: ["Seasonal Floods & Droughts", "Farmer-Herder Resource Disputes", "Infrastructure Access"],
    major2027ManifestoPledges: [
      { title: "High-Dyke Flood Mitigation & Gravity Irrigation Networks", proponent: "Civic Action Taskforce", estimatedCost: "KES 8.2B", status: "Proposed" }
    ]
  },
  {
    code: "005",
    name: "Lamu",
    capital: "Lamu",
    region: "Coast",
    coordinates: { lat: -2.2686, lng: 40.9006 },
    population: "143K",
    equitableShareKES: "KES 3.6B",
    absorptionRate: 85,
    totalDevelopmentProjects: 16,
    avgCompletionRate: 88,
    primaryEconomy: ["Lamu Port (LAPSSET)", "Deep-Sea Fisheries", "Cultural Heritage Tourism", "Oil & Gas Terminus"],
    keyChallenges: ["Cross-Border Security", "LAPSSET Local Content Employment", "Mangrove Conservation"],
    major2027ManifestoPledges: [
      { title: "Lamu-Garissa-Isiolo Highway Bituminization (LAPSSET Corridor)", proponent: "Infrastructure Coalition", estimatedCost: "KES 65B", status: "Committed" }
    ]
  },
  {
    code: "007",
    name: "Garissa",
    capital: "Garissa",
    region: "North Eastern",
    coordinates: { lat: -0.4532, lng: 39.6460 },
    population: "841K",
    equitableShareKES: "KES 8.4B",
    absorptionRate: 78,
    totalDevelopmentProjects: 18,
    avgCompletionRate: 74,
    primaryEconomy: ["Livestock Trade & Camel Pastoralism", "Solar Energy Array (50MW)", "Tana River Basin Farming"],
    keyChallenges: ["Drought Resilience", "Last-Mile Power Grids", "School Retention"],
    major2027ManifestoPledges: [
      { title: "Garissa-Modogashe-Wajir Paved Trans-National Corridor", proponent: "National Road Agency", estimatedCost: "KES 42B", status: "Committed" }
    ]
  },
  {
    code: "008",
    name: "Wajir",
    capital: "Wajir",
    region: "North Eastern",
    coordinates: { lat: 1.7471, lng: 40.0573 },
    population: "781K",
    equitableShareKES: "KES 9.5B",
    absorptionRate: 82,
    totalDevelopmentProjects: 15,
    avgCompletionRate: 70,
    primaryEconomy: ["Livestock Auction Export", "Gum Arabica Harvesting", "Solar Microgrids"],
    keyChallenges: ["Aquifer Salinity", "Nomadic Education Infrastructure", "Feeder Roads"],
    major2027ManifestoPledges: [
      { title: "Habaswein Deep Aquifer Desalination & Solar Water Pipelines", proponent: "Arid Lands Council", estimatedCost: "KES 11B", status: "Committed" }
    ]
  },
  {
    code: "009",
    name: "Mandera",
    capital: "Mandera",
    region: "North Eastern",
    coordinates: { lat: 3.9373, lng: 41.8569 },
    population: "867K",
    equitableShareKES: "KES 11.2B",
    absorptionRate: 84,
    totalDevelopmentProjects: 20,
    avgCompletionRate: 76,
    primaryEconomy: ["Cross-Border Livestock & Commerce", "Quarry Mining & Building Stones", "Irrigation Farming along Daua River"],
    keyChallenges: ["Extreme Distance from Port", "Security & Border Surveillance", "Specialist Healthcare Access"],
    major2027ManifestoPledges: [
      { title: "Elwak-Rhamu-Mandera Asphalt Pavement Network", proponent: "Frontier Development Coalition", estimatedCost: "KES 34B", status: "Committed" }
    ]
  },
  {
    code: "010",
    name: "Marsabit",
    capital: "Marsabit",
    region: "Eastern",
    coordinates: { lat: 2.3369, lng: 37.9900 },
    population: "459K",
    equitableShareKES: "KES 7.3B",
    absorptionRate: 86,
    totalDevelopmentProjects: 17,
    avgCompletionRate: 85,
    primaryEconomy: ["Lake Turkana Wind Power", "Pastoralism", "Moyale One-Stop Border Post Trade", "Fisheries (Loyangalani)"],
    keyChallenges: ["Rangeland Water Catchment", "Extreme Spatial Spread", "Conflict Prevention"],
    major2027ManifestoPledges: [
      { title: "Bakelo Water Dam & Moyale Special Economic Cross-Border Zone", proponent: "Trade Ministry", estimatedCost: "KES 8.9B", status: "Committed" }
    ]
  },
  {
    code: "011",
    name: "Isiolo",
    capital: "Isiolo",
    region: "Eastern",
    coordinates: { lat: 0.3546, lng: 37.5822 },
    population: "268K",
    equitableShareKES: "KES 4.8B",
    absorptionRate: 79,
    totalDevelopmentProjects: 15,
    avgCompletionRate: 77,
    primaryEconomy: ["LAPSSET Mid-Point Logistics Hub", "Livestock Meat Processing", "Eco-Tourism"],
    keyChallenges: ["Drought Cycles", "Rangeland Management", "Land Demarcation"],
    major2027ManifestoPledges: [
      { title: "Isiolo International Abattoir Commercial Commissioning", proponent: "Devolution Forum", estimatedCost: "KES 2.4B", status: "Committed" }
    ]
  },
  {
    code: "012",
    name: "Meru",
    capital: "Meru",
    region: "Eastern",
    coordinates: { lat: 0.0515, lng: 37.6456 },
    population: "1.54M",
    equitableShareKES: "KES 10.4B",
    absorptionRate: 91,
    totalDevelopmentProjects: 27,
    avgCompletionRate: 86,
    primaryEconomy: ["Miraa / Khat Agribusiness", "Tea & Coffee", "Banana Value Addition", "Dairy Farming"],
    keyChallenges: ["Export Market Access for Miraa", "Feeder Road Network", "Water Scarcity in Lower Meru"],
    major2027ManifestoPledges: [
      { title: "Cold Chain Agro-Processing Park at Maua & Kianjai", proponent: "Farmers Alliance", estimatedCost: "KES 5.1B", status: "Proposed" }
    ]
  },
  {
    code: "014",
    name: "Embu",
    capital: "Embu",
    region: "Eastern",
    coordinates: { lat: -0.5344, lng: 37.4578 },
    population: "608K",
    equitableShareKES: "KES 5.4B",
    absorptionRate: 90,
    totalDevelopmentProjects: 18,
    avgCompletionRate: 83,
    primaryEconomy: ["Macadamia & Coffee Farming", "Seven Forks Hydropower", "Dairy Co-operatives"],
    keyChallenges: ["Macadamia Price Fluctuations", "Feeder Roads Bituminization"],
    major2027ManifestoPledges: [
      { title: "Embu Teaching Referral Cancer Treatment Center", proponent: "Health Transformation Board", estimatedCost: "KES 3.1B", status: "Committed" }
    ]
  },
  {
    code: "015",
    name: "Kitui",
    capital: "Kitui",
    region: "Eastern",
    coordinates: { lat: -1.3748, lng: 38.0106 },
    population: "1.13M",
    equitableShareKES: "KES 10.9B",
    absorptionRate: 85,
    totalDevelopmentProjects: 22,
    avgCompletionRate: 75,
    primaryEconomy: ["Coal & Mineral Deposits (Mui Basin)", "Honey & Green Grams", "Kitui Garment Factory (KICOTEC)"],
    keyChallenges: ["Water Deficits", "Value Addition Machinery", "Healthcare Staffing"],
    major2027ManifestoPledges: [
      { title: "Kitui-Kibwezi Road Final Pavement & Sand Dam Network", proponent: "Eastern Development Trust", estimatedCost: "KES 14B", status: "Committed" }
    ]
  },
  {
    code: "016",
    name: "Machakos",
    capital: "Machakos",
    region: "Eastern",
    coordinates: { lat: -1.5177, lng: 37.2634 },
    population: "1.42M",
    equitableShareKES: "KES 9.9B",
    absorptionRate: 89,
    totalDevelopmentProjects: 26,
    avgCompletionRate: 82,
    primaryEconomy: ["Konza Smart City Logistics", "Cement & Building Materials (Athi River)", "Horticulture", "Industrial Hubs"],
    keyChallenges: ["Urban Industrial Pollution", "Water Access in Rural Sub-Counties"],
    major2027ManifestoPledges: [
      { title: "Konza Technopolis Silicon Corridor Expressway Extension", proponent: "Tech Infrastructure Board", estimatedCost: "KES 19B", status: "Committed" }
    ]
  },
  {
    code: "017",
    name: "Makueni",
    capital: "Wote",
    region: "Eastern",
    coordinates: { lat: -1.7826, lng: 37.6318 },
    population: "987K",
    equitableShareKES: "KES 8.6B",
    absorptionRate: 94,
    totalDevelopmentProjects: 25,
    avgCompletionRate: 91,
    primaryEconomy: ["Fruit Value Addition (Mango & Citrus)", "Sand Dam Water Harvesting", "Livestock", "Mining"],
    keyChallenges: ["Semi-Arid Water Deficits", "Climate Volatility", "Youth Out-Migration"],
    major2027ManifestoPledges: [
      { title: "Thwake Dam Water Treatment & Distribution Pipeline to Wote", proponent: "National Water Authority", estimatedCost: "KES 14.8B", status: "Committed" }
    ]
  },
  {
    code: "019",
    name: "Nyeri",
    capital: "Nyeri",
    region: "Central",
    coordinates: { lat: -0.4246, lng: 36.9517 },
    population: "759K",
    equitableShareKES: "KES 6.7B",
    absorptionRate: 93,
    totalDevelopmentProjects: 24,
    avgCompletionRate: 89,
    primaryEconomy: ["Specialty Coffee & Tea", "Dairy Co-operatives", "Horticulture", "Eco-Tourism (Aberdares/Mt. Kenya)"],
    keyChallenges: ["Aging Farmer Demographics", "Co-operative Debt Burdens", "Health Infrastructure Staffing"],
    major2027ManifestoPledges: [
      { title: "Direct Coffee Farmer Sales Portal & Local Fertilizer Subsidy", proponent: "Mt. Kenya Reformists", estimatedCost: "KES 3.2B", status: "Committed" }
    ]
  },
  {
    code: "020",
    name: "Kirinyaga",
    capital: "Kerugoya",
    region: "Central",
    coordinates: { lat: -0.4989, lng: 37.2803 },
    population: "610K",
    equitableShareKES: "KES 5.6B",
    absorptionRate: 90,
    totalDevelopmentProjects: 20,
    avgCompletionRate: 87,
    primaryEconomy: ["Mwea Rice Irrigation", "Tea & Coffee", "Horticulture (Tomatoes)", "Dairy"],
    keyChallenges: ["Mwea Water Rationing", "Rice Smuggling Competition", "Post-Harvest Waste"],
    major2027ManifestoPledges: [
      { title: "Thiba Dam Canal Extension & Automated Rice Milling Zone", proponent: "Agriculture Modernizers", estimatedCost: "KES 4.8B", status: "Committed" }
    ]
  },
  {
    code: "021",
    name: "Murang'a",
    capital: "Murang'a",
    region: "Central",
    coordinates: { lat: -0.7211, lng: 37.1526 },
    population: "1.05M",
    equitableShareKES: "KES 7.8B",
    absorptionRate: 88,
    totalDevelopmentProjects: 23,
    avgCompletionRate: 84,
    primaryEconomy: ["Avocado Export Processing (Kakuzi/Kandara)", "Tea & Coffee", "Milk Cooling Chains"],
    keyChallenges: ["Water Access for Rural Households", "Coffee Cooperative Reforms"],
    major2027ManifestoPledges: [
      { title: "Kenol-Murang'a-Sagana High Speed Agro-Corridor", proponent: "Highways Authority", estimatedCost: "KES 11.5B", status: "Committed" }
    ]
  },
  {
    code: "022",
    name: "Kiambu",
    capital: "Kiambu",
    region: "Central",
    coordinates: { lat: -1.1714, lng: 36.8356 },
    population: "2.41M",
    equitableShareKES: "KES 13.1B",
    absorptionRate: 87,
    totalDevelopmentProjects: 38,
    avgCompletionRate: 81,
    primaryEconomy: ["Real Estate & Satellite Cities", "Coffee & Tea Estates", "Light Manufacturing", "Dairy"],
    keyChallenges: ["Urban Sprawl & Agricultural Land Loss", "Traffic Congestion into Nairobi", "Healthcare Load"],
    major2027ManifestoPledges: [
      { title: "Metropolitan Rapid Transit Bus Line Kiambu-Nairobi CBD", proponent: "Metropolitan Transport Board", estimatedCost: "KES 18B", status: "Committed" }
    ]
  },
  {
    code: "023",
    name: "Turkana",
    capital: "Lodwar",
    region: "Rift Valley",
    coordinates: { lat: 3.1167, lng: 35.6000 },
    population: "926K",
    equitableShareKES: "KES 13.5B",
    absorptionRate: 81,
    totalDevelopmentProjects: 25,
    avgCompletionRate: 73,
    primaryEconomy: ["Oil Exploration (South Lokichar)", "Pastoral Livestock", "Lake Turkana Fishing", "Solar Energy"],
    keyChallenges: ["Severe Drought Cycles", "Vast Territory Logistics", "Insecurity & Cattle Rustling"],
    major2027ManifestoPledges: [
      { title: "Tullow Oil Commercial Pipeline & Local Revenue Trust Fund", proponent: "National Energy Strategy", estimatedCost: "KES 120B", status: "In Debate" }
    ]
  },
  {
    code: "027",
    name: "Uasin Gishu",
    capital: "Eldoret City",
    region: "Rift Valley",
    coordinates: { lat: 0.5143, lng: 35.2698 },
    population: "1.16M",
    equitableShareKES: "KES 8.8B",
    absorptionRate: 92,
    totalDevelopmentProjects: 31,
    avgCompletionRate: 88,
    primaryEconomy: ["National Grain Basket (Maize & Wheat)", "Athletics High Performance", "Medical Hub (MTRH)", "Air Cargo Hub"],
    keyChallenges: ["Cost of Farm Inputs", "Maize Drying & Storage Infrastructure", "Youth Sports Monetisation"],
    major2027ManifestoPledges: [
      { title: "Eldoret 100,000-Ton National Grain Reserve Storage Expansion", proponent: "Food Security Coalition", estimatedCost: "KES 6.5B", status: "Committed" }
    ]
  },
  {
    code: "032",
    name: "Nakuru",
    capital: "Nakuru City",
    region: "Rift Valley",
    coordinates: { lat: -0.3031, lng: 36.0800 },
    population: "2.16M",
    equitableShareKES: "KES 14.1B",
    absorptionRate: 89,
    totalDevelopmentProjects: 35,
    avgCompletionRate: 86,
    primaryEconomy: ["Olkaria & Menengai Geothermal Power", "Horticulture & Floriculture (Naivasha)", "Agribusiness", "Logistics (Naivasha ICD)"],
    keyChallenges: ["Geothermal Revenue Sharing with Host Communities", "Lake Naivasha Water Quality", "Affordable Housing"],
    major2027ManifestoPledges: [
      { title: "Naivasha Special Economic Zone Green Manufacturing Park", proponent: "Trade & Industry Ministry", estimatedCost: "KES 35B", status: "Committed" }
    ]
  },
  {
    code: "037",
    name: "Kakamega",
    capital: "Kakamega",
    region: "Western",
    coordinates: { lat: 0.2827, lng: 34.7519 },
    population: "1.87M",
    equitableShareKES: "KES 13.2B",
    absorptionRate: 88,
    totalDevelopmentProjects: 30,
    avgCompletionRate: 79,
    primaryEconomy: ["Sugarcane Farming (Mumias/Butali)", "Gold Mining (Rosterman)", "Dairy & Maize", "Rainforest Eco-Tourism"],
    keyChallenges: ["Sugarcane Factory Restructuring & Debt", "High Population Density", "Level 6 Hospital Completion"],
    major2027ManifestoPledges: [
      { title: "Mumias Sugar Factory 100% Cogeneration & Ethanol Distilling Revival", proponent: "Western Development Alliance", estimatedCost: "KES 12B", status: "Committed" }
    ]
  },
  {
    code: "039",
    name: "Bungoma",
    capital: "Bungoma",
    region: "Western",
    coordinates: { lat: 0.5695, lng: 34.5584 },
    population: "1.67M",
    equitableShareKES: "KES 11.5B",
    absorptionRate: 86,
    totalDevelopmentProjects: 24,
    avgCompletionRate: 81,
    primaryEconomy: ["Nzoia Sugarcane Mill", "Maize & Poultry Farming", "Mount Elgon Agriculture"],
    keyChallenges: ["Sugar Mill Liquidity", "Rural Feeder Roads"],
    major2027ManifestoPledges: [
      { title: "Nzoia Sugar Modernization & Ethanol Plant Co-generation", proponent: "Agro-Industrial Board", estimatedCost: "KES 7.5B", status: "Committed" }
    ]
  },
  {
    code: "042",
    name: "Kisumu",
    capital: "Kisumu City",
    region: "Nyanza",
    coordinates: { lat: -0.0917, lng: 34.7680 },
    population: "1.15M",
    equitableShareKES: "KES 8.7B",
    absorptionRate: 91,
    totalDevelopmentProjects: 32,
    avgCompletionRate: 87,
    primaryEconomy: ["Lake Victoria Maritime Trade & Port", "Fish Caging & Fisheries", "Rice & Sugarcane (Ahero/Miwani)", "Tourism"],
    keyChallenges: ["Hyacinth Infestation in Winam Gulf", "Fish Import Dumping Competition", "Urban Youth Employment"],
    major2027ManifestoPledges: [
      { title: "Lake Victoria Multi-Modal Shipping Corridor to Uganda & Tanzania", proponent: "Regional Integration Caucus", estimatedCost: "KES 22B", status: "Committed" }
    ]
  },
  {
    code: "043",
    name: "Homa Bay",
    capital: "Homa Bay",
    region: "Nyanza",
    coordinates: { lat: -0.5273, lng: 34.4571 },
    population: "1.13M",
    equitableShareKES: "KES 8.4B",
    absorptionRate: 83,
    totalDevelopmentProjects: 21,
    avgCompletionRate: 77,
    primaryEconomy: ["Fish Cage Culture & Landing Sites", "Cotton Ginning Revival", "Pineapple Agro-Processing"],
    keyChallenges: ["Post-Harvest Fish Spoilage", "Feeder Ring Roads"],
    major2027ManifestoPledges: [
      { title: "Lake Victoria Ring Road Paving & Solar Cold Storage Hubs", proponent: "Blue Economy Taskforce", estimatedCost: "KES 16B", status: "Committed" }
    ]
  },
  {
    code: "044",
    name: "Migori",
    capital: "Migori",
    region: "Nyanza",
    coordinates: { lat: -1.0634, lng: 34.4731 },
    population: "1.11M",
    equitableShareKES: "KES 8.6B",
    absorptionRate: 84,
    totalDevelopmentProjects: 22,
    avgCompletionRate: 80,
    primaryEconomy: ["Isebania Cross-Border Trade", "Sugarcane (Sony Sugar)", "Gold Mining (Macalder)", "Tobacco Replacement Crops"],
    keyChallenges: ["Sony Sugar Re-capitalization", "Artisanal Miner Safety"],
    major2027ManifestoPledges: [
      { title: "Isebania One-Stop Border Post Industrial Logistical Center", proponent: "EAC Commerce Board", estimatedCost: "KES 5.5B", status: "Committed" }
    ]
  },
  {
    code: "047",
    name: "Nairobi City",
    capital: "Nairobi",
    region: "Nairobi",
    coordinates: { lat: -1.286389, lng: 36.817223 },
    population: "4.40M",
    equitableShareKES: "KES 20.8B",
    absorptionRate: 83,
    totalDevelopmentProjects: 52,
    avgCompletionRate: 85,
    primaryEconomy: ["Financial Services & Fintech", "Diplomatic & UN Hub (UNON)", "Tech Startups (Silicon Savannah)", "Industrial Manufacturing"],
    keyChallenges: ["Informal Settlement Upgrading", "Traffic Gridlock & Air Quality", "Water Rationing", "Youth Underemployment"],
    major2027ManifestoPledges: [
      { title: "Northern Collector Tunnel Phase 2 & Nairobi Water Reticulation", proponent: "Nairobi Metropolitan Authority", estimatedCost: "KES 25B", status: "Committed" },
      { title: "Nairobi Commuter Rail Modernisation & 10 Electric BRT Lines", proponent: "Infrastructure Ministry", estimatedCost: "KES 48B", status: "Committed" }
    ]
  }
];

export const KENYA_CIVIC_PROJECTS: CivicProjectLocation[] = [
  // HEALTHCARE
  {
    id: "proj-01-health",
    title: "Moi Teaching & Referral Hospital (MTRH) Eldoret Multi-Specialty Wing",
    countyCode: "027",
    countyName: "Uasin Gishu",
    sector: "Healthcare",
    coordinates: { lat: 0.5186, lng: 35.2842 },
    status: "Completed",
    budgetKES: "KES 12.5B",
    costBreakdown: {
      originalBudgetKES: "KES 11.0B",
      amountDisbursedKES: "KES 12.5B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 13.6,
      primaryContractor: "National Healthcare Construction JV",
      financingPartner: "Government of Kenya & AfDB"
    },
    implementingAgency: "MTRH Board / Ministry of Health",
    completionPercent: 100,
    targetCompletionYear: 2024,
    statutoryStatus: "Fully Compliant",
    description: "Level 6 national referral hospital wing featuring oncology radiotherapy, cardiothoracic surgery, and a 60-bed neonatal intensive care unit.",
    auditorFinding: "High patient absorption from 22 Western and Rift Valley counties; recommended enhanced NHIF/SHA claim reimbursement cycle.",
    kenya2060Goal: "Zero medical tourism abroad by offering world-standard specialized healthcare locally.",
    weight: 9
  },
  {
    id: "proj-02-health",
    title: "Kakamega County Level 6 Teaching & Referral Hospital Complex",
    countyCode: "037",
    countyName: "Kakamega",
    sector: "Healthcare",
    coordinates: { lat: 0.2855, lng: 34.7562 },
    status: "Delayed",
    budgetKES: "KES 10.2B",
    costBreakdown: {
      originalBudgetKES: "KES 6.0B",
      amountDisbursedKES: "KES 7.4B",
      pendingAbsorptionKES: "KES 2.8B",
      costVariancePercent: 70.0,
      primaryContractor: "Apex Regional Infrastructure Ltd",
      financingPartner: "County Government of Kakamega & National Health Fund"
    },
    implementingAgency: "Ministry of Health / Kakamega County",
    completionPercent: 74,
    targetCompletionYear: 2026,
    statutoryStatus: "Auditor-General Flagged",
    description: "750-bed regional referral complex designed to serve over 5 million residents across Western Kenya and reduce load on Eldoret and Kisumu.",
    auditorFinding: "Contractor demobilization occurred due to delayed co-funding disbursements. PFM Act review underway for national takeover.",
    kenya2060Goal: "Decentralized tertiary medical excellence in every geographical region.",
    weight: 8
  },
  {
    id: "proj-03-health",
    title: "Kenyatta University Teaching, Referral & Research Hospital (KUTRRH) CyberKnife Oncology Center",
    countyCode: "022",
    countyName: "Kiambu",
    sector: "Healthcare",
    coordinates: { lat: -1.1764, lng: 36.9247 },
    status: "Completed",
    budgetKES: "KES 14.8B",
    costBreakdown: {
      originalBudgetKES: "KES 13.5B",
      amountDisbursedKES: "KES 14.8B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 9.6,
      primaryContractor: "China Jiangxi JV & Elekta Medical Systems",
      financingPartner: "Exim Bank & Treasury"
    },
    implementingAgency: "KUTRRH Board",
    completionPercent: 100,
    targetCompletionYear: 2023,
    statutoryStatus: "Fully Compliant",
    description: "East Africa's first robotic CyberKnife radiation therapy system treating localized tumors with sub-millimeter precision.",
    auditorFinding: "Auditor commended high clinical utilization; noted need for sustained subsidy pool for indigent cancer patients.",
    kenya2060Goal: "Make Kenya the premier medical innovation and specialized treatment hub in Sub-Saharan Africa.",
    weight: 9
  },
  {
    id: "proj-04-health",
    title: "Coast General Teaching & Referral Hospital Cath Lab & Cancer Unit",
    countyCode: "001",
    countyName: "Mombasa",
    sector: "Healthcare",
    coordinates: { lat: -4.0531, lng: 39.6738 },
    status: "Completed",
    budgetKES: "KES 3.8B",
    costBreakdown: {
      originalBudgetKES: "KES 3.5B",
      amountDisbursedKES: "KES 3.8B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 8.5,
      primaryContractor: "Coast MedTech Engineering",
      financingPartner: "Mombasa County & National Universal Health Coverage Support"
    },
    implementingAgency: "Mombasa County Department of Health",
    completionPercent: 100,
    targetCompletionYear: 2023,
    statutoryStatus: "Fully Compliant",
    description: "Advanced cardiac catheterization laboratory performing angiographies and angioplasties for over 6 coastal counties.",
    auditorFinding: "Demonstrated 80% reduction in cardiac emergency transfers to Nairobi.",
    kenya2060Goal: "Equal access to life-saving emergency and cardiovascular care in all maritime counties.",
    weight: 7
  },

  // INFRASTRUCTURE & TRANSPORT
  {
    id: "proj-05-infra",
    title: "Lamu Deep Sea Commercial Port (First 3 Berths & Container Terminal)",
    countyCode: "005",
    countyName: "Lamu",
    sector: "Infrastructure",
    coordinates: { lat: -2.2541, lng: 40.9022 },
    status: "Completed",
    budgetKES: "KES 48.0B",
    costBreakdown: {
      originalBudgetKES: "KES 42.0B",
      amountDisbursedKES: "KES 48.0B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 14.3,
      primaryContractor: "China Communications Construction Company (CCCC)",
      financingPartner: "Government of Kenya Capital Budget"
    },
    implementingAgency: "Kenya Ports Authority (KPA)",
    completionPercent: 100,
    targetCompletionYear: 2022,
    statutoryStatus: "Fully Compliant",
    description: "Deep sea 3-berth port facility with 17.5m draught designed to anchor the northern transport corridor into Ethiopia and South Sudan.",
    auditorFinding: "Auditor-General recommended accelerated completion of the feeder road Lamu-Garsen to maximize cargo throughput.",
    kenya2060Goal: "Transform Kenya into the premier logistics and transshipment hub for Eastern and Central Africa.",
    weight: 10
  },
  {
    id: "proj-06-infra",
    title: "Dongo Kundu Bypass & Likoni Long-Span Sea Bridge",
    countyCode: "001",
    countyName: "Mombasa",
    sector: "Infrastructure",
    coordinates: { lat: -4.0811, lng: 39.5894 },
    status: "Completed",
    budgetKES: "KES 39.0B",
    costBreakdown: {
      originalBudgetKES: "KES 36.0B",
      amountDisbursedKES: "KES 39.0B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 8.3,
      primaryContractor: "Fujita-Mitsubishi Corporation & KeNHA",
      financingPartner: "Japan International Cooperation Agency (JICA)"
    },
    implementingAgency: "Kenya National Highways Authority (KeNHA)",
    completionPercent: 98,
    targetCompletionYear: 2024,
    statutoryStatus: "Fully Compliant",
    description: "Dual carriageway and long span bridge connecting Mombasa Mainland West to South Coast (Likoni bypass) and unlocking 3,000-acre Dongo Kundu Free Trade Zone.",
    auditorFinding: "Land compensation disputes settled; urgent focus required on investor gas-power connection.",
    kenya2060Goal: "Create 100,000 high-value industrial and manufacturing jobs along the Coast corridor.",
    weight: 9
  },
  {
    id: "proj-07-infra",
    title: "Kenol-Sagana-Marua Dual Carriageway Expressway",
    countyCode: "019",
    countyName: "Nyeri",
    sector: "Infrastructure",
    coordinates: { lat: -0.4851, lng: 37.0782 },
    status: "Completed",
    budgetKES: "KES 33.0B",
    costBreakdown: {
      originalBudgetKES: "KES 30.0B",
      amountDisbursedKES: "KES 33.0B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 10.0,
      primaryContractor: "SinoHydro & KeNHA",
      financingPartner: "African Development Bank (AfDB) & GoK"
    },
    implementingAgency: "KeNHA",
    completionPercent: 99,
    targetCompletionYear: 2024,
    statutoryStatus: "Fully Compliant",
    description: "84km 4-lane divided expressway connecting Central Kenya food basket and Great North Corridor to Isiolo and Moyale.",
    auditorFinding: "Reduced transit times between Nairobi and Nyeri/Meru from 4 hours to 1.5 hours, drastically lowering agricultural transport costs.",
    kenya2060Goal: "Seamless continental trade arteries connecting Kenya to Ethiopia and East Africa.",
    weight: 8
  },
  {
    id: "proj-08-infra",
    title: "Lake Victoria Maritime Port Revival & Kisumu Shipyard",
    countyCode: "042",
    countyName: "Kisumu",
    sector: "Infrastructure",
    coordinates: { lat: -0.1042, lng: 34.7471 },
    status: "Completed",
    budgetKES: "KES 9.8B",
    costBreakdown: {
      originalBudgetKES: "KES 9.0B",
      amountDisbursedKES: "KES 9.8B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 8.8,
      primaryContractor: "Kenya Shipyards Limited & Damen Shipyards",
      financingPartner: "Government of Kenya Special Maritime Fund"
    },
    implementingAgency: "Kenya Shipyards Limited & KPA",
    completionPercent: 100,
    targetCompletionYear: 2023,
    statutoryStatus: "Fully Compliant",
    description: "Modernized port terminal, docking slipways, and commissioning of MV Uhuru II wagon ferry for fuel and container shipping to Uganda and Mwanza.",
    auditorFinding: "Recommended integrating rail connection with the rehabilitated Nakuru-Kisumu meter-gauge line for seamless multimodal freight.",
    kenya2060Goal: "Dominant intra-EAC inland water trade corridor reducing logistics freight costs by 40%.",
    weight: 8
  },
  {
    id: "proj-09-infra",
    title: "Nairobi Commuter Rail Modernisation & Electric BRT Line 2",
    countyCode: "047",
    countyName: "Nairobi City",
    sector: "Infrastructure",
    coordinates: { lat: -1.2864, lng: 36.8233 },
    status: "In Progress",
    budgetKES: "KES 48.0B",
    costBreakdown: {
      originalBudgetKES: "KES 40.0B",
      amountDisbursedKES: "KES 28.5B",
      pendingAbsorptionKES: "KES 19.5B",
      costVariancePercent: 20.0,
      primaryContractor: "Stecol Corporation & Namata",
      financingPartner: "World Bank, European Investment Bank & Treasury"
    },
    implementingAgency: "Nairobi Metropolitan Area Transport Authority (NaMATA)",
    completionPercent: 65,
    targetCompletionYear: 2026,
    statutoryStatus: "PFM Act Review Needed",
    description: "Dedicated electric bus rapid transit lane along Thika Superhighway and CBD interchange to move 300,000 daily commuters.",
    auditorFinding: "Right of way clearance and fleet procurement contracts require transparent oversight under PPADA.",
    kenya2060Goal: "Zero-emission, affordable urban mobility eliminating 3 hours of daily commuter gridlock.",
    weight: 9
  },

  // EDUCATION & TECH
  {
    id: "proj-10-edu",
    title: "Konza Technopolis Phase 1 Smart City Infrastructure & Data Center",
    countyCode: "017",
    countyName: "Makueni",
    sector: "Education",
    coordinates: { lat: -1.6914, lng: 37.1972 },
    status: "In Progress",
    budgetKES: "KES 42.0B",
    costBreakdown: {
      originalBudgetKES: "KES 38.0B",
      amountDisbursedKES: "KES 34.5B",
      pendingAbsorptionKES: "KES 7.5B",
      costVariancePercent: 10.5,
      primaryContractor: "Gruppo ICM & Huawei Technologies",
      financingPartner: "Government of Italy Credit Facility & GoK"
    },
    implementingAgency: "Konza Technopolis Development Authority (KoTDA)",
    completionPercent: 82,
    targetCompletionYear: 2025,
    statutoryStatus: "Fully Compliant",
    description: "Kenya's flagship smart city featuring Tier-3 National Cloud Data Centre, Kenya Advanced Institute of Science & Technology (KAIST), and digital innovation laboratories.",
    auditorFinding: "Data center operational; recommendation to fast-track anchor multinational tech tenants and commercial housing.",
    kenya2060Goal: "Transform Kenya into the 'Silicon Savannah' of Africa with 500,000 high-wage digital jobs.",
    weight: 9
  },
  {
    id: "proj-11-edu",
    title: "National Jitume ICT Digital Hubs & TVET Fiber Connectivity Program",
    countyCode: "007",
    countyName: "Garissa",
    sector: "Education",
    coordinates: { lat: -0.4567, lng: 39.6512 },
    status: "In Progress",
    budgetKES: "KES 8.5B",
    costBreakdown: {
      originalBudgetKES: "KES 7.8B",
      amountDisbursedKES: "KES 6.1B",
      pendingAbsorptionKES: "KES 2.4B",
      costVariancePercent: 8.9,
      primaryContractor: "ICT Authority & Telkom Kenya Consortium",
      financingPartner: "Universal Service Fund (USF) & GoK"
    },
    implementingAgency: "Ministry of Information, Communications & Digital Economy",
    completionPercent: 78,
    targetCompletionYear: 2025,
    statutoryStatus: "Fully Compliant",
    description: "Deploying 100 high-speed computers, solar arrays, and high-bandwidth fiber optic connection to every TVET in Frontier and Arid counties.",
    auditorFinding: "Rapid youth freelance digital work uptake; continuous power backups needed in remote centers.",
    kenya2060Goal: "100% digital literacy and digital freelancing earnings for every Kenyan youth.",
    weight: 7
  },
  {
    id: "proj-12-edu",
    title: "Eldoret Technical Training Institute Innovation & Robotics Lab",
    countyCode: "027",
    countyName: "Uasin Gishu",
    sector: "Education",
    coordinates: { lat: 0.5289, lng: 35.2711 },
    status: "Completed",
    budgetKES: "KES 2.6B",
    costBreakdown: {
      originalBudgetKES: "KES 2.4B",
      amountDisbursedKES: "KES 2.6B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 8.3,
      primaryContractor: "Rift Valley Engineering Consortium",
      financingPartner: "Ministry of Education & GIZ"
    },
    implementingAgency: "State Department for Vocational & Technical Training",
    completionPercent: 100,
    targetCompletionYear: 2024,
    statutoryStatus: "Fully Compliant",
    description: "Precision CNC machining, industrial automation, and agricultural drone prototyping workshop for over 3,000 engineering students annually.",
    auditorFinding: "Exemplary TVET model linking direct industry apprenticeships with agro-industrial manufacturing firms.",
    kenya2060Goal: "World-class technical vocational workforce powering indigenous manufacturing.",
    weight: 6
  },

  // WATER & IRRIGATION
  {
    id: "proj-13-water",
    title: "Thwake Multipurpose Water & Hydropower Dam",
    countyCode: "017",
    countyName: "Makueni",
    sector: "Water & Irrigation",
    coordinates: { lat: -1.7761, lng: 37.6255 },
    status: "In Progress",
    budgetKES: "KES 82.0B",
    costBreakdown: {
      originalBudgetKES: "KES 68.0B",
      amountDisbursedKES: "KES 72.1B",
      pendingAbsorptionKES: "KES 9.9B",
      costVariancePercent: 20.5,
      primaryContractor: "China Gezhouba Group Company (CGGC)",
      financingPartner: "African Development Bank (AfDB) & Government of Kenya"
    },
    implementingAgency: "Ministry of Water, Sanitation & Irrigation",
    completionPercent: 88,
    targetCompletionYear: 2025,
    statutoryStatus: "PFM Act Review Needed",
    description: "Mega rock-fill dam at confluence of Athi and Thwake rivers to provide potable water to 1.3 million citizens, irrigate 100,000 acres, and generate 20MW hydropower.",
    auditorFinding: "Scrutiny on water catchment pollution upstream along Nairobi River Basin; water treatment plant component requires fast-tracked funding.",
    kenya2060Goal: "Universal access to potable water and climate-resilient food security across Eastern arid lands.",
    weight: 10
  },
  {
    id: "proj-14-water",
    title: "Nairobi Northern Collector Tunnel & Water Reticulation",
    countyCode: "047",
    countyName: "Nairobi City",
    sector: "Water & Irrigation",
    coordinates: { lat: -0.7833, lng: 36.9167 },
    status: "Completed",
    budgetKES: "KES 22.0B",
    costBreakdown: {
      originalBudgetKES: "KES 19.5B",
      amountDisbursedKES: "KES 22.0B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 12.8,
      primaryContractor: "Sogea-Satom & Athi Water",
      financingPartner: "World Bank & French Development Agency (AFD)"
    },
    implementingAgency: "Athi Water Works Development Agency",
    completionPercent: 100,
    targetCompletionYear: 2024,
    statutoryStatus: "Fully Compliant",
    description: "11.8km underground gravity tunnel diverting flood flows from Maragua, Gikigie, and Irati rivers into Ndakaini Dam, adding 140 million liters/day to Nairobi water grid.",
    auditorFinding: "Physical works complete; Nairobi city piped reticulation distribution network requires final mile pipeline connections.",
    kenya2060Goal: "Clean, piped running water in 100% of urban and peri-urban Kenyan households.",
    weight: 9
  },

  // CLEAN ENERGY
  {
    id: "proj-15-energy",
    title: "Olkaria Geothermal Power Complex Expansion (Units I-VII)",
    countyCode: "032",
    countyName: "Nakuru",
    sector: "Clean Energy",
    coordinates: { lat: -0.8931, lng: 36.3115 },
    status: "Completed",
    budgetKES: "KES 110.0B",
    costBreakdown: {
      originalBudgetKES: "KES 102.0B",
      amountDisbursedKES: "KES 110.0B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 7.8,
      primaryContractor: "Toyota Tsusho Corporation & Hyundai Engineering",
      financingPartner: "JICA, KfW, European Investment Bank & KenGen"
    },
    implementingAgency: "Kenya Electricity Generating Company (KenGen)",
    completionPercent: 100,
    targetCompletionYear: 2023,
    statutoryStatus: "Fully Compliant",
    description: "World-class geothermal steam turbine network generating over 700MW of baseload renewable electricity, powering Kenya's 92% clean grid.",
    auditorFinding: "Commended for carbon-credit generation and lowering national dependence on expensive heavy fuel oil (HFO) thermal plants.",
    kenya2060Goal: "100% clean, abundant and low-cost electricity driving competitive green manufacturing.",
    weight: 10
  },
  {
    id: "proj-16-energy",
    title: "Lake Turkana Wind Power (LTWP) 310MW Array",
    countyCode: "023",
    countyName: "Turkana",
    sector: "Clean Energy",
    coordinates: { lat: 2.7483, lng: 36.8122 },
    status: "Completed",
    budgetKES: "KES 75.0B",
    costBreakdown: {
      originalBudgetKES: "KES 70.0B",
      amountDisbursedKES: "KES 75.0B",
      pendingAbsorptionKES: "KES 0.0B",
      costVariancePercent: 7.1,
      primaryContractor: "Vestas Wind Systems & Ketraco",
      financingPartner: "AfDB, EIB & Private Consortium"
    },
    implementingAgency: "Lake Turkana Wind Power Ltd / Ketraco",
    completionPercent: 100,
    targetCompletionYear: 2022,
    statutoryStatus: "Fully Compliant",
    description: "Africa's largest single wind farm comprising 365 wind turbines harnessing high-velocity desert wind through the Turkana corridor.",
    auditorFinding: "Deemed of high national strategic value; grid interconnector transmission lines fully operationalized.",
    kenya2060Goal: "Pioneer extreme-efficiency green energy feeding industrial smart grids.",
    weight: 10
  },

  // AGRICULTURE & FOOD
  {
    id: "proj-17-agri",
    title: "Galana-Kulalu Food Security Irrigation Pilot & Expansion",
    countyCode: "003",
    countyName: "Kilifi",
    sector: "Agriculture & Food",
    coordinates: { lat: -3.1250, lng: 39.5417 },
    status: "In Progress",
    budgetKES: "KES 14.5B",
    costBreakdown: {
      originalBudgetKES: "KES 12.0B",
      amountDisbursedKES: "KES 9.1B",
      pendingAbsorptionKES: "KES 5.4B",
      costVariancePercent: 20.8,
      primaryContractor: "National Irrigation Authority & Twiga Foods PPP",
      financingPartner: "Government of Kenya Strategic Food Security Fund"
    },
    implementingAgency: "National Irrigation Authority (NIA)",
    completionPercent: 62,
    targetCompletionYear: 2026,
    statutoryStatus: "Auditor-General Flagged",
    description: "Transforming 20,000+ acres into precision drip and pivot irrigated maize and food crops to buffer national Strategic Grain Reserves.",
    auditorFinding: "Auditor-General flagged past contract variations and water extraction pumps; new public-private partnership (PPP) model under execution.",
    kenya2060Goal: "National food sovereignty ensuring affordable unga/flour through domestic high-yield production.",
    weight: 8
  }
];
