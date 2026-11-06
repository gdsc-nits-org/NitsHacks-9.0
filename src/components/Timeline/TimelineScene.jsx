
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import ComicDay0Modal from './ComicDay0Modal';
import ComicDay1Modal from './ComicDay1Modal';
import ComicDay2Modal from './ComicDay2Modal';
import ComicDay3Modal from './ComicDay3Modal';

import helicarrierImg from '../../assets/helicarrier_final.png';
import quinjetImg from '../../assets/quinjet_final_clean.png';
import lokiImg from '../../assets/loki.png';
import ultronImg from '../../assets/ultron_perfect.png';
import thanosImg from '../../assets/thanos_perfect.png';
import doomImg from '../../assets/doom_perfect.png';

// SVG track path (1024 x 575 coordinate system)
const TRACK_PATH_DATA =
  'M 195 178 L 874.5 178 A 39.5 39.5 0 0 1 874.5 257 L 185.75 257 A 44.75 44.75 0 0 0 185.75 346 L 845 346';

// Target distances along SVG path
const TARGET_DISTANCES = {
  home: 100,
  loki: 250,
  ultron: 850,
  thanos: 1290,
  doom: 2240,
};

// Character-to-comic mapping
const DAY_FOR_TARGET = {
  loki: 0,
  ultron: 1,
  thanos: 2,
  doom: 3,
};

