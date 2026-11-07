import Frame from './Frame';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Perforated stamp outline: semicircle notches along every edge.
function stampPath(w, h, r = 5.5, pitch = 17) {
  const edge = (len) => {
    const n = Math.max(1, Math.round((len - 20) / pitch));
    const step = (len - 20) / n;
    return Array.from({ length: n + 1 }, (_, i) => 10 + i * step);
  };
  let d = 'M0 0';
  for (const x of edge(w)) d += ` L${x - r} 0 A${r} ${r} 0 0 0 ${x + r} 0`;
  d += ` L${w} 0`;
  for (const y of edge(h)) d += ` L${w} ${y - r} A${r} ${r} 0 0 0 ${w} ${y + r}`;
  d += ` L${w} ${h}`;
  for (const x of edge(w).reverse()) d += ` L${x + r} ${h} A${r} ${r} 0 0 0 ${x - r} ${h}`;
  d += ` L0 ${h}`;
  for (const y of edge(h).reverse()) d += ` L0 ${y + r} A${r} ${r} 0 0 0 0 ${y - r}`;
  return `path('${d} Z')`;
}

// "Returned to sender": a 404 page in the site's postage-stamp style.
export default function NotFound({ onHome, onWorks }) {
  const reduced = useReducedMotion();
  const stampRef = useRef(null);
  const [clip, setClip] = useState(undefined);

  useLayoutEffect(() => {
    const el = stampRef.current;
    if (!el) return;
    const update = () => setClip(stampPath(el.offsetWidth, el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Nothing hangs here · Yogesh Battula';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => {
      document.title = prevTitle;
      robots.remove();
    };
  }, []);

  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <main style={{ background: 'radial-gradient(ellipse at 50% 0%, #2a6cf0 0%, #1450d6 45%, #0f3fae 100%)' }} className="min-h-screen flex items-center justify-center px-4 py-16 font-basier">
      <div className="w-full max-w-[520px] text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -50, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 11, mass: 0.9 }}
          style={{ transformOrigin: '50% 0%' }}
          className="relative mx-auto w-[240px] sm:w-[280px] aspect-[4/5]"
        >
          <Frame variant="portrait">
            <div className="h-full w-full flex flex-col items-center justify-center text-[#e8c773]" style={{ background: 'radial-gradient(circle at 30% 25%, #1c4784 0%, #12315a 70%, #0d2444 100%)' }}>
              <span className="text-small uppercase tracking-[0.25em] opacity-80">Empty frame</span>
              <span className="text-[88px] sm:text-[104px] leading-none" style={{ fontFamily: "'The Seasons', Georgia, serif" }}>404</span>
            </div>
          </Frame>
        </motion.div>

        <h1
          className="mt-8 text-h2 sm:text-h1 text-[#f3f7ff] leading-tight"
          style={{ fontFamily: "'The Seasons', Georgia, serif" }}
        >
          Nothing hangs here
        </h1>
        <p className="mt-3 text-body text-[#c8d7f2] leading-relaxed">
          Nothing lives at <span className="font-medium text-[#e8c773] break-all">{path}</span>. The page may have moved, or the link has a typo.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onWorks(); }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#111827] hover:bg-[#ff6a1f] text-white text-small font-medium transition-colors"
          >
            See my work
          </a>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onHome(); }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-small font-medium text-[#cfe0ff] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
