export interface StatutoryCitationItem {
  id: string;
  criterionTitle: string;
  pointNumber: number;
  statutoryAct: string;
  constitutionalArticle: string;
  sourceAgency: string;
  hyperlink: string;
  citationSnippet: string;
  domainSpecificContext?: string;
  verificationLevel: "Constitutional Mandate" | "Statutory Law" | "Official Economic Baseline" | "Judicial Precedent";
}

export function getPointStatutoryCitations(
  pointIndexOrTitle: string | number,
  domain: string = "Economic Growth & Productivity"
): StatutoryCitationItem {
  let idx = typeof pointIndexOrTitle === "number" ? pointIndexOrTitle : 1;
  
  if (typeof pointIndexOrTitle === "string") {
    const match = pointIndexOrTitle.match(/^(\d+)/);
    if (match) {
      idx = parseInt(match[1], 10);
    } else if (pointIndexOrTitle.toLowerCase().includes("problem")) idx = 1;
    else if (pointIndexOrTitle.toLowerCase().includes("exact") || pointIndexOrTitle.toLowerCase().includes("propos")) idx = 2;
    else if (pointIndexOrTitle.toLowerCase().includes("implement")) idx = 3;
    else if (pointIndexOrTitle.toLowerCase().includes("cost") || pointIndexOrTitle.toLowerCase().includes("realism")) idx = 4;
    else if (pointIndexOrTitle.toLowerCase().includes("revenue") || pointIndexOrTitle.toLowerCase().includes("financ") || pointIndexOrTitle.toLowerCase().includes("where will")) idx = 5;
    else if (pointIndexOrTitle.toLowerCase().includes("institution")) idx = 6;
    else if (pointIndexOrTitle.toLowerCase().includes("outcome") || pointIndexOrTitle.toLowerCase().includes("kpi")) idx = 7;
    else if (pointIndexOrTitle.toLowerCase().includes("timeline") || pointIndexOrTitle.toLowerCase().includes("milestone")) idx = 8;
    else if (pointIndexOrTitle.toLowerCase().includes("risk") || pointIndexOrTitle.toLowerCase().includes("bottleneck")) idx = 9;
    else if (pointIndexOrTitle.toLowerCase().includes("evidence") || pointIndexOrTitle.toLowerCase().includes("precedent")) idx = 10;
    else if (pointIndexOrTitle.toLowerCase().includes("group") || pointIndexOrTitle.toLowerCase().includes("count") || pointIndexOrTitle.toLowerCase().includes("youth")) idx = 11;
    else if (pointIndexOrTitle.toLowerCase().includes("constitut") || pointIndexOrTitle.toLowerCase().includes("legal") || pointIndexOrTitle.toLowerCase().includes("201")) idx = 12;
    else if (pointIndexOrTitle.toLowerCase().includes("2060") || pointIndexOrTitle.toLowerCase().includes("vision") || pointIndexOrTitle.toLowerCase().includes("long-term")) idx = 13;
  }

  // Domain-specific customization
  const isHealth = domain.toLowerCase().includes("health");
  const isEducation = domain.toLowerCase().includes("education") || domain.toLowerCase().includes("cbc") || domain.toLowerCase().includes("tvet");
  const isAgri = domain.toLowerCase().includes("agri") || domain.toLowerCase().includes("food");
  const isTech = domain.toLowerCase().includes("tech") || domain.toLowerCase().includes("digital") || domain.toLowerCase().includes("youth");
  const isHousing = domain.toLowerCase().includes("housing");

  switch (idx) {
    case 1:
      return {
        id: `stat-p1-${domain}`,
        criterionTitle: "1. Problem Solved & Baseline Evidence",
        pointNumber: 1,
        statutoryAct: "Statistics Act No. 4 of 2006 & Public Participation Guidelines",
        constitutionalArticle: "Article 35 (Right of Access to Information) & Article 43 (Economic & Social Rights)",
        sourceAgency: "Kenya National Bureau of Statistics (KNBS) & KIHBS Survey",
        hyperlink: "https://www.knbs.or.ke",
        citationSnippet: "All national policies must articulate verifiable baselines based on official national statistics published by KNBS under Section 4 of the Statistics Act.",
        domainSpecificContext: isHealth 
          ? "Referenced against Kenya Household Health Expenditure and Utilization Survey (KHHEUS)." 
          : isEducation 
          ? "Referenced against Ministry of Education National Basic Education Statistical Booklet."
          : "Grounded in KNBS Economic Survey 2026 Macroeconomic and Poverty Line Indicators.",
        verificationLevel: "Official Economic Baseline"
      };

    case 2:
      return {
        id: `stat-p2-${domain}`,
        criterionTitle: "2. Exact Proposal Specification",
        pointNumber: 2,
        statutoryAct: "Statutory Instruments Act No. 23 of 2013, Section 5",
        constitutionalArticle: "Article 10 (National Values: Transparency, Integrity & Rule of Law)",
        sourceAgency: "Kenya Law Reform Commission (KLRC) & National Council for Law Reporting",
        hyperlink: "http://kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/StatutoryInstrumentsAct_No23of2013.pdf",
        citationSnippet: "Proposals with regulatory or legislative effect must define precise legal objects, scope of authority, and draft regulatory impact assessments.",
        domainSpecificContext: "Statutory precision ensures campaign promises translate into actionable legislative bills without ultra vires executive overreach.",
        verificationLevel: "Statutory Law"
      };

    case 3:
      return {
        id: `stat-p3-${domain}`,
        criterionTitle: "3. Implementation Mechanism & Administrative Framework",
        pointNumber: 3,
        statutoryAct: "Intergovernmental Relations Act No. 2 of 2012, Sec 12 & Executive Order No. 2",
        constitutionalArticle: "Article 189 & 190 (Cooperation between National Government and 47 Counties)",
        sourceAgency: "Council of Governors (CoG) & Intergovernmental Relations Technical Committee (IGRTC)",
        hyperlink: "http://kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/IntergovernmentalRelationsAct_No2of2012.pdf",
        citationSnippet: "Functions devolved under the Fourth Schedule (such as primary health, county roads, agriculture) cannot be unilaterally executed by national ministries without intergovernmental consensus.",
        domainSpecificContext: isHealth
          ? "De-concentrated health execution requires joint National-County health financing agreements under SHIA Sec 42."
          : "Intergovernmental coordination prevents duplicate administrative costs across national and county levels.",
        verificationLevel: "Constitutional Mandate"
      };

    case 4:
      return {
        id: `stat-p4-${domain}`,
        criterionTitle: "4. Cost Estimate & Fiscal Costing Realism",
        pointNumber: 4,
        statutoryAct: "Public Finance Management (PFM) Act 2012, Section 15(2)",
        constitutionalArticle: "Article 201(d) (Prudent and Responsible Use of Public Money)",
        sourceAgency: "Parliamentary Budget Office (PBO) & National Treasury Fiscal Affairs Department",
        hyperlink: "http://kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/PublicFinanceManagementAct_No18of2012.pdf",
        citationSnippet: "Fiscal responsibility principles require recurrent expenditure to not exceed total revenue, and over medium term a minimum of 30% allocated to development.",
        domainSpecificContext: "PBO policy costing model evaluates multi-year operating vs capital expenditure requirements against national budget ceilings.",
        verificationLevel: "Statutory Law"
      };

    case 5:
      return {
        id: `stat-p5-${domain}`,
        criterionTitle: "5. Revenue & Financing Source (Where Does the Money Come From?)",
        pointNumber: 5,
        statutoryAct: "Public Finance Management Regulations 2015, Regulation 26 & PFM Act Sec 33",
        constitutionalArticle: "Article 201(c) (Equitable Burden Sharing Across Generations & Debt Sustainability)",
        sourceAgency: "Office of the Controller of Budget (OCOB) & Central Bank of Kenya (CBK)",
        hyperlink: "https://cob.go.ke/reports/budget-implementation-review-reports/",
        citationSnippet: "Article 201(c) dictates public borrowing must be sustainable and equitably shared between present and future generations; cannot rely on un-enacted hypothetical levies.",
        domainSpecificContext: "Controller of Budget outturns verify actual exchequer absorption, domestic borrowing limits, and Consolidated Fund first charges.",
        verificationLevel: "Constitutional Mandate"
      };

    case 6:
      return {
        id: `stat-p6-${domain}`,
        criterionTitle: "6. Responsible Institutions & Execution Mandate",
        pointNumber: 6,
        statutoryAct: "Leadership and Integrity Act No. 19 of 2012 & State Corporations Act Cap 446",
        constitutionalArticle: "Chapter Six (Leadership and Integrity) & Article 232 (Values of Public Service)",
        sourceAgency: "Ethics and Anti-Corruption Commission (EACC) & Public Service Commission (PSC)",
        hyperlink: "http://kenyalaw.org/kl/fileadmin/pdfdownloads/Acts/LeadershipandIntegrityAct_No19of2012.pdf",
        citationSnippet: "Public institutions designated as implementing agencies must possess statutory governance structures and be subject to Chapter Six oversight and parliamentary scrutiny.",
        domainSpecificContext: "Validates whether existing semi-autonomous government agencies (SAGAs) have legal mandate or if new parastatals must be created.",
        verificationLevel: "Constitutional Mandate"
      };

    case 7:
      return {
        id: `stat-p7-${domain}`,
        criterionTitle: "7. Measurable Outcomes & Citizen KPIs",
        pointNumber: 7,
        statutoryAct: "National Integrated Monitoring and Evaluation System (NIMES) Policy",
        constitutionalArticle: "Article 225 & 226 (Financial Control and Public Accounts Verification)",
        sourceAgency: "State Department for Economic Planning & Kenya National Bureau of Statistics",
        hyperlink: "https://www.treasury.go.ke/monitoring-and-evaluation/",
        citationSnippet: "Public policies must establish quantifiable Key Performance Indicators (KPIs) verifiable by independent state auditors and civil society watchdogs.",
        domainSpecificContext: "Ensures citizen impact is measured in concrete human outcomes (e.g. maternal mortality reduction, youth employment, acreage under irrigation) rather than inputs spent.",
        verificationLevel: "Official Economic Baseline"
      };

    case 8:
      return {
        id: `stat-p8-${domain}`,
        criterionTitle: "8. Implementation Timeline & Critical Path Milestones",
        pointNumber: 8,
        statutoryAct: "PFM Act 2012, Sec 25 (Budget Policy Statement Milestones) & Planning Guidelines",
        constitutionalArticle: "Article 220 (Form, Content and Timing of National Budgets)",
        sourceAgency: "National Treasury & Parliamentary Departmental Committees",
        hyperlink: "http://www.parliament.go.ke/the-national-assembly/budget-office",
        citationSnippet: "Policy rollouts must align with the statutory Medium-Term Expenditure Framework (MTEF) 3-year rolling cycles and annual budget calendar deadlines.",
        domainSpecificContext: "Validates first 100-day feasibility against the national exchequer timeline and parliamentary appropriations schedule.",
        verificationLevel: "Statutory Law"
      };

    case 9:
      return {
        id: `stat-p9-${domain}`,
        criterionTitle: "9. Major Risks, Legal Bottlenecks & Mitigations",
        pointNumber: 9,
        statutoryAct: "Public Audit Act No. 34 of 2015 & Public Procurement and Asset Disposal Act 2015",
        constitutionalArticle: "Article 227 (Fair, Equitable, Transparent Public Procurement)",
        sourceAgency: "Office of the Auditor-General (OAG) & Public Procurement Regulatory Authority (PPRA)",
        hyperlink: "https://www.oagkenya.go.ke/audit-reports/",
        citationSnippet: "Auditor-General findings highlight recurring capital project risks: pending bills, land acquisition litigation, contractor default, and procurement injunctions.",
        domainSpecificContext: "Analyzes systemic risk mitigations required to prevent stalled projects or legal challenges at the High Court.",
        verificationLevel: "Statutory Law"
      };

    case 10:
      return {
        id: `stat-p10-${domain}`,
        criterionTitle: "10. Empirical Evidence & Precedent Studies",
        pointNumber: 10,
        statutoryAct: "Kenya Institute for Public Policy Research and Analysis (KIPPRA) Act 2006",
        constitutionalArticle: "Article 10(2)(c) (Good Governance, Transparency, Sustainable Development)",
        sourceAgency: "KIPPRA, Central Bank of Kenya (CBK) & African Development Bank (AfDB)",
        hyperlink: "https://kippra.or.ke",
        citationSnippet: "Policy design must draw from peer empirical evidence, historical budget absorption data, and macro econometric modeling published by statutory think-tanks.",
        domainSpecificContext: "Tests proposal assumptions against domestic Kenyan precedents and comparable East African Community (EAC) policy outcomes.",
        verificationLevel: "Official Economic Baseline"
      };

    case 11:
      return {
        id: `stat-p11-${domain}`,
        criterionTitle: "11. Distribution Across 47 Counties & Equity Safeguards",
        pointNumber: 11,
        statutoryAct: "Commission on Revenue Allocation (CRA) Act 2011 & County Allocation of Revenue Act (CARA)",
        constitutionalArticle: "Article 201(b) (Equality of Resource Distribution), Article 204 (Equalization Fund), Article 55 (Youth)",
        sourceAgency: "Commission on Revenue Allocation (CRA) & Equalization Fund Advisory Board",
        hyperlink: "https://cra.go.ke/revenue-allocation/",
        citationSnippet: "Article 201(b) mandates that expenditure shall promote the equitable development of the country, making special provision for marginalized groups and areas.",
        domainSpecificContext: "Cross-checks spatial benefit distribution across all 47 counties to prevent regional favoritism or exclusion.",
        verificationLevel: "Constitutional Mandate"
      };

    case 12:
      return {
        id: `stat-p12-${domain}`,
        criterionTitle: "12. Constitutional & Legal Viability (Art. 201 & Chapter 6)",
        pointNumber: 12,
        statutoryAct: "Constitution of Kenya 2010 (Article 201, Chapter 6, Chapter 4) & High Court Jurisprudence",
        constitutionalArticle: "Article 201 (Public Finance), Article 2(4) (Supremacy of the Constitution), Article 20",
        sourceAgency: "Judiciary of Kenya (Supreme Court & High Court Constitutional Division) & Kenya Law",
        hyperlink: "http://kenyalaw.org/caselaw/",
        citationSnippet: "Any policy provision conflicting with Article 201 fiscal prudence, Chapter Six integrity, or Fourth Schedule devolution division of powers is void pursuant to Article 2(4).",
        domainSpecificContext: "Grounded in leading High Court and Court of Appeal precedents on public participation (Okiya Omtatah & Katiba Institute jurisprudence).",
        verificationLevel: "Judicial Precedent"
      };

    case 13:
    default:
      return {
        id: `stat-p13-${domain}`,
        criterionTitle: "13. Kenya 2060 Long-Term Alignment & Intergenerational Legacy",
        pointNumber: 13,
        statutoryAct: "Sessional Paper No. 10 of 2012 on Kenya Vision 2030 & National Spatial Plan 2015-2045",
        constitutionalArticle: "Preamble & Article 10(2)(d) (Sustainable Development for Future Generations)",
        sourceAgency: "Kenya Vision 2030 Delivery Secretariat & National Economic and Social Council (NESC)",
        hyperlink: "https://vision2030.go.ke",
        citationSnippet: "Evaluates whether the proposal creates compounding national wealth, industrial sovereignty, and structural human capital for Kenya's centennial horizon (2060).",
        domainSpecificContext: "Ensures continuity beyond 5-year electoral cycles, safeguarding debt sustainability and climate resilience for future generations.",
        verificationLevel: "Constitutional Mandate"
      };
  }
}
