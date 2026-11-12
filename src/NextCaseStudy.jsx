import React from 'react';
import { ArrowRight } from 'lucide-react';

// Order used for the "Next case study" link at the end of each case study.
export const CASE_STUDIES = [
  { slug: 'trosky', title: 'Trosky 365', blurb: 'Turning daily drills into lasting habits' },
  { slug: 'ahamx', title: 'AhamX', blurb: 'Helping learners pick up where they left off' },
  { slug: 'ryzeup', title: 'Ryzeup', blurb: 'Bringing focus to everyday team management' },
];

export function nextCaseStudy(current) {
  const i = CASE_STUDIES.findIndex((c) => c.slug === current);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}

export default function NextCaseStudy({ current, onNavigate }) {
  const next = nextCaseStudy(current);
  if (!next) return null;
  return (
    <a
      href={`/case-study/${next.slug}`}
      onClick={(event) => {
        if (!onNavigate || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        onNavigate(next.slug);
      }}
      className="group inline-flex items-center gap-4 sm:text-right min-h-11 no-underline"
    >
      <span className="flex flex-col">
        <span className="text-[12px] uppercase tracking-[0.12em] text-[#6b645b]" style={{ fontFamily: "'STK Bureau Sans','Inter Variable', sans-serif" }}>Next case study</span>
        <span className="text-[22px] sm:text-[28px] leading-[1.05] tracking-[-0.015em] text-[#141210] group-hover:text-[#2f5bff] transition-colors" style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" }}>
          {next.blurb}
        </span>
      </span>
      <span className="grid place-items-center h-11 w-11 shrink-0 rounded-full bg-[#2a2622] text-[#f4f1ea] transition-transform group-hover:translate-x-1"><ArrowRight className="w-4 h-4" /></span>
    </a>
  );
}
