import React, { useState, useEffect, useRef } from 'react';
import './PolaroidAbout.css';

export default function AboutMe({ onContact, onProjects }) {
  const screenRef = useRef(null);
  const storyRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [emojiIndex, setEmojiIndex] = useState(0);
  const emojis = ['🤩', '😎', '🚀', '☕', '🎨', '✨'];

  // Track parent scrolling container for dynamic sticker parallax
  useEffect(() => {
    const scrollContainer = screenRef.current?.closest('.content') || screenRef.current;
    if (!scrollContainer) return;

    const onScroll = () => {
      setScrollY(scrollContainer.scrollTop);
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, []);

  const cycleEmoji = (e) => {
    e?.stopPropagation();
    setEmojiIndex((prev) => (prev + 1) % emojis.length);
  };

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    const scrollContainer = screenRef.current?.closest('.content') || screenRef.current;
    scrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="polaroid-editorial-screen" ref={screenRef}>
      
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
              DYNAMIC PARALLAX STICKERS (MOVE DOWN AS YOU SCROLL)
              ============================================================= */}
          {/* 1. Drone Sticker on Top Left */}
          <div
            className="realistic-sticker sticker-drone"
            style={{
              transform: `translateY(${scrollY * 0.7}px) rotate(${-7 + scrollY * 0.03}deg)`,
            }}
            title="Tech & FPV Drone"
            aria-label="Quadcopter camera drone sticker"
          >
            <img src="/images/drone-sticker.png" alt="Camera drone die-cut sticker" />
          </div>

          {/* 2. Charminar Hyderabad Monument Sticker on Top Right */}
          <div
            className="realistic-sticker sticker-charminar"
            style={{
              transform: `translateY(${scrollY * 0.85}px) rotate(${6 - scrollY * 0.02}deg)`,
            }}
            title="Charminar, Hyderabad"
            aria-label="Charminar Hyderabad monument sticker"
          >
            <img src="/images/charminar-sticker.png" alt="Charminar monument die-cut sticker" />
          </div>

          {/* 3. Off-Road 4x4 Jeep Sticker on Bottom Left */}
          <div
            className="realistic-sticker sticker-jeep"
            style={{
              transform: `translateY(${scrollY * 0.5}px) rotate(${-5 + scrollY * 0.02}deg)`,
            }}
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

          {/* 2. Top Left: Nickname */}
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

            {/* 3D Emoji Sticker Badge */}
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

          {/* 7. Bottom Left: Passions outside design */}
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

        {/* Scroll down indicator button */}
        <button
          type="button"
          className="scroll-hint-bar"
          onClick={scrollToStory}
          aria-label="Scroll down to read more"
        >
          <span>Scroll down for story</span>
          <span className="scroll-arrow-down">↓</span>
        </button>
      </section>

      {/* =================================================================
          SECTION 2: DETAILED STORY & BIO (REVEALED ON SCROLL)
          ================================================================= */}
      <section className="about-extended-story" ref={storyRef}>
        <div className="story-card">
          <div className="story-sparkle">✦ ✦ ✦</div>
          <h2 className="story-title">Behind the Pixels</h2>
          
          <div className="story-paragraphs">
            <p className="story-p">
              I’m a <strong>Product Designer</strong> based in Hyderabad, deeply driven by the intersection of system architecture, tactile micro-interactions, and human psychology. Over the past 4+ years, I’ve focused on transforming intricate, high-friction domains into digital experiences that feel effortless, intuitive, and thoughtfully crafted.
            </p>

            <p className="story-p">
              My work spans from zero-to-one product strategy to shipping polished web, mobile, and design systems. At <strong>Recovery</strong>, I led the end-to-end design of a connected clinical rehabilitation platform, bridging orthopedic surgeons, physical therapists, and recovering patients through shared progress telemetry. On <strong>Trosky 365</strong>, I designed an AI-guided baseball coaching platform that turns complex athletic mechanics into an engaging conversational training companion.
            </p>

            <p className="story-p">
              I believe that the best products aren’t just visually striking—they operate with clear intentionality, respect the user’s cognitive load, and spark genuine joy. Outside of design sprints and code, you’ll usually find me exploring scenic trails in a 4×4 Jeep, capturing cinematic aerial shots with FPV drones, or diving into sci-fi cinema over a fresh pour-over coffee.
            </p>
          </div>

          {/* Quick interactive action buttons */}
          <div className="story-cta-strip">
            {onProjects && (
              <button
                type="button"
                className="story-action-btn primary"
                onClick={onProjects}
              >
                View Selected Projects ↗
              </button>
            )}
            {onContact && (
              <button
                type="button"
                className="story-action-btn secondary"
                onClick={onContact}
              >
                Let’s Connect
              </button>
            )}
            <button
              type="button"
              className="story-action-btn ghost"
              onClick={scrollToTop}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
