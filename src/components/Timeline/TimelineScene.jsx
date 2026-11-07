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

// =====================================================
// TRACK & COORDINATE CONFIGURATION (viewBox 0 0 1024 575)
// Line 1: Y = 178 (30.96%)
// Line 2: Y = 257 (44.70%)
// Line 3: Y = 346 (60.17%)
// =====================================================

const TRACK_PATH_DATA =
  'M 195 178 L 874.5 178 A 39.5 39.5 0 0 1 874.5 257 L 185.75 257 A 44.75 44.75 0 0 0 185.75 346 L 845 346';

// Exact distances along the SVG track to stop precisely at the center of each icon
const TARGET_DISTANCES = {
  home: 100,
  loki: 200,    // Line 1
  ultron: 895,  // Line 2 (shifted rightward toward the bend)
  thanos: 1300, // Line 2 (left section)
  doom: 2240,   // Line 3
};

const DAY_FOR_TARGET = {
  loki: 0,
  ultron: 1,
  thanos: 2,
  doom: 3,
};

// Unified character metadata
const CHARACTERS = [
  {
    key: 'loki',
    day: 0,
    name: 'Loki',
    dayLabel: 'DAY 0',
    img: lokiImg,
    leftPercent: '38.5%',
    topPercent: '30.96%',
    glowColor: 'rgba(34, 197, 94, 0.9)', // Green
  },
  {
    key: 'ultron',
    day: 1,
    name: 'Ultron',
    dayLabel: 'DAY 1',
    img: ultronImg,
    // Shifted right on the second line
    leftPercent: '67.5%',
    topPercent: '44.70%',
    glowColor: 'rgba(239, 68, 68, 0.95)', // Red
  },
  {
    key: 'thanos',
    day: 2,
    name: 'Thanos',
    dayLabel: 'DAY 2',
    img: thanosImg,
    leftPercent: '25.4%',
    topPercent: '44.70%',
    glowColor: 'rgba(168, 85, 247, 0.95)', // Purple
  },
  {
    key: 'doom',
    day: 3,
    name: 'Doctor Doom',
    dayLabel: 'DAY 3',
    img: doomImg,
    leftPercent: '80.0%',
    topPercent: '60.17%',
    glowColor: 'rgba(16, 185, 129, 0.95)', // Emerald
  },
];

