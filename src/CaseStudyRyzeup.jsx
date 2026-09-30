import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Users, MessageSquare, Search, Bell, Layers, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CaseStudyScrollNav from './CaseStudyScrollNav';
import CaseStudyScrollProgress from './CaseStudyScrollProgress';
import ScrollReveal from './ScrollReveal';
import ThankYouEnvelope from './ThankYouEnvelope';

import orangeBg from './assets/ryzeup_orange_bg.jpg';
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.png';
import starSparkle from './assets/star_sparkle.png';
import oldMockupOrange from './assets/ryzeup_redesign/old_orange_mockup.png';
import newMockupPurple from './assets/ryzeup_redesign/new_purple_mockup.png';

// 12 Authentic Ryzeup Mockups
import mockupOrg from './assets/Ryzeup mockups /01-organization.png';
import mockupLogin from './assets/Ryzeup mockups /02-login.png';
import mockupWall from './assets/Ryzeup mockups /03-wall.png';
import mockupFieldQA from './assets/Ryzeup mockups /04-field-qa.png';
import mockupPoll from './assets/Ryzeup mockups /05-poll.png';
import mockupSearch from './assets/Ryzeup mockups /06-search.png';
import mockupFiles from './assets/Ryzeup mockups /07-files.png';
import mockupNotifications from './assets/Ryzeup mockups /08-notifications.png';
import mockupBuzz from './assets/Ryzeup mockups /09-buzz.png';
import mockupMyTeam from './assets/Ryzeup mockups /10-my-team.png';
import mockupNudge from './assets/Ryzeup mockups /11-nudge.png';
import mockupReportee from './assets/Ryzeup mockups /12-reportee.png';

const RYZEUP_SECTIONS = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-snapshot', label: 'Executive Snapshot' },
  { id: 'section-context', label: 'Business Context' },
  { id: 'section-users', label: 'Users & Needs' },
  { id: 'section-strategy', label: 'Architecture & Strategy' },
  { id: 'section-decisions', label: 'Design Decisions' },
  { id: 'section-execution', label: 'Execution & Craft' },
  { id: 'section-results', label: 'Outcomes & Metrics' },
  { id: 'section-reflection', label: 'Retrospective' },
];

