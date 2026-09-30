import React, { useEffect, useRef } from 'react';
import { ArrowLeft, User, GraduationCap, Building2 } from 'lucide-react';
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

const AHAMX_SECTIONS = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-problem', label: 'Problem & Pivot' },
  { id: 'section-insights', label: 'User Gaps & JTBD' },
  { id: 'section-strategy', label: 'Strategic Layers' },
  { id: 'section-systems', label: 'State & System Logic' },
  { id: 'section-craft', label: 'Visual Interface' },
  { id: 'section-impact', label: 'Impact & Retrospective' },
];

// Clean Single Mockup Frame with Scroll Parallax (No asset link on click)
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
        className="w-full rounded-[16px] sm:rounded-[24px] p-2 sm:p-6 md:p-10 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${mockupBg})` }}
      >
        <motion.div style={{ y: innerY }}>
          <div className="rounded-[10px] sm:rounded-[18px] overflow-hidden shadow-xl border border-black/10 bg-white">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto object-cover block pointer-events-none" 
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

// Clean Side-by-side Dual Mockup Frame with Staggered Scroll Parallax (No asset links on click)
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
        className="w-full rounded-[16px] sm:rounded-[24px] p-2 sm:p-6 md:p-10 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${mockupBg})` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <motion.div style={{ y: innerY1 }}>
            <div className="rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-lg border border-black/10 bg-white">
              <img src={src1} alt={alt1} className="w-full h-auto object-cover block pointer-events-none" loading="lazy" />
            </div>
          </motion.div>
          <motion.div style={{ y: innerY2 }}>
            <div className="rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-lg border border-black/10 bg-white">
              <img src={src2} alt={alt2} className="w-full h-auto object-cover block pointer-events-none" loading="lazy" />
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

