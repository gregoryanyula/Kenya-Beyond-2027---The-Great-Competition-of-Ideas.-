import { RegionalPriorityArea, HistoricalBudgetPoint } from "../types";

export const KENYA_REGIONAL_PRIORITY_AREAS: RegionalPriorityArea[] = [
  {
    id: "nairobi-metro",
    regionName: "Nairobi Metropolitan",
    countiesIncluded: ["Nairobi (047)", "Kiambu (022)", "Machakos (016)", "Kajiado (028)"],
    svgPathId: "path-nairobi",
    centerCoordinates: { x: 490, y: 550 },
    color: "#059669",
    populationEstimate: "9.8 Million",
    youthShare: "62% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Youth Jobs & Tech",
        title: "Digital Gig Work Centers & Subsidized Fast Fiber",
        votesCount: 14250,
        percentage: 34,
        demandedDeliverable: "Public high-speed Wi-Fi & AI workstations across all 17 sub-counties; eliminate withholding tax on digital freelancing",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Cost of Living & Housing",
        title: "Affordable Rental Tenure Security & Water Meter Transparency",
        votesCount: 11200,
        percentage: 27,
        demandedDeliverable: "Audit Nairobi Water bulk distribution, stop borehole extortion cartels, and enforce rent tribunal caps",
        urgencyLevel: "High"
      },
      {
        sector: "Public Transport",
        title: "BRT Infrastructure & Clean Matatu Transition",
        votesCount: 8900,
        percentage: 21,
        demandedDeliverable: "Operationalize Thika Road & Outer Ring BRT buses with contactless ticketing",
        urgencyLevel: "Medium"
      },
      {
        sector: "Healthcare & Level 4 Hospitals",
        title: "Pumwani & Mbagathi Emergency Oxygen & Medicine Guarantee",
        votesCount: 7600,
        percentage: 18,
        demandedDeliverable: "Direct emergency pharmaceutical supply chain bypassing KEMSA distribution bottlenecks",
        urgencyLevel: "High"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "We don't need political slogans about 'empowering youth' while taxing freelance laptop work 5% before income is even earned.",
        county: "Nairobi",
        demographic: "Freelance Tech Developer, 24"
      },
      {
        quote: "Kawangware and Mathare need 24/7 piped clean tap water at regulated KES 2 per 20L jerrycan, not water bowsers charging KES 30.",
        county: "Nairobi",
        demographic: "Community Youth Leader, 28"
      }
    ],
    devolutionEquitableShareFY: "KES 20.1 Billion (Nairobi County)",
    mainEconomicBase: "Services, Tech, Financial Hub, Light Manufacturing",
    primaryRiskFlag: "Severe youth underemployment, high urban basic goods inflation, and water distribution cartels."
  },
  {
    id: "lake-basin-nyanza",
    regionName: "Nyanza & Lake Basin",
    countiesIncluded: ["Kisumu (042)", "Siaya (041)", "Homa Bay (043)", "Migori (044)", "Kisii (045)", "Nyamira (046)"],
    svgPathId: "path-nyanza",
    centerCoordinates: { x: 260, y: 520 },
    color: "#2563eb",
    populationEstimate: "6.3 Million",
    youthShare: "58% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Blue Economy & Fisheries",
        title: "Lake Victoria Cage Fish Processing & Cold-Chain Storage",
        votesCount: 12800,
        percentage: 36,
        demandedDeliverable: "Cold-storage landing sites in Mbita, Luanda Kotieno, and Sio Port with zero-VAT solar coolers",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Agro-Processing & Sugar",
        title: "Sugar Mill Modernization & Cane Farmer Prompt Payment Guarantee",
        votesCount: 9700,
        percentage: 28,
        demandedDeliverable: "Privatization oversight of Chemelil, Sony, and Muhoroni with 14-day farmer payment statutory law",
        urgencyLevel: "High"
      },
      {
        sector: "Healthcare & Sickle Cell / Malaria",
        title: "JOOTRH & County Level 5 Sickle Cell / Oncology Facilities",
        votesCount: 7800,
        percentage: 22,
        demandedDeliverable: "Universal sickle cell testing at birth and fully funded county malaria vector abatement",
        urgencyLevel: "High"
      },
      {
        sector: "Rice & Irrigation",
        title: "Ahero & West Kano Irrigation Expansion (30,000 Acres)",
        votesCount: 4900,
        percentage: 14,
        demandedDeliverable: "Gravity-fed intake weirs from Nyando River to reduce diesel pumping costs for smallholders",
        urgencyLevel: "Medium"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Fish from Lake Victoria is caught by our youth, yet we import frozen tilapia from Asia. Build cold chains and modern landing jetties.",
        county: "Homa Bay",
        demographic: "Fisherfolk Co-op Secretary, 29"
      },
      {
        quote: "Kisii avocado and banana farmers lose 40% post-harvest. We need small cottage processing plants in every sub-county.",
        county: "Kisii",
        demographic: "Agribusiness Youth Founder, 27"
      }
    ],
    devolutionEquitableShareFY: "KES 52.4 Billion (Combined 6 Counties)",
    mainEconomicBase: "Lake Blue Economy, Sugar, Rice, Tea/Coffee (Kisii), Horticulture",
    primaryRiskFlag: "Post-harvest losses, unresolved public sugar debt, and delayed county health allocations."
  },
  {
    id: "western-region",
    regionName: "Western Kenya",
    countiesIncluded: ["Kakamega (037)", "Bungoma (039)", "Busia (040)", "Vihiga (038)"],
    svgPathId: "path-western",
    centerCoordinates: { x: 250, y: 440 },
    color: "#0891b2",
    populationEstimate: "5.1 Million",
    youthShare: "60% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Agricultural Subsidies & Input Lending",
        title: "Direct E-Voucher Fertilizer & Certified Seed Distribution",
        votesCount: 11400,
        percentage: 35,
        demandedDeliverable: "Cut middleman cartels at NCPB depots through mobile-wallet vouchers for smallholders under 2 acres",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Cross-Border Trade & Logistics",
        title: "Malaba & Busia One-Stop Border Post Youth Trade Facilitation",
        votesCount: 8800,
        percentage: 27,
        demandedDeliverable: "Simplified customs clearance for informal cross-border traders and safe female trader sheds",
        urgencyLevel: "High"
      },
      {
        sector: "Industrial Revitalization",
        title: "Mumias Sugar, Webuye PanPaper & Malava Dairy Value Addition",
        votesCount: 7100,
        percentage: 22,
        demandedDeliverable: "Revive anchor agro-industries with community equity shares rather than asset-stripping concessions",
        urgencyLevel: "High"
      },
      {
        sector: "Tertiary & TVET Skills",
        title: "Sub-County Technical College Toolkits & Apprenticeship Grants",
        votesCount: 5200,
        percentage: 16,
        demandedDeliverable: "KES 50,000 start-up toolkits for certified plumbers, solar technicians, and welders",
        urgencyLevel: "Medium"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Our mothers cross Busia border every morning. Harassment by rogue border officers must stop through clear biometrics.",
        county: "Busia",
        demographic: "Youth Cross-Border Trader, 23"
      }
    ],
    devolutionEquitableShareFY: "KES 39.8 Billion (Combined 4 Counties)",
    mainEconomicBase: "Maize, Sugarcane, Dairy, Cross-Border East Africa Trade, TVET",
    primaryRiskFlag: "Extreme rural population density, high soil acidity affecting maize yields, and slow agro-processing."
  },
  {
    id: "rift-valley-central-south",
    regionName: "Central & South Rift Valley",
    countiesIncluded: ["Nakuru (032)", "Uasin Gishu (027)", "Kericho (035)", "Bomet (036)", "Nandi (029)", "Trans Nzoia (026)", "Baringo (030)", "Narok (033)", "Kajiado (028)"],
    svgPathId: "path-rift-south",
    centerCoordinates: { x: 370, y: 460 },
    color: "#d97706",
    populationEstimate: "8.4 Million",
    youthShare: "59% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Grain Basket & National Food Security",
        title: "Guaranteed Minimum Returns & Modern Grain Silos",
        votesCount: 16800,
        percentage: 38,
        demandedDeliverable: "Hermetic community grain storage in Kitale, Eldoret, and Narok to end post-harvest distress selling",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Dairy & Tea Reforms",
        title: "Prompt Milk Payments & KTDA Factory Digital Weighing Scale Audits",
        votesCount: 11900,
        percentage: 27,
        demandedDeliverable: "Mandatory KES 50/L floor price on raw milk and automated tamper-proof tea weighing",
        urgencyLevel: "High"
      },
      {
        sector: "Geothermal & Industrial Power",
        title: "Olkaria & Menengai Cheap Industrial Power for Local Factories",
        votesCount: 8400,
        percentage: 19,
        demandedDeliverable: "Special low-tariff power zones for agro-processing parks in Naivasha and Nakuru",
        urgencyLevel: "Medium"
      },
      {
        sector: "Youth Athletics & Sports Talent Fund",
        title: "Modern Tartan Tracks & Anti-Doping Civic Academies",
        votesCount: 7100,
        percentage: 16,
        demandedDeliverable: "Complete Kamariny and Kipchoge Keino stadiums with medical support facilities",
        urgencyLevel: "Medium"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Trans Nzoia feeds Kenya. Yet when harvest comes, brokers buy maize at KES 2,000 per bag while inputs cost KES 6,000. Regulate the middle chain.",
        county: "Trans Nzoia",
        demographic: "Commercial Youth Farmer, 26"
      }
    ],
    devolutionEquitableShareFY: "KES 78.5 Billion (Combined 9 Counties)",
    mainEconomicBase: "Grain Production, Tea & Coffee, Geothermal Energy, Tourism (Maasai Mara), Athletics",
    primaryRiskFlag: "Climate shock droughts affecting pasture, tea bonus fluctuations, and unpaved farm-to-market feeder roads."
  },
  {
    id: "mount-kenya-central",
    regionName: "Mount Kenya & Central",
    countiesIncluded: ["Nyeri (019)", "Murang'a (021)", "Kirinyaga (020)", "Embu (014)", "Meru (012)", "Tharaka Nithi (013)", "Nyandarua (018)", "Laikipia (031)"],
    svgPathId: "path-central",
    centerCoordinates: { x: 480, y: 430 },
    color: "#7c3aed",
    populationEstimate: "6.9 Million",
    youthShare: "55% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Coffee & Tea Value Chain Overhaul",
        title: "Direct Overseas Export Licenses & Cherry Advance Subsidies",
        votesCount: 15400,
        percentage: 36,
        demandedDeliverable: "Bypass Nairobi Coffee Exchange cartel brokers; guarantee minimum KES 100/kg cherry advance fund",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Horticulture & Water Harvesting",
        title: "Water Pan Subsidies & Miraa / Macadamia Value Addition",
        votesCount: 11100,
        percentage: 26,
        demandedDeliverable: "Construct 50,000 household runoff water pans and lift export barriers on raw macadamia and miraa",
        urgencyLevel: "High"
      },
      {
        sector: "Youth Substance Abuse & Mental Health",
        title: "Rehabilitation & Community Innovation Hubs in Every Sub-County",
        votesCount: 9200,
        percentage: 21,
        demandedDeliverable: "Subsidized detox centers and sports leagues replacing illicit alcohol dens",
        urgencyLevel: "High"
      },
      {
        sector: "Potato & Dairy Cold Chain",
        title: "Kinangop & Ol Kalou Irish Potato Cold Storage Facilities",
        votesCount: 7400,
        percentage: 17,
        demandedDeliverable: "End 50% glut spoilage in Nyandarua through 5 strategic public cold stores",
        urgencyLevel: "Medium"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Farmers work all year on coffee bushes only for brokers to take 70% of the export price. We demand direct farm-gate transparency.",
        county: "Nyeri",
        demographic: "Coffee Co-op Youth Member, 28"
      }
    ],
    devolutionEquitableShareFY: "KES 58.6 Billion (Combined 8 Counties)",
    mainEconomicBase: "Specialty Tea & Coffee, Horticulture, Dairy, Irish Potatoes, Miraa, Tourism",
    primaryRiskFlag: "Rapid land fragmentation, aging farming workforce, and climate variability on Mt. Kenya water towers."
  },
  {
    id: "coastal-region",
    regionName: "Coast Region",
    countiesIncluded: ["Mombasa (001)", "Kilifi (003)", "Kwale (002)", "Tana River (004)", "Lamu (005)", "Taita Taveta (006)"],
    svgPathId: "path-coast",
    centerCoordinates: { x: 590, y: 650 },
    color: "#0284c7",
    populationEstimate: "4.7 Million",
    youthShare: "61% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Land Tenure & Historical Injustices",
        title: "Title Deeds for Squatters & Settlement Scheme Adjudication",
        votesCount: 17200,
        percentage: 39,
        demandedDeliverable: "Fast-track digitization and issuance of 200,000 title deeds to customary coastal residents",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Port & Logistics Local Quotas",
        title: "Mombasa Port / LAPSSET Youth Employment & Clearing Quotas",
        votesCount: 12400,
        percentage: 28,
        demandedDeliverable: "Enforce 40% local employment quota in port logistics and customs clearing",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Blue Economy & Artisanal Marine Fishing",
        title: "Deep-Sea Fishing Vessels & Exclusive Economic Zone Patrols",
        votesCount: 8100,
        percentage: 18,
        demandedDeliverable: "Equip 100 coastal Beach Management Units (BMUs) with modern GPS navigation and fibreglass boats",
        urgencyLevel: "High"
      },
      {
        sector: "Tourism Diversification & Heritage",
        title: "Eco-Tourism, Mangrove Carbon Credits & Cultural Hubs",
        votesCount: 6500,
        percentage: 15,
        demandedDeliverable: "Direct mangrove carbon credit royalties to local community youth trusts",
        urgencyLevel: "Medium"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Our grandfathers lived on this land for 80 years, yet private developers arrive with fake title deeds. Land reform is our number 1 issue.",
        county: "Kilifi",
        demographic: "Community Paralegal Youth, 25"
      },
      {
        quote: "Foreign trawlers fish inside our territorial waters while our dhows cannot go 5 nautical miles. We need modern coast guard protection and gear.",
        county: "Mombasa",
        demographic: "Artisanal Fisherman, 31"
      }
    ],
    devolutionEquitableShareFY: "KES 41.2 Billion (Combined 6 Counties)",
    mainEconomicBase: "Mombasa Port Hub, Beach Tourism, Mining (Titanium/Limestone), Blue Economy, Cashew Nuts",
    primaryRiskFlag: "Historical land dispossession, high youth unemployment in urban Mombasa, and salt-water intrusion."
  },
  {
    id: "northern-frontier",
    regionName: "Northern & Frontier ASALs",
    countiesIncluded: ["Turkana (023)", "Marsabit (010)", "Mandera (009)", "Wajir (008)", "Garissa (007)", "Samburu (025)", "Isiolo (011)", "West Pokot (024)"],
    svgPathId: "path-north",
    centerCoordinates: { x: 440, y: 240 },
    color: "#ea580c",
    populationEstimate: "4.9 Million",
    youthShare: "66% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Water Infrastructure & Mega Dams",
        title: "Strategic Underground Aquifer Drilling & Sand Dams",
        votesCount: 18900,
        percentage: 42,
        demandedDeliverable: "Tap Lotikipi and Merti aquifers with solar submersible pumps; build 1,000 sub-surface sand dams",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Pastoralist Economy & Meat Offtake",
        title: "Mobile Abattoirs, Cold Storage & Livestock Insurance",
        votesCount: 12100,
        percentage: 27,
        demandedDeliverable: "Index-based livestock drought insurance covering 500,000 pastoral households before dry season hits",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Security & Conflict Early Warning",
        title: "Digital Community Peace Committees & Border Surveillance",
        votesCount: 8300,
        percentage: 18,
        demandedDeliverable: "Equip local NPR scouts with satellite communication and solar border base stations",
        urgencyLevel: "High"
      },
      {
        sector: "Renewable Solar & Wind Energy",
        title: "Lake Turkana Wind & Solar Off-Grid Power to Every Health Center",
        votesCount: 5900,
        percentage: 13,
        demandedDeliverable: "Ensure 100% of Level 2-4 dispensaries have solar vaccine fridges and diagnostic power",
        urgencyLevel: "High"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Every drought we lose hundreds of thousands of camels and cows while billions of liters flow underground. Water is life and dignity.",
        county: "Garissa",
        demographic: "Pastoral Youth Voice, 26"
      },
      {
        quote: "Our children walk 15km to fetch muddy water from seasonal riverbeds. Prioritize sand dams over political campaign handouts.",
        county: "Turkana",
        demographic: "Community Health Volunteer, 29"
      }
    ],
    devolutionEquitableShareFY: "KES 64.9 Billion (Combined 8 ASAL Counties)",
    mainEconomicBase: "Pastoralist Livestock, Solar & Wind Power, Oil (Lokichar), Cross-Border Horn of Africa Trade",
    primaryRiskFlag: "Extreme climate vulnerability, long distances between service points, and historical infrastructure deficit."
  },
  {
    id: "eastern-semi-arid",
    regionName: "Lower Eastern (Ukambani)",
    countiesIncluded: ["Kitui (015)", "Machakos (016)", "Makueni (017)"],
    svgPathId: "path-eastern",
    centerCoordinates: { x: 530, y: 530 },
    color: "#16a34a",
    populationEstimate: "3.4 Million",
    youthShare: "57% under 35",
    topCrowdsourcedPriorities: [
      {
        sector: "Water Harvesting & Thwake Dam Completion",
        title: "Piped Clean Water & Gravity Irrigation Canals",
        votesCount: 13800,
        percentage: 39,
        demandedDeliverable: "Complete Thwake Dam water treatment plant and distribution pipes to Kitui and Makueni households",
        urgencyLevel: "Emergency"
      },
      {
        sector: "Mango & Fruit Value Addition",
        title: "Sub-County Solar Fruit Dryers & Processing Plants",
        votesCount: 9900,
        percentage: 28,
        demandedDeliverable: "Stop fruit fly losses and middleman brokers through 10 cooperative juice and pulp factories",
        urgencyLevel: "High"
      },
      {
        sector: "Konza Technopolis & Silicon Savannah",
        title: "Local Youth Software Apprenticeships & Tech Incubation",
        votesCount: 6800,
        percentage: 19,
        demandedDeliverable: "Dedicate 30% of Konza data center jobs and contractor bids to local tech youth",
        urgencyLevel: "High"
      },
      {
        sector: "Drought-Tolerant Crops & Seed Banks",
        title: "Green Gram (Ndengu), Sorghum & Pigeon Peas Market Linkages",
        votesCount: 4900,
        percentage: 14,
        demandedDeliverable: "Guaranteed minimum prices for Ndengu exports and school feeding procurement integration",
        urgencyLevel: "Medium"
      }
    ],
    citizenFeedbackHighlights: [
      {
        quote: "Thwake Dam has taken years. We need the clean drinking water treated and piped to our villages, not just a stagnant lake.",
        county: "Makueni",
        demographic: "Civic Youth Delegate, 25"
      }
    ],
    devolutionEquitableShareFY: "KES 26.5 Billion (Combined 3 Counties)",
    mainEconomicBase: "Horticulture (Mangoes/Citrus), Drought-Tolerant Grains, Konza Tech Hub, Sand Harvesting",
    primaryRiskFlag: "Recurrent semi-arid rainfall failure, riverbed sand degradation, and delayed mega-dam piping."
  }
];

