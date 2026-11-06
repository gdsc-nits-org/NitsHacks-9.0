
import React, { useCallback } from 'react';

export default function TimelineHeader({
  stages = [],
  onSelectStage,
  selectedStageId = null,
}) {
  // Handle character selection
  const handleSelect = useCallback(
    (stage) => {
      if (!stage?.id || typeof onSelectStage !== 'function') {
        return;
      }

      onSelectStage(stage);
    },
    [onSelectStage]
  );

  return (
    <header
      className="
        relative
        z-20
        w-full
        text-center
        px-4
        pt-8 sm:pt-10 md:pt-12
        pb-4
      "
    >
      {/* TOP MISSION BADGE */}
      <div
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          px-3 sm:px-4
          py-1.5
          rounded-full
          bg-slate-900/80
          border border-slate-700/80
          text-[10px] sm:text-[11px]
          font-mono
          text-amber-400
          mb-3
          shadow-lg
          backdrop-blur-md
        "
      >
        <span
          className="
            relative
            flex
            w-2 h-2
            shrink-0
          "
        >
          <span
            className="
              absolute
              inline-flex
              w-full h-full
              rounded-full
              bg-amber-400
              opacity-75
              animate-ping
            "
          />

          <span
            className="
              relative
              inline-flex
              w-2 h-2
              rounded-full
              bg-amber-400
            "
          />
        </span>

        <span className="uppercase tracking-widest font-tech">
          NITSHACKS 9.0 MISSION CONTROL
        </span>
      </div>

      {/* MAIN TIMELINE TITLE */}
      <h1
        className="
          text-5xl
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
          xl:text-9xl
          font-heading
          uppercase
          italic
          tracking-wider
          text-white
          drop-shadow-[0_4px_16px_rgba(255,255,255,0.25)]
          select-none
          leading-tight
        "
      >
        TIMELINE
      </h1>

      {/* SUBTITLE */}
      <p
        className="
          max-w-2xl
          mx-auto
          text-xs
          sm:text-sm
          md:text-base
          text-slate-300
          font-normal
          tracking-wide
          mt-3
          leading-relaxed
          px-2
        "
      >
        From Vanguard Assembly to Doomsday Judgment.
        Follow the orbital trajectory of India's premier
        collegiate hackathon.
      </p>

      {/* QUICK ACCESS CHARACTER BADGES */}
      {stages.length > 0 && (
        <nav
          aria-label="Quick mission navigation"
          className="
            flex
            items-center
            justify-center
            gap-2
            sm:gap-3
            md:gap-4
            flex-wrap
            max-w-4xl
            mx-auto
            mt-6
            px-1
          "
        >
          {stages.map((stage, index) => {
            const stageId = stage.id;

            const accentColor =
              stage.accentColor || '#fbbf24';

            const isActive =
              stage.status === 'ACTIVE';

            const isCompleted =
              stage.status === 'COMPLETED';

            const isSelected =
              selectedStageId === stageId;

            const stageName =
              stage.character ||
              stage.name ||
              `Stage ${index + 1}`;

            return (
              <button
                key={stageId ?? index}
                type="button"
                disabled={!stageId}
                onClick={() => handleSelect(stage)}
                aria-label={`Select ${stageName} mission`}
                aria-pressed={isSelected}
                className={`
                  group
                  relative
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-3
                  sm:px-4
                  py-2
                  rounded-full
                  bg-slate-950/85
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:scale-105
                  active:scale-95
                  text-[10px]
                  sm:text-xs
                  font-tech
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-amber-400
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-950
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  ${
                    isSelected
                      ? 'border-amber-400 text-white bg-slate-800/95'
                      : 'border-slate-700/80 text-slate-300 hover:border-slate-500 hover:text-white'
                  }
                `}
                style={{
                  boxShadow: isSelected
                    ? `0 0 14px ${accentColor}55`
                    : `0 0 8px ${accentColor}18`,
                }}
              >
                {/* CHARACTER COLOR INDICATOR */}
                <span
                  className="
                    relative
                    w-2.5
                    h-2.5
                    rounded-full
                    shrink-0
                  "
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 0 9px ${accentColor}`,
                  }}
                />

                {/* CHARACTER NAME */}
                <span className="uppercase tracking-wider whitespace-nowrap">
                  {stageName}
                </span>

                {/* ACTIVE STATUS */}
                {isActive && (
                  <span
                    className="
                      text-[8px]
                      sm:text-[9px]
                      bg-red-500/20
                      border border-red-500/30
                      text-red-400
                      px-1.5
                      py-0.5
                      rounded
                      font-mono
                      font-bold
                      animate-pulse
                    "
                  >
                    LIVE
                  </span>
                )}

                {/* COMPLETED STATUS */}
                {isCompleted && (
                  <span
                    className="
                      text-[8px]
                      sm:text-[9px]
                      bg-emerald-500/20
                      border border-emerald-500/30
                      text-emerald-400
                      px-1.5
                      py-0.5
                      rounded
                      font-mono
                      font-bold
                    "
                  >
                    DONE
                  </span>
                )}

                {/* SELECTED INDICATOR */}
                {isSelected && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      left-1/2
                      -translate-x-1/2
                      w-5
                      h-0.5
                      rounded-full
                      bg-amber-400
                    "
                  />
                )}
              </button>
            );
          })}
        </nav>
      )}

      {/* BOTTOM DECORATIVE DIVIDER */}
      <div
        className="
          w-24
          h-0.5
          mx-auto
          mt-7
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-amber-400
          to-transparent
          opacity-70
        "
      />
    </header>
  );
}
