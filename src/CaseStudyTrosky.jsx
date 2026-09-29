import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CaseStudyScrollNav from './CaseStudyScrollNav';
import CaseStudyScrollProgress from './CaseStudyScrollProgress';
import ScrollReveal from './ScrollReveal';
import ThankYouEnvelope from './ThankYouEnvelope';

// Background assets
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.png';
import troskyMockupBg from './assets/trosky/trosky_mockup_bg.jpg';

// Authentic Hand-drawn Paper Wireframe Sketches
import sketchNotebookImg from './assets/trosky/sections/trosky_sketch_notebook.jpg';

// The 12 Main HD iPhone Mockups
import m01DailyHome from './assets/trosky/01-daily-home.png';
import m02DrillIntro from './assets/trosky/02-drill-introduction.png';
import m03Instructional from './assets/trosky/03-instructional-content.png';
import m04MarkWatched from './assets/trosky/04-mark-as-watched.png';
import m05WrittenPrompt from './assets/trosky/05-written-response-prompt.png';
import m06SubmittedResponse from './assets/trosky/06-submitted-response.png';
import m07CoachingFeedback from './assets/trosky/07-coaching-feedback.png';
import m08XpReward from './assets/trosky/08-drill-xp-reward.png';
import m09ThrowingVideo from './assets/trosky/09-throwing-video.png';
import m10SelectedAnswer from './assets/trosky/10-selected-answer.png';
import m11CharacterReflection from './assets/trosky/11-character-reflection.png';
import m12SessionComplete from './assets/trosky/12-session-complete.png';

// Section navigation for floating scroll spy
const TROSKY_SECTIONS = [
  { id: 'section-context', label: 'Context' },
  { id: 'section-challenge', label: 'Challenge' },
  { id: 'section-player', label: 'The Player' },
  { id: 'section-loop', label: 'The Loop' },
  { id: 'section-structure', label: 'Structure' },
  { id: 'section-design', label: 'Design' },
  { id: 'section-details', label: 'Details' },
  { id: 'section-outcomes', label: 'Outcomes' },
  { id: 'section-reflection', label: 'Reflection' },
];

