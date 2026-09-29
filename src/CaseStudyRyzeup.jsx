import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
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

// Clean Single Mockup Frame with Orange Gradient Background and Scroll Parallax
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
        className="w-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 md:p-10 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center flex items-center justify-center min-h-[360px] sm:min-h-[460px]"
        style={{ backgroundImage: `url(${orangeBg})` }}
      >
        <motion.div style={{ y: innerY }} className="w-full flex items-center justify-center">
          <a 
            href={src} 
            target="_blank" 
            rel="noreferrer" 
            aria-label={`Open full-size image: ${alt}`}
            className={`block cursor-zoom-in ${maxWidth} w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]`}
          >
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-contain drop-shadow-2xl mx-auto rounded-[12px] sm:rounded-[18px]" 
              loading="lazy"
            />
          </a>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

// Clean Side-by-side Dual Mockup Frame with Orange Gradient Background and Staggered Scroll Parallax
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
        className="w-full rounded-[16px] sm:rounded-[24px] p-4 sm:p-8 md:p-10 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${orangeBg})` }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center justify-items-center">
          <motion.div style={{ y: innerY1 }} className="w-full flex items-center justify-center">
            <a 
              href={src1} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={`Open full-size image: ${alt1}`}
              className="block cursor-zoom-in max-w-[280px] sm:max-w-[320px] w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]"
            >
              <img 
                src={src1} 
                alt={alt1} 
                className="w-full h-auto object-contain drop-shadow-2xl mx-auto rounded-[12px] sm:rounded-[18px]" 
                loading="lazy" 
              />
            </a>
          </motion.div>
          <motion.div style={{ y: innerY2 }} className="w-full flex items-center justify-center">
            <a 
              href={src2} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={`Open full-size image: ${alt2}`}
              className="block cursor-zoom-in max-w-[280px] sm:max-w-[320px] w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]"
            >
              <img 
                src={src2} 
                alt={alt2} 
                className="w-full h-auto object-contain drop-shadow-2xl mx-auto rounded-[12px] sm:rounded-[18px]" 
                loading="lazy" 
              />
            </a>
          </motion.div>
        </div>
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
      <CaseStudyScrollNav />
      
      {/* Animated gradient header background matching main hero section that moves gracefully on scroll */}
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
          Ryzeup: Designing a More Connected Workplace
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[19px] md:text-[21px] text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal"
        >
          A mobile experience that brings workplace updates, shared knowledge, and team priorities together.
        </motion.p>

        {/* Meta Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 pb-5 sm:pt-8 sm:pb-6 mt-6 border-t border-b border-gray-100"
        >
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Role</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">Product Designer</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Timeline</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">2 months</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platform</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">Mobile application</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Release</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">Beta (One Team)</div>
          </div>
        </motion.div>

      </header>

      {/* Hero Showcase with Before / After Switch */}
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1040px] mx-auto px-3 sm:px-6"
      >
        <div className="my-6 sm:my-8 flex flex-col items-center">
          
          {/* Switch Toggle Container */}
          <div className="relative mb-5 flex items-center justify-center">
            {/* Pill Switch */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 shadow-sm">
              <span className={`text-[12px] sm:text-[13px] font-basier font-medium tracking-tight transition-colors ${viewMode === 'old' ? 'text-[#111827] font-semibold' : 'text-gray-400'}`}>
                Old
              </span>
              
              <button
                type="button"
                role="switch"
                aria-checked={viewMode === 'new'}
                aria-label="Toggle between Old (Orange) and New (Purple) mockup"
                onClick={() => setViewMode(prev => prev === 'new' ? 'old' : 'new')}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer relative ${
                  viewMode === 'new' ? 'bg-[#701a75] focus:ring-purple-600' : 'bg-[#d1d5db] hover:bg-[#cbd5e1] focus:ring-gray-400'
                }`}
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: viewMode === 'new' ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.25 }}
                />
              </button>

              <span className={`text-[12px] sm:text-[13px] font-basier font-medium tracking-tight transition-colors duration-300 ${viewMode === 'new' ? 'text-[#701a75] font-semibold' : 'text-gray-400'}`}>
                New
              </span>
            </div>
          </div>

          {/* Shorter Background Container with Overlapping Mockup */}
          <div className="relative w-full flex items-center justify-center py-6 sm:py-10">
            {/* Shorter Backdrop Card */}
            <div 
              className="absolute inset-x-2 sm:inset-x-8 top-1/2 -translate-y-1/2 h-[260px] sm:h-[320px] md:h-[360px] rounded-[22px] sm:rounded-[30px] border border-black/10 shadow-sm overflow-hidden bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${orangeBg})` }}
            />

            {/* Phone Mockup Protruding above and below shorter backdrop with Glitch-Free Stacked Crossfade */}
            <div className="relative z-10 w-full max-w-[270px] sm:max-w-[310px] md:max-w-[330px] aspect-[576/1024]">
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
              <motion.a
                href={newMockupPurple}
                target="_blank"
                rel="noreferrer"
                aria-label="Open full-size new purple mockup"
                initial={false}
                animate={{
                  opacity: viewMode === 'new' ? 1 : 0,
                  scale: viewMode === 'new' ? 1 : 0.985,
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: viewMode === 'new' ? 'auto' : 'none' }}
                className="absolute inset-0 block cursor-zoom-in will-change-transform z-10 transform-gpu"
              >
                <img 
                  src={newMockupPurple} 
                  alt="Ryzeup New Mobile Experience Mockup (Purple)" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] mx-auto" 
                  loading="eager"
                />
              </motion.a>

              {/* Old Orange Mockup */}
              <motion.a
                href={oldMockupOrange}
                target="_blank"
                rel="noreferrer"
                aria-label="Open full-size old orange mockup"
                initial={false}
                animate={{
                  opacity: viewMode === 'old' ? 1 : 0,
                  scale: viewMode === 'old' ? 1 : 0.985,
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: viewMode === 'old' ? 'auto' : 'none' }}
                className="absolute inset-0 block cursor-zoom-in will-change-transform z-10 transform-gpu"
              >
                <img 
                  src={oldMockupOrange} 
                  alt="Ryzeup Old Interface Reference Mockup (Orange)" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] mx-auto" 
                  loading="eager"
                />
              </motion.a>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Main Narrative Article Container */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* 1. EXECUTIVE SNAPSHOT                                         */}
        {/* ------------------------------------------------------------- */}
        <section id="section-background" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Executive Snapshot
            </h2>
          </ScrollReveal>
          
          {/* Scope & Outcome Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              <div className="col-span-1">Dimension</div>
              <div className="col-span-2">Overview</div>
            </div>
            
            <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div className="col-span-1">
                  <strong className="text-gray-900 block font-basier font-medium">Scope</strong>
                </div>
                <div className="col-span-2 text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  Organization entry, Wall, post creation, Field Q&A, search, notifications, Buzz, and reportee selection
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div className="col-span-1">
                  <strong className="text-gray-900 block font-basier font-medium">Key Outcome</strong>
                </div>
                <div className="col-span-2 text-gray-900 sm:border-l sm:border-gray-100 sm:pl-4 font-medium">
                  +15% monthly usage increase over 2-month beta period
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
          <div className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] space-y-4 font-switzer font-normal">
            <p>
              I designed Ryzeup to help employees stay informed, share knowledge, and keep track of the updates that matter to their work. For managers, I focused on making it easier to move between personal priorities and an individual team member’s context.
            </p>
          </div>
          </ScrollReveal>

          {/* Central Question Callout */}
          <ScrollReveal delay={0.1} variant="blur">
          <div className="p-4 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
              "How can I bring communication, knowledge discovery, and team follow-up into one mobile experience without making it feel overwhelming?"
            </p>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 2. BUSINESS CONTEXT & THE PROBLEM                             */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Business Context & the Problem
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            A workplace platform needs to support more than publishing updates. Employees need to find information again, ask questions in the right context, and understand what requires their attention. Managers need that same clarity across their teams.
          </p>

          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            I framed the problem around three connected needs:
          </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} variant="scale-up">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
              <div className="p-3.5 sm:p-4">
                <strong className="text-gray-900 block font-basier font-medium mb-1">Find relevant information</strong>
                <span className="text-gray-600">Documents and useful answers should remain accessible after they move down the feed.</span>
              </div>
              <div className="p-3.5 sm:p-4">
                <strong className="text-gray-900 block font-basier font-medium mb-1">Contribute with a clear purpose</strong>
                <span className="text-gray-600">Sharing an update, asking a question, and creating a poll need different structures.</span>
              </div>
              <div className="p-3.5 sm:p-4">
                <strong className="text-gray-900 block font-basier font-medium mb-1">Understand the current context</strong>
                <span className="text-gray-600">Managers should always know whether they are reviewing their own updates or someone else’s.</span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            These needs shaped my approach to the product. I organized the experience around discovering information, contributing knowledge, and reviewing priorities, with clear connections between them.
          </p>

          <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-[11px] sm:text-[12px] font-basier font-medium uppercase tracking-wider text-gray-500 mb-1">My design objective</div>
            <p className="text-[14px] sm:text-[15px] font-basier font-medium text-gray-900">
              Help employees find, share, and act on workplace information while keeping navigation and context understandable on a small screen.
            </p>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 3. USERS & THEIR CORE NEEDS                                   */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Users & Their Core Needs
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
              I designed around the different responsibilities employees bring to the same workspace.
            </p>
          </ScrollReveal>

          {/* User Matrix Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              <div>User</div>
              <div>Core need</div>
              <div>My design response</div>
            </div>
            
            <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User</div>
                  <strong className="text-gray-900 block font-basier font-medium">Field employees and individual contributors</strong>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core need</div>
                  Check updates, retrieve documents, and ask practical questions
                </div>
                <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">My design response</div>
                  A shared feed, structured posts, and search across content types
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User</div>
                  <strong className="text-gray-900 block font-basier font-medium">Regional managers and team leads</strong>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core need</div>
                  Review their own priorities and follow up on a team member’s work
                </div>
                <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">My design response</div>
                  Self/My Team views with a visible selected employee
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User</div>
                  <strong className="text-gray-900 block font-basier font-medium">Subject-matter experts</strong>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core need</div>
                  Answer questions and share useful knowledge
                </div>
                <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">My design response</div>
                  Question threads that keep answers connected to their original context
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">User</div>
                  <strong className="text-gray-900 block font-basier font-medium">Internal communicators</strong>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Core need</div>
                  Publish announcements and supporting documents
                </div>
                <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">My design response</div>
                  Consistent post cards with clear authorship and recognizable attachments
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-[14px] text-gray-700 leading-relaxed font-switzer font-normal">
            The main tension was between discovery and focus. A feed helps employees encounter something useful, but a specific task needs a more direct path. I supported both through browsing filters, categorized search, and explicit team selection.
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 4. INFORMATION ARCHITECTURE & DESIGN STRATEGY                 */}
        {/* ------------------------------------------------------------- */}
        <section id="section-design" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Information Architecture & Design Strategy
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
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
                <span className="font-bold text-gray-900 uppercase">1. ENTER</span>
                <span className="text-gray-600">Verify the organization and sign in within its branded workspace</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-bold text-gray-900 uppercase">2. DISCOVER & CONTRIBUTE</span>
                <span className="text-gray-600">Browse Wall, open a question, or share a post</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-bold text-gray-900 uppercase">3. FIND & RETURN</span>
                <span className="text-gray-600">Search for people, posts, and files, or revisit activity through notifications</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-bold text-gray-900 uppercase">4. REVIEW PRIORITIES</span>
                <span className="text-gray-600">Open Buzz, switch between Self and My Team, and inspect relevant nudges</span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
          <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">
              Make context visible before asking people to act
            </h4>
            <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
              This became the organizing principle for my design decisions. The organization establishes where the employee is working. Post labels communicate the type of content. Search tabs clarify the result category. The selected employee identifies whose updates a manager is reviewing.
            </p>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 5. KEY DESIGN DECISIONS                                       */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-10 sm:space-y-12 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Key Design Decisions
            </h2>
          </ScrollReveal>

          {/* Decision A */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              A. Establish Organization Context at Entry
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              <strong className="text-gray-900 font-medium">The challenge:</strong> Employees need to recognize the workspace they are entering before they continue to sign in.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              I separated organization verification from login. The entry screen asks for an organization code, shows a verification state, and leads into an organization-branded login. A Change Org Code option provides a route back when the user needs a different workspace.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              This makes organization selection an explicit step and carries that identity into the next screen.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
              src1={mockupOrg} 
              alt1="Organization Code Verification Screen" 
              src2={mockupLogin} 
              alt2="Branded Workspace Sign In" 
            />

          {/* Decision B */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              B. Give Workplace Communication a Consistent Structure
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              <strong className="text-gray-900 font-medium">The challenge:</strong> A shared feed needs to accommodate announcements, documents, and conversations without becoming difficult to scan.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              I designed Wall around a consistent card structure, with recognizable authorship, content, attachments, and engagement actions. Category chips and sorting options provide ways to narrow the feed.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              For contribution, I explored formats for discussions, questions, success stories, and polls. Each format supports a different intention: a poll needs choices and a duration, while a question needs an answer thread.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              The tradeoff is composer complexity. My priority was to give each format enough structure to be useful while maintaining familiar interactions across them.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
              src1={mockupWall} 
              alt1="Wall Workplace Feed and Card Structure" 
              src2={mockupPoll} 
              alt2="Interactive Poll & Structured Post Creation" 
            />

          {/* Decision C */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              C. Make Knowledge Retrievable Beyond the Feed
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              <strong className="text-gray-900 font-medium">The challenge:</strong> Employees should not have to remember who shared a file or when a question was posted to find it again.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              I organized search into <strong className="text-gray-900 font-medium">All, Profiles, Posts, and Files</strong>. Users can start with a broad query and narrow the results according to what they need. File rows show the filename, format, size, recency, and a download affordance.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              I also included recent searches, suggested topics, and a no-results recovery state. These help users begin a search or adjust it when the first attempt does not work.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Field Q&A keeps responses attached to the original question, preserving the context that makes an answer useful. Together, search and threaded answers support both immediate questions and later retrieval.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
              src1={mockupSearch} 
              alt1="Categorized Search with Filters" 
              src2={mockupFiles} 
              alt2="Files & Document Repository View" 
            />

          {/* Decision D */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              D. Separate Personal and Team Priorities
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              <strong className="text-gray-900 font-medium">The challenge:</strong> Managers need to switch between their own updates and team follow-up without losing track of whose information is displayed.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              I designed Buzz with <strong className="text-gray-900 font-medium">Self</strong> and <strong className="text-gray-900 font-medium">My Team</strong> views. Within My Team, the selected employee remains visible above the update cards.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Nudge cards bring together importance labels, timestamps, and task details such as deadlines or progress. Expanded details accommodate longer lists without putting every item into the initial view.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              The design balances scanability with depth: the overview helps users identify relevant updates, while the detail view provides more context when needed.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
              src1={mockupBuzz} 
              alt1="Buzz Self View with Priorities" 
              src2={mockupNudge} 
              alt2="Expanded Nudge Card and Action Details" 
            />

          {/* Decision E */}
          <ScrollReveal className="space-y-3">
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900">
              E. Support Different Ways to Find a Reportee
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              <strong className="text-gray-900 font-medium">The challenge:</strong> Managers may know a person’s name, their department, or their place in the reporting structure. A single selection method may not serve all three situations.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              I explored direct search, flat lists, department groups, and hierarchical browsing. Breadcrumbs maintain orientation in deeper structures, while selection controls and confirmation distinguish browsing from changing the active employee.
            </p>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              These explorations reflect a practical tradeoff. Search offers a direct route to a known person; organizational browsing helps when the relationship is clearer than the name. The appropriate balance depends on the size and structure of the team.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
              src1={mockupReportee} 
              alt1="Reportee Selection and Directory Browsing" 
              src2={mockupMyTeam} 
              alt2="My Team View with Selected Employee Context" 
            />
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 6. DESIGNING WITHIN A TWO-MONTH BUILD                         */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Designing Within a Two-Month Build
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            The product was built in two months. Within that timeframe, I kept the case study’s core experience focused on organization entry, communication, retrieval, and team follow-up.
          </p>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            I used a recurring visual language of magenta accents, light surfaces, rounded cards, segmented controls, and bottom navigation. Repeated patterns give different parts of the product a familiar structure.
          </p>

          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            The most important design considerations were:
          </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Consistency</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Similar actions should look and behave predictably across feeds, search, and team views.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Content density</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Long filenames, employee names, and task lists need a clear hierarchy on mobile.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Interaction states</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Verification, selection, empty results, and expanded content need as much clarity as the default screen.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Scope</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Core workplace tasks need a coherent experience before adding greater feature depth.
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

          <ScrollReveal delay={0.06}>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            The two-month build made prioritization important. My focus was on how the key journeys connected and whether users could retain context as they moved between them.
          </p>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 7. BETA RELEASE & RESULTS                                     */}
        {/* ------------------------------------------------------------- */}
        <section id="section-results" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Beta Release & Results
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
              Ryzeup was released in beta to one team after the two-month build.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
          <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-gray-50">
            <div className="text-[20px] sm:text-[22px] font-basier font-medium text-gray-900">
              Monthly usage increased by 15% over the following two months.
            </div>
            <p className="text-[13px] sm:text-[14px] text-gray-600 mt-2 leading-relaxed font-switzer font-normal">
              This was an encouraging early signal of growing use within the beta team. It gave me a basis for continuing to refine the experience around the work employees were returning to perform.
            </p>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            I treat this as a product-level usage result. It does not, on its own, identify which design decision drove the increase or establish improvements in task speed or productivity.
          </p>

          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            For the next stage, I would pair usage data with task-level evaluation:
          </p>
          </ScrollReveal>

          {/* Measurement Table */}
          <ScrollReveal delay={0.1}>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              Area & What I Would Measure Next
            </div>
            <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Search</strong>
                <span className="col-span-2 text-gray-600">Success and time taken to find a specific document</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Contribution</strong>
                <span className="col-span-2 text-gray-600">Completion of a question or post with an attachment</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Team context</strong>
                <span className="col-span-2 text-gray-600">Correct reportee selection and ability to locate a pending item</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Knowledge exchange</strong>
                <span className="col-span-2 text-gray-600">Time to a useful answer and the share of unanswered questions</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Notifications</strong>
                <span className="col-span-2 text-gray-600">Whether an update helps users return to relevant work</span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            This would help explain the usage trend and identify where further design improvements could have the greatest value.
          </p>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 8. REFLECTION & NEXT STEPS                                    */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Reflection & Next Steps
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
          <div className="space-y-4">
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            Ryzeup reinforced the importance of connecting information with the context needed to use it. A feed, search function, and team view each serve a purpose, but their value depends on how clearly people can move between them.
          </p>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            My strongest design focus was making that context visible: the organization at entry, the content type in the feed, the result category in search, and the selected employee in team follow-up.
          </p>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            The beta release and 15% increase in monthly usage provide a positive starting point. My next priority would be to understand which journeys bring people back, refine the points where they hesitate, and use those findings to guide the next release.
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
