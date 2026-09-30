import React, { useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldCheck, Sparkles, User, GraduationCap, Building2 } from 'lucide-react';
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
      <CaseStudyScrollNav sections={AHAMX_SECTIONS} />
      
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
      <header className="max-w-[840px] mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-6 sm:pb-8">
        
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

        {/* Meta Bar / Project Overview Table */}
        <motion.div 
          id="section-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 pt-6 pb-6 border-t border-b border-gray-200/80 bg-white/60 backdrop-blur-xs rounded-2xl px-4 sm:px-6 shadow-xs scroll-mt-28"
        >
          <div className="text-[11px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] mb-4">
            Project Overview
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-left">
            <div>
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Role</div>
              <div className="text-[13.5px] font-switzer font-medium text-[#111827] mt-1">
                Product Designer <span className="text-[12px] text-gray-500 block font-normal">(Sole Designer)</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Team</div>
              <div className="text-[13.5px] font-switzer font-medium text-[#111827] mt-1">
                1 Lead, 4 Eng, 1 AI/ML
              </div>
            </div>
            <div>
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Timeline</div>
              <div className="text-[13.5px] font-switzer font-medium text-[#111827] mt-1">
                3 Months <span className="text-[12px] text-emerald-600 block font-normal font-mono">(Shipped)</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Platforms</div>
              <div className="text-[13.5px] font-switzer font-medium text-[#111827] mt-1">
                Responsive Web & Mobile
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
              <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-[#9ca3af]">Key Milestone</div>
              <div className="text-[13px] font-switzer font-medium text-[#0c4731] mt-1 leading-snug">
                IndiaAI Impact Summit 2026
                <span className="text-[11.5px] text-gray-500 block font-normal">(Google & ARTPARK Pavilions)</span>
              </div>
            </div>
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
      <main className="max-w-[780px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE SUMMARY                                             */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <ScrollReveal>
            <div className="p-5 sm:p-7 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs">
              <h3 className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] mb-2">
                Executive Summary
              </h3>
              <p className="text-[15.5px] sm:text-[16.5px] text-[#1f2937] leading-[1.75] font-switzer font-normal">
                <strong>AhamX (by ZenteiQ)</strong> is an individual digital twin architecture for capability development, learning continuity, and organizational intelligence. I led the end-to-end UX/UI design across desktop and mobile, unifying three disparate user types—learners, educators, and enterprise leads—into a single product system without sacrificing role-specific clarity.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 01. THE PROBLEM SPACE & STRATEGIC CONTEXT                     */}
        {/* ------------------------------------------------------------- */}
        <section id="section-problem" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
              01
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The Problem Space & Strategic Context
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="text-[15.5px] sm:text-[16.5px] text-[#374151] leading-[1.75] font-switzer font-normal">
              In enterprise capability platforms, multi-sided systems frequently collapse under user fatigue:
            </p>
            <ul className="mt-4 space-y-3 font-switzer text-[15px] sm:text-[15.5px] text-[#374151] leading-relaxed pl-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Learners</strong> abandon courses when interruptions force them to reconstruct past study progress.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Educators</strong> hesitate to trust AI generation tools when drafts move automatically to delivery without review gates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Organization Leads</strong> defer institutional relationship requests because notifications arrive stripped of identity and institutional context.</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Strategic Pivot Card */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-50/60 border border-gray-200 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-basier font-medium text-emerald-800">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>The Strategic Pivot</span>
              </div>
              <h3 className="text-[17px] sm:text-[19px] font-basier font-medium text-gray-900 leading-snug">
                Unified Platform Shell Centered on Contextual Continuity
              </h3>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#4b5563] leading-[1.7] font-switzer font-normal">
                Instead of creating three separate web portals (Student LMS, Creator Studio, and Admin Hub), we engineered a <strong>unified platform shell centered on contextual continuity</strong>. Personal identity remains consistent across the entire platform, while interaction density and primary action bars dynamically adapt to the user's immediate operational responsibility.
              </p>
            </div>
          </ScrollReveal>

          {/* Role Matrix Diagram */}
          <ScrollReveal delay={0.1}>
            <div className="p-4 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 shadow-xs">
              <div className="text-[11px] font-basier font-medium uppercase tracking-widest text-gray-400">
                Role & Responsibilities Matrix
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-emerald-700 font-medium text-[13px] mb-1">
                    <User className="w-4 h-4" />
                    <span>Learner</span>
                  </div>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                    Frictionless resumption, real-time study checkpoints, and mobile-first commute continuity.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-purple-700 font-medium text-[13px] mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Educator / Creator</span>
                  </div>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                    Staged AI checkpoints, transparent content validation, and explicit readiness telemetry.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-gray-200/80">
                  <div className="flex items-center gap-2 text-blue-700 font-medium text-[13px] mb-1">
                    <Building2 className="w-4 h-4" />
                    <span>Organization Lead</span>
                  </div>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                    Self-contained relationship rows, context-preserved approval flows, and entity governance.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 02. THE INITIAL HYPOTHESIS & PRODUCT PIVOT                    */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-6">
          <ScrollReveal>
            <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
              02
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
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

              <div className="p-5 rounded-xl border border-rose-100 bg-rose-50/30 shadow-xs">
                <div className="text-[11px] font-basier font-medium uppercase tracking-wider text-rose-500 mb-1">The Breakdown</div>
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">Severe Cognitive Friction</h4>
                <p className="text-[13.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Early walkthroughs revealed that learners felt paralyzed by administrative metrics, which delayed lesson resumption, while educators were wary of one-click "Generate Course" flows that obscured AI output verification.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* The Breakthrough Insight Quote */}
          <ScrollReveal delay={0.08} variant="blur">
            <div className="p-5 sm:p-7 rounded-2xl bg-zinc-900 text-white shadow-md relative overflow-hidden">
              <div className="text-[11px] font-basier font-medium uppercase tracking-widest text-emerald-400 mb-2">
                The Breakthrough Insight
              </div>
              <p className="text-[17px] sm:text-[20px] font-seasons font-normal not-italic text-zinc-100 leading-relaxed">
                "A unified design system does not mean uniform cognitive density. Cohesive identity requires role-specific readiness states and clear decision boundaries."
              </p>
              <p className="text-[13px] text-zinc-400 font-switzer font-normal mt-3 leading-relaxed">
                We decoupled the home surfaces while maintaining a consistent design system shell. Crucially, we shifted from ambiguous, disabled UI elements to <strong>deterministic, explanatory readiness triggers</strong>.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 03. USER BEHAVIORAL GAPS & FIELD INSIGHTS                     */}
        {/* ------------------------------------------------------------- */}
        <section id="section-insights" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
              03
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              User Behavioral Gaps & Field Insights
            </h2>
            <p className="text-[15.5px] sm:text-[16.5px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              To define our Jobs-to-be-Done (JTBD), we mapped user pressures directly against product constraints:
            </p>
          </ScrollReveal>

          {/* JTBD Matrix Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-3 bg-gray-50 border-b border-gray-200 p-3 text-[11px] font-basier font-semibold uppercase tracking-wider text-gray-600">
                <div>User Pressure</div>
                <div>Operational Constraint</div>
                <div>UX Design Response</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-[13.5px] font-switzer font-normal">
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 sm:gap-4 items-center">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-gray-400 mb-1">User Pressure</div>
                    <strong className="text-gray-900 block font-basier font-medium text-[14px]">Recovering Context</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-gray-400 mt-2 mb-1">Operational Constraint</div>
                    The delivery window favored primary journeys over custom dashboards.
                  </div>
                  <div className="text-emerald-950 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 sm:border-l sm:border-emerald-100 sm:pl-3 font-medium text-[13px]">
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-emerald-700 mb-1">UX Design Response</div>
                    Sticky <strong>"Resume Learning"</strong> hook anchoring the last active timestamp and module.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 sm:gap-4 items-center">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-gray-400 mb-1">User Pressure</div>
                    <strong className="text-gray-900 block font-basier font-medium text-[14px]">Accountability for AI Content</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-gray-400 mt-2 mb-1">Operational Constraint</div>
                    Drafts are generated fast, but need human subject-matter verification.
                  </div>
                  <div className="text-purple-950 bg-purple-50/60 p-2.5 rounded-lg border border-purple-100 sm:border-l sm:border-purple-100 sm:pl-3 font-medium text-[13px]">
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-purple-700 mb-1">UX Design Response</div>
                    Staged progression gates: <strong>Outline → Script → Audio/Video Synthesis</strong>.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 sm:gap-4 items-center">
                  <div>
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-gray-400 mb-1">User Pressure</div>
                    <strong className="text-gray-900 block font-basier font-medium text-[14px]">Deciding for an Institution</strong>
                  </div>
                  <div className="text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-gray-400 mt-2 mb-1">Operational Constraint</div>
                    Institutional hierarchy and personal identity coexist within one network.
                  </div>
                  <div className="text-blue-950 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 sm:border-l sm:border-blue-100 sm:pl-3 font-medium text-[13px]">
                    <div className="sm:hidden text-[10px] font-basier font-semibold uppercase tracking-wider text-blue-700 mb-1">UX Design Response</div>
                    <strong>Self-contained request rows</strong> pairing identity, organization, and action.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Voice of the User Quotes */}
          <ScrollReveal delay={0.08}>
            <div className="space-y-3 pt-2">
              <h3 className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5]">
                Voice of the User
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <blockquote className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/60 text-[14px] sm:text-[14.5px] text-[#374151] leading-relaxed">
                  <p className="italic">
                    "When I open this on my phone during my commute, I don't want to browse the catalog again. I just want to tap exactly where my lesson paused without re-navigating the hierarchy."
                  </p>
                  <footer className="mt-2 text-[12px] font-basier font-semibold text-emerald-800 uppercase tracking-wide">
                    — Learner Persona
                  </footer>
                </blockquote>

                <blockquote className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/60 text-[14px] sm:text-[14.5px] text-[#374151] leading-relaxed">
                  <p className="italic">
                    "AI drafts a lesson script in seconds, but if it mispronounces a term or hallucinates a citation, my credibility takes the hit. I need a hard checkpoint before anything compiles to video."
                  </p>
                  <footer className="mt-2 text-[12px] font-basier font-semibold text-purple-800 uppercase tracking-wide">
                    — Educator Persona
                  </footer>
                </blockquote>

                <blockquote className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-gray-50/60 text-[14px] sm:text-[14.5px] text-[#374151] leading-relaxed">
                  <p className="italic">
                    "I get a notification to 'Approve Member'. Who is this person? Which cohort are they joining? If I have to open another tab to check, that request sits in my queue for days."
                  </p>
                  <footer className="mt-2 text-[12px] font-basier font-semibold text-blue-800 uppercase tracking-wide">
                    — Organization Lead Persona
                  </footer>
                </blockquote>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 04. STRATEGIC LAYERS OF THE REDESIGN                          */}
        {/* ------------------------------------------------------------- */}
        <section id="section-strategy" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
              04
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Strategic Layers of the Redesign
            </h2>
            <p className="text-[15.5px] sm:text-[16.5px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              We mapped the platform into three architectural layers to guarantee continuity, human-in-the-loop verification, and contextual decisions.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="space-y-4">
              {/* Layer 1 */}
              <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-[12px] font-basier font-semibold uppercase tracking-wider text-emerald-700 mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Layer 1: The Continuity Layer (Learner Workflow)</span>
                </div>
                <ul className="space-y-2.5 text-[14px] sm:text-[14.5px] text-gray-700 leading-relaxed font-switzer font-normal">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span><strong>Zero-Friction Resumption:</strong> Current study and progress data are pinned directly beside personalized recommendations, allowing users to jump back in with a single tap.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span><strong>Cross-Viewport Durability:</strong> Mobile layouts mirror desktop state hierarchies, preserving scroll depth, video checkpoints, and active sub-topics across screen sizes.</span>
                  </li>
                </ul>
              </div>

              {/* Layer 2 */}
              <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-[12px] font-basier font-semibold uppercase tracking-wider text-purple-700 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Layer 2: The Verification Layer (Educator Workflow)</span>
                </div>
                <ul className="space-y-2.5 text-[14px] sm:text-[14.5px] text-gray-700 leading-relaxed font-switzer font-normal">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                    <span><strong>Staged AI Checkpoints:</strong> Replaced single-prompt generation with a controlled 3-stage validation pipeline: <em>Course Outline → Script & Narration Review → Synthetic Media Compilation</em>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                    <span><strong>Readiness-Linked Actions:</strong> Replaced grayed-out disabled states with active blocker telemetry:</span>
                  </li>
                </ul>
                
                {/* Visual Formula / Badge Card */}
                <div className="mt-3.5 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap items-center gap-3 font-mono text-[12.5px] sm:text-[13px] text-gray-800">
                  <span className="font-semibold text-gray-900">Action Button: <span className="underline decoration-purple-500">Publish</span></span>
                  <span className="text-gray-400">←</span>
                  <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-medium font-sans">
                    [3 lessons incomplete]
                  </span>
                  <span className="text-[12px] text-gray-500 font-sans italic ml-auto sm:ml-0">
                    Explicit blocker explanation replaces silent disabled states
                  </span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
                <div className="flex items-center gap-2 text-[12px] font-basier font-semibold uppercase tracking-wider text-blue-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>Layer 3: The Contextual Decision Layer (Organization Lead Workflow)</span>
                </div>
                <ul className="space-y-2.5 text-[14px] sm:text-[14.5px] text-gray-700 leading-relaxed font-switzer font-normal">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                    <span><strong>Consolidated Decision Rows:</strong> Member affiliation, relationship scope, request date, and binary action controls (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Approve</code> / <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Reject</code>) are bound into a single scannable card.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                    <span><strong>Relational Integrity:</strong> Institutional leads can approve incoming relationships without navigating away to inspect identity profiles.</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 05. SYSTEMS THINKING, STATE LOGIC & EDGE CASES                */}
        {/* ------------------------------------------------------------- */}
        <section id="section-systems" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
              05
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Systems Thinking, State Logic & Edge Cases
            </h2>
            <p className="text-[15.5px] sm:text-[16.5px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              A production-ready design system must account for system stress, data latency, and edge states.
            </p>
          </ScrollReveal>

          {/* State & Dependency Pipeline */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="bg-gray-50 border-b border-gray-200 p-3 text-[11px] font-basier font-semibold uppercase tracking-wider text-gray-600">
                State & Dependency Pipeline (Acceptance Criteria)
              </div>
              <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
                <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <div className="font-basier font-medium text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Incomplete Module Readiness</span>
                  </div>
                  <div className="text-gray-600">
                    Publish action disabled; active badge counts incomplete lessons (<code className="text-xs bg-amber-50 px-1 py-0.5 rounded text-amber-800">[3 lessons incomplete]</code>).
                  </div>
                  <div className="text-gray-500 font-mono text-[11.5px] sm:border-l sm:border-gray-100 sm:pl-3">
                    Prevents half-baked publishing; clicking guides directly to missing components.
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <div className="font-basier font-medium text-gray-900 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>AI Generation / Synthesis Failure</span>
                  </div>
                  <div className="text-gray-600">
                    Non-destructive retry dialog preserves reviewed script and assets.
                  </div>
                  <div className="text-gray-500 font-mono text-[11.5px] sm:border-l sm:border-gray-100 sm:pl-3">
                    Never clears educator edits; stores revision cache locally & server-side.
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <div className="font-basier font-medium text-gray-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Concurrent Mutation on Request</span>
                  </div>
                  <div className="text-gray-600">
                    Optimistic UI with idempotent state verification.
                  </div>
                  <div className="text-gray-500 font-mono text-[11.5px] sm:border-l sm:border-gray-100 sm:pl-3">
                    If approved/rejected in another tab, row transitions immediately with non-blocking toast.
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <div className="font-basier font-medium text-gray-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Network Interruption & Mobile Reconnect</span>
                  </div>
                  <div className="text-gray-600">
                    Local state persistence across commute signal drops.
                  </div>
                  <div className="text-gray-500 font-mono text-[11.5px] sm:border-l sm:border-gray-100 sm:pl-3">
                    Preserves lesson timestamps; syncs invisibly with exponential backoff.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Architectural Trade-offs Grid */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[12px] font-basier font-medium text-gray-400 mb-1">01</div>
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">Contextual Density vs. Simplicity</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Kept active courses and recommendations grouped together so learners resume immediately without re-exploring catalogs.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[12px] font-basier font-medium text-gray-400 mb-1">02</div>
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">Multi-stage AI vs. 1-Click</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Traded instant publishing for staged human checkpoints (Outline → Script → Media), securing institutional credibility.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[12px] font-basier font-medium text-gray-400 mb-1">03</div>
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-2">Consolidated Decision Rows</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Packaged requester identity, relationship scope, and binary approval actions in one row, eliminating tab-switching.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-[13px] sm:text-[14px] text-gray-700 font-switzer font-normal">
              <strong className="text-gray-900 font-basier font-medium">Technical Alignment Note: </strong>
              Readiness rules, draft durability, and request authorization were co-designed with engineering. The user interface and underlying backend state always agree deterministically on what has occurred.
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 06. VISUAL INTERFACE & DESIGN SYSTEM                          */}
        {/* ------------------------------------------------------------- */}
        <section id="section-craft" className="space-y-10 sm:space-y-12 scroll-mt-28">
          <ScrollReveal>
            <div>
              <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
                06
              </span>
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
                Visual Interface & Platform Walkthrough
              </h2>
              <p className="text-[15.5px] sm:text-[16.5px] text-[#374151] leading-[1.75] mt-2 font-switzer font-normal">
                A cohesive design system connecting the product shell, with interaction density tailored to the user's operational responsibility.
              </p>
            </div>
          </ScrollReveal>

          {/* Feature 1: The Continuity Layer (Learner & Org Overview) */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">
              01. The Continuity Layer — Learner & Organization Dashboards
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
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
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">
              02. Community Feed & Personal Identity Profiles
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Community discussions clearly attribute authorship and role context. The individual digital twin profile provides a consolidated view of background, achievements, and capabilities.
            </p>
            <DualMockupFrame 
              src1={mockup2} 
              alt1="Community Feed: Authorship and role context accompany every post."
              src2={mockup3} 
              alt2="Personal Profile: Capability twin, background, and activity in one view."
            />
          </ScrollReveal>

          {/* Feature 3: The Verification Layer (AI Creator Studio) */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">
              03. The Verification Layer — AI Course Outline & Script Review
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              The curriculum outline exposes structural readiness and blocker counts. Review continues through script editing, narration pacing, and synthetic media generation, keeping human expertise at the center.
            </p>
            <DualMockupFrame 
              src1={mockup4} 
              alt1="Course Outline: Readiness count and Publish action state explain incomplete work."
              src2={mockup5} 
              alt2="Creator Studio: Script & narration validation checkpoint."
            />
          </ScrollReveal>

          {/* Feature 4: Reusable Material & Cohorts */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">
              04. Asset Library & Capability Distribution
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              A centralized asset repository enables rapid curriculum authoring, tagging, and cross-course modular distribution across corporate cohorts.
            </p>
            <MockupFrame 
              src={mockup9} 
              alt="AhamX Asset Library and Module Repository" 
            />
          </ScrollReveal>

          {/* Feature 5: The Contextual Decision Layer */}
          <ScrollReveal>
            <h3 className="text-[18px] sm:text-[20px] font-basier font-medium text-gray-900 mb-2">
              05. The Contextual Decision Layer — Organization Network & Hierarchy
            </h3>
            <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed font-switzer font-normal">
              Relationship rows bind identity, department, date, and inline actions (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Approve</code> / <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Reject</code>) into a single scannable view, backed by a structural organizational map.
            </p>
            <MockupFrame 
              src={mockup11} 
              alt="Organization Network and Member Relationship Approvals" 
            />
          </ScrollReveal>

          {/* Validation & Standards */}
          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/60 shadow-xs">
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">State Behavior as First-Class UI</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  All shared components feature distinct hover, active, disabled, loading, and fallback states. Status tags always pair clear explanatory text with accessible color cues.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/60 shadow-xs">
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">WCAG 2.1 AA Accessibility</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Tested with 4.5:1 text contrast ratios, visible keyboard focus rings, semantic landmark structures, ARIA live announcements for state updates, and narrow-viewport reflow down to 320px.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <hr className="border-gray-100" />

        {/* ------------------------------------------------------------- */}
        {/* 07. IMPACT, MILESTONES & RETROSPECTIVE                        */}
        {/* ------------------------------------------------------------- */}
        <section id="section-impact" className="space-y-6 scroll-mt-28">
          <ScrollReveal>
            <span className="text-[12px] font-basier font-semibold uppercase tracking-[0.14em] text-[#8e95a5] select-none block mb-1">
              07
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Impact, Milestones & Retrospective
            </h2>
            <p className="text-[15.5px] sm:text-[16.5px] text-[#374151] leading-[1.75] font-switzer font-normal mt-2">
              Shipped as a production-grade system and validated on national innovation stages.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[11px] font-basier font-semibold uppercase tracking-wider text-emerald-700 mb-1">Delivery Velocity</div>
                <div className="text-[20px] sm:text-[22px] font-basier font-medium text-gray-900 mb-1">Shipped in 3 Months.</div>
                <p className="text-[13px] sm:text-[13.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Led end-to-end design across learner, creator, and organization surfaces for desktop and mobile as sole designer in an agile pod.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
                <div className="text-[11px] font-basier font-semibold uppercase tracking-wider text-blue-700 mb-1">Public Recognition</div>
                <div className="text-[20px] sm:text-[22px] font-basier font-medium text-gray-900 mb-1">IndiaAI Impact Summit 2026.</div>
                <p className="text-[13px] sm:text-[13.5px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Featured at the Google and ARTPARK pavilions, demonstrating scalable digital twin technology for capability development.
                </p>
              </div>
            </div>

            {/* Confidence Metrics Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mt-5 shadow-xs">
              <div className="bg-gray-50 border-b border-gray-200 p-3 text-[11px] font-basier font-semibold uppercase tracking-wider text-gray-600">
                Evaluation & Measurement Framework
              </div>
              <div className="divide-y divide-gray-100 text-[13px] font-switzer font-normal">
                <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 items-center">
                  <strong className="text-gray-900 font-basier font-medium">Can a learner resume without help?</strong>
                  <span className="text-gray-600">Task success and time to resume</span>
                  <span className="text-emerald-700 font-mono text-[12px] font-medium">Single-tap return</span>
                </div>
                <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 items-center">
                  <strong className="text-gray-900 font-basier font-medium">Does an educator understand readiness?</strong>
                  <span className="text-gray-600">Correct next-step identification</span>
                  <span className="text-purple-700 font-mono text-[12px] font-medium">Telemetry-guided blockers</span>
                </div>
                <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 items-center">
                  <strong className="text-gray-900 font-basier font-medium">Can a lead act on a request in context?</strong>
                  <span className="text-gray-600">Decision speed and comprehension</span>
                  <span className="text-blue-700 font-mono text-[12px] font-medium">Zero-tab turnaround</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-[15px] sm:text-[16px] font-seasons font-normal not-italic text-zinc-900 leading-relaxed">
              "The outline taught me to pair every blocked action with a visible readiness count, so an unavailable state is always accompanied by an actionable explanation."
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Continuous Validation</h4>
                <p className="text-[13px] text-gray-600 leading-relaxed font-switzer font-normal">
                  Continuously observing how users pick up where they left off, inspect AI draft variations, and navigate institutional approvals to eliminate friction.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="font-basier font-medium text-[15px] sm:text-[16px] text-gray-900 mb-1">Next Phase Capabilities</h4>
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
