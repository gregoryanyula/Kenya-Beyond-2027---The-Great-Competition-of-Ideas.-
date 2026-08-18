import { SloganTranslatorItem, CivicLiteracyModule, YouthExplainerSeriesCard } from "../types";

export const SLOGAN_TRANSLATORS: SloganTranslatorItem[] = [
  {
    id: "slogan-free-stuff",
    slogan: "“We will make university education completely free for everyone!”",
    commonContext: "Frequently heard at youth campaign rallies to generate instant emotional applause.",
    hiddenPitfall: "Universities require billions for professor salaries, modern STEM laboratories, electricity, and research. Declaring education 'free' without a dedicated ring-fenced revenue source leads to university insolvency, lecturer strikes, and collapsing quality.",
    theFivePlanQuestions: [
      "What is the exact annual budgetary cost (e.g., KES 60B–80B) to fund all universities?",
      "Which specific tax will be raised or which ministry budget will be cut to fund this?",
      "How will quality, lecturer salaries, and research laboratories be maintained?",
      "What is the allocation criteria between needy students and wealthy families?",
      "What is the legislative bill being proposed to anchor this permanently in law?"
    ],
    actionableCitizenDemand: "Show us the line-item costing in the MTEF budget. Do not promise 'free' without showing the funding source."
  },
  {
    id: "slogan-one-million-jobs",
    slogan: "“We will create 1,000,000 formal jobs every single year!”",
    commonContext: "Standard campaign promise targeting unemployed youth and recent graduates.",
    hiddenPitfall: "Governments do not directly employ millions in the civil service without bankrupting the wage bill. Real sustainable jobs come from private sector manufacturing, technology, agriculture value addition, and SME expansion.",
    theFivePlanQuestions: [
      "What percentage of these jobs will be government public works vs private sector industrial hiring?",
      "What specific policies (power tariffs, tax certainty, access to credit) will unlock private enterprise hiring?",
      "What minimum wage, pension, and health insurance will accompany these jobs?",
      "Which sectors (tech, textiles, agro-processing, tourism) have been modeled to absorb these workers?",
      "What is the empirical track record of the proposed apprenticeship model?"
    ],
    actionableCitizenDemand: "Tupatie industrial policy. Which factories are being built, who is investing, and where is the market demand?"
  },
  {
    id: "slogan-lower-taxes-all",
    slogan: "“We will slash all taxes on day one to lower the cost of living!”",
    commonContext: "Appeals to taxpayers fatigued by high fuel VAT, housing levy, and income taxes.",
    hiddenPitfall: "If tax rates are cut without reducing government expenditure or public debt payments, the fiscal deficit balloons, forcing the government to borrow more at high interest rates, causing severe inflation and currency depreciation.",
    theFivePlanQuestions: [
      "How much revenue will the government lose from these tax cuts (e.g., KES 250 Billion)?",
      "Which government expenditures (foreign trips, large delegations, stalled projects, civil service) will be cut simultaneously?",
      "How will sovereign debt service payments (over KES 1 Trillion annually) be paid without this tax revenue?",
      "Will borrowing increase, and if so, at what interest rate?",
      "What is the timeline for enacting the National Tax Policy to ensure predictability?"
    ],
    actionableCitizenDemand: "Show me the fiscal reconciliation balance sheet. Lower taxes require lower expenditure or alternative non-debt financing."
  },
  {
    id: "slogan-end-corruption-100-days",
    slogan: "“I will end corruption completely within my first 100 days in office!”",
    commonContext: "A populist pledge that ignores constitutional checks, judicial procedures, and institutional realities.",
    hiddenPitfall: "Under Kenya's 2010 Constitution, the President cannot unilaterally jail people. Investigations are done by EACC/DCI, prosecutions by ODPP, and trials by the independent Judiciary. Ending corruption requires institutional reform, digital procurement, and judicial funding, not presidential fiat.",
    theFivePlanQuestions: [
      "Will you increase the Judiciary's budget to at least 2.5% of the national budget for specialized anti-corruption courts?",
      "What legislative amendments to the Leadership & Integrity Act will you sponsor in Parliament?",
      "Will you mandate 100% open public access to wealth declarations of all public officers?",
      "What is your plan to implement automated e-procurement that prevents human manipulation of tenders?",
      "How will the Ethics and Anti-Corruption Commission (EACC) be insulated from political interference?"
    ],
    actionableCitizenDemand: "Do not give us bravado. Give us institutional independence, whistleblower protection, and automated open procurement."
  },
  {
    id: "slogan-subsidize-everything",
    slogan: "“We will subsidize unga, fuel, and electricity immediately!”",
    commonContext: "Offered during periods of high inflation to provide quick psychological relief.",
    hiddenPitfall: "Consumer subsidies paid directly to commercial cartels often create artificial shortages, hoarding, and massive fiscal debt arrears without boosting domestic agricultural production or reducing long-term energy generation costs.",
    theFivePlanQuestions: [
      "Is this a consumption subsidy or a production/supply-side subsidy (e.g., fertilizer, irrigation)?",
      "How much will the Treasury pay per month to sustain this subsidy?",
      "How will price stabilization be monitored to ensure middlemen do not pocket the subsidy?",
      "What is the exit strategy when international commodity prices rise?",
      "Why not invest the same billions in domestic storage silos and renewable geothermal power generation?"
    ],
    actionableCitizenDemand: "Subsidize farm productivity and green power transmission, not middlemen and import cartels."
  }
];

