import { UnitLayout } from "../types";

export const UNITS: UnitLayout[] = [
  {
    id: "TypeA",
    name: "Type A",
    size: "649 sq. ft.",
    bedrooms: 2,
    bathrooms: 2,
    isDualKey: false,
    features: [
      "Efficient Single-Key Layout",
      "Spacious Living & Dining Hall",
      "En-suite Master Bathroom",
      "Modern Compact Kitchen",
      "Ideal for Young Professionals & Couples"
    ],
    description: "Type A is a cozy, highly efficient 2-bedroom home. Crafted for young professionals and couples seeking an entry-luxury residence right in the city hub. Enjoy full access to all level 7/25/51 facilities with the lowest maintenance fees.",
    priceEstimate: "RM 721,800 - RM 830,000"
  },
  {
    id: "TypeB",
    name: "Type B (Dual Key)",
    size: "763 sq. ft.",
    bedrooms: 2,
    bathrooms: 2,
    isDualKey: true,
    features: [
      "Smart Dual-Key Design",
      "Double Foyer Split",
      "Independent Studio Suite with En-suite",
      "Main Suite with Separate Kitchen & Bedroom",
      "Exceptional High-Yield Investment Choice"
    ],
    description: "Type B features a smart dual-key system in a compact 763 sq. ft. frame. Perfect for savvy investors or hybrid residents. You can live in the main suite and rent out the studio, or lease both keys separately for multiple passive income streams.",
    priceEstimate: "RM 850,000 - RM 980,000"
  },
  {
    id: "TypeC",
    name: "Type C (Dual Key)",
    size: "1008 sq. ft.",
    bedrooms: 3,
    bathrooms: 3,
    isDualKey: true,
    features: [
      "Expansive 3-Bedroom Dual Key",
      "Spacious Balcony off Living Room",
      "Separate Private Studio Suite",
      "Full Yard area for laundry & drying",
      "Perfect balance of Family living & Rental yield"
    ],
    description: "Type C offers a generous 1008 sq. ft. of living space with 3 bedrooms and 3 bathrooms. The dual-key setup allows multi-generational families to live under one roof with absolute personal privacy. Includes an expansive balcony and yard.",
    priceEstimate: "RM 1,100,000 - RM 1,280,000"
  },
  {
    id: "TypeC1",
    name: "Type C1 (Dual Key)",
    size: "1026 sq. ft.",
    bedrooms: 3,
    bathrooms: 3,
    isDualKey: true,
    features: [
      "Premium Largest Dual-Key Layout",
      "Extra Wide Balcony & Living Hall",
      "Fully Isolated Studio Suite",
      "Large Kitchen & Dedicated Yard Area",
      "The Ultimate Luxury Family Residence"
    ],
    description: "Type C1 is the crown jewel of Binastra Cochrane layouts, boasting 1026 sq. ft. of pure luxury. This 3-bed, 3-bath dual-key apartment features an extra-wide open-plan living and dining hall, plus premium view orientations.",
    priceEstimate: "RM 1,200,000 - RM 1,428,800"
  }
];
