import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Home, 
  Layers, 
  Lock, 
  Mail, 
  Phone, 
  Sparkles, 
  User, 
  X,
  MapPin,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { submitLeadToGoogleSheet } from "../lib/submitLead";
import { Answer, Question, UnitLayout, UtmParams } from "../types";
import { QUESTIONS } from "../data/questions";
import { UNITS } from "../data/units";
import FloorPlanSvg from "./FloorPlanSvg";

interface QuestionnaireProps {
  utmParams: UtmParams;
  ctaSource: string;
  selectedUnitFromCta: string | null;
  onClose: () => void;
  onTrackEvent: (event: string, data: Record<string, any>) => void;
  savedAnswers: Answer[];
  onSaveAnswers: (answers: Answer[]) => void;
}

export default function Questionnaire({
  utmParams,
  ctaSource,
  selectedUnitFromCta,
  onClose,
  onTrackEvent,
  savedAnswers,
  onSaveAnswers
}: QuestionnaireProps) {
  // State: 'entry' | 'questioning' | 'recommendation' | 'registration' | 'thankyou'
  const [funnelStep, setFunnelStep] = useState<"entry" | "questioning" | "recommendation" | "registration" | "thankyou">(
    savedAnswers.length === 8 ? "recommendation" : "entry"
  );
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>(savedAnswers);
  const [recommendedUnit, setRecommendedUnit] = useState<UnitLayout | null>(null);
  const [recommendation, setRecommendation] = useState<{
    category: "TypeA" | "TypeB" | "TypeC_C1" | "Financing" | "General";
    title: string;
    heading: string;
    dynamicMessage: string;
    matchedBenefits: string[];
  } | null>(null);
  
  // Registration Form State
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+60"); // Default Malaysia prefix
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  // Synchronize pre-saved answers
  useEffect(() => {
    if (savedAnswers.length === 8 && !recommendation) {
      calculateAndShowRecommendation(savedAnswers, true);
    }
  }, [savedAnswers]);

  // Trigger screen entry view event
  useEffect(() => {
    if (funnelStep === "entry") {
      onTrackEvent("questionnaire_entry_view", {
        ctaSource,
        selectedUnitFromCta,
        utmParams,
        timestamp: new Date().toISOString()
      });
    }
  }, [funnelStep]);

  // Handle Start My Assessment
  const handleStartAssessment = () => {
    setFunnelStep("questioning");
    setCurrentQuestionIndex(0);
    onTrackEvent("questionnaire_start", {
      ctaSource,
      selectedUnitFromCta,
      utmParams,
      timestamp: new Date().toISOString()
    });
  };

  // Handle Option Select
  const handleOptionSelect = (question: Question, optionId: string, optionText: string, scores: any) => {
    const updatedAnswer: Answer = {
      questionId: question.id,
      questionText: question.text,
      selectedOptionId: optionId,
      selectedOptionText: optionText,
      scores
    };

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = updatedAnswer;
    setAnswers(newAnswers);
    onSaveAnswers(newAnswers); // Keep state synced

    // Trigger step complete event
    onTrackEvent("questionnaire_step_complete", {
      questionId: question.id,
      questionText: question.text,
      selectedOptionId: optionId,
      selectedOptionText: optionText,
      stepNumber: currentQuestionIndex + 1,
      totalSteps: 8,
      utmParams,
      timestamp: new Date().toISOString()
    });

    // Move Forward automatically with subtle timeout for animation feel
    setTimeout(() => {
      if (currentQuestionIndex < 7) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Completed all 8 questions! Calculate recommendation details but direct to registration (lead capture)
        calculateAndShowRecommendation(newAnswers, false);
        setFunnelStep("registration");
      }
    }, 250);
  };

  // Calculate recommendation based on answer scores
  const calculateAndShowRecommendation = (finalAnswers: Answer[], goToRecommendationStep = false) => {
    onTrackEvent("questionnaire_complete", {
      answersCount: finalAnswers.length,
      utmParams,
      timestamp: new Date().toISOString()
    });

    const tallies = { 
      TypeA: 0, 
      TypeB: 0, 
      TypeC_C1: 0, 
      Financing: 0, 
      General: 0 
    };
    
    // Sum scores from answers
    finalAnswers.forEach(ans => {
      tallies.TypeA += ans.scores.TypeA || 0;
      tallies.TypeB += ans.scores.TypeB || 0;
      tallies.TypeC_C1 += ans.scores.TypeC_C1 || ans.scores.TypeC || ans.scores.TypeC1 || 0;
      tallies.Financing += ans.scores.Financing || 0;
      tallies.General += ans.scores.General || 0;
    });

    // If a unit was clicked originally, we give it a tiny bias
    if (selectedUnitFromCta) {
      if (selectedUnitFromCta === "TypeA") {
        tallies.TypeA += 2;
      } else if (selectedUnitFromCta === "TypeB") {
        tallies.TypeB += 2;
      } else if (selectedUnitFromCta === "TypeC" || selectedUnitFromCta === "TypeC1") {
        tallies.TypeC_C1 += 2;
      }
    }

    // Determine highest score category
    const categories: Array<"TypeA" | "TypeB" | "TypeC_C1" | "Financing" | "General"> = ["TypeA", "TypeB", "TypeC_C1", "Financing", "General"];
    let highestCategory = categories[0];
    let maxScore = -1;

    for (const key of categories) {
      if (tallies[key] > maxScore) {
        maxScore = tallies[key];
        highestCategory = key;
      }
    }

    // Match category with title, heading, dynamic message, and default units
    let title = "";
    let heading = "Your Property Direction Is Ready";
    let dynamicMessage = "";
    let recommended = UNITS[1]; // fallback

    if (highestCategory === "TypeA") {
      title = "Type A Direction";
      dynamicMessage = "Based on your answers, a comfortable 2-bedroom standard layout may suit your preference for an elegant primary residence, low entry cost, and excellent city connectivity. This option could be worth considering for your lifestyle needs, subject to current availability.";
      recommended = UNITS[0]; // Type A
    } else if (highestCategory === "TypeB") {
      title = "Type B Dual Key Direction";
      dynamicMessage = "Based on your answers, a 2-bedroom dual-key layout may suit your need for additional privacy, flexible space, or a dedicated home workspace while keeping family connected. This layout could be worth considering to simplify your routines, subject to current availability.";
      recommended = UNITS[1]; // Type B
    } else if (highestCategory === "TypeC_C1") {
      title = "Type C or C1 Dual Key Direction";
      dynamicMessage = "Based on your answers, a spacious 3-bedroom dual-key layout may suit your priorities of multi-generational comfort, family space, and extra privacy. This choice could be worth considering to secure independent living zones under one roof, subject to current availability.";
      
      // Pick between Type C and Type C1 based on budget selection if possible, otherwise default to Type C
      const budgetAnswer = finalAnswers.find(a => a.questionId === 6);
      if (budgetAnswer && budgetAnswer.selectedOptionText.includes("Above RM1,200,000")) {
        recommended = UNITS[3]; // Type C1
      } else {
        recommended = UNITS[2]; // Type C
      }
    } else if (highestCategory === "Financing") {
      title = "Financing Consultation";
      dynamicMessage = "Based on your answers, navigating KL property financing and eligibility may suit your current focus. We can assist you with professional loan assessment and flexible payment options, subject to current availability.";
      recommended = UNITS[0]; // Type A (sweet spot entry)
    } else if (highestCategory === "General") {
      title = "General Project Consultation";
      dynamicMessage = "Based on your answers, a personalized exploration of the freehold lifestyle, premium transit options, and flexible layouts at Binastra Cochrane could be worth considering to find your perfect fit, subject to current availability.";
      recommended = UNITS[1]; // Type B (high versatility)
    }

    // Select exactly 3 matched benefits
    const benefitScores = {
      mrt: 0,
      freehold: 1, // baseline
      dualKey: 0,
      twoBed: 0,
      threeBed: 0,
      coworking: 0,
      children: 0,
      shopping: 0,
      financing: 0
    };

    if (highestCategory === "TypeA") {
      benefitScores.twoBed += 5;
      benefitScores.freehold += 3;
    } else if (highestCategory === "TypeB") {
      benefitScores.dualKey += 5;
      benefitScores.twoBed += 4;
    } else if (highestCategory === "TypeC_C1") {
      benefitScores.threeBed += 5;
      benefitScores.dualKey += 3;
    } else if (highestCategory === "Financing") {
      benefitScores.financing += 5;
    } else if (highestCategory === "General") {
      benefitScores.freehold += 5;
    }

    finalAnswers.forEach(ans => {
      const txt = ans.selectedOptionText.toLowerCase();

      if (txt.includes("traffic") || txt.includes("work") || txt.includes("transport") || txt.includes("mrt")) {
        benefitScores.mrt += 2;
      }
      if (txt.includes("budget") || txt.includes("commitment") || txt.includes("eligibility") || txt.includes("financing")) {
        benefitScores.financing += 2;
      }
      if (txt.includes("workspace") || txt.includes("coworking") || txt.includes("gym")) {
        benefitScores.coworking += 2;
      }
      if (txt.includes("parent") || txt.includes("children") || txt.includes("kids") || txt.includes("family")) {
        benefitScores.children += 1;
        if (highestCategory === "TypeC_C1") benefitScores.threeBed += 2;
      }
      if (txt.includes("groceries") || txt.includes("shopping") || txt.includes("essentials")) {
        benefitScores.shopping += 2;
      }
      if (txt.includes("dual-key") || txt.includes("separate") || txt.includes("privacy")) {
        benefitScores.dualKey += 2;
      }
    });

    const benefitMap: Record<string, string> = {
      mrt: "Near MRT connectivity",
      freehold: "Freehold ownership",
      dualKey: "Dual-key flexibility",
      twoBed: "2-bedroom practicality",
      threeBed: "3-bedroom family space",
      coworking: "Coworking facilities",
      children: "Children’s facilities",
      shopping: "Shopping convenience",
      financing: "Financing assistance"
    };

    const sortedBenefits = Object.entries(benefitScores)
      .sort((a, b) => b[1] - a[1])
      .map(entry => benefitMap[entry[0]]);

    const matchedBenefits = Array.from(new Set(sortedBenefits)).slice(0, 3);

    setRecommendedUnit(recommended);
    setRecommendation({
      category: highestCategory,
      title,
      heading,
      dynamicMessage,
      matchedBenefits
    });
    
    if (goToRecommendationStep) {
      setFunnelStep("recommendation");
    }

    // Track recommendation view
    onTrackEvent("recommendation_view", {
      recommendedUnitId: recommended.id,
      recommendedUnitName: recommended.name,
      recommendedCategory: highestCategory,
      scoreTallies: tallies,
      utmParams,
      timestamp: new Date().toISOString()
    });
  };

  // Handle go back in questionnaire
  const handleStepBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setFunnelStep("entry");
    }
  };

  // Handle registration start click
  const handleReceiveRecommendation = () => {
    setFunnelStep("registration");
    onTrackEvent("registration_start", {
      recommendedUnitId: recommendedUnit?.id,
      utmParams,
      timestamp: new Date().toISOString()
    });
  };

  // Form submit handler
  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errors: {
    name?: string;
    email?: string;
    phone?: string;
  } = {};

  if (!leadName.trim()) {
    errors.name = "Full Name is required";
  }

  if (!leadEmail.trim()) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(leadEmail)) {
    errors.email = "Please enter a valid email address";
  }

  if (!leadPhone.trim()) {
    errors.phone = "WhatsApp number is required";
  } else if (leadPhone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid WhatsApp number";
  }

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  setFormErrors({});
  setSubmissionError("");
  setIsSubmitting(true);

  const fullPhoneNumber = `${phonePrefix} ${leadPhone.trim()}`;

  try {
    await submitLeadToGoogleSheet({
      name: leadName.trim(),
      email: leadEmail.trim(),
      phone: fullPhoneNumber,
      recommendedUnitName: recommendedUnit?.name,
      ctaSource,
      utmParams,
      answers
    });

    onTrackEvent("generate_lead", {
      name: leadName.trim(),
      email: leadEmail.trim(),
      phone: fullPhoneNumber,
      recommendedUnitId: recommendedUnit?.id,
      recommendedUnitName: recommendedUnit?.name,
      ctaSource,
      utmParams,
      answers,
      timestamp: new Date().toISOString()
    });

    setFunnelStep("recommendation");
  } catch (error) {
    console.error(error);

    setSubmissionError(
      "Unable to submit your registration. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  // Handle whatsapp click
  const handleWhatsAppAppointment = () => {
    onTrackEvent("whatsapp_click", {
      name: leadName,
      phone: `${phonePrefix} ${leadPhone}`,
      recommendedUnitId: recommendedUnit?.id,
      timestamp: new Date().toISOString()
    });

    // Generate a beautiful localized whatsapp message
    const message = `Hello Binastra Cochrane sales team, I have completed my property-matching assessment and would like to arrange an appointment. Name: ${leadName}, Recommended: ${recommendedUnit?.name}.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=60122798277&text=${encoded}`, "_blank");
  };

  const activeQuestion = QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / 8) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/80 backdrop-blur-md flex items-center justify-center p-0 md:p-4">
      {/* Container - full screen on mobile, elegant card modal on desktop */}
      <div className="w-full min-h-screen md:min-h-0 md:max-w-3xl bg-beige-natural md:rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between border-t-4 border-primary-natural">
        
        {/* Header - standard across funnel */}
        <div className="px-6 py-4 border-b border-primary-natural/10 flex justify-between items-center bg-white">
          <div className="flex items-center space-x-2">
            <span className="text-xxs uppercase tracking-widest font-mono text-accent-natural font-bold bg-primary-natural/5 py-1 px-2.5 rounded">
              Assessment Funnel
            </span>
            {funnelStep === "questioning" && (
              <span className="text-xs text-neutral-500 font-mono">
                Step {currentQuestionIndex + 1} of 8
              </span>
            )}
          </div>
          
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-primary-natural p-1.5 rounded-full hover:bg-neutral-100 transition-colors flex items-center space-x-1 cursor-pointer"
            title="Back to Project"
          >
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Back to Project</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Funnel Content Body */}
        <div className="flex-grow p-6 sm:p-10 flex flex-col justify-center min-h-[450px]">
          <AnimatePresence mode="wait">
            
            {/* 1. ENTRY SCREEN */}
            {funnelStep === "entry" && (
              <motion.div
                key="entry-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4 text-center">
                  <div className="w-14 h-14 bg-primary-natural/10 rounded-full flex items-center justify-center mx-auto border border-accent-natural/20">
                    <Sparkles className="w-7 h-7 text-primary-natural" />
                  </div>
                  <h2 className="text-2xl sm:text-3.5xl font-serif font-medium text-primary-natural leading-tight">
                    Let’s Find a Property Direction That Fits You
                  </h2>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                    Tell us about your current challenges, priorities and future plans. Your answers will help us suggest a suitable Binastra Cochrane layout or consultation direction.
                  </p>
                </div>

                {/* 3 Reassurance Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 border-t border-b border-neutral-200/60 py-6">
                  <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-natural/5 flex items-center justify-center text-primary-natural flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-accent-natural" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-800">Eight quick questions</span>
                  </div>

                  <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-natural/5 flex items-center justify-center text-primary-natural flex-shrink-0">
                      <Clock className="w-4 h-4 text-accent-natural" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-800">Takes approximately one minute</span>
                  </div>

                  <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-primary-natural/5 flex items-center justify-center text-primary-natural flex-shrink-0">
                      <Lock className="w-4 h-4 text-accent-natural" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-800">No contact details required until ready</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                  <button
                    onClick={handleStartAssessment}
                    className="flex-1 bg-primary-natural hover:bg-primary-natural/90 text-white font-bold tracking-wide py-4 px-6 rounded-lg shadow-lg shadow-primary-natural/10 border border-accent-natural/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Start My Assessment</span>
                    <ArrowRight className="w-4 h-4 text-white/80" />
                  </button>
                  <button
                    onClick={onClose}
                    className="sm:w-1/3 bg-transparent hover:bg-neutral-200/50 text-neutral-700 border border-neutral-300 font-bold py-4 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    Back to Project
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. QUESTIONING STATE */}
            {funnelStep === "questioning" && activeQuestion && (
              <motion.div
                key={`question-${activeQuestion.id}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                {/* Progress bar visual */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                    <span>Progress: {progressPercent}%</span>
                    <span>Q{currentQuestionIndex + 1} of 8</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-natural transition-all duration-300" 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question title */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif text-primary-natural font-medium leading-tight">
                    {activeQuestion.text}
                  </h3>
                  {activeQuestion.description && (
                    <p className="text-xs sm:text-sm text-neutral-500">{activeQuestion.description}</p>
                  )}
                </div>

                {/* Option list */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {activeQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestionIndex]?.selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionSelect(activeQuestion, opt.id, opt.text, opt.scores)}
                        className={`w-full p-4 rounded-xl text-left border transition-all flex items-start space-x-3.5 group cursor-pointer ${
                          isSelected
                            ? "bg-primary-natural/5 border-primary-natural shadow-sm ring-1 ring-primary-natural"
                            : "bg-white border-neutral-200 hover:border-primary-natural/50 hover:bg-beige-natural"
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected 
                            ? "border-primary-natural bg-primary-natural text-white" 
                            : "border-neutral-300 group-hover:border-primary-natural bg-white"
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent-natural"></div>}
                        </div>
                        <div className="flex-grow">
                          <h4 className={`text-sm sm:text-base font-semibold leading-tight ${
                            isSelected ? "text-primary-natural" : "text-neutral-800"
                          }`}>
                            {opt.text}
                          </h4>
                          {opt.description && (
                            <p className="text-xs text-neutral-500 mt-1">{opt.description}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Insight Box */}
                {activeQuestion.insight && (
                  <div className="bg-primary-natural/5 border border-primary-natural/10 rounded-xl p-4 flex items-start space-x-3 text-neutral-700 text-xs sm:text-sm mt-2">
                    <Sparkles className="w-4.5 h-4.5 text-accent-natural flex-shrink-0 mt-0.5 animate-pulse" />
                    <p className="italic leading-relaxed">
                      <strong>Insight:</strong> "{activeQuestion.insight}"
                    </p>
                  </div>
                )}

                {/* Navigation Back button */}
                <div className="pt-4 flex justify-start">
                  <button
                    onClick={handleStepBack}
                    className="text-xs sm:text-sm font-semibold text-neutral-500 hover:text-primary-natural flex items-center space-x-1.5 py-2 px-4 rounded-lg hover:bg-neutral-200/55 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{currentQuestionIndex === 0 ? "Back to Start" : "Previous Question"}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. RECOMMENDATION VIEW */}
            {funnelStep === "recommendation" && recommendation && (
              <motion.div
                key="recommendation-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="space-y-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-natural/10 rounded-full flex items-center justify-center mx-auto border border-accent-natural/20">
                  <Sparkles className="w-8 h-8 text-primary-natural animate-pulse" />
                </div>

                <div className="space-y-2">
                  <span className="text-xxs uppercase tracking-widest font-mono text-accent-natural font-bold bg-primary-natural/5 py-1 px-2.5 rounded">
                    {recommendation.title}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-primary-natural font-medium leading-none">
                    {recommendation.heading}
                  </h2>
                </div>

                {/* Card containing dynamic suggestion and details */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 text-left shadow-sm max-w-lg mx-auto space-y-4">
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-serif italic text-center px-2">
                    "{recommendation.dynamicMessage}"
                  </p>

                  <div className="pt-4 border-t border-neutral-100 space-y-3">
                    <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono text-center">
                      Top 3 Matched Highlights
                    </h5>
                    
                    <div className="grid grid-cols-1 gap-2.5 max-w-sm mx-auto pt-1">
                      {recommendation.matchedBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-3 bg-beige-natural/40 rounded-lg p-2.5 border border-primary-natural/5">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-800">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {recommendedUnit && (
                    <div className="pt-4 border-t border-neutral-100 space-y-3">
                      <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono text-center">
                        Floor Plan Blueprint
                      </h5>
                      <FloorPlanSvg unitId={recommendedUnit.id} />
                    </div>
                  )}

                  {/* Pricing/Disclaimer footer in card */}
                  <div className="pt-3 border-t border-neutral-100 bg-beige-natural/50 -mx-6 -mb-6 p-4 rounded-b-2xl flex flex-col sm:flex-row justify-between items-center gap-2">
                    {recommendedUnit && (
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-wide block">Recommended layout price guide</span>
                        <span className="block font-serif text-sm font-bold text-primary-natural">
                          {recommendedUnit.name} ({recommendedUnit.size}): {recommendedUnit.priceEstimate}
                        </span>
                      </div>
                    )}
                    <span className="text-[9px] text-neutral-400 italic max-w-[200px] text-center sm:text-right leading-tight">
                      *Subject to current availability. This assessment is for informational matching purposes and does not constitute financial advice.
                    </span>
                  </div>
                </div>

                {/* Next Step action */}
                <div className="pt-4 space-y-4 max-w-lg mx-auto">
                  {leadName && (
                    <div className="text-sm text-neutral-600 bg-white/60 p-3 rounded-lg border border-primary-natural/10">
                      Thank you, <strong className="text-primary-natural">{leadName}</strong>! Your personalized matching assessment is saved. A summary is being whatsapp to you phone.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleWhatsAppAppointment}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide py-4 px-6 rounded-lg shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all border border-emerald-500/20"
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                      <span>Book WhatsApp Tour</span>
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="bg-primary-natural hover:bg-primary-natural/90 text-white font-bold tracking-wide py-4 px-6 rounded-lg shadow-md flex items-center justify-center space-x-1.5 cursor-pointer transition-all border border-accent-natural/20"
                    >
                      <span>Return to Project</span>
                    </button>
                  </div>
                  
                  <p className="text-xs text-neutral-400 italic">
                    We will be in touch with you shortly to provide the full e-brochure and coordinate your showroom invitation.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 4. REGISTRATION FORM (Lead Capture right after Q8) */}
            {funnelStep === "registration" && (
              <motion.div
                key="registration-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-md mx-auto"
              >
                <div className="space-y-2 text-center">
                  <div className="w-12 h-12 bg-primary-natural/10 rounded-full flex items-center justify-center mx-auto border border-accent-natural/20">
                    <Sparkles className="w-6 h-6 text-primary-natural animate-pulse" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-primary-natural font-medium leading-tight">
                    Your Personalized Match is Ready!
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm">
                    Enter your name, email, and WhatsApp number to view your property direction assessment results, customized floor plans, and VIP starting price guides.
                  </p>
                </div>

                {/* Form fields */}
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide block">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input 
                        type="text" 
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-natural focus:border-primary-natural transition-all"
                      />
                    </div>
                    {formErrors.name && <p className="text-xs text-red-600 font-medium">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide block">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input 
                        type="email" 
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-natural focus:border-primary-natural transition-all"
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-600 font-medium">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-600 uppercase tracking-wide block">WhatsApp No.</label>
                    <div className="flex space-x-2">
                      <select 
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        className="p-3 bg-white border border-neutral-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary-natural"
                      >
                        <option value="+60">+60 (MY)</option>
                        <option value="+65">+65 (SG)</option>
                        <option value="+62">+62 (ID)</option>
                        <option value="+852">+852 (HK)</option>
                        <option value="+1">+1 (US)</option>
                      </select>
                      
                      <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input 
                          type="tel" 
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="123456789"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-natural focus:border-primary-natural transition-all"
                        />
                      </div>
                    </div>
                    {formErrors.phone && <p className="text-xs text-red-600 font-medium">{formErrors.phone}</p>}
                  </div>

                  {/* Reassurance Badge */}
                  <div className="bg-white/60 p-3 rounded-lg border border-primary-natural/10 flex items-center space-x-2 text-xxs text-neutral-500">
                    <Lock className="w-4 h-4 text-accent-natural flex-shrink-0" />
                    <span>Your privacy is protected. We will only contact you regarding Binastra Cochrane layout details and showroom invitations.</span>
                  </div>

                  {submissionError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {submissionError}
                  </div>
                )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-natural hover:bg-primary-natural/90 text-white font-bold tracking-wide py-4 px-6 rounded-lg shadow-md border border-accent-natural/20 flex items-center justify-center space-x-1.5 cursor-pointer mt-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>
                      {isSubmitting ? "Submitting..." : "View Property Match Results"}
                    </span>

                    {!isSubmitting && (
                      <ArrowRight className="w-4 h-4 text-white/80" />
                    )}
                  </button>
                </form>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      setFunnelStep("questioning");
                      setCurrentQuestionIndex(7);
                    }}
                    className="text-xs text-neutral-400 hover:text-primary-natural font-semibold flex items-center justify-center space-x-1 mx-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Questions</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 5. THANK YOU PAGE */}
            {funnelStep === "thankyou" && (
              <motion.div
                key="thankyou-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 text-center"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-serif text-primary-natural font-medium leading-none">
                    Assessment Registered!
                  </h2>
                  <p className="text-neutral-600 text-sm sm:text-base max-w-md mx-auto">
                    Thank you, <strong className="text-neutral-800">{leadName}</strong>! Your personalized property recommendation for the <strong className="text-primary-natural">{recommendedUnit?.name}</strong> layout is officially locked in.
                  </p>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    A copy of the comprehensive brochures, floorplans, and VIP pricing is being compiled and dispatched to: <strong>{leadEmail}</strong>.
                  </p>
                </div>

                {recommendedUnit && (
                  <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 text-left shadow-sm max-w-md mx-auto space-y-3">
                    <h4 className="font-serif font-bold text-neutral-800 text-sm sm:text-base text-center border-b border-neutral-100 pb-2">
                      Your Recommended {recommendedUnit.name} Layout
                    </h4>
                    <FloorPlanSvg unitId={recommendedUnit.id} />
                  </div>
                )}

                {/* CTA appointment box */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-md mx-auto space-y-4 shadow-sm">
                  <div className="space-y-1.5">
                    <span className="text-accent-natural font-mono text-xxs font-bold uppercase tracking-widest block">Immediate Showroom Access</span>
                    <h4 className="font-serif font-bold text-neutral-800 text-base leading-tight">Book a Priority Showroom Tour via WhatsApp</h4>
                    <p className="text-xs text-neutral-500">
                      Skip the queue and secure direct one-on-one consultation with our development specialists right now.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleWhatsAppAppointment}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide py-3.5 px-6 rounded-lg shadow border border-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 text-white" />
                    <span>Book WhatsApp Appointment</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="text-xs font-semibold text-primary-natural hover:underline"
                  >
                    Return to Project Sales Page
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer info showing security and trust */}
        <div className="px-6 py-4 bg-white border-t border-neutral-200/60 flex justify-between items-center text-xxs text-neutral-400">
          <span>Official Developer Campaign</span>
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-accent-natural" />
            <span>Secure 256-Bit SSL Encryption</span>
          </span>
        </div>

      </div>
    </div>
  );
}
