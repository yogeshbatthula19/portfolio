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

// Studio-grade mechanical typewriter keystroke synthesis
function playTypewriterClick(ctx, isSpaceOrReturn = false) {
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  if (ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;

    // 1. Crisp Metallic Hammer Strike (Shaped noise burst through high-Q bandpass)
    const bufferLen = Math.floor(ctx.sampleRate * 0.042);
    const noiseBuffer = ctx.createBuffer(1, bufferLen, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    const decayConst = ctx.sampleRate * 0.007; // 7ms fast exponential falloff
    for (let i = 0; i < bufferLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / decayConst);
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const centerFreq = isSpaceOrReturn ? 1750 : 2450 + (Math.random() - 0.5) * 400;
    filter.frequency.setValueAtTime(centerFreq, now);
    filter.Q.setValueAtTime(3.8, now);

    const noiseGain = ctx.createGain();
    const peakVolume = isSpaceOrReturn ? 0.22 : 0.28;
    noiseGain.gain.setValueAtTime(peakVolume, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + 0.042);

    // 2. Heavy Platen / Chassis Thud (Low-end acoustic body resonance)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'triangle';
    const startFreq = isSpaceOrReturn ? 210 : 280 + (Math.random() - 0.5) * 40;
    const endFreq = isSpaceOrReturn ? 80 : 110;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.035);

    const oscVolume = isSpaceOrReturn ? 0.26 : 0.20;
    oscGain.gain.setValueAtTime(oscVolume, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    // Fail silently
  }
}

export function TypewriterExperience() {
  const ref = useRef(null);
  const previousCount = useRef(0);
  const lastPlayTime = useRef(0);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

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
    const events = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown', 'wheel'];
    events.forEach((evt) => window.addEventListener(evt, unlock, { passive: true }));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, unlock));
    };
  }, []);

  // Play audio when text progresses forwards
  useEffect(() => {
    if (count <= previousCount.current) {
      previousCount.current = count;
      return;
    }
    const delta = count - previousCount.current;
    previousCount.current = count;

    if (reduced || !soundEnabled) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = performance.now();
    // Pace keystrokes so fast scrolls sound natural (max ~20 strokes/sec)
    if (now - lastPlayTime.current < 48) return;
    lastPlayTime.current = now;

    const char = copy[count - 1] || '';
    const isSpaceOrReturn = char === ' ' || char === '\n';

    playTypewriterClick(ctx, isSpaceOrReturn);

    // If fast scrolling leaped multiple characters, play a quick companion micro-tap
    if (delta >= 4) {
      setTimeout(() => {
        if (ctx && ctx.state === 'running') {
          playTypewriterClick(ctx, false);
        }
      }, 26);
    }
  }, [count, reduced, soundEnabled]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      const ctx = getAudioContext();
      if (ctx) {
        ctx.resume().then(() => {
          playTypewriterClick(ctx, false);
        }).catch(() => {});
      }
    }
  };

  const shown = reduced ? copy.length : count;

  return (
    <section ref={ref} className={`about-experience ${reduced ? 'is-complete' : ''}`} aria-labelledby="experience-title">
      <div className="experience-sticky">
        <header className="collection-heading">
          <span>Experience</span>
          <h2 id="experience-title">A career, one chapter at a time.</h2>
        </header>
        <div className="typewriter-layout">
          <div className="typewriter-scene" aria-hidden="true">
            <div className="experience-paper" style={{ transform: `translateY(${-12 - (78 * shown) / copy.length}%)` }}>
              <span className="paper-kicker">YOGESH BATTULA / EXPERIENCE</span>
              <pre>{copy.slice(0, shown)}{shown < copy.length ? '▌' : ''}</pre>
            </div>
            <img className="typewriter-machine" src="/about-art/typewriter.jpg" alt="" width="736" height="985" loading="lazy" decoding="async" />
          </div>
          <div className="experience-readable">
            <ol>
              {roles.map((r, i) => {
                const start = roles.slice(0, i).map((role) => role.join('\n')).join('\n\n').length + (i ? 2 : 0);
                const reveal = reduced ? 1 : Math.max(0, Math.min(1, (shown - start) / r.join('\n').length));
                return (
                  <li key={r[0]} style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 12}px)` }}>
                    <h3>{r[0]}</h3>
                    <p>{r[1]}</p>
                    <time>{r[2]}</time>
                  </li>
                );
              })}
            </ol>
            <div className="experience-controls">
              <button
                type="button"
                aria-pressed={soundEnabled}
                onClick={handleToggleSound}
              >
                {soundEnabled ? 'Typewriter Sound: ON 🔊' : 'Typewriter Sound: OFF 🔇'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const tapes=[['Premalu',84,169,862,126],['John Wick',61,298,870,127],['Captain America: Civil War',68,428,890,127],['Eega',51,557,887,125],['Black Panther',73,685,893,121],['Rangasthalam',46,807,899,121],['F1',75,932,895,120],['Salaar',43,1056,913,125],['Oohalu Gusagusalade',72,1184,886,128],['Baahubali: The Beginning',44,1314,932,126]];
function Cassette({item,index,progress,reduced}){
 const [title,x,y,w,h]=item, start=index*.058;
 const dx=useTransform(progress,[start,start+.35],[(index%2?1:-1)*230,0]);
 const dy=useTransform(progress,[start,start+.35],[-65,0]);
 const rotate=useTransform(progress,[start,start+.35],[(index%2?1:-1)*16,0]);
 const opacity=useTransform(progress,[start,start+.12],[0,1]);
 const id=`about-tape-${index}`;
 return <motion.div className="original-cassette" style={reduced?{x:0,y:0,rotate:0,opacity:1}:{x:dx,y:dy,rotate,opacity}} role="img" aria-label={title}><svg viewBox="0 0 940 126" aria-hidden="true"><defs><clipPath id={id}><rect x={(940-w)/2} y="0" width={w} height={Math.min(h,126)} rx="18"/></clipPath></defs><image href="/about-art/cassettes.jpg" x={-x+(940-w)/2} y={-y} width="1016" height="1548" clipPath={`url(#${id})`}/></svg></motion.div>;
}
export function CassetteCollection(){
 const ref=useRef(null),reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start 70%','end 90%']});
 return <section ref={ref} className={`about-cassettes ${reduced?'is-complete':''}`} aria-labelledby="movies-title"><div className="cassette-sticky"><header className="collection-heading"><h2 id="movies-title">Stories I keep coming back to.</h2></header><div className="cassette-scene"><svg className="cassette-curve" viewBox="0 0 800 800" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M 80 30 C 790 0 790 185 490 210 S -110 340 180 435 S 870 580 700 770" fill="none" stroke="#a6b89c" strokeWidth="3" strokeLinecap="round" style={{pathLength:reduced?1:scrollYProgress}}/></svg><div className="original-stack">{tapes.map((t,i)=><Cassette key={t[0]} item={t} index={i} progress={scrollYProgress} reduced={reduced}/>)}</div></div></div></section>;
}
