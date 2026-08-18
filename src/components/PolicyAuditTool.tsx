import React, { useState, useRef } from "react";
import { 
  Sparkles, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Scale, 
  ShieldCheck, 
  Copy, 
  Check, 
  Share2,
  RefreshCw,
  FileSearch,
  BookOpen,
  ArrowRight,
  Globe,
  ExternalLink,
  Search,
  Bookmark,
  Coins,
  ChevronRight,
  SlidersHorizontal,
  BookmarkCheck,
  Download,
  FileUp,
  FileText,
  Sliders,
  PieChart,
  ChevronDown,
  ChevronUp,
  Flame,
  Layers,
  AlertTriangle,
  FileSpreadsheet,
  FileCode,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Printer,
  StickyNote,
  FileCheck,
  Mic,
  MicOff
} from "lucide-react";
import { EvaluationResult, ManifestoDistillationResult, WeightedCriteriaSettings } from "../types";
import { ConstitutionalArticlesSidebar } from "./ConstitutionalArticlesSidebar";
import { PolicyCurrencyConverterModal } from "./PolicyCurrencyConverterModal";
import { CivicTerm } from "./CivicTerm";
import { useCivicWatchlist } from "../context/CivicWatchlistContext";
import { exportPolicyAuditToPdf } from "../utils/pdfExport";
import { PolicyFiscalImpactChart } from "./PolicyFiscalImpactChart";
import { FactCheckAggregator } from "./FactCheckAggregator";
import { PolicyAudioSummaryPlayer } from "./PolicyAudioSummaryPlayer";
import { PolicyRegionalHeatmap } from "./PolicyRegionalHeatmap";
import { PolicyWhatIfSimulator } from "./PolicyWhatIfSimulator";
import { OfflineStorageBanner, useOfflineCivicStorage } from "./OfflineStorageManager";
import { KeyImpactHighlightsCard } from "./KeyImpactHighlightsCard";
import { PolicyPublicSentimentTrendChart } from "./PolicyPublicSentimentTrendChart";
import { PolicyKenya2060RadarChart } from "./PolicyKenya2060RadarChart";
import { PolicyConfidenceScoreRing } from "./PolicyConfidenceScoreRing";
import { PolicyRadarComparisonModal } from "./PolicyRadarComparisonModal";
import { PolicyBriefingNoteModal } from "./PolicyBriefingNoteModal";
import { PolicyAuditTemplateModal, PolicyAuditTemplate } from "./PolicyAuditTemplateModal";
import { getPointStatutoryCitations } from "../utils/statutoryCitations";

const SAMPLE_PROPOSALS = [
  {
    title: "Youth Tech Entrepreneurship & Digital Sovereign Hubs",
    domain: "Technology & Youth Opportunities",
    actor: "General 2027 Candidate Proposal",
    text: "We propose establishing 290 Constituency Innovation & AI Centers across all sub-counties, financed by a 5% reallocation of the existing Universal Service Fund (approx. KES 8 Billion over 3 years). Each center will feature 1Gbps public fiber, 50 workstation seats, and solar backup power. Implementing agencies: ICT Authority partnering with County Governments. Target KPI: Train 300,000 youth in AI annotation and remote tech contracts, creating at least 80,000 verified remote jobs by 2030."
  },
  {
    title: "Zero-VAT on Household Essentials & Flat Price Ceiling",
    domain: "Cost of Living & Basic Goods",
    actor: "Populist Campaign Pledge",
    text: "We will immediately eliminate all VAT on unga, fuel, cooking oil, electricity, and water on day one of our government. Prices of maize flour will be fixed at KES 70 per 2kg packet by government gazette notice, ending the high cost of living for all Kenyans permanently."
  },
  {
    title: "Universal Irrigation Mega-Dam Acceleration (1M Acres)",
    domain: "Agriculture & Food Security",
    actor: "Long-term Infrastructure Blueprint",
    text: "Construct 5 multi-purpose strategic dams (High Grand Falls, Thwake Phase II, Mwache, Soin-Koru, and Arror) under Public-Private Partnerships (PPP) with 25-year concession agreements, requiring zero upfront national debt borrowing. Will open 1,000,000 acres to drip irrigation by 2031, managed by the National Irrigation Authority and water user associations, doubling grain self-sufficiency."
  },
  {
    title: "Full Devolution Health Fund & Automatic Treasury Releases",
    domain: "Healthcare & Universal Access",
    actor: "Devolution Reform Proposal",
    text: "Amend the Public Finance Management Act to mandate direct automatic monthly disbursement of county health allocations from the Central Bank Consolidated Fund on the 10th of every month, bypassing National Treasury delays. Establish a KES 25B National Healthcare Equipment Maintenance & Medicine Guarantee Fund to ensure Level 4 and 5 county hospitals are 100% stocked with essential drugs."
  }
];

const SAMPLE_MANIFESTOS = [
  {
    title: "National Industrial Transformation & Affordable Housing Blueprint 2027-2032",
    domain: "Affordable Housing",
    actor: "Major Coalition Manifesto",
    excerpt: "Under our 5-year transformative economic pillar, the government commits to delivering 250,000 affordable housing units annually through a mandatory 3% housing levy on formal and informal workers, backed by state land grants across all 47 counties. Simultaneously, we will establish special economic processing zones in Naivasha, Athi River, and Dongo Kundu with 10-year corporate tax holidays, zero import duty on raw materials, and dedicated 50MW geothermal power grids. Estimated capital requirement: KES 450 Billion, to be financed through domestic infrastructure bonds (KES 200B), bilateral concession loans from development partners (KES 150B), and public pension fund asset allocations (KES 100B). Expected to generate 1.2 million direct construction and artisan jobs by 2030."
  },
  {
    title: "Universal Free Tertiary Education & Youth Innovation Fund Charter",
    domain: "Education & CBC/University",
    actor: "Youth-First Progressive Platform",
    excerpt: "We shall guarantee 100% tuition-free higher education in all public universities and TVET colleges for students from households earning under KES 50,000 monthly. This will be financed by imposing a 2% sovereign wealth levy on multinational digital platform earnings, alongside restructuring the Higher Education Loans Board (HELB) into an outright scholarship grant fund. Total estimated expenditure: KES 120 Billion annually. We will also launch a KES 40 Billion Youth Venture Fund providing interest-free seed capital to STEM and digital freelancing graduates, managed by independent county boards under Article 201 public scrutiny."
  },
  {
    title: "Comprehensive Food Sovereignty & Guaranteed Minimum Returns Act",
    domain: "Agriculture & Food Security",
    actor: "Agricultural Reform Alliance",
    excerpt: "To end chronic food insecurity and famine across Kenya, our administration will introduce a statutory Guaranteed Minimum Return (GMR) of KES 4,500 per 90kg bag for maize, wheat, and rice farmers. We will procure 2 million metric tons of strategic grain reserves annually via the National Cereals and Produce Board (NCPB). In addition, subsidized fertilizer will be fixed at KES 1,500 per 50kg bag, delivered via digital e-vouchers directly to verified smallholders. Cost: KES 85 Billion per fiscal year, funded by reprioritizing non-essential executive administrative overheads and increasing import duties on foreign food commodities to 45%."
  }
];

