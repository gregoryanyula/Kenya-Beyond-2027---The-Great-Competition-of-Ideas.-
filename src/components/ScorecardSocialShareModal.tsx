import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Download, 
  Copy, 
  Share2, 
  Check, 
  Sparkles, 
  Palette, 
  Maximize2, 
  Smartphone, 
  Monitor, 
  Instagram, 
  Twitter, 
  Send, 
  MessageCircle, 
  ShieldCheck, 
  Scale, 
  FileImage,
  RefreshCw
} from "lucide-react";
import { PolicyVsPromiseItem } from "../types";
import { POLICY_VS_PROMISES_SCORECARD_DATA } from "../data/accountabilityData";

interface ScorecardSocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: PolicyVsPromiseItem | null;
}

type AspectRatio = "square" | "landscape" | "story";
type ThemeStyle = "midnight" | "heritage" | "editorial";

export const ScorecardSocialShareModal: React.FC<ScorecardSocialShareModalProps> = ({
  isOpen,
  onClose,
  initialItem
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialItem?.id || POLICY_VS_PROMISES_SCORECARD_DATA[0].id
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("square");
  const [theme, setTheme] = useState<ThemeStyle>("midnight");
  const [includeVerdict, setIncludeVerdict] = useState<boolean>(true);
  const [includeMilestones, setIncludeMilestones] = useState<boolean>(true);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [dataUrl, setDataUrl] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedItem = 
    POLICY_VS_PROMISES_SCORECARD_DATA.find((i) => i.id === selectedItemId) ||
    initialItem ||
    POLICY_VS_PROMISES_SCORECARD_DATA[0];

  // Update selected item if initialItem changes
  useEffect(() => {
    if (initialItem) {
      setSelectedItemId(initialItem.id);
    }
  }, [initialItem]);

  // Render canvas whenever dependencies change
  useEffect(() => {
    if (!isOpen || !selectedItem) return;
    renderCanvas();
  }, [isOpen, selectedItemId, aspectRatio, theme, includeVerdict, includeMilestones]);

  const getCanvasDimensions = () => {
    switch (aspectRatio) {
      case "landscape": // Twitter / X 1200x675
        return { width: 1200, height: 675, previewClass: "aspect-[16/9]" };
      case "story": // Instagram / WhatsApp Status 1080x1920
        return { width: 1080, height: 1920, previewClass: "aspect-[9/16]" };
      case "square": // Instagram 1080x1080
      default:
        return { width: 1080, height: 1080, previewClass: "aspect-square" };
    }
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = getCanvasDimensions();
    canvas.width = width;
    canvas.height = height;

    // Background Styling
    if (theme === "midnight") {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#090d16");
      grad.addColorStop(0.5, "#0f172a");
      grad.addColorStop(1, "#020617");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Grid / Accent Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 60; i < width; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 60; j < height; j += 60) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Top Glow Accent
      const glow = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, width * 0.6);
      glow.addColorStop(0, "rgba(16, 185, 129, 0.25)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height * 0.4);

    } else if (theme === "heritage") {
      // Kenya Flag Tri-Color Elegant Dark Blend
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#0a0a0a");
      grad.addColorStop(0.4, "#062314"); // Forest Emerald
      grad.addColorStop(0.7, "#280709"); // Deep Crimson
      grad.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Kenyan Gold Top Line Accent
      ctx.fillStyle = "#eab308";
      ctx.fillRect(0, 0, width, 10);

    } else {
      // Editorial Light
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, width, height);

      // Border frame
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 16;
      ctx.strokeRect(8, 8, width - 16, height - 16);

      // Subtle warm accent at top
      ctx.fillStyle = "#059669";
      ctx.fillRect(0, 0, width, 12);
    }

    // Helper text wrapping function
    const wrapText = (
      text: string, 
      x: number, 
      y: number, 
      maxWidth: number, 
      lineHeight: number, 
      maxLines = 10
    ): number => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;
      let lineCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
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

    const isLight = theme === "editorial";
    const primaryTextColor = isLight ? "#0f172a" : "#ffffff";
    const secondaryTextColor = isLight ? "#475569" : "#94a3b8";
    const mutedTextColor = isLight ? "#64748b" : "#64748b";
    const cardBgColor = isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 23, 42, 0.75)";
    const cardBorderColor = isLight ? "rgba(203, 213, 225, 0.8)" : "rgba(51, 65, 85, 0.6)";

    const padding = aspectRatio === "story" ? 64 : (aspectRatio === "landscape" ? 50 : 60);

    // ==========================================
    // 1. BRAND HEADER
    // ==========================================
    let currentY = padding + 20;

    // Header badge
    fillRoundedRect(
      padding, 
      currentY, 
      460, 
      34, 
      8, 
      isLight ? "rgba(5, 150, 105, 0.12)" : "rgba(16, 185, 129, 0.18)",
      isLight ? "#10b981" : "#059669"
    );
    ctx.fillStyle = isLight ? "#047857" : "#34d399";
    ctx.font = "900 13px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("KENYA 2027 • GREAT COMPETITION OF IDEAS", padding + 16, currentY + 22);

    // Right-aligned hashtag
    ctx.textAlign = "right";
    ctx.fillStyle = secondaryTextColor;
    ctx.font = "700 13px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("#SloganVsPlan • Article 201 Katiba", width - padding, currentY + 22);
    ctx.textAlign = "left";

    currentY += 56;

    // Subtitle / Title
    ctx.fillStyle = primaryTextColor;
    ctx.font = aspectRatio === "landscape" 
      ? "900 26px system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      : "900 32px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("POLITICAL PROMISE VS. FACTUAL SCORECARD", padding, currentY);

    currentY += 28;

    // Sector Pill & Article 201 Badge Row
    const sectorWidth = ctx.measureText(selectedItem.sector.toUpperCase()).width + 36;
    fillRoundedRect(
      padding, 
      currentY, 
      sectorWidth, 
      32, 
      6, 
      isLight ? "#e2e8f0" : "#1e293b",
      isLight ? "#cbd5e1" : "#334155"
    );
    ctx.fillStyle = isLight ? "#0f172a" : "#f1f5f9";
    ctx.font = "800 13px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(selectedItem.sector.toUpperCase(), padding + 18, currentY + 21);

    // Compliance Badge
    const isCompliant = selectedItem.article201Compliance === "Compliant";
    const isBorderline = selectedItem.article201Compliance === "Borderline";
    const compColor = isCompliant ? "#10b981" : (isBorderline ? "#f59e0b" : "#f43f5e");
    const compBg = isCompliant 
      ? (isLight ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.25)")
      : (isBorderline 
        ? (isLight ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.25)")
        : (isLight ? "rgba(244, 63, 94, 0.15)" : "rgba(244, 63, 94, 0.25)"));

    fillRoundedRect(
      padding + sectorWidth + 12, 
      currentY, 
      260, 
      32, 
      6, 
      compBg,
      compColor
    );
    ctx.fillStyle = compColor;
    ctx.font = "800 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(`Art. 201: ${selectedItem.article201Compliance.toUpperCase()}`, padding + sectorWidth + 24, currentY + 21);

    // Score Pill (Right-aligned)
    const scoreBoxWidth = 140;
    fillRoundedRect(
      width - padding - scoreBoxWidth, 
      currentY - 10, 
      scoreBoxWidth, 
      46, 
      10, 
      isLight ? "#0f172a" : "#059669",
      isLight ? "#334155" : "#10b981"
    );
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 20px font-mono, monospace, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${selectedItem.scoreOutOfTen}/10`, width - padding - (scoreBoxWidth / 2), currentY + 21);
    ctx.font = "700 9px system-ui, sans-serif";
    ctx.fillText("POLICY RIGOR", width - padding - (scoreBoxWidth / 2), currentY + 32);
    ctx.textAlign = "left";

    currentY += 56;

    // ==========================================
    // 2. MAIN PROMISE SECTION (HERO CARD)
    // ==========================================
    const cardWidth = width - (padding * 2);
    const heroCardHeight = aspectRatio === "landscape" ? 110 : (aspectRatio === "story" ? 180 : 130);

    fillRoundedRect(
      padding, 
      currentY, 
      cardWidth, 
      heroCardHeight, 
      12, 
      isLight ? "rgba(241, 245, 249, 0.9)" : "rgba(30, 41, 59, 0.7)",
      isLight ? "#cbd5e1" : "#334155"
    );

    ctx.fillStyle = isLight ? "#64748b" : "#38bdf8";
    ctx.font = "900 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("📢 THE STATED CAMPAIGN PLEDGE / PROMISE:", padding + 20, currentY + 28);

    ctx.fillStyle = primaryTextColor;
    ctx.font = aspectRatio === "landscape"
      ? "700 16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      : "700 18px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    wrapText(
      `“${selectedItem.statedPromise}”`, 
      padding + 20, 
      currentY + 54, 
      cardWidth - 40, 
      24, 
      3
    );

    currentY += heroCardHeight + 20;

    // ==========================================
    // 3. COMPARATIVE AUDIT PILLARS (GRID OR STACK)
    // ==========================================
    if (aspectRatio === "landscape") {
      // Side-by-side columns in landscape
      const colWidth = (cardWidth - 20) / 2;
      const colHeight = 160;

      // Col 1: Documented Track Record
      fillRoundedRect(padding, currentY, colWidth, colHeight, 10, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#991b1b" : "#fb7185";
      ctx.font = "800 12px system-ui, sans-serif";
      ctx.fillText("🔍 DOCUMENTED RECORD / EVIDENCE:", padding + 16, currentY + 24);

      ctx.fillStyle = isLight ? "#1e293b" : "#cbd5e1";
      ctx.font = "500 13px system-ui, sans-serif";
      wrapText(selectedItem.historicalRecordOrEvidence, padding + 16, currentY + 48, colWidth - 32, 19, 5);

      // Col 2: Funding & Costing
      fillRoundedRect(padding + colWidth + 20, currentY, colWidth, colHeight, 10, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#b45309" : "#fbbf24";
      ctx.font = "800 12px system-ui, sans-serif";
      ctx.fillText("💰 LINE-ITEM COST & FUNDING:", padding + colWidth + 36, currentY + 24);

      ctx.fillStyle = isLight ? "#1e293b" : "#cbd5e1";
      ctx.font = "500 13px system-ui, sans-serif";
      wrapText(selectedItem.lineItemCostAndFunding, padding + colWidth + 36, currentY + 48, colWidth - 32, 19, 5);

      currentY += colHeight + 16;

    } else if (aspectRatio === "story") {
      // Tall Stack for 9:16 Story
      // 1. Evidence
      const p1H = 220;
      fillRoundedRect(padding, currentY, cardWidth, p1H, 12, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#991b1b" : "#fb7185";
      ctx.font = "900 14px system-ui, sans-serif";
      ctx.fillText("🔍 DOCUMENTED RECORD / REALITY CHECK:", padding + 20, currentY + 30);
      ctx.fillStyle = isLight ? "#1e293b" : "#e2e8f0";
      ctx.font = "500 16px system-ui, sans-serif";
      wrapText(selectedItem.historicalRecordOrEvidence, padding + 20, currentY + 60, cardWidth - 40, 24, 6);
      currentY += p1H + 20;

      // 2. Cost & Funding
      const p2H = 200;
      fillRoundedRect(padding, currentY, cardWidth, p2H, 12, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#b45309" : "#fbbf24";
      ctx.font = "900 14px system-ui, sans-serif";
      ctx.fillText("💰 BUDGET & FUNDING SUSTAINABILITY:", padding + 20, currentY + 30);
      ctx.fillStyle = isLight ? "#1e293b" : "#e2e8f0";
      ctx.font = "500 16px system-ui, sans-serif";
      wrapText(selectedItem.lineItemCostAndFunding, padding + 20, currentY + 60, cardWidth - 40, 24, 5);
      currentY += p2H + 20;

      // 3. First 100 Days
      if (includeMilestones) {
        const p3H = 200;
        fillRoundedRect(padding, currentY, cardWidth, p3H, 12, cardBgColor, cardBorderColor);
        ctx.fillStyle = isLight ? "#1e40af" : "#60a5fa";
        ctx.font = "900 14px system-ui, sans-serif";
        ctx.fillText("⏱️ FIRST 100 DAYS VERIFIABLE MILESTONE:", padding + 20, currentY + 30);
        ctx.fillStyle = isLight ? "#1e293b" : "#e2e8f0";
        ctx.font = "500 16px system-ui, sans-serif";
        wrapText(selectedItem.first100DayCommitment, padding + 20, currentY + 60, cardWidth - 40, 24, 5);
        currentY += p3H + 20;
      }

    } else {
      // Square 1:1 format
      const sectionH = 140;

      // 1. Evidence Card
      fillRoundedRect(padding, currentY, cardWidth, sectionH, 10, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#991b1b" : "#fb7185";
      ctx.font = "900 13px system-ui, sans-serif";
      ctx.fillText("🔍 DOCUMENTED RECORD / EVIDENCE:", padding + 18, currentY + 24);
      ctx.fillStyle = isLight ? "#1e293b" : "#cbd5e1";
      ctx.font = "500 14px system-ui, sans-serif";
      wrapText(selectedItem.historicalRecordOrEvidence, padding + 18, currentY + 48, cardWidth - 36, 21, 4);
      currentY += sectionH + 16;

      // 2. Cost & 100 Days Split Box
      const splitW = (cardWidth - 16) / 2;
      const splitH = 130;

      fillRoundedRect(padding, currentY, splitW, splitH, 10, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#b45309" : "#fbbf24";
      ctx.font = "900 12px system-ui, sans-serif";
      ctx.fillText("💰 FUNDING MECHANISM:", padding + 16, currentY + 24);
      ctx.fillStyle = isLight ? "#1e293b" : "#cbd5e1";
      ctx.font = "500 13px system-ui, sans-serif";
      wrapText(selectedItem.lineItemCostAndFunding, padding + 16, currentY + 46, splitW - 32, 19, 4);

      fillRoundedRect(padding + splitW + 16, currentY, splitW, splitH, 10, cardBgColor, cardBorderColor);
      ctx.fillStyle = isLight ? "#1e40af" : "#60a5fa";
      ctx.font = "900 12px system-ui, sans-serif";
      ctx.fillText("⏱️ FIRST 100 DAYS GOAL:", padding + splitW + 32, currentY + 24);
      ctx.fillStyle = isLight ? "#1e293b" : "#cbd5e1";
      ctx.font = "500 13px system-ui, sans-serif";
      wrapText(selectedItem.first100DayCommitment, padding + splitW + 32, currentY + 46, splitW - 32, 19, 4);

      currentY += splitH + 16;
    }

    // ==========================================
    // 4. CITIZEN SCRUTINY VERDICT (HERO BOTTOM BANNER)
    // ==========================================
    if (includeVerdict) {
      const verdictH = aspectRatio === "landscape" ? 80 : (aspectRatio === "story" ? 190 : 110);
      fillRoundedRect(
        padding, 
        currentY, 
        cardWidth, 
        verdictH, 
        10, 
        isLight ? "#0f172a" : "#020617",
        isLight ? "#047857" : "#059669"
      );

      ctx.fillStyle = "#34d399";
      ctx.font = "900 12px system-ui, sans-serif";
      ctx.fillText("⚖️ CITIZEN AUDIT VERDICT:", padding + 18, currentY + 24);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "600 14px system-ui, sans-serif";
      wrapText(
        selectedItem.citizenVerdict, 
        padding + 18, 
        currentY + 46, 
        cardWidth - 36, 
        20, 
        aspectRatio === "story" ? 6 : 3
      );
    }

    // ==========================================
    // 5. FOOTER & VERIFICATION WATERMARK
    // ==========================================
    const footerY = height - padding + 10;
    ctx.strokeStyle = isLight ? "#cbd5e1" : "#334155";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, footerY - 20);
    ctx.lineTo(width - padding, footerY - 20);
    ctx.stroke();

    ctx.fillStyle = mutedTextColor;
    ctx.font = "600 12px system-ui, sans-serif";
    ctx.fillText("Kenya 2027 Civic Coalition • Grounded in Katiba Article 201 Public Finance Principles", padding, footerY);

    ctx.textAlign = "right";
    ctx.fillStyle = isLight ? "#059669" : "#34d399";
    ctx.font = "800 12px font-mono, monospace, sans-serif";
    ctx.fillText("VERIFIED AUDIT CARD", width - padding, footerY);
    ctx.textAlign = "left";

    // Set Data URL for sharing/download
    try {
      const url = canvas.toDataURL("image/png");
      setDataUrl(url);
    } catch (e) {
      console.error("Canvas export error:", e);
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `Kenya2027_Scorecard_${selectedItem.sector.replace(/\s+/g, "_")}_${aspectRatio}.png`;
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
          // Fallback to copying formatted text
          handleCopyText();
        }
      });
    } catch (err) {
      console.warn("Clipboard write failed, copying text summary:", err);
      handleCopyText();
    }
  };

  const getShareableText = () => {
    return `🇰🇪 KENYA 2027 POLICY VS. PROMISES SCORECARD
