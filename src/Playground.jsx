import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, LockOpen, Pause } from 'lucide-react';
import faceIcon from './assets/faceunlock-icon.webp';

// ---------------------------------------------------------------------------
// Edit this list to change the Playground. `href` empty = card shows "Coming soon".
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    key: 'faceunlock',
    title: 'FaceUnlock',
    tag: 'macOS app · Swift',
    description: 'Unlocks your MacBook with your face. A glass menu-bar app with an iPhone-style face scan.',
    href: '/faceunlock',
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

function Switch({ on = true }) {
  return (
    <span className={`relative inline-block h-[18px] w-[30px] rounded-full ${on ? 'bg-[#2f7cf6]' : 'bg-black/15'}`}>
      <span className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow ${on ? 'left-[14px]' : 'left-[2px]'}`} />
    </span>
  );
}

// FaceUnlock: the real glass menu-bar popover + the "Unlocked" HUD.
function FaceUnlockMock() {
  const rows = [['Blink to confirm', true], ['Unlock animation', true], ['Open at login', false]];
  return (
    <div className="absolute inset-x-0 bottom-0 top-0">
      <div className="absolute left-1/2 top-3 w-[78%] max-w-[270px] -translate-x-1/2 rounded-[18px] border border-white/80 bg-white/65 p-3 shadow-[0_20px_40px_-14px_rgba(20,60,140,0.45)] backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="flex items-center gap-2.5">
          <img src={faceIcon} alt="" className="h-9 w-9" draggable={false} />
          <div className="leading-tight">
            <div className="text-[12.5px] font-semibold text-[#141210]">Face Unlock</div>
            <div className="text-[10.5px] text-[#6b645b]">Ready · Watching for you</div>
          </div>
          <span className="ml-auto"><Switch /></span>
        </div>
        <div className="mt-2.5 rounded-xl border border-white/80 bg-white/55 px-2.5">
          {rows.map(([label, on], i) => (
            <div key={label} className={`flex items-center justify-between py-2 text-[11.5px] text-[#2a2622] ${i ? 'border-t border-black/[0.06]' : ''}`}>
              {label}<Switch on={on} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-5 grid h-[86px] w-[86px] place-items-center rounded-[24px] border border-white/70 bg-white/55 shadow-[0_16px_30px_-12px_rgba(20,60,140,0.45)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
        <div className="text-center">
          <LockOpen className="mx-auto h-8 w-8 text-[#22a559]" strokeWidth={2.2} />
          <div className="mt-1 text-[11px] font-semibold text-[#141210]">Unlocked</div>
        </div>
      </div>
    </div>
  );
}

// Notch Prompter: a MacBook display with the notch growing into a script panel.
function NotchMock() {
  const lines = ['Good morning everyone,', 'and welcome to the launch.', 'Today we are showing you', 'something we built from scratch.'];
  return (
    <div className="absolute left-1/2 top-4 w-[88%] -translate-x-1/2 overflow-hidden rounded-t-[16px] border-[6px] border-b-0 border-[#16151a] bg-[#16151a] shadow-[0_24px_40px_-14px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1.5" style={{ height: 'calc(100% + 40px)' }}>
      <div className="relative h-full rounded-t-[9px]" style={{ background: 'linear-gradient(160deg,#1f3b73 0%,#6b3fa0 55%,#e98a6b 100%)' }}>
        <div className="flex h-[18px] items-center justify-between bg-black/25 px-2.5 text-[8px] font-medium text-white/85"><span> Notch</span><span>9:41</span></div>
        <div className="absolute left-1/2 top-0 w-[74%] max-w-[250px] -translate-x-1/2 rounded-b-[22px] bg-black px-4 pb-3 pt-6 shadow-[0_18px_30px_-10px_rgba(0,0,0,0.6)]">
          <div className="space-y-1 text-center text-[12px] font-medium leading-snug">
            {lines.map((l, i) => <p key={l} className={i === 1 ? 'text-white' : i === 0 ? 'text-white/30' : 'text-white/45'}>{l}</p>)}
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[9.5px] text-white/60">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15"><Pause className="h-2.5 w-2.5 text-white" /></span>
            <span className="h-[3px] flex-1 mx-2.5 overflow-hidden rounded-full bg-white/15"><span className="block h-full w-[42%] rounded-full bg-white/80" /></span>
            <span>1.0×</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// EXO Forge: app-window placeholder until real screens are added.
function ForgeMock() {
  return (
    <div className="absolute left-1/2 top-4 w-[88%] -translate-x-1/2 overflow-hidden rounded-t-[14px] border border-black/10 bg-[#1b1613] shadow-[0_24px_40px_-14px_rgba(60,25,0,0.55)] transition-transform duration-500 group-hover:-translate-y-1.5" style={{ height: 'calc(100% + 40px)' }}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
        <span className="mx-auto text-[10px] font-medium text-white/60">EXO Forge</span>
      </div>
      <div className="flex h-full">
        <div className="w-[30%] space-y-2 border-r border-white/10 p-3">
          {[70, 52, 62, 44].map((w, i) => <div key={i} className={`h-2 rounded-full ${i === 0 ? 'bg-[#ff9a4d]' : 'bg-white/15'}`} style={{ width: `${w}%` }} />)}
        </div>
        <div className="flex-1 p-3.5">
          <div className="h-2.5 w-24 rounded-full bg-white/70" />
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-[52px] rounded-xl border border-white/10 bg-white/[0.06]"><div className="m-2.5 h-2 w-8 rounded-full" style={{ background: i === 0 ? '#ff9a4d' : 'rgba(255,255,255,0.25)' }} /></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCKS = { face: FaceUnlockMock, notch: NotchMock, forge: ForgeMock };

function Card({ p, index, layout = 'tall' }) {
  const reduce = useReducedMotion();
  const live = Boolean(p.href);
  const Tag = live ? 'a' : 'div';
  const Mock = MOCKS[p.glyph];
  const link = live ? { href: p.href } : {};
  const wide = layout === 'wide';
  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag
        {...link}
        data-playground={p.key}
        className={`group relative h-full overflow-hidden rounded-[28px] text-inherit no-underline transition-transform duration-300 shadow-[0_24px_50px_-28px_rgba(30,25,20,0.45)] ${live ? 'cursor-pointer hover:-translate-y-1.5' : 'cursor-default'} ${wide ? 'grid min-h-[380px] sm:grid-cols-[1fr_1.1fr]' : 'flex min-h-[560px] flex-col'}`}
        style={{ background: p.bg }}
      >
        <div className={`relative z-10 p-7 ${wide ? 'flex flex-col justify-end sm:p-10' : 'pb-0'}`}>
          <span className="inline-block self-start rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-medium" style={{ color: p.fg }}>{p.tag}</span>
          <h3 className={`mt-4 text-[#141210] leading-[1.02] tracking-[-0.02em] ${wide ? 'text-[40px] md:text-[46px]' : 'text-[34px]'}`} style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" }}>{p.title}</h3>
          <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.45] text-[#4a443c]">{p.description}</p>
          <span className={`mt-5 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-[14px] font-medium ${live ? 'bg-[#2a2622] text-[#f4f1ea] transition-transform group-hover:translate-x-1' : 'bg-white/60 text-[#6b645b]'}`}>
            {p.cta}{live && <ArrowUpRight className="h-4 w-4" />}
          </span>
        </div>
        <div className={`relative ${wide ? 'min-h-[280px]' : 'mt-6 h-[250px] flex-1'}`}>
          <Mock />
        </div>
      </Tag>
    </motion.div>
  );
}

export default function Playground() {
  return (
    <section id="playground" style={{ fontFamily: "'STK Bureau Sans','Inter Variable', system-ui, sans-serif" }} className="relative w-full bg-[#f4f1ea] px-4 sm:px-8 pt-10 pb-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 className="text-[#141210] text-[44px] sm:text-[64px] leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" }}>
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
