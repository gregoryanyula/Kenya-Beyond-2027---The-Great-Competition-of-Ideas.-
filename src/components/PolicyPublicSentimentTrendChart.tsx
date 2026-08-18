import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Radio,
  Users,
  Sparkles,
  Calendar,
  Layers,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Activity,
  Bell
} from "lucide-react";
import { PolicyTrendAlertModal } from "./PolicyTrendAlertModal";

interface PolicyPublicSentimentTrendChartProps {
  policyTitle?: string;
  domainName?: string;
  compositeScore?: number;
  fiscalScore?: number;
}

interface SentimentDataPoint {
  dayLabel: string;
  fullDate: string;
  positivePct: number;
  criticalPct: number;
  neutralPct: number;
  netFavorability: number; // -100 to +100
  discourseVolumeK: number; // Volume of mentions in thousands
  milestoneEvent?: string;
  primaryDebateTheme?: string;
}

export const PolicyPublicSentimentTrendChart: React.FC<PolicyPublicSentimentTrendChartProps> = ({
  policyTitle = "Proposed Policy Measure",
  domainName = "Public Policy & Governance",
  compositeScore = 65,
  fiscalScore = 6
}) => {
  const [sliderDays, setSliderDays] = useState<number>(30); // 7 to 90 days
  const [activeQuarterPreset, setActiveQuarterPreset] = useState<string>("30d");
  const [activeChannel, setActiveChannel] = useState<"all" | "digital" | "fm_radio" | "analysts">("all");
  const [showVolumeBars, setShowVolumeBars] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<SentimentDataPoint | null>(null);
  const [isTrendAlertModalOpen, setIsTrendAlertModalOpen] = useState<boolean>(false);

  // Generate a continuous, realistic 90-day trajectory seeded by the policy characteristics
  const fullSentimentTrajectory: SentimentDataPoint[] = useMemo(() => {
    const data: SentimentDataPoint[] = [];
    const now = new Date();

    const basePositive = Math.min(75, Math.max(25, compositeScore * 0.7 + 10));
    const baseCritical = Math.min(70, Math.max(15, (10 - fiscalScore) * 6 + 15));
    
    const milestoneDays: Record<number, { event: string; theme: string }> = {
      2: { event: "Initial Manifesto Launch", theme: "Optimism on job & economic promises" },
      9: { event: "Parliamentary Budget Office Note", theme: "Scrutiny on tax & debt impact" },
      16: { event: "Gen-Z Digital Civic Townhall", theme: "Demands for Article 201 transparent costing" },
      23: { event: "Council of Governors Statement", theme: "County devolution alignment & equitable share" },
      28: { event: "Fact-Check Media Panel Review", theme: "Comparative analysis against historical budgets" },
      45: { event: "National Treasury Medium-Term Review", theme: "Fiscal deficit & public debt ceiling check" },
      60: { event: "Intergovernmental Budget Committee", theme: "Equalization fund allocations" },
      75: { event: "Civil Society Coalition Audit", theme: "Article 35 access to information review" },
      88: { event: "Quarterly Citizens Scorecard", theme: "National consensus on long-term 2060 delivery" }
    };

    for (let i = 89; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayNum = 90 - i;
      
      const dayStr = d.toLocaleDateString("en-KE", { month: "short", day: "numeric" });
      const fullDateStr = d.toLocaleDateString("en-KE", { dateStyle: "medium" });

      let wave = Math.sin(dayNum * 0.35) * 7 + Math.cos(dayNum * 0.18) * 4;
      
      let channelModifier = 0;
      if (activeChannel === "digital") channelModifier = -4;
      if (activeChannel === "fm_radio") channelModifier = 3;
      if (activeChannel === "analysts") channelModifier = -7;

      let pos = Math.round(basePositive + wave + channelModifier + (dayNum > 20 ? (compositeScore >= 60 ? 5 : -4) : 0));
      pos = Math.min(88, Math.max(12, pos));

      let crit = Math.round(baseCritical - (wave * 0.8) - (channelModifier * 0.7) + (dayNum > 20 ? (compositeScore >= 60 ? -3 : 5) : 0));
      crit = Math.min(85, Math.max(10, crit));

      let neu = Math.max(5, 100 - (pos + crit));
      if (pos + crit + neu !== 100) {
        crit = 100 - pos - neu;
      }

      const netScore = pos - crit;
      const vol = Math.round((12 + Math.abs(wave) * 3.5 + (milestoneDays[dayNum] ? 18 : 0)) * 10) / 10;

      data.push({
        dayLabel: dayStr,
        fullDate: fullDateStr,
        positivePct: pos,
        criticalPct: crit,
        neutralPct: neu,
        netFavorability: netScore,
        discourseVolumeK: vol,
        milestoneEvent: milestoneDays[dayNum]?.event,
        primaryDebateTheme: milestoneDays[dayNum]?.theme
      });
    }

    return data;
  }, [compositeScore, fiscalScore, activeChannel]);

  // Sliced data based on time range slider
  const displayedData = useMemo(() => {
    return fullSentimentTrajectory.slice(-sliderDays);
  }, [fullSentimentTrajectory, sliderDays]);

  const handlePresetSelect = (preset: string, days: number) => {
    setActiveQuarterPreset(preset);
    setSliderDays(days);
  };

  // Summary Metrics
  const averageNetSentiment = useMemo(() => {
    const sum = displayedData.reduce((acc, curr) => acc + curr.netFavorability, 0);
    return Math.round(sum / displayedData.length);
  }, [displayedData]);

  const latestPoint = displayedData[displayedData.length - 1];
  const earliestPoint = displayedData[0];
  const trendDirection = latestPoint.netFavorability - earliestPoint.netFavorability;

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Activity className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Citizen Discourse Analytics
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
            Public Discourse & Sentiment Trajectory (30-Day Trend)
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
            Real-time multi-channel aggregation of citizen sentiment, town hall reactions, and fiscal feasibility debate around: <strong className="text-slate-800 font-semibold">{policyTitle.slice(0, 55)}</strong>.
          </p>
        </div>

        {/* Timeframe & Channel Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Channel Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveChannel("all")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeChannel === "all" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Channels
            </button>
            <button
              onClick={() => setActiveChannel("digital")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeChannel === "digital" ? "bg-white text-emerald-800 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Digital & Townhalls
            </button>
            <button
              onClick={() => setActiveChannel("fm_radio")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeChannel === "fm_radio" ? "bg-white text-amber-800 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              FM Radio Call-ins
            </button>
            <button
              onClick={() => setActiveChannel("analysts")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeChannel === "analysts" ? "bg-white text-purple-800 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Policy Analysts
            </button>
          </div>

          {/* Time-Range Slider & Presets */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
                Time Window: <span className="font-mono text-emerald-700">{sliderDays} Days</span>
              </span>
            </div>

            {/* Range Slider */}
            <div className="flex items-center space-x-2 w-36 sm:w-44">
              <span className="text-[10px] font-mono text-slate-400">7D</span>
              <input
                type="range"
                min={7}
                max={90}
                step={1}
                value={sliderDays}
                onChange={(e) => {
                  setSliderDays(Number(e.target.value));
                  setActiveQuarterPreset("custom");
                }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                id="sentiment-time-range-slider"
                title="Slide to adjust analysis window from 1 week up to a full quarter"
              />
              <span className="text-[10px] font-mono text-slate-400">90D</span>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center space-x-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-mono">
              <button
                onClick={() => handlePresetSelect("7d", 7)}
                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                  sliderDays === 7 ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="1 Week Window"
              >
                1W
              </button>
              <button
                onClick={() => handlePresetSelect("14d", 14)}
                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                  sliderDays === 14 ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Fortnight (2 Weeks)"
              >
                2W
              </button>
              <button
                onClick={() => handlePresetSelect("30d", 30)}
                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                  sliderDays === 30 ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="1 Month (30 Days)"
              >
                30D
              </button>
              <button
                onClick={() => handlePresetSelect("60d", 60)}
                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                  sliderDays === 60 ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Mid-Term (60 Days)"
              >
                60D
              </button>
              <button
                onClick={() => handlePresetSelect("90d", 90)}
                className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                  sliderDays === 90 ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Full Quarter (90 Days / Q1)"
              >
                QTR
              </button>
            </div>

            {/* Subscribe to Trend Alerts Button */}
            <button
              onClick={() => setIsTrendAlertModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white transition-colors shadow-2xs cursor-pointer ml-auto sm:ml-0"
              title="Subscribe to Email & In-App Alerts when public sentiment shifts significantly"
              id="subscribe-trend-alert-btn"
            >
              <Bell className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Trend Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Net Sentiment KPI */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Net Favorability</div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className={`text-2xl font-black ${averageNetSentiment >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
              {averageNetSentiment > 0 ? `+${averageNetSentiment}` : averageNetSentiment}%
            </span>
            <span className="text-xs font-bold text-slate-400">Score</span>
          </div>
          <div className="flex items-center space-x-1 mt-1 text-[11px] font-semibold">
            {trendDirection >= 0 ? (
              <span className="text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{trendDirection}% in window
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> {trendDirection}% in window
              </span>
            )}
          </div>
        </div>

        {/* Positive Support KPI */}
        <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
          <div className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">Current Support</div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-black text-emerald-700">{latestPoint.positivePct}%</span>
            <span className="text-xs font-medium text-emerald-600">positive</span>
          </div>
          <p className="text-[10.5px] text-emerald-800/80 mt-1">
            Driven by promised youth empowerment & service delivery.
          </p>
        </div>

        {/* Critical Scrutiny KPI */}
        <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200">
          <div className="text-[11px] text-rose-800 font-semibold uppercase tracking-wider">Fiscal Scrutiny</div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-black text-rose-700">{latestPoint.criticalPct}%</span>
            <span className="text-xs font-medium text-rose-600">skeptical</span>
          </div>
          <p className="text-[10.5px] text-rose-800/80 mt-1">
            Concerned regarding revenue sources and national debt burden.
          </p>
        </div>

        {/* Discourse Volume KPI */}
        <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200">
          <div className="text-[11px] text-purple-800 font-semibold uppercase tracking-wider">30D Mention Volume</div>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-black text-purple-900">
              {Math.round(displayedData.reduce((a, c) => a + c.discourseVolumeK, 0))}k
            </span>
            <span className="text-xs font-medium text-purple-700">interactions</span>
          </div>
          <p className="text-[10.5px] text-purple-800/80 mt-1">
            High citizen engagement in civic Spaces & local radio.
          </p>
        </div>
      </div>

      {/* Main Recharts Area & Line Visualization */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayedData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state && state.activePayload && state.activePayload.length > 0) {
                setHoveredPoint(state.activePayload[0].payload as SentimentDataPoint);
              }
            }}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              <linearGradient id="supportGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="criticGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="dayLabel"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              unit="%"
            />
            <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="2 2" />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as SentimentDataPoint;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-xs">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                        <span className="font-bold text-slate-200">{data.fullDate}</span>
                        <span className="font-mono text-[10px] text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          Vol: {data.discourseVolumeK}k mentions
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between items-center text-emerald-300">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Positive / Supportive:
                          </span>
                          <strong className="font-mono">{data.positivePct}%</strong>
                        </div>
                        <div className="flex justify-between items-center text-rose-300">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                            Critical / Fiscal Skepticism:
                          </span>
                          <strong className="font-mono">{data.criticalPct}%</strong>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                            Neutral / Inquiring:
                          </span>
                          <strong className="font-mono">{data.neutralPct}%</strong>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-slate-800 font-bold text-white">
                          <span>Net Favorability Index:</span>
                          <span className={data.netFavorability >= 0 ? "text-emerald-400" : "text-rose-400"}>
                            {data.netFavorability > 0 ? `+${data.netFavorability}` : data.netFavorability}%
                          </span>
                        </div>
                      </div>

                      {data.milestoneEvent && (
                        <div className="pt-1.5 border-t border-slate-700/80 mt-1">
                          <span className="text-[10px] font-bold text-amber-300 block uppercase">
                            ⚡ {data.milestoneEvent}
                          </span>
                          <p className="text-[10px] text-slate-300 italic">{data.primaryDebateTheme}</p>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
            />

            <Area
              type="monotone"
              dataKey="positivePct"
              name="Positive Support %"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#supportGrad)"
            />

            <Area
              type="monotone"
              dataKey="criticalPct"
              name="Critical & Fiscal Scrutiny %"
              stroke="#f43f5e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#criticGrad)"
            />

            <Line
              type="monotone"
              dataKey="netFavorability"
              name="Net Favorability Index"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 2, fill: "#6366f1" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Annotated Citizen Discourse Milestones Ribbon */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Key 30-Day Citizen Debate Milestones & Discourse Triggers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block font-mono">Day 2 • Launch</span>
            <h4 className="font-semibold text-slate-900 text-xs">Manifesto Reveal</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Strong initial enthusiasm for promised target outcomes and job creation.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase block font-mono">Day 9 • Scrutiny</span>
            <h4 className="font-semibold text-slate-900 text-xs">PBO Costing Note</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Parliamentary Budget Office note sparked questions regarding Article 201 tax burdens.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-purple-700 uppercase block font-mono">Day 16 • Digital Baraza</span>
            <h4 className="font-semibold text-slate-900 text-xs">Gen-Z Space Debate</h4>
            <p className="text-[11px] text-slate-500 leading-snug">Over 45,000 live listeners demanded specific implementation timelines and anti-corruption ring-fencing.</p>
          </div>
        </div>
      </div>

      {/* Trend Alert Subscription Modal */}
      <PolicyTrendAlertModal
        isOpen={isTrendAlertModalOpen}
        onClose={() => setIsTrendAlertModalOpen(false)}
        defaultTopic={policyTitle}
        defaultDomain={domainName}
        currentSentimentScore={averageNetSentiment}
      />
    </div>
  );
};
