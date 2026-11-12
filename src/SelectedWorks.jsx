import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';

// Big stacked case-study cards: each one sticks and the next slides over it.
export default function SelectedWorks({ items, sectionRef }) {
  const reduce = useReducedMotion();
  return (
    <section ref={sectionRef} id="selected-works" style={{ fontFamily: "'Inter Variable', system-ui, sans-serif" }} className="relative w-full px-4 sm:px-8 pt-20 pb-24 bg-[#f4f1ea]">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <h2 className="text-[#141210] text-[44px] sm:text-[64px] leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: "'Newsreader Variable', Georgia, serif" }}>
            Selected <em style={{ fontStyle: 'italic' }}>work</em>
          </h2>
          <span className="hidden sm:block pb-3 text-[14px] text-[#6b645b]">{items.filter((c) => !c.locked).length} case studies + 1 under NDA</span>
        </div>

        <div className="relative">
          {items.map((c, i) => {
            const Tag = c.locked ? 'div' : 'a';
            const link = c.locked ? { role: 'button', tabIndex: 0, onClick: c.onClick, onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.onClick(); } } }
              : { href: c.href, onMouseEnter: c.prefetch, onFocus: c.prefetch, onClick: (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; e.preventDefault(); c.onClick(); } };
            return (
              <div key={c.title} className="sticky mb-6 md:mb-10" style={{ top: `calc(84px + ${i * 14}px)`, transform: 'translateZ(0)' }}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Tag
                    {...link}
                    data-slug={c.slug}
                    className="group relative grid md:grid-cols-[1fr_1.15fr] overflow-hidden rounded-[28px] md:rounded-[40px] text-inherit no-underline cursor-pointer shadow-[0_30px_60px_-30px_rgba(30,25,20,0.45)] min-h-[520px] md:min-h-[560px]"
                    style={{ background: c.bg }}
                  >
                    <div className="relative z-10 flex flex-col justify-between p-7 md:p-12">
                      <span />
                      <div className="my-8">
                        <h3 className="text-[#141210] text-[36px] sm:text-[42px] md:text-[46px] leading-[1.02] tracking-[-0.02em]" style={{ fontFamily: "'Newsreader Variable', Georgia, serif" }}>{c.title}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-white/80 px-4 py-2 text-[14px] md:text-[15px] font-medium" style={{ color: c.fg }}>{c.outcome}</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#2a2622] px-5 py-2.5 text-[14px] font-medium text-[#f4f1ea] transition-transform group-hover:translate-x-1">
                          {c.locked ? (<><Lock className="h-3.5 w-3.5" /> Ask for access</>) : (<>View case study <span aria-hidden="true">→</span></>)}
                        </span>
                      </div>
                    </div>
                    <div className="relative min-h-[280px] md:min-h-0 overflow-hidden">
                      {c.shots.length > 1 ? (
                        <div className="absolute inset-0 flex items-end justify-center gap-4 px-6 pt-8">
                          {c.shots.map((s, k) => (
                            <img key={s} src={s} alt={k === 0 ? `${c.title} preview` : ''} loading="lazy" decoding="async" draggable={false}
                              className={`block h-[92%] w-auto max-w-[46%] object-contain object-bottom transition-transform duration-500 group-hover:-translate-y-2 ${k ? 'translate-y-10' : ''}`} />
                          ))}
                        </div>
                      ) : c.shots.length === 1 ? (
                        <img src={c.shots[0]} alt={`${c.title} preview`} loading="lazy" decoding="async" draggable={false}
                          className="absolute bottom-0 right-0 block w-[94%] max-w-none h-auto rounded-tl-[22px] shadow-[0_24px_40px_-10px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-2" />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center"><Lock className="h-14 w-14 text-[#141210]/25" /></div>
                      )}
                    </div>
                  </Tag>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
