import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Sparkles,
  Sliders,
  Check,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Scale,
  RefreshCw,
  FolderPlus,
  Compass
} from "lucide-react";
import { WeightedCriteriaSettings } from "../types";

export interface PolicyAuditTemplate {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
  isBuiltIn?: boolean;
  weights: WeightedCriteriaSettings;
  prioritizedPillars: string[];
  preferredDomain?: string;
  strictConstitutionalChecks: boolean;
  createdAt: string;
}

export const BUILT_IN_TEMPLATES: PolicyAuditTemplate[] = [
  {
    id: "template-balanced",
    name: "Standard Balanced Citizen Audit",
    description: "Equally balanced weights across fiscal realism, constitutional fidelity, Kenya 2060 alignment, and delivery capability.",
    isDefault: true,
    isBuiltIn: true,
    weights: {
      fiscalRealism: 25,
      constitutionalCompliance: 25,
      kenya2060Goals: 20,
      implementationReadiness: 15,
      clarityOrEquity: 15,
      economicFeasibilityWeight: 25,
      constitutionalComplianceWeight: 25,
      kenya2060AlignmentWeight: 20,
      implementationReadinessWeight: 15,
      clarityWeight: 15
    },
    prioritizedPillars: ["economic", "education", "healthcare", "devolution"],
    strictConstitutionalChecks: true,
    createdAt: "2026-01-01"
  },
  {
    id: "template-fiscal",
    name: "Article 201 Strict Fiscal Realism Rule",
    description: "Heavily weights debt sustainability, revenue feasibility, and tax burden equity over political rhetoric.",
    isBuiltIn: true,
    weights: {
      fiscalRealism: 45,
      constitutionalCompliance: 25,
      kenya2060Goals: 10,
      implementationReadiness: 10,
      clarityOrEquity: 10,
      economicFeasibilityWeight: 45,
      constitutionalComplianceWeight: 25,
      kenya2060AlignmentWeight: 10,
      implementationReadinessWeight: 10,
      clarityWeight: 10
    },
    prioritizedPillars: ["economic", "food", "devolution"],
    preferredDomain: "Economic Growth & Productivity",
    strictConstitutionalChecks: true,
    createdAt: "2026-01-01"
  },
  {
    id: "template-kenya2060",
    name: "Kenya 2060 Long-Term Impact Charter",
    description: "Prioritizes intergenerational equity, climate resilience, youth tech capacity, and 30-year structural transformation.",
    isBuiltIn: true,
    weights: {
      fiscalRealism: 15,
      constitutionalCompliance: 15,
      kenya2060Goals: 45,
      implementationReadiness: 15,
      clarityOrEquity: 10,
      economicFeasibilityWeight: 15,
      constitutionalComplianceWeight: 15,
      kenya2060AlignmentWeight: 45,
      implementationReadinessWeight: 15,
      clarityWeight: 10
    },
    prioritizedPillars: ["education", "tech", "climate", "healthcare"],
    strictConstitutionalChecks: false,
    createdAt: "2026-01-01"
  },
  {
    id: "template-devolution",
    name: "County Devolution & Equalization Audit",
    description: "Evaluates decentralization impact, county revenue-sharing compliance, and Article 174 public participation standards.",
    isBuiltIn: true,
    weights: {
      fiscalRealism: 20,
      constitutionalCompliance: 35,
      kenya2060Goals: 20,
      implementationReadiness: 15,
      clarityOrEquity: 10,
      economicFeasibilityWeight: 20,
      constitutionalComplianceWeight: 35,
      kenya2060AlignmentWeight: 20,
      implementationReadinessWeight: 15,
      clarityWeight: 10
    },
    prioritizedPillars: ["devolution", "healthcare", "food"],
    preferredDomain: "Devolution & County Empowerment",
    strictConstitutionalChecks: true,
    createdAt: "2026-01-01"
  }
];

const STORAGE_KEY = "kenya2027_custom_audit_templates";
const DEFAULT_ID_KEY = "kenya2027_default_audit_template_id";

