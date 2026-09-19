import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDraggable } from './useDraggable.js';
import './AboutMacWindow.css';

export default function AboutMacWindow({ isOpen, onClose, onMoreInfo, dark }) {
  const [certNotice, setCertNotice] = useState(false);
  const { pos, resetPos, dragHandlers } = useDraggable(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      resetPos();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, resetPos, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="about-mac-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className={`about-mac-window ${dark ? 'about-mac-dark' : 'about-mac-light'}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-mac-title"
      >
        {/* Draggable Titlebar with Traffic Lights */}
        <div className="about-mac-titlebar" {...dragHandlers}>
          <div className="about-mac-traffic">
            <button
              type="button"
              className="traffic-red"
              onClick={onClose}
              aria-label="Close window"
            />
            <span className="traffic-disabled traffic-yellow" aria-hidden="true" />
            <span className="traffic-disabled traffic-green" aria-hidden="true" />
          </div>
        </div>

        {/* MacBook Device Illustration with Profile Screen */}
        <div className="about-mac-hero" {...dragHandlers}>
          <div className="macbook-device">
            {/* Screen Lid */}
            <div className="macbook-lid">
              <div className="macbook-bezel">
                <div className="macbook-notch" />
                <div className="macbook-display">
                  <div className="macbook-screen-profile">
                    <img
                      src="/images/yogesh-portrait.jpg"
                      alt="Yogesh Battula"
                      className="macbook-screen-avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Laptop Base */}
            <div className="macbook-base">
              <div className="macbook-notch-cutout" />
            </div>
            <div className="macbook-shadow" />
          </div>
        </div>

        {/* Profile Info Content */}
        <div className="about-mac-content">
          <h2 id="about-mac-title" className="about-mac-name">
            Yogesh Battula
          </h2>
          <p className="about-mac-sub">Product Designer & Developer</p>

          <div className="about-mac-specs">
            <div className="spec-row">
              <span className="spec-label">Role</span>
              <span className="spec-value">Product Designer & Dev</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Location</span>
              <span className="spec-value">Hyderabad, India</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Experience</span>
              <span className="spec-value">3+ Years Building Products</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Core Stack</span>
              <span className="spec-value">Figma, React, Design Systems</span>
            </div>
          </div>

          {/* Action Button: More Info... */}
          <div className="about-mac-actions">
            <button
              type="button"
              className="about-mac-more-btn"
              onClick={() => {
                onClose();
                onMoreInfo?.('About me');
              }}
            >
              More Info...
            </button>
          </div>

          {/* Legal / Copyright Footer */}
          <div className="about-mac-footer">
            <button
              type="button"
              className="about-mac-cert-link"
              onClick={() => {
                setCertNotice(true);
                setTimeout(() => setCertNotice(false), 3000);
              }}
            >
              Regulatory Certification
            </button>
            {certNotice && (
              <div className="about-mac-cert-toast" role="status">
                Pixel-crafted in Hyderabad with Figma & React.
              </div>
            )}
            <p className="about-mac-copyright">
              ™ and © 1983–2026 Apple Inc. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
