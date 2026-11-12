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
    document.title = 'Returned to sender · Yogesh Battula';
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
    <main className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-4 py-16 font-basier">
      <div className="w-full max-w-[520px] text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[260px] sm:w-[300px] drop-shadow-[0_24px_30px_rgba(120,80,20,0.32)]"
        >
          <div ref={stampRef} className="aspect-[4/5] bg-[#f7e8cf] p-4" style={{ clipPath: clip }}>
          <div className="h-full w-full rounded-[3px] bg-gradient-to-br from-[#ffb36b] via-[#ff8a3d] to-[#f25c2a] flex flex-col items-center justify-center text-white">
            <span className="text-small uppercase tracking-[0.25em] opacity-80">Error</span>
            <span className="text-[96px] sm:text-[112px] leading-none" style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" }}>
              404
            </span>
            <span className="text-caption uppercase tracking-[0.2em] opacity-80 mt-1">Postage due</span>
          </div>
          </div>
        </motion.div>

        {/* Postmark stamped over the corner */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="relative -mt-[120px] ml-[52%] w-[150px] sm:w-[170px] text-[#b4321f]"
          initial={reduced ? false : { opacity: 0, scale: 1.6, rotate: 20 }}
          animate={{ opacity: 0.85, scale: 1, rotate: 12 }}
          transition={{ duration: 0.35, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <defs>
            <path id="postmark-arc" d="M 100 100 m -70 0 a 70 70 0 1 1 140 0 a 70 70 0 1 1 -140 0" />
          </defs>
          <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="3" />
          <text fontSize="17" fontWeight="700" letterSpacing="4" fill="currentColor">
            <textPath href="#postmark-arc">RETURN TO SENDER · ADDRESS UNKNOWN ·</textPath>
          </text>
          <text x="100" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor">HYD</text>
          <text x="100" y="116" textAnchor="middle" fontSize="12" fill="currentColor">INDIA</text>
        </motion.svg>

        <h1
          className="mt-4 text-h2 sm:text-h1 text-[#141210] leading-tight text-[52px] sm:text-[72px]"
          style={{ fontFamily: "'STK Bureau Serif', 'Newsreader Variable', Georgia, serif" }}
        >
          Returned to sender
        </h1>
        <p className="mt-3 text-body text-[#4b5563] leading-relaxed">
          Nothing lives at <span className="font-medium text-[#111827] break-all">{path}</span>. The page may have moved, or the link has a typo.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onWorks(); }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2a2622] hover:bg-black text-[#f4f1ea] text-small font-medium transition-colors"
          >
            See my work
          </a>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onHome(); }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-small font-medium text-[#374151] hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
