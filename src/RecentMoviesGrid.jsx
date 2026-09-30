import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// Sliced CD Jewel Cases
import cdOzark from './assets/movies/cd_01_ozark.png';
import cdHomeland from './assets/movies/cd_02_homeland.png';
import cdSuccession from './assets/movies/cd_03_succession.png';
import cdDerryGirls from './assets/movies/cd_04_derry_girls.png';
import cdRachel from './assets/movies/cd_05_rachel_getting_married.png';
import cdModernFamily from './assets/movies/cd_06_modern_family.png';
import cdSlowHorses from './assets/movies/cd_07_slow_horses.png';
import cdFleabag from './assets/movies/cd_08_fleabag.png';
import cdTedLasso from './assets/movies/cd_09_ted_lasso.png';
import cdLostDaughter from './assets/movies/cd_10_the_lost_daughter.png';
import cdSheepDetectives from './assets/movies/cd_11_the_sheep_detectives.png';
import cdBanshees from './assets/movies/cd_12_the_banshees_of_inisherin.png';
import cdTheDrama from './assets/movies/cd_13_the_drama.png';
import cdMindhunter from './assets/movies/cd_14_mindhunter.png';
import cdSeverance from './assets/movies/cd_15_severance.png';
import cdBetterCallSaul from './assets/movies/cd_16_better_call_saul.png';

const MOVIES_AND_SHOWS = [
  { id: 'ozark', title: 'Ozark', type: 'TV Series', year: '2022', cover: cdOzark, colIndex: 0 },
  { id: 'homeland', title: 'Homeland', type: 'TV Series', year: '2020', cover: cdHomeland, colIndex: 1 },
  { id: 'succession', title: 'Succession', type: 'TV Series', year: '2023', cover: cdSuccession, colIndex: 2 },
  { id: 'derry-girls', title: 'Derry Girls', type: 'TV Series', year: '2022', cover: cdDerryGirls, colIndex: 3 },
  { id: 'rachel', title: 'Rachel Getting Married', type: 'Movie', year: '2008', cover: cdRachel, colIndex: 4 },
  
  { id: 'modern-family', title: 'Modern Family', type: 'TV Series', year: '2020', cover: cdModernFamily, colIndex: 0 },
  { id: 'slow-horses', title: 'Slow Horses', type: 'TV Series', year: '2024', cover: cdSlowHorses, colIndex: 1 },
  { id: 'fleabag', title: 'Fleabag', type: 'TV Series', year: '2019', cover: cdFleabag, colIndex: 2 },
  { id: 'ted-lasso', title: 'Ted Lasso', type: 'TV Series', year: '2023', cover: cdTedLasso, colIndex: 3 },
  { id: 'lost-daughter', title: 'The Lost Daughter', type: 'Movie', year: '2021', cover: cdLostDaughter, colIndex: 4 },
  
  { id: 'sheep-detectives', title: 'The Sheep Detectives', type: 'Movie', year: '2023', cover: cdSheepDetectives, colIndex: 0 },
  { id: 'banshees', title: 'The Banshees of Inisherin', type: 'Movie', year: '2022', cover: cdBanshees, colIndex: 1 },
  { id: 'the-drama', title: 'The Drama', type: 'Movie', year: '2024', cover: cdTheDrama, colIndex: 2 },
  { id: 'mindhunter', title: 'Mindhunter', type: 'TV Series', year: '2019', cover: cdMindhunter, colIndex: 3 },
  { id: 'severance', title: 'Severance', type: 'TV Series', year: '2022', cover: cdSeverance, colIndex: 4 },
  
  { id: 'saul', title: 'Better Call Saul', type: 'TV Series', year: '2022', cover: cdBetterCallSaul, colIndex: 0 },
];

function JewelCaseCard({ item, index, parallaxY }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt interactive motion values
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 350, damping: 24, mass: 0.1 };
  const smoothRotateX = useSpring(rotateXVal, springConfig);
  const smoothRotateY = useSpring(rotateYVal, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt angles (max +/- 10 degrees)
    rotateXVal.set(((centerY - y) / centerY) * 10);
    rotateYVal.set(((x - centerX) / centerX) * 10);

    // Glare position percentage
    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: Math.min((index % 5) * 0.07 + Math.floor(index / 5) * 0.05, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Perspective Card Container */}
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformPerspective: 800,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative w-full aspect-[180/186] rounded-[6px] overflow-hidden drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all duration-300"
      >
        {/* Jewel Case Asset Image */}
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />

        {/* Dynamic Glass Specular Sheen (mimics real acrylic CD case) */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`,
          }}
        />

        {/* Clear Plastic Corner Highlight Border */}
        <div className="absolute inset-0 rounded-[6px] border border-white/40 pointer-events-none group-hover:border-white/70 transition-colors duration-300" />

        {/* Sleek Floating Badge on Hover / Focus */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 inset-x-2 pointer-events-none bg-black/75 backdrop-blur-md rounded-md py-1 px-1.5 text-center text-white"
        >
          <p className="text-[11.5px] font-medium leading-tight truncate">
            {item.title}
          </p>
          <p className="text-[9.5px] text-white/70 font-normal leading-tight">
            {item.type}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function RecentMoviesGrid() {
  const containerRef = useRef(null);

  // Continuous subtle scroll parallax linked to container scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax offsets for columns: alternate columns slide at subtly different speeds for 3D depth
  const colYOffset0 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const colYOffset1 = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const colYOffset2 = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const colYOffset3 = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const colYOffset4 = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const getColParallax = (colIdx) => {
    switch (colIdx % 5) {
      case 0: return colYOffset0;
      case 1: return colYOffset1;
      case 2: return colYOffset2;
      case 3: return colYOffset3;
      case 4: return colYOffset4;
      default: return colYOffset0;
    }
  };

  return (
    <section ref={containerRef} className="w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 sm:mb-10 flex items-center justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[12px] sm:text-[13px] tracking-[0.14em] uppercase font-semibold text-[#8e95a5] select-none">
            Recent Movies and Shows
          </span>
        </div>
      </motion.div>

      {/* 5-Column Grid matching reference image layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-7">
        {MOVIES_AND_SHOWS.map((item, idx) => (
          <JewelCaseCard
            key={item.id}
            item={item}
            index={idx}
            parallaxY={getColParallax(idx % 5)}
          />
        ))}
      </div>
    </section>
  );
}
