import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ThankYouEnvelope({ className = '' }) {
  const containerRef = useRef(null);
  // Trigger when 35% of the envelope container enters the viewport
  const isInView = useInView(containerRef, { amount: 0.35, once: false });
  const [manualOpen, setManualOpen] = useState(null);

  // If user clicked manually, use manual state; otherwise sync with scroll in-view
  const isOpen = manualOpen !== null ? manualOpen : isInView;

  // Reset manual override if user scrolls far out of view
  useEffect(() => {
    if (!isInView) {
      setManualOpen(null);
    }
  }, [isInView]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full py-10 sm:py-16 flex flex-col items-center justify-center select-none overflow-visible ${className}`}
    >
      {/* Apple-minimal ambient base with subtle diffused shadow */}
      <div className="relative flex flex-col items-center justify-center">

        {/* Tactile Paper Envelope */}
        <motion.div 
          onClick={() => setManualOpen(prev => prev === null ? !isInView : !prev)}
          className="relative w-[230px] sm:w-[250px] h-[146px] sm:h-[156px] cursor-pointer group"
          title="Click to toggle envelope"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          style={{ perspective: 1200 }}
        >
          {/* 1. Envelope Backplate (Interior backing & hollow pocket shadow) */}
          <div className="absolute inset-0 rounded-[14px] bg-[#f4f4f6] border border-black/[0.08] shadow-[0_16px_38px_-10px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Deep interior shadow to simulate hollow paper sleeve */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.08] via-transparent to-transparent" />
          </div>

          {/* 2. Top Flap (Folds open backwards in 3D) */}
          <motion.div 
            className="absolute -top-[1px] left-0 right-0 h-[82px] origin-top"
            style={{ 
              transformStyle: 'preserve-3d',
            }}
            animate={{ 
              rotateX: isOpen ? -180 : 0,
              zIndex: isOpen ? 1 : 25 
            }}
            transition={{ 
              rotateX: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: isOpen ? 0 : 0.22 },
              zIndex: { delay: isOpen ? 0.26 : 0.3 } 
            }}
          >
            {/* Front of the flap (seen when closed) */}
            <div 
              className="relative w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <svg 
                className="w-full h-full" 
                viewBox="0 0 250 82" 
                fill="none"
                preserveAspectRatio="none"
              >
                <path 
                  d="M 0 0 L 250 0 L 125 82 Z" 
                  fill="#ffffff" 
                  stroke="rgba(0,0,0,0.08)"
                  strokeWidth="1"
                />
              </svg>

              {/* Minimal red heart seal at the tip of the flap when closed */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[4px] w-6 h-6 rounded-full bg-[#fff1f2] border border-[#fecdd3] flex items-center justify-center shadow-xs">
                <svg 
                  className="w-3.5 h-3.5 text-[#e11d48] fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>

            {/* Back of the flap (seen when folded open backwards) */}
            <div 
              className="absolute inset-0"
              style={{ 
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden'
              }}
            >
              <svg 
                className="w-full h-full" 
                viewBox="0 0 250 82" 
                fill="none"
                preserveAspectRatio="none"
              >
                <path 
                  d="M 0 0 L 250 0 L 125 82 Z" 
                  fill="#f1f1f4" 
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>

          {/* 3. The Letter / Card that slides out */}
          <motion.div 
            className="absolute left-[14px] right-[14px] bottom-[10px] h-[130px] sm:h-[138px] rounded-t-[10px] rounded-b-[4px] bg-white shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)] border border-black/[0.06] flex flex-col items-center justify-center p-4 text-center"
            style={{ zIndex: 6 }}
            initial={{ y: 22 }}
            animate={{ 
              y: isOpen ? -78 : 20,
              scale: isOpen ? 1.02 : 0.96,
            }}
            transition={{ 
              duration: 0.65, 
              delay: isOpen ? 0.22 : 0, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            {/* Delicate red heart */}
            <motion.div 
              animate={isOpen ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ delay: 0.65, duration: 0.35 }}
              className="text-[#e11d48] mb-1"
            >
              <svg 
                className="w-4 h-4 fill-current drop-shadow-xs" 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>

            {/* Handwritten "Thank You!" Calligraphy */}
            <span 
              className="text-[36px] sm:text-[40px] text-[#18181b] font-normal leading-none select-none tracking-normal"
              style={{ fontFamily: "'Sacramento', cursive" }}
            >
              Thank You!
            </span>

            {/* Minimal hairline underline */}
            <div className="w-8 h-[1px] bg-black/[0.12] rounded-full mt-2.5" />
          </motion.div>

          {/* 4. Front Envelope Pocket (Left, Right & Bottom Folds in clean neutral tones) */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-[14px] overflow-hidden"
            style={{ zIndex: 12 }}
          >
            <svg 
              className="w-full h-full" 
              viewBox="0 0 250 156" 
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Left paper fold */}
              <polygon 
                points="0,0 0,156 128,78" 
                fill="#fafafa" 
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="0.75"
              />
              
              {/* Right paper fold (delicate shade distinction) */}
              <polygon 
                points="250,0 250,156 122,78" 
                fill="#f4f4f6" 
                stroke="rgba(0,0,0,0.05)"
                strokeWidth="0.75"
              />
              
              {/* Bottom paper fold */}
              <polygon 
                points="0,156 250,156 125,70" 
                fill="#ffffff" 
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="0.75"
              />

              {/* Gentle shadow under front overlap */}
              <path 
                d="M 0 156 L 125 70 L 250 156" 
                stroke="rgba(0,0,0,0.06)" 
                strokeWidth="1.5" 
                fill="none" 
              />
            </svg>
          </div>
        </motion.div>

        {/* Minimal, quiet editorial caption */}
        <p className="text-[12px] sm:text-[13px] text-gray-400 font-switzer font-normal mt-6 tracking-wide text-center">
          Thank you for taking the time to read through
        </p>
      </div>
    </div>
  );
}
