import { useEffect, useRef } from "react";
import "../components/ComingSoon.css";

import bgVideo from "../assets/comingSoon/coming-soon-background.mp4";
import bgSongM4a from "../assets/comingSoon/background-song.m4a";
import bgSongMp3 from "../assets/comingSoon/background-song.mp3";
import logoImg from "../assets/comingSoon/nitshacks-logo.png";
import playButtonBg from "../assets/comingSoon/comingSoon_playButton_bg.png";


export default function ComingSoon() {
  const audioRef = useRef(null);
  // Track whether the audio has been started so tab switches don't trigger playback prematurely
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cleanupListeners = () => {};

    const playAudio = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStartedRef.current = true;
          })
          .catch(() => {});
      }
    };

    // Try playing immediately on page load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasStartedRef.current = true;
        })
        .catch(() => {
          // If browser policy blocks autoplay, start on first user interaction anywhere
          const startAudio = () => {
            playAudio();
            cleanupListeners();
          };

          cleanupListeners = () => {
            window.removeEventListener("pointerdown", startAudio);
            window.removeEventListener("keydown", startAudio);
          };

          window.addEventListener("pointerdown", startAudio);
          window.addEventListener("keydown", startAudio);
        });
    }

    // Pause audio when switching tabs/minimizing; resume when coming back
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      } else if (hasStartedRef.current) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cleanupListeners();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      audio.pause();
    };
  }, []);

  return (
    <main className="coming-page">
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Animated sunset bridge background"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* loop attribute ensures infinite looping playback */}
      <audio ref={audioRef} autoPlay loop preload="auto">
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
      className="play-button"
      type="button"
      aria-label="Play background audio"
      onClick={() => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    audio.play()
      .then(() => {
        hasStartedRef.current = true;
      })
      .catch(() => {});
  } else {
    audio.pause();
  }
}}
>
       <img src={playButtonBg} alt="" aria-hidden="true" />
      <span className="play-triangle" aria-hidden="true" />
      </button>


    </main>
    );
}
