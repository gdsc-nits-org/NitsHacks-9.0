import { useCallback, useEffect, useRef, useState } from "react";
import "../components/ComingSoon.css";

import desktopBgVideo from "../assets/comingSoon/coming-soon-background.mp4";
import mobileBgVideo from "../assets/comingSoon/coming-soon-background-mobile.mp4";
import bgSongMp3 from "../assets/comingSoon/gone-gone-gone.mp3";
import logoImg from "../assets/comingSoon/nitshacks-logo.png";
import playButtonBg from "../assets/comingSoon/comingSoon_playButton_bg.webp";

// ─── MODULE-LEVEL: start fetching the audio file IMMEDIATELY when the JS
//     bundle is parsed — before React mounts, before the first render.
//     We also kick off a pre-decode so the Web Audio API has raw PCM
//     ready the moment the user clicks play (zero decode lag). ────────────────
const _audioFetchPromise = fetch(bgSongMp3).catch(() => null);

// Watermark sparkle position in background videos (fractions of frame dimensions)
const DESKTOP_LOGO = { x: 1160 / 1280, y: 600 / 720, radius: 26 / 1280 };
const MOBILE_LOGO = { x: 650 / 720, y: 1205 / 1280, radius: 28 / 720 };

export default function ComingSoon() {
  const videoRef  = useRef(null);
  const buttonRef = useRef(null);

  // ── Web Audio API refs ──────────────────────────────────────────────────────
  const audioCtxRef     = useRef(null); // AudioContext
  const decodedBufRef   = useRef(null); // Pre-decoded PCM AudioBuffer
  const sourceNodeRef   = useRef(null); // Currently playing BufferSourceNode
  const startTimeRef    = useRef(0);    // ctx.currentTime when last play() called
  const pauseOffsetRef  = useRef(0);    // accumulated playback position in seconds

  // ── Fallback HTMLAudioElement (used only if Web Audio API unavailable) ──────
  const fallbackAudioRef = useRef(null);

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

  // ── Pre-decode audio using Web Audio API ────────────────────────────────────
  // The module-level fetch() already started downloading the file.
  // Here we grab that same response (from cache / in-flight) and decode it
  // into raw PCM. By the time the user clicks play the AudioBuffer is ready.
  useEffect(() => {
    let ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      // Web Audio API unavailable — fallback audio element will handle playback
      return;
    }
    audioCtxRef.current = ctx;

    _audioFetchPromise
      .then((res) => (res ? res.clone().arrayBuffer() : null))
      .then((buf) => buf && ctx.decodeAudioData(buf))
      .then((decoded) => {
        if (decoded) decodedBufRef.current = decoded;
      })
      .catch(() => {});

    return () => {
      // Stop any playing source before unmounting
      try { sourceNodeRef.current?.stop(); } catch {}
      ctx.close().catch(() => {});
    };
  }, []);

  // ── Fallback: HTMLAudioElement for browsers without Web Audio API ───────────
  useEffect(() => {
    const audio = fallbackAudioRef.current;
    if (!audio) return;
    audio.src  = bgSongMp3;
    audio.loop = true;
    audio.load();
  }, []);

  // ── Tab visibility: pause / resume ─────────────────────────────────────────
  useEffect(() => {
    const handleVisibilityChange = () => {
      const ctx = audioCtxRef.current;
      if (!ctx) {
        // Fallback path
        const audio = fallbackAudioRef.current;
        if (!audio) return;
        if (document.hidden) audio.pause();
        else if (isPlayingRef.current) audio.play().catch(() => {});
        return;
      }
      if (document.hidden) {
        // Suspend AudioContext to save CPU
        sourceNodeRef.current?.stop();
        sourceNodeRef.current = null;
        if (isPlayingRef.current) {
          pauseOffsetRef.current += ctx.currentTime - startTimeRef.current;
        }
        ctx.suspend().catch(() => {});
      } else if (isPlayingRef.current) {
        ctx.resume().then(() => {
          if (!decodedBufRef.current || !isPlayingRef.current) return;
          const source = ctx.createBufferSource();
          source.buffer = decodedBufRef.current;
          source.loop   = true;
          source.connect(ctx.destination);
          source.start(0, pauseOffsetRef.current % decodedBufRef.current.duration);
          startTimeRef.current = ctx.currentTime;
          sourceNodeRef.current = source;
        }).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Clean up on unmount
      try { sourceNodeRef.current?.stop(); } catch {}
      fallbackAudioRef.current?.pause();
    };
  }, []);

  // Screen resize detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
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

    if (!visible) { setSpot(null); return; }

    const cover = 2 * radius + 14;
    const base  = isMobile ? 54 : Math.min(76, Math.max(54, cw * 0.052));
    const size  = Math.max(base, cover);
    const pad   = 8;

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
    if (observer && video) observer.observe(video);

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

  // ── Toggle play / pause ─────────────────────────────────────────────────────
  const togglePlay = () => {
    const ctx     = audioCtxRef.current;
    const decoded = decodedBufRef.current;

    // ── Web Audio API path (pre-decoded PCM → truly instant) ─────────────────
    if (ctx && decoded) {
      ctx.resume().then(() => {
        if (!isPlayingRef.current) {
          // Play: create source node from pre-decoded buffer — zero decode lag
          const source = ctx.createBufferSource();
          source.buffer = decoded;
          source.loop   = true;
          source.connect(ctx.destination);
          source.start(0, pauseOffsetRef.current % decoded.duration);
          startTimeRef.current  = ctx.currentTime;
          sourceNodeRef.current = source;
          setPlayback(true);
        } else {
          // Pause: record position so resume continues from same point
          pauseOffsetRef.current += ctx.currentTime - startTimeRef.current;
          try { sourceNodeRef.current?.stop(); } catch {}
          sourceNodeRef.current = null;
          setPlayback(false);
        }
      }).catch(() => {});
      return;
    }

    // ── Fallback: HTMLAudioElement (Web Audio API unavailable) ───────────────
    const audio = fallbackAudioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play()
        .then(() => setPlayback(true))
        .catch((err) => {
          console.error("Audio playback error:", err);
          audio.load();
          audio.play().then(() => setPlayback(true)).catch(() => {});
        });
    } else {
      audio.pause();
      setPlayback(false);
    }
  };

  return (
    <main className="coming-page">
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

      {/* Hidden fallback audio element — only used if Web Audio API is unavailable */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={fallbackAudioRef} loop preload="auto" style={{ display: "none" }} />

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