// Clean Single Mockup Frame with Scroll Parallax (Non-clickable)
function MockupFrame({ src, alt, maxWidth = "max-w-[340px] sm:max-w-[400px]" }) {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div 
        ref={frameRef}
        className="w-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 md:p-10 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center flex items-center justify-center min-h-[360px] sm:min-h-[460px] select-none"
        style={{ backgroundImage: `url(${orangeBg})` }}
      >
        <motion.div style={{ y: innerY }} className="w-full flex items-center justify-center">
          <div className={`${maxWidth} w-full`}>
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-contain drop-shadow-2xl mx-auto rounded-[12px] sm:rounded-[18px] pointer-events-none select-none" 
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

// Clean Side-by-side Dual Mockup Frame with Staggered Scroll Parallax (Non-clickable)
function DualMockupFrame({ src1, alt1, src2, alt2 }) {
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY1 = useTransform(scrollYProgress, [0, 1], [-16, 12]);
  const innerY2 = useTransform(scrollYProgress, [0, 1], [-8, 16]);

  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div 
        ref={frameRef}
        className="w-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 md:p-10 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${orangeBg})` }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center justify-items-center">
          <motion.div style={{ y: innerY1 }} className="w-full flex items-center justify-center">
            <div className="max-w-[280px] sm:max-w-[320px] w-full">
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-2xl mx-auto rounded-[12px] sm:rounded-[18px] pointer-events-none select-none" 
                loading="lazy" 
              />
            </div>
          </motion.div>
          <motion.div style={{ y: innerY2 }} className="w-full flex items-center justify-center">
            <div className="max-w-[280px] sm:max-w-[320px] w-full">
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-2xl mx-auto rounded-[12px] sm:rounded-[18px] pointer-events-none select-none" 
                loading="lazy" 
              />
            </div>
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

export default function CaseStudyRyzeup({ onBack, isRevealed = true }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [viewMode, setViewMode] = useState('new');

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 220]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.08]);

  return (
    <div className="relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-switzer font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
      {/* Top Sticky Reading Progress Bar & Floating Back-To-Top Button */}
      <CaseStudyScrollProgress />

      {/* Floating Right-Side Section Indicator & Smooth Nav */}
      <CaseStudyScrollNav sections={RYZEUP_SECTIONS} />
      
      {/* Animated gradient header background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[720px] sm:h-[840px] pointer-events-none will-change-transform"
        style={{
          y: bgY,
          scale: bgScale,
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.3) 40%, #ffffff 100%), url(${heroGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Top Header Shell */}
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
          Ryzeup — Designing a More Connected Workplace
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[19px] md:text-[21px] text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal italic"
        >
          A mobile experience that brings workplace updates, shared knowledge, and team priorities together without cognitive overload.
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
              4 Members
            </div>
            <div className="text-[12px] text-gray-500 font-normal">1 PM, 2 Mobile, 1 Backend</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Timeline</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              2 Months
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Shipped Beta</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platforms</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              iOS & Android
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Native Mobile</div>
          </div>
          <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Milestone</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1 leading-snug">
              Beta Pilot
            </div>
            <div className="text-[12px] text-gray-500 font-normal">+15% Monthly Growth</div>
          </div>
        </motion.div>

      </header>

      {/* Hero Showcase with Before / After Switch (Non-clickable mockups) */}
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1040px] mx-auto px-3 sm:px-6"
      >
        <div className="my-6 sm:my-8 flex flex-col items-center">
          
          {/* Switch Toggle Container */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-xs">
              <span className={`text-[12px] sm:text-[13px] font-basier font-medium tracking-tight transition-colors ${viewMode === 'old' ? 'text-[#111827] font-semibold' : 'text-gray-400'}`}>
                Old Version
              </span>
              
              <button
                type="button"
                role="switch"
                aria-checked={viewMode === 'new'}
                aria-label="Toggle between Old and New redesign mockup"
                onClick={() => setViewMode(prev => prev === 'new' ? 'old' : 'new')}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer relative ${
                  viewMode === 'new' ? 'bg-[#701a75] focus:ring-purple-600' : 'bg-gray-300 hover:bg-gray-400 focus:ring-gray-400'
                }`}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-xs"
                  animate={{ x: viewMode === 'new' ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.25 }}
                />
              </button>

              <span className={`text-[12px] sm:text-[13px] font-basier font-medium tracking-tight transition-colors duration-300 ${viewMode === 'new' ? 'text-[#701a75] font-semibold' : 'text-gray-400'}`}>
                Redesign (New)
              </span>
            </div>
          </div>

          {/* Shorter Background Container with Overlapping Mockup */}
          <div className="relative w-full flex items-center justify-center py-6 sm:py-10">
            {/* Shorter Backdrop Card */}
            <div 
              className="absolute inset-x-2 sm:inset-x-8 top-1/2 -translate-y-1/2 h-[260px] sm:h-[320px] md:h-[360px] rounded-[22px] sm:rounded-[30px] border border-gray-200/80 shadow-xs overflow-hidden bg-cover bg-center pointer-events-none select-none"
              style={{ backgroundImage: `url(${orangeBg})` }}
            />

            {/* Phone Mockup Protruding above and below shorter backdrop (Non-clickable) */}
            <div className="relative z-10 w-full max-w-[270px] sm:max-w-[310px] md:max-w-[330px] aspect-[576/1024] select-none">
              {/* Single corner star - visible ONLY when turned into New */}
              <AnimatePresence>
                {viewMode === 'new' && (
                  <motion.img
                    src={starSparkle}
                    alt=""
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
                    animate={{ opacity: 0.95, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.4, rotate: 25 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-7 h-7 sm:w-9 sm:h-9 object-contain pointer-events-none select-none z-30 drop-shadow-md"
                  />
                )}
              </AnimatePresence>

              {/* New Purple Mockup */}
              <motion.div
                initial={false}
                animate={{
                  opacity: viewMode === 'new' ? 1 : 0,
                  scale: viewMode === 'new' ? 1 : 0.985,
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 block will-change-transform z-10 transform-gpu pointer-events-none select-none"
              >
                <img 
                  src={newMockupPurple} 
                  alt="Ryzeup New Mobile Experience Mockup (Purple)" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] mx-auto pointer-events-none select-none" 
                  loading="eager"
                />
              </motion.div>

              {/* Old Orange Mockup */}
              <motion.div
                initial={false}
                animate={{
                  opacity: viewMode === 'old' ? 1 : 0,
                  scale: viewMode === 'old' ? 1 : 0.985,
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 block will-change-transform z-10 transform-gpu pointer-events-none select-none"
              >
                <img 
                  src={oldMockupOrange} 
                  alt="Ryzeup Old Interface Reference Mockup (Orange)" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] mx-auto pointer-events-none select-none" 
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Main Narrative Article Container */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE SUMMARY                                             */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
              <h3 className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-2">
                Executive Summary
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#1f2937] leading-[1.75] font-switzer font-normal">
                <strong>Ryzeup</strong> is a modern workplace communication and team capability application. I led the mobile product redesign from the ground up, restructuring organization entry, conversational knowledge feeds, contextual search, and manager priority drawers into a cohesive system that eliminates context switching and drives daily operational focus.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE SNAPSHOT                                            */}
        {/* ------------------------------------------------------------- */}
        <section id="section-snapshot" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Executive Snapshot
            </h2>
          </ScrollReveal>
          
          {/* Scope & Outcome Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[11px] font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="col-span-1">Dimension</div>
                <div className="col-span-2">Overview</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="col-span-1">
                    <strong className="text-gray-900 block font-basier font-medium">Product Scope</strong>
                  </div>
                  <div className="col-span-2 text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4 text-[13px] sm:text-[14px]">
                    Organization entry, Wall, post creation, Field Q&A, search, notifications, Buzz, and reportee selection
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="col-span-1">
                    <strong className="text-gray-900 block font-basier font-medium">Key Outcome</strong>
                  </div>
                  <div className="col-span-2 text-gray-900 sm:border-l sm:border-gray-100 sm:pl-4 font-medium text-[13px] sm:text-[14px]">
                    +15% monthly usage increase over 2-month beta period
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] space-y-4 font-switzer font-normal">
              <p>
                I designed Ryzeup to help employees stay informed, share knowledge, and keep track of the updates that matter to their work. For managers, I focused on making it easier to move between personal priorities and an individual team member’s context.
              </p>
            </div>
          </ScrollReveal>

          {/* Central Question Callout */}
          <ScrollReveal delay={0.1}>
            <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-[15px] sm:text-[16px] font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
              "How can I bring communication, knowledge discovery, and team follow-up into one mobile experience without making it feel overwhelming?"
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* BUSINESS CONTEXT & THE PROBLEM                                */}
        {/* ------------------------------------------------------------- */}
        <section id="section-context" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Business Context & The Problem
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              A workplace platform needs to support more than publishing updates. Employees need to find information again, ask questions in the right context, and understand what requires their attention. Managers need that same clarity across their teams.
            </p>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-3">
              I framed the problem around three connected needs:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
                <div className="p-3.5 sm:p-4">
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Find relevant information</strong>
                  <span className="text-gray-600 text-[13px] sm:text-[14px]">Documents and useful answers should remain accessible after they move down the feed.</span>
                </div>
                <div className="p-3.5 sm:p-4">
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Contribute with a clear purpose</strong>
                  <span className="text-gray-600 text-[13px] sm:text-[14px]">Sharing an update, asking a question, and creating a poll need different structures.</span>
                </div>
                <div className="p-3.5 sm:p-4">
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Understand the current context</strong>
                  <span className="text-gray-600 text-[13px] sm:text-[14px]">Managers should always know whether they are reviewing their own updates or someone else’s.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50">
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-500 mb-1">Design Objective</div>
              <p className="text-[14px] sm:text-[15px] font-basier font-medium text-gray-900 leading-snug">
                Help employees find, share, and act on workplace information while keeping navigation and context understandable on a small screen.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* USERS & CORE NEEDS                                            */}
        {/* ------------------------------------------------------------- */}
        <section id="section-users" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              User Groups & Core Needs
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              I designed around the different responsibilities employees bring to the same workspace.
            </p>
          </ScrollReveal>

          {/* User Matrix Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[11px] font-basier font-medium uppercase tracking-wider text-gray-500">
                <div>User Group</div>
                <div>Core Need</div>
                <div>Design Response</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-[13px] sm:text-[14px] font-switzer font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Field employees and individual contributors</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core Need</div>
                    Check updates, retrieve documents, and ask practical questions
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Design Response</div>
                    A shared feed, structured posts, and search across content types
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Regional managers and team leads</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core Need</div>
                    Review their own priorities and follow up on a team member’s work
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Design Response</div>
                    Self/My Team views with a visible selected employee context
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Subject-matter experts</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core Need</div>
                    Answer questions and share useful operational knowledge
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Design Response</div>
                    Question threads that keep answers connected to their original context
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Internal communicators</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core Need</div>
                    Publish announcements and supporting documents
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Design Response</div>
                    Consistent post cards with clear authorship and recognizable attachments
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* INFORMATION ARCHITECTURE & DESIGN STRATEGY                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-strategy" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Information Architecture & Design Strategy
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              I structured the core experience around four activities:
            </p>
          </ScrollReveal>

          {/* 4 Activities Architecture Map */}
          <ScrollReveal delay={0.06}>
            <div className="p-4 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="text-[11px] font-basier font-medium uppercase tracking-widest text-gray-400">
                Core Activities Map
              </div>
              
              <div className="space-y-2.5 font-mono text-[12px] sm:text-[13px]">
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-bold text-gray-900 uppercase">Enter</span>
                  <span className="text-gray-600 font-switzer">Verify the organization and sign in within its branded workspace</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-bold text-gray-900 uppercase">Discover & Contribute</span>
                  <span className="text-gray-600 font-switzer">Browse Wall, open a question, or share a post</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-bold text-gray-900 uppercase">Find & Return</span>
                  <span className="text-gray-600 font-switzer">Search for people, posts, and files, or revisit activity through notifications</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-bold text-gray-900 uppercase">Review Priorities</span>
                  <span className="text-gray-600 font-switzer">Open Buzz, switch between Self and My Team, and inspect relevant nudges</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">
                Make Context Visible Before Asking People to Act
              </h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                This became the organizing principle for my design decisions. The organization establishes where the employee is working. Post labels communicate the type of content. Search tabs clarify the result category. The selected employee identifies whose updates a manager is reviewing.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* KEY DESIGN DECISIONS                                          */}
        {/* ------------------------------------------------------------- */}
        <section id="section-decisions" className="space-y-10 sm:space-y-12 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Key Design Decisions & Interactive Systems
            </h2>
          </ScrollReveal>

          {/* Decision 1: Organization Context */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              Organization Context at Entry
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Employees need to recognize the workspace they are entering before they continue to sign in. I separated organization verification from login: the entry screen validates the organization code, displays an authentic verified state, and transitions seamlessly into branded authentication.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupOrg} 
            alt1="Organization Code Verification Screen" 
            src2={mockupLogin} 
            alt2="Branded Workspace Sign In" 
          />

          {/* Decision 2: Workplace Communication */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              Consistent Workplace Communication Structure
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              A shared feed needs to accommodate announcements, documents, and conversations without visual noise. I designed the Wall around a standardized card structure with explicit authorship, attachment previews, and lightweight engagement actions. Specialized composers for polls and questions ensure inputs are structured upfront.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupWall} 
            alt1="Wall Workplace Feed and Card Structure" 
            src2={mockupPoll} 
            alt2="Interactive Poll & Structured Post Creation" 
          />

          {/* Embedded 60fps Silent Looping Video Recording */}
          <MicroInteractionVideo
            mp4Src="/videos/ryzeup-poll-interaction.mp4"
            webmSrc="/videos/ryzeup-poll-interaction.webm"
            title="ryzeup_poll_interaction.mp4"
            caption="Participating in interactive field polls updates vote distributions and confirmation states immediately without reloading the surrounding feed card."
          />

          {/* Decision 3: Knowledge Retrieval */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              Knowledge Retrieval Beyond the Feed
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Employees should not have to scroll endlessly or remember authorship to retrieve an operational document. I structured search across All, Profiles, Posts, and Files, paired with recent searches and file metadata chips (size, format, timestamp).
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupSearch} 
            alt1="Categorized Search with Filters" 
            src2={mockupFiles} 
            alt2="Files & Document Repository View" 
          />

          {/* Decision 4: Separating Personal and Team Priorities */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              Separating Personal and Team Priorities
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Managers frequently lose track of context when moving between personal to-dos and team follow-ups. I designed Buzz with clear <strong className="text-gray-900 font-medium">Self</strong> and <strong className="text-gray-900 font-medium">My Team</strong> segmented controls, keeping the active team member persistently anchored above pending action cards.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupBuzz} 
            alt1="Buzz Self View with Priorities" 
            src2={mockupNudge} 
            alt2="Expanded Nudge Card and Action Details" 
          />

          {/* Decision 5: Reportee Selection */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              Reportee Selection & Directory Context
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Whether searching by name or browsing by departmental hierarchy, managers can switch team contexts via a quick slide-over drawer that preserves their current scroll position in the underlying application.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupReportee} 
            alt1="Reportee Selection and Directory Browsing" 
            src2={mockupMyTeam} 
            alt2="My Team View with Selected Employee Context" 
          />

          {/* Embedded 60fps Silent Looping Video Recording */}
          <MicroInteractionVideo
            mp4Src="/videos/ryzeup-context-switch.mp4"
            webmSrc="/videos/ryzeup-context-switch.webm"
            title="ryzeup_context_switch.mp4"
            caption="The reportee context drawer lets managers select any team member to instantly inspect their priorities while maintaining visual hierarchy and active session state."
          />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* EXECUTION & CRAFT                                             */}
        {/* ------------------------------------------------------------- */}
        <section id="section-execution" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Execution Within a Two-Month Sprint
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              The platform was taken from blank canvas to production beta in two months. Within that timeframe, I established a clean visual token system—magenta brand accents, neutral light surfaces, rounded card surfaces, and accessible bottom sheets.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Consistency</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Actions look and behave predictably across feeds, search results, and manager drawers.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Content Density</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Long document titles, timestamps, and multi-line posts maintain strict vertical rhythm on mobile screens.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Interaction States</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Verification checkpoints, empty states, and error recovery banners receive equal design attention.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Scope Discipline</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  High-frequency workflows were perfected before introducing auxiliary secondary features.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupFieldQA} 
            alt1="Field Q&A Thread and Preserved Context" 
            src2={mockupNotifications} 
            alt2="Activity Notifications and Return Paths" 
          />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* OUTCOMES & METRICS                                            */}
        {/* ------------------------------------------------------------- */}
        <section id="section-results" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Evaluation & Measurement Framework
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              Ryzeup was deployed in beta across an operational department for a 60-day pilot:
            </p>
          </ScrollReveal>

          {/* Clean Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <ScrollReveal delay={0.08}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <div className="text-[34px] sm:text-[42px] font-seasons font-normal text-gray-900 leading-none">
                  +15%
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Monthly Active Usage
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Sustained increase across beta team members.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <div className="text-[34px] sm:text-[42px] font-seasons font-normal text-gray-900 leading-none">
                  &lt;3s
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  Context Switch Latency
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Drawer reportee switch vs ~28s manual search.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <div className="text-[34px] sm:text-[42px] font-seasons font-normal text-gray-900 leading-none">
                  82%
                </div>
                <div className="text-[13px] font-basier font-medium text-gray-900 mt-2">
                  4-Hour Response Rate
                </div>
                <p className="text-[12px] text-gray-500 font-switzer mt-1">
                  Field Q&A queries resolved within half a shift.
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
                    Can employees retrieve essential files without author knowledge?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Search success & task time
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    91% retrieval success; time dropped from ~48s to &lt;9s
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Can a manager inspect a team member without losing active context?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Context switch latency
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    Reduced from ~28s across external tabs to &lt;3s drawer switch
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Does Field Q&A improve timely operational decision making?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Response turnaround
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    82% answered within 4 hours; zero unresolved critical alerts
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* RETROSPECTIVE                                                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-reflection" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Retrospective & Core Takeaways
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.06}>
            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              <p>
                Ryzeup reinforced the importance of connecting information with the context needed to use it. A feed, search function, and team view each serve a purpose, but their real value depends on how clearly people can move between them without cognitive friction.
              </p>
              <p>
                My strongest design focus was making that context visible: the organization at entry, the content type in the feed, the result category in search, and the selected employee in team follow-up.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Visibility Precedes Action</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Clarifying whose data is being viewed and what state an action represents reduces user hesitation more effectively than any tutorial tooltip.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">State Preservation</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Overlay drawers and sticky contextual banners keep secondary exploration from breaking primary operational tasks.
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
