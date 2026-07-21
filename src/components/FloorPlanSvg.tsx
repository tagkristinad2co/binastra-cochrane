import React from "react";
import { CheckCircle } from "lucide-react";

interface FloorPlanSvgProps {
  unitId: string; // "TypeA" | "TypeB" | "TypeC" | "TypeC1"
}

export default function FloorPlanSvg({ unitId }: FloorPlanSvgProps) {
  // Define premium styling constants matching the uploaded brochure images
  const wallStroke = "#4E1626"; // Wine/maroon burgundy walls
  const wallFill = "#4E1626"; // Solid dark wine fill for structure walls
  const dividerStroke = "#7C6353"; // Soft bronze-brown partition lines
  const furnitureStroke = "#9E8170"; // Muted bronze-gold for furniture
  const furnitureFill = "#FDFBF7"; // Muted fill for beds/furniture
  const textPrimary = "#33221A"; // Dark charcoal-brown for text
  const textAccent = "#8C6C4E"; // Golden bronze accent
  const dimensionStroke = "#A8988E"; // Grey for dimension markers

  // Render Door Swing helper
  const renderDoor = (x: number, y: number, radius: number, startAngle: number, endAngle: number, flip = false) => {
    const sweepFlag = flip ? 0 : 1;
    const rad1 = (startAngle * Math.PI) / 180;
    const rad2 = (endAngle * Math.PI) / 180;
    const x1 = x + radius * Math.cos(rad1);
    const y1 = y + radius * Math.sin(rad1);
    const x2 = x + radius * Math.cos(rad2);
    const y2 = y + radius * Math.sin(rad2);

    return (
      <g className="opacity-50">
        <line x1={x} y1={y} x2={x1} y2={y1} stroke={dividerStroke} strokeWidth="1" />
        <path
          d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 ${sweepFlag} ${x2} ${y2}`}
          fill="none"
          stroke={dividerStroke}
          strokeWidth="0.8"
          strokeDasharray="1.5,1.5"
        />
      </g>
    );
  };

  // Render Bed helper
  const renderBed = (x: number, y: number, w: number, h: number, rotation = 0) => {
    return (
      <g transform={`translate(${x}, ${y}) rotate(${rotation})`} className="opacity-80">
        <rect x="0" y="0" width={w} height={h} rx="3" fill={furnitureFill} stroke={furnitureStroke} strokeWidth="1" />
        {w > 45 ? (
          <>
            <rect x="5" y="3" width={(w - 15) / 2} height="12" rx="1" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
            <rect x="10 + (w - 15) / 2" y="3" width={(w - 15) / 2} height="12" rx="1" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
          </>
        ) : (
          <rect x="3" y="3" width={w - 6} height="12" rx="1" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        )}
        <path d={`M 0 ${h * 0.4} L ${w} ${h * 0.4}`} stroke={furnitureStroke} strokeWidth="0.8" />
        <path d={`M 0 ${h * 0.48} L ${w} ${h * 0.45}`} stroke={furnitureStroke} strokeWidth="0.8" strokeDasharray="1,1" />
      </g>
    );
  };

  // Render Bathroom fixtures
  const renderBathroomFixtures = (x: number, y: number, w: number, h: number) => {
    return (
      <g transform={`translate(${x}, ${y})`} className="opacity-70">
        <rect x="2" y="2" width="25" height="25" fill="none" stroke={furnitureStroke} strokeWidth="0.8" strokeDasharray="2,2" />
        <circle cx="14" cy="14" r="1.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <rect x={w - 20} y="4" width="14" height="18" rx="3" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <ellipse cx={w - 13} cy="16" rx="5" ry="6" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <rect x="4" y={h - 18} width="18" height="12" rx="2" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <ellipse cx="13" cy={h - 12} rx="5" ry="4" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
      </g>
    );
  };

  // Render Kitchen Stove & Sink
  const renderKitchenFixtures = (x: number, y: number, w: number, h: number, horizontal = true) => {
    return (
      <g transform={`translate(${x}, ${y})`} className="opacity-80">
        <rect x="0" y="0" width={w} height={h} fill={furnitureFill} stroke={furnitureStroke} strokeWidth="0.8" />
        {horizontal ? (
          <g transform={`translate(${w * 0.15}, 3)`}>
            <rect x="0" y="0" width="18" height="12" rx="1.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
            <circle cx="9" cy="3" r="0.8" fill={furnitureStroke} />
          </g>
        ) : (
          <g transform={`translate(3, ${h * 0.15})`}>
            <rect x="0" y="0" width="12" height="18" rx="1.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
          </g>
        )}
        {horizontal ? (
          <g transform={`translate(${w * 0.65}, 2)`}>
            <circle cx="6" cy="6" r="4.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
            <circle cx="15" cy="6" r="4" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
          </g>
        ) : (
          <g transform={`translate(2, ${h * 0.65})`}>
            <circle cx="6" cy="6" r="4.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
            <circle cx="6" cy="15" r="4" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
          </g>
        )}
      </g>
    );
  };

  // Render Sofa, TV & Coffee Table
  const renderLivingFurniture = (x: number, y: number, w: number, h: number) => {
    return (
      <g transform={`translate(${x}, ${y})`} className="opacity-80">
        <path
          d={`M 8 8 L ${w - 12} 8 L ${w - 12} ${h - 15} L ${w - 28} ${h - 15} L ${w - 28} 25 L 8 25 Z`}
          fill={furnitureFill}
          stroke={furnitureStroke}
          strokeWidth="1"
        />
        <line x1="30" y1="8" x2="30" y2="25" stroke={furnitureStroke} strokeWidth="0.6" />
        <line x1="55" y1="8" x2="55" y2="25" stroke={furnitureStroke} strokeWidth="0.6" />
        <ellipse cx={w * 0.4} cy={h * 0.55} rx="12" ry="9" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <rect x="8" y={h - 8} width={w - 16} height="4" rx="0.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
      </g>
    );
  };

  // Render Dining Set
  const renderDiningFurniture = (x: number, y: number, w: number, h: number) => {
    return (
      <g transform={`translate(${x}, ${y})`} className="opacity-80">
        <rect x="6" y="8" width={w - 12} height={h - 16} rx="3" fill={furnitureFill} stroke={furnitureStroke} strokeWidth="1" />
        <rect x={w * 0.22} y="2" width="10" height="5" rx="0.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <rect x={w * 0.58} y="2" width="10" height="5" rx="0.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <rect x={w * 0.22} y={h - 7} width="10" height="5" rx="0.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
        <rect x={w * 0.58} y={h - 7} width="10" height="5" rx="0.5" fill="none" stroke={furnitureStroke} strokeWidth="0.8" />
      </g>
    );
  };

  // Helper to draw CAD-style dimension lines
  const renderDimensionLine = (x1: number, y1: number, x2: number, y2: number, valueText: string, isVertical = false) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return (
      <g className="opacity-50 font-mono">
        {/* Dimension thin line */}
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={dimensionStroke} strokeWidth="0.8" />
        {/* Ticks at the ends */}
        {isVertical ? (
          <>
            <line x1={x1 - 4} y1={y1 - 4} x2={x1 + 4} y2={y1 + 4} stroke={dimensionStroke} strokeWidth="0.8" />
            <line x1={x2 - 4} y1={y2 - 4} x2={x2 + 4} y2={y2 + 4} stroke={dimensionStroke} strokeWidth="0.8" />
            <text x={midX - 10} y={midY + 3} textAnchor="end" className="text-[7.5px] font-semibold" fill={textPrimary}>{valueText}</text>
          </>
        ) : (
          <>
            <line x1={x1 - 4} y1={y1 + 4} x2={x1 + 4} y2={y1 - 4} stroke={dimensionStroke} strokeWidth="0.8" />
            <line x1={x2 - 4} y1={y2 + 4} x2={x2 + 4} y2={y2 - 4} stroke={dimensionStroke} strokeWidth="0.8" />
            <text x={midX} y={midY - 6} textAnchor="middle" className="text-[7.5px] font-semibold" fill={textPrimary}>{valueText}</text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-lg bg-[#FCFBF9] border border-neutral-200 rounded-2xl overflow-hidden p-5 shadow-sm">
        {/* Subtle architectural paper grid pattern */}
        <div className="absolute inset-0 opacity-4 pointer-events-none bg-[radial-gradient(#4E1626_1px,transparent_1px)] [background-size:20px_20px]"></div>

        {/* Outer Brochure Heading inside the simulated static sheet */}
        <div className="w-full flex justify-between items-start border-b border-neutral-100 pb-3 mb-4">
          <div className="space-y-0.5">
            <h4 className="font-serif font-bold text-base text-[#4E1626] tracking-tight">
              {unitId === "TypeA" && "Type A"}
              {unitId === "TypeB" && "Type B (Dual Key)"}
              {unitId === "TypeC" && "Type C (Dual Key)"}
              {unitId === "TypeC1" && "Type C1 (Dual Key)"}
            </h4>
            <p className="font-mono text-[9px] text-[#8C6C4E] font-bold uppercase tracking-wider">
              {unitId === "TypeA" && "649 sq. ft."}
              {unitId === "TypeB" && "763 sq. ft."}
              {unitId === "TypeC" && "1008 sq. ft."}
              {unitId === "TypeC1" && "1026 sq. ft."}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-[#4E1626]/5 text-[#4E1626] text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-[#4E1626]/10">
              {unitId === "TypeA" && "2 Bed • 2 Bath"}
              {unitId === "TypeB" && "2 Bed • 2 Bath"}
              {unitId === "TypeC" && "3 Bed • 3 Bath"}
              {unitId === "TypeC1" && "3 Bed • 3 Bath"}
            </span>
          </div>
        </div>

        {/* SVG Floor Plan Core Drawing */}
        <div className="bg-white rounded-lg border border-neutral-100 p-2 shadow-inner">
          {unitId === "TypeA" && (
            <div className="w-full flex justify-center py-2 bg-white">
              <img
                src="https://res.cloudinary.com/slvt7jsi/image/upload/v1784440508/Type_A_gjy7ch.png"
                alt="Type A Floor Plan Blueprint"
                className="w-full max-w-[450px] h-auto object-contain rounded-md shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {unitId === "TypeB" && (
            <div className="w-full flex justify-center py-2 bg-white">
              <img
                src="https://res.cloudinary.com/slvt7jsi/image/upload/v1784440508/Type_B_qpran8.png"
                alt="Type B Floor Plan Blueprint"
                className="w-full max-w-[450px] h-auto object-contain rounded-md shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {unitId === "TypeC" && (
            <div className="w-full flex justify-center py-2 bg-white">
              <img
                src="https://res.cloudinary.com/slvt7jsi/image/upload/v1784440508/Type_C_oobm9o.png"
                alt="Type C Floor Plan Blueprint"
                className="w-full max-w-[450px] h-auto object-contain rounded-md shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {unitId === "TypeC1" && (
            <div className="w-full flex justify-center py-2 bg-white">
              <img
                src="https://res.cloudinary.com/slvt7jsi/image/upload/v1784440508/Type_C1_d1zy3r.png"
                alt="Type C1 Floor Plan Blueprint"
                className="w-full max-w-[450px] h-auto object-contain rounded-md shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Details & Highlights matching brochure prints */}
        <div className="mt-4 p-3 bg-[#FAF8F5] border border-neutral-150 rounded-xl">
          <h5 className="text-[10px] font-bold uppercase text-[#4E1626] font-mono tracking-widest mb-1.5 flex items-center">
            <CheckCircle className="w-3.5 h-3.5 text-[#8C6C4E] mr-1.5 flex-shrink-0" />
            <span>Official Layout Features</span>
          </h5>
          <div className="text-xs text-neutral-600 leading-relaxed space-y-1">
            {unitId === "TypeA" && (
              <>
                <p>• Clean, highly practical <strong>649 sq. ft.</strong> layout pairing <strong>2 Bed & 2 Bath</strong>.</p>
                <p>• Completely private separate bedrooms with dedicated en-suite bathrooms.</p>
                <p>• Perfectly suited for young urban professionals, single executives, or first-time buyers.</p>
              </>
            )}
            {unitId === "TypeB" && (
              <>
                <p>• Intelligent double foyer split into a <strong>Master Apartment</strong> & <strong>Self-contained Studio Suite</strong>.</p>
                <p>• Dual-Key <strong>763 sq. ft.</strong> optimization providing high potential dual rental yields under a single title.</p>
                <p>• Best choice for smart co-living or high-yield real estate investors.</p>
              </>
            )}
            {unitId === "TypeC" && (
              <>
                <p>• Generous <strong>1008 sq. ft.</strong> footprint comprising <strong>3 Bedrooms & 3 Full Bathrooms</strong>.</p>
                <p>• Expansive central dining hall directly linked with a beautiful breeze-catching balcony.</p>
                <p>• Ideal for multi-generational families wanting ultimate individual privacy under one roof.</p>
              </>
            )}
            {unitId === "TypeC1" && (
              <>
                <p>• Upscale <strong>1026 sq. ft.</strong> premium dual-key apartment with maximum room spaces.</p>
                <p>• Huge social hosting space, deep studio master bedroom, and wide kitchen-yard layout.</p>
                <p>• The crown jewel layout tailored for buyers seeking elite urban luxury living.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
