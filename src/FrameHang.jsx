import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Frame from './Frame';
import photoLighthouse from './assets/photo_lighthouse.webp';
import photoTemple from './assets/photo_temple.webp';
import photoCouple from './assets/photo_couple_full.webp';
import photoCycle from './assets/photo_cycle_full.webp';
import cafeDumplings from './assets/foodiee/EE067D71-C03C-40AA-A692-A428618A1A7D.webp';

// A salon-style hang: one tall centrepiece, smaller frames balanced either side.
// Order reads left to right: cycling, temple (centre), couple + lighthouse, dumplings.
const HANG = [
  { src: photoCycle, alt: 'Cycling through campus', v: 'sq1', area: 'a', ratio: '1.05/1', pos: 'center 55%', note: 'Campus mornings' },
  { src: photoTemple, alt: 'Temple gopuram', v: 'tall', area: 'b', ratio: '0.62/1', pos: 'center 40%', note: 'Where I slow down' },
  { src: photoCouple, alt: 'Yogesh and partner', v: 'round', area: 'c', ratio: '1/1', pos: 'center', note: 'My better half' },
  { src: cafeDumplings, alt: 'Café dumplings', v: 'land', area: 'd', ratio: '1.14/1', pos: 'center', note: 'Café research' },
  { src: photoLighthouse, alt: 'Coastal lighthouse', v: 'wide', area: 'e', ratio: '2.07/1', pos: 'center 38%', note: 'The coast' },
];

const AREAS = {
  // mobile: 2 cols. desktop: 12-col salon layout.
  a: 'col-span-1 sm:col-span-3 sm:col-start-1 sm:row-start-1 sm:mt-10',
  b: 'col-span-1 row-span-2 sm:col-span-4 sm:col-start-5 sm:row-start-1 sm:row-span-2',
  c: 'col-span-1 sm:col-span-3 sm:col-start-10 sm:row-start-1 sm:mt-4',
  d: 'order-last col-span-2 w-1/2 mx-auto sm:order-none sm:w-auto sm:mx-0 sm:col-span-3 sm:col-start-1 sm:row-start-2 sm:mt-2',
  e: 'col-span-2 sm:col-span-3 sm:col-start-10 sm:row-start-2 sm:mt-6',
};

export default function FrameHang() {
  const reduced = useReducedMotion();
  return (
    <section className="w-full max-w-[1000px] mx-auto px-5 sm:px-8 py-16 sm:py-24" aria-labelledby="hang-title">
      <motion.div
        className="text-center"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-caption uppercase tracking-[0.22em] text-[#f4dfa0] font-basier">On the wall</p>
        <h2 id="hang-title" className="mt-3 text-h2 sm:text-h1 text-[#f3f7ff]" style={{ fontFamily: "'The Seasons', Georgia, serif" }}>
          The places and people I keep close.
        </h2>
      </motion.div>

      <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-12 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8 items-start">
        {HANG.map((p, i) => (
          <motion.figure
            key={p.alt}
            className={`group ${AREAS[p.area]}`}
            initial={reduced ? false : { opacity: 0, y: -40, rotate: i % 2 ? 2.5 : -2.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 90, damping: 11, mass: 0.9, delay: i * 0.1 }}
            style={{ transformOrigin: '50% 0%' }}
          >
            <div style={{ aspectRatio: p.ratio }} className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <Frame variant={p.v}>
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" style={{ objectPosition: p.pos }} className="w-full h-full object-cover block" />
              </Frame>
            </div>
            <figcaption className="mt-3 text-center text-caption text-[#f4dfa0]/0 group-hover:text-[#f4dfa0] transition-colors duration-300">{p.note}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
