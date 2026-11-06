import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './TimelineSection.css';

// ─── Schedule Data for D-1, D-2, D-3, D-4 ───────────────────────────────────
const TIMELINE_DAYS = [
  {
    id: 'D-1',
    date: '9TH NOV',
    badgeLabel: 'D-1',
    eventName: 'OPENING CEREMONY',
    subEvent: 'Inauguration, Keynote Address & Theme Reveal',
    time: 'DAY 1 • 10:00 AM ONWARDS',
    // Positioned right beside the D-1 badge along the entrance road
    markerX: 350,
    markerY: 130,
    // SVG Badge center coordinates
    badgeX: 425,
    badgeY: 92,
  },
  {
    id: 'D-2',
    date: '10TH NOV',
    badgeLabel: 'D-2',
    eventName: 'HACKATHON COMMENCES',
    subEvent: '36-Hour Hack Begins, Mentorship Round 1 & Ideation',
    time: 'DAY 2 • 09:00 AM ONWARDS',
    // Positioned right beside the D-2 badge along the entrance road
    markerX: 450,
    markerY: 410,
    badgeX: 520,
    badgeY: 420,
  },
  {
    id: 'D-3',
    date: '11TH NOV',
    badgeLabel: 'D-3',
    eventName: 'MENTORING ROUND',
    subEvent: 'Progress Review with Industry Mentors & Checkpoints',
    time: 'DAY 3 • 11:00 AM - 08:00 PM',
    // Positioned right beside the D-3 badge along the entrance road
    markerX: 665,
    markerY: 140,
    badgeX: 740,
    badgeY: 120,
  },
  {
    id: 'D-4',
    date: '12TH NOV',
    badgeLabel: 'D-4',
    eventName: 'FINAL SHOWDOWN',
    subEvent: 'Code Freeze, Jury Demos, Grand Finale & Prize Gala',
    time: 'DAY 4 • 02:00 PM - 07:00 PM',
    // Positioned right beside the D-4 badge along the entrance road
    markerX: 800,
    markerY: 410,
    badgeX: 870,
    badgeY: 420,
  },
];

// Target coordinates for NAME box top edge in SVG viewBox
const NAME_BOX_TARGET = { x: 135, y: 468 };

