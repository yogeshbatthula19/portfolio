import React, { useState } from 'react';
import beach from './assets/photo_beach_full-opt.webp';
import cycle from './assets/photo_cycle_full.webp';
import temple from './assets/photo_temple.webp';
import lighthouse from './assets/photo_lighthouse-sm.webp';
import avatar from './assets/photo_yogesh_avatar.webp';
import troskyHome from './assets/covers/trosky-home.webp';
import troskyXp from './assets/covers/trosky-xp.webp';
import ryzeupBuzz from './assets/covers/ryzeup-buzz.webp';
import ryzeupWall from './assets/covers/ryzeup-wall.webp';
import ahamx from './assets/covers/ahamx-dashboard.webp';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/inter';
import AboutPoster from './AboutPoster';
import { KindA, KindB, PlayA, PlayB, FooterA, FooterB } from './MoreOptions';

const serif = { fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" };
const W = [
  { t: 'Daily drills, lasting habits', n: '26% → 62% streak retention', bg: '#bfeaf5', img: [troskyHome, troskyXp], ph: true },
  { t: 'Learners resume where they left off', n: 'No more catalog hunting', bg: '#d4dcfb', img: [ahamx] },
  { t: 'Focus for everyday team managers', n: '28s → under 3s', bg: '#ffd7a8', img: [ryzeupBuzz, ryzeupWall], ph: true },
];
const Pic = ({ w }) => w.img.length > 1
  ? <div className="flex h-full items-end justify-center gap-3 px-4 pt-6">{w.img.map((s, k) => <img key={s} src={s} alt="" className={`h-[92%] w-auto max-w-[46%] object-contain object-bottom drop-shadow-xl ${k ? 'translate-y-8' : ''}`} />)}</div>
  : <img src={w.img[0]} alt="" className="absolute bottom-0 right-0 w-[92%] rounded-tl-2xl shadow-2xl" />;

function WorkA() { // big stacked, title only
  return (
    <div className="space-y-5">
      {W.map((w) => (
        <div key={w.t} className="relative grid md:grid-cols-2 overflow-hidden rounded-[32px] min-h-[420px]" style={{ background: w.bg }}>
          <div className="flex items-end p-8 md:p-12"><h3 className="text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.02em]" style={serif}>{w.t}</h3></div>
          <div className="relative min-h-[260px]"><Pic w={w} /></div>
        </div>
      ))}
    </div>
  );
}
function WorkB() { // editorial index list, hover reveals the preview
  const [h, setH] = useState(0);
  return (
    <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
      <ul className="divide-y divide-black/15 border-y border-black/15">
        {W.map((w, i) => (
          <li key={w.t} onMouseEnter={() => setH(i)} onClick={() => setH(i)} className="group flex items-baseline justify-between gap-4 py-7 cursor-pointer">
            <span className="text-[34px] md:text-[54px] leading-none tracking-[-0.02em] transition-opacity" style={{ ...serif, opacity: h === i ? 1 : 0.35 }}>{w.t}</span>
            <span className="text-[13px] text-black/50 hidden sm:block">0{i + 1}</span>
          </li>
        ))}
      </ul>
      <div className="relative h-[380px] md:h-[460px] overflow-hidden rounded-[28px] transition-colors duration-500" style={{ background: W[h].bg }}><Pic w={W[h]} /></div>
    </div>
  );
}
function WorkC() { // simple tiles
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {W.map((w) => (
        <div key={w.t}>
          <div className="relative h-[360px] overflow-hidden rounded-[28px]" style={{ background: w.bg }}><Pic w={w} /></div>
          <div className="mt-4 flex items-baseline justify-between gap-3"><h3 className="text-[26px] leading-tight" style={serif}>{w.t}</h3><span className="text-[18px]">↗</span></div>
        </div>
      ))}
    </div>
  );
}

