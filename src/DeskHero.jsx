import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import beach from './assets/photo_beach_full-opt.webp';
import pCamera from './assets/props/camera.webp';
import pRayban from './assets/props/rayban.webp';

import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/500.css';
import { Asterisk } from '@phosphor-icons/react';
import PillDrop from './PillDrop';

// x = left on desktop (%), m = left on mobile (%), b = bottom (px), r = tilt. hideM hides on phones.

export default function DeskHero({ onWorks, onAbout }) {
  const ref = useRef(null);
  const textRef = useRef(null);
  const reduce = useReducedMotion();
  // Inline pieces that sit inside the headline, sized in em so they scale with the type.
  const grow = (delay) => ({
    initial: reduce ? false : { width: 0, opacity: 0 },
    animate: { width: 'auto', opacity: 1 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });
  const Photo = ({ src, alt, delay, pos = 'center 22%', zoom = 1 }) => (
    <motion.span {...grow(delay)} className="inline-block align-middle overflow-hidden rounded-full mx-[0.1em] -mt-[0.14em]">
      <img src={src} alt={alt} className="block h-[0.66em] w-[1.6em] rounded-full object-cover" style={{ objectPosition: pos, transform: `scale(${zoom})` }} />
    </motion.span>
  );
  const Prop = ({ src, alt, delay, rot = 0 }) => (
    <motion.span {...grow(delay)} className="inline-block align-middle mx-[0.1em] -mt-[0.1em]">
      <img src={src} alt={alt} draggable={false} className="block h-[0.8em] w-auto max-w-none" style={{ transform: `rotate(${rot}deg)`, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.25))' }} />
    </motion.span>
  );
  const Swatch = ({ kind, delay }) => (
    <motion.span {...grow(delay)} aria-hidden="true" className="inline-block align-middle overflow-hidden mx-[0.1em] -mt-[0.14em]">
      <svg viewBox="0 0 160 66" className="block h-[0.66em] w-[1.6em]">
        <defs><clipPath id={`sw-${kind}`}><rect width="160" height="66" rx="33" /></clipPath></defs>
        <g clipPath={`url(#sw-${kind})`}>
          {kind === 'a' ? (
            <>
              <rect width="160" height="66" fill="#f9a8d4" />
              <path d="M96 0h40c-16 20-14 44 6 66h-44c-18-22-18-44-2-66z" fill="#ff5a1f" />
              <path d="M136 0h24v66h-18c-20-22-22-46-6-66z" fill="#9cc9f5" />
            </>
          ) : (
            <>
              <rect width="160" height="66" fill="#e4f57a" />
              <path d="M0 40c30-26 60 20 92-6s52-22 68-10v42H0z" fill="#a9d8f7" />
              <path d="M0 10c22 14 40-10 64 4" stroke="#a9d8f7" strokeWidth="12" fill="none" />
            </>
          )}
        </g>
      </svg>
    </motion.span>
  );
  const Flower = ({ color, delay }) => (
    <motion.span
      aria-hidden="true"
      className="inline-block align-middle mx-[0.08em] -mt-[0.1em]"
      style={{ color }}
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={reduce ? undefined : { scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Asterisk weight="bold" className="block h-[0.62em] w-[0.62em] v3-spin" />
    </motion.span>
  );

  return (
    <section ref={ref} style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }} className="desk-hero relative w-full min-h-[max(100svh,820px)] md:min-h-[max(100svh,780px)] overflow-hidden bg-[#f4f1ea]">
      {/* faint paper grain */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(42,38,34,0.09) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      <div className="absolute inset-0 z-10 flex items-center justify-center pt-6 pb-[150px] md:pb-[130px] pointer-events-none">
      <div className="desk-copy pointer-events-auto mx-auto max-w-[1260px] px-5 text-center">
        <motion.h1
          ref={textRef}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#141210] text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.06] tracking-[-0.02em]"
          style={{ fontFamily: "'Newsreader Variable', Georgia, serif" }}
        >
          Hi, <Flower color="#2f5bff" delay={0.5} /> I’m Yogesh <Photo src={beach} alt="Yogesh by the sea" delay={0.7} />
          <br className="hidden md:block" />{' '}
          <span className="whitespace-nowrap"><Prop src={pCamera} alt="Vintage film camera" delay={0.9} rot={-6} /> turning <em>messy</em></span> <Flower color="#ff5a1f" delay={1.0} /> SaaS problems
          <br className="hidden md:block" />{' '}
          <span className="whitespace-nowrap">into calm</span> <span className="whitespace-nowrap"><Prop src={pRayban} alt="Black sunglasses" delay={1.1} rot={4} /> &amp; simple products.</span>
        </motion.h1>
        <motion.button
          type="button"
          onClick={onWorks}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          whileHover={{ y: -2 }}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#2a2622] px-7 py-3.5 text-[15px] font-medium text-[#f4f1ea] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]"
        >
          See my work <span aria-hidden="true">↓</span>
        </motion.button>
      </div>
      </div>

      <PillDrop heroRef={ref} textRef={textRef} reduce={reduce} />
    </section>
  );
}
