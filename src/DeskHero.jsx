import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import beach from './assets/photo_beach_full.jpg';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/500.css';
import { FlowArrow, Sparkle, Rocket, SquaresFour, ChatsCircle, Coffee, ArrowsClockwise, MagnifyingGlass, CursorClick, Flask, Compass, Heart } from '@phosphor-icons/react';

// x = left on desktop (%), m = left on mobile (%), b = bottom (px), r = tilt. hideM hides on phones.
const CHIPS = [
  { t: 'Research', I: MagnifyingGlass, c: '#9cc9f5', x: 0, m: -2, b: -4, r: -2 },
  { t: 'Flows', I: FlowArrow, c: '#c8e66b', x: 4.5, b: 50, r: -7, hideM: 1 },
  { t: 'Prototyping', I: CursorClick, c: '#ececec', x: 14, m: 3, b: 48, r: 3 },
  { t: 'AI', I: Sparkle, c: '#ff8a4c', x: 28, m: 43, b: 52, r: 9 },
  { t: 'Systems', I: SquaresFour, c: '#f6b8d0', x: 26.5, m: 29, b: -4, r: 1 },
  { t: 'Testing', I: Flask, c: '#d7c4f5', x: 38.5, b: -4, r: -2, hideM: 1 },
  { t: 'Shipping', I: Rocket, c: '#5fd6a0', x: 51, b: -4, r: 2, hideM: 1 },
  { t: 'Strategy', I: Compass, c: '#ffd23f', x: 58, m: 58, b: 52, mb: -4, r: -5 },
  { t: 'Scrum', I: ArrowsClockwise, c: '#ffffff', x: 64, b: -4, r: -1, hideM: 1 },
  { t: 'Workshops', I: ChatsCircle, c: '#ffb38a', x: 74.5, b: -4, r: 2, hideM: 1 },
  { t: 'Chai', I: Coffee, c: '#e9d3b4', x: 82, m: 66, b: 50, r: -6 },
  { t: 'Empathy', I: Heart, c: '#f6b8d0', x: 87.5, b: -4, r: 0, hideM: 1 },
];

export default function DeskHero({ onWorks, onAbout }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Inline pieces that sit inside the headline, sized in em so they scale with the type.
  const grow = (delay) => ({
    initial: reduce ? false : { width: 0, opacity: 0 },
    animate: { width: 'auto', opacity: 1 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });
  const Photo = ({ src, alt, delay }) => (
    <motion.span {...grow(delay)} className="inline-block align-middle overflow-hidden mx-[0.1em] -mt-[0.14em]">
      <img src={src} alt={alt} className="block h-[0.66em] w-[1.6em] rounded-full object-cover object-[center_22%]" />
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
      className="inline-block align-middle mx-[0.08em] -mt-[0.16em]"
      initial={reduce ? false : { scale: 0, rotate: -90 }}
      animate={reduce ? undefined : { scale: 1, rotate: 360 }}
      transition={{ scale: { delay, type: 'spring', stiffness: 220, damping: 12 }, rotate: { delay, duration: 14, repeat: Infinity, ease: 'linear' } }}
    >
      <svg viewBox="-4 -4 108 108" className="block h-[0.74em] w-[0.74em]">
        <path
          d="M40.0 36.2C22.0 1.5 78.0 1.5 60.0 36.2C87.5 8.4 104.8 61.6 66.2 55.3C101.2 72.8 55.9 105.7 50.0 67.0C44.1 105.7 -1.2 72.8 33.8 55.3C-4.8 61.6 12.5 8.4 40.0 36.2Z"
          fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );

  return (
    <section ref={ref} style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }} className="desk-hero relative w-full min-h-[max(100svh,820px)] md:min-h-[max(100svh,780px)] overflow-hidden bg-[#f4f1ea]">
      {/* faint paper grain */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(42,38,34,0.09) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      <div className="absolute inset-0 z-10 flex items-center justify-center pt-6 pb-[150px] md:pb-[130px] pointer-events-none">
      <div className="desk-copy pointer-events-auto mx-auto max-w-[1180px] px-5 text-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#141210] text-[48px] sm:text-[80px] lg:text-[100px] leading-[1.06] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          <em>Hi,</em> <Flower color="#3554f0" delay={0.5} /> I'm Yogesh <Photo src={beach} alt="Yogesh by the sea" delay={0.7} />
          <br className="hidden md:block" />{' '}
          <span className="whitespace-nowrap"><Swatch kind="a" delay={0.9} /> <em>a designer</em></span> <Flower color="#8b5cf6" delay={1.0} /> specializing in
          <br className="hidden md:block" />{' '}
          <span className="whitespace-nowrap">AI products</span> <span className="whitespace-nowrap"><Swatch kind="b" delay={1.1} /> <em>&amp; SaaS.</em></span>
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

      {/* Skill chips: drop in, then draggable */}
      <div className="absolute inset-x-0 bottom-0 h-[118px] sm:h-[130px] z-30 pointer-events-none">
        {CHIPS.map((c, i) => (
          <motion.span
            key={c.t}
            drag={!reduce}
            dragConstraints={ref}
            dragElastic={0.2}
            dragMomentum
            whileDrag={{ scale: 1.08, zIndex: 50, cursor: 'grabbing' }}
            initial={reduce ? false : { y: -700, rotate: c.r * 4, opacity: 0 }}
            animate={{ y: 0, rotate: c.r, opacity: 1 }}
            transition={{ delay: 1.1 + i * 0.12, type: 'spring', stiffness: 120, damping: 11, mass: 0.9 }}
            className={`chip ${c.hideM ? 'hidden md:inline-block' : 'inline-block'} absolute pointer-events-auto cursor-grab whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 text-[11px] sm:text-[14px] tracking-[0.06em] uppercase text-[#2a2622] border border-black/10 shadow-[0_6px_14px_-8px_rgba(0,0,0,0.35)]`}
            style={{
              background: c.c,
              '--cx': `${c.x}%`, '--cm': `${c.m ?? 0}%`,
              '--b': `${c.b}px`, '--mb': `${c.mb ?? c.b}px`,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            <span className="inline-flex items-center gap-2">{c.t}<c.I size={16} weight="bold" aria-hidden="true" /></span>
          </motion.span>
        ))}
      </div>
    </section>
  );
}
