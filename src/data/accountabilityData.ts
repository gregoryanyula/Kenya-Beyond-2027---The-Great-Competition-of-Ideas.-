import { 
  GovernmentAccountabilityItem, 
  OppositionAlternativeItem, 
  CandidateEvaluationCriteria, 
  FactCheckClassification,
  PartyManifestoDomainComparison,
  BudgetYearTrend,
  SectorAbsorptionData,
  PolicyVsPromiseItem
} from "../types";

export const GOVERNMENT_ACCOUNTABILITY_DATA: GovernmentAccountabilityItem[] = [
  {
    id: "gov-housing",
    domain: "Affordable Housing",
    title: "Affordable Housing Program & Mandatory Housing Levy",
    manifestoPromise: "Construct 200,000 affordable housing units annually across all 47 counties to bridge the 2 million urban housing deficit.",
    whatHappened: "Over 110,000 units are under various stages of construction nationwide (e.g., Mukuru, Pangani, Park Road, Kibera, Nakuru, Mavoko). The Affordable Housing Act 2024 was enacted following court challenges, introducing a 1.5% gross salary levy on employees matched by 1.5% by employers, plus 1.5% on non-salaried income.",
    costAndFinancing: "Financed primarily via the dedicated Affordable Housing Levy (over KES 65B mobilized annually) plus private sector EPC+F developer concessions.",
    whatRemains: "Handover velocity needs to match the 200,000/year pace. The off-take and allocation mechanism must be transparently audited to guarantee bottom-of-the-pyramid accessibility for families earning below KES 20,000/month.",
    deliveryStatus: "In Progress",
    externalVsGovFactors: "Early project timelines were delayed by protracted constitutional litigations over the initial Finance Act provisions, as well as high cement and steel import costs.",
    officialExplanation: "The government states that construction creates immediate artisan jobs (masonry, plumbing, steel) and builds long-term urban capital assets.",
    independentEvidenceStatus: "Verified through site audits, Boma Yangu platform listings, and Parliamentary Committee on Housing oversight reports.",
    sources: ["Affordable Housing Act 2024", "National Housing Corporation (NHC)", "Boma Yangu Portal", "Parliamentary Hansard Reports"]
  },
  {
    id: "gov-hustler-fund",
    domain: "Employment & Youth Opportunities",
    title: "Financial Inclusion Fund (Hustler Fund)",
    manifestoPromise: "Establish a KES 50 Billion annual financial inclusion fund providing collateral-free credit at single-digit interest rates (under 8% p.a.) to micro-enterprises and informal traders.",
    whatHappened: "Launched in November 2022. Over KES 60 Billion disbursed across individual and group micro-credit products, reaching over 22 million unique borrowers. Introduced a mandatory 5% savings component (70% long-term pension, 30% short-term savings).",
    costAndFinancing: "Funded through statutory budget appropriations and managed via mobile network operator APIs.",
    whatRemains: "Default and non-performing loan rates on individual micro-loans have been elevated (estimated 20-30%). Transitioning repeat borrowers from small KES 1,000 micro-loans to substantial commercial enterprise growth capital remains the principal hurdle.",
    deliveryStatus: "In Progress",
    externalVsGovFactors: "High cost of living and informal sector liquidity shocks reduced borrowers' cash flow velocity.",
    officialExplanation: "The government emphasizes that it dismantled predatory mobile lending cartels charging up to 300% annualized interest, onboarded millions to formal credit bureaus, and created the nation's largest micro-pension nest egg.",
    independentEvidenceStatus: "Verified via Central Bank of Kenya financial inclusion data, Financial Inclusion Fund statutory reports, and Auditor-General filings.",
    sources: ["Central Bank of Kenya Annual Report", "Financial Inclusion Fund Act", "Office of the Auditor-General Report"]
  },
  {
    id: "gov-health-sha",
    domain: "Healthcare & Universal Health Coverage",
    title: "Social Health Authority (SHA/SHIF) Healthcare Transition",
    manifestoPromise: "Replace the fragmented National Health Insurance Fund (NHIF) with Universal Health Coverage funded progressively, establishing a Primary Healthcare Fund, Social Health Insurance Fund, and Emergency/Chronic Illness Fund.",
    whatHappened: "The Social Health Insurance Act 2023 was passed, creating the SHA with a 2.75% household income contribution. The transition faced operational teething issues in late 2024, including hospital portal downtimes, biometric verification snags, and pre-authorization delays for specialized oncology and dialysis patients.",
    costAndFinancing: "Contributions of 2.75% of income with a KES 300 minimum for informal households, supplemented by Exchequer allocations for indigent and emergency pools.",
    whatRemains: "Full stabilization of private and faith-based healthcare provider claim reimbursements (clearing legacy NHIF debt >KES 30B), biometric onboarding for indigent households, and seamless emergency care access.",
    deliveryStatus: "Under Scrutiny",
    externalVsGovFactors: "System transition complexity across thousands of public, private, and faith-based health centers; legal petitions on system readiness and tariff structures.",
    officialExplanation: "The Ministry of Health notes that the old NHIF had massive leakages, excluded the indigent, and favored curative urban tertiary facilities over preventive primary healthcare networks.",
    independentEvidenceStatus: "Verified through Kenya Medical Practitioners and Dentists Union (KMPDU) reports, Christian Health Association of Kenya (CHAK), and Kenya Association of Private Hospitals (KAPH).",
    sources: ["Social Health Insurance Act 2023", "Ministry of Health Policy Directives", "Auditor-General Special Audit on NHIF Transition"]
  },
  {
    id: "gov-fertilizer",
    domain: "Agriculture & Food Security",
    title: "National Subsidized Fertilizer Program & e-Vouchers",
    manifestoPromise: "Reduce fertilizer prices from over KES 6,500 per 50kg bag to KES 2,500, digitizing distribution via an e-voucher farmer registry to double national grain production.",
    whatHappened: "Fertilizer price was reduced first to KES 3,500 and then to KES 2,500 per 50kg bag. Over 6 million farmers were registered digitally on the Kenya Integrated Agriculture Management Information System (KIAMIS), with millions of bags distributed through NCPB depots and cooperative stores.",
    costAndFinancing: "Direct budgetary subsidy appropriations through the State Department for Crop Development (approx. KES 15B–20B annually).",
    whatRemains: "Quality control enforcement (addressing incidents of substandard/adulterated fertilizer reported in early 2024), expanding soil-specific nutrient blends, and scaling post-harvest storage silos to absorb bumper harvests.",
    deliveryStatus: "Completed",
    externalVsGovFactors: "Global fertilizer price fluctuations driven by geopolitical disruptions in Eastern Europe and Red Sea shipping freight spikes.",
    officialExplanation: "The government credits the input subsidy and favorable rains for increased maize production from 34 million bags in 2022 to over 47 million bags in subsequent seasons, reducing reliance on emergency grain imports.",
    independentEvidenceStatus: "Confirmed through National Cereals and Produce Board (NCPB) distribution logs, KNBS Food Balance Sheets, and Kenya Agricultural and Livestock Research Organization (KALRO) field assessments.",
    sources: ["KNBS Economic Survey", "NCPB Distribution Ledgers", "State Department for Crop Development Subsidized Fertilizer Reports"]
  },
  {
    id: "gov-debt-eurobond",
    domain: "National Debt & Public Finance",
    title: "Eurobond 2024 Maturity Buyback & Debt Re-profiling",
    manifestoPromise: "Avert sovereign debt default, avoid debt restructuring that triggers credit downgrades, and re-profile debt from expensive short-term commercial loans to concessional long-term funding.",
    whatHappened: "Kenya successfully bought back $1.5 Billion of the maturing $2 Billion June 2024 Eurobond in February 2024 using a new $1.5B 2031 Eurobond issuance, multilateral budget support from the World Bank (DPO) and IMF (EFF/ECF), and bilateral syndicated facilities, avoiding sovereign default.",
    costAndFinancing: "The new Eurobond came at an elevated coupon yield of ~10.375% (reflecting tight global interest rate conditions), while IMF/World Bank loans were at concessional ~2-3% rates.",
    whatRemains: "Managing the domestic debt maturity wall and lowering the national debt service ratio, which continues to consume over 55-60% of ordinary tax revenue.",
    deliveryStatus: "Completed",
    externalVsGovFactors: "Aggressive US Federal Reserve and global central bank rate hikes between 2022-2024 restricted frontier market bond liquidity worldwide.",
    officialExplanation: "The National Treasury emphasized that preventing sovereign default preserved access to international capital markets and trade credit lines for Kenyan importers.",
    independentEvidenceStatus: "Verified through Central Bank of Kenya debt bulletins, National Treasury Medium-Term Debt Management Strategy, and credit rating agency assessments (Moody's, S&P, Fitch).",
    sources: ["National Treasury Annual Public Debt Report", "Central Bank of Kenya Weekly Bulletins", "IMF Country Review Reports"]
  }
];