export const CIVIC_LITERACY_MODULES: CivicLiteracyModule[] = [
  {
    id: "module-constitution-article201",
    title: "Article 201: The Sovereign Rules of Public Finance",
    subtitle: "Why every shilling borrowed or spent belongs to the Kenyan citizen",
    category: "Constitution",
    keyConcept: "Article 201 of the 2010 Constitution sets binding, non-negotiable principles that govern all public spending, taxation, and debt.",
    breakdownPoints: [
      {
        heading: "Openness, Accountability & Public Participation",
        detail: "Article 201(a) mandates that there shall be openness and accountability, including public participation in financial matters. No tax or loan can be passed in secrecy.",
        articleCitation: "Article 201(a)"
      },
      {
        heading: "Fair Sharing of Tax Burdens",
        detail: "Article 201(b)(i) dictates that the burden of taxation shall be shared fairly across income brackets, preventing unfair concentration of taxes on formal workers or vulnerable citizens.",
        articleCitation: "Article 201(b)(i)"
      },
      {
        heading: "Inter-Generational Equity in Public Debt",
        detail: "Article 201(c) explicitly requires that the burdens and benefits of public borrowing must be shared equitably between present and future generations. Governments cannot borrow to fund lavish recurrent consumption.",
        articleCitation: "Article 201(c)"
      },
      {
        heading: "Prudent & Responsible Resource Management",
        detail: "Article 201(d) states that public money shall be used in a prudent and responsible way, backed by clear fiscal reporting by the Controller of Budget and Auditor-General.",
        articleCitation: "Article 201(d)"
      }
    ],
    actionQuestionForLeaders: "Does this campaign proposal comply with Article 201 inter-generational equity and public participation standards?",
    infographicSnippet: "Article 201 is Kenya's constitutional fiscal shield: Openness + Fair Taxation + Prudent Debt + Inter-Generational Equity."
  },
  {
    id: "module-budget-cycle",
    title: "The National Budget Calendar: From Planning to Spending",
    subtitle: "How Kenya's KES 4 Trillion national budget is formed, vetted, and released",
    category: "Public Finance & Debt",
    keyConcept: "Understanding the 12-month budget cycle empowers citizens to intervene before laws are passed, not after.",
    breakdownPoints: [
      {
        heading: "August – October: Budget Circular & Sector Hearings",
        detail: "National Treasury issues guidelines and ministries hold public sector working group hearings to defend their departmental spending targets.",
        articleCitation: "PFM Act Sec 35"
      },
      {
        heading: "February 15: Budget Policy Statement (BPS)",
        detail: "Treasury submits the BPS to Parliament outlining macroeconomic projections, total revenue targets, debt ceiling ceilings, and allocation caps between National & Counties.",
        articleCitation: "PFM Act Sec 25"
      },
      {
        heading: "April 30: Budget Estimates & Finance Bill",
        detail: "Cabinet Secretaries submit itemized line-by-line spending estimates and the Finance Bill detailing proposed tax rate changes.",
        articleCitation: "Article 221"
      },
      {
        heading: "May – June: Public Participation & Appropriations Act",
        detail: "Parliamentary committees hold mandatory public hearings. Parliament must pass the Appropriations Bill by June 30 to authorize spending for the new fiscal year starting July 1.",
        articleCitation: "Article 222"
      },
      {
        heading: "Quarterly: Controller of Budget & Auditor-General Oversight",
        detail: "The Controller of Budget (COB) approves all Exchequer withdrawals, while the Auditor-General audits every ministry and county after the fiscal year closes.",
        articleCitation: "Articles 228 & 229"
      }
    ],
    actionQuestionForLeaders: "Where in the Budget Policy Statement (BPS) and Medium-Term Expenditure Framework (MTEF) will your campaign pledge be funded?",
    infographicSnippet: "Budget Calendar: Aug (Circular) → Feb (BPS) → April (Estimates) → May/June (Public Hearings) → July 1 (Implementation)."
  },
  {
    id: "module-public-debt-mechanics",
    title: "Public Debt Demystified: Domestic, External & Eurobonds",
    subtitle: "Understanding the debt-to-GDP ratio, debt service ratio, and fiscal deficit",
    category: "Public Finance & Debt",
    keyConcept: "Debt is not inherently bad if it finances self-liquidating capital assets (rail, power plants, irrigation dams); it becomes dangerous when borrowed to pay recurrent salaries or stolen through inflated procurement.",
    breakdownPoints: [
      {
        heading: "The Debt Service Ratio",
        detail: "The percentage of ordinary tax revenue spent paying interest and principal on loans. In Kenya, this currently consumes over 55-60 cents of every tax shilling collected, leaving very little for hospitals, schools, and development.",
        articleCitation: "Public Debt Anchor"
      },
      {
        heading: "Domestic Debt vs External Debt",
        detail: "Domestic debt (Treasury Bills & Bonds from local banks/pension funds) carries high interest rates (14-17%) and crowds out private lending. External debt (World Bank, IMF, Eurobonds, bilateral loans) carries currency depreciation exchange-rate risk.",
        articleCitation: "PFM Act Regulations"
      },
      {
        heading: "The Fiscal Deficit",
        detail: "The gap between what government collects in taxes and what it spends. If the government plans to spend KES 4.0 Trillion but only collects KES 3.2 Trillion, it must borrow the KES 800 Billion deficit.",
        articleCitation: "BPS Deficit Targets"
      }
    ],
    actionQuestionForLeaders: "Will your economic model increase or decrease the debt service-to-revenue ratio over your 5-year term?",
    infographicSnippet: "Debt Reality: 1 Shilling Tax collected → ~60 Cents to Debt Service → ~25 Cents to Salaries/Recurrent → ~15 Cents left for actual Development."
  },
  {
    id: "module-devolution-47-counties",
    title: "Devolution: The 47 County Economies & Equitable Share",
    subtitle: "How resources reach the grassroots and why County Assemblies matter",
    category: "Devolution",
    keyConcept: "Under Chapter 11, devolution shifted power and resources to 47 counties to end decades of regional marginalization and centralized patronage.",
    breakdownPoints: [
      {
        heading: "The Equitable Share (Article 202 & 203)",
        detail: "At least 15% of all revenue collected by the National Government based on the most recent audited accounts approved by Parliament must be transferred unconditionally to the 47 counties.",
        articleCitation: "Article 203(2)"
      },
      {
        heading: "Devolved Functions (Fourth Schedule)",
        detail: "County governments manage county health facilities and pharmacies, agriculture extension and livestock, local trade and markets, county roads, pre-primary (ECDE) education, water and sanitation.",
        articleCitation: "Fourth Schedule"
      },
      {
        heading: "County Assembly Oversight & Ward Development",
        detail: "Members of County Assembly (MCAs) are the primary watchdogs who must approve County Integrated Development Plans (CIDP), Annual Development Plans (ADP), and county budget appropriations.",
        articleCitation: "Article 185"
      }
    ],
    actionQuestionForLeaders: "How will your administration guarantee timely Exchequer disbursements to counties without political conditionalities?",
    infographicSnippet: "Devolution powers 47 counties: Health + Local Roads + Agriculture + Water + Markets."
  },
  {
    id: "module-procurement-integrity",
    title: "Public Procurement & Ending Pending Bills",
    subtitle: "How Kenya can save KES 200 Billion annually through open contracting",
    category: "Institutions & Procurement",
    keyConcept: "Public procurement represents over 60% of all government spending. Enforcing transparent e-procurement stops cartels from inflating tender prices.",
    breakdownPoints: [
      {
        heading: "Article 227 Constitutional Mandate",
        detail: "When a state organ contracts for goods or services, it shall do so in accordance with a system that is fair, equitable, transparent, competitive and cost-effective.",
        articleCitation: "Article 227(1)"
      },
      {
        heading: "Beneficial Ownership Disclosure",
        detail: "Unmasking the real human beings behind supplier shell companies to prevent conflict of interest by politicians, senior civil servants, and their cronies.",
        articleCitation: "Companies Act Sec 93A"
      },
      {
        heading: "Pending Bills Verification",
        detail: "Over KES 600 Billion in unpaid supplier invoices at national and county levels cripple local businesses. Rigorous audit separates genuine unpaid suppliers from fraudulent air supply claims.",
        articleCitation: "Pending Bills Audit"
      }
    ],
    actionQuestionForLeaders: "Will you publish all public contracts, unit prices, and beneficial ownership online in real-time?",
    infographicSnippet: "Transparent Procurement: Open Bidding + Market Price Index + Beneficial Ownership = Zero Inflated Tenders."
  }
];

