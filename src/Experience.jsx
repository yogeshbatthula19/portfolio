import React from 'react';
import './Experience.css';

const previousCompanies = [
  {
    id: 'paradigmit',
    company: 'ParadigmIT',
    role: 'Product Designer',
    employmentType: 'Full-time',
    period: 'Aug 2025 — Present · 1 yr 2 mos',
    location: 'Hyderabad, India · On-site',
    description: 'Design mobile and web experiences, translating user needs and business requirements into clear workflows and interfaces.',
    websiteUrl: 'https://www.paradigmit.com',
    coverImage: '/images/workspace/paradigmit.jpg',
    logo: (
      <div className="comp-logo comp-logo-paradigmit" title="ParadigmIT">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
          <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" stroke="#ffffff" strokeWidth="2.5" fill="#121217" />
          <polygon points="16,8 24,12.5 24,19.5 16,24 8,19.5 8,12.5" fill="#ffffff" />
          <polygon points="16,11 20,13.5 20,18.5 16,21 12,18.5 12,13.5" fill="#121217" />
        </svg>
      </div>
    )
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Scrum Master',
    employmentType: 'Freelance',
    period: 'Jan 2025 — Aug 2025 · 8 mos',
    location: 'Remote',
    description: 'Enhance product and service quality to deliver customer value and satisfaction. Empowers team members to make more work-related decisions.',
    websiteUrl: 'https://www.scrum.org',
    coverImage: '/images/workspace/freelance.jpg',
    logo: (
      <div className="comp-logo comp-logo-freelance" title="Freelance">
        <div className="freelance-blocks">
          <span className="fb fb-blue" />
          <span className="fb fb-cyan" />
          <span className="fb fb-slate" />
          <span className="fb fb-gray" />
        </div>
      </div>
    )
  },
  {
    id: 'prasthana',
    company: 'Prasthana Software Solutions',
    role: 'Sr. Product Designer / Scrum Master & UX Designer',
    employmentType: 'Full-time',
    period: 'May 2022 — Dec 2024 · 2 yrs 8 mos',
    location: 'Hyderabad, India · On-site',
    description: 'Translated product requirements into user flows, wireframes, prototypes, and interfaces. Supported Agile teams across system implementations and testing.',
    websiteUrl: 'http://prasthana.com',
    coverImage: '/images/workspace/prasthana.jpg',
    logo: (
      <div className="comp-logo comp-logo-prasthana" title="Prasthana Software Solutions">
        <span className="comp-p-glyph">P</span>
      </div>
    )
  },
  {
    id: 'buildup',
    company: 'BUILD UP (BU)',
    role: 'User Interface Designer',
    employmentType: 'Internship',
    period: 'Jan 2022 — Apr 2022 · 4 mos',
    location: 'Hyderabad, India · Remote',
    description: 'Designed responsive web interfaces that significantly enhanced usability by 25%, ensuring accessibility and intuitive component hierarchy.',
    websiteUrl: 'https://buildup.work',
    coverImage: '/images/workspace/buildup.jpg',
    logo: (
      <div className="comp-logo comp-logo-buildup" title="BUILD UP">
        <span className="comp-bu-glyph">BU</span>
      </div>
    )
  }
];

export default function Experience({ onContact, onProjects }) {
  return (
    <div className="experience-glance-screen">
      {/* Minimal Header */}
      <div className="experience-minimal-header">
        <div>
          <h2 className="exp-minimal-title">Experience</h2>
          <p className="exp-minimal-sub">Companies, roles, and product impact at a glance.</p>
        </div>
        <span className="exp-count-badge">4 previous roles</span>
      </div>

      {/* Compact 2x2 Minimalist Grid Visible in One Glance */}
      <div className="experience-glance-grid">
        {previousCompanies.map((c) => (
          <article key={c.id} className="exp-glance-card">
            {/* Workspace Cover Background */}
            <div
              className="exp-glance-bg"
              style={{ backgroundImage: `url(${c.coverImage})` }}
              aria-hidden="true"
            />
            {/* Dark Frosted Scrim Overlay for ultra-clean readability */}
            <div className="exp-glance-scrim" />

            {/* Card Content */}
            <div className="exp-glance-content">
              {/* Header: Logo, Company Name, and Period Badge */}
              <div className="exp-glance-top">
                <div className="exp-glance-brand">
                  {c.logo}
                  <div className="exp-glance-names">
                    <h3 className="exp-glance-company">{c.company}</h3>
                    <span className="exp-glance-role">{c.role}</span>
                  </div>
                </div>
              </div>

              {/* Meta: Location and Timeline */}
              <div className="exp-glance-meta">
                <span className="exp-meta-pill exp-period">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {c.period}
                </span>

                <span className="exp-meta-pill exp-location">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {c.location}
                </span>
              </div>

              {/* Description */}
              <p className="exp-glance-desc">{c.description}</p>

              {/* Learn More link */}
              <div className="exp-glance-bottom">
                <a
                  href={c.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-glance-link"
                  aria-label={`Visit ${c.company} website`}
                >
                  Learn more <span className="exp-arrow" aria-hidden="true">›</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