// Master Hero 3-Phone Presentation Frame (Apple Minimal Style)
function HeroShowcaseFrame({ onImageClick }) {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const yCenter = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [-6, 8]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-8, 10]);

  return (
    <div 
      ref={frameRef}
      className="w-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 md:p-12 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${troskyMockupBg})` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 items-end justify-items-center max-w-4xl mx-auto py-2 sm:py-6">
        {/* Left: Home Dashboard */}
        <motion.div 
          style={{ y: yLeft }}
          className="w-full max-w-[230px] sm:max-w-[240px] flex flex-col items-center cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => onImageClick && onImageClick({
            src: m01DailyHome,
            alt: "Trosky 365 Daily Home Screen",
            caption: "Home: One daily assignment, streak counter, and frictionless start."
          })}
        >
          <img 
            src={m01DailyHome} 
            alt="Trosky 365 Daily Home Screen" 
            className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]" 
            loading="eager"
          />
          <p className="mt-3 text-center text-[12px] font-basier text-slate-700/80 font-normal">
            Daily Routine Home
          </p>
        </motion.div>

        {/* Center: Active Drill Instructions (Elevated Hero Anchor) */}
        <motion.div 
          style={{ y: yCenter }}
          className="w-full max-w-[250px] sm:max-w-[275px] flex flex-col items-center cursor-pointer transition-transform duration-500 hover:scale-[1.02] sm:-translate-y-3 z-10"
          onClick={() => onImageClick && onImageClick({
            src: m03Instructional,
            alt: "Trosky 365 Drill Instructional Content Screen",
            caption: "Practice: Structured reps, video breakdown, and clear mechanical focus."
          })}
        >
          <img 
            src={m03Instructional} 
            alt="Trosky 365 Drill Instructional Content Screen" 
            className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)]" 
            loading="eager"
          />
          <p className="mt-3 text-center text-[12px] font-basier text-slate-800 font-medium">
            Active Drill Breakdown
          </p>
        </motion.div>

        {/* Right: Session Complete Win */}
        <motion.div 
          style={{ y: yRight }}
          className="w-full max-w-[230px] sm:max-w-[240px] flex flex-col items-center cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
          onClick={() => onImageClick && onImageClick({
            src: m12SessionComplete,
            alt: "Trosky 365 Session Complete Screen",
            caption: "Closure: +50 XP reward, celebration, and streak continuation."
          })}
        >
          <img 
            src={m12SessionComplete} 
            alt="Trosky 365 Session Complete Screen" 
            className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]" 
            loading="eager"
          />
          <p className="mt-3 text-center text-[12px] font-basier text-slate-700/80 font-normal">
            Session Win & Streak
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Clean Single Mockup Frame on Cyan/Blue Texture Background (Apple Minimal)
function MockupFrame({ src, alt, caption, onImageClick }) {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div 
        ref={frameRef}
        className="w-full rounded-[16px] sm:rounded-[22px] p-3 sm:p-6 md:p-8 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${troskyMockupBg})` }}
      >
        <motion.div style={{ y: innerY }}>
          <div 
            onClick={() => onImageClick && onImageClick({ src, alt, caption })}
            className="rounded-[10px] sm:rounded-[16px] overflow-hidden shadow-xl border border-black/10 bg-white cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01]"
            role="button"
            tabIndex={0}
            aria-label={`View image: ${alt}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onImageClick && onImageClick({ src, alt, caption });
              }
            }}
          >
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-cover block" 
              loading="lazy"
            />
          </div>
        </motion.div>
        {caption && (
          <p className="mt-3 text-center text-[12px] sm:text-[13px] font-basier text-slate-700/80 font-normal">
            {caption}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

// Clean Side-by-side Dual Phone Mockup Frame on Cyan/Blue Texture Background
function DualMockupFrame({ src1, alt1, caption1, src2, alt2, caption2, onImageClick }) {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY1 = useTransform(scrollYProgress, [0, 1], [-14, 10]);
  const innerY2 = useTransform(scrollYProgress, [0, 1], [-6, 14]);

  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div 
        ref={frameRef}
        className="w-full rounded-[16px] sm:rounded-[22px] p-4 sm:p-8 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${troskyMockupBg})` }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center justify-items-center">
          <motion.div style={{ y: innerY1 }} className="w-full flex flex-col items-center justify-center">
            <div 
              onClick={() => onImageClick && onImageClick({ src: src1, alt: alt1, caption: caption1 })}
              role="button"
              tabIndex={0}
              aria-label={`View image: ${alt1}`}
              className="max-w-[260px] sm:max-w-[290px] w-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick && onImageClick({ src: src1, alt: alt1, caption: caption1 });
                }
              }}
            >
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto" 
                loading="lazy" 
              />
            </div>
            {caption1 && (
              <p className="mt-2.5 text-center text-[12px] font-basier text-slate-700/80 font-normal">
                {caption1}
              </p>
            )}
          </motion.div>

          <motion.div style={{ y: innerY2 }} className="w-full flex flex-col items-center justify-center">
            <div 
              onClick={() => onImageClick && onImageClick({ src: src2, alt: alt2, caption: caption2 })}
              role="button"
              tabIndex={0}
              aria-label={`View image: ${alt2}`}
              className="max-w-[260px] sm:max-w-[290px] w-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick && onImageClick({ src: src2, alt: alt2, caption: caption2 });
                }
              }}
            >
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto" 
                loading="lazy" 
              />
            </div>
            {caption2 && (
              <p className="mt-2.5 text-center text-[12px] font-basier text-slate-700/80 font-normal">
                {caption2}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// Clean 3-Phone Progression Frame on Cyan/Blue Texture Background (Apple Minimal)
function TrioMockupFrame({ 
  src1, alt1, caption1, 
  src2, alt2, caption2, 
  src3, alt3, caption3, 
  onImageClick 
}) {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY1 = useTransform(scrollYProgress, [0, 1], [-12, 10]);
  const innerY2 = useTransform(scrollYProgress, [0, 1], [-6, 14]);
  const innerY3 = useTransform(scrollYProgress, [0, 1], [-14, 8]);

  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div 
        ref={frameRef}
        className="w-full rounded-[16px] sm:rounded-[22px] p-4 sm:p-6 md:p-8 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${troskyMockupBg})` }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 items-start justify-items-center">
          {/* Phone 1 */}
          <motion.div style={{ y: innerY1 }} className="w-full flex flex-col items-center justify-center">
            <div 
              onClick={() => onImageClick && onImageClick({ src: src1, alt: alt1, caption: caption1 })}
              role="button"
              tabIndex={0}
              aria-label={`View image: ${alt1}`}
              className="max-w-[240px] sm:max-w-[260px] w-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick && onImageClick({ src: src1, alt: alt1, caption: caption1 });
                }
              }}
            >
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto" 
                loading="lazy" 
              />
            </div>
            {caption1 && (
              <p className="mt-2.5 text-center text-[12px] font-basier text-slate-700/80 font-normal">
                {caption1}
              </p>
            )}
          </motion.div>

          {/* Phone 2 */}
          <motion.div style={{ y: innerY2 }} className="w-full flex flex-col items-center justify-center">
            <div 
              onClick={() => onImageClick && onImageClick({ src: src2, alt: alt2, caption: caption2 })}
              role="button"
              tabIndex={0}
              aria-label={`View image: ${alt2}`}
              className="max-w-[240px] sm:max-w-[260px] w-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick && onImageClick({ src: src2, alt: alt2, caption: caption2 });
                }
              }}
            >
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto" 
                loading="lazy" 
              />
            </div>
            {caption2 && (
              <p className="mt-2.5 text-center text-[12px] font-basier text-slate-700/80 font-normal">
                {caption2}
              </p>
            )}
          </motion.div>

          {/* Phone 3 */}
          <motion.div style={{ y: innerY3 }} className="w-full flex flex-col items-center justify-center">
            <div 
              onClick={() => onImageClick && onImageClick({ src: src3, alt: alt3, caption: caption3 })}
              role="button"
              tabIndex={0}
              aria-label={`View image: ${alt3}`}
              className="max-w-[240px] sm:max-w-[260px] w-full cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick && onImageClick({ src: src3, alt: alt3, caption: caption3 });
                }
              }}
            >
              <img 
                src={src3} 
                alt={alt3} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto" 
                loading="lazy" 
              />
            </div>
            {caption3 && (
              <p className="mt-2.5 text-center text-[12px] font-basier text-slate-700/80 font-normal">
                {caption3}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// Minimal Clean Lightbox Modal
function ImageLightboxModal({ activeImage, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (activeImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, onClose]);

  if (!activeImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md cursor-zoom-out select-none"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center justify-center cursor-default bg-transparent"
        >
          <button
            onClick={onClose}
            className="absolute -top-11 right-0 p-2 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center max-h-[82vh] overflow-y-auto">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full h-auto object-contain max-h-[80vh] drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            />
          </div>

          {activeImage.caption && (
            <p className="mt-3 text-center text-white/80 text-[13px] font-basier px-4 max-w-xl">
              {activeImage.caption}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CaseStudyTrosky({ onBack, isRevealed = true }) {
  const [activeModalImage, setActiveModalImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.05]);

  const handleOpenModal = ({ src, alt, caption }) => {
    setActiveModalImage({ src, alt, caption });
  };

  const handleCloseModal = () => {
    setActiveModalImage(null);
  };

  return (
    <div className="relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-switzer font-normal antialiased selection:bg-gray-100 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
      {/* Top Sticky Reading Progress Bar & Floating Back-To-Top Button */}
      <CaseStudyScrollProgress />

      {/* Floating Right-Side Section Indicator & Smooth Nav */}
      <CaseStudyScrollNav sections={TROSKY_SECTIONS} />

      {/* Lightbox inspection modal */}
      <ImageLightboxModal activeImage={activeModalImage} onClose={handleCloseModal} />

      {/* Subtle top ambient background that moves gently on scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[720px] sm:h-[840px] pointer-events-none will-change-transform"
        style={{
          y: bgY,
          scale: bgScale,
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 40%, #ffffff 100%), url(${heroGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER SHELL                                              */}
      {/* ------------------------------------------------------------- */}
      <header className="max-w-[760px] mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-6 sm:pb-8">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between pb-6 sm:pb-8 border-b border-gray-100"
        >
          <button
            onClick={onBack}
            className="min-h-11 inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-basier font-medium text-[#6b7280] hover:text-[#111827] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Selected Works</span>
          </button>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 32 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-[34px] sm:text-[46px] md:text-[56px] font-seasons font-normal text-[#111827] leading-[1.12] sm:leading-[1.08] tracking-[-0.02em] pt-6 sm:pt-8"
        >
          A coach in your pocket.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[19px] md:text-[21px] text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal"
        >
          Turning the Trosky 365 home screen into a daily voice and practice ritual that helps baseball players make consistent progress between coaching sessions.
        </motion.p>

        {/* Meta Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 pb-5 sm:pt-8 sm:pb-6 mt-6 border-t border-b border-gray-100"
        >
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">My Role</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">Product Designer</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Timeline</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">6 weeks</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platform</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">iOS (iPhone)</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Partners</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">Nate Trosky & Coach Matt</div>
          </div>
        </motion.div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* HERO SHOWCASE MOCKUP                                          */}
      {/* ------------------------------------------------------------- */}
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1040px] mx-auto px-3 sm:px-6"
      >
        <HeroShowcaseFrame onImageClick={handleOpenModal} />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN EDITORIAL COLUMN                                         */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* 1. CONTEXT                                                    */}
        {/* ------------------------------------------------------------- */}
        <section id="section-context" className="space-y-4 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[26px] sm:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Practice happens between coaching sessions.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="text-[16px] text-[#374151] leading-[1.8] space-y-4 font-switzer font-normal">
              <p>
                Most baseball players don’t struggle because they lack desire or talent. They struggle because ninety percent of their practice happens when their coach isn’t standing right next to them.
              </p>
              <p>
                Trosky Baseball has built one of the country's most respected infield programs, known for mastering elite glovework and what Coach Trosky calls the 6th Tool—mental composure, breath control, and self-belief. But when players stepped off the field and opened the app, that inspiring coaching presence disappeared into an uncurated library of static video files.
              </p>
              <p>
                Players faced dozens of drills with no clear sequence, no guidance on what they should be feeling, and no way to know whether they were actually improving. Working directly with Coach Nate Trosky and Coach Matt, my goal was to take that catalog and build a simple, focused daily routine that feels like a conversation with your coach.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 2. THE CHALLENGE                                              */}
        {/* ------------------------------------------------------------- */}
        <section id="section-challenge" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              A list tells you what to do. A coach helps you understand why.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              Traditional training apps treat athletes like passive consumers: watch a video, check a box, move on. But physical development requires real mental intent. When young players train alone, three friction points consistently show up:
            </p>
          </ScrollReveal>

          {/* Clean Problem Breakdown Table (Apple Style) */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
                <div className="col-span-1">Question</div>
                <div className="col-span-2">What Happens in Practice</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">Where do I start?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed">
                    With forty video options, players freeze. They default to easy drills they already know instead of working on their weaknesses.
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">What should I notice?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed">
                    Watching a coach demonstrate footwork is easy. Feeling it in your own hips and fingers is difficult without clear focal cues.
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">Did I make progress?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed">
                    Without an immediate post-drill reflection and feedback loop, solo practice feels invisible, and the habit quietly dies within a week.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <blockquote className="border-l-2 border-gray-300 pl-4 sm:pl-6 my-2 text-[17px] sm:text-[19px] font-seasons italic text-[#111827] leading-snug">
              “How might we design a 10-minute daily routine that feels like a conversation with a mentor, rather than a playlist from an app?”
            </blockquote>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 3. THE PLAYER                                                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-player" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Designing for the moment between “show me” and “I get it.”
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal space-y-4">
              <p>
                We grounded every decision around Alex, a thirteen-year-old travel ball infielder trying to make his high school varsity roster.
              </p>
              <p>
                Alex practices with his team two days a week. The other five days, he trains on his own in his garage, backyard, or against a brick school wall. Like most teenagers, his attention on a phone is fragile. If an app makes him read through dense menus with baseball gloves on, he closes it.
              </p>
              <p>
                Our response was straightforward: keep every instructional video under ninety seconds, give the primary buttons massive touch targets he can tap with sweaty thumbs, and require an active recall check before he begins his physical reps.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 4. THE LOOP                                                   */}
        {/* ------------------------------------------------------------- */}
        <section id="section-loop" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              A small loop, designed to build momentum.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              Instead of browsing an endless catalog, the app presents a five-step continuous loop. Each step has one clear purpose:
            </p>
          </ScrollReveal>

          {/* Minimal 5-Step Process List */}
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 bg-white shadow-sm overflow-hidden text-[14px] font-switzer font-normal">
            {[
              {
                step: "01",
                title: "Start",
                desc: "One recommended routine on the home screen. Duration and target skills upfront—no browsing needed.",
              },
              {
                step: "02",
                title: "Watch",
                desc: "A sixty-second drill clip with Coach Trosky’s audio commentary and key visual freeze-frames.",
              },
              {
                step: "03",
                title: "Respond",
                desc: "An active recall prompt where the player explains the focal cue in their own words or records a quick voice note.",
              },
              {
                step: "04",
                title: "Reflect",
                desc: "A ten-second self-check on effort and mental discipline (the 6th Tool) before logging reps.",
              },
              {
                step: "05",
                title: "Continue",
                desc: "Immediate positive feedback (+50 XP, consecutive training count) and a clean path to tomorrow's focus.",
              },
            ].map((item) => (
              <div key={item.step} className="p-3.5 sm:p-4 flex items-start gap-4">
                <span className="font-basier font-medium text-gray-400 text-[13px] pt-0.5 shrink-0">
                  {item.step}
                </span>
                <div className="flex-1">
                  <span className="font-basier font-medium text-gray-900 block mb-0.5">
                    {item.title}
                  </span>
                  <span className="text-gray-600 leading-relaxed block">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <p className="text-[14px] sm:text-[15px] text-gray-500 leading-relaxed font-switzer font-normal pt-1">
              Viewing is passive. Practice is physical. Reflection is where skill converts into muscle memory. The experience was engineered so players put the phone down, do the work on the dirt, and return for a quick ten-second closure.
            </p>
          </ScrollReveal>

          {/* Dual Mockup: Home Launch to Drill Introduction */}
          <DualMockupFrame
            src1={m01DailyHome}
            alt1="Trosky 365 Daily Home Screen"
            caption1="Home Screen: Daily assignment front and center with active streak tracker."
            src2={m02DrillIntro}
            alt2="Trosky 365 Drill Introduction Screen"
            caption2="Drill Start: Clear 3-step progress bar, focus cue, and instant launch."
            onImageClick={handleOpenModal}
          />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 5. STRUCTURE & WIREFRAMING                                    */}
        {/* ------------------------------------------------------------- */}
        <section id="section-structure" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Work through the flow. Leave room to change it.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal space-y-4">
              <p>
                I started by mapping the flow on paper in a spiral notebook, tracing the player’s physical and mental steps. Early iterations explored dashboards and competitive leaderboards, but testing with youth athletes quickly showed that public leaderboards created anxiety instead of healthy habits.
              </p>
              <p>
                We stripped away all global navigation tabs during active workouts. When a player begins a routine, the app becomes a dedicated fullscreen modal with zero exits except an explicit “Save & Pause.”
              </p>
            </div>
          </ScrollReveal>

          {/* Authentic Wireframe Sketchbook Mockup */}
          <MockupFrame
            src={sketchNotebookImg}
            alt="Hand-drawn wireframe sketches in spiral notebook"
            caption="Paper sketches exploring the linear flow from prompt to reflection."
            onImageClick={handleOpenModal}
          />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 6. THE DESIGN                                                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-design" className="space-y-10 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Familiar steps. A more personal rhythm.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-3">
              The high-fidelity design organizes the routine into three natural moments: Orient & Learn, Respond & Understand, and Practice & Reflect.
            </p>
          </ScrollReveal>

          {/* Sub-flow 1: Physical Development & Video Instruction */}
          <div className="space-y-4">
            <ScrollReveal delay={0.06}>
              <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
                1. Orient & Physical Reps
              </h3>
              <p className="text-[14px] sm:text-[15px] text-gray-600 font-switzer font-normal mt-1 leading-relaxed">
                Clear expectations eliminate hesitation. Every drill displays its upfront mechanical focal point, structured bat speed reps, and concise 60-second video demonstrations with full follow-through analysis.
              </p>
            </ScrollReveal>

            {/* 3-Phone Trio: Instructional -> Watched -> Throwing Field Video */}
            <TrioMockupFrame
              src1={m03Instructional}
              alt1="Trosky 365 Swing Mechanics Drill Instruction"
              caption1="Drill Guide: 5 reps tee work, 3 sets front toss, and weighted swings."
              src2={m04MarkWatched}
              alt2="Trosky 365 Mark as Watched Drill State"
              caption2="Completion: Large, thumb-friendly 'Mark as Watched' button."
              src3={m09ThrowingVideo}
              alt3="Trosky 365 Throwing Mechanics Field Video"
              caption3="Field Analysis: Demonstrating full arm follow-through to protect the shoulder."
              onImageClick={handleOpenModal}
            />
          </div>

          {/* Sub-flow 2: Respond & Understand (Active Recall & Direct Feedback) */}
          <div className="space-y-4 pt-4">
            <ScrollReveal delay={0.06}>
              <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
                2. Respond & Understand
              </h3>
              <p className="text-[14px] sm:text-[15px] text-gray-600 font-switzer font-normal mt-1 leading-relaxed">
                Shifting from passive watching to active recall. The athlete articulates the mechanical cue in their own words, receiving immediate confirmation and feedback from Coach Nate Trosky.
              </p>
            </ScrollReveal>

            {/* Dual Frame 1: Written Prompt & Submitted Answer */}
            <DualMockupFrame
              src1={m05WrittenPrompt}
              alt1="Trosky 365 Written Response Prompt"
              caption1="Active Recall: Prompting the player to explain front shoulder power generation."
              src2={m06SubmittedResponse}
              alt2="Trosky 365 Submitted Player Response"
              caption2="Player Answer: Describing torque between hips and shoulders in their own words."
              onImageClick={handleOpenModal}
            />

            {/* Dual Frame 2: Coach Feedback & XP Reward */}
            <DualMockupFrame
              src1={m07CoachingFeedback}
              alt1="Trosky 365 Coach Nate Feedback"
              caption1="Coach Nate Feedback: 'Spot on! That tension snaps open like a rubber band.'"
              src2={m08XpReward}
              alt2="Trosky 365 +50 XP Reward Screen"
              caption2="Instant Feedback: +50 XP reward screen confirming drill completion."
              onImageClick={handleOpenModal}
            />
          </div>

          {/* Sub-flow 3: Practice & Reflect (The 6th Tool) */}
          <div className="space-y-4 pt-4">
            <ScrollReveal delay={0.06}>
              <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
                3. The 6th Tool & Daily Win
              </h3>
              <p className="text-[14px] sm:text-[15px] text-gray-600 font-switzer font-normal mt-1 leading-relaxed">
                Coach Nate Trosky’s signature philosophy is the 6th Tool—the mental composure and discipline that separates good players from great ones. Athletes test situational IQ, complete the Character Launch Checklist, and log their daily win.
              </p>
            </ScrollReveal>

            {/* 3-Phone Trio: Situational IQ -> Character Checklist -> Session Complete */}
            <TrioMockupFrame
              src1={m10SelectedAnswer}
              alt1="Trosky 365 Situational Baseball IQ Quiz"
              caption1="Baseball IQ: Testing mechanics and situational decision making."
              src2={m11CharacterReflection}
              alt2="Trosky 365 Character Launch Checklist"
              caption2="6th Tool Reflection: Humility, Responsibility, Balance, and Readiness."
              src3={m12SessionComplete}
              alt3="Trosky 365 Session Complete Screen"
              caption3="Daily Win: +50 XP earned, 3/3 drills completed, streak alive."
              onImageClick={handleOpenModal}
            />
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 7. THOUGHTFUL DETAILS                                         */}
        {/* ------------------------------------------------------------- */}
        <section id="section-details" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Clarity is more than visual polish.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              When an app is used in dusty garages, sunny fields, and batting cages, traditional design assumptions break down. Four practical details guided our decisions:
            </p>
          </ScrollReveal>

          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 bg-white shadow-sm overflow-hidden text-[14px] font-switzer font-normal">
            {[
              {
                title: "One task per screen",
                desc: "Drills naturally vary in depth, but screen complexity stays minimal so athletes never feel overwhelmed.",
              },
              {
                title: "Large thumb touch targets",
                desc: "Primary buttons are anchored to the bottom sheet with minimum 52px heights, making them easy to hit with sweaty thumbs or batting gloves.",
              },
              {
                title: "Offline caching",
                desc: "Many batting cages and rural ballparks lack Wi-Fi. The daily routine automatically pre-caches every morning so it opens instantly offline.",
              },
              {
                title: "Direct coach tone",
                desc: "Microcopy replaces generic corporate app copy with Coach Trosky's actual language: 'Lock in', 'Feel the bounce', and 'Stay in the tunnel'.",
              },
            ].map((detail) => (
              <div key={detail.title} className="p-3.5 sm:p-4">
                <span className="font-basier font-medium text-gray-900 block mb-0.5">
                  {detail.title}
                </span>
                <span className="text-gray-600 leading-relaxed block">
                  {detail.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 8. OUTCOMES & VALIDATION                                     */}
        {/* ------------------------------------------------------------- */}
        <section id="section-outcomes" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              A stronger learning loop.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              Beta testing with forty-two youth and high school players over a thirty-day trial showed clear improvements in training engagement compared to the previous static catalog:
            </p>
          </ScrollReveal>

          {/* Clean Metric Cards (Apple Style: Minimal Gray) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <ScrollReveal delay={0.08}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                <div className="text-[36px] sm:text-[44px] font-seasons font-normal text-gray-900 leading-none">
                  ~25%
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Higher Completion Rate
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Players finished full routines rather than dropping off mid-drill.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                <div className="text-[36px] sm:text-[44px] font-seasons font-normal text-gray-900 leading-none">
                  3.4x
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Active Reflections
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Written and voice takeaways logged per completed workout.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/80 text-center">
                <div className="text-[36px] sm:text-[44px] font-seasons font-normal text-gray-900 leading-none">
                  88%
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Player Confidence
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Reported understanding *why* they performed each drill.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 9. REFLECTION & TAKEAWAYS                                    */}
        {/* ------------------------------------------------------------- */}
        <section id="section-reflection" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The real design work is in what happens between the screens.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              <p>
                Working on Trosky 365 taught me that designing for physical athletes is fundamentally different from designing desktop software. In most consumer apps, success is measured by time spent looking at the screen. In sports, success is getting the athlete off their phone and into their body.
              </p>
              <p>
                The breakthrough didn’t come from adding social feeds or complex leaderboard algorithms. It came from stripping away distraction, honoring Coach Trosky’s authentic voice, and building a humble five-step loop that respects the athlete's time.
              </p>
              <p>
                When software gets out of the way and provides just enough structure to build confidence, young athletes don’t just become better baseball players—they learn how to teach themselves.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* CREDITS & FOOTER                                              */}
        {/* ------------------------------------------------------------- */}
        <ScrollReveal className="pt-2 sm:pt-4 pb-8 space-y-4">
          <ThankYouEnvelope />

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="min-h-11 inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-basier font-medium text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Selected Works</span>
            </button>

            <span className="text-[12px] sm:text-[13px] text-gray-400 font-switzer font-normal">
              Portfolio · 2026
            </span>
          </div>
        </ScrollReveal>

      </main>

    </div>
  );
}


