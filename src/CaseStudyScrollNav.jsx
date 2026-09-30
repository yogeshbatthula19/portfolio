import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_SECTIONS = [
  { id: 'section-background', label: 'Background' },
  { id: 'section-design', label: 'Design' },
  { id: 'section-results', label: 'Results' },
];

export default function CaseStudyScrollNav({ sections = DEFAULT_SECTIONS }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  // Measure and align the track exactly with the labels
  useEffect(() => {
    const updateMetrics = () => {
      const container = containerRef.current;
      const firstEl = itemRefs.current[0];
      const lastEl = itemRefs.current[sections.length - 1];
      const activeEl = itemRefs.current[activeIndex];

      if (container && firstEl && lastEl) {
        const containerRect = container.getBoundingClientRect();
        const firstRect = firstEl.getBoundingClientRect();
        const lastRect = lastEl.getBoundingClientRect();

        const topOffset = firstRect.top - containerRect.top;
        const totalHeight = lastRect.bottom - firstRect.top;

        setTrackTop(topOffset);
        setTrackHeight(totalHeight);

        if (activeEl) {
          const activeRect = activeEl.getBoundingClientRect();
          const activeFill = activeRect.bottom - firstRect.top;
          setLineHeight(Math.max(0, activeFill));
        }
      }
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [activeIndex, sections.length]);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If scrolled near bottom of page, activate last section
      if (scrollY + viewportHeight >= docHeight - 120) {
        setActiveIndex(sections.length - 1);
        return;
      }

      // Check section positions
      let current = 0;
      const triggerY = scrollY + 220; // reading offset

      sections.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (triggerY >= top) {
            current = idx;
          }
        }
      });

      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
    }
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      }
    };
  }, [sections]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70, duration: 1.0 });
      } else {
        const yOffset = -70; // offset so heading is clearly visible
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      aria-label="Case study section navigation"
      className="fixed right-6 lg:right-10 xl:right-16 top-1/2 -translate-y-1/2 z-40 hidden md:block select-none"
    >
      <div ref={containerRef} className="relative flex items-start gap-4 lg:gap-5">
        
        {/* Vertical Track Line */}
        <div 
          className="relative w-[1.5px] bg-[#e5e7eb] rounded-full overflow-hidden"
          style={{
            marginTop: `${trackTop}px`,
            height: `${trackHeight}px`,
          }}
          aria-hidden="true"
        >
          {/* Active Black Fill Line */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#111827] rounded-full origin-top"
            animate={{ height: lineHeight }}
            transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.3 }}
          />
        </div>

        {/* Section Labels */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {sections.map((sec, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={sec.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={() => handleScrollTo(sec.id)}
                aria-current={isActive ? 'true' : 'false'}
                className={`text-left text-[14px] lg:text-[15px] leading-tight transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-black rounded px-1 -mx-1 ${
                  isActive
                    ? 'font-basier font-semibold text-[#111827]'
                    : 'font-basier font-medium text-[#9ca3af] hover:text-[#4b5563]'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
