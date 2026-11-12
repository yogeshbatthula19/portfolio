import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// ---------------------------------------------------------------------------
// Edit this list to change the Playground. `href` empty = card shows "Coming soon".
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    key: 'faceunlock',
    title: 'FaceUnlock',
    tag: 'macOS app · Swift',
    description: 'Unlocks your MacBook with your face. A glass menu-bar app with an iPhone-style face scan.',
    href: 'https://claude.ai/artifact/CpUwpjdqvEVxd6Fg49dXEJ',
    cta: 'Install & try',
    bg: 'linear-gradient(145deg,#eaf3ff,#b9d6fb)',
    fg: '#1d4fa8',
    glyph: 'face',
  },
  {
    key: 'notch-prompter',
    title: 'Notch Prompter',
    tag: 'macOS app',
    description: 'A teleprompter that lives in the MacBook notch.',
    href: '',
    cta: 'Coming soon',
    bg: 'linear-gradient(145deg,#f1ede6,#d9d2c5)',
    fg: '#3b352d',
    glyph: 'notch',
  },
  {
    key: 'exo-forge',
    title: 'EXO Forge',
    tag: 'Experiment',
    description: 'Something I am forging on the side.',
    href: '',
    cta: 'Coming soon',
    bg: 'linear-gradient(145deg,#fff1e4,#ffcfa6)',
    fg: '#a24a10',
    glyph: 'forge',
  },
];

function Glyph({ kind, color }) {
  const common = { fill: 'none', stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
      {kind === 'face' && (
        <g {...common}>
          <path d="M3 8V5.6A2.6 2.6 0 0 1 5.6 3H8M16 3h2.4A2.6 2.6 0 0 1 21 5.6V8M21 16v2.4a2.6 2.6 0 0 1-2.6 2.6H16M8 21H5.6A2.6 2.6 0 0 1 3 18.4V16" />
          <path d="M9 9v1.6M15 9v1.6M12 9v4h-1M8.9 16.9c1.3 2.3 5 2.3 6.2 0" />
        </g>
      )}
      {kind === 'notch' && (
        <g {...common}>
          <rect x="3" y="4" width="18" height="12" rx="2.4" />
          <path d="M9.5 4v1.8a1.2 1.2 0 0 0 1.2 1.2h2.6a1.2 1.2 0 0 0 1.2-1.2V4" />
          <path d="M7 11h10M9 13.6h6M2.5 19.5h19" />
        </g>
      )}
      {kind === 'forge' && (
        <g {...common}>
          <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9L12 3z" />
          <path d="M12 8.2v7.6M8.6 10.1L12 12l3.4-1.9" />
        </g>
      )}
    </svg>
  );
}

function Card({ p, index }) {
  const reduce = useReducedMotion();
  const live = Boolean(p.href);
  const Tag = live ? 'a' : 'div';
  const link = live ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag
        {...link}
        data-playground={p.key}
        className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[28px] p-7 text-inherit no-underline shadow-[0_24px_50px_-28px_rgba(30,25,20,0.45)] transition-transform duration-300 ${live ? 'cursor-pointer hover:-translate-y-1.5' : 'cursor-default'}`}
        style={{ background: p.bg }}
      >
        <div className="flex items-start justify-between">
          <span className="grid h-16 w-16 place-items-center rounded-[18px] bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
            <Glyph kind={p.glyph} color={p.fg} />
          </span>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-medium" style={{ color: p.fg }}>{p.tag}</span>
        </div>

        <div className="mt-auto pt-10">
          <h3 className="text-[#141210] text-[34px] leading-[1.02] tracking-[-0.02em]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{p.title}</h3>
          <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.45] text-[#4a443c]">{p.description}</p>
          <span className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium ${live ? 'bg-[#2a2622] text-[#f4f1ea] transition-transform group-hover:translate-x-1' : 'bg-white/60 text-[#6b645b]'}`}>
            {p.cta}{live && <ArrowUpRight className="h-4 w-4" />}
          </span>
        </div>
      </Tag>
    </motion.div>
  );
}

export default function Playground() {
  return (
    <section id="playground" style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }} className="relative w-full bg-[#f4f1ea] px-4 sm:px-8 pt-10 pb-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 className="text-[#141210] text-[44px] sm:text-[64px] leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            The <em style={{ fontStyle: 'italic' }}>playground</em>
          </h2>
          <span className="hidden sm:block pb-3 text-[14px] text-[#6b645b]">Side projects I build for fun</span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PROJECTS.map((p, i) => <Card key={p.key} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
