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
import { CivicPledgeModal } from "./components/CivicPledgeModal";
import { CivicWatchlistDrawer } from "./components/CivicWatchlistDrawer";
import { CivicWatchlistCompareModal } from "./components/CivicWatchlistCompareModal";
import { CivicWatchlistProvider } from "./context/CivicWatchlistContext";
import { CivicAccessibilityProvider } from "./context/CivicAccessibilityContext";
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
            {activeTab === "opposition" && <OppositionAlternativeMatrix />}
            {activeTab === "youth-literacy" && <YouthCivicLiteracyHub />}
            {activeTab === "kenya-2060" && <Kenya2060ContinuityCharter />}
            {activeTab === "questionnaire" && <CandidateQuestionnaireBuilder />}
            {activeTab === "media-standards" && <MediaStandardsView />}
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
  );
}