export default function TimelineScene() {
  const pathRef = useRef(null);
  const animFrameRef = useRef(null);
  const currentDistRef = useRef(TARGET_DISTANCES.home);

  const [openDay, setOpenDay] = useState(null);
  const [ship, setShip] = useState({
    x: 195,
    y: 178,
    angle: 0,
    flipY: false,
    isMoving: false,
    activeTarget: null,
  });

  // Calculate Quinjet Position & Angle
  const getShipTransform = useCallback((s, isForward = true) => {
    if (!pathRef.current) return null;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const clampedS = Math.max(0, Math.min(totalLength, s));
    const pt = path.getPointAtLength(clampedS);

    const delta = 2;
    const s1 = Math.max(0, clampedS - delta);
    const s2 = Math.min(totalLength, clampedS + delta);

    const p1 = path.getPointAtLength(s1);
    const p2 = path.getPointAtLength(s2);

    const dx = isForward ? p2.x - p1.x : p1.x - p2.x;
    const dy = isForward ? p2.y - p1.y : p1.y - p2.y;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const flipY = Math.abs(angle) > 90;

    return {
      x: pt.x,
      y: pt.y,
      angle,
      flipY,
    };
  }, []);

  // Initialize Ship
  useEffect(() => {
    if (!pathRef.current) return;
    const transform = getShipTransform(TARGET_DISTANCES.home, true);
    if (transform) {
      setShip((prev) => ({ ...prev, ...transform }));
    }
  }, [getShipTransform]);

  // Cleanup Animation Frame
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Smooth Movement
  const moveToCharacter = useCallback(
    (targetKey) => {
      if (!pathRef.current) return;

      const targetDist = TARGET_DISTANCES[targetKey];
      if (targetDist === undefined) return;

      const startDist = currentDistRef.current;
      const distanceDiff = targetDist - startDist;

      if (Math.abs(distanceDiff) < 2) {
        setShip((prev) => ({
          ...prev,
          isMoving: false,
          activeTarget: targetKey === 'home' ? null : targetKey,
        }));
        if (DAY_FOR_TARGET[targetKey] !== undefined) {
          setOpenDay(DAY_FOR_TARGET[targetKey]);
        }
        return;
      }

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      const isForward = distanceDiff >= 0;
      const duration = Math.min(
        2200,
        Math.max(900, Math.abs(distanceDiff) * 0.95)
      );
      const startTime = performance.now();

      setShip((prev) => ({
        ...prev,
        isMoving: true,
        activeTarget: targetKey,
      }));

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentS = startDist + distanceDiff * ease;
        currentDistRef.current = currentS;

        if (progress < 1) {
          const transform = getShipTransform(currentS, isForward);
          if (transform) {
            setShip({
              ...transform,
              isMoving: true,
              activeTarget: targetKey,
            });
          }
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          const restTransform = getShipTransform(targetDist, true);
          if (restTransform) {
            setShip({
              ...restTransform,
              isMoving: false,
              activeTarget: targetKey === 'home' ? null : targetKey,
            });
          }
          if (DAY_FOR_TARGET[targetKey] !== undefined) {
            setOpenDay(DAY_FOR_TARGET[targetKey]);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [getShipTransform]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 md:py-10 select-none overflow-hidden">
      
      {/* ================= TITLE ================= */}
      <div className="w-full text-center z-20 pt-2 sm:pt-4">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-widest text-white uppercase inline-block"
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

      {/* ================= TRACK CONTAINER ================= */}
      <div className="relative w-full max-w-[1120px] aspect-[1024/575] flex items-center justify-center my-auto">
        
        {/* SVG TRACK */}
        <svg
          viewBox="0 0 1024 575"
          className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Glow */}
          <path
            d={TRACK_PATH_DATA}
            stroke="#eab308"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            style={{ filter: 'blur(4px)' }}
          />
          {/* Main Bright Track */}
          <path
            ref={pathRef}
            d={TRACK_PATH_DATA}
            stroke="#ffcc00"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* ================= HELICARRIER ================= */}
        <div
          onClick={() => moveToCharacter('home')}
          className="absolute z-20 cursor-pointer animate-float-slow group transition-transform duration-300 hover:scale-105"
          title="Return spacecraft to launch dock"
          style={{
            left: '5.2%',
            top: '17.4%',
            width: '16%',
            aspectRatio: '160/145',
          }}
        >
          <img
            src={helicarrierImg}
            alt="Helicarrier"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] group-hover:brightness-110"
          />
        </div>

        {/* ================= QUINJET ================= */}
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
              : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {ship.isMoving && (
            <div
              className="absolute -left-3 top-[68%] -translate-y-1/2 w-6 h-3 bg-sky-400 rounded-full blur-[3px] opacity-80"
              style={{
                boxShadow:
                  '0 0 12px 4px rgba(56,189,248,0.9), 0 0 20px rgba(14,165,233,0.6)',
              }}
            />
          )}
          <img
            src={quinjetImg}
            alt="Quinjet Spacecraft"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* ================= IDENTICAL SIZED & ALIGNED ICONS ================= */}
        {CHARACTERS.map((char) => {
          const isActive = ship.activeTarget === char.key;
          return (
            <div
              key={char.key}
              onClick={() => moveToCharacter(char.key)}
              className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 group flex flex-col items-center ${
                isActive ? 'scale-110' : ''
              }`}
              title={`Fly to ${char.name} - ${char.dayLabel}`}
              style={{
                left: char.leftPercent,
                top: char.topPercent,
                width: 'clamp(58px, 8.8vw, 92px)',
                height: 'clamp(58px, 8.8vw, 92px)',
              }}
            >
              {/* Perfectly uniform circular container */}
              <div
                className="w-full h-full rounded-full border-[3.5px] border-white overflow-hidden bg-slate-900 shadow-2xl transition-all duration-300 flex items-center justify-center"
                style={{
                  boxShadow: isActive
                    ? `0 0 24px 6px ${char.glowColor}, 0 4px 14px rgba(0,0,0,0.9)`
                    : `0 0 14px 2px ${char.glowColor}, 0 4px 10px rgba(0,0,0,0.8)`,
                }}
              >
                <img
                  src={char.img}
                  alt={char.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Day Label */}
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-black tracking-widest text-white px-2 py-0.5 rounded shadow-md bg-black/70 border border-white/20"
                style={{
                  fontFamily: "'Bangers', 'Impact', sans-serif",
                  letterSpacing: '0.08em',
                }}
              >
                {char.dayLabel}
              </span>
            </div>
          );
        })}

      </div>

      {/* ================= FOOTER ================= */}
      <div className="w-full text-center z-20 pb-2 sm:pb-4">
        <p
          className="text-lg sm:text-xl md:text-2xl font-bold italic tracking-wider text-white uppercase inline-block"
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

      {/* ================= COMIC MODALS ================= */}
      <ComicDay0Modal
        isOpen={openDay === 0}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('ultron')}
      />

      <ComicDay1Modal
        isOpen={openDay === 1}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('thanos')}
        onPrev={() => moveToCharacter('loki')}
      />

      <ComicDay2Modal
        isOpen={openDay === 2}
        onClose={() => setOpenDay(null)}
        onNext={() => moveToCharacter('doom')}
        onPrev={() => moveToCharacter('ultron')}
      />

      <ComicDay3Modal
        isOpen={openDay === 3}
        onClose={() => setOpenDay(null)}
        onPrev={() => moveToCharacter('thanos')}
      />

    </div>
  );
}