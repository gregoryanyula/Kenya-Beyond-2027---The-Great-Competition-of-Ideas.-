export interface PoliticalDebateEvent {
  id: string;
  title: string;
  tier: "Presidential (Tier 1)" | "Presidential (Tier 2)" | "Deputy Presidential" | "Gubernatorial (Strategic)" | "Parliamentary & Thematic Townhall";
  date: string; // ISO format or human readable
  dateISO: string;
  timeEAT: string;
  venue: string;
  city: string;
  moderators: string[];
  organizers: string[];
  broadcastPartners: string[];
  status: "Upcoming" | "Live Now" | "Concluded / Transcribed";
  keyThemes: string[];
  candidateLineup: {
    name: string;
    partyOrCoalition: string;
    confirmed: boolean;
    stanceFocus: string;
  }[];
  transcriptExcerptAvailable?: boolean;
  verifiedFactChecksCount?: number;
  sampleAuditedQuotes?: {
    candidate: string;
    quote: string;
    topic: string;
    factCheckVerdict: "Verified True" | "Misleading / Uncosted" | "Contradicted by Official Data";
    constitutionalCitation: string;
    explanation: string;
  }[];
  liveStreamUrl?: string;
}

export const POLITICAL_DEBATES_DATA: PoliticalDebateEvent[] = [
  {
    id: "deb-2027-pres-tier1",
    title: "2027 National Presidential Debate (Tier 1 Flagbearers)",
    tier: "Presidential (Tier 1)",
    date: "July 20, 2027",
    dateISO: "2027-07-20T19:30:00+03:00",
    timeEAT: "7:30 PM - 10:00 PM EAT",
    venue: "Catholic University of Eastern Africa (CUEA) Auditorium",
    city: "Nairobi",
    moderators: ["Yvonne Okwara (Citizen TV)", "Eric Latiff (Spice FM / KTN)", "Linus Kaikai (Royal Media)"],
    organizers: ["Debates Media Limited", "Kenya Editors Guild (KEG)", "Media Owners Association (MOA)"],
    broadcastPartners: ["KBC", "Citizen TV", "NTV", "KTN News", "Spice FM", "Ramogi TV", "Kass FM", "YouTube Live"],
    status: "Upcoming",
    keyThemes: [
      "Public Debt Restructuring & Article 201 Fiscal Sustainability",
      "Cost of Living, Food Sovereignty & Fertilizer Supply Chains",
      "Youth Unemployment & TVET Job Guarantee Framework",
      "Healthcare Transition (Social Health Authority & Universal Access)"
    ],
    candidateLineup: [
      {
        name: "Incumbent Flagbearer",
        partyOrCoalition: "Kenya Kwanza / United Democratic Alliance Coalition",
        confirmed: true,
        stanceFocus: "Continuity of Bottom-Up Economic Transformation, Affordable Housing delivery & Tax base expansion."
      },
      {
        name: "Opposition Coalition Flagbearer",
        partyOrCoalition: "Azimio La Umoja / United Opposition Alliance",
        confirmed: true,
        stanceFocus: "Immediate reduction of punitive levies, zero-rating farm inputs, re-evaluating public debt audits."
      },
      {
        name: "Third-Pole Progressive Flagbearer",
        partyOrCoalition: "Safina / Civic Transformation Movement",
        confirmed: true,
        stanceFocus: "Decentralized youth venture capital, slashing executive hospitality, technocratic anti-corruption tribunals."
      }
    ],
    transcriptExcerptAvailable: true,
    verifiedFactChecksCount: 8,
    sampleAuditedQuotes: [
      {
        candidate: "Incumbent Flagbearer",
        quote: "We have fully eliminated agricultural importation dependencies and our foreign debt service is now under 40% of ordinary revenue.",
        topic: "Debt & Food Imports",
        factCheckVerdict: "Contradicted by Official Data",
        constitutionalCitation: "Article 201(c) - Burden of public borrowing",
        explanation: "KNBS 2026 and CBK data show debt service absorbed 61.2% of ordinary revenue, and Kenya still spent KES 84 Billion importing edible oils and rice."
      },
      {
        candidate: "Opposition Flagbearer",
        quote: "We will allocate KES 100,000 to every unemployed youth within 60 days without raising taxes or taking a single new foreign loan.",
        topic: "Youth Grants",
        factCheckVerdict: "Misleading / Uncosted",
        constitutionalCitation: "Article 201(d) - Prudent and responsible financial management",
        explanation: "With ~5.2 million unemployed youth, this would cost KES 520 Billion annually (~18% of the national budget), with no identified revenue stream."
      }
    ]
  },
  {
    id: "deb-2027-deputy-pres",
    title: "2027 Deputy Presidential Running Mates Debate",
    tier: "Deputy Presidential",
    date: "July 13, 2027",
    dateISO: "2027-07-13T19:30:00+03:00",
    timeEAT: "7:30 PM - 9:30 PM EAT",
    venue: "Strathmore University Business School Auditorium",
    city: "Nairobi",
    moderators: ["Sophia Wanuna (Standard Group)", "Sam Gituku (Citizen TV)"],
    organizers: ["Kenya Editors Guild (KEG)", "Media Council of Kenya"],
    broadcastPartners: ["All National TV & Radio Stations", "KBC", "Capital FM", "Nation Digital"],
    status: "Upcoming",
    keyThemes: [
      "Devolution Equitable Share & Timely Cash Disbursals",
      "Anti-Corruption Enforcement & Chapter 6 Integrity Compliance",
      "Competency-Based Curriculum (CBC) & University HEF Model Financing"
    ],
    candidateLineup: [
      {
        name: "Incumbent Running Mate",
        partyOrCoalition: "Kenya Kwanza Alliance",
        confirmed: true,
        stanceFocus: "Consolidating coffee/tea minimum guaranteed returns and national digitisation."
      },
      {
        name: "Opposition Running Mate",
        partyOrCoalition: "Azimio Coalition",
        confirmed: true,
        stanceFocus: "Enforcing prompt disbursement of 35% revenue share to counties and strengthening Auditor General powers."
      }
    ],
    transcriptExcerptAvailable: false,
    verifiedFactChecksCount: 5
  },
  {
    id: "deb-2027-gubernatorial-nairobi",
    title: "Nairobi City County Gubernatorial Debate",
    tier: "Gubernatorial (Strategic)",
    date: "July 6, 2027",
    dateISO: "2027-07-06T19:00:00+03:00",
    timeEAT: "7:00 PM - 9:00 PM EAT",
    venue: "Kenya Cultural Centre & National Theatre",
    city: "Nairobi",
    moderators: ["Ken Mijungu (Standard Media)", "Mashirima Kapombe (Citizen TV)"],
    organizers: ["Nairobi Civic Coalition", "Kenya Editors Guild"],
    broadcastPartners: ["Citizen TV", "Ghetto Radio", "KBC", "Spice FM"],
    status: "Upcoming",
    keyThemes: [
      "Own-Source Revenue Integrity & Automation (e-Services)",
      "Urban Drainage, Waste Management & Water Rationing",
      "Public Health Level 4 & 5 Hospitals Drug Supply"
    ],
    candidateLineup: [
      {
        name: "Incumbent Nairobi Governor",
        partyOrCoalition: "Ruling Coalition",
        confirmed: true,
        stanceFocus: "Dishi na County expansion and unified borough administration."
      },
      {
        name: "Opposition Candidate",
        partyOrCoalition: "Opposition Coalition",
        confirmed: true,
        stanceFocus: "Automated revenue collection with zero leakages, piped clean water in all informal settlements."
      },
      {
        name: "Independent Civic Candidate",
        partyOrCoalition: "Independent",
        confirmed: true,
        stanceFocus: "Non-motorized transit, open tender public procurement, reclaiming public school lands."
      }
    ],
    transcriptExcerptAvailable: false,
    verifiedFactChecksCount: 4
  },
  {
    id: "deb-2027-gubernatorial-mombasa",
    title: "Mombasa & Coastal Region Blue Economy Gubernatorial Townhall",
    tier: "Gubernatorial (Strategic)",
    date: "June 29, 2027",
    dateISO: "2027-06-29T18:30:00+03:00",
    timeEAT: "6:30 PM - 8:30 PM EAT",
    venue: "Swahilipot Hub Amphitheatre",
    city: "Mombasa",
    moderators: ["Ali Manzu (KTN)", "Nimrod Taabu (Citizen TV)"],
    organizers: ["Coast Civil Society Forum", "Media Council of Kenya"],
    broadcastPartners: ["Baraka FM", "Radio Rahma", "KBC Channel 1", "NTV Kenya"],
    status: "Upcoming",
    keyThemes: [
      "Port Logistics Revenue Retention & Local Value Addition",
      "Fisheries Modern Cold Chain & Exclusive Economic Zone (EEZ) Exploitation",
      "Youth Unemployment & Coastal Security Governance"
    ],
    candidateLineup: [
      {
        name: "Mombasa Gubernatorial Hopefuls",
        partyOrCoalition: "Multi-Party Forum",
        confirmed: true,
        stanceFocus: "Revitalizing tourism, maritime training colleges, and county industrial parks."
      }
    ],
    transcriptExcerptAvailable: false,
    verifiedFactChecksCount: 3
  },
  {
    id: "deb-2027-thematic-debt",
    title: "National Parliamentary Finance & Public Debt Townhall",
    tier: "Parliamentary & Thematic Townhall",
    date: "June 15, 2027",
    dateISO: "2027-06-15T19:00:00+03:00",
    timeEAT: "7:00 PM - 9:30 PM EAT",
    venue: "University of Nairobi Taifa Hall",
    city: "Nairobi",
    moderators: ["Victoria Rubadiri", "Trevor Ombija"],
    organizers: ["Institute of Certified Public Accountants of Kenya (ICPAK)", "Institute of Economic Affairs (IEA)", "Katiba Institute"],
    broadcastPartners: ["NTV", "Citizen Digital", "IEA YouTube", "KBC"],
    status: "Upcoming",
    keyThemes: [
      "Finance Bill 2027 Revenue Measures vs Article 201 Public Scrutiny",
      "Auditor General Report Follow-Up & Surcharge Enforcement",
      "Pending Bills Clearance at National & County Levels"
    ],
    candidateLineup: [
      {
        name: "National Assembly Finance Committee Leadership",
        partyOrCoalition: "Bi-Partisan Parliamentary Committee",
        confirmed: true,
        stanceFocus: "Medium-Term Revenue Strategy (MTRS) justification and tax base broadening."
      },
      {
        name: "Opposition Finance Spokespersons",
        partyOrCoalition: "Minority Coalition",
        confirmed: true,
        stanceFocus: "Slashing wasteful recurrent expenditures and expanding county transfers."
      }
    ],
    transcriptExcerptAvailable: true,
    verifiedFactChecksCount: 6
  }
];
