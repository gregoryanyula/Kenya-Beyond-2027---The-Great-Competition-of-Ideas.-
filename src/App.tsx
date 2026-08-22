import React, { useState } from "react";
import { Header } from "./components/Header";
import { PolicyAuditTool } from "./components/PolicyAuditTool";
import { PolicyDomainsExplorer } from "./components/PolicyDomainsExplorer";
import { GovernmentAccountabilityTracker } from "./components/GovernmentAccountabilityTracker";
import { OppositionAlternativeMatrix } from "./components/OppositionAlternativeMatrix";
import { YouthCivicLiteracyHub } from "./components/YouthCivicLiteracyHub";
import { Kenya2060ContinuityCharter } from "./components/Kenya2060ContinuityCharter";
import { CandidateQuestionnaireBuilder } from "./components/CandidateQuestionnaireBuilder";
import { MediaStandardsView } from "./components/MediaStandardsView";
import { PolicyInfluenceNetworkGraph } from "./components/PolicyInfluenceNetworkGraph";
import { PolicyConflictChecker } from "./components/PolicyConflictChecker";
import { KenyaDevolutionGeoMap } from "./components/KenyaDevolutionGeoMap";
import { CivicPledgeModal } from "./components/CivicPledgeModal";
import { CivicWatchlistDrawer } from "./components/CivicWatchlistDrawer";
import { CivicWatchlistCompareModal } from "./components/CivicWatchlistCompareModal";
import { CivicWatchlistProvider } from "./context/CivicWatchlistContext";
import { CivicAccessibilityProvider } from "./context/CivicAccessibilityContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("audit-tool");
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState<boolean>(false);

  const handleSelectDomainForAudit = (domainName: string) => {
    setActiveTab("audit-tool");
    // scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LanguageProvider>
      <CivicAccessibilityProvider>
        <CivicWatchlistProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
            {/* Top Navigation */}
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenPledge={() => setIsPledgeModalOpen(true)}
            />

            {/* Main Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
              {activeTab === "audit-tool" && <PolicyAuditTool />}
              {activeTab === "domains" && (
                <PolicyDomainsExplorer onSelectDomainForAudit={handleSelectDomainForAudit} />
              )}
              {activeTab === "accountability" && <GovernmentAccountabilityTracker />}
              {activeTab === "conflict-checker" && (
                <PolicyConflictChecker
                  onAuditPolicy={(claimText) => {
                    setActiveTab("audit-tool");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
              {activeTab === "opposition" && <OppositionAlternativeMatrix />}
              {activeTab === "youth-literacy" && <YouthCivicLiteracyHub />}
              {activeTab === "kenya-2060" && (
                <Kenya2060ContinuityCharter
                  onAuditTopic={(topic) => {
                    setActiveTab("audit-tool");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
              {activeTab === "questionnaire" && <CandidateQuestionnaireBuilder />}
              {activeTab === "county-map" && (
                <KenyaDevolutionGeoMap
                  onAuditProjectClaim={(claimTitle, domain) => {
                    setActiveTab("audit-tool");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              )}
              {activeTab === "media-standards" && <MediaStandardsView />}
              {activeTab === "influence-network" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      Political, Legislative & Special Interest Lobbying Graph
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Interactive D3 force-directed network mapping dynamic influence, Article 118 citizen submissions, corporate sponsorships, and constitutional litigation between leaders, statutory bills, and civil society lobbies.
                    </p>
                  </div>
                  <PolicyInfluenceNetworkGraph />
                </div>
              )}
            </main>

            {/* Footer */}
            <Footer
              setActiveTab={setActiveTab}
              onOpenPledge={() => setIsPledgeModalOpen(true)}
            />

            {/* 2027 Civic Pledge Modal */}
            <CivicPledgeModal
              isOpen={isPledgeModalOpen}
              onClose={() => setIsPledgeModalOpen(false)}
            />

            {/* Civic Watchlist Drawer & Side-by-Side Compare Modal */}
            <CivicWatchlistDrawer />
            <CivicWatchlistCompareModal />
          </div>
        </CivicWatchlistProvider>
      </CivicAccessibilityProvider>
    </LanguageProvider>
  );
}

