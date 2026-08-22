import React from "react";
import { Flag, Scale, ShieldCheck, Heart, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenPledge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPledge }) => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* Central Civic Manifesto Proposition Banner */}
      <div className="bg-slate-950 text-slate-100 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8 text-center border-t-2 border-emerald-600">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded text-[10px] font-black bg-slate-900 text-emerald-400 border border-emerald-600/40 uppercase tracking-widest">
            <span>{language === "sw" ? "Msimamo Mkuu wa Kiraia" : "The Central Civic Proposition"}</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug">
            {language === "sw" ? (
              <>
                MWAKA WA 2027 HAUFAI KUWA VITA KATI YA WAKENYA.<br className="hidden sm:inline" />
                UWE SHINDANO LA MAWAZO KUHUSU KENYA TUNAYOTAKA KUJENGA.
              </>
            ) : (
              <>
                2027 SHOULD NOT BE A WAR BETWEEN KENYANS.<br className="hidden sm:inline" />
                IT SHOULD BE A COMPETITION OF IDEAS ABOUT THE KENYA WE WANT TO BUILD.
              </>
            )}
          </h2>

          <p className="text-sm font-bold text-emerald-400 tracking-wider uppercase">
            {language === "sw" ? "NCHI MOJA. MAWAZO MENGI. LENGO MOJA: KENYA." : "ONE COUNTRY. MANY IDEAS. ONE DESTINATION: KENYA."}
          </p>

          <div className="pt-2 text-xs font-semibold text-slate-400 tracking-widest uppercase">
            {language === "sw" 
              ? "2027: MAWAZO YASHINDANE. DEMOKRASIA ISHINDE. KENYA ISONGE MBELE. 🇰🇪" 
              : "2027: LET IDEAS COMPETE. LET DEMOCRACY WIN. LET KENYA KEEP BUILDING. 🇰🇪"}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenPledge}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === "sw" ? "Weka Kiapo cha Uraia 2027 Leo" : "Sign the 2027 Civic Pledge Today"}</span>
            </button>

            {/* Quick Language Switcher in Footer Banner */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 active:scale-95 transition-all cursor-pointer"
              title="Switch Language / Badilisha Lugha"
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>{language === "sw" ? "Switch to English 🇬🇧" : "Badili iwe Kiswahili 🇰🇪"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation & Principles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
              <div className="w-4 h-0.5 bg-red-600 mb-0.5"></div>
              <div className="w-4 h-0.5 bg-emerald-600"></div>
            </div>
            <span className="font-black text-white tracking-tighter text-base">KENYA 2027</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {language === "sw"
              ? "Mpango huru wa kiraia unaolenga kuinua mijadala ya kidemokrasia kupitia uadilifu wa Kikatiba, uhalisia wa kifedha, na matokeo endelevu ya Dira ya Kenya 2060."
              : "A non-partisan civic policy initiative dedicated to elevating democratic discourse through constitutional integrity, fiscal realism, and Kenya 2060 outcomes."}
          </p>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            {language === "sw" ? "Huru Kabisa • Mpango wa Maslahi ya Umma" : "Strictly Non-Partisan • Public Interest Initiative"}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            {language === "sw" ? "Moduli za Ukaguzi" : "Evaluation Modules"}
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <button onClick={() => setActiveTab("audit-tool")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Mtambo wa Ukaguzi wa Vigezo 13" : "13-Point Policy Audit Tool"}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("domains")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Nyanja 12 Kuu za Sera" : "22 National Policy Domains"}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("county-map")} className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <span>{language === "sw" ? "Ramani ya Kaunti 47 na Miradi" : "47 Counties & Projects Map"}</span>
                <span className="text-[9px] bg-emerald-900/60 text-emerald-400 px-1 rounded">Maps</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("accountability")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Mfuatiliaji wa Rekodi za Serikali" : "Government Record Tracker"}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("opposition")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Matrix ya Mbadala wa Upinzani" : "Opposition Alternatives Matrix"}
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            {language === "sw" ? "Uraia & Vyombo vya Habari" : "Civic Literacy & Media"}
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <button onClick={() => setActiveTab("youth-literacy")} className="hover:text-emerald-400 transition-colors">
                “Usitupatie Slogan. Tupatie Plan.”
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("kenya-2060")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Mkataba wa Muendelezo Kenya 2060" : "Kenya 2060 Continuity Charter"}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("questionnaire")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Jenereta ya Maswali ya Mdahalo" : "Debate Question Generator"}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("media-standards")} className="hover:text-emerald-400 transition-colors">
                {language === "sw" ? "Viwango vya Habari na Ukweli" : "Journalistic & Fact-Check Standards"}
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            {language === "sw" ? "Misingi ya Kikatiba" : "Constitutional Anchors"}
          </h4>
          <ul className="space-y-1 text-slate-400 text-[11px]">
            <li>• {language === "sw" ? "Ibara ya 7: Lugha za Taifa na Rasmi (Kiswahili & Kiingereza)" : "Article 7: National & Official Languages"}</li>
            <li>• {language === "sw" ? "Ibara ya 201: Kanuni za Fedha za Umma" : "Article 201: Public Finance Principles"}</li>
            <li>• {language === "sw" ? "Sura ya 6: Uongozi na Uadilifu" : "Chapter 6: Leadership and Integrity"}</li>
            <li>• {language === "sw" ? "Ibara ya 10: Maadili ya Kitaifa na Utawala" : "Article 10: National Values & Governance"}</li>
            <li>• {language === "sw" ? "Ibara ya 35: Haki ya Kupata Taarifa" : "Article 35: Access to Information"}</li>
            <li>• {language === "sw" ? "Ibara ya 174: Malengo ya Ugatuzi" : "Article 174: Objects of Devolution"}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="font-bold uppercase tracking-widest text-slate-400">
            {language === "sw" ? "Mawazo Yashindane. Demokrasia Ishinde." : "Let Ideas Compete. Let Democracy Win."}
          </span>
        </div>
        <div className="font-medium text-slate-500 uppercase tracking-wider text-center sm:text-right">
          {language === "sw" 
            ? "2027 HAUFAI KUWA VITA KATI YA WAKENYA. UWE SHINDANO LA MAWAZO." 
            : "2027 SHOULD NOT BE A WAR BETWEEN KENYANS. IT SHOULD BE A COMPETITION OF IDEAS."}
        </div>
      </div>
    </footer>
  );
};
