import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Mail, FileText } from 'lucide-react';
import AboutCamera from './AboutCamera';
import heroGradient from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.png';
import { TypewriterExperience, CassetteCollection } from './AboutCollections';

// LinkedIn Icon SVG
function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

// Behance Icon SVG
function BehanceIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.108 0-6.625-3.078-6.625-7 0-4.053 2.597-7 6.551-7 4.095 0 6.449 3.003 6.449 7.025 0 .207-.008.411-.025.61h-9.975c.098 2.001 1.488 3.565 3.735 3.565 1.554 0 2.651-.762 3.097-1.776l1.889 1.576zm-8.82-5.419h6.819c-.085-1.848-1.391-3.113-3.376-3.113-1.956 0-3.308 1.242-3.443 3.113zm-10.906-4.581h-4v12h4c2.896 0 5-1.282 5-3.834 0-1.408-.638-2.607-1.848-3.166 1.002-.557 1.55-1.575 1.55-2.784 0-2.316-1.843-3.216-4.702-3.216zm-1 4.5h-1.5v-2.5h1.5c1.47 0 2.215.485 2.215 1.25 0 .764-.745 1.25-2.215 1.25zm.5 5.5h-2v-3.5h2c1.644 0 2.48.56 2.48 1.75 0 1.19-.836 1.75-2.48 1.75z" />
    </svg>
  );
}

export default function AboutPage({ onBack, isRevealed = true }) {
  const [hasLanded, setHasLanded] = useState(false);
  const [photoReady, setPhotoReady] = useState(false);

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => window.lenis?.resize());
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => {
      setHasLanded(true);
      window.lenis?.resize();
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const shouldAnimate = isRevealed && hasLanded;
  const entranceEase = [0.16, 1, 0.3, 1];

  return (
    <div className="min-h-screen bg-white text-[#111827] relative selection:bg-[#0c4731] selection:text-white flex flex-col overflow-x-clip">
      {/* Ambient gradient header background matching case studies & hero */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[680px] sm:h-[840px] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.25) 45%, #ffffff 100%), url(${heroGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <nav className="about-back-nav" aria-label="Back navigation"><button onClick={onBack}><ArrowLeft size={16}/> Back to home</button></nav>
      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col">
        {/* 1. Hero / Bio Section */}
        <section className="w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-4 sm:pt-6 pb-8 sm:pb-10 flex flex-col">
          {/* Large Iconic Header Title in The Seasons Font */}
          <div className="text-center mb-5 sm:mb-7 shrink-0">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.85, delay: 0.08, ease: entranceEase }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[74px] tracking-tight text-[#0c4731] select-none"
              style={{
                fontFamily: "'The Seasons', Georgia, serif",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              A little about me.
            </motion.h1>
          </div>

          <div className="about-camera-intro">
            <AboutCamera onPrinted={() => setPhotoReady(true)} />

            {/* Right Column: Narrative & Story */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={shouldAnimate && photoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.9, delay: 0.24, ease: entranceEase }}
              className={`camera-introduction flex flex-col justify-center space-y-3 sm:space-y-4 text-[#1f2937] ${photoReady ? 'is-visible' : ''}`}
              inert={!photoReady}
              aria-hidden={!photoReady}
            >
              {/* Headline in The Seasons */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={shouldAnimate && photoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.8, delay: 0.3, ease: entranceEase }}
                className="text-lg sm:text-xl lg:text-[22px] xl:text-[24px] font-seasons font-normal not-italic text-[#0c4731] leading-[1.3] tracking-tight"
              >
                Product designer, based in Hyderabad.
              </motion.h2>

              {/* Body Copy 1 */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={shouldAnimate && photoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.8, delay: 0.36, ease: entranceEase }}
                className="text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.65] text-[#374151] font-normal"
              >
                Over 5+ years, I’ve designed digital products across mobile apps, design systems, and UI/UX. I bring design and front-end experience to make complex experiences feel simple.
              </motion.p>

              {/* Social & Contact Links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={shouldAnimate && photoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.8, delay: 0.48, ease: entranceEase }}
                className="pt-2 flex flex-wrap justify-center items-center gap-4 sm:gap-5 text-[13px] text-[#4b5563]"
              >
                <a
                  href="mailto:yogeshbattula55@gmail.com"
                  className="inline-flex items-center gap-1.5 font-medium text-[#0c4731] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>yogeshbattula55@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/yogeshbattula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0c4731] hover:underline"
                >
                  <LinkedinIcon className="w-3 h-3" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-[#0c4731]/70" />
                </a>

                <a
                  href="https://www.behance.net/yogeshbattula5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0c4731] hover:underline"
                >
                  <BehanceIcon className="w-3 h-3" />
                  <span>Behance</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-[#0c4731]/70" />
                </a>

                <a
                  href="/yogesh-battula-resume.pdf"
                  download="Yogesh_Battula_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[#0c4731] hover:underline"
                >
                  <FileText className="w-3 h-3" />
                  <span>Resume</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-[#0c4731]/70" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Experience Section */}
        <TypewriterExperience />

        {/* 3. Recent Movies & Shows Section with Scroll Parallax */}
        <CassetteCollection />

        {/* 4. Elegant Bottom Navigation & Footer */}
        <section className="w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-8 pb-16 sm:pb-24 border-t border-black/[0.06] mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#111827] text-[13px] font-medium border border-black/[0.1] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Return to portfolio</span>
            </button>

            <a
              href="mailto:yogeshbattula55@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0c4731] hover:bg-[#093524] text-white text-[13px] font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Say hello</span>
            </a>
          </div>

          <div className="text-[12.5px] text-[#6b7280]">
            Crafted with thoughtful care • Hyderabad, India
          </div>
        </section>
      </main>
    </div>
  );
}
