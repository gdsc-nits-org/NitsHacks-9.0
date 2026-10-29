import { useCallback, useEffect, useRef, useState } from "react";
import "../components/ComingSoon.css";

import desktopBgVideo from "../assets/comingSoon/coming-soon-background.mp4";
import mobileBgVideo from "../assets/comingSoon/coming-soon-background-mobile.mp4";
import bgSongM4a from "../assets/comingSoon/background-song.m4a";
import bgSongMp3 from "../assets/comingSoon/background-song.mp3";
import logoImg from "../assets/comingSoon/nitshacks-logo.png";
import playButtonBg from "../assets/comingSoon/comingSoon_playButton_bg.png";

// Watermark sparkle position in background videos (fractions of frame dimensions)
const DESKTOP_LOGO = { x: 1160 / 1280, y: 600 / 720, radius: 26 / 1280 };
const MOBILE_LOGO = { x: 650 / 720, y: 1205 / 1280, radius: 28 / 720 };

export default function ComingSoon() {
  const audioRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const buttonRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [spot, setSpot] = useState(null);

  const setPlayback = (playing) => {
    setIsPlaying(playing);
    isPlayingRef.current = playing;
  };

  // Compute spot to overlay precisely on the watermark logo
  const placeOnLogo = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const video = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
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
  }, []);

  useEffect(() => {
    placeOnLogo();
    window.addEventListener("resize", placeOnLogo);

    const dVid = desktopVideoRef.current;
    const mVid = mobileVideoRef.current;
    dVid?.addEventListener("loadedmetadata", placeOnLogo);
    mVid?.addEventListener("loadedmetadata", placeOnLogo);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(placeOnLogo)
        : null;

    if (observer) {
      if (dVid) observer.observe(dVid);
      if (mVid) observer.observe(mVid);
    }

    return () => {
      window.removeEventListener("resize", placeOnLogo);
      dVid?.removeEventListener("loadedmetadata", placeOnLogo);
      mVid?.removeEventListener("loadedmetadata", placeOnLogo);
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
      audio
        .play()
        .then(() => {
          setPlayback(true);
        })
        .catch(() => {});
    } else {
      audio.pause();
      setPlayback(false);
    }
  };

  return (
    <main className="coming-page">
      {/* Desktop Video (widescreen 16:9) */}
      <video
        ref={desktopVideoRef}
        className="background-video background-video--desktop"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Animated sunset bridge background desktop"
      >
        <source src={desktopBgVideo} type="video/mp4" />
      </video>

      {/* Mobile Video (portrait 9:16) */}
      <video
        ref={mobileVideoRef}
        className="background-video background-video--mobile"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Animated sunset bridge background mobile"
      >
        <source src={mobileBgVideo} type="video/mp4" />
      </video>

      {/* Audio playback on user click with tab-switch pause/resume */}
      <audio ref={audioRef} loop preload="auto">
        <source src={bgSongM4a} type="audio/mp4" />
        <source src={bgSongMp3} type="audio/mpeg" />
      </audio>

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
        <img src={playButtonBg} alt="" aria-hidden="true" />
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