export default function CaseStudyAhamX({ onBack, isRevealed = true }) {
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => window.lenis?.resize());
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 220]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.08]);

  return (
    <div className="relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-switzer font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
      {/* Top Sticky Reading Progress Bar & Floating Back-To-Top Button */}
      <CaseStudyScrollProgress />

      {/* Floating Right-Side Section Indicator & Smooth Nav */}
      <CaseStudyScrollNav sections={AHAMX_SECTIONS} />
      
      {/* Subtle animated gradient header background */}
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
          className="text-[32px] sm:text-[44px] md:text-[52px] font-seasons font-normal text-[#111827] leading-[1.15] sm:leading-[1.1] tracking-[-0.02em] pt-6 sm:pt-8"
        >
          AhamX — Continuous Learning & Capability Intelligence Platform
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[19px] md:text-[21px] text-[#4b5563] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal italic"
        >
          Connecting the learner, the creator, and the organization in one cohesive, human-in-the-loop experience.
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
              6 Members
            </div>
            <div className="text-[12px] text-gray-500 font-normal">1 Lead, 4 Eng, 1 AI</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Timeline</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              3 Months
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Shipped to Prod</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platforms</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1">
              Web & Mobile
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Responsive System</div>
          </div>
          <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
            <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Milestone</div>
            <div className="text-[13px] sm:text-[14px] font-switzer font-medium text-[#111827] mt-1 leading-snug">
              IndiaAI Summit '26
            </div>
            <div className="text-[12px] text-gray-500 font-normal">Google & ARTPARK</div>
          </div>
        </motion.div>

      </header>

      {/* Hero Mockup Frame */}
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1040px] mx-auto px-3 sm:px-6"
      >
        <MockupFrame 
          src={mockup0} 
          alt="Clean hero frame showing responsive AhamX interface across Desktop and Mobile viewports" 
        />
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
                <strong>AhamX (by ZenteiQ)</strong> is an individual digital twin architecture for capability development, learning continuity, and organizational intelligence. I led the end-to-end UX/UI design across desktop and mobile, unifying three disparate user types—learners, educators, and enterprise leads—into a single product system without sacrificing role-specific clarity.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* THE PROBLEM SPACE & STRATEGIC CONTEXT                         */}
        {/* ------------------------------------------------------------- */}
        <section id="section-problem" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The Problem Space & Strategic Context
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal">
              In enterprise capability platforms, multi-sided systems frequently collapse under user fatigue:
            </p>
            <ul className="mt-4 space-y-3 font-switzer text-[14.5px] sm:text-[15px] text-[#374151] leading-relaxed pl-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Learners</strong> abandon courses when interruptions force them to reconstruct past study progress.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Educators</strong> hesitate to trust AI generation tools when drafts move automatically to delivery without review gates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Organization Leads</strong> defer institutional relationship requests because notifications arrive stripped of identity and institutional context.</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Strategic Pivot Card - Clean White & Grey */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-gray-200 shadow-xs space-y-2.5">
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400">
                The Strategic Pivot
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-basier font-medium text-gray-900 leading-snug">
                Unified Platform Shell Centered on Contextual Continuity
              </h3>
              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-[1.7] font-switzer font-normal">
                Instead of creating three separate web portals (Student LMS, Creator Studio, and Admin Hub), we engineered a <strong>unified platform shell centered on contextual continuity</strong>. Personal identity remains consistent across the entire platform, while interaction density and primary action bars dynamically adapt to the user's immediate operational responsibility.
              </p>
            </div>
          </ScrollReveal>

          {/* Role Matrix - Clean Balanced Columns with Dividers */}
          <ScrollReveal delay={0.1}>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] font-basier font-medium uppercase tracking-wider text-gray-500">
                Role & Responsibilities Matrix
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-gray-900 font-basier font-medium text-[14px] mb-1.5">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Learner</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                    Frictionless resumption, real-time study checkpoints, and mobile-first commute continuity.
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-gray-900 font-basier font-medium text-[14px] mb-1.5">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <span>Educator / Creator</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                    Staged AI checkpoints, transparent content validation, and explicit readiness telemetry.
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-gray-900 font-basier font-medium text-[14px] mb-1.5">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>Organization Lead</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                    Self-contained relationship rows, context-preserved approval flows, and entity governance.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* THE INITIAL HYPOTHESIS & PRODUCT PIVOT                        */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The Initial Hypothesis & Product Pivot
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">The Assumption</div>
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">All-in-One Modular Dashboard</h4>
                <p className="text-[13.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                  We initially hypothesized that an all-in-one modular dashboard presenting active courses, cohort telemetry, and pending approvals would give all three roles a transparent overview and reduce context switching.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 shadow-xs">
                <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">The Breakdown</div>
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">Severe Cognitive Friction</h4>
                <p className="text-[13.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Early walkthroughs revealed that learners felt paralyzed by administrative metrics, which delayed lesson resumption, while educators were wary of one-click "Generate Course" flows that obscured AI output verification.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* The Breakthrough Insight Quote - Clean Grey Card */}
          <ScrollReveal delay={0.08} variant="blur">
            <div className="p-5 sm:p-7 rounded-xl bg-gray-50 border border-gray-200 space-y-2.5">
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400">
                The Breakthrough Insight
              </div>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-seasons font-normal not-italic text-gray-900 leading-relaxed">
                "A unified design system does not mean uniform cognitive density. Cohesive identity requires role-specific readiness states and clear decision boundaries."
              </p>
              <p className="text-[13px] sm:text-[13.5px] text-gray-600 font-switzer font-normal pt-1 leading-relaxed">
                We decoupled the home surfaces while maintaining a consistent design system shell. Crucially, we shifted from ambiguous, disabled UI elements to <strong>deterministic, explanatory readiness triggers</strong>.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* USER BEHAVIORAL GAPS & FIELD INSIGHTS                         */}
        {/* ------------------------------------------------------------- */}
        <section id="section-insights" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              User Behavioral Gaps & Field Insights
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              To define our Jobs-to-be-Done (JTBD), we mapped user pressures directly against product constraints:
            </p>
          </ScrollReveal>

          {/* JTBD Matrix Table - Balanced Proportions & Clean White/Grey Layout */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] font-basier font-semibold uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-3">Persona Need</div>
                <div className="sm:col-span-4">Operational Friction</div>
                <div className="sm:col-span-5">Design Response</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-[13.5px] font-switzer font-normal">
                {/* Row 1 */}
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Persona Need</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Recovering Context</span>
                    <span className="text-[12px] text-gray-500 block">Learner</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Operational Friction</div>
                    The delivery window favored primary journeys over custom dashboards.
                  </div>
                  <div className="sm:col-span-5 text-gray-800 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Design Response</div>
                    Sticky <strong>"Resume Learning"</strong> card anchoring last active timestamp and module.
                  </div>
                </div>

                {/* Row 2 */}
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Persona Need</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Content Accountability</span>
                    <span className="text-[12px] text-gray-500 block">Educator</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Operational Friction</div>
                    Drafts are generated fast, but need human subject-matter verification.
                  </div>
                  <div className="sm:col-span-5 text-gray-800 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Design Response</div>
                    Staged progression gates: <strong>Outline → Script → Media Synthesis</strong>.
                  </div>
                </div>

                {/* Row 3 */}
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Persona Need</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Institutional Action</span>
                    <span className="text-[12px] text-gray-500 block">Org Lead</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Operational Friction</div>
                    Institutional hierarchy and personal identity coexist within one network.
                  </div>
                  <div className="sm:col-span-5 text-gray-800 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Design Response</div>
                    <strong>Self-contained request rows</strong> pairing identity, cohort, and decision actions.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Voice of the User Quotes - Clean White/Grey Style */}
          <ScrollReveal delay={0.08}>
            <div className="space-y-3 pt-2">
              <h3 className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400">
                Voice of the User
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <blockquote className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/50 text-[14px] sm:text-[14.5px] text-[#374151] leading-relaxed">
                  <p className="italic">
                    "When I open this on my phone during my commute, I don't want to browse the catalog again. I just want to tap exactly where my lesson paused without re-navigating the hierarchy."
                  </p>
                  <footer className="mt-2 text-[11px] font-basier font-medium text-gray-500 uppercase tracking-wider">
                    — Learner Persona
                  </footer>
                </blockquote>

                <blockquote className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/50 text-[14px] sm:text-[14.5px] text-[#374151] leading-relaxed">
                  <p className="italic">
                    "AI drafts a lesson script in seconds, but if it mispronounces a term or hallucinates a citation, my credibility takes the hit. I need a hard checkpoint before anything compiles to video."
                  </p>
                  <footer className="mt-2 text-[11px] font-basier font-medium text-gray-500 uppercase tracking-wider">
                    — Educator Persona
                  </footer>
                </blockquote>

                <blockquote className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/50 text-[14px] sm:text-[14.5px] text-[#374151] leading-relaxed">
                  <p className="italic">
                    "I get a notification to 'Approve Member'. Who is this person? Which cohort are they joining? If I have to open another tab to check, that request sits in my queue for days."
                  </p>
                  <footer className="mt-2 text-[11px] font-basier font-medium text-gray-500 uppercase tracking-wider">
                    — Organization Lead Persona
                  </footer>
                </blockquote>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* STRATEGIC LAYERS OF THE REDESIGN                              */}
        {/* ------------------------------------------------------------- */}
        <section id="section-strategy" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Strategic Layers of the Redesign
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              We mapped the platform into three architectural layers to guarantee continuity, human-in-the-loop verification, and contextual decisions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="space-y-4">
              {/* Layer 1 */}
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                  Learner Workflow
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-basier font-medium text-gray-900 mb-3">
                  The Continuity Layer
                </h3>
                <ul className="space-y-2.5 text-[14px] text-gray-700 leading-relaxed font-switzer font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Zero-Friction Resumption:</strong> Current study and progress data are pinned directly beside personalized recommendations, allowing users to jump back in with a single tap.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Cross-Viewport Durability:</strong> Mobile layouts mirror desktop state hierarchies, preserving scroll depth, video checkpoints, and active sub-topics across screen sizes.</span>
                  </li>
                </ul>
              </div>

              {/* Layer 2 */}
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                  Educator Workflow
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-basier font-medium text-gray-900 mb-3">
                  The Verification Layer
                </h3>
                <ul className="space-y-2.5 text-[14px] text-gray-700 leading-relaxed font-switzer font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Staged AI Checkpoints:</strong> Replaced single-prompt generation with a controlled 3-stage validation pipeline: <em>Course Outline → Script & Narration Review → Synthetic Media Compilation</em>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Readiness-Linked Actions:</strong> Replaced grayed-out disabled states with active blocker telemetry:</span>
                  </li>
                </ul>
                
                {/* Visual Formula / Badge Card - Clean White & Grey */}
                <div className="mt-3.5 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-wrap items-center gap-2.5 text-[13px] text-gray-700">
                  <span className="font-basier font-medium text-gray-900">Action: Publish</span>
                  <span className="text-gray-400">←</span>
                  <span className="px-2 py-0.5 rounded bg-gray-200/80 text-gray-800 text-[11.5px] font-mono">
                    [3 lessons incomplete]
                  </span>
                  <span className="text-[12px] text-gray-500 font-sans italic ml-auto sm:ml-0">
                    Explicit blocker explanation replaces silent disabled states
                  </span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                  Organization Lead Workflow
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-basier font-medium text-gray-900 mb-3">
                  The Contextual Decision Layer
                </h3>
                <ul className="space-y-2.5 text-[14px] text-gray-700 leading-relaxed font-switzer font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Consolidated Decision Rows:</strong> Member affiliation, relationship scope, request date, and binary action controls (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Approve</code> / <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Reject</code>) are bound into a single scannable card.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Relational Integrity:</strong> Institutional leads can approve incoming relationships without navigating away to inspect identity profiles.</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* SYSTEMS THINKING, STATE LOGIC & EDGE CASES                    */}
        {/* ------------------------------------------------------------- */}
        <section id="section-systems" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Systems Thinking, State Logic & Edge Cases
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              A production-ready design system must account for system stress, data latency, and edge states.
            </p>
          </ScrollReveal>

          {/* State & Dependency Pipeline - Balanced 3-Column White & Grey Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-[11px] font-basier font-semibold uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-4">State & Trigger</div>
                <div className="sm:col-span-4">Interface Behavior</div>
                <div className="sm:col-span-4">System Rule / Recovery</div>
              </div>
              <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Incomplete Readiness</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Interface Behavior</div>
                    Publish action disabled; badge counts pending items (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-mono">[3 incomplete]</code>).
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-[12.5px]">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">System Rule / Recovery</div>
                    Prevents premature publishing; clicking focuses missing required assets.
                  </div>
                </div>

                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Synthesis Failure</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Interface Behavior</div>
                    Non-destructive retry dialog preserves reviewed script and source inputs.
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-[12.5px]">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">System Rule / Recovery</div>
                    Revision cached locally and server-side; zero content loss on timeouts.
                  </div>
                </div>

                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Concurrent Mutation</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Interface Behavior</div>
                    Optimistic UI response with idempotent server-state confirmation.
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-[12.5px]">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">System Rule / Recovery</div>
                    If modified in another tab, row transitions immediately with passive status toast.
                  </div>
                </div>

                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-[13.5px]">Connection Drop</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Interface Behavior</div>
                    Local playback state persistence during commute network drops.
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-[12.5px]">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">System Rule / Recovery</div>
                    Stores exact second mark; syncs silently with exponential backoff on reconnect.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Architectural Trade-offs Grid - Clean White & Grey Cards */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1.5">Contextual Density vs. Simplicity</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Kept active courses and recommendations grouped together so learners resume immediately without re-exploring catalogs.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1.5">Multi-stage AI vs. 1-Click</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Traded instant publishing for staged human checkpoints (Outline → Script → Media), securing institutional credibility.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1.5">Consolidated Decision Rows</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Packaged requester identity, relationship scope, and binary approval actions in one row, eliminating tab-switching.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 text-[13.5px] text-gray-700 font-switzer font-normal">
              <strong className="text-gray-900 font-basier font-medium">Technical Alignment Note: </strong>
              Readiness rules, draft durability, and request authorization were co-designed with engineering. The user interface and underlying backend state always agree deterministically on what has occurred.
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* VISUAL INTERFACE & DESIGN SYSTEM                              */}
        {/* ------------------------------------------------------------- */}
        <section id="section-craft" className="space-y-10 sm:space-y-12 scroll-mt-28">
          <ScrollReveal>
            <div>
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
                Visual Interface & Platform Walkthrough
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] mt-2 font-switzer font-normal">
                A cohesive design system connecting the product shell, with interaction density tailored to the user's operational responsibility.
              </p>
            </div>
          </ScrollReveal>

          {/* Feature 1: The Continuity Layer (Learner & Org Overview) */}
          <ScrollReveal>
            <h3 className="text-[17px] sm:text-[19px] font-basier font-medium text-gray-900 mb-1.5">
              The Continuity Layer — Learner & Organization Dashboards
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-switzer font-normal">
              Active courses, progress checkpoints, and personalized recommendations are placed side-by-side. The same design system shell scales gracefully to provide aggregate cohort analytics for organization leads.
            </p>
            <DualMockupFrame 
              src1={mockup0} 
              alt1="Learner Dashboard: Current courses sit beside profile completion and activity."
              src2={mockup1} 
              alt2="Organization Dashboard: Summary cards and recent activity support oversight."
            />
          </ScrollReveal>

          {/* Feature 2: Community Context & Identity */}
          <ScrollReveal>
            <h3 className="text-[17px] sm:text-[19px] font-basier font-medium text-gray-900 mb-1.5">
              Community Feed & Personal Identity Profiles
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-switzer font-normal">
              Community discussions clearly attribute authorship and role context. The individual digital twin profile provides a consolidated view of background, achievements, and capabilities.
            </p>
            <DualMockupFrame 
              src1={mockup2} 
              alt1="Community Feed: Authorship and role context accompany every post."
              src2={mockup3} 
              alt2="Personal Profile: Capability twin, background, and activity in one view."
            />
          </ScrollReveal>

          {/* Feature 3: The Verification Layer (AI Creator Studio) with Embedded 60fps Micro-interaction Video */}
          <ScrollReveal>
            <h3 className="text-[17px] sm:text-[19px] font-basier font-medium text-gray-900 mb-1.5">
              The Verification Layer — AI Course Outline & Script Review
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-switzer font-normal">
              The curriculum outline exposes structural readiness and blocker counts. Review continues through script editing, narration pacing, and synthetic media generation, keeping human expertise at the center.
            </p>
            <DualMockupFrame 
              src1={mockup4} 
              alt1="Course Outline: Readiness count and Publish action state explain incomplete work."
              src2={mockup5} 
              alt2="Creator Studio: Script & narration validation checkpoint."
            />
            
            {/* Embedded 60fps Silent Looping Video Recording */}
            <MicroInteractionVideo
              mp4Src="/videos/verification-blocker-jump.mp4"
              webmSrc="/videos/verification-blocker-jump.webm"
              title="verification_blocker_jump.mp4"
              caption="Clicking the [3 lessons incomplete] blocker count immediately jumps the view to the pending draft lesson with clear focus styling, eliminating manual navigation."
            />
          </ScrollReveal>

          {/* Feature 4: Reusable Material & Cohorts */}
          <ScrollReveal>
            <h3 className="text-[17px] sm:text-[19px] font-basier font-medium text-gray-900 mb-1.5">
              Asset Library & Capability Distribution
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-switzer font-normal">
              A centralized asset repository enables rapid curriculum authoring, tagging, and cross-course modular distribution across corporate cohorts.
            </p>
            <MockupFrame 
              src={mockup9} 
              alt="AhamX Asset Library and Module Repository" 
            />
          </ScrollReveal>

          {/* Feature 5: The Contextual Decision Layer with Embedded 60fps Micro-interaction Video */}
          <ScrollReveal>
            <h3 className="text-[17px] sm:text-[19px] font-basier font-medium text-gray-900 mb-1.5">
              The Contextual Decision Layer — Organization Network & Hierarchy
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-switzer font-normal">
              Relationship rows bind identity, department, date, and inline actions (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Approve</code> / <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Reject</code>) into a single scannable view, backed by a structural organizational map.
            </p>
            <MockupFrame 
              src={mockup11} 
              alt="Organization Network and Member Relationship Approvals" 
            />

            {/* Embedded 60fps Silent Looping Video Recording */}
            <MicroInteractionVideo
              mp4Src="/videos/contextual-decision-action.mp4"
              webmSrc="/videos/contextual-decision-action.webm"
              title="contextual_decision_action.mp4"
              caption="Self-contained relationship rows allow enterprise leads to inspect institutional context and confirm affiliation immediately without navigating away to inspect separate profiles."
            />
          </ScrollReveal>

          {/* Validation & Standards */}
          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">State Behavior as First-Class UI</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  All shared components feature distinct hover, active, disabled, loading, and fallback states. Status tags always pair clear explanatory text with accessible cues.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">WCAG 2.1 AA Accessibility</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Tested with 4.5:1 text contrast ratios, visible keyboard focus rings, semantic landmark structures, ARIA live announcements for state updates, and narrow-viewport reflow down to 320px.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* IMPACT, MILESTONES & RETROSPECTIVE                            */}
        {/* ------------------------------------------------------------- */}
        <section id="section-impact" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Impact, Milestones & Retrospective
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              Shipped as a production-grade system and validated on national innovation stages.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">Delivery Velocity</div>
                <div className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-1">Shipped in 3 Months.</div>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Led end-to-end design across learner, creator, and organization surfaces for desktop and mobile as sole designer in an agile pod.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[10px] sm:text-[11px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-1">Public Recognition</div>
                <div className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-1">IndiaAI Impact Summit 2026.</div>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Featured at the Google and ARTPARK pavilions, demonstrating scalable digital twin technology for capability development.
                </p>
              </div>
            </div>

            {/* Evaluation & Measurement Framework - Concrete Trial & Baseline Metrics */}
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
                    Can a learner resume study without manual search?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Average time-to-resume
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    Reduced from ~45s across catalogs to &lt;4s via sticky hero hook (91% drop)
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Does an educator understand content readiness?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Review & blocker telemetry
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    0 unverified courses published across 40+ pilot modules
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mb-0.5">Evaluation Focus</div>
                    Can a lead act on a request in context?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Observation Metric</div>
                    Decision speed & comprehension
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-mono text-[12px] sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden text-[10px] font-basier font-medium uppercase tracking-wider text-gray-400 mt-1 mb-0.5">Trial / Baseline Data</div>
                    94% single-session turnaround; 0 secondary profile lookups required
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200 text-[15px] sm:text-[16px] font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
              "The outline taught me to pair every blocked action with a visible readiness count, so an unavailable state is always accompanied by an actionable explanation."
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Continuous Validation</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Continuously observing how users pick up where they left off, inspect AI draft variations, and navigate institutional approvals to eliminate friction.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] text-gray-900 mb-1">Next Phase Capabilities</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Extending contextual guidance and deeper analytics between learning mastery, competency mapping, and workforce mobility.
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
