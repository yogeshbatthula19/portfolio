import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Peer endorsements and feedback from cross-functional teammates
import harishPhoto from './assets/spotlights/harish_photo.jpg';
import purandharPhoto from './assets/spotlights/purandhar_photo.jpg';
import rishiPhoto from './assets/spotlights/rishi_photo.jpg';
import heroBg from './assets/564cc67c35dca41051d7d78448f696fab9f139d9.png';

const spotlights = [
  {
    id: 'product-manager-feedback',
    name: 'Harish Tadikamalla',
    role: 'Product Manager',
    badge: 'Product Manager',
    photo: harishPhoto,
    photoPosition: 'object-[center_20%]',
    linkedin: 'https://www.linkedin.com/in/harishtadikam/',
    quote: 'Yogesh has a rare instinct for turning complex product requirements into simple, elegant workflows. He doesn’t just design screens—he actively shapes product strategy and elevates team velocity.',
  },
  {
    id: 'senior-designer-feedback',
    name: 'Purandhar Malavathu',
    role: 'Senior Designer',
    badge: 'Senior Designer',
    photo: purandharPhoto,
    photoPosition: 'object-[center_20%]',
    linkedin: 'https://www.linkedin.com/in/purandhar-malavathu-8b0aa527a/',
    quote: 'Yogesh brings an exceptional balance of systems thinking and visual craft. His component architectures and attention to interaction detail make collaborating with him an inspiring experience.',
  },
  {
    id: 'junior-designer-feedback',
    name: 'Rishi Charan',
    role: 'Associate Product Designer',
    badge: 'Junior Designer',
    photo: rishiPhoto,
    photoPosition: 'object-center',
    linkedin: 'https://www.linkedin.com/in/rishicharan/',
    quote: 'Working with Yogesh sharpened my design thinking and gave me the confidence to tackle complex problems effectively.',
  },
];

function StickyCard({ item, index, isLast, isDesktop }) {
  const cardRef = useRef(null);

  // Track scroll through the card's pinned lifespan (desktop only)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 90px', 'end 90px'],
  });

  // Scale down subtly and dim slightly as the next card scrolls up and overcomes this card
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.75]);

  return (
    <motion.div
      ref={cardRef}
      style={isDesktop ? {
        scale,
        opacity,
        zIndex: 10 + index * 10,
      } : {
        zIndex: 10 + index * 10,
      }}
      className="relative lg:sticky top-auto lg:top-32 w-full max-w-[390px] sm:max-w-[420px] h-auto min-h-[460px] sm:h-[530px] lg:h-[560px] mx-auto lg:ml-auto lg:mr-0 rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#28282a] flex flex-col select-none shadow-xl"
    >
      {/* Top Half: Photo with clean straight edge meeting dark base */}
      <div className="w-full h-[230px] sm:h-[270px] overflow-hidden bg-[#1e1e20] shrink-0">
        <img 
          src={item.photo} 
          alt={item.name} 
          loading={index === 0 ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover ${item.photoPosition}`}
        />
      </div>

      {/* Bottom Half: Dark Charcoal Container (Uniform flex distribution) */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 min-h-0 bg-[#28282a] text-white">
        
        {/* Direct Quote */}
        <p className="font-basier text-[15px] sm:text-[16.5px] font-normal leading-[1.45] text-white tracking-[-0.01em]">
          “{item.quote}”
        </p>

        {/* Author Row with Role & Badge */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-4 border-t border-white/[0.08] shrink-0">
          <div className="flex flex-col min-w-0">
            {item.linkedin ? (
              <a
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/author inline-flex items-center gap-1.5 font-basier text-[14px] sm:text-[15.5px] font-semibold text-white tracking-tight truncate hover:text-[#0077b5] transition-colors"
                title={`View ${item.name}'s LinkedIn profile`}
              >
                <span className="truncate">{item.name}</span>
                <svg 
                  className="w-3.5 h-3.5 text-zinc-400 group-hover/author:text-[#0a66c2] transition-colors shrink-0" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            ) : (
              <span className="font-basier text-[14px] sm:text-[15.5px] font-semibold text-white tracking-tight truncate">
                {item.name}
              </span>
            )}
            <span className="font-basier text-[12px] sm:text-[13px] text-zinc-400 font-normal truncate mt-0.5">
              {item.role}
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white/[0.08] text-[11px] font-medium text-zinc-300 font-basier uppercase tracking-wider shrink-0 border border-white/[0.06]">
            {item.badge}
          </span>
        </div>

      </div>
    </motion.div>
  );
}

export default function CommunityTestimonials() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section 
      id="community-testimonials"
      className="relative z-10 w-full select-none border-t border-black/[0.06] pt-12 sm:pt-20 lg:pt-24 pb-20 sm:pb-36 lg:pb-56"
    >
      {/* Ambient gradient hero background matching hero section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.85) 100%), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffffff',
        }}
      />

      <div className="w-[940px] max-w-[92vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Text (Sticky at top-28/top-32)     */}
          {/* ========================================================= */}
          <div className="lg:sticky lg:top-28 sm:lg:top-32 lg:self-start min-h-0 lg:min-h-[460px] flex flex-col justify-start">
            
            {/* Editorial Heading in The Seasons (Upright, Non-Italic) */}
            <h2 className="font-seasons text-[36px] sm:text-[44px] lg:text-[48px] font-normal not-italic text-[#08304C] tracking-tight leading-[1.12]">
              Kind words from <br />
              the people I’ve <br />
              built with.
            </h2>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Generous Gap Reel Stacking to Actual        */}
          {/* Placement, followed by Full Section Scroll                */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center lg:items-end gap-6 sm:gap-10 lg:gap-[180px] pb-0">
            {spotlights.map((item, index) => (
              <StickyCard
                key={item.id}
                item={item}
                index={index}
                isLast={index === spotlights.length - 1}
                isDesktop={isDesktop}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