// ─── Exact Miss Minutes SVG Clock Illustration ───────────────────────────────
function ExactMissMinutes() {
  return (
    <svg
      viewBox="0 0 200 230"
      className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,185,45,0.6)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Face Warm Radial Gradient */}
        <radialGradient id="mmFaceGrad" cx="46%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffea75" />
          <stop offset="60%" stopColor="#ffb923" />
          <stop offset="100%" stopColor="#d97500" />
        </radialGradient>

        {/* 3D Dial Rim */}
        <linearGradient id="mmDialRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3a1" />
          <stop offset="45%" stopColor="#e8940c" />
          <stop offset="100%" stopColor="#7a3700" />
        </linearGradient>

        {/* Boot Gold Gradient */}
        <linearGradient id="mmBootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe470" />
          <stop offset="100%" stopColor="#ba7802" />
        </linearGradient>

        {/* Glove White Gradient */}
        <linearGradient id="mmGlove" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ebebeb" />
        </linearGradient>
      </defs>

      {/* ─── Thin Black Stick Legs & Cute Mustard Boots ─── */}
      <g className="mm-legs">
        {/* Left Leg */}
        <line x1="86" y1="145" x2="80" y2="190" stroke="#1c1103" strokeWidth="4.5" strokeLinecap="round" />
        {/* Left Boot */}
        <g transform="translate(68, 186)">
          <path d="M 12 0 L 23 0 L 25 15 L 2 15 C -2 15 -2 8 4 8 L 12 8 Z" fill="url(#mmBootGrad)" stroke="#1c1103" strokeWidth="2.4" strokeLinejoin="round" />
          <rect x="10" y="-3.5" width="15" height="5.5" rx="2" fill="#fff09e" stroke="#1c1103" strokeWidth="1.8" />
        </g>

        {/* Right Leg */}
        <line x1="114" y1="145" x2="118" y2="190" stroke="#1c1103" strokeWidth="4.5" strokeLinecap="round" />
        {/* Right Boot */}
        <g transform="translate(108, 186)">
          <path d="M 10 0 L 21 0 L 23 15 L 0 15 C -4 15 -4 8 2 8 L 10 8 Z" fill="url(#mmBootGrad)" stroke="#1c1103" strokeWidth="2.4" strokeLinejoin="round" />
          <rect x="8" y="-3.5" width="15" height="5.5" rx="2" fill="#fff09e" stroke="#1c1103" strokeWidth="1.8" />
        </g>
      </g>

      {/* ─── Left Arm (Striped Sleeve + Pointing White Glove) ─── */}
      <motion.g
        animate={{ rotate: [-2, 3, -2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '48px 98px' }}
      >
        <path d="M 52 100 Q 28 92 34 72" fill="none" stroke="#ffb703" strokeWidth="7" strokeLinecap="round" />
        <path d="M 52 100 Q 28 92 34 72" fill="none" stroke="#1c1103" strokeWidth="7" strokeLinecap="round" strokeDasharray="4 6" />
        <rect x="25" y="67" width="16" height="6" rx="3" fill="#ffffff" stroke="#1c1103" strokeWidth="2" transform="rotate(-15 33 70)" />
        <g transform="translate(20, 40)">
          <path
            d="M 12 28 C 6 28 4 22 6 16 C 7 12 11 12 12 16 L 12 5 C 12 1.5 16.5 1.5 16.5 5 L 16.5 17 C 18.5 17 21.5 18 21.5 21 C 21.5 26 18 28 12 28 Z"
            fill="url(#mmGlove)" stroke="#1c1103" strokeWidth="2.2" strokeLinejoin="round"
          />
          <path d="M 10 20 L 14 20" stroke="#777" strokeWidth="1" strokeLinecap="round" />
        </g>
      </motion.g>

      {/* ─── Right Arm (Striped Sleeve + Hand on Hip) ─── */}
      <motion.g
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '152px 98px' }}
      >
        <path d="M 148 100 Q 172 106 165 128" fill="none" stroke="#ffb703" strokeWidth="7" strokeLinecap="round" />
        <path d="M 148 100 Q 172 106 165 128" fill="none" stroke="#1c1103" strokeWidth="7" strokeLinecap="round" strokeDasharray="4 6" />
        <rect x="156" y="125" width="16" height="6" rx="3" fill="#ffffff" stroke="#1c1103" strokeWidth="2" transform="rotate(35 164 128)" />
        <path d="M 152 130 C 158 127 168 131 166 139 C 164 145 154 145 148 138 Z" fill="url(#mmGlove)" stroke="#1c1103" strokeWidth="2.2" />
      </motion.g>

      {/* ─── Main Clock Head Body ─── */}
      <g>
        <circle cx="100" cy="95" r="57" fill="none" stroke="#100701" strokeWidth="5" opacity="0.75" />
        <circle cx="100" cy="95" r="55" fill="url(#mmDialRim)" stroke="#381b01" strokeWidth="3" />
        <circle cx="100" cy="95" r="50" fill="url(#mmFaceGrad)" stroke="#5c2e00" strokeWidth="2.4" />

        {/* 12 Clock Hour Ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const isQuarter = i % 3 === 0;
          const r1 = isQuarter ? 40 : 43;
          const r2 = 47.5;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(angle)} y1={95 + r1 * Math.sin(angle)}
              x2={100 + r2 * Math.cos(angle)} y2={95 + r2 * Math.sin(angle)}
              stroke="#2c1400" strokeWidth={isQuarter ? 3.2 : 1.8} strokeLinecap="round"
            />
          );
        })}

        {/* Clock Hands */}
        <line x1="100" y1="95" x2="79" y2="76" stroke="#2c1400" strokeWidth="3.6" strokeLinecap="round" />
        <line x1="100" y1="95" x2="128" y2="80" stroke="#2c1400" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="100" cy="95" r="3.6" fill="#2c1400" />

        {/* Big Cartoon Eyes with Eyelashes */}
        <g>
          <path d="M 72 70 Q 81 64 88 71" fill="none" stroke="#1c1103" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="80" cy="81" rx="9.5" ry="14" fill="#ffffff" stroke="#1c1103" strokeWidth="2" />
          <ellipse cx="83" cy="81" rx="6.2" ry="9" fill="#150a01" />
          <ellipse cx="85.5" cy="78" rx="2.6" ry="4.2" fill="#ffffff" />
          <circle cx="81" cy="85" r="1.4" fill="#ffffff" />
          <path d="M 72 73 L 67 67" stroke="#1c1103" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 77 69 L 74 63" stroke="#1c1103" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 84 68 L 84 62" stroke="#1c1103" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        
        <g>
          <path d="M 112 71 Q 119 64 128 70" fill="none" stroke="#1c1103" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="120" cy="81" rx="9.5" ry="14" fill="#ffffff" stroke="#1c1103" strokeWidth="2" />
          <ellipse cx="117" cy="81" rx="6.2" ry="9" fill="#150a01" />
          <ellipse cx="119.5" cy="78" rx="2.6" ry="4.2" fill="#ffffff" />
          <circle cx="115" cy="85" r="1.4" fill="#ffffff" />
          <path d="M 116 68 L 116 62" stroke="#1c1103" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 123 69 L 126 63" stroke="#1c1103" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 128 73 L 133 67" stroke="#1c1103" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* Cute Nose Dot */}
        <circle cx="100" cy="93" r="2" fill="#421f00" />

        {/* Smile */}
        <g>
          <path d="M 86 103 Q 100 123 114 103 Z" fill="#7a0e0e" stroke="#1c1103" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 88 103 Q 100 110 112 103 Z" fill="#ffffff" />
          <path d="M 94 113 Q 100 121 106 113 Z" fill="#ff7b92" />
        </g>
      </g>
    </svg>
  );
}

