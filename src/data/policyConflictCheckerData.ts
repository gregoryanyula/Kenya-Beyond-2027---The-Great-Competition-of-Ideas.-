export interface LegislativeBenchmark {
  id: string;
  statuteName: string;
  legalCitation: string;
  coreRule: string;
  statutoryThreshold: string;
  category: "Public Finance" | "Devolution" | "Anti-Corruption" | "Procurement" | "Human Rights & Labor" | "Education" | "Health";
}

export interface PresetConflictCase {
  id: string;
  manifestoClaim: string;
  proposedBy: string;
  policyDomain: string;
  conflictingStatute: string;
  legalCitation: string;
  conflictType: "Direct Constitutional Breach" | "Statutory Violation" | "Jurisdictional Overreach" | "Fiscal Law Non-Compliance";
  severity: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  explanation: string;
  offendingClause: string;
  statutoryRequirement: string;
  recommendedLegalRemedy: string;
}

export const LEGISLATIVE_BENCHMARKS: LegislativeBenchmark[] = [
  {
    id: "leg-pfm-dev",
    statuteName: "Public Finance Management (PFM) Act, Section 15(2)(a)",
    legalCitation: "PFM Act 2012 §15(2)(a)",
    coreRule: "Mandatory Development Allocation Threshold",
    statutoryThreshold: "A minimum of thirty percent (30%) of the national and county government's budget shall be allocated to the development expenditure over the medium term.",
    category: "Public Finance"
  },
  {
    id: "leg-pfm-wage",
    statuteName: "Public Finance Management (National Government) Regulations, Regulation 25(1)(b)",
    legalCitation: "PFM Regulations 2015 Reg. 25(1)(b)",
    coreRule: "Public Wage Bill Fiscal Cap",
    statutoryThreshold: "The national and county government's expenditure on compensation of employees (wage bill) shall not exceed thirty-five percent (35%) of the government's equitable share of revenue.",
    category: "Public Finance"
  },
  {
    id: "leg-art-201-debt",
    statuteName: "Constitution of Kenya, Article 201(c)",
    legalCitation: "Constitution Art. 201(c)",
    coreRule: "Intergenerational Equity in Public Debt",
    statutoryThreshold: "The burdens and benefits of the use of resources and public borrowing shall be shared equitably between present and future generations.",
    category: "Public Finance"
  },
  {
    id: "leg-art-203-devol",
    statuteName: "Constitution of Kenya, Article 203(2)",
    legalCitation: "Constitution Art. 203(2)",
    coreRule: "Devolution Equitable Share Floor",
    statutoryThreshold: "County governments shall receive not less than fifteen percent (15%) of all revenue collected by the national government, calculated on the basis of the most recent audited accounts.",
    category: "Devolution"
  },
  {
    id: "leg-sch-4-devol",
    statuteName: "Constitution of Kenya, Fourth Schedule (Distribution of Functions)",
    legalCitation: "Constitution Fourth Schedule Part 2",
    coreRule: "Devolved Functional Autonomy",
    statutoryThreshold: "County health services, county agriculture, county public works, county trade development and markets, and pre-primary education are exclusively devolved functions.",
    category: "Devolution"
  },
  {
    id: "leg-ppada-comp",
    statuteName: "Public Procurement and Asset Disposal Act (PPADA), Section 91 & Section 103",
    legalCitation: "PPADA 2015 §91 & §103",
    coreRule: "Mandatory Open Competitive Tendering",
    statutoryThreshold: "Open tendering is the default procurement procedure. Direct procurement (single sourcing) is strictly prohibited unless exceptional technical monopoly or urgent life-saving disaster conditions are judicially proven.",
    category: "Procurement"
  },
  {
    id: "leg-art-227-agpo",
    statuteName: "Public Procurement and Asset Disposal Act (AGPO), Section 157 & Art. 227(2)",
    legalCitation: "PPADA 2015 §157 / Art. 227(2)",
    coreRule: "Affirmative Procurement (30% Youth, Women, PWDs)",
    statutoryThreshold: "Procuring entities shall allocate at least thirty percent (30%) of their annual procurement spend for enterprises owned by women, youth, and persons with disabilities.",
    category: "Procurement"
  },
  {
    id: "leg-art-73-int",
    statuteName: "Leadership and Integrity Act (Cap 182) & Constitution Chapter Six",
    legalCitation: "Cap 182 §16 & Art. 73(1)",
    coreRule: "Public Office is a Public Trust & Conflict of Interest",
    statutoryThreshold: "State officers are strictly forbidden from maintaining undisclosed personal interests in public contracts, receiving unexplained gifts, or using public resources for partisan political campaigns.",
    category: "Anti-Corruption"
  },
  {
    id: "leg-art-53-edu",
    statuteName: "Basic Education Act 2013, Section 29 & Constitution Article 53(1)(b)",
    legalCitation: "Basic Education Act §29 & Art. 53(1)(b)",
    coreRule: "Free and Compulsory Basic Education",
    statutoryThreshold: "No public school shall charge tuition or auxiliary fees that have the effect of denying any child access to basic education. Basic education is guaranteed free and compulsory.",
    category: "Education"
  },
  {
    id: "leg-art-43-health",
    statuteName: "Social Health Insurance Act 2023 & Constitution Article 43(1)(a)",
    legalCitation: "SHIA 2023 §27 & Art. 43(1)(a)(2)",
    coreRule: "Emergency Treatment & Universal Access",
    statutoryThreshold: "No healthcare provider in Kenya shall deny emergency medical treatment to any person for any reason whatsoever, regardless of insurance contribution status.",
    category: "Health"
  }
];

