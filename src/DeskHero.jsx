import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import avatar from './assets/photo_yogesh_avatar.webp';
import lighthouse from './assets/photo_lighthouse.webp';
import cycle from './assets/photo_cycle_full.webp';
import couple from './assets/photo_couple_full.webp';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/500.css';
import { FlowArrow, Sparkle, SquaresFour, CursorClick, Question, CornersOut, Code, ArrowsClockwise, MagnifyingGlass } from '@phosphor-icons/react';
import { sparkles, glowingStar, sunflower, cloud, heart, drawPen, drawCursor, drawSmile } from './Illustrations';

// Hand-drawn line objects (code-generated SVG). One ink colour, one accent blob each.
const INK = '#2a2622';
const S = { fill: 'none', stroke: INK, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };

const Blob = ({ color, d = 'M30 18c14-10 40-8 52 6s8 38-6 48-42 10-54-4-6-40 8-50z', ...p }) => (
  <path d={d} fill={color} opacity="0.9" {...p} />
);

const Notebook = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <Blob color="#c8e66b" transform="translate(18 14)" />
    <path {...S} d="M30 22l58-3c2 0 4 2 4 4l2 74c0 2-2 4-4 4l-58 2c-2 0-4-2-4-4l-2-73c0-2 2-4 4-4z" fill="#fffdf6" />
    {[30, 42, 54, 66, 78, 90].map((y) => <path key={y} {...S} d={`M24 ${y}c4-3 8-3 10 1`} />)}
    <rect x="42" y="30" width="38" height="20" rx="3" {...S} />
    <path {...S} d="M42 58h26M42 66h34M42 74h18" />
    <rect x="42" y="82" width="16" height="9" rx="4" {...S} fill="#ff7a45" />
  </svg>
);

const Chai = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <Blob color="#ffb38a" transform="translate(16 20)" />
    <path {...S} d="M48 22c-6 6 6 10 0 16M62 18c-6 7 6 11 0 18M76 22c-6 6 6 10 0 16" />
    <path {...S} d="M34 44h52l-7 56c-1 3-3 5-6 5H47c-3 0-5-2-6-5z" fill="#fffdf6" />
    <path d="M37 60h46l-5 39c0 2-2 4-4 4H46c-2 0-4-2-4-4z" fill="#d98a3d" opacity="0.85" />
    <path {...S} d="M37 60h46" />
    <path {...S} d="M44 50v4M54 50v4M64 50v4M74 50v4" opacity="0.5" />
  </svg>
);

const Paper = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <Blob color="#9cc9f5" transform="translate(14 16)" />
    <path {...S} d="M32 16h40l18 18v70c0 2-2 4-4 4H32c-2 0-4-2-4-4V20c0-2 2-4 4-4z" fill="#fffdf6" />
    <path {...S} d="M72 16v16c0 2 1 3 3 3h15" />
    <circle cx="44" cy="36" r="6" {...S} />
    <path {...S} d="M38 54h40M38 63h34M38 72h40M38 81h26M38 90h32" />
    <path d="M80 86l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z" fill="#ffd23f" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const Envelope = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <Blob color="#f6b8d0" transform="translate(18 18)" />
    <rect x="20" y="38" width="80" height="54" rx="5" {...S} fill="#fffdf6" />
    <path {...S} d="M22 41l38 30 38-30M22 90l28-24M98 90L70 66" />
    <path d="M60 24c-4-6-13-3-11 4 1 5 11 11 11 11s10-6 11-11c2-7-7-10-11-4z" fill="#ff5c5c" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const Phone = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <Blob color="#d7c4f5" transform="translate(16 14)" />
    <rect x="38" y="14" width="44" height="88" rx="9" {...S} fill="#fffdf6" />
    <path {...S} d="M54 21h12" />
    <rect x="45" y="30" width="30" height="22" rx="3" {...S} fill="#9cc9f5" />
    <path {...S} d="M45 60h30M45 68h22" />
    <circle cx="51" cy="84" r="5" {...S} fill="#c8e66b" />
    <circle cx="69" cy="84" r="5" {...S} fill="#ffd23f" />
  </svg>
);

const Polaroid = () => (
  <div className="w-full h-full relative">
    <div className="absolute inset-[6%] bg-[#fffdf6] p-[7%] pb-[22%] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.35)] border border-black/10">
      <img src={lighthouse} alt="" className="w-full h-full object-cover" draggable={false} />
    </div>
    <div className="absolute left-[34%] -top-[1%] w-[34%] h-[11%] bg-[#ffd23f]/70 rotate-[-6deg]" />
  </div>
);

// Desktop position (x,y) and mobile position (mx,my) as % of the hero.
const OBJECTS = [
  { key: 'work', label: 'Work', Icon: Notebook, x: 9, y: 16, mx: 4, my: 10, rot: -6, action: 'works' },
  { key: 'photos', desk: true, label: 'Off-screen', Icon: Polaroid, x: 17, y: 44, mx: 37, my: 7, rot: 5, action: 'photos' },
  { key: 'resume', label: 'Resume', Icon: Paper, x: 8, y: 60, mx: 70, my: 10, rot: -3, href: '/yogesh-battula-resume.pdf' },
  { key: 'about', label: 'About me', Icon: Chai, x: 80, y: 14, mx: 4, my: 74, rot: 4, action: 'about' },
  { key: 'linkedin', desk: true, label: 'LinkedIn', Icon: Phone, x: 72, y: 44, mx: 37, my: 72, rot: -5, href: 'https://www.linkedin.com/in/yogeshbattula/' },
  { key: 'hello', label: 'Say hello', Icon: Envelope, x: 81, y: 60, mx: 70, my: 74, rot: 3, href: 'mailto:yogeshbattula55@gmail.com' },
];

