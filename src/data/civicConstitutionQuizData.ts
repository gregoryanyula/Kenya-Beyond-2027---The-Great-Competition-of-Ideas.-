export interface ConstitutionQuizQuestion {
  id: string;
  question: string;
  articleCitation: string;
  category: "Public Finance (Art. 201)" | "Leadership & Integrity (Ch. 6)" | "Social & Economic Rights (Art. 43)" | "Devolution & Equitable Share (Ch. 11)" | "National Values & Accountability (Art. 10 & 232)";
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  policyDomainAlignment: string; // Used to recommend policies in the Policy Audit Tool
  recommendedAuditTopics: string[];
}

export const CONSTITUTION_QUIZ_QUESTIONS: ConstitutionQuizQuestion[] = [
  {
    id: "cq-1",
    question: "Under Article 201(c) of the Constitution of Kenya, what is the mandatory principle regarding public debt and national borrowing?",
    articleCitation: "Article 201(c) - Principles of Public Finance",
    category: "Public Finance (Art. 201)",
    policyDomainAlignment: "Public Debt & Fiscal Realism",
    recommendedAuditTopics: [
      "Eurobond & Concessional Debt Refinancing Framework",
      "Debt-to-GDP Ceiling vs Revenue Anchoring",
      "Public Debt Audit by Auditor General"
    ],
    options: [
      {
        id: "a",
        text: "The government can borrow unlimited funds as long as parliament approves the supplementary budget without public hearings.",
        isCorrect: false,
        explanation: "Article 201 strictly requires open public participation and clear burden sharing across generations."
      },
      {
        id: "b",
        text: "The burdens and benefits of the use of resources and public borrowing shall be shared equitably between present and future generations.",
        isCorrect: true,
        explanation: "Correct! Article 201(c) explicitly guarantees intergenerational equity—meaning today's consumption must not burden future generations with unpayable debt."
      },
      {
        id: "c",
        text: "Foreign borrowing takes precedence over domestic development spending during any election cycle.",
        isCorrect: false,
        explanation: "The Constitution provides no such prioritization; it mandates prudent and responsible fiscal management."
      },
      {
        id: "d",
        text: "Public debt contracts are classified state secrets and cannot be subjected to Auditor General scrutiny.",
        isCorrect: false,
        explanation: "Article 201(a) mandates that there shall be openness and accountability, including public financial reporting."
      }
    ]
  },
  {
    id: "cq-2",
    question: "According to Article 43(1)(a) of the Kenyan Constitution, what fundamental standard does every citizen have regarding healthcare?",
    articleCitation: "Article 43(1)(a) - Economic and Social Rights",
    category: "Social & Economic Rights (Art. 43)",
    policyDomainAlignment: "Healthcare & Universal Access",
    recommendedAuditTopics: [
      "Social Health Insurance (SHA/SHIF) Primary Fund Transition",
      "County Level 4 Oncology & Dialysis Subsidies",
      "Community Health Promoters (CHP) Stipend Ring-Fencing"
    ],
    options: [
      {
        id: "a",
        text: "Healthcare is only provided to formal sector employees paying statutory income tax (PAYE).",
        isCorrect: false,
        explanation: "Article 43 applies universally to every Kenyan citizen, regardless of employment status."
      },
      {
        id: "b",
        text: "Every person has the right to the highest attainable standard of health, which includes the right to health care services, including reproductive health care.",
        isCorrect: true,
        explanation: "Correct! Article 43(1)(a) anchors universal healthcare access as a socio-economic constitutional right, and Article 43(2) prohibits denying emergency medical treatment."
      },
      {
        id: "c",
        text: "Hospitals may detain discharged patients indefinitely if they are unable to pay pending medical bills.",
        isCorrect: false,
        explanation: "The High Court of Kenya has repeatedly ruled that detaining patients for unpaid bills violates constitutional dignity under Article 28."
      },
      {
        id: "d",
        text: "Only national referral hospitals (KNH, MTRH) are obligated to uphold patient rights.",
        isCorrect: false,
        explanation: "All public, private, and faith-based healthcare facilities operating in Kenya must adhere to constitutional standards."
      }
    ]
  },
  {
    id: "cq-3",
    question: "Under Article 202 and Article 203, how must revenue raised nationally be divided between the national government and the 47 county governments?",
    articleCitation: "Article 202 & 203 - Equitable Sharing of National Revenue",
    category: "Devolution & Equitable Share (Ch. 11)",
    policyDomainAlignment: "Devolution & Local Services",
    recommendedAuditTopics: [
      "Timely Exchequer Disbursals to County Governments",
      "Transfer of Devolved Functions (Water, Agriculture, Roads)",
      "County Own-Source Revenue (OSR) Modernization"
    ],
    options: [
      {
        id: "a",
        text: "County governments receive what is left over only after all national executive development projects are completed.",
        isCorrect: false,
        explanation: "The equitable share is an unconditioned constitutional right and must not be delayed for national flagship projects."
      },
      {
        id: "b",
        text: "Revenue raised nationally shall be shared equitably among the national and county governments, with counties receiving not less than 15% of the most recently audited national revenue.",
        isCorrect: true,
        explanation: "Correct! Article 203(2) sets the constitutional baseline at no less than 15% of the latest audited accounts by the Auditor General."
      },
      {
        id: "c",
        text: "The National Treasury has discretionary power to freeze county funds indefinitely without Senate approval.",
        isCorrect: false,
        explanation: "Article 225 sets strict, court-supervised conditions for any temporary stoppage of funds, requiring Parliamentary approval within 30 days."
      },
      {
        id: "d",
        text: "Counties can only spend funds on projects pre-approved by the State House Economic Advisory Council.",
        isCorrect: false,
        explanation: "County governments are distinct and coordinate under Article 6; county priorities are enacted by County Assemblies."
      }
    ]
  },
  {
    id: "cq-4",
    question: "What does Chapter Six (Article 73) state regarding the authority assigned to a State Officer or Public Leader?",
    articleCitation: "Article 73(1) - Responsibilities of Leadership",
    category: "Leadership & Integrity (Ch. 6)",
    policyDomainAlignment: "Governance & Anti-Corruption",
    recommendedAuditTopics: [
      "Asset Declaration Transparency & Conflict of Interest Bill",
      "Public Procurement Open Data & E-Procurement Portal",
      "Whistleblower Protection & EACC Independence"
    ],
    options: [
      {
        id: "a",
        text: "Public office is a personal reward to enrich the office holder's family and political supporters.",
        isCorrect: false,
        explanation: "Article 73 explicitly rejects patronage and nepotism."
      },
      {
        id: "b",
        text: "Authority assigned to a State officer is a public trust to be exercised in a manner that brings honor to the nation and promotes public confidence.",
        isCorrect: true,
        explanation: "Correct! Article 73(1) establishes that political and public power is held in trust for the people of Kenya."
      },
      {
        id: "c",
        text: "State officers are immune from prosecution for any procurement decisions made while in office.",
        isCorrect: false,
        explanation: "State officers have personal financial accountability for illegal or irregular public expenditures."
      },
      {
        id: "d",
        text: "A state officer may maintain undisclosed foreign bank accounts and direct state tenders to their private companies.",
        isCorrect: false,
        explanation: "Article 76 strictly regulates financial integrity, conflict of interest, and foreign bank accounts for State officers."
      }
    ]
  },
  {
    id: "cq-5",
    question: "Under Article 201(d), what is the mandatory constitutional benchmark for public money and government expenditures?",
    articleCitation: "Article 201(d) - Prudent & Responsible Financial Management",
    category: "Public Finance (Art. 201)",
    policyDomainAlignment: "Public Debt & Fiscal Realism",
    recommendedAuditTopics: [
      "Zero-Based Budgeting vs Incremental Budgeting",
      "Public Participation in County Fiscal Strategy Papers (CFSP)",
      "Recurrent vs Development Expenditure Thresholds (PFM Act)"
    ],
    options: [
      {
        id: "a",
        text: "Public money shall be used in a prudent, responsible, and cost-effective manner with clear reporting.",
        isCorrect: true,
        explanation: "Correct! Article 201(d) mandates that all public expenditures must be transparent, value-for-money, and accountable."
      },
      {
        id: "b",
        text: "Government spending can be conducted without receipts or audits as long as the president announces the program at a rally.",
        isCorrect: false,
        explanation: "Presidential roadside declarations must still comply with statutory appropriations and Controller of Budget approval."
      },
      {
        id: "c",
        text: "Any public money unspent at the end of the fiscal year is automatically kept by the accounting officer.",
        isCorrect: false,
        explanation: "Unspent appropriations lapse at the end of the financial year and must be surrendered to the Consolidated Fund unless specifically re-budgeted."
      },
      {
        id: "d",
        text: "Supplementary budgets can exceed the original budget by 80% without Parliamentary approval.",
        isCorrect: false,
        explanation: "Under the PFM Act and Constitution, supplementary spending is tightly constrained and requires post-facto parliamentary enactment."
      }
    ]
  },
  {
    id: "cq-6",
    question: "Under Article 227 of the Constitution, what principles MUST guide public procurement and asset disposal systems?",
    articleCitation: "Article 227 - Procurement of Public Goods and Services",
    category: "National Values & Accountability (Art. 10 & 232)",
    policyDomainAlignment: "Governance & Anti-Corruption",
    recommendedAuditTopics: [
      "Access to Government Procurement Opportunities (AGPO 30% Youth/Women)",
      "Open Contracting Data Standard (OCDS) Enforcement",
      "Blacklisting of Non-Performing and Corrupt State Contractors"
    ],
    options: [
      {
        id: "a",
        text: "Tenders must be awarded secretly to protect proprietary political campaign contributors.",
        isCorrect: false,
        explanation: "Article 227 requires open and competitive tendering without preferential secrecy."
      },
      {
        id: "b",
        text: "Procurement shall be carried out in accordance with a system that is fair, equitable, transparent, competitive, and cost-effective.",
        isCorrect: true,
        explanation: "Correct! Article 227(1) requires these 5 core tenets for all state corporations, ministries, and county entities."
      },
      {
        id: "c",
        text: "Single-sourcing is mandatory for all major national infrastructure projects exceeding KES 10 Billion.",
        isCorrect: false,
        explanation: "Direct procurement is an exception reserved for emergencies or specialized intellectual monopolies, strictly regulated by the PPDA."
      },
      {
        id: "d",
        text: "Foreign companies are exempt from all Kenyan procurement regulations.",
        isCorrect: false,
        explanation: "All entities contracting with public bodies in Kenya must comply with constitutional and statutory procurement standards."
      }
    ]
  },
  {
    id: "cq-7",
    question: "According to Article 43(1)(c) & (d), what basic necessities are constitutional rights for all citizens?",
    articleCitation: "Article 43(1)(c)(d) - Right to be free from hunger & clean water",
    category: "Social & Economic Rights (Art. 43)",
    policyDomainAlignment: "Agriculture & Food Sovereignty",
    recommendedAuditTopics: [
      "National Strategic Grain Reserve (SGR) Modernization",
      "Community Water Harvesting & Dam Construction Accountability",
      "Subsidized Agricultural Inputs Vouchers Tracking"
    ],
    options: [
      {
        id: "a",
        text: "To be free from hunger and to have adequate food of acceptable quality, and to clean and safe water in adequate quantities.",
        isCorrect: true,
        explanation: "Correct! The state has an affirmative obligation to take legislative and policy measures to progressively realize food and water rights."
      },
      {
        id: "b",
        text: "Water is exclusively a commercial commodity and can be shut off from entire informal settlements without alternative supply.",
        isCorrect: false,
        explanation: "Water is recognized as a fundamental human right under the Constitution."
      },
      {
        id: "c",
        text: "Food security is the sole responsibility of individual households with no government duty of policy support.",
        isCorrect: false,
        explanation: "Article 21(2) obligates the state to implement policy and legislation to achieve the realization of Article 43 rights."
      },
      {
        id: "d",
        text: "Only citizens living in high-rainfall agricultural zones have the right to food security.",
        isCorrect: false,
        explanation: "Article 43 applies equally to pastoralist and arid/semi-arid regions (ASALs) via Equalization measures."
      }
    ]
  },
  {
    id: "cq-8",
    question: "What does Article 10(2) list as foundational National Values and Principles of Governance?",
    articleCitation: "Article 10(2) - National Values and Principles of Governance",
    category: "National Values & Accountability (Art. 10 & 232)",
    policyDomainAlignment: "Governance & Anti-Corruption",
    recommendedAuditTopics: [
      "Inclusive Public Participation in Legislative Making",
      "Protection of Marginalized Groups & Gender Parity",
      "Rule of Law & Judicial Independence Protection"
    ],
    options: [
      {
        id: "a",
        text: "Patriotism, national unity, sharing and devolution of power, the rule of law, democracy and participation of the people, integrity, and transparency.",
        isCorrect: true,
        explanation: "Correct! Article 10 binds all state organs, state officers, and public officers whenever applying or interpreting the Constitution or making public policy."
      },
      {
        id: "b",
        text: "Ethnic regional dominance and unquestioned executive supremacy.",
        isCorrect: false,
        explanation: "Article 10 strictly repudiates tribalism and authoritarian executive overreach."
      },
      {
        id: "c",
        text: "Silencing dissenting civic voices and civil society organizations during national elections.",
        isCorrect: false,
        explanation: "Democracy and citizen participation are non-negotiable constitutional pillars."
      },
      {
        id: "d",
        text: "Exempting politicians from public tax disclosures.",
        isCorrect: false,
        explanation: "Integrity, transparency, and accountability are explicit values in Article 10(2)(c)."
      }
    ]
  },
  {
    id: "cq-9",
    question: "Under Article 53(1)(b) and Article 43(1)(f), what is the constitutional guarantee regarding basic education in Kenya?",
    articleCitation: "Article 53(1)(b) & 43(1)(f) - Free and Compulsory Basic Education",
    category: "Social & Economic Rights (Art. 43)",
    policyDomainAlignment: "Education & Human Capital Development",
    recommendedAuditTopics: [
      "CBC Transition & Junior School Teacher Capitation",
      "University Funding Model (HEF/HELB) Means-Testing Reform",
      "Free Secondary Capitation Ring-Fencing"
    ],
    options: [
      {
        id: "a",
        text: "Basic education is a privilege only available to students who can afford private auxiliary tuition fees.",
        isCorrect: false,
        explanation: "The Constitution explicitly guarantees free and compulsory basic education to every child."
      },
      {
        id: "b",
        text: "Every child has the right to free and compulsory basic education, and every person has the right to education.",
        isCorrect: true,
        explanation: "Correct! Article 53(1)(b) mandates that basic education is both free and compulsory, requiring state funding and capitation."
      },
      {
        id: "c",
        text: "Schools may expel students whose parents are unable to pay arbitrary PTA building levies.",
        isCorrect: false,
        explanation: "The Basic Education Act and constitutional precedents protect children from denial of basic education due to poverty."
      },
      {
        id: "d",
        text: "Technical and Vocational Training (TVET) is prohibited from receiving any national exchequer funding.",
        isCorrect: false,
        explanation: "TVET is a national strategic priority funded under the national education budget."
      }
    ]
  },
  {
    id: "cq-10",
    question: "Under Article 213 and Article 214 of the Constitution, what is the legal status of government loan guarantees and public debt repayment?",
    articleCitation: "Article 213 & 214 - Sovereign Debt & Loan Guarantees",
    category: "Public Finance (Art. 201)",
    policyDomainAlignment: "Public Debt & Fiscal Realism",
    recommendedAuditTopics: [
      "Consolidated Fund Service (CFS) Debt First-Charge Scrutiny",
      "National Assembly Loan Guarantee Transparency Register",
      "Independent Public Debt Management Office Auditing"
    ],
    options: [
      {
        id: "a",
        text: "Public debt is a direct first charge on the Consolidated Fund and must be serviced before discretionary ministry expenditures.",
        isCorrect: true,
        explanation: "Correct! Article 214(1) makes public debt a first charge on the Consolidated Fund, which is why debt crises severely squeeze funds for healthcare, education, and development."
      },
      {
        id: "b",
        text: "The executive can issue sovereign debt guarantees to private businesses without Parliament's knowledge or approval.",
        isCorrect: false,
        explanation: "Article 213(2) mandates that Parliament must enact legislation prescribing terms and conditions under which the government may guarantee loans."
      },
      {
        id: "c",
        text: "County governments can borrow foreign loans directly from external commercial banks without National Treasury and Senate approval.",
        isCorrect: false,
        explanation: "Article 212 mandates that county governments may only borrow if the national government guarantees the loan and Parliament approves."
      },
      {
        id: "d",
        text: "Foreign loan contracts cannot be evaluated for value-for-money by the Auditor General.",
        isCorrect: false,
        explanation: "Article 229 mandates the Auditor General to audit all accounts of national and county governments and public entities."
      }
    ]
  }
];
