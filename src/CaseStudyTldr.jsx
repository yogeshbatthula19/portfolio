import React from 'react';
import ScrollReveal from './ScrollReveal';

// Four-line summary shown at the top of every case study for skim readers.
export default function CaseStudyTldr({ rows, accent = '#ff7a2f' }) {
  return (
    <ScrollReveal>
      <dl className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden shadow-xs border-l-[3px]" style={{ borderLeftColor: accent }}>
        {rows.map(([label, text]) => (
          <div key={label} className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-0.5 sm:gap-4 px-4 py-3 sm:px-5">
            <dt className="text-[11px] font-basier font-medium uppercase tracking-wider sm:pt-[3px]" style={{ color: accent }}>{label}</dt>
            <dd className="text-[14px] sm:text-[15px] text-[#1f2937] leading-[1.6] font-switzer">{text}</dd>
          </div>
        ))}
      </dl>
    </ScrollReveal>
  );
}
