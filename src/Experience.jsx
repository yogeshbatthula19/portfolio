import React from 'react';
import './Experience.css';

const previousCompanies = [
  {
    id: 'paradigmit',
    company: 'ParadigmIT',
    role: 'Product Designer',
    employmentType: 'Full-time',
    period: 'Aug 2025 — Present',
    durationBadge: '1 yr 2 mos',
    location: 'Hyderabad, Telangana, India · On-site',
    theme: 'dark',
    headline: 'Enterprise Mobile & Web Workflows',
    description: 'Design mobile and web experiences, translating user needs and business requirements into clear workflows and interfaces. Collaborating with cross-functional engineering teams to drive user experience (UX) excellence and seamless human-centered digital products.',
    websiteUrl: 'https://www.paradigmit.com',
    websiteLabel: 'Visit ParadigmIT',
    tags: ['User Experience (UX)', 'Mobile & Web Design', 'Product Workflows', 'Interface Architecture', 'Enterprise Systems'],
    accentColor: '#409cff',
    badgeType: 'paradigmit',
    previewType: 'workflow'
  },
  {
    id: 'freelance-scrum',
    company: 'Freelance',
    role: 'Scrum Master',
    employmentType: 'Freelance',
    period: 'Jan 2025 — Aug 2025',
    durationBadge: '8 mos',
    location: 'Remote',
    theme: 'light',
    headline: 'Agile Delivery, Product Quality & Team Autonomy',
    description: 'Enhance product and service quality to deliver customer value and satisfaction. Empowers team members to make more work-related decisions, optimize sprint cadences, and remove delivery impediments across distributed product squads.',
    websiteUrl: 'https://www.scrum.org',
    websiteLabel: 'Learn More About Agile Delivery',
    tags: ['Agile Methodologies', 'Scrum Delivery', 'Sprint Facilitation', 'Continuous Delivery', 'Team Empowerment'],
    accentColor: '#ff9500',
    badgeType: 'freelance',
    previewType: 'sprint'
  },
  {
    id: 'prasthana',
    company: 'Prasthana Software Solutions Pvt Ltd',
    role: 'Sr. Product Designer / Scrum Master',
    employmentType: 'Full-time · 2 yrs 8 mos',
    period: 'May 2022 — Dec 2024',
    durationBadge: '2 yrs 8 mos total',
    location: 'Hyderabad, Telangana, India',
    theme: 'slate',
    headline: 'End-to-End Product Architecture & Agile Leadership',
    description: 'Spearheaded product design and Agile coordination across large-scale software solutions over 2+ years through two successive roles:',
    subroles: [
      {
        title: 'Sr. Product Designer / Scrum Master',
        period: 'Apr 2023 — Dec 2024 · 1 yr 9 mos',
        location: 'On-site',
        details: 'Translated product requirements into user flows, wireframes, prototypes, and detailed interfaces. Mentored design teams and facilitated cross-functional agile rituals.',
        skills: 'Agile Methodologies, Mentorship, Wireframing, Prototypes'
      },
      {
        title: 'UX Designer',
        period: 'May 2022 — Mar 2023 · 11 mos',
        location: 'On-site',
        details: 'Supported Agile delivery teams in IT projects, contributing to system implementations, testing, and support across e-commerce and enterprise workflows.',
        skills: 'E-Commerce, Project Management, User Testing'
      }
    ],
    websiteUrl: 'http://prasthana.com',
    websiteLabel: 'Visit Prasthana Solutions',
    tags: ['Agile Methodologies', 'Mentorship', 'User Flows', 'Wireframes & Prototypes', 'E-Commerce', 'System Testing'],
    accentColor: '#30b0c7',
    badgeType: 'prasthana',
    previewType: 'multirole'
  },
  {
    id: 'buildup',
    company: 'BUILD UP (BU)',
    role: 'User Interface Designer',
    employmentType: 'Internship',
    period: 'Jan 2022 — Apr 2022',
    durationBadge: '4 mos',
    location: 'Hyderabad, Telangana, India · Remote',
    theme: 'light',
    headline: 'Responsive Interfaces & +25% Usability Impact',
    description: 'Key accomplishments include designing responsive web interfaces that significantly enhanced usability by 25%, ensuring accessibility and intuitive component hierarchy across multi-device applications.',
    websiteUrl: 'https://buildup.work',
    websiteLabel: 'Visit BUILD UP',
    tags: ['User Interface (UI)', 'Responsive Design', '+25% Usability Impact', 'Design Tokens', 'Presentation Skills'],
    accentColor: '#af52de',
    badgeType: 'buildup',
    previewType: 'components'
  }
];

