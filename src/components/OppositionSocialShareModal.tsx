import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Download, 
  Copy, 
  Share2, 
  Check, 
  Instagram, 
  Twitter, 
  Send, 
  MessageCircle, 
  ShieldCheck, 
  Scale, 
  Smartphone,
  RefreshCw,
  Layers
} from "lucide-react";
import { PARTY_MANIFESTO_COMPARISONS } from "../data/accountabilityData";
import { PartyManifestoDomainComparison } from "../types";

interface OppositionSocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomainId?: string;
}

type AspectRatio = "square" | "landscape" | "story";
type ThemeStyle = "midnight" | "heritage" | "editorial";

export const OppositionSocialShareModal: React.FC<OppositionSocialShareModalProps> = ({
  isOpen,
  onClose,
  initialDomainId
}) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(
    initialDomainId || PARTY_MANIFESTO_COMPARISONS[0].domainId
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("landscape");
  const [theme, setTheme] = useState<ThemeStyle>("midnight");
  const [includeFirst100Days, setIncludeFirst100Days] = useState<boolean>(true);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedDomain = 
    PARTY_MANIFESTO_COMPARISONS.find((d) => d.domainId === selectedDomainId) ||
    PARTY_MANIFESTO_COMPARISONS[0];

  useEffect(() => {
    if (initialDomainId) {
      setSelectedDomainId(initialDomainId);
    }
  }, [initialDomainId]);

  useEffect(() => {
    if (!isOpen || !selectedDomain) return;
    renderCanvas();
  }, [isOpen, selectedDomainId, aspectRatio, theme, includeFirst100Days]);

  const getDimensions = () => {
    switch (aspectRatio) {
      case "landscape": // 16:9 1200x675
        return { width: 1200, height: 675 };
      case "story": // 9:16 1080x1920
        return { width: 1080, height: 1920 };
      case "square": // 1:1 1080x1080
      default:
        return { width: 1080, height: 1080 };
    }
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = getDimensions();
    canvas.width = width;
    canvas.height = height;

    const isLight = theme === "editorial";
    const primaryTextColor = isLight ? "#0f172a" : "#ffffff";
    const secondaryTextColor = isLight ? "#475569" : "#94a3b8";

    // 1. Background Fill
    if (theme === "midnight") {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#090d16");
      grad.addColorStop(0.5, "#0f172a");
      grad.addColorStop(1, "#020617");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Accent Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 50; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 50; j < height; j += 50) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }
    } else if (theme === "heritage") {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#0a0a0a");
      grad.addColorStop(0.4, "#062314");
      grad.addColorStop(0.8, "#280709");
      grad.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold Top Line
      ctx.fillStyle = "#eab308";
      ctx.fillRect(0, 0, width, 10);
    } else {
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, width - 14, height - 14);
      ctx.fillStyle = "#059669";
      ctx.fillRect(0, 0, width, 10);
    }

    // Helper text wrapper
    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 6): number => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;
      let lineCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + " ";
          currentY += lineHeight;
          lineCount++;
          if (lineCount >= maxLines - 1 && n < words.length - 1) {
            line += "...";
            break;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
      return currentY + lineHeight;
    };

    // Helper rounded rect
    const fillRoundedRect = (x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    const padding = aspectRatio === "story" ? 60 : (aspectRatio === "landscape" ? 50 : 55);

    // ==========================================
    // 1. BRAND HEADER
    // ==========================================
    let currentY = padding + 15;

    // Header Badge
    fillRoundedRect(
      padding, 
      currentY, 
      490, 
      34, 
      8, 
      isLight ? "rgba(37, 99, 235, 0.12)" : "rgba(59, 130, 246, 0.2)",
      isLight ? "#2563eb" : "#3b82f6"
    );
    ctx.fillStyle = isLight ? "#1d4ed8" : "#60a5fa";
    ctx.font = "900 13px system-ui, -apple-system, sans-serif";
    ctx.fillText("KENYA 2027 • 4-WAY MANIFESTO COMPARISON MATRIX", padding + 16, currentY + 22);

    ctx.textAlign = "right";
    ctx.fillStyle = secondaryTextColor;
    ctx.font = "700 13px system-ui, sans-serif";
    ctx.fillText("Article 201 Public Finance Test", width - padding, currentY + 22);
    ctx.textAlign = "left";

    currentY += 54;

    // Main Domain Title
    ctx.fillStyle = primaryTextColor;
    ctx.font = aspectRatio === "landscape" ? "900 28px system-ui, sans-serif" : "900 32px system-ui, sans-serif";
    ctx.fillText(selectedDomain.domainName.toUpperCase(), padding, currentY);

    currentY += 28;

    // Problem Statement Strip
    fillRoundedRect(
      padding, 
      currentY, 
      width - (padding * 2), 
      44, 
      8, 
      isLight ? "#f1f5f9" : "#1e293b",
      isLight ? "#cbd5e1" : "#334155"
    );
    ctx.fillStyle = isLight ? "#475569" : "#94a3b8";
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.fillText(`Core Issue: ${selectedDomain.keyProblemStatement.slice(0, 110)}...`, padding + 16, currentY + 27);

    currentY += 60;

    // ==========================================
    // 2. 4-BLOC COMPARATIVE GRID / STACK
    // ==========================================
    const blocColors: Record<string, { bg: string; border: string; badge: string; title: string }> = {
      incumbent: { bg: isLight ? "#fffbeb" : "#1f1807", border: "#d97706", badge: "#b45309", title: "Incumbent Strategy" },
      "main-opposition": { bg: isLight ? "#eff6ff" : "#081b3a", border: "#2563eb", badge: "#1d4ed8", title: "Main Opposition" },
      "third-pole": { bg: isLight ? "#ecfdf5" : "#052319", border: "#059669", badge: "#047857", title: "Third-Pole Reform" },
      "civil-society": { bg: isLight ? "#f5f3ff" : "#1b0d33", border: "#7c3aed", badge: "#6d28d9", title: "Civil Society Blueprint" }
    };

    if (aspectRatio === "landscape") {
      // 4 Horizontal Columns Side-by-Side
      const availableW = width - (padding * 2);
      const colW = (availableW - 36) / 4;
      const colH = 370;

      selectedDomain.proposals.forEach((prop, idx) => {
        const xPos = padding + idx * (colW + 12);
        const style = blocColors[prop.blocId] || blocColors.incumbent;

        fillRoundedRect(xPos, currentY, colW, colH, 10, style.bg, style.border);

        // Header Pill
        fillRoundedRect(xPos + 12, currentY + 12, colW - 24, 26, 6, style.border);
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(style.title.toUpperCase(), xPos + (colW / 2), currentY + 29);
        ctx.textAlign = "left";

        // Rigor Score Tag
        ctx.fillStyle = primaryTextColor;
        ctx.font = "900 13px system-ui, sans-serif";
        wrapText(prop.coreProposalTitle, xPos + 12, currentY + 60, colW - 24, 18, 2);

        // Mechanism
        ctx.fillStyle = isLight ? "#334155" : "#cbd5e1";
        ctx.font = "500 11px system-ui, sans-serif";
        wrapText(prop.mechanism, xPos + 12, currentY + 105, colW - 24, 16, 4);

        // Cost & Financing Box
        fillRoundedRect(xPos + 8, currentY + 185, colW - 16, 85, 6, isLight ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.3)");
        ctx.fillStyle = isLight ? "#0f172a" : "#38bdf8";
        ctx.font = "800 10px system-ui, sans-serif";
        ctx.fillText("💰 COST & FUNDING:", xPos + 14, currentY + 202);
        ctx.fillStyle = isLight ? "#334155" : "#e2e8f0";
        ctx.font = "500 10px system-ui, sans-serif";
        wrapText(`${prop.costEstimate} via ${prop.financingSource}`, xPos + 14, currentY + 218, colW - 28, 14, 3);

        // Rigor Badge at bottom
        fillRoundedRect(xPos + 12, currentY + 325, colW - 24, 30, 6, isLight ? "#0f172a" : "#020617");
        ctx.fillStyle = "#34d399";
        ctx.font = "900 11px font-mono, monospace, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`Rigor: ${prop.rigorScore}/10`, xPos + (colW / 2), currentY + 344);
        ctx.textAlign = "left";
      });

    } else if (aspectRatio === "story") {
      // Vertical Stack for 9:16 Story
      const cardW = width - (padding * 2);
      const cardH = 340;

      selectedDomain.proposals.forEach((prop, idx) => {
        const yPos = currentY + idx * (cardH + 16);
        const style = blocColors[prop.blocId] || blocColors.incumbent;

        fillRoundedRect(padding, yPos, cardW, cardH, 12, style.bg, style.border);

        // Header Title
        ctx.fillStyle = isLight ? style.badge : "#ffffff";
        ctx.font = "900 16px system-ui, sans-serif";
        ctx.fillText(`[${style.title.toUpperCase()}] ${prop.coreProposalTitle}`, padding + 20, yPos + 32);

        // Mechanism
        ctx.fillStyle = isLight ? "#1e293b" : "#e2e8f0";
        ctx.font = "500 14px system-ui, sans-serif";
        wrapText(prop.mechanism, padding + 20, yPos + 65, cardW - 40, 22, 4);

        // Cost & Financing
        ctx.fillStyle = isLight ? "#b45309" : "#fbbf24";
        ctx.font = "800 13px system-ui, sans-serif";
        ctx.fillText("💰 LINE-ITEM COST & FINANCING:", padding + 20, yPos + 175);
        ctx.fillStyle = isLight ? "#1e293b" : "#cbd5e1";
        ctx.font = "500 13px system-ui, sans-serif";
        wrapText(`${prop.costEstimate} — Financed by ${prop.financingSource}`, padding + 20, yPos + 198, cardW - 40, 20, 3);

        // Rigor & First 100 Days Row
        fillRoundedRect(padding + 16, yPos + 270, cardW - 32, 48, 8, isLight ? "#0f172a" : "#020617");
        ctx.fillStyle = "#34d399";
        ctx.font = "900 13px font-mono, monospace, sans-serif";
        ctx.fillText(`Rigor Score: ${prop.rigorScore}/10 (${prop.rigorBadge})`, padding + 30, yPos + 300);

        ctx.textAlign = "right";
        ctx.fillStyle = "#94a3b8";
        ctx.font = "700 11px system-ui, sans-serif";
        ctx.fillText(prop.coalitionOrParty, padding + cardW - 30, yPos + 300);
        ctx.textAlign = "left";
      });

    } else {
      // 1:1 Square: 2x2 Grid
      const availableW = width - (padding * 2);
      const gridW = (availableW - 20) / 2;
      const gridH = 340;

      selectedDomain.proposals.forEach((prop, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const xPos = padding + col * (gridW + 20);
        const yPos = currentY + row * (gridH + 18);
        const style = blocColors[prop.blocId] || blocColors.incumbent;

        fillRoundedRect(xPos, yPos, gridW, gridH, 12, style.bg, style.border);

        // Top Header
        fillRoundedRect(xPos + 14, yPos + 14, gridW - 28, 28, 6, style.border);
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 12px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(style.title.toUpperCase(), xPos + (gridW / 2), yPos + 32);
        ctx.textAlign = "left";

        // Proposal Title
        ctx.fillStyle = primaryTextColor;
        ctx.font = "800 14px system-ui, sans-serif";
        wrapText(prop.coreProposalTitle, xPos + 16, yPos + 68, gridW - 32, 19, 2);

        // Mechanism
        ctx.fillStyle = isLight ? "#334155" : "#cbd5e1";
        ctx.font = "500 12px system-ui, sans-serif";
        wrapText(prop.mechanism, xPos + 16, yPos + 115, gridW - 32, 17, 4);

        // Cost Box
        fillRoundedRect(xPos + 12, yPos + 205, gridW - 24, 70, 6, isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.35)");
        ctx.fillStyle = isLight ? "#0f172a" : "#38bdf8";
        ctx.font = "800 11px system-ui, sans-serif";
        ctx.fillText("💰 COST & FINANCING:", xPos + 20, yPos + 224);
        ctx.fillStyle = isLight ? "#334155" : "#e2e8f0";
        ctx.font = "500 11px system-ui, sans-serif";
        wrapText(`${prop.costEstimate} via ${prop.financingSource}`, xPos + 20, yPos + 242, gridW - 40, 15, 2);

        // Score Footer
        fillRoundedRect(xPos + 12, yPos + 290, gridW - 24, 34, 6, isLight ? "#0f172a" : "#020617");
        ctx.fillStyle = "#34d399";
        ctx.font = "900 12px font-mono, monospace, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`Policy Rigor: ${prop.rigorScore}/10`, xPos + (gridW / 2), yPos + 312);
        ctx.textAlign = "left";
      });
    }

    // ==========================================
    // 3. FOOTER
    // ==========================================
    const footerY = height - padding + 15;
    ctx.strokeStyle = isLight ? "#cbd5e1" : "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, footerY - 20);
    ctx.lineTo(width - padding, footerY - 20);
    ctx.stroke();

    ctx.fillStyle = secondaryTextColor;
    ctx.font = "600 12px system-ui, sans-serif";
    ctx.fillText("Kenya 2027 Civic Coalition • Grounded in Article 201 Public Finance Principles", padding, footerY);

    ctx.textAlign = "right";
    ctx.fillStyle = isLight ? "#059669" : "#34d399";
    ctx.font = "800 12px font-mono, monospace, sans-serif";
    ctx.fillText("4-WAY ALTERNATIVE MATRIX", width - padding, footerY);
    ctx.textAlign = "left";

    try {
      setDataUrl(canvas.toDataURL("image/png"));
    } catch (e) {
      console.error("Canvas export failed:", e);
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `Kenya2027_OppositionMatrix_${selectedDomain.domainId}_${aspectRatio}.png`;
    link.href = dataUrl;
    link.click();
    setCopiedStatus("downloaded");
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          setCopiedStatus("image-copied");
          setTimeout(() => setCopiedStatus(null), 2500);
        } else {
          handleCopyText();
        }
      });
    } catch (err) {
      handleCopyText();
    }
  };

  const getShareableText = () => {
    return `🇰🇪 KENYA 2027: 4-WAY POLICY MANIFESTO COMPARISON
Domain: ${selectedDomain.domainName}
Core Problem: ${selectedDomain.keyProblemStatement}

1. Incumbent: ${selectedDomain.proposals[0]?.coreProposalTitle} (Rigor: ${selectedDomain.proposals[0]?.rigorScore}/10)
2. Main Opposition: ${selectedDomain.proposals[1]?.coreProposalTitle} (Rigor: ${selectedDomain.proposals[1]?.rigorScore}/10)
3. Third-Pole: ${selectedDomain.proposals[2]?.coreProposalTitle} (Rigor: ${selectedDomain.proposals[2]?.rigorScore}/10)
4. Civil Society Blueprint: ${selectedDomain.proposals[3]?.coreProposalTitle} (Rigor: ${selectedDomain.proposals[3]?.rigorScore}/10)

Demand costed plans under Katiba Article 201! #Kenya2027 #SloganVsPlan #Article201`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getShareableText());
    setCopiedStatus("text-copied");
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareableText())}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const tweet = `🇰🇪 Kenya 2027 Manifesto Comparison: ${selectedDomain.domainName}\n\nComparing 4 policy models on cost, evidence & Katiba Article 201 compliance.\n\n#Kenya2027 #SloganVsPlan`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, "_blank");
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent("https://kenya2027.civic")}&text=${encodeURIComponent(getShareableText())}`;
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Manifesto Comparison Social Card Hub
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                  4-Bloc Model
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Generate high-resolution viral graphics comparing Incumbent vs Opposition vs Third-Pole vs Civil Society solutions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Domain Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Select Policy Domain to Compare:
              </label>
              <select
                value={selectedDomainId}
                onChange={(e) => setSelectedDomainId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 focus:ring-2 focus:ring-blue-500"
              >
                {PARTY_MANIFESTO_COMPARISONS.map((d) => (
                  <option key={d.domainId} value={d.domainId}>
                    {d.domainName}
                  </option>
                ))}
              </select>
            </div>

            {/* Format / Aspect Ratio */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Card Format & Aspect Ratio:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAspectRatio("landscape")}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                    aspectRatio === "landscape"
                      ? "bg-blue-600/20 border-blue-500 text-blue-300"
                      : "bg-slate-800/80 border-slate-700 text-slate-400"
                  }`}
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-[11px] font-bold">16:9 Wide</span>
                  <span className="text-[9px] opacity-70">Twitter/X</span>
                </button>

                <button
                  onClick={() => setAspectRatio("square")}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                    aspectRatio === "square"
                      ? "bg-blue-600/20 border-blue-500 text-blue-300"
                      : "bg-slate-800/80 border-slate-700 text-slate-400"
                  }`}
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-[11px] font-bold">1:1 Square</span>
                  <span className="text-[9px] opacity-70">Feed Post</span>
                </button>

                <button
                  onClick={() => setAspectRatio("story")}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                    aspectRatio === "story"
                      ? "bg-blue-600/20 border-blue-500 text-blue-300"
                      : "bg-slate-800/80 border-slate-700 text-slate-400"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px] font-bold">9:16 Story</span>
                  <span className="text-[9px] opacity-70">Status/Reel</span>
                </button>
              </div>
            </div>

            {/* Theme Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Visual Theme:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme("midnight")}
                  className={`p-2 rounded-xl border text-left text-xs ${
                    theme === "midnight" ? "border-blue-500 bg-slate-800 text-white" : "border-slate-700 bg-slate-800/50 text-slate-400"
                  }`}
                >
                  <div className="font-bold">Midnight</div>
                  <div className="text-[9px] text-slate-500">Dark Navy</div>
                </button>

                <button
                  onClick={() => setTheme("heritage")}
                  className={`p-2 rounded-xl border text-left text-xs ${
                    theme === "heritage" ? "border-amber-500 bg-slate-800 text-white" : "border-slate-700 bg-slate-800/50 text-slate-400"
                  }`}
                >
                  <div className="font-bold">Heritage</div>
                  <div className="text-[9px] text-slate-500">Kenya Flag</div>
                </button>

                <button
                  onClick={() => setTheme("editorial")}
                  className={`p-2 rounded-xl border text-left text-xs ${
                    theme === "editorial" ? "border-emerald-500 bg-slate-800 text-white" : "border-slate-700 bg-slate-800/50 text-slate-400"
                  }`}
                >
                  <div className="font-bold">Editorial</div>
                  <div className="text-[9px] text-slate-500">Ivory Light</div>
                </button>
              </div>
            </div>

            {/* One-Click Social Dispatch */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Social Dispatch:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleTwitterShare}
                  className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X / Tweet</span>
                </button>
                <button
                  onClick={handleTelegramShare}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Canvas Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex-1 flex items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800/80 shadow-inner overflow-hidden max-h-[460px]">
              <canvas ref={canvasRef} className="hidden" />

              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt="Generated Manifesto Matrix Card"
                  className="max-h-[420px] max-w-full rounded-xl shadow-2xl object-contain border border-slate-800"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-slate-500 py-12">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
                  <span className="text-xs">Rendering pixel-perfect manifesto graphic...</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                {copiedStatus === "downloaded" ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Saved PNG!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Image</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyImage}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-slate-700"
              >
                {copiedStatus === "image-copied" ? (
                  <>
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Image Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyText}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-slate-700"
              >
                {copiedStatus === "text-copied" ? (
                  <>
                    <Check className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Text Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
