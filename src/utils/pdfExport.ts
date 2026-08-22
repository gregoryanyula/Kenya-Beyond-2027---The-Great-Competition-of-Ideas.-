import { jsPDF } from "jspdf";
import { EvaluationResult, ManifestoDistillationResult, WeightedCriteriaSettings } from "../types";

export interface PolicyPdfExportData {
  proposalTitle: string;
  domain: string;
  actorType: string;
  evaluationResult: EvaluationResult;
  distillationResult?: ManifestoDistillationResult | null;
  weightedScore?: number;
  weightedSettings?: WeightedCriteriaSettings;
  reportTitle?: string;
  authorName?: string;
  analysisDate?: string;
}

export function exportPolicyAuditToPdf(data: PolicyPdfExportData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Helper to add new page if needed
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = 18;
      // Header on subsequent pages
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text("KENYA 2027 — CIVIC POLICY AUDIT REPORT", margin, y - 6);
      doc.text(`Page ${doc.getNumberOfPages()}`, pageWidth - margin, y - 6, { align: "right" });
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y - 4, pageWidth - margin, y - 4);
    }
  };

  // 1. BRAND HEADER
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(margin, y, contentWidth, 26, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  const displayTitle = data.reportTitle || "KENYA 2027: THE GREAT COMPETITION OF IDEAS";
  const truncatedTitle = displayTitle.length > 55 ? displayTitle.slice(0, 52) + "..." : displayTitle;
  doc.text(truncatedTitle, margin + 6, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(167, 243, 208); // Emerald-200
  doc.text("Official Non-Partisan Policy Audit & Article 201 Fiscal Scrutiny Report", margin + 6, y + 14);
  doc.text("Usitupatie slogan. Tupatie plan.", margin + 6, y + 19);

  // Date on right
  const formattedDate = data.analysisDate 
    ? data.analysisDate 
    : new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
  doc.setFontSize(8);
  doc.setTextColor(220, 220, 220);
  doc.text(`Audit Date: ${formattedDate}`, pageWidth - margin - 6, y + 9, { align: "right" });

  if (data.authorName) {
    doc.setFontSize(7.5);
    doc.setTextColor(190, 200, 215);
    doc.text(`Analyst: ${data.authorName}`, pageWidth - margin - 6, y + 15, { align: "right" });
  }

  y += 32;

  // 2. AUDIT TARGET DETAILS
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`Domain: ${data.domain}`, margin + 5, y + 6);
  doc.text(`Candidate / Bloc: ${data.actorType}`, margin + 5, y + 12);
  if (data.authorName) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Prepared By: ${data.authorName} (${formattedDate})`, margin + 5, y + 17);
  }

  if (data.weightedScore) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(5, 150, 105);
    doc.text(`Weighted Rigor: ${data.weightedScore}/100`, pageWidth - margin - 5, y + 10, { align: "right" });
  }

  y += 28;

  // 3. EXECUTIVE SUMMARY
  checkPageBreak(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("1. EXECUTIVE AUDIT SUMMARY", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitSummary = doc.splitTextToSize(data.evaluationResult.summary, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2 + 6;

  // 4. SCORECARD SCORES GRID
  checkPageBreak(32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("2. 5-DIMENSIONAL RIGOR VERDICT (OUT OF 10)", margin, y);
  y += 5;

  const scores = data.evaluationResult.verdict_score;
  const scoreItems = [
    { label: "Clarity", val: scores.clarity_score },
    { label: "Fiscal Realism", val: scores.fiscal_realism_score },
    { label: "Constitutional", val: scores.constitutional_viability_score },
    { label: "Implementation", val: scores.implementation_readiness_score },
    { label: "Kenya 2060", val: scores.kenya_2060_alignment_score }
  ];

  const colWidth = contentWidth / 5;
  scoreItems.forEach((item, i) => {
    const boxX = margin + i * colWidth;
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(boxX + 1, y, colWidth - 2, 16, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, boxX + colWidth / 2, y + 5, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(item.val >= 7 ? 5 : item.val >= 5 ? 217 : 225, item.val >= 7 ? 150 : item.val >= 5 ? 119 : 29, item.val >= 7 ? 105 : item.val >= 5 ? 6 : 72);
    doc.text(`${item.val}/10`, boxX + colWidth / 2, y + 12, { align: "center" });
  });

  y += 22;

  // 5. DISTILLED KEY IMPACTS & FEASIBILITY RISKS (If present)
  if (data.distillationResult) {
    checkPageBreak(50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("3. DISTILLED KEY IMPACTS & FEASIBILITY RISKS", margin, y);
    y += 5;

    // Key Impacts
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(5, 150, 105);
    doc.text("• Key Socio-Economic Impacts:", margin, y);
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    data.distillationResult.keyImpacts.slice(0, 3).forEach((ki) => {
      const line = `  - ${ki.impact} (Beneficiaries: ${ki.targetBeneficiaries} | Timeframe: ${ki.timeframe})`;
      const splitLine = doc.splitTextToSize(line, contentWidth);
      checkPageBreak(splitLine.length * 4);
      doc.text(splitLine, margin, y);
      y += splitLine.length * 3.8;
    });

    y += 3;

    // Feasibility Risks
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(225, 29, 72);
    doc.text("• Critical Feasibility & Article 201 Risks:", margin, y);
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    data.distillationResult.feasibilityRisks.slice(0, 3).forEach((fr) => {
      const line = `  - [${fr.severity}] ${fr.risk} (Ref: ${fr.constitutionalOrFiscalReference})`;
      const splitLine = doc.splitTextToSize(line, contentWidth);
      checkPageBreak(splitLine.length * 4);
      doc.text(splitLine, margin, y);
      y += splitLine.length * 3.8;
    });

    y += 5;
  }

  // 6. 13-POINT SCRUTINY SUMMARY
  checkPageBreak(55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("4. 13-POINT POLICY TEST AUDIT BREAKDOWN", margin, y);
  y += 5;

  data.evaluationResult.the_13_point_audit.forEach((pt) => {
    checkPageBreak(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${pt.point}:`, margin, y);

    // Status Badge
    doc.setFont("helvetica", "bold");
    if (pt.status === "Clear") {
      doc.setTextColor(5, 150, 105);
    } else if (pt.status === "Partially Addressed") {
      doc.setTextColor(217, 119, 6);
    } else {
      doc.setTextColor(225, 29, 72);
    }
    doc.text(`[${pt.status}]`, pageWidth - margin, y, { align: "right" });

    y += 3.8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitAnalysis = doc.splitTextToSize(pt.analysis, contentWidth - 4);
    doc.text(splitAnalysis, margin + 4, y);
    y += splitAnalysis.length * 3.4 + 2;
  });

  // 7. CITIZEN CROSS-EXAMINATION QUESTIONS
  checkPageBreak(40);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("5. CITIZEN TOWN HALL CROSS-EXAMINATION QUESTIONS", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  data.evaluationResult.citizen_cross_examination_questions.forEach((q, idx) => {
    const qText = `${idx + 1}. "${q}"`;
    const splitQ = doc.splitTextToSize(qText, contentWidth);
    checkPageBreak(splitQ.length * 4);
    doc.text(splitQ, margin, y);
    y += splitQ.length * 3.8 + 1.5;
  });

  // 8. FOOTER NOTE
  checkPageBreak(20);
  y += 6;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Report generated automatically by Kenya 2027 Non-Partisan Civic Evaluation Platform. Grounded in Constitution of Kenya (Article 201), PFM Act 2012, and Kenya Vision 2030 / 2060.",
    margin,
    y
  );

  // Download PDF
  const filename = `Kenya2027_PolicyAudit_${data.domain.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
  doc.save(filename);
}