export const OPPOSITION_ACCOUNTABILITY_DATA: OppositionAlternativeItem[] = [
  {
    id: "opp-taxation-finance",
    domain: "Taxation & Revenue Systems",
    criticismRaised: "Opposition criticized excessive taxation, the Housing Levy, increased fuel VAT (16%), and proposed agricultural/withholding levies, arguing they cripple disposable household income and kill businesses.",
    proposedAlternative: "Reduce overall tax burden by expanding the tax base through business formalization, eliminating wasteful government spending (cutting non-essential foreign travel, administrative overheads, and non-constitutional offices), and lowering fuel VAT back to 8%.",
    costEstimate: "Revenue reduction of approximately KES 180B–220B annually from lowered rates and cancelled levies.",
    financingSource: "Proposes filling the fiscal gap via: 1) Cutting recurrent executive/legislative waste (KES 100B), 2) Aggressive recovery of tax evasion and illicit financial flows (KES 80B), 3) Reallocating non-priority capital spending.",
    empiricalEvidence: "Cites the Laffer Curve principle—arguing that excessively high tax rates lead to business closures, cross-border smuggling, and reduced aggregate revenue collections.",
    implementationMechanism: "Introduction of an Emergency Tax Harmonization & Economic Recovery Bill in Parliament to repeal punitive excise taxes and enact a stable 5-year National Tax Policy charter.",
    tradeOffsForCitizens: "Lower tax pressure on households, but necessitates strict public spending cuts that could slow down state-funded infrastructure and civil service expansion.",
    rigorLevel: "High Detail (Costed)"
  },
  {
    id: "opp-cost-of-living-subsidy",
    domain: "Cost of Living",
    criticismRaised: "Opposition argued that input subsidies take too long to translate into lower retail food prices and that immediate consumer subsidies on staple maize flour (unga) and cooking gas are necessary during crises.",
    proposedAlternative: "Implement targeted consumer food price subsidies and zero-rate VAT on all basic household essentials (ungas, sanitary pads, medicines, bread, baby food) alongside zero-rating farm inputs at source.",
    costEstimate: "Estimated direct consumer subsidy cost of KES 30B–45B per fiscal year during emergency periods.",
    financingSource: "Consolidated Emergency Price Stabilization Fund financed through petroleum development levy reallocations and budget rationalization.",
    empiricalEvidence: "Points to targeted safety-net food voucher programs in Brazil (Bolsa Família) and emergency basic basket protections in South Africa.",
    implementationMechanism: "Direct price stabilization subsidies through designated retail and wholesale millers and consumer cooperatives.",
    tradeOffsForCitizens: "Immediate lower shelf prices, but risk of fiscal leakages, hoarding by unscrupulous millers, and high ongoing fiscal subsidy burdens on the Exchequer.",
    rigorLevel: "Medium Detail (Partial Plan)"
  },
  {
    id: "opp-devolution-revenue",
    domain: "Devolution & 47 Counties",
    criticismRaised: "Opposition strongly censured national government delays in releasing county funds, arguing that the National Treasury intentionally starves devolved units to centralize power and stifle county hospitals.",
    proposedAlternative: "Legally mandate the direct automatic transfer of county equitable share on the 15th of every month directly from the Consolidated Fund via the Central Bank of Kenya without Treasury discretion, and increase equitable share from 15% to 35% of national revenue.",
    costEstimate: "Increases county equitable share from approx KES 385B/year to over KES 600B/year (+KES 215B reallocation).",
    financingSource: "Corresponding reduction in National Government ministries executing functions devolved under the Fourth Schedule (such as agriculture, health, local roads, and water).",
    empiricalEvidence: "Cites historical devolution studies and the Building Bridges Initiative / Devolution Council fiscal modeling demonstrating faster grassroot capital deployment.",
    implementationMechanism: "Constitutional amendment to Article 203 or enactment of an Intergovernmental Fiscal Autonomy and Automatic Disbursement Act.",
    tradeOffsForCitizens: "Significantly stronger county services and hospital autonomy, but requires downsizing national ministries and managing county-level procurement audit risks.",
    rigorLevel: "High Detail (Costed)"
  },
  {
    id: "opp-education-cbc-hef",
    domain: "Education & Skills",
    criticismRaised: "Criticism that the new University Funding Model (HEF) with its Means Testing Instrument (MTI) unfairly categorizes needy students as wealthy and denies them scholarships, while CBC Junior Secondary lacks adequate science labs and teachers.",
    proposedAlternative: "Abolish the tiered Means Testing Instrument; restore flat capitation grants for all university students, absorb all qualified unemployed teachers into permanent and pensionable contracts, and build standardized Junior Secondary science laboratories in every primary school.",
    costEstimate: "Estimated KES 65B additional annual appropriation for university capitation and permanent teacher hiring.",
    financingSource: "Reallocating funds from duplicated state corporations, curbing corrupt procurement loopholes, and ring-fencing Education from budget cuts.",
    empiricalEvidence: "Draws on Nordic universal higher education models and historical Kenya universal primary education benchmarks.",
    implementationMechanism: "Reversal of Cabinet HEF guidelines and emergency parliamentary supplementary budget for Teachers Service Commission (TSC).",
    tradeOffsForCitizens: "Free and equitable university and basic education, but requires finding KES 65B in new sustainable revenue or reducing other sector budgets.",
    rigorLevel: "Medium Detail (Partial Plan)"
  }
];

