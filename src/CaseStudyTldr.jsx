import React from 'react';
import ScrollReveal from './ScrollReveal';

// Four-line summary at the top of every case study, as a glossy tinted card (V3 pills language).
export default function CaseStudyTldr({ rows, accent = '#ff7a2f' }) {
  return (
    <ScrollReveal>
      <dl
        className="rounded-[24px] overflow-hidden px-5 py-2 sm:px-7 sm:py-3"
        style={{
          background: `linear-gradient(180deg, ${accent}12, ${accent}2a)`,
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.8), inset 0 -4px 0 rgba(0,0,0,0.04), 0 18px 30px -22px rgba(40,40,60,0.4)',
        }}
      >
        {rows.map(([label, text], i) => (
          <div key={label} className={`grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-1 sm:gap-5 py-4 ${i ? 'border-t border-black/[0.06]' : ''}`}>
            <dt className="text-[12px] font-medium uppercase tracking-[0.12em] sm:pt-[4px]" style={{ color: accent, fontFamily: "'Inter Variable', sans-serif" }}>{label}</dt>
            <dd className="text-[16px] sm:text-[17px] text-[#141210] leading-[1.55]" style={{ fontFamily: "'Inter Variable', sans-serif" }}>{text}</dd>
          </div>
        ))}
      </dl>
    </ScrollReveal>
  );
}
