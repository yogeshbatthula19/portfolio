import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CaseStudyScrollNav from './CaseStudyScrollNav';
import CaseStudyScrollProgress from './CaseStudyScrollProgress';
import ScrollReveal from './ScrollReveal';
import ThankYouEnvelope from './ThankYouEnvelope';

import mockupBg from './assets/mockup_bg.jpg';
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.png';

// Extracted authentic 1440x1024 AhamX UI mockups
import mockup0 from './assets/case_mockups/mockup_0_1440x1024.png';
import mockup1 from './assets/case_mockups/mockup_1_1440x1024.png';
import mockup2 from './assets/case_mockups/mockup_2_1440x1024.png';
import mockup3 from './assets/case_mockups/mockup_3_1440x1024.png';
import mockup4 from './assets/case_mockups/mockup_4_1440x1024.png';
import mockup5 from './assets/case_mockups/mockup_5_1440x1024.png';
import mockup9 from './assets/case_mockups/mockup_9_1440x1024.png';
import mockup11 from './assets/case_mockups/mockup_11_1440x1024.png';

// Clean Single Mockup Frame with Gradient Background and Scroll Parallax
function MockupFrame({ src, alt }) {
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
        className="w-full rounded-[16px] sm:rounded-[24px] p-2 sm:p-6 md:p-10 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${mockupBg})` }}
      >
        <motion.div style={{ y: innerY }}>
          <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt}`} className="block cursor-zoom-in rounded-[10px] sm:rounded-[18px] overflow-hidden shadow-2xl border border-black/15 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-cover block" 
              loading="lazy"
            />
          </a>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

// Clean Side-by-side Dual Mockup Frame with Gradient Background and Staggered Scroll Parallax
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
        className="w-full rounded-[16px] sm:rounded-[24px] p-2 sm:p-6 md:p-10 border border-black/10 shadow-sm relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${mockupBg})` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <motion.div style={{ y: innerY1 }}>
            <a href={src1} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt1}`} className="block cursor-zoom-in rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-xl border border-black/15 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]">
              <img src={src1} alt={alt1} className="w-full h-auto object-cover block" loading="lazy" />
            </a>
          </motion.div>
          <motion.div style={{ y: innerY2 }}>
            <a href={src2} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt2}`} className="block cursor-zoom-in rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-xl border border-black/15 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]">
              <img src={src2} alt={alt2} className="w-full h-auto object-cover block" loading="lazy" />
            </a>
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function CaseStudyAhamX({ onBack, isRevealed = true }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 220]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.08]);

  return (
    <div className="relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-switzer font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
      {/* Top Sticky Reading Progress Bar & Floating Back-To-Top Button */}
      <CaseStudyScrollProgress />

      {/* Floating Right-Side Section Indicator & Smooth Nav */}
      <CaseStudyScrollNav />
      
      {/* Animated gradient header background that moves gracefully on scroll */}
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
          Learning, with continuity.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[19px] md:text-[21px] text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal"
        >
          Connecting the learner, the creator and the organization in one thoughtful experience.
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
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">3 months</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platforms</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">Desktop + Mobile</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Product Org</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-normal text-[#111827] mt-0.5 sm:mt-1">ZenteiQ</div>
          </div>
        </motion.div>

      </header>

      {/* Hero Mockup with User's Gradient Background */}
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1040px] mx-auto px-3 sm:px-6"
      >
        <MockupFrame 
          src={mockup0} 
          alt="AhamX Learner Dashboard" 
        />
      </motion.div>

      {/* Main Narrative Article Container */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE SUMMARY                                             */}
        {/* ------------------------------------------------------------- */}
        <section id="section-background" className="space-y-4 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[26px] sm:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Three responsibilities. One connected product.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
          <div className="text-[16px] text-[#374151] leading-[1.8] space-y-4 font-switzer font-normal">
            <p>
              I designed the learner, creator and organization flows across desktop and mobile. AhamX connects learning progress, AI-assisted lesson review and relationship requests. My focus was making the next step clear without losing the context of the person, lesson or organization.
            </p>
            <p>
              ZenteiQ describes AhamX as an individual digital twin for capability, learning and deployment intelligence. This case study focuses on its learning experience: continuing a course, creating teaching material and acting within an organization.
            </p>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* PROBLEM & CONSTRAINTS                                         */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Too much to remember.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            Each role brings a different responsibility. A learner needs to pick up unfinished work. An educator needs to trust what they publish. An organization lead needs to understand a request before acting.
          </p>
          </ScrollReveal>

          {/* User Pressure vs Constraint Table */}
          <ScrollReveal delay={0.08} variant="scale-up">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="hidden sm:grid sm:grid-cols-2 bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              <div>User Pressure</div>
              <div>Business & Product Constraint</div>
            </div>
            
            <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3.5 sm:p-4 gap-2 sm:gap-4">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">User Pressure</div>
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Recovering context</strong>
                  <span className="text-gray-600">Returning to a lesson should not require reconstructing the last study session.</span>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-2 mb-1">Business & Product Constraint</div>
                  The short delivery window favored connected primary journeys over additional customization.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3.5 sm:p-4 gap-2 sm:gap-4">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">User Pressure</div>
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Taking responsibility for AI output</strong>
                  <span className="text-gray-600">A draft can be generated quickly, but its accuracy still needs human judgment.</span>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-2 mb-1">Business & Product Constraint</div>
                  Lesson content, narration and media need visible review points before publication.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 p-3.5 sm:p-4 gap-2 sm:gap-4">
                <div>
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">User Pressure</div>
                  <strong className="text-gray-900 block font-basier font-medium mb-1">Acting for an organization</strong>
                  <span className="text-gray-600">The person deciding needs to understand who is asking and what relationship is requested.</span>
                </div>
                <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-2 mb-1">Business & Product Constraint</div>
                  Personal identity and organization context coexist within one product.
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Central Question Callout */}
          <ScrollReveal delay={0.1} variant="blur">
          <div className="p-4 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
              "How can each screen explain where I am, what is ready and what I can do next?"
            </p>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* DISCOVERY & JTBD                                              */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Start with the job. Then shape the interface.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
              The working role model centers on tasks and responsibilities. These job statements guide discovery; they are hypotheses rather than interview quotations.
            </p>
          </ScrollReveal>

          {/* JTBD Matrix */}
          <ScrollReveal delay={0.06} variant="scale-up">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              <div className="col-span-1">Role</div>
              <div className="col-span-2">Job To Be Done</div>
            </div>
            
            <div className="divide-y divide-gray-100 text-[14px] font-switzer font-normal">
              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div className="col-span-1">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Role</div>
                  <strong className="text-gray-900 block font-basier font-medium">Learner</strong>
                  <span className="text-[12px] text-gray-500">Returning after an interruption, on phone or desktop.</span>
                </div>
                <div className="col-span-2 text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Job To Be Done</div>
                  Find my current learning and the next useful step without reconstructing my progress.
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div className="col-span-1">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Role</div>
                  <strong className="text-gray-900 block font-basier font-medium">Educator / Creator</strong>
                  <span className="text-[12px] text-gray-500">Preparing material and remaining accountable.</span>
                </div>
                <div className="col-span-2 text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Job To Be Done</div>
                  Review and improve AI-generated content before sharing it with a cohort.
                </div>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-3 p-3.5 sm:p-4 gap-1.5 sm:gap-2">
                <div className="col-span-1">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Role</div>
                  <strong className="text-gray-900 block font-basier font-medium">Organization Lead</strong>
                  <span className="text-[12px] text-gray-500">Overseeing relationships for an institution.</span>
                </div>
                <div className="col-span-2 text-gray-700 sm:border-l sm:border-gray-100 sm:pl-4">
                  <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1.5 mb-0.5">Job To Be Done</div>
                  Understand the requester and relationship before approving or rejecting the request.
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} variant="scale-up">
          <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50">
            <div className="text-[11px] sm:text-[12px] font-basier font-medium uppercase tracking-wider text-gray-500 mb-1">The Principle</div>
            <p className="text-[14px] sm:text-[15px] font-basier font-medium text-gray-900">
              Keep identity consistent, while making the current responsibility visible. A shared product should not force every role to scan the same information.
            </p>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* SYSTEM LOGIC                                                  */}
        {/* ------------------------------------------------------------- */}
        <section id="section-design" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Map the connections before adding detail.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
              Progress, creation and organization relationships share context, but follow different paths. This experience map makes those journeys and their decision points explicit.
            </p>
          </ScrollReveal>

          {/* Product Experience Map Container */}
          <ScrollReveal delay={0.06} variant="scale-up">
          <div className="p-4 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 shadow-sm">
            <div className="text-[11px] font-basier font-medium uppercase tracking-widest text-gray-400">
              Product Experience Map
            </div>
            
            <div className="space-y-3 font-mono text-[12px] sm:text-[13px]">
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-bold text-gray-900 uppercase">LEARN</span>
                <span className="text-gray-600">Dashboard → Current course → Lesson & progress</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-bold text-gray-900 uppercase">CREATE</span>
                <span className="text-gray-600">Course outline → Content & script → Audio & video</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-bold text-gray-900 uppercase">ORGANIZE</span>
                <span className="text-gray-600">Entity context → Incoming request → Approve / Reject</span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} variant="scale-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Make readiness explicit.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                The outline places a readiness count beside Publish. When lessons are incomplete, the count gives the unavailable action an explanation.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Keep decisions in context.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                The request row carries the identity, relationship and available actions together. The person deciding does not need to reconstruct the request from separate views.
              </p>
            </div>
          </div>
          </ScrollReveal>

          {/* Acceptance Criteria Table */}
          <ScrollReveal delay={0.1} variant="scale-up">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mt-4 shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              The state is part of the experience (Acceptance Criteria)
            </div>
            <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Lessons are not ready</strong>
                <span className="text-gray-600">Show what remains beside Publish.</span>
                <span className="text-gray-500 font-mono text-[12px]">What makes a lesson ready, and what invalidates that state?</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">AI generation fails</strong>
                <span className="text-gray-600">Offer a recoverable retry without replacing reviewed work.</span>
                <span className="text-gray-500 font-mono text-[12px]">How are jobs, retries and saved revisions identified?</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">A request changes elsewhere</strong>
                <span className="text-gray-600">Refresh its status and prevent repeat action.</span>
                <span className="text-gray-500 font-mono text-[12px]">How are concurrency and permissions checked?</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">A connection is interrupted</strong>
                <span className="text-gray-600">Preserve context and show whether work was saved.</span>
                <span className="text-gray-500 font-mono text-[12px]">What persistence and reconnection behavior is supported?</span>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* ITERATION & ALIGNMENT                                         */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The trade-offs behind the interface.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
              The choices favored continuity, visible review and decisions attached to their context.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06} variant="scale-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="text-[12px] font-basier font-medium text-gray-400 mb-1">01</div>
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">A denser home.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                I kept progress and recommendations together so learners could see current work and what to explore next.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="text-[12px] font-basier font-medium text-gray-400 mb-1">02</div>
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">More review steps.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                I accepted separate AI stages in exchange for a checkpoint between a generated draft and its delivery as media.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="text-[12px] font-basier font-medium text-gray-400 mb-1">03</div>
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">Compact requests.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                I kept identity, relationship and actions in one row, accepting less detail to make requests easier to compare.
              </p>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} variant="scale-up">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-[13px] sm:text-[14px] text-gray-600 font-switzer font-normal">
            <strong className="text-gray-900 font-basier font-medium">Technical alignment: </strong>
            Readiness rules, draft durability and request authorization are the critical engineering review points. The interface and the underlying state need to agree about what has actually happened.
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* VISUAL CRAFT                                                  */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-10 sm:space-y-12 scroll-mt-24">
          <ScrollReveal>
            <div>
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
                A shared language. Different priorities.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] mt-2 font-switzer font-normal">
                The header, navigation and card patterns connect the product. Within that shell, each workflow puts a different responsibility first.
              </p>
            </div>
          </ScrollReveal>

          {/* Feature 1: Return to Learning */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">Return to learning.</h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Current study and completion information stay close to recommendations. Organization oversight uses the same shell to prioritize aggregate activity.
            </p>
            <DualMockupFrame 
              src1={mockup0} 
              alt1="Learner view: current courses sit beside profile completion and activity."
              src2={mockup1} 
              alt2="Organization view: summary cards and recent activity support oversight."
            />
          </ScrollReveal>

          {/* Feature 2: Know the Person Behind the Contribution */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">Know the person behind the contribution.</h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Community updates pair the contribution with its author. The personal profile adds background and activity in a dedicated view.
            </p>
            <DualMockupFrame 
              src1={mockup2} 
              alt1="Community feed: authorship and role context accompany the post."
              src2={mockup3} 
              alt2="Personal profile: background and activity share one view."
            />
          </ScrollReveal>

          {/* Feature 3: An AI Draft Still Needs an Educator's Judgment */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">An AI draft still needs an educator's judgment.</h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              The outline exposes course structure and readiness. Review continues through lesson content, narration and media, keeping the educator involved at each transformation.
            </p>
            <DualMockupFrame 
              src1={mockup4} 
              alt1="Course structure: readiness count and Publish state explain incomplete work."
              src2={mockup5} 
              alt2="Creator studio script & narration review."
            />
          </ScrollReveal>

          {/* Feature 4: Create Material. Connect it to People. */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">Create material. Connect it to people.</h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              The library and cohorts organize two sides of the same experience: reusable learning material and the groups who learn together.
            </p>
            <MockupFrame 
              src={mockup9} 
              alt="Asset Library" 
            />
          </ScrollReveal>

          {/* Feature 5: People Should Know What They're Approving */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">People should know what they’re approving.</h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              The network brings identity, relationship, date and action into one request. The hierarchy complements that decision view with a structural map.
            </p>
            <MockupFrame 
              src={mockup11} 
              alt="Organization Network" 
            />
          </ScrollReveal>

          {/* Validation & Standards */}
          <ScrollReveal delay={0.06}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-4">
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Behavior is part of the system.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Shared components need explicit selected, disabled, loading and failure states. Status should explain the next action instead of relying on color alone.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Accessibility is a validation task.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Check contrast, focus visibility, keyboard order, status announcements and narrow-screen reflow. These are checks to complete, not a claim of certification.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* RESULTS & RETROSPECTIVE                                       */}
        {/* ------------------------------------------------------------- */}
        <section id="section-results" className="space-y-6 scroll-mt-24">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              From a connected product to a public showcase.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal mt-2">
              The delivery milestone is clear. Product impact needs a separate measurement loop.
            </p>
          </ScrollReveal>
          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] sm:leading-[1.8] font-switzer font-normal">
            The delivery milestone is clear. Product impact needs a separate measurement loop.
          </p>

          <ScrollReveal delay={0.06}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-1">Shipped in three months.</div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-2 leading-relaxed font-switzer font-normal">
                The design scope connected learner, creator and organization flows across desktop and mobile.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-1">IndiaAI Impact Summit 2026.</div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-2 leading-relaxed font-switzer font-normal">
                ZenteiQ publicly identified AhamX at the Google and ARTPARK booths.
              </p>
            </div>
          </div>

          {/* How I'd Measure Confidence Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-gray-50 border-b border-gray-200 p-3 text-[12px] font-basier font-medium uppercase tracking-wider text-gray-600">
              How I’d measure confidence
            </div>
            <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Can a learner resume without help?</strong>
                <span className="text-gray-600">Task success and time to resume</span>
                <span className="text-gray-500 font-mono text-[12px]">To be established</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Does an educator understand readiness?</strong>
                <span className="text-gray-600">Correct next-step identification</span>
                <span className="text-gray-500 font-mono text-[12px]">To be established</span>
              </div>
              <div className="p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                <strong className="text-gray-900 font-basier font-medium">Can a lead explain a request before acting?</strong>
                <span className="text-gray-600">Decision comprehension and errors</span>
                <span className="text-gray-500 font-mono text-[12px]">To be established</span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-[15px] sm:text-[16px] font-seasons font-normal not-italic text-gray-900">
            "The outline taught me to pair a disabled Publish action with a visible readiness count, so the blocker has an explanation."
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Validate the core.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Watch people resume a lesson, identify what remains before Publish and explain a relationship request. Revise the state or hierarchy that causes hesitation.
              </p>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Build beyond launch.</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                Explore more contextual guidance and stronger connections between learning progress, skills and organization context, informed by that validation.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* CREDITS & SOURCES                                             */}
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
