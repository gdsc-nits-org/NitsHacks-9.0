
import React, { useState } from 'react';

import TimelineNode from './TimelineNode';

import helicarrierImg from '../../assets/helicarrier.png';
import quinjetImg from '../../assets/quinjet.png';

import { Sparkles } from 'lucide-react';

export default function CosmicTrack({
  stages = [],
  onSelectStage,
  selectedStageId = null,
}) {
  const [hoveredVehicle, setHoveredVehicle] = useState(null);

  // Create stage lookup using stage IDs
  const stageMap = stages.reduce((map, stage) => {
    if (stage && stage.id) {
      map[stage.id] = stage;
    }
    return map;
  }, {});

  // Character badge positions
  // Ultron and Thanos are aligned on the middle track line
  const nodePositions = {
    ultron: {
      left: '73.5%',
      top: '55%',
    },

    thanos: {
      left: '26.5%',
      top: '55%',
    },

    doom: {
      left: '86.5%',
      top: '82.5%',
    },
  };

  // Handle stage selection
  const handleSelect = (stage) => {
    if (stage && typeof onSelectStage === 'function') {
      onSelectStage(stage);
    }
  };

  // Reusable character node
  const renderNode = (stageKey) => {
    const stage = stageMap[stageKey];

    if (!stage) return null;

    return (
      <div
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
        style={nodePositions[stageKey]}
        key={stageKey}
      >
        <TimelineNode
          stage={stage}
          isSelected={selectedStageId === stage.id}
          onSelect={handleSelect}
        />
      </div>
    );
  };

  return (
    <div
      className="
        relative
        w-full
        max-w-[1240px]
        mx-auto
        px-2 sm:px-4
        py-8
        select-none
      "
    >

      {/* TRACK CONTAINER */}
      <div
        className="
          relative
          w-full
          aspect-[1100/580]
          min-h-[460px]
          max-h-[700px]
          flex
          items-center
          justify-center
        "
      >

        {/* SVG ENERGY PIPELINE */}
        <svg
          viewBox="0 0 1100 580"
          className="
            w-full h-full
            absolute inset-0
            overflow-visible
            pointer-events-none
          "
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >

          <defs>

            {/* TRACK GLOW */}
            <filter
              id="trackGlow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur
                stdDeviation="8"
                result="blur1"
              />

              <feGaussianBlur
                stdDeviation="16"
                result="blur2"
              />

              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ELECTRIC GRADIENT */}
            <linearGradient
              id="electricGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#fef08a"
              />

              <stop
                offset="50%"
                stopColor="#ffffff"
              />

              <stop
                offset="100%"
                stopColor="#fde047"
              />
            </linearGradient>

          </defs>

          {/* MASTER TRACK PATH */}

          {/* AMBIENT GLOW */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="#eab308"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#trackGlow)"
          />

          {/* OUTER TRACK */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="#facc15"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* INNER DARK CHANNEL */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="#030712"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ANIMATED ELECTRIC CURRENT */}
          <path
            d="M 130 160 L 910 160 A 80 80 0 0 1 910 320 L 170 320 A 80 80 0 0 0 170 480 L 930 480"
            stroke="url(#electricGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-dash"
            opacity="0.9"
          />

        </svg>

        {/* HELICARRIER */}
        <button
          type="button"
          aria-label="S.H.I.E.L.D. Helicarrier"
          title="S.H.I.E.L.D. Helicarrier"
          onClick={() => {
            const homeStage = stageMap['helicarrier'];

            if (homeStage) {
              handleSelect(homeStage);
            }
          }}
          onMouseEnter={() => setHoveredVehicle('helicarrier')}
          onMouseLeave={() => setHoveredVehicle(null)}
          onFocus={() => setHoveredVehicle('helicarrier')}
          onBlur={() => setHoveredVehicle(null)}
          className="
            absolute
            z-20
            cursor-pointer
            transition-transform
            duration-300
            animate-float-slow
            hover:scale-105
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-sky-400
            rounded-xl
          "
          style={{
            left: '3.5%',
            top: '13%',
            width: '18%',
          }}
        >

          {/* BLUE THRUSTER GLOW */}
          <div
            className="
              absolute
              top-1/2
              left-1/3
              -translate-y-1/2
              w-16 h-8
              bg-sky-400/30
              blur-xl
              pointer-events-none
              rounded-full
            "
          />

          <img
            src={helicarrierImg}
            alt="S.H.I.E.L.D. Helicarrier"
            draggable={false}
            className="
              relative
              w-full h-auto
              object-contain
              drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]
              filter
              drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]
            "
          />

          {/* HELICARRIER TOOLTIP */}
          <div
            className={`
              absolute
              -bottom-6
              left-1/2
              -translate-x-1/2
              bg-slate-900/90
              border border-sky-500/50
              text-[10px]
              font-tech
              text-sky-300
              px-2.5 py-0.5
              rounded
              shadow-lg
              backdrop-blur
              whitespace-nowrap
              transition-opacity duration-200
              ${
                hoveredVehicle === 'helicarrier'
                  ? 'opacity-100'
                  : 'opacity-0'
              }
            `}
          >
            S.H.I.E.L.D. Helicarrier // Assemble
          </div>

        </button>

        {/* QUINJET */}
        <div
          className="
            absolute
            z-20
            pointer-events-none
            transition-transform
            duration-200
            animate-float-fast
          "
          style={{
            left: '56%',
            top: '23%',
            width: '8%',
          }}
        >

          {/* ENGINE FLAME */}
          <div
            className="
              absolute
              top-1/2
              -left-4
              -translate-y-1/2
              w-8 h-3
              bg-sky-400
              blur-sm
              rounded-full
              pointer-events-none
            "
          />

          <img
            src={quinjetImg}
            alt="Quinjet Escort"
            draggable={false}
            className="
              w-full h-auto
              object-contain
              drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]
              filter
              drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]
            "
          />

        </div>

        {/* ULTRON NODE - MIDDLE LINE */}
        {renderNode('ultron')}

        {/* THANOS NODE - MIDDLE LINE */}
        {renderNode('thanos')}

        {/* DOCTOR DOOM NODE */}
        {renderNode('doom')}

      </div>

      {/* INTERACTIVE HELPER HINT */}
      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          text-xs
          font-tech
          uppercase
          text-slate-400
          tracking-wider
          mt-4
          text-center
          px-2
        "
      >

        <Sparkles
          className="
            w-3.5 h-3.5
            text-amber-400
            animate-pulse
            shrink-0
          "
        />

        <span>
          Click any Boss Node or Helicarrier to reveal Classified Mission Intel
        </span>

      </div>

    </div>
  );
}
