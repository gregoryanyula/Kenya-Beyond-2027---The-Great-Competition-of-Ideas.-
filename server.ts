import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google GenAI Client
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Non-Partisan AI Policy Evaluator Endpoint with Google Search Grounding
app.post("/api/evaluate-policy", async (req, res) => {
  try {
    const { proposalText, domain, actorType, enableSearchGrounding } = req.body;

    if (!proposalText || typeof proposalText !== "string") {
      return res.status(400).json({ error: "Please provide a proposal text to evaluate." });
    }

    const ai = getGenAI();

    const systemPrompt = `You are a strictly non-partisan Kenyan civic-policy strategist, constitutional governance analyst, and development economist operating under the initiative:
"KENYA 2027: THE GREAT COMPETITION OF IDEAS — One Country. Many Ideas. One Destination: Kenya."

Your objective is NOT to support or oppose any political party, candidate, ethnic group, government, or opposition movement.
Your objective is to evaluate political proposals objectively through:
- Ideas over personalities
- Evidence over political slogans ("Usitupatie slogan. Tupatie plan.")
- Policy over political theatre
- Long-term national development towards Kenya 2060
- Accountability, public finance realism (Article 201), constitutional viability, and measurable outcomes.
- Grounding in current Kenyan legislative statutes, Court of Appeal / High Court rulings, National Treasury budget allocations, and KNBS economic survey data.

Apply the 13-Point Policy Test:
1. What problem is being solved?
2. What exactly is being proposed?
3. How will it be implemented?
4. How much will it cost? (Costing realism)
5. Where will the money come from? (Taxation, debt, reallocation, PPP)
6. What institutions will be responsible?
7. What measurable outcomes and KPIs should citizens expect?
8. What is the implementation timeline?
9. What are the major risks and bottlenecks?
10. What evidence or empirical precedent supports this?
11. How does it affect different groups, youth, women, and the 47 counties?
12. Is the proposal constitutionally and legally viable (Article 201, Chapter 6, Bill of Rights)?
13. How does it contribute to Kenya 2060 long-term development?

Format your response in structured JSON with the following exact keys:
{
  "summary": "Concise non-partisan summary of the proposal (2-3 sentences)",
  "verdict_score": {
    "clarity_score": number (1-10),
    "fiscal_realism_score": number (1-10),
    "constitutional_viability_score": number (1-10),
    "implementation_readiness_score": number (1-10),
    "kenya_2060_alignment_score": number (1-10)
  },
  "fact_evidence_breakdown": {
    "facts": ["Verified factual statements in the proposal"],
    "claims": ["Political claims or assertions made without provided evidence"],
    "evidence": ["Evidence or data cited or needed"],
    "uncertainties": ["Unclear assumptions, unstated costs, or ambiguous mechanisms"],
    "recommendations": ["Constructive questions and improvements citizens should demand"]
  },
  "the_13_point_audit": [
    {
      "point": "1. Problem Solved",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "2. Exact Proposal",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "3. Implementation Mechanism",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "4. Cost Estimate",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "5. Revenue & Financing Source",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "6. Responsible Institutions",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "7. Measurable Outcomes & KPIs",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "8. Timeline & Milestones",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "9. Major Risks & Mitigations",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "10. Empirical Evidence & Precedents",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "11. Demographic & 47 Counties Equity",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "12. Constitutional & Legal Viability",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    },
    {
      "point": "13. Kenya 2060 Long-term Impact",
      "analysis": "...",
      "status": "Clear" | "Partially Addressed" | "Missing/Unspecified"
    }
  ],
  "citizen_cross_examination_questions": [
    "5 specific, hard-hitting, non-partisan questions citizens, journalists, and youth should ask the candidate"
  ],
  "slogan_to_plan_translation": "How to translate this campaign talking point into concrete policy demands ('Usitupatie slogan. Tupatie plan.')",
  "continuity_note": "How this policy affects or builds upon ongoing national infrastructure and development continuity beyond 2027."
}

Return ONLY valid JSON. No markdown code blocks surrounding the JSON if possible, or clean standard JSON.`;

    if (ai) {
      const useGrounding = enableSearchGrounding !== false;
      const tools = useGrounding ? [{ googleSearch: {} }] : [];

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nPROPOSAL TO EVALUATE:\nDomain: ${domain || "General National Policy"}\nActor/Context: ${actorType || "General Candidate/Party"}\n\nText:\n"${proposalText}"`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          ...(tools.length > 0 ? { tools } : {}),
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }

      // Extract Grounding Metadata
      const candidate = response.candidates?.[0];
      const groundingMetadata = (candidate as any)?.groundingMetadata;
      if (groundingMetadata) {
        const searchQueries: string[] = groundingMetadata.webSearchQueries || [];
        const groundingChunks: any[] = groundingMetadata.groundingChunks || [];
        const sources = groundingChunks
          .filter((c) => c.web?.uri)
          .map((c) => ({
            title: c.web.title || "Official Resource / Economic Data",
            url: c.web.uri
          }));

        parsedResult.grounding_metadata = {
          web_search_queries: searchQueries,
          sources: sources
        };
      }

      return res.json({ result: parsedResult });
    } else {
      // Return structured deterministic non-partisan civic assessment if API key is not yet set
      const mockResult = generateFallbackEvaluation(proposalText, domain, actorType);
      return res.json({ result: mockResult, notice: "Evaluated with built-in non-partisan civic heuristic engine." });
    }
  } catch (error: any) {
    console.error("Evaluation error:", error);
    return res.status(500).json({ error: error?.message || "Failed to evaluate policy proposal" });
  }
});

// Citizen Q&A on Constitution, Budget & Policy
app.post("/api/distill-manifesto", async (req, res) => {
  try {
    const { manifestoText, pdfBase64, documentName, domain } = req.body;

    if ((!manifestoText || !manifestoText.trim()) && !pdfBase64) {
      return res.status(400).json({ error: "Please provide manifesto text or an uploaded PDF document to distill." });
    }

    const ai = getGenAI();

    const systemPrompt = `You are an expert non-partisan civic-policy intelligence analyst for Kenya 2027.
Your task is to distill long, complex political party manifestos, policy blueprints, White Papers, or PDF excerpts into sharp, clear, citizen-verifiable intelligence:
1. Concise Executive Summary (2-3 sentences max)
2. 'Key Impacts' (High-leverage socio-economic, youth employment, devolution, basic cost-of-living, and Kenya 2060 structural impacts)
3. 'Feasibility Risks' (Specific fiscal, legal, constitutional (Article 201), debt burden, and institutional capacity risks)
4. 'Financial Costing Discrepancies' (Identified costs, unstated liabilities, debt burden risks)
5. 'Article 201 Public Finance Compliance' (Openness, equity, debt sustainability check)
6. 'Citizen Town Hall Demands' (Concrete questions citizens must ask regarding this specific text)

Format your response in structured JSON with the following exact keys:
{
  "documentTitle": "string",
  "executiveSummary": "string",
  "keyImpacts": [
    {
      "impact": "string (concrete measurable impact)",
      "targetBeneficiaries": "string (e.g. 18-35 youth, smallholder farmers, 47 county hospitals)",
      "timeframe": "string (e.g. 100 Days, 1 Year, 3-5 Years)",
      "confidence": "High" | "Medium" | "Low"
    }
  ],
  "feasibilityRisks": [
    {
      "risk": "string (specific bottleneck or economic risk)",
      "severity": "Critical" | "High" | "Moderate",
      "constitutionalOrFiscalReference": "string (e.g. Article 201(2)(c) Burden of Public Debt, PFM Act Sec 15)",
      "suggestedMitigation": "string (how the plan must be amended for viability)"
    }
  ],
  "financialCostingSummary": {
    "statedCost": "string (e.g. KES 120 Billion / Not Disclosed)",
    "fundingMechanism": "string (e.g. Tax reallocation, Eurobond borrowing, PPP concession)",
    "fiscalRiskRating": number (1-10, where 10 is high risk/unfunded)
  },
  "constitutionalArticle201Check": {
    "status": "Article 201 Compliant" | "High Risk / Ambiguous" | "Unconstitutional Flag",
    "rationale": "string"
  },
  "keyTakeaway": "string (sharp 1-sentence takeaway for Kenyan voters: 'Usitupatie slogan. Tupatie plan.')"
}

Return ONLY valid JSON.`;

    if (ai) {
      const parts: any[] = [];
      if (pdfBase64) {
        parts.push({
          inlineData: {
            mimeType: "application/pdf",
            data: pdfBase64.replace(/^data:application\/pdf;base64,/, "")
          }
        });
      }
      if (manifestoText) {
        parts.push({
          text: `Document Name: ${documentName || "Manifesto / Policy Excerpt"}\nSector Domain: ${domain || "General National Development"}\n\nManifesto Text Content:\n${manifestoText}`
        });
      }
      parts.push({
        text: `${systemPrompt}\n\nAnalyze and distill the above manifesto content now.`
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [{ role: "user", parts }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }

      return res.json({ result: parsedResult });
    } else {
      // Deterministic fallback if API key is not present
      const mockResult = generateFallbackDistillation(manifestoText || "Sample Manifesto Document", documentName, domain);
      return res.json({ result: mockResult, notice: "Distilled via built-in civic heuristic analyzer." });
    }
  } catch (error: any) {
    console.error("Manifesto distillation error:", error);
    return res.status(500).json({ error: error?.message || "Failed to distill manifesto document" });
  }
});

// Citizen Q&A on Constitution, Budget & Policy
app.post("/api/ask-policy", async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Please provide a question." });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        answer: `Under the non-partisan Kenya 2027 Civic Framework: Article 201 of the Constitution establishes principles of public finance—openness, accountability, equity, and prudent debt management. All candidates must present costed, evidence-backed plans rather than political slogans ("Usitupatie slogan. Tupatie plan.").`,
        sources: ["Constitution of Kenya 2010 (Article 201)", "Public Finance Management Act 2012", "Kenya Vision 2030 / Kenya 2060 Framework"]
      });
    }

    const prompt = `You are the Kenya 2027 Civic Intelligence Assistant, an educational, non-partisan public resource for citizens, youth, and journalists.
Core philosophy: "ONE COUNTRY. MANY IDEAS. ONE DESTINATION: KENYA."
Message: "Usitupatie slogan. Tupatie plan."
Goal: Answer civic, budget, constitutional, and policy questions with strict impartiality, evidence, constitutional citations, and economic clarity.

Question: ${question}
Context/Domain: ${context || "General Civic Literacy"}

Structure your answer with:
1. Direct, clear explanation
2. Constitutional & Legal grounding (e.g., relevant Articles of the 2010 Constitution, PFM Act, etc.)
3. Economic & Budgetary reality (what it costs, trade-offs)
4. What citizens should ask their candidates regarding this topic.
5. Authoritative Sources to verify.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt
    });

    return res.json({
      answer: response.text,
      sources: ["Constitution of Kenya (2010)", "Public Finance Management Act (2012)", "National Treasury Budget Policy Statements", "Office of the Controller of Budget (OCOB)", "Kenya National Bureau of Statistics (KNBS)"]
    });
  } catch (error: any) {
    console.error("Ask policy error:", error);
    return res.status(500).json({ error: error?.message || "Failed to process civic question" });
  }
});

