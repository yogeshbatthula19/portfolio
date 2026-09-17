import React, { useState } from 'react';
import './PhotoboothAbout.css';

export default function AboutMe({ onContact, onProjects }) {
  const [dispensed, setDispensed] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // Tactile mechanical sound synthesizer
  const playMechanicalSound = (type = 'dispense') => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'dispense') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      } else if (type === 'flip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (type === 'dispense' ? 0.18 : 0.12));
    } catch {}
  };

  const toggleDispense = (e) => {
    e?.stopPropagation();
    playMechanicalSound('dispense');
    setDispensed((prev) => {
      if (prev) {
        // Retracting resets flip
        setIsFlipped(false);
      }
      return !prev;
    });
  };

  const handleCardClick = (e) => {
    if (!dispensed) {
      toggleDispense(e);
    } else {
      playMechanicalSound('flip');
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div className="photobooth-screen">
      <div className="photobooth-machine">
        
        {/* =================================================================
            SLOT DISPENSER APPARATUS (Recessed metallic slot & cavity)
            ================================================================= */}
        <div className="slot-assembly">
          {/* Outer Stamped Metallic Bezel Collar */}
          <div
            className="slot-collar"
            onClick={toggleDispense}
            role="button"
            tabIndex={0}
            aria-label={dispensed ? "Retract photo card into slot" : "Dispense photo card from slot"}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDispense(e);
              }
            }}
          >
            {/* Deep Dark Aperture Hole */}
            <div className="slot-aperture" />
          </div>

          {/* Upper Metallic Hood (sits in front of card top) */}
          <div className="slot-top-lip" />
        </div>

        {/* =================================================================
            CARD CHUTE (Clipped inside slot aperture at top, open below)
            ================================================================= */}
        <div className="card-chute">
          <div
            className={`card-motion-wrapper ${dispensed ? "is-dispensed" : "is-peeking"} ${isFlipped ? "is-flipped" : ""}`}
            onClick={handleCardClick}
            title={
              !dispensed
                ? "Click to dispense card"
                : isFlipped
                ? "Click to flip back to photo side"
                : "Click to flip card for bio & info"
            }
          >
            <div className="card-flipper">
              
              {/* ===========================================================
                  FRONT FACE: EXACT 1:1 REPLICA OF REFERENCE PHOTO
                  =========================================================== */}
              <div className="card-face card-front">
                {/* Deep downward shadow cast by the upper slot lip */}
                <div className="card-top-slot-shadow" />

                {/* 2x2 Photo Cuts Grid */}
                <div className="photo-grid">
                  <div className="photo-cut cut-1">
                    <img src="/images/yogesh-portrait.jpg" alt="Yogesh portrait cut 1" />
                  </div>
                  <div className="photo-cut cut-2">
                    <img src="/images/yogesh-portrait.jpg" alt="Yogesh portrait cut 2" />
                  </div>
                  <div className="photo-cut cut-3">
                    <img src="/images/yogesh-portrait.jpg" alt="Yogesh portrait cut 3" />
                  </div>
                  <div className="photo-cut cut-4">
                    <img src="/images/yogesh-portrait.jpg" alt="Yogesh portrait cut 4" />
                  </div>
                </div>

                {/* Bottom Card Typography (Exact match to reference) */}
                <div className="card-bottom-info">
                  <div className="card-title-group">
                    <div className="card-job-title">
                      <span>Product</span>
                      <span>Designer</span>
                    </div>
                    <div className="card-traits">
                      Ambitious • Optimistic • Curious
                    </div>
                  </div>

                  <div className="card-meta-right">
                    <span>at Recovery & Trosky</span>
                    <span>from 2020</span>
                  </div>
                </div>

                <div className="flip-pill-hint">Click to flip ↺</div>
              </div>

              {/* ===========================================================
                  BACK FACE: ARCHIVAL PHOTO PAPER INFO & CONTACT
                  =========================================================== */}
              <div className="card-face card-back">
                <div className="card-back-header">
                  <span className="stamp-badge">Photobooth Archive // YB-2024</span>
                  <h3 className="card-back-name">Yogesh Battula</h3>
                  <p className="card-back-role">Product & Interaction Designer</p>
                </div>

                <div className="card-back-body">
                  <p>
                    Designing thoughtful digital interfaces, design systems, and human-centered products across health-tech, conversational AI, and mobile ecosystems.
                  </p>

                  <div className="card-back-projects">
                    <h5>Key Featured Work</h5>
                    <ul>
                      <li><strong>Recovery:</strong> Post-operative clinical rehabilitation</li>
                      <li><strong>Trosky 365:</strong> AI-powered athletic coaching suite</li>
                    </ul>
                  </div>
                </div>

                <div className="card-back-actions">
                  {onProjects && (
                    <button
                      type="button"
                      className="card-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjects();
                      }}
                    >
                      View Projects ↗
                    </button>
                  )}
                  {onContact && (
                    <button
                      type="button"
                      className="card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContact();
                      }}
                    >
                      Get in Touch
                    </button>
                  )}
                </div>

                <div className="flip-back-prompt">Click card anywhere to flip back</div>
              </div>

            </div>
          </div>
        </div>

        {/* Tactile Dispenser Controls Below */}
        <div className="dispenser-controls">
          <button
            type="button"
            className="dispense-toggle-btn"
            onClick={toggleDispense}
          >
            <span className="toggle-arrow">{dispensed ? "▴" : "▾"}</span>
            <span>{dispensed ? "Retract into slot" : "Dispense card"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
