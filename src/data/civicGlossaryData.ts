import { CivicGlossaryTerm } from "../types";

export const CIVIC_GLOSSARY_TERMS: CivicGlossaryTerm[] = [
  {
    term: "Fiscal Deficit",
    slug: "fiscal-deficit",
    category: "Public Finance & Debt",
    shortDefinition: "The shortfall that occurs when the government's total expenditure exceeds the total revenue it generates in a financial year, excluding borrowed money.",
    fullExplainer: "When government spends more than it collects in taxes, customs duties, and ministerial fees, it must bridge the gap by borrowing domestically (Treasury bills/bonds) or externally (Eurobonds, World Bank/IMF, bilateral loans). A high fiscal deficit (e.g. above 4.5% of GDP) increases debt accumulation and inflation risk.",
    whyItMattersFor2027: "Candidates promising massive new spending while simultaneously promising tax cuts are creating an unfunded fiscal deficit that inevitably triggers higher public borrowing or currency depreciation.",
    kenyaContextExample: "Kenya's budget of KES 4.0 Trillion with KES 2.9 Trillion in ordinary revenue creates an overall fiscal deficit of approx. KES 1.1 Trillion (approx. 5.7% of GDP) financed via debt.",
    relatedArticleOrLaw: "Article 201(c) & (d) of Constitution; PFM Act 2012"
  },
  {
    term: "Primary Balance (Surplus / Deficit)",
    slug: "primary-balance",
    category: "Public Finance & Debt",
    shortDefinition: "Government net fiscal balance (revenue minus expenditure) excluding all debt interest payments.",
    fullExplainer: "The primary balance measures whether current revenue is enough to cover current government operational programs and development projects before paying a single shilling of interest on past debt. A primary surplus means the country is not borrowing just to service interest on old loans.",
    whyItMattersFor2027: "A candidate who achieves a primary surplus is stabilizing national debt dynamics and stopping the debt trap cycle.",
    kenyaContextExample: "Targeting a primary surplus of 1.2% of GDP ensures debt service does not require rolling over debt with expensive commercial bridge loans.",
    relatedArticleOrLaw: "Article 201(c) Intergenerational Equity"
  },
  {
    term: "Debt Service 'First Charge'",
    slug: "debt-service-first-charge",
    category: "Public Finance & Debt",
    shortDefinition: "A constitutional mandate that public debt repayments must be deducted first from the Consolidated Fund before any other government program or county transfer is funded.",
    fullExplainer: "Under Article 214 and 206 of the Constitution of Kenya, debt repayment is a sovereign guarantee. If Kenya collects KES 100 Billion in taxes in a given month and debt service obligations are KES 65 Billion, the National Treasury MUST pay the KES 65 Billion first, leaving only KES 35 Billion for salaries, medicine, free schooling capitation, and county allocations.",
    whyItMattersFor2027: "Explains why social service budgets get cut or delayed during heavy sovereign debt maturity cycles.",
    kenyaContextExample: "In FY 2024/25, debt service (principal + interest) exceeded KES 1.8 Trillion, consuming over 62% of all ordinary national tax revenue.",
    relatedArticleOrLaw: "Article 214 & Article 206(1) of Constitution"
  },
  {
    term: "Article 201 Intergenerational Equity",
    slug: "article-201-intergenerational-equity",
    category: "Constitution & Law",
    shortDefinition: "The constitutional rule requiring that the burden of public debt and use of natural resources must not be passed onto future generations without creating enduring productive assets.",
    fullExplainer: "Article 201(c) prohibits taking 10-year commercial loans to pay for recurrent expenses (salaries, per diems, tea, or consumptive subsidies). Borrowing is only justifiable if it funds high-return capital infrastructure (power grids, ports, irrigation) that creates long-term wealth for future generations who will repay the loan.",
    whyItMattersFor2027: "Constitutional test to disqualify unfunded campaign handouts that mortgage Kenya's youth.",
    kenyaContextExample: "High Court rulings requiring parliamentary public debt sustainability audits before enacting national borrowing limits.",
    relatedArticleOrLaw: "Constitution of Kenya 2010, Article 201(c)"
  },
  {
    term: "Equalization Fund",
    slug: "equalization-fund",
    category: "Devolution & Governance",
    shortDefinition: "A special fund established under Article 204 providing 0.5% of all national revenue to bring basic services (water, roads, health, electricity) in marginalized counties to the national standard.",
    fullExplainer: "Administered by the Equalization Fund Advisory Board, this fund directly targets historically marginalized pastoralist and arid areas (e.g. Turkana, Mandera, Samburu, Marsabit, Tana River) to remedy decades of regional infrastructure inequality.",
    whyItMattersFor2027: "Guarantees affirmative action resources for historically neglected frontier counties.",
    kenyaContextExample: "KES 14 Billion annually disbursed to provide clean solar-powered boreholes, maternity clinics, and rural feeder roads across 14 marginalized counties.",
    relatedArticleOrLaw: "Article 204 of the Constitution"
  },
  {
    term: "Division of Revenue Bill (DoRB)",
    slug: "division-of-revenue-bill",
    category: "Devolution & Governance",
    shortDefinition: "The annual national law that divides total ordinary audited revenue between the National Government and the 47 County Governments.",
    fullExplainer: "Prepared by the National Treasury in consultation with the Commission on Revenue Allocation (CRA) and the Intergovernmental Budget and Economic Council (IBEC). Must be passed by both the National Assembly and the Senate before the budget can be executed.",
    whyItMattersFor2027: "The battleground for devolution financing. Determines whether counties receive 15%, 25%, or 35% equitable share.",
    kenyaContextExample: "The CRA recommended KES 400 Billion for counties in FY 2024/25, while the National Assembly and Senate negotiated between KES 385B and KES 400B.",
    relatedArticleOrLaw: "Article 218 & Article 203 of Constitution"
  },
  {
    term: "Absorptive Capacity",
    slug: "absorptive-capacity",
    category: "Devolution & Governance",
    shortDefinition: "The ability of a government ministry, department, or county to actually plan, procure, and spend its allocated development budget within the fiscal year without returning unspent funds or stalling projects.",
    fullExplainer: "Having a budget on paper is useless if bureaucracy, corrupt procurement disputes, or slow contractor execution prevent the funds from being spent. Low absorption means budgeted hospitals and roads remain unbuilt even when cash was allocated.",
    whyItMattersFor2027: "Prevents politicians from boasting about 'multi-billion allocations' when their ministries have a 45% development budget absorption rate.",
    kenyaContextExample: "Counties averaging 68% absorption on development expenditure due to late exchequer releases from the National Treasury.",
    relatedArticleOrLaw: "Public Finance Management Act Section 149"
  },
  {
    term: "Sovereign Yield / Risk Spread",
    slug: "sovereign-yield-spread",
    category: "Macroeconomics",
    shortDefinition: "The interest rate penalty Kenya must pay international investors to borrow money on global capital markets compared to risk-free US Treasury bonds.",
    fullExplainer: "If US 10-year bonds trade at 4.2% and Kenya's Eurobond trades at 9.8%, Kenya's sovereign spread is 560 basis points (5.6%). When credit rating agencies (Moody's, S&P, Fitch) downgrade Kenya due to high debt or political unrest, the spread widens, making future refinancing and business loans far more expensive.",
    whyItMattersFor2027: "A disciplined, credible economic plan lowers the sovereign spread, reducing interest costs by hundreds of billions of shillings annually.",
    kenyaContextExample: "The successful partial buyback of the June 2024 Eurobond compressed Kenya's yield spread from 1,200 bps down to 680 bps.",
    relatedArticleOrLaw: "Public Debt Management Office (PDMO) Reports"
  },
  {
    term: "Zero-Based Budgeting (ZBB)",
    slug: "zero-based-budgeting",
    category: "Public Finance & Debt",
    shortDefinition: "A budgeting method where every government program must justify its entire budget from zero each year, rather than just taking last year's budget and adding 5-10% inflation.",
    fullExplainer: "Traditional incremental budgeting allows ghost projects, useless committees, redundant seminars, and obsolete directorates to keep receiving funds forever. Zero-Based Budgeting forces accounting officers to prove the constitutional and economic necessity of every single budget line.",
    whyItMattersFor2027: "A key mechanism to eliminate over KES 300 Billion in recurring administrative waste and ghost line-items across national ministries.",
    kenyaContextExample: "Scrutiny of non-essential hospitality, domestic travel, and advisory taskforce expenditures in ministerial budgets.",
    relatedArticleOrLaw: "Article 201(d) Prudent Resource Use"
  },
  {
    term: "Public-Private Partnership (PPP) Concession",
    slug: "public-private-partnership",
    category: "Trade & Industry",
    shortDefinition: "A long-term contractual arrangement between a government agency and a private consortium to finance, construct, operate, and maintain public infrastructure.",
    fullExplainer: "Under Build-Operate-Transfer (BOT) models, private investors provide capital and recoup their investment via user fees (tolls, electricity tariffs, port handling fees) over 20-30 years before handing the asset back to the state. While avoiding direct sovereign debt borrowing, PPPs can create contingent liabilities if the state provides minimum revenue guarantees.",
    whyItMattersFor2027: "Allows major highways, power plants, and university hostels to be built without adding to the national sovereign debt ceiling, provided contracts are open and competitive.",
    kenyaContextExample: "The Nairobi Expressway (JKIA to Westlands) constructed and operated under a 30-year toll concession by Moja EV / CRBC.",
    relatedArticleOrLaw: "PPP Act 2021 & Article 227 Procurement Principles"
  },
  {
    term: "School Capitation Grant",
    slug: "school-capitation-grant",
    category: "Public Finance & Debt",
    shortDefinition: "A direct statutory government subsidy paid per enrolled student to public primary, junior secondary, and senior secondary schools to guarantee tuition-free basic education.",
    fullExplainer: "Under the Free Day Secondary Education (FDSE) and Free Primary Education (FPE) frameworks, the government is constitutionally mandated to disburse a fixed amount per learner (e.g. KES 22,244 per secondary student per year). When the Treasury delays or cuts capitation, public schools run into debt and unlawfully charge parents fees.",
    whyItMattersFor2027: "Measures whether education promises are backed by full statutory funding allocations.",
    kenyaContextExample: "National capitation deficits resulting in schools receiving only KES 17,000 instead of the gazetted KES 22,244 per secondary learner.",
    relatedArticleOrLaw: "Basic Education Act 2013 & Article 43(1)(f) of Constitution"
  },
  {
    term: "Contingent Liability",
    slug: "contingent-liability",
    category: "Public Finance & Debt",
    shortDefinition: "A potential financial obligation that may become a real government debt if a specific future event occurs, such as a state corporation defaulting or a PPP guarantee being triggered.",
    fullExplainer: "When government guarantees loans for parastatals (Kenya Airways, Kenya Power, KenGen) or guarantees power purchase agreements (PPAs), these do not appear as direct national debt initially. But if the entity defaults, taxpayers are immediately legally liable to pay 100% of the loan.",
    whyItMattersFor2027: "True debt transparency requires evaluating total public debt PLUS all off-balance-sheet contingent liabilities.",
    kenyaContextExample: "National Treasury guarantees for Kenya Airways and sovereign letters of support for IPP energy contracts.",
    relatedArticleOrLaw: "Article 213 of the Constitution (Loan Guarantees)"
  },
  {
    term: "Tax-to-GDP Ratio",
    slug: "tax-to-gdp-ratio",
    category: "Macroeconomics",
    shortDefinition: "The percentage of a country's total economic output (GDP) that the government collects in taxes.",
    fullExplainer: "Measures how effectively the national tax authority (KRA) mobilizes domestic resources without killing economic incentives. Developing middle-income benchmarks typically target 18% to 22%. A low ratio means widespread tax evasion, informality, or excessive tax holidays for elite corporations.",
    whyItMattersFor2027: "Highlights whether a government plans to grow revenue by expanding the economic pie or by squeezing existing formal taxpayers with punitive rates.",
    kenyaContextExample: "Kenya's tax-to-GDP ratio currently sits around 14.8% to 15.6%, below the 2060 target of 22%.",
    relatedArticleOrLaw: "Medium Term Revenue Strategy (MTRS)"
  },
  {
    term: "Public Participation Threshold",
    slug: "public-participation-threshold",
    category: "Constitution & Law",
    shortDefinition: "The mandatory constitutional standard requiring that citizens must have meaningful, timely, and documented influence before any national bill, tax law, or policy is passed.",
    fullExplainer: "Supreme Court and High Court jurisprudence has established that public participation is not a mere public relations cosmetic ritual. Parliament and county assemblies must provide adequate notice, accessible bill summaries in plain language, receive public submissions, and provide written justification for why citizen views were accepted or rejected.",
    whyItMattersFor2027: "Courts have repeatedly struck down Finance Acts, healthcare laws, and housing acts for failing the constitutional Article 10 public participation test.",
    kenyaContextExample: "Court of Appeal rulings declaring the Finance Act 2023 unconstitutional for lack of reasoned feedback matrices on citizen memoranda.",
    relatedArticleOrLaw: "Article 10(2)(a), Article 118(1)(b), Article 201(a) of Constitution"
  },
  {
    term: "Intergovernmental Budget & Economic Council (IBEC)",
    slug: "ibec",
    category: "Devolution & Governance",
    shortDefinition: "The apex consultative body chaired by the Deputy President bringing together the National Treasury and all 47 County Governors to harmonize budget policy, revenue sharing, and county debt.",
    fullExplainer: "IBEC meets quarterly to resolve disputes between the national executive and the Council of Governors (CoG), review county exchequer requisitions, and agree on the Division of Revenue before bills are submitted to Parliament.",
    whyItMattersFor2027: "Crucial for intergovernmental harmony and preventing crippling delays in county health, water, and road expenditures.",
    kenyaContextExample: "IBEC negotiations establishing the county equitable share baseline of KES 385B - 400B.",
    relatedArticleOrLaw: "Public Finance Management Act Section 187"
  }
];
