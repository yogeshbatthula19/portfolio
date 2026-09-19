import React from 'react';
import { Monitor, FileText, ExternalLink, Mail, Globe, Sparkles } from 'lucide-react';
import './IOSMobileView.css';

export default function IOSMobileView() {
  return (
    <div className="mobile-notice-screen" role="region" aria-label="Mobile viewport notice">
      <div className="mobile-notice-card">
        <div className="mobile-notice-icon-box">
          <Monitor size={36} strokeWidth={1.8} className="mobile-monitor-icon" />
        </div>

        <span className="mobile-notice-eyebrow">Interactive macOS Portfolio</span>
        <h1 className="mobile-notice-title">Best Viewed on a Larger Screen</h1>

        <p className="mobile-notice-desc">
          This portfolio is designed as an authentic macOS desktop experience with interactive windows, live case studies, and prototypes. For the best experience, please open it on a laptop or desktop computer.
        </p>

        <div className="mobile-notice-actions">
          <a
            href="/documents/yogesh-battula-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-notice-btn primary-btn"
          >
            <FileText size={18} />
            <span>View Résumé (PDF)</span>
            <ExternalLink size={14} className="btn-external" />
          </a>

          <a
            href="https://www.figma.com/slides/xycoBbTbSFrl34GxVNAjDn/Finance-Hub?node-id=4-1119&t=F88XB9e6cHSYlpTD-0"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-notice-btn secondary-btn"
          >
            <Sparkles size={18} />
            <span>2025 Case Study · FMC</span>
            <ExternalLink size={14} className="btn-external" />
          </a>

          <div className="mobile-notice-split">
            <a
              href="mailto:yogeshbattula55@gmail.com"
              className="mobile-notice-btn secondary-btn half-btn"
            >
              <Mail size={17} />
              <span>Email Me</span>
            </a>

            <a
              href="https://linkedin.com/in/yogesh-battula"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-notice-btn secondary-btn half-btn"
            >
              <Globe size={17} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mobile-notice-footer">
          <span className="mobile-notice-status">● Open for product roles & collaborations</span>
          <p className="mobile-notice-sub">Yogesh Battula · Product Designer & AI Vibe Coder</p>
        </div>
      </div>
    </div>
  );
}
