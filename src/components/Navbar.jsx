import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NAV_EMBLEMS = [
  {
    id: 'home',
    name: 'Avengers',
    label: 'Home',
    path: '/',
    image: '/trackimage/Component29.png',
    border: 'border-[#334155]',
    activeBorder: 'ring-4 ring-yellow-400 border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.9)]',
    bg: 'bg-[#182330]',
  },
  {
    id: 'tracks',
    name: 'Fantastic Four',
    label: 'Tracks',
    path: '/tracks',
    image: '/trackimage/Component30.png',
    border: 'border-white',
    activeBorder: 'ring-4 ring-[#38bdf8] border-white shadow-[0_0_25px_rgba(56,189,248,0.9)]',
    bg: 'bg-[#0284c7]',
  },
  {
    id: 'timeline',
    name: 'X-Men',
    label: 'Timeline',
    path: '/timeline',
    image: '/trackimage/Component31.png',
    border: 'border-[#450a0a]',
    activeBorder: 'ring-4 ring-red-500 border-yellow-400 shadow-[0_0_25px_rgba(239,68,68,0.9)]',
    bg: 'bg-[#b91c1c]',
  },
  {
    id: 'teams',
    name: 'S.H.I.E.L.D.',
    label: 'Teams',
    path: '/teams',
    image: '/trackimage/Component32.png',
    border: 'border-zinc-800',
    activeBorder: 'ring-4 ring-slate-200 border-white shadow-[0_0_25px_rgba(226,232,240,0.9)]',
    bg: 'bg-[#e2e8f0]',
  },
  {
    id: 'faqs',
    name: 'Hydra',
    label: 'FAQs',
    path: '/faqs',
    image: '/trackimage/Component33.png',
    border: 'border-[#450a0a]',
    activeBorder: 'ring-4 ring-red-600 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.9)]',
    bg: 'bg-[#7f1d1d]',
  },
];

export default function Navbar({ activeRoute } = {}) {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleHide = (e) => setIsHidden(Boolean(e.detail));
    window.addEventListener('set-navbar-hidden', handleHide);
    return () => window.removeEventListener('set-navbar-hidden', handleHide);
  }, []);

  const currentPath = activeRoute || location?.pathname || '/';
  const isTeamsPage = currentPath.startsWith('/teams');

  // Track scroll position on teams page: keep navbar only when at the top, hide while scrolled down
  useEffect(() => {
    if (!isTeamsPage) {
      setIsScrolledDown(false);
      return;
    }

    const handleScroll = (e) => {
      const scrollY =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (e?.target?.scrollTop ?? 0);

      setIsScrolledDown(scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [isTeamsPage, location?.pathname]);

  // Ensure navbar is always reset to visible on route changes
  useEffect(() => {
    setIsHidden(false);
    setIsScrolledDown(false);
  }, [location?.pathname]);

  if (location?.pathname === '/comingsoon') return null;

  const shouldHide = isHidden || (isTeamsPage && isScrolledDown);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-3 sm:pt-4 md:pt-6 transition-all duration-300 ease-in-out ${
        shouldHide
          ? 'opacity-0 -translate-y-8 pointer-events-none invisible'
          : 'opacity-100 translate-y-0'
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl px-4 py-2 sm:py-3 select-none"
      >
        <div className="relative flex w-full items-center justify-between">
          {/* Yellow Comic Rail passing through emblem centers */}
          <div
            className="pointer-events-none absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1.5 sm:h-2 rounded-full bg-[#facc15] border-y border-black/80 shadow-[0_0_12px_rgba(250,204,21,0.85)] z-0"
          />

          {NAV_EMBLEMS.map((emblem) => {
            const isActive =
              emblem.path === '/'
                ? currentPath === '/' || currentPath === '' || currentPath === '/landing'
                : currentPath.startsWith(emblem.path) ||
                  (emblem.id === 'faqs' && currentPath.startsWith('/faq')) ||
                  (emblem.id === 'tracks' && currentPath.startsWith('/track'));

            return (
              <div
                key={emblem.id}
                className="group relative z-10 flex flex-col items-center justify-center"
              >
                <Link
                  to={emblem.path}
                  title={`${emblem.name} - ${emblem.label}`}
                  aria-label={`${emblem.name} - ${emblem.label}`}
                  className={`relative z-20 flex items-center justify-center overflow-hidden rounded-full border-2 shadow-xl transition-all duration-300 ease-out 
                    ${
                      isActive
                        ? `${emblem.activeBorder} h-11 w-11 sm:h-13 sm:w-13 md:h-15 md:w-15 scale-110 -translate-y-0.5 z-30`
                        : `${emblem.border} h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 hover:scale-115 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] opacity-90 hover:opacity-100`
                    } 
                    ${emblem.bg} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400`}
                >
                  {/* Emblem Icon (Noticeably enlarged when active) */}
                  <img
                    src={emblem.image}
                    alt={emblem.name}
                    draggable="false"
                    className={`h-full w-full object-contain transition-transform duration-300 ${
                      isActive
                        ? 'p-0.5 sm:p-1 scale-115 sm:scale-120'
                        : 'p-1 sm:p-1.5 group-hover:scale-110'
                    }`}
                  />

                  {/* Subtle active inner gloss glow */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-white/15 mix-blend-overlay" />
                  )}
                </Link>

                {/* Comic label tooltip */}
                <div
                  className={`pointer-events-none absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/95 px-2 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-yellow-300 border border-yellow-400/60 shadow-lg transition-all duration-200 
                    ${
                      isActive
                        ? 'opacity-100 translate-y-0 font-extrabold text-yellow-400 ring-1 ring-yellow-400/40'
                        : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                    }`}
                >
                  {emblem.label}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
