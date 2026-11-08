import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// Pills fall from above the hero, bounce off the headline's words and pile up on the hero's bottom edge.
// Drag them to throw them around. `heroRef` = hero section, `textRef` = headline element.
const { Engine, Bodies, Body, Composite, Constraint, Sleeping } = Matter;

export const PILLS = [
  { t: 'research', bg: ['#e2eeff', '#c4dcff'], fg: '#3a7be8' },
  { t: 'prototyping', bg: ['#d3f7e1', '#aeeccb'], fg: '#12906a' },
  { t: 'systems', bg: ['#f3ffb3', '#e2f56a'], fg: '#5d8a06' },
  { t: 'strategy', bg: ['#fff0b8', '#ffd983'], fg: '#e0701a' },
  { t: 'ai', bg: ['#f1e4ff', '#dcc0ff'], fg: '#9150e0' },
  { t: 'shipping', bg: ['#ffe0ee', '#ffc0da'], fg: '#e0457f', hideM: 1 },
  { t: 'testing', bg: ['#dff5ff', '#b3e6ff'], fg: '#1f93c9', hideM: 1 },
  { t: 'workshops', bg: ['#ffe3d6', '#ffc3a6'], fg: '#d9572b', hideM: 1 },
];

function wordRects(root, hero) {
  const h = hero.getBoundingClientRect();
  const out = [];
  const rel = (r) => ({ x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height });
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const re = /\S+/g; let m;
    while ((m = re.exec(n.nodeValue))) {
      const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
      for (const c of r.getClientRects()) if (c.width > 4) out.push(rel(c));
    }
  }
  root.querySelectorAll('img').forEach((el) => { const c = el.getBoundingClientRect(); if (c.width > 4) out.push(rel(c)); });
  // shrink slightly so pills can tuck into the gaps between lines
  return out.map((r) => ({ x: r.x + r.w * 0.04, y: r.y + r.h * 0.22, w: r.w * 0.92, h: r.h * 0.56 }));
}

