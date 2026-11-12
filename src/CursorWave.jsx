import { useEffect, useRef } from 'react';

// Dot-grid ripple that follows the cursor, shown only over empty page "space"
// (not over cards, text, images or buttons). Desktop pointer only.
const SKIP = 'a,button,img,svg,video,canvas,input,textarea,h1,h2,h3,h4,p,li,figure,article,nav,[class*="rounded"],[data-nowave]';
const GAP = 24, R = 230;

export default function CursorWave() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current, ctx = cv.getContext('2d');
    let w = 0, h = 0, raf = 0, on = false;
    const m = { x: -999, y: -999, tx: -999, ty: -999, k: 0 };
    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const frame = (t) => {
      m.x += (m.tx - m.x) * 0.2; m.y += (m.ty - m.y) * 0.2;
      m.k += ((on ? 1 : 0) - m.k) * 0.12;
      ctx.clearRect(0, 0, w, h);
      if (m.k > 0.01) {
        const x0 = Math.max(0, Math.floor((m.x - R) / GAP)), x1 = Math.ceil((m.x + R) / GAP);
        const y0 = Math.max(0, Math.floor((m.y - R) / GAP)), y1 = Math.ceil((m.y + R) / GAP);
        for (let i = x0; i <= x1; i++) for (let j = y0; j <= y1; j++) {
          const gx = i * GAP + GAP / 2, gy = j * GAP + GAP / 2;
          const dx = gx - m.x, dy = gy - m.y, d = Math.hypot(dx, dy);
          if (d > R) continue;
          const fall = Math.pow(1 - d / R, 1.6) * m.k;
          const wave = Math.sin(d * 0.045 - t * 0.005);
          const push = wave * 7 * fall, ux = d ? dx / d : 0, uy = d ? dy / d : 0;
          ctx.fillStyle = `rgba(42,38,34,${(0.12 + 0.4 * fall * (0.6 + 0.4 * wave)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(gx + ux * push, gy + uy * push, 1 + 1.8 * fall * (0.5 + 0.5 * wave), 0, 6.283);
          ctx.fill();
        }
        raf = requestAnimationFrame(frame);
      } else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const move = (e) => {
      m.tx = e.clientX; m.ty = e.clientY;
      const el = e.target;
      on = !(el && el.closest && el.closest(SKIP));
      if (m.k < 0.01) { m.x = m.tx; m.y = m.ty; }
      kick();
    };
    const leave = () => { on = false; kick(); };
    size();
    addEventListener('resize', size);
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { removeEventListener('resize', size); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 5 }} />;
}
