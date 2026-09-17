import React from 'react';
import './FigmaCanvasCursors.css';

function FigmaPointer({ color }) {
  return (
    <svg className="figma-cursor-icon" viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path
        d="M1.5 1.5L6.8 14.5L9.2 9.2L14.5 6.8L1.5 1.5Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectionBoxHandles() {
  return (
    <>
      <span className="figma-handle figma-handle-tl" />
      <span className="figma-handle figma-handle-tr" />
      <span className="figma-handle figma-handle-bl" />
      <span className="figma-handle figma-handle-br" />
    </>
  );
}

export default function FigmaCanvasCursors() {
  return (
    <div className="figma-desktop-canvas" aria-hidden="true">
      {/* Selection Box 1: "the car" (Framing the Porsche driving along the evening highway) */}
      <div className="figma-selection-box figma-box-car">
        <span className="figma-layer-name">the car</span>
        <SelectionBoxHandles />
      </div>

      {/* Selection Box 2: "Portfolio" (Framing the portfolio title typography) */}
      <div className="figma-selection-box figma-box-words">
        <span className="figma-layer-name">Portfolio</span>
        <SelectionBoxHandles />
      </div>

      {/* Cursor 1: Marcus L selecting "the car" (Green) */}
      <div className="figma-cursor figma-cursor-marcus">
        <FigmaPointer color="#10B981" />
        <div className="figma-cursor-tag">
          <div className="figma-badge" style={{ backgroundColor: '#10B981' }}>Marcus L</div>
          <div className="figma-chat">the car 🏎️</div>
        </div>
      </div>

      {/* Cursor 2: Dhruv A selecting "Portfolio" / words (Purple) */}
      <div className="figma-cursor figma-cursor-dhruv">
        <FigmaPointer color="#8B5CF6" />
        <div className="figma-cursor-tag">
          <div className="figma-badge" style={{ backgroundColor: '#8B5CF6' }}>Dhruv A</div>
          <div className="figma-chat">typography ✨</div>
        </div>
      </div>

      {/* Cursor 3: Zaria Z roaming the windmills & sunset (Hot Pink) */}
      <div className="figma-cursor figma-cursor-zaria">
        <FigmaPointer color="#EC4899" />
        <div className="figma-cursor-tag">
          <div className="figma-badge" style={{ backgroundColor: '#EC4899' }}>Zaria Z</div>
          <div className="figma-chat">sunset vibe 🌅</div>
        </div>
      </div>
    </div>
  );
}