export const CANDIDATE_EVALUATION_CRITERIA: CandidateEvaluationCriteria[] = [
  {
    category: "1. Policy Depth & 13-Point Test Compliance",
    weight: "25%",
    description: "Whether proposals provide clear problem definition, exact mechanics, realistic costing, revenue sources, and measurable KPIs.",
    benchmarkQuestions: [
      "Does the candidate's manifesto provide a line-item budget table for every pledge?",
      "Has the candidate identified where the money will come from without escalating unsustainable debt?"
    ]
  },
  {
    category: "2. Constitutionalism & Rule of Law (Chapter 6 & Article 201)",
    weight: "20%",
    description: "Commitment to public finance integrity, judicial independence, Chapter 6 vetting, and protection of the Bill of Rights.",
    benchmarkQuestions: [
      "Does the candidate respect court rulings and institutional separation of powers?",
      "What is their personal record and proposed policy regarding public officer asset disclosures?"
    ]
  },
  {
    category: "3. Fiscal Realism & Debt Management",
    weight: "20%",
    description: "Realistic macroeconomic frameworks that reconcile revenue, expenditure, and the multi-year debt ceiling.",
    benchmarkQuestions: [
      "How does the economic blueprint balance revenue generation with citizen disposable income?",
      "What is the specific debt repayment and deficit containment roadmap?"
    ]
  },
  {
    category: "4. Institutional Team Depth vs Personality Cult",
    weight: "15%",
    description: "Whether the political party has credible policy teams, shadow cabinets, and sectoral experts rather than a one-man show.",
    benchmarkQuestions: [
      "Can the party showcase vetted policy leads in Economics, Health, Agriculture, and Tech?",
      "Is the party driven by democratic institutional consensus or purely an individual candidate's charisma?"
    ]
  },
  {
    category: "5. Kenya 2060 Long-term Continuity & National Unity",
    weight: "20%",
    description: "Commitment to national unity over ethnic mobilization, and continuing essential cross-administration national projects.",
    benchmarkQuestions: [
      "Does the campaign bridge Kenya's 47 counties without divisive regional or ethnic rhetoric?",
      "Which ongoing national infrastructure, green energy, and health programs will they complete rather than abandon?"
    ]
  }
];

