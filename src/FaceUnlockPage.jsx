import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/inter';
import appIcon from './assets/faceunlock/app-icon.png';
import skyHero from './assets/faceunlock/sky-hero.jpg';
import skyFooter from './assets/faceunlock/sky-footer.jpg';
import iconFace from './assets/faceunlock/icon-face-scan.jpg';
import iconLaptop from './assets/faceunlock/icon-laptop-lid.jpg';
import iconLock from './assets/faceunlock/icon-lock-open.jpg';
import iconBlink from './assets/faceunlock/icon-eye-blink.jpg';
import iconShield from './assets/faceunlock/icon-shield-chip.jpg';
import iconOne from './assets/faceunlock/icon-one-face.jpg';
import iconFail from './assets/faceunlock/icon-fail-safe.jpg';

const A = { appIcon, iconFace, iconLaptop, iconLock, iconBlink, iconShield, iconOne, iconFail };

const CSS = `
html{scroll-behavior:smooth}
a.fu-a{color:#0A6CFF}
@keyframes fu-drift{0%{transform:translateX(0)}50%{transform:translateX(40px)}100%{transform:translateX(0)}}
@keyframes fu-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.fu-sky-hero{background:url(${skyHero}) center bottom/cover no-repeat}
.fu-sky-closing{background:#FFFFFF url(${skyFooter}) center bottom/cover no-repeat}
.fu-float{animation:fu-float 6s ease-in-out infinite}
.fu-btn{transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,background-color .2s}
.fu-btn:hover{transform:translateY(-2px)}
.fu-btn:active{transform:translateY(0) scale(.97)}
.fu-shine{position:relative;overflow:hidden}
.fu-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.6) 50%,transparent 70%);transform:translateX(-120%);transition:transform .8s}
.fu-shine:hover::after{transform:translateX(120%)}
.fu-link{background-image:linear-gradient(currentColor,currentColor);background-size:0 1.5px;background-repeat:no-repeat;background-position:0 100%;transition:background-size .25s;padding-bottom:2px}
.fu-link:hover{background-size:100% 1.5px}
.fu-card{transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s}
.fu-card:hover{transform:translateY(-6px);box-shadow:0 34px 60px rgba(30,90,170,.16)!important}
.fu-card img{transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.fu-card:hover img{transform:scale(1.07) rotate(-3deg)}
.fu-switch{transition:background-color .25s}
.fu-knob{transition:transform .35s cubic-bezier(.3,1.5,.5,1)}
@keyframes fu-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
.fu-bounce{animation:fu-bounce 1.6s ease-in-out infinite}
@keyframes fu-eq{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.fu-eq>span{animation:fu-eq .9s ease-in-out infinite;transform-origin:bottom}
.fu-eq>span:nth-child(2){animation-delay:.15s}.fu-eq>span:nth-child(3){animation-delay:.3s}
@keyframes fu-ping{0%{box-shadow:0 0 0 0 rgba(52,199,89,.6)}100%{box-shadow:0 0 0 8px rgba(52,199,89,0)}}
.fu-pulse-dot{animation:fu-ping 1.6s ease-out infinite}
@keyframes fu-ringfill{0%{stroke-dashoffset:var(--len)}100%{stroke-dashoffset:0}}
@media (max-width:860px){.fu-bento{grid-template-columns:minmax(0,1fr)!important}.fu-bento>*{grid-column:auto!important}}
@media (prefers-reduced-motion:reduce){.fu-bounce,.fu-eq>span,.fu-pulse-dot,.fu-shine::after,.fu-float{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
`;

// ---- Mockups --------------------------------------------------------------

// The enrollment window: camera circle, tick ring, direction prompt.
function ScanWindowMock() {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    <div className="fu-float" style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 260, boxSizing: 'border-box', padding: '26px 22px 20px', borderRadius: 22, background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(28px) saturate(170%)', WebkitBackdropFilter: 'blur(28px) saturate(170%)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 30px 60px rgba(20,70,140,0.22)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', width: 204, height: 204 }}>
          <svg viewBox="0 0 204 204" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
            {ticks.map((i) => {
              const a = (i / 72) * Math.PI * 2 - Math.PI / 2;
              const x1 = 102 + Math.cos(a) * 94, y1 = 102 + Math.sin(a) * 94;
              const x2 = 102 + Math.cos(a) * 101, y2 = 102 + Math.sin(a) * 101;
              const done = i < 46 || i > 66;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={done ? '#34C759' : 'rgba(11,27,51,0.2)'} strokeWidth="3" strokeLinecap="round" />;
            })}
          </svg>
          <div style={{ position: 'absolute', inset: 16, borderRadius: 999, overflow: 'hidden', background: 'linear-gradient(180deg,#9FB7D6 0%,#5E7699 70%,#3B4E6B 100%)' }}>
            {/* soft silhouette of a person looking slightly up */}
            <svg viewBox="0 0 100 100" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <ellipse cx="50" cy="104" rx="42" ry="30" fill="#24344F" />
              <rect x="43" y="66" width="14" height="18" rx="6" fill="#C79A82" />
              <ellipse cx="50" cy="46" rx="19" ry="24" fill="#D9AE95" />
              <path d="M31 42c0-17 9-24 19-24s19 7 19 24c-4-8-10-12-19-12s-15 4-19 12z" fill="#2A2420" />
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textAlign: 'center' }}>
          <ChevronUp size={22} color="#34C759" strokeWidth={3} />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0B1B33' }}>Tilt your head up</span>
          <span style={{ fontSize: 12.5, color: '#4A5B75' }}>Keep going, almost there.</span>
        </div>
        <span style={{ marginTop: 2, padding: '7px 18px', borderRadius: 999, background: 'rgba(11,27,51,0.07)', fontSize: 13, fontWeight: 600, color: '#0B1B33' }}>Cancel</span>
      </div>
    </div>
  );
}

