import React, { useState } from "react";
import { 
  X, 
  DollarSign, 
  ArrowRightLeft, 
  Calculator, 
  TrendingUp, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  Car,
  Coins
} from "lucide-react";

interface PolicyCurrencyConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmountUsd?: number;
}

// Representative exchange rates relative to 1 KES
const EXCHANGE_RATES: Record<string, { label: string; rateToKes: number; symbol: string; flag: string }> = {
  USD: { label: "US Dollar", rateToKes: 130.0, symbol: "$", flag: "🇺🇸" },
  EUR: { label: "Euro", rateToKes: 141.5, symbol: "€", flag: "🇪🇺" },
  GBP: { label: "British Pound", rateToKes: 168.0, symbol: "£", flag: "🇬🇧" },
  CNY: { label: "Chinese Yuan", rateToKes: 18.0, symbol: "¥", flag: "🇨🇳" },
  SDR: { label: "IMF Special Drawing Rights (SDR)", rateToKes: 172.5, symbol: "SDR", flag: "🌐" },
  JPY: { label: "Japanese Yen (100x)", rateToKes: 87.0, symbol: "¥", flag: "🇯🇵" }
};

const SAMPLE_LOAN_PRESETS = [
  { label: "$1.0 Billion Eurobond Tranche", currency: "USD", amount: 1000000000 },
  { label: "$500 Million World Bank DPO Credit", currency: "USD", amount: 500000000 },
  { label: "€200 Million EU Climate Resilience Grant", currency: "EUR", amount: 200000000 },
  { label: "¥1.5 Billion Exim Bank Railway Rolling Stock", currency: "CNY", amount: 1500000000 },
  { label: "KES 50 Billion National Housing Development", currency: "KES", amount: 50000000000 }
];

export const PolicyCurrencyConverterModal: React.FC<PolicyCurrencyConverterModalProps> = ({
  isOpen,
  onClose,
  initialAmountUsd = 100000000 // $100M default
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(initialAmountUsd);
  const [kesExchangeRate, setKesExchangeRate] = useState<number>(130.0);
  const [depreciationShock, setDepreciationShock] = useState<number>(0); // % change

  if (!isOpen) return null;

  const currentRate = (EXCHANGE_RATES[selectedCurrency]?.rateToKes || 130.0) * (1 + depreciationShock / 100);
  const totalKes = amount * currentRate;
  const totalBillionsKes = totalKes / 1000000000;

  // Civic Cost Equivalency Anchors (Real Kenyan Unit Costs)
  const costPerSecondaryCapitation = 22244; // KES per student/yr (FDSE)
  const costPerKmHighway = 85000000; // KES 85M per km 2-lane paved road
  const costPerCountyDispensary = 15000000; // KES 15M fully equipped maternity dispensary
  const costPerLevel5IcuBed = 4500000; // KES 4.5M per state-of-the-art ICU bed with ventilator

  const studentsFunded = Math.floor(totalKes / costPerSecondaryCapitation);
  const kmHighwayBuilt = Math.floor(totalKes / costPerKmHighway);
  const dispensariesBuilt = Math.floor(totalKes / costPerCountyDispensary);
  const icuBedsEquipped = Math.floor(totalKes / costPerLevel5IcuBed);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-KE").format(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-slate-900">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Policy Costing Currency Converter & Civic Equivalency
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Real KES Mapping
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Convert foreign currency loans, donor grants, and mega-project budgets into real Kenyan Shilling values and tangible public delivery units.
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          
          {/* Quick Preset Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
              Quick Presets (International Loans & Programs):
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_LOAN_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCurrency(preset.currency === "KES" ? "USD" : preset.currency);
                    setAmount(preset.amount);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors shadow-2xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Inputs Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Currency Selector */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Foreign Currency:
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.entries(EXCHANGE_RATES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.flag} {code} - {info.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <div className="sm:col-span-8 space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Amount in {selectedCurrency}:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    {EXCHANGE_RATES[selectedCurrency]?.symbol}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    placeholder="Enter amount (e.g. 500000000)"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Currency Depreciation Stress Test Slider */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>Exchange Rate Sensitivity / Currency Depreciation Shock:</span>
                </span>
                <span className="font-mono font-bold text-amber-700">
                  {depreciationShock > 0 ? `+${depreciationShock}% KES Weakening` : "Baseline Rate"}
                  {` (1 ${selectedCurrency} = KES ${currentRate.toFixed(2)})`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={depreciationShock}
                onChange={(e) => setDepreciationShock(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0% Baseline</span>
                <span>+10% Stress</span>
                <span>+20% Shilling Shock</span>
                <span>+30% Severe Crisis</span>
              </div>
            </div>
          </div>

          {/* Large Result Callout */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
              Total Kenyan Shilling Value:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white">
                KES {formatNumber(Math.round(totalKes))}
              </h2>
              <span className="text-base sm:text-xl font-bold font-mono text-emerald-400">
                ≈ KES {totalBillionsKes.toFixed(2)} Billion
              </span>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              At benchmark rate 1 {selectedCurrency} = KES {currentRate.toFixed(2)}
            </p>
          </div>

          {/* Civic Equivalency Anchors (What this money could deliver) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>Public Delivery Equivalency (What KES {totalBillionsKes.toFixed(1)}B Represents):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Secondary Capitation */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black font-mono text-slate-900 block">
                    {formatNumber(studentsFunded)} Learners
                  </span>
                  <span className="text-xs text-slate-500">
                    Full 1-year Free Day Secondary School capitation grants (KES 22,244/student).
                  </span>
                </div>
              </div>

              {/* Paved Highway */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black font-mono text-slate-900 block">
                    {formatNumber(kmHighwayBuilt)} Kilometers
                  </span>
                  <span className="text-xs text-slate-500">
                    Standard 2-lane paved national arterial highway (approx. KES 85M/km).
                  </span>
                </div>
              </div>

              {/* County Dispensaries */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black font-mono text-slate-900 block">
                    {formatNumber(dispensariesBuilt)} Dispensaries
                  </span>
                  <span className="text-xs text-slate-500">
                    Equipped rural primary maternity health centers (KES 15M per center).
                  </span>
                </div>
              </div>

              {/* ICU Beds */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black font-mono text-slate-900 block">
                    {formatNumber(icuBedsEquipped)} ICU Beds
                  </span>
                  <span className="text-xs text-slate-500">
                    State-of-the-art Level-5 hospital ICU beds with ventilators (KES 4.5M/bed).
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            CBK Official Representative Indicative Exchange Rates
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