export const FACT_CHECK_CLASSIFICATIONS: FactCheckClassification[] = [
  {
    type: "Fact",
    definition: "An objectively verifiable statement supported by reliable, authoritative empirical data, statutory records, or official statistics.",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-300",
    example: "Kenya's Constitution of 2010 mandates that at least 15% of all national revenue be allocated to the 47 county governments."
  },
  {
    type: "Claim",
    definition: "An assertion or pledge made by a political actor that requires substantiation, costing, or empirical proof before acceptance.",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
    example: "'Our plan will create 1 million industrial jobs in 12 months with zero increase in taxes.'"
  },
  {
    type: "Evidence",
    definition: "The documented data, audited reports, academic research, or comparative case studies cited to validate a claim.",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-300",
    example: "Auditor-General Annual County Reports detailing KES 18 Billion in uncollected own-source county revenue."
  },
  {
    type: "Analysis",
    definition: "Logical interpretation, economic modeling, or constitutional evaluation that connects evidence to policy outcomes.",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-300",
    example: "Projecting that raising corporate tax rates during a period of rising power tariffs will reduce private sector capital investments."
  },
  {
    type: "Uncertainty",
    definition: "Acknowledged data gaps, external macroeconomic variables, or geopolitical risks outside immediate policy control.",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-300",
    example: "Global crude oil price swings and Middle East shipping freight disruption impacting domestic fuel pump prices."
  },
  {
    type: "Recommendation",
    definition: "Constructive, actionable civic demands or policy adjustments citizens and media should propose to candidates.",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-300",
    example: "Demand that all presidential candidates submit their manifestos to the Parliamentary Budget Office for independent costing."
  }
];