export default function TimelineScene() {
  const pathRef = useRef(null);
  const animFrameRef = useRef(null);
  const currentDistRef = useRef(TARGET_DISTANCES.home);
  const animationIdRef = useRef(0);

  const [openDay, setOpenDay] = useState(null);

  const [ship, setShip] = useState({
    x: 295,
    y: 178,
    angle: 0,
    flipY: false,
    isMoving: false,
    activeTarget: null,
  });

  // Calculate ship position and direction along SVG path
  const getShipTransform = useCallback((s, isForward = true) => {
    const path = pathRef.current;

    if (!path) return null;

    const totalLength = path.getTotalLength();
    const clampedS = Math.max(0, Math.min(totalLength, s));

    const point = path.getPointAtLength(clampedS);

    const delta = 2;

    const s1 = Math.max(0, clampedS - delta);
    const s2 = Math.min(totalLength, clampedS + delta);

    const p1 = path.getPointAtLength(s1);
    const p2 = path.getPointAtLength(s2);

    const dx = isForward
      ? p2.x - p1.x
      : p1.x - p2.x;

    const dy = isForward
      ? p2.y - p1.y
      : p1.y - p2.y;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const flipY = Math.abs(angle) > 90;

    return {
      x: point.x,
      y: point.y,
      angle,
      flipY,
    };
  }, []);

  // Initialize ship at home position
  useEffect(() => {
    const transform = getShipTransform(
      TARGET_DISTANCES.home,
      true
    );

    if (transform) {
      currentDistRef.current = TARGET_DISTANCES.home;

      setShip((prev) => ({
        ...prev,
        ...transform,
      }));
    }
  }, [getShipTransform]);

  // Cancel active animation safely
  const cancelShipAnimation = useCallback(() => {
    animationIdRef.current += 1;

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }

      document.body.style.overflow = 'unset';
    };
  }, []);

  // Move spacecraft to selected destination
  const moveToCharacter = useCallback(
    (targetKey) => {
      const path = pathRef.current;

      if (!path) return;

      const targetDist = TARGET_DISTANCES[targetKey];

      if (targetDist === undefined) return;

      const startDist = currentDistRef.current;
      const distanceDiff = targetDist - startDist;

      // Stop previous animation
      cancelShipAnimation();

      // Close previous popup
      setOpenDay(null);

      // Already at destination
      if (Math.abs(distanceDiff) < 2) {
        currentDistRef.current = targetDist;

        const transform = getShipTransform(targetDist, true);

        if (transform) {
          setShip({
            ...transform,
            isMoving: false,
            activeTarget: targetKey === 'home' ? null : targetKey,
          });
        }

        if (DAY_FOR_TARGET[targetKey] !== undefined) {
          setOpenDay(DAY_FOR_TARGET[targetKey]);
        }

        return;
      }

      const isForward = distanceDiff >= 0;

      // Smooth cinematic duration
      const duration = Math.min(
        2200,
        Math.max(900, Math.abs(distanceDiff) * 0.95)
      );

      const startTime = performance.now();
      const currentAnimationId = animationIdRef.current;

      setShip((prev) => ({
        ...prev,
        isMoving: true,
        activeTarget: targetKey === 'home' ? null : targetKey,
      }));

      const step = (currentTime) => {
        // Ignore outdated animation frames
        if (currentAnimationId !== animationIdRef.current) {
          return;
        }

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        // Ease-in-out cubic
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentS =
          startDist + distanceDiff * ease;

        currentDistRef.current = currentS;

        if (progress < 1) {
          const transform = getShipTransform(
            currentS,
            isForward
          );

          if (transform) {
            setShip({
              ...transform,
              isMoving: true,
              activeTarget: targetKey === 'home' ? null : targetKey,
            });
          }

          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Final destination position
          currentDistRef.current = targetDist;

          const finalTransform = getShipTransform(
            targetDist,
            isForward
          );

          if (finalTransform) {
            setShip({
              ...finalTransform,
              isMoving: false,
              activeTarget: targetKey === 'home' ? null : targetKey,
            });
          }

          animFrameRef.current = null;

          // Open corresponding comic modal
          if (DAY_FOR_TARGET[targetKey] !== undefined) {
            setOpenDay(DAY_FOR_TARGET[targetKey]);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [getShipTransform, cancelShipAnimation]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 md:py-10 select-none overflow-hidden">

      {/* TOP HEADING */}
      <div className="w-full text-center z-20 pt-2 sm:pt-4">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-widest text-white uppercase inline-block cursor-default"
          style={{
            fontFamily: "'Bangers', 'Impact', sans-serif",
            letterSpacing: '0.08em',
            textShadow:
              '0 3px 12px rgba(0,0,0,0.9), 0 0 24px rgba(255,255,255,0.25)',
          }}
        >
          TIMELINE
        </h1>
      </div>

      {/* TRACK AND CHARACTERS */}
      <div className="relative w-full max-w-[1100px] aspect-[1024/575] flex items-center justify-center my-auto">

        {/* SVG YELLOW TRACK */}
        <svg
          viewBox="0 0 1024 575"
          className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={TRACK_PATH_DATA}
            stroke="#eab308"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            style={{ filter: 'blur(3px)' }}
          />

          <path
            ref={pathRef}
            d={TRACK_PATH_DATA}
            stroke="#ffd000"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* HELICARRIER */}
        <button
          type="button"
          onClick={() => moveToCharacter('home')}
          aria-label="Return spacecraft to launch dock"
          title="Return spacecraft to launch dock"
          className="absolute z-20 cursor-pointer animate-float-slow group transition-transform duration-300 hover:scale-105"
          style={{
            left: '5.8%',
            top: '17.4%',
            width: '15.6%',
            aspectRatio: '160/145',
          }}
        >
          <img
            src={helicarrierImg}
            alt="Helicarrier"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] group-hover:brightness-110"
          />
        </button>

        {/* ANIMATED QUINJET */}
        <div
          className="absolute z-[25] pointer-events-none"
          style={{
            left: `${(ship.x / 1024) * 100}%`,
            top: `${(ship.y / 575) * 100}%`,
            width: '8.4%',
            aspectRatio: '100/70',
            transform: `translate(-50%, -68%) rotate(${ship.angle}deg) ${
              ship.flipY ? 'scaleY(-1)' : ''
            }`,
            transformOrigin: '50% 68%',
            transition: ship.isMoving
              ? 'none'
              : 'transform 0.4s ease-out',
          }}
        >
          {/* ENGINE GLOW */}
          {ship.isMoving && (
            <div
              className="absolute -left-3 top-[68%] -translate-y-1/2 w-6 h-3 bg-sky-400 rounded-full blur-[3px] opacity-80 pointer-events-none"
              style={{
                boxShadow:
                  '0 0 12px 4px rgba(56,189,248,0.9), 0 0 20px 6px rgba(14,165,233,0.6)',
              }}
            />
          )}

          <img
            src={quinjetImg}
            alt="Quinjet Spacecraft"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* LOKI - DAY 0 */}
        <button
          type="button"
          onClick={() => moveToCharacter('loki')}
          aria-label="Fly to Loki"
          title="Fly to Loki"
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'loki' ? 'scale-105' : ''
          }`}
          style={{
            left: '48%',
            top: '30.87%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={lokiImg}
            alt="Loki"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'loki'
                ? 'drop-shadow-[0_0_22px_rgba(34,197,94,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(34,197,94,0.7)]'
            }`}
          />
        </button>

        {/* ULTRON - DAY 1 - MIDDLE TRACK */}
        <button
          type="button"
          onClick={() => moveToCharacter('ultron')}
          aria-label="Fly to Ultron"
          title="Fly to Ultron"
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'ultron' ? 'scale-105' : ''
          }`}
          style={{
            left: '74.37%',
            top: '44.96%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={ultronImg}
            alt="Ultron"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'ultron'
                ? 'drop-shadow-[0_0_22px_rgba(239,68,68,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(239,68,68,0.7)]'
            }`}
          />
        </button>

        {/* THANOS - DAY 2 */}
        <button
          type="button"
          onClick={() => moveToCharacter('thanos')}
          aria-label="Fly to Thanos"
          title="Fly to Thanos"
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'thanos' ? 'scale-105' : ''
          }`}
          style={{
            left: '28.56%',
            top: '44.96%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={thanosImg}
            alt="Thanos"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'thanos'
                ? 'drop-shadow-[0_0_22px_rgba(168,85,247,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(168,85,247,0.7)]'
            }`}
          />
        </button>

        {/* DOCTOR DOOM - DAY 3 */}
        <button
          type="button"
          onClick={() => moveToCharacter('doom')}
          aria-label="Fly to Doctor Doom"
          title="Fly to Doctor Doom"
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group ${
            ship.activeTarget === 'doom' ? 'scale-105' : ''
          }`}
          style={{
            left: '87.74%',
            top: '59.74%',
            width: '10.84%',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={doomImg}
            alt="Doctor Doom"
            className={`w-full h-full object-contain rounded-full transition-all duration-300 ${
              ship.activeTarget === 'doom'
                ? 'drop-shadow-[0_0_22px_rgba(34,197,94,0.95)]'
                : 'group-hover:drop-shadow-[0_0_16px_rgba(34,197,94,0.7)]'
            }`}
          />
        </button>

      </div>

      {/* BOTTOM FOOTER */}
      <div className="w-full text-center z-20 pb-2 sm:pb-4">
        <p
          className="text-lg sm:text-xl md:text-2xl font-bold italic tracking-wider text-white uppercase inline-block cursor-default"
          style={{
            fontFamily: "'Bangers', 'Impact', sans-serif",
            letterSpacing: '0.06em',
            textShadow:
              '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(255,255,255,0.2)',
          }}
        >
          CLICK ON THE ICONS TO START
        </p>
      </div>

      {/* COMIC MODALS */}

      {/* DAY 0 - LOKI */}
      <ComicDay0Modal
        isOpen={openDay === 0}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('ultron')}
        onPrev={() => moveToCharacter('home')}
      />

      {/* DAY 1 - ULTRON */}
      <ComicDay1Modal
        isOpen={openDay === 1}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('thanos')}
        onPrev={() => moveToCharacter('loki')}
      />

      {/* DAY 2 - THANOS */}
      <ComicDay2Modal
        isOpen={openDay === 2}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('doom')}
        onPrev={() => moveToCharacter('ultron')}
      />

      {/* DAY 3 - DOCTOR DOOM */}
      <ComicDay3Modal
        isOpen={openDay === 3}
        onClose={() => setOpenDay(null)}
        onPrev={() => moveToCharacter('thanos')}
      />

    </div>
  );
}
