
import React from 'react';

export default function TimelineNode({
  stage,
  isSelected = false,
  onSelect,
}) {
  if (!stage) return null;

  const {
    id,
    name = 'Unknown Mission',
    character = 'Unknown',
    accentColor = '#fbbf24',
    glowColor,
    avatar,
    statusBadge,
    date,
    status,
  } = stage;

  const nodeGlow = glowColor || accentColor;

  const handleSelect = () => {
    if (typeof onSelect === 'function') {
      onSelect(stage);
    }
  };

  return (
    <div className="relative group flex flex-col items-center">

      {/* OUTER RADAR PING */}
      <div
        className="
          absolute
          -inset-3
          rounded-full
          opacity-50
          animate-radar
          pointer-events-none
        "
        style={{
          border: `2px solid ${accentColor}`,
          boxShadow: `0 0 20px ${nodeGlow}`,
        }}
      />

      {/* SECONDARY GLOW AURA */}
      <div
        className="
          absolute
          -inset-1
          rounded-full
          animate-pulse-glow
          opacity-80
          pointer-events-none
        "
        style={{
          boxShadow: `
            0 0 25px ${nodeGlow},
            inset 0 0 15px ${nodeGlow}
          `,
        }}
      />

      {/* CHARACTER NODE */}
      <button
        type="button"
        onClick={handleSelect}
        aria-label={`Select ${character}: ${name}`}
        aria-pressed={isSelected}
        title={`View ${character} mission briefing`}
        className={`
          relative
          block
          w-16 h-16
          sm:w-20 sm:h-20
          md:w-24 md:h-24
          lg:w-28 lg:h-28
          rounded-full
          overflow-hidden
          border-[3px]
          cursor-pointer
          transition-all
          duration-300
          ease-out
          group-hover:scale-110
          group-hover:-translate-y-1
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-amber-400
          ${
            isSelected
              ? 'border-amber-400 ring-4 ring-amber-400/60 scale-105'
              : 'border-white/80 hover:border-white'
          }
        `}
        style={{
          boxShadow: `
            0 0 20px ${nodeGlow},
            0 0 40px ${nodeGlow}66
          `,
        }}
      >

        {/* CHARACTER AVATAR */}
        {avatar ? (
          <img
            src={avatar}
            alt={character}
            draggable={false}
            loading="lazy"
            className="
              w-full h-full
              object-cover
              select-none
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        ) : (
          <div
            className="
              w-full h-full
              flex items-center
              justify-center
              bg-slate-900
              text-white
              font-heading
              text-xl
            "
            style={{
              color: accentColor,
            }}
          >
            {character.charAt(0).toUpperCase()}
          </div>
        )}

        {/* DARK IMAGE OVERLAY */}
        <div className="
          absolute inset-0
          bg-gradient-to-t
          from-black/40
          via-transparent
          to-white/10
          pointer-events-none
        " />

        {/* GLOSS REFLECTION */}
        <div className="
          absolute inset-0
          bg-gradient-to-tr
          from-transparent
          via-white/10
          to-white/20
          pointer-events-none
        " />

        {/* SELECTED INDICATOR */}
        {isSelected && (
          <div className="
            absolute inset-0
            rounded-full
            border-[3px]
            border-amber-400
            pointer-events-none
          " />
        )}

        {/* ACTIVE STATUS INDICATOR */}
        {status === 'ACTIVE' && (
          <div className="
            absolute
            top-1 right-1
            w-3 h-3
            rounded-full
            bg-red-500
            border-2
            border-slate-950
            animate-pulse
          " />
        )}

      </button>

      {/* MISSION CALLOUT */}
      <div className="
        absolute
        left-1/2
        -translate-x-1/2
        top-full
        mt-2
        w-32
        sm:w-40
        md:w-48
        text-center
        pointer-events-none
        transition-all
        duration-300
        group-hover:translate-y-1
        z-40
      ">

        <div className="
          bg-slate-950/95
          border border-slate-800
          rounded-lg
          p-1.5
          sm:p-2
          shadow-xl
          backdrop-blur-md
          transition-colors
          duration-300
          group-hover:border-amber-400/40
        ">

          {/* CHARACTER + STATUS */}
          <div className="
            flex items-center
            justify-center
            gap-1
            mb-1
            flex-wrap
          ">

            <span
              className="
                w-1.5 h-1.5
                rounded-full
                shrink-0
              "
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />

            <span
              className="
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-wider
                font-bold
                font-tech
              "
              style={{
                color: accentColor,
              }}
            >
              {character}
            </span>

            {statusBadge && (
              <span className="
                text-[8px]
                px-1
                py-0.5
                bg-slate-800
                text-slate-300
                rounded
                font-mono
              ">
                {statusBadge}
              </span>
            )}

          </div>

          {/* STAGE NAME */}
          <div className="
            text-[10px]
            sm:text-xs
            font-heading
            tracking-wide
            uppercase
            text-white
            truncate
          ">
            {name}
          </div>

          {/* DATE */}
          {date && (
            <div className="
              text-[9px]
              text-slate-400
              font-mono
              mt-1
            ">
              {date}
            </div>
          )}

          {/* STATUS */}
          {status && (
            <div className="
              text-[8px]
              text-slate-500
              font-mono
              uppercase
              tracking-wider
              mt-1
            ">
              {status}
            </div>
          )}

        </div>

        {/* HOVER INSTRUCTION */}
        <div className="
          text-[8px]
          sm:text-[9px]
          text-amber-400
          font-mono
          tracking-wider
          mt-1
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        ">
          CLICK FOR BRIEFING
        </div>

      </div>

    </div>
  );
}
