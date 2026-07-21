import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Building, 
  MapPin, 
  Compass, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Coffee, 
  CheckCircle2, 
  Waves,
  Car,
  DollarSign
} from "lucide-react";
import { UNITS } from "../data/units";
import { INDOOR_FACILITIES, OUTDOOR_FACILITIES } from "../data/facilities";

interface SalesPageProps {
  onLearnMore: (source: string, selectedUnit?: string) => void;
}

export default function SalesPage({ onLearnMore }: SalesPageProps) {
  const [activeFacilityTab, setActiveFacilityTab] = useState<"outdoor" | "indoor">("outdoor");
  const [selectedUnitInfo, setSelectedUnitInfo] = useState<string>("TypeB");

  const painPoints = [
    {
      title: "Choking KL Traffic Commutes",
      desc: "Spending hours stuck on Jalan Tun Razak or Jalan Cheras daily just to get to work.",
      solution: "Binastra Cochrane is right next to Cochrane MRT Station. Get to Tun Razak Exchange (TRX) in 1 stop, and Bukit Bintang / Pavilion in 2 stops!"
    },
    {
      title: "Co-Living Friction & Lost Privacy",
      desc: "Living with parents, grown kids, or roommates means compromising on schedules, kitchens, and private spaces.",
      solution: "Our Dual-Key layouts (Type B, C, C1) split your home into two independent domains behind a double foyer. Live together, but with separate keys."
    },
    {
      title: "Leasehold Expiry Anxiety",
      desc: "Buying a leasehold unit means watching the remaining years tick down, lowering resale value for future generations.",
      solution: "Binastra Cochrane is 100% Freehold. Secure a permanent generational asset in a highly coveted central Kuala Lumpur location."
    },
    {
      title: "Low Rental Yields vs High Mortgages",
      desc: "Traditional single-key units yield a single rent check, which often fails to cover premium monthly mortgages.",
      solution: "Renting out a Dual-Key property yields two separate rental checks (e.g. rent out the studio and the 2-bed), maximizing your yield!"
    }
  ];

  const specs = [
    { label: "Developer", value: "Binastra Synergy Sdn. Bhd." },
    { label: "Land Tenure", value: "Freehold Residential Land" },
    { label: "Expected Completion", value: "60 months" },
    { label: "Total Units", value: "830 Units (Tower A: 415 | Tower B: 415)" },
    { label: "Selling Price", value: "RM 721,800 to RM 1,428,800" },
    { label: "Maintenance Fee", value: "Est. RM0.45 / sq.ft." },
    { label: "Car Parks", value: "1,007 Lots (960 Resident, 13 EV Charger ready)" },
    { label: "Security", value: "Multi-tier high-level security clearance" }
  ];

  return (
    <div id="sales-page" className="bg-bg-natural text-dark-natural min-h-screen font-sans selection:bg-primary-natural/20 selection:text-primary-natural">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-bg-natural/90 backdrop-blur-md border-b border-primary-natural/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-natural flex items-center justify-center rounded-lg shadow-md border border-accent-natural/20">
              <span className="text-white font-serif font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-primary-natural font-serif font-bold text-lg tracking-wider leading-none">BINASTRA COCHRANE</h1>
              <span className="text-accent-natural font-mono text-xxs tracking-widest font-bold">KUALA LUMPUR • FREEHOLD</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-neutral-600">
            <a href="#about" className="hover:text-primary-natural transition-colors">Overview</a>
            <a href="#location" className="hover:text-primary-natural transition-colors">Location</a>
            <a href="#layouts" className="hover:text-primary-natural transition-colors">Layouts</a>
            <a href="#dual-key" className="hover:text-primary-natural transition-colors">Dual-Key</a>
            <a href="#facilities" className="hover:text-primary-natural transition-colors">Facilities</a>
          </nav>
          <button 
            id="nav-cta-btn"
            onClick={() => onLearnMore("hero_learn_more")}
            className="bg-primary-natural hover:bg-primary-natural/90 text-white text-xs md:text-sm font-bold uppercase tracking-wider py-2.5 px-5 rounded-md shadow-md border border-accent-natural/10 transition-all cursor-pointer"
          >
            KNOW MORE
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-primary-natural/5 to-transparent border-b border-primary-natural/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-primary-natural/10 text-primary-natural font-mono text-xs font-bold uppercase tracking-wider rounded-full border border-primary-natural/25">
              <Sparkles className="w-3.5 h-3.5 text-accent-natural" />
              <span>Central Cochrane, KL City</span>
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary-natural leading-tight tracking-tight">
              Prestige Living. <br />
              <span className="text-accent-natural font-normal">Permanent Legacy.</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl">
              A high-end 100% Freehold development adjacent to Cochrane MRT and IKEA KL. Designed with revolutionary dual-key configurations for progressive family living and dual-yield investment.
            </p>
            
            <div className="pt-4 space-y-3">
              <button
                id="hero-cta-btn"
                onClick={() => {
                  const element = document.getElementById("layouts");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto bg-primary-natural hover:bg-primary-natural/90 text-white font-bold tracking-wide text-base py-4 px-8 rounded-md shadow-lg shadow-primary-natural/10 border border-accent-natural/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>VIEW FLOOR PLAN</span>
                <ArrowRight className="w-5 h-5 text-white/85 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-neutral-500 italic">
                Answer a short property-matching questionnaire to view your recommended floor plan.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200">
              <div>
                <span className="block font-serif text-2xl md:text-3xl font-bold text-primary-natural">Freehold</span>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider">Land Tenure</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl font-bold text-primary-natural">830</span>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider">Total Units (Low Density)</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl font-bold text-primary-natural">1 Stop</span>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider">To TRX MRT</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase - Realistic luxury building render */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl shadow-2xl overflow-hidden border-2 border-accent-natural/30 group">
              {/* Background Building Render Image */}
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
                alt="Binastra Cochrane Twin Luxury Towers"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Soft dark gradient overlay for typography readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/40 to-neutral-950/75 z-0"></div>
              
              {/* Premium luxury card details */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                <div className="flex justify-between items-start">
                  <span className="text-beige-natural border border-beige-natural/40 bg-primary-natural/80 backdrop-blur px-3 py-1 text-xs font-mono rounded tracking-wider shadow-sm">
                    BINASTRA COCHRANE
                  </span>
                  <div className="text-right bg-neutral-950/30 backdrop-blur-xs px-3 py-1.5 rounded border border-white/5">
                    <span className="block text-white text-xl font-serif font-bold tracking-tight">RM 721k+</span>
                    <span className="text-beige-natural/90 text-[10px] uppercase block font-mono tracking-wider">Starting Price</span>
                  </div>
                </div>

                {/* Building render container info overlay */}
                <div className="relative my-auto flex flex-col items-center justify-center text-center space-y-3 py-6">
                  <div className="bg-primary-natural/95 backdrop-blur px-4 py-1.5 rounded border border-beige-natural/20 shadow-lg text-xxs font-mono text-beige-natural uppercase tracking-widest font-semibold animate-pulse">
                    Official Render Preview
                  </div>
                  <div>
                    <h3 className="text-white font-serif text-2xl md:text-3xl font-medium tracking-wide drop-shadow-md">Twin Luxury Towers</h3>
                    <p className="text-neutral-200 text-xs max-w-xs mx-auto mt-2 leading-relaxed drop-shadow-sm">
                      Adjacent to Cochrane MRT Station & walking distance to IKEA Cheras & MyTOWN Shopping Centre.
                    </p>
                  </div>
                  <div className="bg-primary-natural/90 backdrop-blur px-4 py-2 rounded-lg border border-beige-natural/20 flex items-center space-x-2 text-xs text-white shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-beige-natural" />
                    <span>Jalan Cochrane, Kuala Lumpur</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-neutral-300 border-t border-white/10 pt-4 font-mono tracking-wider">
                  <span>© BINASTRA SYNERGY SDN BHD</span>
                  <span className="text-beige-natural uppercase font-medium">Freehold Serviced Residence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Introduction */}
      <section id="about" className="py-20 bg-bg-natural">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-accent-natural font-mono">Welcome to Your Next Chapter</h3>
            <h2 className="text-3xl md:text-4xl font-serif text-primary-natural font-medium leading-tight">
              Sophisticated Architecture Meets Optimal City Connectivity
            </h2>
            <div className="w-16 h-0.5 bg-accent-natural/40 mx-auto"></div>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Binastra Cochrane raises the bar for metropolitan living in Kuala Lumpur. Featuring two sleek towers housing 415 units each, this premium freehold estate offers residents a sanctuary of over 70 resort-inspired facilities, while anchoring them directly to KL's premier lifestyle and commercial epicenters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {specs.map((spec, i) => (
              <div key={i} className="p-6 bg-beige-natural rounded-xl border border-primary-natural/10 shadow-sm space-y-2">
                <span className="block text-xs font-mono uppercase tracking-wider text-accent-natural font-bold">{spec.label}</span>
                <span className="block text-lg font-serif font-medium text-primary-natural">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Pain Points Section */}
      <section className="py-20 bg-beige-natural border-t border-b border-primary-natural/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest">The Realities of KL Living</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary-natural">
              Solving the Frustrations of Urban Homebuyers
            </h2>
            <p className="text-neutral-600">
              Why settle for standard apartments when you can secure a home engineered to alleviate daily urban challenges?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((item, idx) => (
              <div key={idx} className="bg-bg-natural p-8 rounded-2xl shadow-sm border border-neutral-150 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-red-800">
                    <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-red-600"></span>
                    <div>
                      <h4 className="text-lg font-bold font-serif text-neutral-800">{item.title}</h4>
                      <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="bg-primary-natural/5 p-4 rounded-xl border border-primary-natural/10 space-y-2 mt-4">
                    <h5 className="text-xs font-bold text-primary-natural uppercase tracking-wider flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-accent-natural" />
                      <span>The Binastra Solution</span>
                    </h5>
                    <p className="text-sm text-neutral-700 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section id="location" className="py-20 bg-bg-natural">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest block">Unbeatable Proximity</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary-natural leading-tight">
                Transit-Oriented Mastery at Cochrane, KL
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Positioned directly on Jalan Cochrane, the location offers seamless link bridges or short walk accesses to crucial conveniences. Never get stuck in traffic again with world-class MRT lines right at your doorstep.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-natural/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-natural" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 font-serif">IKEA Cheras & MyTOWN Shopping Centre</h4>
                    <p className="text-sm text-neutral-500">Virtually next door. Groceries, shopping, home decor and dining are steps away.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-natural/10 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-primary-natural" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 font-serif">1 MRT Stop to Tun Razak Exchange (TRX)</h4>
                    <p className="text-sm text-neutral-500">Commute to KL’s brand-new world-class financial district and exchange station in under 3 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-natural/10 flex items-center justify-center flex-shrink-0">
                    <Compass className="w-5 h-5 text-primary-natural" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 font-serif">Highly Connected Schools Network</h4>
                    <p className="text-sm text-neutral-500">Within immediate reach of SK & SMK Cochrane Perkasa, SK & SMK Cochrane, and SK & SMP Convent Jalan Peel.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="location-cta-btn"
                  onClick={() => onLearnMore("location_learn_more")}
                  className="bg-transparent hover:bg-primary-natural/5 text-primary-natural border border-primary-natural font-bold text-sm tracking-wide py-3 px-6 rounded-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>VIEW FLOOR PLAN & CONNECTIVITY</span>
                  <ArrowRight className="w-4 h-4 text-accent-natural" />
                </button>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="lg:col-span-7 bg-beige-natural rounded-2xl p-8 border border-primary-natural/10 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#5A5A40_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center border-b border-primary-natural/15 pb-4">
                  <h3 className="font-serif text-primary-natural text-xl font-medium">Destinations Within Reach</h3>
                  <span className="text-xs bg-primary-natural text-white py-1 px-3.5 rounded-full font-mono font-bold uppercase tracking-wider">MRT Line 1 Connected</span>
                </div>

                <div className="relative flex flex-col space-y-4">
                  {/* Styled Subway Line Path Visual */}
                  <div className="absolute left-4 top-2 bottom-2 w-1 bg-gradient-to-b from-accent-natural to-primary-natural rounded"></div>

                  <div className="flex items-start space-x-4 pl-8 relative">
                    <div className="absolute left-[11px] w-3.5 h-3.5 rounded-full bg-white border-2 border-accent-natural flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-natural"></div>
                    </div>
                    <div>
                      <span className="text-xxs font-mono uppercase text-accent-natural font-bold tracking-widest block">Start Station</span>
                      <h4 className="font-bold text-neutral-800 text-sm">Maluri Station (Interchange)</h4>
                      <p className="text-xs text-neutral-500">LRT Interchange station connectively linked.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 pl-8 relative bg-primary-natural/5 p-2.5 rounded-lg border border-primary-natural/10">
                    <div className="absolute left-[11px] w-3.5 h-3.5 rounded-full bg-white border-2 border-primary-natural flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-natural animate-ping"></div>
                    </div>
                    <div>
                      <span className="text-xxs font-mono uppercase text-primary-natural font-bold tracking-widest block">Direct Connection</span>
                      <h4 className="font-bold text-neutral-800 text-sm">Cochrane Station (Next to Project)</h4>
                      <p className="text-xs text-neutral-500">Binastra Cochrane is strategically sited adjacent here.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 pl-8 relative">
                    <div className="absolute left-[11px] w-3.5 h-3.5 rounded-full bg-white border-2 border-neutral-400 flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                    </div>
                    <div>
                      <span className="text-xxs font-mono uppercase text-neutral-400 font-bold tracking-widest block">1 Station Away</span>
                      <h4 className="font-bold text-neutral-800 text-sm">Tun Razak Exchange (TRX) Station</h4>
                      <p className="text-xs text-neutral-500">KL’s luxury lifestyle retail destination and financial center.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 pl-8 relative">
                    <div className="absolute left-[11px] w-3.5 h-3.5 rounded-full bg-white border-2 border-neutral-400 flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                    </div>
                    <div>
                      <span className="text-xxs font-mono uppercase text-neutral-400 font-bold tracking-widest block">2 Stations Away</span>
                      <h4 className="font-bold text-neutral-800 text-sm">Bukit Bintang MRT Station</h4>
                      <p className="text-xs text-neutral-500">Directly accesses Pavilion KL, Lot 10, Starhill, and food hubs.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 pl-8 relative">
                    <div className="absolute left-[11px] w-3.5 h-3.5 rounded-full bg-white border-2 border-neutral-400 flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                    </div>
                    <div>
                      <span className="text-xxs font-mono uppercase text-neutral-400 font-bold tracking-widest block">3 Stations Away</span>
                      <h4 className="font-bold text-neutral-800 text-sm">Merdeka Station</h4>
                      <p className="text-xs text-neutral-500">Accessing Merdeka 118, the world's second tallest tower.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Layouts Section */}
      <section id="layouts" className="py-20 bg-beige-natural border-t border-primary-natural/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest block">The Masterpieces</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary-natural">
              Exclusive Serviced Residence Layouts
            </h2>
            <p className="text-neutral-600">
              Select layouts perfectly configured with dual-key functionality. Find your perfect fit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {UNITS.map((unit) => (
              <div 
                key={unit.id}
                className="bg-bg-natural rounded-2xl border border-neutral-200/60 hover:border-primary-natural/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Header */}
                <div className="p-6 bg-gradient-to-br from-primary-natural/5 to-transparent border-b border-neutral-100 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-primary-natural text-xl font-bold group-hover:text-accent-natural transition-colors">
                      {unit.name}
                    </h3>
                    <p className="text-sm font-mono text-neutral-500 mt-1">{unit.size}</p>
                  </div>
                  {unit.isDualKey ? (
                    <span className="bg-primary-natural text-white text-xxs px-2.5 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                      Dual Key
                    </span>
                  ) : (
                    <span className="bg-neutral-100 text-neutral-600 text-xxs px-2.5 py-1 rounded-full font-mono tracking-wider uppercase">
                      Single Key
                    </span>
                  )}
                </div>

                {/* Specs */}
                <div className="p-6 space-y-4 flex-grow">
                  <div className="flex justify-between items-center text-xs text-neutral-500 border-b border-neutral-100 pb-3">
                    <span className="flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{unit.bedrooms} Bedrooms</span>
                    </span>
                    <span>{unit.bathrooms} Bathrooms</span>
                  </div>

                  <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {unit.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {unit.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-neutral-600 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-natural flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer and CTA */}
                <div className="p-6 border-t border-neutral-100 bg-beige-natural/50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xxs text-neutral-400 uppercase font-mono tracking-wide">Starting from</span>
                    <span className="text-sm font-serif font-bold text-primary-natural">{unit.priceEstimate.split(" - ")[0]}</span>
                  </div>
                  <button
                    id={`learn-more-${unit.id.toLowerCase()}`}
                    onClick={() => onLearnMore(`${unit.id.toLowerCase()}_learn_more`, unit.id)}
                    className="w-full bg-primary-natural hover:bg-primary-natural/90 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-md transition-all shadow-sm border border-accent-natural/20 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>VIEW FLOOR PLAN</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual-Key Explanation */}
      <section id="dual-key" className="py-20 bg-bg-natural border-b border-primary-natural/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual breakdown diagram */}
            <div className="lg:col-span-6 relative">
              <div className="bg-beige-natural rounded-3xl p-8 border-2 border-primary-natural/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-natural/10 p-10 rounded-bl-full"></div>
                
                <h3 className="font-serif text-primary-natural text-xl font-bold mb-6 flex items-center space-x-2">
                  <Layers className="w-6 h-6 text-accent-natural" />
                  <span>The Dual-Key Architectural Blueprint</span>
                </h3>

                {/* Mock Floor Plan Graphic */}
                <div className="border border-neutral-200 bg-white rounded-2xl p-6 relative">
                  <div className="absolute top-3 left-3 bg-primary-natural text-white font-mono text-xxs font-bold px-2 py-0.5 rounded tracking-widest">
                    SINGLE MAIN ENTRANCE FOYER
                  </div>

                  <div className="grid grid-cols-12 gap-4 mt-8 pt-4 border-t-2 border-dashed border-primary-natural/20">
                    {/* Main Suite */}
                    <div className="col-span-7 bg-primary-natural/5 rounded-xl p-4 border border-primary-natural/10 relative">
                      <span className="absolute -top-2.5 left-2 bg-primary-natural text-white text-[9px] px-2 py-0.5 rounded font-bold font-mono">
                        KEY 1: THE SUITE
                      </span>
                      <div className="space-y-2 text-neutral-700 text-xs mt-2">
                        <p className="font-bold text-primary-natural">Main Residence Space</p>
                        <p>✓ 1-2 Bedrooms</p>
                        <p>✓ 1-2 Bathrooms</p>
                        <p>✓ Living & Dining Hall</p>
                        <p>✓ Master Kitchen & Yard</p>
                      </div>
                    </div>

                    {/* Studio Suite */}
                    <div className="col-span-5 bg-accent-natural/10 rounded-xl p-4 border border-accent-natural/30 relative">
                      <span className="absolute -top-2.5 left-2 bg-accent-natural text-white text-[9px] px-2 py-0.5 rounded font-bold font-mono">
                        KEY 2: THE STUDIO
                      </span>
                      <div className="space-y-2 text-neutral-700 text-xs mt-2">
                        <p className="font-bold text-primary-natural">Accessory Studio</p>
                        <p>✓ 1 Bedroom / Bed area</p>
                        <p>✓ 1 En-suite Bathroom</p>
                        <p>✓ Kitchenette space</p>
                        <p>✓ 100% Autonomous entry</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-around items-center text-xs text-neutral-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-natural"></span>
                      <span>Owner-Stay Suite</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent-natural"></span>
                      <span>Tenant or Guest Suite</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest block">Revolutionary Design</span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary-natural">
                One Title. Two Fully Autonomous Living Domains.
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                A dual-key apartment features a primary secure double-foyer system. Beyond the main door, you find two separate doors leading to the Master Suite and the secondary Studio. This offers a wide array of options for modern buyers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2 bg-beige-natural p-5 rounded-xl border border-neutral-150">
                  <h4 className="font-bold font-serif text-primary-natural text-base flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent-natural" />
                    <span>The Rental Booster</span>
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Maximise cashflow. Rent out both Key 1 and Key 2 to two separate professional tenants for higher total yield than single-key properties.
                  </p>
                </div>

                <div className="space-y-2 bg-beige-natural p-5 rounded-xl border border-neutral-150">
                  <h4 className="font-bold font-serif text-primary-natural text-base flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-accent-natural" />
                    <span>The Mortgage Helper</span>
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Stay comfortably in the Master Suite and lease the Studio key to an office commuter or student. Let their rental payment offset your monthly home loan.
                  </p>
                </div>

                <div className="space-y-2 bg-beige-natural p-5 rounded-xl border border-neutral-150">
                  <h4 className="font-bold font-serif text-primary-natural text-base flex items-center space-x-2">
                    <Users className="w-5 h-5 text-accent-natural" />
                    <span>Multi-Generation Comfort</span>
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Keep your aging parents or independent grown-up children nearby. Everyone maintains absolute privacy under one roof, sharing no walls if desired.
                  </p>
                </div>

                <div className="space-y-2 bg-beige-natural p-5 rounded-xl border border-neutral-150">
                  <h4 className="font-bold font-serif text-primary-natural text-base flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-accent-natural" />
                    <span>Home Business / HQ</span>
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Set up your executive remote work studio in the accessory flat without cluttering or disturbing your family home next door.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="dual-key-cta-btn"
                  onClick={() => onLearnMore("dual_key_learn_more")}
                  className="bg-primary-natural hover:bg-primary-natural/90 text-white font-bold text-sm tracking-wide py-4 px-8 rounded-md transition-all shadow-md border border-accent-natural/20 flex items-center space-x-2 cursor-pointer"
                >
                  <span>VIEW DUAL KEY FLOOR PLANS</span>
                  <ArrowRight className="w-5 h-5 text-white/80" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-20 bg-beige-natural">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest block">World-Class Conveniences</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary-natural">
              Over 70 Signature Resort Facilities
            </h2>
            <p className="text-neutral-600">
              Spread strategically across Level 1, Level 7, Level 25, and Level 51. Indulge in an unparalleled luxury lifestyle.
            </p>

            {/* Segment Tab Controls */}
            <div className="flex justify-center pt-6">
              <div className="bg-neutral-200/80 p-1.5 rounded-lg inline-flex space-x-2 border border-neutral-300">
                <button
                  onClick={() => setActiveFacilityTab("outdoor")}
                  className={`px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeFacilityTab === "outdoor"
                      ? "bg-primary-natural text-white shadow"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Outdoor Facilities
                </button>
                <button
                  onClick={() => setActiveFacilityTab("indoor")}
                  className={`px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeFacilityTab === "indoor"
                      ? "bg-primary-natural text-white shadow"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Indoor Facilities
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-bg-natural rounded-3xl p-8 border border-primary-natural/10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeFacilityTab === "outdoor" ? OUTDOOR_FACILITIES : INDOOR_FACILITIES).map((facility, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3.5 p-4 rounded-xl hover:bg-beige-natural border border-transparent hover:border-primary-natural/10 transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-natural/5 group-hover:bg-primary-natural/15 flex items-center justify-center flex-shrink-0 transition-all">
                    {activeFacilityTab === "outdoor" ? (
                      <Waves className="w-4 h-4 text-accent-natural" />
                    ) : (
                      <Coffee className="w-4 h-4 text-accent-natural" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold font-serif text-sm text-neutral-800 leading-tight group-hover:text-primary-natural transition-colors">
                      {facility.name}
                    </h4>
                    <span className="text-xxs font-mono text-neutral-400 uppercase tracking-widest mt-0.5 block">
                      {facility.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-neutral-100 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-neutral-500 max-w-xl">
                *Level 7 features the signature 1.2m Infinity Pool, 0.15m Shallow Splash Deck, Half Basketball Court, and the fully-equipped Gymnasium overlooking the Cochrane city skyline.
              </p>
              <button
                id="facilities-cta-btn"
                onClick={() => onLearnMore("facilities_learn_more")}
                className="bg-primary-natural hover:bg-primary-natural/90 text-white text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-md shadow border border-accent-natural/20 flex items-center space-x-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>VIEW FLOOR PLAN & FACILITIES</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights Grid */}
      <section className="py-20 bg-bg-natural">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest block">Signature Summary</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-primary-natural">
              Why Choose Binastra Cochrane?
            </h2>
            <p className="text-neutral-600">
              Four undeniable advantages making this the most highly-anticipated Kuala Lumpur development of the year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4 p-6 rounded-2xl bg-beige-natural/50 border border-primary-natural/10">
              <div className="w-12 h-12 rounded-xl bg-primary-natural/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary-natural" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-800">100% Freehold Ownership</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Enjoy permanent freehold status in central Kuala Lumpur, securing stable capital appreciation and an inherited legacy asset with zero tenure expiry anxieties.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-beige-natural/50 border border-primary-natural/10">
              <div className="w-12 h-12 rounded-xl bg-primary-natural/15 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-natural" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-800">Next to IKEA & MRT Cochrane</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Walk easily to IKEA Cheras, MyTOWN and MRT Cochrane Station. Access TRX financial hub in just 1 MRT stop, and Bukit Bintang / Pavilion in 2 stops.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-beige-natural/50 border border-primary-natural/10">
              <div className="w-12 h-12 rounded-xl bg-primary-natural/15 flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary-natural" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-800">High-Yield Dual Key Models</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Unlock two distinct rental streams from a single purchase title. Rent the studio and the 2-bed independently to increase gross rental cashflows.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-beige-natural/50 border border-primary-natural/10">
              <div className="w-12 h-12 rounded-xl bg-primary-natural/15 flex items-center justify-center">
                <Waves className="w-6 h-6 text-primary-natural" />
              </div>
              <h4 className="font-serif font-bold text-lg text-neutral-800">Over 70 Signature Conveniences</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Spread across four levels. Features a grand infinity pool, co-working lounges, multiple sky gardens, half-court basketball, and a stunning sky cinema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SALES-PAGE SECTION */}
      <section className="py-24 bg-gradient-to-t from-primary-natural/10 to-transparent border-t border-primary-natural/15 relative overflow-hidden">
        {/* Abstract pattern decoration */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#8E8E8E_2px,transparent_2px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <span className="text-accent-natural font-mono text-xs font-bold uppercase tracking-widest block">Personalized Evaluation</span>
          <h2 className="text-3xl md:text-5xl font-serif text-primary-natural font-medium leading-tight">
            Could Binastra Cochrane Be the Right Fit for You?
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-4 text-neutral-700 text-base md:text-lg leading-relaxed">
            <p>
              Your ideal property depends on more than its size or price. Your commute, household needs, privacy preferences, lifestyle and future plans all matter.
            </p>
            <p className="font-medium text-primary-natural">
              Answer eight quick questions to view the official floor plan blueprint matching your profile.
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <button
              id="final-cta-btn"
              onClick={() => onLearnMore("final_cta_learn_more")}
              className="w-full sm:w-auto bg-primary-natural hover:bg-primary-natural/90 text-white text-lg font-bold uppercase tracking-wider py-4.5 px-10 rounded-md shadow-xl border border-accent-natural/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>VIEW FLOOR PLAN</span>
              <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-neutral-500">
              Takes approximately one minute. No obligation to purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Footer and Legal Disclaimer */}
      <footer className="bg-[#2D2D22] text-neutral-400 py-16 border-t border-white/5 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          {/* Main Footer Info */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-beige-natural flex items-center justify-center rounded">
                <span className="text-primary-natural font-serif font-bold text-base">B</span>
              </div>
              <span className="text-white font-serif font-bold text-sm tracking-wider">BINASTRA COCHRANE</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Central Kuala Lumpur freehold premium serviced residences. Redefining modern urban standard with dual-key layouts and premium connectivity.
            </p>
          </div>

          <div className="border-t border-white/5 pt-6 text-center text-neutral-500 text-xxs flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© 2026 Binastra Synergy Sdn. Bhd. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#about" className="hover:underline text-neutral-500">Privacy Policy</a>
              <a href="#about" className="hover:underline text-neutral-500">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-natural/95 backdrop-blur-md border-t border-primary-natural/10 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold leading-none">Binastra Cochrane</span>
          <span className="text-sm font-serif font-bold text-primary-natural mt-0.5">Freehold KL Residence</span>
        </div>
        <button
          id="sticky-mobile-cta"
          onClick={() => onLearnMore("sticky_mobile_bottom_bar")}
          className="bg-primary-natural hover:bg-primary-natural/90 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded shadow border border-accent-natural/20 cursor-pointer"
        >
          VIEW FLOOR PLAN
        </button>
      </div>

    </div>
  );
}
