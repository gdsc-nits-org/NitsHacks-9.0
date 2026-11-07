import React from 'react';
import ComicDayModal from './ComicDayModal';
import popupFrameImg from "../../assets/popup1.png";

/**
 * Day 0 (Loki) comic popup.
 * PREVIOUS -> Hidden entirely (no pink badge).
 * NEXT -> Aligned on the right red box.
 */

const CONFIG = {
  frameImg: popupFrameImg,
  alt: 'Day 0 - Loki Timeline',

  visibleButtons: true,
  hideText: false,

  width: 1836,
  height: 1826,
  cropHeight: 1020,

  maxWidth: 800,
  maxHeight: 100,

  // Completely hide and remove the previous button element
  prev: {
    display: 'none',
    visibility: 'hidden',
    opacity: 0,
    width: '0px',
    height: '0px',
    pointerEvents: 'none',
    disabled: true,
  },

  // Keep NEXT in place on the bottom-right red plate
  next: {
    left: '74.5%',
    top: '87.2%',
    width: '13.0%',
    height: '8.2%',
    rotate: 0,
    label: 'Next: Fly to Ultron (Day 1)',
  },
};

export default function ComicDay0Modal(props) {
  return <ComicDayModal {...props} config={CONFIG} />;
}