import React, { useState } from 'react';
import './PolaroidAbout.css';

export default function AboutMe({ onContact, onProjects }) {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const emojis = ['🤩', '😎', '🚀', '☕', '🎨', '✨'];

  const cycleEmoji = (e) => {
    e?.stopPropagation();
    setEmojiIndex((prev) => (prev + 1) % emojis.length);
  };

  return (
    <div className="polaroid-editorial-screen">

      {/* =================================================================
          MAIN EDITORIAL STAGE (Polaroid + Annotations + Hand-Drawn Arrows)
          ================================================================= */}
      <div className="editorial-stage">
        
        {/* Peeking underlay card on bottom-left */}
        <div className="peeking-card-underlay" aria-hidden="true">
          <div className="peeking-card-watermark">
            MEET THE<br />DESIGNER
          </div>
        </div>

        {/* 1. Top Center Note & Upward Curved Arrow */}
        <div className="editorial-note note-top-center">
          <span className="note-label">ROLE</span>
          <span className="note-script">Product & Systems</span>
        </div>
        <svg className="arrow-top-center hand-drawn-arrow" viewBox="0 0 44 55" fill="none">
          <path d="M 6 48 C 18 42, 28 28, 24 10" />
          <path d="M 18 16 L 24 9 L 30 15" />
        </svg>

        {/* 2. Top Left Note */}
        <div className="editorial-note note-top-left">
          <span className="note-label">nickname:</span>
          <span className="note-script">the pixel architect</span>
        </div>

        {/* 3. Top Right Note */}
        <div className="editorial-note note-top-right">
          <span className="note-script">multidisciplinary</span>
        </div>

        {/* 4. Middle Left Note & Squiggly Arrow to Photo */}
        <div className="editorial-note note-mid-left">
          <span className="note-label">favorite movies:</span>
          <span className="note-script">sci-fi & crime</span>
        </div>
        <svg className="arrow-mid-left hand-drawn-arrow" viewBox="0 0 32 48" fill="none">
          <path d="M 2 40 Q 14 36, 6 24 T 22 10" />
          <path d="M 14 10 L 23 9 L 23 18" />
        </svg>

        {/* 5. Center Hero Polaroid Frame */}
        <article className="polaroid-frame" title="Yogesh Battula — Product Designer">
          <div className="polaroid-photo-wrap">
            <img
              src="/images/yogesh-portrait.jpg"
              alt="Yogesh Battula black and white editorial portrait"
            />
          </div>

          {/* Bottom white chin with handwritten red script */}
          <div className="polaroid-chin">
            <span className="red-signature">Yogesh</span>
          </div>

          {/* 3D Emoji Sticker Badge on the right edge */}
          <button
            type="button"
            className="emoji-sticker-badge"
            onClick={cycleEmoji}
            aria-label="Change sticker reaction"
            title="Click to cycle sticker!"
          >
            <span className="emoji-icon">{emojis[emojiIndex]}</span>
          </button>
        </article>

        {/* 6. Middle Right Note */}
        <div className="editorial-note note-mid-right">
          <span className="note-label">superpower:</span>
          <span className="note-script">craft & micro-details</span>
        </div>

        {/* 7. Bottom Left Note (Overlapping peeking card) */}
        <div className="editorial-note note-bottom-left">
          <span className="note-label">passions outside design:</span>
          <span className="note-script">cars & tech gadgets</span>
          <span className="note-subscript">(and dark roast coffee)</span>
        </div>

        {/* 8. Bottom Right Note & Curved Downward Arrow */}
        <svg className="arrow-bottom-right hand-drawn-arrow" viewBox="0 0 38 38" fill="none">
          <path d="M 4 6 Q 16 12, 22 28" />
          <path d="M 14 26 L 23 29 L 26 20" />
        </svg>
        <div className="editorial-note note-bottom-right">
          <span className="note-label">favorite tools:</span>
          <span className="note-script">Figma & Code</span>
        </div>

      </div>
    </div>
  );
}
