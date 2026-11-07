import NextCaseStudy from './NextCaseStudy';
import CaseStudyTldr from './CaseStudyTldr';
import React, { useEffect, useRef } from 'react';
import { ArrowLeft, User, GraduationCap, Building2 } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import CaseStudyScrollNav from './CaseStudyScrollNav';
import CaseStudyScrollProgress from './CaseStudyScrollProgress';
import ScrollReveal from './ScrollReveal';

import mockupBg from './assets/mockup_bg.webp';
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.webp';

// Extracted authentic 1440x1024 AhamX UI mockups
import mockup0 from './assets/case_mockups/mockup_0_1440x1024.webp';
import mockup1 from './assets/case_mockups/mockup_1_1440x1024.webp';
import mockup2 from './assets/case_mockups/mockup_2_1440x1024.webp';
import mockup3 from './assets/case_mockups/mockup_3_1440x1024.webp';
import mockup4 from './assets/case_mockups/mockup_4_1440x1024.png';
import mockup5 from './assets/case_mockups/mockup_5_1440x1024.webp';
import mockup9 from './assets/case_mockups/mockup_9_1440x1024.webp';
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

// Clean Single Mockup Frame with Scroll Parallax (Supports both images and scroll-triggered video demos)
function MockupFrame({ src, alt, videoMp4, videoWebm, loop = false }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(frameRef, { amount: 0.5 });
  const prevInViewRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  // When scrolled into this position, play the video once!
  useEffect(() => {
    if (!videoRef.current || !videoMp4) return;

    if (isInView && !prevInViewRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else if (!isInView && prevInViewRef.current) {
      videoRef.current.pause();
    }
    prevInViewRef.current = isInView;
  }, [isInView, videoMp4]);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <ScrollReveal variant="scale-up" className="my-6 sm:my-8">
      <div 
        ref={frameRef}
        className="w-full rounded-[16px] sm:rounded-[24px] p-2 sm:p-6 md:p-10 border border-gray-200/80 shadow-xs relative overflow-hidden bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${mockupBg})` }}
      >
        <motion.div style={{ y: innerY }}>
          <div 
            onClick={videoMp4 ? handleReplay : undefined}
            title={videoMp4 ? "Click to replay" : undefined}
            className={`rounded-[10px] sm:rounded-[18px] overflow-hidden shadow-xl border border-black/10 bg-white ${videoMp4 ? 'cursor-pointer' : ''}`}
          >
            {videoMp4 ? (
              <video
                ref={videoRef}
                autoPlay={false}
                loop={loop}
                muted
                playsInline
                preload="auto"
                controls={false}
                poster={src}
                className="w-full h-auto object-cover block select-none pointer-events-none"
              >
                {videoWebm && <source src={videoWebm} type="video/webm" />}
                <source src={videoMp4} type="video/mp4" />
                {src && (
                  <img 
                    src={src} 
                    alt={alt} 
                    className="w-full h-auto object-cover block pointer-events-none" 
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </video>
            ) : (
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-auto object-cover block pointer-events-none" 
                loading="lazy"
                decoding="async"
              />
            )}
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
              <img src={src1} alt={alt1} className="w-full h-auto object-cover block pointer-events-none" loading="lazy" decoding="async" />
            </div>
          </motion.div>
          <motion.div style={{ y: innerY2 }}>
            <div className="rounded-[10px] sm:rounded-[14px] overflow-hidden shadow-lg border border-black/10 bg-white">
              <img src={src2} alt={alt2} className="w-full h-auto object-cover block pointer-events-none" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function CaseStudyAhamX({ onBack, onNext, isRevealed = true }) {
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
    <div className="case-study-page relative isolate bg-[#ffffff] min-h-screen text-[#111827] font-basier font-normal antialiased selection:bg-gray-200 selection:text-black pb-24 sm:pb-32 overflow-x-hidden">
      
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
          backgroundImage: `linear-gradient(to bottom, #1450d6 0%, #1450d6 48%, rgba(20,80,214,0.55) 72%, #ffffff 100%), url(${heroGradient})`,
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
          className="flex items-center justify-between pb-6 sm:pb-8 border-b border-white/20"
        >
          <button
            onClick={onBack}
            className="min-h-11 inline-flex items-center gap-2 text-small font-basier font-medium text-[#cfe0ff] hover:text-white transition-colors cursor-pointer group"
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
          className="text-h2 sm:text-h1 md:text-display-sm font-seasons font-normal text-[#f3f7ff] leading-[1.15] sm:leading-[1.1] tracking-[-0.02em] pt-6 sm:pt-8"
        >
          AhamX: one learning platform for everyone
        </motion.h1>

        {/* Meta Bar / Project Overview - Clean White & Grey Grid */}
        <motion.p
          id="section-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 pt-4 border-t border-white/25 text-small text-[#eef4ff] font-basier scroll-mt-28"
        >
          Sole product designer · 3 months · Web & mobile · Shipped, demoed at India AI Impact Summit 2026
        </motion.p>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-body sm:text-lead text-[#cfe0ff] mt-3 sm:mt-4 leading-[1.5] tracking-[-0.015em] font-basier font-normal italic"
        >
          One learning platform for learners, educators, and organization leads.
        </motion.p>


      </header>

      {/* Hero Mockup Frame */}
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
        transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1040px] mx-auto px-3 sm:px-6"
      >
        <MockupFrame 
          src="/videos/learner-dashboard-enrolled-active.png" 
          loop={false}
          alt="AhamX Learner Dashboard Enrolled Active interface demo" 
        />
      </motion.div>

      {/* Main Narrative Article Container */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 space-y-12 sm:space-y-16">

        {/* ------------------------------------------------------------- */}
        {/* EXECUTIVE SUMMARY                                             */}
        {/* ------------------------------------------------------------- */}
        <section className="space-y-4">
          <CaseStudyTldr accent="#7c3aed" rows={[["Problem", "Learners lost their place, educators didn't trust unreviewed AI drafts, and org leads couldn't see who they were approving."], ["My role", "Led UX/UI end to end as the sole designer, for desktop and mobile."], ["What I changed", "One product that adapts to each role: a resume-learning card, step-by-step AI review before publishing, and approval rows that show who and why."], ["Result", "Shipped in 3 months and featured at the IndiaAI Impact Summit 2026."]]} />
          <ScrollReveal>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="cs-label type-label mb-2">
                Executive Summary
              </h3>
              <p className="cs-body text-body text-[#1f2937] leading-[1.6] font-basier font-normal">
                AhamX is a learning platform where each person has a profile that grows with them — what they've learned, built, and achieved. I designed it end to end, for desktop and mobile. The hard part: three very different users — learners, educators, and organization leads — had to share one product without anyone feeling it was built for someone else.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              The problem
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal">
              Platforms with several kinds of users often wear people out. Here, three groups ran into three different problems:
            </p>
            <ul className="mt-4 space-y-3 font-basier text-small sm:text-body text-[#374151] leading-relaxed pl-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Learners</strong> gave up on courses when an interruption made them work out where they had stopped.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Educators</strong> didn’t trust AI tools that sent drafts straight to learners with no chance to review them.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 shrink-0" />
                <span><strong className="text-gray-900 font-basier font-medium">Organization Leads</strong> put off approval requests because they didn’t show who was asking or why.</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Strategic Pivot Card - Clean White & Grey */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-gray-200 shadow-xs space-y-2.5">
              <div className="type-label">
                The Strategic Pivot
              </div>
              <h3 className="cs-subheading text-body sm:text-lead font-basier font-medium text-gray-900 leading-snug">
                One Product That Adapts to Each Role
              </h3>
              <p className="text-small sm:text-body text-gray-600 leading-[1.7] font-basier font-normal">
                Instead of building three separate portals (a student LMS, a creator studio and an admin hub), we built <strong>one product that adapts to whoever is using it</strong>. Your profile and the overall look stay the same everywhere, while the home screen and main actions change depending on whether you're there to learn, to teach or to manage.
              </p>
            </div>
          </ScrollReveal>

          {/* Role Matrix - Clean Balanced Columns with Dividers */}
          <ScrollReveal delay={0.1}>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                Role & Responsibilities Matrix
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-gray-900 font-basier font-medium text-small mb-1.5">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Learner</span>
                  </div>
                  <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                    Pick up exactly where they stopped, on any device, including a quick session on the commute.
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-gray-900 font-basier font-medium text-small mb-1.5">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <span>Educator / Creator</span>
                  </div>
                  <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                    Review AI-generated drafts step by step, and always see what's left before a course can be published.
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-gray-900 font-basier font-medium text-small mb-1.5">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>Organization Lead</span>
                  </div>
                  <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              My first idea, and why I changed it
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="type-label mb-1">The Assumption</div>
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-2">All-in-One Modular Dashboard</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  I first tried one dashboard with active courses, cohort progress and pending approvals, so all three roles would see everything in one place.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="type-label mb-1">The Breakdown</div>
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-2">Competing needs on one screen</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  The risk was clear: learners would see admin numbers when they just wanted their next lesson, and educators would get a one-click “Generate Course” button with no real chance to review what the AI wrote.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* The Breakthrough Insight Quote - Clean Grey Card */}
          <ScrollReveal delay={0.08} variant="blur">
            <div className="border-t border-gray-200 pt-4 space-y-2.5">
              <div className="type-label">
                The Breakthrough Insight
              </div>
              <p className="text-body sm:text-lead font-seasons font-normal not-italic text-gray-900 leading-relaxed">
                "One design system doesn't mean every screen should be equally busy. Each role needs its own starting point and clear signals for what's ready and what isn't."
              </p>
              <p className="text-small text-gray-600 font-basier font-normal pt-1 leading-relaxed">
                I gave each role its own home screen within the same design system. Blocked actions keep their disabled state, explain what is missing, and provide a separate link to resolve it.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              What each person needed
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              I matched each role’s needs to the decisions they have to make. The table shows the need and my design response.
            </p>
          </ScrollReveal>

          {/* JTBD Matrix Table - Balanced Proportions & Clean White/Grey Layout */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-3">Persona Need</div>
                <div className="sm:col-span-4">Operational Friction</div>
                <div className="sm:col-span-5">Design Response</div>
              </div>
              
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                {/* Row 1 */}
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <div className="sm:hidden type-label mb-0.5">Persona Need</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Recovering Context</span>
                    <span className="text-caption text-gray-500 block">Learner</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Operational Friction</div>
                    After a break, learners had to dig through the catalog to find where they stopped.
                  </div>
                  <div className="sm:col-span-5 text-gray-800 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design Response</div>
                    Sticky <strong>"Resume Learning"</strong> card anchoring last active timestamp and module.
                  </div>
                </div>

                {/* Row 2 */}
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <div className="sm:hidden type-label mb-0.5">Persona Need</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Content Accountability</span>
                    <span className="text-caption text-gray-500 block">Educator</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Operational Friction</div>
                    Drafts are generated fast, but need human subject-matter verification.
                  </div>
                  <div className="sm:col-span-5 text-gray-800 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design Response</div>
                    Staged progression gates: <strong>Outline → Script → Video</strong>.
                  </div>
                </div>

                {/* Row 3 */}
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <div className="sm:hidden type-label mb-0.5">Persona Need</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Institutional Action</span>
                    <span className="text-caption text-gray-500 block">Org Lead</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Operational Friction</div>
                    Institutional hierarchy and personal identity coexist within one network.
                  </div>
                  <div className="sm:col-span-5 text-gray-800 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design Response</div>
                    <strong>Self-contained request rows</strong> pairing identity, cohort, and decision actions.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* User needs guiding the design Quotes - Clean White/Grey Style */}
          <ScrollReveal delay={0.08}>
            <div className="space-y-3 pt-2">
              <h3 className="cs-label type-label">
                User needs guiding the design
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="border-t border-gray-200 pt-4 text-small text-[#374151] leading-relaxed">
                  <p className="font-normal">
                    Learner: return to the paused lesson without browsing the catalog again.
                  </p>

                </div>

                <div className="border-t border-gray-200 pt-4 text-small text-[#374151] leading-relaxed">
                  <p className="font-normal">
                    Educator: review terminology and citations before an AI-drafted script becomes a video.
                  </p>

                </div>

                <div className="border-t border-gray-200 pt-4 text-small text-[#374151] leading-relaxed">
                  <p className="font-normal">
                    Organization lead: see who is requesting access and which cohort they want to join before making a decision.
                  </p>

                </div>
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Three ideas behind the redesign
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              The platform rests on three ideas: pick up where you left off, a human checks the AI’s work, and decisions come with context.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="space-y-4">
              {/* Layer 1 */}
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="type-label mb-1.5">
                  Learner Workflow
                </div>
                <h3 className="cs-subheading text-body font-basier font-medium text-gray-900 mb-3">
                  The Continuity Layer
                </h3>
                <ul className="space-y-2.5 text-small text-gray-700 leading-relaxed font-basier font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Zero-Friction Resumption:</strong> Current study and progress data are pinned directly beside personalized recommendations, allowing users to jump back in with a single tap.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Continue across devices:</strong> Start on desktop, continue on your phone, and land in the same spot.</span>
                  </li>
                </ul>
              </div>

              {/* Layer 2 */}
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="type-label mb-1.5">
                  Educator Workflow
                </div>
                <h3 className="cs-subheading text-body font-basier font-medium text-gray-900 mb-3">
                  The Verification Layer
                </h3>
                <ul className="space-y-2.5 text-small text-gray-700 leading-relaxed font-basier font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Staged AI Checkpoints:</strong> I pushed back on the one-click Generate Course flow and proposed three review stages: <em>Course Outline → Script & Narration Review → Video generation</em>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Blocked actions always explain themselves.</strong> Publish stays disabled until a course is ready. A separate “3 lessons incomplete” link explains what is missing and takes the educator straight to the first incomplete lesson.</span>
                  </li>
                </ul>
                
                {/* Visual Formula / Badge Card - Clean White & Grey */}
                <div className="mt-3.5 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-wrap items-center gap-2.5 text-small text-gray-700">
                  <span className="font-basier font-medium text-gray-900">Action: Publish</span>
                  <span className="text-gray-500">←</span>
                  <span className="px-2 py-0.5 rounded bg-gray-200/80 text-gray-800 text-caption font-basier tabular-nums">
                    [3 lessons incomplete]
                  </span>
                  <span className="text-caption text-gray-500 font-sans italic ml-auto sm:ml-0">
                    Publish stays disabled; the missing-lessons link stays available
                  </span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="type-label mb-1.5">
                  Organization Lead Workflow
                </div>
                <h3 className="cs-subheading text-body font-basier font-medium text-gray-900 mb-3">
                  The Contextual Decision Layer
                </h3>
                <ul className="space-y-2.5 text-small text-gray-700 leading-relaxed font-basier font-normal">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Consolidated Decision Rows:</strong> Member affiliation, relationship scope, request date, and binary action controls (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Approve</code> / <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Reject</code>) are bound into a single scannable card.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span><strong>Approve in context:</strong> Leads can approve someone without opening their profile in another tab.</span>
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Details that make it hold up
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              A real product has to handle slow loading, errors and empty screens, not only the happy path.
            </p>
          </ScrollReveal>

          {/* State & Dependency Pipeline - Balanced 3-Column White & Grey Table */}
          <ScrollReveal delay={0.06} variant="scale-up">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-4">State & Trigger</div>
                <div className="sm:col-span-4">Interface Behavior</div>
                <div className="sm:col-span-4">System Rule / Recovery</div>
              </div>
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden type-label mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Incomplete Readiness</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Interface Behavior</div>
                    Publish action disabled; badge counts pending items (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-basier tabular-nums">[3 incomplete]</code>).
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-caption">
                    <div className="sm:hidden type-label mt-1 mb-0.5">System Rule / Recovery</div>
                    Prevents premature publishing; clicking the missing-items link opens the first incomplete lesson.
                  </div>
                </div>

                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden type-label mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Synthesis Failure</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Interface Behavior</div>
                    Non-destructive retry dialog preserves reviewed script and source inputs.
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-caption">
                    <div className="sm:hidden type-label mt-1 mb-0.5">System Rule / Recovery</div>
                    Revision cached locally and server-side; zero content loss on timeouts.
                  </div>
                </div>

                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden type-label mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Concurrent Mutation</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Interface Behavior</div>
                    If someone else already approved the request in another tab, the row updates and tells you.
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-caption">
                    <div className="sm:hidden type-label mt-1 mb-0.5">System Rule / Recovery</div>
                    If modified in another tab, row transitions immediately with passive status toast.
                  </div>
                </div>

                <div className="p-4 sm:px-4 sm:py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <div className="sm:hidden type-label mb-0.5">State & Trigger</div>
                    <span className="font-basier font-medium text-gray-900 text-small">Connection Drop</span>
                  </div>
                  <div className="sm:col-span-4 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Interface Behavior</div>
                    If the connection drops mid-lesson, playback position is kept on the device.
                  </div>
                  <div className="sm:col-span-4 text-gray-500 sm:border-l sm:border-gray-100 sm:pl-3 text-caption">
                    <div className="sm:hidden type-label mt-1 mb-0.5">System Rule / Recovery</div>
                    Saves the exact second and syncs quietly once the learner is back online.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Architectural Trade-offs Grid - Clean White & Grey Cards */}
          <ScrollReveal delay={0.08} variant="scale-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1.5">Contextual Density vs. Simplicity</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Kept active courses and recommendations grouped together so learners resume immediately without re-exploring catalogs.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1.5">Multi-stage AI vs. 1-Click</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Traded instant publishing for staged human checkpoints (Outline → Script → Media), securing institutional credibility.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1.5">Consolidated Decision Rows</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Packaged requester identity, relationship scope, and binary approval actions in one row, eliminating tab-switching.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border-t border-gray-200 pt-4 text-small text-gray-700 font-basier font-normal">
              <strong className="text-gray-900 font-basier font-medium">Technical Alignment Note: </strong>
              I worked out the publishing rules, draft saving and approval permissions together with engineering, so what the screen shows always matches what has actually happened.
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
              <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
                The screens
              </h2>
              <p className="cs-body text-body text-[#374151] leading-[1.6] mt-2 font-basier font-normal">
                One design system across the product, with more or less detail depending on what each person does.
              </p>
            </div>
          </ScrollReveal>

          {/* Feature 1: The Continuity Layer (Learner & Org Overview) */}
          <ScrollReveal>
            <h3 className="cs-subheading text-body sm:text-lead font-basier font-medium text-gray-900 mb-1.5">
              The Continuity Layer — Learner & Organization Dashboards
            </h3>
            <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
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
            <h3 className="cs-subheading text-body sm:text-lead font-basier font-medium text-gray-900 mb-1.5">
              Community Feed & Personal Identity Profiles
            </h3>
            <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
              Community discussions clearly attribute authorship and role context. Each person's profile brings their background, achievements and skills together in one place.
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
            <h3 className="cs-subheading text-body sm:text-lead font-basier font-medium text-gray-900 mb-1.5">
              The Verification Layer — AI Course Outline & Script Review
            </h3>
            <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
              The curriculum outline exposes structural readiness and blocker counts. Review continues through script editing, narration pacing, and video generation, keeping human expertise at the center.
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
            <h3 className="cs-subheading text-body sm:text-lead font-basier font-medium text-gray-900 mb-1.5">
              Asset Library & Capability Distribution
            </h3>
            <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
              A centralized asset repository enables rapid curriculum authoring, tagging, and cross-course modular distribution across corporate cohorts.
            </p>
            <MockupFrame 
              src={mockup9} 
              alt="AhamX Asset Library and Module Repository" 
            />
          </ScrollReveal>

          {/* Feature 5: The Contextual Decision Layer with Embedded 60fps Micro-interaction Video */}
          <ScrollReveal>
            <h3 className="cs-subheading text-body sm:text-lead font-basier font-medium text-gray-900 mb-1.5">
              The Contextual Decision Layer — Organization Network & Hierarchy
            </h3>
            <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
              Relationship rows bind identity, department, date, and inline actions (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Approve</code> / <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Reject</code>) into a single scannable view, backed by a structural organizational map.
            </p>
            <MockupFrame 
              src={mockup11} 
              alt="Organization Network and Member Relationship Approvals" 
            />

          </ScrollReveal>

          {/* Validation & Standards */}
          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">State Behavior as First-Class UI</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  All shared components feature distinct hover, active, disabled, loading, and fallback states. Status tags always pair clear explanatory text with accessible cues.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">WCAG 2.1 AA Accessibility</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Designed to WCAG 2.1 AA: 4.5:1 text contrast ratios, visible keyboard focus rings, semantic landmark structures, ARIA live announcements for state updates, and narrow-viewport reflow down to 320px.
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
            <h2 className="cs-section-title text-h3 md:text-h2 font-basier font-medium text-[#111827] tracking-tight leading-snug">
              Outcome and what I’d do next
            </h2>
            <p className="cs-body text-body text-[#374151] leading-[1.6] font-basier font-normal mt-2">
              Shipped for web and mobile; demoed at the Google and ARTPARK pavilions, India AI Impact Summit 2026.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="type-label mb-1">Delivery Velocity</div>
                <div className="text-lead font-basier font-medium text-gray-900 mb-1">Shipped in 3 Months.</div>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Led end-to-end design across learner, creator, and organization surfaces for desktop and mobile as sole designer in an agile pod.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl border border-gray-200 bg-white shadow-xs">
                <div className="type-label mb-1">Public demo</div>
                <div className="text-lead font-basier font-medium text-gray-900 mb-1">IndiaAI Impact Summit 2026.</div>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Demoed at the Google and ARTPARK pavilions, showing how learners, educators, and organization leads use the platform.
                </p>
              </div>
            </div>

            {/* Evaluation & Measurement Framework - Concrete Trial & Baseline Metrics */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mt-5 shadow-xs">
              <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200 px-4 py-3 text-caption font-basier font-medium uppercase tracking-wider text-gray-500">
                <div className="sm:col-span-5">Evaluation Focus</div>
                <div className="sm:col-span-3">Design focus</div>
                <div className="sm:col-span-4">Design response</div>
              </div>
              <div className="divide-y divide-gray-100 text-small font-basier font-normal">
                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Can a learner resume study without manual search?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design focus</div>
                    Resume learning
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design response</div>
                    The Resume card opens the last lesson directly, without searching through the catalog.
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Does an educator understand content readiness?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design focus</div>
                    Review before publishing
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design response</div>
                    Educators can edit AI-drafted scripts before video generation; Publish stays disabled until required work is complete.
                  </div>
                </div>

                <div className="p-3.5 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-5 font-basier font-medium text-gray-900">
                    <div className="sm:hidden type-label mb-0.5">Evaluation Focus</div>
                    Can a lead act on a request in context?
                  </div>
                  <div className="sm:col-span-3 text-gray-600 sm:border-l sm:border-gray-100 sm:pl-3">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design focus</div>
                    Approve in context
                  </div>
                  <div className="sm:col-span-4 text-gray-900 font-basier tabular-nums text-caption sm:border-l sm:border-gray-100 sm:pl-3 font-medium">
                    <div className="sm:hidden type-label mt-1 mb-0.5">Design response</div>
                    Requester details and Approve / Reject actions sit in the same row, so leads can make a decision without leaving the page.
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border-t border-gray-200 pt-4 text-body font-seasons font-normal not-italic text-gray-900 leading-relaxed text-center">
              What I learned: a blocked action needs a reason, not just a grey button.
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">What I’d do differently</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  I’d test the all-in-one dashboard with learners in week one, before developing the role-specific screens further.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-xs">
                <h4 className="cs-detail-heading font-basier font-medium text-body text-gray-900 mb-1">What’s next</h4>
                <p className="text-small text-gray-600 leading-relaxed font-basier font-normal">
                  Linking what someone has learned to the skills their organization needs.
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
          <a href="/case-study/ryzeup" className="block rounded-xl border border-gray-200 p-6 text-[#111827] hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4">
            <span className="block text-sm mb-2">Next case study →</span>
            <span className="cs-section-title">Ryzeup</span>
          </a>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="min-h-11 inline-flex items-center gap-2 text-small font-basier font-medium text-gray-700 hover:text-black transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Selected Works</span>
            </button>

            <NextCaseStudy current="ahamx" onNavigate={onNext} />
          </div>
        </ScrollReveal>

      </main>

    </div>
  );
}