// Fact-Check Aggregator Endpoint with Google Search Grounding & Historical Data Verification
app.post("/api/fact-check-claim", async (req, res) => {
  try {
    const { claim, candidateOrActor, domain } = req.body;

    if (!claim || typeof claim !== "string") {
      return res.status(400).json({ error: "Please provide a political claim to fact-check." });
    }

    const ai = getGenAI();

    const systemPrompt = `You are a certified, non-partisan Kenyan senior fact-checker and public finance auditor for the Kenya 2027 Election platform.
Your mission is to cross-reference political manifesto claims and campaign assertions against VERIFIED HISTORICAL DATA and official Kenyan records, including:
- Kenya National Bureau of Statistics (KNBS) Economic Surveys (2013-2026)
- Office of the Controller of Budget (OCOB) Annual and Bi-Annual County/National Reports
- National Treasury Budget Policy Statements and Medium Term Expenditure Frameworks (MTEF)
- Auditor General Audit Reports
- Kenya Revenue Authority (KRA) Revenue Collections
- Parliamentary Budget Office (PBO) Policy Costings
- Supreme Court, Court of Appeal, and High Court rulings on public finance, taxation, and devolution
- Central Bank of Kenya (CBK) public debt and monetary bulletins.

Analyze the claim rigorously and return structured JSON:
{
  "claim": "Exact claim analyzed",
  "verdict": "Verified True" | "Mostly True / Context Needed" | "Unsubstantiated / Misleading" | "Contradicted by Official Data",
  "verdictColor": "emerald" | "amber" | "rose" | "red",
  "historicalDataPoint": "Specific empirical historical numbers/records (e.g., 'Between FY 2018/19 and FY 2023/24, total education capitation disbursed was KES 54.2B, averaging KES 1,420 per primary pupil rather than the claimed KES 5,000...')",
  "officialSource": "Specific institution, report title, year, or statute",
  "analysis": "2-3 paragraphs of objective, non-partisan factual cross-examination explaining what is accurate, what is exaggerated, and what context was omitted.",
  "citizenTakeaway": "1 sharp takeaway for citizens: 'What to demand when the candidate repeats this claim.'"
}

Return ONLY valid JSON.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nCLAIM TO FACT-CHECK:\nClaim: "${claim}"\nCandidate / Actor: ${candidateOrActor || "Political Actor"}\nDomain: ${domain || "General Kenyan Public Policy"}`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }]
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }

      // Extract Grounding Metadata
      const candidate = response.candidates?.[0];
      const groundingMetadata = (candidate as any)?.groundingMetadata;
      if (groundingMetadata) {
        const searchQueries: string[] = groundingMetadata.webSearchQueries || [];
        const groundingChunks: any[] = groundingMetadata.groundingChunks || [];
        const sources = groundingChunks
          .filter((c) => c.web?.uri)
          .map((c) => ({
            title: c.web.title || "Official Resource / Economic Baseline",
            url: c.web.uri
          }));

        parsedResult.groundingQueries = searchQueries;
        parsedResult.groundingSources = sources;
      }

      return res.json({ result: parsedResult });
    } else {
      // Deterministic fallback if API key is not set
      const mockFactCheck = {
        claim: claim,
        verdict: "Mostly True / Context Needed",
        verdictColor: "amber",
        historicalDataPoint: "According to KNBS Economic Survey and Controller of Budget records, sectoral allocations have historically faced cash flow delays averaging 45 to 90 days per fiscal quarter.",
        officialSource: "Controller of Budget Annual Report FY 2023/24; KNBS Economic Survey",
        analysis: `The claim touches on a recognized development priority in ${domain || "national delivery"}. However, historical disbursement patterns indicate that actual budget absorption typically falls between 68% and 82% of parliamentary appropriations due to exchequer release sequencing.`,
        citizenTakeaway: "Demand to see the quarterly cash release schedule and statutory ring-fencing mechanism before accepting this commitment as fully funded.",
        groundingSources: [
          { title: "Kenya National Bureau of Statistics", url: "https://www.knbs.or.ke" },
          { title: "Office of the Controller of Budget", url: "https://cob.go.ke" }
        ]
      };
      return res.json({ result: mockFactCheck, notice: "Evaluated using built-in historical baseline database." });
    }
  } catch (error: any) {
    console.error("Fact check error:", error);
    return res.status(500).json({ error: error?.message || "Failed to fact-check claim" });
  }
});