export const YOUTH_EXPLAINER_SERIES_DATA: YouthExplainerSeriesCard[] = [
  {
    id: "ep-1-debt",
    episodeNumber: 1,
    title: "Where Did All the Tax Shillings Go?",
    topic: "National Debt & The Revenue Shilling",
    viralHook: "POV: You earned KES 100, but KES 60 went to your dad's old loans before you bought a single loaf of bread.",
    audioVoiceoverScript: "Bro, ever wondered why public hospitals are missing medicine even when KRA sets record tax targets? Let's break down the 1 Kenya Shilling math. For every 100 bob collected in taxes, 60 bob pays sovereign debt interest and principal, 25 bob pays civil servants and state overhead. That leaves only 15 bob for every road, hospital, school, and police station in all 47 counties! So when a politician says 'I will build 10 mega factories with zero loans', ask them: from which 15 bob?",
    theEconomicReality: "Kenya's debt service absorbs >55% of ordinary revenue. Any new campaign spending must explicitly state whether it comes from higher taxes, more borrowing, or cutting existing ministry budgets.",
    theThreeHardQuestions: [
      "What is your target debt service-to-revenue ratio by year 3 of your presidency?",
      "Which specific government programs or agencies will you shut down to fund your new projects?",
      "Will you audit public debt and publish all bilateral loan agreements online?"
    ],
    sloganVsPlanTakeaway: "“Tutaongeza pesa kwa mfuko ya mwananchi” is a slogan. “We will cut executive travel by KES 40B and redirect it to university capitation” is a plan.",
    shareableStats: [
      { label: "Debt Service Share", value: "58% of Tax Revenue" },
      { label: "Remaining for Dev", value: "~15% for 47 Counties" },
      { label: "Slogan Risk", value: "Unfunded Deficits" }
    ]
  },
  {
    id: "ep-2-sha",
    episodeNumber: 2,
    title: "SHA & SHIF: What Actually Happens to Your 2.75%?",
    topic: "Universal Health Coverage & Medical Poverty",
    viralHook: "One hospital admission in Kenya can wipe out 3 generations of family savings. Why NHIF changed and what must work now.",
    audioVoiceoverScript: "Over 1.5 million Kenyans sink below the poverty line every year just because a family member fell sick with cancer or kidney failure. NHIF was built in 1966 for civil servants. The new Social Health Authority (SHA) takes 2.75% of your income so Level 2 and Level 3 clinics are free for everyone, while the big emergency and chronic funds step in when disaster strikes. But here's the catch: if claims portals crash and county hospitals aren't stocked with drugs, citizens pay twice—in payroll deductions and cash at the chemist.",
    theEconomicReality: "Risk pooling is the only proven global method to defeat catastrophic medical poverty, but it requires 100% digitized claims integrity and prompt reimbursement to mission and public hospitals.",
    theThreeHardQuestions: [
      "How will your team ensure Level 4 and 5 county referral hospitals have essential drugs 365 days a year?",
      "What is the maximum timeline for SHA to reimburse private and faith-based hospitals to stop patients from being turned away?",
      "How will you subsidize healthcare for informal mama mbogas earning irregular income?"
    ],
    sloganVsPlanTakeaway: "“Free healthcare for all!” is a slogan. “KES 140B pooled via 2.75% progressive risk fund with biometric verification and 48-hour provider settlements” is a plan.",
    shareableStats: [
      { label: "Annual Medical Poverty", value: "1.5M Citizens" },
      { label: "Primary Clinic Cost", value: "Free at Level 2/3" },
      { label: "Key Bottleneck", value: "Claims Portal & KEMSA" }
    ]
  },
  {
    id: "ep-3-hef-heir",
    episodeNumber: 3,
    title: "The Campus Funding Puzzle: Band 1 to Band 5 Explained",
    topic: "Higher Education Financing (HEF) & CBC Transition",
    viralHook: "Why did my roommate get 100% scholarship while I got placed in Band 4 when our parents earn the same?",
    audioVoiceoverScript: "The old Differentiated Unit Cost model collapsed because universities admitted more students than the Treasury funded, leaving public universities with KES 70 Billion in pending bills. The new HEF model uses Means Testing to rank students into 5 vulnerability bands. Sounds fair on paper, but algorithmic bias means students from rural mud-walled homes got misclassified into wealthy bands! If a candidate promises to scrap HEF, ask where the KES 80 Billion university operational budget will come from.",
    theEconomicReality: "Universities cannot run on speeches. Either the state fully funds universities from taxes (requiring ~KES 80B/yr), students pay tuition, or progressive means testing is perfected with transparent human appeals.",
    theThreeHardQuestions: [
      "Will you fix the Means Testing Instrument (MTI) proxy variables or replace it with universal capitation, and how much will that cost?",
      "How will your administration clear the KES 70 Billion university pension and supplier debt?",
      "What is your plan to ensure TVET graduates get immediate industrial apprenticeship placements?"
    ],
    sloganVsPlanTakeaway: "“Every youth will go to campus for free” is a slogan. “We will inject KES 35B into HELB revolving fund and overhaul MTI appeal timelines to 7 days” is a plan.",
    shareableStats: [
      { label: "University Debt", value: "KES 70B+" },
      { label: "Annual Capitation Need", value: "KES 80B" },
      { label: "Focus Requirement", value: "MTI Algorithmic Fairness" }
    ]
  },
  {
    id: "ep-4-devolution-mca",
    episodeNumber: 4,
    title: "Why Your MCA Matters More Than You Think",
    topic: "Devolution & Ward Level Budgets",
    viralHook: "You spent 5 months arguing about who is President, but your local dispensary has no Panadol because of a Ward MCA dispute.",
    audioVoiceoverScript: "In the 2010 Constitution, the President does not buy dispensary medicine, fix local feeder roads, or clean market gutters. That is 100% the job of your County Governor and Member of County Assembly (MCA)! When you sell your vote to an MCA for 500 bob on election day, you just sold 5 years of clean water, maternity wings, ECDE nursery school classrooms, and youth sports facilities in your ward.",
    theEconomicReality: "47 Counties receive over KES 400 Billion annually in Equitable Share plus own-source revenue. Over 60% of daily citizen touchpoints (health, water, markets, agriculture) are fully devolved.",
    theThreeHardQuestions: [
      "How will your County Governor candidate ensure local dispensaries never run out of essential medicines?",
      "What is your ward's Annual Development Plan (ADP) priority for youth vocational training and market stalls?",
      "How will the County Assembly enforce public participation before approving ward budgets?"
    ],
    sloganVsPlanTakeaway: "“Kazi ya vijana itasonga mbele” is a slogan. “KES 30M allocated to ward agro-processing aggregation hub with solar cold storage” is a plan.",
    shareableStats: [
      { label: "Annual County Share", value: "KES 400B+" },
      { label: "Devolved Services", value: "Health, Water, Feeder Roads" },
      { label: "Grassroots Key", value: "MCA & Ward Planning" }
    ]
  }
];