export const PARTY_MANIFESTO_COMPARISONS: PartyManifestoDomainComparison[] = [
  {
    domainId: "taxation-economy",
    domainName: "Taxation, Fiscal Deficit & Revenue Systems",
    keyProblemStatement: "Kenya's debt service absorbs >55% of ordinary revenue, creating acute fiscal tension between raising taxes on hard-pressed citizens vs. ballooning budget deficits.",
    proposals: [
      {
        blocId: "incumbent",
        blocName: "Incumbent Administration / Coalition",
        coalitionOrParty: "Kenya Kwanza / UDA Alliance",
        coreProposalTitle: "Broaden Domestic Tax Base via Digital Integration & Dedicated Sector Levies",
        mechanism: "Expand tax net through e-TIMS electronic invoice integration for all businesses, mandatory Housing & Social Health levies, and enhanced compliance tracking via KRA APIs.",
        costEstimate: "Targets collecting KES 3.4 Trillion annually in ordinary revenue (approx 17.5% GDP ratio).",
        financingSource: "Statutory earmarked levies (Housing Act 2024, SHIF 2.75%) + reduced reliance on expensive commercial external Eurobonds.",
        empiricalEvidence: "Cites Rwanda and OECD tax compliance digital invoicing models (e-TIMS) generating +15% VAT collection uplift.",
        first100DaysAction: "Gazette updated Medium-Term Revenue Strategy (MTRS) and implement automated withholding VAT on online platforms.",
        tradeOffsAndRisks: "Risk of dampening consumer disposable income and encouraging informal cash transactions to evade e-TIMS.",
        rigorScore: 7.8,
        rigorBadge: "High (Fully Costed)"
      },
      {
        blocId: "main-opposition",
        blocName: "Main Parliamentary Opposition",
        coalitionOrParty: "Azimio Coalition / Alternative Coalition",
        coreProposalTitle: "Reduce Tax Rates, Repeal Dedicated Levies & Slash Executive Recurrent Overhead",
        mechanism: "Lower fuel VAT back to 8%, repeal the 1.5% Housing Levy, introduce progressive corporate tax breaks for youth employers, and close tax loopholes.",
        costEstimate: "Direct revenue reduction of KES 210B annually, offset by spending rationalization.",
        financingSource: "Cutting executive & parliamentary administrative overheads (KES 110B), recovering illicit financial flows (KES 60B), and reallocating capital projects.",
        empiricalEvidence: "Cites the Laffer Curve principle—lower rates increase business investments and spur formal GDP growth.",
        first100DaysAction: "Introduce the Emergency Tax Relief & Economic Recovery Bill in Parliament to repeal punitive excise taxes.",
        tradeOffsAndRisks: "Requires intense political discipline to actually cut state bureaucracy; failure to cut spending could blow out the fiscal deficit.",
        rigorScore: 7.2,
        rigorBadge: "Medium (Partial Plan)"
      },
      {
        blocId: "third-pole",
        blocName: "Independent / Third-Pole Reform Agenda",
        coalitionOrParty: "Independent Candidates / Emerging Parties",
        coreProposalTitle: "5-Year Predictable Tax Charter & Zero-Based Budgeting",
        mechanism: "Enact a binding 5-year constitutional tax freeze to give investors certainty, transition the national budget from incremental allocations to Zero-Based Budgeting (ZBB).",
        costEstimate: "Saves an estimated KES 180B in duplicated state agencies and non-performing state corporations.",
        financingSource: "Comprehensive restructuring and privatization of loss-making parastatals + competitive sovereign debt restructuring.",
        empiricalEvidence: "Draws on New Zealand's 1980s Public Finance Act and South Korea's institutional budgeting overhaul.",
        first100DaysAction: "Establish a Multi-Sectoral Public Expenditure Review Panel reporting directly to the Auditor-General.",
        tradeOffsAndRisks: "May encounter strong bureaucratic resistance from state corporation leadership and civil service unions.",
        rigorScore: 8.4,
        rigorBadge: "High (Fully Costed)"
      },
      {
        blocId: "civil-society",
        blocName: "Civil Society & Economic Think Tanks",
        coalitionOrParty: "Institute of Economic Affairs / Civic Coalition",
        coreProposalTitle: "Strict Article 201 Public Finance Audit & Wealth Disclosure Enforcement",
        mechanism: "Full compliance with Article 201(d) of the Constitution: public debt burden must be shared equitably between present and future generations; open public procurement beneficial ownership register.",
        costEstimate: "Administrative cost under KES 5B; potential corruption leakage prevention of KES 300B annually.",
        financingSource: "Reclaimed stolen public assets and heightened procurement transparency through Open Contracting Data Standard (OCDS).",
        empiricalEvidence: "Open Contracting Partnership data showing 12-18% cost reductions in public tender bid pricing.",
        first100DaysAction: "Publish the comprehensive national public debt audit register with all creditor names, terms, and project absorption records.",
        tradeOffsAndRisks: "Faces legal battles from entrenched procurement cartels and sovereign non-disclosure clauses.",
        rigorScore: 8.9,
        rigorBadge: "High (Fully Costed)"
      }
    ]
  },
  {
    domainId: "healthcare-sha",
    domainName: "Healthcare Financing & Universal Health Coverage",
    keyProblemStatement: "Out-of-pocket medical expenditure drives over 1.5 million Kenyans into poverty each year, while NHIF transition to SHA/SHIF has faced portal and reimbursement challenges.",
    proposals: [
      {
        blocId: "incumbent",
        blocName: "Incumbent Administration / Coalition",
        coalitionOrParty: "Kenya Kwanza / UDA Alliance",
        coreProposalTitle: "Social Health Authority (SHA): Primary Care + SHIF + Chronic Illness Fund",
        mechanism: "2.75% household income contribution (min KES 300/mo) covering primary healthcare for free at Level 2/3 facilities, with national pooling for emergency and catastrophic oncology/dialysis care.",
        costEstimate: "KES 140 Billion annual target pool across formal, informal, and indigent state-sponsored brackets.",
        financingSource: "2.75% mandatory statutory contributions + Exchequer funding for indigent and emergency pools.",
        empiricalEvidence: "Modeled on Thailand's Universal Coverage Scheme (UCS) and Philippine PhilHealth progressive risk pooling.",
        first100DaysAction: "Complete full digital biometric integration of all 10,000 public and private health facilities and settle verified legacy NHIF debts.",
        tradeOffsAndRisks: "Teething problems in provider claims payouts and resistance from salaried workers with private insurance top-ups.",
        rigorScore: 8.0,
        rigorBadge: "High (Fully Costed)"
      },
      {
        blocId: "main-opposition",
        blocName: "Main Parliamentary Opposition",
        coalitionOrParty: "Azimio Coalition / Alternative Coalition",
        coreProposalTitle: "Hybrid Universal Health Care (Baba Care) & Flat Capitation Model",
        mechanism: "Subsidized flat-rate healthcare scheme with direct county-level health facility block grants, ensuring all Level 4 & 5 county hospitals are stocked without patient co-pays.",
        costEstimate: "KES 110 Billion annually funded primarily from the Consolidated Fund rather than high payroll deductions.",
        financingSource: "General tax revenue allocation + sin taxes on alcohol, tobacco, and gaming earmarked for the National Health Basket.",
        empiricalEvidence: "Cites UK National Health Service (NHS) tax-funded universal baseline and Costa Rica's social security model.",
        first100DaysAction: "Abolish the 2.75% gross salary deduction and replace it with a sliding scale capped at 1.5% alongside a national drug supply buffer.",
        tradeOffsAndRisks: "Relying on general tax revenue makes health budgets vulnerable to national revenue shortfalls.",
        rigorScore: 7.4,
        rigorBadge: "Medium (Partial Plan)"
      },
      {
        blocId: "third-pole",
        blocName: "Independent / Third-Pole Reform Agenda",
        coalitionOrParty: "Independent Candidates / Emerging Parties",
        coreProposalTitle: "Devolved Health Autonomy & County Hospital Direct Supply Chain",
        mechanism: "Decentralize healthcare procurement completely to the 47 counties; dismantle KEMSA monopoly to allow county hospital boards to procure quality generic medicines competitively.",
        costEstimate: "Saves KES 25B annually in expired medicine losses and inflated medical supply markups.",
        financingSource: "Direct redirection of national Ministry of Health recurrent budget to County Health Services boards.",
        empiricalEvidence: "Decentralized procurement in Scandinavian municipal health boards producing 98% essential drug availability.",
        first100DaysAction: "Audit and restructure KEMSA into a national regulatory standards body rather than exclusive vendor.",
        tradeOffsAndRisks: "Requires strong county oversight to prevent 47 fragmented local procurement vulnerabilities.",
        rigorScore: 8.1,
        rigorBadge: "High (Fully Costed)"
      },
      {
        blocId: "civil-society",
        blocName: "Civil Society & Economic Think Tanks",
        coalitionOrParty: "Kenya Medical Association / Health Rights Coalition",
        coreProposalTitle: "Abuja Declaration 15% Budget Allocation & Community Health Workers Permanence",
        mechanism: "Fulfill Kenya's commitment to the African Union Abuja Declaration by allocating 15% of the National Budget to health, integrating all 100,000 Community Health Promoters (CHPs) with pensionable stipends.",
        costEstimate: "Increases total national health expenditure from ~8% to 15% (additional KES 120B/year).",
        financingSource: "Ring-fenced national health excise levy on processed sugars, fossil fuels, and luxury imports.",
        empiricalEvidence: "WHO evidence showing $1 invested in preventive community health yields $10 in productive economic output.",
        first100DaysAction: "Enact the National Community Health Workers Remuneration & Protection Charter.",
        tradeOffsAndRisks: "Requires substantial fiscal reallocation from physical infrastructure to human capital.",
        rigorScore: 8.7,
        rigorBadge: "High (Fully Costed)"
      }
    ]
  },
  {
    domainId: "education-youth",
    domainName: "Education, CBC Curriculum & University Funding (HEF)",
    keyProblemStatement: "The transition to Competency-Based Curriculum (CBC) and the Higher Education Funding (HEF) model's Means Testing Instrument (MTI) face public scrutiny over fairness and funding deficits.",
    proposals: [
      {
        blocId: "incumbent",
        blocName: "Incumbent Administration / Coalition",
        coalitionOrParty: "Kenya Kwanza / UDA Alliance",
        coreProposalTitle: "Means-Tested Higher Education Funding (HEF) + 56,000 Teacher Hirings",
        mechanism: "Target student scholarships & loans progressively into 5 vulnerability bands using household proxy data; construct 16,000 Junior Secondary classrooms nationwide.",
        costEstimate: "KES 680 Billion total education budget (largest sectoral allocation in East Africa).",
        financingSource: "Statutory Exchequer appropriations + Higher Education Loans Board (HELB) revolving fund repayments.",
        empiricalEvidence: "Progressive means testing ensures ultra-poor students receive 100% tuition coverage rather than subsidizing wealthy families equally.",
        first100DaysAction: "Refine MTI proxy variables and deploy digital appeal workflow for students placed in incorrect tuition bands.",
        tradeOffsAndRisks: "MTI algorithmic misclassifications and delays in treasury capitation releases to universities.",
        rigorScore: 7.9,
        rigorBadge: "High (Fully Costed)"
      },
      {
        blocId: "main-opposition",
        blocName: "Main Parliamentary Opposition",
        coalitionOrParty: "Azimio Coalition / Alternative Coalition",
        coreProposalTitle: "Universal University Tuition Grants & Immediate Absorption of All P1 Teachers",
        mechanism: "Abolish the Means Testing bands; restore universal flat capitation for all admitted university students; convert all intern teachers into permanent and pensionable contracts.",
        costEstimate: "Additional KES 65 Billion annually for university capitation and permanent teacher hiring.",
        financingSource: "Reallocating funds from duplicated state administrative offices and curbing procurement waste.",
        empiricalEvidence: "Historical Kenya Free Primary Education (2003) surge and Scandinavian universal tuition structures.",
        first100DaysAction: "Scrap the Higher Education Funding Portal and issue flat KES 60,000 per-student semester capitation directly to universities.",
        tradeOffsAndRisks: "High fiscal cost that must be sustained every year regardless of economic growth or debt cycles.",
        rigorScore: 7.1,
        rigorBadge: "Medium (Partial Plan)"
      },
      {
        blocId: "third-pole",
        blocName: "Independent / Third-Pole Reform Agenda",
        coalitionOrParty: "Independent Candidates / Emerging Parties",
        coreProposalTitle: "TVET-Industry Dual Apprenticeship & Digital AI Skill Endowment",
        mechanism: "Transform 300 TVET technical colleges into dual-education hubs partnering with German and regional industrial manufacturers; grant tax credits to firms training apprentices.",
        costEstimate: "KES 25 Billion over 3 years funded via public-private skill co-investments.",
        financingSource: "National Industrial Training Authority (NITA) levy reform and matching World Bank youth employability grants.",
        empiricalEvidence: "Germany and Switzerland Dual VET model producing youth unemployment rates below 6%.",
        first100DaysAction: "Sign bilateral employer apprenticeships with Kenya Association of Manufacturers (KAM) and KEPSA.",
        tradeOffsAndRisks: "Takes 2-3 years for curriculum re-tooling to produce certified graduate cohort.",
        rigorScore: 8.6,
        rigorBadge: "High (Fully Costed)"
      },
      {
        blocId: "civil-society",
        blocName: "Civil Society & Economic Think Tanks",
        coalitionOrParty: "Elimu Yetu Coalition / Student Unions",
        coreProposalTitle: "Constitutional Ring-Fencing of Basic Education & Science Lab Parity",
        mechanism: "Legally mandate that 100% of Junior Secondary Schools have functional science and ICT laboratories before secondary school admissions; transparent student-led bursary boards.",
        costEstimate: "KES 40 Billion dedicated laboratory and digital infrastructure fund.",
        financingSource: "NG-CDF statutory reallocation earmarked specifically for educational science infrastructure.",
        empiricalEvidence: "UNESCO STEM benchmark showing practical lab exposure improves secondary math/science mastery by 40%.",
        first100DaysAction: "Publish an open geo-tagged infrastructure audit of every primary and junior secondary school in Kenya.",
        tradeOffsAndRisks: "Requires CDF committee compliance and reallocation away from non-educational constituency projects.",
        rigorScore: 8.5,
        rigorBadge: "High (Fully Costed)"
      }
    ]
  }
];

