import React, { useState, useEffect } from "react";

const TRACKS = [
  {
    id: "coding",
    title: "CODING",
    image: "/trackimage/Component34.png",
    popupImage: "/trackimage/coding.png",
    registerLink: "https://unstop.com/hackathons/coding-track-nits-hacks-90-national-institute-of-technology-nit-silchar-1795122",
    buttonCoords: {
      left: "13.5%",
      bottom: "6.5%",
      width: "35%",
      height: "8.5%",
    },
    textBoxCoords: {
      left: '50.6%',
      top: '23.3%',
      width: '46.2%',
      height: '70.3%',
    },
    description:
      'Hey Developers! Get ready to assemble your coding skills! NITS HACKS 9.0 is back with its ninth edition, bringing an exciting opportunity for all the coding enthusiasts and problem solvers. We\'re thrilled to introduce the Coding Track, a battleground where logic meets creativity and every challenge tests your limits. Inspired by the strategic brilliance of the Avengers, this track will put your programming skills, algorithmic thinking, and problem-solving abilities to the ultimate test. From cracking complex challenges to crafting optimized solutions, participants will get the chance to showcase their coding prowess and unleash their inner superheroes. So gear up, sharpen your skills, and conquer the coding battlefield for a chance to win exciting cash prizes totaling INR 110K, along with exclusive goodies!',
    tilt: '-rotate-[5deg]',
    zIndex: 'z-10',
    hoverTilt: 'hover:-rotate-[1deg]',
    hoverScale: 'hover:scale-115 sm:hover:scale-118 md:hover:scale-120',
    hoverTranslate: 'hover:-translate-y-3 sm:hover:-translate-y-4',
  },
  {
    id: "software",
    title: "SOFTWARE",
    image: "/trackimage/Component35.png",
    popupImage: "/trackimage/software.png",
    registerLink: "https://unstop.com/hackathons/software-track-nits-hacks-90-national-institute-of-technology-nit-silchar-1794955",
    buttonCoords: {
      left: "32%",
      bottom: "2.7%",
      width: "36%",
      height: "8.5%",
    },
    textBoxCoords: {
      left: '6.5%',
      top: '51.7%',
      width: '87.0%',
      height: '35.4%',
    },
    description:
      'Hey Innovators! The multiverse needs your ideas! NITS HACKS 9.0 is back with its ninth edition, bringing an exciting opportunity for aspiring developers to turn their imagination into reality. We\'re thrilled to introduce the Software Track, a platform where innovation meets technology and creativity becomes your greatest superpower. Inspired by the groundbreaking inventions of Stark Industries, this track challenges participants to identify real-world problems and develop impactful software solutions. From building innovative applications to designing functional and scalable systems, participants will get the opportunity to showcase their technical expertise and creative vision. So unleash your inner Tony Stark, bring your ideas to life, and compete for exciting cash prizes totaling INR 130K, along with exclusive goodies!',
    tilt: '-rotate-[0.5deg]',
    zIndex: 'z-20',
    hoverTilt: 'hover:rotate-0',
    hoverScale: 'hover:scale-108 sm:hover:scale-110 md:hover:scale-112',
    hoverTranslate: 'hover:-translate-y-2 sm:hover:-translate-y-3',
  },
  {
    id: "uiux",
    title: "UI/UX",
    image: "/trackimage/Component36.png",
    popupImage: "/trackimage/ux.png",
    registerLink: "https://unstop.com/competitions/uiux-track-nits-hacks-90-nits-hacks-90-national-institute-of-technology-nit-silchar-1794956",
    buttonCoords: {
      left: "51.5%",
      bottom: "8.5%",
      width: "35%",
      height: "8.5%",
    },
    textBoxCoords: {
      left: '3.0%',
      top: '24.1%',
      width: '46.2%',
      height: '67.6%',
    },
    description:
      'Hey Designers! It\'s time to bring your creative superpowers to life! NITS HACKS 9.0 is back with its ninth edition, bringing an exciting opportunity for creative minds and aspiring designers. We\'re thrilled to introduce the UI/UX Track, where imagination meets innovation and every design tells a story. Inspired by the futuristic interfaces and technological brilliance of the Marvel Universe, this track challenges participants to create visually stunning, intuitive, and user-friendly digital experiences. From crafting seamless interfaces to designing engaging user journeys, participants will get the opportunity to showcase their creativity, design thinking, and problem-solving skills. So unleash your inner Tony Stark, think beyond boundaries, and design something extraordinary for a chance to win exciting cash prizes totaling INR 60K, along with exclusive goodies!',
    tilt: 'rotate-[4.5deg]',
    zIndex: 'z-10',
    hoverTilt: 'hover:rotate-[2deg]',
    hoverScale: 'hover:scale-108 sm:hover:scale-110 md:hover:scale-112',
    hoverTranslate: 'hover:-translate-y-2 sm:hover:-translate-y-3',
  },
];

