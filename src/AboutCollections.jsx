import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import './about-collections.css';

const roles = [
 ['Paradigm IT', 'Product Designer', 'Aug 2025 — present'],
 ['Prasthana Software Solutions', 'Product Designer', 'Apr 2022 — Dec 2024'],
 ['Buildup Service', 'UI Designer', 'Mar 2021 — Apr 2022'],
 ['Freelance & Contract', 'Junior UI/UX Designer', 'Jan 2021 — Mar 2021'],
];
const copy = roles.map(r => r.join('\n')).join('\n\n');
// Resilient Web Audio helper that retrieves or creates singleton AudioContext
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!window.__portfolioAudioCtx) {
    try {
      window.__portfolioAudioCtx = new AudioCtx();
    } catch (e) {
      return null;
    }
  }
  if (window.__portfolioAudioCtx.state === 'suspended') {
    window.__portfolioAudioCtx.resume().catch(() => {});
  }
  return window.__portfolioAudioCtx;
}

// Initial authentic typewriter click synthesis (clean white noise burst with exponential falloff)
function playTypewriterClick(ctx) {
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  if (ctx.state !== 'running') return;

  try {
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.035), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.005));
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    gain.gain.value = 0.08;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.onended = () => {
      try {
        source.disconnect();
        gain.disconnect();
      } catch (e) {}
    };
    source.start();
  } catch (e) {}
}