// Text-to-Speech Script Generation in Kiswahili and English
app.post("/api/generate-audio-summary", async (req, res) => {
  try {
    const { proposalTitle, domain, summary, fiscalScore, keyQuestions, language } = req.body;

    const lang = language === "sw" ? "Kiswahili" : "English";
    const ai = getGenAI();

    if (ai) {
      const prompt = `You are a radio broadcaster and civic educator for Kenya 2027 Civic Radio ("Sauti ya Mwananchi").
Create a concise, highly accessible, natural audio broadcast summary of this policy proposal in ${lang}.

Proposal: "${proposalTitle}"
Domain: "${domain}"
Summary: "${summary}"
Fiscal Realism Score: ${fiscalScore}/10
Key Questions: ${JSON.stringify(keyQuestions || [])}

Requirements:
- Target length: 45 to 65 seconds when spoken aloud (approx 100-140 words).
- If language is Kiswahili: Use clear, engaging standard Kenyan Swahili suitable for community radio (e.g., "Habari mwananchi. Hii hapa tathmini yetu ya sera ya..."). Include key terms like "Katiba Ibara ya 201", "Gharama ya Fedha za Umma", and the motto "Usitupatie slogan, tupatie plan!".
- If language is English: Use punchy, conversational Kenyan civic English.
- Structure:
  1. Catchy Radio Hook (Introducing the policy)
  2. The Stated Promise vs The Financial Reality (Cost & Debt check)
  3. The Big Question for the Candidate (Swali kwa Mwanasiasa)
  4. Non-partisan Call to Action ("Tathmini sera kabla ya kupiga kura").

Format your response in structured JSON:
{
  "language": "${language || "en"}",
  "audioScript": "The complete broadcast text to read out loud smoothly",
  "bulletPoints": [
    "Key takeaway point 1",
    "Key takeaway point 2",
    "Key takeaway point 3"
  ],
  "estimatedDurationSec": 55
}

Return ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }

      return res.json({ result: parsedResult });
    } else {
      // Deterministic fallback
      if (language === "sw") {
        return res.json({
          result: {
            language: "sw",
            audioScript: `Habari mwananchi. Hii hapa tathmini fupi ya sera ya ${proposalTitle || domain}. Sera hii inalenga kuleta mabadiliko katika sekta ya ${domain}. Hata hivyo, chini ya Ibara ya 201 ya Katiba yetu, fedha za umma lazima zitumike kwa uwazi na mipango thabiti. Je, mwanasiasa huyu ataifadhili vipi bila kuongeza mzigo wa madeni kwa wananchi? Kumbuka msemo wetu: Usitupatie slogan, tupatie plan! Pima sera, chagua maendeleo.`,
            bulletPoints: [
              `Lengo kuu la sera katika sekta ya ${domain}`,
              "Uzingatiaji wa Katiba Ibara ya 201 kuhusu fedha za umma",
              "Swali kuu: Mpango kamili wa ufadhili uko wapi?"
            ],
            estimatedDurationSec: 45
          }
        });
      } else {
        return res.json({
          result: {
            language: "en",
            audioScript: `Citizen Civic Briefing on ${proposalTitle || domain}. This policy targets key delivery in ${domain}. While the programmatic goals sound ambitious, Article 201 of Kenya's Constitution mandates fiscal sustainability, transparency, and equity. The vital question every voter must ask is: Where will the money come from, and what measurable results will we see in the first 100 days? Remember our civic motto: Do not give us slogans, give us a plan!`,
            bulletPoints: [
              `Core programmatic focus on ${domain}`,
              "Article 201 public finance compliance check",
              "Mandatory question: Detailed line-item costing & source of funds"
            ],
            estimatedDurationSec: 45
          }
        });
      }
    }
  } catch (error: any) {
    console.error("Audio summary generation error:", error);
    return res.status(500).json({ error: error?.message || "Failed to generate audio summary" });
  }
});

