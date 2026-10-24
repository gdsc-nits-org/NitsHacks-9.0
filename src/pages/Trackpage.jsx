import React, { useState, useEffect } from 'react';

const TRACKS = [
  {
    id: 'coding',
    title: 'CODING',
    image: '/trackimage/Component34.png',
    popupImage: '/trackimage/coding.png',
    registerLink: 'https://gdgcnits.com',
    buttonCoords: {
      left: '13.5%',
      bottom: '6.5%',
      width: '35%',
      height: '8.5%',
    },
    description:
      'Algorithmic mastery, data structures, competitive programming, and optimization challenges.',
    tilt: '-rotate-[5deg]',
    zIndex: 'z-10',
    hoverTilt: 'hover:-rotate-[3deg]',
  },
  {
    id: 'software',
    title: 'SOFTWARE',
    image: '/trackimage/Component35.png',
    popupImage: '/trackimage/software.png',
    registerLink: 'https://gdgcnits.com',
    buttonCoords: {
      left: '32%',
      bottom: '2.7%',
      width: '36%',
      height: '8.5%',
    },
    description:
      'Full-stack engineering, web and mobile applications, scalable microservices, and APIs.',
    tilt: '-rotate-[0.5deg]',
    zIndex: 'z-20',
    hoverTilt: 'hover:rotate-0',
  },
  {
    id: 'uiux',
    title: 'UI/UX',
    image: '/trackimage/Component36.png',
    popupImage: '/trackimage/ux.png',
    registerLink: 'https://gdgcnits.com',
    buttonCoords: {
      left: '51.5%',
      bottom: '8.5%',
      width: '35%',
      height: '8.5%',
    },
    description:
      'User-centered interface design, interaction design, creative prototyping, and design systems.',
    tilt: 'rotate-[4.5deg]',
    zIndex: 'z-10',
    hoverTilt: 'hover:rotate-[3deg]',
  },
];

const EMBLEMS = [
  {
    id: 'avengers',
    name: 'Avengers',
    label: 'Home',
    image: '/trackimage/Component29.png',
    border: 'border-[#334155]',
    bg: 'bg-[#182330]',
  },
  {
    id: 'f4',
    name: 'Fantastic Four',
    label: 'Tracks',
    image: '/trackimage/Component30.png',
    border: 'border-white ring-2 sm:ring-4 ring-[#38bdf8]',
    bg: 'bg-[#0284c7]',
  },
  {
    id: 'xmen',
    name: 'X-Men',
    label: 'Timeline',
    image: '/trackimage/Component31.png',
    border: 'border-[#450a0a]',
    bg: 'bg-[#b91c1c]',
  },
  {
    id: 'shield',
    name: 'S.H.I.E.L.D.',
    label: 'Teams',
    image: '/trackimage/Component32.png',
    border: 'border-zinc-800',
    bg: 'bg-[#e2e8f0]',
  },
  {
    id: 'hydra',
    name: 'Hydra',
    label: 'FAQs',
    image: '/trackimage/Component33.png',
    border: 'border-[#450a0a]',
    bg: 'bg-[#7f1d1d]',
  },
];

