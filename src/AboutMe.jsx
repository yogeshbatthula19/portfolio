import React, { useState } from 'react';
import './PolaroidAbout.css';

export default function AboutMe({ onContact, onProjects, onExperience }) {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const emojis = ['🤩', '😎', '🚀', '☕', '🎨', '✨'];

  const cycleEmoji = (e) => {
    e?.stopPropagation();
    setEmojiIndex((prev) => (prev + 1) % emojis.length);
  };

  return (
    <div className="polaroid-editorial-screen">
      
      {/* =================================================================
          SECTION 1: HERO SCRAPBOOK (SINGLE GLANCE HERO VIEW)
          ================================================================= */}
      <section className="hero-glance-section">
        <div className="editorial-stage">
          
          {/* Peeking underlay card on bottom-left */}
          <div className="peeking-card-underlay" aria-hidden="true">
            <div className="peeking-card-watermark">
              MEET THE<br />DESIGNER
            </div>
          </div>

          {/* =============================================================
              STATIC REALISTIC VINYL STICKERS
              ============================================================= */}
          {/* 1. Drone Sticker on Left Margin */}
          <div
            className="realistic-sticker sticker-drone"
            title="Tech & FPV Drone"
            aria-label="Quadcopter camera drone sticker"
          >
            <img src="/images/drone-sticker.png" alt="Camera drone die-cut sticker" />
          </div>

          {/* 2. Charminar Hyderabad Monument Sticker on Right Margin */}
          <div
            className="realistic-sticker sticker-charminar"
            title="Charminar, Hyderabad"
            aria-label="Charminar Hyderabad monument sticker"
          >
            <img src="/images/charminar-sticker.png" alt="Charminar monument die-cut sticker" />
          </div>

          {/* 3. Off-Road 4x4 Jeep Sticker on Bottom-Left Margin */}
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
            <span className="note-script">Product Designer & AI Vibe Coder</span>
          </div>

          {/* 2. Top Left: Mindset */}
          <div className="editorial-note note-top-left">
            <span className="note-label">mindset:</span>
            <span className="note-script">deeply spiritual & mindful</span>
          </div>

          {/* 3. Top Right: Superpower + Arrow 1 */}
          <div className="editorial-note note-top-right">
            <span className="note-script">vibe code & ship live</span>
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

          {/* 4. Middle Left: In the kitchen + Arrow 2 */}
          <div className="editorial-note note-mid-left">
            <span className="note-label">in the kitchen:</span>
            <span className="note-script">loves cooking</span>
            <span className="note-subscript">(flavors & culinary craft)</span>
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
          <article className="polaroid-frame" title="Yogesh Battula — Product Designer & Builder">
            <div className="polaroid-photo-wrap">
              <img
                src="/images/yogesh-portrait.jpg"
                alt="Yogesh Battula editorial portrait"
              />
            </div>

            {/* Bottom white chin with handwritten red script */}
            <div className="polaroid-chin">
              <span className="red-signature">Yogesh</span>
            </div>

            {/* 3D Emoji Sticker Badge */}
            <button
              type="button"
              className="emoji-sticker-badge"
              onClick={cycleEmoji}
              aria-label="Change sticker reaction"
              title="Click to cycle reaction"
            >
              <span className="emoji-icon">{emojis[emojiIndex]}</span>
            </button>
          </article>

          {/* 6. Middle Right: Passions */}
          <div className="editorial-note note-mid-right">
            <span className="note-label">daily obsessions:</span>
            <span className="note-script">tech gadgets & cars</span>
          </div>

          {/* 7. Bottom Left: Passions outside design */}
          <div className="editorial-note note-bottom-left">
            <span className="note-label">favorite pastimes:</span>
            <span className="note-script">culinary arts & road trips</span>
            <span className="note-subscript">(and fresh coffee)</span>
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
            <span className="note-label">builder tools:</span>
            <span className="note-script">Figma & Production Code</span>
          </div>

        </div>
      </section>

      {/* =================================================================
          SECTION 2: CLEAN DETAILED STORY (NO CONTAINER BOXES)
          ================================================================= */}
      <section className="about-extended-story">
        <div className="story-paragraphs">
          <p className="story-p">
            I’m <strong>Yogesh Battula</strong>—a Product Designer and end-to-end builder based in Hyderabad. Over the past year, I trained rigorously in <strong>AI vibe coding like a pro</strong>. Rather than just designing screens in Figma and handing them off, I’ve unlocked the capability to genuinely conceive, design, code, and <strong>push full-stack digital products live</strong> to real users at lightning speed.
          </p>

          <p className="story-p">
            At my core, I am <strong>deeply spiritual and grounded</strong>. I believe that mindful intention, calmness, and inner clarity are what separate superficial apps from enduring technology. When digital experiences are crafted from a place of centeredness, they eliminate friction and bring peace, focus, and genuine delight to people’s everyday lives.
          </p>

          <p className="story-p">
            Outside the canvas and terminal, I have a genuine <strong>love for cooking</strong>—approaching recipes with culinary care, balancing fresh spices, slow cooking, and sharing nourishing food with people I care about. I’m equally captivated by <strong>favorite tech gadgets</strong> (from spatial computing and custom hardware rigs to FPV drones) and the mechanical artistry of <strong>cars</strong>—obsessing over vehicle dynamics, aerodynamic lines, and late-night highway drives.
          </p>

          <div style={{ marginTop: '30px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            {onProjects && (
              <button
                type="button"
                onClick={onProjects}
                style={{
                  background: '#0071e3',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '980px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Explore Selected Work →
              </button>
            )}

            {onExperience && (
              <button
                type="button"
                className="exp-learn-more-link"
                onClick={onExperience}
                style={{
                  background: 'none',
                  border: '1px solid rgba(0,0,0,0.12)',
                  padding: '8px 16px',
                  borderRadius: '980px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#1d1d1f',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                View Career Timeline ›
              </button>
            )}

            {onContact && (
              <button
                type="button"
                onClick={onContact}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0071e3',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Get in Touch ↗
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
