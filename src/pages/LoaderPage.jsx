import React, { useState, useEffect, useRef } from 'react';
import './LoaderPage.css';

/**
 * NITS HACKS 9.0 Loader Page
 *
 * Recreates the Stan Lee "Salt Bae" comic book intro:
 * - Badges visibly emerge from Stan Lee's hand and fall downwards
 *   in a natural cascading sequence, vanishing into the book before the loading bar
 * - New golden comic artwork background (Background_LoaderPage_new.png)
 * - Pulsing "LOADING" marquee header
 * - Smooth comic pill progress bar
 */
export default function LoaderPage({
  duration = 4200,
  onComplete,
  autoComplete = true,
}) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = null;

    const animateProgress = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Natural ease-out curve with realistic micro-pacing
      let eased;
      if (rawProgress < 0.3) {
        eased = (rawProgress / 0.3) * 0.35;
      } else if (rawProgress < 0.65) {
        eased = 0.35 + ((rawProgress - 0.3) / 0.35) * 0.35;
      } else {
        const t = (rawProgress - 0.65) / 0.35;
        eased = 0.7 + (1 - Math.pow(1 - t, 2)) * 0.3;
      }

      const percent = Math.min(Math.round(eased * 100), 100);
      setProgress(percent);

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setIsCompleted(true);
        if (autoComplete && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 450);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, autoComplete, onComplete]);

  const handleRestart = () => {
    setProgress(0);
    setIsCompleted(false);
    startTimeRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animateProgress = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);
      const percent = Math.min(Math.round(rawProgress * 100), 100);
      setProgress(percent);

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setIsCompleted(true);
        if (autoComplete && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 450);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);
  };

  return (
    <div className="loader-page-wrapper flex flex-col items-center justify-between">
      {/* New Background Marvel Comic Illustration with baked-in golden lighting */}
      <img
        src="/loader_assets/Background_LoaderPage_new.png"
        alt="NITS HACKS Comic Background"
        className="loader-page-bg"
      />

      {/* Subtle vignette / atmospheric overlay */}
      <div className="loader-glow-overlay" />

      {/* Top-Left: NITSHACKS 9.0 Brand Badge */}
      <header className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-30">
        <img
          src="/loader_assets/NITSHACKS_9.0_image.png"
          alt="NITSHACKS 9.0"
          className="w-28 sm:w-36 md:w-44 lg:w-48 h-auto drop-shadow-[2px_2px_0px_rgba(0,0,0,0.85)]"
        />
      </header>

      {/* Top-Center: Stylized "LOADING" Banner */}
      <div className="absolute top-5 sm:top-7 md:top-9 lg:top-10 left-1/2 -translate-x-1/2 z-30">
        <img
          src="/loader_assets/Loading.png"
          alt="LOADING"
          className="w-40 sm:w-52 md:w-64 lg:w-72 h-auto animate-loading-pulse pointer-events-none"
        />
      </div>

      {/* Center Stage: Stan Lee & Cascading Falling Badges */}
      <main className="flex-1 w-full flex items-center justify-center relative z-20 pt-10 pb-16 px-4">
        <div className="loader-character-container relative flex items-center justify-center w-[86vw] max-w-[340px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px]">
          {/* Stan Lee & Open Comic Book Base Element */}
          <img
            src="/loader_assets/cenrtre_element_LoaderPage.png"
            alt="Stan Lee creating NITS HACKS 9.0"
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
          />

          {/* ─────────────────────────────────────────────────────────────────
              Stream of Superhero Badges:
              All emerge from Stan Lee's hand at top (left ~22%, top ~14%),
              travel downwards following natural falling motion, and vanish
              into the book before reaching the loading bar.
          ───────────────────────────────────────────────────────────────── */}

          {/* 1. Hulk (Fist) - Arcs down the left */}
          <img
            src="/loader_assets/smallElement_4.png"
            alt="Hulk badge"
            className="falling-badge falling-badge-1"
          />

          {/* 2. Iron Man (Helmet) - Drops down center-left */}
          <img
            src="/loader_assets/smallElement_6.png"
            alt="Iron Man badge"
            className="falling-badge falling-badge-2"
          />

          {/* 3. Spider-Man (Mask) - Floats down center chest */}
          <img
            src="/loader_assets/smallElement1.png"
            alt="Spider-Man badge"
            className="falling-badge falling-badge-3"
          />

          {/* 4. Thor (Hammer) - Drops straight towards left page */}
          <img
            src="/loader_assets/smallElement_2.png"
            alt="Thor badge"
            className="falling-badge falling-badge-4"
          />

          {/* 5. Captain Marvel (Star) - Drifts right across chest */}
          <img
            src="/loader_assets/smallElement_3.png"
            alt="Captain Marvel badge"
            className="falling-badge falling-badge-5"
          />

          {/* 6. Black Widow (Hourglass) - Tumbles down outer left */}
          <img
            src="/loader_assets/smallElement_5.png"
            alt="Black Widow badge"
            className="falling-badge falling-badge-6"
          />

          {/* 7. Iron Man (Variant wave) - Drifts down right-center */}
          <img
            src="/loader_assets/smallElement_6.png"
            alt="Iron Man badge"
            className="falling-badge falling-badge-7"
          />

          {/* 8. Spider-Man (Variant wave) - Cascades down center */}
          <img
            src="/loader_assets/smallElement1.png"
            alt="Spider-Man badge"
            className="falling-badge falling-badge-8"
          />
        </div>
      </main>

      {/* Bottom Area: Comic Pill Progress Bar */}
      <footer className="absolute bottom-5 sm:bottom-7 md:bottom-9 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 w-[82vw] max-w-[420px] sm:max-w-[480px] md:max-w-[530px] lg:max-w-[570px] flex flex-col items-center gap-2">
        <div
          className="loader-progress-track w-full h-[20px] sm:h-[23px] md:h-[26px] cursor-pointer"
          onClick={handleRestart}
          title="Click to replay loading animation"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="loader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle replay prompt once 100% loaded */}
        {isCompleted && (
          <button
            type="button"
            onClick={handleRestart}
            className="text-xs text-white/70 hover:text-white font-semibold tracking-wider uppercase transition-colors duration-200 mt-1 cursor-pointer"
          >
            ✓ Loaded • Click to Replay
          </button>
        )}
      </footer>
    </div>
  );
}