export const PolicyAuditTool: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("Economic Growth & Productivity");
  const [actorType, setActorType] = useState("General Presidential Candidate");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCurrencyConverterOpen, setIsCurrencyConverterOpen] = useState(false);

  // Manifesto PDF / Text Distillation States (Gemini API)
  const [showDistiller, setShowDistiller] = useState(false);
  const [showFactCheckHub, setShowFactCheckHub] = useState(false);
  const [showRegionalHeatmap, setShowRegionalHeatmap] = useState(false);
  const [showWhatIfSimulator, setShowWhatIfSimulator] = useState(false);

  // View Density Mode (Cozy vs Compact)
  const [densityMode, setDensityMode] = useState<"cozy" | "compact">(() => {
    try {
      return (localStorage.getItem("kenya2027_density_mode") as "cozy" | "compact") || "cozy";
    } catch {
      return "cozy";
    }
  });

  const handleToggleDensity = (mode: "cozy" | "compact") => {
    setDensityMode(mode);
    try {
      localStorage.setItem("kenya2027_density_mode", mode);
    } catch (e) {
      console.warn("Storage error:", e);
    }
  };

  const { exportAuditsAsCSV, exportAllDataAsJSON } = useOfflineCivicStorage();

  const [manifestoInputText, setManifestoInputText] = useState("");
  const [distillerLoading, setDistillerLoading] = useState(false);
  const [distillerError, setDistillerError] = useState<string | null>(null);
  const [distilledResult, setDistilledResult] = useState<ManifestoDistillationResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [pdfBase64Data, setPdfBase64Data] = useState<string | null>(null);

  // Weighted Scoring System Settings
  const [weightedSettings, setWeightedSettings] = useState<WeightedCriteriaSettings>({
    fiscalRealism: 25,
    constitutionalCompliance: 25,
    kenya2060Goals: 20,
    implementationReadiness: 15,
    clarityOrEquity: 15,
    economicFeasibilityWeight: 25,
    constitutionalComplianceWeight: 25,
    kenya2060AlignmentWeight: 20,
    implementationReadinessWeight: 15,
    clarityWeight: 15
  });
  const [showWeightSliders, setShowWeightSliders] = useState(false);

  // PDF Exporting State
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Radar Comparison Modal, AI Briefing Note Modal, & Template Modal State
  const [isRadarComparisonOpen, setIsRadarComparisonOpen] = useState(false);
  const [isBriefingNoteModalOpen, setIsBriefingNoteModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [activeTemplateName, setActiveTemplateName] = useState<string>("Balanced Civic Standard");

  // Voice-to-Text Dictation State & SpeechRecognition Handler for Personal Notes
  const [recordingVoiceIdx, setRecordingVoiceIdx] = useState<number | null>(null);
  const [speechRecognitionError, setSpeechRecognitionError] = useState<string | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  const startVoiceDictation = (idx: number) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechRecognitionError("Voice dictation is not supported by your browser. You can still type notes manually.");
      setTimeout(() => setSpeechRecognitionError(null), 4500);
      return;
    }

    try {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-KE"; // English (Kenya)

      recognition.onstart = () => {
        setRecordingVoiceIdx(idx);
        setSpeechRecognitionError(null);
      };

      recognition.onresult = (event: any) => {
        let finalChunk = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalChunk += event.results[i][0].transcript;
          }
        }
        if (finalChunk) {
          setTempNoteText((prev) => {
            const current = prev[idx] !== undefined ? prev[idx] : personalNotes[idx] || "";
            return {
              ...prev,
              [idx]: `${current ? current + " " : ""}${finalChunk.trim()}`
            };
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setRecordingVoiceIdx(null);
        if (event.error !== "no-speech") {
          setSpeechRecognitionError(`Microphone notice: ${event.error}. Please allow audio permissions.`);
          setTimeout(() => setSpeechRecognitionError(null), 4000);
        }
      };

      recognition.onend = () => {
        setRecordingVoiceIdx(null);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error("Speech recognition startup error:", err);
      setRecordingVoiceIdx(null);
      setSpeechRecognitionError("Could not start microphone dictation.");
      setTimeout(() => setSpeechRecognitionError(null), 4000);
    }
  };

  const stopVoiceDictation = () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {
        console.error(e);
      }
      speechRecognitionRef.current = null;
    }
    setRecordingVoiceIdx(null);
  };

  // Personal Notes per Criterion Card (Browser-Stored in localStorage)
  const [personalNotes, setPersonalNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem("kenya2027_policy_audit_personal_notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [expandedPersonalNoteCards, setExpandedPersonalNoteCards] = useState<Record<number, boolean>>({});
  const [tempNoteText, setTempNoteText] = useState<Record<number, string>>({});

  const togglePersonalNote = (idx: number) => {
    setExpandedPersonalNoteCards((prev) => {
      const nextState = !prev[idx];
      if (nextState && tempNoteText[idx] === undefined) {
        setTempNoteText((t) => ({ ...t, [idx]: personalNotes[idx] || "" }));
      }
      return { ...prev, [idx]: nextState };
    });
  };

  const handleSavePersonalNote = (idx: number) => {
    if (recordingVoiceIdx === idx) {
      stopVoiceDictation();
    }
    const textToSave = tempNoteText[idx] || "";
    const updated = { ...personalNotes, [idx]: textToSave };
    if (!textToSave.trim()) {
      delete updated[idx];
    }
    setPersonalNotes(updated);
    try {
      localStorage.setItem("kenya2027_policy_audit_personal_notes", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save personal note to localStorage:", e);
    }
  };

  const handleDeletePersonalNote = (idx: number) => {
    if (recordingVoiceIdx === idx) {
      stopVoiceDictation();
    }
    const updated = { ...personalNotes };
    delete updated[idx];
    setPersonalNotes(updated);
    setTempNoteText((t) => {
      const copy = { ...t };
      delete copy[idx];
      return copy;
    });
    try {
      localStorage.setItem("kenya2027_policy_audit_personal_notes", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to delete personal note:", e);
    }
  };

  // Criteria Card Sources Expanded State & View Mode
  const [expandedSources, setExpandedSources] = useState<Record<number, boolean>>({});
  const [allSourcesExpanded, setAllSourcesExpanded] = useState<boolean>(false);
  const [criteriaViewMode, setCriteriaViewMode] = useState<"cards" | "matrix">("cards");

  const toggleSource = (idx: number) => {
    setExpandedSources((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleToggleAllSources = () => {
    const nextState = !allSourcesExpanded;
    setAllSourcesExpanded(nextState);
    if (result && result.the_13_point_audit) {
      const updated: Record<number, boolean> = {};
      result.the_13_point_audit.forEach((_, i) => {
        updated[i] = nextState;
      });
      setExpandedSources(updated);
    }
  };

  const { addToWatchlist, isItemInWatchlist, removeFromWatchlist } = useCivicWatchlist();

  // Compute Weighted Composite Score out of 100
  const computeWeightedScore = (scores: EvaluationResult["verdict_score"], weights: WeightedCriteriaSettings): number => {
    const wFeasibility = weights.economicFeasibilityWeight ?? weights.fiscalRealism ?? 25;
    const wConst = weights.constitutionalComplianceWeight ?? weights.constitutionalCompliance ?? 25;
    const wVision = weights.kenya2060AlignmentWeight ?? weights.kenya2060Goals ?? 20;
    const wImpl = weights.implementationReadinessWeight ?? weights.implementationReadiness ?? 15;
    const wClarity = weights.clarityWeight ?? weights.clarityOrEquity ?? 15;

    const rawSum = 
      (scores.fiscal_realism_score * 10 * wFeasibility) +
      (scores.constitutional_viability_score * 10 * wConst) +
      (scores.kenya_2060_alignment_score * 10 * wVision) +
      (scores.implementation_readiness_score * 10 * wImpl) +
      (scores.clarity_score * 10 * wClarity);
    
    const totalWeights = wFeasibility + wConst + wVision + wImpl + wClarity;
    return Math.round(rawSum / (totalWeights || 100));
  };

  const handleEvaluate = async (textToEval?: string) => {
    const text = textToEval || inputText;
    if (!text.trim()) {
      setError("Please enter or select a political proposal to evaluate.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/evaluate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalText: text,
          domain: selectedDomain,
          actorType: actorType
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        throw new Error("Invalid response format received from evaluation engine.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze policy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_PROPOSALS[0]) => {
    setInputText(sample.text);
    setSelectedDomain(sample.domain);
    setActorType(sample.actor);
    handleEvaluate(sample.text);
  };

  // Manifesto Distiller (Gemini API /api/distill-manifesto)
  const handleDistillManifesto = async () => {
    if (!manifestoInputText.trim() && !pdfBase64Data) {
      setDistillerError("Please paste manifesto text or upload a PDF document first.");
      return;
    }

    setDistillerLoading(true);
    setDistillerError(null);

    try {
      const response = await fetch("/api/distill-manifesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manifestoText: manifestoInputText,
          pdfBase64: pdfBase64Data,
          domain: selectedDomain,
          candidateOrParty: actorType
        })
      });

      if (!response.ok) {
        throw new Error(`Distillation failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setDistilledResult(data.result);
      } else {
        throw new Error("Invalid distillation response format.");
      }
    } catch (err: any) {
      console.error(err);
      setDistillerError(err.message || "Failed to distill manifesto. Please try again.");
    } finally {
      setDistillerLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        setPdfBase64Data(base64);
      };
      reader.readAsDataURL(file);
    } else {
      // Text file
      const reader = new FileReader();
      reader.onload = () => {
        setManifestoInputText(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleApplyDistilledToAudit = () => {
    if (!distilledResult) return;
    const distilledSummaryText = `${distilledResult.documentTitle}: ${distilledResult.executiveDistillation}. Key commitments: ${distilledResult.keyImpacts.map((ki) => ki.impact).join("; ")}. Estimated Cost: ${distilledResult.estimatedCostRange || "To be audited"}. Financing: ${distilledResult.fundingMechanismStated || "Unspecified"}.`;
    setInputText(distilledSummaryText);
    setShowDistiller(false);
    handleEvaluate(distilledSummaryText);
  };

  const handleExportPdf = () => {
    if (!result) return;
    setIsExportingPdf(true);
    try {
      const weightedScore = computeWeightedScore(result.verdict_score, weightedSettings);
      exportPolicyAuditToPdf({
        proposalTitle: inputText.slice(0, 80),
        domain: selectedDomain,
        actorType: actorType,
        evaluationResult: result,
        distillationResult: distilledResult,
        weightedScore: weightedScore,
        weightedSettings: weightedSettings
      });
    } catch (err) {
      console.error("PDF Export error:", err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportAuditCsv = () => {
    if (!result) return;
    const weightedScore = computeWeightedScore(result.verdict_score, weightedSettings);
    const rows: string[][] = [
      ["Kenya 2027 Civic Policy Audit Tool - Raw Criterion Dataset"],
      ["Audited Policy / Proposal", `"${(inputText.slice(0, 120)).replace(/"/g, '""')}"`],
      ["Policy Domain", `"${selectedDomain.replace(/"/g, '""')}"`],
      ["Political Actor Type", `"${actorType.replace(/"/g, '""')}"`],
      ["Weighted Composite Rigor Score", `${weightedScore}/100`],
      ["Fiscal Costing Realism Score", `${result.verdict_score.fiscal_realism_score}/10`],
      ["Constitutional Viability Score", `${result.verdict_score.constitutional_viability_score}/10`],
      ["Kenya 2060 Long-Term Alignment", `${result.verdict_score.kenya_2060_alignment_score}/10`],
      ["Implementation Readiness Score", `${result.verdict_score.implementation_readiness_score}/10`],
      ["Clarity & Specifics Score", `${result.verdict_score.clarity_score}/10`],
      ["Export Date", new Date().toISOString()],
      [],
      [
        "Criterion Number",
        "Audit Evaluation Point",
        "Compliance Status",
        "Detailed Scrutiny Analysis",
        "Governing Statutory Act",
        "Constitutional Article",
        "Official Oversight Agency",
        "Verification Benchmark Level",
        "Legal Citation Snippet",
        "Sector Specific Context",
        "Direct Repository Link",
        "Personal Citizen Note"
      ]
    ];

    result.the_13_point_audit?.forEach((item, idx) => {
      const citation = getPointStatutoryCitations(idx + 1, selectedDomain);
      const personalNote = personalNotes[idx] || "";
      rows.push([
        `Point ${idx + 1}`,
        `"${item.point.replace(/"/g, '""')}"`,
        `"${item.status.replace(/"/g, '""')}"`,
        `"${item.analysis.replace(/"/g, '""')}"`,
        `"${citation.statutoryAct.replace(/"/g, '""')}"`,
        `"${citation.constitutionalArticle.replace(/"/g, '""')}"`,
        `"${citation.sourceAgency.replace(/"/g, '""')}"`,
        `"${citation.verificationLevel.replace(/"/g, '""')}"`,
        `"${citation.citationSnippet.replace(/"/g, '""')}"`,
        `"${(citation.domainSpecificContext || '').replace(/"/g, '""')}"`,
        `"${citation.hyperlink}"`,
        `"${personalNote.replace(/"/g, '""')}"`
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kenya2027_policy_audit_${selectedDomain.toLowerCase().replace(/[^a-z0-9]/g, "_")}_raw_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAuditJson = () => {
    if (!result) return;
    const weightedScore = computeWeightedScore(result.verdict_score, weightedSettings);
    const data = {
      metadata: {
        platform: "Kenya 2027 - The Great Competition of Ideas",
        auditType: "13-Point Constitutional & Empirical Scrutiny",
        timestamp: new Date().toISOString(),
        policyDomain: selectedDomain,
        actorType: actorType,
        proposalText: inputText,
        weightedCompositeRigor: weightedScore
      },
      scores: result.verdict_score,
      weights: weightedSettings,
      summary: result.summary,
      criteria: result.the_13_point_audit?.map((item, idx) => ({
        pointNumber: idx + 1,
        pointName: item.point,
        status: item.status,
        analysis: item.analysis,
        citation: getPointStatutoryCitations(idx + 1, selectedDomain),
        personalNote: personalNotes[idx] || null
      })),
      crossExaminationQuestions: result.citizen_cross_examination_questions,
      continuityNote: result.continuity_note
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `kenya2027_policy_audit_${selectedDomain.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplyTemplate = (template: PolicyAuditTemplate) => {
    setWeightedSettings(template.weights);
    setActiveTemplateName(template.name);
    setShowWeightSliders(true);
  };

  const isCurrentResultSaved = result
    ? isItemInWatchlist(result.summary.slice(0, 40) + selectedDomain)
    : false;

  const handleToggleWatchlist = () => {
    if (!result) return;
    const itemId = result.summary.slice(0, 40) + selectedDomain;
    if (isCurrentResultSaved) {
      removeFromWatchlist(itemId);
    } else {
      addToWatchlist({
        id: itemId,
        type: "policy",
        title: result.summary.split(".")[0] || "Policy Audit Record",
        subtitle: `${actorType} • ${selectedDomain}`,
        domain: selectedDomain,
        tag: actorType,
        source: "Policy Audit Tool (13-Point Scrutiny)",
        rigorScore: Math.round(
          (result.verdict_score.clarity_score +
            result.verdict_score.fiscal_realism_score +
            result.verdict_score.constitutional_viability_score +
            result.verdict_score.implementation_readiness_score +
            result.verdict_score.kenya_2060_alignment_score) /
            5
        ),
        article201Status: result.verdict_score.constitutional_viability_score >= 7 ? "Article 201 Compliant" : "High Risk / Ambiguous",
        summaryNote: result.summary,
        keyMetrics: [
          { label: "Fiscal Realism", value: `${result.verdict_score.fiscal_realism_score}/10` },
          { label: "Constitutional", value: `${result.verdict_score.constitutional_viability_score}/10` },
          { label: "Clarity", value: `${result.verdict_score.clarity_score}/10` }
        ]
      });
    }
  };

  const handleCopyScorecard = () => {
    if (!result) return;
    const weightedScore = computeWeightedScore(result.verdict_score, weightedSettings);
    const text = `KENYA 2027 POLICY EVALUATION SCORECARD
Initiative: "One Country. Many Ideas. One Destination: Kenya."
Message: "Usitupatie slogan. Tupatie plan."

Domain: ${selectedDomain}
Actor: ${actorType}
Weighted Composite Rigor: ${weightedScore}/100

Summary: ${result.summary}
Clarity: ${result.verdict_score.clarity_score}/10
Fiscal Realism: ${result.verdict_score.fiscal_realism_score}/10
Constitutional Viability: ${result.verdict_score.constitutional_viability_score}/10
Implementation Readiness: ${result.verdict_score.implementation_readiness_score}/10
Kenya 2060 Alignment: ${result.verdict_score.kenya_2060_alignment_score}/10

Key Citizen Town Hall Questions:
${result.citizen_cross_examination_questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentWeightedScore = result ? computeWeightedScore(result.verdict_score, weightedSettings) : null;

  return (
    <div className={`space-y-8 ${densityMode === "compact" ? "text-xs" : "text-sm"}`} id="policy-evaluator-section">
      {/* Offline Storage Status & Sync Manager */}
      <OfflineStorageBanner />

      {/* Top Action Bar with Utilities */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Civic Evaluation Suite:</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-600 text-[11px] hidden sm:inline">
            13-Point Constitutional & Article 201 Realism Test
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Density Mode Switcher (Cozy vs Compact) */}
          <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => handleToggleDensity("cozy")}
              className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-all ${
                densityMode === "cozy"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Cozy View: Accessible, comfortable reading with spacious typography"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Cozy</span>
            </button>
            <button
              onClick={() => handleToggleDensity("compact")}
              className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-all ${
                densityMode === "compact"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Compact View: Data-dense layout for analysts and multi-item research"
            >
              <Minimize2 className="w-3 h-3" />
              <span>Compact</span>
            </button>
          </div>

          {/* What-If Macroeconomic Simulator Trigger */}
          <button
            onClick={() => setShowWhatIfSimulator(!showWhatIfSimulator)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-2xs border ${
              showWhatIfSimulator
                ? "bg-amber-500 text-slate-950 border-amber-600 font-black"
                : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
            }`}
            id="open-what-if-simulator-btn"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-700" />
            <span>{showWhatIfSimulator ? "Close What-If" : "'What-If' 2060 Simulator"}</span>
          </button>

          {/* Fact-Check Aggregator Trigger */}
          <button
            onClick={() => setShowFactCheckHub(!showFactCheckHub)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-2xs border ${
              showFactCheckHub
                ? "bg-slate-900 text-white border-slate-800"
                : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
            }`}
            id="open-fact-check-aggregator-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{showFactCheckHub ? "Close Fact-Check Hub" : "Fact-Check Aggregator"}</span>
          </button>

          {/* Geographical Heatmap Trigger */}
          <button
            onClick={() => setShowRegionalHeatmap(!showRegionalHeatmap)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-2xs border ${
              showRegionalHeatmap
                ? "bg-emerald-950 text-emerald-200 border-emerald-800"
                : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
            }`}
            id="open-regional-heatmap-btn"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            <span>{showRegionalHeatmap ? "Close Heatmap" : "County Heatmap (Devolution)"}</span>
          </button>

          {/* Gemini Manifesto Distiller Trigger */}
          <button
            onClick={() => setShowDistiller(!showDistiller)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-2xs border ${
              showDistiller
                ? "bg-purple-900 text-purple-100 border-purple-800"
                : "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
            }`}
            id="open-manifesto-distiller-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{showDistiller ? "Close Distiller" : "Distill Manifesto / PDF"}</span>
          </button>

          {/* Currency Converter Trigger Button */}
          <button
            onClick={() => setIsCurrencyConverterOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors shadow-2xs"
            id="open-currency-converter-btn"
          >
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>KES Cost Converter</span>
          </button>

          {/* Toggle Constitutional Articles Sidebar Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-2xs border ${
              isSidebarOpen
                ? "bg-slate-900 text-white border-slate-800"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
            id="toggle-constitutional-sidebar-btn"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isSidebarOpen ? "Hide Constitution" : "Show Constitution"}</span>
          </button>
        </div>
      </div>

      {/* WHAT-IF MACROECONOMIC & 2060 OUTCOMES SIMULATOR */}
      {showWhatIfSimulator && (
        <div className="animate-in fade-in duration-200">
          <PolicyWhatIfSimulator
            policyDomain={selectedDomain}
            policyTitle={inputText.trim() || undefined}
          />
        </div>
      )}

      {/* REGIONAL GEOGRAPHICAL HEATMAP SECTION */}
      {showRegionalHeatmap && (
        <div className="animate-in fade-in duration-200">
          <PolicyRegionalHeatmap
            policyDomain={selectedDomain}
            policyTitle={inputText.trim() || undefined}
          />
        </div>
      )}

      {/* FACT-CHECK AGGREGATOR SECTION */}
      {showFactCheckHub && (
        <div className="animate-in fade-in duration-200">
          <FactCheckAggregator initialClaim={inputText.trim() || undefined} />
        </div>
      )}

      {/* GEMINI MANIFESTO & PDF DISTILLER PANEL */}
      {showDistiller && (
        <div className="bg-gradient-to-br from-purple-50/90 via-white to-slate-50 rounded-2xl p-6 border-2 border-purple-200 shadow-sm space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-2xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                Gemini 3.7 Flash Manifesto Processing Utility
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Distill 100+ Page Manifestos into Key Impacts & Feasibility Risks
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
                Upload a political manifesto PDF or paste complex chapter excerpts. The Gemini API extracts quantifiable promises, estimates fiscal costs, and isolates constitutional risks under Article 201.
              </p>
            </div>
            <button
              onClick={() => setShowDistiller(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold self-start sm:self-center"
            >
              ✕ Close
            </button>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-2xs font-bold text-purple-900 uppercase tracking-wider mb-1.5">
              Load Sample 2027 Manifesto Chapter to Test:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {SAMPLE_MANIFESTOS.map((sm, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setManifestoInputText(sm.excerpt);
                    setSelectedDomain(sm.domain);
                    setActorType(sm.actor);
                  }}
                  className="p-2.5 rounded-xl border border-purple-200 bg-white hover:bg-purple-50/60 text-left transition-all"
                >
                  <span className="text-2xs font-bold text-purple-700 block line-clamp-1">{sm.domain}</span>
                  <span className="font-semibold text-slate-800 text-xs line-clamp-2 mt-0.5">{sm.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Area & File Upload Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Paste Manifesto Text or Speech Transcript:
              </label>
              <textarea
                rows={5}
                value={manifestoInputText}
                onChange={(e) => setManifestoInputText(e.target.value)}
                placeholder="Paste multi-paragraph manifesto text here (e.g. Chapter 4: Universal Health Care & Infrastructure Finance Strategy)..."
                className="w-full p-3.5 rounded-xl border border-purple-200 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden leading-relaxed"
              />
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between space-y-3 p-4 bg-purple-50/50 rounded-xl border border-purple-200/80">
              <div>
                <label className="block text-xs font-bold text-purple-950 mb-1 flex items-center gap-1.5">
                  <FileUp className="w-4 h-4 text-purple-700" />
                  Upload Manifesto PDF / TXT
                </label>
                <p className="text-2xs text-purple-800 mb-2">
                  Attach official PDF or text file for direct extraction.
                </p>
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full text-2xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-2xs file:font-semibold file:bg-purple-700 file:text-white hover:file:bg-purple-800 cursor-pointer"
                />
                {uploadedFileName && (
                  <div className="mt-2 text-2xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Loaded: {uploadedFileName}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleDistillManifesto}
                disabled={distillerLoading || (!manifestoInputText.trim() && !pdfBase64Data)}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                {distillerLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Distilling with Gemini API...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Distill Key Impacts & Risks</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {distillerError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{distillerError}</span>
            </div>
          )}

          {/* Distilled Result Display Card */}
          {distilledResult && (
            <div className="bg-white rounded-xl p-5 border border-purple-200 shadow-xs space-y-5 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    Distilled Manifesto Intelligence
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{distilledResult.documentTitle}</h4>
                </div>
                <button
                  onClick={handleApplyDistilledToAudit}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Transfer to 13-Point Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900">Executive Summary: </span>
                {distilledResult.executiveDistillation}
              </p>

              {/* Grid: Key Impacts (Green) vs Feasibility Risks (Red) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Key Impacts */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Distilled Key Impacts ({distilledResult.keyImpacts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {distilledResult.keyImpacts.map((ki, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-emerald-200/80 text-xs space-y-1">
                        <div className="font-bold text-slate-900">{ki.impact}</div>
                        <div className="flex flex-wrap gap-2 text-2xs text-slate-500 font-medium">
                          <span className="bg-emerald-50 px-1.5 py-0.5 rounded text-emerald-800">
                            Target: {ki.targetBeneficiaries}
                          </span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                            Timeline: {ki.timeframe}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feasibility & Article 201 Risks */}
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Critical Feasibility Risks ({distilledResult.feasibilityRisks.length})</span>
                  </div>
                  <div className="space-y-2">
                    {distilledResult.feasibilityRisks.map((fr, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-rose-200/80 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-2xs font-bold ${
                            fr.severity === "Critical" 
                              ? "bg-rose-100 text-rose-900" 
                              : fr.severity === "High" 
                              ? "bg-amber-100 text-amber-900" 
                              : "bg-slate-100 text-slate-800"
                          }`}>
                            {fr.severity} Severity
                          </span>
                          <span className="text-2xs text-slate-400 font-mono">{fr.constitutionalOrFiscalReference}</span>
                        </div>
                        <div className="font-semibold text-slate-900">{fr.risk}</div>
                        {fr.suggestedMitigation && (
                          <div className="text-2xs text-slate-600 italic">
                            Mitigation: {fr.suggestedMitigation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fiscal Breakdown Footer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 font-semibold block text-2xs uppercase">Estimated Cost Range</span>
                  <span className="font-bold text-slate-900">{distilledResult.estimatedCostRange || "Not explicitly costed in document"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 font-semibold block text-2xs uppercase">Stated Financing Source</span>
                  <span className="font-bold text-slate-900">{distilledResult.fundingMechanismStated || "Unspecified funding channel"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Content + Persistent Constitutional Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Evaluation Scorecards */}
        <div className={`space-y-8 ${isSidebarOpen ? "lg:col-span-8" : "lg:col-span-12"}`}>
          
          {/* Hero Explainer Header */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                <span>The 13-Point Non-Partisan Policy Audit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                “Show Me the Plan. Show Me the Numbers.”
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Kenya cannot build the Kenya of 2060 with the political culture of yesterday. Test any 2027 campaign promise, manifesto excerpt, or political speech against strict fiscal costing, constitutional viability (
                <CivicTerm term="Article 201">Article 201 Public Finance Principles</CivicTerm>
                ), and measurable delivery timelines.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-medium">
                  ✓ Facts vs Claims Separation
                </span>
                <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-medium">
                  ✓ Revenue & <CivicTerm term="Debt Service 'First Charge'">Debt Burden</CivicTerm>
                </span>
                <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-medium">
                  ✓ 5 Citizen Town Hall Questions
                </span>
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">
                Or choose a 2027 sample policy to test instantly:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_PROPOSALS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(sample)}
                    className="text-left p-3 rounded-lg border border-slate-200 hover:border-emerald-600 hover:shadow-xs transition-all group cursor-pointer bg-slate-50 hover:bg-white"
                  >
                    <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 mb-1 line-clamp-1">
                      {sample.domain}
                    </div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 mb-1 line-clamp-2">
                      {sample.title}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <span>Test proposal</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileSearch className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Paste Proposal or Speech for Scrutiny
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-400"
                >
                  <option value="Economic Growth & Productivity">Economic Growth & Productivity</option>
                  <option value="Employment & Youth Opportunities">Employment & Youth Opportunities</option>
                  <option value="Cost of Living & Basic Goods">Cost of Living & Basic Goods</option>
                  <option value="National Debt & Public Finance">National Debt & Public Finance</option>
                  <option value="Taxation & Revenue Systems">Taxation & Revenue Systems</option>
                  <option value="Agriculture & Food Security">Agriculture & Food Security</option>
                  <option value="Healthcare & Universal Access">Healthcare & Universal Access</option>
                  <option value="Education & CBC/University">Education & CBC/University</option>
                  <option value="Affordable Housing">Affordable Housing</option>
                  <option value="Infrastructure & Transport">Infrastructure & Transport</option>
                  <option value="Energy & Power Tariffs">Energy & Power Tariffs</option>
                  <option value="Technology & AI">Technology & AI</option>
                  <option value="Devolution & 47 Counties">Devolution & 47 Counties</option>
                  <option value="Corruption & Chapter 6">Corruption & Chapter 6</option>
                  <option value="Public Procurement">Public Procurement</option>
                </select>

                <select
                  value={actorType}
                  onChange={(e) => setActorType(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-400"
                >
                  <option value="Incumbent Government Record">Incumbent Government Promise</option>
                  <option value="Opposition Alternative Proposal">Opposition Alternative Proposal</option>
                  <option value="Independent / New Presidential Candidate">Independent Candidate Proposal</option>
                  <option value="Party Manifesto Excerpt">Party Manifesto Excerpt</option>
                </select>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or write any 2027 political campaign promise, speech quote, or policy plan here (e.g. 'We will build 50 modern health centers across all counties funded by...')"
              rows={4}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all leading-relaxed"
              id="proposal-input-textarea"
            />

            {error && (
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 text-red-900 text-xs border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="p-2.5 bg-red-50 border-l-4 border-red-600 rounded-r text-xs">
                <span className="text-[10px] uppercase font-black text-red-700 block">Civic Mandate</span>
                <span className="text-red-900 font-medium">“Usitupatie slogan. Tupatie plan.”</span>
              </div>
              <button
                onClick={() => handleEvaluate()}
                disabled={isLoading || !inputText.trim()}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-slate-900 text-white hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
                id="run-audit-btn"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Auditing Against 13-Point Test...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Audit Proposal Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audit Results Section */}
          {result && (
            <div className="space-y-6 animate-in fade-in duration-300 print-report-container">
              {/* PRINT-ONLY OFFICIAL CIVIC REPORT HEADER */}
              <div className="print-only print-header">
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-4">
                  <div>
                    <span className="text-[10pt] font-mono font-bold tracking-wider uppercase text-emerald-800">
                      Republic of Kenya • Citizen Scrutiny Framework
                    </span>
                    <h1 className="text-[16pt] font-black text-slate-950 uppercase tracking-tight mt-0.5">
                      Kenya 2027 Policy Rigor & Article 201 Audit Report
                    </h1>
                    <p className="text-[9pt] text-slate-600 mt-0.5">
                      Non-Partisan 13-Point Constitutional Feasibility & Generational Fairness Evaluation
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[14pt] font-black text-slate-900">
                      Score: {currentWeightedScore || computeWeightedScore(result.verdict_score, weightedSettings)}/100
                    </div>
                    <div className="text-[8pt] text-slate-500 font-mono">
                      Generated: {new Date().toLocaleDateString("en-KE", { dateStyle: "full" })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[8.5pt] bg-slate-100 p-2.5 rounded border border-slate-300 mb-4">
                  <div>
                    <strong className="text-slate-900">Policy Domain:</strong> {selectedDomain}
                  </div>
                  <div>
                    <strong className="text-slate-900">Political Actor:</strong> {actorType}
                  </div>
                  <div>
                    <strong className="text-slate-900">Katiba Art. 201 Status:</strong> {result.constitutional_compliance?.overall_verdict || "Audited"}
                  </div>
                  <div className="col-span-3 pt-1 border-t border-slate-200 mt-1">
                    <strong className="text-slate-900">Audited Manifesto Proposal:</strong> “{inputText}”
                  </div>
                </div>
              </div>

              {/* 3-Second Readability & Social Key Impact Highlights Card */}
              <KeyImpactHighlightsCard
                result={result}
                domainName={selectedDomain}
                actorType={actorType}
                proposalText={inputText}
                compositeScore={currentWeightedScore || computeWeightedScore(result.verdict_score, weightedSettings)}
              />

              {/* Executive Verdict Scorecard */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      Non-Partisan Civic Evaluation Scorecard
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      Policy Rigor Assessment
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* AI 1-Page Briefing Note Generator Button */}
                    <button
                      onClick={() => setIsBriefingNoteModalOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-purple-700 hover:bg-purple-800 text-white transition-colors shadow-2xs cursor-pointer"
                      title="Generate 1-page executive citizen briefing note for WhatsApp, Signal, or Email sharing"
                      id="generate-briefing-summary-btn"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Generate Summary</span>
                    </button>

                    {/* Primary Download Report as PDF Button (Utilizes existing print media styles) */}
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs cursor-pointer"
                      title="Download Report as PDF (Utilizes print media styling for A4 export)"
                      id="download-report-as-pdf-btn"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Report as PDF</span>
                    </button>

                    {/* PDF Export Button (Direct jsPDF document) */}
                    <button
                      onClick={handleExportPdf}
                      disabled={isExportingPdf}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs cursor-pointer"
                      title="Generate Direct PDF Document"
                      id="export-pdf-summary-btn"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-300" />
                      <span>{isExportingPdf ? "Exporting..." : "Raw PDF"}</span>
                    </button>

                    {/* CSV Data Export */}
                    <button
                      onClick={handleExportAuditCsv}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs"
                      title="Download Analysis as CSV Spreadsheet"
                      id="export-csv-summary-btn"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CSV</span>
                    </button>

                    {/* JSON Data Export */}
                    <button
                      onClick={handleExportAuditJson}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-2xs"
                      title="Download Analysis as JSON Data"
                      id="export-json-summary-btn"
                    >
                      <FileCode className="w-3.5 h-3.5 text-amber-300" />
                      <span>JSON</span>
                    </button>

                    {/* Bookmark to Watchlist */}
                    <button
                      onClick={handleToggleWatchlist}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors shadow-2xs ${
                        isCurrentResultSaved
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                      title="Save to My Civic Watchlist"
                    >
                      {isCurrentResultSaved ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                          <span>Save</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCopyScorecard}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
                      id="copy-scorecard-btn"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* Score Indicators Grid with Algorithmic Confidence Score Ring */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <PolicyConfidenceScoreRing
                      result={result}
                      selectedDomain={selectedDomain}
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        Composite Civic Rigor
                      </span>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-3xl font-black text-slate-900 font-mono">
                          {currentWeightedScore}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">/ 100</span>
                      </div>
                    </div>
                    <div className="mt-2 text-2xs text-slate-600 leading-tight">
                      Adjustable multi-factor index balancing Article 201 fiscal realism, constitutional integrity, and Kenya 2060 milestones.
                    </div>
                  </div>
                </div>

                {/* Weighted Scoring Criteria Customizer Toggle */}
                <div className="mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-800">
                        Weighted Composite Rigor Index: <span className="text-emerald-700 text-sm font-extrabold">{currentWeightedScore}/100</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setShowWeightSliders(!showWeightSliders)}
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-2xs uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>{showWeightSliders ? "Hide Weight Settings" : "Customize Criteria Weights"}</span>
                      {showWeightSliders ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Sliders Drawer */}
                  {showWeightSliders && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-2xs">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-slate-500 self-center">Presets:</span>
                          <button
                            onClick={() => {
                              setWeightedSettings({ economicFeasibilityWeight: 25, constitutionalComplianceWeight: 25, kenya2060AlignmentWeight: 20, implementationReadinessWeight: 15, clarityWeight: 15 });
                              setActiveTemplateName("Balanced");
                            }}
                            className="px-2 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold cursor-pointer"
                          >
                            Balanced
                          </button>
                          <button
                            onClick={() => {
                              setWeightedSettings({ economicFeasibilityWeight: 45, constitutionalComplianceWeight: 25, kenya2060AlignmentWeight: 10, implementationReadinessWeight: 10, clarityWeight: 10 });
                              setActiveTemplateName("Fiscal Realism");
                            }}
                            className="px-2 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-amber-800 cursor-pointer"
                          >
                            Fiscal Realism (Art. 201)
                          </button>
                          <button
                            onClick={() => {
                              setWeightedSettings({ economicFeasibilityWeight: 20, constitutionalComplianceWeight: 40, kenya2060AlignmentWeight: 20, implementationReadinessWeight: 10, clarityWeight: 10 });
                              setActiveTemplateName("Constitutional Integrity");
                            }}
                            className="px-2 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-emerald-800 cursor-pointer"
                          >
                            Constitutional Integrity
                          </button>
                          <button
                            onClick={() => {
                              setWeightedSettings({ economicFeasibilityWeight: 15, constitutionalComplianceWeight: 15, kenya2060AlignmentWeight: 45, implementationReadinessWeight: 15, clarityWeight: 10 });
                              setActiveTemplateName("Kenya 2060 Long-Term");
                            }}
                            className="px-2 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-purple-800 cursor-pointer"
                          >
                            Kenya 2060 Long-Term
                          </button>
                        </div>

                        {/* Audit Template Library Button */}
                        <button
                          onClick={() => setIsTemplateModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-2xs shadow-2xs cursor-pointer transition-colors"
                          id="open-audit-templates-btn"
                          title="Save and load custom audit configurations & Kenya 2060 pillar templates"
                        >
                          <SlidersHorizontal className="w-3 h-3 text-amber-300" />
                          <span>Custom Templates ({activeTemplateName})</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-2xs">
                        <div>
                          <div className="flex justify-between font-semibold text-slate-700">
                            <span>Economic Feasibility:</span>
                            <span>{weightedSettings.economicFeasibilityWeight}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            value={weightedSettings.economicFeasibilityWeight}
                            onChange={(e) => setWeightedSettings({ ...weightedSettings, economicFeasibilityWeight: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between font-semibold text-slate-700">
                            <span>Constitutional Compliance:</span>
                            <span>{weightedSettings.constitutionalComplianceWeight}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            value={weightedSettings.constitutionalComplianceWeight}
                            onChange={(e) => setWeightedSettings({ ...weightedSettings, constitutionalComplianceWeight: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between font-semibold text-slate-700">
                            <span>Kenya 2060 Alignment:</span>
                            <span>{weightedSettings.kenya2060AlignmentWeight}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            value={weightedSettings.kenya2060AlignmentWeight}
                            onChange={(e) => setWeightedSettings({ ...weightedSettings, kenya2060AlignmentWeight: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between font-semibold text-slate-700">
                            <span>Implementation Readiness:</span>
                            <span>{weightedSettings.implementationReadinessWeight}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            value={weightedSettings.implementationReadinessWeight}
                            onChange={(e) => setWeightedSettings({ ...weightedSettings, implementationReadinessWeight: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between font-semibold text-slate-700">
                            <span>Clarity & Specifics:</span>
                            <span>{weightedSettings.clarityWeight}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            value={weightedSettings.clarityWeight}
                            onChange={(e) => setWeightedSettings({ ...weightedSettings, clarityWeight: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Score Meters */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100">
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium mb-1">Clarity & Specifics</div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-slate-900">{result.verdict_score.clarity_score}</span>
                      <span className="text-xs text-slate-400 font-bold">/10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-emerald-600 h-1.5 rounded-full" 
                        style={{ width: `${result.verdict_score.clarity_score * 10}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium mb-1">Fiscal Costing Realism</div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-slate-900">{result.verdict_score.fiscal_realism_score}</span>
                      <span className="text-xs text-slate-400 font-bold">/10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-amber-600 h-1.5 rounded-full" 
                        style={{ width: `${result.verdict_score.fiscal_realism_score * 10}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium mb-1">Constitutional Viability</div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-slate-900">{result.verdict_score.constitutional_viability_score}</span>
                      <span className="text-xs text-slate-400 font-bold">/10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-emerald-600 h-1.5 rounded-full" 
                        style={{ width: `${result.verdict_score.constitutional_viability_score * 10}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium mb-1">Implementation Plan</div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-slate-900">{result.verdict_score.implementation_readiness_score}</span>
                      <span className="text-xs text-slate-400 font-bold">/10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${result.verdict_score.implementation_readiness_score * 10}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500 font-medium mb-1">Kenya 2060 Impact</div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-slate-900">{result.verdict_score.kenya_2060_alignment_score}</span>
                      <span className="text-xs text-slate-400 font-bold">/10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-purple-600 h-1.5 rounded-full" 
                        style={{ width: `${result.verdict_score.kenya_2060_alignment_score * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Audio Brief Player (TTS English & Kiswahili for mobile citizens) */}
              <PolicyAudioSummaryPlayer
                policyTitle={inputText.slice(0, 80) || "Audited Policy Proposal"}
                domain={selectedDomain}
                summaryText={result.summary}
              />

              {/* Slogan to Plan Callout */}
              {result.slogan_to_plan_translation && (
                <div className="bg-amber-50/80 rounded-xl p-5 border border-amber-200 flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center font-bold shrink-0 text-sm">
                    💡
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-1">
                      “Usitupatie Slogan. Tupatie Plan.” Translation:
                    </h4>
                    <p className="text-sm text-amber-950 leading-relaxed font-medium">
                      {result.slogan_to_plan_translation}
                    </p>
                  </div>
                </div>
              )}

              {/* RECHARTS MULTI-YEAR FISCAL PROJECTION CHART INTEGRATION */}
              <PolicyFiscalImpactChart
                policyTitle={inputText.slice(0, 50)}
                defaultCostKesBillions={
                  selectedDomain.includes("Housing") || selectedDomain.includes("Infrastructure") 
                    ? 180 
                    : selectedDomain.includes("Education") 
                    ? 120 
                    : selectedDomain.includes("Healthcare") 
                    ? 85 
                    : 110
                }
                defaultSector={
                  selectedDomain.includes("Education") 
                    ? "education" 
                    : selectedDomain.includes("Healthcare") 
                    ? "health" 
                    : selectedDomain.includes("Devolution") 
                    ? "devolution" 
                    : selectedDomain.includes("Agriculture") 
                    ? "agriculture" 
                    : "infra"
                }
              />

              {/* RECHARTS 30-DAY PUBLIC DISCOURSE SENTIMENT TREND CHART */}
              <PolicyPublicSentimentTrendChart
                policyTitle={inputText.slice(0, 70) || "Audited Policy Measure"}
                domainName={selectedDomain}
                compositeScore={currentWeightedScore || computeWeightedScore(result.verdict_score, weightedSettings)}
                fiscalScore={result.verdict_score.fiscal_realism_score}
              />

              {/* RECHARTS KENYA 2060 DEVELOPMENT OUTCOME RADAR CHART */}
              <PolicyKenya2060RadarChart
                evaluationResult={result}
                domainName={selectedDomain}
                policyTitle={inputText.slice(0, 70) || "Audited Policy Measure"}
                onOpenComparison={() => setIsRadarComparisonOpen(true)}
              />

              {/* GEOGRAPHICAL HEATMAP & ARTICLE 201(b) SPATIAL DISTRIBUTION */}
              <PolicyRegionalHeatmap
                policyDomain={selectedDomain}
                policyTitle={inputText.slice(0, 60) || "Audited Policy Proposal"}
              />

              {/* Fact vs Claim vs Evidence Taxonomy Breakdown */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Evidence & Taxonomy Breakdown
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Separating facts, unverified political claims, empirical data, and fiscal uncertainties.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Verified Facts */}
                  <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/30">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Stated Facts / Baselines</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {result.fact_evidence_breakdown.facts?.map((f, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                      {(!result.fact_evidence_breakdown.facts || result.fact_evidence_breakdown.facts.length === 0) && (
                        <li className="text-slate-400 italic">No verified empirical baselines cited in proposal.</li>
                      )}
                    </ul>
                  </div>

                  {/* Claims Needing Proof */}
                  <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/30">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase mb-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Political Claims Requiring Substantiation</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {result.fact_evidence_breakdown.claims?.map((c, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Uncertainties & Gaps */}
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50/30">
                    <div className="flex items-center space-x-2 text-red-800 font-bold text-xs uppercase mb-2">
                      <HelpCircle className="w-3.5 h-3.5 text-red-600" />
                      <span>Fiscal & Operational Uncertainties</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {result.fact_evidence_breakdown.uncertainties?.map((u, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Civic Recommendations */}
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/30">
                    <div className="flex items-center space-x-2 text-blue-800 font-bold text-xs uppercase mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Citizen Scrutiny Recommendations</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {result.fact_evidence_breakdown.recommendations?.map((r, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed 13-Point Audit Criteria with Interactive Sources Toggle */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="p-1 rounded bg-slate-900 text-emerald-400 font-mono font-bold text-xs">
                        13/13
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        The Full 13-Point Policy Audit Matrix & Statutory Sources
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Every proposal is rigorously cross-examined with hyperlinked statutory citations, Article 201 mandates, and official baseline sources.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Expand/Collapse All Sources Toggle */}
                    <button
                      onClick={handleToggleAllSources}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                      id="toggle-all-criteria-sources-btn"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{allSourcesExpanded ? "Collapse All Sources" : "Expand All Sources"}</span>
                    </button>

                    {/* View Mode Switcher */}
                    <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                      <button
                        onClick={() => setCriteriaViewMode("cards")}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                          criteriaViewMode === "cards" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Cards View
                      </button>
                      <button
                        onClick={() => setCriteriaViewMode("matrix")}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                          criteriaViewMode === "matrix" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Matrix Table
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cards View (Default with interactive Sources toggle) */}
                {criteriaViewMode === "cards" && (
                  <div className="grid grid-cols-1 gap-4">
                    {result.the_13_point_audit?.map((item, idx) => {
                      const statusClass = 
                        item.status === "Clear" 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : item.status === "Partially Addressed"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-rose-50 text-rose-800 border-rose-200";

                      const citation = getPointStatutoryCitations(idx + 1, selectedDomain);
                      const isSourceExpanded = !!expandedSources[idx];

                      return (
                        <div 
                          key={idx}
                          className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-3"
                          id={`criterion-card-${idx + 1}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="flex items-center space-x-2">
                              <span className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                                {idx + 1}
                              </span>
                              <h4 className="font-bold text-slate-900 text-sm">
                                {item.point}
                              </h4>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 self-start">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold border ${statusClass}`}>
                                {item.status}
                              </span>

                              {/* Interactive Sources Toggle */}
                              <button
                                onClick={() => toggleSource(idx)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                                  isSourceExpanded
                                    ? "bg-blue-50 text-blue-900 border-blue-300 shadow-2xs font-bold"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                                id={`sources-toggle-btn-${idx + 1}`}
                                title="Expand verified statutory citations and legislative sources"
                              >
                                <BookOpen className="w-3 h-3 text-blue-600" />
                                <span>{isSourceExpanded ? "Hide Sources" : "Sources"}</span>
                                {isSourceExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>

                              {/* Personal Note Toggle Button */}
                              <button
                                onClick={() => togglePersonalNote(idx)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                                  personalNotes[idx]
                                    ? "bg-amber-50 text-amber-900 border-amber-300 shadow-2xs font-bold"
                                    : expandedPersonalNoteCards[idx]
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                                id={`personal-note-btn-${idx + 1}`}
                                title="Add private browser-stored notes & review annotations"
                              >
                                <StickyNote className={`w-3 h-3 ${personalNotes[idx] ? "text-amber-600 fill-amber-300" : "text-amber-600"}`} />
                                <span>{personalNotes[idx] ? "Note Saved" : "Personal Note"}</span>
                              </button>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                            {item.analysis}
                          </p>

                          {/* Expanded Verified Citations & Legislative References Drawer */}
                          {isSourceExpanded && (
                            <div className="ml-8 mt-2 p-3.5 rounded-xl bg-slate-50 border border-blue-200 animate-in fade-in duration-200 space-y-2.5 text-xs">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                                <div className="flex items-center space-x-2">
                                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                                  <span className="font-bold text-slate-900 text-xs">
                                    Verified Legislative & Statutory Benchmark
                                  </span>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900">
                                  {citation.verificationLevel}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11.5px]">
                                <div>
                                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Statutory Act & Section:</span>
                                  <strong className="text-slate-900">{citation.statutoryAct}</strong>
                                </div>
                                <div>
                                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Constitutional Provision:</span>
                                  <strong className="text-emerald-800">{citation.constitutionalArticle}</strong>
                                </div>
                                <div>
                                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Official Oversight Agency:</span>
                                  <span className="text-slate-700">{citation.sourceAgency}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Direct Repository Link:</span>
                                  <a
                                    href={citation.hyperlink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-mono font-semibold"
                                  >
                                    <span className="truncate max-w-[180px]">{citation.sourceAgency.split("&")[0].trim()}</span>
                                    <ExternalLink className="w-3 h-3 shrink-0" />
                                  </a>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200">
                                “{citation.citationSnippet}”
                                {citation.domainSpecificContext && (
                                  <div className="mt-1 font-normal text-slate-700 not-italic">
                                    <strong className="text-slate-900 font-semibold">Sector Context:</strong> {citation.domainSpecificContext}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Personal Note Local-Storage Drawer */}
                          {expandedPersonalNoteCards[idx] && (
                            <div className="ml-8 mt-2 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 animate-in fade-in duration-200 space-y-2.5 text-xs">
                              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                                <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                                  <StickyNote className="w-3.5 h-3.5 text-amber-700" />
                                  <span>Personal Scrutiny Annotation (Local Browser-Stored)</span>
                                </div>
                                {personalNotes[idx] && (
                                  <button
                                    onClick={() => handleDeletePersonalNote(idx)}
                                    className="text-red-600 hover:text-red-800 font-semibold text-[10px] uppercase cursor-pointer"
                                  >
                                    Delete Note
                                  </button>
                                )}
                              </div>
                              <textarea
                                value={tempNoteText[idx] !== undefined ? tempNoteText[idx] : personalNotes[idx] || ""}
                                onChange={(e) => setTempNoteText((t) => ({ ...t, [idx]: e.target.value }))}
                                placeholder="Record your personal notes, follow-up questions for candidate debates, or local county impact observations..."
                                rows={2}
                                className="w-full p-2.5 rounded-lg border border-amber-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden leading-relaxed"
                              />

                              {speechRecognitionError && recordingVoiceIdx === idx && (
                                <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                  <span>{speechRecognitionError}</span>
                                </div>
                              )}

                              <div className="flex flex-wrap justify-between items-center gap-2 pt-0.5">
                                <div className="flex items-center space-x-2 text-[10px] text-amber-800">
                                  <span>
                                    {personalNotes[idx] ? "✓ Note saved to local device storage" : "Unsaved changes"}
                                  </span>
                                  {recordingVoiceIdx === idx && (
                                    <span className="flex items-center gap-1 font-bold text-rose-700 animate-pulse">
                                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                                      Transcribing audio...
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Voice Dictation Button */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (recordingVoiceIdx === idx) {
                                        stopVoiceDictation();
                                      } else {
                                        startVoiceDictation(idx);
                                      }
                                    }}
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                      recordingVoiceIdx === idx
                                        ? "bg-rose-600 text-white animate-pulse shadow-xs font-bold"
                                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                                    }`}
                                    title="Dictate personal note using your microphone (Voice-to-Text)"
                                    id={`voice-to-text-btn-${idx + 1}`}
                                  >
                                    {recordingVoiceIdx === idx ? (
                                      <>
                                        <MicOff className="w-3.5 h-3.5 text-white" />
                                        <span>Stop Dictation</span>
                                      </>
                                    ) : (
                                      <>
                                        <Mic className="w-3.5 h-3.5 text-amber-700" />
                                        <span>Dictate Voice</span>
                                      </>
                                    )}
                                  </button>

                                  <button
                                    onClick={() => handleSavePersonalNote(idx)}
                                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-md text-xs transition-colors shadow-2xs cursor-pointer"
                                  >
                                    Save Annotation
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Matrix Table View (Dense tabular format with inline Sources expander) */}
                {criteriaViewMode === "matrix" && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
                          <th className="py-3 px-4 w-1/4">Evaluation Point</th>
                          <th className="py-3 px-4 w-1/2">Assessment & Detail</th>
                          <th className="py-3 px-4 w-1/4 text-right">Status & Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.the_13_point_audit?.map((item, idx) => {
                          const statusClass = 
                            item.status === "Clear" 
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : item.status === "Partially Addressed"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-red-50 text-red-800 border-red-200";

                          const citation = getPointStatutoryCitations(idx + 1, selectedDomain);
                          const isSourceExpanded = !!expandedSources[idx];
                          const isNoteExpanded = !!expandedPersonalNoteCards[idx];

                          return (
                            <React.Fragment key={idx}>
                              <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 px-4 font-bold text-slate-900 align-top">
                                  {item.point}
                                </td>
                                <td className="py-3 px-4 text-slate-600 leading-relaxed align-top">
                                  {item.analysis}
                                </td>
                                <td className="py-3 px-4 text-right align-top space-y-1.5">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${statusClass}`}>
                                    {item.status}
                                  </span>
                                  <div className="flex flex-col items-end gap-1">
                                    <button
                                      onClick={() => toggleSource(idx)}
                                      className="inline-flex items-center gap-1 text-[11px] text-blue-700 hover:text-blue-900 font-semibold cursor-pointer"
                                    >
                                      <BookOpen className="w-3 h-3" />
                                      <span>{isSourceExpanded ? "Hide Source" : "View Source"}</span>
                                    </button>
                                    <button
                                      onClick={() => togglePersonalNote(idx)}
                                      className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                                    >
                                      <StickyNote className="w-3 h-3" />
                                      <span>{personalNotes[idx] ? "Edit Note" : "Add Note"}</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {isSourceExpanded && (
                                <tr className="bg-slate-50/80">
                                  <td colSpan={3} className="py-2.5 px-4 text-xs">
                                    <div className="p-3 bg-white rounded-lg border border-blue-200 space-y-1.5">
                                      <div className="flex items-center justify-between">
                                        <strong className="text-slate-900">{citation.statutoryAct} • {citation.constitutionalArticle}</strong>
                                        <a
                                          href={citation.hyperlink}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-mono text-[11px]"
                                        >
                                          <span>{citation.sourceAgency}</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      </div>
                                      <p className="text-[11px] text-slate-600 italic">“{citation.citationSnippet}”</p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              {isNoteExpanded && (
                                <tr className="bg-amber-50/60">
                                  <td colSpan={3} className="py-2.5 px-4 text-xs">
                                    <div className="p-3 bg-white rounded-lg border border-amber-300 space-y-2">
                                      <div className="flex items-center justify-between text-amber-900 font-bold">
                                        <span>Personal Note for: {item.point}</span>
                                        {personalNotes[idx] && (
                                          <button
                                            onClick={() => handleDeletePersonalNote(idx)}
                                            className="text-red-600 hover:text-red-800 text-[10px] uppercase font-semibold"
                                          >
                                            Delete
                                          </button>
                                        )}
                                      </div>
                                      <textarea
                                        value={tempNoteText[idx] !== undefined ? tempNoteText[idx] : personalNotes[idx] || ""}
                                        onChange={(e) => setTempNoteText((t) => ({ ...t, [idx]: e.target.value }))}
                                        placeholder="Record your personal notes and observations here..."
                                        rows={2}
                                        className="w-full p-2 border border-amber-200 rounded text-xs"
                                      />
                                      <div className="flex justify-end">
                                        <button
                                          onClick={() => handleSavePersonalNote(idx)}
                                          className="px-3 py-1 bg-amber-600 text-white rounded font-bold text-xs"
                                        >
                                          Save Note
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Real-Time Search Grounding Sources (Gemini Grounding) */}
              {result.grounding_metadata && (
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-blue-200 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <h3 className="text-base font-bold text-slate-900">
                        Real-Time Economic & Legislative Grounding (Google Search)
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      Live Grounded Verification
                    </span>
                  </div>

                  {/* Web Search Queries */}
                  {result.grounding_metadata.web_search_queries && result.grounding_metadata.web_search_queries.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Grounded Research Queries Executed:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.grounding_metadata.web_search_queries.map((query, qIdx) => (
                          <span
                            key={qIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200"
                          >
                            <Search className="w-3 h-3 text-slate-400" />
                            <span>{query}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources & Citations Links */}
                  {result.grounding_metadata.sources && result.grounding_metadata.sources.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Verified Public Sources & Citations:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {result.grounding_metadata.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between text-xs group"
                          >
                            <div className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-700">
                              {src.title || src.url}
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                              <span className="truncate max-w-[180px]">{src.url.replace(/^https?:\/\//, "")}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 5 Citizen Cross-Examination Questions */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    5 Questions Citizens & Journalists Must Ask This Candidate
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Use these precise, non-partisan questions in town halls, candidate debates, and digital town squares:
                </p>
                <div className="space-y-2.5 pt-2">
                  {result.citizen_cross_examination_questions?.map((q, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start space-x-3 p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-950 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 border border-emerald-600/40">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200 font-medium">{q}</span>
                    </div>
                  ))}
                </div>

                {result.continuity_note && (
                  <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
                    <span className="font-semibold text-emerald-400">Kenya 2060 Continuity:</span>
                    <span>{result.continuity_note}</span>
                  </div>
                )}
              </div>

              {/* PRINT-ONLY OFFICIAL CIVIC REPORT FOOTER */}
              <div className="print-only print-footer">
                <div className="flex justify-between items-center text-[8pt] text-slate-500 font-mono">
                  <span>KENYA 2027: THE GREAT COMPETITION OF IDEAS • CITIZEN CIVIC PLATFORM</span>
                  <span>CONSTITUTION OF KENYA 2010 • ARTICLES 35 & 201 COMPLIANCE</span>
                </div>
                <div className="text-[7.5pt] text-slate-400 italic text-center mt-1">
                  "Usitupatie slogan. Tupatie plan." — Verified Non-Partisan Citizen Policy Audit. Printed on {new Date().toLocaleDateString("en-KE", { dateStyle: "full" })}.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Persistent Collapsible Constitutional Articles Sidebar */}
        {isSidebarOpen && (
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <ConstitutionalArticlesSidebar
              selectedDomain={selectedDomain}
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        )}
      </div>

      {/* Currency Converter Modal */}
      <PolicyCurrencyConverterModal
        isOpen={isCurrencyConverterOpen}
        onClose={() => setIsCurrencyConverterOpen(false)}
      />

      {/* Kenya 2060 Radar Side-by-Side Policy Comparison Modal */}
      <PolicyRadarComparisonModal
        isOpen={isRadarComparisonOpen}
        onClose={() => setIsRadarComparisonOpen(false)}
        currentPolicyTitle={inputText.slice(0, 70) || "Currently Audited Policy"}
        currentDomainName={selectedDomain}
        currentEvaluationResult={result}
      />

      {/* AI 1-Page Citizen Briefing Note Generator Modal */}
      {result && (
        <PolicyBriefingNoteModal
          isOpen={isBriefingNoteModalOpen}
          onClose={() => setIsBriefingNoteModalOpen(false)}
          evaluationResult={result}
          domainName={selectedDomain}
          actorType={actorType}
          proposalText={inputText}
        />
      )}

      {/* Policy Audit Custom Template Library Modal */}
      <PolicyAuditTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentWeights={weightedSettings}
        onApplyTemplate={handleApplyTemplate}
      />
    </div>
  );
};