export const HISTORICAL_BUDGET_DATA: HistoricalBudgetPoint[] = [
  {
    fiscalYear: "2021/22",
    debtService: 890,
    education: 520,
    health: 120,
    devolutionEquitableShare: 370,
    infrastructureAndWater: 410,
    agriculture: 65,
    totalExpenditure: 3030,
    ordinaryRevenue: 2200,
    fiscalDeficit: 830
  },
  {
    fiscalYear: "2022/23",
    debtService: 1050,
    education: 545,
    health: 132,
    devolutionEquitableShare: 370,
    infrastructureAndWater: 395,
    agriculture: 68,
    totalExpenditure: 3310,
    ordinaryRevenue: 2360,
    fiscalDeficit: 950
  },
  {
    fiscalYear: "2023/24",
    debtService: 1360,
    education: 628,
    health: 141,
    devolutionEquitableShare: 385,
    infrastructureAndWater: 370,
    agriculture: 72,
    totalExpenditure: 3780,
    ordinaryRevenue: 2750,
    fiscalDeficit: 1030
  },
  {
    fiscalYear: "2024/25",
    debtService: 1610,
    education: 656,
    health: 148,
    devolutionEquitableShare: 400,
    infrastructureAndWater: 380,
    agriculture: 78,
    totalExpenditure: 3990,
    ordinaryRevenue: 3020,
    fiscalDeficit: 970
  },
  {
    fiscalYear: "2025/26 (Est.)",
    debtService: 1820,
    education: 680,
    health: 162,
    devolutionEquitableShare: 415,
    infrastructureAndWater: 410,
    agriculture: 85,
    totalExpenditure: 4250,
    ordinaryRevenue: 3340,
    fiscalDeficit: 910
  }
];
