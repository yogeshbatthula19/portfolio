import React, { useState } from 'react';
import './PhotoboothAbout.css';

export default function AboutMe() {
  const [ejected, setEjected] = useState(true);

  const toggleDispense = () => {
    // Optional Web Audio feedback for tactile printer sound
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(ejected ? 160 : 320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(ejected ? 80 : 540, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {}

    setEjected((prev) => !prev);
  };

  return (
    <div className="photobooth-view">
      {/* Dispenser Header */}
      <header className="photobooth-header">
        <h2>Photo Dispenser</h2>
        <p>Click the slot or button below to print my ID card</p>
      </header>

      {/* Machine Panel / Chassis */}
      <div className="dispenser-chassis">
        {/* Beveled Screws */}
        <span className="chassis-screw screw-tl" aria-hidden="true" />
        <span className="chassis-screw screw-tr" aria-hidden="true" />
        <span className="chassis-screw screw-bl" aria-hidden="true" />
        <span className="chassis-screw screw-br" aria-hidden="true" />

        {/* Machine Dispenser Slot */}
        <div
          className="dispenser-slot-housing"
          onClick={toggleDispense}
          role="button"
          tabIndex={0}
          aria-label={ejected ? "Retract photo card" : "Dispense photo card"}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleDispense();
            }
          }}
        >
          <div className="dispenser-inner-slot" />
        </div>

        {/* Machine Controls */}
        <div className="dispenser-controls">
          <button
            type="button"
            className="dispense-btn"
            onClick={toggleDispense}
            aria-expanded={ejected}
          >
            <span>{ejected ? "▴ Retract Card" : "▾ Dispense Card"}</span>
          </button>
          <div className="status-led">
            <span className="led-dot" />
            <span>Ready</span>
          </div>
        </div>

        {/* Card Stage with Mechanical Slide-Out */}
        <div className="dispenser-stage">
          <article
            className={`photobooth-card ${ejected ? "is-ejected" : "is-peeking"}`}
            onClick={toggleDispense}
            title={ejected ? "Click to retract" : "Click to pull out full info"}
          >
            {/* 4-Shot 2x2 Photobooth Grid */}
            <div className="photobooth-grid">
              <div className="photo-cell cell-1">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula shot 1" />
              </div>
              <div className="photo-cell cell-2">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula shot 2" />
              </div>
              <div className="photo-cell cell-3">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula shot 3" />
              </div>
              <div className="photo-cell cell-4">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula shot 4" />
              </div>
            </div>

            {/* Typography Header */}
            <div className="card-header-row">
              <div className="card-title-group">
                <h3>Product<br />Designer</h3>
              </div>
              <div className="card-meta-group">
                <span>at Recovery & Trosky</span>
                <br />
                <span>from 2020</span>
              </div>
            </div>

            {/* Card Trait Row */}
            <p className="card-traits">
              Ambitious • Optimistic • <span>Curious</span>
            </p>

            {/* Detailed Info (Revealed on the card) */}
            <div className="card-info-content">
              <p>
                <strong>Yogesh Battula</strong> is a Senior Product Designer focused on turning complex workflows into intuitive, thoughtful, and human-centered digital experiences.
              </p>
              <p>
                Spearheaded end-to-end multi-platform platforms like <strong>Recovery</strong> (rehab systems for surgeons & patients) and <strong>Trosky 365</strong> (guided conversational athletic coaching).
              </p>
              <div className="card-tags">
                <span>Design Systems</span>
                <span>Interaction Design</span>
                <span>Prototyping</span>
                <span>Mobile & Web</span>
                <span>Motion UI</span>
              </div>
            </div>

            {/* Pull back action button */}
            <button
              type="button"
              className="pull-back-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleDispense();
              }}
            >
              {ejected ? "▴ Click to push back into slot" : "▾ Click to pull out"}
            </button>
          </article>
        </div>
      </div>

      {/* Interactive Hint */}
      <div className="dispenser-hint" onClick={toggleDispense}>
        <span>{ejected ? "Tap card to retract into machine" : "Tap slot to dispense ID card"}</span>
      </div>
    </div>
  );
}