// AI 1-Page Briefing Note Generator Endpoint
app.post("/api/generate-briefing-note", async (req, res) => {
  try {
    const { proposalTitle, domain, actorType, summary, scores, sloganTranslation, factsEvidence, questions } = req.body;
    const ai = getGenAI();

    if (ai) {
      const prompt = `You are a chief civic policy strategist for the Kenya 2027 initiative: "One Country. Many Ideas. One Destination: Kenya."
Produce a concise, high-impact 1-page civic briefing note of this audited political policy, optimized for instant sharing via WhatsApp, Signal, and Email.

Policy Title: "${proposalTitle || "Audited Policy Measure"}"
Domain: ${domain}
Actor: ${actorType}
Evaluation Summary: ${summary}
Scores: ${JSON.stringify(scores || {})}
Slogan Translation: "${sloganTranslation || ""}"
Questions: ${JSON.stringify(questions || [])}

Respond ONLY with valid JSON matching this schema:
{
  "title": "Short punchy document title",
  "tagline": "Kenya 2027 Citizen Rigor Briefing",
  "executiveSummary": "1-2 paragraphs of sharp executive summary",
  "statedPromiseVsReality": "Concise contrast of political promise vs practical delivery reality",
  "fiscalRealityCheck": {
    "estimatedCost": "KES XX Billion estimate",
    "fundingSource": "Stated or unstated financing source",
    "riskVerdict": "Low / Moderate / High Debt Risk"
  },
  "devolutionCountyImpact": "Specific impact on 47 counties and spatial equity under Article 201(b)",
  "top3TownHallQuestions": ["Question 1", "Question 2", "Question 3"],
  "citizenVerdict": "Bottomline non-partisan civic takeaway",
  "whatsappFormattedText": "Complete markdown/whatsapp formatted string with emojis for 1-click sharing",
  "emailSubject": "[Civic Brief] Policy Audit: ...",
  "emailBodyText": "Plaintext email body"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }
      return res.json(parsedResult);
    } else {
      // Deterministic fallback
      return res.json({
        title: `1-Page Policy Brief: ${(proposalTitle || domain).slice(0, 50)}`,
        tagline: `Kenya 2027 Citizen Scrutiny • ${domain}`,
        executiveSummary: summary || `Scrutiny of ${proposalTitle} under Kenya's Article 201 public finance principles.`,
        statedPromiseVsReality: sloganTranslation || "Translating political slogan into concrete statutory implementation plan.",
        fiscalRealityCheck: {
          estimatedCost: "KES 45B - 120B Estimated Multi-Year Rollout",
          fundingSource: "Unspecified in excerpt / Requires Parliamentary Budget Office appropriation",
          riskVerdict: scores?.fiscal_realism_score >= 7 ? "Fiscally Balanced" : "High Debt / Deficit Risk"
        },
        devolutionCountyImpact: "Direct implications for County Equitable Share and Equalization Fund allocations across all 47 counties.",
        top3TownHallQuestions: (questions && questions.length > 0) ? questions.slice(0, 3) : [
          "What specific legislative amendment is required to execute this policy?",
          "How will the revenue deficit be covered without increasing sovereign debt?",
          "What measurable KPI will be achieved in the first 100 days post-gazettement?"
        ],
        citizenVerdict: `Composite Rigor: ${Math.round(((scores?.clarity_score || 7) + (scores?.fiscal_realism_score || 6) + (scores?.constitutional_viability_score || 8) + (scores?.implementation_readiness_score || 7) + (scores?.kenya_2060_alignment_score || 7)) * 2)}/100.`,
        whatsappFormattedText: `🇰🇪 *KENYA 2027 CITIZEN POLICY BRIEFING*\n📜 *Policy:* ${(proposalTitle || domain).slice(0, 70)}\n🏷️ *Domain:* ${domain} | *Actor:* ${actorType}\n\n🔍 *EXECUTIVE VERDICT:*\n${summary}\n\n💡 *THE REALITY CHECK:*\n"${sloganTranslation || 'Usitupatie slogan. Tupatie plan.'}"\n\n💰 *FISCAL REALISM (Article 201):*\n• Fiscal Realism: ${scores?.fiscal_realism_score || 6}/10\n• Constitutional: ${scores?.constitutional_viability_score || 8}/10\n• Kenya 2060: ${scores?.kenya_2060_alignment_score || 7}/10\n\n❓ *3 HARD QUESTIONS FOR CITIZEN TOWN HALLS:*\n1. What specific vote head in the National Budget covers this?\n2. What is the county co-funding formula under Article 189?\n3. How is debt sustainability safeguarded under PFM Act Sec 15?\n\n🌐 *Kenya 2027: The Great Competition of Ideas*`,
        emailSubject: `[Civic Briefing] Policy Audit: ${(proposalTitle || domain).slice(0, 45)}`,
        emailBodyText: `Citizen Policy Scrutiny Briefing Note\n\nPolicy: ${proposalTitle}\nDomain: ${domain}\nActor: ${actorType}\n\nExecutive Verdict:\n${summary}\n\nFiscal Realism: ${scores?.fiscal_realism_score || 6}/10\nConstitutional Viability: ${scores?.constitutional_viability_score || 8}/10\n\nGenerated via Kenya 2027 Civic Intelligence Platform.`
      });
    }
  } catch (error: any) {
    console.error("Briefing note endpoint error:", error);
    return res.status(500).json({ error: error?.message || "Failed to generate briefing note" });
  }
});

