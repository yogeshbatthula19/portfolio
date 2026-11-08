import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import avatar from './assets/photo_yogesh_avatar.webp';
import cycle from './assets/photo_cycle_full.webp';
import couple from './assets/photo_couple_full.webp';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/500.css';
import { FlowArrow, Sparkle, Rocket, SquaresFour, ChatsCircle, Code, Warning, Coffee, ArrowsClockwise } from '@phosphor-icons/react';

// x = left on desktop (%), m = left on mobile (%), b = bottom (px), r = tilt. hideM hides on phones.
const CHIPS = [
  { t: 'Messy → simple', I: FlowArrow, c: '#c8e66b', x: -1, m: -4, b: -4, r: -2 },
  { t: 'AI that feels human', I: Sparkle, c: '#ff8a4c', x: 7, m: 6, b: 54, r: -5 },
  { t: 'Talking to users', I: ChatsCircle, c: '#9cc9f5', x: 14.5, m: 41, b: -4, r: 1 },
  { t: 'Systems over screens', I: SquaresFour, c: '#f6b8d0', x: 38, b: 54, r: 3, hideM: 1 },
  { t: 'Figma to shipped', I: Code, c: '#5fd6a0', x: 31.5, b: -4, r: 0, hideM: 1 },
  { t: 'Edge cases first', I: Warning, c: '#d7c4f5', x: 48.5, b: -4, r: -1, hideM: 1 },
  { t: '0 → 1 products', I: Rocket, c: '#ffd23f', x: 69, m: 58, b: 62, r: -7 },
  { t: 'Chai-powered', I: Coffee, c: '#ffb38a', x: 65.5, b: -4, r: 2, hideM: 1 },
  { t: 'Scrum certified', I: ArrowsClockwise, c: '#ececec', x: 81, b: -4, r: -2, hideM: 1 },
];

export default function DeskHero({ onWorks, onAbout }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const pill = (src, alt) => (
    <motion.span
      initial={reduce ? false : { width: 0, opacity: 0 }}
      animate={{ width: 'auto', opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block align-middle overflow-hidden mx-[0.12em] -mt-[0.12em]"
    >
      <img src={src} alt={alt} className="block h-[0.78em] w-[1.5em] rounded-full object-cover border-2 border-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]" />
    </motion.span>
  );

  return (
    <section ref={ref} style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }} className="desk-hero relative w-full min-h-[max(100svh,820px)] md:min-h-[max(100svh,780px)] overflow-hidden bg-[#f4f1ea]">
      {/* faint paper grain */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(42,38,34,0.09) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      <div className="absolute inset-0 z-10 flex items-center justify-center pt-6 pb-[150px] md:pb-[130px] pointer-events-none">
      <div className="desk-copy pointer-events-auto mx-auto max-w-[880px] px-5 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-[15px] sm:text-[16px] text-[#5b5248]"
        >
          Hello <img src={avatar} alt="Yogesh Battula" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow" /> I'm Yogesh, a product designer
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-6 text-[#2a2622] text-[54px] sm:text-[84px] lg:text-[104px] leading-[0.98] tracking-[-0.025em]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Designing {pill(cycle, 'Yogesh cycling on campus')} AI products people <em className="italic">trust</em>{pill(couple, 'Yogesh with his partner')} and enjoy.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 sm:mt-7 text-[16px] sm:text-[18px] text-[#5b5248] leading-relaxed"
        >
          5+ years across <b className="font-medium text-[#2a2622]">AI and SaaS products</b>.<br className="hidden sm:block" /> Clean on the surface, sensible underneath. Based in Hyderabad.
        </motion.p>
        <motion.button
          type="button"
          onClick={onWorks}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          whileHover={{ y: -2 }}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2a2622] px-7 py-3.5 text-[15px] font-medium text-[#f4f1ea] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]"
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
              bottom: `${c.b}px`,
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
