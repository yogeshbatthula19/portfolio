import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, cubicBezier, useReducedMotion, useVelocity } from 'framer-motion';
import Lenis from 'lenis';
import { FileText, Heart, ArrowRight, ArrowUpRight, X } from 'lucide-react';
const CaseStudyAhamX = React.lazy(() => import('./CaseStudyAhamX'));
const CaseStudyRyzeup = React.lazy(() => import('./CaseStudyRyzeup'));
const CaseStudyTrosky = React.lazy(() => import('./CaseStudyTrosky'));
const AboutPage = React.lazy(() => import('./AboutPage'));
import ConceptToCraft from './ConceptToCraft';
import CommunityTestimonials from './CommunityTestimonials';
import CustomCursor from './CustomCursor';
import OpeningAnimation from './OpeningAnimation';
import photoAvatar from './assets/photo_yogesh_avatar.jpg';
import stampAboutOrange from './assets/stamp_about_orange.png';

// Substack Brand Icon
function SubstackIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
        fill="#FF6719"
      />
    </svg>
  );
}

// Authentic Postage Stamp Frame with Perforated Edge & Philatelic Margins
function StampFrame({ children, className = "", innerClassName = "", defaultW = 205, defaultH = 210 }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: defaultW, h: defaultH });

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => {
      if (el.clientWidth && el.clientHeight) {
        setDimensions({ w: el.clientWidth, h: el.clientHeight });
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stampPath = useMemo(() => {
    const { w, h } = dimensions;
    if (!w || !h) return '';

    // Perforation hole geometry based on authentic vintage stamps
    const holeR = 4.6;
    const toothW = 6.2;
    const cornerTab = 9.5;

    const d = [];

    // TOP EDGE: from (0, 0) to (w, 0)
    const availX = w - 2 * cornerTab;
    const pitchX = 2 * holeR + toothW;
    const nx = Math.max(1, Math.round(availX / pitchX));
    const actualPitchX = availX / nx;
    const actualHrX = Math.min(holeR, actualPitchX * 0.38);
    const actualTwX = actualPitchX - 2 * actualHrX;

    d.push("M 0 0");
    let curX = cornerTab;
    d.push(`L ${curX.toFixed(2)} 0`);

    for (let i = 0; i < nx; i++) {
      const nextX = curX + 2 * actualHrX;
      d.push(`A ${actualHrX.toFixed(2)} ${actualHrX.toFixed(2)} 0 0 0 ${nextX.toFixed(2)} 0`);
      curX = nextX;
      if (i < nx - 1) {
        curX += actualTwX;
        d.push(`L ${curX.toFixed(2)} 0`);
      }
    }
    d.push(`L ${w.toFixed(2)} 0`);

    // RIGHT EDGE: from (w, 0) to (w, h)
    const availY = h - 2 * cornerTab;
    const pitchY = 2 * holeR + toothW;
    const ny = Math.max(1, Math.round(availY / pitchY));
    const actualPitchY = availY / ny;
    const actualHrY = Math.min(holeR, actualPitchY * 0.38);
    const actualTwY = actualPitchY - 2 * actualHrY;

    let curY = cornerTab;
    d.push(`L ${w.toFixed(2)} ${curY.toFixed(2)}`);

    for (let i = 0; i < ny; i++) {
      const nextY = curY + 2 * actualHrY;
      d.push(`A ${actualHrY.toFixed(2)} ${actualHrY.toFixed(2)} 0 0 0 ${w.toFixed(2)} ${nextY.toFixed(2)}`);
      curY = nextY;
      if (i < ny - 1) {
        curY += actualTwY;
        d.push(`L ${w.toFixed(2)} ${curY.toFixed(2)}`);
      }
    }
    d.push(`L ${w.toFixed(2)} ${h.toFixed(2)}`);

    // BOTTOM EDGE: from (w, h) to (0, h)
    curX = w - cornerTab;
    d.push(`L ${curX.toFixed(2)} ${h.toFixed(2)}`);

    for (let i = 0; i < nx; i++) {
      const nextX = curX - 2 * actualHrX;
      d.push(`A ${actualHrX.toFixed(2)} ${actualHrX.toFixed(2)} 0 0 0 ${nextX.toFixed(2)} ${h.toFixed(2)}`);
      curX = nextX;
      if (i < nx - 1) {
        curX -= actualTwX;
        d.push(`L ${curX.toFixed(2)} ${h.toFixed(2)}`);
      }
    }
    d.push(`L 0 ${h.toFixed(2)}`);

    // LEFT EDGE: from (0, h) to (0, 0)
    curY = h - cornerTab;
    d.push(`L 0 ${curY.toFixed(2)}`);

    for (let i = 0; i < ny; i++) {
      const nextY = curY - 2 * actualHrY;
      d.push(`A ${actualHrY.toFixed(2)} ${actualHrY.toFixed(2)} 0 0 0 0 ${nextY.toFixed(2)}`);
      curY = nextY;
      if (i < ny - 1) {
        curY -= actualTwY;
        d.push(`L 0 ${curY.toFixed(2)}`);
      }
    }
    d.push("L 0 0 Z");

    return d.join(" ");
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02] ${className}`}
    >
      {/* Authentic Perforated Stamp Paper (warm cream fill, soft paper edge, NO drop shadow) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        width={dimensions.w}
        height={dimensions.h}
        viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
        fill="none"
      >
        <path
          d={stampPath}
          fill="#fbf9f4"
          stroke="#dcd5c7"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      {/* Inner Image Frame (generous paper border without inner black line) */}
      <div className={`absolute inset-[13px] sm:inset-[14px] overflow-hidden bg-neutral-100 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}

// Custom Amber/Orange Postage Stamp About Card
function NoteCard({ onClick, onMouseEnter, onFocus }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      className="relative w-full h-full select-none cursor-pointer group transition-transform duration-300 ease-out group-hover:scale-[1.02]"
    >
      <img
        src={stampAboutOrange}
        alt="About Yogesh - Postage Stamp"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
    </div>
  );
}

// Interactive Couple Card with Handwriting "better half ❤️" on Hover/Tap
function CoupleCard({ imageSrc }) {
  const [isHovered, setIsHovered] = useState(false);
  const text = "better half";
  const letters = text.split("");

  return (
    <div
      onClick={() => setIsHovered(prev => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Couple postage stamp, toggle love note"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsHovered(prev => !prev); }}
      className="relative w-full h-full select-none cursor-pointer transition-transform duration-300 ease-out group-hover:scale-[1.02]"
    >
      <img
        src={imageSrc}
        alt="Yogesh and partner"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain select-none transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle dimming on hover over inner photo area without dimming the pink perforated teeth */}
      <div
        className={`absolute inset-[15px] bg-black/35 rounded-[6px] transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Cursive Handwriting placed directly in the Middle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center justify-center gap-2 text-center"
            >
              {/* Handwritten letters in cursive font */}
              <div
                className="flex items-center text-white text-[32px] sm:text-[36px] tracking-wide"
                style={{
                  fontFamily: "'Sacramento', 'Caveat', cursive",
                  lineHeight: 1,
                }}
              >
                {letters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 6, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.14,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>

              {/* Glowing Love Heart Icon pops in once writing completes */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.45, 1], opacity: 1 }}
                transition={{
                  delay: letters.length * 0.08 + 0.08,
                  duration: 0.35,
                  ease: "backOut",
                }}
                className="inline-flex items-center"
              >
                <Heart className="w-6 h-6 fill-[#ff2e63] text-[#ff2e63] animate-pulse" />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Reveal the heading and case studies grid smoothly without lag on fast scroll or mobile.
function ScrollRevealSection({ sectionRef, children }) {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1280);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 25%'],
  });

  // Direct 1:1 tracking without spring physics lag so fast scrolling never misses
  const y = useTransform(scrollYProgress, [0, 1], [isDesktop ? -32 : 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [isDesktop ? 0.75 : 1, 1]);

  if (!isDesktop || reduceMotion) {
    return (
      <div className="works-reveal-slot relative min-w-0">
        <div className="works-reveal w-full origin-top">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="works-reveal-slot relative min-w-0">
      <motion.div
        className="works-reveal w-full origin-top"
        style={{ y, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Interactive Case study card with smooth hover and click navigation.
function CaseStudyCard({ coverImage, title, outcome, description, onClick, onMouseEnter, onFocus }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      role={onClick ? "link" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (onClick && event.key === "Enter") onClick();
      }}
      initial={reduced ? false : { opacity: 0, y: 32, scale: .98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: .18 }}
      transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
      data-interactive={Boolean(onClick)}
      whileHover={reduced ? undefined : { y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className={`case-study-card w-full bg-white rounded-[24px] border border-black/[0.08] overflow-hidden flex flex-col group transition-all duration-300 hover:border-black/20 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.08)] relative select-none will-change-transform ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Banner */}
      <div className="relative w-full h-[210px] sm:h-[220px] overflow-hidden select-none bg-gray-50">
        <img 
          src={coverImage} 
          alt={`${title} project preview`} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-basier text-[17.5px] sm:text-[18.5px] font-bold not-italic text-[#18181b] tracking-tight leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="font-basier text-[13.5px] text-[#71717a] leading-[1.55] line-clamp-3 font-normal">
            {description}
          </p>
          {outcome && <p className="project-outcome">{outcome}</p>}
        </div>
      </div>
    </motion.div>
  );
}

// Brand glyphs from Bootstrap Icons 1.11.3 (MIT).
function LinkedInIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
    </svg>
  );
}

function BehanceIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z"/>
    </svg>
  );
}

function EmailIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
    </svg>
  );
}

function PortraitLogoIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="pLogoGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#26C0FF" />
          <stop offset="0.25" stopColor="#E600C2" />
          <stop offset="0.5" stopColor="#FF494E" />
          <stop offset="0.75" stopColor="#FFA13E" />
          <stop offset="1" stopColor="#00CC3D" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="url(#pLogoGrad)" strokeWidth="2.5" />
    </svg>
  );
}

// Exact Figma Assets
import imgBg from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.png';
import imgAvatar from './assets/208bdeb27929c60ddd450ef1458fb5c7036a5b8f.png';
import imgBeanie from './assets/29e6abd0792f8f552ecb57740b38e2904bfa9b53.png';
import imgWomen from './assets/2706ad31caba7f218e50e6bce4e19c7e9ebc1f7e.png';
import imgPolaroid from './assets/b098875ed908e731d63e630d216dc3e2263ed1d3.png';
import imgMatcha from './assets/e4dbcdd77bc9c13d2de4378af5f748570474120d.png';
import imgNote from './assets/65b0d33492ffd94741f4de8fe2d01b44ab5a58c3.png';

// User Uploaded Photos & Custom Postage Stamps (Full resolution edge-to-edge)
import photoStatue from './assets/photo_statue.jpg';
import photoLighthouse from './assets/photo_lighthouse.jpg';
import photoTemple from './assets/photo_temple.jpg';
import stampTemple from './assets/stamp_temple.png';
import photoCouple from './assets/photo_couple_full.jpg';
import stampCouple from './assets/stamp_couple.png';
import stampCycling from './assets/stamp_cycling.png';
import stampLighthouse from './assets/stamp_lighthouse.png';
import photoCycle from './assets/photo_cycle_full.jpg';
import photoPrabhas from './assets/photo_prabhas.jpg';
import stampPrabhas from './assets/stamp_prabhas.png';

// Section 3 Case Study Cover Images
import coverPoints from './assets/cover_points.png';


import coverEdtech from './assets/cover_edtech.png';
import coverIdentity from './assets/cover_identity.png';
import coverHealth from './assets/cover_health.jpg';

// 3D Star Sparkle Asset from Figma (Node 314:1415)
import starSparkle from './assets/star_sparkle.png';
import footerBlueTexture from './assets/footer-blue-texture.jpg';
import nimbuMirchi from './assets/nimbu_mirchi.png';

