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
          MAIN EDITORIAL STAGE (Polaroid + Hand-Drawn Annotations & Stickers)
          ================================================================= */}
      <div className="editorial-stage">
        
        {/* Peeking underlay card on bottom-left */}
        <div className="peeking-card-underlay" aria-hidden="true">
          <div className="peeking-card-watermark">
            MEET THE<br />DESIGNER
          </div>
        </div>

        {/* ===============================================================
            REALISTIC DIE-CUT VINYL STICKERS (DRONE, CHARMINAR, JEEP)
            =============================================================== */}
        {/* Drone Sticker on top-left */}
        <div
          className="realistic-sticker sticker-drone"
          title="Tech & FPV Drone"
          aria-label="Quadcopter camera drone sticker"
        >
          <img src="/images/drone-sticker.png" alt="Camera drone die-cut sticker" />
        </div>

        {/* Charminar Hyderabad Monument Sticker on top-right */}
        <div
          className="realistic-sticker sticker-charminar"
          title="Charminar, Hyderabad"
          aria-label="Charminar Hyderabad monument sticker"
        >
          <img src="/images/charminar-sticker.png" alt="Charminar monument die-cut sticker" />
        </div>

        {/* Off-road 4x4 Jeep Sticker on bottom-left */}
        <div
          className="realistic-sticker sticker-jeep"
          title="4x4 Adventure Jeep"
          aria-label="Off-road 4x4 Jeep sticker"
        >
          <img src="/images/jeep-sticker.png" alt="Jeep 4x4 die-cut sticker" />
        </div>

        {/* 1. Top Center: Role */}
        <div className="editorial-note note-top-center">
          <span className="note-label">ROLE</span>
          <span className="note-script">Product & Systems</span>
        </div>

        {/* 2. Top Left: Nickname (below drone sticker) */}
        <div className="editorial-note note-top-left">
          <span className="note-label">nickname:</span>
          <span className="note-script">the pixel architect</span>
        </div>

        {/* 3. Top Right: Multidisciplinary + Arrow 1 */}
        <div className="editorial-note note-top-right">
          <span className="note-script">multidisciplinary</span>
        </div>
        <svg
          className="arrow-top-right hand-drawn-arrow"
          viewBox="0 0 32 54"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 4 48 C 16 38, 22 22, 20 8" />
          <path d="M 12 16 L 20 7 L 26 17" />
        </svg>

        {/* 4. Middle Left: Favorite Movies + Arrow 2 */}
        <div className="editorial-note note-mid-left">
          <span className="note-label">favorite movies:</span>
          <span className="note-script">sci-fi & crime</span>
        </div>
        <svg
          className="arrow-mid-left hand-drawn-arrow"
          viewBox="0 0 30 62"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 10 56 C 2 46, 0 38, 9 30 C 18 22, 8 15, 14 7" />
          <path d="M 7 14 L 15 6 L 22 13" />
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

        {/* 6. Middle Right: Superpower */}
        <div className="editorial-note note-mid-right">
          <span className="note-label">superpower:</span>
          <span className="note-script">craft & micro-details</span>
        </div>

        {/* 7. Bottom Left: Passions outside design (paired with Jeep sticker) */}
        <div className="editorial-note note-bottom-left">
          <span className="note-label">passions outside design:</span>
          <span className="note-script">cars & tech gadgets</span>
          <span className="note-subscript">(and dark roast coffee)</span>
        </div>

        {/* 8. Bottom Right: Arrow 3 + Favorite Tools */}
        <svg
          className="arrow-bottom-right hand-drawn-arrow"
          viewBox="0 0 34 34"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 5 5 C 4 16, 11 25, 23 29" />
          <path d="M 15 29 L 24 30 L 24 21" />
        </svg>
        <div className="editorial-note note-bottom-right">
          <span className="note-label">favorite tools:</span>
          <span className="note-script">Figma & Code</span>
        </div>

      </div>
    </div>
  );
}
