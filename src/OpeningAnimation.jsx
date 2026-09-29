import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import introBg from './assets/intro_bg_gradient.jpg';

/**
 * OpeningAnimation
 * 
 * Butter-smooth, 120 FPS GPU-accelerated preloader:
 * 1. Initial Screen: Radiant warm orange gradient background (intro_bg_gradient.jpg)
 *    with large, bold white "Yogesh" centered in The Seasons font.
 * 2. Butter Smooth Reveal: The curved wave seamlessly matches the background image (no black shape).
 *    Glides straight up with velvety cinematic inertial easing, unveiling the homepage website.
 * 3. Final State: Unmounts cleanly, leaving the homepage fully interactive.
 */
export default function OpeningAnimation({ 
  title = "Yogesh", 
  onComplete, 
  onRevealStart, 
  reduceMotion = false 
}) {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Pre-decode background image in GPU memory to eliminate any frame-0 hitch
    const img = new Image();
    img.src = introBg;
    if (img.decode) {
      img.decode().catch(() => {});
    }

    if (reduceMotion) {
      const timer = setTimeout(() => {
        onRevealStart?.();
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }

    // Display title screen, then glide smoothly upward and trigger site entrance
    const timer = setTimeout(() => {
      setSlideUp(true);
      onRevealStart?.();
    }, 850);

    return () => clearTimeout(timer);
  }, [reduceMotion, onComplete, onRevealStart]);

  // Butter-smooth cinematic ease: velvety acceleration + luxurious inertial ease-out
  const butterSmoothEase = [0.65, 0, 0.15, 1];

  return (
    <>
      {/* SVG ClipPath Definition for the Organic Wave (ObjectBoundingBox) */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="introBgWaveClip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 L 1 0 L 1 0.84 C 0.94 0.86, 0.84 0.90, 0.72 0.90 C 0.58 0.90, 0.44 0.76, 0.30 0.76 C 0.20 0.76, 0.10 0.80, 0 0.84 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Translating Container: 100% GPU Composited */}
      <motion.div
        key="preloader-overlay"
        initial={{ y: '0%' }}
        animate={slideUp ? { y: '-125%' } : { y: '0%' }}
        transition={{ duration: 1.15, ease: butterSmoothEase }}
        onAnimationComplete={() => {
          if (slideUp) {
            onComplete?.();
          }
        }}
        className="fixed inset-0 z-[9999] w-screen h-[calc(100vh+200px)] pointer-events-auto select-none overflow-visible will-change-transform transform-gpu"
        style={{
          clipPath: 'url(#introBgWaveClip)',
          WebkitClipPath: 'url(#introBgWaveClip)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Background Image Layer: Fills the entire container right down into the curved wave */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${introBg})`,
            backgroundColor: '#ff8a3d',
          }}
        />

        {/* Centered Bold White Title in The Seasons font */}
        <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center pointer-events-none px-6">
          <motion.h1
            key={title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={slideUp ? { opacity: 0, y: -70 } : { opacity: 1, y: 0, scale: 1 }}
            transition={
              slideUp
                ? { duration: 0.6, ease: butterSmoothEase }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
            className="text-white leading-none select-none text-center tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.08)] whitespace-nowrap"
            style={{
              fontFamily: "'The Seasons', Georgia, serif",
              fontSize: title.length > 7 ? 'clamp(46px, 12vw, 175px)' : 'clamp(84px, 18vw, 220px)',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            {title}
          </motion.h1>
        </div>
      </motion.div>
    </>
  );
}
