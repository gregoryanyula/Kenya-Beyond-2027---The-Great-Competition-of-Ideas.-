export interface PolicyDomain {
  id: string;
  name: string;
  iconName: string;
  category: "Economy & Jobs" | "Social & Human Capital" | "Infrastructure & Tech" | "Governance & Sovereignty";
  description: string;
  keyQuestions: string[];
  benchmarkKPIs: string[];
  constitutionalAnchor: string;
  costingConsiderations: string;
  kenya2060Goal: string;
}

export interface GovernmentAccountabilityItem {
  id: string;
  domain: string;
  title: string;
  manifestoPromise: string;
  whatHappened: string;
  costAndFinancing: string;
  whatRemains: string;
  deliveryStatus: "Completed" | "In Progress" | "Delayed" | "Under Scrutiny";
  externalVsGovFactors: string;
  officialExplanation: string;
  independentEvidenceStatus: string;
  sources: string[];
}

export interface OppositionAlternativeItem {
  id: string;
  domain: string;
  criticismRaised: string;
  proposedAlternative: string;
  costEstimate: string;
  financingSource: string;
  empiricalEvidence: string;
  implementationMechanism: string;
  tradeOffsForCitizens: string;
  rigorLevel: "High Detail (Costed)" | "Medium Detail (Partial Plan)" | "Low Detail (Criticism Heavy)";
}

export interface SloganTranslatorItem {
  id: string;
  slogan: string;
  commonContext: string;
  hiddenPitfall: string;
  theFivePlanQuestions: string[];
  actionableCitizenDemand: string;
}

export interface CivicLiteracyModule {
  id: string;
  title: string;
  subtitle: string;
  category: "Constitution" | "Public Finance & Debt" | "Devolution" | "Institutions & Procurement";
  keyConcept: string;
  breakdownPoints: { heading: string; detail: string; articleCitation?: string }[];
  actionQuestionForLeaders: string;
  infographicSnippet: string;
}

export interface Kenya2060ContinuityPillar {
  id: string;
  pillar: string;
  coreVision: string;
  whyItMustSurviveGovernments: string;
  criticalMilestones2027_2060: string[];
  riskIfAbandoned: string;
  keyInstitutionsHoldingContinuity: string[];
}

export interface CandidateEvaluationCriteria {
  category: string;
  weight: string;
  description: string;
  benchmarkQuestions: string[];
}

