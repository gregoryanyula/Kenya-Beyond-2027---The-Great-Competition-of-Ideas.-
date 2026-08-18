import { PolicyLiteracyChallenge } from "../types";

export const POLICY_LITERACY_CHALLENGES: PolicyLiteracyChallenge[] = [
  {
    id: "challenge-health-strikes",
    challengeTitle: "Doctor Strikes & Medicine Stockouts in Public County Hospitals",
    sector: "Healthcare & Human Rights",
    situationBrief: "A Level-4 County Hospital runs out of basic insulin, surgical gloves, and oncology drugs. Medical personnel go on strike over 3-month salary arrears and delayed statutory deductions.",
    realWorldImpact: "Patients are turned away, forcing families into devastating out-of-pocket private hospital debt or fatal delays.",
    statBadge: "KES 34B NHIF/SHA Provider Debt Backlog",
    optionsConstitution: [
      {
        id: "const-art43",
        articleNumber: "Article 43(1)(a) & 43(2)",
        articleTitle: "Economic and Social Rights: Right to Health",
        clauseSummary: "Every person has the right to the highest attainable standard of health, including reproductive health; and a person shall not be denied emergency medical treatment.",
        isCorrect: true,
        explanation: "Article 43 explicitly places a legally binding constitutional obligation on both National and County governments to guarantee accessible, quality healthcare."
      },
      {
        id: "const-art132",
        articleNumber: "Article 132",
        articleTitle: "Functions of the President",
        clauseSummary: "Addresses address to Parliament and declaration of state of emergency.",
        isCorrect: false,
        explanation: "Article 132 outlines executive powers of state, but does not define citizens' fundamental socio-economic right to healthcare."
      },
      {
        id: "const-art73",
        articleNumber: "Article 73",
        articleTitle: "Leadership and Integrity",
        clauseSummary: "Governs public officer ethics and conflict of interest.",
        isCorrect: false,
        explanation: "While public officer ethics matter, the primary constitutional pillar establishing health rights is Article 43."
      },
      {
        id: "const-art165",
        articleNumber: "Article 165",
        articleTitle: "High Court Jurisdiction",
        clauseSummary: "Defines the constitutional interpretation jurisdiction of the High Court.",
        isCorrect: false,
        explanation: "The High Court enforces rights, but the substantive right to healthcare originates in Article 43."
      }
    ],
    optionsPolicySolution: [
      {
        id: "sol-health-correct",
        solutionText: "Ring-fence county healthcare facility revenues (Facility Improvement Financing Act), automate direct KEMSA supply payments, and establish a centralized Health Service Commission for equitable doctor deployment.",
        type: "constitutional-policy",
        isCorrect: true,
        rationale: "Addresses structural cashflow bottlenecks: when hospital fees are ring-fenced at the facility level, hospitals can procure emergency drugs directly without waiting for County Treasury bureaucracy."
      },
      {
        id: "sol-health-trap",
        solutionText: "Threaten to sack all striking doctors, import foreign doctors on temporary contracts, and announce a free medical camp campaign.",
        type: "populist-trap",
        isCorrect: false,
        rationale: "A populist distraction that fails to fix hospital supply chains, creates costly labour lawsuits, and leaves hospitals without systemic long-term funding."
      },
      {
        id: "sol-health-inertia",
        solutionText: "Form a 15-member presidential taskforce to study the issue for 18 months without interim exchequer releases.",
        type: "bureaucratic-inertia",
        isCorrect: false,
        rationale: "Taskforces without ring-fenced exchequer commitments simply delay urgent constitutional compliance."
      }
    ],
    auditorPrecedentOrLaw: "Facility Improvement Financing (FIF) Act 2023 & High Court Petition No. 284 of 2019 upholding healthcare as an immediate progressive state obligation.",
    keyConstitutionalArticle: "Article 43(1)(a)"
  },
  {
    id: "challenge-unapproved-debt",
    challengeTitle: "Secret Sovereign Loans & Escalating National Debt Service",
    sector: "Public Finance & Sovereignty",
    situationBrief: "The National Treasury signs a commercial loan agreement with foreign financiers with non-disclosure clauses and state asset collateral, without prior debate or vote in the National Assembly.",
    realWorldImpact: "Over 65% of all national tax collections are swallowed by debt interest payments, starving schools, universities, and agriculture.",
    statBadge: "KES 1.3+ Trillion Annual Debt Service",
    optionsConstitution: [
      {
        id: "const-art201",
        articleNumber: "Article 201 & Article 214/221",
        articleTitle: "Principles of Public Finance & Debt Transparency",
        clauseSummary: "Openness, accountability, and public participation; the burden of debt must be shared equitably between present and future generations; all public borrowing requires National Assembly authorization.",
        isCorrect: true,
        explanation: "Article 201(a) and 201(c) mandate that public finance must be transparent, with an equitable intergenerational debt burden."
      },
      {
        id: "const-art81",
        articleNumber: "Article 81",
        articleTitle: "Electoral System Principles",
        clauseSummary: "Governs secret ballot voting and two-thirds gender rule.",
        isCorrect: false,
        explanation: "Article 81 deals with the electoral code, not sovereign borrowing or public finance."
      },
      {
        id: "const-art238",
        articleNumber: "Article 238",
        articleTitle: "Principles of National Security",
        clauseSummary: "Governs defense forces and internal security.",
        isCorrect: false,
        explanation: "Economic security is vital, but sovereign loans are legally governed by Chapter 12 (Public Finance)."
      },
      {
        id: "const-art50",
        articleNumber: "Article 50",
        articleTitle: "Fair Hearing & Trial",
        clauseSummary: "Rights of accused persons in courts of law.",
        isCorrect: false,
        explanation: "Article 50 applies to court proceedings, not parliamentary budget authorisations."
      }
    ],
    optionsPolicySolution: [
      {
        id: "sol-debt-correct",
        solutionText: "Establish an independent Public Debt Management Office (PDMO) outside the National Treasury, publish a real-time public debt register with full loan terms, and enforce a legally binding debt-to-GDP ceiling voted by Parliament.",
        type: "constitutional-policy",
        isCorrect: true,
        rationale: "Separates debt borrowing from Treasury executive discretion and empowers the Auditor-General and Parliament to vet loan terms before funds are drawn down."
      },
      {
        id: "sol-debt-trap",
        solutionText: "Take out another short-term high-interest syndicated commercial bank loan to repay the maturing Eurobond and claim the debt crisis is resolved.",
        type: "populist-trap",
        isCorrect: false,
        rationale: "Classic debt-treadmill trap: borrowing expensive short-term money to settle old debts compounds the fiscal cliff."
      },
      {
        id: "sol-debt-inertia",
        solutionText: "Reclassify debt calculations by changing the statutory ceiling from a numerical KES ceiling to a percentage ratio without audited accounts.",
        type: "bureaucratic-inertia",
        isCorrect: false,
        rationale: "Cosmetic accounting tricks mask the crisis without solving the underlying revenue and fiscal deficit."
      }
    ],
    auditorPrecedentOrLaw: "Public Finance Management Act Section 64 & Auditor-General Special Audit Report on National Public Debt Amortization (2024).",
    keyConstitutionalArticle: "Article 201(c)"
  },
  {
    id: "challenge-hef-university",
    challengeTitle: "Higher Education Funding (HEF) Model & Student Lockouts",
    sector: "Education & Youth Empowerment",
    situationBrief: "Tens of thousands of university students from low-income families are categorized into 'Band 4 & 5' due to flawed Means Testing Instrument (MTI) proxy algorithms, receiving household fee demands of up to KES 200,000.",
    realWorldImpact: "Underprivileged students drop out or are barred from sitting end-of-semester exams while public universities accumulate KES 75B pending bills.",
    statBadge: "Over 40,000 Students Disputed Bands",
    optionsConstitution: [
      {
        id: "const-art43f",
        articleNumber: "Article 43(1)(f) & Article 55",
        articleTitle: "Right to Education & Youth Affirmative Action",
        clauseSummary: "Every person has the right to education; the State shall take measures to ensure youth access relevant education, training, and employment opportunities.",
        isCorrect: true,
        explanation: "The Constitution guarantees the right to education and Article 55 mandates affirmative state support for youth empowerment."
      },
      {
        id: "const-art11",
        articleNumber: "Article 11",
        articleTitle: "Culture & Traditional Knowledge",
        clauseSummary: "Promotes national culture and indigenous arts.",
        isCorrect: false,
        explanation: "Article 11 addresses cultural heritage, not university financing structures."
      },
      {
        id: "const-art152",
        articleNumber: "Article 152",
        articleTitle: "Cabinet Composition",
        clauseSummary: "Defines the appointment of Cabinet Secretaries.",
        isCorrect: false,
        explanation: "Article 152 sets executive appointments, not educational access rights."
      },
      {
        id: "const-art94",
        articleNumber: "Article 94",
        articleTitle: "Role of Parliament",
        clauseSummary: "Legislative authority of the Republic.",
        isCorrect: false,
        explanation: "Parliament votes funds, but the substantive right to education is anchored in Article 43 and 55."
      }
    ],
    optionsPolicySolution: [
      {
        id: "sol-hef-correct",
        solutionText: "Revise the Differentiated Unit Cost (DUC) formula, replace flawed algorithmic MTI proxies with decentralized community verification at the Ward level, and guarantee immediate exam clearance upon filing an appeal.",
        type: "constitutional-policy",
        isCorrect: true,
        rationale: "Ensures no student is denied learning while data validation is underway, and combines national grants with transparent criteria."
      },
      {
        id: "sol-hef-trap",
        solutionText: "Promise completely free private and public university education for all 500,000 students starting next Monday without passing any financing bill.",
        type: "populist-trap",
        isCorrect: false,
        rationale: "Unfunded political promises cause university insolvency and lecturer strikes within 3 months when treasury coffers cannot cover the bills."
      },
      {
        id: "sol-hef-inertia",
        solutionText: "Instruct universities to convert unpaid fees into commercial bank loans with 14% compounding interest rates.",
        type: "bureaucratic-inertia",
        isCorrect: false,
        rationale: "Transfers catastrophic debt onto unemployed 21-year-olds, deepening poverty."
      }
    ],
    auditorPrecedentOrLaw: "Universities Act Section 53 & National Assembly Education Committee Directive on HEF Student Exam Clearance (2024).",
    keyConstitutionalArticle: "Article 43(1)(f) & Article 55"
  },
  {
    id: "challenge-county-funds-delay",
    challengeTitle: "National Treasury Freezing Devolved Funds to 47 Counties",
    sector: "Devolution & Fiscal Decentralization",
    situationBrief: "The National Treasury fails to release the monthly equitable share of revenue to 47 counties for 4 consecutive months, citing national liquidity shortages and debt payment prioritization.",
    realWorldImpact: "County garbage collection halts, dispensaries run out of water, local contractors face auctioneers, and county workers go unpaid.",
    statBadge: "KES 90+ Billion Devolved Disbursement Arrears",
    optionsConstitution: [
      {
        id: "const-art219",
        articleNumber: "Article 219 & Article 174",
        articleTitle: "Transfer of Equitable Share to Counties without Undue Delay",
        clauseSummary: "A county's share of revenue raised nationally shall be transferred to the county without undue delay and without deduction; objects of devolution include self-governance and decentralized services.",
        isCorrect: true,
        explanation: "Article 219 uses mandatory constitutional language ('shall be transferred without undue delay and without deduction')."
      },
      {
        id: "const-art228",
        articleNumber: "Article 228",
        articleTitle: "Controller of Budget",
        clauseSummary: "Authorizes withdrawals from public funds.",
        isCorrect: false,
        explanation: "The Controller of Budget approves exchequer releases, but the mandatory duty to transfer without delay is Article 219."
      },
      {
        id: "const-art138",
        articleNumber: "Article 138",
        articleTitle: "Procedure for Presidential Election",
        clauseSummary: "Governs presidential balloting.",
        isCorrect: false,
        explanation: "Unrelated to intergovernmental fiscal relations."
      },
      {
        id: "const-art232",
        articleNumber: "Article 232",
        articleTitle: "Values and Principles of Public Service",
        clauseSummary: "Outlines standards for civil service.",
        isCorrect: false,
        explanation: "Broad public service standards do not contain the specific county equitable transfer mandate."
      }
    ],
    optionsPolicySolution: [
      {
        id: "sol-dev-correct",
        solutionText: "Enact automated Central Bank of Kenya standing orders to release the statutory County Equitable Share on the 15th of every month as a direct first charge on the Consolidated Fund.",
        type: "constitutional-policy",
        isCorrect: true,
        rationale: "Removes political discretion and ministerial bottlenecking by legally ranking county transfers alongside sovereign debt service."
      },
      {
        id: "sol-dev-trap",
        solutionText: "Abolish county governments and return all procurement and healthcare administration to Nairobi ministries to 'cut costs'.",
        type: "populist-trap",
        isCorrect: false,
        rationale: "Reverses devolution, violates the 2010 Constitution, and reinstates the historical marginalization of remote regions."
      },
      {
        id: "sol-dev-inertia",
        solutionText: "Instruct counties to take short-term high-interest overdrafts from commercial banks while waiting for the Treasury.",
        type: "bureaucratic-inertia",
        isCorrect: false,
        rationale: "Forces counties to waste hundreds of millions of public funds on commercial bank overdraft interest penalties."
      }
    ],
    auditorPrecedentOrLaw: "Supreme Court Advisory Opinion No. 3 of 2019 on Division of Revenue and County Equitable Share Disbursements.",
    keyConstitutionalArticle: "Article 219"
  },
  {
    id: "challenge-public-participation",
    challengeTitle: "Finance Bill Taxes Imposed without Genuine Public Participation",
    sector: "Governance & Rule of Law",
    situationBrief: "Parliament passes new contentious tax amendments and statutory levies within 48 hours of introduction, ignoring thousands of citizen written memoranda and stakeholder testimonies.",
    realWorldImpact: "Traders strike, cost of living spikes, and widespread constitutional court petitions declare tax acts unconstitutional for lack of meaningful public engagement.",
    statBadge: "Over 85,000 Citizen Memoranda Submitted",
    optionsConstitution: [
      {
        id: "const-art10",
        articleNumber: "Article 10, Article 118 & Article 201(a)",
        articleTitle: "Public Participation, Openness & Parliamentary Access",
        clauseSummary: "National values bind all state organs to democracy and public participation; Parliament must conduct business in an open manner and facilitate public involvement in legislation.",
        isCorrect: true,
        explanation: "The Supreme Court and High Court have established that public participation is not cosmetic ticking of boxes, but a mandatory constitutional prerequisite."
      },
      {
        id: "const-art78",
        articleNumber: "Article 78",
        articleTitle: "Citizenship and Leadership",
        clauseSummary: "Rules regarding dual citizenship for state officers.",
        isCorrect: false,
        explanation: "Deals with citizenship status of office holders, not legislative procedure."
      },
      {
        id: "const-art143",
        articleNumber: "Article 143",
        articleTitle: "Presidential Immunity",
        clauseSummary: "Protection from legal proceedings during term of office.",
        isCorrect: false,
        explanation: "Deals with executive legal immunity, not parliamentary public consultation."
      },
      {
        id: "const-art259",
        articleNumber: "Article 259",
        articleTitle: "Construing the Constitution",
        clauseSummary: "General rules of statutory interpretation.",
        isCorrect: false,
        explanation: "General legal interpretation rules do not constitute the substantive mandate for public engagement."
      }
    ],
    optionsPolicySolution: [
      {
        id: "sol-part-correct",
        solutionText: "Pass a comprehensive Statutory Public Participation Act establishing mandatory 30-day notice periods, citizen feedback matrix reports detailing why proposals were accepted or rejected, and vernacular public hearings across all 47 counties.",
        type: "constitutional-policy",
        isCorrect: true,
        rationale: "Transforms public participation from an elite Nairobi hotel consultation into an enforceable, transparent, and auditable democratic process."
      },
      {
        id: "sol-part-trap",
        solutionText: "Publish a 400-page gazette notice on a Friday evening and hold a 2-hour virtual meeting on Monday morning with 10 pre-selected industry lobbyists.",
        type: "populist-trap",
        isCorrect: false,
        rationale: "Classic cosmetic box-ticking that fails the constitutional test laid out in British American Tobacco vs Cabinet Secretary for Health."
      },
      {
        id: "sol-part-inertia",
        solutionText: "Rely solely on party whips to enforce strict voting lines without reading public memoranda.",
        type: "bureaucratic-inertia",
        isCorrect: false,
        rationale: "Disregards constitutional mandates and leads to legislation being struck down by the High Court."
      }
    ],
    auditorPrecedentOrLaw: "Court of Appeal Nullification of Finance Act 2023 & Supreme Court Landmark Precedent in Law Society of Kenya v Attorney General (2024).",
    keyConstitutionalArticle: "Article 10 & Article 118"
  },
  {
    id: "challenge-protest-rights",
    challengeTitle: "Excessive Force & Arbitrary Arrests During Peaceful Citizen Petitions",
    sector: "Civil Liberties & Justice",
    situationBrief: "Youth assembling peacefully outside Parliament to present a petition on tax accountability face tear gas, unlawful abductions by plainclothes officers, and unconstitutional blanket protest bans.",
    realWorldImpact: "Dozens of youth injured, civic trust eroded, and international human rights watchdogs issue formal reprimands.",
    statBadge: "Article 37 Absolute Guarantee",
    optionsConstitution: [
      {
        id: "const-art37",
        articleNumber: "Article 37 & Article 24",
        articleTitle: "Right to Assemble, Demonstrate, Picket & Present Petitions",
        clauseSummary: "Every person has the right, peaceably and unarmed, to assemble, to demonstrate, to picket, and to present petitions to public authorities; limitations must be reasonable and justifiable in an open and democratic society.",
        isCorrect: true,
        explanation: "Article 37 guarantees every Kenyan the right to peaceably assemble and present petitions without requiring police 'permission'."
      },
      {
        id: "const-art239",
        articleNumber: "Article 239",
        articleTitle: "National Security Organs",
        clauseSummary: "Establishes KDF, NIS, and National Police Service.",
        isCorrect: false,
        explanation: "Establishes security bodies, but Article 37 is the foundational bill of rights protection for peaceful assembly."
      },
      {
        id: "const-art156",
        articleNumber: "Article 156",
        articleTitle: "Attorney-General",
        clauseSummary: "Defines the principal legal adviser to the government.",
        isCorrect: false,
        explanation: "Defines the AG's office, not fundamental citizen freedoms."
      },
      {
        id: "const-art60",
        articleNumber: "Article 60",
        articleTitle: "Principles of Land Policy",
        clauseSummary: "Governs equitable access to land.",
        isCorrect: false,
        explanation: "Deals with land policy, not freedom of assembly."
      }
    ],
    optionsPolicySolution: [
      {
        id: "sol-prot-correct",
        solutionText: "Enforce Independent Policing Oversight Authority (IPOA) recommendations, require all police officers to wear visible service tags and uniforms during demonstrations, and replace tear-gas containment with community-dialogue de-escalation protocols.",
        type: "constitutional-policy",
        isCorrect: true,
        rationale: "Aligns police conduct with the National Police Service Act Section 61 and Sixth Schedule on the minimum use of force."
      },
      {
        id: "sol-prot-trap",
        solutionText: "Ban all demonstrations in the capital city indefinitely and label all peaceful youth protesters as 'economic saboteurs'.",
        type: "populist-trap",
        isCorrect: false,
        rationale: "Unconstitutional overreach that violates Article 37 and invites direct High Court injunctions."
      },
      {
        id: "sol-prot-inertia",
        solutionText: "Transfer implicated police commanders to different stations without independent judicial inquiries or disciplinary proceedings.",
        type: "bureaucratic-inertia",
        isCorrect: false,
        rationale: "Perpetuates impunity and fails to restore public faith in law enforcement."
      }
    ],
    auditorPrecedentOrLaw: "High Court Judgment in Katiba Institute v Inspector General of Police (2020) affirming police duty is to protect, not prohibit, peaceful demonstrations.",
    keyConstitutionalArticle: "Article 37"
  }
];