export const BUDGET_TRENDS_DATA: BudgetYearTrend[] = [
  {
    fiscalYear: "FY 2021/22",
    ordinaryRevenue: 1910,
    debtService: 890,
    developmentBudget: 620,
    recurrentExpenditure: 1450,
    countyEquitableShare: 370,
    fiscalDeficit: 830
  },
  {
    fiscalYear: "FY 2022/23",
    ordinaryRevenue: 2040,
    debtService: 1040,
    developmentBudget: 590,
    recurrentExpenditure: 1560,
    countyEquitableShare: 385,
    fiscalDeficit: 880
  },
  {
    fiscalYear: "FY 2023/24",
    ordinaryRevenue: 2410,
    debtService: 1320,
    developmentBudget: 570,
    recurrentExpenditure: 1680,
    countyEquitableShare: 385,
    fiscalDeficit: 850
  },
  {
    fiscalYear: "FY 2024/25 (Est)",
    ordinaryRevenue: 2750,
    debtService: 1420,
    developmentBudget: 610,
    recurrentExpenditure: 1790,
    countyEquitableShare: 400,
    fiscalDeficit: 760
  },
  {
    fiscalYear: "FY 2025/26 (Proj)",
    ordinaryRevenue: 3050,
    debtService: 1380,
    developmentBudget: 720,
    recurrentExpenditure: 1880,
    countyEquitableShare: 425,
    fiscalDeficit: 650
  },
  {
    fiscalYear: "FY 2026/27 (Target)",
    ordinaryRevenue: 3400,
    debtService: 1290,
    developmentBudget: 890,
    recurrentExpenditure: 1980,
    countyEquitableShare: 460,
    fiscalDeficit: 520
  }
];

