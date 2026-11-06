import React from 'react';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/nitshacks',
    icon: () => (
      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/nitshacks',
    icon: () => (
      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/nitshacks',
    icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/nitshacks',
    icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    'National Institute of Technology Silchar'
  )}&output=embed`;

  return (
    <footer className="relative w-full overflow-hidden bg-[#e5e5e5] text-black border-t-4 border-black select-none">
      {/* 1. Manga / Halftone Dots Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 grayscale contrast-125 mix-blend-multiply"
        style={{
          backgroundImage: "url('/hero/comic_dots_bg.png')",
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Top Avengers / NITSHACKS Emblem */}
      <div className="relative z-10 flex justify-center pt-8 md:pt-12">
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#262626"
              strokeWidth="9"
            />
            <path
              d="M 52 14 L 60 14 L 37 84 L 27 84 Z"
              fill="#262626"
            />
            <path
              d="M 52 14 L 60 14 L 75 78 L 84 84 L 73 84 L 65 77 L 59 45 Z"
              fill="#262626"
            />
            <path
              d="M 32 52 L 72 52 L 72 47 L 82 55 L 72 63 L 72 58 L 32 58 Z"
              fill="#262626"
            />
          </svg>
        </div>
      </div>

      {/* 3. Middle Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Column: Visit Technoesis Badge & Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <a
            href="https://technoesis.org"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center bg-gradient-to-r from-[#e52535] to-[#ff4359] text-white font-black tracking-wider uppercase px-5 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000000] transition-all"
          >
            <span className="text-xl italic font-black mr-2 font-mono group-hover:scale-110 transition-transform">
              TS
            </span>
            <span className="text-sm sm:text-base tracking-widest font-extrabold font-sans">
              VISIT TECHNOESIS
            </span>
          </a>

          <div className="pt-2 flex flex-col items-center md:items-start">
            <h4 className="text-xl font-black italic tracking-wide uppercase font-sans text-gray-900 mb-2">
              CONTACT US
            </h4>

            <div className="flex items-center space-x-3 text-black">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="p-1.5 rounded-md hover:scale-110 hover:text-[#e52535] transition-all"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            <a
              href="mailto:nitshacks.nits@gmail.com"
              className="mt-2 text-sm font-bold tracking-tight text-gray-900 hover:text-[#e52535] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              nitshacks.nits@gmail.com
            </a>
          </div>
        </div>

        {/* Center Column: Comic Title NITSHACKS 9.0 */}
        <div className="flex justify-center">
          <div className="inline-flex items-stretch border-4 border-black bg-white shadow-[6px_6px_0px_#000000]">
            <div className="bg-[#e52535] text-white px-4 sm:px-6 py-2 sm:py-3 font-black text-2xl sm:text-4xl tracking-tighter uppercase font-sans flex items-center justify-center">
              NITSHACKS
            </div>
            <div className="bg-white text-black px-4 sm:px-5 py-2 sm:py-3 font-black text-2xl sm:text-4xl tracking-tight border-l-4 border-black flex items-center justify-center font-mono">
              9.0
            </div>
          </div>
        </div>

        {/* Right Column: How to Reach? Embedded Dark Map */}
        <div className="flex flex-col items-center md:items-end">
          <div className="w-full max-w-[280px]">
            <span className="block text-sm font-bold tracking-wide text-gray-800 mb-1.5 font-sans text-left md:text-right">
              How to Reach?
            </span>
            <div className="relative w-full h-36 rounded-xl overflow-hidden border-2 border-black bg-[#1f2937] shadow-[3px_3px_0px_#000000]">
              <iframe
                title="NIT Silchar Location"
                src={mapSrc}
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=National+Institute+of+Technology+Silchar"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-1.5 right-1.5 bg-black/80 hover:bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded transition-colors"
              >
                Open Map ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Copyright & Credits */}
      <div className="relative z-10 text-center pb-4 pt-2 text-[10px] sm:text-xs tracking-wider uppercase font-bold text-gray-700 space-y-0.5">
        <p>MADE BY GDG ON CAMPUS NIT SILCHAR</p>
        <p>
          COPYRIGHT 2026, NITS HACKS 9.0, NATIONAL INSTITUTE OF TECHNOLOGY, SILCHAR
        </p>
      </div>

      {/* 5. Comic Building Skyline along the bottom */}
      <div className="relative z-10 w-full h-24 sm:h-32 pointer-events-none mt-2">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const x = i * 60;
            const heights = [70, 95, 80, 110, 85, 100, 75, 105];
            const h = heights[i % heights.length];
            const y = 120 - h;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width="56"
                  height={h}
                  fill="#1c1917"
                  stroke="#000000"
                  strokeWidth="2.5"
                />
                <rect
                  x={x + 16}
                  y={y - 8}
                  width="24"
                  height="8"
                  fill="#1c1917"
                  stroke="#000000"
                  strokeWidth="2"
                />
                {Array.from({ length: Math.floor(h / 20) }).map((_, row) => (
                  <React.Fragment key={row}>
                    <rect
                      x={x + 10}
                      y={y + 12 + row * 18}
                      width="12"
                      height="10"
                      fill={
                        (i + row) % 5 === 0
                          ? '#44403c'
                          : (i + row) % 2 === 0
                          ? '#facc15'
                          : '#eab308'
                      }
                      stroke="#000000"
                      strokeWidth="1"
                    />
                    <rect
                      x={x + 34}
                      y={y + 12 + row * 18}
                      width="12"
                      height="10"
                      fill={
                        (i + row) % 3 === 0
                          ? '#facc15'
                          : (i + row) % 4 === 0
                          ? '#ca8a04'
                          : '#44403c'
                      }
                      stroke="#000000"
                      strokeWidth="1"
                    />
                  </React.Fragment>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </footer>
  );
}
