import React from 'react';
import './ScrapbookAbout.css';

export default function AboutMe() {
  return (
    <div className="scrapbook-about-view">
      {/* Editorial Highlight Title */}
      <header className="scrapbook-header">
        <h2 className="scrapbook-title">
          <span className="scrapbook-title-highlight">now that we’ve officially met...</span>
        </h2>
      </header>

      {/* Scrapbook Collage Stage */}
      <div className="scrapbook-stage">
        {/* 1. Torn Kraft Paper Backing Card */}
        <div className="scrapbook-kraft-card" aria-hidden="true">
          <div className="scrapbook-kraft-badge">
            cr<span className="badge-orange">e</span>ative
          </div>
        </div>

        {/* 2. Sports Car Die-Cut Sticker (Boy Interests) */}
        <div
          className="scrapbook-sticker car-sticker"
          title="Motorsports & Performance Cars"
          aria-label="Porsche sports car sticker"
        >
          <img src="/images/car-sticker.png" alt="Sports car sticker" />
        </div>

        {/* 3. Polaroid Instant Photo with Washi Tape */}
        <div className="scrapbook-polaroid">
          <div className="scrapbook-tape" aria-hidden="true" />
          <div className="scrapbook-photo-wrap">
            <img
              src="/images/yogesh-portrait.jpg"
              alt="Yogesh Battula portrait"
              className="scrapbook-photo"
            />
            {/* Viewfinder camera grid overlay */}
            <div className="scrapbook-viewfinder" aria-hidden="true">
              <div className="viewfinder-grid" />
              <div className="viewfinder-controls">
                <span>○</span>
                <span>☼</span>
                <span>⟳</span>
                <span className="vf-shutter" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Spiral Lined Notebook Sheet */}
        <div className="scrapbook-notebook">
          <div className="notebook-spiral-edge" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="notebook-hole" />
            ))}
          </div>
          <div className="notebook-content">
            <p className="notebook-line">Hi, I’m Yogesh—the designer</p>
            <p className="notebook-line">behind thoughtful systems & craft.</p>
            <p className="notebook-line">Thanks for stopping by</p>
            <p className="notebook-line">my little creative space</p>
            <p className="notebook-hearts">✦ ✦ ✦</p>
          </div>
        </div>

        {/* 5. Quadcopter Drone Die-Cut Sticker (Boy Interests) */}
        <div
          className="scrapbook-sticker drone-sticker"
          title="FPV Drones & Aerial Cinematography"
          aria-label="Camera drone sticker"
        >
          <img src="/images/drone-sticker.png" alt="Camera drone sticker" />
        </div>
      </div>

      {/* Outro Signoff */}
      <footer className="scrapbook-footer">
        <p className="scrapbook-intro-text">
          Stick around for product design, design systems, creative ideas, and the
          occasional glimpse behind the pixels.
        </p>
        <h3 className="scrapbook-signoff">
          Nice to meet you! <span className="sparkle">✦</span>
        </h3>
      </footer>
    </div>
  );
}