export const SECTOR_ABSORPTION_DATA: SectorAbsorptionData[] = [
  {
    sector: "Education & Higher Learning",
    allocated: 680,
    actualAbsorbed: 652,
    absorptionRate: 95.8,
    keyBottleneck: "University capitation disbursement timing and Junior Secondary lab tenders."
  },
  {
    sector: "National Sovereign Debt Service",
    allocated: 1420,
    actualAbsorbed: 1410,
    absorptionRate: 99.3,
    keyBottleneck: "Statutory direct Consolidated Fund drawdowns (Zero discretionary delays)."
  },
  {
    sector: "Devolution (47 Counties)",
    allocated: 400,
    actualAbsorbed: 368,
    absorptionRate: 92.0,
    keyBottleneck: "Treasury exchequer release delays and county pending bills backlog."
  },
  {
    sector: "Infrastructure, Roads & Transport",
    allocated: 320,
    actualAbsorbed: 245,
    absorptionRate: 76.5,
    keyBottleneck: "Contractor pending bills, land compensation litigation, and counterpart funding."
  },
  {
    sector: "Healthcare (SHA, KNH & Programs)",
    allocated: 160,
    actualAbsorbed: 134,
    absorptionRate: 83.7,
    keyBottleneck: "KEMSA procurement processes and SHA claims verification portal transitions."
  },
  {
    sector: "Agriculture & Food Security",
    allocated: 85,
    actualAbsorbed: 69,
    absorptionRate: 81.2,
    keyBottleneck: "Fertilizer subsidy logistics and NCPB grain intake storage capacity."
  }
];

