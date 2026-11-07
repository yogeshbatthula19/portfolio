import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Frame from './Frame';
import foodie01 from './assets/foodiee/08D11BD2-E811-496F-87D0-F920267BBD6F.jpg';
import foodie03 from './assets/foodiee/2B9F4E39-0418-4D21-9453-83EE4C46C4B8.jpg';
import foodie05 from './assets/foodiee/5311E363-6852-4A52-A100-BBD7AAB01A02.jpg';
import foodie06 from './assets/foodiee/675A14DB-4D2D-4A6E-A4E7-A15571EB4BD4.jpg';
import foodie10 from './assets/foodiee/F45DA272-9457-419D-94BB-7A652019D1C0.jpg';

// Each frame hangs at its own size and height, like a gallery wall.
const photos = [
  { src: foodie01, alt: 'Mango dessert toast', ratio: '3/4', v: 'portrait', w: 'sm:w-[16%]', drop: 'sm:mt-0' },
  { src: foodie03, alt: 'Specialty café dish', ratio: '4/5', v: 'tall2', w: 'sm:w-[21%]', drop: 'sm:mt-14' },
  { src: foodie05, alt: 'Crisp café breakfast', ratio: '1/1', v: 'round', w: 'sm:w-[17%]', drop: 'sm:mt-2' },
  { src: foodie06, alt: 'Handcrafted pasta dish', ratio: '3/4', v: 'tall', w: 'sm:w-[19%]', drop: 'sm:mt-20' },
  { src: foodie10, alt: 'Café dessert', ratio: '4/5', v: 'small', w: 'sm:w-[14%]', drop: 'sm:mt-6' },
];



const SPEEDS = [26, -14, 34, -24, 14];
const TILT = [-3, 2.5, -2, 3, -2.5];

// One frame: it drops in on a nail, settles with a small swing, then drifts at
// its own speed as the page scrolls (a slow parallax across the wall).
function HungFrame({ p, i, scrollYProgress, reduced, children }) {
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [SPEEDS[i], -SPEEDS[i]]);
  return (
    <motion.figure
      style={{ y }}
      className={`group ${p.w} ${p.drop} ${i % 2 ? 'mt-8 sm:mt-0' : ''} ${i === 4 ? 'col-span-2 w-1/2 mx-auto sm:col-span-1 sm:mx-0' : ''}`}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -46, rotate: TILT[i] }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: 'spring', stiffness: 90, damping: 11, mass: 0.9, delay: i * 0.09 }}
        style={{ transformOrigin: '50% 0%' }}
      >
        {children}
      </motion.div>
    </motion.figure>
  );
}

// Off the clock: café frames hung like a gallery wall.
export default function ConceptToCraft() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 sm:px-8 py-20 sm:py-28 text-white"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #2563e6 0%, #1450d6 55%, #0f3fae 100%)' }}
      aria-labelledby="craft-title"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div className="text-center" initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-caption uppercase tracking-[0.22em] text-[#d9b35c] font-basier">Off the clock</p>
          <h2 id="craft-title" className="mt-3 text-h1 sm:text-display text-[#dbe7ff]" style={{ fontFamily: "'The Seasons', Georgia, serif" }}>
            I film cafés
          </h2>
          <p className="mt-4 mx-auto max-w-[46ch] text-body text-[#b9c9e6]">
            Weekends, an Osmo Pocket and a lot of coffee. A few frames from the ones I liked.
          </p>
        </motion.div>

        <div className="mt-14 sm:mt-20 grid grid-cols-2 gap-x-5 gap-y-8 sm:flex sm:justify-between sm:items-start sm:gap-0">
          {photos.map((p, i) => (
            <HungFrame key={p.src} p={p} i={i} scrollYProgress={scrollYProgress} reduced={reduced}>
              <div style={{ aspectRatio: p.ratio }} className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <Frame variant={p.v}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full h-full object-cover block" />
                </Frame>
              </div>
              <figcaption className="mt-3 text-center text-caption text-[#e8c773] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {p.alt}
              </figcaption>
            </HungFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
