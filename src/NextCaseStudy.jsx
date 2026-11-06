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
      className="group inline-flex items-center gap-3 sm:text-right min-h-11 no-underline"
    >
      <span className="flex flex-col">
        <span className="text-[11px] sm:text-[12px] uppercase tracking-wider text-gray-400 font-switzer">Next case study</span>
        <span className="text-[14px] sm:text-[15px] font-basier font-medium text-gray-900 group-hover:text-[#ff6a1f] transition-colors">
          {next.title}: {next.blurb}
        </span>
      </span>
      <ArrowRight className="w-4 h-4 text-gray-700 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