const Chip = ({ children, bg = '#fff' }) => <span className="inline-block rounded-full px-4 py-1.5 text-[14px] font-medium" style={{ background: bg }}>{children}</span>;
function AboutA() { // statement with inline photos
  const P = ({ s }) => <img src={s} alt="" className="inline-block align-middle h-[0.7em] w-[1.5em] rounded-full object-cover mx-1 -mt-1" />;
  return (
    <p className="mx-auto max-w-[1000px] text-center text-[34px] sm:text-[64px] leading-[1.08] tracking-[-0.02em]" style={serif}>
      Product designer in Hyderabad <P s={beach} /> with 5+ years making complex software <em>feel</em> simple <P s={temple} /> for teams and their clients.
    </p>
  );
}
function AboutB() { // portrait + short bio
  return (
    <div className="mx-auto grid max-w-[1000px] items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <img src={avatar} alt="Yogesh" className="aspect-[4/5] w-full rounded-[32px] object-cover" />
      <div>
        <h3 className="text-[44px] md:text-[68px] leading-[1] tracking-[-0.02em]" style={serif}>Hi, I'm Yogesh.</h3>
        <p className="mt-5 max-w-[440px] text-[18px] leading-snug text-black/70">I design calm, clear products at Paradigm IT and turn messy ideas into things people enjoy using.</p>
        <div className="mt-6 flex flex-wrap gap-2"><Chip bg="#dff5ff">Hyderabad</Chip><Chip bg="#d3f7e1">5+ years</Chip><Chip bg="#fff0b8">Scrum Master</Chip></div>
      </div>
    </div>
  );
}
function AboutC() { // photo collage + one line
  const T = ({ s, r, c }) => <img src={s} alt="" className={`absolute w-[26%] md:w-[17%] aspect-[4/5] object-cover rounded-lg border-[6px] border-white shadow-xl ${c}`} style={{ transform: `rotate(${r}deg)` }} />;
  return (
    <div className="relative mx-auto h-[520px] max-w-[1000px]">
      <T s={lighthouse} r={-6} c="left-[2%] top-[4%]" /><T s={temple} r={4} c="right-[2%] top-[0%]" /><T s={cycle} r={-3} c="left-[8%] bottom-[2%]" /><T s={beach} r={5} c="right-[6%] bottom-[0%]" />
      <div className="absolute inset-0 grid place-items-center px-[28%] text-center z-10">
        <p className="text-[22px] md:text-[44px] leading-[1.08] tracking-[-0.02em]" style={serif}>I design calm products, and collect small moments off-screen.</p>
      </div>
    </div>
  );
}