export default function Experience({ onContact, onProjects }) {
  return (
    <div className="experience-timeline-container">
      {/* Apple-style Section Header */}
      <header className="experience-header">
        <span className="experience-badge">CAREER TIMELINE</span>
        <h1 className="experience-title">Where I’ve crafted & delivered.</h1>
        <p className="experience-subtitle">
          Previous companies, roles, and demonstrated impact across Product Design, UX Architecture, and Agile delivery.
        </p>
      </header>

      {/* Apple Feature Announcement-Style Cards Stack */}
      <div className="experience-cards-stack">
        {previousCompanies.map((item) => (
          <article
            key={item.id}
            className={`experience-card experience-card-${item.theme}`}
          >
            {/* Left Media Area: Contextual Preview & Company Badge */}
            <div className="exp-card-media-wrap">
              <div className={`exp-media-artwork exp-art-${item.previewType}`}>
                {/* Visual Artwork Content */}
                {item.previewType === 'workflow' && (
                  <div className="exp-visual-workflow">
                    <div className="exp-art-hex-badge">
                      <svg viewBox="0 0 48 48" className="exp-hex-icon" fill="none">
                        <polygon points="24,4 44,15 44,37 24,48 4,37 4,15" stroke="#ffffff" strokeWidth="3" fill="#121217" />
                        <polygon points="24,12 36,19 36,33 24,40 12,33 12,19" stroke="#409cff" strokeWidth="2" fill="rgba(64,156,255,0.15)" />
                        <circle cx="24" cy="26" r="4" fill="#409cff" />
                      </svg>
                      <span className="exp-art-brand-title">ParadigmIT</span>
                    </div>
                    <div className="exp-art-wire-window">
                      <div className="exp-art-wire-topbar">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                        <span className="exp-art-wire-title">Workflow Architecture</span>
                      </div>
                      <div className="exp-art-wire-body">
                        <div className="exp-art-node active">
                          <span className="exp-node-icon">◆</span>
                          <span>User Intent</span>
                        </div>
                        <div className="exp-art-connector" />
                        <div className="exp-art-node primary">
                          <span className="exp-node-icon">❖</span>
                          <span>Clear Interface</span>
                        </div>
                        <div className="exp-art-connector" />
                        <div className="exp-art-node success">
                          <span className="exp-node-icon">✓</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {item.previewType === 'sprint' && (
                  <div className="exp-visual-sprint">
                    <div className="exp-art-scrum-badge">
                      <div className="exp-scrum-grid-icon">
                        <div className="scrum-block b1" />
                        <div className="scrum-block b2" />
                        <div className="scrum-block b3" />
                        <div className="scrum-block b4" />
                      </div>
                      <span className="exp-art-brand-title dark">Scrum Master</span>
                    </div>
                    <div className="exp-art-sprint-board">
                      <div className="exp-sprint-col">
                        <span className="exp-col-title">BACKLOG</span>
                        <div className="exp-mini-card">Quality Gate</div>
                        <div className="exp-mini-card">User Value</div>
                      </div>
                      <div className="exp-sprint-col active">
                        <span className="exp-col-title">IN FLIGHT</span>
                        <div className="exp-mini-card highlight">Empower Team</div>
                        <div className="exp-mini-card">Sprint Sync</div>
                      </div>
                      <div className="exp-sprint-col">
                        <span className="exp-col-title">DONE</span>
                        <div className="exp-mini-card done">Velocity 100%</div>
                      </div>
                    </div>
                  </div>
                )}

                {item.previewType === 'multirole' && (
                  <div className="exp-visual-multirole">
                    <div className="exp-art-prasthana-badge">
                      <div className="prasthana-logo-glyph">P</div>
                      <div className="prasthana-header-text">
                        <span className="prasthana-main">PRASTHANA</span>
                        <span className="prasthana-sub">SOFTWARE SOLUTIONS</span>
                      </div>
                    </div>
                    <div className="exp-art-progression-card">
                      <div className="exp-prog-step">
                        <span className="exp-prog-dot top" />
                        <div className="exp-prog-info">
                          <b>Sr. Product Designer & Scrum Master</b>
                          <small>Apr 2023 — Dec 2024</small>
                        </div>
                      </div>
                      <div className="exp-prog-line" />
                      <div className="exp-prog-step">
                        <span className="exp-prog-dot bottom" />
                        <div className="exp-prog-info">
                          <b>UX Designer</b>
                          <small>May 2022 — Mar 2023</small>
                        </div>
                      </div>
                      <div className="exp-prog-badge">2 yrs 8 mos total</div>
                    </div>
                  </div>
                )}

                {item.previewType === 'components' && (
                  <div className="exp-visual-components">
                    <div className="exp-art-buildup-badge">
                      <div className="bu-glyph">BU</div>
                      <span className="bu-brand-name">BUILD UP</span>
                    </div>
                    <div className="exp-art-metric-card">
                      <div className="exp-metric-highlight">
                        <span className="metric-arrow">↑</span>
                        <span className="metric-value">25%</span>
                      </div>
                      <span className="metric-label">Enhanced Usability</span>
                      <div className="exp-metric-pill-row">
                        <span className="metric-mini-pill">Responsive Web</span>
                        <span className="metric-mini-pill">Tokens</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content Area: Details, Dates, Subroles & Learn More Link */}
            <div className="exp-card-content">
              {/* Meta row: Role pill, employment type, period */}
              <div className="exp-card-meta-row">
                <span className="exp-company-tag">{item.role}</span>
                <div className="exp-badge-group">
                  <span className="exp-emp-type-pill">{item.employmentType}</span>
                  <span className="exp-period-pill">{item.period}</span>
                </div>
              </div>

              <div className="exp-title-location-row">
                <h2 className="exp-company-name">{item.company}</h2>
                <span className="exp-location-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {item.location}
                </span>
              </div>

              <h3 className="exp-headline">{item.headline}</h3>

              <p className="exp-description">{item.description}</p>

              {/* Subroles Timeline for Prasthana */}
              {item.subroles && (
                <div className="exp-subroles-container">
                  {item.subroles.map((sub, idx) => (
                    <div key={idx} className="exp-subrole-item">
                      <div className="exp-subrole-rail">
                        <span className="exp-rail-bullet" />
                        {idx < item.subroles.length - 1 && <span className="exp-rail-line" />}
                      </div>
                      <div className="exp-subrole-details">
                        <div className="exp-subrole-heading">
                          <b className="exp-subrole-title">{sub.title}</b>
                          <span className="exp-subrole-period">{sub.period}</span>
                        </div>
                        <p className="exp-subrole-text">{sub.details}</p>
                        <span className="exp-subrole-skills">
                          <strong>Skills:</strong> {sub.skills}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skill Tag pills */}
              <div className="exp-tags-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="exp-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Apple "Learn more ›" Link */}
              <div className="exp-action-row">
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-learn-more-link"
                  aria-label={`Learn more about ${item.company} (opens in new tab)`}
                >
                  Learn more <span className="exp-chevron" aria-hidden="true">›</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Footer Callout */}
      <footer className="experience-footer-cta">
        <div className="exp-footer-card">
          <div>
            <h4>Want to collaborate or discuss an opportunity?</h4>
            <p>I’m open to full-time product design roles, design system consults, and agile team facilitation.</p>
          </div>
          <div className="exp-footer-actions">
            {onProjects && (
              <button
                type="button"
                className="exp-footer-btn secondary"
                onClick={onProjects}
              >
                Browse Projects
              </button>
            )}
            {onContact && (
              <button
                type="button"
                className="exp-footer-btn primary"
                onClick={onContact}
              >
                Get in Touch
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