// Waving Indian "Nimbu Mirchi" (Lemon & Chilli) Nazar Battu Hanging Charm
function WavingNimbuMirchi({ bottomPosition = 'clamp(270px, 46vh, 400px)' }) {
  return (
    <div 
      className="absolute left-1/2 z-20 pointer-events-auto flex flex-col items-center"
      style={{
        bottom: bottomPosition,
        transform: 'translate(-50%, 100%)',
      }}
    >
      {/* Hanging anchor pin / hook aligned directly with the thread */}
      <div 
        className="w-1.5 h-1.5 rounded-full bg-white/90 mb-[-1px] z-10" 
        style={{ transform: 'translateX(-4px)' }}
      />

      {/* Swinging pendulum charm (continuous natural wave via GPU compositor thread) */}
      <div
        aria-label="Waving Nimbu Mirchi charm (Lemon and Chillies good luck ornament)"
        role="img"
        className="nimbu-pendulum-wave select-none pointer-events-none"
        style={{
          transformOrigin: '43.4% 0px',
        }}
      >
        <img
          src={nimbuMirchi}
          alt="Nimbu Mirchi - Traditional lemon and chilli hanging good luck charm"
          loading="lazy"
          decoding="async"
          className="w-[42px] sm:w-[50px] md:w-[58px] lg:w-[64px] h-auto object-contain pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

// Lassie-style White Footer Card (The Rising Curtain Layer)
function WhiteFooterCard({ navigateToCaseStudy, navigateToAbout, onScrollToWorks }) {
  return (
    <footer
      id="footer"
      className="relative z-10 w-full rounded-b-[40px] sm:rounded-b-[56px] md:rounded-b-[68px] bg-white border-b border-black/[0.06] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] pt-16 sm:pt-24 pb-16 px-6 sm:px-12 md:px-16 select-none"
    >
      <div className="w-[1472px] max-w-[92vw] mx-auto text-center">
        
        {/* Top Navbar Row (Like Lassie) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-[13px] font-medium text-zinc-700 shadow-xs">
            <span className="font-semibold text-zinc-900 tracking-tight">Yogesh Battula</span>
            <span className="text-zinc-300">|</span>
            <button
              onClick={onScrollToWorks || (() => {
                if (window.lenis) {
                  window.lenis.scrollTo('#selected-works', { offset: -24, duration: 1.0 });
                } else {
                  document.getElementById('selected-works')?.scrollIntoView({ behavior: 'smooth' });
                }
              })}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Works
            </button>
            <span className="text-zinc-300">|</span>
            <button
              onClick={navigateToAbout || (() => {
                if (window.lenis) {
                  window.lenis.scrollTo(0, { duration: 1.0 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              })}
              className="hover:text-black transition-colors cursor-pointer"
            >
              About
            </button>
          </div>
        </div>

        {/* Main Content: Headline in The Seasons & CTA */}
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-seasons text-[36px] sm:text-[48px] md:text-[56px] font-normal not-italic text-[#111827] tracking-tight leading-[1.12]"
            style={{ fontFamily: "'The Seasons', Georgia, serif" }}
          >
            Design that shapes the <br />
            product experience
          </h2>

          <div className="mt-7 sm:mt-9 flex justify-center">
            <a
              href="mailto:yogeshbattula55@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white text-[14px] font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] active:scale-95 shadow-sm"
            >
              Get in touch
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

const roles = ['Product', 'UX', 'UI'];

export default function App() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const returnToWorks = useRef(false);
  const worksRef = useRef(null);

  // Initialize Lenis Kinetic Smooth Scrolling
  useEffect(() => {
    if (reduceMotion) return;

    // Use native momentum on pure mobile touch devices (phones), while retaining
    // silky smooth Lenis physics across all desktop, laptop, and precision trackpad setups.
    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    if (isTouchOnly) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, [reduceMotion]);

  // Route detector supporting both clean path URLs (/about, /case-study/ahamx) and legacy hash URLs (/#/about)
  const parseCurrentRoute = () => {
    if (typeof window === 'undefined') return 'home';
    const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const hash = (window.location.hash || '').toLowerCase();

    // Check pathname first (clean URLs)
    if (pathname === '/about' || pathname.startsWith('/about/')) return 'about';
    if (pathname === '/case-study/ahamx' || pathname === '/ahamx') return 'ahamx';
    if (pathname === '/case-study/ryzeup' || pathname === '/ryzeup') return 'ryzeup';
    if (pathname === '/case-study/trosky' || pathname === '/trosky') return 'trosky';

    // Support legacy hash if present (e.g. #/about, #about, #/case-study/ahamx)
    const cleanHash = hash.replace(/^#\/?/, '').trim();
    if (cleanHash === 'about' || cleanHash.startsWith('about/')) return 'about';
    if (cleanHash === 'case-study/ahamx' || cleanHash === 'ahamx') return 'ahamx';
    if (cleanHash === 'case-study/ryzeup' || cleanHash === 'ryzeup') return 'ryzeup';
    if (cleanHash === 'case-study/trosky' || cleanHash === 'trosky') return 'trosky';

    return 'home';
  };

  const getInitialRouteInfo = () => {
    if (typeof window === 'undefined') return { route: 'home', hasIntro: true, title: 'Yogesh' };
    const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const hash = (window.location.hash || '').toLowerCase();
    const full = `${pathname} ${hash}`;

    if (full.includes('nointro')) {
      return { route: 'home', hasIntro: false, title: 'Yogesh' };
    }
    const route = parseCurrentRoute();
    if (route === 'about') {
      return { route: 'about', hasIntro: true, title: 'About' };
    }
    if (['ahamx', 'ryzeup', 'trosky'].includes(route)) {
      return { route, hasIntro: true, title: 'Case study' };
    }
    return { route: 'home', hasIntro: true, title: 'Yogesh' };
  };

  // Opening / Preloader Animation State (Home: "Yogesh", Case Studies: "Case study", About: "About")
  const [introState, setIntroState] = useState(() => {
    const info = getInitialRouteInfo();
    return { show: info.hasIntro, title: info.title, key: `initial-${info.route}` };
  });

  // Track if website components should play open-site entrance animation
  const [siteOpened, setSiteOpened] = useState(() => {
    const info = getInitialRouteInfo();
    return info.route !== 'home' || !info.hasIntro;
  });

  // Track if case study components should play entrance animation on reveal
  const [caseStudyRevealed, setCaseStudyRevealed] = useState(() => {
    const info = getInitialRouteInfo();
    return !['ahamx', 'ryzeup', 'trosky'].includes(info.route);
  });

  // Track if about page components should play entrance animation on reveal
  const [aboutRevealed, setAboutRevealed] = useState(() => {
    const info = getInitialRouteInfo();
    return info.route !== 'about';
  });
  const entranceEase = [0.16, 1, 0.3, 1];

  // Prevent background scrolling while opening animation is active
  useEffect(() => {
    let unlockTimer;
    if (introState.show) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.stop();
        window.lenis.scrollTo(0, { immediate: true });
      }
      // Hard failsafe: guarantee scroll is always released after 2200ms
      unlockTimer = setTimeout(() => {
        document.body.style.overflow = '';
        if (window.lenis) {
          window.lenis.start();
          window.lenis.resize();
        }
      }, 2200);
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
        requestAnimationFrame(() => window.lenis?.resize());
      }
    }
    return () => {
      if (unlockTimer) clearTimeout(unlockTimer);
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [introState.show]);

  // Clean HTML5 Path-based Router for Case Studies & About Page
  const [currentView, setCurrentView] = useState(() => {
    return parseCurrentRoute();
  });

  // Upgrade legacy hash URLs (/#/about) to clean URLs (/about) without reload
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('about')) {
        window.history.replaceState(null, '', '/about');
      } else if (hash.includes('ahamx')) {
        window.history.replaceState(null, '', '/case-study/ahamx');
      } else if (hash.includes('ryzeup')) {
        window.history.replaceState(null, '', '/case-study/ryzeup');
      } else if (hash.includes('trosky')) {
        window.history.replaceState(null, '', '/case-study/trosky');
      } else if (hash.includes('selected-works')) {
        window.history.replaceState(null, '', '/');
      }
    }
  }, []);

  // Listen to popstate (browser back/forward) and hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const targetView = parseCurrentRoute();
      const hash = window.location.hash || '';

      if (hash === '#selected-works') {
        returnToWorks.current = true;
      }

      setCurrentView((prev) => {
        if (prev !== targetView) {
          if (targetView !== 'home') {
            const title = targetView === 'about' ? 'About' : 'Case study';
            if (targetView === 'about') {
              setAboutRevealed(false);
            } else {
              setCaseStudyRevealed(false);
            }
            setIntroState({ show: true, title, key: `${targetView}-${Date.now()}` });
            window.scrollTo({ top: 0, behavior: 'instant' });
          } else {
            // Returning to home via browser back/forward buttons
            setSiteOpened(true);
            setIntroState((prevIntro) => ({ ...prevIntro, show: false }));
            if (hash === '#selected-works' || returnToWorks.current) {
              returnToWorks.current = true;
            } else {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          }
        }
        return targetView;
      });
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToCaseStudy = (slug) => {
    setCaseStudyRevealed(false);
    setIntroState({ show: true, title: 'Case study', key: `case-study-${slug}-${Date.now()}` });
    window.history.pushState(null, '', `/case-study/${slug}`);
    setCurrentView(slug);
    window.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToAbout = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        window.__portfolioAudioCtx = window.__portfolioAudioCtx || new AudioCtx();
        if (window.__portfolioAudioCtx.state === 'suspended') {
          window.__portfolioAudioCtx.resume().catch(() => {});
        }
      }
    } catch (e) {}
    setAboutRevealed(false);
    setIntroState({ show: true, title: 'About', key: `about-${Date.now()}` });
    window.history.pushState(null, '', '/about');
    setCurrentView('about');
    window.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (target = 'works') => {
    if (target === 'works') {
      returnToWorks.current = true;
      window.history.pushState(null, '', '/');
    } else {
      returnToWorks.current = false;
      window.history.pushState(null, '', '/');
      window.lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setCurrentView('home');
  };

  // Silky smooth, easing-controlled scroll down to Selected Works
  const handleScrollToWorks = () => {
    if (reduceMotion) {
      document.getElementById('selected-works')?.scrollIntoView({ behavior: 'instant' });
      return;
    }

    if (window.lenis) {
      window.lenis.scrollTo('#selected-works', { offset: -24, duration: 1.2 });
      return;
    }

    const targetEl = document.getElementById('selected-works');
    if (!targetEl) return;

    const startY = window.scrollY || window.pageYOffset;
    const targetY = targetEl.getBoundingClientRect().top + startY - 24;
    const distance = targetY - startY;

    if (Math.abs(distance) < 2) return;

    const duration = 1100; // Velvety 1.1s glide
    const startTime = performance.now();

    let isCancelled = false;
    const cancelEvents = ['wheel', 'touchmove', 'keydown', 'mousedown'];
    const cancelScroll = () => {
      isCancelled = true;
      cleanup();
    };
    const cleanup = () => {
      cancelEvents.forEach((ev) => window.removeEventListener(ev, cancelScroll));
    };
    cancelEvents.forEach((ev) => window.addEventListener(ev, cancelScroll, { passive: true }));

    // Silky quart ease-out for luxurious deceleration without dragging
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animateScroll = (currentTime) => {
      if (isCancelled) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        cleanup();
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    if (currentView === 'home' && returnToWorks.current) {
      const performScroll = () => {
        const el = document.getElementById('selected-works');
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -24, immediate: true });
          } else {
            el.scrollIntoView({ behavior: 'instant' });
          }
          document.querySelector('.case-study-card[data-interactive="true"]')?.focus({ preventScroll: true });
          returnToWorks.current = false;
          return true;
        }
        return false;
      };

      if (!performScroll()) {
        const timer1 = setTimeout(performScroll, 80);
        const timer2 = setTimeout(performScroll, 340);
        const timer3 = setTimeout(performScroll, 600);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      }
    }
  }, [currentView]);

  // Synchronize Lenis scroll position and recalculate document height across page transitions
  useEffect(() => {
    if (window.lenis) {
      if (!returnToWorks.current) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      const timer1 = setTimeout(() => window.lenis?.resize(), 60);
      const timer2 = setTimeout(() => window.lenis?.resize(), 250);
      const timer3 = setTimeout(() => window.lenis?.resize(), 650);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [currentView]);

  // Track window scroll
  const { scrollY, scrollYProgress } = useScroll();

  // Dynamic footer background stretch on final scroll to seamlessly fill gaps behind rounded card corners
  const footerBgScaleY = useTransform(scrollYProgress, [0.82, 1], [0.96, 1.05]);
  const smoothFooterBgScaleY = useSpring(footerBgScaleY, {
    stiffness: 220,
    damping: 30,
    mass: 0.2,
  });

  // Lenis owns smoothing; visual transforms track its actual scroll position.
  const smoothScrollY = scrollY;

  // Interpolation range: over natural page scroll down to the card (0px to 480px)
  const scrollRange = [0, 480];

  // Hero Section subtle fade, parallax shift, and gentle scale-down on scroll
  const heroOpacity = useTransform(smoothScrollY, [0, 500, 760], [1, 1, 0.5]);
  const heroScale = useTransform(smoothScrollY, [0, 360], [1, 0.98]);
  const heroY = useTransform(smoothScrollY, [0, 360], [0, 35]);

  // Section 2: Profile Bento Card subtle entrance scale & shadow depth
  const cardScale = useTransform(smoothScrollY, [0, 480], [0.96, 1]);
  const cardY = useTransform(smoothScrollY, [0, 480], [20, 0]);

  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useLayoutEffect(() => {
    smoothScrollY.jump(window.scrollY);
    let frame;
    let active = true;
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Ignore mobile address-bar collapse/expand (height-only changes) to prevent scroll stutter
      if (Math.abs(window.innerWidth - lastWidth) < 15) return;
      lastWidth = window.innerWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScreenWidth(window.innerWidth);
      });
    };
    document.fonts.ready.then(() => { if (active) handleResize(); });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView]);

  // Butter-Smooth fluid bezier curve for natural flight trajectory
  const fluidEase = cubicBezier(0.22, 1, 0.36, 1);

  // Placeholder slot outline opacity (visible when looking at empty card, fades to 0 as images land)
  const slotOpacity = useTransform(smoothScrollY, [0, 240], [1, 0]);

  // A stable shadow avoids repainting six large blurred surfaces every frame.
  const floatingShadow = '0 10px 28px -10px rgba(0, 0, 0, 0.16)';

  const fitFlightX = (preferred, left, width) => {
    const scale = 0.96;
    const origin = (screenWidth - 940 * scale) / 2 + (left + 6) * scale;
    const min = (48 - origin) / scale;
    const max = (screenWidth - 48 - width * scale - origin) / scale;
    return Math.max(min, Math.min(preferred, max));
  };

  // Image 1: Beach Photo -> Slot 1
  const img1X = useTransform(smoothScrollY, scrollRange, [fitFlightX(-370, 36, 172), 0]);
  const img1Y = useTransform(smoothScrollY, scrollRange, [-900, 0]);
  const img1ScaleX = useTransform(smoothScrollY, scrollRange, [172 / 205, 1]);
  const img1ScaleY = useTransform(smoothScrollY, scrollRange, [182 / 210, 1]);
  const img1Rotate = useTransform(smoothScrollY, scrollRange, [-7.5, 0]);

  // Image 2: Golden Retriever -> Slot 2
  const img2X = useTransform(smoothScrollY, scrollRange, [fitFlightX(-630, 257, 330), 0]);
  const img2Y = useTransform(smoothScrollY, scrollRange, [-519, 0]);
  const img2ScaleX = useTransform(smoothScrollY, scrollRange, [330 / 426, 1]);
  const img2ScaleY = useTransform(smoothScrollY, scrollRange, [165 / 210, 1]);
  const img2Rotate = useTransform(smoothScrollY, scrollRange, [-15, 0]);

  // Image 3: Cycling Photo -> Slot 3
  const img3X = useTransform(smoothScrollY, scrollRange, [fitFlightX(450, 699, 156), 0]);
  const img3Y = useTransform(smoothScrollY, scrollRange, [-979, 0]);
  const img3ScaleX = useTransform(smoothScrollY, scrollRange, [156 / 205, 1]);
  const img3ScaleY = useTransform(smoothScrollY, scrollRange, [330 / 436, 1]);
  const img3Rotate = useTransform(smoothScrollY, scrollRange, [12, 0]);

  // Image 4: Couple Photo -> Slot 4
  const img4X = useTransform(smoothScrollY, scrollRange, [fitFlightX(-290, 36, 168), 0]);
  const img4Y = useTransform(smoothScrollY, scrollRange, [-605, 0]);
  const img4ScaleX = useTransform(smoothScrollY, scrollRange, [168 / 205, 1]);
  const img4ScaleY = useTransform(smoothScrollY, scrollRange, [172 / 210, 1]);
  const img4Rotate = useTransform(smoothScrollY, scrollRange, [10, 0]);

  // Image 5: Breakfast Plate -> Slot 5
  const img5X = useTransform(smoothScrollY, scrollRange, [fitFlightX(680, 257, 390), 0]);
  const img5Y = useTransform(smoothScrollY, scrollRange, [-630, 0]);
  const img5ScaleX = useTransform(smoothScrollY, scrollRange, [168 / 205, 1]);
  const img5ScaleY = useTransform(smoothScrollY, scrollRange, [172 / 210, 1]);
  const img5Rotate = useTransform(smoothScrollY, scrollRange, [-8, 0]);

  // Image 6: Note Card -> Slot 6
  const img6X = useTransform(smoothScrollY, scrollRange, [fitFlightX(560, 478, 205), 0]);
  const img6Y = useTransform(smoothScrollY, scrollRange, [-680, 0]);
  const img6ScaleX = useTransform(smoothScrollY, scrollRange, [205 / 205, 1]);
  const img6ScaleY = useTransform(smoothScrollY, scrollRange, [210 / 210, 1]);
  const img6Rotate = useTransform(smoothScrollY, scrollRange, [6, 0]);

  const staticLayout = reduceMotion;

  return (
    <>
      <CustomCursor />

      {/* Starting / Opening / Case Study / About Reveal Animation */}
      {introState.show && (
        <OpeningAnimation
          key={introState.key}
          title={introState.title}
          reduceMotion={reduceMotion}
          onRevealStart={() => {
            if (introState.title === 'Yogesh') {
              setSiteOpened(true);
            } else if (introState.title === 'About') {
              setAboutRevealed(true);
            } else {
              setCaseStudyRevealed(true);
            }
          }}
          onComplete={() => {
            if (introState.title === 'Yogesh') {
              setSiteOpened(true);
            } else if (introState.title === 'About') {
              setAboutRevealed(true);
            } else {
              setCaseStudyRevealed(true);
            }
            setIntroState((prev) => ({ ...prev, show: false }));
          }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {currentView === 'ahamx' ? (
          <motion.div
            key="ahamx"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <React.Suspense fallback={<div className="min-h-screen bg-[#fafafa]" />}>
              <CaseStudyAhamX onBack={navigateToHome} isRevealed={caseStudyRevealed} />
            </React.Suspense>
          </motion.div>
        ) : currentView === 'trosky' ? (
          <motion.div
            key="trosky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <React.Suspense fallback={<div className="min-h-screen bg-[#fafafa]" />}>
              <CaseStudyTrosky onBack={navigateToHome} isRevealed={caseStudyRevealed} />
            </React.Suspense>
          </motion.div>
        ) : currentView === 'ryzeup' ? (
          <motion.div
            key="ryzeup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <React.Suspense fallback={<div className="min-h-screen bg-[#fafafa]" />}>
              <CaseStudyRyzeup onBack={navigateToHome} isRevealed={caseStudyRevealed} />
            </React.Suspense>
          </motion.div>
        ) : currentView === 'about' ? (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <React.Suspense fallback={<div className="min-h-screen bg-[#fafafa]" />}>
              <AboutPage onBack={() => navigateToHome('about')} isRevealed={aboutRevealed} />
            </React.Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (returnToWorks.current) {
                returnToWorks.current = false;
                const el = document.getElementById('selected-works');
                if (el) {
                  if (window.lenis) {
                    window.lenis.scrollTo(el, { offset: -24, immediate: true });
                  } else {
                    el.scrollIntoView({ behavior: 'instant' });
                  }
                }
              }
            }}
          >

      {/* ----------------------------------------------------------------- */}
      {/* LAYER 0: PINNED LIGHT BLUE FOOTER (UNDERNEATH LAYER / Z-0)         */}
      {/* ----------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 w-full z-0 overflow-hidden flex items-end justify-center select-none pointer-events-none"
        style={{
          height: 'calc(clamp(270px, 46vh, 400px) + 200px)',
        }}
      >
        {/* Dynamically stretched background that extends up behind the white card to fill gaps */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${footerBlueTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1799f6',
            transformOrigin: 'bottom center',
            scaleY: staticLayout || reduceMotion ? 1 : smoothFooterBgScaleY,
          }}
        />

        {/* Waving Indian Nimbu Mirchi (Lemon & Chilli) Nazar Battu Hanging Charm */}
        <WavingNimbuMirchi />

        <h1
          className="relative z-10 text-white text-[20vw] sm:text-[21vw] font-bold tracking-tight leading-[0.78] select-none text-center pointer-events-none transform translate-y-[3%]"
          style={{ fontFamily: "'The Seasons', Georgia, serif" }}
        >
          Battula
        </h1>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* LAYER 1: MAIN CONTENT WRAPPER (SOLID WHITE, RELATIVE Z-10)        */}
      {/* ----------------------------------------------------------------- */}
      <div
        className="relative z-10 bg-[#ffffff] min-h-screen font-sans text-gray-900 selection:bg-pink-100 overflow-x-clip pt-4 rounded-b-[40px] sm:rounded-b-[56px] md:rounded-b-[68px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)]"
        style={{
          marginBottom: 'clamp(270px, 46vh, 400px)',
        }}
      >
      
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: HERO SECTION                                          */}
      {/* ----------------------------------------------------------------- */}
      <motion.section 
        style={{
          opacity: staticLayout ? 1 : heroOpacity,
          scale: staticLayout ? 1 : heroScale,
          y: staticLayout ? 0 : heroY,
        }}
        className="hero-section relative w-[1472px] max-w-[96vw] min-h-[calc(100svh-24px)] sm:min-h-[calc(100svh-32px)] md:min-h-[640px] xl:h-[787px] mx-auto rounded-[20px] sm:rounded-[28px] xl:rounded-[32px] border border-black/[0.08] overflow-hidden flex flex-col items-center justify-center will-change-transform py-8 sm:py-10 xl:py-0 px-3 sm:px-6"
      >
        {/* Ambient gradient hero background matching case studies */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.3) 40%, #ffffff 100%), url(${imgBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Hero Text & Domain Capsule */}
        <div className="home-hero-copy relative z-10 flex flex-col items-center text-center max-w-5xl px-2 sm:px-4">

          {/* Main Headline */}
          <h1 
            className="home-hero-title tracking-tight sm:tracking-[-1px] mx-auto flex flex-col md:flex-row items-center justify-center gap-y-1 sm:gap-y-2 md:gap-y-0 md:gap-x-3.5 whitespace-normal md:whitespace-nowrap"
            style={{
              fontFamily: "'The Seasons', Georgia, serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 'clamp(28px, 6.2vw, 72px)',
              lineHeight: 'clamp(36px, 7vw, 78px)',
              color: '#08304C',
            }}
          >
            {/* On mobile: Line 1 pairs Designing with Product pill. On desktop: flows inline */}
            <div className="flex items-center justify-center gap-x-1.5 sm:gap-x-3.5 flex-nowrap shrink-0">
              <motion.span
                initial={!reduceMotion ? { opacity: 0, y: 22 } : false}
                animate={siteOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.8, delay: 0.08, ease: entranceEase }}
              >
                Designing
              </motion.span>
              <motion.span 
                initial={!reduceMotion ? { opacity: 0, scale: 0.94 } : false}
                animate={siteOpened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.8, delay: 0.16, ease: entranceEase }}
                className="relative inline-flex items-center justify-center bg-white/95 rounded-[14px] sm:rounded-[18px] px-[12px] sm:px-[18px] xl:px-[22px] py-[3px] sm:py-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.08] group/product cursor-pointer align-middle my-[-2px] sm:my-[-4px] transition-all duration-300 shrink-0 gap-[6px] sm:gap-[8px] hover:border-black/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              >
                <span
                  className="capitalize text-[#08304C] not-italic"
                  style={{
                    fontFamily: "'The Seasons', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '0.9em',
                    lineHeight: 'normal',
                  }}
                >
                  Products
                </span>

                {/* Hero Star Sparkle directly inside the pill */}
                <span
                  className="relative inline-flex items-center justify-center w-[15px] sm:w-[22px] xl:w-[28px] h-[15px] sm:h-[22px] xl:h-[28px] shrink-0 pointer-events-none"
                >
                  <img src={starSparkle} alt="✦" className="w-full h-full object-contain" />
                </span>
              </motion.span>
            </div>
            <motion.span 
              initial={!reduceMotion ? { opacity: 0, y: 22 } : false}
              animate={siteOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.8, delay: 0.22, ease: entranceEase }}
              className="shrink-0 whitespace-nowrap"
            >
              that work.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
            animate={siteOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.30, ease: entranceEase }}
            className="text-[12.5px] sm:text-[15.5px] text-[rgba(8,48,76,0.72)] mt-2 sm:mt-3.5 max-w-[330px] sm:max-w-[480px] leading-[18px] sm:leading-[24px] tracking-[-0.15px]"
          >
            I'm Yogesh, a product designer with 5+ years of experience. I design apps that look clean on the surface and make sense underneath.
          </motion.p>

          <motion.div className="home-primary-actions" initial={reduceMotion?false:{opacity:0,y:12}} animate={siteOpened?{opacity:1,y:0}:{opacity:0,y:12}} transition={{duration:.5,delay:.3}}>
            <p className="home-availability"><span aria-hidden="true"/>Open to Product Design roles</p>
            <button onClick={handleScrollToWorks} className="home-work-button" aria-label="View my work">
              <span className="home-work-button-inner">
                <span>View my work</span>
                <span className="home-work-button-arrow" aria-hidden="true">↗</span>
              </span>
            </button>
          </motion.div>

          {/* Location Line */}
          <motion.p 
            initial={!reduceMotion ? { opacity: 0, y: 16 } : false}
            animate={siteOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.75, delay: 0.52, ease: entranceEase }}
            className="mt-2.5 sm:mt-3.5 text-[11.5px] sm:text-[13.5px] text-[rgba(8,48,76,0.65)] font-medium tracking-tight"
          >
            Based in Hyderabad, India
          </motion.p>
        </div>
      </motion.section>


      {/* ----------------------------------------------------------------- */}
      <motion.div 
        initial={!reduceMotion ? { opacity: 0, y: 28 } : false}
        animate={siteOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.85, delay: 0.55, ease: entranceEase }}
        className="responsive-profile relative z-30 block xl:hidden w-full max-w-[940px] mx-auto px-3 sm:px-4 mt-6 sm:mt-8"
      >
        <motion.section 
          style={reduceMotion ? undefined : {
            scale: cardScale,
            y: cardY,
            transformOrigin: "center center",
          }}
          className="w-full"
        >
          <div className="bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] p-[4px] rounded-[24px]">
            <div className="bg-white rounded-[20px] p-4 sm:p-5 relative">
              
              {/* Header */}
              <div className="profile-header flex flex-wrap items-center justify-between gap-4 mb-4 pb-1">
                <div className="flex items-center gap-3">
                  <img
                    src={photoAvatar}
                    alt="Yogesh"
                    loading="lazy"
                    decoding="async"
                    className="shrink-0 w-[52px] h-[52px] rounded-full object-cover shadow-sm border border-black/5"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-[17px] font-medium text-[#202020] tracking-tight leading-snug">
                        Yogesh
                      </h2>
                      {/* Star directly next to name */}
                      <motion.img 
                        src={starSparkle} 
                        alt="Sparkle star" 
                        loading="lazy"
                        decoding="async"
                        animate={{ rotate: reduceMotion ? 0 : 360 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] object-contain select-none pointer-events-none"
                      />
                    </div>
                    <p className="text-[13px] text-[#797979] mt-0.5 leading-snug">
                      I design apps that make sense. I film cafés on my Osmo Pocket when I'm off the clock.
                    </p>
                  </div>
                </div>

                <a
                  href="/yogesh-battula-resume.pdf"
                  download="Yogesh_Battula_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2c2c2c] hover:bg-black text-white text-[12px] font-normal rounded-full transition-all shrink-0 cursor-pointer"
                >
                  <FileText className="w-3 h-3 text-white" />
                  Resume
                </a>
              </div>

              {/* Responsive Bento Grid of Stamps */}
              <div className="profile-gallery grid grid-cols-2 gap-2.5 sm:gap-4 max-w-[620px] mx-auto items-stretch">
                
                {/* 1. Coastal Lighthouse (Wide Banner across 2 Columns) */}
                <div className="col-span-2 aspect-[852/420] w-full relative rounded-[14px] sm:rounded-[18px] border border-dashed border-gray-200/80 bg-gray-50/20">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center cursor-pointer group origin-center"
                  >
                    <div className="w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                      <img 
                        src={stampLighthouse} 
                        alt="Coastal lighthouse surrounded by palm trees - Panoramic Postage Stamp" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-105" 
                      />
                    </div>
                  </motion.div>
                </div>

                {/* 2. Yogesh Cycling (Row 2, Col 1) */}
                <div className="col-start-1 row-start-2 aspect-[205/210] w-full relative rounded-[14px] sm:rounded-[18px] border border-dashed border-gray-200/80 bg-gray-50/20">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center cursor-pointer group origin-center"
                  >
                    <div className="w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                      <img 
                        src={stampCycling} 
                        alt="Yogesh cycling on campus - Postage Stamp" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-105" 
                      />
                    </div>
                  </motion.div>
                </div>

                {/* 3. Temple Gopuram (Row 2 & 3, Col 2 - Spans 2 Rows vertically) */}
                <div className="col-start-2 row-start-2 row-span-2 aspect-[205/436] w-full relative rounded-[14px] sm:rounded-[18px] border border-dashed border-gray-200/80 bg-gray-50/20">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center cursor-pointer group origin-center"
                  >
                    <div className="w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                      <img 
                        src={stampTemple} 
                        alt="Historic temple gopuram with devotees - Tall Postage Stamp" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-105" 
                      />
                    </div>
                  </motion.div>
                </div>

                {/* 4. Couple Card (Row 3, Col 1 - Fits directly under Cycling, level with Temple) */}
                <div className="col-start-1 row-start-3 aspect-[205/210] w-full relative rounded-[14px] sm:rounded-[18px] border border-dashed border-gray-200/80 bg-gray-50/20">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center cursor-pointer group origin-center"
                  >
                    <CoupleCard imageSrc={stampCouple} />
                  </motion.div>
                </div>

                {/* 5. Prabhas Photo (Row 4, Col 1) */}
                <div className="col-start-1 row-start-4 aspect-[205/210] w-full relative rounded-[14px] sm:rounded-[18px] border border-dashed border-gray-200/80 bg-gray-50/20">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center cursor-pointer group origin-center"
                  >
                    <div className="w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                      <img 
                        src={stampPrabhas} 
                        alt="Prabhas with sunflowers in postage stamp" 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-105" 
                      />
                    </div>
                  </motion.div>
                </div>

                {/* 6. Substack Note Card (Row 4, Col 2) */}
                <div className="col-start-2 row-start-4 aspect-[205/210] w-full relative rounded-[14px] sm:rounded-[18px] border border-dashed border-gray-200/80 bg-gray-50/20">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center cursor-pointer group origin-center"
                  >
                    <NoteCard 
                      onClick={navigateToAbout} 
                      onMouseEnter={() => import('./AboutPage')}
                      onFocus={() => import('./AboutPage')}
                    />
                  </motion.div>
                </div>

              </div>

            {/* Floating Bottom Social Dock */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-full border border-gray-200/80">
                <a
                  href="https://www.linkedin.com/in/yogeshbattula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yogesh on LinkedIn (opens in a new tab)"
                  title="LinkedIn"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#0a66c2] hover:text-[#084e96] hover:bg-blue-50/70 transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.behance.net/yogeshbattula5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yogesh on Behance (opens in a new tab)"
                  title="Behance"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#0057ff] hover:text-[#0043c4] hover:bg-blue-50/70 transition-colors"
                >
                  <BehanceIcon className="w-[22px] h-[22px]" />
                </a>
                <a
                  href="mailto:yogeshbattula55@gmail.com"
                  aria-label="Email Yogesh at yogeshbattula55@gmail.com"
                  title="Email Yogesh"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#475569] hover:text-[#0066ff] hover:bg-blue-50/70 transition-colors"
                >
                  <EmailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.section>
    </motion.div>


      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: ANIMATED DESKTOP BENTO (>= 1280px) */}
      {/* ----------------------------------------------------------------- */}
      <motion.div 
        initial={!reduceMotion ? { opacity: 0, y: 28 } : false}
        animate={siteOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.85, delay: 0.55, ease: entranceEase }}
        className="desktop-profile relative z-30 hidden xl:flex w-full justify-center mt-[82px]"
      >
        <motion.section 
          style={{
            scale: cardScale,
            y: cardY,
            transformOrigin: "center center",
          }}
          className="relative shrink-0 w-[940px] max-w-[92vw] mx-auto z-20 will-change-transform"
        >
          {/* Outer card container */}
          <div className="bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.08)] p-[5px] rounded-[24px] relative">
            <div className="bg-white rounded-[20px] p-[32px] relative">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-1">
              <div className="flex items-center gap-3">
                <img
                  src={photoAvatar}
                  alt="Yogesh"
                  className="w-[74px] h-[74px] rounded-full object-cover shadow-sm border border-black/5"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[20px] font-medium text-[#202020] tracking-tight leading-snug">
                      Yogesh
                    </h2>
                    {/* Star directly next to name */}
                    <motion.img 
                      src={starSparkle} 
                      alt="Sparkle star" 
                      animate={{ rotate: reduceMotion ? 0 : 360 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="w-[20px] h-[20px] object-contain select-none pointer-events-none shrink-0"
                    />
                  </div>
                  <p className="text-[14px] text-[#797979]">
                    I design apps that make sense. I film cafés on my Osmo Pocket when I'm off the clock.
                  </p>
                </div>
              </div>

              <a
                href="/yogesh-battula-resume.pdf"
                download="Yogesh_Battula_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2c2c2c] hover:bg-black text-white text-[13px] font-normal rounded-full transition-all hover:scale-[1.02] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-white" />
                Resume
              </a>
            </div>

            {/* 6 Outline Slots Balanced Bento Grid (868px total width) */}
            <motion.div 
              style={{ opacity: slotOpacity }}
              className="grid grid-cols-[205px_426px_205px] gap-[16px] items-start w-[868px] mx-auto pointer-events-none"
            >
              
              {/* Column 1: Slot 1 (Beanie) & Slot 4 (Polaroid) */}
              <div className="flex flex-col gap-[16px]">
                <div className="w-[205px] h-[210px] rounded-[18px] border border-dashed border-gray-200/80 bg-transparent" />
                <div className="w-[205px] h-[210px] rounded-[18px] border border-dashed border-gray-200/80 bg-transparent" />
              </div>

              {/* Column 2: Slot 2 (Dog wide) & [Slot 5 (Matcha) + Slot 6 (Note)] */}
              <div className="flex flex-col gap-[16px]">
                <div className="w-[426px] h-[210px] rounded-[18px] border border-dashed border-gray-200/80 bg-transparent" />
                <div className="flex gap-[16px]">
                  <div className="w-[205px] h-[210px] rounded-[18px] border border-dashed border-gray-200/80 bg-transparent" />
                  <div className="w-[205px] h-[210px] rounded-[18px] border border-dashed border-gray-200/80 bg-transparent" />
                </div>
              </div>

              {/* Column 3: Slot 3 (Two Women portrait tall) */}
              <div>
                <div className="w-[205px] h-[436px] rounded-[18px] border border-dashed border-gray-200/80 bg-transparent" />
              </div>

            </motion.div>

            {/* Floating Bottom Social Dock */}
            <div className="flex justify-center mt-5">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-full border border-gray-200/80">
                <a
                  href="https://www.linkedin.com/in/yogeshbattula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yogesh on LinkedIn (opens in a new tab)"
                  title="LinkedIn"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#0a66c2] hover:text-[#084e96] hover:bg-blue-50/70 transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.behance.net/yogeshbattula5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yogesh on Behance (opens in a new tab)"
                  title="Behance"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#0057ff] hover:text-[#0043c4] hover:bg-blue-50/70 transition-colors"
                >
                  <BehanceIcon className="w-[22px] h-[22px]" />
                </a>
                <a
                  href="mailto:yogeshbattula55@gmail.com"
                  aria-label="Email Yogesh at yogeshbattula55@gmail.com"
                  title="Email Yogesh"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[#475569] hover:text-[#0066ff] hover:bg-blue-50/70 transition-colors"
                >
                  <EmailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* THE 6 FLOATING IMAGES (OUTSIDE THE GRID, ANCHORED TO SLOTS) */}
            {/* ----------------------------------------------------------- */}
            <div className="absolute inset-0 pointer-events-none z-30">
              
              {/* Image 1: Yogesh Cycling -> Slot 1 (left 36px, top 130px) */}
              <motion.div
                style={{
                  x: img1X,
                  y: img1Y,
                  width: 205,
                  height: 210,
                  scaleX: img1ScaleX,
                  scaleY: img1ScaleY,
                  transformOrigin: "top left",
                  willChange: "transform",
                  rotate: img1Rotate,
                }}
                className="absolute left-[36px] top-[130px] pointer-events-auto cursor-pointer group"
              >
                <div className="relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                  <img
                    src={stampCycling}
                    alt="Yogesh cycling on campus - Postage Stamp"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Image 2: Coastal Lighthouse -> Slot 2 (left 257px, top 130px) */}
              <motion.div
                style={{
                  x: img2X,
                  y: img2Y,
                  width: 426,
                  height: 210,
                  scaleX: img2ScaleX,
                  scaleY: img2ScaleY,
                  transformOrigin: "top left",
                  willChange: "transform",
                  rotate: img2Rotate,
                }}
                className="absolute left-[257px] top-[130px] pointer-events-auto cursor-pointer group"
              >
                <div className="relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                  <img
                    src={stampLighthouse}
                    alt="Coastal lighthouse surrounded by palm trees - Panoramic Postage Stamp"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Image 3: Temple Gopuram -> Slot 3 (left 699px, top 130px) */}
              <motion.div
                style={{
                  x: img3X,
                  y: img3Y,
                  width: 205,
                  height: 436,
                  scaleX: img3ScaleX,
                  scaleY: img3ScaleY,
                  transformOrigin: "top left",
                  willChange: "transform",
                  rotate: img3Rotate,
                }}
                className="absolute left-[699px] top-[130px] pointer-events-auto cursor-pointer group"
              >
                <div className="relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                  <img
                    src={stampTemple}
                    alt="Historic temple gopuram with devotees - Tall Postage Stamp"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Image 4: Couple Photo (The Better Half) -> Slot 4 (left 36px, top 356px) */}
              <motion.div
                style={{
                  x: img4X,
                  y: img4Y,
                  width: 205,
                  height: 210,
                  scaleX: img4ScaleX,
                  scaleY: img4ScaleY,
                  transformOrigin: "top left",
                  willChange: "transform",
                  rotate: img4Rotate,
                }}
                className="absolute left-[36px] top-[356px] pointer-events-auto cursor-pointer group"
              >
                <CoupleCard imageSrc={stampCouple} />
              </motion.div>

              {/* Image 5: Prabhas Photo -> Slot 5 (left 257px, top 356px) */}
              <motion.div
                style={{
                  x: img5X,
                  y: img5Y,
                  width: 205,
                  height: 210,
                  scaleX: img5ScaleX,
                  scaleY: img5ScaleY,
                  transformOrigin: "top left",
                  willChange: "transform",
                  rotate: img5Rotate,
                }}
                className="absolute left-[257px] top-[356px] pointer-events-auto cursor-pointer group"
              >
                <div className="relative w-full h-full select-none transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                  <img
                    src={stampPrabhas}
                    alt="Prabhas with sunflowers in postage stamp"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain select-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Image 6: Substack Note Card -> Slot 6 (left 478px, top 356px) */}
              <motion.div
                style={{
                  x: img6X,
                  y: img6Y,
                  width: 205,
                  height: 210,
                  scaleX: img6ScaleX,
                  scaleY: img6ScaleY,
                  transformOrigin: "top left",
                  willChange: "transform",
                  rotate: img6Rotate,
                }}
                className="absolute left-[478px] top-[356px] pointer-events-auto"
              >
                <NoteCard 
                  onClick={navigateToAbout} 
                  onMouseEnter={() => import('./AboutPage')}
                  onFocus={() => import('./AboutPage')}
                />
              </motion.div>

            </div>

          </div>

        </div>

      </motion.section>
    </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: SELECTED WORKS (MORE STORIES)                          */}
      {/* ----------------------------------------------------------------- */}
      {/* White gradient keeps the reveal transition soft and feathered below the second section. */}
      <div
        aria-hidden="true"
        className="profile-white-strip relative z-30 h-10 sm:h-16 w-full bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none"
      />

      <section ref={worksRef} id="selected-works" className="relative shrink-0 w-[940px] max-w-[92vw] mx-auto mt-14 sm:mt-8 mb-16 z-10">
        
        <ScrollRevealSection sectionRef={worksRef}>
        {/* Section header moves with the full grid. */}
        <motion.div 
          className="flex items-center justify-between mb-6 px-1"
        >
          <h2 className="font-seasons text-[24px] sm:text-[26px] font-normal not-italic text-[#08304c] tracking-tight">
            Selected Works
          </h2>
          <span className="font-basier text-[13px] text-gray-400 font-medium tracking-tight">
            More Stories
          </span>
        </motion.div>

        {/* Case Studies Grid (2 Rows × 2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Case Study 1: Trosky 365 */}
          <CaseStudyCard
            coverImage={coverPoints}
            title="Turning daily drills into lasting habits"
            description="A daily training experience for baseball players."
            outcome="+36% daily practice habit"
            onClick={() => navigateToCaseStudy('trosky')}
            onMouseEnter={() => import('./CaseStudyTrosky')}
            onFocus={() => import('./CaseStudyTrosky')}
          />

          {/* Case Study 2: AhamX */}
          <CaseStudyCard
            coverImage={coverEdtech}
            title="Helping learners pick up where they left off"
            description="Connecting learning and capability development."
            outcome="91% faster study resumption"
            onClick={() => navigateToCaseStudy('ahamx')}
            onMouseEnter={() => import('./CaseStudyAhamX')}
            onFocus={() => import('./CaseStudyAhamX')}
          />

          {/* Case Study 3: Ryzeup */}
          <CaseStudyCard
            coverImage={coverIdentity}
            title="Bringing focus to everyday team management"
            description="Helping managers focus on their teams."
            outcome="Context switching: 28s → under 3s"
            onClick={() => navigateToCaseStudy('ryzeup')}
            onMouseEnter={() => import('./CaseStudyRyzeup')}
            onFocus={() => import('./CaseStudyRyzeup')}
          />

          {/* Case Study 4: CarePulse Health */}
          <CaseStudyCard
            coverImage={coverHealth}
            title="Giving clinicians more time for care"
            description="An ambient documentation concept for clinicians."
            outcome="2.4 hours/day saved on documentation"
          />

        </div>

        </ScrollRevealSection>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 4: FOODIE / CONCEPT TO CRAFT & COMMUNITY TESTIMONIALS     */}
      {/* ----------------------------------------------------------------- */}
      <ConceptToCraft />

      {/* Community Testimonials & Spotlight Feed */}
      <CommunityTestimonials />

      {/* SECTION 5: WHITE FOOTER SECTION (CURTAIN LAYER)                   */}
      <WhiteFooterCard navigateToCaseStudy={navigateToCaseStudy} navigateToAbout={navigateToAbout} onScrollToWorks={handleScrollToWorks} />

      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
