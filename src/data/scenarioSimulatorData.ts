import { ScenarioPolicyApproach } from "../types";

export const KENYA_2060_BENCHMARK_TARGETS = {
  gdpPerCapitaUsd: 12500, // Upper Middle / High Income Threshold
  debtToGdpMax: 45, // Sustainable threshold %
  youthUnemploymentTarget: 6.5, // Target %
  outOfPocketHealthTarget: 10, // WHO recommended max %
  manufacturingGdpShareTarget: 22, // %
  devolutionShareTarget: 35, // %
  giniCoefficientTarget: 32, // Low inequality (Nordic benchmark ~28, Kenya baseline ~40)
  climateResilienceScoreTarget: 90 // out of 100
};

export const SCENARIO_POLICY_APPROACHES: ScenarioPolicyApproach[] = [
  {
    id: "approach-debt-infrastructure",
    name: "Leveraged Infrastructure & Foreign Capital PPPs",
    coalitionArchetype: "Incumbent / Supply-Side Capital Model",
    domain: "Macro-Economy & Debt",
    philosophy: "Front-load capital expenditure in ports, toll expressways, energy grids and housing through external bilateral loans and investor concessions, expecting future GDP growth to outpace sovereign debt amortization.",
    color: "#2563eb", // Blue
    keyMechanisms: [
      "Commercial Eurobonds and bilateral infrastructure loans",
      "Public-Private Partnerships (PPPs) with state guaranteed annuity returns",
      "Statutory payroll levies (housing, training, energy) for dedicated capital sinking funds",
      "Special Economic Zones (SEZs) with corporate tax holidays"
    ],
    projections: {
      year2030: {
        debtToGdp: 68.5,
        gdpPerCapitaUsd: 2850,
        youthUnemployment: 27.2,
        outOfPocketHealth: 34.0,
        manufacturingGdpShare: 8.2,
        devolutionShare: 16.5,
        giniCoefficient: 42.1,
        climateResilienceScore: 62
      },
      year2045: {
        debtToGdp: 61.0,
        gdpPerCapitaUsd: 5900,
        youthUnemployment: 21.0,
        outOfPocketHealth: 25.0,
        manufacturingGdpShare: 12.5,
        devolutionShare: 18.0,
        giniCoefficient: 44.5,
        climateResilienceScore: 71
      },
      year2060: {
        debtToGdp: 54.0,
        gdpPerCapitaUsd: 10800,
        youthUnemployment: 15.5,
        outOfPocketHealth: 18.0,
        manufacturingGdpShare: 16.0,
        devolutionShare: 20.0,
        giniCoefficient: 46.0,
        climateResilienceScore: 79
      }
    },
    tradeoffs: {
      advantages: [
        "Rapid visible transformation of physical transport, energy, and urban logistics networks",
        "Attracts large multi-national logistics and construction consortiums",
        "High headline gross capital asset formation"
      ],
      vulnerabilities: [
        "High currency depreciation vulnerability due to foreign-currency denominated debt",
        "Widening spatial inequality between major corridor cities and neglected hinterlands",
        "Debt service crowding out critical recurrent spending on teachers and doctors"
      ],
      intergenerationalEquityRating: "High Risk",
      governancePrerequisites: "Strict parliamentary debt caps, transparent open-contracting portals, and anti-corruption oversight on procurement inflation."
    },
    shockResilience: [
      {
        shockId: "oil-spike",
        shockName: "Global Energy & Fuel Spike (+35%)",
        impactDescription: "Severe inflation surge as transport tariffs rise; sovereign debt service ratio spikes due to foreign exchange strain.",
        resilienceScore: 4
      },
      {
        shockId: "fed-rate-hike",
        shockName: "US Fed / Global Rate Hike (+250 bps)",
        impactDescription: "Refinancing costs on Eurobonds surge by >$400M/year; domestic currency depreciates rapidly.",
        resilienceScore: 3
      },
      {
        shockId: "drought",
        shockName: "Severe Horn of Africa Drought",
        impactDescription: "Moderate resilience in urban logistics, but severe rural food inflation and emergency exchequer diversion.",
        resilienceScore: 5
      },
      {
        shockId: "eac-trade-surge",
        shockName: "East Africa Common Market Boom",
        impactDescription: "High benefit from modern ports, standard gauge railways, and logistics hubs handling transit cargo.",
        resilienceScore: 9
      }
    ]
  },
  {
    id: "approach-fiscal-industrialization",
    name: "Fiscal Consolidation, Debt Audit & Agro-Processing",
    coalitionArchetype: "Social Democratic & Production-First Model",
    domain: "Macro-Economy & Debt",
    philosophy: "Halt high-cost commercial borrowing, subject public debt to an independent forensic audit, slash executive wastage, and redirect domestic capital into rural agro-industrial parks and domestic manufacturing clusters.",
    color: "#059669", // Emerald
    keyMechanisms: [
      "Zero-based national budgeting and 30% reduction in executive travel and hospitality",
      "Public debt forensic registry with repudiation of illegal odious debt",
      "County aggregation and industrial parks (CAIPs) anchored by local farmer co-operatives",
      "Tariff protection and subsidized single-digit credit for local manufacturing substitution"
    ],
    projections: {
      year2030: {
        debtToGdp: 56.0,
        gdpPerCapitaUsd: 2600,
        youthUnemployment: 22.4,
        outOfPocketHealth: 28.0,
        manufacturingGdpShare: 11.8,
        devolutionShare: 24.0,
        giniCoefficient: 38.2,
        climateResilienceScore: 68
      },
      year2045: {
        debtToGdp: 44.0,
        gdpPerCapitaUsd: 6400,
        youthUnemployment: 13.8,
        outOfPocketHealth: 16.5,
        manufacturingGdpShare: 18.2,
        devolutionShare: 28.5,
        giniCoefficient: 34.0,
        climateResilienceScore: 82
      },
      year2060: {
        debtToGdp: 35.0,
        gdpPerCapitaUsd: 13200,
        youthUnemployment: 7.2,
        outOfPocketHealth: 9.5,
        manufacturingGdpShare: 23.5,
        devolutionShare: 32.0,
        giniCoefficient: 30.5,
        climateResilienceScore: 91
      }
    },
    tradeoffs: {
      advantages: [
        "Massive reduction in national bankruptcy risk and intergenerational debt burden",
        "Broad-based rural wealth creation, stabilizing the Kenyan Shilling through export surplus",
        "Substantial reduction in youth unemployment through labor-intensive value-addition"
      ],
      vulnerabilities: [
        "Slower initial headline GDP growth during the early 3-year consolidation and austerity phase",
        "Resistance and lobbying from import cartels and foreign tender beneficiaries",
        "Requires high state capacity to enforce industrial standards and prevent protectionist rent-seeking"
      ],
      intergenerationalEquityRating: "High",
      governancePrerequisites: "Independent judiciary, professional civil service meritocracy, and rigorous value-for-money monitoring."
    },
    shockResilience: [
      {
        shockId: "oil-spike",
        shockName: "Global Energy & Fuel Spike (+35%)",
        impactDescription: "Moderate impact cushioned by higher domestic food self-sufficiency and reduced debt servicing outflows.",
        resilienceScore: 7
      },
      {
        shockId: "fed-rate-hike",
        shockName: "US Fed / Global Rate Hike (+250 bps)",
        impactDescription: "High resilience due to low reliance on commercial foreign-currency rollover loans.",
        resilienceScore: 9
      },
      {
        shockId: "drought",
        shockName: "Severe Horn of Africa Drought",
        impactDescription: "Substantially mitigated by investments in small-scale rural water pans, solar irrigation, and post-harvest grain silos.",
        resilienceScore: 8
      },
      {
        shockId: "eac-trade-surge",
        shockName: "East Africa Common Market Boom",
        impactDescription: "Exceptional export earnings from manufactured food, textiles, and value-added agricultural products.",
        resilienceScore: 9
      }
    ]
  },
  {
    id: "approach-devolution-maximalist",
    name: "Devolution-First & County Economic Federalism",
    coalitionArchetype: "Devolution-Maximalist & Grassroots Model",
    domain: "Governance & Regional Equity",
    philosophy: "Shift 40% of all national ordinary revenue directly to the 47 county governments, dismantle overlapping national ministries (Agriculture, Health, Roads), and empower regional economic blocs (LREB, NOREB, Jumuia).",
    color: "#7c3aed", // Purple
    keyMechanisms: [
      "Constitutional entrenchment of 35-40% equitable share with direct Treasury-to-County API release",
      "Regional spatial economic zoning (marine economy coast, dairy/tea highlands, pastoral solar corridor)",
      "County revenue automation to eliminate cash leakages in local cess and hospital fees",
      "Decentralized healthcare and vocational training fund directly managed by communities"
    ],
    projections: {
      year2030: {
        debtToGdp: 62.0,
        gdpPerCapitaUsd: 2500,
        youthUnemployment: 24.0,
        outOfPocketHealth: 30.0,
        manufacturingGdpShare: 9.5,
        devolutionShare: 35.0,
        giniCoefficient: 36.5,
        climateResilienceScore: 66
      },
      year2045: {
        debtToGdp: 49.0,
        gdpPerCapitaUsd: 6100,
        youthUnemployment: 15.0,
        outOfPocketHealth: 18.0,
        manufacturingGdpShare: 15.0,
        devolutionShare: 38.0,
        giniCoefficient: 31.8,
        climateResilienceScore: 84
      },
      year2060: {
        debtToGdp: 41.0,
        gdpPerCapitaUsd: 12400,
        youthUnemployment: 8.8,
        outOfPocketHealth: 11.0,
        manufacturingGdpShare: 20.0,
        devolutionShare: 40.0,
        giniCoefficient: 29.0,
        climateResilienceScore: 93
      }
    },
    tradeoffs: {
      advantages: [
        "Drastic reduction in regional historical marginalization and Nairobi-centric capital bias",
        "Public services (hospitals, feeder roads, water) tailored to local ecological realities",
        "Empowers local citizens to hold MCAs and Governors directly accountable"
      ],
      vulnerabilities: [
        "Risk of decentralized corruption if County Assemblies and local auditing bodies are compromised",
        "Unequal administrative capacity among smaller/arid counties during transition",
        "Potential policy fragmentation across county borders without strong intergovernmental coordination"
      ],
      intergenerationalEquityRating: "High",
      governancePrerequisites: "Devolved anti-corruption watchdogs, digitized county procurement, and empowered ward public participation assemblies."
    },
    shockResilience: [
      {
        shockId: "oil-spike",
        shockName: "Global Energy & Fuel Spike (+35%)",
        impactDescription: "Local transport costs rise, but localized food systems reduce national vulnerability.",
        resilienceScore: 6
      },
      {
        shockId: "fed-rate-hike",
        shockName: "US Fed / Global Rate Hike (+250 bps)",
        impactDescription: "Moderate resilience as county economies rely on domestic revenue mobilization.",
        resilienceScore: 7
      },
      {
        shockId: "drought",
        shockName: "Severe Horn of Africa Drought",
        impactDescription: "Arid counties have direct devolved disaster funds and decentralized water infrastructure.",
        resilienceScore: 8
      },
      {
        shockId: "eac-trade-surge",
        shockName: "East Africa Common Market Boom",
        impactDescription: "Border counties (Busia, Malaba, Namanga, Moyale) become powerful regional trade nodes.",
        resilienceScore: 8
      }
    ]
  },
  {
    id: "approach-digital-leapfrog",
    name: "High-Tech, AI Frontier & Digital Knowledge Services",
    coalitionArchetype: "Digital Modernizer & Innovation Frontier",
    domain: "Youth & Future Economy",
    philosophy: "Position Kenya as Africa’s premier artificial intelligence, software engineering, fintech, and green data-center powerhouse, bypassing traditional heavy smokestack industrialization with high-value digital exports.",
    color: "#0891b2", // Cyan
    keyMechanisms: [
      "National fiber backbone to all 1,450 wards with subsidized high-speed public Wi-Fi",
      "Universal AI, coding, and data engineering curricula from secondary school to university",
      "Tax incentives for global cloud compute infrastructure powered by Kenya's geothermal grid",
      "Regulatory sandbox for fintech, blockchain remittances, and sovereign digital assets"
    ],
    projections: {
      year2030: {
        debtToGdp: 64.0,
        gdpPerCapitaUsd: 2950,
        youthUnemployment: 23.5,
        outOfPocketHealth: 32.0,
        manufacturingGdpShare: 8.8,
        devolutionShare: 18.0,
        giniCoefficient: 43.0,
        climateResilienceScore: 65
      },
      year2045: {
        debtToGdp: 52.0,
        gdpPerCapitaUsd: 7200,
        youthUnemployment: 14.5,
        outOfPocketHealth: 20.0,
        manufacturingGdpShare: 13.0,
        devolutionShare: 20.0,
        giniCoefficient: 41.0,
        climateResilienceScore: 78
      },
      year2060: {
        debtToGdp: 42.0,
        gdpPerCapitaUsd: 14800,
        youthUnemployment: 8.0,
        outOfPocketHealth: 12.5,
        manufacturingGdpShare: 17.5,
        devolutionShare: 22.0,
        giniCoefficient: 39.0,
        climateResilienceScore: 86
      }
    },
    tradeoffs: {
      advantages: [
        "Fastest growth in foreign exchange inflows via digital service exports and remittances",
        "High-paying career pathways for young software developers, engineers, and digital creators",
        "Low carbon footprint aligned with Kenya’s 92% renewable electrical grid"
      ],
      vulnerabilities: [
        "Risk of creating an elite digital enclave while manual/rural workers are left behind",
        "Global AI automation may displace low-skill data annotation and basic BPO jobs",
        "High electricity grid and cybersecurity reliability dependencies"
      ],
      intergenerationalEquityRating: "Medium",
      governancePrerequisites: "Robust data protection enforcement, cyber-resilience frameworks, and affordable universal device access."
    },
    shockResilience: [
      {
        shockId: "oil-spike",
        shockName: "Global Energy & Fuel Spike (+35%)",
        impactDescription: "Resilient because digital services operate on geothermal and solar energy grids with low direct fuel inputs.",
        resilienceScore: 8
      },
      {
        shockId: "fed-rate-hike",
        shockName: "US Fed / Global Rate Hike (+250 bps)",
        impactDescription: "Venture capital funding slows for early-stage startups, but export earnings in USD buffer shocks.",
        resilienceScore: 6
      },
      {
        shockId: "drought",
        shockName: "Severe Horn of Africa Drought",
        impactDescription: "Digital workers insulated from direct crop failures, but food inflation strains household real wages.",
        resilienceScore: 6
      },
      {
        shockId: "eac-trade-surge",
        shockName: "East Africa Common Market Boom",
        impactDescription: "Kenyan fintech apps, payment rails, and software platforms dominate East and Central Africa.",
        resilienceScore: 10
      }
    ]
  },
  {
    id: "approach-universal-social-investment",
    name: "Universal Public Goods & Social Safety Net Model",
    coalitionArchetype: "Welfare & Human Capital-Centric",
    domain: "Social Protection & Health",
    philosophy: "Fundamentally eradicate poverty and catastrophic healthcare bankruptcy by treating health, public education, clean water, and senior pensions as non-negotiable constitutional human rights funded via progressive taxation.",
    color: "#e11d48", // Rose
    keyMechanisms: [
      "Tax-funded single-payer National Health Care system with zero out-of-pocket hospital co-pays",
      "100% capitation and abolition of tuition fees for all accredited public universities and TVETs",
      "Universal guaranteed monthly social stipend for all Kenyans aged 65+ and persons with disabilities",
      "Progressive wealth and high-earner income tax bands combined with closing corporate tax loopholes"
    ],
    projections: {
      year2030: {
        debtToGdp: 60.0,
        gdpPerCapitaUsd: 2550,
        youthUnemployment: 21.0,
        outOfPocketHealth: 15.0,
        manufacturingGdpShare: 10.0,
        devolutionShare: 25.0,
        giniCoefficient: 34.0,
        climateResilienceScore: 70
      },
      year2045: {
        debtToGdp: 47.0,
        gdpPerCapitaUsd: 6200,
        youthUnemployment: 12.0,
        outOfPocketHealth: 8.0,
        manufacturingGdpShare: 16.0,
        devolutionShare: 30.0,
        giniCoefficient: 29.5,
        climateResilienceScore: 85
      },
      year2060: {
        debtToGdp: 39.0,
        gdpPerCapitaUsd: 12900,
        youthUnemployment: 6.0,
        outOfPocketHealth: 4.5,
        manufacturingGdpShare: 21.0,
        devolutionShare: 34.0,
        giniCoefficient: 26.5,
        climateResilienceScore: 92
      }
    },
    tradeoffs: {
      advantages: [
        "Unprecedented reduction in inequality, infant mortality, and poverty-driven social instability",
        "Highest human capital index, producing healthy, educated, and productive future generations",
        "Zero families forced to sell ancestral land or conduct Harambees to pay hospital or school bills"
      ],
      vulnerabilities: [
        "Requires immense tax compliance discipline and resistance to elite tax evasion",
        "High fiscal pressure on the national budget during economic downturns",
        "Needs exceptional public sector anti-graft enforcement to prevent drug theft in public clinics"
      ],
      intergenerationalEquityRating: "High",
      governancePrerequisites: "Universal digital health records, independent KRA tax administration, and zero tolerance for ghost worker payroll fraud."
    },
    shockResilience: [
      {
        shockId: "oil-spike",
        shockName: "Global Energy & Fuel Spike (+35%)",
        impactDescription: "Social safety net shields vulnerable households from absolute starvation.",
        resilienceScore: 7
      },
      {
        shockId: "fed-rate-hike",
        shockName: "US Fed / Global Rate Hike (+250 bps)",
        impactDescription: "Strong domestic tax base insulates social programs from foreign credit rating downgrades.",
        resilienceScore: 8
      },
      {
        shockId: "drought",
        shockName: "Severe Horn of Africa Drought",
        impactDescription: "Exceptional resilience due to institutionalized emergency food rations and free primary clinic care.",
        resilienceScore: 9
      },
      {
        shockId: "eac-trade-surge",
        shockName: "East Africa Common Market Boom",
        impactDescription: "Highly skilled, healthy workforce attracts high-value service investments.",
        resilienceScore: 8
      }
    ]
  }
];

export const EXTERNAL_SHOCKS = [
  { id: "none", name: "Baseline Trajectory (No Major Global Shocks)", multiplier: 1.0, description: "Standard historical trend assumptions without catastrophic external black swans." },
  { id: "oil-spike", name: "Global Energy & Fuel Spike (+35%)", multiplier: 1.15, description: "Middle East conflict or OPEC cuts push global crude oil above $115/barrel." },
  { id: "fed-rate-hike", name: "Global Financial Shock & Capital Flight (+250 bps)", multiplier: 1.2, description: "Aggressive foreign interest rate hikes trigger global emerging market currency depreciations." },
  { id: "drought", name: "Severe Multi-Season Horn of Africa Drought", multiplier: 1.25, description: "Three consecutive failed rainy seasons decimate crop yields and pasture." },
  { id: "eac-trade-surge", name: "East Africa Common Market Boom (+40% Exports)", multiplier: 0.9, description: "Elimination of non-tariff barriers across Kenya, Uganda, Tanzania, DRC, Rwanda, and South Sudan." }
];