export const PRESET_CONFLICT_CASES: PresetConflictCase[] = [
  {
    id: "case-1",
    manifestoClaim: "Directly appoint regional political supporters to oversee national road tender awards without standard competitive public bidding.",
    proposedBy: "Sample Populist Infrastructure Pledge",
    policyDomain: "Transport & Infrastructure",
    conflictingStatute: "Public Procurement and Asset Disposal Act (PPADA 2015) & Article 227",
    legalCitation: "PPADA 2015 §91 / Art. 227(1)",
    conflictType: "Direct Constitutional Breach",
    severity: "CRITICAL",
    explanation: "Article 227(1) of the Constitution mandates that public procurement shall be fair, equitable, transparent, competitive, and cost-effective. Direct executive appointment of tender awards to political allies violates open competition and constitutes illegal patronage under Chapter 6.",
    offendingClause: "“Directly appoint political supporters to oversee tender awards without standard bidding”",
    statutoryRequirement: "Must conduct open, transparent competitive bidding on the National Open Contracting Portal with independent evaluation committees.",
    recommendedLegalRemedy: "Amend proposal to mandate 100% automated open e-tendering with public opening records and strict 30% AGPO quotas for youth contractors."
  },
  {
    id: "case-2",
    manifestoClaim: "Increase public sector executive salaries and discretionary ministry travel allowances by 50% while funding it through supplementary treasury borrowing.",
    proposedBy: "Sample Recurrent Spending Pledge",
    policyDomain: "Public Debt & Fiscal Realism",
    conflictingStatute: "PFM Regulations Reg. 25(1)(b) & Article 230 (SRC Mandate)",
    legalCitation: "PFM Reg. 25(1)(b) & Art. 230(4)",
    conflictType: "Fiscal Law Non-Compliance",
    severity: "HIGH",
    explanation: "The wage bill is legally capped at 35% of national equitable revenue. Expanding executive compensation through borrowing breaches Article 201(c) intergenerational equity and violates the Salaries and Remuneration Commission's statutory mandate to harmonize public wage structures.",
    offendingClause: "“Increase executive allowances by 50% funded through supplementary borrowing”",
    statutoryRequirement: "Recurrent salaries must comply with SRC advice and cannot exceed the 35% revenue ceiling.",
    recommendedLegalRemedy: "Cap wage bill growth below revenue growth and reallocate savings from non-essential hospitality to development capital expenditure (minimum 30%)."
  },
  {
    id: "case-3",
    manifestoClaim: "The National Government will take over administration and revenue collection of all municipal retail markets and primary health dispensaries from county governments.",
    proposedBy: "Sample Centralization Manifesto Item",
    policyDomain: "Devolution & County Autonomy",
    conflictingStatute: "Constitution of Kenya, Fourth Schedule Part 2 & Article 187",
    legalCitation: "Constitution Art. 187 & Fourth Schedule",
    conflictType: "Jurisdictional Overreach",
    severity: "CRITICAL",
    explanation: "Under the Fourth Schedule, county health services, markets, and trade licenses are exclusively devolved functions. The national government cannot unilaterally re-centralize county functions without formal intergovernmental transfer agreements under Article 187 approved by Senate.",
    offendingClause: "“National Government will take over administration of municipal retail markets and dispensaries”",
    statutoryRequirement: "County functions must be protected by Senate and managed by County Executive Committees.",
    recommendedLegalRemedy: "Frame the program as an Intergovernmental Conditional Grant or Technical Assistance framework respecting County Assembly appropriations."
  },
  {
    id: "case-4",
    manifestoClaim: "Mandate that all high schools withhold KCSE academic certificates from graduating students with unpaid school fee balances.",
    proposedBy: "Sample Secondary School Levies Policy",
    policyDomain: "Education & Human Capital Development",
    conflictingStatute: "Kenya National Examinations Council (KNEC) Act, Section 10(1)(b) & High Court Precedents",
    legalCitation: "KNEC Act §10(1)(b) & Art. 53(1)(b)",
    conflictType: "Statutory Violation",
    severity: "HIGH",
    explanation: "The KNEC Act Section 10(1)(b) and numerous High Court rulings (e.g. Petition 58 of 2013) explicitly declare withholding certificates illegal, as it denies youth the constitutional right to seek further education and employment.",
    offendingClause: "“Withhold KCSE academic certificates from students with unpaid balances”",
    statutoryRequirement: "All basic examination certificates must be released to learners unconditionally upon completion.",
    recommendedLegalRemedy: "Replace fee withholding with state-backed capitation reconciliation and bursary emergency safety nets for impoverished households."
  },
  {
    id: "case-5",
    manifestoClaim: "Establish a 100% tax exemption on imported luxury motor vehicles and private jet charters without parliamentary review.",
    proposedBy: "Sample Tariff Deregulation Item",
    policyDomain: "Public Debt & Fiscal Realism",
    conflictingStatute: "Constitution Article 210 & Article 201(b)(i)",
    legalCitation: "Constitution Art. 210(1)",
    conflictType: "Direct Constitutional Breach",
    severity: "CRITICAL",
    explanation: "Article 210(1) states that no tax or licensing fee may be imposed, waived, or varied except as provided by legislation enacted by Parliament. Unilateral executive tax exemptions on luxury items breach the constitutional requirement for fair tax burden sharing under Article 201(b)(i).",
    offendingClause: "“Establish 100% tax exemption on luxury vehicles without parliamentary review”",
    statutoryRequirement: "All tax waivers must be tabled in the National Assembly with public disclosure of beneficiaries.",
    recommendedLegalRemedy: "Submit all proposed industrial tax incentives to Parliament in the annual Finance Bill with quantified cost-benefit economic analysis."
  }
];