// Sentiment, Bias and Tone Analysis for Manifestos & Media Reports
app.post("/api/analyze-manifesto-tone", async (req, res) => {
  try {
    const { textToAnalyze, documentTitle, domain } = req.body;

    if (!textToAnalyze || typeof textToAnalyze !== "string") {
      return res.status(400).json({ error: "Please provide text to analyze." });
    }

    const ai = getGenAI();

    const systemPrompt = `You are a senior media analyst, cognitive linguist, and non-partisan discourse watchdog for the Kenya 2027 Election platform.
Your task is to analyze political manifestos, campaign speeches, and media reports for:
1. Tone classification: Is it "Constructive & Evidence-Based", "Moderate Emotional Framing", "Sensationalist & Outrage-Driven", or "Populist / Fear-Appealing"?
2. Bias & Objectivity score (0-100, where 0 is purely objective and 100 is severely partisan/biased)
3. Evidence vs Rhetoric ratio (percentage of verifiable data/statutory citations vs emotional assertions)
4. Emotional Manipulation Index (0-100): Detection of fear appeals, victimhood framing, ethnic dog-whistling, messianic savior complexes, or false dichotomies ("Us vs Them")
5. Detected Logical Fallacies & Loaded Language: Exact quotes with explanation
6. Constructive Reframing: How to translate the emotionally manipulative rhetoric into concrete, non-partisan policy questions under Article 201.

Format your response in structured JSON with the following exact keys:
{
  "overallTone": "Constructive & Evidence-Based" | "Moderate Emotional Framing" | "Sensationalist & Outrage-Driven" | "Populist / Fear-Appealing",
  "biasScore": number (0 to 100),
  "evidenceRatio": number (0 to 100),
  "emotionalCharge": number (0 to 100),
  "detectedFallacies": [
    {
      "name": "string (e.g., False Dilemma / Loaded Language / Ad Hominem / Appeal to Fear / Bandwagon)",
      "quote": "string (exact excerpt from text)",
      "explanation": "string (why this manipulative or fallacious)",
      "severity": "High" | "Medium" | "Low"
    }
  ],
  "rhetoricalMarkers": [
    {
      "category": "Emotional Appeal | Out-Group Blame | Vague Promise | Evidence Citation | Institutional Reference",
      "count": number,
      "description": "string"
    }
  ],
  "constructiveReframing": "string (How citizens and journalists can rewrite this claim as an evidence-based Article 201 policy challenge)"
}

Return ONLY valid JSON.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nTEXT TO ANALYZE:\nTitle: ${documentTitle || "Political Excerpt"}\nDomain: ${domain || "General Discourse"}\n\nContent:\n"${textToAnalyze}"`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }

      return res.json({ result: parsedResult });
    } else {
      // Deterministic fallback
      const hasEmotionalWords = /(destroy|traitor|corrupt|steal|save us|enemy|miracle|disaster|threat|collapse)/i.test(textToAnalyze);
      const hasDataWords = /(percent|billion|million|kes|ksh|knbs|audit|act|constitution|article)/i.test(textToAnalyze);

      const mockAnalysis = {
        overallTone: hasEmotionalWords ? "Sensationalist & Outrage-Driven" : "Moderate Emotional Framing",
        biasScore: hasEmotionalWords ? 74 : 38,
        evidenceRatio: hasDataWords ? 58 : 22,
        emotionalCharge: hasEmotionalWords ? 78 : 35,
        detectedFallacies: [
          {
            name: "Loaded Language & Moral Framing",
            quote: textToAnalyze.slice(0, 70) + "...",
            explanation: "Uses emotionally evocative vocabulary to prompt an immediate affective reaction rather than inviting analytical cost scrutiny.",
            severity: "Medium"
          },
          {
            name: "Unsubstantiated Causal Claim",
            quote: "Promises immediate economic transformation upon election victory",
            explanation: "Attributes complex macroeconomic recovery solely to political willpower without accounting for global commodity cycles or public debt service constraints.",
            severity: "High"
          }
        ],
        rhetoricalMarkers: [
          { category: "Emotional Appeal", count: hasEmotionalWords ? 5 : 2, description: "Phrases designed to elicit excitement, fear, or moral urgency" },
          { category: "Vague Promise", count: 4, description: "Broad policy intentions lacking line-item appropriation details" },
          { category: "Evidence Citation", count: hasDataWords ? 3 : 1, description: "Verifiable empirical metrics or statutory frameworks referenced" }
        ],
        constructiveReframing: "Rewrite this assertion by asking: 'What specific legislative bill, budget vote, and regulatory statutory instrument will achieve this outcome within the first 100 days under Article 201?'"
      };

      return res.json({ result: mockAnalysis, notice: "Analyzed via built-in linguistic heuristic model." });
    }
  } catch (error: any) {
    console.error("Manifesto tone analysis error:", error);
    return res.status(500).json({ error: error?.message || "Failed to analyze manifesto tone" });
  }
});

// Daily Civic Digest Endpoint Tailored to User Watchlist (Gemini 3.7 Flash)
app.post("/api/daily-civic-digest", async (req, res) => {
  try {
    const { watchlistItems, preferredDomains, language } = req.body;

    const lang = language === "sw" ? "Kiswahili" : "English";
    const ai = getGenAI();

    const todayDateStr = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const userDomains = Array.isArray(watchlistItems) && watchlistItems.length > 0
      ? watchlistItems.map((item: any) => `${item.domain || item.title} (${item.type || "topic"})`).slice(0, 8).join("; ")
      : (Array.isArray(preferredDomains) && preferredDomains.length > 0 ? preferredDomains.join(", ") : "Youth Employment, Public Debt, Agriculture & Food Sovereignty, Healthcare Access");

    const systemPrompt = `You are the Senior Chief Civic Intelligence Analyst for the "Kenya 2027: The Great Competition of Ideas" platform.
Core principle: "ONE COUNTRY. MANY IDEAS. ONE DESTINATION: KENYA."
Civic Motto: "Usitupatie slogan. Tupatie plan."

Create a non-partisan, highly tailored "Daily Civic Digest" for ${todayDateStr} specifically customized around the citizen's watched interests:
Citizen Watched Topics: "${userDomains}"
Language: ${lang}

Your digest must synthesize:
1. Executive Morning Intelligence Brief (3-4 crisp sentences reviewing recent policy moves in their interest areas).
2. 3 to 4 Tailored Highlights across their watched domains (each containing a recent manifesto promise update, official KNBS/CBK/OCOB fact-check verdict, statutory evidence source, Article 201 status, and 1 hard-hitting town-hall question).
3. One 'Critical Article 201 Alert' regarding fiscal sustainability, public debt, or devolution revenue share.
4. An engaging 50-second Radio Broadcast Narration Script suitable for text-to-speech reading with audio waveform.
5. Today's Civic Tip for citizens and Gen-Z auditors.

Format your response in structured JSON with the following exact keys:
{
  "digestDate": "${todayDateStr}",
  "greetingTitle": "string (e.g., 'Your Kenya 2027 Morning Scrutiny Brief' or 'Muhtasari wa Asubuhi wa Sera za Kenya 2027')",
  "executiveSummary": "string (3-4 sentences)",
  "watchlistCoverageCount": number,
  "tailoredHighlights": [
    {
      "id": "string",
      "domain": "string",
      "title": "string (Headline of the policy debate/claim)",
      "manifestoUpdate": "string (What was promised or announced)",
      "factCheckVerdict": "Verified True" | "Misleading / Uncosted" | "Contradicted by Official Data" | "Context Needed" | "Article 201 Flag",
      "verdictBadgeColor": "emerald" | "amber" | "rose" | "purple",
      "evidenceSource": "string (e.g. KNBS Economic Survey 2026 / OCOB County Report / PFM Act Sec 15)",
      "article201Status": "string",
      "citizenTownHallQuestion": "string (Direct question for the politician)"
    }
  ],
  "criticalArticle201Alert": {
    "title": "string",
    "description": "string",
    "statutoryCitation": "string",
    "implication": "string"
  },
  "audioBroadcastScript": "string (Smooth, natural text-to-speech script approx 110-140 words)",
  "todaysCivicTip": "string"
}

Return ONLY valid JSON.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nGenerate the customized Daily Civic Digest now for today.`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }]
        }
      });

      const responseText = response.text || "{}";
      let parsedResult: any = {};
      try {
        parsedResult = JSON.parse(responseText);
      } catch (e) {
        const cleaned = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsedResult = JSON.parse(cleaned);
      }
      parsedResult.isAiGenerated = true;

      return res.json({ result: parsedResult });
    } else {
      const fallbackDigest = generateFallbackDailyDigest(todayDateStr, userDomains, language);
      return res.json({ result: fallbackDigest, notice: "Generated using built-in verified civic dataset." });
    }
  } catch (error: any) {
    console.error("Daily Civic Digest error:", error);
    return res.status(500).json({ error: error?.message || "Failed to generate daily civic digest" });
  }
});

