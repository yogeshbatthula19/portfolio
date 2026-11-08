import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import beach from './assets/photo_beach_full-opt.webp';
import lighthouse from './assets/photo_lighthouse-sm.webp';
import temple from './assets/photo_temple.webp';
import cycle from './assets/photo_cycle_full.webp';
import couple from './assets/photo_couple_full.webp';
import statue from './assets/photo_statue-sm.webp';
import breakfast from './assets/photo_breakfast-opt.webp';
import f1 from './assets/foodie/foodie-02-sm.webp';
import f2 from './assets/foodie/foodie-05-sm.webp';
import f3 from './assets/foodie/foodie-08-sm.webp';

// Telescope-style: small photos scattered on paper, then one of them grows to fill the screen.
// x/y = centre in vw/vh from the middle; w = width in vw (desktop), mw on mobile.
const TILES = [
  { src: lighthouse, x: -38, y: -30, w: 9, r: -3 },
  { src: temple, x: -22, y: -36, w: 6, r: 2 },
  { src: f1, x: 6, y: -38, w: 5, r: 0 },
  { src: cycle, x: 30, y: -28, w: 8, r: 3 },
  { src: couple, x: 40, y: 2, w: 7, r: -2 },
  { src: breakfast, x: 30, y: 30, w: 9, r: 2 },
  { src: statue, x: -8, y: 34, w: 6, r: -1 },
  { src: f2, x: -30, y: 26, w: 7, r: 3 },
  { src: f3, x: -42, y: 0, w: 5, r: -4 },
];

function Tile({ t, progress }) {
  const spread = useTransform(progress, [0, 0.45], [1, 2.4]);
  const x = useTransform(spread, (s) => t.x * s * window.innerWidth / 100);
  const y = useTransform(spread, (s) => t.y * s * window.innerHeight / 100);
  const opacity = useTransform(progress, [0.25, 0.45], [1, 0]);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.5)]"
      style={{ x, y, opacity, rotate: t.r, willChange: 'transform, opacity', width: `max(${t.w}vw, ${t.w * 1.9}px + 34px)`, translateX: '-50%', translateY: '-50%' }}
    >
      <img src={t.src} alt="" loading="lazy" className="block w-full aspect-[4/5] object-cover" draggable={false} />
    </motion.div>
  );
}

export default function ScatterZoom({ onAbout }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = scrollYProgress; // Lenis/native scroll already smooths; a second spring only adds lag

  // Hero photo grows from a small tile to full-bleed. Animate clip-path on a full-screen layer
  // (no width/height changes, so the browser never re-lays out the page while scrolling).
  const grow = useTransform(p, [0.08, 0.5], [0, 1], { clamp: true });
  const clip = useTransform(grow, (t) => {
    const vw = window.innerWidth; const vh = window.innerHeight;
    const w0 = Math.min(vw * 0.16, 220) + 0; const h0 = Math.min(vw * 0.2, 275);
    const w = w0 + (vw - w0) * t; const h = h0 + (vh - h0) * t;
    const x = (vw - w) / 2; const y = (vh - h) / 2; const r = 6 * (1 - t);
    return `inset(${y.toFixed(1)}px ${x.toFixed(1)}px ${y.toFixed(1)}px ${x.toFixed(1)}px round ${r.toFixed(1)}px)`;
  });
  const imgScale = useTransform(p, [0.5, 1], [1, 1.08]);
  const shade = useTransform(p, [0.4, 0.62], [0, 0.75]);

  const line1 = useTransform(p, [0, 0.06, 0.2, 0.3], [0, 1, 1, 0]);
  const line1y = useTransform(p, [0, 0.3], [20, -30]);
  const line2 = useTransform(p, [0.55, 0.68], [0, 1]);
  const line2y = useTransform(p, [0.55, 0.68], [30, 0]);

  return (
    <section id="off-screen" ref={ref} className="relative h-[340vh] bg-[#f4f1ea]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {TILES.map((t, i) => <Tile key={i} t={t} progress={p} />)}

        <motion.p
          style={{ opacity: line1, y: line1y }}
          className="absolute left-1/2 top-[22%] -translate-x-1/2 z-10 w-[90%] text-center text-[32px] sm:text-[52px] leading-[1.1] text-[#2a2622]"
        >
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Off-screen, I collect small moments.</span>
        </motion.p>

        <motion.div className="absolute inset-0 overflow-hidden z-0" style={{ clipPath: clip, WebkitClipPath: clip, willChange: 'clip-path', transform: 'translateZ(0)' }}>
          <motion.img src={beach} alt="Yogesh standing on the rocks by the sea" className="w-full h-full object-cover object-[center_35%]" style={{ scale: imgScale }} draggable={false} />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" style={{ opacity: shade }} />
        </motion.div>

        <motion.div style={{ opacity: line2, y: line2y }} className="absolute inset-x-0 bottom-[12%] z-10 px-6 text-center text-white">
          <p className="mx-auto max-w-[760px] text-[38px] sm:text-[68px] leading-[1.05]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            On a cycle, at a temple, or by the sea, noticing how things work.
          </p>
          <button
            type="button"
            onClick={onAbout}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-6 py-3 text-[15px] font-medium text-[#2a2622] hover:bg-white transition-colors"
          >
            More about me <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