function WorkD() { // horizontal snap strip
  return (
    <div className="-mx-5 sm:-mx-8 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]">
      <div className="flex gap-5 px-5 sm:px-8 w-max">
        {W.map((w) => (
          <div key={w.t} className="snap-start w-[82vw] md:w-[640px]">
            <div className="relative h-[420px] overflow-hidden rounded-[32px]" style={{ background: w.bg }}><Pic w={w} /></div>
            <div className="mt-4 flex items-baseline justify-between"><h3 className="text-[30px] leading-tight" style={serif}>{w.t}</h3><span className="text-[14px] text-black/55">{w.n}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
function WorkE() { // bento: one hero project + two smaller
  const [a, b, c] = W;
  const Card = ({ w, cls }) => (
    <div className={`relative overflow-hidden rounded-[32px] ${cls}`} style={{ background: w.bg }}>
      <div className="absolute inset-x-0 bottom-0 top-[26%] overflow-hidden"><Pic w={w} /></div>
      <h3 className="absolute left-6 top-6 right-6 text-[28px] md:text-[36px] leading-[1.02] tracking-[-0.02em]" style={serif}>{w.t}</h3>
    </div>
  );
  return (
    <div className="grid gap-5 md:grid-cols-[1.4fr_1fr] md:grid-rows-2 md:h-[720px]">
      <Card w={a} cls="h-[460px] md:h-auto md:row-span-2" />
      <Card w={b} cls="h-[340px] md:h-auto" />
      <Card w={c} cls="h-[340px] md:h-auto" />
    </div>
  );
}
function WorkF() { // fanned deck, hover spreads
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={() => setOpen((o) => !o)} className="relative mx-auto h-[520px] max-w-[1000px] cursor-pointer">
      {W.map((w, i) => {
        const d = i - 1;
        return (
          <div key={w.t} className="absolute left-1/2 top-6 w-[300px] md:w-[360px] transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-50% + ${d * (open ? 380 : 60)}px)) rotate(${d * (open ? 2 : 8)}deg) translateY(${Math.abs(d) * (open ? 0 : 24)}px)`, zIndex: 3 - Math.abs(d) }}>
            <div className="relative h-[400px] overflow-hidden rounded-[28px] shadow-[0_30px_50px_-25px_rgba(0,0,0,0.5)]" style={{ background: w.bg }}><Pic w={w} /></div>
            <h3 className={`mt-4 text-center text-[24px] leading-tight transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} style={serif}>{w.t}</h3>
          </div>
        );
      })}
    </div>
  );
}

const JOBS = [
  ['Paradigm IT', 'Product Designer', '2025 – now'],
  ['Prasthana Software', 'Product Designer', '2022 – 24'],
  ['Buildup Service', 'UI Designer', '2021 – 22'],
];
function AboutD() { // short line + experience list
  return (
    <div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-2">
      <p className="text-[36px] md:text-[52px] leading-[1.04] tracking-[-0.02em]" style={serif}>5 years of making busy software feel <em>calm</em>.</p>
      <ul className="divide-y divide-black/15 border-y border-black/15 self-end">
        {JOBS.map(([c, r, y]) => (
          <li key={c} className="grid grid-cols-[1fr_auto] gap-x-4 py-5">
            <span className="text-[22px]" style={serif}>{c}</span><span className="text-[14px] text-black/50">{y}</span>
            <span className="text-[14px] text-black/55">{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function AboutE() { // full-bleed photo, text on it
  return (
    <div className="relative h-[560px] overflow-hidden rounded-[36px]">
      <img src={beach} alt="Yogesh by the sea" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <h3 className="text-[48px] md:text-[80px] leading-[0.98] tracking-[-0.02em]" style={serif}>Hi, I'm Yogesh.</h3>
        <p className="mt-3 max-w-[460px] text-[17px] text-white/85">Product designer in Hyderabad. I like quiet interfaces, long rides and the sea.</p>
      </div>
    </div>
  );
}
function AboutF() { // bento of facts
  const T = ({ children, bg, cls = '' }) => <div className={`rounded-[28px] p-6 flex flex-col justify-end ${cls}`} style={{ background: bg }}>{children}</div>;
  const Big = ({ children }) => <div className="text-[44px] md:text-[56px] leading-none tracking-[-0.02em]" style={serif}>{children}</div>;
  const Small = ({ children }) => <div className="mt-2 text-[14px] text-black/60">{children}</div>;
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 md:grid-rows-2 md:h-[480px]">
      <div className="relative col-span-2 row-span-2 min-h-[320px] overflow-hidden rounded-[28px]"><img src={avatar} alt="Yogesh" className="absolute inset-0 h-full w-full object-cover" /></div>
      <T bg="#d3f7e1" cls="min-h-[180px]"><Big>5+</Big><Small>years designing products</Small></T>
      <T bg="#dff5ff" cls="min-h-[180px]"><Big>HYD</Big><Small>Hyderabad, India</Small></T>
      <T bg="#fff0b8" cls="min-h-[180px]"><Big>CSM</Big><Small>Certified Scrum Master</Small></T>
      <div className="relative min-h-[180px] overflow-hidden rounded-[28px]"><img src={cycle} alt="" className="absolute inset-0 h-full w-full object-cover" /></div>
    </div>
  );
}

const Block = ({ k, label, children }) => (
  <section className="px-5 sm:px-8 py-14 border-t border-black/10">
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-8 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#141210] text-[#f4f1ea] text-[14px] font-medium">{k}</span><span className="text-[14px] text-black/55">{label}</span></div>
      {children}
    </div>
  </section>
);

export default function Options() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#141210]" style={{ fontFamily: "'STK Bureau Sans','Inter Variable', system-ui, sans-serif" }}>
      <header className="px-5 sm:px-8 pt-12 pb-6"><div className="mx-auto max-w-[1180px] text-[52px] sm:text-[84px] leading-none tracking-[-0.02em]" style={serif}>Work <em>&amp;</em> About</div></header>
      <Block k="W1" label="Work · big cards"><WorkA /></Block>
      <Block k="W2" label="Work · index list (hover)"><WorkB /></Block>
      <Block k="W3" label="Work · simple tiles"><WorkC /></Block>
      <Block k="W4" label="Work · swipe strip"><WorkD /></Block>
      <Block k="W5" label="Work · bento"><WorkE /></Block>
      <Block k="W6" label="Work · fanned deck (hover)"><WorkF /></Block>
      <Block k="A1" label="About · statement"><AboutA /></Block>
      <Block k="A2" label="About · portrait"><AboutB /></Block>
      <Block k="A3" label="About · collage"><AboutC /></Block>
      <Block k="A4" label="About · experience"><AboutD /></Block>
      <Block k="A5" label="About · full photo"><AboutE /></Block>
      <Block k="A6" label="About · facts bento"><AboutF /></Block>
      <Block k="A7" label="About · poster"><AboutPoster /></Block>
      <Block k="K1" label="Kind words · tinted cards"><KindA /></Block>
      <Block k="K2" label="Kind words · one big quote"><KindB /></Block>
      <Block k="P1" label="Playground · bento"><PlayA /></Block>
      <Block k="P2" label="Playground · pill list"><PlayB /></Block>
      <Block k="F1" label="Footer · light"><FooterA /></Block>
      <Block k="F2" label="Footer · dark with pills"><FooterB /></Block>
    </div>
  );
}