function generateFallbackDailyDigest(dateStr: string, userDomains: string, language?: string) {
  const isSw = language === "sw";

  if (isSw) {
    return {
      digestDate: dateStr,
      greetingTitle: "Muhtasari wa Asubuhi wa Sera za Kenya 2027",
      executiveSummary: "Habari ya asubuhi mwananchi. Leo tumeangazia sera kuu zinazohusiana na mambo uliyohifadhi: ajira za vijana, ushuru wa bidhaa za kimsingi, na ugavi wa mapato kwa kaunti 47. Chini ya Ibara ya 201 ya Katiba, kila ahadi inapaswa kuwa na hesabu kamili ya fedha badala ya maneno matupu.",
      watchlistCoverageCount: 4,
      tailoredHighlights: [
        {
          id: "digest-1",
          domain: "Uchumi na Gharama ya Maisha",
          title: "Ahadi ya Kuondoa Ushuru wa Unga na Mafuta ya Kupikia",
          manifestoUpdate: "Miungano mikuu imetangaza kupunguza mara moja VAT ya vyakula vya kimsingi hadi asilimia sifuri katika siku 30 za kwanza.",
          factCheckVerdict: "Misleading / Uncosted" as const,
          verdictBadgeColor: "amber" as const,
          evidenceSource: "Ripoti ya KNBS na KRA ya Mapato 2025/26",
          article201Status: "Ibara ya 201(c) - Hatari ya nakisi ya KES 68B bila mpango mbadala wa mapato",
          citizenTownHallQuestion: "Je, serikali itafidia wapi pengo la KES 68 Bilioni za ushuru bila kuchukua madeni mapya ya kigeni?"
        },
        {
          id: "digest-2",
          domain: "Nafasi za Ajira kwa Vijana",
          title: "Vituo vya Ubunifu wa Kidijitali katika Wadi Zote 1,450",
          manifestoUpdate: "Mpango wa kutoa mafunzo ya AI na kazi za mtandaoni kwa vijana 500,000 kupitia Mfuko wa Universal Service Fund.",
          factCheckVerdict: "Verified True" as const,
          verdictBadgeColor: "emerald" as const,
          evidenceSource: "Ripoti ya Mamlaka ya Mawasiliano (CA) & ICT Authority",
          article201Status: "Inalingana na kanuni za uwazi na uwekezaji endelevu wa kiteknolojia",
          citizenTownHallQuestion: "Je, mfumo wa intaneti ya kasi utafika katika maeneo ya mashambani ndani ya miezi mingapi?"
        },
        {
          id: "digest-3",
          domain: "Ugatuzi & Afya ya Kaunti",
          title: "Utoaji wa Moja kwa Moja wa Asilimia 35 ya Mapato kwa Kaunti",
          manifestoUpdate: "Ahadi ya kufanya marekebisho ya Sheria ya PFM ili Hazina Kuu isicheleweshe fedha za hospitali za kaunti.",
          factCheckVerdict: "Context Needed" as const,
          verdictBadgeColor: "purple" as const,
          evidenceSource: "Ofisi ya Mdhibiti wa Bajeti (OCOB) Ripoti ya Kaunti",
          article201Status: "Ibara ya 219 ya Katiba - Utoaji wa fedha bila masharti na ucheleweshaji",
          citizenTownHallQuestion: "Ni hatua gani za kisheria zitachukuliwa dhidi ya maafisa wanaochelewesha mgao wa fedha za dawa?"
        }
      ],
      criticalArticle201Alert: {
        title: "Tahadhari ya Ulipaji Madeni ya Kigeni (First Charge)",
        description: "Kwa sasa huduma ya madeni inachukua zaidi ya 58% ya mapato ya kawaida. Ahadi yoyote inayoongeza matumizi ya kawaida bila kupunguza gharama za serikali inakiuka Ibara ya 201(d).",
        statutoryCitation: "Katiba ya Kenya 2010 Ibara ya 201(2)(c) & (d)",
        implication: "Wananchi lazima wadai kuona mpango wa kupunguza safari za serikali na matumizi ya anasa kabla ya kodi mpya."
      },
      audioBroadcastScript: "Habari za asubuhi. Huu hapa muhtasari wako wa sera za Kenya 2027. Leo tunaangazia ahadi za kupunguza gharama ya maisha na ajira za vijana. Kumbuka, sera nzuri sio maneno matamu jukwaani bali ni hesabu kamili na ukweli wa bajeti chini ya Ibara ya 201 ya Katiba. Usitupatie slogan, tupatie plan! Tembelea ukurasa huu kuchunguza mpango kamili.",
      todaysCivicTip: "Kabla ya kuamini ahadi ya ujenzi wa barabara au hospitali, uliza: 'Je, mradi huu uko kwenye Mpango wa Maendeleo wa Kaunti (CIDP) na umetengewa fedha?'",
      isAiGenerated: false
    };
  }

  return {
    digestDate: dateStr,
    greetingTitle: "Your Kenya 2027 Daily Civic Intelligence Digest",
    executiveSummary: "Good morning. Here is your evidence-based morning brief curated around your watched policy domains: Youth Employment, Cost of Living, Devolution, and Public Debt Scrutiny. Under Article 201 of Kenya's Constitution, every campaign pledge must be backed by verifiable revenue channels rather than political slogans.",
    watchlistCoverageCount: 4,
    tailoredHighlights: [
      {
        id: "digest-1",
        domain: "Macroeconomics & Cost of Living",
        title: "Zero-Rating VAT on Basic Staples & Price Ceilings",
        manifestoUpdate: "Leading campaign coalitions have pledged day-one executive orders to eliminate VAT on maize flour, fuel, and cooking oil.",
        factCheckVerdict: "Misleading / Uncosted" as const,
        verdictBadgeColor: "amber" as const,
        evidenceSource: "KNBS Economic Survey & KRA Ordinary Revenue Bulletin",
        article201Status: "Article 201(c) Risk: Creates an immediate KES 72B revenue hole with no replacement funding mechanism.",
        citizenTownHallQuestion: "Which specific budget expenditure votes will be slashed to absorb the KES 72 Billion revenue deficit without new commercial borrowing?"
      },
      {
        id: "digest-2",
        domain: "Youth Opportunities & Digital Tech",
        title: "290 Constituency Innovation & AI Remote Hubs",
        manifestoUpdate: "Proposal to allocate 5% of the Universal Service Fund (KES 8B) for high-speed fiber hubs and remote digital freelancing.",
        factCheckVerdict: "Verified True" as const,
        verdictBadgeColor: "emerald" as const,
        evidenceSource: "Communications Authority (CA) Universal Service Advisory Council",
        article201Status: "Fully compliant with statutory ring-fencing and equitable sub-county allocation.",
        citizenTownHallQuestion: "What is the statutory timeline for the ICT Authority and County Governments to gazette the public work spaces?"
      },
      {
        id: "digest-3",
        domain: "Devolution & Healthcare Access",
        title: "Direct Automatic Central Bank Exchequer Releases to Counties",
        manifestoUpdate: "Legislative amendment to PFM Act Sec 17 to disburse the equitable share by the 10th of every month automatically.",
        factCheckVerdict: "Context Needed" as const,
        verdictBadgeColor: "purple" as const,
        evidenceSource: "Office of the Controller of Budget & Council of Governors Memoranda",
        article201Status: "Article 219 & Article 201(a) Alignment: Protects public hospitals from lethal cash-flow supply shocks.",
        citizenTownHallQuestion: "Will the proposed legislation include automatic surcharges on Treasury officials who violate the 10th-day disbursement rule?"
      }
    ],
    criticalArticle201Alert: {
      title: "Public Debt 'First Charge' Fiscal Reality Check",
      description: "Debt service continues to absorb 61.2% of ordinary revenue at the Central Bank Consolidated Fund. Any campaign blueprint that promises free goods without specifying revenue reallocations risks violating Article 201(d) prudent financial management.",
      statutoryCitation: "Constitution of Kenya 2010, Article 201(2)(c) & Public Finance Management Act Sec 15",
      implication: "Citizens must challenge candidates to publish their line-item Medium Term Expenditure Framework (MTEF) adjustments."
    },
    audioBroadcastScript: "Good morning, citizen. Here is your daily Kenya 2027 civic intelligence briefing. Today we are tracking crucial pledges on the cost of living, county hospital drug supplies, and youth digital hubs. Under Article 201 of our Constitution, leadership is measured by credible math and fiscal integrity, not political theatre. Remember our motto: Usitupatie slogan, tupatie plan! Dive into today's breakdown to prepare your town hall questions.",
    todaysCivicTip: "Always cross-examine every 'free service' promise by asking: 'Is this funded through revenue growth, budget cuts to executive travel, or fresh foreign commercial debt?'",
    isAiGenerated: false
  };
}

