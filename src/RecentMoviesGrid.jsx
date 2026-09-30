import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// Movie Posters from Desktop Movies Folder
import moviePremalu from './assets/movies/movie_01_premalu.jpg';
import movieJohnWick from './assets/movies/movie_02_john_wick.jpg';
import movieEega from './assets/movies/movie_03_eega.jpg';
import movieBlackPanther from './assets/movies/movie_04_black_panther.jpg';
import movieCivilWar from './assets/movies/movie_05_civil_war.jpg';
import movieRangasthalam from './assets/movies/movie_06_rangasthalam.jpg';
import movieF1 from './assets/movies/movie_07_f1.jpg';
import movieSalaar from './assets/movies/movie_08_salaar.jpg';
import movieOohalu from './assets/movies/movie_09_oohalu_gusagusalade.jpg';
import movieBaahubali from './assets/movies/movie_10_baahubali.jpg';

const MOVIES_AND_SHOWS = [
  { id: 'premalu', title: 'Premalu', type: 'Movie', year: '2024', cover: moviePremalu, colIndex: 0 },
  { id: 'john-wick', title: 'John Wick', type: 'Movie', year: '2014', cover: movieJohnWick, colIndex: 1 },
  { id: 'eega', title: 'Eega', type: 'Movie', year: '2012', cover: movieEega, colIndex: 2 },
  { id: 'black-panther', title: 'Black Panther', type: 'Movie', year: '2018', cover: movieBlackPanther, colIndex: 3 },
  { id: 'civil-war', title: 'Captain America: Civil War', type: 'Movie', year: '2016', cover: movieCivilWar, colIndex: 4 },
  
  { id: 'rangasthalam', title: 'Rangasthalam', type: 'Movie', year: '2018', cover: movieRangasthalam, colIndex: 0 },
  { id: 'f1', title: 'F1', type: 'Movie', year: '2025', cover: movieF1, colIndex: 1 },
  { id: 'salaar', title: 'Salaar: Part 1 – Ceasefire', type: 'Movie', year: '2023', cover: movieSalaar, colIndex: 2 },
  { id: 'oohalu-gusagusalade', title: 'Oohalu Gusagusalade', type: 'Movie', year: '2014', cover: movieOohalu, colIndex: 3 },
  { id: 'baahubali', title: 'Baahubali: The Beginning', type: 'Movie', year: '2015', cover: movieBaahubali, colIndex: 4 },
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
        className="relative w-full aspect-[1/1.03] rounded-[8px] overflow-hidden bg-[#e2e6eb] dark:bg-[#15171a] border border-black/15 shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.6)] group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 select-none"
      >
        {/* Left Spine with Dual Acrylic Hinges */}
        <div className="absolute left-0 top-0 bottom-0 w-[8px] bg-gradient-to-r from-white/50 via-white/20 to-black/15 border-r border-black/20 flex flex-col justify-between py-2 items-center z-10 pointer-events-none">
          <div className="w-[3px] h-[10px] bg-white/60 rounded-full shadow-xs" />
          <div className="w-[3px] h-[10px] bg-white/60 rounded-full shadow-xs" />
        </div>

        {/* Right Thumb Grip Notch */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px] bg-black/20 rounded-l-full z-10 pointer-events-none" />

        {/* Dark Inner Tray */}
        <div className="absolute inset-y-[3px] right-[4px] left-[9px] rounded-[5px] bg-[#1a1d22] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
          {/* Circular CD Disc */}
          <div className="relative w-[92%] h-[92%] rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-black/60 flex items-center justify-center">
            {/* Movie Poster on Disc Face */}
            <img
              src={item.cover}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Circular Optical Sheen Overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, transparent 28%, rgba(255,255,255,0.14) 42%, transparent 58%, rgba(255,255,255,0.08) 82%)',
              }}
            />

            {/* Clear Inner Hub Ring */}
            <div className="absolute inset-0 m-auto w-[34%] h-[34%] rounded-full bg-black/45 backdrop-blur-[2px] border border-white/20 shadow-inner flex items-center justify-center">
              {/* Center Spindle with Radial Spokes */}
              <svg
                viewBox="0 0 100 100"
                className="w-[64%] h-[64%] text-[#101214] select-none pointer-events-none drop-shadow-sm"
              >
                <circle cx="50" cy="50" r="48" fill="#14171a" stroke="#000" strokeWidth="2" />
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
                  (deg) => (
                    <rect
                      key={deg}
                      x="48"
                      y="10"
                      width="4"
                      height="14"
                      rx="1"
                      fill="#252a32"
                      transform={`rotate(${deg} 50 50)`}
                    />
                  )
                )}
                <circle cx="50" cy="50" r="20" fill="#121417" stroke="#000" strokeWidth="2" />
                <circle cx="50" cy="50" r="14" fill="#0d0e10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Glass Specular Reflection on Acrylic Lid */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[8px] z-20"
          style={{
            background:
              'linear-gradient(130deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 38%, transparent 55%, rgba(255,255,255,0.12) 100%)',
          }}
        />

        {/* Dynamic Interactive Mouse Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`,
          }}
        />

        {/* Clear Acrylic Outer Highlight Border */}
        <div className="absolute inset-0 rounded-[8px] border border-white/40 pointer-events-none group-hover:border-white/70 transition-colors duration-300 z-20" />

        {/* Sleek Floating Badge on Hover / Focus */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 inset-x-2 pointer-events-none bg-black/80 backdrop-blur-md rounded-md py-1 px-1.5 text-center text-white z-30"
        >
          <p className="text-[11.5px] font-medium leading-tight truncate">
            {item.title}
          </p>
          <p className="text-[9.5px] text-white/70 font-normal leading-tight">
            {item.type} • {item.year}
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
