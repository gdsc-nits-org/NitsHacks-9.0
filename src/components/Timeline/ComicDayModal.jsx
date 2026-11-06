import React, { useEffect, useRef } from 'react';

export default function ComicDayModal({
  isOpen,
  onClose,
  onNext,
  onPrev,
  config,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
      if (event.key === 'ArrowRight' && config?.next && !config.next.disabled) {
        onNext?.();
      }
      if (event.key === 'ArrowLeft' && config?.prev && !config.prev.disabled) {
        onPrev?.();
      }

      if (event.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button:not(:disabled), [href], input:not(:disabled)'
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [isOpen, onClose, onNext, onPrev, config]);

  if (!isOpen || !config) return null;

  const {
    frameImg,
    alt = 'Comic frame',
    width = 1000,
    height = 1000,
    cropHeight,
    title,
    body,
    prev,
    next,
    visibleButtons = false,
    hideText = false,
    maxWidth = 1024,
    maxHeight = 92,
  } = config;

  const visibleHeight = cropHeight || height;
  const ratio = width / visibleHeight;

  // Invisible hotspots matching pre-baked artwork buttons
  const renderHotspot = (btn, handler, name) => {
    if (!btn || btn.hidden || btn.display === 'none') return null;

    return (
      <button
        key={name}
        type="button"
        disabled={btn.disabled}
        onClick={() => {
          handler?.();
        }}
        className="
          absolute z-20 cursor-pointer
          disabled:cursor-not-allowed
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-amber-400
        "
        style={{
          left: btn.left,
          top: btn.top,
          right: btn.right,
          bottom: btn.bottom,
          width: btn.width,
          height: btn.height,
          transform: btn.rotate ? `rotate(${btn.rotate}deg)` : undefined,
        }}
        title={btn.label}
        aria-label={`${name} day`}
      >
        {btn.disabled && (
          <span className="absolute inset-0 rounded-sm bg-black/30 pointer-events-none" />
        )}
        <span className="sr-only">{btn.label || name}</span>
      </button>
    );
  };

  // Styled comic-style push buttons (when visibleButtons is true)
  const renderVisibleButton = (btn, handler, text, isNext = false) => {
    if (!btn || btn.hidden || btn.display === 'none' || (!isNext && btn.disabled)) {
      return null;
    }

    return (
      <button
        type="button"
        disabled={btn.disabled || !handler}
        onClick={handler}
        title={btn.label}
        aria-label={btn.label || text}
        className={`
          relative group inline-block
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-amber-400
          transition-transform duration-150
          active:scale-95 disabled:opacity-40
          disabled:pointer-events-none cursor-pointer
          ${isNext ? 'rotate-[2.5deg] ml-auto' : '-rotate-[2deg]'}
        `}
      >
        <span className="absolute inset-0 bg-white border-2 border-black translate-x-1 translate-y-1 rounded-[2px]" />
        <span
          className="
            relative block px-5 sm:px-8 py-2 sm:py-2.5
            bg-[#e51b24] border-2 border-black rounded-[2px]
            transition-transform duration-100
            group-hover:-translate-x-0.5 group-hover:-translate-y-0.5
          "
          style={{
            backgroundImage: 'radial-gradient(#111111 18%, transparent 19%)',
            backgroundSize: '6px 6px',
          }}
        >
          <span
            className="
              block select-none text-white font-black italic
              tracking-wider uppercase text-2xl sm:text-3xl leading-none
            "
            style={{
              fontFamily: "'Bangers', 'Impact', sans-serif",
              letterSpacing: '1.5px',
              WebkitTextStroke: '1.5px black',
              textShadow: '2px 2px 0 #000',
            }}
          >
            {text}
          </span>
        </span>
      </button>
    );
  };

  const showPrevButton = prev && !prev.hidden && prev.display !== 'none' && !prev.disabled;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden pointer-events-none"
      role="presentation"
    >
      {/* BACKDROP */}
      <div
        className="
          fixed inset-0 backdrop-blur-md bg-black/60
          pointer-events-auto cursor-pointer animate-in fade-in
        "
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MAIN MODAL CONTAINER */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title?.text || 'Comic Day Modal'}
        className="
          relative z-10 select-none
          flex items-end justify-center mb-0 pb-0
          pointer-events-auto flex-shrink-0
        "
        onClick={(e) => e.stopPropagation()}
        style={{
          width: `min(${maxWidth}px, 92vw, calc(${maxHeight}vh * ${ratio}))`,
          aspectRatio: `${width} / ${visibleHeight}`,
          maxHeight: `${maxHeight}vh`,
          filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.65))',
        }}
      >
        {/* ARTWORK / FRAME */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={frameImg}
            alt={alt}
            draggable={false}
            decoding="async"
            loading="eager"
            className="w-full h-full object-contain object-bottom pointer-events-none select-none"
          />
        </div>

        {/* SVG TEXT OVERLAY */}
        {!hideText && (
          <svg
            viewBox={`0 0 ${width} ${visibleHeight}`}
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            aria-hidden="true"
          >
            {title && (
              <text
                x={title.x}
                y={title.y}
                textAnchor={title.textAnchor || 'start'}
                fill={title.color || '#050505'}
                fontSize={title.size || 28}
                fontFamily={title.fontFamily || "'Bangers', 'Impact', sans-serif"}
                fontStyle={title.fontStyle || 'italic'}
                fontWeight={title.fontWeight || '900'}
                letterSpacing={title.letterSpacing || '1'}
              >
                {title.text}
              </text>
            )}

            {body && (
              <text
                x={body.x}
                y={body.y}
                textAnchor={body.textAnchor || 'start'}
                fill={body.color || '#050505'}
                fontSize={body.size || 14}
                fontFamily={body.fontFamily || "'Comic Neue', 'Comic Sans MS', sans-serif"}
                fontWeight={body.fontWeight || '700'}
              >
                {body.lines?.map((line, index) => (
                  <tspan
                    key={index}
                    x={body.x}
                    dy={index === 0 ? 0 : body.lineHeight || 18}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            )}
          </svg>
        )}

        {/* CLOSE BUTTON */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="
            absolute -top-3 right-2 sm:-top-5 sm:right-4
            z-30 w-9 h-9 sm:w-11 sm:h-11
            rounded-full bg-red-600 hover:bg-red-500
            active:scale-90 text-white font-black
            text-xl sm:text-2xl border-2 border-white
            flex items-center justify-center
            shadow-[0_4px_15px_rgba(0,0,0,0.8)]
            transition-all duration-200 hover:rotate-90 cursor-pointer
          "
          title="Close (Esc)"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* BUTTON NAVIGATION */}
        {visibleButtons ? (
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 pointer-events-auto">
            {showPrevButton ? (
              renderVisibleButton(prev, onPrev, 'PREVIOUS')
            ) : (
              <div />
            )}
            {renderVisibleButton(next, onNext, 'NEXT', true)}
          </div>
        ) : (
          <>
            {renderHotspot(prev, onPrev, 'Previous')}
            {renderHotspot(next, onNext, 'Next')}
          </>
        )}
      </div>
    </div>
  );
}