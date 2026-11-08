import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Asterisk } from '@phosphor-icons/react';
import { siYoutube, siInstagram, siAndroid } from 'simple-icons';
import harish from './assets/spotlights/harish_photo.jpg';
import purandhar from './assets/spotlights/purandhar_photo.jpg';
import rishi from './assets/spotlights/rishi_photo.jpg';
import f1 from './assets/foodie/foodie-02-sm.webp';
import f2 from './assets/foodie/foodie-05-sm.webp';
import f3 from './assets/foodie/foodie-08-sm.webp';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';

// Shared hero language: Instrument Serif, cream paper, glossy pastel pills, asterisks.
const serif = { fontFamily: "'Instrument Serif', Georgia, serif" };
const gloss = (a, b) => ({ background: `linear-gradient(180deg, ${a}, ${b})`, boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.85), inset 0 -4px 0 rgba(0,0,0,0.05), 0 18px 30px -20px rgba(40,40,60,0.45)' });
const C = {
  blue: ['#e2eeff', '#c4dcff', '#3a7be8'], green: ['#d3f7e1', '#aeeccb', '#12906a'], yellow: ['#fff0b8', '#ffd983', '#e0701a'],
  lilac: ['#f1e4ff', '#dcc0ff', '#9150e0'], pink: ['#ffe0ee', '#ffc0da', '#e0457f'], peach: ['#ffe3d6', '#ffc3a6', '#d9572b'],
};
const Star = ({ color, cls }) => (
  <span aria-hidden="true" className={`inline-block ${cls}`} style={{ color }}>
    <Asterisk weight="bold" className="block h-full w-full v3-spin" />
  </span>
);
const Title = ({ children, sub }) => (
  <div className="mb-10 text-center">
    <h2 className="text-[#141210] text-[44px] sm:text-[72px] leading-[0.98] tracking-[-0.02em]" style={serif}>{children}</h2>
    {sub && <p className="mt-3 text-[15px] text-[#6b645b]">{sub}</p>}
  </div>
);

const Q = [
  { n: 'Harish Tadikamalla', r: 'Product Manager', p: harish, c: C.blue, li: 'https://www.linkedin.com/in/harishtadikam/', q: 'Yogesh has a rare instinct for turning complex product requirements into simple, elegant workflows. He doesn’t just design screens, he actively shapes product strategy and elevates team velocity.' },
  { n: 'Purandhar Malavathu', r: 'Senior Designer', p: purandhar, c: C.green, li: 'https://www.linkedin.com/in/purandhar-malavathu-8b0aa527a/', q: 'Yogesh brings an exceptional balance of systems thinking and visual craft. His component architectures and attention to interaction detail make collaborating with him an inspiring experience.' },
  { n: 'Rishi Charan', r: 'Associate Product Designer', p: rishi, c: C.yellow, li: 'https://www.linkedin.com/in/rishicharan/', q: 'Working with Yogesh sharpened my design thinking and gave me the confidence to tackle complex problems effectively.' },
];

// K1: three tinted glossy cards, slightly tilted like dropped pills
export function KindA() {
  return (
    <div>
      <Title>Kind <em>words</em></Title>
      <div className="grid gap-5 md:grid-cols-3">
        {Q.map((t, i) => (
          <motion.figure key={t.n} whileHover={{ rotate: 0, y: -4 }} className="flex flex-col justify-between rounded-[28px] p-7" style={{ ...gloss(t.c[0], t.c[1]), rotate: [-1.5, 1.2, -0.8][i] }}>
            <blockquote className="text-[#141210] text-[22px] md:text-[24px] leading-[1.25]" style={serif}>“{t.q}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <img src={t.p} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />
              <a href={t.li} target="_blank" rel="noopener noreferrer" className="leading-tight no-underline">
                <span className="block text-[15px] font-medium text-[#141210]">{t.n}</span>
                <span className="block text-[13px]" style={{ color: t.c[2] }}>{t.r}</span>
              </a>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

// K2: one big quote at a time, glossy name pills switch between them
export function KindB() {
  const [i, setI] = useState(0);
  const t = Q[i];
  return (
    <div className="mx-auto max-w-[980px] text-center">
      <Star color="#ff5a1f" cls="h-10 w-10 md:h-14 md:w-14" />
      <motion.blockquote key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mt-6 text-[#141210] text-[30px] sm:text-[46px] md:text-[54px] leading-[1.1] tracking-[-0.015em]" style={serif}>
        “{t.q}”
      </motion.blockquote>
      <p className="mt-8 text-[13px] text-[#6b645b]">Three people, in their own words. Tap a name.</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {Q.map((x, k) => (
          <button key={x.n} type="button" onClick={() => setI(k)} aria-pressed={k === i}
            className={`flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-5 transition-all ${k === i ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
            style={k === i ? gloss(x.c[0], x.c[1]) : { background: 'rgba(255,255,255,0.7)' }}>
            <img src={x.p} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-left leading-tight"><span className="block text-[14px] font-medium text-[#141210]">{x.n}</span><span className="block text-[12px]" style={{ color: x.c[2] }}>{x.r}</span></span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Playground items (no links yet: add real URLs when ready)
const Icon = ({ si, cls = 'h-5 w-5', fill }) => <svg viewBox="0 0 24 24" className={cls} fill={fill} aria-hidden="true"><path d={si.path} /></svg>;
const P = [
  { t: 'UX Patterns', d: 'Short reels breaking down the patterns behind Indian apps.', tag: 'Instagram', si: siInstagram, c: C.pink },
  { t: 'Skandaapps', d: 'Small, useful Android apps. First up: a loan & EMI calculator.', tag: 'Android', si: siAndroid, c: C.green },
  { t: 'Job guides', d: 'Telugu walkthroughs for filling job applications, step by step.', tag: 'YouTube', si: siYoutube, c: C.peach },
  { t: 'Concept to craft', d: 'Food, plated and photographed.', tag: 'Photos', c: C.yellow, imgs: [f1, f2, f3] },
];

// P1: bento of tinted glossy tiles
export function PlayA() {
  return (
    <div>
      <Title sub="Things I make when no one's asking">Play<em>ground</em></Title>
      <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
        {P.map((x, i) => (
          <div key={x.t} className={`relative flex flex-col justify-end overflow-hidden rounded-[28px] p-7 min-h-[220px] ${i === 0 ? 'md:row-span-2 md:min-h-[460px]' : ''} ${i === 3 ? 'md:col-span-2' : ''}`} style={gloss(x.c[0], x.c[1])}>
            {x.imgs && (
              <div className="absolute right-5 top-5 flex -space-x-6">
                {x.imgs.map((s, k) => <img key={s} src={s} alt="" className="h-28 w-24 rounded-xl object-cover border-4 border-white shadow-lg" style={{ transform: `rotate(${[-8, 2, 9][k]}deg)` }} />)}
              </div>
            )}
            {x.si && <span className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-[14px] bg-white/80"><Icon si={x.si} fill={x.c[2]} cls="h-6 w-6" /></span>}
            <span className="mb-3 inline-block self-start rounded-full bg-white/80 px-3 py-1 text-[12px] font-medium" style={{ color: x.c[2] }}>{x.tag}</span>
            <h3 className="text-[#141210] text-[34px] md:text-[42px] leading-none tracking-[-0.02em]" style={serif}>{x.t}</h3>
            <p className="mt-2 max-w-[360px] text-[15px] text-[#141210]/70">{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// P2: big pills you hover; each opens into a one-liner
export function PlayB() {
  const [o, setO] = useState(0);
  return (
    <div className="mx-auto max-w-[980px]">
      <Title sub="Side projects, reels and small experiments">Play<em>ground</em></Title>
      <div className="flex flex-col gap-4">
        {P.map((x, i) => (
          <div key={x.t} onMouseEnter={() => setO(i)} onClick={() => setO(i)}
            className="cursor-pointer overflow-hidden rounded-[26px] px-6 md:px-9 transition-all duration-500" style={{ ...gloss(x.c[0], x.c[1]), rotate: `${[-1, 0.8, -0.6, 1][i]}deg` }}>
            <div className="flex items-center justify-between gap-4 py-5 md:py-6">
              <span className="text-[30px] md:text-[48px] leading-none tracking-[-0.02em] text-[#141210]" style={serif}>{x.t}</span>
              <span className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[13px] font-medium" style={{ color: x.c[2] }}>{x.si && <Icon si={x.si} fill={x.c[2]} cls="h-4 w-4" />}{x.tag}</span>
            </div>
            <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: o === i ? '1fr' : '0fr' }}>
              <p className="overflow-hidden text-[16px] md:text-[18px] text-[#141210]/70"><span className="block pb-6">{x.d}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function useHydTime() {
  const f = () => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }).format(new Date());
  const [t, setT] = useState(f);
  useEffect(() => { const id = setInterval(() => setT(f()), 30000); return () => clearInterval(id); }, []);
  return t;
}
const LINKS = [
  { t: 'LinkedIn', h: 'https://www.linkedin.com/in/yogeshbattula/', c: C.blue },
  { t: 'Behance', h: 'https://www.behance.net/yogeshbattula5', c: C.lilac },
  { t: 'Resume', h: '/yogesh-battula-resume.pdf', c: C.yellow },
];

// F1: light, centred, glossy link pills
export function FooterA() {
  const time = useHydTime();
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-white/60 px-6 py-16 md:py-24 text-center">
      <h2 className="text-[#141210] text-[52px] sm:text-[88px] md:text-[112px] leading-[0.95] tracking-[-0.02em]" style={serif}>
        Let’s make <Star color="#2f5bff" cls="h-[0.55em] w-[0.55em] align-middle" /> something<br /><em>worth</em> using
      </h2>
      <a href="mailto:yogeshbattula55@gmail.com" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#2a2622] px-7 py-4 text-[16px] font-medium text-[#f4f1ea] no-underline shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)]">yogeshbattula55@gmail.com <span aria-hidden="true">↗</span></a>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {LINKS.map((l, i) => <a key={l.t} href={l.h} target="_blank" rel="noopener noreferrer" className="rounded-[16px] px-6 py-3 text-[18px] font-medium no-underline" style={{ ...gloss(l.c[0], l.c[1]), color: l.c[2], rotate: `${[-3, 2, -1.5][i]}deg` }}>{l.t}</a>)}
      </div>
      <p className="mt-12 text-[13px] text-[#6b645b]">Hyderabad · {time} IST</p>
    </div>
  );
}

// F2: dark ink footer, giant email, pills pile on the edge
export function FooterB() {
  const time = useHydTime();
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-[#141210] px-6 md:px-12 pt-14 md:pt-20 pb-40 md:pb-48 text-[#f4f1ea]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="text-[14px] text-white/50">Open to product design roles · Hyderabad · {time} IST</p>
          <h2 className="mt-4 text-[48px] sm:text-[80px] md:text-[96px] leading-[0.95] tracking-[-0.02em]" style={serif}>Say <em>hello</em></h2>
          <a href="mailto:yogeshbattula55@gmail.com" className="mt-3 inline-block text-[20px] sm:text-[30px] md:text-[38px] text-[#ffd983] underline decoration-1 underline-offset-[6px]" style={serif}>yogeshbattula55@gmail.com</a>
        </div>
        <nav className="flex gap-6 text-[15px] text-white/70">{LINKS.map((l) => <a key={l.t} href={l.h} target="_blank" rel="noopener noreferrer" className="hover:text-white">{l.t} ↗</a>)}</nav>
      </div>
      {/* a little pile of the hero's pills resting on the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-36 md:h-44">
        {[['research', C.blue, 4, 0, -4], ['prototyping', C.green, 22, 0, 3], ['systems', C.yellow, 44, 0, -2], ['strategy', C.peach, 60, 0, 5], ['ai', C.lilac, 52, 56, -14], ['shipping', C.pink, 76, 0, -3], ['testing', C.blue, 30, 58, 8]].map(([t, c, l, b, r]) => (
          <span key={t} className="absolute rounded-[16px] md:rounded-[22px] px-4 py-2.5 md:px-7 md:py-4 text-[18px] md:text-[32px] font-medium leading-none" style={{ left: `${l}%`, bottom: b, rotate: `${r}deg`, color: c[2], ...gloss(c[0], c[1]) }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
