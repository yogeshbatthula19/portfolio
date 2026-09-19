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
    description: 'Designed responsive web interfaces that significantly enhanced usability by 25%, ensuring intuitive component hierarchy.',
    websiteUrl: 'https://buildup.work',
    coverImage: '/images/workspace/buildup.jpg',
    logo: (
      <div className="comp-logo comp-logo-buildup" title="BUILD UP">
        <span className="comp-bu-glyph">BU</span>
      </div>
    )
  }
];

export default function Experience() {
  return (
    <section className="experience-list" aria-labelledby="experience-title">
      <header className="experience-heading">
        <h2 id="experience-title">Experience</h2>
        <p>Design, products, and the teams behind them.</p>
      </header>
      <div className="experience-roles">
        {previousCompanies.map(c => (
          <article className="experience-row" key={c.id}>
            <div className="experience-dates">
              <span>{c.period.split(' · ')[0]}</span>
              {c.id === 'paradigmit' && <small>Current</small>}
            </div>
            <div className="experience-detail">
              <div className="experience-company-header">
                {c.logo}
                <div className="experience-company-copy">
                  <div className="experience-company-line">
                    <h3>{c.company}</h3>
                    <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${c.company} website`}>↗</a>
                  </div>
                  <p className="experience-role">{c.role}</p>
                </div>
              </div>
              <p className="experience-location">{c.location}</p>
              <p className="experience-summary">{c.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