export default function TrackPage() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedTrack(null);
    };
    if (selectedTrack) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedTrack]);

  return (
    <section className="relative isolate h-[100svh] w-full overflow-hidden bg-[#070e17]">
      {/* Page Content: Tints and lowers contrast smoothly when popup is active without blur */}
      <div
        className={`flex h-full w-full flex-col items-center justify-between px-4 py-4 sm:py-6 transition-[filter] duration-300 ${
          selectedTrack ? 'contrast-75 brightness-75' : 'contrast-100 brightness-100'
        }`}
      >
        {/* Background Image */}
        <div
          className="pointer-events-none absolute inset-0 z-[-2]"
          style={{
            backgroundImage: "url('/trackimage/trackbackground.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Dark Ambient Overlay */}
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-[#070e17]/50" />

        {/* City Skyline Silhouette */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[32vh] items-end justify-between gap-2 overflow-hidden px-1 opacity-25">
          <div className="h-[55%] w-20 shrink-0 bg-[#0f2034]" />
          <div className="h-[90%] w-24 shrink-0 bg-[#0a1624]" />
          <div className="h-[65%] w-20 shrink-0 bg-[#12243a]" />
          <div className="h-[78%] w-28 shrink-0 bg-[#0c1929]" />
          <div className="h-[50%] w-20 shrink-0 bg-[#0f2034]" />
          <div className="h-[75%] w-24 shrink-0 bg-[#12243a]" />
          <div className="h-[90%] w-20 shrink-0 bg-[#0a1624]" />
        </div>

        {/* Top Section: Navigation Emblems */}
        <div className="relative z-30 mx-auto mb-6 sm:mb-8 flex w-full max-w-lg shrink-0 items-center justify-center pt-2 sm:pt-4">
          <div className="absolute top-[28px] sm:top-[34px] md:top-[38px] h-1.5 w-[85%] rounded-full bg-[#facc15] shadow-[0_0_12px_#fde047]" />

          <div className="relative z-10 flex w-full items-center justify-between px-2">
            {EMBLEMS.map((emblem) => (
              <div
                key={emblem.id}
                className="group relative flex flex-col items-center"
              >
                <button
                  type="button"
                  title={emblem.name}
                  aria-label={`${emblem.name} - ${emblem.label}`}
                  className={`relative z-20 flex h-11 w-11 sm:h-13 sm:w-13 md:h-15 md:w-15 items-center justify-center overflow-hidden rounded-full border-2 shadow-xl transition-all duration-300 ease-out group-hover:scale-125 group-hover:-translate-y-2 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${emblem.border} ${emblem.bg}`}
                >
                  <img
                    src={emblem.image}
                    alt={emblem.name}
                    draggable="false"
                    className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                  />
                </button>

                {/* Hover Text Label */}
                <span className="pointer-events-none absolute -bottom-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded border-2 border-black bg-[#facc15] px-2.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-black opacity-0 shadow-[2px_2px_0px_#000] transition-all duration-200 ease-out group-hover:translate-y-1 group-hover:opacity-100">
                  {emblem.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comic Heading */}
        <div className="relative z-10 mb-2 shrink-0 text-center sm:mb-4">
          <h2
            className="font-comic text-4xl italic uppercase tracking-wider text-white sm:text-5xl md:text-6xl"
            style={{
              textShadow:
                '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 5px 0 #060b13, 0 7px 0 #000',
            }}
          >
            TRACKS
          </h2>
        </div>

        {/* Main Track Cards */}
        <div className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center -space-x-3 sm:-space-x-6 md:-space-x-8 lg:-space-x-10 pb-2">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              type="button"
              title={`Explore ${track.title}`}
              aria-label={`Explore ${track.title} track`}
              onClick={() => setSelectedTrack(track)}
              className={`group relative flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-transform duration-300 ease-out focus-visible:outline-none ${track.zIndex} ${track.tilt} hover:z-30 hover:-translate-y-3 ${track.hoverTilt}`}
            >
              <img
                src={track.image}
                alt={`${track.title} track`}
                loading="eager"
                draggable="false"
                className="block h-[48svh] sm:h-[54svh] md:h-[58svh] max-h-[550px] w-auto max-w-[34vw] object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.85)] filter transition-[filter,transform] duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_24px_rgba(56,189,248,0.5)]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Track Image Popup Modal */}
      {selectedTrack && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070e17]/65 p-4 transition-colors"
          onClick={() => setSelectedTrack(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedTrack.title} detail`}
            className="relative flex max-h-[92vh] max-w-2xl flex-col items-center justify-center rounded-xl border-4 border-black bg-[#dfb98d] p-3 shadow-[8px_8px_0px_#0284c7] sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close popup"
              onClick={() => setSelectedTrack(null)}
              className="absolute -right-3 -top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#b91c1c] text-xl font-black text-white shadow-[2px_2px_0px_#000] transition-transform hover:scale-110 hover:bg-red-700 focus-visible:outline-none"
            >
              ×
            </button>

            {/* Poster Container */}
            <div className="relative inline-block overflow-hidden rounded-lg border-2 border-black bg-black/20">
              <img
                src={selectedTrack.popupImage || selectedTrack.image}
                alt={`${selectedTrack.title} poster`}
                className="block max-h-[80vh] w-auto max-w-full object-contain"
              />

              {/* Pop-out Register Button */}
              {selectedTrack.registerLink && selectedTrack.buttonCoords && (
                <a
                  href={selectedTrack.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Register for ${selectedTrack.title} track`}
                  style={{
                    position: 'absolute',
                    left: selectedTrack.buttonCoords.left,
                    bottom: selectedTrack.buttonCoords.bottom,
                    width: selectedTrack.buttonCoords.width,
                    height: selectedTrack.buttonCoords.height,
                  }}
                  className="z-20 flex cursor-pointer items-center justify-center border-2 sm:border-[3px] border-black bg-[#ff0000] text-center font-black tracking-wider text-white shadow-[3px_3px_0px_#000] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-[#e60000] hover:shadow-[5px_5px_0px_#000] active:translate-y-0 active:scale-100 active:shadow-[1px_1px_0px_#000]"
                >
                  <span
                    className="select-none text-[12px] sm:text-base md:text-lg font-black uppercase"
                    style={{
                      fontFamily: '"Impact", "Arial Black", sans-serif',
                      letterSpacing: '0.04em',
                      textShadow:
                        '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                    }}
                  >
                    Register now!
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}