import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import cutout from './assets/yogesh_cutout.webp';
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/inter';

// Poster-style About: heavy serif title, marker-tag name, short centred bio,
// sticker cut-out photo over bold grainy shapes.
const grain = (id, base = 0.9) => (
  <filter id={id} x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency={base} numOctaves="2" stitchTiles="stitch" />
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0" />
    <feComposite in2="SourceGraphic" operator="in" />
  </filter>
);

export default function AboutPoster() {
  const reduce = useReducedMotion();
  const pop = (d) => ({ initial: reduce ? false : { scale: 0.6, opacity: 0 }, whileInView: { scale: 1, opacity: 1 }, viewport: { once: true, amount: 0 }, transition: { delay: d, type: 'spring', stiffness: 140, damping: 16 } });
  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[#f1ebe1]" style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }}>
      {/* paper speckle */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-40 mix-blend-multiply"><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" /><feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.35  0 0 0 0.35 0" /></filter><rect width="100%" height="100%" filter="url(#paper)" /></svg>

      <div className="relative z-10 mx-auto max-w-[860px] px-6 pt-14 md:pt-20 text-center">
        <h2 className="text-[#161412] text-[56px] sm:text-[96px] md:text-[120px] leading-[0.92] tracking-[-0.02em]" style={{ fontFamily: "'Fraunces Variable', Georgia, serif", fontWeight: 900, fontVariationSettings: "'SOFT' 0, 'WONK' 0, 'opsz' 144" }}>
          Messy to<br />simple
        </h2>
        <motion.div {...pop(0.15)} className="relative mx-auto mt-6 inline-block -rotate-1">
          <span aria-hidden="true" className="absolute -inset-x-6 -inset-y-2 bg-[#ffc81f]" style={{ clipPath: 'polygon(1% 8%, 99% 0, 100% 90%, 0 100%)' }} />
          <span className="relative text-[#16245a] text-[26px] md:text-[34px]" style={{ fontFamily: "'Fraunces Variable', Georgia, serif", fontWeight: 600 }}>Yogesh Battula</span>
        </motion.div>
        <p className="mx-auto mt-7 max-w-[640px] text-[#16245a] text-[17px] md:text-[21px] leading-[1.45]">
          Product designer in Hyderabad with 5+ years of turning busy SaaS tools into calm, clear products. I work with teams and clients from first sketch to <em className="italic">shipped</em>, honest about trade-offs and fond of simple fixes.
        </p>
      </div>

      {/* shapes + sticker photo */}
      <div className="relative mt-10 h-[380px] md:h-[520px]">
        <svg aria-hidden="true" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
          <defs>{grain('g1', 0.85)}{grain('g2', 0.9)}</defs>
          <motion.g {...pop(0.1)} style={{ transformOrigin: '420px 300px' }}>
            <polygon points="330,30 430,170 520,10 560,170 720,90 640,250 820,280 660,340 720,480 330,480" fill="#ffc81f" />
          </motion.g>
          <motion.g {...pop(0.2)} style={{ transformOrigin: '180px 520px' }}>
            <path d="M-40 520 C-40 380 20 300 110 320 C160 220 300 230 330 330 C420 330 460 430 440 520 Z" fill="#f2643a" />
            <path d="M-40 520 C-40 380 20 300 110 320 C160 220 300 230 330 330 C420 330 460 430 440 520 Z" fill="#f2643a" filter="url(#g1)" />
          </motion.g>
          <motion.g {...pop(0.3)} style={{ transformOrigin: '1080px 470px' }}>
            <circle cx="1080" cy="470" r="400" fill="#1aa17f" />
            <circle cx="1080" cy="470" r="400" fill="#0f6e74" filter="url(#g2)" />
          </motion.g>
        </svg>
        <div className="absolute inset-x-0 bottom-0 top-0 flex justify-center overflow-hidden">
          <motion.img
            src={cutout} alt="Yogesh Battula" draggable={false}
            initial={reduce ? false : { y: 60, opacity: 0, rotate: -4 }}
            whileInView={{ y: 0, opacity: 1, rotate: -2 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 120, damping: 16 }}
            className="relative block h-[128%] w-auto max-w-none self-start mt-[3%]"
            style={{ filter: 'drop-shadow(6px 0 0 #fff) drop-shadow(-6px 0 0 #fff) drop-shadow(0 6px 0 #fff) drop-shadow(0 -6px 0 #fff) drop-shadow(0 18px 24px rgba(0,0,0,0.25))' }}
          />
        </div>
      </div>
    </section>
  );
}
