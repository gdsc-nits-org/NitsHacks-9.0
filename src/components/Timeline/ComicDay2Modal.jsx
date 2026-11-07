import React, { useEffect } from 'react';
import popupFrameImg from '../../assets/popup3.png';
import popupDay3TextImg from '../../assets/popup3text.png';

export default function ComicDay3Modal({
  isOpen,
  onClose,
  onNext,
  onPrev,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext?.();
      if (e.key === 'ArrowLeft') onPrev?.();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden pointer-events-none">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/70 pointer-events-auto cursor-pointer"
        onClick={onClose}
      />

      {/* COMPACT MODAL CONTAINER */}
      <div className="relative z-10 w-full max-w-[560px] max-h-[75vh] flex flex-col items-center justify-end pointer-events-auto mb-0">

        {/* TEXT BOX IMAGE & CLOSE BUTTON WRAPPER (Top-Right Area) */}
        <div className="absolute -top-16 sm:-top-24 -right-16 sm:-right-32 z-30 w-[65%] max-w-[340px] pointer-events-auto">
          {/* CLOSE BUTTON (Positioned directly above the top-right corner of the bubble) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-3 -right-2 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-lg border-2 border-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Close popup"
            title="Close (Esc)"
          >
            ✕
          </button>

          <img
            src={popupDay3TextImg}
            alt="Day 3 Description"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[5px_6px_0px_rgba(0,0,0,1)]"
          />
        </div>

        {/* THANOS CHARACTER LAYER */}
        <div className="relative z-10 w-full max-h-[58vh] flex justify-center items-end">
          <img
            src={popupFrameImg}
            alt="Day 3 - Thanos"
            className="w-full max-h-[58vh] object-contain object-bottom pointer-events-none select-none"
          />

          {/* PREVIOUS BUTTON (BOTTOM-LEFT) */}
          {onPrev && (
            <div className="absolute left-1 sm:left-3 bottom-3 sm:bottom-4 z-30">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPrev?.();
                }}
                className="relative group inline-block cursor-pointer active:scale-95 transition-transform duration-150 rotate-[-2.5deg]"
                title="Previous Day"
                aria-label="Previous day"
              >
                <span className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-[2px]" />
                <span
                  className="relative block px-5 sm:px-6 py-1.5 sm:py-2 bg-[#d71920] hover:bg-[#eb222a] border-2 border-black rounded-[2px] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm"
                  style={{
                    backgroundImage: 'radial-gradient(#111111 20%, transparent 21%)',
                    backgroundSize: '5px 5px',
                  }}
                >
                  <span
                    className="block select-none text-white font-black italic tracking-widest uppercase text-base sm:text-lg leading-none"
                    style={{
                      fontFamily: "'Bangers', 'Impact', sans-serif",
                      WebkitTextStroke: '1px black',
                      textShadow: '1.5px 1.5px 0 #000',
                    }}
                  >
                    PREVIOUS
                  </span>
                </span>
              </button>
            </div>
          )}

          {/* NEXT BUTTON (BOTTOM-RIGHT) */}
          {onNext && (
            <div className="absolute right-1 sm:right-3 bottom-3 sm:bottom-4 z-30">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNext?.();
                }}
                className="relative group inline-block cursor-pointer active:scale-95 transition-transform duration-150 rotate-[2deg]"
                title="Next Day"
                aria-label="Next day"
              >
                <span className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-[2px]" />
                <span
                  className="relative block px-6 sm:px-8 py-1.5 sm:py-2 bg-[#d71920] hover:bg-[#eb222a] border-2 border-black rounded-[2px] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm"
                  style={{
                    backgroundImage: 'radial-gradient(#111111 20%, transparent 21%)',
                    backgroundSize: '5px 5px',
                  }}
                >
                  <span
                    className="block select-none text-white font-black italic tracking-widest uppercase text-lg sm:text-xl leading-none"
                    style={{
                      fontFamily: "'Bangers', 'Impact', sans-serif",
                      WebkitTextStroke: '1px black',
                      textShadow: '1.5px 1.5px 0 #000',
                    }}
                  >
                    NEXT
                  </span>
                </span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}