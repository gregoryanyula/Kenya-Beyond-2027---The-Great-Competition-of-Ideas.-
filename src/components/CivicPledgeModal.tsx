import React, { useState } from "react";
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Share2, 
  Download, 
  Sparkles, 
  Flag 
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "../context/LanguageContext";

interface CivicPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTIES_OF_KENYA = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
  "Murang'a", "Nairobi City", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot", "Diaspora"
];

export const CivicPledgeModal: React.FC<CivicPledgeModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [name, setName] = useState("");
  const [county, setCounty] = useState("Nairobi City");
  const [role, setRole] = useState("Voter / Citizen");
  const [signed, setSigned] = useState(false);

  if (!isOpen) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSigned(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!signed ? (
          <form onSubmit={handleSign} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === "sw" ? "Mkataba wa Kiraia wa Kenya 2027" : "Kenya 2027 Civic Covenant"}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === "sw" ? "Kiapo cha Shindano la Mawazo 2027" : "The 2027 Competition of Ideas Pledge"}
              </h3>
              <p className="text-xs text-slate-600">
                {language === "sw" 
                  ? "Jiunge na maelfu ya Wakenya waliojitolea kuinua utamaduni wetu wa kisiasa." 
                  : "Join thousands of Kenyans committing to elevate our political culture."}
              </p>
            </div>

            {/* Core Pledge Commitments */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-800">
              <div className="flex items-start space-x-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === "sw" 
                    ? "Nitawapima wagombea kwa misingi ya mawazo, ushahidi na rekodi—sio ukabila au mihemko." 
                    : "I will evaluate candidates based on ideas, evidence, and records—not ethnicity or tribal mobilization."}
                </span>
              </div>
              <div className="flex items-start space-x-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === "sw" 
                    ? "Nitadai mipango thabiti na takwimu halisi: “Usitupatie slogan. Tupatie plan.”" 
                    : "I will demand plans and numbers: “Usitupatie slogan. Tupatie plan.”"}
                </span>
              </div>
              <div className="flex items-start space-x-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === "sw" 
                    ? "Nakataa ghasia za kisiasa, vitisho na chuki. Kutofautiana kimawazo bila uadui." 
                    : "I reject political violence, intimidation, and hatred. Strong disagreement without enmity."}
                </span>
              </div>
              <div className="flex items-start space-x-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === "sw" 
                    ? "Ninasimamia muendelezo wa miradi ya maendeleo ya kitaifa kuelekea Kenya 2060." 
                    : "I stand for the continuity of essential national development towards Kenya 2060."}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1">
                  {language === "sw" ? "Jina Kamili" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === "sw" ? "Mfano: Amani Wanjiku" : "E.g. Amani Wanjiku"}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    {language === "sw" ? "Kaunti" : "County"}
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {COUNTIES_OF_KENYA.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1">
                    {language === "sw" ? "Nafasi / Wajibu" : "Role / Capacity"}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Voter / Citizen">{language === "sw" ? "Mpiga Kura / Mwananchi" : "Voter / Citizen"}</option>
                    <option value="Youth Leader">{language === "sw" ? "Kiongozi wa Vijana / Mwanafunzi" : "Youth / Student Leader"}</option>
                    <option value="Journalist / Creator">{language === "sw" ? "Mwanahabari / Muundaji Maudhui" : "Journalist / Creator"}</option>
                    <option value="Civic Educator">{language === "sw" ? "Mwezeshaji wa Elimu ya Uraia" : "Civic Educator / Advocate"}</option>
                    <option value="Candidate / Aspirant">{language === "sw" ? "Mgombea / Mtarajiwa" : "Candidate / Aspirant"}</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider bg-slate-900 text-white hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
            >
              {language === "sw" ? "Weka Saini kwenye Kiapo cha 2027 🇰🇪" : "Sign the 2027 Civic Pledge 🇰🇪"}
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center py-2 animate-in fade-in">
            <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 mx-auto flex items-center justify-center font-black text-2xl">
              🇰🇪
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                {language === "sw" ? "Kiapo Kimerekodiwa Kikamilifu" : "Pledge Registered Successfully"}
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                {language === "sw" ? `Asante Sana, ${name}!` : `Thank You, ${name}!`}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {language === "sw"
                  ? `Umetia saini rasmi Mkataba Huru wa Kiraia wa Kenya 2027 kutoka Kaunti ya ${county}.`
                  : `You have officially signed the non-partisan Kenya 2027 Civic Covenant from ${county} County.`}
              </p>
            </div>

            {/* Certificate Card Preview */}
            <div className="p-5 rounded-xl bg-slate-900 text-white text-left space-y-3 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest font-mono">
                  {language === "sw" ? "BINGWA WA URAIA KENYA 2027" : "KENYA 2027 CIVIC CHAMPION"}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest font-mono text-emerald-400">
                  {language === "sw" ? "IMETHIBITISHWA" : "VERIFIED"}
                </span>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{name}</div>
                <div className="text-xs text-slate-400">{role} • {county} County</div>
              </div>
              <p className="text-[11px] text-slate-300 italic">
                {language === "sw"
                  ? "“Mwaka wa 2027 haufai kuwa vita kati ya Wakenya. Uwe shindano la mawazo kuhusu Kenya tunayotaka kujenga.”"
                  : "“2027 should not be a war between Kenyans. It should be a competition of ideas about the Kenya we want to build.”"}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                {language === "sw" ? "Funga Dirisha" : "Close Window"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
