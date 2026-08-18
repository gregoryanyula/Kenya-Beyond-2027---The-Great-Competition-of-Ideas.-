export interface MediaStandardGuideline {
  id: string;
  category: "Debate Moderation" | "Journalistic Scrutiny" | "Digital Creators & Podcasters" | "Fact-Checking Protocol";
  title: string;
  rule: string;
  mandatoryFollowUpQuestions: string[];
  bannedPractices: string[];
}

export const MEDIA_STANDARDS: MediaStandardGuideline[] = [
  {
    id: "media-debates",
    category: "Debate Moderation",
    title: "The 5-Step Debate Moderation Standard: No Slogans Allowed",
    rule: "Debate moderators must never allow a candidate to give a broad political promise without immediately demanding the five core policy details: Cost, Revenue Source, Implementation Lead, Timeline, and Measurable Metric.",
    mandatoryFollowUpQuestions: [
      "Candidate, you promised X. How much will that cost in Kenyan Shillings, and which line item in the budget will fund it?",
      "Which specific government agency will execute this, and what law needs to be amended first?",
      "If you cut tax Y, where will the replacement revenue come from, or which budget line will you cut?",
      "What is the single measurable KPI citizens should judge your first 100 days by?",
      "What evidence or comparative precedent shows that your proposed method works?"
    ],
    bannedPractices: [
      "Allowing candidates to dodge questions with ethnic, personal, or partisan attacks.",
      "Accepting vague generalities ('We will consult stakeholders') as policy answers.",
      "Giving unequal time or softball questions based on candidate prominence."
    ]
  },
  {
    id: "media-investigative",
    category: "Journalistic Scrutiny",
    title: "Evidence-Based Manifestos & Budget Audits",
    rule: "Political journalists must subject every party manifesto to rigorous verification with the Parliamentary Budget Office (PBO), Auditor-General reports, and KNBS economic surveys before reporting.",
    mandatoryFollowUpQuestions: [
      "Has your manifesto been independently costed by economists or the Parliamentary Budget Office?",
      "How does this pledge reconcile with Kenya's existing debt service obligations of over KES 1 Trillion?",
      "What is the projected impact on inflation, foreign exchange reserves, and interest rates?",
      "How will you avoid the implementation bottlenecks that stalled previous similar programs?"
    ],
    bannedPractices: [
      "Sensationalist reporting focusing purely on crowd sizes, helicopter arrivals, and insult soundbites.",
      "Publishing unverified opinion polls without methodology, sample size, or funding disclosure.",
      "Treating political press conferences as uncontested facts."
    ]
  },
  {
    id: "media-creators",
    category: "Digital Creators & Podcasters",
    title: "Youth Digital Discourse: 'Usitupatie Slogan. Tupatie Plan.'",
    rule: "Content creators, streamers, and podcasters should use creative digital storytelling, comedy, and infographics to explain complex public finance, devolution, and policy tradeoffs to young voters.",
    mandatoryFollowUpQuestions: [
      "How does this policy directly affect an unemployed graduate, a boda-boda rider, or a mama mboga in practical shillings and cents?",
      "What will stop this fund or project from being looted by cartels?",
      "Show us the real numbers behind the viral slogan."
    ],
    bannedPractices: [
      "Spreading unverified rumors, deepfakes, or ethnic hate speech for viral engagement.",
      "Accepting paid political sponsorships without clear public disclosure.",
      "Mocking policy discussions as boring or irrelevant to youth."
    ]
  },
  {
    id: "media-fact-checking",
    category: "Fact-Checking Protocol",
    title: "Rigorous Non-Partisan Fact-Checking Standard",
    rule: "Every political statement must be systematically tagged as Fact, Claim, Evidence, Analysis, Uncertainty, or Recommendation, referencing authoritative statutory records.",
    mandatoryFollowUpQuestions: [
      "What primary source (KNBS, Treasury, OCOB, Judiciary) corroborates this number?",
      "Is the speaker citing nominal or real inflation-adjusted figures?",
      "Are correlation and causation being confused in this political claim?"
    ],
    bannedPractices: [
      "Selectively fact-checking only one political coalition while ignoring false claims by opponents.",
      "Using subjective partisan labels like 'corrupt' or 'failed' without objective evidentiary backing.",
      "Failing to publish prominent corrections when fact-checks are found to contain errors."
    ]
  }
];

export const CANDIDATE_TOWNHALL_QUESTIONNAIRE = [
  {
    sector: "Economy & Jobs",
    question: "Under your economic model, what is your realistic GDP growth target, how many net formal jobs will be created annually, and what specific tax rate or tariff changes will you enact within your first 90 days?"
  },
  {
    sector: "Public Debt & Fiscal Deficit",
    question: "Kenya currently spends over 55-60% of ordinary tax revenue on debt servicing. What is your precise plan to refinance or service this debt without ballooning the fiscal deficit or raising punitive taxes on basic goods?"
  },
  {
    sector: "Healthcare & Social Protection",
    question: "How will you ensure every Kenyan, regardless of income, receives immediate emergency, chronic, and primary healthcare without out-of-pocket medical impoverishment or hospital denial of care?"
  },
  {
    sector: "Agriculture & Food Security",
    question: "What is your audited plan to expand acreage under modern irrigation, eliminate post-harvest losses, and ensure smallholder farmers receive profitable prices for their produce?"
  },
  {
    sector: "Devolution & 47 Counties",
    question: "How will your government end National Treasury disbursement delays to the 47 counties and support county governments to grow own-source revenue sustainably?"
  },
  {
    sector: "Corruption & Chapter 6",
    question: "What institutional guarantees will you enact to protect the Judiciary, EACC, and Auditor-General from executive overreach, and will you mandate full public disclosure of all state tender awards and beneficial ownership?"
  },
  {
    sector: "Kenya 2060 Long-term Continuity",
    question: "Which major national infrastructure, energy transition, and education programs initiated by previous administrations will you commit to completing rather than abandoning?"
  }
];