// ─── Main Timeline Section Export ────────────────────────────────────────────
export default function TimelineSection() {
  const [activeDayId, setActiveDayId] = useState('D-1');
  const [barWidths, setBarWidths] = useState([68, 85, 52, 74]);

  const activeDay =
    TIMELINE_DAYS.find((d) => d.id === activeDayId) || TIMELINE_DAYS[0];

  // Random real-time telemetry bars below the clock
  useEffect(() => {
    const interval = setInterval(() => {
      setBarWidths([
        Math.floor(28 + Math.random() * 68),
        Math.floor(38 + Math.random() * 58),
        Math.floor(22 + Math.random() * 72),
        Math.floor(32 + Math.random() * 64),
      ]);
    }, 260);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="tva-timeline-wrapper" id="timeline">
      {/* ─── CRT Monitor Outer Screen Frame ─── */}
      <div className="tva-crt-screen">
        {/* CRT Scanlines, Vignette & Glass Glare */}
        <div className="tva-crt-scanlines" />
        <div className="tva-crt-vignette" />
        <div className="tva-crt-glare" />

        {/* ─── 1. Top Header Bar (High Brightness) ─── */}
        <div className="tva-header-box">
          <div className="tva-header-title">Timeline</div>
          <div className="tva-header-brand">NITSHACKS</div>
          <div className="tva-header-marvel">MARVEL</div>
        </div>

        {/* ─── 2. Main Interface Body ─── */}
        <div className="tva-main-grid">
          {/* ─── Left Column: Exact Miss Minutes + 4 Animated Bars ─── */}
          <div className="tva-left-panel">
            {/* Miss Minutes Display Box */}
            <div className="tva-clock-frame">
              <ExactMissMinutes />
            </div>

            {/* 4 Horizontal Equalizer / Telemetry Bars with Circular Dots */}
            <div className="tva-equalizer-container">
              {barWidths.map((w, idx) => (
                <div key={idx} className="tva-eq-row">
                  <span className="tva-eq-dot" />
                  <div className="tva-eq-track">
                    <div
                      className="tva-eq-fill"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right Column: Interactive Timeline Map (Self-Contained SVG) ─── */}
          <div className="tva-map-frame">
            <svg
              className="tva-map-svg"
              viewBox="0 0 1000 550"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Intense Orange Route Outer Glow */}
                <filter id="routeGlowBright" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="12" result="blur1" />
                  <feGaussianBlur stdDeviation="5" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Yellow Branch Line Glow */}
                <filter id="yellowBranchGlowBright" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Exact Aircraft Marker Glow */}
                <filter id="aircraftGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Red Badge Glow */}
                <filter id="redBadgeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ─── A. Deep Map Background & Grid ─── */}
              <rect width="1000" height="550" fill="#180d04" />

              {/* Street Blocks / Urban Grid */}
              <g stroke="#3f250b" strokeWidth="0.9" opacity="0.55">
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 42} x2="1000" y2={i * 42} />
                ))}
                {Array.from({ length: 22 }).map((_, i) => (
                  <line key={`v-${i}`} x1={i * 48} y1="0" x2={i * 48} y2="550" />
                ))}

              </g>
              

              {/* ─── B. Topographical Contour Elevation Lines ─── */}
              <g fill="none" stroke="#52310f" strokeWidth="1.3" opacity="0.68">
                <path d="M 0 180 Q 200 140 400 170 T 800 130 T 1000 190" />
                <path d="M 0 240 Q 220 200 450 230 T 850 200 T 1000 240" />
                <path d="M 0 350 Q 180 320 380 360 T 750 330 T 1000 380" />
                <path d="M 0 420 Q 260 380 500 430 T 880 390 T 1000 440" />
                <path d="M 120 60 Q 260 40 380 90 T 600 80" />
                <path d="M 680 60 Q 820 40 950 80" />
                <path d="M 280 470 Q 420 440 600 480" />
                <path d="M 650 490 Q 780 460 920 500" />
              </g>

              {/* ─── C. Glowing Yellow Branch Paths to Day Markers ─── */}
              <g filter="url(#yellowBranchGlowBright)" fill="none" stroke="#ffe352" strokeWidth="3.6" strokeLinecap="round">
                {/* Branch to D-0 (top-left) */}
                <path d="M 378 260 C 378 200, 395 150, 425 112" />
                {/* Branch to D-1 (bottom-center) */}
                <path d="M 430 295 C 445 350, 480 390, 520 410" />
                {/* Branch to D-2 (top-right) */}
                <path d="M 640 315 C 660 250, 700 180, 740 140" />
                {/* Branch to D-3 (bottom-right) */}
                <path d="M 770 345 C 800 385, 840 415, 870 410" />

                {/* Secondary natural forks matching screenshot */}
                <path d="M 360 230 C 320 260, 270 280, 220 290" opacity="0.75" strokeWidth="2.4" />
                <path d="M 500 400 C 530 430, 550 460, 565 500" opacity="0.8" strokeWidth="2.5" />
                <path d="M 670 240 C 685 190, 700 140, 715 80" opacity="0.75" strokeWidth="2.4" />
                <path d="M 810 380 C 825 395, 840 420, 850 460" opacity="0.8" strokeWidth="2.5" />
              </g>

              {/* ─── D. High-Brightness Luminous Orange / Gold Highway ─── */}
              {/* Outer Radiant Heat Glow */}
              <path
                d="M 0 320 C 180 285, 340 260, 520 290 C 680 315, 780 355, 860 350 C 910 345, 960 300, 1000 285"
                fill="none"
                stroke="#ff7700"
                strokeWidth="24"
                strokeLinecap="round"
                opacity="0.55"
                filter="url(#routeGlowBright)"
              />

              {/* Mid Layer Radiant Neon Amber Beam */}
              <path
                d="M 0 320 C 180 285, 340 260, 520 290 C 680 315, 780 355, 860 350 C 910 345, 960 300, 1000 285"
                fill="none"
                stroke="#ffab38"
                strokeWidth="13"
                strokeLinecap="round"
                opacity="0.88"
                filter="url(#routeGlowBright)"
              />

              {/* Hot White-Cream Core Beam */}
              <path
                d="M 0 320 C 180 285, 340 260, 520 290 C 680 315, 780 355, 860 350 C 910 345, 960 300, 1000 285"
                fill="none"
                stroke="#fff8e0"
                strokeWidth="5.5"
                strokeLinecap="round"
              />

              {/* ─── E. Dynamic Red Dotted Line to NAME Box ─── */}
              {/* Starts directly from the moving marker's center */}
              <g className="tva-connection-line">
                <motion.line
                  initial={false}
                  animate={{
                    x1: activeDay.markerX,
                    y1: activeDay.markerY,
                    x2: NAME_BOX_TARGET.x,
                    y2: NAME_BOX_TARGET.y,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 20,
                  }}
                  stroke="#ff3838"
                  strokeWidth="2.4"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                {/* Red anchor dot at connection point on NAME box */}
                <circle
                  cx={NAME_BOX_TARGET.x}
                  cy={NAME_BOX_TARGET.y}
                  r="3.5"
                  fill="#ff4d4d"
                />
              </g>

              {/* ─── F. Exact Moving Marker (Angled Cross/Aircraft from Screenshot) ─── */}
              <motion.g
                animate={{
                  x: activeDay.markerX,
                  y: activeDay.markerY,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 18,
                }}
                filter="url(#aircraftGlow)"
              >
                {/* Rotated Cross Aircraft Icon: -35deg angle matching marker_crop.png */}
                <g transform="rotate(-35)">
                  {/* Central Main Fuselage Bar */}
                  <rect
                    x="-4.5"
                    y="-14"
                    width="9"
                    height="28"
                    rx="3.5"
                    fill="#f4ffa8"
                    stroke="#d9ef40"
                    strokeWidth="1.2"
                  />
                  {/* Perpendicular Cross Wings Bar */}
                  <rect
                    x="-11"
                    y="-1"
                    width="22"
                    height="7.5"
                    rx="2.5"
                    fill="#f4ffa8"
                    stroke="#d9ef40"
                    strokeWidth="1.2"
                  />
                  {/* Glowing Core Highlight */}
                  <circle cx="0" cy="2" r="2.2" fill="#ffffff" />
                </g>
              </motion.g>

              {/* ─── G. Exact SVG Day Badges (D-1, D-2, D-3, D-4 - Larger with Dates) ─── */}
              {/* Rendered directly in SVG so they NEVER get hidden on mobile */}
              {TIMELINE_DAYS.map((ev) => {
                const isActive = ev.id === activeDayId;
                const bx = ev.badgeX - 44;
                const by = ev.badgeY - 22;
                return (
                  <g
                    key={ev.id}
                    className="tva-svg-day-badge"
                    onClick={() => setActiveDayId(ev.id)}
                    filter={isActive ? 'url(#redBadgeGlow)' : undefined}
                  >
                    {/* Badge Outer Hit Area */}
                    <rect x={bx - 6} y={by - 6} width="100" height="74" fill="transparent" />

                    {/* Dark Crimson Translucent Panel (Enlarged) */}
                    <polygon
                      points={`${bx + 12},${by + 2} ${bx + 76},${by + 2} ${bx + 86},${by + 12} ${bx + 86},${by + 32} ${bx + 76},${by + 42} ${bx + 12},${by + 42} ${bx + 2},${by + 32} ${bx + 2},${by + 12}`}
                      fill={isActive ? 'rgba(95, 10, 10, 0.98)' : 'rgba(38, 5, 5, 0.92)'}
                    />

                    {/* Inner Octagon Red Border (Enlarged) */}
                    <polygon
                      points={`${bx + 12},${by + 2} ${bx + 76},${by + 2} ${bx + 86},${by + 12} ${bx + 86},${by + 32} ${bx + 76},${by + 42} ${bx + 12},${by + 42} ${bx + 2},${by + 32} ${bx + 2},${by + 12}`}
                      fill="none"
                      stroke={isActive ? '#ff4d4d' : '#ff2626'}
                      strokeWidth={isActive ? '2.5' : '2'}
                    />

                    {/* 4 Outer Corner Triangles (Exact from Screenshot) */}
                    {/* Top-Left */}
                    <polygon points={`${bx + 2},${by + 12} ${bx + 12},${by + 2} ${bx + 2},${by + 2}`} fill="#ff3838" />
                    {/* Top-Right */}
                    <polygon points={`${bx + 76},${by + 2} ${bx + 86},${by + 12} ${bx + 86},${by + 2}`} fill="#ff3838" />
                    {/* Bottom-Left */}
                    <polygon points={`${bx + 2},${by + 32} ${bx + 12},${by + 42} ${bx + 2},${by + 42}`} fill="#ff3838" />
                    {/* Bottom-Right */}
                    <polygon points={`${bx + 76},${by + 42} ${bx + 86},${by + 32} ${bx + 86},${by + 42}`} fill="#ff3838" />

                    {/* Badge Label Text (D-1, D-2, D-3, D-4) - Larger */}
                    <text
                      x={ev.badgeX}
                      y={ev.badgeY + 7}
                      textAnchor="middle"
                      fill="#ff3b3b"
                      fontSize="20"
                      fontWeight="700"
                      fontFamily="'Share Tech Mono', 'Orbitron', monospace"
                      letterSpacing="0.08em"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(255, 59, 59, 0.95))' }}
                    >
                      {ev.badgeLabel}
                    </text>

                    {/* Date Capsule Below Badge (High Visibility & Brightness) */}
                    <g transform={`translate(${bx}, ${by + 48})`}>
                      {/* Dark High-Contrast Background Capsule */}
                      <rect
                        x="0"
                        y="0"
                        width="88"
                        height="24"
                        rx="4"
                        fill="rgba(18, 8, 2, 0.96)"
                        stroke={isActive ? '#ffea4a' : 'rgba(255, 190, 55, 0.7)'}
                        strokeWidth="1.6"
                        style={{
                          filter: isActive
                            ? 'drop-shadow(0 0 10px rgba(255, 234, 74, 0.85))'
                            : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.95))',
                        }}
                      />
                      {/* High-Brightness Date Text */}
                      <text
                        x="44"
                        y="17"
                        textAnchor="middle"
                        fill={isActive ? '#ffffff' : '#ffea4a'}
                        fontSize="14"
                        fontWeight="800"
                        fontFamily="'Share Tech Mono', 'Orbitron', monospace"
                        letterSpacing="0.1em"
                        style={{
                          filter: isActive
                            ? 'drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 12px #ffea4a)'
                            : 'drop-shadow(0 0 5px rgba(255, 234, 74, 0.85))',
                        }}
                      >
                        {ev.date}
                      </text>
                    </g>

                    {/* Active Ping Radar Indicator */}
                    {isActive && (
                      <circle
                        cx={ev.badgeX}
                        cy={ev.badgeY}
                        r="30"
                        fill="none"
                        stroke="rgba(255, 60, 60, 0.6)"
                        strokeWidth="1.6"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}

              {/* ─── H. NAME Box (Exact Rectangle from Screenshot) ─── */}
              {/* Positioned at x=45, y=468 in SVG viewBox so it NEVER overlaps D-1 or D-2 */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  const currentIndex = TIMELINE_DAYS.findIndex((e) => e.id === activeDayId);
                  const nextIndex = (currentIndex + 1) % TIMELINE_DAYS.length;
                  setActiveDayId(TIMELINE_DAYS[nextIndex].id);
                }}
              >
                {/* Yellow Outer Border Box */}
                <rect
                  x="45"
                  y="468"
                  width="180"
                  height="46"
                  rx="2"
                  fill="rgba(24, 13, 3, 0.96)"
                  stroke="#e5a435"
                  strokeWidth="2.2"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(229, 164, 53, 0.5))' }}
                />

                {/* Event Name Text Inside Box */}
                <text
                  x="135"
                  y="498"
                  textAnchor="middle"
                  fill="#f7e599"
                  fontSize="17"
                  fontWeight="700"
                  fontFamily="'VT323', 'Share Tech Mono', monospace"
                  letterSpacing="0.12em"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(247, 229, 153, 0.75))' }}
                >
                  {activeDay.eventName}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* ─── 3. Event Schedule Banner (Below Map Frame) ─── */}
        {/* Full event details clearly displayed on all devices without covering map */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.id}
            className="tva-event-status-bar"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="tva-status-tag">
              ✦ [{activeDay.badgeLabel}] {activeDay.time}
            </div>
            <div className="tva-status-title">
              {activeDay.eventName}
            </div>
            <div className="tva-status-desc">
              {activeDay.subEvent}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