Sector: ${selectedItem.sector}
Stated Promise: "${selectedItem.statedPromise}"
🔍 Track Record / Reality: ${selectedItem.historicalRecordOrEvidence}
💰 Cost & Funding: ${selectedItem.lineItemCostAndFunding}
⏱️ First 100 Days: ${selectedItem.first100DayCommitment}
📊 Rigor Score: ${selectedItem.scoreOutOfTen}/10
⚖️ Article 201 Compliance: ${selectedItem.article201Compliance}
📢 Verdict: ${selectedItem.citizenVerdict}

#Kenya2027 #SloganVsPlan #Article201 #KatibaAccountability`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getShareableText());
    setCopiedStatus("text-copied");
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], "scorecard.png", { type: "image/png" })] })) {
            const file = new File([blob], `Scorecard_${selectedItem.sector}.png`, { type: "image/png" });
            await navigator.share({
              title: `Kenya 2027 Policy Scorecard: ${selectedItem.sector}`,
              text: getShareableText(),
              files: [file]
            });
          } else {
            await navigator.share({
              title: `Kenya 2027 Policy Scorecard: ${selectedItem.sector}`,
              text: getShareableText()
            });
          }
        });
      } catch (e) {
        console.warn("Share cancelled or failed:", e);
      }
    } else {
      handleCopyText();
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareableText())}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const tweetText = `🇰🇪 Kenya 2027 Policy vs Promises: ${selectedItem.sector}\nPromise: "${selectedItem.statedPromise.slice(0, 80)}..."\nRigor: ${selectedItem.scoreOutOfTen}/10 (${selectedItem.article201Compliance})\n\nDemand real policy plans under Art. 201.\n#Kenya2027 #SloganVsPlan`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
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
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Social Media Image Generator & Sharing Hub
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Article 201 Format
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Generate high-resolution viral accountability graphics for WhatsApp Status, X (Twitter), Instagram & Community groups.
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

        {/* Modal Body: Controls & Live Canvas Preview */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Customization Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Sector / Item Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Select Policy Issue to Feature:
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {POLICY_VS_PROMISES_SCORECARD_DATA.map((item) => (
                  <option key={item.id} value={item.id}>
                    [{item.sector}] {item.statedPromise.slice(0, 55)}...
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Format / Aspect Ratio Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Card Format & Aspect Ratio:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAspectRatio("square")}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    aspectRatio === "square"
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-xs"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-[11px] font-bold">1:1 Square</span>
                  <span className="text-[9px] opacity-70">Feed / Post</span>
                </button>

                <button
                  onClick={() => setAspectRatio("landscape")}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    aspectRatio === "landscape"
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-xs"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-[11px] font-bold">16:9 Wide</span>
                  <span className="text-[9px] opacity-70">Twitter / X</span>
                </button>

                <button
                  onClick={() => setAspectRatio("story")}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    aspectRatio === "story"
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-xs"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px] font-bold">9:16 Story</span>
                  <span className="text-[9px] opacity-70">Status / Reel</span>
                </button>
              </div>
            </div>

            {/* 3. Theme Palette */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Graphic Theme Style:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme("midnight")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme === "midnight"
                      ? "bg-slate-800 border-emerald-500 text-white ring-1 ring-emerald-500"
                      : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="w-3 h-3 rounded-full bg-slate-900 border border-emerald-500" />
                    <span className="text-[11px] font-bold">Midnight</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block">Navy & Emerald</span>
                </button>

                <button
                  onClick={() => setTheme("heritage")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme === "heritage"
                      ? "bg-slate-800 border-amber-500 text-white ring-1 ring-amber-500"
                      : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-900 border border-amber-400" />
                    <span className="text-[11px] font-bold">Heritage</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block">Kenya Flag Motif</span>
                </button>

                <button
                  onClick={() => setTheme("editorial")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    theme === "editorial"
                      ? "bg-slate-800 border-blue-400 text-white ring-1 ring-blue-400"
                      : "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-400" />
                    <span className="text-[11px] font-bold">Editorial</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block">Ivory Print Style</span>
                </button>
              </div>
            </div>

            {/* 4. Inclusion Toggles */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2.5 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Include in Image:
              </span>
              <label className="flex items-center space-x-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeVerdict}
                  onChange={(e) => setIncludeVerdict(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-slate-700 border-slate-600"
                />
                <span>Citizen Scrutiny Verdict Banner</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={includeMilestones}
                  onChange={(e) => setIncludeMilestones(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 bg-slate-700 border-slate-600"
                />
                <span>First 100 Days Verifiable Milestone</span>
              </label>
            </div>

            {/* Direct Quick Share Links */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                One-Click Social Dispatch:
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

          {/* RIGHT: Live Canvas Preview & Action Hub (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between space-y-4">
            
            {/* Live Canvas Preview Frame */}
            <div className="w-full flex-1 flex items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800/80 shadow-inner overflow-hidden max-h-[460px]">
              {/* Hidden Working Canvas */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Rendered Preview Image */}
              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt="Generated Scorecard Card"
                  className="max-h-[420px] max-w-full rounded-xl shadow-2xl object-contain border border-slate-800"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-slate-500 py-12">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
                  <span className="text-xs">Rendering pixel-perfect graphic...</span>
                </div>
              )}
            </div>

            {/* Action Buttons Toolbar */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-emerald-900/30"
              >
                {copiedStatus === "downloaded" ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Saved to Device!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download PNG Image</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyImage}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-slate-700"
              >
                {copiedStatus === "image-copied" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Image Copied!</span>
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
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Summary Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Post Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Civic Verification Badge */}
            <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Anti-Disinformation Watermark: Certified under Article 201 Guidelines.</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">2X High-DPI</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