export interface FactCheckClassification {
  type: "Fact" | "Claim" | "Evidence" | "Analysis" | "Uncertainty" | "Recommendation";
  definition: string;
  badgeColor: string;
  example: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface EvaluationResult {
  summary: string;
  verdict_score: {
    clarity_score: number;
    fiscal_realism_score: number;
    constitutional_viability_score: number;
    implementation_readiness_score: number;
    kenya_2060_alignment_score: number;
  };
  fact_evidence_breakdown: {
    facts: string[];
    claims: string[];
    evidence: string[];
    uncertainties: string[];
    recommendations: string[];
  };
  the_13_point_audit: {
    point: string;
    analysis: string;
    status: "Clear" | "Partially Addressed" | "Missing/Unspecified";
  }[];
  citizen_cross_examination_questions: string[];
  slogan_to_plan_translation: string;
  continuity_note: string;
  grounding_metadata?: {
    web_search_queries?: string[];
    sources?: GroundingSource[];
  };
}

export interface PartyManifestoDomainComparison {
  domainId: string;
  domainName: string;
  keyProblemStatement: string;
  proposals: {
    blocId: "incumbent" | "main-opposition" | "third-pole" | "civil-society";
    blocName: string;
    coalitionOrParty: string;
    coreProposalTitle: string;
    mechanism: string;
    costEstimate: string;
    financingSource: string;
    empiricalEvidence: string;
    first100DaysAction: string;
    tradeOffsAndRisks: string;
    rigorScore: number; // 1-10
    rigorBadge: "High (Fully Costed)" | "Medium (Partial Plan)" | "Low (Rhetoric Heavy)";
  }[];
}

export interface BudgetYearTrend {
  fiscalYear: string;
  ordinaryRevenue: number; // KES Billions
  debtService: number; // KES Billions
  developmentBudget: number; // KES Billions
  recurrentExpenditure: number; // KES Billions
  countyEquitableShare: number; // KES Billions
  fiscalDeficit: number; // KES Billions
}

export interface SectorAbsorptionData {
  sector: string;
  allocated: number; // KES Billions
  actualAbsorbed: number; // KES Billions
  absorptionRate: number; // %
  keyBottleneck: string;
}

export interface PolicyVsPromiseItem {
  id: string;
  sector: string;
  statedPromise: string;
  historicalRecordOrEvidence: string;
  lineItemCostAndFunding: string;
  first100DayCommitment: string;
  article201Compliance: "Compliant" | "Borderline" | "Non-Compliant (Unfunded)";
  scoreOutOfTen: number;
  citizenVerdict: string;
}

export interface YouthExplainerSeriesCard {
  id: string;
  episodeNumber: number;
  title: string;
  topic: string;
  viralHook: string;
  audioVoiceoverScript: string;
  theEconomicReality: string;
  theThreeHardQuestions: string[];
  sloganVsPlanTakeaway: string;
  shareableStats: { label: string; value: string }[];
}

export interface ScenarioYearMetrics {
  debtToGdp: number; // % of GDP
  gdpPerCapitaUsd: number; // USD per capita
  youthUnemployment: number; // %
  outOfPocketHealth: number; // %
  manufacturingGdpShare: number; // %
  devolutionShare: number; // % of national revenue
  giniCoefficient: number; // 0-100 (lower is more equal)
  climateResilienceScore: number; // 0-100
}

export interface ScenarioPolicyApproach {
  id: string;
  name: string;
  coalitionArchetype: string;
  philosophy: string;
  domain: string;
  color: string;
  keyMechanisms: string[];
  projections: {
    year2030: ScenarioYearMetrics;
    year2045: ScenarioYearMetrics;
    year2060: ScenarioYearMetrics;
  };
  tradeoffs: {
    advantages: string[];
    vulnerabilities: string[];
    intergenerationalEquityRating: "High" | "Medium" | "High Risk";
    governancePrerequisites: string;
  };
  shockResilience: {
    shockId: string;
    shockName: string;
    impactDescription: string;
    resilienceScore: number; // 1-10
  }[];
}

export interface PolicyLiteracyChallenge {
  id: string;
  challengeTitle: string;
  sector: string;
  situationBrief: string;
  realWorldImpact: string;
  statBadge: string;
  optionsConstitution: {
    id: string;
    articleNumber: string;
    articleTitle: string;
    clauseSummary: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  optionsPolicySolution: {
    id: string;
    solutionText: string;
    type: "constitutional-policy" | "populist-trap" | "bureaucratic-inertia";
    isCorrect: boolean;
    rationale: string;
  }[];
  auditorPrecedentOrLaw: string;
  keyConstitutionalArticle: string;
}

export interface CivicWatchlistItem {
  id: string;
  type: "policy" | "candidate_pledge" | "opposition_proposal" | "scorecard_item" | "domain";
  title: string;
  subtitle: string;
  domain: string;
  tag: string;
  source: string;
  rigorScore?: number;
  article201Status?: string;
  keyMetrics?: { label: string; value: string }[];
  summaryNote?: string;
  savedAt: number;
}

export interface ConstitutionalArticle {
  id: string;
  number: string;
  title: string;
  chapter: string;
  category: "Public Finance" | "Human Rights & Equity" | "Devolution" | "Governance & Integrity" | "Environment & Land";
  keyClauses: string[];
  citizenPlainLanguageMeaning: string;
  applicationToManifestos: string;
  associatedDomains: string[];
  mandatoryAuditRule: string;
}

export interface CivicGlossaryTerm {
  term: string;
  slug: string;
  category: "Public Finance & Debt" | "Macroeconomics" | "Constitution & Law" | "Devolution & Governance" | "Trade & Industry";
  shortDefinition: string;
  fullExplainer: string;
  whyItMattersFor2027: string;
  kenyaContextExample: string;
  relatedArticleOrLaw?: string;
}

export interface ManifestoDistillationResult {
  documentTitle: string;
  executiveSummary: string;
  keyImpacts: {
    impact: string;
    targetBeneficiaries: string;
    timeframe: string;
    confidence: "High" | "Medium" | "Low";
  }[];
  feasibilityRisks: {
    risk: string;
    severity: "Critical" | "High" | "Moderate";
    constitutionalOrFiscalReference: string;
    suggestedMitigation: string;
  }[];
  financialCostingSummary: {
    statedCost: string;
    fundingMechanism: string;
    fiscalRiskRating: number;
  };
  constitutionalArticle201Check: {
    status: "Article 201 Compliant" | "High Risk / Ambiguous" | "Unconstitutional Flag";
    rationale: string;
  };
  keyTakeaway: string;
}

export interface RegionalPriorityArea {
  id: string;
  regionName: string;
  countiesIncluded: string[];
  svgPathId: string;
  centerCoordinates: { x: number; y: number };
  color: string;
  populationEstimate: string;
  youthShare: string;
  topCrowdsourcedPriorities: {
    sector: string;
    title: string;
    votesCount: number;
    percentage: number;
    demandedDeliverable: string;
    urgencyLevel: "Emergency" | "High" | "Medium";
  }[];
  citizenFeedbackHighlights: {
    quote: string;
    county: string;
    demographic: string;
  }[];
  devolutionEquitableShareFY: string;
  mainEconomicBase: string;
  primaryRiskFlag: string;
}

export interface WeightedCriteriaSettings {
  fiscalRealism: number; // e.g. 25
  constitutionalCompliance: number; // e.g. 25
  kenya2060Goals: number; // e.g. 20
  implementationReadiness: number; // e.g. 15
  clarityOrEquity: number; // e.g. 15
  economicFeasibilityWeight?: number;
  constitutionalComplianceWeight?: number;
  kenya2060AlignmentWeight?: number;
  implementationReadinessWeight?: number;
  clarityWeight?: number;
}

export interface HistoricalBudgetPoint {
  fiscalYear: string;
  debtService: number; // in KES Billions
  education: number;
  health: number;
  devolutionEquitableShare: number;
  infrastructureAndWater: number;
  agriculture: number;
  totalExpenditure: number;
  ordinaryRevenue: number;
  fiscalDeficit: number;
}

export interface FactCheckAggregatorItem {
  id: string;
  claim: string;
  candidateOrActor: string;
  domain: string;
  verdict: "Verified True" | "Mostly True / Context Needed" | "Unsubstantiated / Misleading" | "Contradicted by Official Data";
  verdictColor: string;
  historicalDataPoint: string;
  officialSource: string;
  analysis: string;
  groundingQueries?: string[];
  groundingSources?: GroundingSource[];
  dateAudited: string;
}

export interface PolicyAudioSummary {
  language: "en" | "sw";
  audioScript: string;
  bulletPoints: string[];
  estimatedDurationSec: number;
}

export interface ManifestoToneAnalysis {
  overallTone: "Constructive & Evidence-Based" | "Moderate Emotional Framing" | "Sensationalist & Outrage-Driven" | "Populist / Fear-Appealing" | string;
  biasScore: number; // 0 (Low bias) to 100 (High bias)
  evidenceRatio: number; // 0% to 100%
  emotionalCharge: number; // 0% to 100%
  detectedFallacies: {
    name: string;
    quote: string;
    explanation: string;
    severity: "High" | "Medium" | "Low";
  }[];
  rhetoricalMarkers: {
    category: string;
    count: number;
    description: string;
  }[];
  constructiveReframing: string;
}

export interface UserInterestSuggestion {
  domain: string;
  reason: string;
  score: number;
  relevantCount: number;
  iconName?: string;
}

export interface CommunityAudioReflection {
  id: string;
  authorName: string;
  county: string;
  policyDomain?: string;
  policyTopic: string;
  audioUrl?: string;
  audioBlobUrl?: string;
  audioBase64?: string;
  durationSeconds: number;
  dateRecorded?: string;
  transcriptExcerpt?: string;
  transcriptSummary?: string;
  createdAt?: number;
  upvotes?: number;
  verifiedLocalResident?: boolean;
}

export interface DailyCivicDigestHighlight {
  id: string;
  domain: string;
  title: string;
  manifestoUpdate: string;
  factCheckVerdict: "Verified True" | "Misleading / Uncosted" | "Contradicted by Official Data" | "Context Needed" | "Article 201 Flag";
  verdictBadgeColor: "emerald" | "amber" | "rose" | "purple";
  evidenceSource: string;
  article201Status: string;
  citizenTownHallQuestion: string;
}

export interface DailyCivicDigest {
  digestDate: string;
  greetingTitle: string;
  executiveSummary: string;
  watchlistCoverageCount: number;
  tailoredHighlights: DailyCivicDigestHighlight[];
  criticalArticle201Alert: {
    title: string;
    description: string;
    statutoryCitation: string;
    implication: string;
  };
  audioBroadcastScript: string;
  todaysCivicTip: string;
  isAiGenerated?: boolean;
}

export interface DebateTranscriptEntry {
  id: string;
  timestamp: string; // e.g. "04:15"
  timestampSeconds: number;
  speaker: string;
  speakerRole: "Incumbent Flagbearer" | "Opposition Flagbearer" | "Third-Pole Flagbearer" | "Moderator" | "Auditor";
  avatarColor: string;
  text: string;
  hasFactCheck: boolean;
  factCheckData?: {
    claimQuote: string;
    verdict: "Verified True" | "Misleading / Uncosted" | "Contradicted by Official Data" | "Article 201 Flag";
    verdictColor: "emerald" | "amber" | "rose" | "purple";
    empiricalEvidence: string;
    constitutionalCitation: string;
    sourceAgency: string;
    officialBaselineStat: string;
    townhallQuestion: string;
  };
}


