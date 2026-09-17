import React, { useState } from 'react';
import './SpatialAbout.css';

export default function AboutMe({ onContact, onProjects }) {
  const [activeTab, setActiveTab] = useState('team'); // 'team' | 'details'
  const [chatMessageIndex, setChatMessageIndex] = useState(0);

  const chatMessages = [
    'Sketchbook.',
    'Craft & Systems.',
    'Obsessed with details.',
    'Coffee & Curiosity.',
  ];

  const cycleChat = () => {
    setChatMessageIndex((prev) => (prev + 1) % chatMessages.length);
  };

  return (
    <div className="spatial-about-screen">
      {/* =================================================================
          TOP SEGMENTED PILL TOGGLE (Meet The Team | Details)
          ================================================================= */}
      <nav className="spatial-segmented-pill" role="tablist" aria-label="About Me Views">
        <div
          className="segmented-pill-slider"
          style={{
            left: activeTab === 'team' ? '4px' : 'calc(50% + 2px)',
            width: 'calc(50% - 6px)',
          }}
        />
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'team'}
          className={`segmented-option ${activeTab === 'team' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Meet The Team
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'details'}
          className={`segmented-option ${activeTab === 'details' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
      </nav>

      {/* =================================================================
          VIEW 1: SPATIAL SCENE (EXACT 1:1 REPLICA OF REFERENCE PHOTO)
          ================================================================= */}
      {activeTab === 'team' ? (
        <div className="spatial-stage">
          
          {/* 1. Left Name Callout Bookmark Tab with Blue Pin */}
          <div className="name-callout-tab">
            <div className="name-pin-line">
              <div className="name-pin-dot" />
            </div>
            <div className="name-text-group">
              <span className="name-title-line">Yogesh</span>
              <span className="name-title-line">Battula</span>
            </div>
          </div>

          {/* 2. Left macOS Folder: Develops ideas */}
          <div
            className="spatial-folder-left"
            onClick={onProjects}
            title="Click to view projects"
          >
            <img
              src="/icons/folder.png"
              alt="Develops ideas folder"
              className="spatial-folder-img"
            />
            <span className="folder-label">
              Develops<br />ideas
            </span>
          </div>

          {/* 3. Bottom-Left Wire-Bound Open Spiral Notebook */}
          <div
            className="spiral-notebook-wrap"
            onClick={cycleChat}
            title="Click to peek sketchbook notes"
          >
            <div className="spiral-notebook">
              <div className="notebook-page-left" />
              <div className="spiral-binding-spine">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="spiral-ring" />
                ))}
              </div>
              <div className="notebook-page-right" />
            </div>
          </div>

          {/* 4. Center Standing Full-Body Cutout of Yogesh */}
          <div className="hero-cutout-wrap">
            <img
              src="/images/yogesh-hero.png"
              alt="Yogesh Battula standing cutout"
              className="hero-cutout-img"
            />
          </div>

          {/* 5. Floating macOS Cursor Arrow */}
          <svg
            className="macos-cursor-float"
            viewBox="0 0 24 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 2 2 L 2 26 L 7.5 20.5 L 13 30 L 17 28 L 11.5 18.5 L 18 18.5 Z"
              fill="#000000"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          {/* 6. Top-Right macOS Folder: Guides the team */}
          <div
            className="spatial-folder-right"
            onClick={() => setActiveTab('details')}
            title="Click to view background details"
          >
            <img
              src="/icons/folder.png"
              alt="Guides the team folder"
              className="spatial-folder-img"
            />
            <span className="folder-label">
              Guides<br />the team
            </span>
          </div>

          {/* 7. Middle-Right Photo Card: Product Designer.jpg (Compass with Blue Plus) */}
          <div
            className="spatial-photo-card"
            onClick={() => setActiveTab('details')}
            title="Click to view profile card"
          >
            <div className="photo-card-paper">
              <div className="photo-card-inner">
                {/* 3D Metallic Precision Compass SVG */}
                <svg
                  className="photo-card-icon"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <circle cx="40" cy="40" r="34" fill="#1e293b" />
                  <circle cx="40" cy="40" r="34" stroke="#94a3b8" strokeWidth="4" />
                  <circle cx="40" cy="40" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  {/* Top Loop Ring */}
                  <circle cx="40" cy="6" r="4.5" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  {/* Compass Needles */}
                  <polygon points="40,16 44,40 40,36 36,40" fill="#ef4444" />
                  <polygon points="40,64 44,40 40,44 36,40" fill="#e2e8f0" />
                  <polygon points="16,40 40,44 36,40 40,36" fill="#64748b" />
                  <polygon points="64,40 40,44 44,40 40,36" fill="#64748b" />
                  <circle cx="40" cy="40" r="3.5" fill="#f8fafc" />
                  {/* Compass Labels */}
                  <text x="40" y="24" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">N</text>
                  <text x="40" y="59" fill="#94a3b8" fontSize="6" fontWeight="bold" textAnchor="middle">S</text>
                  <text x="59" y="42" fill="#94a3b8" fontSize="6" fontWeight="bold" textAnchor="middle">E</text>
                  <text x="21" y="42" fill="#94a3b8" fontSize="6" fontWeight="bold" textAnchor="middle">W</text>
                </svg>

                {/* Blue Plus Badge in Corner */}
                <div className="photo-card-badge">+</div>
              </div>
            </div>
            <span className="photo-card-label">
              Product<br />Designer.jpg
            </span>
          </div>

          {/* 8. Bottom-Right Apple Blue iMessage Bubble: Sketchbook. */}
          <div
            className="imessage-chat-bubble"
            onClick={cycleChat}
            title="Click to toggle thought bubble"
          >
            <span>{chatMessages[chatMessageIndex]}</span>
          </div>

        </div>
      ) : (
        /* =================================================================
            VIEW 2: DETAILS TAB (Complete Biography, Work & Experience)
            ================================================================= */
        <div className="spatial-details-container">
          <div className="details-header">
            <span className="details-badge">Product & Interaction Designer</span>
            <h2 className="details-name">Yogesh Battula</h2>
            <p className="details-role">Based in Hyderabad / Bangalore, India • Working Worldwide</p>
          </div>

          <div className="details-body">
            <p>
              I am a Product Designer driven by the craft of shaping complex workflows into clear, deliberate, and deeply human digital experiences.
            </p>

            <div className="details-focus-box">
              <h4>Key Featured Case Studies</h4>
              <ul>
                <li><strong>Recovery:</strong> Post-operative clinical rehabilitation system linking surgeons, physiotherapists, and recovering patients.</li>
                <li><strong>Trosky 365:</strong> AI-powered conversational athletic coaching platform and structured player developmental tracking.</li>
              </ul>
            </div>

            <p>
              My expertise bridges user research, design systems, interactive prototypes, and front-end engineering fidelity.
            </p>

            <div className="details-actions">
              {onProjects && (
                <button
                  type="button"
                  className="details-btn primary"
                  onClick={onProjects}
                >
                  Explore Work ↗
                </button>
              )}
              {onContact && (
                <button
                  type="button"
                  className="details-btn"
                  onClick={onContact}
                >
                  Say Hello
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