export default function PillDrop({ heroRef, textRef, reduce }) {
  const els = useRef([]);
  useEffect(() => {
    const hero = heroRef.current; if (!hero) return undefined;
    const mobile = () => window.innerWidth < 768;
    let raf = 0; let timer = 0; let engine; let items = []; let alive = true; let drag = null; let onResize; let wake = () => {}; let io;

    const place = () => {
      const W = hero.clientWidth; const H = hero.clientHeight;
      const list = PILLS.map((p, i) => ({ p, i, el: els.current[i] })).filter(({ p, el }) => el && !(p.hideM && mobile()));
      const sizes = list.map(({ el }) => ({ w: el.offsetWidth, h: el.offsetHeight }));

      if (reduce) { // no physics: lay them out along the bottom
        let x = 24; let row = 0;
        list.forEach(({ el }, k) => {
          const { w, h } = sizes[k];
          if (x + w > W - 12) { x = 24; row += 1; }
          el.style.transform = `translate(${x}px, ${H - (row + 1) * (h + 10) - 10}px)`; el.style.opacity = 1; x += w + 12;
        });
        return;
      }

      engine = Engine.create({ gravity: { y: 1.15 }, enableSleeping: true });
      const wall = { isStatic: true, restitution: 0.3, friction: 0.5 };
      const floor = Bodies.rectangle(W / 2, H + 30 - 4, W * 3, 60, wall);
      const left = Bodies.rectangle(-30, H / 2, 60, H * 4, wall);
      const right = Bodies.rectangle(W + 30, H / 2, 60, H * 4, wall);
      Composite.add(engine.world, [floor, left, right]);

      // Pegs at each word's centre: pills clatter off the letters but can always slip through the gaps.
      const words = wordRects(textRef.current, hero).map((r) => Bodies.circle(r.x + r.w / 2, r.y + r.h / 2, Math.max(8, Math.min(r.h * 0.3, r.w / 2)), { isStatic: true, restitution: 0.55, friction: 0.05, collisionFilter: { category: 0x0002 } }));
      Composite.add(engine.world, words);

      items = list.map(({ el }, k) => {
        const { w, h } = sizes[k];
        const x = W * (0.2 + 0.6 * ((k * 0.37 + 0.13) % 1));
        const body = Bodies.rectangle(x, -h - k * 150, w, h, { chamfer: { radius: Math.min(h / 2.6, 22) }, restitution: 0.38, friction: 0.35, frictionAir: 0.012, density: 0.002, angle: (Math.random() - 0.5) * 0.8 });
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 2 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        Composite.add(engine.world, body);
        el.style.opacity = 1;
        return { el, body, w, h, still: 0 };
      });

      // pills resting above the headline's bottom edge get nudged through; the pile below is left alone
      const tb = textRef.current.getBoundingClientRect(); const textBottom = tb.bottom - hero.getBoundingClientRect().top;
      let last = performance.now(); let running = false; let visible = true;
      const loop = (now) => {
        if (!alive || !visible) { running = false; return; }
        const dt = Math.min(32, now - last); last = now;
        Engine.update(engine, dt);
        let awake = !!drag;
        items.forEach((it) => {
          const { el, body, w, h } = it;
          if (!body.isSleeping) awake = true;
          // anti-jam: a pill resting on the text drops through the letters to the floor
          if (now - start < 9000 && body.position.y < textBottom && body.speed < 0.5 && !(drag && drag.c.bodyB === body)) { awake = true; it.still += dt; if (it.still > 400) { Sleeping.set(body, false); body.collisionFilter.mask = 0xfffd; Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 1 }); Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15); it.still = 0; } } else it.still = 0;
          const tx = `translate3d(${(body.position.x - w / 2).toFixed(1)}px, ${(body.position.y - h / 2).toFixed(1)}px, 0) rotate(${body.angle.toFixed(3)}rad)`;
          if (tx !== it.tx) { el.style.transform = tx; it.tx = tx; }
        });
        // everything has come to rest: stop the loop until someone grabs a pill
        if (!awake && now - start > 2500) { running = false; return; }
        raf = requestAnimationFrame(loop);
      };
      const start = performance.now();
      wake = () => { if (!running && alive && visible) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); } };
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); });
      io.observe(hero);
      wake();

      // drag with a spring constraint
      const pos = (e) => { const r = hero.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      items.forEach(({ el, body }) => {
        el.onpointerdown = (e) => {
          e.preventDefault(); el.setPointerCapture(e.pointerId); Sleeping.set(body, false);
          const p = pos(e);
          drag = { id: e.pointerId, c: Constraint.create({ pointA: p, bodyB: body, pointB: { x: p.x - body.position.x, y: p.y - body.position.y }, stiffness: 0.12, damping: 0.1, length: 0 }) };
          Composite.add(engine.world, drag.c); el.style.cursor = 'grabbing'; el.style.zIndex = 50; wake();
        };
        el.onpointermove = (e) => { if (drag && drag.id === e.pointerId) drag.c.pointA = pos(e); };
        const up = (e) => { if (drag && drag.id === e.pointerId) { Composite.remove(engine.world, drag.c); drag = null; el.style.cursor = 'grab'; el.style.zIndex = 30; } };
        el.onpointerup = up; el.onpointercancel = up;
      });
    };

    timer = window.setTimeout(place, reduce ? 0 : 1900);
    let lastW = window.innerWidth;
    onResize = () => { // restart the pile only when the width really changes (mobile URL bar fires resize on scroll)
      if (window.innerWidth === lastW) return; lastW = window.innerWidth;
      alive = false; cancelAnimationFrame(raf); window.clearTimeout(timer); if (io) io.disconnect();
      if (engine) { Composite.clear(engine.world, false); Engine.clear(engine); }
      alive = true; place();
    };
    window.addEventListener('resize', onResize);
    return () => { alive = false; if (io) io.disconnect(); cancelAnimationFrame(raf); window.clearTimeout(timer); window.removeEventListener('resize', onResize); if (engine) { Composite.clear(engine.world, false); Engine.clear(engine); } };
  }, [heroRef, textRef, reduce]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden" aria-hidden="false">
      {PILLS.map((p, i) => (
        <div
          key={p.t}
          ref={(el) => { els.current[i] = el; }}
          className={`pill absolute left-0 top-0 ${p.hideM ? 'hidden md:block' : 'block'} pointer-events-auto cursor-grab select-none whitespace-nowrap rounded-[16px] md:rounded-[22px] px-4 py-2.5 md:px-8 md:py-[18px] text-[21px] md:text-[38px] font-medium tracking-[-0.015em] leading-none`}
          style={{
            opacity: 0, touchAction: 'none', zIndex: 30, willChange: 'transform',
            background: `linear-gradient(180deg, ${p.bg[0]}, ${p.bg[1]})`, color: p.fg,
            fontFamily: "'Inter Variable', system-ui, sans-serif",
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.85), inset 0 -3px 0 rgba(0,0,0,0.06), 0 12px 20px -10px rgba(40,40,60,0.5)',
          }}
        >
          {p.t}
        </div>
      ))}
    </div>
  );
}
