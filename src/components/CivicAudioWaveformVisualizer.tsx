import React, { useEffect, useRef, useState } from "react";
import { Activity, Volume2 } from "lucide-react";

interface CivicAudioWaveformVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  height?: number; // in pixels
  colorTheme?: "emerald" | "purple" | "cyan" | "amber" | "slate";
  showDecibelMeter?: boolean;
  label?: string;
  className?: string;
}

export const CivicAudioWaveformVisualizer: React.FC<CivicAudioWaveformVisualizerProps> = ({
  isPlaying,
  barCount = 28,
  height = 36,
  colorTheme = "emerald",
  showDecibelMeter = true,
  label = "Civic Audio Feed",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [decibels, setDecibels] = useState<number>(-24);

  // Color theme maps
  const colorMap = {
    emerald: {
      activeGradient: ["#10b981", "#059669", "#047857"],
      idle: "rgba(16, 185, 129, 0.2)",
      glow: "rgba(16, 185, 129, 0.4)",
      badge: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    purple: {
      activeGradient: ["#a855f7", "#7e22ce", "#581c87"],
      idle: "rgba(168, 85, 247, 0.2)",
      glow: "rgba(168, 85, 247, 0.4)",
      badge: "bg-purple-50 text-purple-800 border-purple-200"
    },
    cyan: {
      activeGradient: ["#06b6d4", "#0891b2", "#0e7490"],
      idle: "rgba(6, 182, 212, 0.2)",
      glow: "rgba(6, 182, 212, 0.4)",
      badge: "bg-cyan-50 text-cyan-800 border-cyan-200"
    },
    amber: {
      activeGradient: ["#f59e0b", "#d97706", "#b45309"],
      idle: "rgba(245, 158, 11, 0.2)",
      glow: "rgba(245, 158, 11, 0.4)",
      badge: "bg-amber-50 text-amber-800 border-amber-200"
    },
    slate: {
      activeGradient: ["#64748b", "#334155", "#0f172a"],
      idle: "rgba(100, 116, 139, 0.2)",
      glow: "rgba(100, 116, 139, 0.4)",
      badge: "bg-slate-100 text-slate-800 border-slate-200"
    }
  };

  const currentTheme = colorMap[colorTheme] || colorMap.emerald;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const barHeights = new Array(barCount).fill(0.15);

    const render = () => {
      phase += 0.08;
      const width = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, width, ch);

      const spacing = 3;
      const totalSpacing = (barCount - 1) * spacing;
      const barWidth = Math.max(2, (width - totalSpacing) / barCount);

      // Calculate dynamic bar heights based on sinusoidal wave patterns + speech modulation
      for (let i = 0; i < barCount; i++) {
        if (isPlaying) {
          // Human vocal cadence has harmonic formants in lower-mid frequencies
          const harmonic1 = Math.sin(phase * 1.4 + i * 0.35);
          const harmonic2 = Math.cos(phase * 2.1 + i * 0.6);
          const harmonic3 = Math.sin(phase * 0.7 - i * 0.2);
          const voiceModulation = Math.abs(harmonic1 * 0.5 + harmonic2 * 0.35 + harmonic3 * 0.15);
          
          // Add vocal formant center bump
          const centerFactor = 1 - Math.abs((i - barCount / 2) / (barCount / 2)) * 0.4;
          const target = Math.min(0.95, Math.max(0.12, voiceModulation * centerFactor));
          // Smooth interpolation
          barHeights[i] = barHeights[i] * 0.7 + target * 0.3;
        } else {
          // Gentle resting pulse
          const rest = 0.08 + Math.sin(phase * 0.3 + i * 0.2) * 0.04;
          barHeights[i] = barHeights[i] * 0.85 + rest * 0.15;
        }

        const bHeight = Math.max(4, barHeights[i] * ch);
        const x = i * (barWidth + spacing);
        const y = (ch - bHeight) / 2; // Center-aligned waveform

        // Draw bar
        const gradient = ctx.createLinearGradient(0, y, 0, y + bHeight);
        if (isPlaying) {
          gradient.addColorStop(0, currentTheme.activeGradient[0]);
          gradient.addColorStop(0.5, currentTheme.activeGradient[1]);
          gradient.addColorStop(1, currentTheme.activeGradient[2]);
        } else {
          gradient.addColorStop(0, currentTheme.idle);
          gradient.addColorStop(1, currentTheme.idle);
        }

        ctx.fillStyle = gradient;
        
        // Rounded bar caps
        const radius = Math.min(barWidth / 2, 2.5);
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, bHeight, radius);
        ctx.fill();
      }

      // Update decibel meter
      if (isPlaying) {
        const avgHeight = barHeights.reduce((acc, v) => acc + v, 0) / barCount;
        const simulatedDb = Math.round(-36 + avgHeight * 30);
        setDecibels(simulatedDb);
      } else {
        setDecibels(-48);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, barCount, currentTheme]);

  return (
    <div className={`flex items-center gap-3 bg-slate-900/90 text-white px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-inner ${className}`}>
      <div className="flex items-center gap-1.5 shrink-0">
        <Volume2 className={`w-4 h-4 ${isPlaying ? "text-emerald-400 animate-pulse" : "text-slate-400"}`} />
        <span className="text-[11px] font-bold text-slate-200 hidden sm:inline">{label}</span>
      </div>

      {/* Waveform Canvas */}
      <div className="flex-1 flex items-center justify-center overflow-hidden min-w-[120px]">
        <canvas
          ref={canvasRef}
          width={barCount * 6}
          height={height}
          className="w-full h-8 block"
        />
      </div>

      {/* Decibel & Status Gauge */}
      {showDecibelMeter && (
        <div className="flex items-center gap-2 shrink-0 border-l border-slate-700 pl-3 text-[10px] font-mono">
          <div className="flex flex-col items-end">
            <span className={`font-bold ${isPlaying ? "text-emerald-400" : "text-slate-400"}`}>
              {isPlaying ? `${decibels} dB` : "MUTED"}
            </span>
            <span className="text-[9px] text-slate-400 uppercase tracking-tighter">
              {isPlaying ? "Active TTS" : "Standby"}
            </span>
          </div>
          <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-slate-600"}`} />
        </div>
      )}
    </div>
  );
};
