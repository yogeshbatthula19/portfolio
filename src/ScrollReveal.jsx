import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.8,
  variant = 'fade-up',
  className = "",
  amount = 0.1,
}) {
  const getVariants = () => {
    switch (variant) {
      case 'scale-up':
        return {
          initial: { opacity: 0, y: y || 24, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
        };
      case 'blur':
        return {
          initial: { opacity: 0, y: y || 18, filter: 'blur(5px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
      case 'fade-up':
      default:
        return {
          initial: { opacity: 0, y: y || 24 },
          animate: { opacity: 1, y: 0 },
        };
    }
  };

  const v = getVariants();

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount, margin: "0px 0px -40px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
