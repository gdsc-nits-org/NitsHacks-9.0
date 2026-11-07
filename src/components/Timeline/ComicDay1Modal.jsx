import React, { useEffect } from 'react';
import popupFrameImg from '../../assets/popup2.png';

export default function ComicDay2Modal({
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
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-6 right-2 sm:right-0 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-lg border-2 border-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close popup"
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* SPEECH BUBBLE (MOVED HIGH UP AND TO THE LEFT INTO THE RED-MARKED AREA) */}
        <div className="absolute -top-16 sm:-top-20 -left-20 sm:-left-36 z-30 w-[64%] max-w-[330px] select-none pointer-events-none">
          <div className="relative w-full aspect-[340/310]">
            <svg
              viewBox="0 0 340 310"
              className="w-full h-full overflow-visible drop-shadow-[5px_6px_0px_rgba(0,0,0,1)]"
            >
              {/* SHARP FIGMA COMIC BUBBLE WITH EXTENDED DOWNWARD-RIGHT TAIL TO ULTRON */}
              <path
                d="M 68 36 
                   L 125 36 
                   L 146 14 
                   L 204 36 
                   L 208 26 
                   L 214 36 
                   L 274 36 
                   C 285 36 295 44 297 55 
                   L 302 70 
                   L 318 84 
                   L 302 98 
                   L 302 124 
                   L 324 138 
                   L 302 152 
                   L 302 176 
                   L 320 188 
                   L 302 200 
                   L 297 222 
                   C 294 235 284 242 272 242 
                   L 248 242 
                   L 375 320 
                   L 218 256 
                   L 210 274 
                   L 194 256 
                   L 138 256 
                   L 118 274 
                   L 104 256 
                   L 68 256 
                   C 48 256 36 242 36 224 
                   L 36 195 
                   L 12 180 
                   L 36 166 
                   L 36 112 
                   L 14 96 
                   L 36 82 
                   L 36 54 
                   C 36 42 48 36 68 36 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="6"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
              />
            </svg>

            {/* CENTERED CONTENT */}
            <div className="absolute inset-0 pt-9 pb-14 px-9 flex flex-col items-center justify-center text-center">
              <h3
                className="text-black font-black italic text-2xl sm:text-[26px] leading-none tracking-wide mb-1.5 select-none"
                style={{ fontFamily: "'Bangers', 'Impact', sans-serif" }}
              >
                DAY 2
              </h3>
              <p
                className="text-[#050505] font-extrabold text-[10.5px] sm:text-[11.5px] leading-[1.3] tracking-tight select-none"
                style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', sans-serif" }}
              >
                Explore our coding track to build your programming skills from
                the ground up. Whether you're a beginner or looking to sharpen
                your expertise, this track offers hands-on projects and expert
                guidance to help you succeed.
              </p>
            </div>
          </div>
        </div>

        {/* ULTRON IMAGE */}
        <div className="relative z-10 w-full max-h-[58vh] flex justify-center items-end">
          <img
            src={popupFrameImg}
            alt="Day 2 - Ultron"
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

          {/* NEXT BUTTON (BOTTOM-RIGHT, CLEAR OF TORSO) */}
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

        </div>

      </div>
    </div>
  );
}