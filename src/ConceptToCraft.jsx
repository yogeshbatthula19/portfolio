import React, { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import foodie01 from './assets/foodiee/08D11BD2-E811-496F-87D0-F920267BBD6F.jpg';
import foodie02 from './assets/foodiee/14E8659C-DBD2-4AE3-B451-25FE1C1FAC10.jpg';
import foodie03 from './assets/foodiee/2B9F4E39-0418-4D21-9453-83EE4C46C4B8.jpg';
import foodie04 from './assets/foodiee/4B0A033D-13C3-4456-BCF5-51434FA41830.jpg';
import foodie05 from './assets/foodiee/5311E363-6852-4A52-A100-BBD7AAB01A02.jpg';
import foodie06 from './assets/foodiee/675A14DB-4D2D-4A6E-A4E7-A15571EB4BD4.jpg';
import foodie07 from './assets/foodiee/7C0D7067-B6C1-420A-ADBB-07B85454FD5B.jpg';
import foodie08 from './assets/foodiee/EE067D71-C03C-40AA-A692-A428618A1A7D.jpg';
import foodie09 from './assets/foodiee/EE47A0CB-9B02-4924-8207-558C2197B111.jpg';
import foodie10 from './assets/foodiee/F45DA272-9457-419D-94BB-7A652019D1C0.jpg';
import foodie11 from './assets/foodiee/FE76B4D9-3BC5-464A-A623-C944B3BA0005.jpg';
import './concept-to-craft.css';

const cards = [
  { type: 'photo', src: foodie01, alt: 'Mango dessert toast' },
  { type: 'photo', src: foodie02, alt: 'Artisanal culinary plate' },
  { type: 'photo', src: foodie03, alt: 'Specialty cafe dish' },
  { type: 'photo', src: foodie04, alt: 'Gourmet meal creation' },
  { type: 'photo', src: foodie05, alt: 'Crisp cafe breakfast' },
  { type: 'photo', src: foodie06, alt: 'Handcrafted pasta dish' },
  { type: 'photo', src: foodie07, alt: 'Fresh savory plate' },
  { type: 'photo', src: foodie08, alt: 'Sweet dessert delicacy' },
  { type: 'photo', src: foodie09, alt: 'Specialty breakfast spread' },
  { type: 'photo', src: foodie10, alt: 'Delicious cafe culinary treat' },
  { type: 'photo', src: foodie11, alt: 'Chef gourmet plate' },
];

function CraftCard({ card, index, progress, width, ribbonMetrics, reduced }) {
  const { sizes, offsets, startX, totalTravel, baseSize } = ribbonMetrics;
  const size = sizes[index] || baseSize;
  const offset = offsets[index] || 0;

  // Smooth continuous linear horizontal glide from startX to endX
  const x = useTransform(progress, p => startX + offset - p * totalTravel);
  const distance = useTransform(x, value => (value + size / 2 - width / 2) / Math.max(width / 2, 1));
  const y = useTransform(distance, value => (baseSize - size) * 0.5 + 40 * (1 - Math.min(value * value, 2)));
  const rotate = useTransform(distance, value => Math.max(-10, Math.min(10, value * 7)));
  const rotateY = useTransform(distance, value => Math.max(-8, Math.min(8, -value * 6)));
  const scale = useTransform(distance, value => 1.04 - Math.min(value * value, 1) * 0.08);
  const z = useTransform(distance, value => -Math.min(value * value, 2) * 35);
  const zIndex = useTransform(distance, value => Math.round(20 - Math.min(Math.abs(value), 2) * 5));

  return (
    <motion.figure
      className={`craft-card craft-card--${card.type}`}
      style={reduced ? undefined : {
        x,
        y,
        rotate,
        rotateY,
        scale,
        z,
        zIndex,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        width: size
      }}
    >
      <img
        src={card.src}
        alt={card.alt}
        width="600"
        height="750"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </motion.figure>
  );
}

function CraftHeading({ progress, reduced }) {
  // Graceful GPU-accelerated crossfade & subtle slide between "From Foodie" and "To Foodieeeee"
  const fromOpacity = useTransform(progress, [0.40, 0.54], [1, 0]);
  const fromY = useTransform(progress, [0.40, 0.54], [0, -14]);
  const toOpacity = useTransform(progress, [0.46, 0.60], [0, 1]);
  const toY = useTransform(progress, [0.46, 0.60], [14, 0]);

  if (reduced) {
    return (
      <div className="craft-heading">
        <h2 id="craft-title">
          <span className="craft-title-single">From Foodie<br />To Foodieeeee</span>
        </h2>
      </div>
    );
  }

  return (
    <div className="craft-heading">
      <h2 id="craft-title" className="relative flex items-center justify-center">
        <span className="craft-sr-only">From Foodie to Foodieeeee</span>
        
        {/* Phase 1: From Foodie */}
        <motion.span 
          style={{ opacity: fromOpacity, y: fromY }} 
          className="craft-title-single"
          aria-hidden="true"
        >
          From Foodie
        </motion.span>

        {/* Phase 2: To Foodieeeee */}
        <motion.span 
          style={{ opacity: toOpacity, y: toY }} 
          className="craft-title-single absolute"
          aria-hidden="true"
        >
          To Foodieeeee
        </motion.span>
      </h2>
    </div>
  );
}

export default function ConceptToCraft() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(900);

  // Track raw scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Snappy, silky spring that tracks wheel & touch gestures with zero lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.12,
    restDelta: 0.0001
  });

  const progress = reduced ? scrollYProgress : smoothProgress;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => { 
      setWidth(viewport.clientWidth); 
      setHeight(viewport.clientHeight); 
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const ribbonMetrics = useMemo(() => {
    const isMobile = width < 640;
    const baseSize = Math.min(isMobile ? width * 0.72 : width * 0.28, height * 0.48, 420);
    const sizeFactors = [0.82, 1.02, 0.86, 1.06, 0.78, 0.98, 0.84, 1.04, 0.82, 1.0, 0.88];
    const gap = isMobile ? 24 : 56;
    const sizes = sizeFactors.map(f => baseSize * f);
    const offsets = sizeFactors.map((f, i) =>
      sizeFactors.slice(0, i).reduce((sum, factor) => sum + baseSize * factor + gap, 0)
    );

    // Initial state: ALL images start completely outside of the frame to the right
    // Final state: ALL images finish completely outside of the frame to the left
    const startX = width + (isMobile ? 60 : 120);
    const endX = -sizes[10] - (isMobile ? 60 : 120);
    const totalTravel = (startX + offsets[10]) - endX;

    return {
      sizes,
      offsets,
      startX,
      totalTravel,
      baseSize
    };
  }, [width, height]);

  return (
    <section className={`concept-craft ${reduced ? 'concept-craft--static' : ''}`} aria-labelledby="craft-title">
      <div className="craft-scroll-track" ref={sectionRef}>
        <div className="craft-viewport" ref={viewportRef}>
          <CraftHeading progress={progress} reduced={reduced} />
          <div className="craft-ribbon" aria-label="From observation to finished design">
            {cards.map((card, index) => (
              <CraftCard 
                key={index} 
                card={card} 
                index={index} 
                progress={progress} 
                width={width} 
                height={height} 
                ribbonMetrics={ribbonMetrics}
                reduced={reduced} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
