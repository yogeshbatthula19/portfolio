import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Asterisk } from '@phosphor-icons/react';
import cutout from './assets/yogesh_casual.webp';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/inter';

// Poster-style About in the hero's language: Instrument Serif, cream paper,
// glossy pastel pills (same gradients as the falling pills) and the spinning asterisks.
const serif = { fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" };
const gloss = (a, b) => ({ background: `linear-gradient(180deg, ${a}, ${b})`, boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.85), inset 0 -6px 0 rgba(0,0,0,0.05), 0 24px 40px -24px rgba(40,40,60,0.45)' });

// giant pills behind the photo: left/bottom in %, width in %, rotation
const SHAPES = [
  { c: ['#e2eeff', '#c4dcff'], l: -6, b: -8, w: 46, h: 46, r: -14, d: 0.05 },
  { c: ['#d3f7e1', '#aeeccb'], l: 58, b: -14, w: 52, h: 58, r: 12, d: 0.15 },
  { c: ['#fff0b8', '#ffd983'], l: 22, b: 30, w: 26, h: 26, r: -24, d: 0.25 },
  { c: ['#f1e4ff', '#dcc0ff'], l: 66, b: 52, w: 20, h: 18, r: 18, d: 0.32 },
];

export default function AboutPoster({ bleed = false }) {
  const reduce = useReducedMotion();
  const pop = (d) => ({ initial: reduce ? false : { scale: 0.7, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true, amount: 0 }, transition: { delay: d, duration: 0.8, ease: [0.22, 1, 0.36, 1] } });
  const Star = ({ color, cls, d }) => (
    <motion.span aria-hidden="true" className={`absolute ${cls}`} style={{ color }}
      initial={reduce ? false : { scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
      transition={{ delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <Asterisk weight="bold" className="block h-full w-full v3-spin" style={{ willChange: 'transform' }} />
    </motion.span>
  );

  return (
    <section className={`relative overflow-hidden bg-[#f4f1ea] ${bleed ? '' : 'rounded-[36px]'}`} style={{ fontFamily: "'STK Bureau Sans','Inter Variable', system-ui, sans-serif" }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(42,38,34,0.09) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      <div className="relative z-10 mx-auto max-w-[860px] px-6 pt-14 md:pt-20 text-center">
        <h2 className="text-[#141210] text-[56px] sm:text-[72px] md:text-[88px] leading-[0.95] tracking-[-0.02em]" style={serif}>
          The person<br />behind the <em className="italic">work</em>
        </h2>
        <motion.div {...pop(0.15)} className="mx-auto mt-6 inline-block -rotate-2 rounded-[16px] md:rounded-[22px] px-6 py-3 md:px-8 md:py-4" style={gloss('#fff0b8', '#ffd983')}>
          <span className="text-[24px] md:text-[28px] font-medium tracking-[-0.015em] leading-none text-[#e0701a]">Yogesh Battula</span>
        </motion.div>
        <p className="mx-auto mt-7 max-w-[600px] text-[#141210]/75 text-[17px] md:text-[17px] leading-[1.5]">
          Civil engineer turned designer. I found my way to UI in 2021 and now design products at Paradigm IT. As a certified Scrum Master, I care about how teams ship as much as what they ship. Away from the desk, you’ll find me on a cycle, at a temple or by the sea.
        </p>
      </div>

      <div className="relative mt-10 h-[360px] sm:h-[440px] md:h-[520px]">
        {SHAPES.map((s, i) => (
          <motion.div key={i} {...pop(s.d)} aria-hidden="true" className="absolute rounded-full"
            style={{ left: `${s.l}%`, bottom: `${s.b}%`, width: `${s.w}%`, height: `${s.h * 1.2}%`, rotate: s.r, ...gloss(s.c[0], s.c[1]) }} />
        ))}
        <Star color="#2f5bff" cls="left-[12%] top-[6%] h-12 w-12 md:h-20 md:w-20" d={0.5} />
        <Star color="#ff5a1f" cls="right-[10%] top-[18%] h-10 w-10 md:h-16 md:w-16" d={0.6} />
        <div className="absolute inset-0 flex justify-center items-end overflow-hidden">
          <motion.img
            src={cutout} alt="Yogesh Battula" draggable={false}
            initial={reduce ? false : { y: 80, opacity: 0, rotate: -3 }}
            whileInView={{ y: 0, opacity: 1, rotate: -1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative block h-[97%] w-auto max-w-none"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
