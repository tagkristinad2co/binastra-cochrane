import React, { useEffect, useState } from "react";
import SalesPage from "./components/SalesPage";
import Questionnaire from "./components/Questionnaire";
import { Answer, UtmParams } from "./types";

const getUtmParams = (): UtmParams => {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term")
  };
};

export default function App() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState<Answer[]>([]);
  const [ctaSource, setCtaSource] = useState<string>("hero_learn_more");
  const [selectedUnitFromCta, setSelectedUnitFromCta] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null
  });

  useEffect(() => {
    setUtmParams(getUtmParams());

    const handleHashChange = () => {
      const isAssessmentRoute =
        window.location.hash === "#assessment" ||
        window.location.hash === "#/assessment";

      setIsQuestionnaireOpen(isAssessmentRoute);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const trackEvent = (event: string, data: Record<string, unknown>) => {
    console.log(`[ANALYTICS EVENT]: ${event}`, data);
  };

  const handleLearnMoreClick = (source: string, selectedUnit?: string) => {
    setCtaSource(source);
    setSelectedUnitFromCta(selectedUnit || null);

    trackEvent("learn_more_click", {
      ctaSource: source,
      selectedUnit: selectedUnit || null,
      pageUrl: window.location.href,
      utmParams,
      timestamp: new Date().toISOString()
    });

    window.location.hash = "assessment";
  };

  const handleCloseQuestionnaire = () => {
    window.location.hash = "";
  };

  return (
    <div className="relative min-h-screen bg-[#faf7f2]">
      <SalesPage onLearnMore={handleLearnMoreClick} />

      {isQuestionnaireOpen && (
        <Questionnaire
          utmParams={utmParams}
          ctaSource={ctaSource}
          selectedUnitFromCta={selectedUnitFromCta}
          onClose={handleCloseQuestionnaire}
          onTrackEvent={trackEvent}
          savedAnswers={savedAnswers}
          onSaveAnswers={setSavedAnswers}
        />
      )}
    </div>
  );
}