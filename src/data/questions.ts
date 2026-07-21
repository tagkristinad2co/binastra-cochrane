import { Question } from "../types";
import { PROJECT_CONFIG } from "../config";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What affects your daily lifestyle the most?",
    insight: "A well-connected home near MRT access, shopping and employment areas may help simplify daily routines.",
    options: [
      {
        id: "1a",
        text: "Spending too much time in traffic",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 1 }
      },
      {
        id: "1b",
        text: "Living too far from work",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 1 }
      },
      {
        id: "1c",
        text: "Limited access to public transport",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 1 }
      },
      {
        id: "1d",
        text: "Travelling far for shopping and essentials",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 0, General: 2 }
      },
      {
        id: "1e",
        text: "My current location already works well",
        scores: { TypeA: 0, TypeB: 0, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 0, General: 3 }
      }
    ]
  },
  {
    id: 2,
    text: "What is your biggest concern about buying a KL property?",
    insight: "Different unit sizes and layouts allow buyers to explore options based on budget, lifestyle and household needs.",
    options: [
      {
        id: "2a",
        text: "The property may be beyond my budget",
        scores: { TypeA: 2, TypeB: 1, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 4, General: 0 }
      },
      {
        id: "2b",
        text: "Monthly commitments may be too high",
        scores: { TypeA: 2, TypeB: 1, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 4, General: 0 }
      },
      {
        id: "2c",
        text: "I am unsure about my loan eligibility",
        scores: { TypeA: 1, TypeB: 1, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 5, General: 0 }
      },
      {
        id: "2d",
        text: "I cannot find the right layout",
        scores: { TypeA: 1, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 2 }
      },
      {
        id: "2e",
        text: "I am only researching at this stage",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 0, General: 3 }
      }
    ]
  },
  {
    id: 3,
    text: "What is your current home lacking?",
    insight: "Binastra Cochrane offers 2- and 3-bedroom choices, including selected dual-key configurations.",
    options: [
      {
        id: "3a",
        text: "An extra bedroom",
        scores: { TypeA: 3, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 0 }
      },
      {
        id: "3b",
        text: "A proper home workspace",
        scores: { TypeA: 1, TypeB: 4, TypeC: 3, TypeC1: 3, TypeC_C1: 3, Financing: 0, General: 0 }
      },
      {
        id: "3c",
        text: "More family space",
        scores: { TypeA: 0, TypeB: 1, TypeC: 4, TypeC1: 4, TypeC_C1: 5, Financing: 0, General: 0 }
      },
      {
        id: "3d",
        text: "More privacy",
        scores: { TypeA: 0, TypeB: 4, TypeC: 4, TypeC1: 4, TypeC_C1: 4, Financing: 0, General: 0 }
      },
      {
        id: "3e",
        text: "Space for parents or adult children",
        scores: { TypeA: 0, TypeB: 2, TypeC: 4, TypeC1: 4, TypeC_C1: 5, Financing: 0, General: 0 }
      },
      {
        id: "3f",
        text: "My existing space is sufficient",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 0, General: 3 }
      }
    ]
  },
  {
    id: 4,
    text: "Would separate living zones help your household?",
    insight: "Selected dual-key layouts can provide more privacy and flexibility within one property.",
    options: [
      {
        id: "4a",
        text: "Yes, for parents",
        scores: { TypeA: 0, TypeB: 1, TypeC: 4, TypeC1: 4, TypeC_C1: 5, Financing: 0, General: 0 }
      },
      {
        id: "4b",
        text: "Yes, for adult children",
        scores: { TypeA: 0, TypeB: 2, TypeC: 4, TypeC1: 4, TypeC_C1: 5, Financing: 0, General: 0 }
      },
      {
        id: "4c",
        text: "Yes, for guests or a home office",
        scores: { TypeA: 1, TypeB: 4, TypeC: 3, TypeC1: 3, TypeC_C1: 3, Financing: 0, General: 0 }
      },
      {
        id: "4d",
        text: "Yes, for flexible occupancy",
        scores: { TypeA: 0, TypeB: 5, TypeC: 4, TypeC1: 4, TypeC_C1: 4, Financing: 0, General: 0 }
      },
      {
        id: "4e",
        text: "No, I prefer a standard layout",
        scores: { TypeA: 5, TypeB: 0, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 0, General: 0 }
      },
      {
        id: "4f",
        text: "I need an explanation of dual-key living",
        scores: { TypeA: 1, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 4 }
      }
    ]
  },
  {
    id: 5,
    text: "What daily inconvenience would you most like to reduce?",
    insight: "The project combines shopping convenience with family, work, fitness and leisure facilities.",
    options: [
      {
        id: "5a",
        text: "Travelling far for groceries and shopping",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 2 }
      },
      {
        id: "5b",
        text: "Paying separately for gym or coworking access",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 2 }
      },
      {
        id: "5c",
        text: "Limited recreation for children",
        scores: { TypeA: 0, TypeB: 1, TypeC: 4, TypeC1: 4, TypeC_C1: 4, Financing: 0, General: 1 }
      },
      {
        id: "5d",
        text: "Difficulty managing parcel deliveries",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 0, General: 2 }
      },
      {
        id: "5e",
        text: "Not having enough leisure space",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 0, General: 2 }
      },
      {
        id: "5f",
        text: "None of these",
        scores: { TypeA: 0, TypeB: 0, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 0, General: 3 }
      }
    ]
  },
  {
    id: 6,
    text: "What property budget are you currently considering?",
    insight: "Our representative can help identify suitable options based on current pricing, availability and financing considerations.",
    options: [
      {
        id: "6a",
        text: PROJECT_CONFIG.budgetRanges.range1,
        scores: { TypeA: 5, TypeB: 1, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 2, General: 0 }
      },
      {
        id: "6b",
        text: PROJECT_CONFIG.budgetRanges.range2,
        scores: { TypeA: 1, TypeB: 5, TypeC: 2, TypeC1: 1, TypeC_C1: 2, Financing: 1, General: 0 }
      },
      {
        id: "6c",
        text: PROJECT_CONFIG.budgetRanges.range3,
        scores: { TypeA: 0, TypeB: 2, TypeC: 5, TypeC1: 3, TypeC_C1: 5, Financing: 1, General: 0 }
      },
      {
        id: "6d",
        text: PROJECT_CONFIG.budgetRanges.range4,
        scores: { TypeA: 0, TypeB: 1, TypeC: 4, TypeC1: 5, TypeC_C1: 5, Financing: 0, General: 1 }
      },
      {
        id: "6e",
        text: "I need financing guidance first",
        scores: { TypeA: 1, TypeB: 1, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 5, General: 0 }
      },
      {
        id: "6f",
        text: "I have not decided",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 1, General: 4 }
      }
    ]
  },
  {
    id: 7,
    text: "When would you consider making a purchase?",
    insight: "Knowing your timeline helps the project team provide information that matches your stage of consideration.",
    options: [
      {
        id: "7a",
        text: "Within one month",
        scores: { TypeA: 3, TypeB: 3, TypeC: 3, TypeC1: 3, TypeC_C1: 3, Financing: 1, General: 1 }
      },
      {
        id: "7b",
        text: "Within one to three months",
        scores: { TypeA: 3, TypeB: 3, TypeC: 3, TypeC1: 3, TypeC_C1: 3, Financing: 1, General: 1 }
      },
      {
        id: "7c",
        text: "Within three to six months",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 1, General: 2 }
      },
      {
        id: "7d",
        text: "More than six months",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 1, General: 3 }
      },
      {
        id: "7e",
        text: "I am just researching",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 1, General: 4 }
      }
    ]
  },
  {
    id: 8,
    text: "What would help you take the next step?",
    insight: "A project representative can focus on the information most relevant to your concern.",
    options: [
      {
        id: "8a",
        text: "See suitable layouts",
        scores: { TypeA: 3, TypeB: 3, TypeC: 3, TypeC1: 3, TypeC_C1: 3, Financing: 0, General: 1 }
      },
      {
        id: "8b",
        text: "Receive the latest price and availability",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 1, General: 2 }
      },
      {
        id: "8c",
        text: "Understand dual-key living",
        scores: { TypeA: 0, TypeB: 4, TypeC: 4, TypeC1: 4, TypeC_C1: 4, Financing: 0, General: 2 }
      },
      {
        id: "8d",
        text: "Check financing eligibility",
        scores: { TypeA: 1, TypeB: 1, TypeC: 0, TypeC1: 0, TypeC_C1: 0, Financing: 5, General: 0 }
      },
      {
        id: "8e",
        text: "Visit the sales gallery",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 1, General: 2 }
      },
      {
        id: "8f",
        text: "Speak through WhatsApp first",
        scores: { TypeA: 2, TypeB: 2, TypeC: 2, TypeC1: 2, TypeC_C1: 2, Financing: 1, General: 2 }
      },
      {
        id: "8g",
        text: "Receive information before speaking to anyone",
        scores: { TypeA: 1, TypeB: 1, TypeC: 1, TypeC1: 1, TypeC_C1: 1, Financing: 1, General: 3 }
      }
    ]
  }
];