export const POLICY_VS_PROMISES_SCORECARD_DATA: PolicyVsPromiseItem[] = [
  {
    id: "pvs-taxation",
    sector: "Taxation & Public Finance",
    statedPromise: "Eliminate punitive taxes, cut fuel VAT from 16% to 8%, and stop public borrowing within 18 months.",
    historicalRecordOrEvidence: "National debt service requires >KES 1.3 Trillion annually. Lowering fuel VAT cuts ~KES 70B in revenue unless alternative expenditure cuts are gazetted.",
    lineItemCostAndFunding: "Unfunded KES 70B revenue gap. Needs explicit declaration of which ministry budgets will be slashed.",
    first100DayCommitment: "Table Emergency Finance Amendment Bill in the National Assembly.",
    article201Compliance: "Borderline",
    scoreOutOfTen: 6.2,
    citizenVerdict: "Popular slogan, but requires proof of spending cuts to avoid ballooning debt deficit."
  },
  {
    id: "pvs-housing",
    sector: "Affordable Housing",
    statedPromise: "Deliver 200,000 affordable housing units annually financed by the 1.5% gross salary statutory levy.",
    historicalRecordOrEvidence: "Over 110,000 units are under construction nationwide (Mukuru, Park Road, Kibera, Nakuru, Mavoko). Over KES 65B mobilized annually.",
    lineItemCostAndFunding: "Ring-fenced Housing Fund established by Affordable Housing Act 2024.",
    first100DayCommitment: "Handover first 15,000 units and publish transparent digitized lottery allocation list.",
    article201Compliance: "Compliant",
    scoreOutOfTen: 8.4,
    citizenVerdict: "Legally anchored and under active construction; must prove affordability for sub-20k earners."
  },
  {
    id: "pvs-health",
    sector: "Universal Healthcare (SHA)",
    statedPromise: "Replace out-of-pocket medical bills with 2.75% household contribution and free primary healthcare for all.",
    historicalRecordOrEvidence: "Social Health Authority established; hospital claims portal faced system teething problems and KES 30B legacy NHIF provider debt.",
    lineItemCostAndFunding: "KES 140B annual pool projected through formal + informal 2.75% deductions + indigent exchequer funding.",
    first100DayCommitment: "Clear verified provider debt and guarantee 100% pre-authorization for oncology/dialysis.",
    article201Compliance: "Compliant",
    scoreOutOfTen: 7.3,
    citizenVerdict: "Sound long-term structural architecture; delivery hinges on fixing claims settlement velocity."
  },
  {
    id: "pvs-devolution",
    sector: "Devolution & Counties",
    statedPromise: "Increase County equitable share to 35% of national revenue with automatic CBK releases on the 15th.",
    historicalRecordOrEvidence: "Current share is approx KES 400B (~15-18% of latest audited accounts). 35% requires increasing allocation to >KES 650B (+KES 250B).",
    lineItemCostAndFunding: "Requires transferring corresponding budgets from national ministries handling devolved functions.",
    first100DayCommitment: "Sponsor constitutional amendment to Article 203 and gazette automatic CBK transfer protocol.",
    article201Compliance: "Compliant",
    scoreOutOfTen: 8.1,
    citizenVerdict: "High constitutional merit; demands downscaling national ministries to free up KES 250B."
  },
  {
    id: "pvs-youth-jobs",
    sector: "Youth Jobs & Tech Hubs",
    statedPromise: "Create 1 million digital tech and AI annotation jobs for youth across 290 constituencies with single-digit credit.",
    historicalRecordOrEvidence: "Over 22 million Kenyans accessed Hustler Fund micro-credit; default rates high on small micro-loans; tech hubs expanding via ICT Authority.",
    lineItemCostAndFunding: "Funded through Universal Service Fund (USF) + statutory Financial Inclusion Fund appropriations.",
    first100DayCommitment: "Operationalize 100 constituency digital innovation labs with high-speed fiber and solar power.",
    article201Compliance: "Compliant",
    scoreOutOfTen: 7.7,
    citizenVerdict: "Viable infrastructure foundation; requires commercial contracts to translate training into sustained income."
  }
];

