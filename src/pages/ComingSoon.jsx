import { useCallback, useEffect, useRef, useState } from "react";
import "../components/ComingSoon.css";

import desktopBgVideo from "../assets/comingSoon/coming-soon-background.mp4";
import mobileBgVideo from "../assets/comingSoon/coming-soon-background-mobile.mp4";
import bgSongMp3 from "../assets/comingSoon/background-song.mp3";
import logoImg from "../assets/comingSoon/nitshacks-logo.png";
import playButtonBg from "../assets/comingSoon/comingSoon_playButton_bg.webp";

// Watermark sparkle position in background videos (fractions of frame dimensions)
const DESKTOP_LOGO = { x: 1160 / 1280, y: 600 / 720, radius: 26 / 1280 };
const MOBILE_LOGO = { x: 650 / 720, y: 1205 / 1280, radius: 28 / 720 };

export default function ComingSoon() {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  // Device detection to load the right video immediately
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.innerWidth <= 768 ||
        (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
      );
    }
    return false;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [spot, setSpot] = useState(null);

  const setPlayback = (playing) => {
    setIsPlaying(playing);
    isPlayingRef.current = playing;
  };

  // Screen resize detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute spot to overlay precisely on the watermark logo
  const placeOnLogo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const cw = video.clientWidth;
    const ch = video.clientHeight;
    if (!cw || !ch) return;

    const targetLogo = isMobile ? MOBILE_LOGO : DESKTOP_LOGO;
    const nw = video.videoWidth || (isMobile ? 720 : 1280);
    const nh = video.videoHeight || (isMobile ? 1280 : 720);
    const scale = Math.max(cw / nw, ch / nh);

    const [fx = 0.5, fy = 0.5] = getComputedStyle(video)
      .objectPosition.split(" ")
      .map((v) => parseFloat(v) / 100)
      .map((v) => (Number.isFinite(v) ? v : 0.5));

    const cx = (cw - nw * scale) * fx + targetLogo.x * nw * scale;
    const cy = (ch - nh * scale) * fy + targetLogo.y * nh * scale;
    const radius = targetLogo.radius * nw * scale;

    const visible =
      cx + radius > 0 &&
      cx - radius < cw &&
      cy + radius > 0 &&
      cy - radius < ch;

    if (!visible) {
      setSpot(null);
      return;
    }

    const cover = 2 * radius + 14;
    const base = isMobile ? 54 : Math.min(76, Math.max(54, cw * 0.052));
    const size = Math.max(base, cover);
    const pad = 8;

    setSpot({
      x: Math.min(Math.max(cx, size / 2 + pad), cw - size / 2 - pad),
      y: Math.min(Math.max(cy, size / 2 + pad), ch - size / 2 - pad),
      cover,
    });
  }, [isMobile]);

  useEffect(() => {
    const video = videoRef.current;
    placeOnLogo();

    window.addEventListener("resize", placeOnLogo);
    video?.addEventListener("loadedmetadata", placeOnLogo);
    video?.addEventListener("loadeddata", placeOnLogo);
    video?.addEventListener("canplay", placeOnLogo);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(placeOnLogo)
        : null;

    if (observer && video) {
      observer.observe(video);
    }

    // Backup timer to guarantee position after video layout settles
    const timer = setTimeout(placeOnLogo, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", placeOnLogo);
      video?.removeEventListener("loadedmetadata", placeOnLogo);
      video?.removeEventListener("loadeddata", placeOnLogo);
      video?.removeEventListener("canplay", placeOnLogo);
      observer?.disconnect();
    };
  }, [placeOnLogo]);

  // Handle tab switching: pause on hidden, resume when active
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      } else if (isPlayingRef.current) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Ensure audio src is loaded for iOS Safari and mobile Chrome
      if (!audio.src || audio.src === "") {
        audio.src = bgSongMp3;
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayback(true);
          })
          .catch((err) => {
            console.error("Audio playback error:", err);
            // Fallback retry with load
            audio.load();
            audio
              .play()
              .then(() => setPlayback(true))
              .catch(() => {});
          });
      }
    } else {
      audio.pause();
      setPlayback(false);
    }
  };

  return (
    <main className="coming-page">
      {/* 
        Responsive background video:
        Uses mobileBgVideo on devices <= 768px, desktopBgVideo on desktop
      */}
      <video
        key={isMobile ? "mobile-video" : "desktop-video"}
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Animated sunset bridge background"
      >
        <source src={isMobile ? mobileBgVideo : desktopBgVideo} type="video/mp4" />
      </video>

      {/* 
        Direct src on <audio> ensures instant, reliable playback across 
        iOS Safari, mobile Chrome, and desktop browsers without source buffering lag.
      */}
      <audio ref={audioRef} src={bgSongMp3} loop preload="auto" />

      <div className="image-vignette" aria-hidden="true" />

      <header className="top-brand" aria-label="NITS Hacks 9.0">
        <img src={logoImg} alt="NITS HACKS 9.0" />
      </header>

      <div className="corner-label">
        NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR
      </div>

      <button
        ref={buttonRef}
        className={`play-button ${isPlaying ? "is-playing" : ""} ${spot ? "on-logo" : ""}`}
        style={
          spot
            ? {
                "--cx": `${spot.x}px`,
                "--cy": `${spot.y}px`,
                "--cover": `${spot.cover}px`,
              }
            : undefined
        }
        type="button"
        aria-label={isPlaying ? "Pause background audio" : "Play background audio"}
        title={isPlaying ? "Pause music" : "Play music"}
        onClick={togglePlay}
      >
        <img src={playButtonBg} alt="" aria-hidden="true" width="180" height="180" />
        {isPlaying ? (
          <span className="pause-icon" aria-hidden="true">
            <span className="pause-bar" />
            <span className="pause-bar" />
          </span>
        ) : (
          <span className="play-triangle" aria-hidden="true" />
        )}
      </button>
    </main>
  );
}