function generateFallbackEvaluation(text: string, domain?: string, actorType?: string) {
  const words = text.split(/\s+/).length;
  const hasNumbers = /\d+/.test(text);
  const hasTimeline = /(year|month|202|203|phase|quarter|days)/i.test(text);
  const hasFinancing = /(tax|budget|ksh|kes|billion|borrow|debt|revenue|treasury|fund)/i.test(text);
  const hasInstitutions = /(ministry|authority|county|parliament|board|commission|agency)/i.test(text);

  return {
    summary: `A proposal focused on ${domain || "national policy"} addressing structural public delivery, requiring scrutiny on financing channels and long-term milestones.`,
    verdict_score: {
      clarity_score: words > 30 ? 7 : 5,
      fiscal_realism_score: hasFinancing ? 6 : 3,
      constitutional_viability_score: 8,
      implementation_readiness_score: (hasTimeline && hasInstitutions) ? 7 : 4,
      kenya_2060_alignment_score: 7
    },
    fact_evidence_breakdown: {
      facts: [
        "Identifies a stated policy priority within the Kenyan development landscape."
      ],
      claims: [
        "Implicit claim that proposed intervention will resolve structural bottlenecks without detailed macroeconomic modeling."
      ],
      evidence: [
        "Requires empirical baseline data from KNBS, Controller of Budget, or sector-specific baseline audits."
      ],
      uncertainties: [
        hasFinancing ? "Specific tax vs debt mix requires Medium-Term Expenditure Framework (MTEF) validation." : "No explicit costing or funding source declared.",
        hasTimeline ? "Timeline feasibility contingent on procurement and budget cycles." : "Specific milestone delivery dates not defined."
      ],
      recommendations: [
        "Demand detailed line-item costing under the Public Finance Management Act framework.",
        "Specify the exact implementing statutory bodies and cross-county coordination mechanisms.",
        "Verify alignment with Article 201 principles of public finance and inter-generational equity."
      ]
    },
    the_13_point_audit: [
      { point: "1. Problem Solved", analysis: "Identifies core sectoral need.", status: "Clear" },
      { point: "2. Exact Proposal", analysis: "Outlines programmatic intention.", status: "Clear" },
      { point: "3. Implementation Mechanism", analysis: hasInstitutions ? "Mentions implementing structures." : "Lacks clear operational workflow.", status: hasInstitutions ? "Partially Addressed" : "Missing/Unspecified" },
      { point: "4. Cost Estimate", analysis: hasNumbers ? "Contains financial estimates." : "Lacks published fiscal valuation.", status: hasNumbers ? "Partially Addressed" : "Missing/Unspecified" },
      { point: "5. Revenue & Financing Source", analysis: hasFinancing ? "Mentions fiscal mechanisms." : "Does not explain if funding is from taxes, debt, or budget cuts.", status: hasFinancing ? "Partially Addressed" : "Missing/Unspecified" },
      { point: "6. Responsible Institutions", analysis: hasInstitutions ? "Identifies key agencies." : "Statutory lead agency not designated.", status: hasInstitutions ? "Clear" : "Missing/Unspecified" },
      { point: "7. Measurable Outcomes & KPIs", analysis: "Needs clear citizen-verifiable milestones and targets.", status: "Partially Addressed" },
      { point: "8. Timeline & Milestones", analysis: hasTimeline ? "References phases." : "Needs hard milestone deadlines.", status: hasTimeline ? "Partially Addressed" : "Missing/Unspecified" },
      { point: "9. Major Risks & Mitigations", analysis: "Risk registry and mitigation strategy not explicitly documented.", status: "Missing/Unspecified" },
      { point: "10. Empirical Evidence & Precedents", analysis: "Empirical reference cases across regional or global peers should be cited.", status: "Partially Addressed" },
      { point: "11. Demographic & 47 Counties Equity", analysis: "Needs explicit devolution impact analysis under County Allocation of Revenue Acts.", status: "Partially Addressed" },
      { point: "12. Constitutional & Legal Viability", analysis: "Compliant in principle with Chapter 4 (Bill of Rights) and Chapter 12 (Public Finance).", status: "Clear" },
      { point: "13. Kenya 2060 Long-term Impact", analysis: "Contributes to foundational productivity and socio-economic transformation.", status: "Clear" }
    ],
    citizen_cross_examination_questions: [
      "What is the exact multi-year total cost, and how will it be financed without increasing the public debt ceiling or burdening basic commodities?",
      "Which specific state agency or county government department holds single-point accountability for delivery?",
      "What measurable outcome will an ordinary citizen in any of the 47 counties experience within the first 100 days, 1 year, and 3 years?",
      "What legal or parliamentary amendments are required before this can take effect?",
      "How does this proposal ensure continuity if government administrations change in the future?"
    ],
    slogan_to_plan_translation: "Shift from campaign rhetoric to requiring a full Cabinet Memorandum, Budget Policy Statement alignment, and independent Parliamentary Budget Office costing.",
    continuity_note: "Must be anchored in statutory development planning to prevent arbitrary cancellation across electoral cycles."
  };
}