export function TypewriterExperience() {
  const ref = useRef(null);
  const previousCount = useRef(0);
  const lastTick = useRef(0);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 20%', 'end 85%'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setCount(Math.floor(Math.max(0, Math.min(1, p * 1.2)) * copy.length));
  });

  // Global listeners to unlock audio on any user gesture
  useEffect(() => {
    const unlock = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    };
    const events = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown', 'wheel', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, unlock, { passive: true }));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, unlock));
    };
  }, []);

  // Play initial audio when text progresses forwards - always on on scroll
  useEffect(() => {
    const advancing = count > previousCount.current;
    previousCount.current = count;

    if (!advancing || reduced) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    if (ctx.state !== 'running') return;

    if (ctx.currentTime - lastTick.current < 0.045) return;
    lastTick.current = ctx.currentTime;

    playTypewriterClick(ctx);
  }, [count, reduced]);

  const shown = reduced ? copy.length : count;

  return (
    <section ref={ref} className={`about-experience ${reduced ? 'is-complete' : ''}`} aria-labelledby="experience-title">
      <div className="experience-sticky">
        <header className="collection-heading">
          <span>Experience</span>
          <h2 id="experience-title">A career, one chapter at a time.</h2>
        </header>
        <ol className="sr-only">{roles.map(r=><li key={r[0]}>{r.join(', ')}</li>)}</ol>
        <div className="typewriter-layout">
          <div className="typewriter-scene" aria-hidden="true">
            <div className="experience-paper" style={{ transform: `translateY(${-12 - (78 * shown) / copy.length}%)` }}>
              <span className="paper-kicker">YOGESH BATTULA / EXPERIENCE</span>
              <div className="paper-roles">{roles.map((role, i) => {
                const offset = roles.slice(0,i).reduce((n,r)=>n+r.join('\n').length+2,0);
                return <div className="paper-role" key={role[0]}>{role.map((line,j)=>{
                  const start=offset+role.slice(0,j).reduce((n,l)=>n+l.length+1,0);
                  const text=line.slice(0,Math.max(0,shown-start));
                  return <div key={j}>{j===0?<strong>{text}</strong>:j===1?<b>{text}</b>:text}</div>;
                })}</div>;
              })}</div>
            </div>
            <img className="typewriter-machine" src="/about-art/typewriter.jpg" alt="" width="736" height="985" loading="lazy" decoding="async" />
          </div>

        </div>
      </div>
    </section>
  );
}
const tapes=[['Premalu',84,169,862,126],['John Wick',61,298,870,127],['Captain America: Civil War',68,428,890,127],['Eega',51,557,887,125],['Black Panther',73,685,893,121],['Rangasthalam',46,807,899,121],['F1',75,932,895,120],['Salaar',43,1056,913,125],['Oohalu Gusagusalade',72,1184,886,128],['Baahubali: The Beginning',44,1314,932,126]];
const posterFiles = import.meta.glob('./assets/movies/movie_*.jpg', { eager: true, query: '?url', import: 'default' });
const posterNumbers = ['01','02','05','03','04','06','07','08','09','10'];
// One short, filtered plastic sound per pull/return, never a scroll loop.
let lastCassetteSound = -Infinity;
function playCassetteSound(kind) {
 const ctx = getAudioContext();
 if (!ctx) return;
 if (ctx.state === 'suspended') {
  ctx.resume().catch(() => {});
 }
 if (ctx.state !== 'running' || document.hidden) return;
 const now = ctx.currentTime;
 if (now - lastCassetteSound < .09) return;
 lastCassetteSound = now;
 const slide = kind === 'slide', duration = slide ? .16 : .045;
 const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
 const samples = buffer.getChannelData(0);
 for (let i=0;i<samples.length;i++) {
  const t=i/samples.length;
  samples[i]=(Math.random()*2-1)*(slide ? Math.sin(Math.PI*t)*Math.exp(-t*2) : Math.exp(-t*9));
 }
 const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
 source.buffer=buffer;filter.type='bandpass';filter.frequency.value=slide?1100:650;filter.Q.value=slide?.65:1.2;
 gain.gain.value=slide?.055:.075;
 source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
 source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 source.start(now);
}
function ShelfCassette({ item, index, progress, reduced }) {
 const [title,x,y,w,h] = item;
 const amount = useTransform(progress, p => {
  const phase = p * (tapes.length + 1) - index;
  return Math.max(0, Math.min(1, phase / .35, (1.35 - phase) / .35));
 });
 const pulled = useRef(false);
 useMotionValueEvent(amount, 'change', value => {
  if (reduced) { pulled.current=false; return; }
  if (!pulled.current && value > .18) {
   pulled.current=true;
   playCassetteSound('slide');
  } else if (pulled.current && value < .025) {
   pulled.current=false;
   playCassetteSound('click');
  }
 });
 const width = useTransform(amount, v => `calc(var(--spine-width) + var(--cover-extra) * ${v})`);
 const lift = useTransform(amount, [0,1], [0,-22]);
 const turn = useTransform(amount, [0,1], [-85,-8]);
 const scale = useTransform(amount, [0,1], [1,1.04]);
 const spineOpacity = useTransform(amount, [0,.5,1], [1,.5,0]);
 const depth = useTransform(amount, v => Math.round(v*100)+1);
 const poster = Object.entries(posterFiles).find(([path]) => path.includes(`movie_${posterNumbers[index]}_`))?.[1];
 const id = `shelf-spine-${index}`;
 return <motion.figure className="shelf-tape" style={reduced ? {} : {width,y:lift,scale,zIndex:depth}} aria-label={title}>
  <motion.div className="shelf-spine" style={reduced ? {} : {opacity:spineOpacity}} aria-hidden="true">
   <svg viewBox="0 0 940 126"><defs><clipPath id={id}><rect x={(940-w)/2} width={w} height={Math.min(h,126)} rx="18"/></clipPath></defs><image href="/about-art/cassettes.jpg" x={-x+(940-w)/2} y={-y} width="1016" height="1548" clipPath={`url(#${id})`}/></svg>
  </motion.div>
  <motion.div className="shelf-cover" style={reduced ? {} : {rotateY:turn,opacity:amount}}>
   <img src={poster} alt={title} loading="lazy" decoding="async"/>
   <span className="shelf-cover-edge" aria-hidden="true"/>
  </motion.div>
 </motion.figure>;
}
export function CassetteCollection(){
 const ref=useRef(null),reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 return <section ref={ref} className={`about-cassettes shelf-collection ${reduced?'is-complete':''}`} aria-labelledby="movies-title">
  <div className="cassette-sticky">
   <header className="collection-heading"><h2 id="movies-title">Stories I keep coming back to.</h2></header>
   <div className="movie-shelf"><div className="shelf-tapes">{tapes.map((t,i)=><ShelfCassette key={t[0]} item={t} index={i} progress={scrollYProgress} reduced={reduced}/>)}</div><div className="shelf-plank" aria-hidden="true"/></div>
  </div>
 </section>;
}