// The "Unlocked" HUD floating over the desktop right after unlocking.
function HudMock() {
  return (
    <div className="fu-sky-hero" style={{ flex: 1, minHeight: 230, position: 'relative', borderRadius: 22, overflow: 'hidden', border: '1px solid #DCEBFA' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 22, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', fontSize: 11, fontWeight: 600, color: '#0B1B33' }}>
        <span>Finder</span><span style={{ fontWeight: 500 }}>Thu 9:41</span>
      </div>
      <div className="fu-float" style={{ position: 'absolute', left: '50%', top: '52%', width: 128, height: 128, marginLeft: -64, marginTop: -64, borderRadius: 34, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(24px) saturate(170%)', WebkitBackdropFilter: 'blur(24px) saturate(170%)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 24px 48px rgba(20,70,140,0.28), inset 0 1px 0 rgba(255,255,255,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 54, height: 54 }}><rect x="5" y="11" width="14" height="10" rx="2.5" fill="#34C759" stroke="none" /><path d="M8 11V7a4 4 0 0 1 7.6-1.8" /></svg>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#0B1B33' }}>Unlocked</span>
      </div>
    </div>
  );
}

// ---- Download gate: name + email, saved to a CSV in a private GitHub repo ------
const DMG_URL = '/downloads/FaceUnlock-0.1.0.dmg';
function startDownload() {
  const a = document.createElement('a');
  a.href = DMG_URL; a.download = 'FaceUnlock-0.1.0.dmg';
  document.body.appendChild(a); a.click(); a.remove();
}

function DownloadModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const firstRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    setStatus('idle'); setError('');
    const t = setTimeout(() => firstRef.current && firstRef.current.focus(), 60);
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => { clearTimeout(t); window.removeEventListener('keydown', esc); };
  }, [open, onClose]);
  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setStatus('sending');
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (r.status === 400) { const j = await r.json().catch(() => ({})); setError(j.error || 'Please check your name and email.'); setStatus('idle'); return; }
    } catch (err) { /* offline or no backend: still let them download */ }
    try { localStorage.setItem('fu_lead', '1'); } catch (err) { /* ignore */ }
    setStatus('done');
    startDownload();
  };

  const input = { width: '100%', boxSizing: 'border-box', height: 48, padding: '0 16px', borderRadius: 14, border: '1px solid #D5E4F7', background: '#F7FAFF', fontFamily: 'inherit', fontSize: 15, color: '#0B1B33', outline: 'none' };
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="fu-dl-title" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(8,30,70,0.38)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div style={{ width: '100%', maxWidth: 420, boxSizing: 'border-box', padding: 28, borderRadius: 28, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 40px 90px rgba(10,40,100,0.35)', position: 'relative' }}>
        <button type="button" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: 999, border: 0, background: 'rgba(11,27,51,0.06)', cursor: 'pointer', fontSize: 18, color: '#2B3D5A' }}>×</button>
        <img src={appIcon} alt="" style={{ width: 56, height: 56 }} />
        {status !== 'done' ? (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
            <h3 id="fu-dl-title" style={{ margin: 0, fontSize: 26, letterSpacing: '-0.02em', fontWeight: 700, color: '#0B1B33' }}>Get FaceUnlock</h3>
            <p style={{ margin: '0 0 6px', fontSize: 14.5, lineHeight: 1.5, color: '#4A5B75' }}>Tell me who you are and the download starts right away.</p>
            <input ref={firstRef} required name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={input} />
            <input required type="email" name="email" autoComplete="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={input} />
            <input tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />
            {error && <span role="alert" style={{ fontSize: 13.5, color: '#C4291C' }}>{error}</span>}
            <button type="submit" disabled={status === 'sending'} className="fu-btn fu-shine" style={{ marginTop: 4, minHeight: 50, borderRadius: 999, border: 0, background: '#0A6CFF', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 12px 30px rgba(10,108,255,0.3)', opacity: status === 'sending' ? 0.7 : 1 }}>{status === 'sending' ? 'One moment…' : 'Download for Mac'}</button>
            <span style={{ fontSize: 12, lineHeight: 1.45, color: '#6B7C96', textAlign: 'center' }}>Your name and email are saved so I know who is trying FaceUnlock. They are never shared.</span>
          </form>
        ) : (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 id="fu-dl-title" style={{ margin: 0, fontSize: 26, letterSpacing: '-0.02em', fontWeight: 700, color: '#0B1B33' }}>Thanks, it is downloading.</h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: '#4A5B75' }}>Open the DMG and drag FaceUnlock into Applications. The first time, right-click the app, choose Open, then Open again.</p>
            <a className="fu-btn" href={DMG_URL} download style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 20px', borderRadius: 999, background: '#0B1B33', color: '#fff', textDecoration: 'none', fontSize: 14.5, fontWeight: 600 }}>Download didn't start? Try again</a>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Scroll-driven hero values -----------------------------------------------
const cl = (x) => Math.max(0, Math.min(1, x));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function sceneVals(p, reduced) {
  const open = ease(cl(p / 0.45));
  const cam = ease(cl(p / 0.5));
  const screenOn = cl((p - 0.26) / 0.14);
  const scan = cl((p - 0.48) / 0.26);
  const unlocked = p >= 0.75;
  const desk = ease(cl((p - 0.8) / 0.12));
  const hud = unlocked ? 1 - cl((p - 0.88) / 0.07) : 0;
  const pop = unlocked ? cl((p - 0.75) / 0.025) : 0;
  return {
    trackH: reduced ? 900 : 2400,
    tilt: (-60 + 50 * cam).toFixed(2),
    lidAngle: (-90 + 96 * open).toFixed(2),
    sceneScale: (0.84 + 0.16 * cam).toFixed(3),
    sceneY: (30 - 30 * cam).toFixed(1),
    headOpacity: (1 - cl(p / 0.2)).toFixed(3),
    headY: (-50 * cl(p / 0.2)).toFixed(1),
    hintOpacity: (1 - cl(p / 0.04)).toFixed(3),
    screenDark: (1 - screenOn).toFixed(3),
    lockOpacity: (1 - desk).toFixed(3),
    lockScale: (1 + desk * 0.06).toFixed(3),
    lockBlur: (desk * 8).toFixed(1),
    ringDeg: (scan * 360).toFixed(1),
    isUnlocked: unlocked,
    notUnlocked: !unlocked,
    prompt: p < 0.48 ? 'Look at your Mac to unlock' : unlocked ? 'Unlocked' : 'Scanning… blink once',
    camColor: p > 0.42 && p < 0.8 ? '#34C759' : '#1C2A3A',
    deskOpacity: desk.toFixed(3),
    popY: (-16 + 16 * desk).toFixed(1),
    hudOpacity: hud.toFixed(3),
    hudScale: (0.7 + 0.3 * (1 - Math.pow(1 - pop, 3)) * (1 + 0.08 * Math.sin(pop * Math.PI))).toFixed(3),
  };
}

export default function FaceUnlockPage() {
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [p, setP] = useState(reduced ? 1 : 0);
  const [soundOn, setSoundOn] = useState(false);
  const [sw, setSw] = useState({ master: true, blink: true, anim: true, login: false });
  const [copied, setCopied] = useState(false);
  const [dlOpen, setDlOpen] = useState(false);
  const acRef = useRef(null);
  const soundOnRef = useRef(false);
  const prevP = useRef(0);
  soundOnRef.current = soundOn;

  useEffect(() => {
    document.title = 'FaceUnlock · Unlock your Mac with a glance · Yogesh Battula';
    const desc = document.querySelector('meta[name="description"]');
    const old = desc && desc.getAttribute('content');
    if (desc) desc.setAttribute('content', 'FaceUnlock is a Face ID–style unlock app for MacBook, built in Swift. A playground project by Yogesh Battula. Download the source and build it in a minute.');
    window.scrollTo(0, 0);
    return () => { if (desc && old) desc.setAttribute('content', old); };
  }, []);

  const chime = (force) => {
    if (!force && !soundOnRef.current) return;
    const ac = acRef.current;
    if (!ac || ac.state !== 'running') return;
    try {
      const t = ac.currentTime + 0.02;
      [[1318.5, 0, 0.22], [1975.5, 0.11, 0.18], [2637, 0.11, 0.05]].forEach(([f, d, vol]) => {
        const o = ac.createOscillator(); const g = ac.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + d);
        g.gain.exponentialRampToValueAtTime(vol, t + d + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d + 1.2);
        o.connect(g); g.connect(ac.destination);
        o.start(t + d); o.stop(t + d + 1.3);
      });
    } catch (e) { /* ignore */ }
  };

  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = document.getElementById('fu-stage-track');
        if (!el) return;
        const vh = window.innerHeight || 800;
        const r = el.getBoundingClientRect();
        const stage = Math.max(640, Math.min(vh, 900));
        const total = r.height - stage;
        let np = total > 0 ? cl(-r.top / total) : 1;
        np = Math.round(np * 250) / 250;
        if (prevP.current < 0.75 && np >= 0.75) chime(false);
        prevP.current = np;
        setP(np);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  const flip = (k) => () => setSw((s) => ({ ...s, [k]: !s[k] }));
  const green = (on) => (on ? '#34C759' : '#C9D3E0');
  const blue = (on) => (on ? '#0A6CFF' : '#C9D3E0');

  const v = {
    ...sceneVals(p, reduced),
    soundOn, soundOff: !soundOn,
    soundAria: soundOn ? 'true' : 'false',
    soundLabel: soundOn ? 'Turn unlock sound off' : 'Turn unlock sound on',
    soundText: soundOn ? 'Sound on' : 'Sound off',
    toggleSound: () => {
      if (soundOn) { setSoundOn(false); return; }
      try {
        if (!acRef.current) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; acRef.current = new AC(); }
        acRef.current.resume().then(() => { setSoundOn(true); soundOnRef.current = true; chime(true); }).catch(() => {});
      } catch (e) { /* ignore */ }
    },
    masterAria: sw.master ? 'true' : 'false', masterBg: green(sw.master), masterX42: sw.master ? 17 : 0,
    blinkAria: sw.blink ? 'true' : 'false', blinkBg: blue(sw.blink), blinkX36: sw.blink ? 15 : 0,
    animAria: sw.anim ? 'true' : 'false', animBg: blue(sw.anim), animX36: sw.anim ? 15 : 0,
    loginAria: sw.login ? 'true' : 'false', loginBg: blue(sw.login), loginX36: sw.login ? 15 : 0,
    statusText: sw.master ? 'On · unlocks when you return' : 'Off',
    openDownload: () => { let known = false; try { known = localStorage.getItem('fu_lead') === '1'; } catch (e) { /* ignore */ } if (known) startDownload(); else setDlOpen(true); },
    toggleMaster: flip('master'), toggleBlink: flip('blink'), toggleAnim: flip('anim'), toggleLogin: flip('login'),
    copyLabel: copied ? '✓ Copied' : 'Copy',
    copy: () => {
      const text = 'curl -LO https://www.yogeshbattula.online/downloads/FaceUnlock-source.zip\nunzip FaceUnlock-source.zip && cd FaceUnlock\n./make-dmg.sh';
      try { if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {}); } catch (e) { /* ignore */ }
      setCopied(true); setTimeout(() => setCopied(false), 1600);
    },
  };

  return (
    <>
      <style>{CSS}</style>
      <DownloadModal open={dlOpen} onClose={() => setDlOpen(false)} />
      <div style={{ margin: 0, background: '#FFFFFF' }}>
<div id="top" style={{ width: "100%", background: "#FFFFFF", color: "#0B1B33", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Inter, 'Helvetica Neue', sans-serif", WebkitFontSmoothing: "antialiased", overflowX: "clip" }}><header style={{ position: "sticky", top: "0", zIndex: "50", padding: "14px 24px 0", pointerEvents: "none" }}><div style={{ pointerEvents: "auto", maxWidth: "1112px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "10px 12px 10px 16px", borderRadius: "999px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 8px 30px rgba(30,90,170,0.12)" }}><a href="#top" style={{ display: "flex", alignItems: "center", gap: "10px", color: "#0B1B33", textDecoration: "none" }}><img src={A.appIcon} alt="" style={{ width: "32px", height: "32px" }} /><span style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "-0.01em" }}>Face Unlock</span></a><nav aria-label="Main" style={{ display: "flex", alignItems: "center", gap: "22px" }}><a className="fu-link" href="/" style={{ color: "#2B3D5A", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>← Portfolio</a><a className="fu-link" href="#features" style={{ color: "#2B3D5A", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Features</a><a className="fu-link" href="#install" style={{ color: "#2B3D5A", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Install</a><button type="button" className="fu-btn" onClick={v.openDownload} style={{ display: "inline-flex", alignItems: "center", minHeight: "40px", padding: "0 18px", borderRadius: "999px", border: 0, background: "#0B1B33", color: "#FFFFFF", fontFamily: "inherit", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>Download</button></nav></div></header><section id="fu-stage-track" aria-label="Face Unlock demo" style={{ position: "relative", height: `${v.trackH}px`, marginTop: "-68px", background: "#FFFFFF" }}><div style={{ position: "sticky", top: "0", height: "min(100svh, 900px)", minHeight: "640px", overflow: "clip" }}><div aria-hidden="true" className="fu-sky-hero" style={{ position: "absolute", inset: "0" }}></div><div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", top: "0", height: "45%", background: "linear-gradient(180deg, rgba(0,40,110,0.25), rgba(0,40,110,0))" }}></div><div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "30%", background: "linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF)" }}></div><div style={{ position: "relative", zIndex: "3", maxWidth: "900px", margin: "0 auto", padding: "104px 24px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", opacity: `${v.headOpacity}`, transform: `translateY(${v.headY}px)` }}><h1 style={{ margin: "0", fontSize: "clamp(46px, 7.5vw, 96px)", lineHeight: "0.98", fontWeight: "700", letterSpacing: "-0.045em", color: "#FFFFFF", textShadow: "0 2px 24px rgba(0,40,110,0.35)" }}>Unlock your Mac<br /><span style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif", fontStyle: "italic", fontWeight: "400", letterSpacing: "-0.02em", color: "#DDF0FF" }}>with a glance.</span></h1><p style={{ margin: "0", maxWidth: "560px", fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: "1.5", color: "#FFFFFF", textShadow: "0 1px 12px rgba(0,40,110,0.45)" }}>Face ID–style unlock for any MacBook. Look, blink, and you're in. It never leaves your Mac.</p><div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}><a className="fu-btn fu-shine" href="#install" style={{ display: "inline-flex", alignItems: "center", gap: "9px", minHeight: "50px", padding: "0 24px", borderRadius: "999px", background: "#FFFFFF", color: "#0A4FCC", textDecoration: "none", fontSize: "16px", fontWeight: "600", boxShadow: "0 12px 30px rgba(0,40,110,0.25)" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>Get FaceUnlock</a><a className="fu-btn" href="#features" style={{ display: "inline-flex", alignItems: "center", minHeight: "50px", padding: "0 22px", borderRadius: "999px", background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.6)", color: "#FFFFFF", textDecoration: "none", fontSize: "16px", fontWeight: "500", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>See features</a></div></div><div style={{ position: "absolute", left: "0", right: "0", bottom: "6%", zIndex: "2", display: "flex", justifyContent: "center", perspective: "2200px", perspectiveOrigin: "50% 10%" }}><div role="img" aria-label="A MacBook opening, scanning a face and unlocking" style={{ position: "relative", width: "min(760px, 82vw, 92svh)", aspectRatio: "16 / 10.4", transformStyle: "preserve-3d", transform: `translateY(${v.sceneY}px) scale(${v.sceneScale}) rotateX(${v.tilt}deg)` }}><div style={{ position: "absolute", left: "-3%", right: "-3%", top: "100%", aspectRatio: "16 / 10.6", transformOrigin: "50% 0", transform: "rotateX(90deg)", transformStyle: "preserve-3d", borderRadius: "4px 4px 22px 22px", background: "linear-gradient(180deg, #E4E7EC 0%, #CDD1D8 100%)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)" }}><div aria-hidden="true" style={{ position: "absolute", left: "-10%", right: "-10%", top: "-6%", bottom: "-14%", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(10,40,90,0.35), rgba(10,40,90,0))", transform: "translateZ(-6px)", filter: "blur(16px)" }}></div><div style={{ position: "absolute", left: "7%", right: "7%", top: "7%", height: "47%", borderRadius: "10px", backgroundColor: "#1E2025", backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 6.4%, transparent 6.4% 7.1%), repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0 15%, transparent 15% 16.6%)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }}></div><div style={{ position: "absolute", left: "32%", right: "32%", top: "59%", height: "32%", borderRadius: "12px", background: "linear-gradient(180deg, #D3D7DD, #C6CAD1)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}></div><div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "16px", transformOrigin: "50% 100%", transform: "rotateX(-90deg)", borderRadius: "0 0 14px 14px", background: "linear-gradient(180deg, #B8BCC4, #8F949C)" }}></div></div><div style={{ position: "absolute", inset: "0", transformOrigin: "50% 100%", transform: `rotateX(${v.lidAngle}deg)`, transformStyle: "preserve-3d" }}><div aria-hidden="true" style={{ position: "absolute", inset: "0", transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", borderRadius: "20px 20px 6px 6px", background: "linear-gradient(160deg, #F2F4F7 0%, #D3D7DD 55%, #B9BEC6 100%)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}></div><div style={{ position: "absolute", inset: "0", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", boxSizing: "border-box", padding: "2.3% 2.3% 3.4%", borderRadius: "20px 20px 6px 6px", background: "#0B0B0C", boxShadow: "inset 0 0 0 2px #26262A" }}><div style={{ position: "absolute", top: "0", left: "50%", width: "15%", height: "3.6%", marginLeft: "-7.5%", borderRadius: "0 0 9px 9px", background: "#0B0B0C", zIndex: "4", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}><span style={{ width: "5px", height: "5px", borderRadius: "999px", background: "#1C2A3A" }}></span><span style={{ width: "4px", height: "4px", borderRadius: "999px", background: `${v.camColor}`, boxShadow: `0 0 6px ${v.camColor}` }}></span></div><div className="fu-sky-hero" style={{ position: "relative", width: "100%", height: "100%", borderRadius: "8px 8px 2px 2px", overflow: "hidden" }}><div style={{ position: "absolute", inset: "0", opacity: `${v.lockOpacity}`, transform: `scale(${v.lockScale})`, filter: `blur(${v.lockBlur}px)` }}><div style={{ position: "absolute", top: "9%", left: "0", right: "0", display: "flex", flexDirection: "column", alignItems: "center", color: "#FFFFFF", textShadow: "0 2px 14px rgba(0,40,110,0.35)" }}><span style={{ fontSize: "clamp(8px, 1.4vw, 15px)", fontWeight: "600" }}>Thursday 12 November</span><span style={{ fontSize: "clamp(36px, 8.6vw, 92px)", lineHeight: "1", fontWeight: "700", letterSpacing: "-0.03em" }}>9:41</span></div><div style={{ position: "absolute", left: "0", right: "0", bottom: "9%", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(4px, 0.9vw, 10px)" }}><div style={{ position: "relative", width: "clamp(56px, 10vw, 104px)", aspectRatio: "1" }}><div style={{ position: "absolute", inset: "12%", borderRadius: "999px", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.45)" }}></div><svg viewBox="0 0 100 100" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}><circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="6" strokeDasharray="1.1 3.72" /></svg><div style={{ position: "absolute", inset: "0", WebkitMask: `conic-gradient(#000 ${v.ringDeg}deg, transparent 0)`, mask: `conic-gradient(#000 ${v.ringDeg}deg, transparent 0)` }}><svg viewBox="0 0 100 100" aria-hidden="true" style={{ width: "100%", height: "100%" }}><circle cx="50" cy="50" r="46" fill="none" stroke="#34C759" strokeWidth="7" strokeDasharray="1.1 3.72" /></svg></div>{v.notUnlocked && (<><svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: "absolute", inset: "30%", width: "40%", height: "40%" }}><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /><path d="M9 9v1.5M15 9v1.5M12 9v4h-1M9 16c1.6 1.3 4.4 1.3 6 0" /></svg></>)}{v.isUnlocked && (<><svg viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: "absolute", inset: "29%", width: "42%", height: "42%" }}><rect x="5" y="11" width="14" height="10" rx="2.5" fill="#34C759" stroke="none" /><path d="M8 11V7a4 4 0 0 1 7.6-1.8" /></svg></>)}</div><span style={{ fontSize: "clamp(8px, 1.3vw, 14px)", fontWeight: "600", color: "#FFFFFF", textShadow: "0 1px 8px rgba(0,40,110,0.5)" }}>Yogesh</span><span style={{ fontSize: "clamp(7px, 1.05vw, 12px)", color: "rgba(255,255,255,0.92)", textShadow: "0 1px 8px rgba(0,40,110,0.5)" }}>{v.prompt}</span></div></div><div style={{ position: "absolute", inset: "0", opacity: `${v.deskOpacity}` }}><div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "4.6%", minHeight: "12px", padding: "0 2%", display: "flex", alignItems: "center", gap: "2%", background: "rgba(255,255,255,0.35)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", fontSize: "clamp(6px, 0.95vw, 11px)", fontWeight: "600", color: "#0B1B33" }}><span>Finder</span><span style={{ fontWeight: "400" }}>File</span><span style={{ fontWeight: "400" }}>Edit</span><span style={{ fontWeight: "400" }}>View</span><span style={{ flex: "1" }}></span><span style={{ display: "inline-flex", padding: "1px 4px", borderRadius: "4px", background: "rgba(10,108,255,0.18)" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0B1B33" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /><path d="M9 9v1.5M15 9v1.5M12 9v4h-1M9 16c1.6 1.3 4.4 1.3 6 0" /></svg></span><span style={{ fontWeight: "500" }}>Thu 9:41</span></div><div style={{ position: "absolute", top: "7%", right: "2.5%", width: "34%", boxSizing: "border-box", padding: "2.2%", borderRadius: "10px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px) saturate(170%)", WebkitBackdropFilter: "blur(20px) saturate(170%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 12px 30px rgba(20,70,140,0.25)", transform: `translateY(${v.popY}px)`, display: "flex", flexDirection: "column", gap: "6%" }}><div style={{ display: "flex", alignItems: "center", gap: "6%" }}><img src={A.appIcon} alt="" style={{ width: "18%", height: "auto" }} /><div style={{ flex: "1", display: "flex", flexDirection: "column" }}><span style={{ fontSize: "clamp(6px, 1vw, 11px)", fontWeight: "700", color: "#0B1B33" }}>Face Unlock</span><span style={{ fontSize: "clamp(5px, 0.75vw, 8.5px)", color: "#3A4D6B" }}>Unlocked just now</span></div><span style={{ width: "20%", aspectRatio: "1.7", borderRadius: "999px", background: "#34C759", display: "flex", justifyContent: "flex-end", padding: "1.5%", boxSizing: "border-box" }}><span style={{ height: "100%", aspectRatio: "1", borderRadius: "999px", background: "#FFFFFF" }}></span></span></div></div><div style={{ position: "absolute", bottom: "2.5%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", padding: "1% 1.4%", borderRadius: "14px", background: "rgba(255,255,255,0.35)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)" }}><span style={{ width: "clamp(12px, 3.2vw, 34px)", aspectRatio: "1", borderRadius: "22%", background: "linear-gradient(180deg, #6FD0FF, #1E8CF0)" }}></span><span style={{ width: "clamp(12px, 3.2vw, 34px)", aspectRatio: "1", borderRadius: "22%", background: "linear-gradient(180deg, #FFFFFF, #E3E8EF)" }}></span><span style={{ width: "clamp(12px, 3.2vw, 34px)", aspectRatio: "1", borderRadius: "22%", background: "linear-gradient(180deg, #7CE38B, #26B24A)" }}></span><span style={{ width: "clamp(12px, 3.2vw, 34px)", aspectRatio: "1", borderRadius: "22%", background: "linear-gradient(180deg, #FFB86B, #FF7A30)" }}></span><img src={A.appIcon} alt="" style={{ width: "clamp(12px, 3.2vw, 34px)", height: "auto" }} /></div></div><div style={{ position: "absolute", left: "50%", top: "50%", width: "22%", aspectRatio: "1", margin: "-11% 0 0 -11%", borderRadius: "22%", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6%", opacity: `${v.hudOpacity}`, transform: `scale(${v.hudScale})`, boxShadow: "0 20px 40px rgba(20,70,140,0.25)" }}><svg viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: "40%", height: "40%" }}><rect x="5" y="11" width="14" height="10" rx="2.5" fill="#34C759" stroke="none" /><path d="M8 11V7a4 4 0 0 1 7.6-1.8" /></svg><span style={{ fontSize: "clamp(7px, 1.2vw, 13px)", fontWeight: "700", color: "#0B1B33" }}>Unlocked</span></div><div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "#000000", opacity: `${v.screenDark}` }}></div><div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 32%)" }}></div></div></div></div></div></div><div style={{ position: "absolute", left: "0", right: "0", bottom: "18px", zIndex: "4", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", opacity: `${v.hintOpacity}`, fontSize: "12px", fontWeight: "600", color: "#1E3A66" }}><span>Scroll to unlock</span><svg className="fu-bounce" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></div><button type="button" className="fu-btn" onClick={v.toggleSound} aria-pressed={v.soundAria} aria-label={v.soundLabel} style={{ position: "absolute", right: "24px", bottom: "20px", zIndex: "5", display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "44px", padding: "0 16px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", color: "#0B1B33", fontFamily: "inherit", fontSize: "13px", fontWeight: "600", cursor: "pointer", boxShadow: "0 8px 24px rgba(30,90,170,0.15)" }}>{v.soundOn && (<><span className="fu-eq" aria-hidden="true" style={{ display: "inline-flex", alignItems: "flex-end", gap: "2px", height: "14px" }}><span style={{ width: "3px", height: "14px", borderRadius: "2px", background: "#0A6CFF" }}></span><span style={{ width: "3px", height: "14px", borderRadius: "2px", background: "#0A6CFF" }}></span><span style={{ width: "3px", height: "14px", borderRadius: "2px", background: "#0A6CFF" }}></span></span></>)}{v.soundOff && (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4z" /><path d="M22 9l-6 6M16 9l6 6" /></svg></>)}{v.soundText}</button></div></section><section style={{ background: "#FFFFFF" }}><div style={{ maxWidth: "1160px", margin: "0 auto", padding: "8px 24px 48px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "999px", background: "#F2F8FF", color: "#1E3A66", fontSize: "14px", fontWeight: "500" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>On-device Apple Vision</span><span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "999px", background: "#F2F8FF", color: "#1E3A66", fontSize: "14px", fontWeight: "500" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>Native Swift + SwiftUI</span><span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "999px", background: "#F2F8FF", color: "#1E3A66", fontSize: "14px", fontWeight: "500" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>Password stays in Keychain</span><span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "999px", background: "#F2F8FF", color: "#1E3A66", fontSize: "14px", fontWeight: "500" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A6CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9.5a3.5 3.5 0 0 1-.5 8.5z" /><path d="M4 4l16 16" /></svg>No cloud, no tracking</span></div></section><section id="features" style={{ background: "#FFFFFF" }}><div style={{ maxWidth: "1160px", margin: "0 auto", padding: "72px 24px 48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}><span style={{ fontSize: "14px", fontWeight: "600", color: "#0A6CFF" }}>How it works</span><h2 style={{ margin: "0", fontSize: "clamp(38px, 5vw, 60px)", lineHeight: "1.04", letterSpacing: "-0.035em", fontWeight: "700" }}>Three moments.{" "}<span style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif", fontStyle: "italic", fontWeight: "400", color: "#0A6CFF" }}>Zero typing.</span></h2></div><div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px 96px", display: "flex", flexWrap: "wrap", gap: "20px" }}><div className="fu-card" style={{ flex: "1 1 300px", minWidth: "0", padding: "28px", borderRadius: "28px", background: "linear-gradient(180deg, #EEF7FF, #FFFFFF)", border: "1px solid #E1EEFB", boxShadow: "0 20px 40px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ height: "180px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", textAlign: "center", padding: "12px" }}><img src={A.iconFace} alt="" style={{ height: "180px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><span style={{ fontSize: "13px", fontWeight: "600", color: "#0A6CFF" }}>01</span><h3 style={{ margin: "0", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.015em" }}>Scan once, like iPhone</h3><p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.55", color: "#4A5B75" }}>Move your head in a slow circle until the ring fills. Face Unlock learns your face in seconds.</p></div><div className="fu-card" style={{ flex: "1 1 300px", minWidth: "0", padding: "28px", borderRadius: "28px", background: "linear-gradient(180deg, #EEF7FF, #FFFFFF)", border: "1px solid #E1EEFB", boxShadow: "0 20px 40px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ height: "180px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", textAlign: "center", padding: "12px" }}><img src={A.iconLaptop} alt="" style={{ height: "180px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><span style={{ fontSize: "13px", fontWeight: "600", color: "#0A6CFF" }}>02</span><h3 style={{ margin: "0", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.015em" }}>Close the lid, walk away</h3><p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.55", color: "#4A5B75" }}>Your Mac locks as usual. The camera rests while you're gone to save battery.</p></div><div className="fu-card" style={{ flex: "1 1 300px", minWidth: "0", padding: "28px", borderRadius: "28px", background: "linear-gradient(180deg, #EEF7FF, #FFFFFF)", border: "1px solid #E1EEFB", boxShadow: "0 20px 40px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ height: "180px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", textAlign: "center", padding: "12px" }}><img src={A.iconLock} alt="" style={{ height: "180px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><span style={{ fontSize: "13px", fontWeight: "600", color: "#0A6CFF" }}>03</span><h3 style={{ margin: "0", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.015em" }}>Look and blink</h3><p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.55", color: "#4A5B75" }}>Open the lid, glance at your screen and blink. Unlocked, with a little animation.</p></div></div></section><section style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F2F8FF 100%)" }}><div style={{ maxWidth: "1160px", margin: "0 auto", padding: "48px 24px 120px" }}><div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginBottom: "52px" }}><span style={{ fontSize: "14px", fontWeight: "600", color: "#0A6CFF" }}>Features</span><h2 style={{ margin: "0", fontSize: "clamp(38px, 5vw, 60px)", lineHeight: "1.04", letterSpacing: "-0.035em", fontWeight: "700" }}>Small app.{" "}<span style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif", fontStyle: "italic", fontWeight: "400", color: "#0A6CFF" }}>Big details.</span></h2></div><div className="fu-bento" style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: "18px" }}><div className="fu-card" style={{ gridColumn: "span 4", minHeight: "440px", padding: "36px", borderRadius: "32px", background: "linear-gradient(160deg, #CFE8FF 0%, #EAF5FF 55%, #FFFFFF 100%)", border: "1px solid #DCEBFA", boxShadow: "0 24px 50px rgba(30,90,170,0.1)", display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "center" }}><div style={{ flex: "1 1 240px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}><span style={{ fontSize: "14px", fontWeight: "600", color: "#0A6CFF" }}>Face scan</span><h3 style={{ margin: "0", fontSize: "30px", lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }}>Complete the circle.</h3><p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#4A5B75" }}>An iPhone-style ring fills as you move your head, with gentle prompts like “Tilt your head up.”</p></div><ScanWindowMock /></div><div className="fu-card" style={{ gridColumn: "span 2", minHeight: "440px", padding: "30px", borderRadius: "32px", background: "#FFFFFF", border: "1px solid #E1EEFB", boxShadow: "0 24px 50px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ flex: "1", minHeight: "200px", borderRadius: "22px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", textAlign: "center", padding: "12px" }}><img src={A.iconBlink} alt="" style={{ height: "200px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><h3 style={{ margin: "6px 0 0", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.015em" }}>Blink to confirm.</h3><p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#4A5B75" }}>A printed photo can't blink, so it can't open your Mac.</p></div><div className="fu-card" style={{ gridColumn: "span 3", minHeight: "420px", padding: "32px", borderRadius: "32px", background: "linear-gradient(180deg, #8CCBFF 0%, #CBE7FF 60%, #EEF7FF 100%)", border: "1px solid #D3E8FB", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", gap: "22px" }}><div aria-hidden="true" style={{ position: "absolute", left: "-60px", bottom: "30px", width: "340px", height: "110px", borderRadius: "999px", background: "#FFFFFF", filter: "blur(26px)", opacity: "0.9" }}></div><div aria-hidden="true" style={{ position: "absolute", right: "-80px", bottom: "-20px", width: "380px", height: "120px", borderRadius: "999px", background: "#FFFFFF", filter: "blur(26px)", opacity: "0.95" }}></div><div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "8px" }}><span style={{ fontSize: "14px", fontWeight: "600", color: "#0B4DB3" }}>Menu bar</span><h3 style={{ margin: "0", fontSize: "22px", lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }}>One switch. Three toggles. Try them.</h3></div><div style={{ position: "relative", alignSelf: "center", width: "100%", maxWidth: "310px", boxSizing: "border-box", padding: "16px", borderRadius: "20px", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(28px) saturate(170%)", WebkitBackdropFilter: "blur(28px) saturate(170%)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 24px 50px rgba(20,70,140,0.18)", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><span style={{ width: "40px", height: "40px", borderRadius: "999px", background: "linear-gradient(180deg, #409CFF, #0A54D6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", flex: "none" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /><path d="M9 9v1.5M15 9v1.5M12 9v4h-1M9 16c1.6 1.3 4.4 1.3 6 0" /></svg></span><div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "14px", fontWeight: "600", color: "#0B1B33" }}>Face Unlock</span><span style={{ fontSize: "11.5px", color: "#3A4D6B" }}>{v.statusText}</span></div><button type="button" className="fu-switch" role="switch" aria-checked={v.masterAria} aria-label="Face Unlock" onClick={v.toggleMaster} style={{ width: "42px", height: "25px", padding: "2px", border: "0", borderRadius: "999px", background: `${v.masterBg}`, display: "flex", justifyContent: "flex-start", cursor: "pointer", flex: "none" }}><span className="fu-knob" style={{ width: "21px", height: "21px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transform: `translateX(${v.masterX42}px)` }}></span></button></div><div style={{ padding: "2px 12px", borderRadius: "14px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(11,27,51,0.06)", display: "flex", flexDirection: "column" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid rgba(11,27,51,0.07)" }}><span style={{ flex: "1", fontSize: "13.5px", color: "#0B1B33" }}>Blink to confirm</span><button type="button" className="fu-switch" role="switch" aria-checked={v.blinkAria} aria-label="Blink to confirm" onClick={v.toggleBlink} style={{ width: "36px", height: "21px", padding: "2px", border: "0", borderRadius: "999px", background: `${v.blinkBg}`, display: "flex", justifyContent: "flex-start", cursor: "pointer", flex: "none" }}><span className="fu-knob" style={{ width: "17px", height: "17px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transform: `translateX(${v.blinkX36}px)` }}></span></button></div><div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid rgba(11,27,51,0.07)" }}><span style={{ flex: "1", fontSize: "13.5px", color: "#0B1B33" }}>Unlock animation</span><button type="button" className="fu-switch" role="switch" aria-checked={v.animAria} aria-label="Unlock animation" onClick={v.toggleAnim} style={{ width: "36px", height: "21px", padding: "2px", border: "0", borderRadius: "999px", background: `${v.animBg}`, display: "flex", justifyContent: "flex-start", cursor: "pointer", flex: "none" }}><span className="fu-knob" style={{ width: "17px", height: "17px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transform: `translateX(${v.animX36}px)` }}></span></button></div><div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0" }}><span style={{ flex: "1", fontSize: "13.5px", color: "#0B1B33" }}>Open at login</span><button type="button" className="fu-switch" role="switch" aria-checked={v.loginAria} aria-label="Open at login" onClick={v.toggleLogin} style={{ width: "36px", height: "21px", padding: "2px", border: "0", borderRadius: "999px", background: `${v.loginBg}`, display: "flex", justifyContent: "flex-start", cursor: "pointer", flex: "none" }}><span className="fu-knob" style={{ width: "17px", height: "17px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transform: `translateX(${v.loginX36}px)` }}></span></button></div></div></div></div><div className="fu-card" style={{ gridColumn: "span 3", minHeight: "420px", padding: "32px", borderRadius: "32px", background: "#FFFFFF", border: "1px solid #E1EEFB", boxShadow: "0 24px 50px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "10px" }}><HudMock /><span style={{ fontSize: "14px", fontWeight: "600", color: "#0A6CFF", marginTop: "6px" }}>Feedback</span><h3 style={{ margin: "0", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.015em" }}>A lock that springs open.</h3><p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#4A5B75" }}>So you always know it was your face that let you in.</p></div><div className="fu-card" style={{ gridColumn: "span 2", minHeight: "300px", padding: "30px", borderRadius: "32px", background: "#FFFFFF", border: "1px solid #E1EEFB", boxShadow: "0 24px 50px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ height: "130px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", textAlign: "center" }}><img src={A.iconShield} alt="" style={{ height: "130px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><h3 style={{ margin: "6px 0 0", fontSize: "20px", fontWeight: "700" }}>Private by design.</h3><p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#4A5B75" }}>Runs on Apple's Vision framework. No video saved, nothing uploaded.</p></div><div className="fu-card" style={{ gridColumn: "span 2", minHeight: "300px", padding: "30px", borderRadius: "32px", background: "#FFFFFF", border: "1px solid #E1EEFB", boxShadow: "0 24px 50px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ height: "130px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", textAlign: "center" }}><img src={A.iconOne} alt="" style={{ height: "130px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><h3 style={{ margin: "6px 0 0", fontSize: "20px", fontWeight: "700" }}>One face only.</h3><p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#4A5B75" }}>Someone over your shoulder? It stays locked.</p></div><div className="fu-card" style={{ gridColumn: "span 2", minHeight: "300px", padding: "30px", borderRadius: "32px", background: "#FFFFFF", border: "1px solid #E1EEFB", boxShadow: "0 24px 50px rgba(30,90,170,0.08)", display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ height: "130px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", textAlign: "center" }}><img src={A.iconFail} alt="" style={{ height: "130px", width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} /></div><h3 style={{ margin: "6px 0 0", fontSize: "20px", fontWeight: "700" }}>Fails safe.</h3><p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#4A5B75" }}>Pauses after two misses, so macOS never locks you out.</p></div></div></div></section><section id="install" style={{ background: "#FFFFFF" }}><div style={{ maxWidth: "1160px", margin: "0 auto", padding: "120px 24px", display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "center" }}><div style={{ flex: "1 1 380px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}><span style={{ fontSize: "14px", fontWeight: "600", color: "#0A6CFF" }}>Install & try</span><h2 style={{ margin: "0", fontSize: "clamp(38px, 5vw, 56px)", lineHeight: "1.04", letterSpacing: "-0.035em", fontWeight: "700" }}>Up and running{" "}<span style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif", fontStyle: "italic", fontWeight: "400", color: "#0A6CFF" }}>in a minute.</span></h2><p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#4A5B75" }}>Download the DMG, drag Face Unlock into Applications, then follow the three setup steps in your menu bar.</p><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "500" }}><span style={{ width: "28px", height: "28px", borderRadius: "999px", background: "#E6F1FF", color: "#0A6CFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>1</span>Scan your face</div><div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "500" }}><span style={{ width: "28px", height: "28px", borderRadius: "999px", background: "#E6F1FF", color: "#0A6CFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>2</span>Save your Mac password</div><div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", fontWeight: "500" }}><span style={{ width: "28px", height: "28px", borderRadius: "999px", background: "#E6F1FF", color: "#0A6CFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>3</span>Allow Accessibility</div></div><button type="button" className="fu-btn fu-shine" onClick={v.openDownload} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "9px", minHeight: "50px", padding: "0 24px", borderRadius: "999px", background: "#0A6CFF", color: "#FFFFFF", border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: "16px", fontWeight: "600", boxShadow: "0 12px 30px rgba(10,108,255,0.3)" }}>Download FaceUnlock.dmg</button></div><div style={{ flex: "1 1 500px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ borderRadius: "18px", overflow: "hidden", background: "#0F1A2E", boxShadow: "0 40px 80px rgba(20,60,120,0.2)" }}><div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", background: "#18253D" }}><span style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#FF5F57" }}></span><span style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#FEBC2E" }}></span><span style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#28C840" }}></span><span style={{ flex: "1", textAlign: "center", fontSize: "12px", color: "#9DB0CC" }}>Or build from source</span><button type="button" className="fu-btn" onClick={v.copy} aria-label="Copy install commands" style={{ minHeight: "30px", padding: "0 12px", borderRadius: "7px", border: "0", background: "rgba(255,255,255,0.12)", color: "#FFFFFF", fontFamily: "inherit", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>{v.copyLabel}</button></div><div style={{ padding: "22px 22px 26px", fontFamily: "'SF Mono', 'JetBrains Mono', ui-monospace, Menlo, monospace", fontSize: "14px", lineHeight: "2.1", color: "#EAF2FF", overflowX: "auto", whiteSpace: "nowrap" }}><div><span style={{ color: "#7FB8FF" }}>$</span>{" "}curl -LO https://www.yogeshbattula.online/downloads/FaceUnlock-source.zip</div><div><span style={{ color: "#7FB8FF" }}>$</span>{" "}unzip FaceUnlock-source.zip && cd FaceUnlock</div><div><span style={{ color: "#7FB8FF" }}>$</span>{" "}./make-dmg.sh</div><div style={{ color: "#5BE38A" }}>✓ Built FaceUnlock-0.1.0.dmg</div></div></div><div style={{ padding: "16px 20px", borderRadius: "16px", background: "#F2F8FF", border: "1px solid #DCEBFA", fontSize: "13.5px", lineHeight: "1.55", color: "#2B3D5A" }}><strong>Playground, not Face ID.</strong>{" "}MacBook cameras have no depth sensor, so a video of you could fool it. Use it on your personal Mac. The app is not notarized, so the first time: right-click FaceUnlock, choose Open, then Open again. Building from source needs Xcode Command Line Tools.</div></div></div></section><section className="fu-sky-closing" style={{ position: "relative", overflow: "hidden" }}><div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", top: "0", height: "200px", background: "linear-gradient(180deg, #FFFFFF, rgba(255,255,255,0))" }}></div><div style={{ position: "relative", maxWidth: "780px", margin: "0 auto", padding: "120px 24px 160px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}><img src={A.appIcon} alt="Face Unlock app icon" style={{ width: "112px", height: "112px", filter: "drop-shadow(0 18px 30px rgba(10,84,214,0.35))" }} /><h2 style={{ margin: "0", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "700" }}>Your Mac,{" "}<span style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif", fontStyle: "italic", fontWeight: "400", color: "#0A6CFF" }}>at a glance.</span></h2><a className="fu-btn fu-shine" href="#install" style={{ display: "inline-flex", alignItems: "center", gap: "9px", minHeight: "52px", padding: "0 26px", borderRadius: "999px", background: "#0B1B33", color: "#FFFFFF", textDecoration: "none", fontSize: "16px", fontWeight: "600" }}>Get FaceUnlock</a></div><footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.6)" }}><div style={{ maxWidth: "1160px", margin: "0 auto", padding: "24px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "#0B1B33" }}><span>Designed and built by{" "}<a className="fu-link" href="/" style={{ color: "#0B1B33", textDecoration: "none" }}>Yogesh Battula</a>{" "}· A playground project · Hero sky photo: Kumiko Shimizu on Unsplash</span><div style={{ display: "flex", gap: "22px" }}><a className="fu-link" href="#features" style={{ color: "#0B1B33", textDecoration: "none" }}>Features</a><a className="fu-link" href="#install" style={{ color: "#0B1B33", textDecoration: "none" }}>Install</a><a className="fu-link" href="#top" style={{ color: "#0B1B33", textDecoration: "none" }}>Back to top</a></div></div></footer></section></div>
      </div>
    </>
  );
}