const CHIPS = [
  { t: 'Untangling flows', I: FlowArrow, c: '#c8e66b', x: -1, m: -4, r: -4 },
  { t: 'AI products', I: Sparkle, c: '#ff8a4c', x: 16, m: 44, r: -18, lift: 1 },
  { t: 'Design systems', I: SquaresFour, c: '#f6b8d0', x: 31, m: 70, r: 2, hideM: 1 },
  { t: 'Prototyping', I: CursorClick, c: '#ececec', x: 13, m: 2, r: 0, row: 1 },
  { t: 'Asking why', I: Question, c: '#9cc9f5', x: 63, m: 70, r: 3, row: 1 },
  { t: 'Edge cases', I: CornersOut, c: '#d7c4f5', x: 76, m: 72, r: -3, hideM: 1 },
  { t: 'Shipping with devs', I: Code, c: '#5fd6a0', x: 47, m: 33, r: 0, row: 1 },
  { t: 'Scrum master', I: ArrowsClockwise, c: '#ffd23f', x: 80, m: 76, r: 5, row: 1, hideM: 1 },
  { t: 'User research', I: MagnifyingGlass, c: '#ffb38a', x: 33, m: 30, r: 6, row: 1, hideM: 1 },
];

function DeskObject({ o, i, onAction, reduce }) {
  const { Icon } = o;
  const inner = (
    <>
      <motion.div
        className="w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] lg:w-[120px] lg:h-[120px] mx-auto"
        style={{ rotate: o.rot }}
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
      >
        <Icon />
      </motion.div>
      <span className="desk-label mt-1 sm:mt-2 block text-center text-[20px] sm:text-[23px] leading-none text-[#2a2622]">{o.label}</span>
    </>
  );
  const cls = `desk-obj absolute z-20 cursor-pointer select-none ${o.desk ? 'hidden md:block' : 'block'}`;
  const style = { '--x': `${o.x}%`, '--y': `${o.y}%`, '--mx': `${o.mx}%`, '--my': `${o.my}%` };
  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 24, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay: 0.35 + i * 0.09, type: 'spring', stiffness: 160, damping: 16 },
    whileHover: { scale: 1.08, rotate: o.rot > 0 ? -4 : 4 },
    whileTap: { scale: 0.95 },
  };
  if (o.href) {
    const ext = o.href.startsWith('http') || o.href.endsWith('.pdf');
    return (
      <motion.a href={o.href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined} className={cls} style={style} {...motionProps}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={() => onAction(o.action)} className={cls} style={style} {...motionProps}>
      {inner}
    </motion.button>
  );
}

export default function DeskHero({ onWorks, onAbout }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const onAction = (a) => {
    if (a === 'works') onWorks();
    else if (a === 'about') onAbout();
    else if (a === 'photos') {
      const el = document.getElementById('off-screen');
      if (el) (window.lenis ? window.lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: 'smooth' }));
    }
  };
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

      <header className="relative z-30 flex items-center justify-between px-5 sm:px-10 pt-5 sm:pt-7">
        <span className="text-[34px] sm:text-[40px] leading-none text-[#2a2622]" style={{ fontFamily: "'Sacramento', cursive" }}>Yogesh</span>
        <span className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#5b5248]">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#2fbf71] opacity-60 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2fbf71]" /></span>
          Open to Product Design roles
        </span>
      </header>


      {/* Illustrations: Fluent Emoji + Streamline Freehand doodles */}
      {[
        { C: sparkles, cls: 'left-[30%] top-[17%] w-8 md:w-10', r: -10, d: 0 },
        { C: glowingStar, cls: 'right-[29%] top-[16%] w-7 md:w-9', r: 12, d: 0.6 },
        { C: sunflower, cls: 'hidden md:block left-[29%] top-[67%] w-10', r: -8, d: 1.2 },
        { C: cloud, cls: 'hidden md:block right-[27%] top-[66%] w-12', r: 0, d: 0.3 },
        { C: heart, cls: 'hidden md:block left-[47%] top-[9%] w-6', r: 10, d: 0.9 },
                { C: drawPen, cls: 'hidden md:block right-[20%] top-[34%] w-10 opacity-80', r: 8, d: 1 },
        { C: drawCursor, cls: 'hidden md:block left-[38%] top-[78%] w-9 opacity-80', r: -6, d: 0.2 },
        { C: drawSmile, cls: 'hidden md:block right-[35%] top-[79%] w-8 opacity-80', r: 0, d: 0.8 },
      ].map(({ C, cls, r, d }, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`absolute z-[5] pointer-events-none ${cls}`}
          initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: r - 30 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: [r, r + 8, r], y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.8 + d, duration: 0.4 }, scale: { delay: 0.8 + d, type: 'spring', stiffness: 200, damping: 12 }, rotate: { duration: 5 + d, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 4 + d, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <C className="w-full h-auto" />
        </motion.div>
      ))}

      {OBJECTS.map((o, i) => <DeskObject key={o.key} o={o} i={i} onAction={onAction} reduce={reduce} />)}

      <div className="absolute inset-0 z-10 flex items-start md:items-center justify-center pt-[215px] pb-[270px] md:pt-10 md:pb-[120px] pointer-events-none">
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
      <div className="absolute inset-x-0 bottom-0 h-[118px] sm:h-[130px] z-30 pointer-events-none" ref={null}>
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
              '--cx': `${c.x}%`, '--cm': `${c.m}%`,
              bottom: c.row ? '-6px' : c.lift ? '92px' : '50px',
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
