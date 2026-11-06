
import React from 'react';
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  Shield,
  Sparkles,
} from 'lucide-react';

export default function TimelineList({
  stages = [],
  onSelectStage,
  selectedStageId = null,
}) {
  const handleSelect = (stage) => {
    if (stage && typeof onSelectStage === 'function') {
      onSelectStage(stage);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';

      case 'COMPLETED':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';

      default:
        return 'bg-slate-800/80 text-slate-400 border-slate-700';
    }
  };

  if (stages.length === 0) {
    return (
      <div className="
        w-full max-w-4xl mx-auto
        px-4 py-16
        text-center
        rounded-2xl
        border border-slate-800
        bg-slate-950/70
      ">
        <Shield className="w-10 h-10 mx-auto text-slate-600 mb-4" />

        <h3 className="
          text-lg
          font-heading
          text-slate-300
          uppercase
        ">
          No Mission Data Available
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          Mission intelligence has not been uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        w-full max-w-4xl
        mx-auto
        px-4
        py-8
        space-y-4
      "
      aria-label="Mission timeline"
    >

      {/* SECTION HEADER */}
      <div className="
        flex items-center
        justify-between
        mb-6
        px-1
      ">

        <div>
          <div className="
            flex items-center
            gap-2
            text-amber-400
            text-xs
            font-mono
            tracking-widest
            uppercase
          ">
            <Sparkles className="w-3.5 h-3.5" />
            Mission Archives
          </div>

          <h2 className="
            text-2xl sm:text-3xl
            font-heading
            uppercase
            tracking-wide
            text-white
            mt-1
          ">
            Mission Sequence
          </h2>
        </div>

        <div className="
          px-3 py-1.5
          rounded-lg
          bg-slate-900
          border border-slate-800
          text-xs
          font-mono
          text-slate-400
        ">
          {stages.length} STAGES
        </div>

      </div>

      {/* TIMELINE CONNECTOR */}
      <div className="relative space-y-4">

        {/* VERTICAL ENERGY LINE */}
        <div className="
          absolute
          left-[27px]
          sm:left-[31px]
          top-8
          bottom-8
          w-px
          bg-gradient-to-b
          from-amber-400/60
          via-slate-700
          to-transparent
          pointer-events-none
        " />

        {stages.map((stage, idx) => {

          const isCurrent = stage.status === 'ACTIVE';

          const isCompleted = stage.status === 'COMPLETED';

          const isSelected = selectedStageId === stage.id;

          const accentColor = stage.accentColor || '#fbbf24';

          return (
            <button
              key={stage.id ?? idx}
              type="button"
              onClick={() => handleSelect(stage)}
              aria-label={`View briefing for ${stage.name || 'mission'}`}
              aria-pressed={isSelected}
              className={`
                group
                relative
                w-full
                text-left
                p-4 sm:p-6
                rounded-2xl
                border
                transition-all duration-300
                backdrop-blur-xl
                overflow-hidden
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-400
                ${
                  isCurrent
                    ? 'bg-slate-900/95 border-amber-400/60 shadow-[0_0_25px_rgba(250,204,21,0.15)]'
                    : isSelected
                    ? 'bg-slate-900/95 border-amber-400/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-600 hover:bg-slate-900/90'
                }
              `}
            >

              {/* BACKGROUND GLOW */}
              {isSelected && (
                <div
                  className="
                    absolute inset-0
                    opacity-[0.07]
                    pointer-events-none
                  "
                  style={{
                    background: `radial-gradient(circle at left, ${accentColor}, transparent 70%)`,
                  }}
                />
              )}

              {/* LEFT ACCENT */}
              <div
                className="
                  absolute
                  top-0 left-0 bottom-0
                  w-1
                  group-hover:w-1.5
                  transition-all duration-300
                "
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 12px ${accentColor}80`,
                }}
              />

              {/* MAIN CONTENT */}
              <div className="
                relative
                flex flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
                pl-2
              ">

                {/* LEFT CONTENT */}
                <div className="
                  flex items-start
                  gap-4
                  min-w-0
                ">

                  {/* AVATAR */}
                  <div
                    className="
                      relative
                      w-12 h-12
                      sm:w-16 sm:h-16
                      rounded-full
                      overflow-hidden
                      border-2 border-white/20
                      shrink-0
                      bg-slate-800
                    "
                    style={{
                      boxShadow: `
                        0 0 12px ${accentColor}90,
                        0 0 25px ${accentColor}35
                      `,
                    }}
                  >

                    {stage.avatar ? (
                      <img
                        src={stage.avatar}
                        alt={stage.character || stage.name || 'Character'}
                        draggable={false}
                        loading="lazy"
                        className="
                          w-full h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />
                    ) : (
                      <div className="
                        w-full h-full
                        flex items-center
                        justify-center
                        font-bold
                        text-lg
                        text-white
                      ">
                        {idx + 1}
                      </div>
                    )}

                  </div>

                  {/* STAGE INFORMATION */}
                  <div className="min-w-0 flex-1">

                    {/* BADGES */}
                    <div className="
                      flex items-center
                      flex-wrap
                      gap-2
                      mb-2
                    ">

                      <span className="
                        font-mono
                        text-[10px]
                        sm:text-xs
                        text-slate-500
                      ">
                        STAGE {stage.stageNumber ?? idx + 1}
                      </span>

                      {stage.codename && (
                        <span
                          className="
                            text-[9px]
                            sm:text-[10px]
                            font-bold
                            uppercase
                            px-2 py-0.5
                            rounded-full
                          "
                          style={{
                            backgroundColor: `${accentColor}20`,
                            color: accentColor,
                            border: `1px solid ${accentColor}40`,
                          }}
                        >
                          {stage.codename}
                        </span>
                      )}

                      {stage.statusBadge && (
                        <span className={`
                          text-[9px]
                          sm:text-[10px]
                          font-semibold
                          uppercase
                          px-2 py-0.5
                          rounded-full
                          border
                          ${getStatusStyles(stage.status)}
                        `}>
                          {stage.statusBadge}
                        </span>
                      )}

                    </div>

                    {/* STAGE TITLE */}
                    <h3 className="
                      text-lg sm:text-2xl
                      font-heading
                      tracking-wide
                      uppercase
                      text-white
                      group-hover:text-amber-300
                      transition-colors
                    ">
                      {stage.name || 'Untitled Mission'}
                    </h3>

                    {/* DESCRIPTION */}
                    {stage.shortDesc && (
                      <p className="
                        text-xs sm:text-sm
                        text-slate-400
                        mt-1
                        leading-relaxed
                        max-w-xl
                      ">
                        {stage.shortDesc}
                      </p>
                    )}

                    {/* CHARACTER */}
                    {stage.character && (
                      <p className="
                        text-[10px]
                        text-slate-500
                        font-mono
                        uppercase
                        tracking-widest
                        mt-2
                      ">
                        {stage.character}
                      </p>
                    )}

                  </div>

                </div>

                {/* RIGHT CONTENT */}
                <div className="
                  flex
                  sm:flex-col
                  items-center
                  sm:items-end
                  justify-between
                  gap-3
                  border-t
                  sm:border-t-0
                  border-slate-800
                  pt-3
                  sm:pt-0
                  shrink-0
                ">

                  {/* DATE AND TIME */}
                  <div className="
                    text-left
                    sm:text-right
                    font-mono
                    text-xs
                    text-slate-400
                  ">

                    {stage.date && (
                      <div className="
                        text-slate-200
                        font-semibold
                      ">
                        {stage.date}
                      </div>
                    )}

                    {stage.time && (
                      <div className="
                        flex items-center
                        sm:justify-end
                        gap-1
                        text-[11px]
                        text-slate-500
                        mt-1
                      ">
                        <Clock className="w-3 h-3" />
                        {stage.time}
                      </div>
                    )}

                  </div>

                  {/* ACTION */}
                  <div className={`
                    flex items-center
                    gap-1.5
                    text-xs
                    font-semibold
                    font-mono
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    ${
                      isCurrent
                        ? 'text-amber-400'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-slate-400 group-hover:text-amber-400'
                    }
                  `}>

                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>COMPLETED</span>
                      </>
                    ) : (
                      <>
                        <span>VIEW BRIEFING</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}

                  </div>

                </div>

              </div>

            </button>
          );
        })}

      </div>

      {/* FOOTER HINT */}
      <div className="
        flex items-center
        justify-center
        gap-2
        text-[10px]
        sm:text-xs
        font-mono
        uppercase
        tracking-wider
        text-slate-500
        pt-5
        text-center
      ">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Select any mission to access classified intelligence
      </div>

    </section>
  );
}
