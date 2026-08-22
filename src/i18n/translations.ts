export type Language = "en" | "sw";

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    sw: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Brand & Header
  "app.title": {
    en: "Kenya 2027: Policy Audit Platform",
    sw: "Kenya 2027: Jukwaa la Ukaguzi wa Sera"
  },
  "app.tagline": {
    en: "The Great Competition of Ideas — Grounded in Evidence, the Constitution & Vision 2060",
    sw: "Shindano Kubwa la Mawazo — Likiongozwa na Ushahidi, Katiba na Dira ya Kenya 2060"
  },
  "app.constitution_subtext": {
    en: "Non-Partisan Civic Scrutiny Infrastructure (Articles 1, 10, 35, 201 & 232)",
    sw: "Miundombinu Huru ya Ukaguzi wa Kiraia (Ibara za 1, 10, 35, 201 na 232)"
  },
  "app.official_language_badge": {
    en: "Official National Languages (Art. 7)",
    sw: "Lugha Rasmi za Taifa (Ibara ya 7)"
  },

  // Language Dropdown
  "lang.select_language": {
    en: "Language",
    sw: "Lugha"
  },
  "lang.english": {
    en: "English",
    sw: "Kiingereza"
  },
  "lang.swahili": {
    en: "Kiswahili",
    sw: "Kiswahili"
  },
  "lang.switch_to_swahili": {
    en: "Badilisha lugha iwe Kiswahili",
    sw: "Badilisha lugha iwe Kiswahili"
  },
  "lang.switch_to_english": {
    en: "Switch language to English",
    sw: "Switch language to English"
  },
  "lang.current_lang": {
    en: "Current: English",
    sw: "Iliyopo: Kiswahili"
  },

  // Navigation Tabs
  "nav.audit_tool": {
    en: "Policy Audit Tool",
    sw: "Ukaguzi wa Sera"
  },
  "nav.domains": {
    en: "12 Policy Domains",
    sw: "Nyanja 12 za Sera"
  },
  "nav.devolution_map": {
    en: "Devolution GeoMap",
    sw: "Ramani ya Ugatuzi"
  },
  "nav.conflict_checker": {
    en: "Conflict Checker",
    sw: "Mchunguzi wa Migongano"
  },
  "nav.accountability": {
    en: "Govt Accountability",
    sw: "Uwajibikaji wa Serikali"
  },
  "nav.opposition": {
    en: "Opposition Alternatives",
    sw: "Mbadala wa Upinzani"
  },
  "nav.youth_literacy": {
    en: "Youth & Civic Literacy",
    sw: "Vijana na Uraia"
  },
  "nav.kenya_2060": {
    en: "Kenya 2060 Charter",
    sw: "Mkataba wa Kenya 2060"
  },
  "nav.questionnaire": {
    en: "Candidate Questionnaire",
    sw: "Hojaji ya Wagombea"
  },
  "nav.media_standards": {
    en: "Media & Fact Standards",
    sw: "Viwango vya Habari"
  },

  // Quick Action Buttons in Header
  "action.search": {
    en: "Search platform",
    sw: "Tafuta jukwaani"
  },
  "action.search_placeholder": {
    en: "Search policies, constitution, counties (Ctrl+K)...",
    sw: "Tafuta sera, vifungu vya katiba, kaunti (Ctrl+K)..."
  },
  "action.watchlist": {
    en: "Watchlist",
    sw: "Orodha Yangu"
  },
  "action.notifications": {
    en: "Notifications",
    sw: "Arifa"
  },
  "action.accessibility": {
    en: "Accessibility",
    sw: "Ufikiaji na Sauti"
  },
  "action.daily_digest": {
    en: "Daily Digest",
    sw: "Dondoo za Kila Siku"
  },
  "action.pledge": {
    en: "2027 Civic Pledge",
    sw: "Kiapo cha Mwananchi 2027"
  },
  "action.audio_read": {
    en: "Read Aloud",
    sw: "Soma kwa Sauti"
  },
  "action.audio_stop": {
    en: "Stop Audio",
    sw: "Zima Sauti"
  },
  "action.dark_mode": {
    en: "Dark Mode",
    sw: "Mandhari ya Giza"
  },
  "action.light_mode": {
    en: "Light Mode",
    sw: "Mandhari ya Mwangaza"
  },

  // Common UI Buttons & Badges
  "btn.audit_policy": {
    en: "Audit Policy Proposal",
    sw: "Kagua Pendekezo la Sera"
  },
  "btn.download_report": {
    en: "Download Audit Report (PDF/CSV)",
    sw: "Pakua Ripoti ya Ukaguzi (PDF/CSV)"
  },
  "btn.share": {
    en: "Share",
    sw: "Shiriki"
  },
  "btn.save_watchlist": {
    en: "Save to Watchlist",
    sw: "Weka Kwenye Orodha"
  },
  "btn.compare": {
    en: "Compare",
    sw: "Linganisha"
  },
  "btn.filter": {
    en: "Filter",
    sw: "Chuja"
  },
  "btn.clear": {
    en: "Clear",
    sw: "Futa"
  },
  "btn.close": {
    en: "Close",
    sw: "Funga"
  },
  "btn.view_details": {
    en: "View In-Depth Breakdown",
    sw: "Tazama Uchambuzi wa Kina"
  },
  "btn.take_quiz": {
    en: "Test Civic Knowledge",
    sw: "Pima Uelewa wa Katiba"
  },

  // Status & Scores
  "status.completed": {
    en: "Completed",
    sw: "Imekamilika"
  },
  "status.in_progress": {
    en: "In Progress",
    sw: "Inaendelea"
  },
  "status.delayed": {
    en: "Delayed",
    sw: "Imechelewa"
  },
  "status.under_scrutiny": {
    en: "Under Scrutiny",
    sw: "Inachunguzwa"
  },
  "score.fiscal_realism": {
    en: "Fiscal Realism & Budget Viability",
    sw: "Uhalisia wa Kifedha na Bajeti"
  },
  "score.constitutional_alignment": {
    en: "Constitutional & Legal Viability",
    sw: "Uwiano wa Kikatiba na Kisheria"
  },
  "score.implementation_readiness": {
    en: "Implementation & Institutional Capacity",
    sw: "Uwezo na Utayari wa Utekelezaji"
  },
  "score.kenya_2060_vision": {
    en: "Kenya 2060 Long-Term Alignment",
    sw: "Uwiano na Dira ya Kenya 2060"
  },
  "score.overall_verdict": {
    en: "Composite Democratic Rigor Verdict",
    sw: "Alama ya Jumla ya Ukaguzi wa Kidemokrasia"
  },

  // Audit Tool Headers
  "audit.title": {
    en: "Constitutional & Empirical Policy Audit Engine",
    sw: "Mtambo wa Ukaguzi wa Sera kwa Misingi ya Katiba na Takwimu"
  },
  "audit.subtitle": {
    en: "Evaluate any manifesto pledge, government policy, or political promise against 13 rigorous benchmarks.",
    sw: "Tathmini ahadi yoyote ya ilani, sera ya serikali, au mpango wa kisiasa kwa vigezo 13 vya kikatiba na kiuchumi."
  },
  "audit.input_placeholder": {
    en: "Paste policy proposal, manifesto text, campaign promise, or select a pre-loaded case study...",
    sw: "Bandika pendekezo la sera, kifungu cha ilani, ahadi ya jukwaani, au chagua mfano uliopo..."
  },
  "audit.select_domain": {
    en: "Select Policy Domain",
    sw: "Chagua Nyanja ya Sera"
  },
  "audit.actor_type": {
    en: "Proposing Actor",
    sw: "Mtoa Pendekezo"
  },
  "audit.actor_government": {
    en: "Incumbent Government Policy",
    sw: "Sera ya Serikali Iliyopo Madarakani"
  },
  "audit.actor_opposition": {
    en: "Opposition / Challenger Manifesto",
    sw: "Ilani ya Upinzani / Mshindani"
  },
  "audit.actor_citizen": {
    en: "Citizen / Civil Society Proposal",
    sw: "Pendekezo la Mwananchi / Mashirika ya Kiraia"
  },
  "audit.run_audit_btn": {
    en: "Run 13-Point Constitutional & Fiscal Audit",
    sw: "Tekeleza Ukaguzi wa Vigezo 13 vya Katiba na Fedha"
  },
  "audit.loading_text": {
    en: "Auditing against Article 201, PFM Act, OCoB data & empirical benchmarks...",
    sw: "Inakagua dhidi ya Ibara ya 201, Sheria ya PFM, ripoti za OCoB na takwimu halisi..."
  },

  // Domains Explorer
  "domains.title": {
    en: "12 Critical Policy Arenas Shaping Kenya's Future",
    sw: "Nyanja 12 Muhimu za Sera Zinazochagiza Mustakabali wa Kenya"
  },
  "domains.subtitle": {
    en: "Every candidate must present costed, constitutionally sound plans across these key areas.",
    sw: "Kila mgombea lazima awasilishe mipango iliyogharimiwa na inayotii Katiba katika nyanja hizi."
  },
  "domains.audit_this_domain": {
    en: "Audit a Policy in this Arena",
    sw: "Kagua Sera katika Nyanja Hii"
  },

  // Accountability Tracker
  "accountability.title": {
    en: "Government Accountability & Delivery Scorecard",
    sw: "Kadi ya Uwajibikaji na Utekelezaji wa Ahadi za Serikali"
  },
  "accountability.subtitle": {
    en: "Tracking 2022 manifesto commitments against audited Controller of Budget & Auditor-General records.",
    sw: "Kufuatilia ahadi za ilani ya 2022 dhidi ya taarifa za Mkaguzi Mkuu na Mdhibiti wa Bajeti."
  },

  // Opposition Alternatives
  "opposition.title": {
    en: "Opposition & Alternative Policy Scrutiny Matrix",
    sw: "Tathmini ya Sera Mbadala za Upinzani na Washindani"
  },
  "opposition.subtitle": {
    en: "Holding opposition manifestos to the same rigorous costing, constitutional, and implementation standards.",
    sw: "Kupima ilani za upinzani kwa vigezo sawa vya gharama, uzingatiaji wa Katiba, na utekelezaji."
  },

  // Conflict Checker
  "conflict.title": {
    en: "Policy vs Law Conflict Scanner",
    sw: "Kichunguzi cha Mgongano wa Sera na Sheria"
  },
  "conflict.subtitle": {
    en: "Instant statutory scanning to detect when political proposals violate the Constitution or Kenyan Acts.",
    sw: "Uchunguzi wa papo hapo kubaini iwapo mapendekezo ya kisiasa yanakiuka Katiba au Sheria za Kenya."
  },

  // Kenya 2060 Charter
  "kenya2060.title": {
    en: "Kenya 2060 Intergenerational Continuity Charter",
    sw: "Mkataba wa Muendelezo wa Vizazi Kenya 2060"
  },
  "kenya2060.subtitle": {
    en: "Policies that must transcend 5-year political cycles to ensure generational prosperity and debt sustainability.",
    sw: "Sera zinazopaswa kuvuka vipindi vya uchaguzi vya miaka 5 kulinda uchumi, madeni, na vizazi vijavyo."
  },

  // Devolution Map
  "devolution.title": {
    en: "47 Counties Devolution & Budget Delivery Explorer",
    sw: "Ramani ya Kaunti 47 za Ugatuzi na Utekelezaji wa Bajeti"
  },
  "devolution.subtitle": {
    en: "Explore county allocations, local health/agriculture priorities, and audit devolved project claims.",
    sw: "Chunguza ugawaji wa rasilimali, vipaumbele vya afya na kilimo, na kagua miradi ya ugatuzi."
  },

  // Youth Literacy Hub
  "youth.title": {
    en: "Youth Civic Literacy & Manifesto Slogan Decrypter",
    sw: "Kituo cha Uraia kwa Vijana na Uchambuzi wa Kaulimbiu za Kisiasa"
  },
  "youth.subtitle": {
    en: "Translating political jargon and populist slogans into constitutional accountability demands.",
    sw: "Kubadilisha semi za kisiasa na kaulimbiu kuwa maswali magumu ya wajibu na utekelezaji."
  },

  // Candidate Questionnaire
  "questionnaire.title": {
    en: "2027 Candidate Civic Townhall Questionnaire",
    sw: "Hojaji ya Wananchi kwa Wagombea Uchaguzi wa 2027"
  },
  "questionnaire.subtitle": {
    en: "Generate custom, legally grounded cross-examination questions for town halls, debates, and rallies.",
    sw: "Tengeneza maswali ya kikatiba ya kuwauliza wagombea kwenye mikutano ya hadhara na midahalo."
  },

  // Media Standards
  "media.title": {
    en: "Media Policy Scrutiny & Fact-Checking Framework",
    sw: "Miongozo ya Vyombo vya Habari na Ukaguzi wa Ukweli wa Kauli"
  },
  "media.subtitle": {
    en: "Journalistic standards and verification protocols for covering political debates and policy promises.",
    sw: "Miongozo ya uandishi wa habari za sera na kupima uhalisia wa takwimu za wanasiasa."
  },

  // Daily Civic Digest & Gemini AI Translation
  "digest.modal_title": {
    en: "Daily Civic Scrutiny Digest",
    sw: "Dondoo za Kila Siku za Ukaguzi wa Sera"
  },
  "digest.ai_badge": {
    en: "Gemini 3.7 Flash AI Scrutiny",
    sw: "Uchambuzi wa AI wa Gemini 3.7 Flash"
  },
  "digest.listen_audio": {
    en: "Listen to 50s Audio Briefing",
    sw: "Sikiliza Muhtasari wa Sauti (Sekunde 50)"
  },
  "digest.stop_audio": {
    en: "Stop Audio",
    sw: "Zima Sauti"
  },
  "digest.tailored_for_you": {
    en: "Tailored to Your Saved Watchlist Topics",
    sw: "Imebinafsishwa Kulingana na Mada Zako za Orodha"
  },
  "digest.today_article_201_alert": {
    en: "Critical Article 201 Fiscal Alert",
    sw: "Tahadhari Muhimu ya Kifedha ya Ibara ya 201"
  },
  "digest.translate_with_gemini": {
    en: "Translate with Gemini AI (Kiswahili)",
    sw: "Tafsiri kwa Kiswahili Kupitia Gemini AI"
  },
  "digest.translating": {
    en: "Translating dynamically with Gemini AI...",
    sw: "Inatafsiri kwa Kiswahili kupitia Gemini AI..."
  },
  "digest.browser_detected_sw": {
    en: "Kiswahili language detected from your browser. Switched automatically.",
    sw: "Lugha ya Kiswahili imetambuliwa kutoka kwenye kivinjari chako. Imebadilishwa kiotomatiki."
  },
  "digest.switch_language_prompt": {
    en: "Switch to Kiswahili for national language view (Art. 7)",
    sw: "Badilisha iwe Kiingereza / Switch to English"
  },

  // Footer & Disclaimer
  "footer.disclaimer": {
    en: "Non-Partisan Public Good: This platform does not endorse any candidate or political party. Grounded in the Constitution of Kenya (2010), Article 1 (Sovereign Power of the People), Article 10 (National Values), Article 35 (Access to Information), and Article 7 (Official & National Languages).",
    sw: "Huduma Huru ya Umma: Jukwaa hili haliegemei upande wowote wa kisiasa au mgombea. Limesimikwa kwenye Katiba ya Kenya (2010), Ibara ya 1 (Mamlaka ya Wananchi), Ibara ya 10 (Maadili ya Kitaifa), Ibara ya 35 (Haki ya Kupata Habari), na Ibara ya 7 (Lugha Rasmi na ya Taifa ya Kiswahili)."
  },
  "footer.rights": {
    en: "Kenya 2027: The Great Competition of Ideas. Open Civic Infrastructure.",
    sw: "Kenya 2027: Shindano Kuu la Mawazo ya Sera. Miundombinu Huru ya Kiraia."
  }
};
