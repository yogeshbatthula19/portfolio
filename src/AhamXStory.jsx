import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, Eye, Layers, Lock } from 'lucide-react';
import './AhamXStory.css';

const slides = [
  { id: 1, title: 'Cover · Learning, with continuity', file: '/case-studies/ahamx/slide-01.png' },
  { id: 2, title: 'Context · Three months to build', file: '/case-studies/ahamx/slide-02.png' },
  { id: 3, title: 'Problem · Too much to remember', file: '/case-studies/ahamx/slide-03.png' },
  { id: 4, title: 'User Empathy · Understand the pressure behind the click', file: '/case-studies/ahamx/slide-04.png' },
  { id: 5, title: 'Working Persona · Ananya', file: '/case-studies/ahamx/slide-05.png' },
  { id: 6, title: 'Process · Three decisions that shaped the build', file: '/case-studies/ahamx/slide-06.png' },
  { id: 7, title: 'Discovery Plan · What I\'d ask next', file: '/case-studies/ahamx/slide-07.png' },
  { id: 8, title: 'Story 1 · Progress gives people a place to return', file: '/case-studies/ahamx/slide-08.png' },
  { id: 9, title: 'Story 2 · An AI draft still needs an educator\'s judgment', file: '/case-studies/ahamx/slide-09.png' },
  { id: 10, title: 'Story 3 · People should know what they\'re approving', file: '/case-studies/ahamx/slide-10.png' },
  { id: 11, title: 'Measurement · How I\'d measure confidence', file: '/case-studies/ahamx/slide-11.png' },
  { id: 12, title: 'Roadmap · A roadmap beyond launch', file: '/case-studies/ahamx/slide-12.png' },
  { id: 13, title: 'Credits · Credits and sources', file: '/case-studies/ahamx/slide-13.png' },
  { id: 14, title: 'Appendix A · Dashboard views', file: '/case-studies/ahamx/slide-14.png' },
  { id: 15, title: 'Appendix B · Community feed & personal profile', file: '/case-studies/ahamx/slide-15.png' },
  { id: 16, title: 'Appendix C · Course outline & lesson editor', file: '/case-studies/ahamx/slide-16.png' },
  { id: 17, title: 'Appendix D · Narration script & audio review', file: '/case-studies/ahamx/slide-17.png' },
  { id: 18, title: 'Appendix E · Video preview & lesson library', file: '/case-studies/ahamx/slide-18.png' },
  { id: 19, title: 'Appendix F · Organization hierarchy & requests', file: '/case-studies/ahamx/slide-19.png' },
  { id: 20, title: 'Appendix G · Organization setup & cohorts', file: '/case-studies/ahamx/slide-20.png' },
  { id: 21, title: 'Appendix H · Mobile learning, profile & discussion', file: '/case-studies/ahamx/slide-21.png' },
];

export function AhamXCover() {
  return (
    <div className="trosky-cover ahamx-cover">
      <small>AhamX · 2026 AI Product Design</small>
      <strong>Learning, with continuity.</strong>
      <span>Desktop, mobile & AI workflows for learners & educators ↗</span>
    </div>
  );
}

export default function AhamXStory({ onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [viewMode, setViewMode] = useState('deck'); // 'deck' | 'scroll'
  const activeThumbRef = useRef(null);

  const prevSlide = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const nextSlide = () => setCurrentIdx((i) => Math.min(slides.length - 1, i + 1));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'deck') return;
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIdx]);

  return (
    <article className="ahamx-container">
      {/* Top Header Navigation */}
      <nav className="ahamx-toolbar" aria-label="AhamX case study controls">
        <div className="ahamx-toolbar-left">
          {onClose && (
            <button
              type="button"
              className="ahamx-back-btn"
              onClick={onClose}
              aria-label="Back to portfolio"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          )}
          <div className="ahamx-title-wrap">
            <span className="ahamx-brand">AhamX · 2026</span>
            <span className="ahamx-nda-badge">
              <Lock size={10} />
              NDA Verified
            </span>
          </div>
        </div>

        {/* View Switcher: Slide Deck vs Continuous Scroll */}
        <div className="ahamx-toolbar-center">
          <button
            type="button"
            className={`ahamx-tab-btn ${viewMode === 'deck' ? 'active' : ''}`}
            onClick={() => setViewMode('deck')}
          >
            Slides Deck
          </button>
          <button
            type="button"
            className={`ahamx-tab-btn ${viewMode === 'scroll' ? 'active' : ''}`}
            onClick={() => setViewMode('scroll')}
          >
            All Slides View
          </button>
        </div>

        <div className="ahamx-toolbar-right">
          {viewMode === 'deck' && (
            <>
              <button
                type="button"
                className="ahamx-nav-btn"
                onClick={prevSlide}
                disabled={currentIdx === 0}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="ahamx-nav-counter">
                {String(currentIdx + 1).padStart(2, '0')} / {slides.length}
              </span>
              <button
                type="button"
                className="ahamx-nav-btn"
                onClick={nextSlide}
                disabled={currentIdx === slides.length - 1}
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <a
            href="/documents/ahamx-case-study.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ahamx-pdf-btn"
            title="Download full AhamX PDF Case Study"
          >
            <Download size={13} />
            <span>PDF (3.2 MB)</span>
          </a>
        </div>
      </nav>

      {/* Main Presentation Content */}
      {viewMode === 'deck' ? (
        <div className="ahamx-deck-view">
          {/* Active Large Slide */}
          <div className="ahamx-slide-stage">
            <img
              src={slides[currentIdx].file}
              alt={slides[currentIdx].title}
              className="ahamx-slide-img"
            />
          </div>

          {/* Quick Jump Thumbnail Strip */}
          <div className="ahamx-thumbs-strip" role="tablist" aria-label="Slide thumbnails">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                ref={idx === currentIdx ? activeThumbRef : null}
                type="button"
                role="tab"
                aria-selected={idx === currentIdx}
                aria-label={`Jump to slide ${s.id}: ${s.title}`}
                className={`ahamx-thumb-btn ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => setCurrentIdx(idx)}
              >
                <img src={s.file} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Continuous Scroll Mode */
        <div className="ahamx-scroll-view">
          {slides.map((s) => (
            <div key={s.id} className="ahamx-scroll-card">
              <div className="ahamx-scroll-card-header">
                <span>Slide {String(s.id).padStart(2, '0')}</span>
                <span>{s.title}</span>
              </div>
              <img
                src={s.file}
                alt={s.title}
                className="ahamx-scroll-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
