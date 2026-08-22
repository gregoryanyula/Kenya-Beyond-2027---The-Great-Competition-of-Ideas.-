import React from "react";
import { 
  Keyboard, 
  X, 
  Search, 
  Languages, 
  Eye, 
  Sparkles, 
  Bookmark, 
  Layers, 
  Check, 
  Command, 
  Zap,
  Sliders,
  Volume2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();
  const isSw = language === "sw";

  if (!isOpen) return null;

  const shortcutGroups = [
    {
      title: isSw ? "Njia za Mkato za Urambazaji & Utafutaji" : "Navigation & Global Search",
      shortcuts: [
        {
          keys: ["Ctrl", "K"],
          altKey: ["⌘", "K"],
          description: isSw 
            ? "Fungua utafutaji wa sera, kaunti, na katiba" 
            : "Open global search across policies, counties & constitution",
          icon: Search,
          color: "text-emerald-500"
        },
        {
          keys: ["Ctrl", "L"],
          altKey: ["⌘", "L"],
          description: isSw 
            ? "Badilisha lugha kati ya Kiswahili na Kiingereza papo hapo" 
            : "Toggle application language between English and Kiswahili",
          icon: Languages,
          color: "text-blue-500"
        },
        {
          keys: ["W"],
          description: isSw 
            ? "Fungua Orodha ya Sera Uliyoihifadhi (Civic Watchlist)" 
            : "Open your saved Civic Watchlist drawer",
          icon: Bookmark,
          color: "text-amber-500"
        },
        {
          keys: ["1", "–", "9"],
          description: isSw 
            ? "Rukia haraka kwenye vichupo 1 hadi 9 vya jukwaa" 
            : "Quickly switch between main applet tabs (1 to 9)",
          icon: Layers,
          color: "text-indigo-500"
        }
      ]
    },
    {
      title: isSw ? "Ufikiaji & Maelezo Rahisi ya AI (A11y & ELI5)" : "Accessibility & AI Simplification (A11y & ELI5)",
      shortcuts: [
        {
          keys: ["Alt", "A"],
          altKey: ["Ctrl", "A"],
          description: isSw 
            ? "Fungua Menyu ya Ufikiaji (Hali ya Kisomaji, Ulinganuzi wa Rangi, na Sauti)" 
            : "Open Accessibility Menu (Screen Reader Mode, Contrast & Voice)",
          icon: Eye,
          color: "text-purple-500"
        },
        {
          keys: ["Ctrl", "E"],
          altKey: ["E"],
          description: isSw 
            ? "Washa/Zima Maelezo Rahisi ya Miaka 5 (ELI5 Mode) kwenye tathmini ya sera" 
            : "Toggle Gemini 'Explain Like I'm Five' (ELI5) simplified citizen mode in Policy Audit Tool",
          icon: Sparkles,
          color: "text-amber-500"
        },
        {
          keys: ["?"],
          description: isSw 
            ? "Fungua orodha hii ya njia za mkato na Faharasa ya Uraia" 
            : "Open this Keyboard Shortcuts cheat sheet & Civic Glossary",
          icon: Keyboard,
          color: "text-teal-500"
        },
        {
          keys: ["Esc"],
          description: isSw 
            ? "Funga dirisha lolote lililofunguliwa au jopo la pembeni" 
            : "Close any active modal, dialog, or drawer",
          icon: X,
          color: "text-rose-500"
        }
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-shortcuts-title"
    >
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 id="keyboard-shortcuts-title" className="font-bold text-base text-white flex items-center gap-2">
                {isSw ? "Njia za Mkato za Kibodi" : "Civic Keyboard Shortcuts"}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Power User
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isSw ? "Vinjari na utumie zana za sera bila kutumia panya" : "Navigate policies, accessibility, and AI tools with speed"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>{group.title}</span>
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {group.shortcuts.map((sc, scIdx) => {
                  const Icon = sc.icon;
                  return (
                    <div 
                      key={scIdx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors"
                    >
                      <div className="flex items-center space-x-3 pr-4">
                        <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0">
                          <Icon className={`w-4 h-4 ${sc.color}`} />
                        </div>
                        <span className="text-xs text-slate-800 font-medium leading-tight">
                          {sc.description}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        {sc.keys.map((k, kIdx) => (
                          <kbd 
                            key={kIdx}
                            className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-800 font-mono font-bold text-xs shadow-2xs min-w-[24px] text-center"
                          >
                            {k}
                          </kbd>
                        ))}
                        {sc.altKey && (
                          <>
                            <span className="text-xs text-slate-400 font-semibold px-0.5">/</span>
                            {sc.altKey.map((ak, akIdx) => (
                              <kbd 
                                key={akIdx}
                                className="px-2 py-1 rounded-md bg-slate-200 border border-slate-300 text-slate-700 font-mono font-bold text-xs shadow-2xs"
                              >
                                {ak}
                              </kbd>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>{isSw ? "Bonyeza Esc wakati wowote kufunga" : "Press Esc anytime to close"}</span>
          <span className="font-mono text-emerald-700 font-semibold">Kenya 2027 Civic Suite</span>
        </div>
      </div>
    </div>
  );
};
