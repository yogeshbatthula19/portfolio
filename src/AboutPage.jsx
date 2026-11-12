import React, { useEffect } from 'react';
import AboutPoster from './AboutPoster';
import { TypewriterExperience, CassetteCollection } from './AboutCollections';
import { KindB, FooterA } from './MoreOptions';

// About page in the V3 language: poster intro, typewriter experience, favourite stories,
// kind words and the shared footer.
export default function AboutPage() {
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => window.lenis?.resize());
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="v3-page min-h-screen bg-[#f4f1ea] text-[#141210] relative flex flex-col overflow-x-clip" style={{ fontFamily: "'STK Bureau Sans','Inter Variable', system-ui, sans-serif" }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(42,38,34,0.09) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <main className="relative w-full flex-1 flex flex-col">
        <div className="pt-12 sm:pt-10"><AboutPoster bleed /></div>
        <div className="pt-16 sm:pt-24"><TypewriterExperience /></div>
        <CassetteCollection />
        <section className="px-4 sm:px-8 py-20 md:py-28"><div className="mx-auto max-w-[1180px]"><KindB /></div></section>
        <footer className="px-4 sm:px-8 pb-8"><div className="mx-auto max-w-[1180px]"><FooterA /></div></footer>
      </main>
    </div>
  );
}
