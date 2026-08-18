import React, { useState } from "react";
import { 
  FileText, 
  CheckSquare, 
  Square, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  HelpCircle,
  Sparkles,
  Loader2,
  Share2,
  Calendar,
  Layers
} from "lucide-react";
import { jsPDF } from "jspdf";
import { CANDIDATE_TOWNHALL_QUESTIONNAIRE } from "../data/mediaStandardsData";
import { CANDIDATE_EVALUATION_CRITERIA } from "../data/accountabilityData";
import { PoliticalDebateCalendar } from "./PoliticalDebateCalendar";

export const CandidateQuestionnaireBuilder: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"calendar" | "questionnaire">("calendar");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>(
    CANDIDATE_TOWNHALL_QUESTIONNAIRE.map((_, idx) => idx)
  );
  const [copied, setCopied] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const toggleQuestion = (index: number) => {
    if (selectedQuestions.includes(index)) {
      setSelectedQuestions(selectedQuestions.filter((i) => i !== index));
    } else {
      setSelectedQuestions([...selectedQuestions, index]);
    }
  };

  const handleCopy = () => {
    const text = `KENYA 2027 CANDIDATE DEBATE & TOWN HALL QUESTIONNAIRE
Theme: "The Great Competition of Ideas — One Country. Many Ideas. One Destination: Kenya."
Message: "Usitupatie slogan. Tupatie plan."

QUESTIONS FOR THE CANDIDATE:
${selectedQuestions
  .map(
    (idx, i) =>
      `${i + 1}. [${CANDIDATE_TOWNHALL_QUESTIONNAIRE[idx].sector}]\n   ${
        CANDIDATE_TOWNHALL_QUESTIONNAIRE[idx].question
      }`
  )
  .join("\n\n")}

${customQuestion ? `\nADDITIONAL CITIZEN QUESTION:\n• ${customQuestion}\n` : ""}
EVALUATION BENCHMARK:
1. Did the candidate provide specific numbers, costs, and funding mechanisms?
2. Is the proposal compliant with Article 201 of the Constitution?
3. What is the single measurable outcome promised in the first 100 days?
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportPDF = () => {
    setIsExportingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 18;

      // Header Banner Background
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(margin, y - 5, contentWidth, 24, "F");

      // Title & Subtitle
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("KENYA 2027: THE GREAT COMPETITION OF IDEAS", margin + 5, y + 2);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(203, 213, 225); // slate-300
      doc.text("Candidate Cross-Examination & Policy Town Hall Dossier", margin + 5, y + 8);
      doc.text("Motto: 'Usitupatie slogan. Tupatie plan.' | Non-Partisan Civic Initiative", margin + 5, y + 13);

      y += 26;

      // Metadata Box
      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.rect(margin, y, contentWidth, 12, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85); // slate-700
      doc.text(`Generated: ${new Date().toLocaleDateString("en-GB")}`, margin + 4, y + 5);
      doc.text(`Selected Questions: ${selectedQuestions.length}`, margin + 55, y + 5);
      doc.text("Standard: Article 201 & Kenya 2060 Plan", margin + 110, y + 5);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Instructions for Citizen / Moderator: Ask for specific costings, revenue sources, and first 100-day milestones.", margin + 4, y + 9.5);

      y += 18;

      // Questions Loop
      selectedQuestions.forEach((qIdx, order) => {
        const item = CANDIDATE_TOWNHALL_QUESTIONNAIRE[qIdx];
        
        // Page break check
        if (y > pageHeight - 35) {
          doc.addPage();
          y = 18;
        }

        // Question Container Box
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(203, 213, 225);
        
        const qText = `${order + 1}. [${item.sector.toUpperCase()}] ${item.question}`;
        const splitText = doc.splitTextToSize(qText, contentWidth - 8);
        const boxHeight = splitText.length * 4.5 + 10;

        doc.rect(margin, y, contentWidth, boxHeight, "S");

        // Sector Badge Accent Bar
        doc.setFillColor(6, 78, 59); // deep emerald
        doc.rect(margin, y, 3, boxHeight, "F");

        // Text rendering
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(splitText, margin + 6, y + 5.5);

        // Verification Checklist Box at bottom of item
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(71, 85, 105);
        const checklistY = y + boxHeight - 3.5;
        doc.text("[ ] Cost Provided (KES)    [ ] Funding Source Named    [ ] Art. 201 Compliant    [ ] 100-Day Target Stated", margin + 6, checklistY);

        y += boxHeight + 3.5;
      });

      // Custom Question if available
      if (customQuestion.trim()) {
        if (y > pageHeight - 35) {
          doc.addPage();
          y = 18;
        }

        doc.setFillColor(240, 253, 244); // emerald-50
        doc.setDrawColor(187, 247, 208);
        const customText = `[CUSTOM CITIZEN / WARD QUESTION] ${customQuestion}`;
        const splitCustom = doc.splitTextToSize(customText, contentWidth - 8);
        const boxHeight = splitCustom.length * 4.5 + 10;

        doc.rect(margin, y, contentWidth, boxHeight, "FD");
        doc.setFillColor(16, 185, 129);
        doc.rect(margin, y, 3, boxHeight, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(6, 78, 59);
        doc.text(splitCustom, margin + 6, y + 5.5);

        y += boxHeight + 4;
      }

      // Evaluation Rubric Section
      if (y > pageHeight - 40) {
        doc.addPage();
        y = 18;
      }

      doc.setFillColor(241, 245, 249); // slate-100
      doc.setDrawColor(203, 213, 225);
      doc.rect(margin, y, contentWidth, 22, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text("CITIZEN EVALUATION BENCHMARK SCORE (0 - 10):", margin + 4, y + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.2);
      doc.setTextColor(51, 65, 85);
      doc.text("1. Clarity & Realism: Did the candidate avoid evasive slogans and cite credible economic data?", margin + 4, y + 9.5);
      doc.text("2. Fiscal Anchor: Is the plan funded without unconstitutional debt or hidden tax traps?", margin + 4, y + 13.5);
      doc.text("3. Kenya 2060 Impact: Does this policy strengthen national unity and productive industrial capacity?", margin + 4, y + 17.5);

      // Save PDF file
      doc.save(`Kenya_2027_Candidate_Questionnaire_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF Export error:", error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-8" id="questionnaire-builder-section">
      {/* Sub-navigation Switcher between Debate Calendar and Questionnaire Builder */}
      <div className="flex items-center justify-between p-2 bg-slate-900 text-white rounded-2xl shadow-xs border border-slate-800 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveSubTab("calendar")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === "calendar"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>2027 Political Debate Calendar</span>
          </button>
          <button
            onClick={() => setActiveSubTab("questionnaire")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === "questionnaire"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Candidate Questionnaire Dossier Builder</span>
          </button>
        </div>

        <span className="text-[11px] text-emerald-400 font-mono pr-2 hidden sm:inline">
          Article 201 Accountability Standard
        </span>
      </div>

      {activeSubTab === "calendar" ? (
        <PoliticalDebateCalendar />
      ) : (
        <>
          {/* Header */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 mb-3">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Citizen & Media Town Hall Tool</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                The 2027 Candidate Cross-Examination Toolkit
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Equip your community, student union, church, local radio station, podcast, or town hall with sharp, non-partisan policy questions. Generate, export, and download customized PDF question packs for presidential, gubernatorial, and parliamentary candidates.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-bold font-mono">
                {selectedQuestions.length} / {CANDIDATE_TOWNHALL_QUESTIONNAIRE.length} Core Questions Selected
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    setSelectedQuestions(
                      selectedQuestions.length === CANDIDATE_TOWNHALL_QUESTIONNAIRE.length
                        ? []
                        : CANDIDATE_TOWNHALL_QUESTIONNAIRE.map((_, i) => i)
                    )
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {selectedQuestions.length === CANDIDATE_TOWNHALL_QUESTIONNAIRE.length ? "Deselect All" : "Select All"}
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={isExportingPdf || selectedQuestions.length === 0}
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-emerald-700 transition-colors shadow-xs disabled:opacity-50"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>{isExportingPdf ? "Generating PDF..." : "Export PDF Dossier"}</span>
                </button>
              </div>
            </div>
          </div>

      {/* Selectable Questions List */}
      <div className="space-y-3">
        {CANDIDATE_TOWNHALL_QUESTIONNAIRE.map((item, idx) => {
          const isSelected = selectedQuestions.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => toggleQuestion(idx)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                isSelected
                  ? "bg-white border-slate-300 shadow-xs"
                  : "bg-slate-50/70 border-slate-200 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="mt-0.5 text-slate-900">
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                  {item.sector}
                </span>
                <p className="text-xs text-slate-900 font-medium leading-relaxed">
                  {item.question}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Question Box */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
          Add Your Local Ward or Sector Question:
        </h4>
        <input
          type="text"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          placeholder="E.g., What is your specific plan to resolve water rationing in our sub-county within your first year?"
          className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white"
        />
      </div>

      {/* Candidate Institutional Capacity Evaluation Scorecard Guide */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
            Institutional Scrutiny Standard
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Evaluating Political Parties: Institutions of Ideas vs Vehicles for Personalities
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Judge candidates and political parties on whether they have demonstrated genuine sectoral expertise and shadow policy teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANDIDATE_EVALUATION_CRITERIA.map((crit, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{crit.category}</h4>
                <span className="text-[10px] font-bold font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                  Weight: {crit.weight}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {crit.description}
              </p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-800 italic">
                “{crit.benchmarkQuestions[0]}”
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}
    </div>
  );
};
