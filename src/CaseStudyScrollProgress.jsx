import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * CaseStudyScrollProgress
 * 
 * Provides:
 * 1. Sticky top reading progress bar with silky spring inertia.
 * 2. Floating "Scroll to top" button that appears when scrolled down.
 */
export default function CaseStudyScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Silky spring-damped progress bar
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    mass: 0.2,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Reading Scroll Progress Bar */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-black/[0.04]"
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-[#ff8a3d] via-[#f59e0b] to-[#111827]"
          style={{ scaleX: smoothProgress }}
        />
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll to top of case study"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-[#111827] hover:bg-[#111827] hover:text-white transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
