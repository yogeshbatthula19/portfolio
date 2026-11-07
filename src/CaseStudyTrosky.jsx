import NextCaseStudy from './NextCaseStudy';
import CaseStudyTldr from './CaseStudyTldr';
import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Target, ShieldCheck, Activity, Users, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CaseStudyScrollNav from './CaseStudyScrollNav';
import CaseStudyScrollProgress from './CaseStudyScrollProgress';
import ScrollReveal from './ScrollReveal';

// Background assets
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.webp';
import troskyMockupBg from './assets/trosky/trosky_mockup_bg.webp';

// Authentic Hand-drawn Paper Wireframe Sketches
import sketchNotebookImg from './assets/trosky/sections/trosky_sketch_notebook.webp';

// The 12 Main HD iPhone Mockups
import m01DailyHome from './assets/trosky/01-daily-home.webp';
import m02DrillIntro from './assets/trosky/02-drill-introduction.webp';
import m03Instructional from './assets/trosky/03-instructional-content.webp';
import m04MarkWatched from './assets/trosky/04-mark-as-watched.webp';
import m05WrittenPrompt from './assets/trosky/05-written-response-prompt.webp';
import m06SubmittedResponse from './assets/trosky/06-submitted-response.webp';
import m07CoachingFeedback from './assets/trosky/07-coaching-feedback.webp';
import m08XpReward from './assets/trosky/08-drill-xp-reward.webp';
import m09ThrowingVideo from './assets/trosky/09-throwing-video.webp';
import m10SelectedAnswer from './assets/trosky/10-selected-answer.webp';
import m11CharacterReflection from './assets/trosky/11-character-reflection.webp';
import m12SessionComplete from './assets/trosky/12-session-complete.webp';

