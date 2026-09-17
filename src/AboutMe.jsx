import React, { useState } from 'react';
import './PhotoboothAbout.css';

export default function AboutMe() {
  const [dispensed, setDispensed] = useState(true);

  const toggleCard = () => {
    // Subtle tactile mechanical audio click on dispense/retract
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(dispensed ? 180 : 340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(dispensed ? 90 : 600, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}

    setDispensed((prev) => !prev);
  };

  return (
    <div className="photobooth-screen">
      <div className="dispenser-apparatus">
        {/* Metallic Dispenser Slot Bezel */}
        <div
          className="slot-bezel"
          onClick={toggleCard}
          role="button"
          tabIndex={0}
          aria-label={dispensed ? "Retract photo card into slot" : "Dispense photo card from slot"}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleCard();
            }
          }}
        >
          <div className="slot-cavity" />
        </div>

        {/* Card Track (card exits directly from the inner slot) */}
        <div className="card-track">
          <article
            className={`photobooth-print ${dispensed ? "is-dispensed" : "is-peeking"}`}
            onClick={toggleCard}
            title={dispensed ? "Click to retract into slot" : "Click to dispense full card"}
          >
            {/* 2x2 Photobooth Cuts Grid */}
            <div className="print-grid">
              <div className="print-cut cut-1">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula pose 1" />
              </div>
              <div className="print-cut cut-2">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula pose 2" />
              </div>
              <div className="print-cut cut-3">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula pose 3" />
              </div>
              <div className="print-cut cut-4">
                <img src="/images/yogesh-portrait.jpg" alt="Yogesh Battula pose 4" />
              </div>
            </div>

            {/* Card Footer Typography (Matching Reference) */}
            <div className="print-footer">
              <div className="print-main-row">
                <div className="print-title">
                  <span>Product</span>
                  <span>Designer</span>
                </div>
                <div className="print-meta-right">
                  <span>at Recovery & Trosky</span>
                  <span>from 2020</span>
                </div>
              </div>

              {/* Trait Line */}
              <p className="print-traits">Ambitious • Optimistic • Curious</p>

              {/* Extended Bio Info on the Card */}
              <div className="print-extended-info">
                <p>
                  <strong>Yogesh Battula</strong> is a Product Designer focused on turning complex workflows into intuitive, thoughtful, and human-centered digital experiences.
                </p>
                <p>
                  Spearheaded end-to-end design across mobile, web, and desktop — including <strong>Recovery</strong> (rehabilitation systems for surgeons & patients) and <strong>Trosky 365</strong> (guided conversational athletic coaching).
                </p>
                <div className="print-tags-strip">
                  <span>Product Design</span>
                  <span>Design Systems</span>
                  <span>Interaction</span>
                  <span>Prototyping</span>
                  <span>Mobile & Web</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Interactive Floating Prompt */}
        <button
          type="button"
          className="dispense-prompt"
          onClick={toggleCard}
          aria-expanded={dispensed}
        >
          <span className="prompt-icon">{dispensed ? "▴" : "▾"}</span>
          <span>{dispensed ? "Click to retract card into slot" : "Click to dispense card from slot"}</span>
        </button>
      </div>
    </div>
  );
}
