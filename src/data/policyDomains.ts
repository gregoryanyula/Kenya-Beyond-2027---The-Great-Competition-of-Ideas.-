import { PolicyDomain } from "../types";

export const POLICY_DOMAINS: PolicyDomain[] = [
  {
    id: "economy-growth",
    name: "Economic Growth & Productivity",
    iconName: "TrendingUp",
    category: "Economy & Jobs",
    description: "Macroeconomic stability, GDP composition, agricultural & industrial value addition, and private sector dynamism.",
    keyQuestions: [
      "What specific structural bottlenecks to GDP expansion does your model address?",
      "How will you foster high-productivity formal sector jobs rather than low-yield subsistence informal tasks?",
      "What is your target real GDP growth rate and what empirical model backs it?"
    ],
    benchmarkKPIs: ["Real GDP Growth Rate", "Productivity per Worker", "Private Sector Credit Growth", "Ease of Doing Business Index"],
    constitutionalAnchor: "Article 201(a) - Openness, accountability and public participation in financial matters; Article 43 - Economic & social rights.",
    costingConsiderations: "Fiscal stimulus sizing, regulatory simplification costs, capital expenditure vs recurrent ratio.",
    kenya2060Goal: "Upper-middle-income industrial economy with resilient diversified domestic value chains."
  },
  {
    id: "jobs-youth",
    name: "Employment & Youth Opportunities",
    iconName: "Users",
    category: "Economy & Jobs",
    description: "Addressing the demographic youth dividend, youth unemployment/underemployment, entrepreneurship capital, TVET linkage, and decent wages.",
    keyQuestions: [
      "What is the exact job creation mechanism beyond public works temporary jobs?",
      "How will access to affordable capital for micro and small enterprises (MSMEs) be scaled sustainably?",
      "What wage floor and social protection accompany proposed gig and youth work programs?"
    ],
    benchmarkKPIs: ["Youth (18-35) NEET Rate", "Formal Sector Job Additions (KNBS)", "Average MSME Survival Rate beyond 3 Years", "Labor Force Participation Rate"],
    constitutionalAnchor: "Article 55 - The State shall take measures to ensure youth access to relevant education, training, and employment.",
    costingConsiderations: "Wage subsidies, credit guarantee schemes, incubation center operational costs.",
    kenya2060Goal: "Full productive employment with world-class digital, technical, and industrial youth competencies."
  },
  {
    id: "cost-of-living",
    name: "Cost of Living & Basic Commodities",
    iconName: "ShoppingBag",
    category: "Economy & Jobs",
    description: "Inflation control, food prices, fuel and electricity costs, household purchasing power, and supply chain efficiency.",
    keyQuestions: [
      "How will your policy reduce the prices of staple foods (unprocessed maize, rice, cooking oil, milk) without unsustainable price controls?",
      "What supply-side interventions will protect citizens from global exchange-rate and commodity shocks?",
      "How will transport and logistics markups between farm gate and retail markets be curbed?"
    ],
    benchmarkKPIs: ["Headline CPI Inflation Rate (Target 5±2.5%)", "Food Inflation Index", "Energy & Transport Inflation", "Household Disposable Income"],
    constitutionalAnchor: "Article 43(1)(c) - Freedom from hunger and to have adequate food of acceptable quality.",
    costingConsiderations: "Subsidies vs supply-chain tax rationalization, strategic grain reserves, distribution cold-chain costs.",
    kenya2060Goal: "Stable purchasing power with food spending taking less than 20% of median household income."
  },
  {
    id: "debt-public-finance",
    name: "National Debt & Public Finance",
    iconName: "Landmark",
    category: "Economy & Jobs",
    description: "Managing public debt stock, debt service ratio, fiscal deficit, Eurobond refinancing, domestic borrowing crowding-out, and budget discipline.",
    keyQuestions: [
      "What is your plan to reduce the debt-service-to-revenue ratio from >60% to sustainable thresholds (<30%)?",
      "Will you restructure, refinance, or renegotiate bilateral and multilateral debt, and at what cost?",
      "How will you prevent domestic borrowing from crowding out private sector bank lending?"
    ],
    benchmarkKPIs: ["Debt-to-GDP Ratio", "Debt Service as % of Ordinary Revenue", "Fiscal Deficit (% of GDP)", "Primary Budget Balance"],
    constitutionalAnchor: "Article 201(c) - The burdens and benefits of the use of resources and public borrowing shall be shared equitably between present and future generations.",
    costingConsiderations: "Interest payment obligations, debt redemption schedules, credit rating implications.",
    kenya2060Goal: "Sovereign fiscal self-reliance with debt used strictly for self-liquidating high-return capital assets."
  },
  {
    id: "taxation-revenue",
    name: "Taxation & Revenue Systems",
    iconName: "Receipt",
    category: "Economy & Jobs",
    description: "Tax policy predictability, National Tax Policy implementation, broadening tax base vs increasing tax rates, KRA modernization, and digital service tax.",
    keyQuestions: [
      "Will your administration raise revenue by broadening the base or raising tax rates on formal wage-earners and businesses?",
      "How will you guarantee multi-year tax predictability for investors and avoid ad-hoc annual Finance Bill shocks?",
      "How will tax expenditure exemptions be audited to eliminate non-performing corporate tax loopholes?"
    ],
    benchmarkKPIs: ["Tax Revenue as % of GDP (Target >18%)", "Tax Base Growth", "KRA Compliance Cost Index", "Tax Predictability Index"],
    constitutionalAnchor: "Article 201(b) - The tax burden shall be shared fairly.",
    costingConsiderations: "KRA digital compliance automation, economic impact of excise and VAT adjustments.",
    kenya2060Goal: "Fair, transparent, progressive, automated tax regime supporting investment and social equity."
  },
  {
    id: "agriculture-food-security",
    name: "Agriculture & Food Security",
    iconName: "Wheat",
    category: "Economy & Jobs",
    description: "Smallholder productivity, fertilizer and input subsidies, irrigation transition from rain-fed farming, post-harvest losses, and agro-processing.",
    keyQuestions: [
      "What percentage of arable land will be shifted to modern irrigation, and through what financing vehicle?",
      "How will post-harvest storage (silos, warehouse receipt systems) be operationalized across all agricultural counties?",
      "What is your strategy to revitalize cash crop value chains (tea, coffee, sugarcane, macadamia, pyrethrum, cotton)?"
    ],
    benchmarkKPIs: ["Total Acreage Under Irrigation", "National Maize Yield per Hectare", "Post-Harvest Food Loss %", "Agricultural Sector Growth Rate"],
    constitutionalAnchor: "Article 43(1)(c) - Adequate food of acceptable quality; Fourth Schedule - Devolved agriculture functions.",
    costingConsiderations: "Mega-dam infrastructure, fertilizer distribution logistics, extension services budget.",
    kenya2060Goal: "100% Food sovereignty with Kenya as a net exporter of high-value agro-processed goods."
  },
  {
    id: "manufacturing-industry",
    name: "Manufacturing & Industrialisation",
    iconName: "Factory",
    category: "Economy & Jobs",
    description: "Industrial parks, Special Economic Zones (SEZs), local content, textile & leather value chains, automotive assembly, and manufacturing GDP share.",
    keyQuestions: [
      "How will you lift manufacturing contribution from <8% back towards the 15% GDP threshold?",
      "What industrial power tariffs and logistical incentives will be offered to manufacturing hubs?",
      "How will County Aggregation and Industrial Parks (CAIPs) be made commercially viable rather than white elephants?"
    ],
    benchmarkKPIs: ["Manufacturing Value Added (% of GDP)", "Industrial Jobs Created", "Manufactured Exports Volume", "Local Content Utilization %"],
    constitutionalAnchor: "Article 69(1)(a) - Sustainable exploitation and utilization of resources.",
    costingConsiderations: "SEZ infrastructure subsidies, tariff equalization, capital machinery import duty concessions.",
    kenya2060Goal: "East and Central Africa's premier advanced industrial hub."
  },
  {
    id: "healthcare-universal",
    name: "Healthcare & Universal Health Coverage",
    iconName: "HeartPulse",
    category: "Social & Human Capital",
    description: "Social Health Insurance Fund (SHIF/SHA), primary healthcare networks, doctor & health worker renumeration, medical supplies (KEMSA), cancer & chronic care.",
    keyQuestions: [
      "How will your plan resolve SHA/SHIF transition bottlenecks to ensure no patient is turned away from hospitals?",
      "How will county-level Level 4 & 5 hospitals be adequately equipped and staffed with dignified health worker contracts?",
      "What is the sustainable financing model for emergency, chronic illness, and indigent healthcare pools?"
    ],
    benchmarkKPIs: ["Out-of-Pocket Health Spending %", "Universal Health Coverage Index", "Doctor-to-Population Ratio", "Maternal Mortality Rate"],
    constitutionalAnchor: "Article 43(1)(a) - The right to the highest attainable standard of health, including reproductive health care.",
    costingConsiderations: "Primary healthcare fund, emergency chronic disease reserve, medical equipment leasing vs outright purchase.",
    kenya2060Goal: "Equitable, world-class healthcare with zero medical-poverty bankruptcies."
  },
  {
    id: "education-skills",
    name: "Education & Skills Development",
    iconName: "GraduationCap",
    category: "Social & Human Capital",
    description: "Competency-Based Curriculum (CBC), Junior & Senior Secondary transition, university funding model (HEF/MTF), TVET vocational training, teacher employment (TSC).",
    keyQuestions: [
      "How will your government fix the Higher Education Funding model to prevent public university insolvency?",
      "What is the audited infrastructure and teacher recruitment plan for the Senior Secondary School transition?",
      "How will TVET curricula be tied directly to private sector industrial apprenticeship demands?"
    ],
    benchmarkKPIs: ["Gross Enrollment Ratio (Secondary & Tertiary)", "Teacher-Student Ratio", "University Research Output Index", "Graduate Employability Rate"],
    constitutionalAnchor: "Article 43(1)(f) - The right to education; Article 53(1)(b) - Free and compulsory basic education.",
    costingConsiderations: "Capitation grants per student, university debt clearance, TSC teacher recruitment allocations.",
    kenya2060Goal: "Globally competitive knowledge economy with top STEM, technical, and creative capabilities."
  },
  {
    id: "affordable-housing",
    name: "Affordable Housing & Urban Planning",
    iconName: "Building2",
    category: "Social & Human Capital",
    description: "Housing Levy implementation, social housing in informal settlements, mortgage market expansion (KMRC), urban zoning, and utility connectivity.",
    keyQuestions: [
      "How will you guarantee that houses built under the program actually reach low-income informal settlement dwellers (under KES 20,000/month)?",
      "What is the transparent audit and allocation process for completed housing units?",
      "How will urban planning incorporate drainage, sewer, water, and rapid transit to prevent chaotic sprawl?"
    ],
    benchmarkKPIs: ["Units Completed and Handed Over", "% Units Allocated to Bottom 40% Income", "Mortgage Penetration Rate (% of GDP)", "Urban Slum Upgrading Pace"],
    constitutionalAnchor: "Article 43(1)(b) - The right to accessible and adequate housing, and to reasonable standards of sanitation.",
    costingConsiderations: "Housing Fund levy collections vs direct budget appropriations, off-taker guarantee risks.",
    kenya2060Goal: "Dignified, climate-resilient, well-planned urban centers with zero unsanitary slums."
  },
  {
    id: "infrastructure-water-transport",
    name: "Infrastructure & National Logistics",
    iconName: "Construction",
    category: "Infrastructure & Tech",
    description: "Road networks, Standard Gauge Railway (SGR) expansion to Malaba, Port of Mombasa & Lamu (LAPSSET), clean water distribution, and irrigation dams.",
    keyQuestions: [
      "How will pending infrastructure bills (>KES 500 Billion) and stalled road projects across counties be prioritized?",
      "What is the economic viability and financing structure for extending the SGR to Uganda border?",
      "How will piped clean water be delivered to the 40%+ of Kenyans still relying on unimproved water sources?"
    ],
    benchmarkKPIs: ["Paved Road Kilometers per 1,000 km²", "Freight Tonnage moved by Rail vs Road", "Port Turnaround Time (Days)", "Piped Water Coverage %"],
    constitutionalAnchor: "Article 43(1)(d) - Right to clean and safe water in adequate quantities.",
    costingConsiderations: "Road Maintenance Levy utilization, PPP concession models, sovereign guarantees risk.",
    kenya2060Goal: "Fully integrated multi-modal transport and universal piped water grid across all 47 counties."
  },
  {
    id: "energy-power-tariffs",
    name: "Energy & Power Tariffs",
    iconName: "Zap",
    category: "Infrastructure & Tech",
    description: "Electricity retail tariffs, Independent Power Producer (IPP) contracts renegotiation, 100% renewable grid, geothermal expansion, and rural electrification.",
    keyQuestions: [
      "What specific mechanism will you use to lower electricity costs for households and industrial consumers to under $0.10/kWh?",
      "How will take-or-pay IPP thermal power purchase contracts be reformed legally without costly international arbitration?",
      "What is your plan for smart grid transmission modernization to eliminate nationwide blackouts?"
    ],
    benchmarkKPIs: ["Industrial & Domestic Tariff ($/kWh)", "Renewable Generation % (Target 100%)", "Transmission Loss Rate %", "System Average Interruption Duration (SAIDI)"],
    constitutionalAnchor: "Article 69 - Sustainable management of the environment and national resources.",
    costingConsiderations: "Kenya Power (KPLC) balance sheet restructuring, Ketraco transmission lines budget, IPP buyout penalties.",
    kenya2060Goal: "100% Green, ultra-reliable, cheapest industrial power in sub-Saharan Africa."
  },
  {
    id: "transport-public-transit",
    name: "Transport & Public Mobility",
    iconName: "Bus",
    category: "Infrastructure & Tech",
    description: "Bus Rapid Transit (BRT) in Nairobi and major metros, commuter rail modernization, matatu sector formalization, road safety (NTSA), and non-motorized transport.",
    keyQuestions: [
      "When and how will metropolitan Bus Rapid Transit (BRT) lines be fully operationalized with dedicated lanes?",
      "What is the strategy to reduce road traffic fatalities by at least 50%?",
      "How will the commuter railway network be extended to satellite towns (Thika, Ngong, Athi River, Limuru, Kitengela)?"
    ],
    benchmarkKPIs: ["Commute Time in Major Metros", "Annual Road Accident Fatalities (NTSA)", "Daily Commuter Rail Passengers", "Fleet Electrification % (e-Buses/e-Bikes)"],
    constitutionalAnchor: "Article 42 - Clean and healthy environment; Consumer protection (Article 46).",
    costingConsiderations: "Right-of-way acquisition, electric bus charging infrastructure, rail signaling upgrades.",
    kenya2060Goal: "Safe, rapid, zero-emission mass transit systems across all Kenyan metropolitan zones."
  },
  {
    id: "tech-ai-digital",
    name: "Technology, AI & Digital Transformation",
    iconName: "Cpu",
    category: "Infrastructure & Tech",
    description: "National fiber optic backbone, digital public infrastructure (e-Citizen), AI adoption in government and economy, data privacy (ODPC), and tech startups.",
    keyQuestions: [
      "How will you support Kenyan tech startups and AI innovators to build domestic digital sovereignty and global exports?",
      "What is your cybersecurity and citizen privacy framework for national digital IDs and e-Citizen payments?",
      "How will high-speed broadband be delivered to rural schools, health centers, and community digital hubs?"
    ],
    benchmarkKPIs: ["Internet Penetration & Broadband Affordability", "e-Government Services Adoption %", "Venture Capital Inflow to Kenyan Tech", "Digital Economy Share of GDP"],
    constitutionalAnchor: "Article 35 - Access to information; Article 31 - Right to privacy.",
    costingConsiderations: "Fiber backbone maintenance, cloud sovereign data center investments, digital skilling funds.",
    kenya2060Goal: "Silicon Savannah as Africa's premier global Artificial Intelligence and software innovation capital."
  },
  {
    id: "exports-competitiveness",
    name: "Exports & International Competitiveness",
    iconName: "Globe2",
    category: "Economy & Jobs",
    description: "Trade balance deficit, African Continental Free Trade Area (AfCFTA), EAC integration, bilateral trade deals (US, EU, UK, China, UAE), and export diversification.",
    keyQuestions: [
      "How will you narrow Kenya's persistent trade deficit by expanding high-value manufactured and services exports?",
      "What is your plan to maximize Kenyan exporters' utilization of AfCFTA tariff concessions across Africa?",
      "How will non-tariff barriers and customs delays at borders (Malaba, Busia, Namanga) be eradicated?"
    ],
    benchmarkKPIs: ["Export-to-Import Ratio", "Non-Traditional Exports Volume", "AfCFTA Intra-African Trade Volume", "Current Account Balance (% of GDP)"],
    constitutionalAnchor: "Article 2(5) - General rules of international law form part of the law of Kenya.",
    costingConsiderations: "Export Promotion Council funding, bilateral trade negotiation capacity, standards certification labs.",
    kenya2060Goal: "Export powerhouse driving a persistent trade surplus with balanced global partners."
  },
  {
    id: "devolution-counties",
    name: "Devolution & 47 County Development",
    iconName: "MapPin",
    category: "Governance & Sovereignty",
    description: "Equitable revenue share, timely Exchequer disbursements, County Own-Source Revenue (OSR), Ward Development Funds, intergovernmental relations.",
    keyQuestions: [
      "How will your administration eliminate chronic National Treasury delays in disbursing equitable share funds to the 47 counties?",
      "Will you increase the equitable share allocation above the constitutional 15% minimum threshold?",
      "How will county own-source revenue collection be automated to end leakage without stifling local traders?"
    ],
    benchmarkKPIs: ["Timeliness of County Exchequer Releases (Days)", "County Own-Source Revenue (OSR) Growth", "County Development vs Recurrent Spending Ratio (Target >30%)", "Audit Queries by Auditor-General"],
    constitutionalAnchor: "Chapter 11 (Articles 174-200) - Objects and principles of devolved government; Article 202 - Equitable sharing of national revenue.",
    costingConsiderations: "National budget reallocations to counties, county capacity building, ward-level project funds.",
    kenya2060Goal: "47 economically autonomous, flourishing county engines with zero regional marginalization."
  },
  {
    id: "climate-resilience-asal",
    name: "Climate Resilience, ASAL & Environment",
    iconName: "SunDim",
    category: "Governance & Sovereignty",
    description: "Drought and flood emergency mitigation in Arid and Semi-Arid Lands (ASAL), tree planting & forest cover, carbon credits, water pans, and climate finance.",
    keyQuestions: [
      "What permanent water harvesting and livestock value chain investments will end cyclical famine in the 23 ASAL counties?",
      "How will Kenya access transparent global climate loss-and-damage and carbon finance without predatory debt?",
      "What is your urban flood management masterplan to prevent loss of lives and infrastructure destruction during El Niño events?"
    ],
    benchmarkKPIs: ["National Forest & Tree Cover %", "Livestock Off-take and Insurance Coverage in ASAL", "Climate Finance Mobilized (Grants vs Debt)", "Disaster Response Time (Hours)"],
    constitutionalAnchor: "Article 42 - Right to a clean and healthy environment; Article 69 - Obligations in respect of the environment.",
    costingConsiderations: "National Drought Management Authority budget, carbon credit benefit-sharing frameworks.",
    kenya2060Goal: "Climate-resilient green nation with thriving pastoralist economies and 30%+ forest canopy."
  },
  {
    id: "corruption-integrity",
    name: "Corruption & Institutional Integrity",
    iconName: "ShieldAlert",
    category: "Governance & Sovereignty",
    description: "Ethics and Anti-Corruption Commission (EACC), Chapter 6 enforcement, judicial independence, asset recovery (ARA), wealth declarations, and political financing.",
    keyQuestions: [
      "What concrete reforms will empower EACC, DPP, and the Judiciary to secure convictions and recover stolen assets within 12 months?",
      "How will public officers' wealth declarations be made open to public scrutiny as mandated by transparency principles?",
      "What is your plan to prevent state capture and the monetized buying of nominations and votes?"
    ],
    benchmarkKPIs: ["Transparency International Corruption Perceptions Index", "Stolen Assets Recovered (KES Billions)", "High-Profile Conviction Rate", "Judiciary Budget Independence Ratio"],
    constitutionalAnchor: "Chapter 6 (Articles 73-80) - Leadership and Integrity; Article 10 - National Values; Article 79 - EACC.",
    costingConsiderations: "Financial intelligence center tooling, asset recovery operations, whistleblower protection rewards.",
    kenya2060Goal: "Zero-tolerance integrity benchmark where public office is an accountable trust, not an avenue for enrichment."
  },
  {
    id: "procurement-transparency",
    name: "Public Procurement & Open Contracting",
    iconName: "FileCheck2",
    category: "Governance & Sovereignty",
    description: "Public Procurement and Asset Disposal Act, end-to-end e-Procurement, beneficial ownership disclosure, AGPO (youth/women/PWD quota), and pending bills.",
    keyQuestions: [
      "How will you enforce 100% transparent open contracting and publish beneficial ownership of all state suppliers?",
      "What is your automated audit system to verify and clear the over KES 600 Billion in verified national and county pending bills?",
      "How will the 30% Access to Government Procurement Opportunities (AGPO) for youth and women be protected from fronting by powerful cartels?"
    ],
    benchmarkKPIs: ["% Public Contracts on Open Contracting Data Standard (OCDS)", "Pending Bills Clearance Velocity", "% AGPO Realized by Genuine Youth/Women", "Procurement Price Variance from Market Benchmarks"],
    constitutionalAnchor: "Article 227 - Procurement of public goods and services shall be in accordance with a system that is fair, equitable, transparent, competitive and cost-effective.",
    costingConsiderations: "e-Procurement software architecture, market price indexing team budget.",
    kenya2060Goal: "World-leading frictionless, transparent open procurement saving over KES 200 Billion annually in waste."
  },
  {
    id: "security-border-sovereignty",
    name: "National Security & Border Integrity",
    iconName: "Shield",
    category: "Governance & Sovereignty",
    description: "Counter-terrorism (Al-Shabaab), banditry in North Rift, police welfare and modernization, human rights compliance, and maritime/border security.",
    keyQuestions: [
      "What multi-pronged security and socio-economic strategy will permanently end cattle rustling and banditry in the North Rift?",
      "How will recommendations on police welfare, equipment, and oversight (IPOA) be fully implemented?",
      "What is the defense posture to safeguard Kenya's borders, blue economy maritime exclusive economic zone, and regional peacekeeping commitments?"
    ],
    benchmarkKPIs: ["Fatalities from Banditry & Terrorism", "IPOA Case Resolution Rate", "Police-to-Citizen Welfare Index", "Border Trade Security Score"],
    constitutionalAnchor: "Chapter 14 (Articles 238-247) - National Security Organs; Article 238 - Principles of national security.",
    costingConsiderations: "Security modernization budget, police medical insurance and housing, community peacebuilding.",
    kenya2060Goal: "Peaceful, secure sovereign republic with professional, human-rights-respecting security services."
  },
  {
    id: "foreign-policy-trade",
    name: "Foreign Policy & Pan-African Integration",
    iconName: "Compass",
    category: "Governance & Sovereignty",
    description: "Kenya's leadership in EAC, IGAD, and African Union, economic diplomacy, diaspora engagement and protection, and non-aligned multilateralism.",
    keyQuestions: [
      "How will Kenyan foreign missions be re-oriented to prioritize direct trade, FDI, and diaspora remittances over ceremonial diplomacy?",
      "What is your policy on labor migration bilateral agreements to protect Kenyan workers in the Middle East and abroad?",
      "How will Kenya navigate global geopolitical rivalries (US-China-EU-BRICS) to maximize national strategic interest?"
    ],
    benchmarkKPIs: ["Annual Diaspora Remittances ($ Billions)", "FDI Inflows ($ Billions)", "Kenyan Leadership in Regional Peace & Trade Bodies", "Bilateral Labor Agreement Protections"],
    constitutionalAnchor: "Article 2 - International treaties ratified by Kenya; Article 132(1)(c) - Promotion of international relations.",
    costingConsiderations: "Commercial attaché deployment, diaspora consular support technology.",
    kenya2060Goal: "Respected Pan-African diplomatic and commercial powerhouse shaping continental destiny."
  },
  {
    id: "social-protection-vulnerable",
    name: "Social Protection & Safety Nets",
    iconName: "HandHeart",
    category: "Social & Human Capital",
    description: "Inua Jamii cash transfer program (elderly, orphans, PWDs), hunger safety net programs, disability inclusion, and pension system sustainability.",
    keyQuestions: [
      "How will you ensure Inua Jamii cash transfers are disbursed on the 1st of every month without months of humiliating delays?",
      "What is the plan to expand coverage to vulnerable informal-sector gig workers and destitute families?",
      "How will the National Social Security Fund (NSSF) and private pension coverage be safeguarded from political interference?"
    ],
    benchmarkKPIs: ["Inua Jamii Timeliness & Coverage %", "Poverty Headcount Ratio (KNBS)", "Disability Accessibility Index in Public Buildings", "Informal Pension Enrollment"],
    constitutionalAnchor: "Article 43(3) - The State shall provide appropriate social security to persons who are unable to support themselves and their dependants.",
    costingConsiderations: "Consolidated Social Protection Fund, biometric verification systems.",
    kenya2060Goal: "Universal social safety net guaranteeing every Kenyan basic dignity throughout their entire life cycle."
  }
];
