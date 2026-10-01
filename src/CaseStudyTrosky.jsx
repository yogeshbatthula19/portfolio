import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Target, ShieldCheck, Activity, Users, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-context', label: 'Context' },
  { id: 'section-challenge', label: 'The Challenge' },
  { id: 'section-player', label: 'The Player' },
  { id: 'section-loop', label: 'The Routine Loop' },
  { id: 'section-structure', label: 'Structure & Flow' },
  { id: 'section-design', label: 'Visual Interface' },
  { id: 'section-details', label: 'Ergonomic Details' },
  { id: 'section-outcomes', label: 'Outcomes & Metrics' },
  { id: 'section-reflection', label: 'Retrospective' },
];

// Master Hero 3-Phone Presentation Frame (Apple Minimal Style - Non Clickable)
function HeroShowcaseFrame() {
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
      className="w-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 md:p-12 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${troskyMockupBg})` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 items-end justify-items-center max-w-4xl mx-auto py-2 sm:py-6">
        {/* Left: Home Dashboard */}
        <motion.div 
          style={{ y: yLeft }}
          className="w-full max-w-[230px] sm:max-w-[240px] flex flex-col items-center pointer-events-none select-none"
        >
          <img 
            src={m01DailyHome} 
            alt="Trosky 365 Daily Home Screen" 
            className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] pointer-events-none select-none" 
            loading="eager"
            decoding="async"
          />
          <p className="cs-caption mt-3 text-center text-[12px] font-basier text-gray-700 font-normal">
            Daily Routine Home
          </p>
        </motion.div>

        {/* Center: Active Drill Instructions (Elevated Hero Anchor) */}
        <motion.div 
          style={{ y: yCenter }}
          className="w-full max-w-[250px] sm:max-w-[275px] flex flex-col items-center sm:-translate-y-3 z-10 pointer-events-none select-none"
        >
          <img 
            src={m03Instructional} 
            alt="Trosky 365 Drill Instructional Content Screen" 
            className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)] pointer-events-none select-none" 
            loading="eager"
            decoding="async"
          />
          <p className="cs-caption mt-3 text-center text-[12px] font-basier text-gray-900 font-medium">
            Active Drill Breakdown
          </p>
        </motion.div>

        {/* Right: Session Complete Win */}
        <motion.div 
          style={{ y: yRight }}
          className="w-full max-w-[230px] sm:max-w-[240px] flex flex-col items-center pointer-events-none select-none"
        >
          <img 
            src={m12SessionComplete} 
            alt="Trosky 365 Session Complete Screen" 
            className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] pointer-events-none select-none" 
            loading="eager"
            decoding="async"
          />
          <p className="cs-caption mt-3 text-center text-[12px] font-basier text-gray-700 font-normal">
            Session Win & Streak
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Clean Single Mockup Frame with Scroll Parallax (Non-clickable)
function MockupFrame({ src, alt, caption }) {
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
        className="w-full rounded-[16px] sm:rounded-[22px] p-3 sm:p-6 md:p-8 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${troskyMockupBg})` }}
      >
        <motion.div style={{ y: innerY }}>
          <div className="rounded-[10px] sm:rounded-[16px] overflow-hidden shadow-xl border border-black/10 bg-white">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-cover block pointer-events-none select-none" 
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
        {caption && (
          <p className="cs-caption mt-3 text-center text-[12px] sm:text-[13px] font-basier text-gray-700 font-normal">
            {caption}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

// Clean Side-by-side Dual Phone Mockup Frame (Non-clickable)
function DualMockupFrame({ src1, alt1, caption1, src2, alt2, caption2 }) {
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
        className="w-full rounded-[16px] sm:rounded-[22px] p-4 sm:p-8 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${troskyMockupBg})` }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center justify-items-center">
          <motion.div style={{ y: innerY1 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[260px] sm:max-w-[290px] w-full">
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption1 && (
              <p className="cs-caption mt-2.5 text-center text-[12px] font-basier text-gray-700 font-normal">
                {caption1}
              </p>
            )}
          </motion.div>

          <motion.div style={{ y: innerY2 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[260px] sm:max-w-[290px] w-full">
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption2 && (
              <p className="cs-caption mt-2.5 text-center text-[12px] font-basier text-gray-700 font-normal">
                {caption2}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// Clean 3-Phone Progression Frame (Non-clickable)
function TrioMockupFrame({ 
  src1, alt1, caption1, 
  src2, alt2, caption2, 
  src3, alt3, caption3 
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
        className="w-full rounded-[16px] sm:rounded-[22px] p-4 sm:p-6 md:p-8 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${troskyMockupBg})` }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 items-start justify-items-center">
          {/* Phone 1 */}
          <motion.div style={{ y: innerY1 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[240px] sm:max-w-[260px] w-full">
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption1 && (
              <p className="cs-caption mt-2.5 text-center text-[12px] font-basier text-gray-700 font-normal">
                {caption1}
              </p>
            )}
          </motion.div>

          {/* Phone 2 */}
          <motion.div style={{ y: innerY2 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[240px] sm:max-w-[260px] w-full">
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption2 && (
              <p className="cs-caption mt-2.5 text-center text-[12px] font-basier text-gray-700 font-normal">
                {caption2}
              </p>
            )}
          </motion.div>

          {/* Phone 3 */}
          <motion.div style={{ y: innerY3 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[240px] sm:max-w-[260px] w-full">
              <img 
                src={src3} 
                alt={alt3} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption3 && (
              <p className="cs-caption mt-2.5 text-center text-[12px] font-basier text-gray-700 font-normal">
                {caption3}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// Embedded Short, Looping, Silent 60fps Micro-Interaction Video Player
function MicroInteractionVideo({ mp4Src, webmSrc, title, caption }) {
  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div className="w-full rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            <span className="font-mono text-[11px] text-gray-500 ml-2 hidden sm:inline">{title}</span>
          </div>
          <span className="font-mono text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
            60 FPS · Looping Recording
          </span>
        </div>
        <div className="relative bg-black/[0.02]">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-auto block select-none pointer-events-none"
          >
            <source src={mp4Src} type="video/mp4" />
            <source src={webmSrc} type="video/webm" />
          </video>
        </div>
        {caption && (
          <div className="px-4 py-3 bg-white border-t border-gray-100 text-[12.5px] sm:text-[13px] text-gray-600 font-switzer font-normal leading-relaxed">
            <span className="font-basier font-medium text-gray-900 mr-1.5">Micro-interaction:</span>
            {caption}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function CaseStudyTrosky({ onBack, isRevealed = true }) {
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => window.lenis?.resize());
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.05]);

  return (
    <div className="case-study-page relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-switzer font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
      {/* Top Sticky Reading Progress Bar & Floating Back-To-Top Button */}
      <CaseStudyScrollProgress />

      {/* Floating Right-Side Section Indicator & Smooth Nav */}
      <CaseStudyScrollNav sections={TROSKY_SECTIONS} />

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
      <header className="max-w-[820px] mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-6 sm:pb-8">
        
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
          Trosky 365 — A Coach in Your Pocket
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[19px] md:text-[21px] text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal italic"
        >
          Turning the Trosky 365 mobile app into a daily practice ritual and mental composure companion for baseball players between coaching sessions.
        </motion.p>

        {/* Meta Bar / Project Overview - Clean White & Grey Grid */}
        <motion.div 
          id="section-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 pt-6 pb-6 mt-8 border-t border-b border-gray-200 scroll-mt-28"
        >
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Role</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              Product Designer
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Sole Designer</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Team</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              3 Members
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Nate Trosky, Coach Matt, 1 Eng</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Timeline</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              6 Weeks
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Shipped Beta</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platforms</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              iOS (iPhone)
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Native Mobile</div>
          </div>
          <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Milestone</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1 leading-snug">
              42-Athlete Beta
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Infield & 6th Tool</div>
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
        <HeroShowcaseFrame />
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN EDITORIAL COLUMN                                         */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE SUMMARY                                             */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="cs-label text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-2">
                Executive Summary
              </h3>
              <p className="cs-body text-[15px] sm:text-[16px] text-[#1f2937] leading-[1.75] font-switzer font-normal">
                <strong>Trosky 365</strong> is a mobile coaching companion designed to bridge the gap between weekly private lessons and solo practice. I led the product and interaction design for iOS, translating Coach Nate Trosky’s elite infield curriculum and "6th Tool" mental framework into a focused 10-minute daily practice ritual with zero-friction video recall and habit-reinforcing closure loops.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* CONTEXT                                                       */}
        {/* ------------------------------------------------------------- */}
        <section id="section-context" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Practice Happens Between Coaching Sessions
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] space-y-4 font-switzer font-normal">
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
        {/* THE CHALLENGE                                                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-challenge" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              A List Tells You What to Do. A Coach Helps You Understand Why.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              Traditional training apps treat athletes like passive consumers: watch a video, check a box, move on. But physical development requires real mental intent. When young players train alone, three friction points consistently show up:
            </p>
          </ScrollReveal>

          {/* Clean Problem Breakdown Table */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[11px] font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="col-span-1">Question</div>
                <div className="col-span-2">What Happens in Solo Practice</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">Where do I start?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed sm:border-l sm:border-gray-100 sm:pl-3">
                    With forty video options, players freeze. They default to easy drills they already know instead of working on their weaknesses.
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">What should I notice?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed sm:border-l sm:border-gray-100 sm:pl-3">
                    Watching a coach demonstrate footwork is easy. Feeling it in your own hips and fingers is difficult without clear focal cues.
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">Did I make progress?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed sm:border-l sm:border-gray-100 sm:pl-3">
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
        {/* THE PLAYER                                                    */}
        {/* ------------------------------------------------------------- */}
        <section id="section-player" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Designing for the Moment Between “Show Me” and “I Get It”
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal space-y-4">
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
        {/* THE ROUTINE LOOP                                              */}
        {/* ------------------------------------------------------------- */}
        <section id="section-loop" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              A Small Loop, Designed to Build Momentum
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              Instead of browsing an endless catalog, the app presents a five-step continuous loop. Each step has one clear purpose:
            </p>
          </ScrollReveal>

          {/* Minimal 5-Step Process List */}
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 bg-white shadow-xs overflow-hidden text-[14px] font-switzer font-normal">
            {[
              {
                step: "Start",
                title: "Orient Upfront",
                desc: "One recommended routine on the home screen. Duration and target skills upfront—no browsing needed.",
              },
              {
                step: "Watch",
                title: "Instructional Clip",
                desc: "A sixty-second drill clip with Coach Trosky’s audio commentary and key visual freeze-frames.",
              },
              {
                step: "Respond",
                title: "Active Recall",
                desc: "An active recall prompt where the player explains the focal cue in their own words or records a quick voice note.",
              },
              {
                step: "Reflect",
                title: "Mental Discipline",
                desc: "A ten-second self-check on effort and mental discipline (the 6th Tool) before logging reps.",
              },
              {
                step: "Continue",
                title: "Closure & Streak",
                desc: "Immediate positive feedback (+50 XP, consecutive training count) and a clean path to tomorrow's focus.",
              },
            ].map((item) => (
              <div key={item.step} className="p-3.5 sm:p-4 flex items-start gap-4">
                <span className="font-mono text-gray-400 text-[11px] uppercase tracking-wider pt-0.5 shrink-0 w-16">
                  {item.step}
                </span>
                <div className="flex-1 sm:border-l sm:border-gray-100 sm:pl-3">
                  <span className="font-basier font-medium text-gray-900 block mb-0.5">
                    {item.title}
                  </span>
                  <span className="text-gray-600 leading-relaxed block text-[13px] sm:text-[14px]">
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
          />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* STRUCTURE & FLOW                                              */}
        {/* ------------------------------------------------------------- */}
        <section id="section-structure" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Work Through the Flow. Leave Room to Change It.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal space-y-4">
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
          />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* VISUAL INTERFACE                                              */}
        {/* ------------------------------------------------------------- */}
        <section id="section-design" className="space-y-10 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Familiar Steps, A More Personal Rhythm
            </h2>
            <p className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-3">
              The high-fidelity design organizes the routine into three natural moments: Orient & Learn, Respond & Understand, and Practice & Reflect.
            </p>
          </ScrollReveal>

          {/* Sub-flow 1: Physical Development & Video Instruction */}
          <div className="space-y-4">
            <ScrollReveal delay={0.06}>
              <h3 className="cs-subheading text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
                Orient & Physical Reps
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
            />
          </div>

          {/* Sub-flow 2: Respond & Understand (Active Recall & Direct Feedback) */}
          <div className="space-y-4 pt-4">
            <ScrollReveal delay={0.06}>
              <h3 className="cs-subheading text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
                Respond & Understand
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
            />

            {/* Dual Frame 2: Coach Feedback & XP Reward */}
            <DualMockupFrame
              src1={m07CoachingFeedback}
              alt1="Trosky 365 Coach Nate Feedback"
              caption1="Coach Nate Feedback: 'Spot on! That tension snaps open like a rubber band.'"
              src2={m08XpReward}
              alt2="Trosky 365 +50 XP Reward Screen"
              caption2="Instant Feedback: +50 XP reward screen confirming drill completion."
            />

            {/* Embedded 60fps Silent Looping Video Recording */}
            <MicroInteractionVideo
              mp4Src="/videos/trosky-drill-completion.mp4"
              webmSrc="/videos/trosky-drill-completion.webm"
              title="trosky_drill_completion.mp4"
              caption="Submitting drill completion immediately triggers the XP reward modal and increments the training streak without leaving the active session container."
            />
          </div>

          {/* Sub-flow 3: Practice & Reflect (The 6th Tool) */}
          <div className="space-y-4 pt-4">
            <ScrollReveal delay={0.06}>
              <h3 className="cs-subheading text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
                The 6th Tool & Daily Win
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
            />

            {/* Embedded 60fps Silent Looping Video Recording */}
            <MicroInteractionVideo
              mp4Src="/videos/trosky-reflection-interaction.mp4"
              webmSrc="/videos/trosky-reflection-interaction.webm"
              title="trosky_reflection_interaction.mp4"
              caption="The 6th Tool checklist uses interactive toggle tiles that dynamically validate readiness before allowing the final 'Log Workout' confirmation."
            />
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* ERGONOMIC DETAILS                                             */}
        {/* ------------------------------------------------------------- */}
        <section id="section-details" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Ergonomic Details & Field Ergonomics
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              When an app is used in dusty garages, sunny fields, and batting cages, traditional design assumptions break down. Four practical details guided our decisions:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
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
              <div key={detail.title} className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <span className="font-basier font-medium text-gray-900 block mb-1 text-[15px]">
                  {detail.title}
                </span>
                <span className="text-gray-600 leading-relaxed block text-[13px] font-switzer">
                  {detail.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* OUTCOMES & METRICS                                            */}
        {/* ------------------------------------------------------------- */}
        <section id="section-outcomes" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Evaluation & Measurement Framework
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              Beta testing with forty-two youth and high school players over a thirty-day trial showed clear improvements in training engagement compared to the previous static catalog:
            </p>
          </ScrollReveal>

          {/* Clean Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <ScrollReveal delay={0.08}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <div className="text-[34px] sm:text-[42px] font-seasons font-normal text-gray-900 leading-none">
                  +36%
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  30-Day Streak Retention
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Lifted from 26% baseline to 62% over 30 days.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <div className="text-[34px] sm:text-[42px] font-seasons font-normal text-gray-900 leading-none">
                  3.4x
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Active Reflections Logged
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Written takeaways per completed routine.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <div className="text-[34px] sm:text-[42px] font-seasons font-normal text-gray-900 leading-none">
                  88%
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Comprehension Confidence
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Reported understanding *why* drills were performed.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Balanced 12-Column Outcomes Table */}
          <ScrollReveal delay={0.1}>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mt-5 shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] font-basier font-semibold uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-5">Evaluation Focus</div>
                <div className="sm:col-span-3">Observation Metric</div>
                <div className="sm:col-span-4">Trial / Baseline Data</div>
              </div>
              <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Can a player begin solo practice without decision paralysis?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Time-to-start drill
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    Reduced from ~52s across 40+ catalog items to &lt;6s single-tap launch
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Do players complete the full physical and mental routine?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Routine completion rate
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    84% full-session completion across 42 beta athletes (vs 31% baseline)
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Does the 6th Tool reflection turn into a lasting training habit?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Weekly active sessions
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    Averaged 4.8 completed routines per athlete/week over 30 days
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-[15px] sm:text-[16px] font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
              "The breakthrough was realizing that young players don't need fifty drills a day; they need one purposeful routine that rewards their mental focus."
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* RETROSPECTIVE                                                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-reflection" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Retrospective & Core Takeaways
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body space-y-4 text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
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

          <ScrollReveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-[15px] text-gray-900 mb-1">Physical-First Ergonomics</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Design for the worst-case physical environment: bright sun glare, dusty thumbs, and athletic fatigue dictate minimum contrast and oversized touch targets.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-[15px] text-gray-900 mb-1">Voice as Architecture</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Coach Trosky's direct coaching vocabulary provided more intrinsic motivation and emotional resonance than gamified streak points ever could.
                </p>
              </div>
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