// Section navigation for floating scroll spy
const TROSKY_SECTIONS = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-context', label: 'Context' },
  { id: 'section-challenge', label: 'The Challenge' },
  { id: 'section-player', label: 'The Player' },
  { id: 'section-loop', label: 'The Routine Loop' },
  { id: 'section-structure', label: 'Structure & Flow' },
  { id: 'section-design', label: 'Visual Interface' },
  { id: 'section-details', label: 'Built for the field' },
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
            className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] pointer-events-none select-none" 
            loading="eager"
            decoding="async"
          />
          <p className="cs-caption mt-3 text-center text-caption font-basier text-gray-700 font-normal">
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
          <p className="cs-caption mt-3 text-center text-caption font-basier text-gray-900 font-medium">
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
            className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] pointer-events-none select-none" 
            loading="eager"
            decoding="async"
          />
          <p className="cs-caption mt-3 text-center text-caption font-basier text-gray-700 font-normal">
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
        className="w-full rounded-[16px] sm:rounded-[22px] p-3 sm:p-6 md:p-8 relative overflow-hidden select-none"
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
          <p className="cs-caption mt-3 text-center text-caption sm:text-small font-basier text-gray-700 font-normal">
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
        className="w-full rounded-[16px] sm:rounded-[22px] p-4 sm:p-8 relative overflow-hidden select-none"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center justify-items-center">
          <motion.div style={{ y: innerY1 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[260px] sm:max-w-[290px] w-full">
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption1 && (
              <p className="cs-caption mt-2.5 text-center text-caption font-basier text-gray-700 font-normal">
                {caption1}
              </p>
            )}
          </motion.div>

          <motion.div style={{ y: innerY2 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[260px] sm:max-w-[290px] w-full">
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption2 && (
              <p className="cs-caption mt-2.5 text-center text-caption font-basier text-gray-700 font-normal">
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
        className="w-full rounded-[16px] sm:rounded-[22px] p-4 sm:p-6 md:p-8 relative overflow-hidden select-none"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 items-start justify-items-center">
          {/* Phone 1 */}
          <motion.div style={{ y: innerY1 }} className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[240px] sm:max-w-[260px] w-full">
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption1 && (
              <p className="cs-caption mt-2.5 text-center text-caption font-basier text-gray-700 font-normal">
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
                className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption2 && (
              <p className="cs-caption mt-2.5 text-center text-caption font-basier text-gray-700 font-normal">
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
                className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.10)] mx-auto pointer-events-none select-none" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            {caption3 && (
              <p className="cs-caption mt-2.5 text-center text-caption font-basier text-gray-700 font-normal">
                {caption3}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function CaseStudyTrosky({ onBack, onNext, isRevealed = true }) {
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
    <div className="case-study-page relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-basier font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
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
            className="min-h-11 inline-flex items-center gap-2 text-small font-basier font-medium text-[#6b7280] hover:text-[#111827] transition-colors cursor-pointer group"
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
          className="text-h2 sm:text-display-sm font-seasons font-normal text-[#111827] leading-[1.12] sm:leading-[1.08] tracking-[-0.02em] pt-6 sm:pt-8"
        >
          Trosky 365: a coach in your pocket
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-body sm:text-lead text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal italic"
        >
          A daily practice routine for baseball players, for the days between coaching sessions.
        </motion.p>

        {/* Meta Bar / Project Overview - Clean White & Grey Grid */}
        <motion.p
          id="section-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 pt-4 border-t border-gray-200 text-small text-gray-600 font-basier scroll-mt-28"
        >
          Sole product designer · 6 weeks · iOS · Shipped to beta
        </motion.p>
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
          <CaseStudyTldr accent="#0b7a96" rows={[["Problem", "Players faced dozens of unsorted drill videos and no way to tell if they were improving, so solo practice faded within a week."], ["My role", "Sole product designer on iOS, working with the coaches and one engineer over 6 weeks."], ["What I changed", "Replaced the catalog with one 10-minute daily routine: watch, explain it back, practise, reflect."], ["Result", "In a 42-athlete beta, 30-day streak retention went from 26% to 62%."]]} />
          <ScrollReveal>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="cs-label type-label mb-2">
                Executive Summary
              </h3>
              <p className="cs-body text-body text-[#1f2937] leading-[1.6] font-basier font-normal">
                <strong>Trosky 365</strong> helps baseball players practise well when their coach isn’t there. I designed the iOS app, turning Coach Nate Trosky’s hitting and fielding drills, and his “6th Tool” mindset training, into one 10-minute daily routine: watch a short clip, explain it back, practise, reflect.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Most practice happens without the coach
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body text-body text-[#374151] leading-[1.6] space-y-4 font-basier font-normal">
              <p>
                Most players don’t struggle for lack of talent. They struggle because ninety percent of their practice happens when their coach isn’t there.
              </p>
              <p>
                Trosky Baseball runs one of the country’s most respected infield programs. It also teaches hitting, and what Coach Trosky calls the 6th Tool: staying calm, controlling your breathing and believing in yourself. The app had to carry all of it. But once players left the field, the coaching disappeared into a long list of video files.
              </p>
              <p>
                Players saw dozens of drills with no order, no hint of what to feel, and no way to tell if they were improving. Working with Coach Nate Trosky and Coach Matt, I set out to turn that list into one short daily routine that feels like talking to your coach.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              A list tells you what to do. A coach explains why.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              Most training apps ask players to watch a video, tick a box and move on. But learning a skill takes thought. Practising alone, young players got stuck in three places:
            </p>
          </ScrollReveal>

          {/* Clean Problem Breakdown Table */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="col-span-1">Question</div>
                <div className="col-span-2">What happens when they practise alone</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">Where do I start?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed sm:border-l sm:border-gray-100 sm:pl-3">
                    With forty videos to choose from, players freeze and pick drills they already know instead of working on weak spots.
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">What should I notice?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed sm:border-l sm:border-gray-100 sm:pl-3">
                    Watching a coach’s footwork is easy. Feeling it in your own hips and fingers is hard without one clear thing to focus on.
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="font-basier font-medium text-gray-900">Did I make progress?</div>
                  <div className="col-span-2 text-gray-600 leading-relaxed sm:border-l sm:border-gray-100 sm:pl-3">
                    With no feedback after a drill, practice feels invisible and the habit fades within a week.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <blockquote className="border-l-2 border-gray-300 pl-4 sm:pl-6 my-2 text-body sm:text-lead font-seasons italic text-[#111827] leading-snug">
              “How might we make a 10-minute daily routine that feels like a conversation with a mentor, not a playlist?”
            </blockquote>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* THE PLAYER                                                    */}
        {/* ------------------------------------------------------------- */}
        <section id="section-player" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Designing for Alex, 13, practising alone
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal space-y-4">
              <p>
                We designed around Alex, a thirteen-year-old travel ball infielder trying to make his high school varsity team.
              </p>
              <p>
                Alex trains with his team two days a week. The other five, he practises alone in his garage, backyard or against a school wall. Like most teenagers, he loses interest fast on a phone. If the app makes him dig through menus with a glove on, he closes it.
              </p>
              <p>
                So we kept each video to about a minute, made the main buttons big enough for sweaty thumbs, and asked him to explain the drill back before he starts his reps.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              One short loop, every day
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              Instead of browsing a catalog, players follow the same five steps each day:
            </p>
          </ScrollReveal>

          {/* Minimal 5-Step Process List */}
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 bg-white shadow-xs overflow-hidden text-small font-basier font-normal">
            {[
              {
                step: "Start",
                title: "Today’s routine",
                desc: "One recommended routine on the home screen, with its length and focus. No browsing.",
              },
              {
                step: "Watch",
                title: "Watch the clip",
                desc: "A 60-second drill clip with Coach Trosky’s voice and key freeze-frames.",
              },
              {
                step: "Respond",
                title: "Explain it back",
                desc: "The player says the key cue in their own words, or records a quick voice note.",
              },
              {
                step: "Reflect",
                title: "Check in",
                desc: "A ten-second self-check on effort and focus (the 6th Tool) before logging reps.",
              },
              {
                step: "Continue",
                title: "Finish and keep the streak",
                desc: "Quick praise (+50 XP, streak count) and a clear start for tomorrow.",
              },
            ].map((item) => (
              <div key={item.step} className="p-3.5 sm:p-4 flex items-start gap-4">
                <span className="font-basier tabular-nums text-gray-500 text-caption uppercase tracking-wider pt-0.5 shrink-0 w-16">
                  {item.step}
                </span>
                <div className="flex-1 sm:border-l sm:border-gray-100 sm:pl-3">
                  <span className="font-basier font-medium text-gray-900 block mb-0.5">
                    {item.title}
                  </span>
                  <span className="text-gray-600 leading-relaxed block text-small">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <p className="text-small sm:text-body text-gray-500 leading-relaxed font-basier font-normal pt-1">
              Watching is passive. Practice is physical. Reflection is where the skill sticks. The app is built so players put the phone down, do the work on the field, and come back for a quick check-in.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Sketching first, and dropping leaderboards
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal space-y-4">
              <p>
                I started on paper in a spiral notebook, tracing what a player does and feels at each step. My early ideas included dashboards and leaderboards, but testing with young athletes showed that public leaderboards made them anxious, not motivated. So I dropped them.
              </p>
              <p>
                During a workout we also removed the navigation tabs. Once a routine starts, the only way out is an explicit “Save & Pause.”
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The screens
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-3">
              The final design follows the same loop. Here is how each part looks.
            </p>
          </ScrollReveal>

          {/* Sub-flow 1: Physical Development & Video Instruction */}
          <div className="space-y-4">
            <ScrollReveal delay={0.06}>
              <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
                Learn the drill
              </h3>
              <p className="text-small sm:text-body text-gray-600 font-basier font-normal mt-1 leading-relaxed">
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

          {/* Sub-flow 2: Explain it back (Active Recall & Direct Feedback) */}
          <div className="space-y-4 pt-4">
            <ScrollReveal delay={0.06}>
              <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
                Explain it back
              </h3>
              <p className="text-small sm:text-body text-gray-600 font-basier font-normal mt-1 leading-relaxed">
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

          </div>

          {/* Sub-flow 3: Practice & Reflect (The 6th Tool) */}
          <div className="space-y-4 pt-4">
            <ScrollReveal delay={0.06}>
              <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
                The 6th Tool and the daily win
              </h3>
              <p className="text-small sm:text-body text-gray-600 font-basier font-normal mt-1 leading-relaxed">
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

          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* ERGONOMIC DETAILS                                             */}
        {/* ------------------------------------------------------------- */}
        <section id="section-details" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Built for the field
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              This app is used in dusty garages, sunny fields and batting cages, so we made four practical choices:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {[
              {
                title: "One task per screen",
                desc: "Drills vary in depth, but each screen stays simple so athletes never feel overwhelmed.",
              },
              {
                title: "Large thumb touch targets",
                desc: "Main buttons sit at the bottom of the screen and are at least 52px tall, easy to hit with sweaty thumbs or batting gloves.",
              },
              {
                title: "Offline caching",
                desc: "Many batting cages and ballparks have no Wi-Fi. The day’s routine downloads every morning so it opens instantly offline.",
              },
              {
                title: "Direct coach tone",
                desc: "The app’s wording uses Coach Trosky’s own phrases, like ‘Lock in’, ‘Feel the bounce’ and ‘Stay in the tunnel’, instead of generic app text.",
              },
            ].map((detail) => (
              <div key={detail.title} className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <span className="font-basier font-medium text-gray-900 block mb-1 text-body">
                  {detail.title}
                </span>
                <span className="text-gray-600 leading-relaxed block text-small font-basier">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              What changed
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              In a 30-day beta with 42 youth and high school players, engagement improved clearly compared with the old video catalog:
            </p>
          </ScrollReveal>

          {/* Clean Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <ScrollReveal delay={0.08}>
              <div className="border-t border-gray-200 pt-4 text-center">
                <div className="text-h2 sm:text-h1 font-seasons font-normal leading-none" style={{ color: '#0b7a96' }}>
                  +36 pts
                </div>
                <div className="text-small font-basier font-medium text-gray-900 mt-2">
                  30-Day Streak Retention
                </div>
                <p className="text-caption text-gray-500 font-basier mt-1">
                  From 26% with the old video catalog to 62% with the new routine.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="border-t border-gray-200 pt-4 text-center">
                <div className="text-h2 sm:text-h1 font-seasons font-normal leading-none" style={{ color: '#0b7a96' }}>
                  3.4x
                </div>
                <div className="text-small font-basier font-medium text-gray-900 mt-2">
                  Reflections written
                </div>
                <p className="text-caption text-gray-500 font-basier mt-1">
                  Written takeaways per completed routine.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="border-t border-gray-200 pt-4 text-center">
                <div className="text-h2 sm:text-h1 font-seasons font-normal leading-none" style={{ color: '#0b7a96' }}>
                  88%
                </div>
                <div className="text-small font-basier font-medium text-gray-900 mt-2">
                  Understood the “why”
                </div>
                <p className="text-caption text-gray-500 font-basier mt-1">
                  Said they understood why they were doing each drill.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Balanced 12-Column Outcomes Table */}
          <ScrollReveal delay={0.1}>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mt-5 shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-5">Evaluation Focus</div>
                <div className="sm:col-span-3">Observation Metric</div>
                <div className="sm:col-span-4">Trial / Baseline Data</div>
              </div>
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Can a player begin solo practice without decision paralysis?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Observation Metric</div>
                    Time-to-start drill
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Trial / Baseline Data</div>
                    Reduced from ~52s across 40+ catalog items to &lt;6s single-tap launch
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Do players complete the full physical and mental routine?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Observation Metric</div>
                    Routine completion rate
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Trial / Baseline Data</div>
                    84% full-session completion across 42 beta athletes (vs 31% baseline)
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Does the 6th Tool reflection turn into a lasting training habit?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Observation Metric</div>
                    Weekly active sessions
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Trial / Baseline Data</div>
                    Averaged 4.8 completed routines per athlete/week over 30 days
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="border-t border-gray-200 pt-4 text-body font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              What I learned
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="cs-body space-y-4 text-body text-[#374151] leading-[1.6] font-basier font-normal">
              <p>
                Designing for athletes is different from designing most apps. Most apps count success by time spent on the screen. In sports, success is getting the athlete off the phone and into their body.
              </p>
              <p>
                The breakthrough didn’t come from social feeds or leaderboards. It came from removing distraction, keeping Coach Trosky’s own voice, and building a small five-step loop that respects the athlete’s time.
              </p>
              <p>
                When software gets out of the way and gives just enough structure, young athletes don’t only get better at baseball. They learn how to teach themselves.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Physical-First Ergonomics</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Design for the worst conditions: sun glare, dusty thumbs and tired players call for strong contrast and big touch targets.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Voice as Architecture</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Coach Trosky’s own coaching words motivated players more than streak points ever could.
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
          

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="min-h-11 inline-flex items-center gap-2 text-small font-basier font-medium text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Selected Works</span>
            </button>

            <NextCaseStudy current="trosky" onNavigate={onNext} />
          </div>
        </ScrollReveal>

      </main>

    </div>
  );
}
