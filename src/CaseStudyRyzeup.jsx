import NextCaseStudy from './NextCaseStudy';
import CaseStudyTldr from './CaseStudyTldr';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Users, MessageSquare, Search, Bell, Layers, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CaseStudyScrollNav from './CaseStudyScrollNav';
import CaseStudyScrollProgress from './CaseStudyScrollProgress';
import ScrollReveal from './ScrollReveal';

import orangeBg from './assets/ryzeup_orange_bg.webp';
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.webp';
import starSparkle from './assets/star_sparkle.webp';
import oldMockupOrange from './assets/ryzeup_redesign/old_orange_mockup.webp';
import newMockupPurple from './assets/ryzeup_redesign/new_purple_mockup.webp';

// 12 Authentic Ryzeup Mockups
import mockupOrg from './assets/Ryzeup mockups /01-organization.webp';
import mockupLogin from './assets/Ryzeup mockups /02-login.webp';
import mockupWall from './assets/Ryzeup mockups /03-wall.webp';
import mockupFieldQA from './assets/Ryzeup mockups /04-field-qa.webp';
import mockupPoll from './assets/Ryzeup mockups /05-poll.webp';
import mockupSearch from './assets/Ryzeup mockups /06-search.webp';
import mockupFiles from './assets/Ryzeup mockups /07-files.webp';
import mockupNotifications from './assets/Ryzeup mockups /08-notifications.webp';
import mockupBuzz from './assets/Ryzeup mockups /09-buzz.webp';
import mockupMyTeam from './assets/Ryzeup mockups /10-my-team.webp';
import mockupNudge from './assets/Ryzeup mockups /11-nudge.webp';
import mockupReportee from './assets/Ryzeup mockups /12-reportee.webp';

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
              decoding="async"
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
                decoding="async"
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
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function CaseStudyRyzeup({ onBack, onNext, isRevealed = true }) {
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => window.lenis?.resize());
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const [viewMode, setViewMode] = useState('new');

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 220]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.08]);

  return (
    <div className="case-study-page relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-basier font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
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
      <header className="max-w-[820px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-6 sm:pb-8">
        
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
          Ryzeup: a calmer way to stay connected at work
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-body sm:text-lead text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal italic"
        >
          A mobile app that brings updates, shared knowledge and team priorities together without overload.
        </motion.p>

        {/* Meta Bar / Project Overview - Clean White & Grey Grid */}
        <motion.p
          id="section-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 pt-4 border-t border-gray-200 text-small text-gray-600 font-basier scroll-mt-28"
        >
          Sole product designer · 2 months · iOS & Android · Beta pilot
        </motion.p>

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
              <span className={`text-caption sm:text-small font-basier font-medium tracking-tight transition-colors ${viewMode === 'old' ? 'text-[#111827] font-medium' : 'text-gray-500'}`}>
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

              <span className={`text-caption sm:text-small font-basier font-medium tracking-tight transition-colors duration-300 ${viewMode === 'new' ? 'text-[#701a75] font-medium' : 'text-gray-500'}`}>
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
                  decoding="async"
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
                  decoding="async"
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
          <CaseStudyTldr accent="#9d174d" rows={[["Problem", "Employees couldn't find information again, and managers lost track of whose updates they were reviewing."], ["My role", "Led the mobile redesign from a blank canvas to a production beta in 2 months."], ["What I changed", "Organization-verified entry, structured feed posts, search across people, posts and files, and a Self / My Team view with a reportee drawer."], ["Result", "+15% monthly usage over a 60-day pilot; switching to a team member's context went from about 28s to under 3s."]]} />
          <ScrollReveal>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="cs-label type-label mb-2">
                Executive Summary
              </h3>
              <p className="cs-body text-body text-[#1f2937] leading-[1.6] font-basier font-normal">
                <strong>Ryzeup</strong> is a workplace app for sharing updates and knowledge and keeping track of team priorities. I led the mobile redesign from scratch: how people enter their organisation, the knowledge feed, search, and the manager’s team drawer. The goal was less switching between screens and more focus on the day’s work.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Executive Snapshot
            </h2>
          </ScrollReveal>
          
          {/* Scope & Outcome Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="col-span-1">Dimension</div>
                <div className="col-span-2">Overview</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="col-span-1">
                    <strong className="text-gray-900 block font-basier font-medium">Product Scope</strong>
                  </div>
                  <div className="col-span-2 text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4 text-small">
                    Organization entry, Wall, post creation, Field Q&A, search, notifications, Buzz, and reportee selection
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div className="col-span-1">
                    <strong className="text-gray-900 block font-basier font-medium">Key Outcome</strong>
                  </div>
                  <div className="col-span-2 text-gray-900 sm:border-l sm:border-gray-100 sm:pl-4 font-medium text-small">
                    +15% monthly usage increase over 2-month beta period
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="cs-body text-body text-[#374151] leading-[1.6] space-y-4 font-basier font-normal">
              <p>
                I designed Ryzeup to help employees stay informed, share knowledge, and keep track of the updates that matter to their work. For managers, I focused on making it easier to move between personal priorities and an individual team member’s context.
              </p>
            </div>
          </ScrollReveal>

          {/* Central Question Callout */}
          <ScrollReveal delay={0.1}>
            <div className="border-t border-gray-200 pt-4 text-body font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Business Context & The Problem
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              A workplace platform needs to support more than publishing updates. Employees need to find information again, ask questions in the right context, and understand what requires their attention. Managers need that same clarity across their teams.
            </p>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-3">
              I framed the problem around three connected needs:
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="p-3.5 sm:p-4">
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Find relevant information</strong>
                  <span className="text-gray-600 text-small">Documents and useful answers should remain accessible after they move down the feed.</span>
                </div>
                <div className="p-3.5 sm:p-4">
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Contribute with a clear purpose</strong>
                  <span className="text-gray-600 text-small">Sharing an update, asking a question, and creating a poll need different structures.</span>
                </div>
                <div className="p-3.5 sm:p-4">
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Understand the current context</strong>
                  <span className="text-gray-600 text-small">Managers should always know whether they are reviewing their own updates or someone else’s.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border-t border-gray-200 pt-4">
              <div className="text-caption font-basier font-medium uppercase tracking-wider text-gray-500 mb-1">Design Objective</div>
              <p className="text-small sm:text-body font-basier font-medium text-gray-900 leading-snug">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              User Groups & Core Needs
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              I designed around the different responsibilities employees bring to the same workspace.
            </p>
          </ScrollReveal>

          {/* User Matrix Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div>User Group</div>
                <div>Core Need</div>
                <div>Design Response</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden type-label mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Field employees and individual contributors</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Core Need</div>
                    Check updates, retrieve documents, and ask practical questions
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Design Response</div>
                    A shared feed, structured posts, and search across content types
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden type-label mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Regional managers and team leads</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Core Need</div>
                    Review their own priorities and follow up on a team member’s work
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Design Response</div>
                    Self/My Team views with a visible selected employee context
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden type-label mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Subject-matter experts</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Core Need</div>
                    Answer questions and share useful operational knowledge
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Design Response</div>
                    Question threads that keep answers connected to their original context
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                  <div>
                    <div className="sm:hidden type-label mb-0.5">User Group</div>
                    <strong className="text-gray-900 block font-basier font-medium">Internal communicators</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Core Need</div>
                    Publish announcements and supporting documents
                  </div>
                  <div className="text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                    <div className="sm:hidden type-label mt-1.5 mb-0.5">Design Response</div>
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              How I organised it
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              I structured the core experience around four activities:
            </p>
          </ScrollReveal>

          {/* 4 Activities Architecture Map */}
          <ScrollReveal delay={0.06}>
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="type-label">
                Core Activities Map
              </div>
              
              <div className="space-y-2.5 font-basier tabular-nums text-caption sm:text-small">
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-900 uppercase">Enter</span>
                  <span className="text-gray-600 font-basier">Verify the organization and sign in within its branded workspace</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-900 uppercase">Discover & Contribute</span>
                  <span className="text-gray-600 font-basier">Browse Wall, open a question, or share a post</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-900 uppercase">Find & Return</span>
                  <span className="text-gray-600 font-basier">Search for people, posts, and files, or revisit activity through notifications</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="font-medium text-gray-900 uppercase">Review Priorities</span>
                  <span className="text-gray-600 font-basier">Open Buzz, switch between Self and My Team, and inspect relevant nudges</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
              <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">
                Make Context Visible Before Asking People to Act
              </h4>
              <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Key design decisions
            </h2>
          </ScrollReveal>

          {/* Decision 1: Organization Context */}
          <ScrollReveal className="space-y-3">
            <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
              Organization Context at Entry
            </h3>
            <p className="text-small sm:text-body text-gray-600 leading-relaxed font-basier font-normal">
              People should know which workspace they’re entering before they sign in. So I split organisation check from login: the first screen verifies the organisation code, shows a clear “verified” state, and then moves into the branded sign-in.
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
            <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
              A feed that stays tidy
            </h3>
            <p className="text-small sm:text-body text-gray-600 leading-relaxed font-basier font-normal">
              A shared feed has to hold announcements, documents and conversations without feeling noisy. I built the Wall on one card layout with clear authorship, attachment previews and light actions. Separate composers for polls and questions keep posts structured from the start.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupWall} 
            alt1="Wall Workplace Feed and Card Structure" 
            src2={mockupPoll} 
            alt2="Interactive Poll & Structured Post Creation" 
          />


          {/* Decision 3: Knowledge Retrieval */}
          <ScrollReveal className="space-y-3">
            <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
              Finding things again
            </h3>
            <p className="text-small sm:text-body text-gray-600 leading-relaxed font-basier font-normal">
              People shouldn’t have to scroll forever or remember who posted a document. Search is split into All, Profiles, Posts and Files, with recent searches and small tags for file size, type and date.
            </p>
          </ScrollReveal>

          <DualMockupFrame 
            src1={mockupSearch} 
            alt1="Categorized Search with Filters" 
            src2={mockupFiles} 
            alt2="Files & Document Repository View" 
          />

          {/* Decision 4: Personal vs team priorities */}
          <ScrollReveal className="space-y-3">
            <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
              Personal vs team priorities
            </h3>
            <p className="text-small sm:text-body text-gray-600 leading-relaxed font-basier font-normal">
              Managers lose track of context when they jump between their own to-dos and team follow-ups. Buzz has clear <strong className="text-gray-900 font-medium">Self</strong> and <strong className="text-gray-900 font-medium">My Team</strong> tabs, and the selected team member stays pinned above the pending items.
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
            <h3 className="cs-subheading text-lead font-basier font-medium text-gray-900">
              Switching between team members
            </h3>
            <p className="text-small sm:text-body text-gray-600 leading-relaxed font-basier font-normal">
              Whether they search by name or browse by department, managers switch between team members in a quick slide-over drawer. The screen underneath keeps its scroll position.
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
        {/* EXECUTION & CRAFT                                             */}
        {/* ------------------------------------------------------------- */}
        <section id="section-execution" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Building it in two months
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              The app went from a blank canvas to a working beta in two months. In that time I set up a simple visual system: magenta accents, light neutral surfaces, rounded cards and accessible bottom sheets.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Consistency</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Actions look and behave predictably across feeds, search results, and manager drawers.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Content Density</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Long document titles, timestamps, and multi-line posts maintain strict vertical rhythm on mobile screens.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Interaction States</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Verification checkpoints, empty states, and error recovery banners receive equal design attention.
                </p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Scope Discipline</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              What changed
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              Ryzeup ran as a 60-day beta pilot in one operations department:
            </p>
          </ScrollReveal>

          {/* Clean Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <ScrollReveal delay={0.08}>
              <div className="border-t border-gray-200 pt-4 text-center">
                <div className="text-h2 sm:text-h1 font-seasons font-normal leading-none" style={{ color: '#9d174d' }}>
                  +15%
                </div>
                <div className="text-small font-basier font-medium text-gray-900 mt-2">
                  Monthly Active Usage
                </div>
                <p className="text-caption text-gray-500 font-basier mt-1">
                  Sustained increase across beta team members.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="border-t border-gray-200 pt-4 text-center">
                <div className="text-h2 sm:text-h1 font-seasons font-normal leading-none" style={{ color: '#9d174d' }}>
                  &lt;3s
                </div>
                <div className="text-small font-basier font-medium text-gray-900 mt-2">
                  Context Switch Latency
                </div>
                <p className="text-caption text-gray-500 font-basier mt-1">
                  Drawer reportee switch vs ~28s manual search.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="border-t border-gray-200 pt-4 text-center">
                <div className="text-h2 sm:text-h1 font-seasons font-normal leading-none" style={{ color: '#9d174d' }}>
                  82%
                </div>
                <div className="text-small font-basier font-medium text-gray-900 mt-2">
                  4-Hour Response Rate
                </div>
                <p className="text-caption text-gray-500 font-basier mt-1">
                  Field Q&A queries resolved within half a shift.
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
                    Can employees retrieve essential files without author knowledge?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Observation Metric</div>
                    Search success & task time
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Trial / Baseline Data</div>
                    91% retrieval success; time dropped from ~48s to &lt;9s
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Can a manager inspect a team member without losing active context?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Observation Metric</div>
                    Context switch latency
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Trial / Baseline Data</div>
                    Reduced from ~28s across external tabs to &lt;3s drawer switch
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Does Field Q&A improve timely operational decision making?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Observation Metric</div>
                    Response turnaround
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Trial / Baseline Data</div>
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Retrospective & Core Takeaways
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.06}>
            <div className="cs-body space-y-4 text-body text-[#374151] leading-[1.6] font-basier font-normal">
              <p>
                Ryzeup showed me that information is only useful with the context to act on it. A feed, search and a team view each do a job, but their value depends on how easily people can move between them.
              </p>
              <p>
                So I put context on screen everywhere: the organisation at entry, the type of post in the feed, the result category in search, and the selected employee in team follow-ups.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">Visibility Precedes Action</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Making it clear whose data you’re looking at, and what state an action is in, reduces hesitation more than any tutorial tooltip.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">State Preservation</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
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
          

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="min-h-11 inline-flex items-center gap-2 text-small font-basier font-medium text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Selected Works</span>
            </button>

            <NextCaseStudy current="ryzeup" onNavigate={onNext} />
          </div>
        </ScrollReveal>

      </main>

    </div>
  );
}