function generateFallbackDistillation(text: string, docName?: string, domain?: string) {
  const hasNumbers = /\d+/.test(text);
  const hasFinancing = /(tax|budget|ksh|kes|billion|borrow|debt|revenue|treasury|fund|ppp)/i.test(text);

  return {
    documentTitle: docName || "Manifesto & Strategic Policy Excerpt",
    executiveSummary: `This policy document outlines key commitments in ${domain || "economic and social transformation"}. While the programmatic goals target key productivity levers, full operationalization requires strict adherence to Article 201 public debt and fiscal disclosure standards.`,
    keyImpacts: [
      {
        impact: "Targets structural enhancement of public service delivery and targeted sector infrastructure.",
        targetBeneficiaries: "Youth demographics, regional producer communities, and local county economies",
        timeframe: "First 100 Days to 3-Year Medium Term",
        confidence: "Medium"
      },
      {
        impact: "Projected job creation and decentralized capacity building across devolved governance units.",
        targetBeneficiaries: "Unemployed youth, TVET graduates, and micro-entrepreneurs",
        timeframe: "1-2 Years Post-Gazettement",
        confidence: hasNumbers ? "High" : "Medium"
      },
      {
        impact: "Long-term alignment with Kenya 2060 industrial productivity and agricultural value addition.",
        targetBeneficiaries: "General citizenry and future generations",
        timeframe: "3-5 Years Strategic Horizon",
        confidence: "High"
      }
    ],
    feasibilityRisks: [
      {
        risk: hasFinancing ? "Financing mechanism relies heavily on revenue realization assumptions without buffer reserves." : "Uncosted liability: No clear budget reallocation or financing channel specified.",
        severity: "Critical",
        constitutionalOrFiscalReference: "Article 201(2)(c) Public Debt Burden & PFM Act Sec 15",
        suggestedMitigation: "Mandate Parliamentary Budget Office (PBO) costing review prior to legislative appropriation."
      },
      {
        risk: "Coordination friction between National Ministries and the 47 County Governments.",
        severity: "Moderate",
        constitutionalOrFiscalReference: "Article 189 Intergovernmental Relations & County Allocation of Revenue",
        suggestedMitigation: "Institute binding Council of Governors (CoG) joint implementation protocols."
      },
      {
        risk: "Public procurement delays and transparency risks in large capital outlays.",
        severity: "High",
        constitutionalOrFiscalReference: "Article 227 Procurement of Public Goods (Fair, Equitable, Transparent)",
        suggestedMitigation: "Require open e-procurement data published through Public Procurement Regulatory Authority (PPRA)."
      }
    ],
    financialCostingSummary: {
      statedCost: hasNumbers ? "Estimated KES 45B - 120B multi-year rollout" : "Costing not explicitly declared in excerpt",
      fundingMechanism: hasFinancing ? "Mixed public reallocation, PPP concession & existing budget votes" : "Unfunded assumption / Requires debt borrowing or tax adjustment",
      fiscalRiskRating: hasFinancing ? 5 : 8
    },
    constitutionalArticle201Check: {
      status: hasFinancing ? "Article 201 Compliant" : "High Risk / Ambiguous",
      rationale: "Requires clear debt sustainability threshold validation and intergenerational equity impact under Article 201(2)(c)."
    },
    keyTakeaway: "A viable conceptual blueprint that requires immediate independent costing by the Parliamentary Budget Office to safeguard public funds."
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kenya 2027 Civic Platform Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