interface PolicyAuditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeights: WeightedCriteriaSettings;
  onApplyTemplate: (template: PolicyAuditTemplate) => void;
}

export const PolicyAuditTemplateModal: React.FC<PolicyAuditTemplateModalProps> = ({
  isOpen,
  onClose,
  currentWeights,
  onApplyTemplate
}) => {
  const [customTemplates, setCustomTemplates] = useState<PolicyAuditTemplate[]>([]);
  const [defaultTemplateId, setDefaultTemplateId] = useState<string>("template-balanced");
  const [activeTab, setActiveTab] = useState<"library" | "create">("library");
  
  // New template form state
  const [newTemplateName, setNewTemplateName] = useState<string>("");
  const [newTemplateDesc, setNewTemplateDesc] = useState<string>("");
  const [tempWeights, setTempWeights] = useState<WeightedCriteriaSettings>(currentWeights);
  const [selectedPillars, setSelectedPillars] = useState<string[]>(["economic", "education", "healthcare"]);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Load custom templates
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCustomTemplates(JSON.parse(stored));
      }
      const storedDefault = localStorage.getItem(DEFAULT_ID_KEY);
      if (storedDefault) {
        setDefaultTemplateId(storedDefault);
      }
    } catch {
      // ignore
    }
  }, []);

  // Update temp weights if currentWeights prop updates
  useEffect(() => {
    setTempWeights(currentWeights);
  }, [currentWeights]);

  const allTemplates = [...BUILT_IN_TEMPLATES, ...customTemplates];

  const handleSaveNewTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateName.trim()) return;

    const totalWeight =
      tempWeights.economicFeasibilityWeight +
      tempWeights.constitutionalComplianceWeight +
      tempWeights.kenya2060AlignmentWeight +
      tempWeights.implementationReadinessWeight +
      tempWeights.clarityWeight;

    const newTemplate: PolicyAuditTemplate = {
      id: `template-custom-${Date.now()}`,
      name: newTemplateName.trim(),
      description: newTemplateDesc.trim() || `Custom audit template with ${totalWeight}% total weight allocation.`,
      weights: tempWeights,
      prioritizedPillars: selectedPillars,
      strictConstitutionalChecks: true,
      createdAt: new Date().toISOString()
    };

    const updated = [newTemplate, ...customTemplates];
    setCustomTemplates(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSaveSuccess(`✓ Saved custom template: "${newTemplate.name}"`);
    setTimeout(() => {
      setSaveSuccess(null);
      setActiveTab("library");
    }, 1200);
  };

  const handleDeleteCustomTemplate = (id: string) => {
    const updated = customTemplates.filter((t) => t.id !== id);
    setCustomTemplates(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (defaultTemplateId === id) {
      setDefaultTemplateId("template-balanced");
      localStorage.setItem(DEFAULT_ID_KEY, "template-balanced");
    }
  };

  const handleSetAsDefault = (id: string) => {
    setDefaultTemplateId(id);
    try {
      localStorage.setItem(DEFAULT_ID_KEY, id);
    } catch {
      // ignore
    }
    setSaveSuccess("Default template configuration updated.");
    setTimeout(() => setSaveSuccess(null), 2500);
  };

  const togglePillar = (key: string) => {
    if (selectedPillars.includes(key)) {
      setSelectedPillars(selectedPillars.filter((p) => p !== key));
    } else {
      setSelectedPillars([...selectedPillars, key]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-6 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Bookmark className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
                <Sliders className="w-3 h-3 text-emerald-600" />
                <span>Recurring Scrutiny Configurations</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Custom Audit Templates
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
          <button
            onClick={() => setActiveTab("library")}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "library" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Templates Library ({allTemplates.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "create" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Template</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="overflow-y-auto space-y-4 pr-1">
          {activeTab === "library" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {allTemplates.map((tpl) => {
                const isDefault = tpl.id === defaultTemplateId;
                return (
                  <div
                    key={tpl.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                      isDefault
                        ? "bg-emerald-50/40 border-emerald-300 shadow-2xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{tpl.name}</h4>
                        {isDefault && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0 border border-emerald-200">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-2xs text-slate-600 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>

                    {/* Weights Pill Matrix */}
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-slate-500 block">Fiscal:</span>
                        <strong className="text-slate-900">{tpl.weights.economicFeasibilityWeight}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Constitutional:</span>
                        <strong className="text-slate-900">{tpl.weights.constitutionalComplianceWeight}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Kenya 2060:</span>
                        <strong className="text-slate-900">{tpl.weights.kenya2060AlignmentWeight}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Readiness:</span>
                        <strong className="text-slate-900">{tpl.weights.implementationReadinessWeight}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Clarity:</span>
                        <strong className="text-slate-900">{tpl.weights.clarityWeight}%</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        {!isDefault && (
                          <button
                            onClick={() => handleSetAsDefault(tpl.id)}
                            className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                          >
                            Set Default
                          </button>
                        )}
                        {!tpl.isBuiltIn && (
                          <button
                            onClick={() => handleDeleteCustomTemplate(tpl.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            title="Delete custom template"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          onApplyTemplate(tpl);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Apply Template</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "create" && (
            <form onSubmit={handleSaveNewTemplate} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="e.g., Health & Food Security Priority Model"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">
                    Description / Audit Purpose
                  </label>
                  <input
                    type="text"
                    value={newTemplateDesc}
                    onChange={(e) => setNewTemplateDesc(e.target.value)}
                    placeholder="e.g., Focuses on rural clinic funding and food sovereignty"
                    className="w-full p-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Weight Sliders */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Custom Scoring Weights (%)</span>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    Total: {tempWeights.economicFeasibilityWeight + tempWeights.constitutionalComplianceWeight + tempWeights.kenya2060AlignmentWeight + tempWeights.implementationReadinessWeight + tempWeights.clarityWeight}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-2xs">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Fiscal Realism:</span>
                      <span>{tempWeights.economicFeasibilityWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={tempWeights.economicFeasibilityWeight}
                      onChange={(e) => setTempWeights({ ...tempWeights, economicFeasibilityWeight: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Constitutional Compliance:</span>
                      <span>{tempWeights.constitutionalComplianceWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={tempWeights.constitutionalComplianceWeight}
                      onChange={(e) => setTempWeights({ ...tempWeights, constitutionalComplianceWeight: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Kenya 2060 Long-Term:</span>
                      <span>{tempWeights.kenya2060AlignmentWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={tempWeights.kenya2060AlignmentWeight}
                      onChange={(e) => setTempWeights({ ...tempWeights, kenya2060AlignmentWeight: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Implementation Readiness:</span>
                      <span>{tempWeights.implementationReadinessWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={tempWeights.implementationReadinessWeight}
                      onChange={(e) => setTempWeights({ ...tempWeights, implementationReadinessWeight: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Clarity & Measurability:</span>
                      <span>{tempWeights.clarityWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={tempWeights.clarityWeight}
                      onChange={(e) => setTempWeights({ ...tempWeights, clarityWeight: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded accent-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Prioritized 2060 Pillars */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Prioritized Kenya 2060 Pillars</span>
                <div className="flex flex-wrap gap-1.5 text-2xs">
                  {[
                    { key: "economic", label: "Economic Growth" },
                    { key: "education", label: "Education & TVET" },
                    { key: "healthcare", label: "Healthcare & UHC" },
                    { key: "food", label: "Food Security" },
                    { key: "tech", label: "Tech & Youth Jobs" },
                    { key: "devolution", label: "County Devolution" },
                    { key: "climate", label: "Climate & Green Energy" }
                  ].map((p) => {
                    const isSelected = selectedPillars.includes(p.key);
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => togglePillar(p.key)}
                        className={`px-2.5 py-1 rounded-md font-semibold border transition-all ${
                          isSelected
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs font-bold"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5 text-emerald-200" />
                <span>Save Custom Audit Template</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500 shrink-0">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Templates are stored locally in your browser</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
