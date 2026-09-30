import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    company: 'F5',
    role: 'Software Engineer II',
    period: 'Jun 2025 to present',
    underlineColor: '#ef4444', // Red
    link: 'https://www.f5.com/',
  },
  {
    company: 'Fletch',
    role: 'Product Designer',
    period: 'Jul 2024 to Jun 2025',
    underlineColor: '#eab308', // Yellow/Gold
    link: 'https://fletch.ai/',
  },
  {
    company: 'SMART Lab',
    role: 'Design Researcher',
    period: 'Jan 2023 to May 2024',
    underlineColor: '#f97316', // Orange/Coral
    link: 'https://smartlab.purdue.edu/',
  },
  {
    company: 'OLX Group',
    role: 'Product Designer',
    period: 'Jan 2021 to Jul 2022',
    underlineColor: '#3b82f6', // Blue
    link: 'https://www.olxgroup.com/',
  },
];

export default function ExperienceSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 sm:mb-8"
      >
        <span className="text-[12px] sm:text-[13px] tracking-[0.14em] uppercase font-semibold text-[#8e95a5] select-none">
          Experience
        </span>
      </motion.div>

      {/* Experience List */}
      <div className="border-t border-black/[0.06] divide-y divide-black/[0.06]">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 transition-colors duration-200 rounded-lg sm:-mx-3 sm:px-3 hover:bg-black/[0.015]"
          >
            {/* Company & Role */}
            <div className="flex items-baseline flex-wrap text-[14.5px] sm:text-[16px] leading-relaxed text-[#111827]">
              <span className="relative inline-block font-medium">
                {exp.company}
                {/* Colored Underline matching reference */}
                <motion.span
                  className="absolute left-0 bottom-[-2px] h-[2px] w-full rounded-full"
                  style={{ backgroundColor: exp.underlineColor }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>
              <span className="text-[#374151] font-normal">
                ,&nbsp;{exp.role}
              </span>
            </div>

            {/* Date Period */}
            <div className="text-[12.5px] sm:text-[14px] text-[#6b7280] font-normal whitespace-nowrap shrink-0">
              {exp.period}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