const EMBLEMS = [
  {
    id: "avengers",
    name: "Avengers",
    label: "Home",
    image: "/trackimage/Component29.png",
    border: "border-[#334155]",
    bg: "bg-[#182330]",
  },
  {
    id: "f4",
    name: "Fantastic Four",
    label: "Tracks",
    image: "/trackimage/Component30.png",
    border: "border-white ring-2 sm:ring-4 ring-[#38bdf8]",
    bg: "bg-[#0284c7]",
  },
  {
    id: "xmen",
    name: "X-Men",
    label: "Timeline",
    image: "/trackimage/Component31.png",
    border: "border-[#450a0a]",
    bg: "bg-[#b91c1c]",
  },
  {
    id: "shield",
    name: "S.H.I.E.L.D.",
    label: "Teams",
    image: "/trackimage/Component32.png",
    border: "border-zinc-800",
    bg: "bg-[#e2e8f0]",
  },
  {
    id: "hydra",
    name: "Hydra",
    label: "FAQs",
    image: "/trackimage/Component33.png",
    border: "border-[#450a0a]",
    bg: "bg-[#7f1d1d]",
  },
];
export default function TrackPage() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedTrack(null);
    };
    if (selectedTrack) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedTrack]);

  useEffect(() => {
    const isOpened = Boolean(selectedTrack);
    window.dispatchEvent(
      new CustomEvent("set-navbar-hidden", { detail: isOpened }),
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent("set-navbar-hidden", { detail: false }),
      );
    };
  }, [selectedTrack]);

  return (
    <section className="relative isolate h-[100svh] w-full overflow-hidden bg-[#070e17]">
      {/* Styles for comic modal scrollbar */}
      <style>{`
        .track-modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #ef4444 #e9e7de;
        }
        .track-modal-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .track-modal-scroll::-webkit-scrollbar-track {
          background: #e9e7de;
          border-radius: 3px;
        }
        .track-modal-scroll::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 3px;
        }
        .track-modal-scroll::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>

      {/* Page Content: Tints and lowers contrast smoothly when popup is active without blur */}
      <div
        className={`flex h-full w-full flex-col items-center justify-between px-4 py-4 sm:py-6 transition-[filter] duration-300 ${
          selectedTrack
            ? "contrast-75 brightness-75"
            : "contrast-100 brightness-100"
        }`}
      >
        {/* Background Image */}
        <div
          className="pointer-events-none absolute inset-0 z-[-2]"
          style={{
            backgroundImage: "url('/trackimage/trackbackground.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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

        {/* Spacer for fixed top universal navbar */}
        <div
          className="w-full shrink-0 h-[72px] sm:h-[84px] md:h-[96px] mb-1 sm:mb-2 pointer-events-none"
          aria-hidden="true"
        />

        {/* Comic Heading */}
        <div className="relative z-20 mb-2 shrink-0 text-center sm:mb-4 pointer-events-none">
          <h2
            className="text-4xl uppercase tracking-wider text-white sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "'Bangers', Impact, cursive, sans-serif",
              letterSpacing: "0.05em",
              textShadow:
                "3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 5px 0 #060b13, 0 7px 0 #000",
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
              className={`group relative flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-all duration-300 ease-out focus-visible:outline-none ${track.zIndex} ${track.tilt} hover:z-40 ${track.hoverScale} ${track.hoverTranslate} ${track.hoverTilt}`}
            >
              {/* Backlight color light bloom on hover */}
              <div className="pointer-events-none absolute inset-x-2 inset-y-4 -z-10 rounded-full bg-gradient-to-tr from-sky-400/0 via-cyan-300/0 to-blue-500/0 opacity-0 blur-3xl transition-all duration-300 group-hover:from-sky-400/50 group-hover:via-cyan-300/40 group-hover:to-blue-500/50 group-hover:opacity-100 group-hover:scale-120" />

              <img
                src={track.image}
                alt={`${track.title} track`}
                loading="eager"
                draggable="false"
                className="block h-[48svh] sm:h-[54svh] md:h-[58svh] max-h-[550px] w-auto max-w-[34vw] object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.85)] filter transition-[filter,transform] duration-300 group-hover:brightness-[1.32] group-hover:saturate-[1.85] group-hover:contrast-[1.15] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] group-hover:drop-shadow-[0_0_50px_rgba(56,189,248,0.95)] group-hover:drop-shadow-[0_0_80px_rgba(56,189,248,0.55)]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Track Image Popup Modal */}
      {selectedTrack && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070e17]/65 p-4 transition-colors"
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
              className="absolute -right-3 -top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#b91c1c] text-xl font-black text-white shadow-[2px_2px_0px_#000] transition-transform hover:scale-110 hover:bg-red-700 focus-visible:outline-none cursor-pointer"
            >
              ×
            </button>

            {/* Poster Container */}
            <div className="relative inline-block overflow-hidden rounded-lg border-2 border-black bg-black/20">
              <img
                src={selectedTrack.popupImage || selectedTrack.image}
                alt={`${selectedTrack.title} poster`}
                className="block max-h-[80vh] w-auto max-w-full object-contain select-none"
                draggable="false"
              />

              {/* Dynamic Description Box */}
              {selectedTrack.description && selectedTrack.textBoxCoords && (
                <div
                  style={{
                    position: 'absolute',
                    left: selectedTrack.textBoxCoords.left,
                    top: selectedTrack.textBoxCoords.top,
                    width: selectedTrack.textBoxCoords.width,
                    height: selectedTrack.textBoxCoords.height,
                  }}
                  className="z-10 flex flex-col border-2 sm:border-[3px] border-black bg-[#f9f7ed] p-1.5 sm:p-2.5 md:p-3.5 text-black shadow-inner"
                >
                  <h3
                    className="shrink-0 select-none text-xs sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-wide text-black mb-1 sm:mb-1.5"
                    style={{
                      fontFamily: '"Impact", "Bebas Neue", "Arial Black", sans-serif',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {selectedTrack.title} TRACK
                  </h3>

                  <div
                    tabIndex={0}
                    role="region"
                    aria-label={`${selectedTrack.title} track description`}
                    className="track-modal-scroll min-h-0 flex-1 overflow-y-auto pr-1 text-left sm:text-justify text-[9.5px] leading-[1.3] sm:text-[11.5px] sm:leading-snug md:text-[12.5px] md:leading-normal lg:text-[13.5px] lg:leading-relaxed text-[#111] focus:outline-none"
                    style={{
                      fontFamily: '"Comic Neue", "Comic Sans MS", cursive, sans-serif',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#ef4444 #e9e7de',
                    }}
                  >
                    <p className="font-semibold sm:font-bold">
                      {selectedTrack.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Pop-out Register Button */}
              {selectedTrack.registerLink && selectedTrack.buttonCoords && (
                <a
                  href={selectedTrack.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Register for ${selectedTrack.title} track`}
                  style={{
                    position: "absolute",
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
                      letterSpacing: "0.04em",
                      textShadow:
                        "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
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
